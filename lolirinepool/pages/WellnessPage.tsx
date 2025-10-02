import React, { useState, useEffect, useRef } from 'react';
import { WellnessPageProps } from '../types';
import { WELLNESS_SUB_CATEGORIES } from '../constants';
import GoBackButton from '../components/GoBackButton';
import { ProductsCarousel } from '../components/ProductCard';

const AnimatedWaveSeparator = () => (
    <div className="bg-transparent">
        <style>{`
            .waves-wellness {
                position:relative;
                width: 100%;
                height:10vh;
                min-height:80px;
                max-height:120px;
            }
            .parallax-wellness > use {
                animation: move-forever-wellness 25s cubic-bezier(.55,.5,.45,.5) infinite;
            }
            .parallax-wellness > use:nth-child(1) {
                animation-delay: -2s;
                animation-duration: 7s;
            }
            .parallax-wellness > use:nth-child(2) {
                animation-delay: -3s;
                animation-duration: 10s;
            }
            .parallax-wellness > use:nth-child(3) {
                animation-delay: -4s;
                animation-duration: 13s;
            }
            .parallax-wellness > use:nth-child(4) {
                animation-delay: -5s;
                animation-duration: 20s;
            }
            @keyframes move-forever-wellness {
                0% {
                    transform: translate3d(-90px,0,0);
                }
                100% { 
                    transform: translate3d(85px,0,0);
                }
            }
        `}</style>
        <svg className="waves-wellness" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
            <defs>
                <path id="gentle-wave-wellness" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax-wellness">
                <use xlinkHref="#gentle-wave-wellness" x="48" y="0" fill="rgba(34, 211, 238, 0.7)" />
                <use xlinkHref="#gentle-wave-wellness" x="48" y="3" fill="rgba(34, 211, 238, 0.5)" />
                <use xlinkHref="#gentle-wave-wellness" x="48" y="5" fill="rgba(34, 211, 238, 0.3)" />
                <use xlinkHref="#gentle-wave-wellness" x="48" y="7" fill="#22d3ee" />
            </g>
        </svg>
    </div>
);


