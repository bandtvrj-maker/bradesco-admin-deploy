// Wrapper que aguarda Socket.IO e inicia cliente-bridge
console.log('[WRAPPER] Iniciando wrapper...');

// Criar um elemento visível para confirmar que o script está sendo executado
const debugDiv = document.createElement('div');
debugDiv.id = 'manus-debug-wrapper';
debugDiv.style.cssText = 'position: fixed; top: 10px; right: 10px; background: #ff0000; color: white; padding: 10px; z-index: 99999; font-size: 12px; font-family: monospace;';
debugDiv.innerHTML = '[WRAPPER] Iniciado';
document.body.appendChild(debugDiv);

function loadClienteBridge() {
  console.log('[WRAPPER] Carregando cliente-bridge...');
  debugDiv.innerHTML = '[WRAPPER] Carregando cliente-bridge...';
  const script = document.createElement('script');
  script.src = '/cliente-bridge.js';
  script.onerror = () => {
    console.error('[WRAPPER] Erro ao carregar cliente-bridge.js');
    debugDiv.innerHTML = '[WRAPPER] Erro ao carregar cliente-bridge.js';
  };
  script.onload = () => {
    console.log('[WRAPPER] cliente-bridge.js carregado com sucesso');
    debugDiv.innerHTML = '[WRAPPER] cliente-bridge.js carregado';
  };
  document.body.appendChild(script);
}

// Aguardar Socket.IO estar disponível
function waitForSocketIO() {
  if (typeof io !== 'undefined') {
    console.log('[WRAPPER] Socket.IO disponível, carregando cliente-bridge');
    debugDiv.innerHTML = '[WRAPPER] Socket.IO OK, carregando...';
    loadClienteBridge();
  } else {
    console.log('[WRAPPER] Socket.IO não disponível ainda, aguardando...');
    setTimeout(waitForSocketIO, 100);
  }
}

// Aguardar DOM estar pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', waitForSocketIO);
} else {
  waitForSocketIO();
}
