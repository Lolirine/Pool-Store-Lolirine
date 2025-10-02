import React from 'react';
import { Bot } from 'lucide-react';

interface AiAssistantButtonProps {
    onClick: () => void;
}

const AiAssistantButton: React.FC<AiAssistantButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            aria-label="Ouvrir l'assistant IA"
            className="fixed right-5 bottom-20 z-[9999] w-14 h-14 rounded-full bg-cyan-600 text-white shadow-lg flex items-center justify-center transition-transform transform hover:scale-110 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 animate-pulse"
        >
            <Bot size={28} />
        </button>
    );
};

export default AiAssistantButton;