import React, { useState } from 'react';
import { AdminView, AdminPageProps, UserAccount } from '../../types';
import AdminLayout from '../components/admin/AdminLayout';
import Sidebar from '../components/admin/Sidebar';
import DashboardView from '../components/admin/DashboardView';
import ProductManagementView from '../components/admin/ProductManagementView';
import InventoryManagementView from '../components/admin/InventoryManagementView';
import SupplierManagementView from '../components/admin/SupplierManagementView';
import DropshippingView from '../components/admin/DropshippingView';
import BillingView from '../components/admin/BillingView';
import PaymentMethodsView from '../components/admin/PaymentMethodsView';
import EmailManagementView from '../components/admin/EmailManagementView';
import ClientManagementView from '../components/admin/ClientManagementView';
import ClientDetailView from '../components/admin/ClientDetailView';
import PurchaseOrderView from '../components/admin/PurchaseOrderView';
import InfoBannerView from '../components/admin/InfoBannerView';
import PopupManagementView from '../components/admin/PopupManagementView';
import MenuManagementView from '../components/admin/MenuManagementView';
import OrderManagementView from '../components/admin/OrderManagementView';
import CrmView from '../components/admin/CrmView';
import MarketingView from '../components/admin/MarketingView';
import WebsiteCmsView from '../components/admin/WebsiteCmsView';


