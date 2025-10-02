import React, { useState, useMemo } from 'react';
import { ProductDetailPageProps, Product } from '../types';
import { formatCurrency } from '../utils/formatting';
import { ShoppingCart, Heart, Star, Plus, Minus, Check, AlertTriangle, ChevronRight, RefreshCw, Truck, Award, Home as HomeIcon, Zap } from 'lucide-react';
import { ProductsCarousel } from '../components/ProductCard';
import GoBackButton from '../components/GoBackButton';

const Breadcrumb: React.FC<{ product: Product, navigateTo: ProductDetailPageProps['navigateTo'] }> = ({ product, navigateTo }) => {
    const categoryParts = product.category.split(' - ');
    const path = [{ name: 'Accueil', filter: 'home' as const }, ...categoryParts.map(part => ({ name: part, filter: part }))];

    const handleNavigate = (index: number) => {
        if (index === 0) {
            navigateTo('home');
        } else {
            const categoryFilter = categoryParts.slice(0, index).join(' - ');
            navigateTo('shop', { categoryFilter });
        }
    }

    return (
        <nav className="flex items-center text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            {path.map((part, index) => (
                <React.Fragment key={index}>
                    {index > 0 && <ChevronRight size={16} className="mx-2" />}
                    <button
                        onClick={() => handleNavigate(index)}
                        className="capitalize hover:text-cyan-600"
                    >
                        {part.name.toLowerCase()}
                    </button>
                </React.Fragment>
            ))}
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-700 font-medium capitalize">{product.name.toLowerCase()}</span>
        </nav>
    );
};


