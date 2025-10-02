import React, { useMemo, useState } from 'react';
import { Order } from '../../types';
import { formatCurrency } from '../../utils/formatting';
import { BarChart2 } from 'lucide-react';

interface SalesChartProps {
  orders: Order[];
}

const SalesChart: React.FC<SalesChartProps> = ({ orders }) => {
    const [tooltip, setTooltip] = useState<{ x: number, y: number, day: string, sales: number } | null>(null);

    const salesData = useMemo(() => {
        const data: { [key: string]: number } = {};
        const today = new Date();
        
        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            data[dateString] = 0;
        }

        orders.forEach(order => {
            if (order.status === 'Complété') {
                const orderDate = new Date(order.date);
                if ((today.getTime() - orderDate.getTime()) / (1000 * 3600 * 24) < 30) {
                    const dateString = orderDate.toISOString().split('T')[0];
                     if (data[dateString] !== undefined) {
                        data[dateString] += order.total;
                    }
                }
            }
        });
        
        return Object.entries(data).map(([day, sales]) => ({ day, sales }));
    }, [orders]);

    const maxSales = useMemo(() => Math.max(...salesData.map(d => d.sales), 1), [salesData]);
    const chartHeight = 250;
    const barWidth = 10;
    const gap = 5;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center"><BarChart2 className="mr-2"/> Ventes sur 30 jours</h3>
            <div className="relative">
                <svg width="100%" height={chartHeight + 40} className="overflow-visible">
                    {salesData.map((d, i) => {
                        const barHeight = (d.sales / maxSales) * chartHeight;
                        const x = i * (barWidth + gap);
                        const y = chartHeight - barHeight;
                        return (
                            <g 
                                key={d.day}
                                onMouseEnter={() => setTooltip({ x: x + barWidth / 2, y: y - 10, day: d.day, sales: d.sales })}
                                onMouseLeave={() => setTooltip(null)}
                            >
                                <rect
                                    x={x}
                                    y={y}
                                    width={barWidth}
                                    height={barHeight}
                                    className="fill-current text-cyan-500 hover:text-cyan-700 transition-colors"
                                />
                                <text x={x + barWidth / 2} y={chartHeight + 15} textAnchor="middle" className="text-xs fill-current text-gray-500">
                                    {new Date(d.day).getDate()}
                                </text>
                            </g>
                        );
                    })}
                     <line x1="0" y1={chartHeight} x2={salesData.length * (barWidth + gap)} y2={chartHeight} stroke="lightgray" />
                </svg>
                {tooltip && (
                    <div 
                        className="absolute bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none transition-opacity"
                        style={{ left: tooltip.x, top: tooltip.y, transform: 'translateX(-50%)' }}
                    >
                        <p>{new Date(tooltip.day).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}</p>
                        <p className="font-bold">{formatCurrency(tooltip.sales)}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SalesChart;
