import React, { useEffect, useState } from 'react';
import { Toast as ToastType } from '../types';
import { X, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

const icons = {
  success: <CheckCircle className="text-green-500" />,
  info: <Info className="text-blue-500" />,
  error: <AlertTriangle className="text-red-500" />,
};

const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onDismiss(toast.id), 300); // Wait for animation to finish
    }, 4000); // Auto-dismiss after 4 seconds

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => onDismiss(toast.id), 300);
  };
  
  const typeClasses = {
      success: 'border-green-500',
      info: 'border-blue-500',
      error: 'border-red-500',
  };

  return (
    <div
      className={`
        w-full max-w-sm bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden
        border-l-4 ${typeClasses[toast.type]}
        transition-all duration-300 ease-in-out
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
      `}
      style={{ animation: 'toast-in 0.5s ease' }}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {toast.icon || icons[toast.type]}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{toast.message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={handleDismiss}
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
