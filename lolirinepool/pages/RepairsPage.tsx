import React from 'react';
import { Page, RepairsPageProps } from '../types';
import { INITIAL_PRODUCTS } from '../constants';
import { ArrowRight, Droplet, Cog, Zap, Search, Clock, Wrench, ClipboardCheck, ShieldCheck, BadgeCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import GoBackButton from '../components/GoBackButton';

const RepairsPage: React.FC<RepairsPageProps> = ({ navigateTo, goBack, canGoBack }) => {

  const repairProducts = INITIAL_PRODUCTS.filter(p => 
    ['prod-10055', 'prod-10055-3', 'elec-cof-001', 'elec-acc-002'].includes(String(p.id))
  ).slice(0, 4);

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-24 md:py-32 text-white" style={{ backgroundImage: "url('https://storage.googleapis.com/lolirinepoolstoreimage/re%CC%81paration%20de%CC%81pannage1.jpg')" }}>
        <div className="absolute inset-0 bg-blue-900 bg-opacity-40"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
            Réparation & Dépannage de piscine
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
            Une panne, une fuite, un équipement défectueux ? Retrouvez la sérénité avec notre service de dépannage rapide et efficace.
          </p>
        </div>
      </section>
      
      {/* Intro Section */}
      <section className="py-20 bg-gradient-to-b from-cyan-50 to-blue-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center">
            {canGoBack && <GoBackButton onClick={goBack} className="mb-8 inline-flex" />}
            <h2 className="text-3xl font-bold text-cyan-800 mb-4">
              Une solution à chaque problème
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
              Chez Lolirine Pool Store, nous savons qu’une piscine doit rester un lieu de plaisir. C’est pourquoi nous proposons un service complet de réparation et de dépannage, adapté à toutes les installations, pour une tranquillité d'esprit absolue.
            </p>
          </div>
        </div>
      </section>

      {/* Formulas Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Nos Formules Dépannage</h2>
          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-16">
            Des solutions claires et transparentes pour une intervention sans surprise.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Card Standard */}
            <div
              onClick={() => navigateTo('contact')}
              role="button"
              tabIndex={0}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            >
              <h3 className="text-2xl font-bold text-cyan-700 mb-2">🔹 Diagnostic & Conseil</h3>
              <p className="text-gray-600 mb-6 italic min-h-[3rem]">Pour identifier l'origine d'une panne simple ou obtenir un avis d'expert.</p>
              <ul className="space-y-3 text-gray-700 mb-8 flex-grow">
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Déplacement d'un technicien</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Analyse complète du système (1h)</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Rapport de diagnostic et préconisations</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Devis détaillé pour les réparations</span></li>
              </ul>
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center mb-6">
                <p className="text-lg font-semibold text-cyan-800">À partir de 150 € TTC</p>
                <p className="text-xs text-gray-500">(Déductible si réparation acceptée)</p>
              </div>
              <p className="text-sm text-center text-gray-600">👉 Idéal pour comprendre la panne avant de s'engager.</p>
            </div>
            
            {/* Card Premium */}
            <div
              onClick={() => navigateTo('contact')}
              role="button"
              tabIndex={0}
              className="bg-cyan-600 text-white rounded-xl shadow-2xl border-4 border-cyan-400 p-8 flex flex-col transform lg:scale-105 relative z-10 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-lg">Populaire</div>
              <h3 className="text-2xl font-bold text-white mb-2">🔹 Forfait Réparation</h3>
              <p className="text-cyan-100 mb-6 italic min-h-[3rem]">La solution tout-en-un pour la plupart des pannes courantes.</p>
              <ul className="space-y-3 text-cyan-50 mb-8 flex-grow">
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span><strong>Diagnostic complet inclus</strong></span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span><strong>Main d'œuvre</strong> pour la réparation (jusqu'à 2h)</span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Remplacement de petites pièces (joints, raccords)</span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Remise en service et tests de fonctionnement</span></li>
                 <li className="flex items-start"><CheckCircle size={20} className="text-yellow-300 mr-3 mt-1 flex-shrink-0" /><span>Intervention sous 72h ouvrées</span></li>
              </ul>
              <div className="bg-cyan-700 border border-cyan-500 rounded-lg p-4 text-center mb-6">
                <p className="text-lg font-semibold text-white">À partir de 250 € TTC</p>
                <p className="text-xs text-cyan-200">(hors pièces détachées majeures)</p>
              </div>
              <p className="text-sm text-center text-cyan-100">👉 La garantie d'une solution rapide et professionnelle.</p>
            </div>

            {/* Card Sur-Mesure */}
            <div
              onClick={() => navigateTo('contact')}
              role="button"
              tabIndex={0}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            >
              <h3 className="text-2xl font-bold text-cyan-700 mb-2">🔹 Dépannage Urgent 24h</h3>
              <p className="text-gray-600 mb-6 italic min-h-[3rem]">Pour les situations critiques nécessitant une intervention immédiate.</p>
              <ul className="space-y-3 text-gray-700 mb-8 flex-grow">
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Intervention prioritaire</strong> sous 24h ouvrées</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Forfait réparation inclus</strong></span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Mise en sécurité de l'installation</span></li>
                <li className="flex items-start"><CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Solutions temporaires si nécessaire</span></li>
              </ul>
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center mb-6">
                <p className="text-lg font-semibold text-cyan-800">Sur devis</p>
                <p className="text-xs text-gray-500">(Majoration de 30-50% sur le tarif standard)</p>
              </div>
              <p className="text-sm text-center text-gray-600">👉 Votre tranquillité d'esprit, notre priorité absolue.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW Table Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Tableau Comparatif des Formules</h2>
          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Visualisez rapidement les prestations pour faire le meilleur choix.
          </p>
          <div className="shadow-lg rounded-lg overflow-x-auto border">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-white uppercase bg-cyan-700">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Prestations</th>
                  <th scope="col" className="px-6 py-4 text-center font-semibold">Diagnostic</th>
                  <th scope="col" className="px-6 py-4 text-center font-semibold bg-cyan-800">Réparation</th>
                  <th scope="col" className="px-6 py-4 text-center font-semibold">Urgent 24h</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Délai d'intervention</td>
                  <td className="px-6 py-4 text-center">Standard</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">Sous 72h</td>
                  <td className="px-6 py-4 text-center">Sous 24h</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Diagnostic complet</td>
                  <td className="px-6 py-4 text-center">✔</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Main d'œuvre réparation</td>
                  <td className="px-6 py-4 text-center text-gray-400">En option</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">Inclus (2h)</td>
                  <td className="px-6 py-4 text-center">Inclus (2h)</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Petites fournitures</td>
                  <td className="px-6 py-4 text-center text-gray-400">–</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50">✔</td>
                  <td className="px-6 py-4 text-center">✔</td>
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Intervention prioritaire</td>
                  <td className="px-6 py-4 text-center text-gray-400">–</td>
                  <td className="px-6 py-4 text-center font-semibold bg-cyan-50 text-gray-400">–</td>
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
          <h2 className="text-3xl font-bold text-center mb-12">Exemples de pièces de rechange</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {repairProducts.map((product) => (
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
       
      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi nous choisir ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="inline-block text-green-500 mb-2"><Clock size={40} /></div>
              <h4 className="font-bold text-lg mb-1">Intervention rapide et transparente</h4>
            </div>
             <div className="p-4">
              <div className="inline-block text-green-500 mb-2"><BadgeCheck size={40} /></div>
              <h4 className="font-bold text-lg mb-1">Équipe formée aux dernières technologies</h4>
            </div>
             <div className="p-4">
              <div className="inline-block text-green-500 mb-2"><ClipboardCheck size={40} /></div>
              <h4 className="font-bold text-lg mb-1">Devis clair avant toute réparation</h4>
            </div>
             <div className="p-4">
              <div className="inline-block text-green-500 mb-2"><ShieldCheck size={40} /></div>
              <h4 className="font-bold text-lg mb-1">Garantie sur nos interventions</h4>
            </div>
          </div>
        </div>
      </section>

       <div className="text-center py-8">
            <p className="text-xl text-gray-700">
                ✨ Avec Lolirine Pool Store, votre piscine est entre de bonnes mains, même en cas d’imprévu.
            </p>
      </div>

      {/* CTA Section */}
      <section className="bg-cyan-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">💦 Ne laissez pas une panne gâcher votre plaisir</h2>
            <p className="text-cyan-100 mb-8 max-w-2xl mx-auto">Contactez-nous dès maintenant pour une intervention rapide et efficace. Appelez-nous ou demandez un devis express en ligne.</p>
            <button
                onClick={() => navigateTo('contact')}
                className="bg-white hover:bg-cyan-50 text-cyan-800 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 flex items-center mx-auto"
            >
                Demander une intervention <ArrowRight className="ml-2 h-5 w-5" />
            </button>
        </div>
      </section>
    </div>
  );
};

export default RepairsPage;