const AdminPage: React.FC<AdminPageProps> = (props) => {
  const { 
      onLogout, products, onUpdateProduct, onCreateProduct, onDeleteProduct, onBulkUpdateProducts, orders, 
      suppliers, onCreateSupplier, onUpdateSupplier, onDeleteSupplier, onUpdateOrder,
      invoices, onCreateInvoice, onUpdateInvoice, onDeleteInvoice,
      paymentMethods, onUpdatePaymentMethod,
      emailTemplates, onUpdateEmailTemplate,
      users, onUpdateUser, cart,
      purchaseOrders, onUpdatePurchaseOrder, onCreatePurchaseOrder,
      infoBanner, onUpdateInfoBanner,
      popups, onCreatePopup, onUpdatePopup, onDeletePopup,
      menuConfig, onUpdateMenuConfig,
      onAddCategory, onDeleteCategoryAndProducts, onRenameCategory, onDuplicateCategory,
      emailService,
      onUpdateStockRibbons,
      marketingCampaigns, onCreateMarketingCampaign, onUpdateMarketingCampaign, onDeleteMarketingCampaign,
      testimonials, onCreateTestimonial, onUpdateTestimonial, onDeleteTestimonial,
      homeCategories, onUpdateHomeCategories,
      siteConfig, onUpdateSiteConfig,
      pagesContent, onUpdatePageContent,
      prospects, onCreateProspect, onUpdateProspect, onDeleteProspect
  } = props;
  const [view, setView] = useState<AdminView>('dashboard');
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);

  const handleSetView = (newView: AdminView) => {
    setSelectedUser(null);
    setView(newView);
  }

  const handleUpdateUserAndReturn = (updatedUser: UserAccount) => {
    onUpdateUser(updatedUser);
    setSelectedUser(null);
  };


  const renderView = () => {
    switch(view) {
      case 'dashboard':
        return <DashboardView products={products} orders={orders} users={users} cart={cart} />;
      case 'products':
        return <ProductManagementView 
                    products={products} 
                    onUpdateProduct={onUpdateProduct} 
                    onCreateProduct={onCreateProduct} 
                    onDeleteProduct={onDeleteProduct}
                    onBulkUpdateProducts={onBulkUpdateProducts} 
                    suppliers={suppliers} 
                    onAddCategory={onAddCategory}
                    onDeleteCategoryAndProducts={onDeleteCategoryAndProducts}
                    onRenameCategory={onRenameCategory}
                    onDuplicateCategory={onDuplicateCategory}
                    onUpdateStockRibbons={onUpdateStockRibbons}
                />;
      case 'orders':
        return <OrderManagementView 
                  orders={orders} 
                  suppliers={suppliers}
                  onUpdateOrder={onUpdateOrder}
                  emailService={emailService}
                  purchaseOrders={purchaseOrders}
                  onCreatePurchaseOrder={onCreatePurchaseOrder}
                  onUpdatePurchaseOrder={onUpdatePurchaseOrder}
               />;
      case 'inventory':
        return <InventoryManagementView products={products} onUpdateProduct={onUpdateProduct} />;
      case 'suppliers':
        return <SupplierManagementView suppliers={suppliers} onCreate={onCreateSupplier} onUpdate={onUpdateSupplier} onDelete={onDeleteSupplier} />;
      case 'purchaseOrders':
        return <PurchaseOrderView purchaseOrders={purchaseOrders} onUpdatePurchaseOrder={onUpdatePurchaseOrder} suppliers={suppliers} />;
      case 'dropshipping':
        return <DropshippingView 
          orders={orders} 
          onUpdateOrder={onUpdateOrder} 
          suppliers={suppliers} 
          products={products}
          onBulkUpdateProducts={onBulkUpdateProducts}
        />;
      case 'crm':
         return selectedUser ? (
            <ClientDetailView 
                user={selectedUser}
                orders={orders.filter(o => o.customerEmail === selectedUser.email)}
                onUpdateUser={handleUpdateUserAndReturn}
                onBack={() => {setSelectedUser(null); setView('crm');}}
            />
        ) : (
            <CrmView 
                users={users} 
                orders={orders} 
                onSelectUser={setSelectedUser} 
                prospects={prospects}
                onCreateProspect={onCreateProspect}
                onUpdateProspect={onUpdateProspect}
                onDeleteProspect={onDeleteProspect}
            />
        );
      case 'billing':
        return <BillingView invoices={invoices} onCreate={onCreateInvoice} onUpdate={onUpdateInvoice} onDelete={onDeleteInvoice} />;
      case 'paymentMethods':
        return <PaymentMethodsView paymentMethods={paymentMethods} onUpdatePaymentMethod={onUpdatePaymentMethod} />;
      case 'marketing':
        return <MarketingView
                    campaigns={marketingCampaigns}
                    onCreate={onCreateMarketingCampaign}
                    onUpdate={onUpdateMarketingCampaign}
                    onDelete={onDeleteMarketingCampaign}
                    emailTemplates={emailTemplates}
                    popups={popups}
                    users={users}
                />;
      case 'emails':
        return <EmailManagementView 
                    emailTemplates={emailTemplates} 
                    onUpdateEmailTemplate={onUpdateEmailTemplate} 
                    users={users}
                    emailService={emailService}
                />;
      case 'infoBanner':
        return <InfoBannerView infoBanner={infoBanner} onUpdateInfoBanner={onUpdateInfoBanner} />;
      case 'popups':
        return <PopupManagementView popups={popups} onCreate={onCreatePopup} onUpdate={onUpdatePopup} onDelete={onDeletePopup} />;
      case 'menuManagement':
        return <MenuManagementView menuConfig={menuConfig} onUpdateMenuConfig={onUpdateMenuConfig} />;
      case 'websiteCms':
        return <WebsiteCmsView 
                    testimonials={testimonials}
                    onCreateTestimonial={onCreateTestimonial}
                    onUpdateTestimonial={onUpdateTestimonial}
                    onDeleteTestimonial={onDeleteTestimonial}
                    homeCategories={homeCategories}
                    onUpdateHomeCategories={onUpdateHomeCategories}
                    siteConfig={siteConfig}
                    onUpdateSiteConfig={onUpdateSiteConfig}
                    pagesContent={pagesContent}
                    onUpdatePageContent={onUpdatePageContent}
                />;
      default:
        return (
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800">Section en construction</h2>
            <p className="mt-2 text-gray-600">Cette page sera bientôt disponible.</p>
          </div>
        );
    }
  };

  return (
    <AdminLayout
      sidebar={
        <Sidebar 
          currentView={view} 
          setView={handleSetView} 
          onLogout={onLogout} 
        />
      }
    >
      {renderView()}
    </AdminLayout>
  );
};

export default AdminPage;
