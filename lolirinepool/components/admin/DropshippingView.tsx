import React, { useState } from 'react';
import { Order, Supplier, SupplierStatus, Product } from '../../types';
import { Truck, Edit, Check, Database, Upload, Download, Zap } from 'lucide-react';
import * as XLSX from 'xlsx';

interface DropshippingViewProps {
  orders: Order[];
  onUpdateOrder: (order: Order) => void;
  suppliers: Supplier[];
  products: Product[];
  onBulkUpdateProducts: (products: Product[]) => void;
}

const getStatusClass = (status: SupplierStatus) => {
    switch (status) {
        case 'En attente': return 'bg-yellow-100 text-yellow-800';
        case 'Envoyé au fournisseur': return 'bg-blue-100 text-blue-800';
        case 'Expédié': return 'bg-green-100 text-green-800';
    }
};

const DropshippingView: React.FC<DropshippingViewProps> = ({ orders, onUpdateOrder, suppliers, products, onBulkUpdateProducts }) => {
  const dropshippingOrders = orders.filter(o => o.isDropshippingOrder);
  const [editingTracking, setEditingTracking] = useState<string | null>(null);
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleStatusChange = (order: Order, newStatus: SupplierStatus) => {
    const updatedOrder = { ...order, supplierStatus: newStatus };
    onUpdateOrder(updatedOrder);

    if (newStatus === 'Expédié' && updatedOrder.trackingNumber) {
        console.log(`SIMULATE: Shipping confirmation email for order ${order.id}`);
    }
  };

  const handleTrackingUpdate = (order: Order) => {
    const updatedOrder = { ...order, trackingNumber };
    onUpdateOrder(updatedOrder);

    if (updatedOrder.supplierStatus === 'Expédié') {
        console.log(`SIMULATE: Shipping confirmation email for order ${order.id}`);
    }

    setEditingTracking(null);
    setTrackingNumber('');
  };
  
  const getSupplierName = (supplierId: string) => {
    return suppliers.find(s => s.id === supplierId)?.name || 'Inconnu';
  };

  const handleExport = (supplier: Supplier) => {
    const supplierProducts = products.filter(p => p.supplierId === supplier.id);

    if (supplierProducts.length === 0) {
        alert(`Aucun produit n'est actuellement associé au fournisseur ${supplier.name}.`);
        return;
    }

    const dataToExport = supplierProducts.map(p => ({
        'Référence produit (SKU)': p.id,
        'Nom du produit': p.name,
        'Description': p.description || '',
        'Photos (URL)': p.imageUrl,
        'Prix public conseillé': p.price,
        'Prix d’achat (revendeur)': p.supplierPrice,
        'Poids (kg)': p.weight,
        'Dimensions': p.dimensions,
        'Codes-barres (EAN/UPC)': p.ean,
        'Stock disponible': p.stock,
        'category': p.category,
        'promoPrice': p.promoPrice,
        'isOnSale': p.isOnSale,
        'tvaRate': p.tvaRate,
        'galleryImages': p.galleryImages?.join(', '),
        'attributes': JSON.stringify(p.attributes),
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Produits_${supplier.name}`);
    XLSX.writeFile(workbook, `catalogue_${supplier.name.replace(/\s/g, '_')}.xlsx`);
  };
  
  const handleApiSimulate = (supplier: Supplier) => {
    alert(`Ceci simule une synchronisation API avec le fournisseur ${supplier.name}. Dans une application réelle, cela mettrait à jour automatiquement les stocks, les prix et le catalogue de produits.`);
  };

  const processImportedFile = (file: File, supplier: Supplier) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = event.target?.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json: any[] = XLSX.utils.sheet_to_json(worksheet);

            const importedProducts: Product[] = json.map(row => ({
                id: row['Référence produit (SKU)'] || row.id,
                name: row['Nom du produit'] || row.name,
                description: row.Description || row.description,
                imageUrl: row['Photos (URL)'] || row.imageUrl,
                price: parseFloat(row['Prix public conseillé']) || parseFloat(row.price) || 0,
                supplierPrice: parseFloat(row['Prix d’achat (revendeur)']) || parseFloat(row.supplierPrice),
                weight: parseFloat(row['Poids (kg)']) || parseFloat(row.weight),
                dimensions: row.Dimensions || row.dimensions,
                ean: row['Codes-barres (EAN/UPC)'] || row.ean,
                stock: parseInt(row['Stock disponible'], 10) || parseInt(row.stock, 10) || 0,
                category: row.category || 'Dropshipping',
                promoPrice: row.promoPrice ? parseFloat(row.promoPrice) : undefined,
                isOnSale: String(row.isOnSale).toLowerCase() === 'true',
                tvaRate: parseFloat(row.tvaRate) || 0.20,
                galleryImages: typeof row.galleryImages === 'string' ? row.galleryImages.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
                attributes: typeof row.attributes === 'string' ? JSON.parse(row.attributes) : {},
                isDropshipping: true,
                supplierId: supplier.id,
            }));

            const validProducts = importedProducts.filter(p => p.id && p.name && p.price > 0);
            
            if (validProducts.length !== importedProducts.length) {
                alert("Certaines lignes du fichier ont été ignorées car elles manquaient de données essentielles (ID/SKU, Nom, ou Prix).");
            }

            if (validProducts.length > 0) {
                onBulkUpdateProducts(validProducts);
                alert(`${validProducts.length} produits du fournisseur ${supplier.name} ont été importés/mis à jour.`);
            } else if (importedProducts.length > 0) {
                 alert("Aucun produit valide n'a été trouvé dans le fichier.");
            }
        } catch (error) {
            console.error("Error importing file:", error);
            alert("Erreur lors de l'importation du fichier. Vérifiez le format du fichier et les données.");
        }
    };
    reader.readAsBinaryString(file);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>, supplier: Supplier) => {
      const file = e.target.files?.[0];
      if (!file) return;
      processImportedFile(file, supplier);
      e.target.value = ''; // Reset file input
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
          <Truck size={24} className="mr-3" />
          Suivi des Commandes en Dropshipping
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Commande</th>
                <th scope="col" className="px-6 py-3">Client</th>
                <th scope="col" className="px-6 py-3">Produits</th>
                <th scope="col" className="px-6 py-3">Statut Fournisseur</th>
                <th scope="col" className="px-6 py-3">N° de Suivi</th>
              </tr>
            </thead>
            <tbody>
              {dropshippingOrders.map(order => (
                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">
                      <ul className="list-disc list-inside">
                          {order.items.filter(i => i.isDropshipping).map(item => (
                              <li key={item.id}>
                                  {item.quantity}x {item.name} ({getSupplierName(item.supplierId!)})
                              </li>
                          ))}
                      </ul>
                  </td>
                  <td className="px-6 py-4">
                      <select
                          value={order.supplierStatus}
                          onChange={(e) => handleStatusChange(order, e.target.value as SupplierStatus)}
                          className={`text-xs font-medium p-1 rounded-md border-0 focus:ring-2 focus:ring-offset-1 ${getStatusClass(order.supplierStatus!)}`}
                      >
                          <option value="En attente">En attente</option>
                          <option value="Envoyé au fournisseur">Envoyé</option>
                          <option value="Expédié">Expédié</option>
                      </select>
                  </td>
                  <td className="px-6 py-4">
                    {editingTracking === order.id ? (
                      <div className="flex items-center gap-2">
                          <input
                              type="text"
                              value={trackingNumber}
                              onChange={(e) => setTrackingNumber(e.target.value)}
                              className="w-full p-1 border-gray-300 rounded-md shadow-sm"
                          />
                          <button onClick={() => handleTrackingUpdate(order)} className="p-2 text-green-600 hover:bg-green-100 rounded-full"><Check size={16}/></button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                          <span>{order.trackingNumber || 'N/A'}</span>
                          <button onClick={() => { setEditingTracking(order.id); setTrackingNumber(order.trackingNumber || ''); }} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                              <Edit size={16}/>
                          </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

       <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
                <Database size={24} className="mr-3" />
                Gestion des Catalogues Fournisseurs
            </h2>
            <p className="text-sm text-gray-600 mb-6">Importez les catalogues de vos fournisseurs pour ajouter ou mettre à jour des produits en masse. Les produits importés seront automatiquement configurés pour le dropshipping.</p>
            
            <div className="space-y-4">
                {suppliers.map(supplier => (
                    <div key={supplier.id} className="p-4 border rounded-lg bg-gray-50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div className="font-semibold text-gray-800">{supplier.name}</div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <label className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 font-semibold py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm cursor-pointer">
                                <Upload size={16} /> Importer
                                <input type="file" accept=".xlsx, .xls, .csv" className="hidden" onChange={(e) => handleImport(e, supplier)} />
                            </label>
                            <button onClick={() => handleExport(supplier)} className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 font-semibold py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                <Download size={16} /> Exporter
                            </button>
                             <button onClick={() => handleApiSimulate(supplier)} className="flex items-center gap-2 bg-blue-100 text-blue-700 border border-blue-200 font-semibold py-2 px-3 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                                <Zap size={16} /> Simuler Synchro API
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default DropshippingView;