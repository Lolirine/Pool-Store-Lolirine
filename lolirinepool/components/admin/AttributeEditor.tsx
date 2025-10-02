import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface AttributeEditorProps {
    attributes: { [key: string]: string | number };
    onAttributesChange: (attributes: { [key: string]: string | number }) => void;
}

const AttributeEditor: React.FC<AttributeEditorProps> = ({ attributes, onAttributesChange }) => {
    const [attrs, setAttrs] = useState(Object.entries(attributes));
    const [newKey, setNewKey] = useState('');
    const [newValue, setNewValue] = useState('');

    useEffect(() => {
        const newAttributesObject = Object.fromEntries(attrs);
        onAttributesChange(newAttributesObject);
    }, [attrs, onAttributesChange]);

    const handleAdd = () => {
        if (newKey.trim() && newValue.trim() && !attrs.find(([k]) => k.toLowerCase() === newKey.trim().toLowerCase())) {
            setAttrs([...attrs, [newKey.trim(), newValue.trim()]]);
            setNewKey('');
            setNewValue('');
        }
    };

    const handleRemove = (keyToRemove: string) => {
        setAttrs(attrs.filter(([k]) => k !== keyToRemove));
    };

    const handleValueChange = (keyToUpdate: string, value: string) => {
        setAttrs(attrs.map(([k, v]) => (k === keyToUpdate ? [k, value] : [k, v])));
    };

    return (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
            {attrs.length === 0 ? (
                <p className="text-sm text-gray-500 text-center">Aucun attribut défini.</p>
            ) : (
                <div className="space-y-3">
                    {attrs.map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={key}
                                readOnly
                                className="w-1/3 p-2 border-gray-300 rounded-md shadow-sm bg-gray-200 cursor-not-allowed"
                            />
                            <input
                                type="text"
                                value={String(value)}
                                onChange={(e) => handleValueChange(key, e.target.value)}
                                className="flex-1 p-2 border-gray-300 rounded-md shadow-sm"
                            />
                            <button onClick={() => handleRemove(key)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex items-end gap-2 pt-4 border-t">
                 <div className="flex-1">
                     <label className="block text-xs font-medium text-gray-600 mb-1">Nom de l'attribut</label>
                     <input
                        type="text"
                        value={newKey}
                        onChange={(e) => setNewKey(e.target.value)}
                        placeholder="Ex: Couleur Jupe"
                        className="w-full p-2 border-gray-300 rounded-md shadow-sm"
                    />
                 </div>
                 <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Valeur</label>
                    <input
                        type="text"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        placeholder="Ex: Thunder"
                        className="w-full p-2 border-gray-300 rounded-md shadow-sm"
                    />
                 </div>
                <button 
                    onClick={handleAdd} 
                    className="p-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 disabled:bg-gray-300"
                    disabled={!newKey.trim() || !newValue.trim()}
                >
                    <Plus size={20} />
                </button>
            </div>
        </div>
    );
};

export default AttributeEditor;