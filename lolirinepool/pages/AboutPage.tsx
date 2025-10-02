import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AboutPageProps } from '../types';
import GoBackButton from '../components/GoBackButton';

const AboutPage: React.FC<AboutPageProps> = ({ goBack, canGoBack, pageContent }) => {

  if (!pageContent) {
    return (
        <div className="flex items-center justify-center h-screen">
            <p>Chargement du contenu de la page...</p>
        </div>
    );
  }
  
  const { hero, sections } = pageContent;

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-[60vh] text-white flex items-center justify-center" 
        style={{ backgroundImage: `url('${hero.imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
              {hero.title}
            </h1>
            <p className="mt-4 text-xl text-gray-200 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
              {hero.subtitle}
            </p>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12">
          {canGoBack && <GoBackButton onClick={goBack} />}
      </div>

      {/* Dynamic Sections */}
      {sections.map((section, index) => (
        <section key={section.id} className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
           <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 && section.imageUrl ? 'md:grid-flow-col-dense' : ''}`}>
                  {section.imageUrl && (
                    <div className={`relative ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                      <img src={section.imageUrl} alt={section.title} className="rounded-lg shadow-xl" />
                    </div>
                  )}
                  <div className={section.imageUrl ? '' : 'md:col-span-2 text-center'}>
                      <h2 className={`text-3xl font-bold text-gray-800 mb-6 ${!section.imageUrl ? 'text-center' : ''}`}>{section.title}</h2>
                      <p className={`text-gray-600 prose lg:prose-lg max-w-none whitespace-pre-wrap ${!section.imageUrl ? 'mx-auto' : ''}`}>
                        {section.content}
                      </p>
                  </div>
              </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="bg-cyan-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Prêt à Plonger dans Votre Projet ?</h2>
            <p className="text-cyan-100 mb-8 max-w-2xl mx-auto">Que ce soit pour une nouvelle construction, une rénovation ou un simple conseil, notre équipe est là pour vous accompagner.</p>
            <button
                onClick={() => { /* This should navigate to contact page */ }}
                className="bg-white hover:bg-cyan-50 text-cyan-800 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 flex items-center mx-auto"
            >
                Contactez-nous <ArrowRight className="ml-2 h-5 w-5" />
            </button>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
