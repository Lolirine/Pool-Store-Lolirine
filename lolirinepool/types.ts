import React from 'react';

// --- Core Data Structures ---

export interface ProductVariant {
  id: string | number;
  name: string; // e.g., "5 kg", "Bleu"
  attributes: { [key: string]: string | number }; // e.g., { "Poids": "5 kg", "Couleur": "Bleu" }
  priceModifier?: number; // Can be negative or positive, added to the base price
  stock?: number;
  imageUrl?: string;
  ean?: string;
}

export interface Product {
  id: string | number;
  name: string;
  category: string;
  price: number; // Base price if variants exist
  promoPrice?: number;
  isOnSale?: boolean;
  tvaRate: number;
  stock?: number; // Total stock for simple products, or sum of variants
  imageUrl: string;
  description?: string;
  galleryImages?: string[];
  features?: string[];
  isDropshipping?: boolean;
  supplierId?: string;
  supplierPrice?: number;
  weight?: number;
  dimensions?: string;
  ean?: string;
  isHidden?: boolean;
  attributes?: { [key: string]: string | number };
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
  ribbon?: string;
  // Variant Management
  baseProductId?: string | number; // If this is a variant, links to base product
  variants?: ProductVariant[]; // If this is a base product
}

export interface CartItem extends Product {
  quantity: number;
  variantId?: string | number; // To specify which variant is in the cart
}

export type OrderStatus = 'En attente' | 'Complété' | 'Annulé';
export type SupplierStatus = 'En attente' | 'Envoyé au fournisseur' | 'Expédié';

export interface Order {
  id: string;
  customer: string;
  customerEmail: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: CartItem[];
  shippingAddress: string;
  shippingCity: string;
  shippingZip: string;
  trackingNumber?: string;
  isDropshippingOrder?: boolean;
  supplierStatus?: SupplierStatus;
}

export interface Address {
    address: string;
    city: string;
    zip: string;
    country: string;
}

export type UserSegment = 'Nouveau' | 'Fidèle' | 'VIP' | 'Inactif' | 'À Risque';

export interface CommunicationEntry {
    id: string;
    date: string;
    type: 'Email' | 'Appel' | 'Note';
    summary: string;
    author: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password?: string; // Should not be stored in state long-term, but needed for login simulation
  createdAt: string;
  phone?: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  segment: UserSegment;
  communicationHistory: CommunicationEntry[];
  gdprConsent: {
    marketingEmails: boolean;
    consentDate?: string;
  };
}

export interface Prospect {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'Nouveau' | 'Contacté' | 'Qualifié' | 'Perdu' | 'Converti';
  source: string; // e.g., 'Formulaire de contact', 'Appel entrant', 'Salon'
  createdAt: string;
  notes: CommunicationEntry[];
  assignedTo?: string; // Admin user name
}

export interface Review {
  id: string | number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    taxRate: number;
}

export interface InvoiceDiscount {
    type: 'percentage' | 'fixed';
    value: number;
}

export interface Invoice {
    id: string;
    status: 'Draft' | 'Sent' | 'Paid' | 'Cancelled';
    customerName: string;
    customerAddress: string;
    invoiceDate: string;
    dueDate: string;
    source?: string;
    items: InvoiceItem[];
    discount?: InvoiceDiscount;
}

