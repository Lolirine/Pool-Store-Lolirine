import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CategoryActionModalProps {
  action: 'add' | 'rename' | 'duplicate';
  categoryPath: string; // The parent path for 'add', the target path for 'rename'/'duplicate'
  onClose: () => void;
  onSave: (newName: string) => void;
}

const CategoryActionModal: React.FC<CategoryActionModalProps> = ({ action, categoryPath, onClose, onSave }) => {
  const [name, setName] = useState('');

  const modalTitle = {
    add: `Ajouter une sous-catégorie à "${categoryPath || 'Racine'}"`,
    rename: `Renommer la catégorie "${categoryPath.split(' - ').pop()}"`,
    duplicate: `Dupliquer la catégorie "${categoryPath}"`,
  };

  const label = {
    add: 'Nom de la nouvelle sous-catégorie',
    rename: 'Nouveau nom de la catégorie',
    duplicate: 'Nom de la nouvelle catégorie dupliquée',
  };

  const buttonText = {
    add: 'Ajouter',
    rename: 'Renommer',
    duplicate: 'Dupliquer',
  };

  useEffect(() => {
    if (action === 'rename') {
      setName(categoryPath.split(' - ').pop() || '');
    }
  }, [action, categoryPath]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">{modalTitle[action]}</h2>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">{label[action]}</label>
              <input
                type="text"
                id="categoryName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            {action === 'duplicate' && (
                <p className="text-xs text-gray-500">
                    Cela créera une nouvelle catégorie avec ce nom et y copiera tous les produits de la catégorie source.
                </p>
            )}
          </div>
          <div className="flex justify-end items-center p-4 border-t bg-gray-50">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
              Annuler
            </button>
            <button type="submit" className="ml-3 px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-md shadow-sm hover:bg-cyan-700">
              {buttonText[action]}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryActionModal;