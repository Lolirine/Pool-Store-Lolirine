import React, { useState } from 'react';
import { PageContent, PageSection } from '../../types';
import { ArrowLeft, Save, PlusCircle, Trash2, GripVertical } from 'lucide-react';

interface PageEditorProps {
    page: PageContent;
    onUpdatePage: (updatedPage: PageContent) => void;
    onBack: () => void;
}

const PageEditor: React.FC<PageEditorProps> = ({ page, onUpdatePage, onBack }) => {
    const [localPage, setLocalPage] = useState<PageContent>(JSON.parse(JSON.stringify(page)));
    const [saved, setSaved] = useState(false);
    const dragItem = React.useRef<number | null>(null);
    const dragOverItem = React.useRef<number | null>(null);

    const handleHeroChange = (field: keyof PageContent['hero'], value: string) => {
        setLocalPage(prev => ({
            ...prev,
            hero: { ...prev.hero, [field]: value }
        }));
    };

    const handleSectionChange = (index: number, field: keyof PageSection, value: string) => {
        const newSections = [...localPage.sections];
        (newSections[index] as any)[field] = value;
        setLocalPage(prev => ({ ...prev, sections: newSections }));
    };

    const addSection = () => {
        const newSection: PageSection = {
            id: `section-${Date.now()}`,
            title: 'Nouveau Titre de Section',
            content: 'Nouveau contenu de section...',
            imageUrl: ''
        };
        setLocalPage(prev => ({ ...prev, sections: [...prev.sections, newSection] }));
    };

    const removeSection = (index: number) => {
        setLocalPage(prev => ({ ...prev, sections: prev.sections.filter((_, i) => i !== index) }));
    };

    const handleDragSort = () => {
        if (dragItem.current === null || dragOverItem.current === null) return;
        const newSections = [...localPage.sections];
        const draggedItemContent = newSections.splice(dragItem.current, 1)[0];
        newSections.splice(dragOverItem.current, 0, draggedItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setLocalPage(prev => ({ ...prev, sections: newSections }));
    };

    const handleSave = () => {
        onUpdatePage(localPage);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <button onClick={onBack} className="flex items-center gap-2 text-cyan-600 font-semibold hover:underline">
                    <ArrowLeft size={18} />
                    Retour au choix des pages
                </button>
                <h2 className="text-xl font-bold text-gray-800">
                    Édition de la page : {page.title}
                </h2>
            </div>

            {/* Hero Editor */}
            <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-bold mb-4 text-lg">Section Héro</h3>
                <div className="space-y-4">
                    <input type="text" value={localPage.hero.title} onChange={e => handleHeroChange('title', e.target.value)} placeholder="Titre principal" className="w-full p-2 border rounded-md" />
                    <textarea value={localPage.hero.subtitle} onChange={e => handleHeroChange('subtitle', e.target.value)} placeholder="Sous-titre" rows={3} className="w-full p-2 border rounded-md" />
                    <input type="text" value={localPage.hero.imageUrl} onChange={e => handleHeroChange('imageUrl', e.target.value)} placeholder="URL de l'image de fond" className="w-full p-2 border rounded-md" />
                </div>
            </div>

            {/* Sections Editor */}
            <div className="space-y-4">
                <h3 className="font-bold text-lg">Sections de Contenu</h3>
                {localPage.sections.map((section, index) => (
                    <div 
                        key={section.id} 
                        className="bg-gray-50 p-4 rounded-lg border flex gap-4 items-start"
                        draggable
                        onDragStart={() => (dragItem.current = index)}
                        onDragEnter={() => (dragOverItem.current = index)}
                        onDragEnd={handleDragSort}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <div className="cursor-grab text-gray-400 pt-2"><GripVertical /></div>
                        <div className="flex-1 space-y-3">
                            <input type="text" value={section.title} onChange={e => handleSectionChange(index, 'title', e.target.value)} placeholder="Titre de section" className="w-full p-2 border rounded-md font-semibold"/>
                            <textarea value={section.content} onChange={e => handleSectionChange(index, 'content', e.target.value)} placeholder="Contenu de la section" rows={5} className="w-full p-2 border rounded-md"/>
                            <input type="text" value={section.imageUrl || ''} onChange={e => handleSectionChange(index, 'imageUrl', e.target.value)} placeholder="URL de l'image (optionnel)" className="w-full p-2 border rounded-md"/>
                        </div>
                        <button onClick={() => removeSection(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={16}/></button>
                    </div>
                ))}
                 <button onClick={addSection} className="flex items-center gap-2 text-cyan-600 font-semibold text-sm hover:underline"><PlusCircle size={16}/> Ajouter une section</button>
            </div>

            <div className="pt-4 border-t flex justify-end">
                 <button
                    onClick={handleSave}
                    className={`flex items-center justify-center gap-2 py-2 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition-colors ${saved ? 'bg-green-600' : 'bg-cyan-600 hover:bg-cyan-700'}`}
                >
                    <Save size={18} />
                    {saved ? 'Enregistré !' : 'Enregistrer la Page'}
                </button>
            </div>
        </div>
    );
};

export default PageEditor;
