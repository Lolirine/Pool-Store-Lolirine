import React, { useState } from 'react';
import { PaymentMethod } from '../../types';
import { Briefcase, Edit, Eye, EyeOff } from 'lucide-react';
import PaymentMethodEditModal from './PaymentMethodEditModal';

interface PaymentMethodsViewProps {
  paymentMethods: PaymentMethod[];
  onUpdatePaymentMethod: (method: PaymentMethod) => void;
}

const PaymentMethodsView: React.FC<PaymentMethodsViewProps> = ({ paymentMethods, onUpdatePaymentMethod }) => {
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);

  const handleToggleEnabled = (method: PaymentMethod) => {
    onUpdatePaymentMethod({ ...method, enabled: !method.enabled });
  };
  
  const handleSave = (updatedMethod: PaymentMethod) => {
    onUpdatePaymentMethod(updatedMethod);
    setEditingMethod(null);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Briefcase size={24} className="mr-3" />
          Gestion des Méthodes de Paiement
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Méthode</th>
              <th scope="col" className="px-6 py-3">Type</th>
              <th scope="col" className="px-6 py-3 text-center">Statut</th>
              <th scope="col" className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentMethods.map(method => (
              <tr key={method.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                  {method.logoComponent && React.createElement(method.logoComponent, { className: 'h-6' })}
                  {method.logoUrl && <img src={method.logoUrl} alt={method.name} className="h-6"/>}
                  {method.name}
                </td>
                <td className="px-6 py-4 font-mono text-xs bg-gray-50 rounded-md">{method.type}</td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => handleToggleEnabled(method)} className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${method.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {method.enabled ? <><Eye size={14} className="mr-1.5"/> Activé</> : <><EyeOff size={14} className="mr-1.5"/> Désactivé</>}
                  </button>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button onClick={() => setEditingMethod(method)} className="p-2 text-cyan-600 hover:text-cyan-800" title="Modifier la configuration">
                    <Edit size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editingMethod && (
            <PaymentMethodEditModal 
                method={editingMethod}
                onSave={handleSave}
                onClose={() => setEditingMethod(null)}
            />
        )}
      </div>
    </div>
  );
};

export default PaymentMethodsView;
