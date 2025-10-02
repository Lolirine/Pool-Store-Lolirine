import React, { useState } from 'react';
import { HomeCategory } from '../../types';
import { ArrowLeft, Save, Home } from 'lucide-react';

interface HomepageEditorProps {
    homeCategories: HomeCategory[];
    onUpdateHomeCategories: (categories: HomeCategory[]) => void;
    onBack: () => void;
}

const HomepageEditor: React.FC<HomepageEditorProps> = ({ homeCategories, onUpdateHomeCategories, onBack }) => {
    const [categories, setCategories] = useState<HomeCategory[]>(homeCategories);
    const [saved, setSaved] = useState(false);

    const handleChange = (index: number, field: keyof HomeCategory, value: string) => {
        const newCategories = [...categories];
        (newCategories[index] as any)[field] = value;
        setCategories(newCategories);
    };

    const handleSave = () => {
        onUpdateHomeCategories(categories);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <button onClick={onBack} className="flex items-center gap-2 text-cyan-600 font-semibold hover:underline">
                    <ArrowLeft size={18} />
                    Retour au CMS
                </button>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Home size={22} />
                    Éditeur de la Page d'Accueil
                </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((cat, index) => (
                    <div key={cat.id} className="bg-gray-50 p-4 rounded-lg border">
                        <h3 className="font-bold mb-4">Catégorie # {index + 1}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Libellé</label>
                                <input 
                                    type="text"
                                    value={cat.label}
                                    onChange={e => handleChange(index, 'label', e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">URL de l'image</label>
                                <input 
                                    type="text"
                                    value={cat.imageUrl}
                                    onChange={e => handleChange(index, 'imageUrl', e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />
                                {cat.imageUrl && <img src={cat.imageUrl} alt="preview" className="mt-2 h-24 w-auto rounded"/>}
                            </div>
                             <div>
                                <label className="block text-sm font-medium">Page de destination</label>
                                <input 
                                    type="text"
                                    value={cat.page}
                                    onChange={e => handleChange(index, 'page', e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Filtre de catégorie (optionnel)</label>
                                <input 
                                    type="text"
                                    value={cat.categoryFilter || ''}
                                    onChange={e => handleChange(index, 'categoryFilter', e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="pt-4 border-t flex justify-end">
                 <button
                    onClick={handleSave}
                    className={`flex items-center justify-center gap-2 py-2 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition-colors ${saved ? 'bg-green-600' : 'bg-cyan-600 hover:bg-cyan-700'}`}
                >
                    <Save size={18} />
                    {saved ? 'Enregistré !' : 'Enregistrer les modifications'}
                </button>
            </div>
        </div>
    );
};

export default HomepageEditor;
