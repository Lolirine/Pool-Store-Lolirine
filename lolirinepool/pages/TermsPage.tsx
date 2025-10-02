import React from 'react';
import { TermsPageProps } from '../types';
import GoBackButton from '../components/GoBackButton';

const TermsPage: React.FC<TermsPageProps> = ({ pageContent, goBack, canGoBack }) => {
    if (!pageContent) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Chargement du contenu de la page...</p>
            </div>
        );
    }
  
    const { hero, sections } = pageContent;

    return (
        <div className="bg-white">
            <section 
                className="relative bg-cover bg-center py-20 text-white flex items-center justify-center" 
                style={{ backgroundImage: `url('${hero.imageUrl}')` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                        {hero.title}
                    </h1>
                    <p className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                        {hero.subtitle}
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-16">
                {canGoBack && <GoBackButton onClick={goBack} className="mb-8" />}
                {sections.map(section => (
                    <div 
                        key={section.id} 
                        className="prose prose-lg text-gray-600 max-w-none"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                ))}
            </div>
        </div>
    );
};

export default TermsPage;