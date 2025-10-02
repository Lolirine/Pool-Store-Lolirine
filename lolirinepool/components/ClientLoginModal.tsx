import React, { useState } from 'react';
import { ClientLoginModalProps } from '../types';
import { X, User, LogIn } from 'lucide-react';

const ClientLoginModal: React.FC<ClientLoginModalProps> = ({ onSuccess, onClose, onSwitchToRegister, users }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            onSuccess(user);
        } else {
            setError('Email ou mot de passe incorrect.');
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
                        <User className="h-6 w-6 text-cyan-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Espace Client</h2>
                    <p className="text-sm text-gray-500 mt-2">Connectez-vous pour accéder à votre compte.</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Adresse e-mail"
                                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                        </div>
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
                                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
                            >
                                <LogIn className="mr-2 h-5 w-5"/> Se connecter
                            </button>
                        </div>
                    </div>
                </form>
                <p className="text-center text-sm text-gray-500 mt-6">
                    Pas encore de compte ?{' '}
                    <button onClick={onSwitchToRegister} className="font-medium text-cyan-600 hover:text-cyan-500">
                        S'inscrire
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ClientLoginModal;