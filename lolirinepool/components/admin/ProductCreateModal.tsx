
import React, { useState, useEffect } from 'react';
import { Product, Supplier } from '../../types';
import AttributeEditor from './AttributeEditor';
import { X, Plus, Trash2 } from 'lucide-react';

interface ProductCreateModalProps {
    onClose: () => void;
    onCreate: (newProduct: Omit<Product, 'id'>) => void;
    allCategories: string[];
    suppliers: Supplier[];
    initialCategory?: string;
    productToDuplicate?: Product | null;
}

const ProductCreateModal: React.FC<ProductCreateModalProps> = ({ onClose, onCreate, allCategories, suppliers, initialCategory, productToDuplicate }) => {
    const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
        name: '',
        category: initialCategory || '',
        price: 0,
        tvaRate: 0.21,
        imageUrl: 'https://picsum.photos/seed/new-product/400/400',
        description: '',
        attributes: {},
        ribbon: '',
        galleryImages: [],
        isOnSale: false,
        promoPrice: undefined,
        stock: 0,
        isDropshipping: false,
        supplierId: undefined,
        supplierPrice: undefined,
    });
    const [newImageUrl, setNewImageUrl] = useState('');

    useEffect(() => {
        if (productToDuplicate) {
            const { id, rating, reviewCount, reviews, ...duplicationData } = productToDuplicate;
            setNewProduct({
                ...duplicationData,
                name: `${duplicationData.name} (Copie)`,
            });
        }
    }, [productToDuplicate]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setNewProduct(prev => ({ 
                ...prev, 
                [name]: checked,
                ...(name === 'isOnSale' && !checked && { promoPrice: undefined }),
                ...(name === 'isDropshipping' && !checked && { supplierId: undefined, supplierPrice: undefined, stock: 0 })
            }));
            return;
        }

        const isNumericField = name === 'price' || name === 'promoPrice' || name === 'tvaRate' || name === 'stock' || name === 'supplierPrice';
        setNewProduct(prev => ({
            ...prev,
            [name]: isNumericField ? parseFloat(value) || 0 : value
        }));
    };
    
    const handleAttributesChange = (newAttributes: { [key: string]: string | number }) => {
        setNewProduct(prev => ({
            ...prev,
            attributes: newAttributes
        }));
    };

    const handleGalleryImageChange = (index: number, value: string) => {
        const newGallery = [...(newProduct.galleryImages || [])];
        newGallery[index] = value;
        setNewProduct(prev => ({ ...prev, galleryImages: newGallery }));
    };

    const handleRemoveGalleryImage = (index: number) => {
        setNewProduct(prev => ({
            ...prev,
            galleryImages: (prev.galleryImages || []).filter((_, i) => i !== index)
        }));
    };

    const handleAddGalleryImage = () => {
        if (newImageUrl.trim()) {
            const newGallery = [...(newProduct.galleryImages || []), newImageUrl.trim()];
            setNewProduct(prev => ({ ...prev, galleryImages: newGallery }));
            setNewImageUrl('');
        }
    };

    const handleSave = () => {
        if (!newProduct.name || !newProduct.category || newProduct.price <= 0) {
            alert("Veuillez remplir les champs obligatoires : Nom, Catégorie et Prix.");
            return;
        }
        onCreate(newProduct);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">{productToDuplicate ? 'Dupliquer le Produit' : 'Ajouter un Produit'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Basic Info */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom du produit *</label>
                        <input type="text" name="name" id="name" required value={newProduct.name} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Prix de vente (HT) *</label>
                            <input type="number" step="0.01" name="price" id="price" required value={newProduct.price} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm"/>
                        </div>
                        <div>
                            <label htmlFor="tvaRate" className="block text-sm font-medium text-gray-700 mb-1">Taux de TVA *</label>
                            <select name="tvaRate" id="tvaRate" value={newProduct.tvaRate} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm">
                                <option value={0.21}>21%</option>
                                <option value={0.06}>6%</option>
                                <option value={0}>0%</option>
                            </select>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
                        <input 
                            type="text" 
                            name="category" 
                            id="category" 
                            value={newProduct.category} 
                            onChange={handleChange} 
                            className="w-full border-gray-300 rounded-md shadow-sm"
                            list="category-suggestions"
                            required
                        />
                        <datalist id="category-suggestions">
                            {allCategories.map(cat => <option key={cat} value={cat} />)}
                        </datalist>
                    </div>
                     <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea name="description" id="description" value={newProduct.description || ''} onChange={handleChange} rows={3} className="w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">URL de l'image principale</label>
                            <input type="text" name="imageUrl" id="imageUrl" value={newProduct.imageUrl} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm"/>
                        </div>
                         <div>
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Quantité en stock</label>
                            <input type="number" name="stock" id="stock" value={newProduct.stock || 0} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm disabled:bg-gray-200" disabled={newProduct.isDropshipping}/>
                        </div>
                    </div>

                    {/* Gallery Images */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Galerie d'images secondaires</label>
                        <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                            {(newProduct.galleryImages || []).map((url, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <img src={url} alt={`Galerie ${index + 1}`} className="w-12 h-12 object-cover rounded-md border flex-shrink-0" />
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={(e) => handleGalleryImageChange(index, e.target.value)}
                                        className="flex-1 p-2 border-gray-300 rounded-md shadow-sm"
                                        placeholder="URL de l'image"
                                    />
                                    <button type="button" onClick={() => handleRemoveGalleryImage(index)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-end gap-2 pt-2 border-t">
                            <div className="flex-1">
                                <label htmlFor="newImageUrl" className="block text-xs font-medium text-gray-600 mb-1">Nouvelle URL d'image</label>
                                <input
                                    type="text"
                                    id="newImageUrl"
                                    value={newImageUrl}
                                    onChange={(e) => setNewImageUrl(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full p-2 border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleAddGalleryImage}
                                className="p-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 disabled:bg-gray-300"
                                disabled={!newImageUrl.trim()}
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                    </div>
                    
                    {/* Promotion Management */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Gestion de la Promotion & Ruban</h3>
                        <div className="space-y-4">
                            <div className="relative flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="isOnSale"
                                        name="isOnSale"
                                        type="checkbox"
                                        checked={newProduct.isOnSale || false}
                                        onChange={handleChange}
                                        className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="isOnSale" className="font-medium text-gray-700">Mettre ce produit en promotion</label>
                                </div>
                            </div>

                            {newProduct.isOnSale && (
                                <div>
                                    <label htmlFor="promoPrice" className="block text-sm font-medium text-gray-700 mb-1">Prix Promotionnel (HT)</label>
                                    <input 
                                        type="number" 
                                        step="0.01" 
                                        name="promoPrice" 
                                        id="promoPrice" 
                                        value={newProduct.promoPrice || ''} 
                                        onChange={handleChange} 
                                        className="w-full md:w-1/2 border-gray-300 rounded-md shadow-sm"
                                        placeholder="ex: 99.99"
                                    />
                                </div>
                            )}

                            <div>
                                <label htmlFor="ribbon-create" className="block text-sm font-medium text-gray-700 mb-1">Texte du ruban</label>
                                <input 
                                    type="text" 
                                    name="ribbon" 
                                    id="ribbon-create"
                                    value={newProduct.ribbon || ''} 
                                    onChange={handleChange} 
                                    className="w-full md:w-1/2 border-gray-300 rounded-md shadow-sm"
                                    placeholder="Ex: PROMO, NOUVEAU, -20%"
                                />
                                <p className="text-xs text-gray-500 mt-1">Ce texte s'affichera en bannière sur l'image du produit.</p>
                            </div>
                        </div>
                    </div>

                    {/* Dropshipping Management */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Gestion Dropshipping</h3>
                        <div className="space-y-4">
                            <div className="relative flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="isDropshipping" name="isDropshipping" type="checkbox" checked={newProduct.isDropshipping || false} onChange={handleChange} className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="isDropshipping" className="font-medium text-gray-700">Géré en Dropshipping</label>
                                </div>
                            </div>
                            {newProduct.isDropshipping && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="supplierId" className="block text-sm font-medium text-gray-700 mb-1">Fournisseur</label>
                                        <select name="supplierId" id="supplierId" value={newProduct.supplierId || ''} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm">
                                            <option value="">Sélectionner...</option>
                                            {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="supplierPrice" className="block text-sm font-medium text-gray-700 mb-1">Prix d'achat fournisseur (HT)</label>
                                        <input type="number" step="0.01" name="supplierPrice" id="supplierPrice" value={newProduct.supplierPrice || ''} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm"/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Attributes */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 border-t pt-6">Attributs du Produit</h3>
                         <p className="text-sm text-gray-500 mb-4">Ces attributs seront utilisés pour les filtres sur la boutique.</p>
                        <AttributeEditor
                            attributes={newProduct.attributes || {}}
                            onAttributesChange={handleAttributesChange}
                        />
                    </div>
                </div>

                <div className="flex justify-end items-center p-4 border-t bg-gray-50">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                        Annuler
                    </button>
                    <button onClick={handleSave} className="ml-3 px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-md shadow-sm hover:bg-cyan-700">
                        {productToDuplicate ? 'Dupliquer le produit' : 'Créer le produit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCreateModal;
