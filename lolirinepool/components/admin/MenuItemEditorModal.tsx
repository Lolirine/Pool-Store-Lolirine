import React, { useState, useEffect } from 'react';
import { NavLink, Page } from '../../types';
import { X } from 'lucide-react';

interface MenuItemEditorModalProps {
  item: NavLink | null;
  onClose: () => void;
  onSave: (itemData: Omit<NavLink, 'id' | 'children'>, existingId: string | null) => void;
}

const ALL_PAGES: Page[] = ['home', 'services', 'shop', 'portfolio', 'blog', 'about', 'contact', 'faq', 'wellness', 'repairs', 'construction', 'waterAnalysis', 'winterization'];

const MenuItemEditorModal: React.FC<MenuItemEditorModalProps> = ({ item, onClose, onSave }) => {
  const [label, setLabel] = useState('');
  const [linkType, setLinkType] = useState<'page' | 'href'>('page');
  const [page, setPage] = useState<Page>('home');
  const [href, setHref] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  useEffect(() => {
    if (item) {
      setLabel(item.label);
      setCategoryFilter(item.categoryFilter || '');
      if (item.href) {
        setLinkType('href');
        setHref(item.href);
        setPage('home');
      } else {
        setLinkType('page');
        setPage(item.page || 'home');
        setHref('');
      }
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemData = {
        label,
        page: linkType === 'page' ? page : undefined,
        href: linkType === 'href' ? href : undefined,
        categoryFilter: categoryFilter || undefined,
    };
    onSave(itemData, item ? item.id : null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[51] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              {item ? 'Modifier l\'élément' : 'Ajouter un élément'}
            </h2>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="label" className="block text-sm font-medium text-gray-700">Libellé</label>
              <input type="text" id="label" value={label} onChange={e => setLabel(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Type de lien</label>
                <div className="mt-2 flex gap-4">
                    <label className="flex items-center"><input type="radio" name="linkType" value="page" checked={linkType === 'page'} onChange={() => setLinkType('page')} className="mr-2"/> Lien Interne</label>
                    <label className="flex items-center"><input type="radio" name="linkType" value="href" checked={linkType === 'href'} onChange={() => setLinkType('href')} className="mr-2"/> URL Externe</label>
                </div>
            </div>

            {linkType === 'page' && (
                <div>
                    <label htmlFor="page" className="block text-sm font-medium text-gray-700">Page de destination</label>
                    <select id="page" value={page} onChange={e => setPage(e.target.value as Page)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm capitalize">
                        {ALL_PAGES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
            )}
            {linkType === 'href' && (
                <div>
                    <label htmlFor="href" className="block text-sm font-medium text-gray-700">URL complète</label>
                    <input type="url" id="href" value={href} onChange={e => setHref(e.target.value)} required placeholder="https://example.com" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                </div>
            )}
            <div>
                <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700">Filtre de catégorie (optionnel)</label>
                <input type="text" id="categoryFilter" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} placeholder="Ex: Nettoyage - Zodiac" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                <p className="text-xs text-gray-500 mt-1">Utilisé pour filtrer la boutique. Le lien doit pointer vers la page 'shop'.</p>
            </div>

          </div>
          <div className="flex justify-end items-center p-4 border-t bg-gray-50">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
              Annuler
            </button>
            <button type="submit" className="ml-3 px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-md shadow-sm hover:bg-cyan-700">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemEditorModal;
