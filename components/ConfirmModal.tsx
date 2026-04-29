'use client';

import { useState, useEffect } from 'react';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'success';
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'cancelar',
  type = 'danger',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
      button: 'bg-red-500 hover:bg-red-600 text-white',
      border: 'border-red-500/30',
    },
    warning: {
      icon: <AlertTriangle className="w-12 h-12 text-yellow-500" />,
      button: 'bg-yellow-500 hover:bg-yellow-600 text-black',
      border: 'border-yellow-500/30',
    },
    success: {
      icon: <CheckCircle className="w-12 h-12 text-green-500" />,
      button: 'bg-green-500 hover:bg-green-600 text-white',
      border: 'border-green-500/30',
    },
  };

  const styles = typeStyles[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
      <div className={`relative glass-modal p-8 rounded-2xl max-w-md w-full mx-4 ${styles.border} border-2`}>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">{styles.icon}</div>
          <h3 className="font-headline text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/70 mb-6">{message}</p>
          
          <div className="flex gap-3 w-full">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors font-bold"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-3 rounded-lg transition-colors font-bold ${styles.button}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AlertModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function AlertModal({
  isOpen,
  title,
  message,
  type = 'success',
  onClose,
}: AlertModalProps) {
  if (!isOpen) return null;

  const typeStyles = {
    success: {
      icon: <CheckCircle className="w-12 h-12 text-green-500" />,
      button: 'bg-green-500 text-white',
    },
    error: {
      icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
      button: 'bg-red-500 text-white',
    },
    info: {
      icon: <AlertTriangle className="w-12 h-12 text-blue-500" />,
      button: 'bg-blue-500 text-white',
    },
  };

  const styles = typeStyles[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-modal p-8 rounded-2xl max-w-md w-full mx-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">{styles.icon}</div>
          <h3 className="font-headline text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/70 mb-6">{message}</p>
          
          <button
            onClick={onClose}
            className={`w-full px-4 py-3 rounded-lg font-bold ${styles.button} hover:brightness-110 transition-all`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}