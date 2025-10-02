import React, { useState } from 'react';
import { Invoice } from '../../types';
import { PlusCircle, CreditCard, Edit, Trash2 } from 'lucide-react';
import InvoiceEditor from './InvoiceEditor';
import { formatCurrency } from '../../utils/formatting';

interface BillingViewProps {
  invoices: Invoice[];
  onCreate: (newInvoice: Omit<Invoice, 'id'>) => void;
  onUpdate: (invoice: Invoice) => void;
  onDelete: (invoiceId: string) => void;
}

const BillingView: React.FC<BillingViewProps> = ({ invoices, onCreate, onUpdate, onDelete }) => {
    const [editingInvoice, setEditingInvoice] = useState<Invoice | 'new' | null>(null);

    const handleCreateNew = () => {
        setEditingInvoice('new');
    };

    const handleEdit = (invoice: Invoice) => {
        setEditingInvoice(invoice);
    };
    
    const handleDelete = (invoiceId: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
            onDelete(invoiceId);
        }
    };

    const handleSave = (invoiceData: Omit<Invoice, 'id'> | Invoice) => {
        if ('id' in invoiceData) {
            onUpdate(invoiceData);
        } else {
            onCreate(invoiceData);
        }
        setEditingInvoice(null);
    };

    if (editingInvoice) {
        return <InvoiceEditor invoice={editingInvoice === 'new' ? null : editingInvoice} onSave={handleSave} onClose={() => setEditingInvoice(null)} />;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <CreditCard size={24} className="mr-3" />
                    Facturation
                </h2>
                <button onClick={handleCreateNew} className="flex items-center gap-2 bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors">
                    <PlusCircle size={20} />
                    Créer une facture
                </button>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">N° Facture</th>
                            <th scope="col" className="px-6 py-3">Client</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Total TTC</th>
                            <th scope="col" className="px-6 py-3">Statut</th>
                            <th scope="col" className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map(invoice => {
                            const subtotal = invoice.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
                            const total = subtotal * (1 + (invoice.items[0]?.taxRate || 0.21));
                            const discountAmount = invoice.discount ? (invoice.discount.type === 'percentage' ? total * (invoice.discount.value / 100) : invoice.discount.value) : 0;
                            const finalTotal = total - discountAmount;
                            const isLocked = invoice.status === 'Paid' || invoice.status === 'Cancelled';

                            return (
                                <tr key={invoice.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{invoice.id}</td>
                                    <td className="px-6 py-4">{invoice.customerName}</td>
                                    <td className="px-6 py-4">{new Date(invoice.invoiceDate).toLocaleDateString('fr-FR')}</td>
                                    <td className="px-6 py-4 font-semibold text-cyan-600">{formatCurrency(finalTotal)}</td>
                                    <td className="px-6 py-4">{invoice.status}</td>
                                    <td className="px-6 py-4 text-center space-x-2">
                                        <button onClick={() => handleEdit(invoice)} className="p-2 text-cyan-600 hover:text-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed" title="Modifier" disabled={isLocked}>
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(invoice.id)} className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed" title="Supprimer" disabled={isLocked}>
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BillingView;
