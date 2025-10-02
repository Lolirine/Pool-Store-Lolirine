import React from 'react';
import { PurchaseOrder, Supplier } from '../../types';
import { X, Truck, CheckCircle } from 'lucide-react';

interface PurchaseOrderDetailModalProps {
    purchaseOrder: PurchaseOrder;
    supplier?: Supplier;
    onClose: () => void;
    onUpdateStatus: (po: PurchaseOrder) => void;
}

const PurchaseOrderDetailModal: React.FC<PurchaseOrderDetailModalProps> = ({ purchaseOrder, supplier, onClose, onUpdateStatus }) => {
    
    const handleMarkAsSent = () => {
        onUpdateStatus({ ...purchaseOrder, status: 'Envoyé' });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Bon de Commande : {purchaseOrder.id}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <img 
                                src="https://lolirine-pool.odoo.com/web/image/website/1/logo/Lolirine%20Pool%20Store?unique=b561c22" 
                                alt="Lolirine Pool Store" 
                                className="h-16 mb-2"
                            />
                            <p className="text-sm font-semibold">Lolirine Pool Store</p>
                            <p className="text-xs text-gray-600">Rue Bois D'Esneux 110<br/>5021 Boninne (Namur), Belgique</p>
                        </div>
                        <div className="text-right">
                             <h3 className="text-2xl font-bold text-gray-800">BON DE COMMANDE</h3>
                             <p className="text-sm text-gray-500">Date: {new Date(purchaseOrder.createdAt).toLocaleDateString('fr-FR')}</p>
                             <p className="text-sm text-gray-500">Réf. Commande Client: {purchaseOrder.orderId}</p>
                        </div>
                    </div>

                    {/* Addresses */}
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-700 mb-2">Fournisseur</h4>
                            <p className="font-bold">{supplier?.name || 'N/A'}</p>
                            <p className="text-sm text-gray-600">{supplier?.email}</p>
                            <p className="text-sm text-gray-600">{supplier?.phone}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-700 mb-2 flex items-center"><Truck size={16} className="mr-2"/> Livrer à (Client Final)</h4>
                             <p className="font-bold">{purchaseOrder.customerShippingAddress.address}</p>
                             <p className="text-sm text-gray-600">{purchaseOrder.customerShippingAddress.zip} {purchaseOrder.customerShippingAddress.city}</p>
                        </div>
                    </div>
                    
                    {/* Items Table */}
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-100 text-sm font-semibold">
                                <th className="p-2">Référence</th>
                                <th className="p-2 w-1/2">Produit</th>
                                <th className="p-2 text-center">Quantité</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchaseOrder.items.map(item => (
                                <tr key={item.productId} className="border-b">
                                    <td className="p-2 text-xs text-gray-600">{item.productId}</td>
                                    <td className="p-2 font-medium">{item.productName}</td>
                                    <td className="p-2 text-center font-bold">{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <p className="text-xs text-gray-500 mt-8">Merci de bien vouloir expédier les articles ci-dessus directement à l'adresse du client final. Veuillez nous notifier lorsque la commande sera expédiée et nous fournir le numéro de suivi.</p>

                </div>
                
                <div className="flex justify-end items-center p-4 border-t bg-gray-50">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                        Fermer
                    </button>
                    {purchaseOrder.status === 'À envoyer' && (
                        <button onClick={handleMarkAsSent} className="ml-3 px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-md shadow-sm hover:bg-cyan-700 flex items-center gap-2">
                           <CheckCircle size={16}/> Marquer comme envoyé
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PurchaseOrderDetailModal;
