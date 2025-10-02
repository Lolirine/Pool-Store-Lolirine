
import React from 'react';

interface AdminLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ sidebar, children }) => {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {sidebar}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">
            {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
