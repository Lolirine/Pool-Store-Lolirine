import React, { useState } from 'react';
import { Order, Supplier, CartItem, OrderDetailModalProps, PurchaseOrder } from '../../types';
import { X, User, MapPin, Package, DollarSign, Truck, CheckCircle, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';
import { EmailService } from '../../utils/emailService';
import SupplierInvoiceModal from './SupplierInvoiceModal';

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, suppliers, onClose, onUpdateOrder, emailService, purchaseOrders, onCreatePurchaseOrder, onUpdatePurchaseOrder }) => {
    const [generatingInvoiceFor, setGeneratingInvoiceFor] = useState<PurchaseOrder | null>(null);

    const isLocked = order.status === 'Complété' || order.status === 'Annulé';

    // FIX: Typed the accumulator `acc` to resolve the generic type argument error on `.reduce`.
    const itemsBySupplier = order.items
        .filter(item => item.supplierId)
        .reduce((acc: Record<string, CartItem[]>, item) => {
            const supplierId = item.supplierId!;
            if (!acc[supplierId]) {
                acc[supplierId] = [];
            }
            acc[supplierId].push(item);
            return acc;
        }, {});
    
    const handleGeneratePO = (supplierId: string, items: CartItem[]) => {
        let po = purchaseOrders.find(p => p.orderId === order.id && p.supplierId === supplierId);
    
        if (!po) {
            po = onCreatePurchaseOrder({
                orderId: order.id,
                supplierId: supplierId,
                customerName: order.customer,
                customerShippingAddress: {
                    address: order.shippingAddress,
                    city: order.shippingCity,
                    zip: order.shippingZip,
                },
                items: items.map(item => ({
                    productId: item.id,
                    productName: item.name,
                    quantity: item.quantity,
                    supplierPrice: item.supplierPrice,
                })),
            });
        }
    
        setGeneratingInvoiceFor(po);
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-bold text-gray-800">Détails de la commande {order.id}</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {isLocked && (
                            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                                <p className="font-bold flex items-center"><AlertTriangle size={20} className="mr-2"/> Commande finalisée</p>
                                <p>Cette commande est {order.status.toLowerCase()} et ne peut plus être modifiée.</p>
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Customer Info */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-700 mb-2 flex items-center"><User size={16} className="mr-2"/> Client</h3>
                                <p className="font-bold">{order.customer}</p>
                                <p className="text-sm text-gray-600">{order.customerEmail}</p>
                            </div>
                            {/* Shipping Info */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-700 mb-2 flex items-center"><MapPin size={16} className="mr-2"/> Adresse de livraison</h3>
                                <p className="font-bold">{order.shippingAddress}</p>
                                <p className="text-sm text-gray-600">{order.shippingZip} {order.shippingCity}</p>
                            </div>
                        </div>

                        {/* Items */}
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-2 flex items-center"><Package size={16} className="mr-2"/> Articles</h3>
                            <div className="border rounded-lg overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-2 text-left">Produit</th>
                                            <th className="p-2 text-center">Qté</th>
                                            <th className="p-2 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items.map(item => (
                                            <tr key={item.id} className="border-b">
                                                <td className="p-2 flex items-center gap-2">
                                                    <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-cover rounded"/>
                                                    <span>{item.name}</span>
                                                </td>
                                                <td className="p-2 text-center">{item.quantity}</td>
                                                <td className="p-2 text-right font-medium text-cyan-600">{formatCurrency(item.price * item.quantity * (1 + item.tvaRate))}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        {/* Totals */}
                         <div className="flex justify-end">
                            <div className="w-full max-w-xs space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Sous-total</span>
                                    <span className="font-semibold text-cyan-600">{formatCurrency(order.total / 1.21)}</span>
                                </div>
                                 <div className="flex justify-between">
                                    <span className="text-gray-600">TVA (21%)</span>
                                    <span className="font-semibold text-cyan-600">{formatCurrency(order.total - (order.total / 1.21))}</span>
                                </div>
                                 <div className="flex justify-between font-bold text-lg border-t pt-2">
                                    <span>Total</span>
                                    <span className="text-cyan-600">{formatCurrency(order.total)}</span>
                                </div>
                            </div>
                         </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 border-t bg-gray-50">
                        <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                            Fermer
                        </button>
                        {!isLocked && Object.keys(itemsBySupplier).length > 0 && (
                            <div className="flex items-center gap-2">
                                {/* FIX: Replaced `Object.entries` with `Object.keys` to fix type inference issue on `items`. */}
                                {Object.keys(itemsBySupplier).map((supplierId) => {
                                    const items = itemsBySupplier[supplierId];
                                    const supplier = suppliers.find(s => s.id === supplierId);
                                    if (!supplier) return null;

                                    const existingPO = purchaseOrders.find(p => p.orderId === order.id && p.supplierId === supplierId);

                                    if (existingPO && existingPO.status !== 'À envoyer') {
                                        return (
                                            <div key={supplierId} className="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm flex items-center gap-2">
                                                <CheckCircle size={16}/> Commande {existingPO.status.toLowerCase()} à {supplier.name}
                                            </div>
                                        )
                                    }
                                    
                                    return (
                                        <button 
                                            key={supplierId}
                                            onClick={() => handleGeneratePO(supplierId, items)}
                                            className="px-3 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md shadow-sm hover:bg-cyan-700 flex items-center gap-2"
                                            disabled={isLocked}
                                        >
                                           <Truck size={16}/> Générer la commande pour {supplier.name}
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {generatingInvoiceFor && (
                <SupplierInvoiceModal
                    purchaseOrder={generatingInvoiceFor}
                    supplier={suppliers.find(s => s.id === generatingInvoiceFor.supplierId)!}
                    onClose={() => setGeneratingInvoiceFor(null)}
                    onUpdatePurchaseOrder={onUpdatePurchaseOrder}
                    emailService={emailService}
                />
            )}
        </>
    );
};

export default OrderDetailModal;