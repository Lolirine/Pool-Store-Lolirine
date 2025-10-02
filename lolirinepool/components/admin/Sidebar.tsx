
import React from 'react';
import { AdminView } from '../../types';
import { ADMIN_SIDEBAR_LINKS } from '../../constants';
import { LogOut, ChevronDown } from 'lucide-react';

interface SidebarProps {
  currentView: AdminView;
  setView: (view: AdminView) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, onLogout }) => {
  return (
    <aside className="w-64 bg-[#111827] text-gray-300 flex flex-col h-screen">
      <div className="h-20 flex items-center justify-center border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">Lolirine Pool Store</h1>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        {ADMIN_SIDEBAR_LINKS.map((link, index) => 
          link.isHeader ? (
            <h2 key={`header-${index}`} className="px-3 pt-4 pb-2 text-xs font-bold uppercase text-gray-500 tracking-wider">
              {link.label}
            </h2>
          ) : (
            <button
              key={link.view}
              onClick={() => setView(link.view!)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 text-sm ${
                currentView === link.view
                  ? 'bg-[#8B1B49] text-white'
                  : 'hover:bg-gray-700 hover:text-white'
              }`}
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </button>
          )
        )}
      </nav>
      <div className="border-t border-gray-700 p-4">
        <button onClick={onLogout} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white text-sm">
            <LogOut size={20} />
            <span className="font-medium">Se déconnecter</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;