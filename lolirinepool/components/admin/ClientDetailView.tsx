import React, { useState } from 'react';
import { UserAccount, Order, UserSegment, CommunicationEntry, Address } from '../../types';
import { ArrowLeft, User, ShoppingCart, MessageSquare, BarChart2, Save, X, Plus, Mail, Phone, Edit, Clock } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';

interface ClientDetailViewProps {
  user: UserAccount;
  orders: Order[];
  onUpdateUser: (user: UserAccount) => void;
  onBack: () => void;
}

const StatCard: React.FC<{ title: string; value: string | number; }> = ({ title, value }) => (
    <div className="bg-gray-100 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
);

const ClientDetailView: React.FC<ClientDetailViewProps> = ({ user, orders, onUpdateUser, onBack }) => {
    const [activeTab, setActiveTab] = useState<'info' | 'orders' | 'comms'>('info');
    const [editedUser, setEditedUser] = useState<UserAccount>(JSON.parse(JSON.stringify(user))); // Deep copy
    const [newComm, setNewComm] = useState({ type: 'Note' as CommunicationEntry['type'], summary: ''});

    const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name]: value }));
    };
    
    const handleAddCommunication = () => {
        if (!newComm.summary.trim()) return;
        const newEntry: CommunicationEntry = {
            id: `comm-${Date.now()}`,
            date: new Date().toISOString(),
            type: newComm.type,
            summary: newComm.summary,
            author: 'Admin'
        };
        setEditedUser(prev => ({
            ...prev,
            communicationHistory: [newEntry, ...(prev.communicationHistory || [])]
        }));
        setNewComm({ type: 'Note', summary: '' });
    };

    const handleSave = () => {
        onUpdateUser(editedUser);
    };
    
    const totalSpent = orders.reduce((sum, order) => order.status === 'Complété' ? sum + order.total : sum, 0);
    const lastOrderDate = orders.length > 0 ? new Date(Math.max(...orders.map(o => new Date(o.date).getTime()))).toLocaleDateString('fr-FR') : 'N/A';

    return (
        <div className="space-y-6">
             <button onClick={onBack} className="flex items-center gap-2 text-cyan-600 font-semibold hover:underline">
                <ArrowLeft size={18} />
                Retour à la liste des clients
            </button>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                    <img src={`https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} className="w-16 h-16 rounded-full" />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <StatCard title="Total Dépensé" value={formatCurrency(totalSpent)} />
                    <StatCard title="Commandes" value={orders.length} />
                    <StatCard title="Dernière commande" value={lastOrderDate} />
                    <StatCard title="Membre depuis" value={new Date(user.createdAt).toLocaleDateString('fr-FR')} />
                 </div>
            </div>

            <div className="bg-white rounded-lg shadow-md">
                <div className="border-b">
                    <nav className="flex -mb-px space-x-4 px-6">
                        <button onClick={() => setActiveTab('info')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'info' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}><User size={16} className="inline mr-2"/> Informations</button>
                        <button onClick={() => setActiveTab('orders')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'orders' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}><ShoppingCart size={16} className="inline mr-2"/> Commandes</button>
                        <button onClick={() => setActiveTab('comms')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'comms' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}><MessageSquare size={16} className="inline mr-2"/> Communications</button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'info' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold">Détails du Client</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><label className="block text-sm font-medium text-gray-700">Nom</label><input type="text" name="name" value={editedUser.name} onChange={handleInfoChange} className="mt-1 w-full p-2 border rounded-md"/></div>
                                <div><label className="block text-sm font-medium text-gray-700">Email</label><input type="email" name="email" value={editedUser.email} onChange={handleInfoChange} className="mt-1 w-full p-2 border rounded-md"/></div>
                                <div><label className="block text-sm font-medium text-gray-700">Téléphone</label><input type="tel" name="phone" value={editedUser.phone || ''} onChange={handleInfoChange} className="mt-1 w-full p-2 border rounded-md"/></div>
                                <div><label className="block text-sm font-medium text-gray-700">Segment</label>
                                    <select name="segment" value={editedUser.segment} onChange={handleInfoChange} className="mt-1 w-full p-2 border rounded-md">
                                        {(['Nouveau', 'Fidèle', 'VIP', 'Inactif', 'À Risque'] as UserSegment[]).map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                             </div>
                              <p className="text-sm font-medium text-gray-700">Consentement Marketing: <span className={user.gdprConsent.marketingEmails ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{user.gdprConsent.marketingEmails ? 'Oui' : 'Non'}</span></p>
                        </div>
                    )}
                    {activeTab === 'orders' && (
                        <div className="overflow-x-auto">
                           <table className="w-full text-sm">
                               <thead className="bg-gray-50"><tr><th className="p-2">ID</th><th className="p-2">Date</th><th className="p-2">Statut</th><th className="p-2 text-right">Total</th></tr></thead>
                               <tbody>
                                   {orders.map(o => <tr key={o.id} className="border-b"><td className="p-2">{o.id}</td><td className="p-2">{new Date(o.date).toLocaleDateString('fr-FR')}</td><td className="p-2">{o.status}</td><td className="p-2 text-right">{formatCurrency(o.total)}</td></tr>)}
                               </tbody>
                           </table>
                        </div>
                    )}
                    {activeTab === 'comms' && (
                         <div className="space-y-4">
                             <div className="bg-gray-50 p-4 rounded-lg border">
                                <h4 className="font-semibold mb-2">Ajouter une communication</h4>
                                <div className="flex gap-2 mb-2">
                                    <select value={newComm.type} onChange={e => setNewComm(prev => ({...prev, type: e.target.value as any}))} className="p-2 border rounded-md">
                                        <option>Note</option>
                                        <option>Email</option>
                                        <option>Appel</option>
                                    </select>
                                    <textarea value={newComm.summary} onChange={e => setNewComm(prev => ({...prev, summary: e.target.value}))} placeholder="Ajouter une note..." rows={2} className="flex-1 p-2 border rounded-md" />
                                </div>
                                <div className="text-right">
                                    <button onClick={handleAddCommunication} className="px-4 py-2 text-sm bg-cyan-500 text-white rounded-md hover:bg-cyan-600"><Plus size={16} className="inline mr-1"/> Ajouter</button>
                                </div>
                             </div>
                             <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                                 {editedUser.communicationHistory.map(c => (
                                     <div key={c.id} className="flex items-start gap-3">
                                         <div className="mt-1.5 p-2 bg-gray-100 rounded-full">{c.type === 'Appel' ? <Phone size={14}/> : c.type === 'Email' ? <Mail size={14}/> : <MessageSquare size={14}/>}</div>
                                         <div className="bg-gray-50 p-3 rounded-md flex-1">
                                             <p className="text-sm">{c.summary}</p>
                                             <p className="text-xs text-gray-500 mt-1 flex items-center gap-2"><Clock size={12}/> {c.author} - {new Date(c.date).toLocaleString('fr-FR')}</p>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         </div>
                    )}
                </div>
                 <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
                    <button onClick={onBack} className="px-4 py-2 text-sm font-medium bg-white border rounded-md hover:bg-gray-100">Annuler</button>
                    <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-700 flex items-center gap-2"><Save size={16}/> Enregistrer les modifications</button>
                 </div>
            </div>
        </div>
    );
};

export default ClientDetailView;
