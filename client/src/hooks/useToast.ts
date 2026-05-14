import { useState, useCallback } from 'react';
import { ToastMessage, ToastType } from '@/components/Toast';
import { nanoid } from 'nanoid';

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((
    type: ToastType,
    title: string,
    message: string,
    duration: number = 4000
  ) => {
    const id = nanoid();
    const toast: ToastMessage = {
      id,
      type,
      title,
      message,
      duration,
    };
    setToasts((prev) => [...prev, toast]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (title: string, message: string, duration?: number) =>
      addToast('success', title, message, duration),
    [addToast]
  );

  const error = useCallback(
    (title: string, message: string, duration?: number) =>
      addToast('error', title, message, duration),
    [addToast]
  );

  const info = useCallback(
    (title: string, message: string, duration?: number) =>
      addToast('info', title, message, duration),
    [addToast]
  );

  const warning = useCallback(
    (title: string, message: string, duration?: number) =>
      addToast('warning', title, message, duration),
    [addToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
  };
};
