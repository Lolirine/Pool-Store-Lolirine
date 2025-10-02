import React, { useState, useMemo } from 'react';
import { EmailTemplate, EmailManagementViewProps } from '../../types';
import { Mail, Edit, Eye, EyeOff, Send, CheckCircle, Loader } from 'lucide-react';
import EmailEditorModal from './EmailEditorModal';

const EmailManagementView: React.FC<EmailManagementViewProps> = ({ emailTemplates, onUpdateEmailTemplate, users, emailService }) => {
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationRecipient, setNotificationRecipient] = useState('all');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleToggleEnabled = (template: EmailTemplate) => {
    onUpdateEmailTemplate({ ...template, enabled: !template.enabled });
  };
  
  const handleSaveTemplate = (updatedTemplate: EmailTemplate) => {
    onUpdateEmailTemplate(updatedTemplate);
    setEditingTemplate(null);
  }

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notificationTitle || !notificationMessage) {
        alert("Veuillez remplir le titre et le message.");
        return;
    }
    setIsSending(true);
    setSendSuccess(false);

    const recipients = notificationRecipient === 'all' 
        ? users 
        : users.filter(u => u.email === notificationRecipient);

    recipients.forEach(user => {
        emailService.sendCustomNotification(user.email, notificationTitle, notificationMessage);
    });
    
    setTimeout(() => {
        setIsSending(false);
        setSendSuccess(true);
        setNotificationTitle('');
        setNotificationMessage('');
        setNotificationRecipient('all');
        setTimeout(() => setSendSuccess(false), 3000);
    }, 1000);
  };

  const groupedTemplates = useMemo(() => {
    return emailTemplates.reduce((acc, template) => {
      (acc[template.type] = acc[template.type] || []).push(template);
      return acc;
    }, {} as Record<EmailTemplate['type'], EmailTemplate[]>);
  }, [emailTemplates]);

  const groupTitles = {
    transactional: 'Emails Transactionnels',
    marketing: 'Emails Marketing & Promotion',
    lifecycle: 'Emails de Cycle de Vie Client'
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Mail size={24} className="mr-3" />
          Emails & Notifications
        </h2>
        <p className="mt-2 text-gray-600">Gérez les modèles d'emails automatiques et envoyez des notifications push aux utilisateurs.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Envoyer une Notification Push</h3>
          <form onSubmit={handleSendNotification} className="space-y-4">
              <div>
                  <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Destinataire</label>
                  <select id="recipient" value={notificationRecipient} onChange={e => setNotificationRecipient(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md">
                      <option value="all">Tous les utilisateurs ({users.length})</option>
                      {users.map(user => (
                          <option key={user.id} value={user.email}>{user.name} ({user.email})</option>
                      ))}
                  </select>
              </div>
              <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre de la notification</label>
                  <input type="text" id="title" value={notificationTitle} onChange={e => setNotificationTitle(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500" />
              </div>
              <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" value={notificationMessage} onChange={e => setNotificationMessage(e.target.value)} required rows={4} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500" />
              </div>
              <div className="text-right">
                  <button type="submit" disabled={isSending || sendSuccess} className={`inline-flex items-center gap-2 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${sendSuccess ? 'bg-green-600' : 'bg-cyan-600 hover:bg-cyan-700'} disabled:bg-gray-400`}>
                      {isSending ? <><Loader size={16} className="animate-spin"/> Envoi en cours...</> : (sendSuccess ? <><CheckCircle size={16}/> Envoyé !</> : <><Send size={16}/> Envoyer la notification</>)}
                  </button>
              </div>
          </form>
      </div>
      
      {(Object.keys(groupedTemplates) as (keyof typeof groupedTemplates)[]).map(groupKey => (
        <div key={groupKey} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{groupTitles[groupKey]}</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                    <th scope="col" className="px-4 py-3">Nom du modèle</th>
                    <th scope="col" className="px-4 py-3">Description</th>
                    <th scope="col" className="px-4 py-3 text-center">Statut</th>
                    <th scope="col" className="px-4 py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {groupedTemplates[groupKey].map(template => (
                    <tr key={template.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-4 py-4 font-medium text-gray-900">{template.name}</td>
                        <td className="px-4 py-4 text-xs max-w-xs">{template.description}</td>
                        <td className="px-4 py-4 text-center">
                        <button onClick={() => handleToggleEnabled(template)} className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${template.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {template.enabled ? <><Eye size={14} className="mr-1.5"/> Activé</> : <><EyeOff size={14} className="mr-1.5"/> Désactivé</>}
                        </button>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button onClick={() => setEditingTemplate(template)} className="p-2 text-cyan-600 hover:text-cyan-800" title="Modifier le modèle">
                              <Edit size={18} />
                          </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
      ))}

      {editingTemplate && (
          <EmailEditorModal 
              template={editingTemplate}
              onSave={handleSaveTemplate}
              onClose={() => setEditingTemplate(null)}
          />
      )}
    </div>
  );
};

export default EmailManagementView;