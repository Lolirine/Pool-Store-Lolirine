import React, { useState } from 'react';
import { Order, Supplier, SupplierStatus, OrderManagementViewProps } from '../../types';
import { Briefcase, Eye } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';
import OrderDetailModal from './OrderDetailModal';
import { EmailService } from '../../utils/emailService';

const getStatusClass = (status: Order['status']) => {
    switch(status) {
      case 'Complété': return 'bg-green-100 text-green-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Annulé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
};

const getSupplierStatusClass = (status?: SupplierStatus) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    switch (status) {
        case 'En attente': return 'bg-yellow-100 text-yellow-800';
        case 'Envoyé au fournisseur': return 'bg-blue-100 text-blue-800';
        case 'Expédié': return 'bg-green-100 text-green-800';
    }
};

const OrderManagementView: React.FC<OrderManagementViewProps> = ({ orders, suppliers, onUpdateOrder, emailService, purchaseOrders, onCreatePurchaseOrder, onUpdatePurchaseOrder }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
        <Briefcase size={24} className="mr-3" />
        Commandes Clients
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Commande</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Client</th>
              <th scope="col" className="px-6 py-3">Total</th>
              <th scope="col" className="px-6 py-3">Statut</th>
              <th scope="col" className="px-6 py-3">Statut Fournisseur</th>
              <th scope="col" className="px-6 py-3 text-center">Détails</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4">{new Date(order.date).toLocaleDateString('fr-FR')}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{formatCurrency(order.total)}</td>
                <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(order.status)}`}>
                        {order.status}
                    </span>
                </td>
                <td className="px-6 py-4">
                    {order.isDropshippingOrder && (
                         <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSupplierStatusClass(order.supplierStatus)}`}>
                            {order.supplierStatus}
                        </span>
                    )}
                </td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => setSelectedOrder(order)} className="p-2 text-cyan-600 hover:text-cyan-800" title="Voir les détails">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          suppliers={suppliers}
          onClose={() => setSelectedOrder(null)}
          onUpdateOrder={onUpdateOrder}
          emailService={emailService}
          purchaseOrders={purchaseOrders}
          onCreatePurchaseOrder={onCreatePurchaseOrder}
          onUpdatePurchaseOrder={onUpdatePurchaseOrder}
        />
      )}
    </div>
  );
};

export default OrderManagementView;