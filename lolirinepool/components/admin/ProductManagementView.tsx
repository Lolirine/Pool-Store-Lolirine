

import React, { useState, useMemo, useRef } from 'react';
import { Product, Supplier, ProductVariant } from '../../types';
import { Edit, PlusCircle, Trash2, Copy, ChevronDown, ChevronRight, Upload, Download, Zap, Layers } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';
import ProductEditModal from './ProductEditModal';
import ProductCreateModal from './ProductCreateModal';
import CategoryActionModal from './CategoryActionModal';
import * as XLSX from 'xlsx';

interface ProductManagementViewProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onCreateProduct: (newProduct: Omit<Product, 'id'>) => void;
  onDeleteProduct: (productId: string | number) => void;
  onBulkUpdateProducts: (products: Product[]) => void;
  suppliers: Supplier[];
  onAddCategory: (categoryPath: string) => void;
  onDeleteCategoryAndProducts: (categoryPath: string) => void;
  onRenameCategory: (oldCategoryPath: string, newCategoryName: string) => void;
  onDuplicateCategory: (sourceCategoryPath: string, newCategoryPath: string) => void;
  onUpdateStockRibbons: () => void;
}

interface CategoryNode {
    name: string;
    fullName: string;
    children: Map<string, CategoryNode>;
    productCount: number;
}

const getRibbonColor = (ribbonText: string = "") => {
    const text = ribbonText.toLowerCase();
    if (text.includes('promo')) return 'bg-red-500';
    if (text.includes('nouveau')) return 'bg-blue-500';
    if (text.includes('stock faible')) return 'bg-orange-500';
    if (text.includes('rupture')) return 'bg-gray-700';
    return 'bg-green-500';
};


