import React, { useState, useEffect } from 'react';
import { Page, ConstructionPageProps } from '../types';
import { INITIAL_PRODUCTS } from '../constants';
import { ArrowRight, Waves, Droplet, Zap, RotateCw, Wrench, ShieldCheck, Star, Building, CheckCircle, Award, BadgeCheck } from 'lucide-react';
import GoBackButton from '../components/GoBackButton';

const ConstructionPage: React.FC<ConstructionPageProps> = ({ navigateTo, goBack, canGoBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroImages = [
      'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2022-04-13-16-20-01.jpg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2022-08-09-10-51-45.jpg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-16-20-42-31.jpg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-19-12-39-05.jpg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-19-12-39-06.jpg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-19-20-46-29.jpg',
  ];

  useEffect(() => {
      const timer = setInterval(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % heroImages.length);
      }, 5000); // Change image every 5 seconds
      return () => clearInterval(timer);
  }, [heroImages.length]);

  const constructionProducts = INITIAL_PRODUCTS.filter(p => 
    ['liner-001', 'SCPAQG-100-0003', 'elec-lamp-001', 'prod-10060-14'].includes(String(p.id))
  ).slice(0, 4);

  const whyUsPoints = [
      { icon: <CheckCircle size={40}/>, title: 'Accompagnement personnalisé', description: 'De l’étude technique au premier plongeon.'},
      { icon: <Award size={40}/>, title: 'Matériaux haut de gamme', description: 'Pour un rendu durable et élégant.'},
      { icon: <Wrench size={40}/>, title: 'Expertise technique', description: 'Plus de 10 ans d’expérience dans la conception et la rénovation.'},
      { icon: <BadgeCheck size={40}/>, title: 'Engagement qualité', description: 'Respect des délais, du budget et de vos attentes.'},
  ];

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden text-white">
        {heroImages.map((src, index) => (
            <div
                key={src}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundImage: `url(${src})` }}
            />
        ))}
        <div className="absolute inset-0 bg-blue-900 bg-opacity-20"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center h-full flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
            🏊 Construction & Rénovation de Piscine — Donnez vie à vos envies
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
            Du design sur-mesure à la réalisation complète, nous vous accompagnons pas à pas pour bâtir l’espace de baignade qui vous ressemble.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-gradient-to-b from-cyan-50 to-blue-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center">
            {canGoBack && <GoBackButton onClick={goBack} className="mb-8 inline-flex" />}
            <h2 className="text-3xl font-bold text-cyan-800 mb-4">
              Votre projet, notre expertise
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
              Que vous rêviez d'une nouvelle piscine ou souhaitiez moderniser votre bassin existant, notre équipe d'experts vous accompagne pour concrétiser votre vision. Nous combinons créativité, savoir-faire technique et matériaux de qualité pour un résultat à la hauteur de vos attentes.
            </p>
          </div>
        </div>
      </section>

      {/* Formulas Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Nos Formules Projet</h2>
          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-16">
            Découvrez nos offres conçues pour s'adapter à chaque type de projet, du rafraîchissement à la création complète.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Card 1: Rénovation */}
            <div
              onClick={() => navigateTo('contact')}
              role="button"
              tabIndex={0}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            >
              <h3 className="text-2xl font-bold text-cyan-700 mb-2">🔹 Formule Rénovation Éclat</h3>
              <p className="text-gray-600 mb-6 italic min-h-[3rem]">Pour moderniser et redonner vie à votre piscine existante.</p>
              <ul className="space-y-3 text-gray-700 mb-8 flex-grow">
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Remplacement du revêtement (liner, PVC armé)</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Modernisation de la filtration</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Mise à jour du système de traitement</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Optimisation énergétique (pompe à chaleur, etc.)</span></li>
              </ul>
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center mb-6">
                <p className="text-lg font-semibold text-cyan-800">À partir de 5 000 € TTC</p>
                <p className="text-xs text-gray-500">(selon taille et options)</p>
              </div>
              <p className="text-sm text-center text-gray-600">👉 Un second souffle pour votre bassin.</p>
            </div>
            
            {/* Card 2: Construction */}
            <div
              onClick={() => navigateTo('contact')}
              role="button"
              tabIndex={0}
              className="bg-cyan-600 text-white rounded-xl shadow-2xl border-4 border-cyan-400 p-8 flex flex-col transform lg:scale-105 relative z-10 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-lg">Populaire</div>
              <h3 className="text-2xl font-bold text-white mb-2">🔹 Formule Construction Signature</h3>
              <p className="text-cyan-100 mb-6 italic min-h-[3rem]">La solution complète pour la création de votre piscine sur-mesure.</p>
              <ul className="space-y-3 text-cyan-50 mb-8 flex-grow">
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Étude et conception 3D du projet</span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Terrassement et maçonnerie (béton)</span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Installation complète du circuit hydraulique</span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Pose du revêtement et des pièces à sceller</span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Mise en service et formation</span></li>
              </ul>
              <div className="bg-cyan-700 border border-cyan-500 rounded-lg p-4 text-center mb-6">
                <p className="text-lg font-semibold text-white">À partir de 30 000 € TTC</p>
                <p className="text-xs text-cyan-200">(pour une piscine 8x4m prête à plonger)</p>
              </div>
              <p className="text-sm text-center text-cyan-100">👉 Votre rêve de piscine, clé en main.</p>
            </div>

            {/* Card 3: Prestige */}
            <div
              onClick={() => navigateTo('contact')}
              role="button"
              tabIndex={0}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            >
              <h3 className="text-2xl font-bold text-cyan-700 mb-2">🔹 Formule Prestige & Paysage</h3>
              <p className="text-gray-600 mb-6 italic min-h-[3rem]">Pour un espace aquatique d'exception, parfaitement intégré à votre jardin.</p>
              <ul className="space-y-3 text-gray-700 mb-8 flex-grow">
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Formule Construction Signature incluse</strong></span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Piscine à débordement ou miroir</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Aménagement paysager complet (terrasse, plantations)</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Équipements haut de gamme (domotique, éclairage LED, etc.)</span></li>
              </ul>
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center mb-6">
                <p className="text-lg font-semibold text-cyan-800">Sur devis</p>
                <p className="text-xs text-gray-500">(Projets à partir de 60 000 € TTC)</p>
              </div>
              <p className="text-sm text-center text-gray-600">👉 L'excellence pour un projet unique.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW Table Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Tableau Comparatif des Formules</h2>
          <div className="shadow-lg rounded-lg overflow-x-auto border">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-white uppercase bg-cyan-700">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Prestations</th>
                  <th scope="col" className="px-6 py-4 text-center font-semibold">Rénovation Éclat</th>
                  <th scope="col" className="px-6 py-4 text-center font-semibold bg-cyan-800">Construction Signature</th>
                  <th scope="col" className="px-6 py-4 text-center font-semibold">Prestige & Paysage</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Étude & Conception 3D</td>
                  <td className="px-6 py-4 text-center text-gray-400">Option</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Terrassement & Maçonnerie</td>
                  <td className="px-6 py-4 text-center text-gray-400">–</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Remplacement Revêtement</td>
                  <td className="px-6 py-4 text-center">✔</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔ (Pose initiale)</td>
                  <td className="px-6 py-4 text-center">✔ (Pose initiale)</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Modernisation Équipements</td>
                  <td className="px-6 py-4 text-center">✔</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔ (Neufs)</td>
                  <td className="px-6 py-4 text-center">✔ (Haut de gamme)</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Piscine à débordement / miroir</td>
                  <td className="px-6 py-4 text-center text-gray-400">–</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">Option</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Aménagement paysager</td>
                  <td className="px-6 py-4 text-center text-gray-400">–</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">Option</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Products Section */}
       <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Des matériaux de qualité pour votre projet</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {constructionProducts.map((product) => (
              <div key={product.id} className="text-center group">
                <div className="bg-white rounded-lg p-4 mb-2 overflow-hidden aspect-square flex items-center justify-center border">
                    <img src={product.imageUrl} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"/>
                </div>
                <h4 className="font-semibold text-sm text-gray-700">{product.name}</h4>
              </div>
            ))}
          </div>
        </div>
       </section>
       
      {/* Why Us Section */}
      <section 
        className="py-16 relative bg-cover bg-center"
        style={{ backgroundImage: "url('https://storage.googleapis.com/lolirinepoolstoreimage/IMAGES%20ARRIERES%20PLAN/Piscine%20arrie%CC%80re%20plan19.avif')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>🛡 Pourquoi nous confier votre projet ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {whyUsPoints.map(point => (
                <div key={point.title} className="p-4">
                  <div className="inline-block text-cyan-300 mb-2">{point.icon}</div>
                  <h4 className="font-bold text-lg text-white mb-1">{point.title}</h4>
                  <p className="text-white/90">{point.description}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">💦 Faites de votre jardin un lieu d’exception</h2>
            <p className="text-blue-700 mb-8 max-w-2xl mx-auto">Contactez-nous dès aujourd’hui pour un devis gratuit et un avant-projet personnalisé.</p>
            <button
                onClick={() => navigateTo('contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 flex items-center mx-auto"
            >
                Obtenir mon devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
            </button>
        </div>
      </section>
    </div>
  );
};

export default ConstructionPage;
