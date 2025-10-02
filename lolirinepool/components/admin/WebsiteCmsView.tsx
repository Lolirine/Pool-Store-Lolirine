import React, { useState } from 'react';
import { WebsiteCmsViewProps, PageContent, Page } from '../../types';
import { Home, MessageCircle, Settings2, Edit, ArrowLeft } from 'lucide-react';
import HomepageEditor from './HomepageEditor';
import TestimonialsEditor from './TestimonialsEditor';
import SiteSettingsEditor from './SiteSettingsEditor';
import PageEditor from './PageEditor';

type CmsEditorView = 'homepage' | 'testimonials' | 'settings' | 'pages';

const CmsCard: React.FC<{ title: string; description: string; icon: React.ReactNode; onClick: () => void }> = ({ title, description, icon, onClick }) => (
    <button
        onClick={onClick}
        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all text-left w-full border"
    >
        <div className="flex items-start gap-4">
            <div className="bg-cyan-100 text-cyan-600 p-3 rounded-lg">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
        </div>
    </button>
);


const WebsiteCmsView: React.FC<WebsiteCmsViewProps> = (props) => {
    const [activeEditor, setActiveEditor] = useState<CmsEditorView | null>(null);
    const [editingPage, setEditingPage] = useState<PageContent | null>(null);

    const renderContent = () => {
        if (activeEditor === 'pages') {
            if (editingPage) {
                return <PageEditor 
                            page={editingPage} 
                            onUpdatePage={(updatedPage) => {
                                props.onUpdatePageContent(updatedPage);
                                setEditingPage(updatedPage); // Keep the editor open with updated data
                            }}
                            onBack={() => setEditingPage(null)} 
                        />;
            } else {
                return (
                    <div className="space-y-6">
                         <div className="flex justify-between items-center">
                            <button onClick={() => setActiveEditor(null)} className="flex items-center gap-2 text-cyan-600 font-semibold hover:underline">
                                <ArrowLeft size={18} />
                                Retour au CMS
                            </button>
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <Edit size={22} />
                                Choisir une Page à Modifier
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {props.pagesContent.map(page => (
                                <button 
                                  key={page.pageId} 
                                  onClick={() => setEditingPage(page)} 
                                  className="p-4 bg-gray-50 border rounded-lg text-left hover:bg-cyan-50 hover:border-cyan-300 transition-colors"
                                >
                                    <h3 className="font-bold">{page.title}</h3>
                                    <p className="text-sm text-gray-500">ID: {page.pageId}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            }
        }
        
        switch (activeEditor) {
            case 'homepage':
                return <HomepageEditor
                            homeCategories={props.homeCategories}
                            onUpdateHomeCategories={props.onUpdateHomeCategories}
                            onBack={() => setActiveEditor(null)}
                        />;
            case 'testimonials':
                return <TestimonialsEditor
                            testimonials={props.testimonials}
                            onCreateTestimonial={props.onCreateTestimonial}
                            onUpdateTestimonial={props.onUpdateTestimonial}
                            onDeleteTestimonial={props.onDeleteTestimonial}
                            onBack={() => setActiveEditor(null)}
                        />;
            case 'settings':
                return <SiteSettingsEditor
                            siteConfig={props.siteConfig}
                            onUpdateSiteConfig={props.onUpdateSiteConfig}
                            onBack={() => setActiveEditor(null)}
                       />;
            default:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CmsCard 
                            title="Modifier la Page d'Accueil"
                            description="Gérez les catégories mises en avant sur la page d'accueil."
                            icon={<Home size={24} />}
                            onClick={() => setActiveEditor('homepage')}
                        />
                         <CmsCard 
                            title="Gérer les Témoignages"
                            description="Ajoutez, modifiez ou supprimez les avis clients affichés sur le site."
                            icon={<MessageCircle size={24} />}
                            onClick={() => setActiveEditor('testimonials')}
                        />
                         <CmsCard 
                            title="Paramètres Généraux du Site"
                            description="Modifiez les informations de contact, les réseaux sociaux et autres paramètres globaux."
                            icon={<Settings2 size={24} />}
                            onClick={() => setActiveEditor('settings')}
                        />
                         <CmsCard 
                            title="Éditeur de Pages"
                            description="Modifiez le contenu textuel des pages comme 'À propos' ou 'Nos services'."
                            icon={<Edit size={24} />}
                            onClick={() => setActiveEditor('pages')}
                        />
                    </div>
                );
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <Settings2 size={24} className="mr-3" />
                    Contenu du Site Web (CMS)
                </h2>
                <p className="mt-2 text-gray-600">Modifiez les sections clés de votre site public directement depuis cette interface.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                {renderContent()}
            </div>
        </div>
    );
};

export default WebsiteCmsView;