export interface PaymentMethod {
    id: string;
    name: string;
    type: 'button' | 'bank_transfer_details' | 'qr_code';
    enabled: boolean;
    config: any;
    logoUrl?: string;
    logoComponent?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface EmailTemplate {
    id: string;
    name: string;
    description: string;
    subject: string;
    body: string;
    type: 'transactional' | 'marketing' | 'lifecycle';
    enabled: boolean;
    placeholders: string[];
}

export interface PurchaseOrderItem {
    productId: string | number;
    productName: string;
    quantity: number;
    supplierPrice?: number;
}

// FIX: Export PurchaseOrderStatus to be used in other components.
export type PurchaseOrderStatus = 'À envoyer' | 'Envoyé' | 'Expédié';

export interface PurchaseOrder {
    id: string;
    orderId: string;
    supplierId: string;
    createdAt: string;
    status: PurchaseOrderStatus;
    customerName: string;
    customerShippingAddress: {
        address: string;
        city: string;
        zip: string;
    };
    items: PurchaseOrderItem[];
}

// --- UI & State Structures ---

export type Page = 
  | 'home' | 'services' | 'servicesOverview' | 'shop' | 'promotions' | 'portfolio' | 'blog' | 'about' | 'contact' 
  | 'admin' | 'client' | 'faq' | 'checkout' | 'orderConfirmation' 
  | 'terms' | 'privacy' | 'cookies' | 'legal' | 'shippingPolicy'
  | 'wellness' | 'productDetail' | 'wishlist' 
  | 'repairs' | 'construction' | 'waterAnalysis' | 'winterization';

export interface Notification {
  id: string;
  recipient: string;
  subject: string;
  body: string;
}

export interface Toast {
    id: string;
    message: string;
    type: 'success' | 'info' | 'error';
    icon?: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// --- Configuration Structures ---

export interface InfoBannerConfig {
  isVisible: boolean;
  text: string;
  backgroundColor: string;
}

export interface PopupConfig {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  buttonText: string;
  buttonLink: string;
  isEnabled: boolean;
  displayOn: ('all' | Page | string)[];
  frequency: 'once_per_session' | 'always' | 'once_ever';
  backgroundColor?: string;
}

export type NavLinkStyle = 'default' | 'outline' | 'pill' | 'promo';

export interface NavLink {
    id: string;
    label: string;
    page?: Page;
    href?: string;
    categoryFilter?: string;
    children?: NavLink[];
    customStyle?: NavLinkStyle;
}

export interface MenuConfig {
    style: NavLinkStyle;
    links: NavLink[];
}

export interface MarketingCampaign {
    id: string;
    name: string;
    goal: string;
    targetSegment: UserSegment | 'All';
    startDate: string;
    endDate: string;
    status: 'Draft' | 'Running' | 'Completed' | 'Archived';
    // Linked actions
    linkedEmailTemplateId?: string;
    linkedPopupId?: string;
    // Performance metrics (simulated)
    performance?: {
        emailsSent?: number;
        openRate?: number; // as a percentage, e.g., 25.5 for 25.5%
        conversionRate?: number; // as a percentage
        revenueGenerated?: number;
    };
}

export interface SiteConfig {
    contact: {
        address: string;
        city: string;
        phone: string;
        email: string;
    };
    socials: {
        facebook: string;
        twitter: string;
        instagram: string;
        linkedin: string;
    };
}

// --- CMS Structures ---
export interface PageSection {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
}

export interface PageContent {
  pageId: Page | string;
  title: string;
  hero: {
    title: string;
    subtitle: string;
    imageUrl: string;
  };
  sections: PageSection[];
  cta?: {
    text: string;
    buttonText: string;
    page: Page;
  };
}


// --- Component Props ---

export interface PageWithBackButtonProps {
    goBack: () => void;
    canGoBack: boolean;
}

export interface HeaderProps {
    currentPage: Page;
    navigateTo: (page: Page, options?: { categoryFilter?: string, searchQuery?: string }) => void;
    cartItemCount: number;
    wishlistItemCount: number;
    onCartClick: () => void;
    currentUser: UserAccount | null;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    bannerConfig: InfoBannerConfig;
    menuConfig: MenuConfig;
    services: Service[];
    shopCategories: NavLink[];
    wellnessCategories: NavLink[];
    promotions?: Product[];
    onSelectProduct: (product: Product) => void;
}

export interface FooterProps {
    navigateTo: (page: Page, options?: { categoryFilter?: string, searchQuery?: string }) => void;
    onOpenRegisterModal?: () => void;
    siteConfig: SiteConfig;
}

export interface ProductCardProps {
  product: Product;
  addToCart: (product: Product, quantity: number, variantId?: string | number) => void;
  onBuyNow: (product: Product, quantity: number, variantId?: string | number) => void;
  onSelectProduct: (product: Product) => void;
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
}

export interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string | number, quantity: number, variantId?: string | number) => void;
  onRemoveItem: (productId: string | number, variantId?: string | number) => void;
  onClearCart: () => void;
  navigateTo: (page: Page) => void;
}

export interface AdminLoginModalProps {
    onSuccess: () => void;
    onClose: () => void;
}

export interface ClientLoginModalProps {
    onSuccess: (user: UserAccount) => void;
    onClose: () => void;
    onSwitchToRegister: () => void;
    users: UserAccount[];
}

