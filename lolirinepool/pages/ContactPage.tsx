import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mail, Phone, MapPin, Building, User } from 'lucide-react';
import { ContactPageProps } from '../types';
import GoBackButton from '../components/GoBackButton';

const AddressFields: React.FC<{
    type: 'project' | 'billing';
    onPlaceSelected: (type: 'project' | 'billing', place: any) => void;
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ type, onPlaceSelected, formData, handleChange }) => {
    const addressInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // FIX: Use `(window as any).google` to access the Google Maps API, which is loaded via script and not known to TypeScript.
        if (!(window as any).google || !addressInputRef.current) {
            return;
        }
        // FIX: Use `(window as any).google` to access the Google Maps API, which is loaded via script and not known to TypeScript.
        const autocomplete = new (window as any).google.maps.places.Autocomplete(addressInputRef.current, {
            types: ['address'],
            componentRestrictions: { country: 'be' }
        });
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.address_components) {
                onPlaceSelected(type, place);
            }
        });
    }, [onPlaceSelected, type]);

    return (
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <div className="sm:col-span-6">
                <label htmlFor={`${type}Address`} className="block text-sm font-medium text-gray-700">Adresse *</label>
                <input ref={addressInputRef} type="text" name={`${type}Address`} id={`${type}Address`} required value={formData[`${type}Address`]} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
            </div>
            <div className="sm:col-span-4">
                <label htmlFor={`${type}City`} className="block text-sm font-medium text-gray-700">Ville *</label>
                <input type="text" name={`${type}City`} id={`${type}City`} required value={formData[`${type}City`]} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor={`${type}Zip`} className="block text-sm font-medium text-gray-700">Code Postal *</label>
                <input type="text" name={`${type}Zip`} id={`${type}Zip`} required value={formData[`${type}Zip`]} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
            </div>
        </div>
    );
};

const ContactPage: React.FC<ContactPageProps> = ({ goBack, canGoBack }) => {
    const [customerType, setCustomerType] = useState<'individual' | 'company'>('individual');
    const [showBillingAddress, setShowBillingAddress] = useState(false);
    const [formData, setFormData] = useState({
        // Contact Info
        lastName: '',
        firstName: '',
        email: '',
        phone: '',
        // Company Info
        companyName: '',
        vatNumber: '',
        // Project Address
        projectAddress: '',
        projectCity: '',
        projectZip: '',
        // Billing Address
        billingAddress: '',
        billingCity: '',
        billingZip: '',
        // Message
        subject: 'Devis pour un service',
        message: '',
    });
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handlePlaceSelected = useCallback((type: 'project' | 'billing', place: any) => {
        const getAddressComponent = (place: any, componentType: string) => {
          const component = place.address_components.find((c: any) => c.types.includes(componentType));
          return component ? component.long_name : '';
        };

        const streetNumber = getAddressComponent(place, 'street_number');
        const route = getAddressComponent(place, 'route');
        const city = getAddressComponent(place, 'locality');
        const zip = getAddressComponent(place, 'postal_code');
        const streetAddress = `${streetNumber} ${route}`.trim();

        setFormData(prev => ({
          ...prev,
          [`${type}Address`]: streetAddress,
          [`${type}City`]: city,
          [`${type}Zip`]: zip,
        }));
    }, []);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('sending');
        console.log('Form Data:', formData);
        setTimeout(() => {
            if (Math.random() > 0.1) {
                setFormStatus('success');
            } else {
                setFormStatus('error');
            }
        }, 1500);
    };

    return (
        <div className="bg-gray-50">
            <div className="bg-white py-12 text-center border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-800">Contact & Devis</h1>
                    <p className="mt-2 text-lg text-gray-600">Un projet, une question ? Remplissez ce formulaire pour une réponse rapide.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {canGoBack && <GoBackButton onClick={goBack} className="mb-8" />}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    {formStatus === 'success' ? (
                        <div className="text-center py-12">
                             <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-md inline-block" role="alert">
                                <p className="font-bold text-xl">Message envoyé avec succès !</p>
                                <p className="mt-2">Merci de nous avoir contactés. Notre équipe reviendra vers vous dans les plus brefs délais.</p>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
                             <fieldset className="space-y-6">
                                <legend className="text-lg font-medium text-gray-900">1. Vous êtes...</legend>
                                <div className="flex gap-4">
                                    <button type="button" onClick={() => setCustomerType('individual')} className={`flex-1 p-4 rounded-lg border-2 flex items-center gap-3 transition-all ${customerType === 'individual' ? 'border-cyan-500 bg-cyan-50' : 'border-gray-300 bg-white'}`}>
                                        <User className={`h-6 w-6 ${customerType === 'individual' ? 'text-cyan-600' : 'text-gray-500'}`} />
                                        <span className="font-semibold">Un Particulier</span>
                                    </button>
                                    <button type="button" onClick={() => setCustomerType('company')} className={`flex-1 p-4 rounded-lg border-2 flex items-center gap-3 transition-all ${customerType === 'company' ? 'border-cyan-500 bg-cyan-50' : 'border-gray-300 bg-white'}`}>
                                        <Building className={`h-6 w-6 ${customerType === 'company' ? 'text-cyan-600' : 'text-gray-500'}`} />
                                        <span className="font-semibold">Une Société</span>
                                    </button>
                                </div>
                            </fieldset>

                            <fieldset className="space-y-6 pt-8">
                                <legend className="text-lg font-medium text-gray-900">2. Vos Coordonnées</legend>
                                {customerType === 'company' && (
                                     <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Nom de l'entreprise *</label>
                                            <input type="text" name="companyName" id="companyName" required={customerType === 'company'} value={formData.companyName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
                                        </div>
                                        <div>
                                            <label htmlFor="vatNumber" className="block text-sm font-medium text-gray-700">N° de TVA (facultatif)</label>
                                            <input type="text" name="vatNumber" id="vatNumber" value={formData.vatNumber} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
                                        </div>
                                    </div>
                                )}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom *</label>
                                        <input type="text" name="lastName" id="lastName" required value={formData.lastName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
                                    </div>
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom *</label>
                                        <input type="text" name="firstName" id="firstName" required value={formData.firstName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
                                        <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
                                    </div>
                                     <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone *</label>
                                        <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
                                    </div>
                                </div>
                            </fieldset>
                            
                            <fieldset className="space-y-6 pt-8">
                                <legend className="text-lg font-medium text-gray-900">3. Adresse du Projet / Chantier</legend>
                                <AddressFields type="project" onPlaceSelected={handlePlaceSelected} formData={formData} handleChange={handleChange} />
                                 <div className="relative flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="billing-address-checkbox" name="billing-address-checkbox" type="checkbox" checked={showBillingAddress} onChange={(e) => setShowBillingAddress(e.target.checked)} className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="billing-address-checkbox" className="font-medium text-gray-700">L'adresse de facturation est différente de l'adresse du projet</label>
                                    </div>
                                </div>
                            </fieldset>

                            {showBillingAddress && (
                                <fieldset className="space-y-6 pt-8">
                                    <legend className="text-lg font-medium text-gray-900">4. Adresse de Facturation</legend>
                                    <AddressFields type="billing" onPlaceSelected={handlePlaceSelected} formData={formData} handleChange={handleChange} />
                                </fieldset>
                            )}

                            <fieldset className="space-y-6 pt-8">
                                <legend className="text-lg font-medium text-gray-900">{showBillingAddress ? '5' : '4'}. Votre Demande</legend>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Sujet *</label>
                                    <select id="subject" name="subject" value={formData.subject} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md">
                                        <option>Devis pour un service de construction</option>
                                        <option>Devis pour un service de rénovation</option>
                                        <option>Demande de contrat d'entretien</option>
                                        <option>Question sur un produit</option>
                                        <option>Demande d'intervention / réparation</option>
                                        <option>Autre</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Votre message *</label>
                                    <textarea id="message" name="message" rows={5} required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"></textarea>
                                </div>
                            </fieldset>
                            
                            <div className="pt-5">
                                <div className="flex justify-end">
                                    <button type="submit" disabled={formStatus === 'sending'} className="w-full sm:w-auto flex justify-center py-3 px-8 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-gray-400">
                                        {formStatus === 'sending' ? 'Envoi en cours...' : 'Envoyer la demande'}
                                    </button>
                                </div>
                                {formStatus === 'error' && (
                                     <p className="text-red-500 text-sm text-center mt-4">Une erreur est survenue. Veuillez vérifier vos informations et réessayer.</p>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
