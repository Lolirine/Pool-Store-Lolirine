import React from 'react';
import { WishlistPageProps } from '../types';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';
import GoBackButton from '../components/GoBackButton';

const WishlistPage: React.FC<WishlistPageProps> = ({ wishlist, navigateTo, onSelectProduct, addToCart, onBuyNow, addToWishlist, goBack, canGoBack }) => {
  return (
    <div className="bg-gray-100 min-h-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {canGoBack && <GoBackButton onClick={goBack} className="mb-6" />}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Ma Liste de Souhaits ({wishlist.length})</h1>

        {wishlist.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-lg shadow">
            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Votre liste de souhaits est vide.</h2>
            <p className="text-gray-500 mb-6">Ajoutez des produits que vous aimez pour les retrouver facilement ici.</p>
            <button
              onClick={() => navigateTo('shop')}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Découvrir les produits
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map(product => (
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
        )}
      </div>
    </div>
  );
};

export default WishlistPage;