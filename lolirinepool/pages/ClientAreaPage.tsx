import React, { useState } from 'react';
import { LogOut, User, MapPin, Mail, Phone, ShoppingCart, Settings, Truck } from 'lucide-react';
import type { Order, ClientAreaPageProps, UserAccount } from '../types';
import { formatCurrency } from '../utils/formatting';
import GoBackButton from '../components/GoBackButton';
import ClientInfoEditor from '../components/ClientInfoEditor';

const getStatusClass = (status: Order['status']) => {
    switch (status) {
        case 'Complété': return 'bg-green-100 text-green-800';
        case 'En attente': return 'bg-yellow-100 text-yellow-800';
        case 'Annulé': return 'bg-red-100 text-red-800';
    }
};

const ClientAreaPage: React.FC<ClientAreaPageProps> = ({ onLogout, user, orders, onUpdateUser, goBack, canGoBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Filter orders for the current logged-in user
  const clientOrders = orders.filter(order => order.customerEmail === user.email);

  const handleSaveUser = (updatedUser: UserAccount) => {
    onUpdateUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 min-h-full">
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
                 <h1 className="text-3xl font-bold text-gray-800">Mon Espace Client</h1>
                 <button
                    onClick={onLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
                >
                    <LogOut size={16} />
                    Se déconnecter
                </button>
            </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {canGoBack && <GoBackButton onClick={goBack} className="mb-6" />}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Client Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img src={`https://i.pravatar.cc/150?u=${user.email}`} alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-cyan-200" />
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-500">Client de Piscine Pro</p>
            </div>
            
            {isEditing ? (
              <ClientInfoEditor 
                user={user}
                onSave={handleSaveUser}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center"><User size={20} className="mr-2 text-cyan-500" /> Mes Informations</h3>
                  <ul className="space-y-3 text-sm text-gray-600 break-words">
                      <li className="flex items-center"><Mail size={16} className="mr-3 text-gray-400 flex-shrink-0" /> {user.email}</li>
                      <li className="flex items-center"><Phone size={16} className="mr-3 text-gray-400 flex-shrink-0" /> {user.phone || 'Non renseigné'}</li>
                      <li className="flex items-start"><MapPin size={16} className="mr-3 mt-1 text-gray-400 flex-shrink-0" /> 
                        {user.shippingAddress ? `${user.shippingAddress.address}, ${user.shippingAddress.zip} ${user.shippingAddress.city}` : 'Adresse non renseignée'}
                      </li>
                  </ul>
                  <button onClick={() => setIsEditing(true)} className="mt-4 w-full text-sm text-cyan-600 font-semibold hover:text-cyan-700 flex items-center justify-center gap-2">
                      <Settings size={16} /> Modifier mes informations
                  </button>
              </div>
            )}
          </div>

          {/* Right Column: Order History */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center"><ShoppingCart size={20} className="mr-2 text-cyan-500" /> Historique de commandes</h3>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Commande</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Total</th>
                            <th scope="col" className="px-6 py-3">Statut</th>
                            <th scope="col" className="px-6 py-3">Suivi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientOrders.length > 0 ? clientOrders.map(order => (
                            <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{order.id}</th>
                                <td className="px-6 py-4">{new Date(order.date).toLocaleDateString('fr-FR')}</td>
                                <td className="px-6 py-4">
                                    <span className="font-semibold text-cyan-600">{formatCurrency(order.total)}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                 <td className="px-6 py-4">
                                    {order.trackingNumber ? (
                                        <a href="#" className="flex items-center gap-1 text-cyan-600 hover:underline font-semibold" onClick={(e) => e.preventDefault()}>
                                            <Truck size={14}/>
                                            <span>Suivre</span>
                                        </a>
                                    ) : (
                                        <span>N/A</span>
                                    )}
                                </td>
                            </tr>
                        )) : (
                           <tr>
                                <td colSpan={5} className="text-center py-8 text-gray-500">
                                    Vous n'avez aucune commande pour le moment.
                                </td>
                           </tr>
                        )}
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientAreaPage;