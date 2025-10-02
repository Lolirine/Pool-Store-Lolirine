import React, { useState, useMemo, useEffect } from 'react';
import { ShopPageProps, Product, FilterFacet, ActiveFilters } from '../types';
import { Search } from 'lucide-react';
import ProductCard, { ProductsCarousel } from '../components/ProductCard';
import Pagination from '../components/Pagination';

const PRICE_RANGES = [
    { label: 'Moins de 50 €', value: '0-50' },
    { label: '50 € - 100 €', value: '50-100' },
    { label: '100 € - 200 €', value: '100-200' },
    { label: '200 € - 500 €', value: '200-500' },
    { label: '500 € et plus', value: '500-Infinity' },
];

const categoryColors: { [key: string]: string } = {
    'Wellness': 'bg-cyan-500 text-white hover:bg-cyan-600',
    'Promotions': 'bg-red-500 text-white hover:bg-red-600',
    'Nettoyage': 'bg-blue-500 text-white hover:bg-blue-600',
    'Filtration': 'bg-indigo-500 text-white hover:bg-indigo-600',
    'Pompes': 'bg-purple-600 text-white hover:bg-purple-700',
    "Traitement de l'eau": 'bg-teal-500 text-white hover:bg-teal-600',
    'Instruments de mesure': 'bg-fuchsia-500 text-white hover:bg-fuchsia-600',
    'Matériel Électrique': 'bg-pink-600 text-white hover:bg-pink-700',
    'Pièces à sceller': 'bg-orange-500 text-white hover:bg-orange-600',
    'Raccords & PVC': 'bg-yellow-500 text-black hover:bg-yellow-600',
    'Chauffage': 'bg-red-600 text-white hover:bg-red-700',
    'Liners': 'bg-green-500 text-white hover:bg-green-600',
    'Tout voir': 'bg-slate-600 text-white hover:bg-slate-700',
};
const defaultCategoryColor = 'bg-gray-200 text-gray-800 hover:bg-gray-300';
const selectedCategoryRing = 'ring-4 ring-offset-2 ring-cyan-500';


