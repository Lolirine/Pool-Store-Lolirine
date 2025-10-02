import React, { useMemo, useState, useEffect, useRef } from 'react';
import { HomePageProps, Product, Order, CartItem, Testimonial, HomeCategory } from '../types';
import { ProductsCarousel } from '../components/ProductCard';
import { InfoCard } from '../components/InfoCardsSection';
import { formatCurrency } from '../utils/formatting';
import { List, Percent, Package, Star, ArrowRight, ArrowDown, MousePointerClick, CreditCard, Headset, Truck } from 'lucide-react';
import { SERVICES } from '../constants';

const useAnimateOnScroll = (options?: IntersectionObserverInit) => {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible] as const;
};

const HeroSection: React.FC<{ navigateTo: HomePageProps['navigateTo'] }> = ({ navigateTo }) => (
    <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center text-white" style={{ backgroundImage: "url('https://storage.googleapis.com/lolirinepoolstoreimage/IMAGES%20ARRIERES%20PLAN/Piscine%20arrie%CC%80re%20plan3.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex flex-col items-center justify-end md:justify-center h-full text-center px-4 pb-16 md:pb-0">
            <img src="https://lolirine-pool.odoo.com/web/image/website/1/logo/Lolirine%20Pool%20Store?unique=b561c22" alt="Lolirine Pool Store" className="h-24 md:h-32 mb-6 bg-white/20 backdrop-blur-sm rounded-full p-4"/>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                Des piscines comme on les aime !
            </h1>
            <div className="mt-4 max-w-3xl mx-auto text-lg md:text-xl" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                <p className="mb-2">🏊‍♂️ Besoin d’un produit piscine ? Vous êtes au bon endroit.</p>
                <p>
                Nous sommes le seul site internet à proposer une aussi large gamme : pompes, filtres, spas, accessoires, analyse de l’eau, chauffage, couvertures…
                <br />
                Tout est là. Et nulle part ailleurs.
                </p>
            </div>
            <button 
                onClick={() => navigateTo('shop')}
                className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105 shadow-lg"
            >
                Découvrez les produits
            </button>
        </div>
    </section>
);

const ServicesSection: React.FC<{ navigateTo: HomePageProps['navigateTo'] }> = ({ navigateTo }) => {
    const [sectionRef, isVisible] = useAnimateOnScroll({ threshold: 0.1 });
    
    return (
    <section 
        ref={sectionRef as React.RefObject<HTMLDivElement>} 
        className="relative py-16 bg-cover bg-center"
        style={{ backgroundImage: "url('https://storage.googleapis.com/lolirinepoolstoreimage/IMAGES%20ARRIERES%20PLAN/Piscine%20arrie%CC%80re%20plan18.avif')" }}
    >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>Nos Solutions Piscine</h2>
                <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm border border-white/30 text-white p-4 rounded-xl shadow-sm">
                    <p className="font-semibold text-lg flex items-center justify-center gap-3">
                        <MousePointerClick className="h-6 w-6" />
                        <span>Cliquez sur une solution pour découvrir tous les détails de nos prestations.</span>
                    </p>
                </div>
            </div>
            <div className="flex overflow-x-auto justify-center space-x-6 pb-4 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
                {SERVICES.map((service, index) => (
                    <a
                        key={index}
                        href="#"
                        onClick={(e) => { e.preventDefault(); navigateTo(service.page); }}
                        aria-label={`En savoir plus sur ${service.title}`}
                        className={`flex-shrink-0 w-72 bg-white rounded-lg shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 will-animate ${isVisible ? 'animate-slide-in-top' : ''} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="relative">
                            <img src={service.imageUrl} alt={service.title} className="h-40 w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4">
                                <div className="p-2 bg-cyan-500 rounded-full mb-2 inline-block shadow-md">
                                    {React.cloneElement(service.icon, { className: 'h-5 w-5 text-white' })}
                                </div>
                                <h3 className="text-lg font-bold text-white" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.7)'}}>{service.title}</h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-gray-600 mb-3 line-clamp-3 h-[60px]">{service.description}</p>
                            <span className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 flex items-center group-hover:underline">
                                En savoir plus <ArrowRight className="inline h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    </section>
)};


const TestimonialsSection: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
    const [sectionRef, isVisible] = useAnimateOnScroll({ threshold: 0.1 });
    
    return (
    <section 
        ref={sectionRef as React.RefObject<HTMLDivElement>} 
        className="relative py-24 bg-cover bg-center"
        style={{ backgroundImage: "url('https://storage.googleapis.com/lolirinepoolstoreimage/IMAGES%20ARRIERES%20PLAN/Piscine%20arrie%CC%80re%20plan13.avif')" }}
    >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>Ce que disent nos clients</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <div key={testimonial.id} className={`bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg will-animate ${isVisible ? 'animate-slide-in-top' : ''}`}
                         style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                        <div className="flex items-center">
                            <img src={testimonial.imageUrl} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4 border-2 border-white" />
                            <div>
                                <p className="font-bold text-gray-900">{testimonial.author}</p>
                                <p className="text-sm text-gray-600">{testimonial.location}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
)};

const PortfolioSection: React.FC<{ navigateTo: HomePageProps['navigateTo'] }> = ({ navigateTo }) => {
    const [sectionRef, isVisible] = useAnimateOnScroll({ threshold: 0.1 });
    const PORTFOLIO_ITEMS = []; // This should be passed as props if it becomes dynamic

    return (
    <section 
        ref={sectionRef as React.RefObject<HTMLDivElement>} 
        className="py-24 relative overflow-hidden"
    >
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://storage.googleapis.com/lolirinepoolstoreimage/IMAGES%20ARRIERES%20PLAN/Piscine%20arrie%CC%80re%20plan4.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>Nos dernières réalisations</h2>
                <p className="mt-2 text-white/90" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>La preuve de notre savoir-faire en images.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PORTFOLIO_ITEMS.slice(0, 2).map((item, index) => (
                    <div key={item.id} className={`bg-white rounded-lg shadow-lg overflow-hidden group will-animate ${isVisible ? 'animate-slide-in-top' : ''}`}
                         style={{ animationDelay: `${index * 150}ms` }}
                    >
                        <div className="relative">
                            {item.images.length === 2 ? (
                                <div className="grid grid-cols-2">
                                    <div className="relative">
                                        <img src={item.images[0]} alt={`Avant - ${item.title}`} className="object-cover h-[160px] w-full" />
                                        <div className="absolute bottom-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">AVANT</div>
                                    </div>
                                    <div className="relative">
                                        <img src={item.images[1]} alt={`Après - ${item.title}`} className="object-cover h-[160px] w-full" />
                                        <div className="absolute bottom-0 left-0 bg-green-500 text-white px-2 py-1 text-xs font-bold">APRÈS</div>
                                    </div>
                                </div>
                            ) : (
                                <img src={item.images[0]} alt={item.title} className="object-cover h-[160px] w-full" />
                            )}
                        </div>
                        <div className="p-4 bg-gray-50">
                            <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                            <p className="text-sm text-cyan-600">{item.category}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-12">
                <button onClick={() => navigateTo('portfolio')} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                    Voir toutes nos réalisations
                </button>
            </div>
        </div>
    </section>
)};

const FeatureBannerSection = () => {
  const features = [
    {
      icon: Package,
      title: "LIVRAISON OFFERTE",
      subtitle: "à partir de 59€ d'achat",
    },
    {
      icon: CreditCard,
      title: "PAIEMENTS SÉCURISÉS",
      subtitle: "Mastercard, Visa, Bancontact",
    },
    {
      icon: Headset,
      title: "SERVICE CLIENT",
      subtitle: "à votre service",
    },
    {
      icon: Truck,
      title: "ENVOI RAPIDE",
      subtitle: "par transporteur France Express + GLS",
    },
  ];

  return (
    <section className="bg-white border-y border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center justify-center sm:justify-start">
              <feature.icon
                className="h-10 w-10 text-cyan-600 mr-4 flex-shrink-0"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="font-bold text-sm text-cyan-700">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoryShowcase: React.FC<{ navigateTo: HomePageProps['navigateTo'], homeCategories: HomeCategory[] }> = ({ navigateTo, homeCategories }) => {
  const [sectionRef, isVisible] = useAnimateOnScroll({ threshold: 0.1 });

  return (
    <section 
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="py-16 bg-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Explorez nos univers</h2>
          <p className="mt-2 text-lg text-gray-600">Trouvez tout ce dont vous avez besoin, classé par catégorie.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeCategories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => navigateTo(category.page || 'home', { categoryFilter: category.categoryFilter })}
              className={`will-animate ${isVisible ? 'animate-slide-in-top' : ''} group relative rounded-lg overflow-hidden shadow-lg cursor-pointer h-80`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img src={category.imageUrl} alt={category.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.8)'}}>{category.label}</h3>
                <span className="mt-2 font-semibold text-cyan-300 flex items-center group-hover:underline">
                  Découvrir <ArrowRight className="inline h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TabbedProductsSection: React.FC<HomePageProps & { newProducts: Product[]; bestSellers: Product[]; promotions: Product[] }> = (props) => {
    const { newProducts, bestSellers, promotions } = props;
    const [activeTab, setActiveTab] = useState<'new' | 'bestsellers' | 'promotions'>('new');
    
    const tabs = [
        { id: 'new', label: 'Nouveautés', products: newProducts, bgColor: 'bg-cyan-100' },
        { id: 'bestsellers', label: 'Meilleures Ventes', products: bestSellers, bgColor: 'bg-gradient-to-br from-sky-100 to-blue-200' },
        { id: 'promotions', label: 'Promotions', products: promotions, bgColor: 'bg-gradient-to-br from-red-100 to-orange-100' }
    ];

    const activeTabData = tabs.find(tab => tab.id === activeTab)!;

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center mb-8 border-b">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-6 py-3 text-lg font-semibold transition-colors duration-300 -mb-px border-b-4 ${
                                activeTab === tab.id
                                ? 'border-cyan-500 text-cyan-600'
                                : 'border-transparent text-gray-500 hover:text-gray-800'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div>
                    <ProductsCarousel
                        {...props}
                        key={activeTab}
                        products={activeTabData.products}
                        bgColor="bg-transparent"
                        headless={true}
                    />
                </div>
            </div>
        </section>
    );
}

const HomeContent: React.FC<HomePageProps> = (props) => {
    const { products, recentlyViewed, orders, currentUser, onSelectProduct, navigateTo, testimonials, homeCategories } = props;

    const infoCards = useMemo(() => {
        const cards: React.ReactNode[] = [];
        if (!currentUser) return [];

        const userOrders = currentUser ? orders.filter(o => o.customer === currentUser.name && o.status === 'Complété') : [];
        const allUserItems = userOrders.flatMap(o => o.items);
        
        let frequentItems: Product[] = [];
        if (allUserItems.length > 0) {
            const itemFrequencies = allUserItems.reduce((acc, item) => {
                const itemId = String(item.id);
                acc[itemId] = (acc[itemId] || 0) + 1;
                return acc;
            }, {} as {[key: string]: number});
            
            frequentItems = Object.entries(itemFrequencies)
                .sort(([, a], [, b]) => b - a)
                .map(([id]) => allUserItems.find(item => String(item.id) === id))
                .filter((p): p is CartItem => p !== undefined);
        }

        if (frequentItems.length > 0) {
            cards.push(
                <InfoCard key="frequently-ordered" title="Acheter à nouveau">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {frequentItems.slice(0, 4).map(p => (
                            <div key={`freq-${p.id}`} className="text-left cursor-pointer group" onClick={() => onSelectProduct(p)}>
                                <img src={p.imageUrl} alt={p.name} className="w-full h-24 object-contain mb-1 rounded-md bg-gray-100 p-1 group-hover:shadow-md transition-shadow"/>
                                <p className="text-xs text-cyan-700 group-hover:underline line-clamp-2 h-8">{p.name}</p>
                            </div>
                        ))}
                    </div>
                </InfoCard>
            );
        }

        const topRatedProducts = products.filter(p => p.rating && p.reviewCount && p.reviewCount > 5).sort((a,b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4);
        if (topRatedProducts.length > 0) {
          cards.push(
              <InfoCard key="top-rated" title="Les mieux notés pour vous">
                   <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {topRatedProducts.map(p => (
                          <div key={`top-${p.id}`} className="text-left cursor-pointer group" onClick={() => onSelectProduct(p)}>
                              <img src={p.imageUrl} alt={p.name} className="w-full h-24 object-contain mb-1 rounded-md bg-gray-100 p-1 group-hover:shadow-md transition-shadow"/>
                              <p className="text-xs text-cyan-700 group-hover:underline line-clamp-2 h-8">{p.name}</p>
                          </div>
                      ))}
                  </div>
              </InfoCard>
          );
        }
        
        const economyCategories = [
            { name: 'Entretien', filter: "Traitement de l'eau", image: 'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_9493.jpeg' },
            { name: 'Nettoyage', filter: 'Nettoyage', image: 'https://storage.googleapis.com/lolirinepoolstoreimage/Image%20notre%20boutique2.jpeg' },
            { name: 'Spas', filter: 'Wellness', image: 'https://storage.googleapis.com/lolirinepoolstoreimage/JACUZZI%20ASTRAPOOL/Inspiration%20jacuzzi4.jpeg' },
            { name: 'Accessoires', filter: 'Accessoires', image: 'https://storage.googleapis.com/lolirinepoolstoreimage/Entretien%20piscine%202.jpg' }
        ];

        cards.push(
            <InfoCard
                key="economize"
                title="Découvrez nos essentiels"
                footerLink={{ text: 'Voir toute la boutique', onClick: () => navigateTo('shop') }}
            >
                <div className="grid grid-cols-2 gap-4">
                    {economyCategories.map(cat => (
                        <div key={cat.name} onClick={() => navigateTo(cat.filter === 'Wellness' ? 'wellness' : 'shop', { categoryFilter: cat.filter })} className="cursor-pointer text-center group">
                            <img src={cat.image} alt={cat.name} className="w-full h-24 object-cover mb-1 rounded-md transition-transform group-hover:scale-105"/>
                            <p className="text-xs font-semibold">{cat.name}</p>
                        </div>
                    ))}
                </div>
            </InfoCard>
        );

        return cards.slice(0, 3);
    }, [products, currentUser, orders, navigateTo, onSelectProduct]);

    const newProducts = useMemo(() => [...products].sort((a, b) => String(b.id).localeCompare(String(a.id))).slice(0, 10), [products]);
    // FIX: Replaced `||` with `??` for safer nullish-coalescing on `rating`, which could be 0.
    const bestSellers = useMemo(() => [...products].filter(p => p.reviewCount && p.reviewCount > 5).sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 10), [products]);
    const promotions = useMemo(() => products.filter(p => p.isOnSale), [products]);

    return (
        <>
            <FeatureBannerSection />
            
            {infoCards.length > 0 &&
                <section className="py-16 bg-gradient-to-br from-sky-50 to-indigo-100">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {infoCards}
                        </div>
                    </div>
                </section>
            }

            <CategoryShowcase navigateTo={props.navigateTo} homeCategories={homeCategories} />

            <TabbedProductsSection
                {...props}
                newProducts={newProducts}
                bestSellers={bestSellers}
                promotions={promotions}
            />
            
            <ServicesSection navigateTo={props.navigateTo} />
            
            <TestimonialsSection testimonials={testimonials} />
            
            <PortfolioSection navigateTo={props.navigateTo} />
            
            {recentlyViewed && recentlyViewed.length > 0 && (
                <ProductsCarousel
                    {...props}
                    title="Consultés Récemment"
                    products={recentlyViewed}
                    bgColor="bg-gray-100"
                />
            )}
        </>
    );
};

const HomePage: React.FC<HomePageProps> = (props) => {
  return (
    <>
      <HeroSection navigateTo={props.navigateTo} />
      <HomeContent {...props} />
    </>
  );
};

export default HomePage;