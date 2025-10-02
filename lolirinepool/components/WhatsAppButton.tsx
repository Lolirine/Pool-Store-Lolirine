
import React, { useState, useEffect } from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';

const WHATSAPP_NUMBER = '32497444146';

interface WhatsAppButtonProps {
    pageIdentifier: string; // Pour déclencher la mise à jour lors du changement de page
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ pageIdentifier }) => {
    const [href, setHref] = useState(`https://wa.me/${WHATSAPP_NUMBER}`);

    useEffect(() => {
        // Cet effet se redéclenchera chaque fois que `pageIdentifier` change.
        // Un léger délai pour s'assurer que document.title a été mis à jour par React.
        const timer = setTimeout(() => {
            const base = `https://wa.me/${WHATSAPP_NUMBER}?text=`;
            const msg = `Bonjour ! Je suis sur la page : "${document.title}" (${location.href}) et j'aurais une question.`;
            setHref(base + encodeURIComponent(msg));
        }, 100);

        return () => clearTimeout(timer);
    }, [pageIdentifier]);

    return (
        <a 
           id="wa-float" 
           href={href} 
           target="_blank" 
           rel="noopener noreferrer"
           aria-label="Écrire sur WhatsApp"
           className="fixed right-5 bottom-5 z-[9999] flex items-center gap-3 px-4 py-3 rounded-full bg-[#25D366] text-white font-semibold no-underline shadow-lg transition-transform transform hover:scale-105"
        >
            <WhatsAppIcon className="h-6 w-6" />
            <span>WhatsApp</span>
        </a>
    );
};

export default WhatsAppButton;
