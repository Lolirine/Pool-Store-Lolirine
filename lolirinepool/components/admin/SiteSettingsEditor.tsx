import React, { useState } from 'react';
import { SiteConfig } from '../../types';
import { ArrowLeft, Save, Settings2 } from 'lucide-react';

interface SiteSettingsEditorProps {
    siteConfig: SiteConfig;
    onUpdateSiteConfig: (config: SiteConfig) => void;
    onBack: () => void;
}

const SiteSettingsEditor: React.FC<SiteSettingsEditorProps> = ({ siteConfig, onUpdateSiteConfig, onBack }) => {
    const [config, setConfig] = useState<SiteConfig>(siteConfig);
    const [saved, setSaved] = useState(false);

    const handleContactChange = (field: keyof SiteConfig['contact'], value: string) => {
        setConfig(prev => ({
            ...prev,
            contact: { ...prev.contact, [field]: value }
        }));
    };
    
    const handleSocialChange = (field: keyof SiteConfig['socials'], value: string) => {
        setConfig(prev => ({
            ...prev,
            socials: { ...prev.socials, [field]: value }
        }));
    };

    const handleSave = () => {
        onUpdateSiteConfig(config);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <button onClick={onBack} className="flex items-center gap-2 text-cyan-600 font-semibold hover:underline">
                    <ArrowLeft size={18} />
                    Retour au CMS
                </button>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Settings2 size={22} />
                    Paramètres Généraux du Site
                </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
                    <h3 className="font-bold">Informations de Contact</h3>
                    <div>
                        <label className="block text-sm font-medium">Adresse</label>
                        <input type="text" value={config.contact.address} onChange={e => handleContactChange('address', e.target.value)} className="w-full p-2 border rounded-md"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Ville & Pays</label>
                        <input type="text" value={config.contact.city} onChange={e => handleContactChange('city', e.target.value)} className="w-full p-2 border rounded-md"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Téléphone</label>
                        <input type="text" value={config.contact.phone} onChange={e => handleContactChange('phone', e.target.value)} className="w-full p-2 border rounded-md"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input type="email" value={config.contact.email} onChange={e => handleContactChange('email', e.target.value)} className="w-full p-2 border rounded-md"/>
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
                     <h3 className="font-bold">Réseaux Sociaux</h3>
                     <div>
                        <label className="block text-sm font-medium">Facebook URL</label>
                        <input type="text" value={config.socials.facebook} onChange={e => handleSocialChange('facebook', e.target.value)} className="w-full p-2 border rounded-md"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Twitter URL</label>
                        <input type="text" value={config.socials.twitter} onChange={e => handleSocialChange('twitter', e.target.value)} className="w-full p-2 border rounded-md"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Instagram URL</label>
                        <input type="text" value={config.socials.instagram} onChange={e => handleSocialChange('instagram', e.target.value)} className="w-full p-2 border rounded-md"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium">LinkedIn URL</label>
                        <input type="text" value={config.socials.linkedin} onChange={e => handleSocialChange('linkedin', e.target.value)} className="w-full p-2 border rounded-md"/>
                    </div>
                </div>
            </div>
            
            <div className="pt-4 border-t flex justify-end">
                 <button
                    onClick={handleSave}
                    className={`flex items-center justify-center gap-2 py-2 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition-colors ${saved ? 'bg-green-600' : 'bg-cyan-600 hover:bg-cyan-700'}`}
                >
                    <Save size={18} />
                    {saved ? 'Enregistré !' : 'Enregistrer les modifications'}
                </button>
            </div>
        </div>
    );
};

export default SiteSettingsEditor;
