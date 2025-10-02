import React, { useMemo } from 'react';
import { Product, Order, UserAccount } from '../../types';
import StatCard from './StatCard';
import SalesChart from './SalesChart';
import { ShoppingCart, DollarSign, Users, TrendingUp, Package, Star, AlertTriangle, ListTodo, Activity } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';
import AiAssistant from './AiAssistant';

interface DashboardViewProps {
  products: Product[];
  orders: Order[];
  users: UserAccount[];
  cart: any;
}

// FIX: Changed the icon prop type to React.ReactElement<any> to allow passing the 'size' prop via cloneElement without TypeScript errors.
const QuickActionCard: React.FC<{ title: string; count: number; icon: React.ReactElement<any>; colorClass: string; }> = ({ title, count, icon, colorClass }) => (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
        <div className={`p-3 rounded-full mr-4 ${colorClass}`}>
            {React.cloneElement(icon, { size: 22, className: "text-white" })}
        </div>
        <div>
            <p className="text-2xl font-bold text-gray-800">{count}</p>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    </div>
);


const RecentActivity: React.FC<{ orders: Order[], users: UserAccount[] }> = ({ orders, users }) => {
    const recentActivities = useMemo(() => {
        const activities: { type: 'order' | 'user', data: Order | UserAccount, date: Date }[] = [];
        orders.slice(0, 3).forEach(o => activities.push({ type: 'order', data: o, date: new Date(o.date) }));
        users.slice(0, 2).forEach(u => activities.push({ type: 'user', data: u, date: new Date(u.createdAt) }));
        
        return activities.sort((a, b) => b.date.getTime() - a.date.getTime());
    }, [orders, users]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><Activity className="mr-2"/> Activité Récente</h3>
            <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center text-sm">
                        <div className={`mr-3 p-2 rounded-full ${activity.type === 'order' ? 'bg-blue-100' : 'bg-green-100'}`}>
                           {activity.type === 'order' ? <ShoppingCart size={16} className="text-blue-600"/> : <Users size={16} className="text-green-600"/>}
                        </div>
                        <div>
                           {activity.type === 'order' ? (
                                <p>Nouvelle commande <strong>{formatCurrency((activity.data as Order).total)}</strong> par {(activity.data as Order).customer}</p>
                           ) : (
                                <p>Nouveau client <strong>{(activity.data as UserAccount).name}</strong> a rejoint.</p>
                           )}
                           <p className="text-xs text-gray-500">{activity.date.toLocaleDateString('fr-FR')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const LowStockAlerts: React.FC<{ products: Product[] }> = ({ products }) => {
  const lowStockProducts = products.filter(p => p.stock !== undefined && p.stock <= 5 && !p.isDropshipping).sort((a,b) => a.stock! - b.stock!);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><AlertTriangle className="mr-2 text-red-500"/> Alertes de Stock Faible</h3>
      <div className="space-y-3">
        {lowStockProducts.length > 0 ? lowStockProducts.slice(0,5).map(product => (
          <div key={product.id} className="flex items-center justify-between text-sm">
            <p className="font-semibold truncate pr-2">{product.name}</p>
            <span className="font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full text-xs flex-shrink-0">{product.stock} restants</span>
          </div>
        )) : <p className="text-sm text-gray-500 text-center py-4">Aucun produit en stock faible.</p>}
      </div>
    </div>
  );
};


const DashboardView: React.FC<DashboardViewProps> = ({ products, orders, users }) => {
  const totalRevenue = useMemo(() => orders.reduce((sum, order) => order.status === 'Complété' ? sum + order.total : sum, 0), [orders]);
  const completedOrders = useMemo(() => orders.filter(o => o.status === 'Complété'), [orders]);
  const averageOrderValue = useMemo(() => completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0, [totalRevenue, completedOrders]);
  const ordersToProcess = useMemo(() => orders.filter(o => o.status === 'En attente').length, [orders]);
  
  const newCustomersThisMonth = useMemo(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return users.filter(user => new Date(user.createdAt) >= firstDayOfMonth).length;
  }, [users]);
  
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Main Column */}
        <div className="xl:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Revenu Total" value={formatCurrency(totalRevenue)} icon={<DollarSign />} />
                <StatCard title="Commandes Complétées" value={completedOrders.length} icon={<ShoppingCart />} />
                <StatCard title="Panier Moyen" value={formatCurrency(averageOrderValue)} icon={<TrendingUp />} />
                <StatCard title="Nouveaux Clients (Mois)" value={newCustomersThisMonth} icon={<Users />} />
            </div>

            <SalesChart orders={orders} />
            
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LowStockAlerts products={products} />
                <RecentActivity orders={orders} users={users} />
            </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="xl:col-span-1 space-y-6">
            <QuickActionCard title="Commandes à traiter" count={ordersToProcess} icon={<ListTodo />} colorClass="bg-orange-500" />
            <AiAssistant products={products} orders={orders} />
        </div>
    </div>
  );
};

export default DashboardView;