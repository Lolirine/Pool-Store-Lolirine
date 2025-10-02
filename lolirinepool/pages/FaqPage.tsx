import React from 'react';
import { FaqPageProps } from '../types';
import GoBackButton from '../components/GoBackButton';

const FAQ_DATA = [
    {
        question: "Quels types de contrats d'entretien proposez-vous ?",
        answer: "Nous proposons plusieurs formules adaptées à vos besoins : des contrats d'hivernage/estivage pour la mise en service et l'arrêt de votre piscine, ainsi que des contrats d'entretien annuels avec des visites hebdomadaires ou bimensuelles pour un suivi complet."
    },
    {
        question: "Intervenez-vous rapidement en cas de panne ?",
        answer: "Oui, la réactivité est notre priorité. En cas de problème urgent (panne de pompe, fuite importante), nous nous engageons à intervenir dans les 24 à 48 heures pour diagnostiquer et résoudre le problème."
    },
    {
        question: "Vendez-vous des produits pour le traitement de l'eau ?",
        answer: "Absolument. Notre boutique en ligne propose une gamme complète de produits de traitement : chlore, brome, sel, produits d'équilibre du pH, anti-algues, et bien plus. Nous pouvons vous conseiller sur les produits les plus adaptés à votre piscine."
    },
    {
        question: "Comment puis-je obtenir un devis pour la construction ou la rénovation de ma piscine ?",
        answer: "Vous pouvez remplir le formulaire sur notre page Contact & Devis en donnant le plus de détails possible sur votre projet. Un de nos experts vous contactera ensuite pour affiner votre demande et vous proposer un devis personnalisé."
    },
    {
        question: "Quelles sont vos zones d'intervention ?",
        answer: "Nous intervenons principalement en Gironde, notamment sur le Bassin d'Arcachon, Bordeaux et ses environs. N'hésitez pas à nous contacter pour vérifier si votre localité est couverte par nos services."
    }
];

const FaqPage: React.FC<FaqPageProps> = ({ goBack, canGoBack }) => {
    return (
        <div className="bg-white">
            <section 
              className="relative bg-cover bg-center h-[50vh] text-white flex items-center justify-center" 
              style={{ backgroundImage: "url('https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_9039.heic')" }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h1 className="text-5xl md:text-6xl font-extrabold" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>Foire Aux Questions</h1>
                  <p className="mt-4 text-xl text-gray-200 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                      Trouvez les réponses à vos questions les plus fréquentes.
                  </p>
              </div>
            </section>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
                {canGoBack && <GoBackButton onClick={goBack} className="mb-8" />}
                <div className="space-y-4">
                    {FAQ_DATA.map((faq, index) => (
                        <details key={index} className="group bg-gray-50 p-6 rounded-lg" open={index === 0}>
                            <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-800">
                                {faq.question}
                                <span className="ml-4 h-6 w-6 flex items-center justify-center transition-transform duration-300 group-open:rotate-180">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </span>
                            </summary>
                            <p className="mt-4 text-gray-600">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaqPage;