import React, { useState, useEffect } from 'react';
import { MarketingCampaign, UserSegment, MarketingCampaignEditorProps } from '../../types';
import { X, Save, Rocket, Mail, MessageSquare } from 'lucide-react';

const ALL_USER_SEGMENTS: (UserSegment | 'All')[] = ['All', 'Nouveau', 'Fidèle', 'VIP', 'Inactif', 'À Risque'];

const MarketingCampaignEditor: React.FC<MarketingCampaignEditorProps> = ({ campaign, onClose, onSave, emailTemplates, popups, users }) => {
    const [formData, setFormData] = useState<Omit<MarketingCampaign, 'id' | 'performance'>>({
        name: '',
        goal: '',
        targetSegment: 'All',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'Draft',
        linkedEmailTemplateId: undefined,
        linkedPopupId: undefined,
    });

    useEffect(() => {
        if (campaign) {
            const { performance, ...campaignData } = campaign;
            setFormData(campaignData);
        }
    }, [campaign]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData, campaign ? campaign.id : null);
    };
    
    const handleLaunch = () => {
        const updatedData = { ...formData, status: 'Running' as const };
        setFormData(updatedData);
        onSave(updatedData, campaign ? campaign.id : null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[51] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-bold text-gray-800">
                            {campaign ? 'Modifier la Campagne' : 'Nouvelle Campagne'}
                        </h2>
                        <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        <fieldset>
                            <legend className="text-lg font-semibold text-gray-700 mb-2">Détails de la campagne</legend>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom de la campagne</label>
                                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Objectif</label>
                                    <textarea name="goal" id="goal" value={formData.goal} onChange={handleChange} rows={2} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Date de début</label>
                                        <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                                    </div>
                                    <div>
                                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Date de fin</label>
                                        <input type="date" name="endDate" id="endDate" value={formData.endDate} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className="border-t pt-6">
                            <legend className="text-lg font-semibold text-gray-700 mb-2">Ciblage & Statut</legend>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="targetSegment" className="block text-sm font-medium text-gray-700">Segment Cible</label>
                                    <select name="targetSegment" id="targetSegment" value={formData.targetSegment} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm">
                                        {ALL_USER_SEGMENTS.map(segment => <option key={segment} value={segment}>{segment}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Statut</label>
                                    <select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm">
                                        {(['Draft', 'Running', 'Completed', 'Archived'] as MarketingCampaign['status'][]).map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                        </fieldset>
                        
                        <fieldset className="border-t pt-6">
                             <legend className="text-lg font-semibold text-gray-700 mb-2">Actions de la campagne</legend>
                             <div className="space-y-4">
                                 <div className="flex items-center gap-3">
                                     <Mail className="text-gray-500"/>
                                     <div className="flex-1">
                                        <label htmlFor="linkedEmailTemplateId" className="block text-sm font-medium text-gray-700">Modèle d'email associé</label>
                                        <select name="linkedEmailTemplateId" id="linkedEmailTemplateId" value={formData.linkedEmailTemplateId || ''} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm">
                                            <option value="">Aucun</option>
                                            {emailTemplates.filter(t => t.type === 'marketing').map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                        </select>
                                     </div>
                                 </div>
                                  <div className="flex items-center gap-3">
                                     <MessageSquare className="text-gray-500"/>
                                     <div className="flex-1">
                                        <label htmlFor="linkedPopupId" className="block text-sm font-medium text-gray-700">Pop-up associé</label>
                                        <select name="linkedPopupId" id="linkedPopupId" value={formData.linkedPopupId || ''} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm">
                                            <option value="">Aucun</option>
                                            {popups.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                                        </select>
                                     </div>
                                 </div>
                             </div>
                        </fieldset>

                    </div>

                    <div className="flex justify-between items-center p-4 border-t bg-gray-50">
                        <button 
                            type="button" 
                            onClick={handleLaunch}
                            disabled={formData.status !== 'Draft'}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 disabled:bg-gray-400"
                        >
                            <Rocket size={16}/> Lancer la campagne
                        </button>
                        <div>
                            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                                Annuler
                            </button>
                            <button type="submit" className="ml-3 px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-md shadow-sm hover:bg-cyan-700 flex items-center gap-2">
                                <Save size={16}/> Enregistrer
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MarketingCampaignEditor;
