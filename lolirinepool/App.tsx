

import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ShopPage from './pages/ShopPage';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import ClientAreaPage from './pages/ClientAreaPage';
import AdminLoginModal from './components/AdminLoginModal';
import ClientLoginModal from './components/ClientLoginModal';
import ClientRegisterModal from './components/ClientRegisterModal';
import CartModal from './components/CartModal';
import FaqPage from './pages/FaqPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiesPage from './pages/CookiesPage';
import LegalNoticePage from './pages/LegalNoticePage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import WellnessPage from './pages/WellnessPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';
import RepairsPage from './pages/RepairsPage';
import ConstructionPage from './pages/ConstructionPage';
import WaterAnalysisPage from './pages/WaterAnalysisPage';
import WinterizationPage from './pages/WinterizationPage';
import CookieConsent, { CookiePreferences } from './components/CookieConsent';
import EmailNotificationManager from './components/EmailNotificationManager';
import PromotionalPopup from './components/PromotionalPopup';
import { Page, UserAccount, Product, CartItem, Order, Review, Supplier, Invoice, PaymentMethod, EmailTemplate, Notification, PurchaseOrder, InfoBannerConfig, PopupConfig, MenuConfig, NavLink, Toast, MarketingCampaign, Testimonial, HomeCategory, SiteConfig, PageContent, Prospect } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_SUPPLIERS, INITIAL_INVOICES, INITIAL_PAYMENT_METHODS, INITIAL_EMAIL_TEMPLATES, INITIAL_USERS, SERVICES, WELLNESS_SUB_CATEGORIES, PORTFOLIO_ITEMS, BLOG_POSTS, BOUTIQUE_SUB_CATEGORIES, INITIAL_MARKETING_CAMPAIGNS, INITIAL_TESTIMONIALS, INITIAL_HOME_CATEGORIES, INITIAL_SITE_CONFIG, INITIAL_PAGES_CONTENT, INITIAL_PROSPECTS } from './constants';
import { EmailService } from './utils/emailService';
import ServicesOverviewPage from './pages/ServicesOverviewPage';
import WhatsAppButton from './components/WhatsAppButton';
import AiAssistantButton from './components/AiAssistantButton';
import { AiAssistantWidget } from './components/AiAssistantWidget';
import PromotionsPage from './pages/PromotionsPage';
import ToastManager from './components/ToastManager';

/**
 * Helper to get state from localStorage or fallback to an initial value.
 * This makes the application state persistent across browser sessions.
 */
const getInitialState = <T,>(key: string, initialValue: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(`Error reading from localStorage for key "${key}":`, error);
    return initialValue;
  }
};

const INITIAL_INFO_BANNER_CONFIG: InfoBannerConfig = {
    isVisible: true,
    text: '<b>Livraison offerte</b> en Belgique et en France à partir de 59€ d\'achat !',
    backgroundColor: '#cffafe', // cyan-100
};

const INITIAL_POPUP_CONFIG: PopupConfig[] = [
    {
        id: 'promo-popup-1',
        title: '🎉 Bienvenue chez Lolirine Pool Store !',
        content: '<p>Inscrivez-vous à notre newsletter et recevez <strong>10% de réduction</strong> sur votre première commande !</p>',
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/IMAGES%20ARRIERES%20PLAN/Piscine%20arrie%CC%80re%20plan2.jpg',
        buttonText: 'Je m\'inscris !',
        buttonLink: 'newsletter_signup', // Custom identifier
        isEnabled: true,
        displayOn: ['home'],
        frequency: 'once_per_session',
        backgroundColor: '#ffffff'
    }
];

const INITIAL_MENU_CONFIG: MenuConfig = {
    style: 'default',
    links: [
        { id: 'home', page: 'home', label: 'Accueil' },
        { id: 'shop', page: 'shop', label: 'Boutique' },
        { id: 'services', page: 'servicesOverview', label: 'Nos Services' },
        { id: 'promotions', page: 'promotions', label: 'Promotions', customStyle: 'promo' },
        { id: 'portfolio', page: 'portfolio', label: 'Nos réalisations' },
        { id: 'blog', page: 'blog', label: 'Blog' },
        { id: 'about', page: 'about', label: 'À propos' },
        { id: 'contact', page: 'contact', label: 'Contact' },
    ]
};

