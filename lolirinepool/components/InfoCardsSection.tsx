import React from 'react';

export interface InfoCardProps {
    title: string;
    children: React.ReactNode;
    footerLink?: { text: string; onClick: () => void };
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, children, footerLink }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full min-h-[350px]">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
        <div className="flex-grow mb-4">{children}</div>
        {footerLink && (
            <a onClick={(e) => { e.preventDefault(); footerLink.onClick(); }} className="mt-auto text-sm font-semibold text-cyan-700 hover:text-cyan-800 hover:underline cursor-pointer">
                {footerLink.text}
            </a>
        )}
    </div>
);