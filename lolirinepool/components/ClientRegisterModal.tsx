import React, { useState } from 'react';
import { ClientRegisterModalProps } from '../types';
import { X, UserPlus, CheckCircle } from 'lucide-react';

const ClientRegisterModal: React.FC<ClientRegisterModalProps> = ({ onSuccess, onClose, onSwitchToLogin, existingUsers }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gdprConsent, setGdprConsent] = useState(false);
    const [error, setError] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        if (existingUsers.some(u => u.email === email)) {
            setError('Un compte avec cette adresse e-mail existe déjà.');
            return;
        }
        
        // In a real app, you would hash the password here
        onSuccess({ name, email, password, gdprConsent: { marketingEmails: gdprConsent } });
        setIsRegistered(true);
    };

    if (isRegistered) {
        return (
             <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                aria-modal="true"
                role="dialog"
            >
                <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-sm m-auto relative transform transition-all text-center animate-fade-in-up">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Inscription Réussie !</h2>
                    <p className="text-sm text-gray-500 mt-2 mb-6">Votre compte a été créé. Vous êtes maintenant connecté.</p>
                    <p className="text-xs text-gray-400 mb-6">(Dans une application réelle, un e-mail de confirmation vous aurait été envoyé.)</p>
                    {/* The app will automatically navigate away, but a close button is good for UX */}
                    <button
                        onClick={onClose}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                        Continuer
                    </button>
                </div>
            </div>
        );
    }


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
                        <UserPlus className="h-6 w-6 text-cyan-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Créer un Compte</h2>
                    <p className="text-sm text-gray-500 mt-2">Rejoignez notre communauté de clients.</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="sr-only">Nom complet</label>
                            <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Nom complet" className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                        </div>
                        <div>
                           <label htmlFor="email-register" className="sr-only">Email</label>
                            <input id="email-register" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Adresse e-mail" className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                        </div>
                        <div>
                            <label htmlFor="password-register" className="sr-only">Mot de passe</label>
                            <input id="password-register" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Mot de passe" minLength={6} className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                        </div>
                         <div>
                            <label htmlFor="confirm-password" className="sr-only">Confirmer le mot de passe</label>
                            <input id="confirm-password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required placeholder="Confirmer le mot de passe" className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                        </div>
                        <div className="relative flex items-start">
                            <div className="flex items-center h-5">
                                <input id="gdpr-consent" name="gdpr-consent" type="checkbox" checked={gdprConsent} onChange={e => setGdprConsent(e.target.checked)} className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"/>
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="gdpr-consent" className="text-gray-500">Je souhaite recevoir des offres promotionnelles et des actualités par e-mail.</label>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
                            >
                                S'inscrire
                            </button>
                        </div>
                    </div>
                </form>
                 <p className="text-center text-sm text-gray-500 mt-6">
                    Déjà un compte ?{' '}
                    <button onClick={onSwitchToLogin} className="font-medium text-cyan-600 hover:text-cyan-500">
                        Se connecter
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ClientRegisterModal;