export interface ClientRegisterModalProps {
    onSuccess: (newUserData: Omit<UserAccount, 'id' | 'createdAt' | 'segment' | 'communicationHistory' | 'gdprConsent'> & {gdprConsent: {marketingEmails: boolean}}) => void;
    onClose: () => void;
    onSwitchToLogin: () => void;
    existingUsers: UserAccount[];
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

// --- Page-specific Props ---

export interface HomePageProps {
    navigateTo: (page: Page, options?: { categoryFilter?: string }) => void;
    products: Product[];
    addToCart: (product: Product, quantity: number, variantId?: string | number) => void;
    onBuyNow: (product: Product, quantity: number, variantId?: string | number) => void;
    recentlyViewed: Product[];
    onSelectProduct: (product: Product) => void;
    orders: Order[];
    currentUser: UserAccount | null;
    cart: CartItem[];
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    testimonials: Testimonial[];
    homeCategories: HomeCategory[];
}

export interface ShopPageProps {
    products: Product[];
    addToCart: (product: Product, quantity: number, variantId?: string | number) => void;
    onBuyNow: (product: Product, quantity: number, variantId?: string | number) => void;
    onSelectProduct: (product: Product) => void;
    initialCategoryFilter?: string;
    initialSearchTerm?: string;
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    recentlyViewed: Product[];
    navigateTo: (page: Page, options?: { categoryFilter?: string; searchQuery?: string }) => void;
}

export interface PromotionsPageProps extends PageWithBackButtonProps {
    products: Product[];
    addToCart: (product: Product, quantity: number, variantId?: string | number) => void;
    onBuyNow: (product: Product, quantity: number, variantId?: string | number) => void;
    onSelectProduct: (product: Product) => void;
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    recentlyViewed: Product[];
    navigateTo: (page: Page, options?: { categoryFilter?: string; searchQuery?: string }) => void;
}

export interface ProductDetailPageProps extends PageWithBackButtonProps {
    product: Product;
    navigateTo: (page: Page, options?: { categoryFilter?: string; searchQuery?: string }) => void;
    addToCart: (product: Product, quantity: number, variantId?: string | number) => void;
    onBuyNow: (product: Product, quantity: number, variantId?: string | number) => void;
    addToWishlist: (product: Product) => void;
    wishlist: Product[];
    products: Product[];
    onSelectProduct: (product: Product) => void;
    recentlyViewed: Product[];
}

export interface CheckoutPageProps extends PageWithBackButtonProps {
    cart: CartItem[];
    onPlaceOrder: (shippingAddressData: { shippingAddress: string; shippingCity: string; shippingZip: string }) => void;
    currentUser: UserAccount | null;
    paymentMethods: PaymentMethod[];
}

export interface OrderConfirmationPageProps {
  order: Order;
}

export interface ClientAreaPageProps extends PageWithBackButtonProps {
    onLogout: () => void;
    user: UserAccount;
    orders: Order[];
    onUpdateUser: (updatedUser: UserAccount) => void;
}

export interface WishlistPageProps extends PageWithBackButtonProps {
    wishlist: Product[];
    navigateTo: (page: Page) => void;
    onSelectProduct: (product: Product) => void;
    addToCart: (product: Product, quantity: number, variantId?: string | number) => void;
    onBuyNow: (product: Product, quantity: number, variantId?: string | number) => void;
    addToWishlist: (product: Product) => void;
}

export interface WellnessPageProps extends PageWithBackButtonProps {
    navigateTo: (page: Page, options?: { categoryFilter?: string }) => void;
    products: Product[];
    addToCart: (product: Product, quantity: number, variantId?: string | number) => void;
    onBuyNow: (product: Product, quantity: number, variantId?: string | number) => void;
    onSelectProduct: (product: Product) => void;
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    recentlyViewed: Product[];
}

// Simple pages with back button
export type ServicesPageProps = PageWithBackButtonProps & { navigateTo: (page: Page) => void };
export type ServicesOverviewPageProps = PageWithBackButtonProps & { navigateTo: (page: Page) => void; pageContent: PageContent | undefined };
export type PortfolioPageProps = PageWithBackButtonProps;
export type BlogPageProps = PageWithBackButtonProps;
export interface AboutPageProps extends PageWithBackButtonProps { pageContent: PageContent | undefined; }
export type ContactPageProps = PageWithBackButtonProps;
export type FaqPageProps = PageWithBackButtonProps;
export interface TermsPageProps extends PageWithBackButtonProps { pageContent: PageContent | undefined; }
export interface PrivacyPolicyPageProps extends PageWithBackButtonProps { pageContent: PageContent | undefined; }
export interface CookiesPageProps extends PageWithBackButtonProps { pageContent: PageContent | undefined; }
export interface LegalNoticePageProps extends PageWithBackButtonProps { pageContent: PageContent | undefined; }
export type ShippingPolicyPageProps = PageWithBackButtonProps & { navigateTo: (page: Page) => void; pageContent: PageContent | undefined; };
export type RepairsPageProps = PageWithBackButtonProps & { navigateTo: (page: Page) => void };
export type ConstructionPageProps = PageWithBackButtonProps & { navigateTo: (page: Page) => void };
export type WaterAnalysisPageProps = PageWithBackButtonProps & { navigateTo: (page: Page) => void };
export interface WinterizationPageProps extends PageWithBackButtonProps { navigateTo: (page: Page) => void };


// --- Admin Panel Types ---

export type AdminView = 
    | 'dashboard' | 'products' | 'orders' | 'inventory' | 'clients' | 'billing' | 'suppliers' 
    | 'purchaseOrders' | 'dropshipping' | 'paymentMethods' | 'emails' | 'infoBanner' 
    | 'popups' | 'menuManagement' | 'crm' | 'marketing' | 'websiteCms';

export interface AdminPageProps {
  onLogout: () => void;
  products: Product[];
  onUpdateProduct: (updatedProduct: Product) => void;
  onCreateProduct: (newProductData: Omit<Product, 'id'>) => void;
  onDeleteProduct: (productId: string | number) => void;
  onBulkUpdateProducts: (updatedProducts: Product[]) => void;
  onUpdateStockRibbons: () => void;
  orders: Order[];
  onUpdateOrder: (updatedOrder: Order) => void;
  suppliers: Supplier[];
  onCreateSupplier: (newSupplierData: Omit<Supplier, 'id'>) => void;
  onUpdateSupplier: (updatedSupplier: Supplier) => void;
  onDeleteSupplier: (supplierId: string) => void;
  invoices: Invoice[];
  onCreateInvoice: (newInvoiceData: Omit<Invoice, 'id'>) => void;
  onUpdateInvoice: (updatedInvoice: Invoice) => void;
  onDeleteInvoice: (invoiceId: string) => void;
  paymentMethods: PaymentMethod[];
  onUpdatePaymentMethod: (updatedMethod: PaymentMethod) => void;
  emailTemplates: EmailTemplate[];
  onUpdateEmailTemplate: (updatedTemplate: EmailTemplate) => void;
  users: UserAccount[];
  onUpdateUser: (updatedUser: UserAccount) => void;
  cart: CartItem[]; // For dashboard stats
  purchaseOrders: PurchaseOrder[];
  onUpdatePurchaseOrder: (updatedPO: PurchaseOrder) => void;
  onCreatePurchaseOrder: (poData: Omit<PurchaseOrder, 'id' | 'createdAt' | 'status'>) => PurchaseOrder;
  infoBanner: InfoBannerConfig;
  onUpdateInfoBanner: (config: InfoBannerConfig) => void;
  popups: PopupConfig[];
  onCreatePopup: (popupData: Omit<PopupConfig, 'id'>) => void;
  onUpdatePopup: (updatedPopup: PopupConfig) => void;
  onDeletePopup: (popupId: string) => void;
  menuConfig: MenuConfig;
  onUpdateMenuConfig: (config: MenuConfig) => void;
  onAddCategory: (categoryPath: string) => void;
  onDeleteCategoryAndProducts: (categoryPath: string) => void;
  onRenameCategory: (oldCategoryPath: string, newCategoryName: string) => void;
  onDuplicateCategory: (sourceCategoryPath: string, newCategoryPath: string) => void;
  emailService: any; // Ideally, this would be a typed EmailService instance
  marketingCampaigns: MarketingCampaign[];
  onCreateMarketingCampaign: (campaignData: Omit<MarketingCampaign, 'id'>) => void;
  onUpdateMarketingCampaign: (updatedCampaign: MarketingCampaign) => void;
  onDeleteMarketingCampaign: (campaignId: string) => void;
  testimonials: Testimonial[];
  onCreateTestimonial: (testimonialData: Omit<Testimonial, 'id'>) => void;
  onUpdateTestimonial: (updatedTestimonial: Testimonial) => void;
  onDeleteTestimonial: (testimonialId: string) => void;
  homeCategories: HomeCategory[];
  onUpdateHomeCategories: (categories: HomeCategory[]) => void;
  siteConfig: SiteConfig;
  onUpdateSiteConfig: (config: SiteConfig) => void;
  pagesContent: PageContent[];
  onUpdatePageContent: (pageContent: PageContent) => void;
  prospects: Prospect[];
  onCreateProspect: (prospectData: Omit<Prospect, 'id'>) => void;
  onUpdateProspect: (updatedProspect: Prospect) => void;
  onDeleteProspect: (prospectId: string) => void;
}

export interface EmailManagementViewProps {
  emailTemplates: EmailTemplate[];
  onUpdateEmailTemplate: (template: EmailTemplate) => void;
  users: UserAccount[];
  emailService: any; // Ideally a typed instance
}

export interface AiAssistantWidgetProps {
    onClose: () => void;
    products: Product[];
    orders: Order[];
    services: Service[];
    portfolioItems: PortfolioItem[];
    blogPosts: BlogPost[];
    currentUser: UserAccount | null;
}

export interface MarketingViewProps {
    campaigns: MarketingCampaign[];
    onCreate: (campaignData: Omit<MarketingCampaign, 'id'>) => void;
    onUpdate: (updatedCampaign: MarketingCampaign) => void;
    onDelete: (campaignId: string) => void;
    emailTemplates: EmailTemplate[];
    popups: PopupConfig[];
    users: UserAccount[];
}

export interface MarketingCampaignEditorProps {
    campaign: MarketingCampaign | null;
    onClose: () => void;
    onSave: (campaignData: Omit<MarketingCampaign, 'id' | 'performance'>, existingId: string | null) => void;
    emailTemplates: EmailTemplate[];
    popups: PopupConfig[];
    users: UserAccount[];
}


export interface OrderManagementViewProps {
  orders: Order[];
  suppliers: Supplier[];
  onUpdateOrder: (order: Order) => void;
  emailService: any; // EmailService instance
  purchaseOrders: PurchaseOrder[];
  onCreatePurchaseOrder: (poData: Omit<PurchaseOrder, 'id' | 'createdAt' | 'status'>) => PurchaseOrder;
  onUpdatePurchaseOrder: (po: PurchaseOrder) => void;
}

export interface OrderDetailModalProps {
    order: Order;
    suppliers: Supplier[];
    onClose: () => void;
    onUpdateOrder: (order: Order) => void;
    emailService: any; // EmailService instance
    purchaseOrders: PurchaseOrder[];
    onCreatePurchaseOrder: (poData: Omit<PurchaseOrder, 'id' | 'createdAt' | 'status'>) => PurchaseOrder;
    onUpdatePurchaseOrder: (po: PurchaseOrder) => void;
}

export interface SupplierInvoiceModalProps {
    purchaseOrder: PurchaseOrder;
    supplier: Supplier;
    onClose: () => void;
    onUpdatePurchaseOrder: (po: PurchaseOrder) => void;
    emailService: any; // EmailService instance
}

export interface WebsiteCmsViewProps {
    testimonials: Testimonial[];
    onCreateTestimonial: (testimonialData: Omit<Testimonial, 'id'>) => void;
    onUpdateTestimonial: (updatedTestimonial: Testimonial) => void;
    onDeleteTestimonial: (testimonialId: string) => void;
    homeCategories: HomeCategory[];
    onUpdateHomeCategories: (categories: HomeCategory[]) => void;
    siteConfig: SiteConfig;
    onUpdateSiteConfig: (config: SiteConfig) => void;
    pagesContent: PageContent[];
    onUpdatePageContent: (pageContent: PageContent) => void;
}

// --- Other Misc Types ---

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  imageUrl: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  images: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string;
}

export interface Service {
  icon: React.ReactElement<any>;
  title: string;
  description: string;
  imageUrl: string;
  page: Page;
}

export interface HomeCategory {
  id: string;
  label: string;
  imageUrl: string;
  page: Page;
  categoryFilter?: string;
}

export interface FilterFacet {
    name: string;
    options: { value: string | number; count: number }[];
}

export interface ActiveFilters {
    [key: string]: (string | number)[];
}
