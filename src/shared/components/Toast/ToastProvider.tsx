'use client';

import { createContext, ReactNode, useContext, useMemo } from 'react';

import Toast from './index';
import { useToast } from '../../hooks/useToast';

type ToastContextValue = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const { open, message, showToast } = useToast();

  const value = useMemo(
    () => ({
      showToast,
    }),
    [showToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast open={open} message={message} />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('ToastProvider 하위에서만 사용할 수 있습니다');
  }
  return ctx;
};