const WellnessHero = () => {
    const images = [
        'https://storage.googleapis.com/lolirinepoolstoreimage/hero%20jacuzzi1.jpeg',
        'https://storage.googleapis.com/lolirinepoolstoreimage/hero%20jacuzzi2.jpeg',
        'https://storage.googleapis.com/lolirinepoolstoreimage/hero%20jacuzzi3.jpeg',
        'https://storage.googleapis.com/lolirinepoolstoreimage/hero%20jacuzzi4.jpeg',
        'https://storage.googleapis.com/lolirinepoolstoreimage/JACUZZI%20ASTRAPOOL/cq5dam.web.1280.1280.jpeg',
        'https://storage.googleapis.com/lolirinepoolstoreimage/JACUZZI%20ASTRAPOOL/copmact-swimspa-astralpool-768x576.jpg'
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <section className="relative h-[calc(100vh-212px)] w-full overflow-hidden bg-gray-800">
            {images.map((src, index) => (
                <div
                    key={src}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundImage: `url(${src})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
                </div>
            ))}
            
            <div className="relative h-full flex flex-col items-center justify-center p-4">
                <div className="relative w-full max-w-6xl aspect-[16/7] shadow-2xl rounded-2xl overflow-hidden">
                    {images.map((src, index) => (
                        <img
                            key={src}
                            src={src}
                            alt={`Espace Wellness ${index + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/30 p-8 rounded-lg text-center text-white backdrop-blur-sm max-w-3xl mx-auto">
                            <h1 className="text-5xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>Espace Wellness</h1>
                            <p className="text-lg" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                                Plongez dans un univers de détente et de bien-être avec notre sélection de spas et produits dédiés.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const InfoSection = () => (
    <section className="py-20 bg-gradient-to-br from-cyan-50 to-blue-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-cyan-800 mb-8">Spas résidentiels AstralPool : l’alliance du bien-être et de la performance thérapeutique</h2>
            <div className="prose prose-lg max-w-none text-gray-700 text-justify space-y-4">
                <p>
                    Les spas résidentiels AstralPool sont bien plus que de simples bains à remous : ce sont de véritables espaces de soin, de relaxation et de massage thérapeutique, conçus pour transformer chaque moment en une expérience unique de bien-être.
                </p>
                <p>
                    Pensés pour un usage à domicile, ces spas allient technologie de pointe et design raffiné pour répondre aux exigences des utilisateurs les plus attentifs à leur santé physique et mentale. Grâce à une disposition ergonomique des sièges, des jets hydromassants puissants et ciblés, ainsi qu’à une gestion intelligente de la température et de l’ambiance lumineuse, chaque modèle offre une expérience sensorielle complète.
                </p>
                <p>
                    Que vous cherchiez à soulager les tensions musculaires, à améliorer votre circulation sanguine, ou simplement à vous détendre après une longue journée, les spas AstralPool apportent une véritable thérapie de l’eau, directement accessible depuis chez vous.
                </p>
                <p>
                    Disponibles en plusieurs configurations (2 à 7 places), les spas résidentiels AstralPool s’intègrent aussi bien en intérieur qu’en extérieur, et sont conçus pour durer, grâce à des matériaux de qualité supérieure et une gestion écoénergétique optimisée.
                </p>
            </div>
        </div>
    </section>
);

const SubMenuSection: React.FC<Pick<WellnessPageProps, 'navigateTo'>> = ({ navigateTo }) => {
    const wellnessCategories = WELLNESS_SUB_CATEGORIES.filter(
      cat => cat.label.toLowerCase() !== "voir tout l'espace wellness" && cat.children && cat.children.length > 0
    );

    return (
        <div 
            className="relative bg-cover bg-center" 
            style={{ backgroundImage: "url('https://storage.googleapis.com/lolirinepoolstoreimage/JACUZZI%20ASTRAPOOL/Jacuzzi%20arri%C3%A8re%20plan%20wellness.jpeg')" }}
        >
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {wellnessCategories.map(category => (
                        <div key={category.label} className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-200/50 flex flex-col">
                            <h3 className="text-xl font-bold text-cyan-800 mb-6 text-center border-b border-cyan-200 pb-4">
                                {category.label.toUpperCase()}
                            </h3>
                            <div className="space-y-3 flex-grow">
                                {category.children?.map(item => (
                                    <button 
                                        key={item.id} 
                                        onClick={() => navigateTo('shop', { categoryFilter: item.categoryFilter })}
                                        className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-200 shadow-sm text-gray-700 font-medium"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const VideoSection = () => {
    const videoId = "rEQPSYjjSFQ";
    return (
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Découvrez nos Spas en Vidéo
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?start=1&autoplay=0&modestbranding=1&rel=0`}
                title="YouTube video player - Espace Wellness"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    );
};

const useIntersectionObserver = (options: IntersectionObserverInit) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIntersecting(true);
            } else {
                setIntersecting(false);
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
    }, [options]);

    return [ref, isIntersecting] as const;
};

const InspirationSection = () => {
    const inspirationImages = [
        'https://storage.googleapis.com/lolirinepoolstoreimage/JACUZZI%20ASTRAPOOL/Inspiration%20jacuzzi.jpeg',
        'https://storage.googleapis.com/lolirinepoolstoreimage/JACUZZI%20ASTRAPOOL/Inspiration%20jacuzzi1.jpeg',
        'https://storage.googleapis.com/lolirinepoolstoreimage/JACUZZI%20ASTRAPOOL/Inspiration%20jacuzzi2.jpeg',
        'https://storage.googleapis.com/lolirinepoolstoreimage/JACUZZI%20ASTRAPOOL/Inspiration%20jacuzzi3.jpeg',
        'https://storage.googleapis.com/lolirinepoolstoreimage/JACUZZI%20ASTRAPOOL/Inspiration%20jacuzzi4.jpeg',
        'https://storage.googleapis.com/lolirinepoolstoreimage/JACUZZI%20ASTRAPOOL/Inspiration%20jacuzzi5.jpeg'
    ];

    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2, rootMargin: '0px' });

    return (
        <section 
            ref={ref} 
            className="py-20 overflow-hidden relative bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('https://storage.googleapis.com/lolirinepoolstoreimage/JACUZZI%20ASTRAPOOL/Inspiration%20jacuzzi5.jpeg')" }}
        >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-white text-center mb-12" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                    Nos Inspirations Wellness
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inspirationImages.map((src, index) => (
                        <div
                            key={index}
                            className={`transform transition-all duration-700 ease-out ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                                <div className="flex-grow flex items-center justify-center">
                                     <img
                                        src={src}
                                        alt={`Inspiration Wellness ${index + 1}`}
                                        className="w-full h-auto max-h-64 object-contain rounded"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const LoopingVideoSection = () => {
    const videoId = "Fz-tzBBYu7g";
    return (
      <section className="bg-blue-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
            L'Expérience Wellness en Mouvement
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`}
                title="YouTube video player - Wellness Experience"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    );
};

const WellnessPage: React.FC<WellnessPageProps> = (props) => {
    const { navigateTo, goBack, canGoBack, recentlyViewed } = props;
    return (
        <div className="bg-gray-100">
            <WellnessHero />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
                {canGoBack && <GoBackButton onClick={goBack} />}
            </div>

            <InfoSection />

            <AnimatedWaveSeparator />

            <SubMenuSection navigateTo={navigateTo} />
            
            <AnimatedWaveSeparator />

            <VideoSection />

            <AnimatedWaveSeparator />

            <InspirationSection />

            <AnimatedWaveSeparator />
            
            <LoopingVideoSection />

            {recentlyViewed && recentlyViewed.length > 0 && (
                <ProductsCarousel
                    products={recentlyViewed}
                    title="Consultés Récemment"
                    addToCart={props.addToCart}
                    onBuyNow={props.onBuyNow}
                    onSelectProduct={props.onSelectProduct}
                    navigateTo={navigateTo}
                    wishlist={props.wishlist}
                    addToWishlist={props.addToWishlist}
                    bgColor="bg-white"
                />
            )}
        </div>
    );
};

export default WellnessPage;