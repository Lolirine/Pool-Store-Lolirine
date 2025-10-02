import React, { useState, useRef, useEffect } from 'react';
import { ProductCardProps, Page, Product } from '../types';
import { ShoppingCart, Star, Plus, Minus, ChevronLeft, ChevronRight, Heart, Zap } from 'lucide-react';
import { formatCurrency } from '../utils/formatting';

const StarRating: React.FC<{ rating: number; reviewCount: number }> = ({ rating, reviewCount }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={16} className="text-yellow-400 fill-current" />
        ))}
        {halfStar && <Star key="half" size={16} className="text-yellow-400 fill-current" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={16} className="text-gray-300 fill-current" />
        ))}
        <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
      </div>
    );
};

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, onBuyNow, onSelectProduct, wishlist, addToWishlist }) => {
    
    // Carousel state
    const images = [product.imageUrl, ...(product.galleryImages || [])].filter(img => img && typeof img === 'string');
    const hasCarousel = images.length > 1;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const isOutOfStock = product.stock !== undefined && product.stock <= 0 && !product.isDropshipping;
    const isInWishlist = wishlist.some(item => item.id === product.id);

    const getRibbonColor = (ribbonText: string) => {
        const text = ribbonText.toLowerCase();
        if (text.includes('promo')) return 'bg-red-500';
        if (text.includes('nouveau')) return 'bg-blue-500';
        if (text.includes('stock faible')) return 'bg-orange-500';
        if (text.includes('rupture')) return 'bg-gray-700';
        return 'bg-green-500';
    };

    const priceTTC = product.isOnSale && product.promoPrice ? product.promoPrice * (1 + product.tvaRate) : product.price * (1 + product.tvaRate);
    const oldPriceTTC = product.isOnSale && product.promoPrice ? product.price * (1 + product.tvaRate) : null;
    
    return (
        <div 
          className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
        >
            <div 
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="cursor-pointer" onClick={() => onSelectProduct(product)}>
                     <div className="relative w-full h-56 overflow-hidden">
                        {images.map((img, index) => (
                            <img 
                                key={index}
                                src={img} 
                                alt={`${product.name} image ${index + 1}`} 
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`} 
                            />
                        ))}
                    </div>
                    
                    {product.ribbon && (
                        <div className={`absolute top-3 left-3 text-white text-xs font-bold px-3 py-1.5 rounded-full ${getRibbonColor(product.ribbon)} shadow-lg z-10`}>
                            {product.ribbon}
                        </div>
                    )}
                </div>
                 {hasCarousel && (
                    <>
                        <button 
                            onClick={prevImage} 
                            className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/60 hover:bg-white backdrop-blur-sm rounded-full p-1.5 shadow-md transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-800" />
                        </button>
                        <button 
                            onClick={nextImage} 
                            className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/60 hover:bg-white backdrop-blur-sm rounded-full p-1.5 shadow-md transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <ChevronRight className="h-5 w-5 text-gray-800" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 z-20">
                            {images.map((_, index) => (
                                <button 
                                    key={index} 
                                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); setCurrentIndex(index); }} 
                                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${currentIndex === index ? 'bg-white ring-1 ring-black/30' : 'bg-white/50 hover:bg-white'}`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
                <button 
                    onClick={() => addToWishlist(product)} 
                    className="absolute top-3 right-3 p-2 bg-white/70 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 hover:bg-white transition-all z-20"
                    aria-label="Ajouter à la liste de souhaits"
                >
                    <Heart size={20} className={isInWishlist ? 'text-red-500 fill-current' : ''} />
                </button>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <p className="text-xs text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => onSelectProduct(product)}>{product.category}</p>
                <h3 className="text-md font-bold text-gray-800 my-1 uppercase cursor-pointer line-clamp-2 h-12" onClick={() => onSelectProduct(product)}>{product.name}</h3>
                {product.rating !== undefined && product.reviewCount !== undefined && (
                    <div className="my-2 cursor-pointer" onClick={() => onSelectProduct(product)}>
                        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                    </div>
                )}
                <div className="mt-auto pt-2">
                     <div className="mb-2 h-8">
                        {oldPriceTTC !== null ? (
                            <div className="flex items-baseline gap-2">
                                <p className="text-xl font-bold text-cyan-600">{formatCurrency(priceTTC)} <span className="text-xs font-normal">TVAC</span></p>
                                <p className="text-sm font-semibold text-gray-500 line-through">{formatCurrency(oldPriceTTC)}</p>
                            </div>
                        ) : (
                            <p className="text-lg font-semibold text-cyan-600">{formatCurrency(priceTTC)} <span className="text-xs font-normal text-gray-500">TVAC</span></p>
                        )}
                     </div>
                     <div className="flex items-center justify-between gap-2">
                        <button 
                            onClick={() => addToCart(product, 1)}
                            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border border-cyan-600 text-cyan-600 font-semibold rounded-md hover:bg-cyan-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isOutOfStock}
                        >
                            <ShoppingCart size={16} />
                            Ajouter
                        </button>
                        <button 
                            onClick={() => onBuyNow(product, 1)}
                            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={isOutOfStock}
                        >
                             <Zap size={16} />
                            Achat Rapide
                        </button>
                     </div>
                </div>
            </div>
        </div>
    );
};

interface ProductsCarouselProps {
    title?: string;
    subtitle?: string;
    products: Product[];
    addToCart: (product: Product, quantity: number) => void;
    onBuyNow: (product: Product, quantity: number) => void;
    onSelectProduct: (product: Product) => void;
    navigateTo: (page: Page, options?: { categoryFilter?: string }) => void;
    categoryFilter?: string;
    viewAllLink?: boolean;
    bgColor?: string;
    headless?: boolean;
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    isPromoSection?: boolean;
    titleColor?: string;
    viewAllLinkColor?: string;
}

export const ProductsCarousel: React.FC<ProductsCarouselProps> = ({ title, subtitle, products, addToCart, onBuyNow, onSelectProduct, navigateTo, categoryFilter, viewAllLink, bgColor = 'bg-cyan-50/70', headless = false, wishlist, addToWishlist, isPromoSection = false, titleColor = 'text-gray-800', viewAllLinkColor = 'text-cyan-600' }) => {
    const scrollContainer = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const intervalRef = useRef<number | null>(null);
    
    if (products.length === 0) return null;

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainer.current) {
            const scrollAmount = scrollContainer.current.offsetWidth * 0.8;
            scrollContainer.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };
    
    const startAutoScroll = React.useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => {
            if (scrollContainer.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
                if (scrollLeft + clientWidth >= scrollWidth - 1) { // -1 for floating point precision issues
                    scrollContainer.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scroll('right');
                }
            }
        }, 3000);
    }, []);

    const stopAutoScroll = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        if (!isHovering) {
            startAutoScroll();
        } else {
            stopAutoScroll();
        }
        return () => stopAutoScroll();
    }, [isHovering, startAutoScroll]);

    const scrollbarHideStyle: React.CSSProperties = {
        scrollbarWidth: 'none', /* For Firefox */
    };

    const carouselContent = (
        <div 
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-opacity opacity-75 hover:opacity-100 -ml-4 hidden sm:block">
                <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            <div ref={scrollContainer} className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 items-stretch" style={scrollbarHideStyle}>
                {products.map(product => (
                    <div key={product.id} className="flex-shrink-0 w-80">
                        <ProductCard product={product} addToCart={addToCart} onBuyNow={onBuyNow} onSelectProduct={onSelectProduct} wishlist={wishlist} addToWishlist={addToWishlist} />
                    </div>
                ))}
            </div>
            <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-opacity opacity-75 hover:opacity-100 -mr-4 hidden sm:block">
                <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
        </div>
    );
    
    const renderAnimatedIcons = () => {
        const icons = [
            { symbol: '%', size: 'text-5xl', top: '15%', left: '10%', delay: '0s', duration: '15s' },
            { symbol: '€', size: 'text-7xl', top: '30%', left: '85%', delay: '2s', duration: '20s' },
            { symbol: '%', size: 'text-4xl', top: '75%', left: '5%', delay: '5s', duration: '18s' },
            { symbol: '€', size: 'text-6xl', top: '5%', left: '60%', delay: '3s', duration: '22s' },
            { symbol: '%', size: 'text-3xl', top: '85%', left: '45%', delay: '1s', duration: '16s' },
            { symbol: '€', size: 'text-5xl', top: '40%', left: '50%', delay: '7s', duration: '19s' },
            { symbol: '%', size: 'text-8xl', top: '55%', left: '20%', delay: '4s', duration: '25s' },
            { symbol: '€', size: 'text-4xl', top: '60%', left: '90%', delay: '6s', duration: '17s' },
        ];

        return (
            <>
                {icons.map((icon, index) => (
                    <div
                        key={index}
                        className={`absolute font-black text-white/20 animate-float-up ${icon.size}`}
                        style={{ 
                            top: icon.top, 
                            left: icon.left, 
                            animationDelay: icon.delay,
                            animationDuration: icon.duration
                        }}
                        aria-hidden="true"
                    >
                        {icon.symbol}
                    </div>
                ))}
            </>
        );
    };

    if (headless) {
        return carouselContent;
    }

    return (
        <section className={`py-16 ${bgColor} ${isPromoSection ? 'relative overflow-hidden' : ''}`}>
            {isPromoSection && renderAnimatedIcons()}
            <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${isPromoSection ? 'relative z-10' : ''}`}>
                {(title || viewAllLink) && (
                    <div className="flex justify-between items-center mb-8">
                        {title && (
                            <div>
                                <h2 className={`text-3xl font-bold ${titleColor}`}>{title}</h2>
                                {subtitle && <p className="text-gray-600">{subtitle}</p>}
                            </div>
                        )}
                        {viewAllLink && (
                            <button onClick={() => navigateTo('shop', { categoryFilter: categoryFilter })} className={`font-semibold ${viewAllLinkColor} hover:underline`}>Voir tout →</button>
                        )}
                    </div>
                )}
                {carouselContent}
            </div>
        </section>
    );
};


export default ProductCard;