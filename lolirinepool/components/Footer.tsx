import React, { useState, useRef, useEffect } from 'react';
import { FooterProps } from '../types';
import { ShieldCheck, Truck, UserCheck, FileText, Facebook, Linkedin, Instagram, Twitter, ChevronUp } from 'lucide-react';
import MaestroIcon from './icons/MaestroIcon';
import PaypalIcon from './icons/PaypalIcon';
import MastercardIcon from './icons/MastercardIcon';


const Footer: React.FC<FooterProps> = ({ navigateTo, siteConfig }) => {
  const [adminClickCount, setAdminClickCount] = useState(0);
  const clickTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleAdminAccessClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    const newClickCount = adminClickCount + 1;

    if (newClickCount >= 5) {
      navigateTo('admin');
      setAdminClickCount(0);
    } else {
      setAdminClickCount(newClickCount);
      clickTimeoutRef.current = window.setTimeout(() => {
        setAdminClickCount(0);
      }, 1000);
    }
  };

  const reassuranceItems = [
    { icon: ShieldCheck, text: "Paiement Sécurisé" },
    { icon: Truck, text: "Livraison Rapide" },
    { icon: UserCheck, text: "Conseils d'Experts" },
    { icon: FileText, text: "Devis Gratuit" },
  ];

  const socialLinks = [
    { href: siteConfig.socials.facebook, icon: Facebook, label: "Facebook" },
    { href: siteConfig.socials.twitter, icon: Twitter, label: "Twitter" },
    { href: siteConfig.socials.instagram, icon: Instagram, label: "Instagram" },
    { href: siteConfig.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-800 text-white font-sans">
      <button 
        onClick={scrollToTop} 
        title="Retourner en haut de la page"
        className="w-full bg-gray-700 hover:bg-gray-600 py-4 text-sm transition-colors duration-300 flex items-center justify-center gap-2"
      >
        <ChevronUp size={16} />
        Retour en haut
      </button>

      {/* Reassurance Banner */}
      <div className="bg-white text-gray-800 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {reassuranceItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <item.icon className="h-10 w-10 text-cyan-600 mb-2" strokeWidth={1.5} />
              <p className="font-semibold text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Column 1: Apprendre à nous connaître */}
          <div>
            <h3 className="font-bold text-white mb-4">Apprendre à nous connaître</h3>
            <ul className="space-y-2 text-gray-300">
              <li><button onClick={() => navigateTo('about')} className="hover:underline">À propos de nous</button></li>
              <li><button onClick={() => navigateTo('portfolio')} className="hover:underline">Nos réalisations</button></li>
              <li><button onClick={() => navigateTo('blog')} className="hover:underline">Blog</button></li>
              <li><button onClick={() => navigateTo('about')} className="hover:underline">Carrières</button></li>
              <li><button onClick={() => navigateTo('about')} className="hover:underline">Espace Presse</button></li>
            </ul>
          </div>

          {/* Column 2: Besoin d'aide ? */}
          <div>
            <h3 className="font-bold text-white mb-4">Besoin d'aide ?</h3>
            <ul className="space-y-2 text-gray-300">
              <li><button onClick={() => navigateTo('contact')} className="hover:underline">Contactez-nous</button></li>
              <li><button onClick={() => navigateTo('faq')} className="hover:underline">FAQ</button></li>
              <li><button onClick={() => navigateTo('client')} className="hover:underline">Suivi de commande</button></li>
              <li><button onClick={() => navigateTo('shippingPolicy')} className="hover:underline">Politique de livraison</button></li>
              <li><button onClick={() => navigateTo('terms')} className="hover:underline">Retours et remplacements</button></li>
              <li><button onClick={() => navigateTo('client')} className="hover:underline">Espace Client</button></li>
            </ul>
          </div>

          {/* Column 3: Nos Services & Boutique */}
          <div>
            <h3 className="font-bold text-white mb-4">Nos Services & Boutique</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="font-semibold text-gray-100">Services</li>
              <li><button onClick={() => navigateTo('repairs')} className="hover:underline pl-2">Entretien & Réparation</button></li>
              <li><button onClick={() => navigateTo('construction')} className="hover:underline pl-2">Construction & Rénovation</button></li>
              <li><button onClick={() => navigateTo('waterAnalysis')} className="hover:underline pl-2">Analyse de l'eau</button></li>
              <li><button onClick={() => navigateTo('winterization')} className="hover:underline pl-2">Hivernage & Estivage</button></li>
              <li className="font-semibold text-gray-100 mt-4">Boutique</li>
              <li><button onClick={() => navigateTo('shop', {categoryFilter: "Traitement de l'eau"})} className="hover:underline pl-2">Traitement de l'eau</button></li>
              <li><button onClick={() => navigateTo('shop', {categoryFilter: "Nettoyage"})} className="hover:underline pl-2">Nettoyage & Robots</button></li>
              <li><button onClick={() => navigateTo('shop', {categoryFilter: "Filtration"})} className="hover:underline pl-2">Filtration & Pompes</button></li>
              <li><button onClick={() => navigateTo('wellness')} className="hover:underline pl-2">Espace Wellness</button></li>
            </ul>
          </div>
          
          {/* Column 4: Contact & Communauté */}
          <div>
            <h3 className="font-bold text-white mb-4">Contact & Communauté</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{siteConfig.contact.address}</li>
              <li>{siteConfig.contact.city}</li>
              <li className="pt-2"><a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="hover:underline">{siteConfig.contact.phone}</a></li>
              <li><a href={`mailto:${siteConfig.contact.email}`} className="hover:underline">{siteConfig.contact.email}</a></li>
            </ul>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map(link => (
                <a key={link.label} href={link.href} title={`Suivez-nous sur ${link.label}`} aria-label={link.label} className="text-gray-300 hover:text-white transition-colors">
                  <link.icon size={20} />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <label htmlFor="newsletter-email" className="text-sm font-semibold">Inscrivez-vous à notre newsletter</label>
              <form className="flex mt-2" onSubmit={e => e.preventDefault()}>
                <input type="email" id="newsletter-email" placeholder="Votre e-mail" className="bg-gray-700 border-gray-600 text-white text-sm rounded-l-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold py-2 px-4 rounded-r-md">S'inscrire</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Banner */}
      <div className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <button onClick={() => navigateTo('home')}>
            <img src="https://lolirine-pool.odoo.com/web/image/website/1/logo/Lolirine%20Pool%20Store?unique=b561c22" alt="Lolirine Pool Store" className="h-10 mx-auto mb-6 opacity-80 hover:opacity-100 transition-opacity"/>
          </button>
          <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-6">
            <button onClick={() => navigateTo('terms')} className="hover:underline">Conditions Générales de Vente</button>
            <button onClick={() => navigateTo('privacy')} className="hover:underline">Politique de confidentialité</button>
            <button onClick={() => navigateTo('cookies')} className="hover:underline">Cookies</button>
            <button onClick={() => navigateTo('legal')} className="hover:underline">Mentions légales</button>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-6">
              <MaestroIcon className="h-8"/>
              <PaypalIcon className="h-8"/>
              <MastercardIcon className="h-8"/>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-6 text-xs">
            <a href="#" className="hover:underline">Nederlands</a>
            <span>|</span>
            <a href="#" className="hover:underline">English (UK)</a>
             <span>|</span>
            <a href="#" className="font-bold text-white hover:underline">Français (BE)</a>
          </div>
          <p 
            className="text-xs cursor-pointer"
            onClick={handleAdminAccessClick}
            title="Accès Administrateur"
          >
            &copy; {new Date().getFullYear()}, Lolirine Pool Store. Tous droits réservés. Tous les prix sont affichés TVAC 21% incluse.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