const ProductManagementView: React.FC<ProductManagementViewProps> = ({ 
    products, onUpdateProduct, onCreateProduct, onDeleteProduct, onBulkUpdateProducts, suppliers,
    onAddCategory, onDeleteCategoryAndProducts, onRenameCategory, onDuplicateCategory, onUpdateStockRibbons 
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [duplicatingProduct, setDuplicatingProduct] = useState<Product | null>(null);
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['All']));
    const [expandedVariants, setExpandedVariants] = useState<Set<string|number>>(new Set());
    const [categoryAction, setCategoryAction] = useState<{ action: 'add' | 'rename' | 'duplicate', path: string } | null>(null);
    const categoryFileInputRef = useRef<HTMLInputElement>(null);
    const productFileInputRef = useRef<HTMLInputElement>(null);
    const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'lowStock' | 'outOfStock'>('all');
    
    const allCategories = useMemo(() => {
        return [...new Set(products.map(p => p.category))].sort();
    }, [products]);

    const categoryTree = useMemo(() => {
        const visibleProducts = products.filter(p => !p.isHidden);
        const root: CategoryNode = { name: 'Tous les produits', fullName: 'All', children: new Map(), productCount: visibleProducts.length };
        
        products.forEach(product => {
            // FIX: Add type guard to ensure product.category is a string before calling .split()
            if (typeof product.category !== 'string' || !product.category) {
                return; // Skip products with malformed categories
            }
            const parts = product.category.split(' - ');
            let currentNode = root;
            let currentPath = '';
            parts.forEach((part, index) => {
                currentPath = index === 0 ? part : `${currentPath} - ${part}`;
                if (!currentNode.children.has(part)) {
                    currentNode.children.set(part, { name: part, fullName: currentPath, children: new Map(), productCount: 0 });
                }
                currentNode = currentNode.children.get(part)!;
                if (!product.isHidden) {
                    currentNode.productCount++;
                }
            });
        });
        return root;
    }, [products]);

    const handleCreateProduct = (newProduct: Omit<Product, 'id'>) => {
        onCreateProduct(newProduct);
        setIsCreateModalOpen(false);
        setDuplicatingProduct(null);
    };
    
    const handleDuplicateProduct = (product: Product) => {
        setDuplicatingProduct(product);
        setIsCreateModalOpen(true);
    }

    const handleCategoryActionSave = (newName: string) => {
        if (!categoryAction) return;

        const { action, path } = categoryAction;
        const newPath = path ? `${path} - ${newName}` : newName;

        switch(action) {
            case 'add':
                onAddCategory(newPath);
                break;
            case 'rename':
                onRenameCategory(path, newName);
                break;
            case 'duplicate':
                onDuplicateCategory(path, newPath);
                break;
        }
        setCategoryAction(null);
    };

    const handleExportCategories = () => {
        const uniqueCategories = [...new Set(products.map(p => p.category))];
    
        let maxDepth = 0;
        const categoryData = uniqueCategories.map(c => {
            const parts = c.split(' - ');
            if (parts.length > maxDepth) {
                maxDepth = parts.length;
            }
            return parts;
        });
    
        const headers = Array.from({ length: maxDepth }, (_, i) => `Level ${i + 1}`);
    
        const dataForSheet = categoryData.map(parts => {
            const row: { [key: string]: string } = {};
            headers.forEach((header, i) => {
                row[header] = parts[i] || '';
            });
            return row;
        });
    
        const worksheet = XLSX.utils.json_to_sheet(dataForSheet);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Categories');
        XLSX.writeFile(workbook, 'product_categories_export.csv');
    };

    const handleCategoryFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = event.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
                const existingCategories = new Set(products.map(p => p.category));
                let newCategoriesAdded = 0;
    
                // Start from row 1 to skip header
                for (let i = 1; i < json.length; i++) {
                    const row = json[i];
                    if (row.length === 0) continue;

                    const categoryPath = row.filter(cell => cell !== null && cell !== undefined && cell !== '').join(' - ');
                    
                    if (categoryPath && !existingCategories.has(categoryPath)) {
                        onAddCategory(categoryPath);
                        existingCategories.add(categoryPath); // Avoid duplicates within the same file
                        newCategoriesAdded++;
                    }
                }
    
                alert(`${newCategoriesAdded} nouvelle(s) catégorie(s) ajoutée(s).`);
    
            } catch (error) {
                console.error("Error importing categories:", error);
                alert("Erreur lors de l'importation. Vérifiez le format du fichier.");
            }
        };
        reader.readAsBinaryString(file);
        if(e.target) e.target.value = ''; // Reset file input
    };

    const handleExportProducts = () => {
        const dataToExport = products.map(p => {
            const attributes = p.attributes ? Object.entries(p.attributes).map(([key, value]) => `${key}:${value}`).join(';') : '';
            return {
                'id': p.id,
                'name': p.name,
                'category': p.category,
                'price': p.price,
                'promoPrice': p.promoPrice,
                'isOnSale': p.isOnSale,
                'tvaRate': p.tvaRate,
                'imageUrl': p.imageUrl,
                'description': p.description,
                'stock': p.stock,
                'galleryImages': p.galleryImages?.join(','),
                'features': p.features?.join(';'),
                'isDropshipping': p.isDropshipping,
                'supplierId': p.supplierId,
                'supplierPrice': p.supplierPrice,
                'weight': p.weight,
                'dimensions': p.dimensions,
                'ean': p.ean,
                'isHidden': p.isHidden,
                'attributes': attributes,
            }
        });

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
        XLSX.writeFile(workbook, 'products_export.csv');
    };

    const handleProductFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = event.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json: any[] = XLSX.utils.sheet_to_json(worksheet);

                const importedProducts: Product[] = json.map(row => {
                    const attributes: { [key: string]: string | number } = {};
                    if (row.attributes && typeof row.attributes === 'string') {
                        row.attributes.split(';').forEach((pair: string) => {
                            const [key, value] = pair.split(':');
                            if (key && value) {
                                attributes[key.trim()] = isNaN(Number(value)) ? value.trim() : Number(value);
                            }
                        });
                    }
                    
                    const parseBoolean = (value: any) => {
                        if (typeof value === 'boolean') return value;
                        if (typeof value === 'string') return value.toLowerCase() === 'true';
                        return !!value;
                    }

                    return {
                        id: row.id,
                        name: row.name,
                        category: row.category,
                        price: parseFloat(row.price),
                        promoPrice: row.promoPrice ? parseFloat(row.promoPrice) : undefined,
                        isOnSale: parseBoolean(row.isOnSale),
                        tvaRate: parseFloat(row.tvaRate),
                        imageUrl: row.imageUrl,
                        description: row.description,
                        stock: row.stock ? parseInt(String(row.stock), 10) : undefined,
                        galleryImages: typeof row.galleryImages === 'string' ? row.galleryImages.split(',').map(s => s.trim()) : [],
                        features: typeof row.features === 'string' ? row.features.split(';').map(s => s.trim()) : [],
                        isDropshipping: parseBoolean(row.isDropshipping),
                        supplierId: row.supplierId,
                        supplierPrice: row.supplierPrice ? parseFloat(row.supplierPrice) : undefined,
                        weight: row.weight ? parseFloat(row.weight) : undefined,
                        dimensions: row.dimensions,
                        ean: row.ean,
                        isHidden: parseBoolean(row.isHidden),
                        attributes: attributes,
                        // Default undefined fields for new products
                        rating: undefined,
                        reviewCount: undefined,
                        reviews: [],
                    };
                }).filter(p => p.name && p.category && !isNaN(p.price));

                if (importedProducts.length > 0) {
                    onBulkUpdateProducts(importedProducts);
                    alert(`${importedProducts.length} produits ont été importés ou mis à jour. Les nouvelles catégories ont été créées si nécessaire.`);
                } else {
                    alert("Aucun produit valide trouvé dans le fichier. Assurez-vous que les colonnes 'name', 'category', et 'price' sont présentes et correctement remplies.");
                }

            } catch (error) {
                console.error("Error importing products:", error);
                alert("Erreur lors de l'importation. Vérifiez le format du fichier.");
            }
        };
        reader.readAsBinaryString(file);
        if (e.target) e.target.value = '';
    };

    const toggleVariantExpansion = (productId: string | number) => {
        setExpandedVariants(prev => {
            const newSet = new Set(prev);
            if (newSet.has(productId)) {
                newSet.delete(productId);
            } else {
                newSet.add(productId);
            }
            return newSet;
        });
    };
    
    const renderCategoryTree = (node: CategoryNode, level = 0) => {
        const isExpanded = expandedCategories.has(node.fullName);
        const hasChildren = node.children.size > 0;
        
        const sortedChildren = Array.from(node.children.values()).sort((a,b) => a.name.localeCompare(b.name));

        return (
            <div style={{ paddingLeft: level > 0 ? '1rem' : '0' }}>
                <div 
                    className={`group flex items-center justify-between p-2 rounded-md cursor-pointer ${selectedCategory === node.fullName ? 'bg-cyan-100 text-cyan-800' : 'hover:bg-gray-100'}`}
                >
                    <div className="flex items-center flex-1 min-w-0" onClick={() => setSelectedCategory(node.fullName)}>
                         {hasChildren ? (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedCategories(prev => {
                                        const newSet = new Set(prev);
                                        if (newSet.has(node.fullName)) {
                                            newSet.delete(node.fullName);
                                        } else {
                                            newSet.add(node.fullName);
                                        }
                                        return newSet;
                                    });
                                }}
                                className="mr-1 p-1 rounded-full hover:bg-gray-200"
                            >
                                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </button>
                        ) : <div className="w-6 mr-1"></div>}
                        <span className="font-medium text-sm truncate">{node.name}</span>
                        <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full flex-shrink-0">{node.productCount}</span>
                    </div>
                    {node.fullName !== 'All' && (
                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setCategoryAction({ action: 'rename', path: node.fullName })} title="Renommer" className="p-1 hover:text-cyan-600"><Edit size={14}/></button>
                            <button onClick={() => setCategoryAction({ action: 'duplicate', path: node.fullName })} title="Dupliquer" className="p-1 hover:text-blue-600"><Copy size={14}/></button>
                            <button onClick={() => onDeleteCategoryAndProducts(node.fullName)} title="Supprimer" className="p-1 hover:text-red-600"><Trash2 size={14}/></button>
                        </div>
                    )}
                </div>
                 {isExpanded && hasChildren && (
                    <div className="mt-1">
                        {sortedChildren.map(child => renderCategoryTree(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    const displayedProducts = useMemo(() => {
        let prods = products.filter(p => !p.isHidden);

        if (selectedCategory !== 'All') {
            prods = prods.filter(p => p.category.startsWith(selectedCategory));
        }
        
        switch (stockFilter) {
            case 'inStock':
                prods = prods.filter(p => p.isDropshipping || (p.stock !== undefined && p.stock > 5));
                break;
            case 'lowStock':
                prods = prods.filter(p => !p.isDropshipping && p.stock !== undefined && p.stock > 0 && p.stock <= 5);
                break;
            case 'outOfStock':
                prods = prods.filter(p => !p.isDropshipping && p.stock !== undefined && p.stock <= 0);
                break;
            default:
                break;
        }
        
        return prods;
    }, [products, selectedCategory, stockFilter]);

    const stockFilterButtons = [
        { label: 'Tous', value: 'all' },
        { label: 'En stock', value: 'inStock' },
        { label: 'Stock faible', value: 'lowStock' },
        { label: 'Rupture', value: 'outOfStock' },
    ];

    const renderProductRow = (product: Product, isVariant = false) => {
        const hasVariants = !isVariant && product.variants && product.variants.length > 0;
        const isExpanded = hasVariants && expandedVariants.has(product.id);
        
        return (
            <React.Fragment key={product.id}>
                <tr className={`border-b hover:bg-gray-50 align-top ${isVariant ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className={`p-2 ${isVariant ? 'pl-10' : ''}`}>
                        <img src={product.imageUrl} alt={product.name} className="h-12 w-12 object-cover rounded-md"/>
                    </td>
                    <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-normal">
                        <div className="flex items-center gap-2">
                           {hasVariants && (
                                <button onClick={() => toggleVariantExpansion(product.id)} className="p-1 hover:bg-gray-200 rounded-full">
                                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </button>
                            )}
                            <div className={hasVariants ? '' : 'pl-7'}>
                                <div className="font-bold">{product.name}</div>
                                {product.ribbon && <span className={`text-xs font-bold text-white ${getRibbonColor(product.ribbon)} px-2 py-0.5 rounded-full mt-1 inline-block`}>{product.ribbon}</span>}
                                {!isVariant && <p className="text-xs text-gray-500 font-normal mt-1 line-clamp-2">{product.description}</p>}
                                {hasVariants && <p className="text-xs text-blue-600 font-semibold mt-1">{product.variants?.length} variante(s)</p>}
                            </div>
                        </div>
                    </th>
                    <td className="px-4 py-4">
                        {product.isOnSale && product.promoPrice != null ? (
                            <div className="flex flex-col">
                                <span className="font-bold text-red-600">{formatCurrency(product.promoPrice * (1 + product.tvaRate))}</span>
                                <span className="text-xs text-gray-500 line-through">{formatCurrency(product.price * (1 + product.tvaRate))}</span>
                            </div>
                        ) : (
                            <span className="font-semibold text-gray-800">{formatCurrency(product.price * (1 + product.tvaRate))}</span>
                        )}
                    </td>
                    <td className="px-4 py-4 text-center space-x-1">
                       <button onClick={() => setEditingProduct(product)} className="p-2 text-cyan-600 hover:text-cyan-800 hover:bg-cyan-50 rounded-full" title="Modifier">
                            <Edit size={16} />
                        </button>
                         <button onClick={() => handleDuplicateProduct(product)} className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full" title="Dupliquer">
                            <Copy size={16} />
                        </button>
                         <button onClick={() => onDeleteProduct(product.id)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full" title="Supprimer">
                            <Trash2 size={16} />
                        </button>
                    </td>
                </tr>
                {isExpanded && product.variants?.map(variant => (
                     <tr key={variant.id} className="border-b hover:bg-gray-100 align-top bg-gray-50">
                        <td className="p-2 pl-10">
                            <img src={variant.imageUrl || product.imageUrl} alt={variant.name} className="h-10 w-10 object-cover rounded-md"/>
                        </td>
                        <th scope="row" className="px-4 py-4 font-medium text-gray-700">
                             <div className="pl-7">{variant.name}</div>
                        </th>
                        <td className="px-4 py-4">
                            <span className="font-semibold text-gray-600">{formatCurrency((product.price + (variant.priceModifier || 0)) * (1 + product.tvaRate))}</span>
                        </td>
                        <td className="px-4 py-4 text-center">
                            <span className="text-sm font-semibold">{variant.stock} en stock</span>
                        </td>
                    </tr>
                ))}
            </React.Fragment>
        );
    };


    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Sidebar */}
        <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-md flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">Catégories</h3>
                <button onClick={() => setCategoryAction({ action: 'add', path: ''})} title="Ajouter une catégorie racine" className="p-2 text-cyan-600 hover:bg-cyan-100 rounded-full">
                    <PlusCircle size={20} />
                </button>
            </div>
            
            <div className="space-y-3 mb-4 border-b pb-4">
                <div className="grid grid-cols-2 gap-2">
                    <button onClick={handleExportCategories} className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold py-2 px-3 rounded-md hover:bg-gray-200 transition-colors text-xs">
                        <Download size={14} /> Exporter Catégories
                    </button>
                    <input type="file" ref={categoryFileInputRef} onChange={handleCategoryFileImport} className="hidden" accept=".xlsx, .xls, .csv" />
                    <button onClick={() => categoryFileInputRef.current?.click()} className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold py-2 px-3 rounded-md hover:bg-gray-200 transition-colors text-xs">
                        <Upload size={14} /> Importer Catégories
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <button onClick={handleExportProducts} className="flex items-center justify-center gap-2 bg-blue-100 text-blue-700 font-semibold py-2 px-3 rounded-md hover:bg-blue-200 transition-colors text-xs">
                        <Download size={14} /> Exporter Produits
                    </button>
                    <input type="file" ref={productFileInputRef} onChange={handleProductFileImport} className="hidden" accept=".xlsx, .xls, .csv" />
                    <button onClick={() => productFileInputRef.current?.click()} className="flex items-center justify-center gap-2 bg-blue-100 text-blue-700 font-semibold py-2 px-3 rounded-md hover:bg-blue-200 transition-colors text-xs">
                        <Upload size={14} /> Importer Produits
                    </button>
                </div>
                <button onClick={onUpdateStockRibbons} className="flex items-center justify-center gap-2 bg-purple-100 text-purple-700 font-semibold py-2 px-3 rounded-md hover:bg-purple-200 transition-colors text-sm w-full">
                    <Zap size={16} /> M.à.J Rubans de Stock
                </button>
            </div>
             <h4 className="text-sm font-semibold mb-2">Filtrer par stock</h4>
            <div className="flex flex-wrap gap-2 mb-4">
                {stockFilterButtons.map(btn => (
                    <button
                        key={btn.value}
                        onClick={() => setStockFilter(btn.value as any)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${stockFilter === btn.value ? 'bg-cyan-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto pr-2 border-t pt-4">
                {renderCategoryTree(categoryTree)}
            </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Gestion : {selectedCategory === 'All' ? 'Tous les produits' : selectedCategory}</h2>
                    <p className="text-sm text-gray-500">{displayedProducts.length} produits affichés</p>
                </div>
                 <button onClick={() => { setDuplicatingProduct(null); setIsCreateModalOpen(true); }} className="flex items-center gap-2 bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors">
                    <PlusCircle size={20} />
                    Ajouter un produit
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-4 py-3 w-16">Image</th>
                            <th scope="col" className="px-4 py-3">Produit</th>
                            <th scope="col" className="px-4 py-3">Prix TTC</th>
                            <th scope="col" className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedProducts.map(product => renderProductRow(product))}
                    </tbody>
                </table>
            </div>
             {editingProduct && (
                <ProductEditModal 
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onSave={(p) => { onUpdateProduct(p); setEditingProduct(null); }}
                    suppliers={suppliers}
                />
            )}
             {(isCreateModalOpen) && (
                <ProductCreateModal
                    onClose={() => { setIsCreateModalOpen(false); setDuplicatingProduct(null); }}
                    onCreate={handleCreateProduct}
                    allCategories={allCategories}
                    suppliers={suppliers}
                    initialCategory={selectedCategory === 'All' ? undefined : selectedCategory}
                    productToDuplicate={duplicatingProduct}
                />
            )}
            {categoryAction && (
                <CategoryActionModal
                    action={categoryAction.action}
                    categoryPath={categoryAction.path}
                    onClose={() => setCategoryAction(null)}
                    onSave={handleCategoryActionSave}
                />
            )}
        </div>
      </div>
    );
};

export default ProductManagementView;