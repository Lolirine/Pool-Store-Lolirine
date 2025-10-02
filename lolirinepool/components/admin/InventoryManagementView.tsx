import React, { useState } from 'react';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatting';
import { Archive, AlertTriangle } from 'lucide-react';

interface InventoryManagementViewProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
}

const InventoryManagementView: React.FC<InventoryManagementViewProps> = ({ products, onUpdateProduct }) => {
  const [stockLevels, setStockLevels] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleStockChange = (productId: string | number, value: string) => {
    setStockLevels(prev => ({ ...prev, [String(productId)]: value }));
  };

  const handleUpdateStock = (product: Product) => {
    const newStockValue = stockLevels[String(product.id)];
    if (newStockValue === undefined) return; 

    const newStock = parseInt(newStockValue, 10);
    if (product && !isNaN(newStock) && newStock >= 0) {
      onUpdateProduct({ ...product, stock: newStock });
    } else {
        // Reset input to original value if invalid
        setStockLevels(prev => ({ ...prev, [String(product.id)]: String(product.stock || 0) }));
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Archive size={24} className="mr-3" />
            Gestion de l'Inventaire
        </h2>
        <input 
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 w-16">Image</th>
              <th scope="col" className="px-4 py-3">Produit</th>
              <th scope="col" className="px-4 py-3">Catégorie</th>
              <th scope="col" className="px-4 py-3 text-center">Stock Actuel</th>
              <th scope="col" className="px-4 py-3 text-center w-48">Mettre à Jour le Stock</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                <td className="p-2">
                  <img src={product.imageUrl} alt={product.name} className="h-12 w-12 object-cover rounded-md" />
                </td>
                <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-normal">
                  {product.name}
                </th>
                <td className="px-4 py-4 text-gray-600">{product.category}</td>
                <td className="px-4 py-4 text-center">
                    {product.stock === 0 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <AlertTriangle size={12} className="mr-1.5"/> Rupture
                        </span>
                    ) : (
                        <span className="text-lg font-bold text-gray-800">{product.stock}</span>
                    )}
                </td>
                <td className="px-4 py-4 text-center">
                  <input
                    type="number"
                    value={stockLevels[String(product.id)] ?? product.stock ?? '0'}
                    onChange={(e) => handleStockChange(product.id, e.target.value)}
                    onBlur={() => handleUpdateStock(product)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUpdateStock(product)}
                    className="w-24 p-2 text-center border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-cyan-500"
                    min="0"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManagementView;