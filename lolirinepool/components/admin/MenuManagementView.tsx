import React, { useState } from 'react';
import { MenuConfig, NavLink, NavLinkStyle } from '../../types';
import { Menu, Save, PlusCircle, Edit, Trash2, ArrowUp, ArrowDown, GripVertical } from 'lucide-react';
import MenuItemEditorModal from './MenuItemEditorModal';

interface MenuManagementViewProps {
  menuConfig: MenuConfig;
  onUpdateMenuConfig: (config: MenuConfig) => void;
}

const MenuManagementView: React.FC<MenuManagementViewProps> = ({ menuConfig, onUpdateMenuConfig }) => {
  const [localConfig, setLocalConfig] = useState<MenuConfig>(JSON.parse(JSON.stringify(menuConfig))); // Deep copy
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{ item: NavLink | null, parentId: string | null }>({ item: null, parentId: null });
  const [saved, setSaved] = useState(false);

  const handleStyleChange = (style: NavLinkStyle) => {
    setLocalConfig(prev => ({ ...prev, style }));
  };

  const handleSave = () => {
    onUpdateMenuConfig(localConfig);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  
  // Recursive function to find and update items
  const updateLinksRecursively = (links: NavLink[], action: (links: NavLink[], parentId: string | null) => NavLink[] | null, parentId: string | null = null): NavLink[] => {
    const result = action(links, parentId);
    if (result) return result;

    return links.map(link => {
        if (link.children) {
            return { ...link, children: updateLinksRecursively(link.children, action, link.id) };
        }
        return link;
    });
  };

  const handleDeleteItem = (itemId: string) => {
    const newLinks = updateLinksRecursively(localConfig.links, (links) => {
        const itemIndex = links.findIndex(l => l.id === itemId);
        if (itemIndex > -1) {
            return links.filter(l => l.id !== itemId);
        }
        return null;
    });
    setLocalConfig(prev => ({ ...prev, links: newLinks }));
  };

  const handleMoveItem = (itemId: string, direction: 'up' | 'down') => {
    const newLinks = updateLinksRecursively(localConfig.links, (links) => {
        const index = links.findIndex(l => l.id === itemId);
        if (index === -1) return null;
        
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= links.length) return links;

        const newLinksArray = [...links];
        [newLinksArray[index], newLinksArray[newIndex]] = [newLinksArray[newIndex], newLinksArray[index]];
        return newLinksArray;
    });
    setLocalConfig(prev => ({...prev, links: newLinks}));
  };
  
  const handleOpenEditModal = (item: NavLink, parentId: string | null = null) => {
    setEditingItem({ item, parentId });
    setIsModalOpen(true);
  };

  const handleOpenCreateModal = (parentId: string | null = null) => {
    setEditingItem({ item: null, parentId });
    setIsModalOpen(true);
  }

  const handleSaveItem = (itemData: Omit<NavLink, 'id' | 'children'>, existingId: string | null) => {
    const newItem: NavLink = { 
        ...itemData, 
        id: existingId || `menu-${Date.now()}`,
        children: existingId ? localConfig.links.find(l => l.id === existingId)?.children : []
    };

    if (existingId) { // Editing
        const newLinks = updateLinksRecursively(localConfig.links, (links) => {
            const itemIndex = links.findIndex(l => l.id === existingId);
            if (itemIndex > -1) {
                const updatedLinks = [...links];
                updatedLinks[itemIndex] = { ...updatedLinks[itemIndex], ...itemData };
                return updatedLinks;
            }
            return null;
        });
        setLocalConfig(prev => ({ ...prev, links: newLinks }));
    } else { // Creating
        if(editingItem.parentId === null) { // Root level
            setLocalConfig(prev => ({...prev, links: [...prev.links, newItem]}));
        } else { // Nested
            const newLinks = updateLinksRecursively(localConfig.links, (links, parentId) => {
                if (parentId === editingItem.parentId) {
                   return [...links, newItem];
                }
                return null;
            }, editingItem.parentId);
            
             // This is a bit tricky, the recursive function needs to handle adding to children
            const addAction = (links: NavLink[]): NavLink[] => {
                return links.map(link => {
                    if (link.id === editingItem.parentId) {
                        return { ...link, children: [...(link.children || []), newItem]};
                    }
                    if (link.children) {
                        return { ...link, children: addAction(link.children)};
                    }
                    return link;
                })
            }
            setLocalConfig(prev => ({...prev, links: addAction(prev.links)}));
        }
    }
    setIsModalOpen(false);
  };


  const renderMenuItems = (items: NavLink[], parentId: string | null = null, level = 0) => (
    <ul className={level > 0 ? "ml-6 pl-4 border-l" : ""}>
      {items.map((item, index) => (
        <li key={item.id} className="my-2 bg-gray-50 p-3 rounded-md">
          <div className="flex items-center gap-3">
            <GripVertical size={18} className="text-gray-400 cursor-grab" />
            <div className="flex-1">
              <p className="font-semibold">{item.label}</p>
              <p className="text-xs text-gray-500">{item.page ? `Page: ${item.page}` : `URL: ${item.href}`}</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => handleMoveItem(item.id, 'up')} disabled={index === 0} className="p-2 hover:bg-gray-200 rounded-full disabled:opacity-30"><ArrowUp size={16} /></button>
              <button onClick={() => handleMoveItem(item.id, 'down')} disabled={index === items.length - 1} className="p-2 hover:bg-gray-200 rounded-full disabled:opacity-30"><ArrowDown size={16} /></button>
              <button onClick={() => handleOpenEditModal(item, parentId)} className="p-2 text-cyan-600 hover:bg-cyan-100 rounded-full"><Edit size={16} /></button>
              <button onClick={() => handleDeleteItem(item.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full"><Trash2 size={16} /></button>
            </div>
          </div>
          {item.children && renderMenuItems(item.children, item.id, level + 1)}
          <button onClick={() => handleOpenCreateModal(item.id)} className="mt-2 text-sm flex items-center gap-1 text-cyan-600 hover:underline"><PlusCircle size={14}/> Ajouter un sous-élément</button>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
          <Menu size={24} className="mr-3" />
          Gestion du Menu de Navigation
        </h2>
        
        <div className="space-y-8">
            {/* Style Selection */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Style des boutons de navigation</h3>
                <div className="flex gap-4">
                    {(['default', 'outline', 'pill'] as NavLinkStyle[]).map(style => (
                        <button key={style} onClick={() => handleStyleChange(style)} className={`px-4 py-2 rounded-lg border-2 transition-colors ${localConfig.style === style ? 'border-cyan-500 bg-cyan-50' : 'border-gray-300 bg-white'}`}>
                           {style.charAt(0).toUpperCase() + style.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Menu Structure */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Structure du menu</h3>
                    <button onClick={() => handleOpenCreateModal(null)} className="flex items-center gap-2 bg-cyan-100 text-cyan-700 font-semibold py-2 px-3 rounded-lg hover:bg-cyan-200 transition-colors text-sm">
                        <PlusCircle size={18} /> Ajouter un élément
                    </button>
                </div>
                <div className="border p-4 rounded-lg bg-white">
                    {renderMenuItems(localConfig.links)}
                </div>
            </div>

            {/* Save Button */}
            <div>
                <button
                    onClick={handleSave}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition-colors ${saved ? 'bg-green-600' : 'bg-cyan-600 hover:bg-cyan-700'}`}
                    >
                    <Save size={20} />
                    {saved ? 'Enregistré !' : 'Enregistrer la configuration du menu'}
                </button>
            </div>
        </div>
      </div>
       {isModalOpen && (
        <MenuItemEditorModal
          item={editingItem.item}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveItem}
        />
      )}
    </>
  );
};

export default MenuManagementView;