const App: React.FC = () => {
    // --- STATE MANAGEMENT ---
    
    // Page navigation state
    const [history, setHistory] = useState<Page[]>(['home']);
    const [pageOptions, setPageOptions] = useState<{ categoryFilter?: string; searchQuery?: string }>({});

    // Data states
    const [products, setProducts] = useState<Product[]>(getInitialState('products', INITIAL_PRODUCTS));
    const [cart, setCart] = useState<CartItem[]>(getInitialState('cart', []));
    const [wishlist, setWishlist] = useState<Product[]>(getInitialState('wishlist', []));
    const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(getInitialState('recentlyViewed', []));
    const [orders, setOrders] = useState<Order[]>(getInitialState('orders', INITIAL_ORDERS));
    const [users, setUsers] = useState<UserAccount[]>(getInitialState('users', INITIAL_USERS));
    const [suppliers, setSuppliers] = useState<Supplier[]>(getInitialState('suppliers', INITIAL_SUPPLIERS));
    const [invoices, setInvoices] = useState<Invoice[]>(getInitialState('invoices', INITIAL_INVOICES));
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(getInitialState('paymentMethods', INITIAL_PAYMENT_METHODS));
    const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>(getInitialState('emailTemplates', INITIAL_EMAIL_TEMPLATES));
    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(getInitialState('purchaseOrders', []));
    const [marketingCampaigns, setMarketingCampaigns] = useState<MarketingCampaign[]>(getInitialState('marketingCampaigns', INITIAL_MARKETING_CAMPAIGNS));
    const [prospects, setProspects] = useState<Prospect[]>(getInitialState('prospects', INITIAL_PROSPECTS));
    
    // UI states
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<UserAccount | null>(getInitialState('currentUser', null));
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isClientLoginOpen, setIsClientLoginOpen] = useState(false);
    const [isClientRegisterOpen, setIsClientRegisterOpen] = useState(false);
    const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [lastOrder, setLastOrder] = useState<Order | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [displayedPopups, setDisplayedPopups] = useState<Set<string>>(new Set());
    const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
    const [toasts, setToasts] = useState<Toast[]>([]);
    
    // Admin editable configurations
    const [infoBannerConfig, setInfoBannerConfig] = useState<InfoBannerConfig>(getInitialState('infoBannerConfig', INITIAL_INFO_BANNER_CONFIG));
    const [popupConfigs, setPopupConfigs] = useState<PopupConfig[]>(getInitialState('popupConfigs', INITIAL_POPUP_CONFIG));
    const [menuConfig, setMenuConfig] = useState<MenuConfig>(getInitialState('menuConfig', INITIAL_MENU_CONFIG));
    const [testimonials, setTestimonials] = useState<Testimonial[]>(getInitialState('testimonials', INITIAL_TESTIMONIALS));
    const [homeCategories, setHomeCategories] = useState<HomeCategory[]>(getInitialState('homeCategories', INITIAL_HOME_CATEGORIES));
    const [siteConfig, setSiteConfig] = useState<SiteConfig>(getInitialState('siteConfig', INITIAL_SITE_CONFIG));
    const [pagesContent, setPagesContent] = useState<PageContent[]>(getInitialState('pagesContent', INITIAL_PAGES_CONTENT));

    // NEW: state for granular cookie preferences
    const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences | null>(getInitialState('cookiePreferences', null));
    
    // --- DERIVED STATE ---
    const currentPage = history[history.length - 1];
    const canGoBack = history.length > 1;

    // --- UTILS & SERVICES ---

    // Initialize Email Service
    const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
        setNotifications(prev => [...prev, { ...notification, id: `notif-${Date.now()}` }]);
    }, []);
    const emailService = new EmailService(emailTemplates, addNotification);


    // --- EFFECTS ---
    
    // Persist states to localStorage
    useEffect(() => { window.localStorage.setItem('products', JSON.stringify(products)); }, [products]);
    useEffect(() => { window.localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
    useEffect(() => { window.localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);
    useEffect(() => { window.localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed)); }, [recentlyViewed]);
    useEffect(() => { window.localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);
    useEffect(() => { window.localStorage.setItem('users', JSON.stringify(users)); }, [users]);
    useEffect(() => { window.localStorage.setItem('suppliers', JSON.stringify(suppliers)); }, [suppliers]);
    useEffect(() => { window.localStorage.setItem('invoices', JSON.stringify(invoices)); }, [invoices]);
    useEffect(() => { window.localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods)); }, [paymentMethods]);
    useEffect(() => { window.localStorage.setItem('emailTemplates', JSON.stringify(emailTemplates)); }, [emailTemplates]);
    useEffect(() => { window.localStorage.setItem('currentUser', JSON.stringify(currentUser)); }, [currentUser]);
    useEffect(() => { window.localStorage.setItem('purchaseOrders', JSON.stringify(purchaseOrders)); }, [purchaseOrders]);
    useEffect(() => { window.localStorage.setItem('infoBannerConfig', JSON.stringify(infoBannerConfig)); }, [infoBannerConfig]);
    useEffect(() => { window.localStorage.setItem('popupConfigs', JSON.stringify(popupConfigs)); }, [popupConfigs]);
    useEffect(() => { window.localStorage.setItem('menuConfig', JSON.stringify(menuConfig)); }, [menuConfig]);
    useEffect(() => { window.localStorage.setItem('marketingCampaigns', JSON.stringify(marketingCampaigns)); }, [marketingCampaigns]);
    useEffect(() => { window.localStorage.setItem('prospects', JSON.stringify(prospects)); }, [prospects]);
    useEffect(() => { window.localStorage.setItem('testimonials', JSON.stringify(testimonials)); }, [testimonials]);
    useEffect(() => { window.localStorage.setItem('homeCategories', JSON.stringify(homeCategories)); }, [homeCategories]);
    useEffect(() => { window.localStorage.setItem('siteConfig', JSON.stringify(siteConfig)); }, [siteConfig]);
    useEffect(() => { window.localStorage.setItem('pagesContent', JSON.stringify(pagesContent)); }, [pagesContent]);

    // Load Google Maps script dynamically
    useEffect(() => {
        if (document.getElementById('google-maps-script')) {
            return;
        }

        const script = document.createElement('script');
        script.id = 'google-maps-script';
        const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
        
        if (googleMapsApiKey) {
            script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
            script.async = true;
            document.head.appendChild(script);
        } else {
            console.warn("Google Maps API Key is not configured. Address autocomplete will be disabled.");
        }
    }, []);
    
    const handleSelectProduct = useCallback((product: Product) => {
        setSelectedProduct(product);
        setRecentlyViewed(prev => {
            const newHistory = [product, ...prev.filter(p => p.id !== product.id)];
            return newHistory.slice(0, 10);
        });
        setHistory(prev => [...prev, 'productDetail']);
        window.scrollTo(0, 0);
    }, []);

    
    // --- NAVIGATION ---
    const navigateTo = useCallback((page: Page, options?: { categoryFilter?: string, searchQuery?: string }) => {
        if (page === 'admin' && !isAdmin) {
            setIsAdminLoginOpen(true);
            return;
        }

        if (page !== 'productDetail') {
            setSelectedProduct(null);
        }

        setHistory(prev => [...prev, page]);
        setPageOptions(options || {});
        window.scrollTo(0, 0);
    }, [isAdmin]);

    const goBack = useCallback(() => {
        if (canGoBack) {
            setHistory(prev => prev.slice(0, -1));
        }
    }, [canGoBack]);


    // --- HANDLERS ---
    
    const addToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'info') => {
        const id = `toast-${Date.now()}`;
        setToasts(prevToasts => [...prevToasts, { id, message, type }]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    }, []);
    
    const handleSaveCookiePreferences = useCallback((preferences: CookiePreferences) => {
        setCookiePreferences(preferences);
        window.localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    }, []);

    // Cart management
    const addToCart = useCallback((product: Product, quantity: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
            } else {
                return [...prevCart, { ...product, quantity }];
            }
        });
        addToast(`"${product.name}" ajouté au panier`, 'success');
    }, [addToast]);
    
    const onBuyNow = useCallback((product: Product, quantity: number) => {
        addToCart(product, quantity);
        setIsCartOpen(false); // Close cart if open
        navigateTo('checkout');
    }, [addToCart, navigateTo]);

    const updateCartQuantity = useCallback((productId: string | number, quantity: number) => {
        setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item).filter(item => item.quantity > 0));
    }, []);

    const removeFromCart = useCallback((productId: string | number) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    }, []);

    const clearCart = useCallback(() => setCart([]), []);

    const addToWishlist = useCallback((product: Product) => {
        setWishlist(prev => {
            if (prev.some(item => item.id === product.id)) {
                addToast(`"${product.name}" retiré de la liste de souhaits`, 'info');
                return prev.filter(item => item.id !== product.id);
            }
            addToast(`"${product.name}" ajouté à la liste de souhaits`, 'success');
            return [product, ...prev];
        });
    }, [addToast]);

    const placeOrder = useCallback((shippingAddressData: { shippingAddress: string; shippingCity: string; shippingZip: string }) => {
        if (!currentUser) {
            addToast("Veuillez vous connecter pour passer une commande.", "error");
            return;
        }
        
        const newOrder: Order = {
            id: `#${Math.floor(Math.random() * 10000) + 10524}`,
            customer: currentUser.name,
            customerEmail: currentUser.email,
            date: new Date().toISOString().split('T')[0],
            total: cart.reduce((sum, item) => sum + (item.promoPrice ?? item.price) * item.quantity * (1 + item.tvaRate), 0),
            status: 'En attente',
            items: cart,
            ...shippingAddressData,
            isDropshippingOrder: cart.some(item => item.isDropshipping),
            supplierStatus: cart.some(item => item.isDropshipping) ? 'En attente' : undefined,
        };
        setOrders(prev => [newOrder, ...prev]);
        setLastOrder(newOrder);
        clearCart();
        navigateTo('orderConfirmation');
        emailService.send('order_confirmation', { ...newOrder });
    }, [cart, currentUser, clearCart, navigateTo, emailService, addToast]);

    // Authentication
    const handleAdminLoginSuccess = useCallback(() => {
        setIsAdmin(true);
        setIsAdminLoginOpen(false);
        setHistory(['admin']);
    }, []);

    const handleClientLoginSuccess = useCallback((user: UserAccount) => {
        setCurrentUser(user);
        setIsClientLoginOpen(false);
        addToast(`Bienvenue, ${user.name} !`, 'success');
    }, [addToast]);
    
    const handleClientRegisterSuccess = useCallback((newUserData: Omit<UserAccount, 'id' | 'createdAt' | 'segment' | 'communicationHistory' | 'gdprConsent'> & {gdprConsent: {marketingEmails: boolean}}) => {
        const newUser: UserAccount = {
            ...newUserData,
            id: `user-${Date.now()}`,
            createdAt: new Date().toISOString(),
            segment: 'Nouveau',
            communicationHistory: [],
            gdprConsent: {
                ...newUserData.gdprConsent,
                consentDate: new Date().toISOString(),
            }
        };
        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        setIsClientRegisterOpen(false);
        emailService.send('registration_confirmation', { customerName: newUser.name, customerEmail: newUser.email });
    }, [emailService]);
    
    const handleLogout = useCallback(() => {
        addToast("Vous avez été déconnecté.", 'info');
        setIsAdmin(false);
        setCurrentUser(null);
        navigateTo('home');
    }, [navigateTo, addToast]);

    // Admin Data Handlers
    const handleUpdateProduct = useCallback((updatedProduct: Product) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    }, []);
    
    const handleCreateProduct = useCallback((newProductData: Omit<Product, 'id'>) => {
        const newProduct: Product = { ...newProductData, id: `prod-${Date.now()}` };
        setProducts(prev => [newProduct, ...prev]);
    }, []);

    const handleDeleteProduct = useCallback((productId: string | number) => {
        if(window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
            setProducts(prev => prev.filter(p => p.id !== productId));
        }
    }, []);
    
    const handleBulkUpdateProducts = useCallback((updatedProducts: Product[]) => {
        setProducts(prevProducts => {
            const updatedMap = new Map(updatedProducts.map(p => [p.id, p]));
            const newProducts = prevProducts.map(p => updatedMap.get(p.id) || p);
            const newProductsToAdd = updatedProducts.filter(p => !prevProducts.some(existing => existing.id === p.id));
            
            const existingCategories = new Set(newProducts.map(p => p.category));
            newProductsToAdd.forEach(p => {
                if (!existingCategories.has(p.category)) {
                    console.log(`Auto-adding new category from product import: ${p.category}`);
                    existingCategories.add(p.category);
                }
            });

            return [...newProducts, ...newProductsToAdd];
        });
    }, []);

    const handleUpdateStockRibbons = useCallback(() => {
        setProducts(prev => prev.map(p => {
            if (p.isDropshipping) return { ...p, ribbon: undefined };
            if (p.stock !== undefined) {
                if (p.stock <= 0) return { ...p, ribbon: 'Rupture de stock' };
                if (p.stock <= 5) return { ...p, ribbon: 'Stock faible' };
            }
            if (p.ribbon === 'Rupture de stock' || p.ribbon === 'Stock faible') {
                return { ...p, ribbon: undefined };
            }
            return p;
        }));
    }, []);

    const handleUpdateOrder = useCallback((updatedOrder: Order) => {
        setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
    }, []);
    
    const handleUpdateUser = useCallback((updatedUser: UserAccount) => {
        // FIX: Replaced `p` with `u` to correctly reference the item in the map function.
        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
        if (currentUser && currentUser.id === updatedUser.id) {
            setCurrentUser(updatedUser);
        }
    }, [currentUser]);

    const handleCreateSupplier = useCallback((newSupplierData: Omit<Supplier, 'id'>) => {
        const newSupplier = { ...newSupplierData, id: `sup-${Date.now()}` };
        setSuppliers(prev => [newSupplier, ...prev]);
    }, []);

    const handleUpdateSupplier = useCallback((updatedSupplier: Supplier) => {
        setSuppliers(prev => prev.map(s => s.id === updatedSupplier.id ? updatedSupplier : s));
    }, []);
    
    const handleDeleteSupplier = useCallback((supplierId: string) => {
        setSuppliers(prev => prev.filter(s => s.id !== supplierId));
    }, []);

    const handleCreateInvoice = useCallback((newInvoiceData: Omit<Invoice, 'id'>) => {
        const newInvoice: Invoice = { ...newInvoiceData, id: `FAC/${new Date().getFullYear()}/${String(invoices.length + 1).padStart(4, '0')}`};
        setInvoices(prev => [newInvoice, ...prev]);
    }, [invoices.length]);
    
    const handleUpdateInvoice = useCallback((updatedInvoice: Invoice) => {
        setInvoices(prev => prev.map(i => i.id === updatedInvoice.id ? updatedInvoice : i));
    }, []);

    const handleDeleteInvoice = useCallback((invoiceId: string) => {
        setInvoices(prev => prev.filter(i => i.id !== invoiceId));
    }, []);

    const handleUpdatePaymentMethod = useCallback((updatedMethod: PaymentMethod) => {
        setPaymentMethods(prev => prev.map(m => m.id === updatedMethod.id ? updatedMethod : m));
    }, []);
    
    const handleUpdateEmailTemplate = useCallback((updatedTemplate: EmailTemplate) => {
        setEmailTemplates(prev => prev.map(t => t.id === updatedTemplate.id ? updatedTemplate : t));
    }, []);
    
    const handleCreatePurchaseOrder = useCallback((poData: Omit<PurchaseOrder, 'id' | 'createdAt' | 'status'>): PurchaseOrder => {
        const newPO: PurchaseOrder = {
            ...poData,
            id: `PO-${poData.orderId.replace('#', '')}-${poData.supplierId}`,
            createdAt: new Date().toISOString(),
            status: 'À envoyer',
        };
        setPurchaseOrders(prev => [...prev, newPO]);
        return newPO;
    }, []);

    const handleUpdatePurchaseOrder = useCallback((updatedPO: PurchaseOrder) => {
        setPurchaseOrders(prev => prev.map(p => p.id === updatedPO.id ? updatedPO : p));
    }, []);

    const handleUpdateInfoBanner = useCallback((config: InfoBannerConfig) => {
        setInfoBannerConfig(config);
    }, []);

    const handleCreatePopup = useCallback((popupData: Omit<PopupConfig, 'id'>) => {
        const newPopup = { ...popupData, id: `popup-${Date.now()}`};
        setPopupConfigs(prev => [...prev, newPopup]);
    }, []);
    
    const handleUpdatePopup = useCallback((updatedPopup: PopupConfig) => {
        setPopupConfigs(prev => prev.map(p => p.id === updatedPopup.id ? updatedPopup : p));
    }, []);

    const handleDeletePopup = useCallback((popupId: string) => {
        setPopupConfigs(prev => prev.filter(p => p.id !== popupId));
    }, []);
    
    const handleUpdateMenuConfig = useCallback((config: MenuConfig) => {
        setMenuConfig(config);
    }, []);

     const handleAddCategory = useCallback((categoryPath: string) => {
        const categoryExists = products.some(p => p.category.startsWith(categoryPath));
        if (!categoryExists) {
            handleCreateProduct({
                name: `Placeholder for ${categoryPath}`,
                category: categoryPath,
                price: 0,
                tvaRate: 0,
                imageUrl: '',
                stock: 0,
                isHidden: true,
            });
            alert(`Catégorie "${categoryPath}" ajoutée.`);
        } else {
            alert(`La catégorie "${categoryPath}" existe déjà.`);
        }
    }, [products, handleCreateProduct]);

    const handleDeleteCategoryAndProducts = useCallback((categoryPath: string) => {
        if(window.confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${categoryPath}" et TOUS les produits associés ? Cette action est irréversible.`)) {
            setProducts(prev => prev.filter(p => !p.category.startsWith(categoryPath)));
        }
    }, []);
    
    const handleRenameCategory = useCallback((oldCategoryPath: string, newCategoryName: string) => {
        setProducts(prev => prev.map(p => {
            if (p.category.startsWith(oldCategoryPath)) {
                const parts = oldCategoryPath.split(' - ');
                const newBasePath = [...parts.slice(0, -1), newCategoryName].join(' - ');
                const restOfPath = p.category.substring(oldCategoryPath.length);
                return { ...p, category: `${newBasePath}${restOfPath}` };
            }
            return p;
        }));
    }, []);
    
    const handleDuplicateCategory = useCallback((sourceCategoryPath: string, newCategoryPath: string) => {
        const productsToDuplicate = products.filter(p => p.category.startsWith(sourceCategoryPath));
        const newProducts: Product[] = productsToDuplicate.map(p => {
            const newId = `${p.id}-copy-${Date.now()}`;
            const newCategory = p.category.replace(sourceCategoryPath, newCategoryPath);
            return {
                ...p,
                id: newId,
                name: `${p.name} (Copie)`,
                category: newCategory,
            };
        });
        setProducts(prev => [...prev, ...newProducts]);
    }, [products]);

    const handleCreateMarketingCampaign = useCallback((campaignData: Omit<MarketingCampaign, 'id'>) => {
        const newCampaign: MarketingCampaign = { ...campaignData, id: `camp-${Date.now()}` };
        setMarketingCampaigns(prev => [newCampaign, ...prev]);
    }, []);

    const handleUpdateMarketingCampaign = useCallback((updatedCampaign: MarketingCampaign) => {
        setMarketingCampaigns(prev => prev.map(c => c.id === updatedCampaign.id ? updatedCampaign : c));
    }, []);

    const handleDeleteMarketingCampaign = useCallback((campaignId: string) => {
        if(window.confirm("Êtes-vous sûr de vouloir supprimer cette campagne ?")) {
            setMarketingCampaigns(prev => prev.filter(c => c.id !== campaignId));
        }
    }, []);

    const handleCreateTestimonial = useCallback((testimonialData: Omit<Testimonial, 'id'>) => {
        const newTestimonial: Testimonial = { ...testimonialData, id: `test-${Date.now()}` };
        setTestimonials(prev => [newTestimonial, ...prev]);
    }, []);

    const handleUpdateTestimonial = useCallback((updatedTestimonial: Testimonial) => {
        setTestimonials(prev => prev.map(t => t.id === updatedTestimonial.id ? updatedTestimonial : t));
    }, []);

    const handleDeleteTestimonial = useCallback((testimonialId: string) => {
        if(window.confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) {
            setTestimonials(prev => prev.filter(t => t.id !== testimonialId));
        }
    }, []);

    const handleUpdateHomeCategories = useCallback((categories: HomeCategory[]) => {
        setHomeCategories(categories);
    }, []);

    const handleUpdateSiteConfig = useCallback((config: SiteConfig) => {
        setSiteConfig(config);
    }, []);

    const handleUpdatePageContent = useCallback((updatedPage: PageContent) => {
        setPagesContent(prev => prev.map(p => p.pageId === updatedPage.pageId ? updatedPage : p));
    }, []);

    const handleCreateProspect = useCallback((prospectData: Omit<Prospect, 'id'>) => {
        const newProspect: Prospect = {
            ...prospectData,
            id: `prospect-${Date.now()}`,
            createdAt: new Date().toISOString(),
            notes: [],
        };
        setProspects(prev => [newProspect, ...prev]);
    }, []);

    const handleUpdateProspect = useCallback((updatedProspect: Prospect) => {
        setProspects(prev => prev.map(p => p.id === updatedProspect.id ? updatedProspect : p));
    }, []);

    const handleDeleteProspect = useCallback((prospectId: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce prospect ?")) {
            setProspects(prev => prev.filter(p => p.id !== prospectId));
        }
    }, []);


    // --- PAGE RENDERING LOGIC ---
    
    const renderPage = () => {
        const findPageContent = (pageId: Page | string) => pagesContent.find(p => p.pageId === pageId);

        switch(currentPage) {
            case 'home': return <HomePage navigateTo={navigateTo} products={products} addToCart={addToCart} onBuyNow={onBuyNow} recentlyViewed={recentlyViewed} onSelectProduct={handleSelectProduct} orders={orders} currentUser={currentUser} cart={cart} wishlist={wishlist} addToWishlist={addToWishlist} testimonials={testimonials} homeCategories={homeCategories} />;
            case 'services': return <ServicesPage navigateTo={navigateTo} goBack={goBack} canGoBack={canGoBack}/>;
            case 'servicesOverview': return <ServicesOverviewPage navigateTo={navigateTo} goBack={goBack} canGoBack={canGoBack} pageContent={findPageContent('servicesOverview')} />;
            case 'shop': return <ShopPage products={products.filter(p => !p.isHidden)} addToCart={addToCart} onBuyNow={onBuyNow} onSelectProduct={handleSelectProduct} initialCategoryFilter={pageOptions.categoryFilter} initialSearchTerm={pageOptions.searchQuery} wishlist={wishlist} addToWishlist={addToWishlist} recentlyViewed={recentlyViewed} navigateTo={navigateTo} />;
            case 'promotions': return <PromotionsPage products={products} addToCart={addToCart} onBuyNow={onBuyNow} onSelectProduct={handleSelectProduct} wishlist={wishlist} addToWishlist={addToWishlist} goBack={goBack} canGoBack={canGoBack} recentlyViewed={recentlyViewed} navigateTo={navigateTo} />;
            case 'portfolio': return <PortfolioPage goBack={goBack} canGoBack={canGoBack} />;
            case 'blog': return <BlogPage goBack={goBack} canGoBack={canGoBack} />;
            case 'about': return <AboutPage goBack={goBack} canGoBack={canGoBack} pageContent={findPageContent('about')} />;
            case 'contact': return <ContactPage goBack={goBack} canGoBack={canGoBack} />;
            case 'admin': return <AdminPage onLogout={handleLogout} products={products} onUpdateProduct={handleUpdateProduct} onCreateProduct={handleCreateProduct} onDeleteProduct={handleDeleteProduct} onBulkUpdateProducts={handleBulkUpdateProducts} orders={orders} onUpdateOrder={handleUpdateOrder} suppliers={suppliers} onCreateSupplier={handleCreateSupplier} onUpdateSupplier={handleUpdateSupplier} onDeleteSupplier={handleDeleteSupplier} invoices={invoices} onCreateInvoice={handleCreateInvoice} onUpdateInvoice={handleUpdateInvoice} onDeleteInvoice={handleDeleteInvoice} paymentMethods={paymentMethods} onUpdatePaymentMethod={handleUpdatePaymentMethod} emailTemplates={emailTemplates} onUpdateEmailTemplate={handleUpdateEmailTemplate} users={users} onUpdateUser={handleUpdateUser} cart={cart} purchaseOrders={purchaseOrders} onUpdatePurchaseOrder={handleUpdatePurchaseOrder} onCreatePurchaseOrder={handleCreatePurchaseOrder} infoBanner={infoBannerConfig} onUpdateInfoBanner={handleUpdateInfoBanner} popups={popupConfigs} onCreatePopup={handleCreatePopup} onUpdatePopup={handleUpdatePopup} onDeletePopup={handleDeletePopup} menuConfig={menuConfig} onUpdateMenuConfig={handleUpdateMenuConfig} onAddCategory={handleAddCategory} onDeleteCategoryAndProducts={handleDeleteCategoryAndProducts} onRenameCategory={handleRenameCategory} onDuplicateCategory={handleDuplicateCategory} emailService={emailService} onUpdateStockRibbons={handleUpdateStockRibbons} marketingCampaigns={marketingCampaigns} onCreateMarketingCampaign={handleCreateMarketingCampaign} onUpdateMarketingCampaign={handleUpdateMarketingCampaign} onDeleteMarketingCampaign={handleDeleteMarketingCampaign} testimonials={testimonials} onCreateTestimonial={handleCreateTestimonial} onUpdateTestimonial={handleUpdateTestimonial} onDeleteTestimonial={handleDeleteTestimonial} homeCategories={homeCategories} onUpdateHomeCategories={handleUpdateHomeCategories} siteConfig={siteConfig} onUpdateSiteConfig={handleUpdateSiteConfig} pagesContent={pagesContent} onUpdatePageContent={handleUpdatePageContent} prospects={prospects} onCreateProspect={handleCreateProspect} onUpdateProspect={handleUpdateProspect} onDeleteProspect={handleDeleteProspect} />;
            case 'client': return currentUser ? <ClientAreaPage onLogout={handleLogout} user={currentUser} orders={orders} onUpdateUser={handleUpdateUser} goBack={goBack} canGoBack={canGoBack} /> : <HomePage navigateTo={navigateTo} products={products} addToCart={addToCart} onBuyNow={onBuyNow} recentlyViewed={recentlyViewed} onSelectProduct={handleSelectProduct} orders={orders} currentUser={currentUser} cart={cart} wishlist={wishlist} addToWishlist={addToWishlist} testimonials={testimonials} homeCategories={homeCategories} />;
            case 'faq': return <FaqPage goBack={goBack} canGoBack={canGoBack}/>;
            case 'checkout': return <CheckoutPage cart={cart} onPlaceOrder={placeOrder} currentUser={currentUser} paymentMethods={paymentMethods.filter(p => p.enabled)} goBack={goBack} canGoBack={canGoBack} />;
            case 'orderConfirmation': return lastOrder ? <OrderConfirmationPage order={lastOrder} /> : <HomePage navigateTo={navigateTo} products={products} addToCart={addToCart} onBuyNow={onBuyNow} recentlyViewed={recentlyViewed} onSelectProduct={handleSelectProduct} orders={orders} currentUser={currentUser} cart={cart} wishlist={wishlist} addToWishlist={addToWishlist} testimonials={testimonials} homeCategories={homeCategories} />;
            case 'terms': return <TermsPage goBack={goBack} canGoBack={canGoBack} pageContent={findPageContent('terms')} />;
            case 'privacy': return <PrivacyPolicyPage goBack={goBack} canGoBack={canGoBack} pageContent={findPageContent('privacy')} />;
            case 'cookies': return <CookiesPage goBack={goBack} canGoBack={canGoBack} pageContent={findPageContent('cookies')} />;
            case 'legal': return <LegalNoticePage goBack={goBack} canGoBack={canGoBack} pageContent={findPageContent('legal')} />;
            case 'shippingPolicy': return <ShippingPolicyPage navigateTo={navigateTo} goBack={goBack} canGoBack={canGoBack} pageContent={findPageContent('shippingPolicy')} />;
            case 'wellness': return <WellnessPage navigateTo={navigateTo} products={products} addToCart={addToCart} onBuyNow={onBuyNow} onSelectProduct={handleSelectProduct} wishlist={wishlist} addToWishlist={addToWishlist} goBack={goBack} canGoBack={canGoBack} recentlyViewed={recentlyViewed} />;
            case 'productDetail': return selectedProduct ? <ProductDetailPage product={selectedProduct} navigateTo={navigateTo} addToCart={addToCart} onBuyNow={onBuyNow} addToWishlist={addToWishlist} wishlist={wishlist} products={products.filter(p => !p.isHidden)} onSelectProduct={handleSelectProduct} goBack={goBack} canGoBack={canGoBack} recentlyViewed={recentlyViewed} /> : <ShopPage products={products.filter(p => !p.isHidden)} addToCart={addToCart} onBuyNow={onBuyNow} onSelectProduct={handleSelectProduct} wishlist={wishlist} addToWishlist={addToWishlist} recentlyViewed={recentlyViewed} navigateTo={navigateTo} />;
            case 'wishlist': return <WishlistPage wishlist={wishlist} navigateTo={navigateTo} onSelectProduct={handleSelectProduct} addToCart={addToCart} onBuyNow={onBuyNow} addToWishlist={addToWishlist} goBack={goBack} canGoBack={canGoBack} />;
            case 'repairs': return <RepairsPage navigateTo={navigateTo} goBack={goBack} canGoBack={canGoBack} />;
            case 'construction': return <ConstructionPage navigateTo={navigateTo} goBack={goBack} canGoBack={canGoBack} />;
            case 'waterAnalysis': return <WaterAnalysisPage navigateTo={navigateTo} goBack={goBack} canGoBack={canGoBack} />;
            case 'winterization': return <WinterizationPage navigateTo={navigateTo} goBack={goBack} canGoBack={canGoBack} />;
            default: return <h1>Page not found</h1>;
        }
    };
    
    const activePopup = popupConfigs.find(p => 
        p.isEnabled &&
        !displayedPopups.has(p.id) &&
        (p.displayOn.includes('all') || p.displayOn.includes(currentPage))
    );

    useEffect(() => {
        if (activePopup) {
            const timer = setTimeout(() => {
                setDisplayedPopups(prev => new Set(prev).add(activePopup.id));
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [activePopup]);


    return (
        <div className="flex flex-col min-h-screen">
            <Header 
                currentPage={currentPage}
                navigateTo={navigateTo}
                cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
                wishlistItemCount={wishlist.length}
                onCartClick={() => setIsCartOpen(true)}
                currentUser={currentUser}
                onLoginClick={() => setIsClientLoginOpen(true)}
                onLogoutClick={handleLogout}
                bannerConfig={infoBannerConfig}
                menuConfig={menuConfig}
                services={SERVICES}
                shopCategories={BOUTIQUE_SUB_CATEGORIES}
                wellnessCategories={WELLNESS_SUB_CATEGORIES}
                onSelectProduct={handleSelectProduct}
            />
            <main className="flex-grow pt-[164px]">
                {renderPage()}
            </main>
            <Footer navigateTo={navigateTo} onOpenRegisterModal={() => setIsClientRegisterOpen(true)} siteConfig={siteConfig} />

            {/* Modals & Overlays */}
            {isCartOpen && <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} onUpdateQuantity={updateCartQuantity} onRemoveItem={removeFromCart} onClearCart={clearCart} navigateTo={navigateTo} />}
            {isAdminLoginOpen && <AdminLoginModal onSuccess={handleAdminLoginSuccess} onClose={() => setIsAdminLoginOpen(false)} />}
            {isClientLoginOpen && <ClientLoginModal onSuccess={handleClientLoginSuccess} onClose={() => setIsClientLoginOpen(false)} onSwitchToRegister={() => { setIsClientLoginOpen(false); setIsClientRegisterOpen(true); }} users={users} />}
            {isClientRegisterOpen && <ClientRegisterModal onSuccess={handleClientRegisterSuccess} onClose={() => setIsClientRegisterOpen(false)} onSwitchToLogin={() => { setIsClientRegisterOpen(false); setIsClientLoginOpen(true); }} existingUsers={users} />}
            
            { !cookiePreferences && (
                <CookieConsent
                    onSavePreferences={handleSaveCookiePreferences}
                    navigateTo={navigateTo}
                />
            )}
            
            <EmailNotificationManager 
                notifications={notifications} 
                onDismiss={(id) => setNotifications(prev => prev.filter(n => n.id !== id))}
            />
            
             {activePopup && displayedPopups.has(activePopup.id) && (
                <PromotionalPopup 
                    popup={activePopup} 
                    onClose={() => setDisplayedPopups(prev => new Set(prev).add(activePopup!.id))}
                    navigateTo={navigateTo}
                />
            )}

            <WhatsAppButton pageIdentifier={currentPage} />
            <AiAssistantButton onClick={() => setIsAiAssistantOpen(true)} />
            
            {isAiAssistantOpen && (
                <AiAssistantWidget 
                    onClose={() => setIsAiAssistantOpen(false)} 
                    products={products}
                    orders={orders}
                    services={SERVICES}
                    portfolioItems={PORTFOLIO_ITEMS}
                    blogPosts={BLOG_POSTS}
                    currentUser={currentUser}
                />
            )}
            
            <ToastManager toasts={toasts} onDismiss={removeToast} />

        </div>
    );
};

export default App;