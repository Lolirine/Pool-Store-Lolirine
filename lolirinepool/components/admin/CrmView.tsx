import React, { useState, useMemo } from 'react';
import { UserAccount, Order, Prospect, UserSegment, CommunicationEntry } from '../../types';
import { HeartHandshake, Users, UserPlus, BarChart, Eye, PlusCircle, Edit, Trash2, CheckCircle, X } from 'lucide-react';
import ClientManagementView from './ClientManagementView';
import { formatCurrency } from '../../utils/formatting';

// --- PROPS INTERFACES ---
interface CrmViewProps {
  users: UserAccount[];
  orders: Order[];
  prospects: Prospect[];
  onSelectUser: (user: UserAccount) => void;
  onCreateProspect: (prospectData: Omit<Prospect, 'id' | 'createdAt' | 'notes'>) => void;
  onUpdateProspect: (updatedProspect: Prospect) => void;
  onDeleteProspect: (prospectId: string) => void;
}

interface ProspectManagementViewProps {
  prospects: Prospect[];
  onCreate: (prospectData: Omit<Prospect, 'id' | 'createdAt' | 'notes'>) => void;
  onUpdate: (updatedProspect: Prospect) => void;
  onDelete: (prospectId: string) => void;
}

// --- SUB-COMPONENTS (kept in one file to respect constraints) ---

