import React, { useState } from 'react';
import { MarketingCampaign, MarketingViewProps } from '../../types';
import { Megaphone, PlusCircle, Edit, Trash2, TrendingUp, Mail, Users } from 'lucide-react';
import MarketingCampaignEditor from './MarketingCampaignEditor';
import { formatCurrency } from '../../utils/formatting';

const getStatusBadge = (status: MarketingCampaign['status']) => {
    switch (status) {
        case 'Draft': return 'bg-gray-200 text-gray-800';
        case 'Running': return 'bg-green-100 text-green-800';
        case 'Completed': return 'bg-blue-100 text-blue-800';
        case 'Archived': return 'bg-yellow-100 text-yellow-800';
    }
};

const MarketingView: React.FC<MarketingViewProps> = (props) => {
    const { campaigns, onCreate, onUpdate, onDelete, emailTemplates, popups, users } = props;
    const [editingCampaign, setEditingCampaign] = useState<MarketingCampaign | 'new' | null>(null);

    const handleSave = (campaignData: Omit<MarketingCampaign, 'id' | 'performance'>, existingId: string | null) => {
        if (existingId) {
            const originalCampaign = campaigns.find(c => c.id === existingId);
            if (originalCampaign) {
                onUpdate({ ...originalCampaign, ...campaignData });
            }
        } else {
            onCreate(campaignData);
        }
        setEditingCampaign(null);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <Megaphone size={24} className="mr-3" />
                    Campagnes Marketing
                </h2>
                <button 
                    onClick={() => setEditingCampaign('new')}
                    className="flex items-center gap-2 bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors"
                >
                    <PlusCircle size={20} />
                    Créer une campagne
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Campagne</th>
                            <th scope="col" className="px-6 py-3">Statut</th>
                            <th scope="col" className="px-6 py-3">Cible</th>
                            <th scope="col" className="px-6 py-3">Période</th>
                            <th scope="col" className="px-6 py-3">Performance (Simulée)</th>
                            <th scope="col" className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map(campaign => (
                            <tr key={campaign.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    <div>{campaign.name}</div>
                                    <div className="text-xs text-gray-500">{campaign.goal}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(campaign.status)}`}>
                                        {campaign.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{campaign.targetSegment}</td>
                                <td className="px-6 py-4">{new Date(campaign.startDate).toLocaleDateString('fr-FR')} - {new Date(campaign.endDate).toLocaleDateString('fr-FR')}</td>
                                <td className="px-6 py-4">
                                    {campaign.performance && (
                                        <div className="flex items-center gap-4 text-xs">
                                            <div title="Emails Envoyés"><Mail size={14} className="inline mr-1"/> {campaign.performance.emailsSent || 0}</div>
                                            <div title="Taux de Conversion"><Users size={14} className="inline mr-1"/> {campaign.performance.conversionRate || 0}%</div>
                                            <div title="Revenu Généré"><TrendingUp size={14} className="inline mr-1"/> {formatCurrency(campaign.performance.revenueGenerated || 0)}</div>
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-center space-x-1">
                                    <button onClick={() => setEditingCampaign(campaign)} className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-full" title="Modifier">
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => onDelete(campaign.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full" title="Supprimer">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingCampaign && (
                <MarketingCampaignEditor
                    campaign={editingCampaign === 'new' ? null : editingCampaign}
                    onClose={() => setEditingCampaign(null)}
                    onSave={handleSave}
                    emailTemplates={emailTemplates}
                    popups={popups}
                    users={users}
                />
            )}
        </div>
    );
};

export default MarketingView;
