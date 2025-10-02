import React from 'react';
import { OrderConfirmationPageProps } from '../types';
import { formatCurrency } from '../utils/formatting';
import { CheckCircle } from 'lucide-react';

const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ order }) => {
    
    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800">Merci pour votre commande !</h1>
                    <p className="text-gray-600 mt-2">Votre commande a été passée avec succès. Un e-mail de confirmation vous a été envoyé.</p>
                    
                    <div className="text-left bg-gray-50 p-6 rounded-lg mt-8 border">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Récapitulatif de la commande</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-500">N° de commande :</span>
                                <span className="font-semibold text-gray-800">{order.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-500">Date :</span>
                                <span className="font-semibold text-gray-800">{new Date(order.date).toLocaleDateString('fr-FR')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-500">Total payé :</span>
                                <span className="font-semibold text-cyan-600">{formatCurrency(order.total)}</span>
                            </div>
                             <div className="border-t pt-4">
                                <h3 className="font-semibold text-gray-800 mb-2">Adresse de livraison</h3>
                                <p className="text-sm text-gray-600">
                                    {order.shippingAddress}<br />
                                    {order.shippingZip} {order.shippingCity}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <h3 className="font-semibold text-gray-800 mb-4">Articles commandés</h3>
                        <div className="space-y-4 text-left">
                            {order.items.map(item => (
                                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-md">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800">{item.name}</p>
                                        <p className="text-sm text-gray-500">Qté: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold text-cyan-600">{formatCurrency(item.price * (1 + item.tvaRate) * item.quantity)} <span className="text-xs font-normal text-gray-500">TVAC</span></p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;