const PieChart: React.FC<{ data: { name: string, value: number }[] }> = ({ data }) => {
    const colors = ['#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63'];
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) return <div className="flex items-center justify-center h-full text-gray-500">Aucune donnée</div>;
    
    let cumulative = 0;
    const paths = data.map((item, i) => {
        const start = cumulative / total * 360;
        cumulative += item.value;
        const end = cumulative / total * 360;
        const largeArcFlag = (end - start) > 180 ? 1 : 0;
        const x1 = 50 + 40 * Math.cos(Math.PI * (start - 90) / 180);
        const y1 = 50 + 40 * Math.sin(Math.PI * (start - 90) / 180);
        const x2 = 50 + 40 * Math.cos(Math.PI * (end - 90) / 180);
        const y2 = 50 + 40 * Math.sin(Math.PI * (end - 90) / 180);
        
        return <path key={item.name} d={`M 50,50 L ${x1},${y1} A 40,40 0 ${largeArcFlag},1 ${x2},${y2} Z`} fill={colors[i % colors.length]} />;
    });

    return (
        <div className="flex items-center gap-4">
            <svg viewBox="0 0 100 100" className="w-32 h-32">{paths}</svg>
            <div className="text-sm space-y-1">
                {data.map((item, i) => (
                    <div key={item.name} className="flex items-center">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors[i % colors.length] }}></span>
                        <span>{item.name} ({item.value})</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CrmDashboard: React.FC<{ users: UserAccount[], prospects: Prospect[] }> = ({ users, prospects }) => {
    const segmentData = useMemo(() => {
        const counts = users.reduce((acc, user) => {
            acc[user.segment] = (acc[user.segment] || 0) + 1;
            return acc;
        }, {} as Record<UserSegment, number>);
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [users]);
    
    const prospectStatusData = useMemo(() => {
        const counts = prospects.reduce((acc, p) => {
            acc[p.status] = (acc[p.status] || 0) + 1;
            return acc;
        }, {} as Record<Prospect['status'], number>);
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [prospects]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-4">Répartition des Clients</h3>
                <PieChart data={segmentData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-4">Pipeline des Prospects</h3>
                <PieChart data={prospectStatusData} />
            </div>
        </div>
    );
};


const ProspectEditorModal: React.FC<{ prospect: Prospect | null; onSave: (data: any, id: string | null) => void; onClose: () => void; }> = ({ prospect, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: prospect?.name || '',
        email: prospect?.email || '',
        phone: prospect?.phone || '',
        status: prospect?.status || 'Nouveau',
        source: prospect?.source || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData, prospect ? prospect.id : null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[52] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="p-4 border-b flex justify-between items-center">
                        <h3 className="text-lg font-bold">{prospect ? 'Modifier le Prospect' : 'Nouveau Prospect'}</h3>
                        <button type="button" onClick={onClose}><X /></button>
                    </div>
                    <div className="p-6 space-y-4">
                         <input name="name" value={formData.name} onChange={handleChange} placeholder="Nom" required className="w-full p-2 border rounded-md"/>
                         <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" required className="w-full p-2 border rounded-md"/>
                         <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Téléphone" className="w-full p-2 border rounded-md"/>
                         <input name="source" value={formData.source} onChange={handleChange} placeholder="Source (ex: Formulaire contact)" required className="w-full p-2 border rounded-md"/>
                         <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded-md">
                            {(['Nouveau', 'Contacté', 'Qualifié', 'Perdu', 'Converti'] as Prospect['status'][]).map(s => <option key={s} value={s}>{s}</option>)}
                         </select>
                    </div>
                    <div className="p-4 bg-gray-50 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Annuler</button>
                        <button type="submit" className="px-4 py-2 bg-cyan-600 text-white rounded-md">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const ProspectManagementView: React.FC<ProspectManagementViewProps> = ({ prospects, onCreate, onUpdate, onDelete }) => {
    const [editingProspect, setEditingProspect] = useState<Prospect | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    
    const handleSave = (data: Omit<Prospect, 'id'>, id: string | null) => {
        if(id) {
            onUpdate({ ...prospects.find(p=>p.id === id)!, ...data });
        } else {
            onCreate(data);
        }
        setIsCreating(false);
        setEditingProspect(null);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <button onClick={() => setIsCreating(true)} className="flex items-center gap-2 mb-4 bg-cyan-100 text-cyan-700 font-semibold py-2 px-3 rounded-lg hover:bg-cyan-200">
                <PlusCircle size={18} /> Nouveau Prospect
            </button>
            <table className="w-full text-sm">
                <thead className="bg-gray-50"><tr>
                    <th className="p-2">Nom</th><th className="p-2">Email</th><th className="p-2">Statut</th><th className="p-2">Source</th><th className="p-2">Actions</th>
                </tr></thead>
                <tbody>
                    {prospects.map(p => (
                        <tr key={p.id} className="border-b">
                            <td className="p-2 font-semibold">{p.name}</td>
                            <td className="p-2">{p.email}</td>
                            <td className="p-2">{p.status}</td>
                            <td className="p-2">{p.source}</td>
                            <td className="p-2 space-x-2">
                                <button onClick={() => setEditingProspect(p)} className="p-1 text-cyan-600"><Edit size={16}/></button>
                                <button onClick={() => onDelete(p.id)} className="p-1 text-red-500"><Trash2 size={16}/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {(isCreating || editingProspect) && <ProspectEditorModal prospect={editingProspect} onClose={() => { setIsCreating(false); setEditingProspect(null); }} onSave={handleSave} />}
        </div>
    );
};


// --- MAIN CRM COMPONENT ---

const CrmView: React.FC<CrmViewProps> = (props) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clients' | 'prospects'>('dashboard');

  const { users, orders, onSelectUser, prospects, onCreateProspect, onUpdateProspect, onDeleteProspect } = props;

  const renderContent = () => {
      switch (activeTab) {
          case 'dashboard':
              return <CrmDashboard users={users} prospects={prospects} />;
          case 'clients':
              // Assuming ClientManagementView exists and takes these props
              return <ClientManagementView users={users} orders={orders} onSelectUser={onSelectUser} />;
          case 'prospects':
              return <ProspectManagementView prospects={prospects} onCreate={onCreateProspect} onUpdate={onUpdateProspect} onDelete={onDeleteProspect} />;
          default:
              return null;
      }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <HeartHandshake size={24} className="mr-3" />
            CRM - Gestion de la Relation Client
        </h2>
        <p className="mt-2 text-gray-600">Suivez vos clients et prospects, analysez vos données et gérez vos communications depuis un seul et même endroit.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b">
          <nav className="flex -mb-px space-x-4 px-6">
            <button onClick={() => setActiveTab('dashboard')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'dashboard' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}><BarChart size={16} className="inline mr-2"/> Tableau de Bord</button>
            <button onClick={() => setActiveTab('clients')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'clients' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}><Users size={16} className="inline mr-2"/> Clients</button>
            <button onClick={() => setActiveTab('prospects')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'prospects' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}><UserPlus size={16} className="inline mr-2"/> Prospects</button>
          </nav>
        </div>
        <div className="p-6 bg-gray-50">
            {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CrmView;