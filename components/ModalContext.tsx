'use client';

import { useState, createContext, useContext, useCallback, ReactNode } from 'react';
import { ConfirmModal, AlertModal } from '@/components/ConfirmModal';

interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'success';
}

interface AlertOptions {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

interface ModalContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  alert: (options: AlertOptions) => Promise<void>;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [confirmState, setConfirmState] = useState<ConfirmOptions & { resolve?: (value: boolean) => void; isOpen: boolean }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'danger',
  });

  const [alertState, setAlertState] = useState<AlertOptions & { isOpen: boolean }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success',
  });

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmState({
        isOpen: true,
        title: options.title,
        message: options.message,
        confirmText: options.confirmText,
        cancelText: options.cancelText,
        type: options.type || 'danger',
        resolve,
      });
    });
  }, []);

  const alert = useCallback((options: AlertOptions): Promise<void> => {
    return new Promise((resolve) => {
      setAlertState({
        isOpen: true,
        title: options.title,
        message: options.message,
        type: options.type || 'success',
        resolve,
      });
    });
  }, []);

  const handleConfirm = () => {
    confirmState.resolve?.(true);
    setConfirmState((prev) => ({ ...prev, isOpen: false, resolve: undefined }));
  };

  const handleCancel = () => {
    confirmState.resolve?.(false);
    setConfirmState((prev) => ({ ...prev, isOpen: false, resolve: undefined }));
  };

  const handleAlertClose = () => {
    alertState.resolve?.();
    setAlertState((prev) => ({ ...prev, isOpen: false, resolve: undefined }));
  };

  return (
    <ModalContext.Provider value={{ confirm, alert }}>
      {children}
      <ConfirmModal
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        cancelText={confirmState.cancelText}
        type={confirmState.type}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <AlertModal
        isOpen={alertState.isOpen}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
        onClose={handleAlertClose}
      />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
}