const ShopPage: React.FC<ShopPageProps> = (props) => {
  const { products, addToCart, onBuyNow, onSelectProduct, initialCategoryFilter, initialSearchTerm, wishlist, addToWishlist, recentlyViewed, navigateTo } = props;
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter || 'Tous');
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '');
  const [sortOrder, setSortOrder] = useState('name-asc');
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;
  
  useEffect(() => {
    setSelectedCategory(initialCategoryFilter || 'Tous');
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
    } else {
      setSearchTerm('');
    }
    setActiveFilters({});
    setSelectedPriceRanges([]);
    setCurrentPage(1);
  }, [initialCategoryFilter, initialSearchTerm]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, activeFilters, selectedPriceRanges]);

  const filteredProducts = useMemo(() => {
    // A robust, multi-stage filtering approach to ensure correctness.
    let filtered = [...products];

    // 1. Category Filter
    if (selectedCategory && selectedCategory !== 'Tous') {
      if (selectedCategory === 'Promotions') {
        filtered = filtered.filter(p => p.isOnSale === true);
      } else {
        filtered = filtered.filter(p => {
          // Guard against products with no category
          if (!p.category || typeof p.category !== 'string') {
            return false;
          }
          // A product's category must either match the filter exactly
          // or start with the filter followed by a separator, for hierarchy.
          return p.category === selectedCategory || p.category.startsWith(selectedCategory + ' - ');
        });
      }
    }
    
    // 2. Search Term Filter
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(p => {
        const nameMatch = p.name.toLowerCase().includes(lowercasedTerm);
        const descriptionMatch = p.description ? p.description.toLowerCase().includes(lowercasedTerm) : false;
        const categoryMatch = p.category.toLowerCase().includes(lowercasedTerm);
        return nameMatch || descriptionMatch || categoryMatch;
      });
    }
    
    // 3. Price Range Filter
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter(p => {
        const price = (p.promoPrice ?? p.price) * (1 + p.tvaRate);
        return selectedPriceRanges.some(range => {
          const [minStr, maxStr] = range.split('-');
          const min = parseFloat(minStr);
          const max = maxStr === 'Infinity' ? Infinity : parseFloat(maxStr);
          return price >= min && (max === Infinity || price < max);
        });
      });
    }
    
    // 4. Attribute Filters
    // FIX: Refactored to use Object.keys to fix type inference issues with `values`.
    if (Object.keys(activeFilters).length > 0) {
        filtered = filtered.filter(p => {
            return Object.keys(activeFilters).every(key => {
                const values = activeFilters[key];
                // If a filter has no selected values, it shouldn't filter anything out.
                if (!values || values.length === 0) return true;
                
                // If product has no attributes, it can't match.
                if (!p.attributes) return false;

                const productValue = p.attributes[key];
                
                // If product doesn't have the attribute key, it can't match.
                if (productValue === undefined) return false;
                
                // Check if the product's attribute value is in the list of selected values for that filter.
                return values.includes(productValue);
            });
        });
    }

    return filtered;
  }, [products, selectedCategory, searchTerm, activeFilters, selectedPriceRanges]);

  const filterFacets = useMemo(() => {
    const facets: FilterFacet[] = [];
    const attributeKeys = new Set<string>();
    filteredProducts.forEach(p => {
        if(p.attributes) {
            Object.keys(p.attributes).forEach(key => attributeKeys.add(key));
        }
    });

    attributeKeys.forEach(key => {
        const options: { [value: string]: number } = {};
        filteredProducts.forEach(p => {
            if (p.attributes && p.attributes[key] !== undefined) {
                const value = String(p.attributes[key]);
                options[value] = (options[value] || 0) + 1;
            }
        });
        if (Object.keys(options).length > 1) { // Only show facets with more than one option
            facets.push({
                name: key,
                options: Object.entries(options).map(([value, count]) => ({ value, count })).sort((a,b) => a.value.localeCompare(b.value))
            });
        }
    });
    return facets;
  }, [filteredProducts]);

  const handleFilterChange = (facetName: string, value: string | number) => {
    setActiveFilters(prev => {
        const newFilters = { ...prev };
        const currentValues = newFilters[facetName] || [];
        if (currentValues.includes(value)) {
            newFilters[facetName] = currentValues.filter(v => v !== value);
        } else {
            newFilters[facetName] = [...currentValues, value];
        }
        if (newFilters[facetName].length === 0) {
            delete newFilters[facetName];
        }
        return newFilters;
    });
  };

  const handlePriceRangeChange = (rangeValue: string) => {
    setSelectedPriceRanges(prev => {
        if (prev.includes(rangeValue)) {
            return prev.filter(r => r !== rangeValue);
        } else {
            return [...prev, rangeValue];
        }
    });
  };

  const clearFilters = () => {
    setActiveFilters({});
    setSelectedPriceRanges([]);
  }

  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];

    sorted.sort((a, b) => {
        switch (sortOrder) {
            case 'price-asc':
                return (a.promoPrice ?? a.price) - (b.promoPrice ?? b.price);
            case 'price-desc':
                return (b.promoPrice ?? b.price) - (a.promoPrice ?? a.price);
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });
    
    return sorted;
  }, [filteredProducts, sortOrder]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

  const categoryNavItems = useMemo(() => {
    const topLevelCategories = [...new Set(products.map(p => p.category.split(' - ')[0]))].sort();
    return [
      { name: 'Tout voir', filter: 'Tous' },
      { name: 'Promotions', filter: 'Promotions' },
      ...topLevelCategories.map(cat => ({ name: cat, filter: cat }))
    ];
  }, [products]);


  return (
    <div className="bg-gray-100">
      <div className="bg-gradient-to-br from-cyan-50 to-blue-100 py-16 sm:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative lg:h-[400px] flex items-center justify-center">
            {/* Decorative images for large screens */}
            <div className="hidden lg:block">
              <img 
                src="https://storage.googleapis.com/lolirinepoolstoreimage/Image%20notre%20boutique.jpeg" 
                alt="Entretien de piscine" 
                className="absolute top-0 -left-24 w-48 rounded-lg shadow-xl transform -rotate-12 hover:scale-105 hover:-rotate-6 transition-transform duration-300" 
              />
              <img 
                src="https://storage.googleapis.com/lolirinepoolstoreimage/Image%20notre%20boutique1.jpeg" 
                alt="Équipement de piscine" 
                className="absolute -top-12 right-0 w-64 rounded-lg shadow-xl transform rotate-6 hover:scale-105 hover:rotate-3 transition-transform duration-300" 
              />
              <img 
                src="https://storage.googleapis.com/lolirinepoolstoreimage/Image%20notre%20boutique2.jpeg" 
                alt="Nettoyage de piscine" 
                className="absolute bottom-0 -left-8 w-40 rounded-lg shadow-xl transform rotate-3 hover:scale-105 hover:rotate-1 transition-transform duration-300" 
              />
              <img 
                src="https://storage.googleapis.com/lolirinepoolstoreimage/Image%20notre%20boutique3.jpeg" 
                alt="Robot de piscine" 
                className="absolute -bottom-16 right-16 w-72 rounded-lg shadow-xl transform -rotate-3 hover:scale-105 hover:-rotate-1 transition-transform duration-300" 
              />
            </div>

            <div className="text-center relative z-10 bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-lg">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 capitalize">
                {initialCategoryFilter || (initialSearchTerm ? `Recherche pour "${initialSearchTerm}"` : 'Notre Boutique')}
              </h1>
              <div className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto space-y-2">
                <p>🏊‍♀️ Bienvenue dans la boutique la plus complète dédiée à l’univers de la piscine.</p>
                <p>Trouvez tout ce dont vous avez besoin, du spa au robot, en passant par l’entretien, les accessoires et les équipements techniques.</p>
                <p className="font-semibold text-gray-700">Un seul site, une infinité de solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 bg-white border-b sticky top-[164px] z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3">
                {categoryNavItems.map(cat => {
                    const isSelected = selectedCategory === cat.filter;
                    const colorClass = categoryColors[cat.name] || defaultCategoryColor;
                    return (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.filter)}
                            className={`px-5 py-2.5 text-sm font-semibold rounded-full shadow-md transition-all duration-200 transform hover:-translate-y-0.5 ${colorClass} ${isSelected ? selectedCategoryRing : ''}`}
                        >
                            {cat.name}
                        </button>
                    );
                })}
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-[300px]">
              <h2 className="text-xl font-bold mb-4">Filtres</h2>
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher dans les résultats..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
              </div>

              <div className="border-t py-4">
                <h3 className="font-semibold mb-2">Prix</h3>
                <div className="space-y-2">
                    {PRICE_RANGES.map(range => (
                        <label key={range.value} className="flex items-center space-x-2 text-sm">
                            <input
                                type="checkbox"
                                checked={selectedPriceRanges.includes(range.value)}
                                onChange={() => handlePriceRangeChange(range.value)}
                                className="rounded text-cyan-600 focus:ring-cyan-500"
                            />
                            <span>{range.label}</span>
                        </label>
                    ))}
                </div>
              </div>
              
              {filterFacets.map(facet => (
                <div key={facet.name} className="border-t py-4">
                  <h3 className="font-semibold mb-2 capitalize">{facet.name}</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {facet.options.map(option => (
                      <label key={String(option.value)} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={activeFilters[facet.name]?.includes(option.value) || false}
                          onChange={() => handleFilterChange(facet.name, option.value)}
                          className="rounded text-cyan-600 focus:ring-cyan-500"
                        />
                        <span>{option.value} ({option.count})</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {(Object.keys(activeFilters).length > 0 || selectedPriceRanges.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm text-red-600 hover:underline"
                >
                  Effacer les filtres
                </button>
              )}
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
              <p className="text-sm text-gray-600">{filteredProducts.length} produits trouvés</p>
              <div className="flex items-center gap-4">
                <select
                  value={sortOrder}
                  onChange={e => setSortOrder(e.target.value)}
                  className="border-gray-300 rounded-md shadow-sm text-sm"
                >
                  <option value="name-asc">Nom (A-Z)</option>
                  <option value="name-desc">Nom (Z-A)</option>
                  <option value="price-asc">Prix (croissant)</option>
                  <option value="price-desc">Prix (décroissant)</option>
                </select>
              </div>
            </div>

            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    onBuyNow={onBuyNow}
                    onSelectProduct={onSelectProduct}
                    wishlist={wishlist}
                    addToWishlist={addToWishlist}
                  />
                ))}
              </div>
            ) : (
                <div className="text-center bg-white p-12 rounded-lg shadow-sm">
                  <Search size={48} className="mx-auto text-gray-300 mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-700 mb-2">Aucun produit trouvé</h2>
                  <p className="text-gray-500 mb-6">Essayez d'ajuster vos filtres ou votre recherche.</p>
              </div>
            )}


            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </main>
        </div>
      </div>
       {recentlyViewed && recentlyViewed.length > 0 && (
        <ProductsCarousel
            products={recentlyViewed}
            title="Consultés Récemment"
            addToCart={addToCart}
            onBuyNow={onBuyNow}
            onSelectProduct={onSelectProduct}
            navigateTo={navigateTo}
            wishlist={wishlist}
            addToWishlist={addToWishlist}
            bgColor="bg-white"
        />
      )}
    </div>
  );
};

export default ShopPage;