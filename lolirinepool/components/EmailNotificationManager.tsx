import React, { useState } from 'react';
import { Notification } from '../types';
import { Mail, X, Eye } from 'lucide-react';

// --- Email Preview Modal ---
interface EmailPreviewModalProps {
  notification: Notification | null;
  onClose: () => void;
}
const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[10001] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b bg-gray-50">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Aperçu de l'email</h2>
            <p className="text-xs text-gray-500 mt-1">
              <strong>À :</strong> {notification.recipient} <br/>
              <strong>Sujet :</strong> {notification.subject}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: notification.body }} />
        </div>
        <div className="p-4 border-t bg-gray-50 text-right">
             <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-700">
                Fermer
            </button>
        </div>
      </div>
    </div>
  );
};


// --- Email Notification Toast ---
interface EmailNotificationToastProps {
  notification: Notification;
  onDismiss: (id: string) => void;
  onView: (notification: Notification) => void;
}
const EmailNotificationToast: React.FC<EmailNotificationToastProps> = ({ notification, onDismiss, onView }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, 8000); // Auto-dismiss after 8 seconds
    return () => clearTimeout(timer);
  }, [notification, onDismiss]);

  return (
     <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm border-l-4 border-cyan-500 animate-slide-in-right">
       <style>{`
          @keyframes slide-in-right {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .animate-slide-in-right { animation: slide-in-right 0.3s ease-out forwards; }
        `}</style>
        <div className="flex items-start">
            <div className="flex-shrink-0 text-cyan-500 pt-0.5">
                <Mail size={20} />
            </div>
            <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-bold text-gray-900">Email envoyé !</p>
                <p className="mt-1 text-sm text-gray-600 truncate">
                    <strong>Sujet :</strong> {notification.subject}
                </p>
                 <p className="text-xs text-gray-500 truncate">
                    <strong>À :</strong> {notification.recipient}
                </p>
                <div className="mt-3 flex gap-3">
                    <button onClick={() => onView(notification)} className="text-sm font-semibold text-cyan-600 hover:text-cyan-800 flex items-center gap-1">
                        <Eye size={16}/> Voir l'email
                    </button>
                </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
                <button onClick={() => onDismiss(notification.id)} className="inline-flex text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Fermer</span>
                    <X size={20} />
                </button>
            </div>
        </div>
    </div>
  );
};


// --- Main Manager Component ---
interface EmailNotificationManagerProps {
    notifications: Notification[];
    onDismiss: (id: string) => void;
}

const EmailNotificationManager: React.FC<EmailNotificationManagerProps> = ({ notifications, onDismiss }) => {
    const [previewingNotification, setPreviewingNotification] = useState<Notification | null>(null);

    return (
        <>
            <div className="fixed top-5 right-5 z-[10000] space-y-2">
                {notifications.map(n => (
                    <EmailNotificationToast 
                        key={n.id} 
                        notification={n} 
                        onDismiss={onDismiss}
                        onView={setPreviewingNotification}
                    />
                ))}
            </div>
            <EmailPreviewModal 
                notification={previewingNotification}
                onClose={() => setPreviewingNotification(null)}
            />
        </>
    );
};

export default EmailNotificationManager;