const ReassuranceIcons = () => {
    const items = [
        { icon: HomeIcon, text: 'Acheter en magasin' },
        { icon: RefreshCw, text: 'Retour gratuit' },
        { icon: Truck, text: 'Livraison gratuite à partir de 100 €' },
        { icon: Award, text: '60 ans d\'expérience' },
    ];
    return (
        <div className="mt-8 space-y-3">
            {items.map(item => (
                <div key={item.text} className="flex items-center text-sm">
                    <item.icon className="w-5 h-5 text-red-500 mr-3" />
                    <span className="text-gray-700">{item.text}</span>
                </div>
            ))}
        </div>
    );
};

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, addToCart, onBuyNow, addToWishlist, wishlist, navigateTo, products, onSelectProduct, goBack, canGoBack, recentlyViewed }) => {
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
    const [addedToCart, setAddedToCart] = useState(false);
    const [mainImage, setMainImage] = useState(product.galleryImages ? product.galleryImages[0] : product.imageUrl);

    const isInWishlist = useMemo(() => wishlist.some(item => item.id === product.id), [wishlist, product.id]);
    const isOutOfStock = product.stock !== undefined && product.stock <= 0 && !product.isDropshipping;
    
    const alternativeProducts = useMemo(() => {
        if (!products || products.length === 0) return [];
        return products.filter(p => p.category === product.category && p.id !== product.id);
    }, [products, product]);

    const handleAddToCart = () => {
        if (isOutOfStock) return;
        addToCart(product, quantity);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000); // Reset after 2s
    };
    
    const handleBuyNow = () => {
        if (isOutOfStock) return;
        onBuyNow(product, quantity);
    };

    const priceHT = product.isOnSale && product.promoPrice ? product.promoPrice : product.price;
    const priceTTC = priceHT * (1 + product.tvaRate);
    const oldPriceTTC = product.isOnSale && product.promoPrice ? product.price * (1 + product.tvaRate) : null;

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {canGoBack && <GoBackButton onClick={goBack} className="mb-4" />}
                <Breadcrumb product={product} navigateTo={navigateTo} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Column */}
                    <div>
                         <div className="border rounded-lg p-4 mb-4">
                            <img src={mainImage} alt={product.name} className="w-full h-auto max-h-[500px] object-contain rounded-md" />
                         </div>
                         <div className="flex gap-2 justify-center">
                            {(product.galleryImages || [product.imageUrl]).map((img, index) => (
                                <button key={index} onClick={() => setMainImage(img)} className={`w-20 h-20 border-2 rounded-md p-1 ${mainImage === img ? 'border-cyan-500' : 'border-transparent hover:border-gray-300'}`}>
                                    <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-contain" />
                                </button>
                            ))}
                         </div>
                    </div>

                    {/* Details Column */}
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">{product.name}</h1>
                        
                        <div className="my-4">
                            {oldPriceTTC !== null ? (
                                <div className="flex items-baseline gap-3">
                                    <p className="text-4xl font-bold text-cyan-600">{formatCurrency(priceTTC)} <span className="text-lg font-normal text-gray-500 align-baseline">TVAC</span></p>
                                    <p className="text-2xl font-semibold text-gray-400 line-through">{formatCurrency(oldPriceTTC)}</p>
                                </div>
                            ) : (
                                <p className="text-3xl font-bold text-cyan-600">{formatCurrency(priceTTC)} <span className="text-lg font-normal text-gray-500 align-baseline">TVAC</span></p>
                            )}
                        </div>

                        {product.features && product.features.length > 0 && (
                            <ul className="list-disc list-inside text-gray-600 space-y-2 my-6">
                                {product.features.map((feature, index) => <li key={index}>{feature}</li>)}
                                <li>
                                    <button onClick={() => setActiveTab('specs')} className="text-cyan-600 hover:underline font-semibold">
                                        + Plus d'infos
                                    </button>
                                </li>
                            </ul>
                        )}

                        {isOutOfStock ? (
                             <div className="p-4 text-center bg-red-100 text-red-800 rounded-lg border border-red-300">
                                <p className="font-bold">Rupture de stock</p>
                                <p className="text-sm">Ce produit n'est actuellement pas disponible.</p>
                            </div>
                        ) : (
                            <div className="p-4 bg-gray-50 rounded-lg border">
                                <p className="text-green-600 font-bold flex items-center mb-2"><Check size={20} className="mr-2"/> En stock</p>
                                {product.stock !== undefined && product.stock > 0 && product.stock <= 10 && !product.isDropshipping && (
                                    <p className="text-orange-600 font-semibold text-sm flex items-center mb-2">
                                        <AlertTriangle size={16} className="mr-2"/> Plus que {product.stock} exemplaires disponibles !
                                    </p>
                                )}
                                <p className="text-sm text-gray-600 mb-4">Commandé aujourd'hui, livré le {deliveryDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}.</p>
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="flex items-center border bg-white rounded-md">
                                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-3 text-gray-600 hover:bg-gray-100 rounded-l-md"><Minus size={16}/></button>
                                        <input type="number" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))} className="w-16 text-center h-full border-l border-r focus:outline-none font-semibold"/>
                                        <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-3 text-gray-600 hover:bg-gray-100 rounded-r-md"><Plus size={16}/></button>
                                    </div>
                                    <button onClick={handleAddToCart} className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 text-white font-bold rounded-md transition-colors ${addedToCart ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'}`}>
                                        {addedToCart ? <><Check size={20}/> Ajouté !</> : <><ShoppingCart size={20}/> Ajouter</>}
                                    </button>
                                </div>
                                <button onClick={handleBuyNow} className="w-full flex items-center justify-center gap-2 py-3 px-6 text-cyan-700 font-bold bg-cyan-200 hover:bg-cyan-300 rounded-md transition-colors">
                                    <Zap size={20} /> Achat Rapide
                                </button>
                            </div>
                        )}
                         <ReassuranceIcons />
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-16">
                    <div className="border-b-2 border-blue-800">
                        <nav className="-mb-0.5 flex space-x-2" aria-label="Tabs">
                            <button onClick={() => setActiveTab('description')} className={`py-3 px-6 font-semibold text-sm rounded-t-lg ${activeTab === 'description' ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                                À savoir
                            </button>
                            <button onClick={() => setActiveTab('specs')} className={`py-3 px-6 font-semibold text-sm rounded-t-lg ${activeTab === 'specs' ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                                Détails techniques
                            </button>
                            <button onClick={() => setActiveTab('reviews')} className={`py-3 px-6 font-semibold text-sm rounded-t-lg ${activeTab === 'reviews' ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                                Avis ({product.reviews?.length || 0})
                            </button>
                        </nav>
                    </div>

                    <div className="py-8 border border-t-0 rounded-b-lg p-6">
                        {activeTab === 'description' && (
                            <div className="prose max-w-none text-gray-600">
                                <h3 className="text-xl font-bold mb-4">Description du produit</h3>
                                <p>{product.description || "Ce produit n'a pas de description détaillée."}</p>
                            </div>
                        )}
                        {activeTab === 'specs' && (
                             <div className="prose max-w-none text-gray-600">
                                <h3 className="text-xl font-bold mb-4">Spécifications</h3>
                                {product.attributes && Object.keys(product.attributes).length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {Object.entries(product.attributes).map(([key, value]) => (
                                                    <tr key={key}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 w-1/3 capitalize">{key}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{String(value)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-gray-500">Aucune spécification technique disponible pour ce produit.</p>
                                )}
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div>
                                <h3 className="text-xl font-bold mb-4">Avis des clients</h3>
                                <div className="space-y-8">
                                    {product.reviews && product.reviews.length > 0 ? (
                                        product.reviews.map(review => (
                                            <div key={review.id} className="flex items-start gap-4 border-b pb-6">
                                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 flex-shrink-0">
                                                    {review.author.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-800">{review.author}</h4>
                                                    <div className="flex items-center gap-4 my-1">
                                                        <Star size={16} className="text-yellow-400 fill-current" />
                                                        <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString('fr-FR')}</p>
                                                    </div>
                                                    <p className="text-gray-600">{review.comment}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">Il n'y a pas encore d'avis pour ce produit.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {alternativeProducts.length > 0 && (
                <ProductsCarousel
                    title="Produits Alternatifs"
                    products={alternativeProducts}
                    addToCart={addToCart}
                    onBuyNow={onBuyNow}
                    onSelectProduct={onSelectProduct}
                    navigateTo={navigateTo}
                    wishlist={wishlist}
                    addToWishlist={addToWishlist}
                    bgColor="bg-gray-50"
                />
            )}
            {recentlyViewed && recentlyViewed.length > 0 && (
                <ProductsCarousel
                    title="Consultés Récemment"
                    products={recentlyViewed}
                    addToCart={addToCart}
                    onBuyNow={onBuyNow}
                    onSelectProduct={onSelectProduct}
                    navigateTo={navigateTo}
                    wishlist={wishlist}
                    addToWishlist={addToWishlist}
                    bgColor="bg-gray-100"
                />
            )}
        </div>
    );
};

export default ProductDetailPage;