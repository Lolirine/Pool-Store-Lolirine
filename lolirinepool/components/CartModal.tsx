import React from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { CartModalProps } from '../types';
import { formatCurrency } from '../utils/formatting';

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart, navigateTo }) => {
    
    const totalHT = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalTVA = cartItems.reduce((sum, item) => sum + (item.price * item.tvaRate * item.quantity), 0);
    const totalTTC = totalHT + totalTVA;

    const handleCheckout = () => {
        onClose();
        navigateTo('checkout');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity duration-300" onClick={onClose}>
            <div 
                className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col transform transition-transform duration-300 translate-x-0"
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="cart-title"
            >
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 id="cart-title" className="text-2xl font-bold text-gray-800">Votre Panier</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
                        <X size={28} />
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-gray-500">Votre panier est vide.</p>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-start gap-4 border-b pb-4">
                                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-sm text-cyan-600">{formatCurrency(item.price * (1 + item.tvaRate))} <span className="text-xs text-gray-500">TVAC</span></p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 border rounded-md hover:bg-gray-100"><Minus size={14} /></button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 border rounded-md hover:bg-gray-100"><Plus size={14} /></button>
                                    </div>
                                </div>
                                <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {cartItems.length > 0 && (
                    <div className="p-6 border-t bg-gray-50">
                        <div className="space-y-2 mb-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total HT:</span>
                                <span className="font-medium text-cyan-600">{formatCurrency(totalHT)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">dont TVA ({cartItems[0]?.tvaRate * 100}%):</span>
                                <span className="font-medium text-cyan-600">{formatCurrency(totalTVA)}</span>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span className="font-bold text-gray-900">Total TTC:</span>
                                <span className="font-bold text-cyan-600">{formatCurrency(totalTTC)}</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <button onClick={handleCheckout} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition-colors">
                                Passer la commande
                            </button>
                            <button onClick={onClearCart} className="w-full text-sm text-gray-500 hover:text-red-600 transition-colors">
                                Vider le panier
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;