import React, { useState } from 'react';
import { PopupConfig } from '../../types';
import { MessageSquare, PlusCircle, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import PopupEditorModal from './PopupEditorModal';

interface PopupManagementViewProps {
  popups: PopupConfig[];
  onCreate: (popupData: Omit<PopupConfig, 'id'>) => void;
  onUpdate: (popup: PopupConfig) => void;
  onDelete: (popupId: string) => void;
}

const PopupManagementView: React.FC<PopupManagementViewProps> = ({ popups, onCreate, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPopup, setEditingPopup] = useState<PopupConfig | null>(null);

  const handleOpenCreateModal = () => {
    setEditingPopup(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (popup: PopupConfig) => {
    setEditingPopup(popup);
    setIsModalOpen(true);
  };

  const handleSave = (popupData: Omit<PopupConfig, 'id'> | PopupConfig) => {
    if ('id' in popupData) {
      onUpdate(popupData);
    } else {
      onCreate(popupData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (popupId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce pop-up ?')) {
      onDelete(popupId);
    }
  };
  
  const handleToggleEnabled = (popup: PopupConfig) => {
    onUpdate({ ...popup, isEnabled: !popup.isEnabled });
  };
  
  const formatDisplayOn = (displayOn: string[]) => {
    if (displayOn.includes('all')) return 'Tout le site';
    if (displayOn.length > 2) return `${displayOn.slice(0, 2).join(', ')}...`;
    return displayOn.join(', ');
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <MessageSquare size={24} className="mr-3" />
          Gestion des Pop-ups Promotionnels
        </h2>
        <button onClick={handleOpenCreateModal} className="flex items-center gap-2 bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors">
          <PlusCircle size={20} />
          Créer un Pop-up
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Titre</th>
              <th scope="col" className="px-6 py-3">Ciblage</th>
              <th scope="col" className="px-6 py-3 text-center">Statut</th>
              <th scope="col" className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {popups.map(popup => (
              <tr key={popup.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{popup.title}</td>
                <td className="px-6 py-4 font-mono text-xs">{formatDisplayOn(popup.displayOn)}</td>
                <td className="px-6 py-4 text-center">
                    <button onClick={() => handleToggleEnabled(popup)} className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${popup.isEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {popup.isEnabled ? <><Eye size={14} className="mr-1.5"/> Activé</> : <><EyeOff size={14} className="mr-1.5"/> Désactivé</>}
                    </button>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button onClick={() => handleOpenEditModal(popup)} className="p-2 text-cyan-600 hover:text-cyan-800" title="Modifier">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(popup.id)} className="p-2 text-red-500 hover:text-red-700" title="Supprimer">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <PopupEditorModal
          popup={editingPopup}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default PopupManagementView;
