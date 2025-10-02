
import React, { useState } from 'react';
import { Page } from '../types';
import { Cookie, Settings, Check } from 'lucide-react';

// Exporting this type so App.tsx can use it
export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentProps {
  onSavePreferences: (preferences: CookiePreferences) => void;
  navigateTo: (page: Page) => void;
}

const Toggle: React.FC<{ label: string; description: string; checked: boolean; onChange?: (checked: boolean) => void; disabled?: boolean }> = ({ label, description, checked, onChange, disabled }) => (
  <div className={`p-4 rounded-lg transition-colors ${disabled ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}>
    <div className="flex justify-between items-center">
      <span className={`font-semibold ${disabled ? 'text-gray-500' : 'text-gray-800'}`}>{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={checked} onChange={e => onChange && onChange(e.target.checked)} className="sr-only peer" disabled={disabled} />
        <div className={`w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-cyan-300 ${disabled ? 'cursor-not-allowed' : ''} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600`}></div>
      </label>
    </div>
    <p className="text-sm text-gray-500 mt-1">{description}</p>
  </div>
);

const CookieConsent: React.FC<CookieConsentProps> = ({ onSavePreferences, navigateTo }) => {
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: true,
    marketing: true,
  });

  const handleSave = () => {
    onSavePreferences({
      necessary: true,
      ...preferences,
    });
  };

  const handleAcceptAll = () => {
    onSavePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleRejectAll = () => {
    onSavePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-[9998]" aria-modal="true" role="dialog">
      <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 animate-slide-in-up">
         <style>{`
            @keyframes slide-in-up {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .animate-slide-in-up { animation: slide-in-up 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both; }
        `}</style>
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6 border">
          {!showCustomize ? (
            // Main View
            <div>
              <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-cyan-500 bg-cyan-50 p-3 rounded-full mt-1">
                      <Cookie size={28} />
                  </div>
                  <div>
                      <h2 className="text-xl font-bold text-gray-800">Nous respectons votre vie privée</h2>
                      <p className="mt-2 text-gray-600">
                          Ce site utilise des cookies pour améliorer votre expérience. Les cookies essentiels sont nécessaires au fonctionnement du site. Vous pouvez choisir d'accepter ou de refuser les cookies analytiques et marketing. Pour en savoir plus, consultez notre <button onClick={() => navigateTo('cookies')} className="font-semibold text-cyan-600 hover:underline">politique de cookies</button>.
                      </p>
                  </div>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button onClick={() => setShowCustomize(true)} className="px-5 py-3 font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Settings size={18} /> Personnaliser
                  </button>
                  <button onClick={handleRejectAll} className="px-5 py-3 font-semibold text-white bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors">
                      Tout refuser
                  </button>
                  <button onClick={handleAcceptAll} className="px-5 py-3 font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors">
                      Tout accepter
                  </button>
              </div>
            </div>
          ) : (
            // Customize View
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Personnaliser les cookies</h3>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                <Toggle
                  label="Cookies Nécessaires"
                  description="Ces cookies sont indispensables au bon fonctionnement du site et ne peuvent pas être désactivés."
                  checked={true}
                  disabled={true}
                />
                <Toggle
                  label="Cookies Analytiques"
                  description="Ces cookies nous aident à comprendre comment vous utilisez notre site, afin d'améliorer nos services et votre expérience."
                  checked={preferences.analytics}
                  onChange={(checked) => setPreferences(p => ({ ...p, analytics: checked }))}
                />
                <Toggle
                  label="Cookies Marketing"
                  description="Ces cookies sont utilisés pour suivre les visiteurs sur les sites web afin d'afficher des publicités pertinentes et engageantes."
                  checked={preferences.marketing}
                  onChange={(checked) => setPreferences(p => ({ ...p, marketing: checked }))}
                />
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button onClick={() => setShowCustomize(false)} className="px-5 py-3 font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
                      Retour
                  </button>
                  <button onClick={handleSave} className="px-5 py-3 font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Check size={18} /> Sauvegarder mes choix
                  </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
