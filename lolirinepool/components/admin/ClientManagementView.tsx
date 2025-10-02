import React, { useState, useMemo } from 'react';
import { UserAccount, Order } from '../../types';
import { Users, Search, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';

interface ClientManagementViewProps {
  users: UserAccount[];
  orders: Order[];
  onSelectUser: (user: UserAccount) => void;
}

const ClientManagementView: React.FC<ClientManagementViewProps> = ({ users, orders, onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>({ key: 'name', direction: 'ascending'});

  const userMetrics = useMemo(() => {
    const metrics = new Map<string, { orderCount: number; totalSpent: number }>();
    orders.forEach(order => {
      if (order.status === 'Complété' && order.customerEmail) {
        const userMetric = metrics.get(order.customerEmail) || { orderCount: 0, totalSpent: 0 };
        userMetric.orderCount++;
        userMetric.totalSpent += order.total;
        metrics.set(order.customerEmail, userMetric);
      }
    });
    return metrics;
  }, [orders]);

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...filteredUsers];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        if (sortConfig.key === 'orderCount' || sortConfig.key === 'totalSpent') {
            aValue = userMetrics.get(a.email)?.[sortConfig.key] || 0;
            bValue = userMetrics.get(b.email)?.[sortConfig.key] || 0;
        } else {
            aValue = a[sortConfig.key as keyof UserAccount];
            bValue = b[sortConfig.key as keyof UserAccount];
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [filteredUsers, sortConfig, userMetrics]);
  
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
        return <ChevronDown size={14} className="opacity-0 group-hover:opacity-50" />;
    }
    return sortConfig.direction === 'ascending' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Users size={24} className="mr-3" />
          Gestion des Clients
        </h2>
        <div className="relative w-1/3">
            <input
                type="text"
                placeholder="Rechercher un client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 cursor-pointer group" onClick={() => requestSort('name')}>
                <div className="flex items-center gap-1">Client {getSortIcon('name')}</div>
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer group" onClick={() => requestSort('createdAt')}>
                 <div className="flex items-center gap-1">Inscrit le {getSortIcon('createdAt')}</div>
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer group" onClick={() => requestSort('segment')}>
                 <div className="flex items-center gap-1">Segment {getSortIcon('segment')}</div>
              </th>
              <th scope="col" className="px-6 py-3 text-center cursor-pointer group" onClick={() => requestSort('orderCount')}>
                 <div className="flex items-center justify-center gap-1">Commandes {getSortIcon('orderCount')}</div>
              </th>
               <th scope="col" className="px-6 py-3 text-right cursor-pointer group" onClick={() => requestSort('totalSpent')}>
                 <div className="flex items-center justify-end gap-1">Total Dépensé {getSortIcon('totalSpent')}</div>
              </th>
              <th scope="col" className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map(user => {
              const metrics = userMetrics.get(user.email) || { orderCount: 0, totalSpent: 0 };
              return (
              <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                    <div>{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString('fr-FR')}</td>
                <td className="px-6 py-4">{user.segment}</td>
                <td className="px-6 py-4 text-center">{metrics.orderCount}</td>
                <td className="px-6 py-4 text-right">{formatCurrency(metrics.totalSpent)}</td>
                <td className="px-6 py-4 text-center">
                  <button onClick={() => onSelectUser(user)} className="p-2 text-cyan-600 hover:text-cyan-800" title="Voir les détails">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientManagementView;
