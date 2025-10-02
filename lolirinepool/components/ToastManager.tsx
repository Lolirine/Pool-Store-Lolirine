import React from 'react';
import { Toast as ToastType } from '../types';
import Toast from './Toast';

interface ToastManagerProps {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
}

const ToastManager: React.FC<ToastManagerProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-[10000]"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        {/* The toast-in animation is defined in a style tag here to ensure it's available */}
        <style>{`
          @keyframes toast-in {
            from {
              opacity: 0;
              transform: translateX(100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </div>
    </div>
  );
};

export default ToastManager;
