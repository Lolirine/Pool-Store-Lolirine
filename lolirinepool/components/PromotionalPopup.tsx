import React from 'react';
import { PopupConfig, Page } from '../types';
import { X } from 'lucide-react';

interface PromotionalPopupProps {
  popup: PopupConfig;
  onClose: () => void;
  navigateTo: (page: Page, options?: { categoryFilter?: string; searchQuery?: string }) => void;
}

const PromotionalPopup: React.FC<PromotionalPopupProps> = ({ popup, onClose, navigateTo }) => {

  const handleButtonClick = () => {
    const isExternal = popup.buttonLink.startsWith('http');
    const isPage = ['home', 'shop', 'services', 'contact'].includes(popup.buttonLink);

    if (isExternal) {
        window.open(popup.buttonLink, '_blank');
    } else if (isPage) {
        navigateTo(popup.buttonLink as Page);
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-[9998] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="popup-title"
      onClick={onClose}
    >
        <style>{`
            @keyframes popup-enter {
                0% { transform: scale(0.9) translateY(10px); opacity: 0; }
                100% { transform: scale(1) translateY(0); opacity: 1; }
            }
            .animate-popup-enter {
                animation: popup-enter 0.3s ease-out forwards;
            }
        `}</style>
      <div 
        style={{ backgroundColor: popup.backgroundColor || '#ffffff' }}
        className="rounded-lg shadow-2xl w-full max-w-md m-auto relative transform transition-all animate-popup-enter flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 bg-white/50 backdrop-blur-sm rounded-full p-1 z-10"
          aria-label="Fermer"
        >
          <X size={24} />
        </button>

        {popup.imageUrl && (
            <img src={popup.imageUrl} alt={popup.title} className="w-full h-48 object-cover"/>
        )}
        
        <div className="p-8 text-center">
            <h2 id="popup-title" className="text-2xl font-bold text-gray-800">{popup.title}</h2>
            <div className="text-gray-600 mt-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: popup.content }}/>
            <button
                onClick={handleButtonClick}
                className="mt-6 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
                {popup.buttonText}
            </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionalPopup;