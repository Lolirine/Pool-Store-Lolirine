import React, { useState } from 'react';
import { UserAccount, Address } from '../types';
import { Save, X } from 'lucide-react';

interface ClientInfoEditorProps {
    user: UserAccount;
    onSave: (updatedUser: UserAccount) => void;
    onCancel: () => void;
}

const ClientInfoEditor: React.FC<ClientInfoEditorProps> = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState<UserAccount>(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (field: keyof Address, value: string) => {
        setFormData(prev => ({
            ...prev,
            shippingAddress: {
                ...prev.shippingAddress,
                [field]: value
            } as Address
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Modifier mes Informations</h3>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom complet</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                        <input type="tel" name="phone" id="phone" value={formData.phone || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (non modifiable)</label>
                    <input type="email" name="email" id="email" value={formData.email} readOnly className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"/>
                </div>
                <div className="pt-4 border-t">
                     <h4 className="text-md font-medium text-gray-700 mb-2">Adresse de livraison</h4>
                     <div className="space-y-4">
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
                            <input type="text" id="address" value={formData.shippingAddress?.address || ''} onChange={(e) => handleAddressChange('address', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville</label>
                                <input type="text" id="city" value={formData.shippingAddress?.city || ''} onChange={(e) => handleAddressChange('city', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                            </div>
                             <div>
                                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Code Postal</label>
                                <input type="text" id="zip" value={formData.shippingAddress?.zip || ''} onChange={(e) => handleAddressChange('zip', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
                 <button type="button" onClick={onCancel} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
                    <X size={16} />
                    Annuler
                </button>
                <button type="submit" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-md shadow-sm hover:bg-cyan-700 transition-colors">
                    <Save size={16} />
                    Enregistrer
                </button>
            </div>
        </form>
    );
};

export default ClientInfoEditor;