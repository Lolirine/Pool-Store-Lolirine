

import React, { useState, useEffect } from 'react';
import { Page, ServicesOverviewPageProps } from '../types';
import { SERVICES } from '../constants';
import GoBackButton from '../components/GoBackButton';
import { ArrowRight, CheckCircle } from 'lucide-react';

const ServicesOverviewPage: React.FC<ServicesOverviewPageProps> = ({ navigateTo, goBack, canGoBack }) => {
    const heroImages = [
        'https://storage.googleapis.com/lolirinepoolstoreimage/Construction%20piscine.jpeg',
        'https://storage.googleapis.com/lolirinepoolstoreimage/Analyse%20de%20l\'eau%203.jpeg',
        'https://storage.googleapis.com/lolirinepoolstoreimage/Couverture%20hivernage.jpeg',
        'https://storage.googleapis.com/lolirinepoolstoreimage/Entretien%20piscine%202.jpg',
        'https://storage.googleapis.com/lolirinepoolstoreimage/Re%CC%81alisatio%20piscine6.jpeg',
        'https://storage.googleapis.com/lolirinepoolstoreimage/re%CC%81paration%20de%CC%81pannage1.jpg',
        'https://storage.googleapis.com/lolirinepoolstoreimage/re%CC%81paration%20de%CC%81pannage2.jpg',
        'https://storage.googleapis.com/lolirinepoolstoreimage/snow-covered-pool-cover-roller-standing-next-to-frozen-swimming-winter-backyard-surrounded-frost-trees-outdoor-365075471.jpg.webp'
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroImages.length]);
    
    return (
        <div className="bg-white text-gray-600">
            {/* Hero Section */}
            <section className="relative bg-gray-800">
                <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
                    {heroImages.map((src, index) => (
                        <div
                            key={src}
                            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                            style={{ backgroundImage: `url('${src}')` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
                        </div>
                    ))}
                    
                    <div className="relative h-full flex flex-col items-center justify-center p-4">
                        <div className="bg-black/40 p-8 rounded-lg text-white backdrop-blur-sm max-w-4xl mx-auto text-center">
                            <h1 className="text-5xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>Nos Services</h1>
                            <h2 className="text-2xl font-bold mb-3" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>Nos services piscines : expertise et sérénité au quotidien</h2>
                            <p className="mb-4 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                                Chez Lolirine Pool Store, nous mettons notre savoir-faire au service de votre piscine pour vous garantir confort, sécurité et tranquillité. Qu’il s’agisse d’entretien régulier, de réparation ou de projets de construction, nous vous accompagnons avec des solutions fiables et personnalisées.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 bg-gradient-to-br from-cyan-400 to-blue-600 -mt-24 mx-auto max-w-5xl rounded-xl shadow-lg p-8">
                    <div className="text-left text-base text-white/95">
                        <h3 className="text-xl font-semibold mb-2 text-white">Nos prestations :</h3>
                        <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-sm">
                            <li><strong>Entretien complet :</strong> nettoyage, contrôle des équipements, ajustement des paramètres pour une eau saine et limpide toute l’année.</li>
                            <li><strong>Réparation & dépannage :</strong> intervention rapide et efficace sur tout type d’installation (pompe, filtre, liner, chauffage, automatisation…).</li>
                            <li><strong>Hivernage & remise en service :</strong> protection optimale de votre piscine en hiver et préparation professionnelle pour la saison estivale.</li>
                            <li><strong>Construction & rénovation :</strong> création sur mesure de piscines modernes ou transformation de votre bassin existant pour plus de confort et d’esthétique.</li>
                            <li><strong>Analyse et traitement de l’eau :</strong> diagnostics précis, conseils adaptés et solutions durables pour une eau équilibrée et agréable à la baignade.</li>
                        </ul>
                        <p className="mb-4">
                            Avec notre équipe de spécialistes, vous bénéficiez d’un accompagnement de qualité, d’une écoute attentive et d’interventions respectant les normes les plus exigeantes.
                        </p>
                        <p className="font-semibold text-lg text-center mt-6 text-white">
                            ✨ Votre piscine mérite le meilleur. Confiez-la à des professionnels.
                        </p>
                    </div>
                </div>
            </section>
            
             {/* Animated Waves Separator */}
            <div className="bg-gray-800">
                <style>{`
                    .waves {
                        position:relative;
                        width: 100%;
                        height:15vh;
                        min-height:100px;
                        max-height:150px;
                    }
                    .parallax > use {
                        animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
                    }
                    .parallax > use:nth-child(1) {
                        animation-delay: -2s;
                        animation-duration: 7s;
                    }
                    .parallax > use:nth-child(2) {
                        animation-delay: -3s;
                        animation-duration: 10s;
                    }
                    .parallax > use:nth-child(3) {
                        animation-delay: -4s;
                        animation-duration: 13s;
                    }
                    .parallax > use:nth-child(4) {
                        animation-delay: -5s;
                        animation-duration: 20s;
                    }
                    @keyframes move-forever {
                        0% {
                            transform: translate3d(-90px,0,0);
                        }
                        100% { 
                            transform: translate3d(85px,0,0);
                        }
                    }
                `}</style>
                <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(207,250,254,0.7)" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(207,250,254,0.5)" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(207,250,254,0.3)" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#ecfeff" />
                    </g>
                </svg>
            </div>


            {/* Main Content */}
             <section className="bg-cyan-50 pt-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                    {canGoBack && <GoBackButton onClick={goBack} className="mb-12" />}

                    {/* Intro Text */}
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Un service complet pour votre tranquillité</h2>
                        <p className="text-lg text-gray-600">
                            Que vous ayez besoin d'un entretien régulier, d'une réparation urgente, ou que vous rêviez d'une nouvelle piscine, notre équipe d'experts est à votre service. Nous mettons notre savoir-faire et notre passion à votre disposition pour garantir votre satisfaction et la longévité de votre installation.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="flex flex-wrap justify-center gap-8">
                        {SERVICES.map((service) => (
                            <div 
                                key={service.title} 
                                onClick={() => navigateTo(service.page)}
                                className="bg-white rounded-lg shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer border flex flex-col w-full sm:w-80"
                            >
                                <div className="relative">
                                    <img src={service.imageUrl} alt={service.title} className="h-48 w-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-4">
                                        <div className="p-3 bg-cyan-500 rounded-full mb-2 inline-block shadow-md">
                                            {React.cloneElement(service.icon, { className: 'h-6 w-6 text-white' })}
                                        </div>
                                        <h3 className="text-xl font-bold text-white" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.7)'}}>{service.title}</h3>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                                    <span className="text-cyan-600 font-semibold mt-auto inline-flex items-center group-hover:underline">
                                        Voir les détails <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="leading-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full h-auto max-h-[450px]">
                        <defs>
                            <linearGradient id="wave-gradient-services" x1="0.5" y1="0" x2="0.5" y2="1">
                                <stop offset="0%" stopColor="#22d3ee" />
                                <stop offset="100%" stopColor="#2563eb" />
                            </linearGradient>
                        </defs>
                        <path fill="url(#wave-gradient-services)" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,170.7C384,181,480,171,576,149.3C672,128,768,96,864,90.7C960,85,1056,107,1152,117.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </section>
            
            {/* New Formulas Section */}
            <section className="py-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-500">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-4" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>Nos formules d’entretien piscine</h2>
                    <p className="text-center text-lg text-white/90 max-w-3xl mx-auto mb-16" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                    Nous proposons des contrats adaptés à chaque type de piscine et à chaque usage. Les tarifs indiqués sont moyens et donnés à titre indicatif, afin de vous aider à choisir la formule qui correspond le mieux à vos besoins.
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {/* Card Standard */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <h3 className="text-2xl font-bold text-cyan-700 mb-2">🔹 Formule Standard</h3>
                        <p className="text-gray-600 mb-6 italic min-h-[3rem]">Idéale pour les piscines privées utilisées régulièrement.</p>
                        <ul className="space-y-3 text-gray-700 mb-8 flex-grow">
                        <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Nettoyage du bassin et de la ligne d’eau</span></li>
                        <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Vérification du système de filtration</span></li>
                        <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Contrôle et ajustement des paramètres de l’eau (pH, chlore, sel)</span></li>
                        <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Intervention 1 à 2 fois par mois</span></li>
                        </ul>
                        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center mb-6">
                        <p className="text-lg font-semibold text-cyan-800">À partir de 80 € à 120 € / mois</p>
                        <p className="text-xs text-gray-500">(hors produits de traitement)</p>
                        </div>
                        <p className="text-sm text-center text-gray-600">👉 Un suivi simple et efficace pour garder une eau claire et équilibrée.</p>
                    </div>
                    
                    {/* Card Premium */}
                    <div className="bg-cyan-700 text-white rounded-xl shadow-2xl border-4 border-cyan-500 p-8 flex flex-col transform lg:scale-105 relative z-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-400/40">
                        <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-lg">Populaire</div>
                        <h3 className="text-2xl font-bold text-white mb-2">🔹 Formule Premium</h3>
                        <p className="text-cyan-100 mb-6 italic min-h-[3rem]">Parfaite pour les résidences secondaires ou piscines d’hôtels nécessitant un suivi renforcé.</p>
                        <ul className="space-y-3 text-cyan-50 mb-8 flex-grow">
                        <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Entretien complet du bassin et des abords</span></li>
                        <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Analyse approfondie et traitement complet de l’eau</span></li>
                        <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Vérification et réglage des équipements (pompe, filtre, chauffage, robot…)</span></li>
                        <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Détection préventive des anomalies</span></li>
                        <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Interventions hebdomadaires</span></li>
                        </ul>
                        <div className="bg-cyan-800 border border-cyan-600 rounded-lg p-4 text-center mb-6">
                        <p className="text-lg font-semibold text-white">À partir de 200 € à 350 € / mois</p>
                        <p className="text-xs text-cyan-200">(hors produits de traitement)</p>
                        </div>
                        <p className="text-sm text-center text-cyan-100">👉 Votre piscine toujours prête, sans souci, en toutes circonstances.</p>
                    </div>

                    {/* Card Sur-Mesure */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <h3 className="text-2xl font-bold text-cyan-700 mb-2">🔹 Formule Sur-Mesure</h3>
                        <p className="text-gray-600 mb-6 italic min-h-[3rem]">Une solution personnalisée selon vos attentes.</p>
                        <ul className="space-y-3 text-gray-700 mb-8 flex-grow">
                        <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Choix libre de la fréquence des visites</span></li>
                        <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Services complémentaires : hivernage, remise en service, dépannage prioritaire</span></li>
                        <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Produits de traitement au choix (sel, chlore, brome, solutions écologiques)</span></li>
                        <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Suivi privilégié avec interlocuteur dédié</span></li>
                        </ul>
                        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center mb-6">
                        <p className="text-lg font-semibold text-cyan-800">Sur devis</p>
                        <p className="text-xs text-gray-500">Généralement entre 400 € et 600 € / mois pour un suivi intensif ou multiservices.</p>
                        </div>
                        <p className="text-sm text-center text-gray-600">👉 Un contrat à la carte, conçu pour votre tranquillité totale.</p>
                    </div>
                    </div>
                    <div className="text-center mt-16 max-w-3xl mx-auto">
                    <p className="text-xl text-white/95" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                        ✨ Que vous soyez particulier, gestionnaire hôtelier ou propriétaire d’une résidence secondaire, nos équipes vous garantissent un service fiable, transparent et sans surprise.
                    </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section 
                className="relative bg-cover bg-center bg-cyan-800"
                style={{ backgroundImage: "url('https://storage.googleapis.com/lolirinepoolstoreimage/lefteris-kallergis-ewSBvLSp3Tc-unsplash.jpg')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-48 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>Prêt à nous confier votre projet ?</h2>
                    <p className="text-white/90 mb-8 max-w-2xl mx-auto" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>Contactez-nous pour toute question ou pour obtenir un devis personnalisé. Notre équipe est à votre écoute pour vous conseiller.</p>
                    <button
                        onClick={() => navigateTo('contact')}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 flex items-center mx-auto shadow-lg"
                    >
                        Demander une information <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ServicesOverviewPage;