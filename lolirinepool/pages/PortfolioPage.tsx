import React, { useState, useMemo } from 'react';
import { PORTFOLIO_ITEMS } from '../constants';
import { PortfolioPageProps } from '../types';
import GoBackButton from '../components/GoBackButton';
import { Maximize, X } from 'lucide-react';

// Lightbox Component
const Lightbox: React.FC<{ imageUrl: string; onClose: () => void }> = ({ imageUrl, onClose }) => (
  <div 
    className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div className="relative max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
      <img src={imageUrl} alt="Vue agrandie" className="w-full h-full object-contain rounded-lg" />
      <button 
        onClick={onClose}
        className="absolute -top-4 -right-4 bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-200"
      >
        <X size={24} />
      </button>
    </div>
  </div>
);

// Portfolio Card Component
const PortfolioCard: React.FC<{ item: typeof PORTFOLIO_ITEMS[0]; onImageClick: (url: string) => void }> = ({ item, onImageClick }) => {
  const isBeforeAfter = item.images.length === 2;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 flex flex-col">
      {isBeforeAfter ? (
        // Before/After Layout
        <div className="grid grid-cols-2">
          <div className="relative cursor-pointer" onClick={() => onImageClick(item.images[0])}>
            <img src={item.images[0]} alt={`Avant - ${item.title}`} className="object-cover h-48 w-full" />
            <div className="absolute bottom-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold uppercase tracking-wider">Avant</div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Maximize size={32} className="text-white"/>
            </div>
          </div>
          <div className="relative cursor-pointer" onClick={() => onImageClick(item.images[1])}>
            <img src={item.images[1]} alt={`Après - ${item.title}`} className="object-cover h-48 w-full" />
            <div className="absolute bottom-0 left-0 bg-green-500 text-white px-2 py-1 text-xs font-bold uppercase tracking-wider">Après</div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Maximize size={32} className="text-white"/>
            </div>
          </div>
        </div>
      ) : (
        // Single Image Layout
        <div className="relative cursor-pointer" onClick={() => onImageClick(item.images[0])}>
          <img src={item.images[0]} alt={item.title} className="object-cover h-48 w-full" />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
             <Maximize size={32} className="text-white"/>
          </div>
        </div>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-cyan-600 uppercase">{item.category}</span>
        <h3 className="font-bold text-lg text-gray-800 mt-1">{item.title}</h3>
        <p className="text-sm text-gray-600 mt-2 flex-grow">{item.description}</p>
      </div>
    </div>
  );
};


const PortfolioPage: React.FC<PortfolioPageProps> = ({ goBack, canGoBack }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('Tout');
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    const categories = useMemo(() => ['Tout', ...Array.from(new Set(PORTFOLIO_ITEMS.map(p => p.category)))], []);
    
    const filteredItems = useMemo(() => {
        if (selectedCategory === 'Tout') {
          return PORTFOLIO_ITEMS;
        }
        return PORTFOLIO_ITEMS.filter(p => p.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <div className="bg-gray-50">
            {lightboxImage && <Lightbox imageUrl={lightboxImage} onClose={() => setLightboxImage(null)} />}
            
            {/* Page Header */}
            <section 
                className="relative bg-cover bg-center h-[60vh] text-white flex items-center justify-center" 
                style={{ backgroundImage: "url('https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_0307.heic')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>Nos Réalisations</h1>
                    <p className="mt-4 text-xl text-gray-200 max-w-4xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                        🏊 Découvrez une sélection de nos chantiers en construction et rénovation de piscines, pensés pour durer et s’intégrer à votre cadre de vie.
                    </p>
                </div>
            </section>

             {/* Intro Text Section */}
            <section className="py-20 bg-white border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <h2 className="text-3xl font-bold text-center text-cyan-800 mb-4">
                        Notre savoir-faire en construction et rénovation de piscines
                    </h2>
                    <p className="text-center text-lg text-gray-600 mb-12">
                        Depuis nos premières réalisations, nous concevons et transformons des piscines durables, esthétiques et faciles à vivre. Notre équipe maîtrise chaque étape : de l’étude du terrain à la mise en eau, en passant par le dimensionnement hydraulique, l’étanchéité et les finitions.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Construction sur mesure</h3>
                            <p className="text-gray-600">
                                Nous créons des bassins adaptés à votre espace et à votre style : béton armé ou coque, plages et margelles, intégration paysagère, éclairage, couvertures et solutions de sécurité. Chaque choix de matériaux et d’équipement vise la fiabilité, la performance et la sobriété en énergie.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Rénovation et modernisation</h3>
                            <p className="text-gray-600">
                                Nous redonnons vie aux piscines : remplacement de liner ou carrelage, reprise d’étanchéité, filtration haut rendement, pompes à vitesse variable, traitement de l’eau automatisé, chauffage, domotique, ainsi que la reprise des plages et abords. Résultat : une piscine plus belle, plus sûre et plus économique.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Méthode et engagement</h3>
                            <p className="text-gray-600">
                                Diagnostic précis, devis clair, planning maîtrisé et suivi de chantier rigoureux. Nous livrons un bassin conforme, équilibré et simple à entretenir, avec des conseils personnalisés et des contrats de maintenance adaptés.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 text-center bg-cyan-50 p-6 rounded-lg border border-cyan-200">
                        <p className="text-xl font-medium text-cyan-900">
                            Confiez-nous votre projet : nous faisons de votre piscine un lieu de plaisir, de confort et de valeur ajoutée pour votre propriété.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters and Portfolio */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {canGoBack && <GoBackButton onClick={goBack} className="mb-8" />}
                
                {/* Category Filters */}
                <div className="flex justify-center flex-wrap gap-3 mb-12">
                {categories.map(category => (
                    <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 text-sm font-semibold rounded-full shadow-md transition-all duration-200 transform hover:-translate-y-0.5 ${
                        selectedCategory === category
                        ? 'bg-cyan-600 text-white ring-4 ring-offset-2 ring-cyan-500'
                        : 'bg-white text-gray-700 hover:bg-cyan-50'
                    }`}
                    >
                    {category}
                    </button>
                ))}
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map(item => (
                       <PortfolioCard key={item.id} item={item} onImageClick={setLightboxImage} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage;