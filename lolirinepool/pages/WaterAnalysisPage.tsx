import React, { useState, useEffect } from 'react';
import { Page, WaterAnalysisPageProps } from '../types';
import { INITIAL_PRODUCTS } from '../constants';
import { ArrowRight, TestTube, Check, Droplet, ShieldCheck, DollarSign, Calendar, Beaker, ClipboardList, Thermometer, Shield, CheckCircle } from 'lucide-react';
import GoBackButton from '../components/GoBackButton';

const WaterAnalysisPage: React.FC<WaterAnalysisPageProps> = ({ navigateTo, goBack, canGoBack }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const heroImages = [
      'https://storage.googleapis.com/lolirinepoolstoreimage/TRAITEMENTS%20EAU/th-58.jpeg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/TRAITEMENTS%20EAU/th-53.jpeg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/TRAITEMENTS%20EAU/th-4.jpeg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/Analyse%20de%20l\'eau%204.jpeg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/Analyse%20de%20l\'eau%205.jpeg'
  ];

  useEffect(() => {
      const timer = setInterval(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % heroImages.length);
      }, 5000); // Change image every 5 seconds
      return () => clearInterval(timer);
  }, [heroImages.length]);

  const analysisProducts = INITIAL_PRODUCTS.filter(p => 
    ['prod-10255-22', 'prod-10255-23', 'prod-10255-24', 'prod-10255-26'].includes(String(p.id))
  ).slice(0, 4);

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden text-white">
        {heroImages.map((src, index) => (
            <div
                key={src}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundImage: `url(${src})` }}
            />
        ))}
        <div className="absolute inset-0 bg-blue-900 bg-opacity-30"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center h-full flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
            💧 Analyse de l’Eau de Piscine — Une Eau Parfaite, en Toute Saison
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
            Une eau limpide et saine, c’est la clé d’une baignade agréable et sécurisée. Notre service vous garantit un diagnostic précis et un traitement adapté.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-gradient-to-b from-cyan-50 to-blue-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center">
            {canGoBack && <GoBackButton onClick={goBack} className="mb-8 inline-flex" />}
            <h2 className="text-3xl font-bold text-cyan-800 mb-4">
              🔬 Pourquoi analyser l’eau de votre piscine ?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
              L’eau d’une piscine est un écosystème fragile. Sans contrôle régulier, elle peut rapidement devenir trouble, verte, irritante ou corrosive pour vos équipements. Une analyse professionnelle vous assure une eau équilibrée, douce et parfaitement désinfectée.
            </p>
          </div>
        </div>
      </section>

       {/* Formulas Section */}
       <section className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Nos Formules d'Analyse</h2>
          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-16">
            Des solutions adaptées pour un diagnostic précis et des conseils sur mesure.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Card 1: Express */}
            <div
              onClick={() => navigateTo('contact')}
              role="button"
              tabIndex={0}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            >
              <h3 className="text-2xl font-bold text-cyan-700 mb-2">🔹 Analyse Express en Magasin</h3>
              <p className="text-gray-600 mb-6 italic min-h-[3rem]">Apportez un échantillon d'eau et repartez avec un diagnostic immédiat.</p>
              <ul className="space-y-3 text-gray-700 mb-8 flex-grow">
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Analyse des 5 paramètres clés (pH, chlore, TAC, etc.)</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Résultats et interprétation instantanés</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Recommandations de produits personnalisées</span></li>
              </ul>
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center mb-6">
                <p className="text-lg font-semibold text-cyan-800">Gratuit</p>
                <p className="text-xs text-gray-500">(pour les clients du magasin)</p>
              </div>
              <p className="text-sm text-center text-gray-600">👉 La solution rapide pour un contrôle de routine.</p>
            </div>
            
            {/* Card 2: Domicile */}
            <div
              onClick={() => navigateTo('contact')}
              role="button"
              tabIndex={0}
              className="bg-cyan-600 text-white rounded-xl shadow-2xl border-4 border-cyan-400 p-8 flex flex-col transform lg:scale-105 relative z-10 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-lg">Populaire</div>
              <h3 className="text-2xl font-bold text-white mb-2">🔹 Diagnostic Complet à Domicile</h3>
              <p className="text-cyan-100 mb-6 italic min-h-[3rem]">Un technicien se déplace pour une analyse approfondie de votre installation.</p>
              <ul className="space-y-3 text-cyan-50 mb-8 flex-grow">
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Analyse complète de 10 paramètres</span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Inspection visuelle de l'équipement</span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Plan de traitement détaillé et chiffré</span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Application des premiers correctifs si souhaité</span></li>
              </ul>
              <div className="bg-cyan-700 border border-cyan-500 rounded-lg p-4 text-center mb-6">
                <p className="text-lg font-semibold text-white">À partir de 75 € TTC</p>
                <p className="text-xs text-cyan-200">(hors produits)</p>
              </div>
              <p className="text-sm text-center text-cyan-100">👉 L'assurance d'un diagnostic expert sans vous déplacer.</p>
            </div>

            {/* Card 3: Suivi */}
            <div
              onClick={() => navigateTo('contact')}
              role="button"
              tabIndex={0}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            >
              <h3 className="text-2xl font-bold text-cyan-700 mb-2">🔹 Contrat Suivi Qualité</h3>
              <p className="text-gray-600 mb-6 italic min-h-[3rem]">Intégrez l'analyse de l'eau à votre contrat d'entretien pour une tranquillité totale.</p>
              <ul className="space-y-3 text-gray-700 mb-8 flex-grow">
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Analyse complète à chaque visite d'entretien</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Ajustements et traitements inclus</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Rapport de visite détaillé par email</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Accès prioritaire à nos techniciens</span></li>
              </ul>
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center mb-6">
                <p className="text-lg font-semibold text-cyan-800">Inclus dans nos contrats d'entretien</p>
                <p className="text-xs text-gray-500">(à partir de 80 € / mois)</p>
              </div>
              <p className="text-sm text-center text-gray-600">👉 Ne pensez plus à votre eau, profitez-en simplement.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Section */}
       <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Les produits pour un traitement efficace</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {analysisProducts.map((product) => (
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

      {/* Benefits Section */}
      <section className="py-20 relative bg-cover bg-center" style={{ backgroundImage: "url('https://storage.googleapis.com/lolirinepoolstoreimage/Analyse%20de%20l'eau%203.jpeg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>✅ Les avantages de notre service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <div className="inline-block text-cyan-300 mb-2"><TestTube size={40} /></div>
              <h4 className="font-bold text-lg text-white mb-1">Précision professionnelle</h4>
              <p className="text-white/80">Outils et réactifs de laboratoire pour des résultats fiables.</p>
            </div>
             <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <div className="inline-block text-cyan-300 mb-2"><Droplet size={40} /></div>
              <h4 className="font-bold text-lg text-white mb-1">Santé et confort</h4>
              <p className="text-white/80">Une eau douce pour la peau, sans odeurs désagréables.</p>
            </div>
             <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <div className="inline-block text-cyan-300 mb-2"><ShieldCheck size={40} /></div>
              <h4 className="font-bold text-lg text-white mb-1">Préservation des équipements</h4>
              <p className="text-white/80">Moins de corrosion, d’entartrage et de dépôts.</p>
            </div>
             <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <div className="inline-block text-cyan-300 mb-2"><DollarSign size={40} /></div>
              <h4 className="font-bold text-lg text-white mb-1">Économies</h4>
              <p className="text-white/80">Éviter la surconsommation de produits chimiques grâce à un dosage optimal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cyan-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">💦 Ne laissez pas le hasard décider de la qualité de votre eau</h2>
            <p className="text-cyan-100 mb-8 max-w-2xl mx-auto">Confiez-nous son analyse et profitez d’une baignade saine et agréable toute l’année.</p>
            <button
                onClick={() => navigateTo('contact')}
                className="bg-white hover:bg-cyan-50 text-cyan-800 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 flex items-center mx-auto"
            >
                Réserver mon diagnostic <ArrowRight className="ml-2 h-5 w-5" />
            </button>
        </div>
      </section>
    </div>
  );
};

export default WaterAnalysisPage;
