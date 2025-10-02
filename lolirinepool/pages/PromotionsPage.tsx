import React, { useMemo } from 'react';
import { PromotionsPageProps } from '../types';
import GoBackButton from '../components/GoBackButton';
import ProductCard, { ProductsCarousel } from '../components/ProductCard';
import { ShoppingBag } from 'lucide-react';

const PromotionsPage: React.FC<PromotionsPageProps> = (props) => {
  const { products, addToCart, onBuyNow, onSelectProduct, wishlist, addToWishlist, goBack, canGoBack, recentlyViewed, navigateTo } = props;
  const promotionProducts = useMemo(() => products.filter(p => p.isOnSale && !p.isHidden), [products]);
  
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
                    className={`absolute font-black text-white/10 animate-float-up ${icon.size}`}
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


  return (
    <div className="bg-gray-100">
      <section className="relative bg-gradient-to-br from-red-600 to-orange-500 py-20 text-white overflow-hidden">
        {renderAnimatedIcons()}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl font-extrabold" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.4)' }}>
            🔥 Offres Immanquables !
          </h1>
          <p className="mt-4 text-xl max-w-2xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>
            Découvrez toutes nos promotions exclusives. C'est le moment de vous équiper au meilleur prix !
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {canGoBack && <GoBackButton onClick={goBack} className="mb-8" />}

        {promotionProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {promotionProducts.map(product => (
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
          <div className="text-center bg-white p-12 rounded-lg shadow">
            <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Aucune promotion en cours</h2>
            <p className="text-gray-500">
              Revenez bientôt pour découvrir nos prochaines offres spéciales !
            </p>
          </div>
        )}
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

export default PromotionsPage;