import React, { useState } from 'react';
import { PaymentMethod } from '../../types';
import { X } from 'lucide-react';

interface PaymentMethodEditModalProps {
  method: PaymentMethod;
  onSave: (method: PaymentMethod) => void;
  onClose: () => void;
}

const PaymentMethodEditModal: React.FC<PaymentMethodEditModalProps> = ({ method, onSave, onClose }) => {
  const [name, setName] = useState(method.name);
  const [configJson, setConfigJson] = useState(JSON.stringify(method.config, null, 2));
  const [error, setError] = useState('');

  const handleSave = () => {
    try {
      const parsedConfig = JSON.parse(configJson);
      setError('');
      onSave({
        ...method,
        name,
        config: parsedConfig,
      });
    } catch (e) {
      setError('Le format JSON de la configuration est invalide.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Configurer: {method.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div>
            <label htmlFor="methodName" className="block text-sm font-medium text-gray-700">Nom d'affichage</label>
            <input
              type="text"
              id="methodName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="configJson" className="block text-sm font-medium text-gray-700">Configuration (JSON)</label>
            <textarea
              id="configJson"
              value={configJson}
              onChange={(e) => setConfigJson(e.target.value)}
              rows={10}
              className={`mt-1 block w-full font-mono text-sm border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 ${error ? 'border-red-500' : ''}`}
              spellCheck="false"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            <p className="mt-2 text-xs text-gray-500">Modifiez les clés API, les détails du compte ou d'autres paramètres ici.</p>
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

export default PaymentMethodEditModal;
