import React, { useState } from 'react';
import { PurchaseOrder, Supplier, PurchaseOrderStatus } from '../../types';
import { FileText, Eye } from 'lucide-react';
import PurchaseOrderDetailModal from './PurchaseOrderDetailModal';

interface PurchaseOrderViewProps {
  purchaseOrders: PurchaseOrder[];
  onUpdatePurchaseOrder: (po: PurchaseOrder) => void;
  suppliers: Supplier[];
}

const getStatusClass = (status: PurchaseOrderStatus) => {
    switch (status) {
        case 'À envoyer': return 'bg-yellow-100 text-yellow-800';
        case 'Envoyé': return 'bg-blue-100 text-blue-800';
        case 'Expédié': return 'bg-green-100 text-green-800';
    }
};

const PurchaseOrderView: React.FC<PurchaseOrderViewProps> = ({ purchaseOrders, onUpdatePurchaseOrder, suppliers }) => {
    const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);

    const getSupplierName = (supplierId: string) => {
        return suppliers.find(s => s.id === supplierId)?.name || 'Inconnu';
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <FileText size={24} className="mr-3" />
                    Bons de Commande Fournisseurs
                </h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Bon de Comm.</th>
                            <th scope="col" className="px-6 py-3">Commande Client</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Fournisseur</th>
                            <th scope="col" className="px-6 py-3">Statut</th>
                            <th scope="col" className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseOrders.map(po => (
                            <tr key={po.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{po.id}</td>
                                <td className="px-6 py-4">{po.orderId}</td>
                                <td className="px-6 py-4">{new Date(po.createdAt).toLocaleDateString('fr-FR')}</td>
                                <td className="px-6 py-4">{getSupplierName(po.supplierId)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(po.status)}`}>
                                        {po.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button onClick={() => setSelectedPO(po)} className="p-2 text-cyan-600 hover:text-cyan-800" title="Voir le bon de commande">
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedPO && (
                <PurchaseOrderDetailModal
                    purchaseOrder={selectedPO}
                    supplier={suppliers.find(s => s.id === selectedPO.supplierId)}
                    onClose={() => setSelectedPO(null)}
                    onUpdateStatus={onUpdatePurchaseOrder}
                />
            )}
        </div>
    );
};

export default PurchaseOrderView;
