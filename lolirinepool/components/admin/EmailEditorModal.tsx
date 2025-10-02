import React, { useState } from 'react';
import { EmailTemplate } from '../../types';
import { X } from 'lucide-react';

interface EmailEditorModalProps {
  template: EmailTemplate;
  onSave: (template: EmailTemplate) => void;
  onClose: () => void;
}

const EmailEditorModal: React.FC<EmailEditorModalProps> = ({ template, onSave, onClose }) => {
  const [subject, setSubject] = useState(template.subject);
  const [body, setBody] = useState(template.body);

  const handleSave = () => {
    onSave({ ...template, subject, body });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Modifier: {template.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Sujet de l'email</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700">Contenu de l'email (HTML autorisé)</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={15}
              className="mt-1 block w-full font-mono text-sm border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
              spellCheck="false"
            />
          </div>
           <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Variables disponibles</h4>
              <div className="flex flex-wrap gap-2">
                {template.placeholders.map(p => (
                    <code key={p} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{p}</code>
                ))}
              </div>
            </div>
        </div>
        <div className="flex justify-end items-center p-4 border-t bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
            Annuler
          </button>
          <button onClick={handleSave} className="ml-3 px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-md shadow-sm hover:bg-cyan-700">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailEditorModal;
