import React, { useState, useEffect } from 'react';
import { Invoice, InvoiceItem, InvoiceDiscount } from '../../types';
import { X, Plus, Trash2, Printer, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';
import PaypalIcon from '../icons/PaypalIcon';
import StripeIcon from './StripeIcon';

interface InvoiceEditorProps {
    invoice: Invoice | null;
    onSave: (invoiceData: Omit<Invoice, 'id'> | Invoice) => void;
    onClose: () => void;
}

const defaultInvoiceItem: Omit<InvoiceItem, 'id'> = {
    description: '',
    quantity: 1,
    unitPrice: 0,
    taxRate: 0.21,
};

const InvoiceEditor: React.FC<InvoiceEditorProps> = ({ invoice, onSave, onClose }) => {
    const [editedInvoice, setEditedInvoice] = useState<Omit<Invoice, 'id'> | Invoice>(
        invoice || {
            status: 'Draft',
            customerName: '',
            customerAddress: '',
            invoiceDate: new Date().toISOString().split('T')[0],
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            items: [{ ...defaultInvoiceItem, id: `item-${Date.now()}` }],
            discount: undefined,
        }
    );
    
    const isLocked = 'id' in editedInvoice && (editedInvoice.status === 'Paid' || editedInvoice.status === 'Cancelled');

    const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // customerName is derived from the first line of customerAddress
        if (name === 'customerAddress') {
             setEditedInvoice(prev => ({ ...prev, [name]: value, customerName: value.split('\n')[0] }));
        } else {
             setEditedInvoice(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleItemChange = (itemId: string, field: keyof InvoiceItem, value: string | number) => {
        setEditedInvoice(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === itemId ? { ...item, [field]: value } : item
            ),
        }));
    };

    const addItem = () => {
        setEditedInvoice(prev => ({
            ...prev,
            items: [...prev.items, { ...defaultInvoiceItem, id: `item-${Date.now()}` }],
        }));
    };

    const removeItem = (itemId: string) => {
        setEditedInvoice(prev => ({
            ...prev,
            items: prev.items.length > 1 ? prev.items.filter(item => item.id !== itemId) : prev.items,
        }));
    };

    const handleDiscountChange = (field: keyof InvoiceDiscount, value: string | number) => {
        const currentDiscount = editedInvoice.discount || { type: 'percentage', value: 0 };
        setEditedInvoice(prev => ({
            ...prev,
            discount: { ...currentDiscount, [field]: value } as InvoiceDiscount,
        }));
    };

    const removeDiscount = () => {
        setEditedInvoice(prev => ({ ...prev, discount: undefined }));
    };
    
    const handlePrint = () => {
        window.print();
    };

    const subtotal = editedInvoice.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const taxTotal = editedInvoice.items.reduce((sum, item) => sum + item.unitPrice * item.quantity * item.taxRate, 0);
    const discountAmount = editedInvoice.discount ? (editedInvoice.discount.type === 'percentage' ? (subtotal + taxTotal) * (editedInvoice.discount.value / 100) : editedInvoice.discount.value) : 0;
    const total = subtotal + taxTotal - discountAmount;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md relative">
            <style>{`
                @media print {
                    body * { visibility: hidden; }
                    .invoice-print-area, .invoice-print-area * { visibility: visible; }
                    .invoice-print-area { position: absolute; left: 0; top: 0; width: 100%; }
                    .no-print { display: none; }
                }
            `}</style>
            
            {isLocked && (
                <div className="no-print bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                    <p className="font-bold flex items-center"><AlertTriangle size={20} className="mr-2"/> Facture finalisée</p>
                    <p>Cette facture est {editedInvoice.status.toLowerCase()}e et ne peut plus être modifiée.</p>
                </div>
            )}
            <div className="invoice-print-area">
                {/* Header */}
                <div className="flex justify-between items-start pb-4 border-b">
                    <div>
                        <img 
                            src="https://lolirine-pool.odoo.com/web/image/website/1/logo/Lolirine%20Pool%20Store?unique=b561c22" 
                            alt="Lolirine Pool Store" 
                            className="h-16"
                        />
                         <p className="text-cyan-700 font-semibold mt-2">Lolirine Pool Store</p>
                         <p className="text-xs text-gray-500">Rue Bois D'Esneux 110<br/>5021 Boninne (Namur), Belgique</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-3xl font-bold text-cyan-600">FACTURE</h2>
                        {'id' in editedInvoice && <p className="text-gray-500">{editedInvoice.id}</p>}
                    </div>
                </div>

                {/* Customer and Dates */}
                <div className="grid grid-cols-2 gap-8 my-6">
                    <div>
                        <h4 className="font-semibold text-gray-500 mb-1">Facturé à</h4>
                         <textarea
                            name="customerAddress"
                            value={editedInvoice.customerAddress}
                            onChange={handleHeaderChange}
                            rows={4}
                            className="w-full p-2 border rounded-md"
                            placeholder="Nom du client&#10;Adresse&#10;Ville, Code Postal&#10;Pays"
                            disabled={isLocked}
                        />
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-600">Date de facturation</label>
                                <input type="date" name="invoiceDate" value={editedInvoice.invoiceDate} onChange={handleHeaderChange} className="mt-1 w-full p-2 border rounded-md" disabled={isLocked} />
                            </div>
                             <div>
                                <label className="block text-sm font-semibold text-gray-600">Date d'échéance</label>
                                <input type="date" name="dueDate" value={editedInvoice.dueDate} onChange={handleHeaderChange} className="mt-1 w-full p-2 border rounded-md" disabled={isLocked} />
                            </div>
                             <div className="col-span-2">
                                <label className="block text-sm font-semibold text-gray-600">Source / Réf.</label>
                                <input type="text" name="source" value={editedInvoice.source || ''} onChange={handleHeaderChange} className="mt-1 w-full p-2 border rounded-md" disabled={isLocked} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-cyan-600 text-white">
                            <th className="p-2 w-1/2">Description</th>
                            <th className="p-2 text-right">Quantité</th>
                            <th className="p-2 text-right">Prix Unitaire</th>
                            <th className="p-2 text-right">Taxes</th>
                            <th className="p-2 text-right">Montant</th>
                            <th className="p-2 no-print"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {editedInvoice.items.map(item => (
                            <tr key={item.id} className="border-b">
                                <td className="p-2"><textarea value={item.description} onChange={e => handleItemChange(item.id, 'description', e.target.value)} rows={3} className="w-full p-1 border rounded-md" disabled={isLocked}/></td>
                                <td className="p-2 text-right"><input type="number" value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)} className="w-20 text-right p-1 border rounded-md" disabled={isLocked}/></td>
                                <td className="p-2 text-right"><input type="number" step="0.01" value={item.unitPrice} onChange={e => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)} className="w-24 text-right p-1 border rounded-md" disabled={isLocked}/></td>
                                <td className="p-2 text-right">21%</td>
                                <td className="p-2 text-right font-semibold text-cyan-600">{formatCurrency(item.quantity * item.unitPrice)}</td>
                                <td className="p-2 no-print"><button disabled={isLocked} onClick={() => removeItem(item.id)} className="p-1 text-red-500 disabled:opacity-50"><Trash2 size={16}/></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={addItem} className="no-print mt-2 flex items-center gap-2 text-cyan-600 font-semibold text-sm hover:underline" disabled={isLocked}><Plus size={16}/> Ajouter une ligne</button>
                
                {/* Totals */}
                <div className="flex justify-end mt-6">
                    <div className="w-full max-w-sm space-y-2">
                        <div className="flex justify-between p-2">
                            <span>Montant hors taxes</span>
                            <span className="font-semibold text-cyan-600">{formatCurrency(subtotal)}</span>
                        </div>
                        
                        <div className="flex justify-between p-2">
                            <span>TVA 21%</span>
                            <span className="font-semibold text-cyan-600">{formatCurrency(taxTotal)}</span>
                        </div>
                        {editedInvoice.discount && (
                            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                <div className="flex items-center gap-2">
                                    <span className="no-print"><button disabled={isLocked} onClick={removeDiscount} className="p-1 text-red-500 disabled:opacity-50"><Trash2 size={14}/></button></span>
                                    <span>Remise</span>
                                    <select disabled={isLocked} value={editedInvoice.discount.type} onChange={e => handleDiscountChange('type', e.target.value)} className="no-print p-1 border rounded-md text-xs">
                                        <option value="percentage">%</option>
                                        <option value="fixed">€</option>
                                    </select>
                                    <input disabled={isLocked} type="number" step="0.01" value={editedInvoice.discount.value} onChange={e => handleDiscountChange('value', parseFloat(e.target.value) || 0)} className="no-print w-16 text-right p-1 border rounded-md text-xs"/>
                                </div>
                                <span className="font-semibold text-cyan-600">-{formatCurrency(discountAmount)}</span>
                            </div>
                        )}
                         {!editedInvoice.discount && (
                            <div className="text-right">
                                <button disabled={isLocked} onClick={() => setEditedInvoice(prev => ({...prev, discount: { type: 'percentage', value: 0 }}))} className="no-print text-cyan-600 font-semibold text-xs hover:underline disabled:opacity-50"><Plus size={12} className="inline"/> Ajouter une remise</button>
                            </div>
                         )}
                        <div className="flex justify-between p-3 bg-cyan-600 text-white rounded-md font-bold text-lg">
                            <span>Total</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Information */}
                <div className="mt-12 pt-6 border-t print:mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Modalités de paiement</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2">
                        {/* Bank Transfer */}
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Paiement par virement</h4>
                            <div className="text-sm space-y-1 bg-gray-50 p-4 rounded-md border">
                                <p><span className="font-semibold text-gray-600">Bénéficiaire:</span> Lolirine Pool Store</p>
                                <p><span className="font-semibold text-gray-600">IBAN:</span> BE07 7320 5208 0866</p>
                                <p><span className="font-semibold text-gray-600">BIC:</span> CREGBEBB</p>
                                {'id' in editedInvoice && <p><span className="font-semibold text-gray-600">Communication:</span> {`Facture ${editedInvoice.id}`}</p>}
                            </div>
                        </div>
                        
                        {/* Online & QR */}
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Paiement en ligne</h4>
                            <div className="flex items-center gap-6">
                                <div className="text-center flex-shrink-0">
                                    <img 
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=Facture ${'id' in editedInvoice ? editedInvoice.id : ''} - Montant: ${total.toFixed(2)} EUR`}
                                        alt="QR Code Bancontact"
                                        className="w-28 h-28"
                                    />
                                    <p className="text-xs font-semibold mt-1">Bancontact</p>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-sm text-gray-600">Payez rapidement via Stripe ou PayPal (lien de paiement à venir).</p>
                                    <div className="flex items-center gap-3">
                                        <StripeIcon className="h-8" />
                                        <PaypalIcon className="h-8" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Footer */}
                 <div className="text-center text-xs text-gray-500 mt-12 pt-4 border-t print:mt-8">
                    <p>Email: info@lolirinepoolstore.be | Site: www.lolirinepoolstore.be | TVA: BE 0650891 279</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center p-4 mt-6 border-t bg-gray-50 no-print">
                <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                    <Printer size={16} />
                    Imprimer / Exporter en PDF
                </button>
                <div>
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                        Annuler
                    </button>
                    {!isLocked && (
                        <button onClick={() => onSave(editedInvoice)} className="ml-3 px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-md shadow-sm hover:bg-cyan-700">
                            Enregistrer la facture
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InvoiceEditor;
