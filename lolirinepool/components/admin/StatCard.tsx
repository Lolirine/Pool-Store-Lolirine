import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement<{ size?: number | string }>;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
      <div className="bg-cyan-100 text-cyan-600 rounded-full p-3 mr-4">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-cyan-600">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;