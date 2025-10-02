import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface GoBackButtonProps {
  onClick: () => void;
  className?: string;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 hover:border-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${className}`}
    >
      <ArrowLeft size={16} />
      Retour
    </button>
  );
};

export default GoBackButton;