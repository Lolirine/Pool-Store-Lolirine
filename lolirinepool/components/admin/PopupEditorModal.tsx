import React, { useState, useEffect } from 'react';
import { PopupConfig } from '../../types';
import { X } from 'lucide-react';

interface PopupEditorModalProps {
  popup: PopupConfig | null;
  onClose: () => void;
  onSave: (popupData: Omit<PopupConfig, 'id'> | PopupConfig) => void;
}

const PopupEditorModal: React.FC<PopupEditorModalProps> = ({ popup, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<PopupConfig, 'id' | 'displayOn'> & { displayOn: string; backgroundColor?: string }>({
    title: '',
    content: '',
    imageUrl: '',
    buttonText: '',
    buttonLink: '',
    isEnabled: true,
    displayOn: 'all',
    frequency: 'once_per_session',
    backgroundColor: '#ffffff',
  });

  useEffect(() => {
    if (popup) {
      setFormData({
          ...popup,
          displayOn: popup.displayOn.join(', '),
          backgroundColor: popup.backgroundColor || '#ffffff',
      });
    }
  }, [popup]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
     if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPopupData = {
        ...formData,
        displayOn: formData.displayOn.split(',').map(s => s.trim()).filter(Boolean),
    };

    if (popup) {
      onSave({ ...popup, ...finalPopupData });
    } else {
      onSave(finalPopupData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              {popup ? 'Modifier le Pop-up' : 'Créer un Pop-up'}
            </h2>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
            </div>
             <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenu (HTML autorisé)</label>
              <textarea name="content" id="content" value={formData.content} onChange={handleChange} required rows={4} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
            </div>
             <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL de l'image (optionnel)</label>
              <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700">Texte du bouton</label>
                    <input type="text" name="buttonText" id="buttonText" value={formData.buttonText} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
                </div>
                <div>
                    <label htmlFor="buttonLink" className="block text-sm font-medium text-gray-700">Lien du bouton</label>
                    <input type="text" name="buttonLink" id="buttonLink" value={formData.buttonLink} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
                </div>
            </div>
            <div>
              <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700">Couleur de fond</label>
              <input type="color" name="backgroundColor" id="backgroundColor" value={formData.backgroundColor || '#ffffff'} onChange={handleChange} className="mt-1 block w-full h-10 p-1 border border-gray-300 rounded-md shadow-sm cursor-pointer"/>
            </div>
            <div>
                <label htmlFor="displayOn" className="block text-sm font-medium text-gray-700">Afficher sur</label>
                <textarea name="displayOn" id="displayOn" value={formData.displayOn} onChange={handleChange} required rows={2} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500" placeholder="all, home, shop, product:ID_PRODUIT..."/>
                <p className="text-xs text-gray-500 mt-1">Séparez les valeurs par une virgule. Utilisez 'all' pour toutes les pages.</p>
            </div>
            <div className="flex items-center">
                <input type="checkbox" name="isEnabled" id="isEnabled" checked={formData.isEnabled} onChange={handleChange} className="h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"/>
                <label htmlFor="isEnabled" className="ml-2 block text-sm font-medium text-gray-900">Activé</label>
            </div>
          </div>
          <div className="flex justify-end items-center p-4 border-t bg-gray-50">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
              Annuler
            </button>
            <button type="submit" className="ml-3 px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-md shadow-sm hover:bg-cyan-700">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupEditorModal;