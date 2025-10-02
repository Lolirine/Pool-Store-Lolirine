import React, { useState, useEffect, useRef } from 'react';
import { CheckoutPageProps, PaymentMethod } from '../types';
import { formatCurrency } from '../utils/formatting';
import { Lock, CreditCard } from 'lucide-react';
import GoBackButton from '../components/GoBackButton';

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, onPlaceOrder, currentUser, paymentMethods, goBack, canGoBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        shippingAddress: '',
        shippingCity: '',
        shippingZip: '',
    });
    const [processing, setProcessing] = useState(false);
    const addressInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (currentUser) {
            setFormData(prev => ({
                ...prev,
                name: currentUser.name,
                email: currentUser.email,
                shippingAddress: currentUser.shippingAddress?.address || '',
                shippingCity: currentUser.shippingAddress?.city || '',
                shippingZip: currentUser.shippingAddress?.zip || '',
            }));
        }
    }, [currentUser]);

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
                    shippingAddress: streetAddress,
                    shippingCity: city,
                    shippingZip: zip,
                }));
            }
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = (e: React.FormEvent, paymentMethodId: string) => {
        e.preventDefault();
        if (cart.length === 0) return;

        setProcessing(true);
        console.log(`Processing payment with ${paymentMethodId}...`);
        
        // Simulate API call
        setTimeout(() => {
            onPlaceOrder({
                shippingAddress: formData.shippingAddress,
                shippingCity: formData.shippingCity,
                shippingZip: formData.shippingZip,
            });
            setProcessing(false);
        }, 2000);
    };
    
    const totalTTC = cart.reduce((sum, item) => sum + (item.price * (1 + item.tvaRate) * item.quantity), 0);

    const renderPaymentMethod = (method: PaymentMethod) => {
        switch(method.type) {
            case 'button':
                const Logo = method.logoComponent;
                return (
                     <button 
                        key={method.id} 
                        onClick={(e) => handlePayment(e, method.id)} 
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                     >
                        {Logo && <Logo className="h-6" />}
                        {method.logoUrl && <img src={method.logoUrl} alt={method.name} className="h-6"/>}
                        Payer avec {method.name}
                     </button>
                );
            case 'bank_transfer_details':
                return (
                    <div key={method.id} className="p-4 bg-gray-50 rounded-lg border">
                        <h3 className="font-semibold text-gray-800 mb-2">{method.name}</h3>
                        <div className="text-sm space-y-1">
                            <p><span className="font-medium text-gray-600">Bénéficiaire:</span> {method.config.beneficiary}</p>
                            <p><span className="font-medium text-gray-600">IBAN:</span> {method.config.iban}</p>
                            <p><span className="font-medium text-gray-600">BIC:</span> {method.config.bic}</p>
                            <p className="mt-2 text-xs text-gray-500">Veuillez utiliser votre numéro de commande comme communication.</p>
                        </div>
                    </div>
                );
            case 'qr_code':
                 const qrData = `${method.config.qrDataPrefix || ''}${totalTTC}`; // Example dynamic QR data
                 return (
                    <div key={method.id} className="p-4 bg-gray-50 rounded-lg border text-center">
                        <h3 className="font-semibold text-gray-800 mb-2">{method.name}</h3>
                        <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`}
                            alt={`QR Code pour ${method.name}`}
                            className="mx-auto"
                        />
                    </div>
                 );
            default:
                return null;
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {canGoBack && <GoBackButton onClick={goBack} className="mb-6" />}
                <h1 className="text-3xl font-bold text-center mb-8">Finaliser ma commande</h1>
                
                {cart.length === 0 && !processing ? (
                    <div className="text-center bg-white p-8 rounded-lg shadow-md">
                        <p className="text-gray-600">Votre panier est vide. Impossible de passer une commande.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Order Summary */}
                        <div className="lg:col-span-1 order-last lg:order-first bg-white p-6 rounded-lg shadow-md h-fit">
                            <h2 className="text-xl font-semibold mb-4 border-b pb-4">Récapitulatif de la commande</h2>
                            <div className="space-y-3">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center">
                                            <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-3"/>
                                            <div>
                                                <p className="font-medium text-gray-800">{item.name}</p>
                                                <p className="text-gray-500">Qté: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-medium text-cyan-600">{formatCurrency(item.price * (1 + item.tvaRate) * item.quantity)} <span className="text-xs font-normal text-gray-500">TVAC</span></p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 border-t pt-4">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total TTC</span>
                                    <span className="text-cyan-600">{formatCurrency(totalTTC)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping and Payment */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                            <form>
                                <fieldset disabled={processing} className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold mb-4">Adresse de livraison</h2>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom complet</label>
                                                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700">Adresse</label>
                                                <input ref={addressInputRef} type="text" name="shippingAddress" id="shippingAddress" required value={formData.shippingAddress} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
                                            </div>
                                            <div>
                                                <label htmlFor="shippingCity" className="block text-sm font-medium text-gray-700">Ville</label>
                                                <input type="text" name="shippingCity" id="shippingCity" required value={formData.shippingCity} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
                                            </div>
                                            <div>
                                                <label htmlFor="shippingZip" className="block text-sm font-medium text-gray-700">Code Postal</label>
                                                <input type="text" name="shippingZip" id="shippingZip" required value={formData.shippingZip} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t pt-6">
                                        <h2 className="text-xl font-semibold mb-4">Paiement</h2>
                                        <p className="text-sm text-gray-500 mb-4 flex items-center"><Lock size={14} className="mr-2"/> Transactions sécurisées</p>
                                        <div className="space-y-4">
                                            {paymentMethods.length > 0 ? (
                                                paymentMethods.map(renderPaymentMethod)
                                            ) : (
                                                <p className="text-sm text-center text-gray-500">Aucune méthode de paiement n'est actuellement disponible.</p>
                                            )}
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                            {processing && (
                                <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center rounded-lg">
                                    <svg className="animate-spin h-8 w-8 text-cyan-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <p className="mt-4 font-semibold text-gray-700">Traitement en cours...</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;
