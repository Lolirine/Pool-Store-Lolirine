import React, { useState } from 'react';
import { ADMIN_PASSWORD } from '../constants';
import { X, Lock } from 'lucide-react';

interface AdminLoginModalProps {
    onSuccess: () => void;
    onClose: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onSuccess, onClose }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            onSuccess();
        } else {
            setError('Mot de passe incorrect.');
            setPassword('');
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-sm m-auto relative transform transition-all animate-fade-in-up">
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    aria-label="Fermer"
                >
                    <X size={24} />
                </button>
                
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 mb-4">
                        <Lock className="h-6 w-6 text-cyan-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Accès Administrateur</h2>
                    <p className="text-sm text-gray-500 mt-2">Veuillez entrer le mot de passe pour continuer.</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="password" className="sr-only">Mot de passe</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Mot de passe"
                                className="w-full px-4 py-3 text-center bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
                            >
                                Se connecter
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginModal;
