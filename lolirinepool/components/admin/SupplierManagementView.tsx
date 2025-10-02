import React, { useState } from 'react';
import { Supplier } from '../../types';
import { Contact, PlusCircle, Edit, Trash2 } from 'lucide-react';
import SupplierEditModal from './SupplierEditModal';

interface SupplierManagementViewProps {
  suppliers: Supplier[];
  onCreate: (newSupplier: Omit<Supplier, 'id'>) => void;
  onUpdate: (supplier: Supplier) => void;
  onDelete: (supplierId: string) => void;
}

const SupplierManagementView: React.FC<SupplierManagementViewProps> = ({ suppliers, onCreate, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  const handleOpenCreateModal = () => {
    setEditingSupplier(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleSave = (supplierData: Omit<Supplier, 'id'> | Supplier) => {
    if ('id' in supplierData) {
      onUpdate(supplierData);
    } else {
      onCreate(supplierData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (supplierId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
      onDelete(supplierId);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Contact size={24} className="mr-3" />
          Gestion des Fournisseurs
        </h2>
        <button onClick={handleOpenCreateModal} className="flex items-center gap-2 bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors">
          <PlusCircle size={20} />
          Ajouter un fournisseur
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Nom</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Téléphone</th>
              <th scope="col" className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(supplier => (
              <tr key={supplier.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{supplier.name}</td>
                <td className="px-6 py-4">{supplier.email}</td>
                <td className="px-6 py-4">{supplier.phone}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button onClick={() => handleOpenEditModal(supplier)} className="p-2 text-cyan-600 hover:text-cyan-800" title="Modifier">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(supplier.id)} className="p-2 text-red-500 hover:text-red-700" title="Supprimer">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <SupplierEditModal
          supplier={editingSupplier}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default SupplierManagementView;