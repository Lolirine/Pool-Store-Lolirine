import React, { useRef } from 'react';
import { PurchaseOrder, Supplier, SupplierInvoiceModalProps } from '../../types';
import { X, Truck, Send, Printer } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';
import { EmailService } from '../../utils/emailService';

const SupplierInvoiceModal: React.FC<SupplierInvoiceModalProps> = ({ purchaseOrder, supplier, onClose, onUpdatePurchaseOrder, emailService }) => {
    const invoiceRef = useRef<HTMLDivElement>(null);

    const handleSendEmail = () => {
        if (!invoiceRef.current) return;
        
        const invoiceBody = invoiceRef.current.innerHTML;

        emailService.send('supplier_invoice_order', {
            supplierName: supplier.name,
            orderId: purchaseOrder.orderId,
            invoiceBody,
            email: supplier.email // Recipient
        });

        onUpdatePurchaseOrder({ ...purchaseOrder, status: 'Envoyé' });
        alert(`Email de commande envoyé à ${supplier.name}.`);
        onClose();
    };
    
    const handlePrint = () => {
        if (!invoiceRef.current) return;
        const printWindow = window.open('', '', 'height=800,width=800');
        if (printWindow) {
            printWindow.document.write('<html><head><title>Commande Fournisseur</title>');
            printWindow.document.write('<script src="https://cdn.tailwindcss.com"><\/script>');
            printWindow.document.write('</head><body class="p-8">');
            printWindow.document.write(invoiceRef.current.innerHTML);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 250);
        }
    };
    
    const totalHT = purchaseOrder.items.reduce((sum, item) => sum + (item.supplierPrice || 0) * item.quantity, 0);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[51] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Générer la commande pour : {supplier.name}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
                    <div ref={invoiceRef} className="bg-white p-8 shadow-lg">
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
                                <h3 className="text-2xl font-bold text-gray-800">COMMANDE FOURNISSEUR</h3>
                                <p className="text-sm text-gray-500">Date: {new Date(purchaseOrder.createdAt).toLocaleDateString('fr-FR')}</p>
                                <p className="text-sm text-gray-500">Réf. Commande Client: {purchaseOrder.orderId}</p>
                            </div>
                        </div>

                        {/* Addresses */}
                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div className=" p-4 rounded-lg border">
                                <h4 className="font-semibold text-gray-700 mb-2">Fournisseur</h4>
                                <p className="font-bold">{supplier?.name || 'N/A'}</p>
                                <p className="text-sm text-gray-600">{supplier?.email}</p>
                                <p className="text-sm text-gray-600">{supplier?.phone}</p>
                            </div>
                            <div className="p-4 rounded-lg border bg-cyan-50">
                                <h4 className="font-semibold text-gray-700 mb-2 flex items-center"><Truck size={16} className="mr-2"/> Livrer à (Client Final)</h4>
                                <p className="font-bold">{purchaseOrder.customerName}</p>
                                <p className="text-sm font-bold">{purchaseOrder.customerShippingAddress.address}</p>
                                <p className="text-sm text-gray-600">{purchaseOrder.customerShippingAddress.zip} {purchaseOrder.customerShippingAddress.city}</p>
                            </div>
                        </div>
                        
                        {/* Items Table */}
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-gray-100 font-semibold">
                                    <th className="p-2">Référence</th>
                                    <th className="p-2 w-1/2">Produit</th>
                                    <th className="p-2 text-center">Quantité</th>
                                    <th className="p-2 text-right">Prix Achat HT</th>
                                    <th className="p-2 text-right">Total HT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchaseOrder.items.map(item => (
                                    <tr key={item.productId} className="border-b">
                                        <td className="p-2 text-xs text-gray-600">{item.productId}</td>
                                        <td className="p-2 font-medium">{item.productName}</td>
                                        <td className="p-2 text-center font-bold">{item.quantity}</td>
                                        <td className="p-2 text-right">{formatCurrency(item.supplierPrice || 0)}</td>
                                        <td className="p-2 text-right font-medium">{formatCurrency((item.supplierPrice || 0) * item.quantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="font-bold">
                                    <td colSpan={4} className="p-2 text-right">Total HT</td>
                                    <td className="p-2 text-right">{formatCurrency(totalHT)}</td>
                                </tr>
                            </tfoot>
                        </table>
                        
                        <p className="text-xs text-gray-500 mt-8">Note : Les prix affichés sont les prix d'achat HT. Cette commande est à expédier à l'adresse du client final.</p>
                    </div>
                </div>

                <div className="flex justify-between items-center p-4 border-t bg-gray-100">
                    <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                        <Printer size={16} /> Imprimer
                    </button>
                    <div>
                        <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                            Annuler
                        </button>
                        <button onClick={handleSendEmail} className="ml-3 px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-md shadow-sm hover:bg-cyan-700 flex items-center gap-2">
                           <Send size={16}/> Envoyer par email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierInvoiceModal;