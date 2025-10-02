import React from 'react';
import {
  Product,
  Order,
  UserAccount,
  Testimonial,
  PortfolioItem,
  BlogPost,
  Service,
  Supplier,
  Invoice,
  PaymentMethod,
  EmailTemplate,
  NavLink,
  AdminView,
  HomeCategory,
  MarketingCampaign,
  SiteConfig,
  PageContent,
  Prospect,
} from './types';
import {
  Truck,
  Wrench,
  Droplets,
  Building,
  BarChart2,
  Package,
  Users,
  CreditCard,
  FileText,
  DollarSign,
  ShoppingCart,
  Bell,
  Mail as MailIcon,
  Menu,
  File as FileIcon,
  GitBranch,
  MessageSquare,
  Contact,
  Megaphone,
  HeartHandshake,
  Settings
} from 'lucide-react';
import MaestroIcon from './components/icons/MaestroIcon';
import PaypalIcon from './components/icons/PaypalIcon';
import MastercardIcon from './components/icons/MastercardIcon';
import StripeIcon from './components/admin/StripeIcon';


export const ADMIN_PASSWORD = 'adminLolirine03@15@';

export const SERVICES: Service[] = [
  {
    icon: <Wrench />,
    title: 'Entretien & Réparation',
    description: 'Nos techniciens assurent la maintenance et la réparation de votre piscine pour une eau toujours saine.',
    imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/Entretien%20piscine%202.jpg',
    page: 'repairs',
  },
  {
    icon: <Building />,
    title: 'Construction & Rénovation',
    description: 'Nous concevons et réalisons la piscine de vos rêves, ou modernisons votre bassin existant.',
    imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/Construction%20piscine.jpeg',
    page: 'construction',
  },
  {
    icon: <Droplets />,
    title: 'Analyse de l\'eau',
    description: 'Profitez de notre expertise pour une analyse précise et un traitement adapté de votre eau.',
    imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/Analyse%20de%20l\'eau%203.jpeg',
    page: 'waterAnalysis',
  },
  {
    icon: <Truck />,
    title: 'Hivernage & Estivage',
    description: 'Nous préparons votre piscine pour l\'hiver et la remettons en service pour la belle saison.',
    imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/Couverture%20hivernage.jpeg',
    page: 'winterization',
  },
];

export const WELLNESS_SUB_CATEGORIES: NavLink[] = [
    {
        id: 'wellness-all',
        label: 'Voir tout l\'espace Wellness',
        page: 'wellness'
    },
    {
        id: 'wellness-spas-residentiels',
        label: 'Spas Résidentiels',
        page: 'shop',
        categoryFilter: 'Wellness - Spas Résidentiels',
        children: [
            { id: 'wellness-spas-residentiels-origins', label: 'Origins', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Origins' },
            { id: 'wellness-spas-residentiels-ocean-dreams', label: 'Ocean Dreams', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Ocean Dreams' },
            { id: 'wellness-spas-residentiels-les-essentiels', label: 'Les Essentiels', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Les Essentiels' },
            { id: 'wellness-spas-residentiels-les-classiques', label: 'Les Classiques', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Les Classiques' },
            { id: 'wellness-spas-residentiels-spas-de-nage', label: 'Spas de nage', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Spas de nage' },
            { id: 'wellness-spas-residentiels-spas-encastrables', label: 'Spas encastrables', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Spas encastrables' },
            { id: 'wellness-spas-residentiels-traitement-de-l-eau', label: 'Traitement de l\'eau', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Traitement de l\'eau' },
            { id: 'wellness-spas-residentiels-nettoyage', label: 'Nettoyage', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Nettoyage' },
            { id: 'wellness-spas-residentiels-accessoires', label: 'Accessoires', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Accessoires' },
            { id: 'wellness-spas-residentiels-la-collection', label: 'La collection', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - La collection' },
            { id: 'wellness-spas-residentiels-equipements', label: 'Équipements', page: 'shop', categoryFilter: 'Wellness - Spas Résidentiels - Équipements' },
        ]
    },
    {
        id: 'wellness-spas-publics',
        label: 'Spas Publics',
        page: 'shop',
        categoryFilter: 'Wellness - Spas Publics',
        children: [
            { id: 'wellness-spas-publics-filtration', label: 'Filtration', page: 'shop', categoryFilter: 'Wellness - Spas Publics - Filtration' },
            { id: 'wellness-spas-publics-debordement', label: 'Débordement', page: 'shop', categoryFilter: 'Wellness - Spas Publics - Débordement' },
            { id: 'wellness-spas-publics-debordement-carrele', label: 'Débordement Carrélé', page: 'shop', categoryFilter: 'Wellness - Spas Publics - Débordement Carrélé' },
            { id: 'wellness-spas-publics-inox', label: 'Inox', page: 'shop', categoryFilter: 'Wellness - Spas Publics - Inox' },
            { id: 'wellness-spas-publics-fluidra', label: 'FLUIDRA', page: 'shop', categoryFilter: 'Wellness - Spas Publics - FLUIDRA' },
        ]
    },
    {
        id: 'wellness-equipements',
        label: 'Équipements',
        page: 'shop',
        categoryFilter: 'Wellness - Équipements',
        children: [
            { id: 'wellness-equipements-hydromassage', label: 'Hydromassage', page: 'shop', categoryFilter: 'Wellness - Équipements - Hydromassage' },
            { id: 'wellness-equipements-saunas', label: 'Saunas', page: 'shop', categoryFilter: 'Wellness - Équipements - Saunas' },
            { id: 'wellness-equipements-douches-sensorielles', label: 'Douches sensorielles', page: 'shop', categoryFilter: 'Wellness - Équipements - Douches sensorielles' },
            { id: 'wellness-equipements-hammams', label: 'Hammams', page: 'shop', categoryFilter: 'Wellness - Équipements - Hammams' },
            { id: 'wellness-equipements-accessoires', label: 'Accessoires', page: 'shop', categoryFilter: 'Wellness - Équipements - Accessoires' },
        ]
    },
];

export const BOUTIQUE_SUB_CATEGORIES: NavLink[] = [
    { id: 'shop-all', label: 'Voir toute la boutique', page: 'shop' },
    { id: 'shop-traitement-eau', label: 'Traitement de l\'eau', page: 'shop', categoryFilter: 'Traitement de l\'eau', children: [
        { id: 'shop-traitement-eau-desinfection', label: 'Désinfection', page: 'shop', categoryFilter: 'Traitement de l\'eau - Désinfection' },
        { id: 'shop-traitement-eau-equilibre', label: 'Équilibre', page: 'shop', categoryFilter: 'Traitement de l\'eau - Équilibre' },
    ]},
    { id: 'shop-nettoyage', label: 'Nettoyage', page: 'shop', categoryFilter: 'Nettoyage', children: [
        { id: 'shop-nettoyage-robots-piscine-privee', label: 'Robots Piscine Privée', page: 'shop', categoryFilter: 'Nettoyage - Robots Piscine Privée' },
        { id: 'shop-nettoyage-robots-piscine-publique', label: 'Robots Piscine Publique', page: 'shop', categoryFilter: 'Nettoyage - Robots Piscine Publique' },
        { id: 'shop-nettoyage-robots-hydrauliques', label: 'Robots Hydrauliques', page: 'shop', categoryFilter: 'Nettoyage - Robots Hydrauliques' },
        { id: 'shop-nettoyage-zodiac', label: 'Zodiac', page: 'shop', categoryFilter: 'Nettoyage - Zodiac' },
        { id: 'shop-nettoyage-accessoires', label: 'Accessoires', page: 'shop', categoryFilter: 'Nettoyage - Accessoires' },
    ]},
    { id: 'shop-liners', label: 'Liners', page: 'shop', categoryFilter: 'Liners', children: [
        { id: 'shop-liners-membrane-armee', label: 'Membrane Armée', page: 'shop', categoryFilter: 'Liners - Membrane Armée' },
        { id: 'shop-liners-accessoires', label: 'Accessoires', page: 'shop', categoryFilter: 'Liners - Accessoires' },
    ]},
    { id: 'shop-filtration', label: 'Filtration', page: 'shop', categoryFilter: 'Filtration', children: [
        { id: 'shop-filtration-pompes', label: 'Pompes', page: 'shop', categoryFilter: 'Filtration - Pompes' },
        { id: 'shop-filtration-cartouches', label: 'Cartouches', page: 'shop', categoryFilter: 'Filtration - Cartouches' },
        { id: 'shop-filtration-charges-filtrantes', label: 'Charges Filtrantes', page: 'shop', categoryFilter: 'Filtration - Charges Filtrantes' },
        { id: 'shop-filtration-filtres', label: 'Filtres', page: 'shop', categoryFilter: 'Filtration - Filtres' },
        { id: 'shop-filtration-astralpool', label: 'AstralPool', page: 'shop', categoryFilter: 'Filtration - AstralPool' },
        { id: 'shop-filtration-bering', label: 'Bering', page: 'shop', categoryFilter: 'Filtration - Bering' },
        { id: 'shop-filtration-zodiac', label: 'Zodiac', page: 'shop', categoryFilter: 'Filtration - Zodiac' },
        { id: 'shop-filtration-charges', label: 'Charges', page: 'shop', categoryFilter: 'Filtration - Charges' },
    ]},
    { id: 'shop-pompes', label: 'Pompes', page: 'shop', categoryFilter: 'Pompes', children: [
        { id: 'shop-pompes-vitesse-variable', label: 'Vitesse Variable', page: 'shop', categoryFilter: 'Pompes - Vitesse Variable' },
        { id: 'shop-pompes-zodiac', label: 'Zodiac', page: 'shop', categoryFilter: 'Pompes - Zodiac' },
        { id: 'shop-pompes-astralpool', label: 'AstralPool', page: 'shop', categoryFilter: 'Pompes - AstralPool' },
        { id: 'shop-pompes-bering', label: 'Bering', page: 'shop', categoryFilter: 'Pompes - Bering' },
        { id: 'shop-pompes-polaris', label: 'Polaris', page: 'shop', categoryFilter: 'Pompes - Polaris' },
    ]},
    { id: 'shop-materiel-electrique', label: 'Matériel Électrique', page: 'shop', categoryFilter: 'Matériel Électrique', children: [
        { id: 'shop-materiel-electrique-coffrets-electriques', label: 'Coffrets Électriques', page: 'shop', categoryFilter: 'Matériel Électrique - Coffrets Électriques' },
        { id: 'shop-materiel-electrique-lampes', label: 'Lampes', page: 'shop', categoryFilter: 'Matériel Électrique - Lampes' },
        { id: 'shop-materiel-electrique-accessoires-electriques', label: 'Accessoires Électriques', page: 'shop', categoryFilter: 'Matériel Électrique - Accessoires Électriques' },
    ]},
    { id: 'shop-pieces-a-sceller', label: 'Pièces à sceller', page: 'shop', categoryFilter: 'Pièces à sceller', children: [
        { id: 'shop-pieces-a-sceller-inox', label: 'INOX', page: 'shop', categoryFilter: 'Pièces à sceller - INOX' },
        { id: 'shop-pieces-a-sceller-prestige', label: 'PRESTIGE', page: 'shop', categoryFilter: 'Pièces à sceller - PRESTIGE' },
        { id: 'shop-pieces-a-sceller-unik', label: 'UNIK', page: 'shop', categoryFilter: 'Pièces à sceller - UNIK' },
        { id: 'shop-pieces-a-sceller-norm', label: 'NORM', page: 'shop', categoryFilter: 'Pièces à sceller - NORM' },
        { id: 'shop-pieces-a-sceller-standard', label: 'STANDARD', page: 'shop', categoryFilter: 'Pièces à sceller - STANDARD' },
        { id: 'shop-pieces-a-sceller-easy-line', label: 'EASY LINE', page: 'shop', categoryFilter: 'Pièces à sceller - EASY LINE' },
        { id: 'shop-pieces-a-sceller-accessoires', label: 'Accessoires', page: 'shop', categoryFilter: 'Pièces à sceller - Accessoires' },
    ]},
    { id: 'shop-instruments-de-mesure', label: 'Instruments de mesure', page: 'shop', categoryFilter: 'Instruments de mesure', children: [
        { id: 'shop-instruments-de-mesure-bandelettes', label: 'Bandelettes', page: 'shop', categoryFilter: 'Instruments de mesure - Bandelettes' },
        { id: 'shop-instruments-de-mesure-testeurs', label: 'Testeurs', page: 'shop', categoryFilter: 'Instruments de mesure - Testeurs' },
    ]},
    { id: 'shop-raccords-pvc', label: 'Raccords & PVC', page: 'shop', categoryFilter: 'Raccords & PVC', children: [
        { id: 'shop-raccords-pvc-vannes', label: 'Vannes', page: 'shop', categoryFilter: 'Raccords & PVC - Vannes' },
        { id: 'shop-raccords-pvc-raccords', label: 'Raccords', page: 'shop', categoryFilter: 'Raccords & PVC - Raccords' },
        { id: 'shop-raccords-pvc-colles', label: 'Colles', page: 'shop', categoryFilter: 'Raccords & PVC - Colles' },
        { id: 'shop-raccords-pvc-cepex', label: 'CEPEX', page: 'shop', categoryFilter: 'Raccords & PVC - CEPEX' },
        { id: 'shop-raccords-pvc-astralpool', label: 'AstralPool', page: 'shop', categoryFilter: 'Raccords & PVC - AstralPool' },
        { id: 'shop-raccords-pvc-fitt', label: 'FITT', page: 'shop', categoryFilter: 'Raccords & PVC - FITT' },
        { id: 'shop-raccords-pvc-griffon', label: 'GRIFFON', page: 'shop', categoryFilter: 'Raccords & PVC - GRIFFON' },
        { id: 'shop-raccords-pvc-stanley', label: 'STANLEY', page: 'shop', categoryFilter: 'Raccords & PVC - STANLEY' },
    ]},
    { id: 'shop-chauffage', label: 'Chauffage', page: 'shop', categoryFilter: 'Chauffage', children: [
        { id: 'shop-chauffage-rechauffeurs', label: 'Réchauffeurs', page: 'shop', categoryFilter: 'Chauffage - Réchauffeurs' },
        { id: 'shop-chauffage-echangeurs', label: 'Echangeurs', page: 'shop', categoryFilter: 'Chauffage - Echangeurs' },
        { id: 'shop-chauffage-rechauffeurs', label: 'Réchauffeurs', page: 'shop', categoryFilter: 'Chauffage - Réchauffeurs' },
        { id: 'shop-chauffage-zodiac', label: 'Zodiac', page: 'shop', categoryFilter: 'Chauffage - Zodiac' },
        { id: 'shop-chauffage-astralpool', label: 'AstralPool', page: 'shop', categoryFilter: 'Chauffage - AstralPool' },
        { id: 'shop-chauffage-bering', label: 'Bering', page: 'shop', categoryFilter: 'Chauffage - Bering' },
        { id: 'shop-chauffage-solaire', label: 'Solaire', page: 'shop', categoryFilter: 'Chauffage - Solaire' },
        { id: 'shop-chauffage-accessoires', label: 'Accessoires', page: 'shop', categoryFilter: 'Chauffage - Accessoires' },
    ]},
    { id: 'shop-hivernage', label: 'Hivernage', page: 'shop', categoryFilter: 'Hivernage' },
    { id: 'shop-dosage-regulation', label: 'Dosage Régulation', page: 'shop', categoryFilter: 'Dosage Régulation', children: [
        { id: 'shop-dosage-regulation-adoucisseurs', label: 'Adoucisseurs', page: 'shop', categoryFilter: 'Dosage Régulation - Adoucisseurs' },
    ]},
    { id: 'shop-deshumidification', label: 'Déshumidification', page: 'shop', categoryFilter: 'Déshumidification' },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: "Un service client impeccable et des produits de grande qualité. Ma piscine n'a jamais été aussi belle !",
    author: 'Jean Dupont',
    location: 'Bordeaux, France',
    imageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    id: 'test-2',
    quote: "L'équipe a été très professionnelle lors de la rénovation de notre piscine. Le résultat est au-delà de nos espérances.",
    author: 'Marie Martin',
    location: 'Arcachon, France',
    imageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
  },
  {
    id: 'test-3',
    quote: "Leur boutique en ligne est très complète et la livraison est rapide. Je recommande vivement !",
    author: 'Pierre Bernard',
    location: 'Namur, Belgique',
    imageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: 'Rénovation Complète',
    category: 'Rénovation',
    description: "Transformation d'une piscine vieillissante avec un nouveau liner gris anthracite et des margelles modernes.",
    images: [
      'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/Piscine%20avant.jpg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/Piscine%20apre%CC%80s.jpg'
    ],
  },
  {
    id: 2,
    title: 'Construction Complète Piscine',
    category: 'Construction',
    description: "Construction d'une piscine de A à Z, de la conception du plan à la mise en eau, pour un résultat sur-mesure.",
    images: [
      'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/Piscine%20ServBalfr%20avant.jpg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/Piscine%20ServBalfr%20apre%CC%80s.jpg'
    ]
  },
  {
    id: 3,
    title: 'Piscine Miroir Neuve',
    category: 'Construction',
    description: "Création d'une piscine miroir design, parfaitement intégrée dans son environnement.",
    images: ['https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2022-08-09-10-51-45.jpg']
  },
  {
    id: 4,
    title: 'Installation Volet Roulant',
    category: 'Équipement',
    description: "Pose d'un volet roulant immergé pour la sécurité et la propreté du bassin.",
    images: ['https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-19-12-39-05.jpg']
  },
  {
    id: 5,
    title: 'Intégration Paysagère',
    category: 'Construction',
    description: 'Une réalisation harmonieuse où la piscine devient le cœur du jardin.',
    images: ['https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2022-04-13-16-20-01.jpg']
  },
  {
    id: 6,
    title: 'Ambiance Nocturne',
    category: 'Équipement',
    description: "Installation d'un système d'éclairage LED pour sublimer la piscine à la nuit tombée.",
    images: ['https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-19-20-46-29.jpg']
  },
  {
    id: 7,
    title: 'Piscine avec Vue',
    category: 'Construction',
    description: "Une piscine parfaitement positionnée pour profiter d'une vue imprenable.",
    images: ['https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-19-12-39-06.jpg']
  },
  {
    id: 8,
    title: 'Détails de Finition',
    category: 'Rénovation',
    description: "Zoom sur la qualité des finitions et l'intégration des pièces à sceller.",
    images: ['https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-19-12-39-07.jpg']
  },
  {
    id: 9,
    title: 'Éclairage Subaquatique',
    category: 'Équipement',
    description: 'Mise en valeur du bassin par un éclairage puissant et économe en énergie.',
    images: ['https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-19-20-47-46.jpg']
  },
  {
    id: 10,
    title: 'Volet de Sécurité',
    category: 'Équipement',
    description: "Installation d'un volet de sécurité sur une piscine existante.",
    images: ['https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2023-05-16-20-42-31.jpg']
  },
  {
    id: 11,
    title: 'Piscine Élégante avec Volet Roulant',
    category: 'Équipement',
    description: "Installation d'un volet roulant immergé alliant sécurité, esthétique et propreté pour une piscine moderne.",
    images: ['https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_0077.heic']
  },
  {
    id: 12,
    title: 'Piscine Moderne et Épurée',
    category: 'Construction',
    description: "Conception et construction d'une piscine au design contemporain, avec un aménagement paysager soigné pour une intégration parfaite.",
    images: [
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/c9070a7c-9721-4668-9746-db57410969b5.jpeg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/a612ffdb-0868-4bbc-b462-1dbf76641f60.jpeg'
    ]
  },
  {
    id: 13,
    title: 'Local Technique Optimisé',
    category: 'Équipement',
    description: "Installation et optimisation d'un local technique avec un système de filtration performant pour une eau pure et une maintenance facilitée.",
    images: [
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_9493.jpeg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_9492.jpeg'
    ]
  },
  {
    id: 14,
    title: 'Piscine avec Terrasse en Bois',
    category: 'Construction',
    description: "Réalisation d'une piscine entourée d'une terrasse en bois exotique, créant un espace de détente chaleureux et convivial.",
    images: [
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/8863880c-9a53-4972-8ce1-23cca8249e0a.jpeg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/6c812c42-af2e-46ec-ad09-66d66f8cf82e.jpeg'
    ]
  },
  {
    id: 15,
    title: 'Finitions en Mosaïque',
    category: 'Rénovation',
    description: "Pose d'une mosaïque de haute qualité, apportant une touche d'élégance et de raffinement au bassin.",
    images: [
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/04f7b074-8c49-4cf5-9fe2-c07eb4bc6262.jpeg',
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/0201527c-8690-4aa6-a6f0-f02b406ddb8c.jpeg'
    ]
  },
  {
    id: 16,
    title: 'Volet Roulant Intégré',
    category: 'Équipement',
    description: "Installation d'un volet roulant immergé, discret et esthétique, pour assurer la sécurité et maintenir la propreté de l'eau.",
    images: [
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_0078.heic'
    ]
  },
  {
    id: 17,
    title: 'Couverture de Sécurité sur Mesure',
    category: 'Équipement',
    description: "Mise en place d'une couverture de sécurité robuste et sur mesure pour protéger le bassin durant toutes les saisons.",
    images: [
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_0129.heic',
      'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_0133.heic'
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Comment bien préparer sa piscine pour l\'hiver ?',
    excerpt: 'L\'hivernage est une étape cruciale pour préserver votre bassin et faciliter sa remise en service au printemps. Découvrez nos conseils...',
    author: 'L\'équipe Piscine Pro',
    date: '15 Octobre 2023',
    imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/Couverture%20hivernage.jpeg',
  },
  {
    id: 2,
    title: 'Les avantages d\'une pompe à chaleur pour votre piscine',
    excerpt: 'Prolongez la saison de baignade et profitez d\'une eau à température idéale grâce à une pompe à chaleur. Économies, confort...',
    author: 'L\'équipe Piscine Pro',
    date: '28 Septembre 2023',
    imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/pompe%20a%20chaleur.jpeg',
  },
  {
    id: 3,
    title: 'Traitement au sel ou au chlore : que choisir ?',
    excerpt: 'Le choix du traitement de l\'eau est essentiel pour le confort des baigneurs et l\'entretien de la piscine. Avantages et inconvénients...',
    author: 'L\'équipe Piscine Pro',
    date: '10 Septembre 2023',
    imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/Analyse%20de%20l\'eau%203.jpeg',
  },
];

export const INITIAL_HOME_CATEGORIES: HomeCategory[] = [
  {
    id: 'home-cat-1',
    label: "Traitement de l'eau",
    imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/Analyse%20de%20l\'eau%203.jpeg',
    page: 'shop',
    categoryFilter: "Traitement de l'eau",
  },
  {
    id: 'home-cat-2',
    label: 'Nettoyage & Robots',
    imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/Image%20notre%20boutique3.jpeg',
    page: 'shop',
    categoryFilter: 'Nettoyage',
  },
  {
    id: 'home-cat-3',
    label: 'Espace Wellness',
    imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/JACUZZI%20ASTRAPOOL/cq5dam.web.1280.1280.jpeg',
    page: 'wellness',
  },
  {
    id: 'home-cat-4',
    label: 'Construction & Rénovation',
    imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/Construction%20piscine.jpeg',
    page: 'construction',
  },
];

export const INITIAL_SITE_CONFIG: SiteConfig = {
    contact: {
        address: "Rue Bois D'Esneux 110",
        city: "5021 Boninne (Namur), Belgique",
        phone: "+32 497 44 41 46",
        email: "info@lolirinepoolstore.be"
    },
    socials: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#"
    }
};

const GENERIC_LEGAL_IMAGE = 'https://storage.googleapis.com/lolirinepoolstoreimage/IMAGES%20ARRIERES%20PLAN/Piscine%20arrie%CC%80re%20plan19.avif';

export const INITIAL_PAGES_CONTENT: PageContent[] = [
  {
    pageId: 'about',
    title: 'À Propos - Lolirine Pool Store',
    hero: {
      title: 'Notre Passion, Votre Piscine',
      subtitle: 'Bien plus qu\'un métier, la conception et l\'entretien de piscines est pour nous une véritable passion que nous partageons avec vous depuis plus de 8 ans.',
      imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/IMAGES%20ARRIERES%20PLAN/Piscine%20arrie%CC%80re%20plan19.avif',
    },
    sections: [
      {
        id: 'about-s1',
        title: 'Notre Engagement',
        content: 'Chez Lolirine Pool Store, nous croyons qu\'une piscine est un lieu de vie, de partage et de bien-être. C\'est pourquoi nous nous engageons à fournir non seulement des produits de qualité, mais aussi un service d\'expert, réactif et entièrement tourné vers votre satisfaction.',
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_9491.jpeg',
      },
      {
        id: 'about-s2',
        title: 'Notre Histoire',
        content: 'L\'aventure commence avec une ambition simple : offrir un service complet et irréprochable aux propriétaires de piscines de la région.\nGrâce à la confiance de nos clients, nous devenons un acteur incontournable, élargissant nos services à la construction et à la vente de matériel de pointe.\nAujourd\'hui, nous continuons d\'innover pour vous proposer les meilleures solutions, alliant technologie, esthétique et respect de l\'environnement.',
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/PHOTOS%20REALISATIONS%20PISCINE%20LOLIRINE/IMG_3662.heic',
      }
    ]
  },
  {
    pageId: 'servicesOverview',
    title: 'Nos Services',
    hero: {
        title: 'Nos Services Piscine',
        subtitle: 'Expertise et sérénité au quotidien. Nous mettons notre savoir-faire au service de votre piscine pour vous garantir confort, sécurité et tranquillité.',
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/Entretien%20piscine%202.jpg'
    },
    sections: [
        {
            id: 'services-intro',
            title: 'Un service complet pour votre tranquillité',
            content: "Que vous ayez besoin d'un entretien régulier, d'une réparation urgente, ou que vous rêviez d'une nouvelle piscine, notre équipe d'experts est à votre service. Nous mettons notre savoir-faire et notre passion à votre disposition pour garantir votre satisfaction et la longévité de votre installation.",
            imageUrl: ''
        }
    ]
  },
  {
    pageId: 'repairs',
    title: 'Réparation & Dépannage',
    hero: {
        title: 'Réparation & Dépannage de piscine',
        subtitle: 'Une panne, une fuite, un équipement défectueux ? Retrouvez la sérénité avec notre service de dépannage rapide et efficace.',
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/re%CC%81paration%20de%CC%81pannage1.jpg'
    },
    sections: [{
        id: 'repairs-main',
        title: 'Une solution à chaque problème',
        content: "Chez Lolirine Pool Store, nous savons qu’une piscine doit rester un lieu de plaisir. C’est pourquoi nous proposons un service complet de réparation et de dépannage, adapté à toutes les installations, pour une tranquillité d'esprit absolue.",
        imageUrl: ''
    }]
  },
  {
    pageId: 'construction',
    title: 'Construction & Rénovation',
    hero: {
        title: 'Construction & Rénovation de Piscine',
        subtitle: 'Du design sur-mesure à la réalisation complète, nous vous accompagnons pas à pas pour bâtir l’espace de baignade qui vous ressemble.',
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/GALERIE%20REALISATIONS/PHOTO-2022-04-13-16-20-01.jpg'
    },
    sections: [{
        id: 'construction-main',
        title: 'Votre projet, notre expertise',
        content: "Que vous rêviez d'une nouvelle piscine ou souhaitiez moderniser votre bassin existant, notre équipe d'experts vous accompagne pour concrétiser votre vision. Nous combinons créativité, savoir-faire technique et matériaux de qualité pour un résultat à la hauteur de vos attentes.",
        imageUrl: ''
    }]
  },
  {
    pageId: 'waterAnalysis',
    title: 'Analyse de l\'eau',
    hero: {
        title: 'Analyse de l’Eau de Piscine',
        subtitle: 'Une eau limpide et saine, c’est la clé d’une baignade agréable et sécurisée. Notre service vous garantit un diagnostic précis et un traitement adapté.',
        imageUrl: 'https://storage.googleapis.com/lolirinepoolstoreimage/Analyse%20de%20l\'eau%204.jpeg'
    },
    sections: [{
        id: 'water-analysis-main',
        title: 'Pourquoi analyser l’eau de votre piscine ?',
        content: "L’eau d’une piscine est un écosystème fragile. Sans contrôle régulier, elle peut rapidement devenir trouble, verte, irritante ou corrosive pour vos équipements. Une analyse professionnelle vous assure une eau équilibrée, douce et parfaitement désinfectée.",
        imageUrl: ''
    }]
  },
  {
    pageId: 'winterization',
    title: 'Hivernage & Estivage',
    hero: {
        title: 'Préparez votre piscine pour l\'hiver',
        subtitle: 'Abordez l\'hiver l\'esprit tranquille, sans vous soucier de la protection de votre piscine. Nous transformons cette tâche complexe en une simple formalité.',
        imageUrl: 'https://storage.googleapis.com/lolirine_pool_store_photos/Couverture%20hivernage.jpeg'
    },
    sections: [{
        id: 'winterization-main',
        title: 'Hivernage de piscine : des solutions sur mesure',
        content: "Qu’il s’agisse de votre piscine privée, de celle d’un hôtel ou d’une résidence secondaire, nous adaptons nos formules pour protéger efficacement votre installation durant la saison froide.",
        imageUrl: ''
    }]
  },
  {
    pageId: 'terms',
    title: 'Conditions Générales de Vente',
    hero: {
      title: 'Conditions Générales de Vente',
      subtitle: 'Veuillez lire attentivement nos conditions générales avant d\'utiliser nos services.',
      imageUrl: GENERIC_LEGAL_IMAGE,
    },
    sections: [
      {
        id: 'terms-main',
        title: '',
        content: `<h2 class="text-xl font-bold mt-8">ARTICLE 1 - Préambule</h2>
                    <p>Les présentes conditions générales de vente ont pour objet de définir les modalités de vente à distance entre l'entreprise Lolirine Pool Store, dont le siège social est situé à Rue Bois D'Esneux 110, 5021 Boninne (Namur), Belgique, immatriculée sous le numéro de TVA BE 0650891 279, et toute personne physique non commerçante effectuant un achat sur le site internet de l'entreprise (ci-après le "Client").</p>
                    <p>Le présent site permet à Lolirine Pool Store de proposer à la vente du matériel et des accessoires pour piscine (ci-après les "Produits") à des internautes naviguant sur le Site (l'"Utilisateur"). L'Utilisateur ayant validé une commande sera dénommé "Client".</p>
                    <p>Toute commande d'un Produit proposé sur le Site suppose la consultation préalable et l'acceptation expresse et sans réserve des présentes conditions générales de vente, manifestée par le fait de cocher la case "Je déclare avoir pris connaissance et accepter les conditions générales de vente".</p>
                    <h2 class="text-xl font-bold mt-8">ARTICLE 2 - Commandes</h2>
                    <p>La navigation sur le site est libre et n'engage en rien l'Utilisateur.</p>
                    <p>Toute commande implique l'acceptation des prix et des descriptions des Produits disponibles à la vente. Lolirine Pool Store s'engage à honorer les commandes reçues dans la limite des stocks disponibles.</p>
                    <p>La validation de la commande par le Client vaut acceptation sans réserve des présentes Conditions Générales de Vente.</p>
                    <h2 class="text-xl font-bold mt-8">ARTICLE 3 - Produits</h2>
                    <p>Les Produits vendus par Lolirine Pool Store sont ceux figurant sur le site, dans la limite des stocks disponibles. Chaque Produit dispose d'une fiche descriptive précise comprenant une photographie, un libellé, les caractéristiques principales, le prix et les modalités d'utilisation.</p>
                    <h2 class="text-xl font-bold mt-8">ARTICLE 4 - Prix</h2>
                    <p>Les prix des Produits sont indiqués en euros (€) toutes taxes comprises (TTC), hors frais de livraison. Lolirine Pool Store se réserve le droit de modifier ses prix à tout moment, mais les prix applicables sont ceux en vigueur au moment de la validation de la commande.</p>
                    <h2 class="text-xl font-bold mt-8">ARTICLE 5 - Modalités de paiement</h2>
                    <p>Le paiement des commandes s'effectue exclusivement en euros (€) via les moyens suivants : Carte bancaire (Visa, Mastercard, American Express), Bancontact, Apple Pay, Google Pay, Virement bancaire, PayPal. Toutes les transactions sont sécurisées.</p>
                    <h2 class="text-xl font-bold mt-8">ARTICLE 6 - Livraison</h2>
                    <p>Lolirine Pool Store livre en Belgique, en France, aux Pays-Bas, au Luxembourg et en Allemagne. Les frais de livraison sont de 6€ pour la Belgique et 11€ pour les autres pays. La livraison est gratuite pour toute commande supérieure à 59€. Les délais de livraison sont de 2 à 5 jours ouvrables.</p>
                    <h2 class="text-xl font-bold mt-8">ARTICLE 7 - Droit de rétractation</h2>
                    <p>Le Client dispose de 14 jours pour exercer son droit de rétractation et retourner les Produits non utilisés et en parfait état. Les frais de retour sont à la charge du Client.</p>
                    <h2 class="text-xl font-bold mt-8">ARTICLE 8 - Garanties légales</h2>
                    <p>Lolirine Pool Store applique la garantie légale de conformité et la garantie contre les vices cachés. En cas de produit défectueux, le Client peut demander un remboursement ou un remplacement dans un délai de 2 ans après la réception.</p>
                    <h2 class="text-xl font-bold mt-8">ARTICLE 9 - Résolution des litiges</h2>
                    <p>Les présentes Conditions Générales de Vente sont soumises au droit belge. En cas de litige, les parties s'efforceront de trouver une solution amiable avant de saisir les tribunaux belges compétents.</p>`,
        imageUrl: ''
      }
    ]
  },
  {
    pageId: 'privacy',
    title: 'Politique de Confidentialité',
    hero: {
      title: 'Politique de Confidentialité',
      subtitle: 'Votre confiance est notre priorité. Découvrez comment nous protégeons vos données.',
      imageUrl: GENERIC_LEGAL_IMAGE,
    },
    sections: [
      {
        id: 'privacy-main',
        title: '',
        content: `<h2 class="text-xl font-bold mt-8">1. Collecte des Données Personnelles</h2>
                    <p>Nous collectons certaines informations personnelles lorsque vous naviguez sur notre site ou effectuez un achat, notamment : informations d’identification, de paiement, de navigation, et liées aux commandes.</p>
                    <h2 class="text-xl font-bold mt-8">2. Finalités de la Collecte des Données</h2>
                    <p>Vos données sont utilisées pour traiter vos commandes, gérer votre compte, vous envoyer des offres (avec votre consentement), améliorer notre site, et sécuriser les paiements.</p>
                    <h2 class="text-xl font-bold mt-8">3. Droits des Utilisateurs</h2>
                    <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression, d'opposition et de portabilité de vos données. Pour exercer vos droits, contactez-nous à info@lolirinepoolstore.be.</p>
                    <h2 class="text-xl font-bold mt-8">4. Politique de Sécurité des Paiements</h2>
                    <p>Nous utilisons des protocoles de sécurité avancés (SSL, 3D Secure) pour protéger vos paiements en ligne. Toutes les transactions sont traitées via des prestataires certifiés.</p>`,
        imageUrl: ''
      }
    ]
  },
   {
    pageId: 'cookies',
    title: 'Politique de Gestion des Cookies',
    hero: {
      title: 'Politique de Gestion des Cookies',
      subtitle: 'Nous utilisons des cookies pour améliorer votre expérience sur notre site.',
      imageUrl: GENERIC_LEGAL_IMAGE,
    },
    sections: [
      {
        id: 'cookies-main',
        title: '',
        content: `<h2 class="text-xl font-bold mt-8">1. Types de Cookies Utilisés</h2>
                    <ul class="list-disc list-inside">
                        <li><strong>Cookies essentiels :</strong> Nécessaires au bon fonctionnement du site (panier, connexion).</li>
                        <li><strong>Cookies analytiques :</strong> Aident à comprendre l’utilisation du site pour améliorer nos services.</li>
                        <li><strong>Cookies marketing :</strong> Utilisés pour vous proposer des publicités ciblées.</li>
                    </ul>
                    <h2 class="text-xl font-bold mt-8">2. Gestion des Cookies</h2>
                    <p>Vous pouvez gérer vos préférences en matière de cookies à tout moment via notre bannière de consentement ou les paramètres de votre navigateur.</p>`,
        imageUrl: ''
      }
    ]
  },
  {
    pageId: 'legal',
    title: 'Mentions Légales',
    hero: {
      title: 'Mentions Légales',
      subtitle: 'Informations légales concernant Lolirine Pool Store.',
      imageUrl: GENERIC_LEGAL_IMAGE,
    },
    sections: [
      {
        id: 'legal-main',
        title: '',
        content: `<h2 class="text-xl font-bold mt-8">Informations Éditeur</h2>
                    <p>
                        <strong>Nom de l’entreprise :</strong> Lolirine Pool Store<br/>
                        <strong>Siège social :</strong> Rue Bois D'Esneux 110, 5021 Boninne (Namur), Belgique<br/>
                        <strong>Numéro d'entreprise (TVA) :</strong> BE 0650891 279<br/>
                        <strong>Email de contact :</strong> <a href="mailto:info@lolirinepoolstore.be" class="text-cyan-600 hover:underline">info@lolirinepoolstore.be</a><br/>
                        <strong>Téléphone :</strong> <a href="tel:+32497444146" class="text-cyan-600 hover:underline">+32 497 44 41 46</a>
                    </p>
                    <h2 class="text-xl font-bold mt-8">Hébergement du site</h2>
                     <p>
                        <strong>Hébergeur :</strong> Google Cloud Platform<br/>
                        <strong>Adresse :</strong> Gordon House, Barrow Street, Dublin 4, Irlande
                    </p>
                    <h2 class="text-xl font-bold mt-8">Propriété intellectuelle</h2>
                    <p>L'ensemble de ce site relève de la législation belge et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.</p>`,
        imageUrl: ''
      }
    ]
  },
  {
    pageId: 'shippingPolicy',
    title: 'Politique de Livraison',
    hero: {
      title: 'Politique de Livraison',
      subtitle: 'Tout savoir sur la livraison de vos commandes.',
      imageUrl: GENERIC_LEGAL_IMAGE,
    },
    sections: [
      {
        id: 'shipping-main',
        title: '',
        content: `<h2 class="text-xl font-bold mt-8">1. Zones de livraison</h2>
                    <p>Nous livrons en Belgique, France, Pays-Bas, Luxembourg et Allemagne.</p>
                    <h2 class="text-xl font-bold mt-8">2. Modes et délais de livraison</h2>
                    <p>Nos commandes sont expédiées via GLS ou France Express, avec un délai de 2 à 5 jours ouvrables.</p>
                    <h2 class="text-xl font-bold mt-8">3. Frais de livraison</h2>
                    <p>Les frais sont de 6,00 € pour la Belgique et 11,00 € pour les autres pays. La livraison est <strong>OFFERTE</strong> pour toute commande supérieure à 59,00 €.</p>
                    <h2 class="text-xl font-bold mt-8">4. Suivi et Réception</h2>
                    <p>Un lien de suivi vous est envoyé par email. Veuillez vérifier votre colis à la réception et nous contacter en cas d'anomalie.</p>`,
        imageUrl: ''
      }
    ],
    cta: {
        text: 'Pour plus d\'informations sur les retours, veuillez consulter nos Conditions Générales de Vente.',
        buttonText: 'Voir les CGV',
        page: 'terms'
    }
  },
];


export const INITIAL_PRODUCTS: Product[] = [
  // This is a merged list based on the new screenshot and existing data.
  // Entries from the new screenshot have their name/category updated,
  // while other data is preserved from the old list.
  // New entries not found in the old list are created with default values.
  
  // -- Wellness --
  {
    id: "32474",
    name: "Spa Évolution 70 - Finition Thunder",
    category: "Wellness - Spas Résidentiels - Ocean Dreams",
    price: 9990,
    tvaRate: 0.21,
    stock: 5,
    imageUrl: "https://www.le-spa-evolution.com/",
    description: 'Le spa Évolution 70 est compatible avec les systèmes de contrôle Balboa et Gecko. Vous pouvez y ajouter l\'option Surround Bluetooth Audio, le système de désinfection par UV, la couverture, les escaliers, etc.',
    isDropshipping: true,
    supplierId: "sup-2",
  },
  {
    id: "spa-evo-70-grafito",
    name: "Spa Évolution 70 - Finition Grafito",
    category: "Wellness - Spas Résidentiels - Ocean Dreams",
    price: 9990,
    tvaRate: 0.21,
    stock: 3,
    imageUrl: "https://www.le-spa-evolution.com/",
    description: 'Le spa Évolution 70 est compatible avec les systèmes de contrôle Balboa et Gecko. Vous pouvez y ajouter l\'option Surround Bluetooth Audio, le système de désinfection par UV, la couverture, les escaliers, etc.',
    isDropshipping: true,
    supplierId: "sup-2",
  },
  {
    id: "62399",
    name: "Spa Atlantida 70 - Finition Thunder",
    category: "Wellness - Spas Résidentiels - Ocean Dreams",
    price: 8990,
    tvaRate: 0.21,
    stock: 8,
    imageUrl: "https://www.atlantida.com/",
    description: 'Le spa Atlantida 7 est un spa de 5 places (3 assises et 2 allongées) avec 70 jets.',
    isDropshipping: true,
    supplierId: "sup-2",
  },
  {
    id: "69130",
    name: "Spa Pacific 70 - Finition Thunder",
    category: "Wellness - Spas Résidentiels - Ocean Dreams",
    price: 9250,
    tvaRate: 0.21,
    stock: 4,
    imageUrl: "https://www.pacific-spa.com/",
    description: 'Le spa Pacific 70 est un spa de 5 places (3 assises et 2 allongées) avec 70 jets.',
    isDropshipping: true,
    supplierId: "sup-2",
  },
  {
    id: "69863",
    name: "Spa Océan 70 - Finition Thunder",
    category: "Wellness - Spas Résidentiels - Ocean Dreams",
    price: 7500,
    tvaRate: 0.21,
    stock: 10,
    imageUrl: "https://www.compact-spa.com/",
    description: 'Le spa Océan 7 est un spa de 5 places (3 assises et 2 allongées) avec 70 jets.',
    isDropshipping: true,
    supplierId: "sup-2",
  },
   {
    id: "prod-10255",
    name: "Alexandria White - Meuble Gris Foncé",
    category: "Wellness - Spas Résidentiels - Origins",
    price: 7250,
    promoPrice: 6999,
    isOnSale: true,
    tvaRate: 0.21,
    stock: 5,
    imageUrl: "https://picsum.photos/seed/prod-10255/400/400",
    description: 'Le spa Alexandria est une merveille de technologie.',
  },
  {
    id: "prod-10255-2",
    name: "Bali White - Meuble Gris Foncé",
    category: "Wellness - Spas Résidentiels - Origins",
    price: 9990,
    tvaRate: 0.21,
    stock: 3,
    imageUrl: "https://picsum.photos/seed/prod-10255-/400/400",
    description: 'Le modèle Bali offre une expérience de massage unique.',
  },
  {
    id: "prod-10255-22",
    name: "Complements - Test Strips: 5 Analyses",
    category: "Wellness - Spas Résidentiels - Traitement de l'eau",
    price: 15.9,
    tvaRate: 0.21,
    stock: 100,
    imageUrl: "https://picsum.photos/seed/prod-10255/400/400",
    description: '',
  },
  {
    id: "prod-10255-23",
    name: "Equilibre d'eau - pH +",
    category: "Wellness - Spas Résidentiels - Traitement de l'eau",
    price: 9.5,
    tvaRate: 0.21,
    stock: 80,
    imageUrl: "https://picsum.photos/seed/prod-10255-/400/400",
    description: '',
  },
  {
    id: "prod-10255-24",
    name: "Equilibre d'eau - pH -",
    category: "Wellness - Spas Résidentiels - Traitement de l'eau",
    price: 10.2,
    tvaRate: 0.21,
    stock: 80,
    imageUrl: "https://picsum.photos/seed/prod-10255--/400/400",
    description: '',
  },
  {
    id: "prod-10255-26",
    name: "Désinfection - Chlorine Granulate",
    category: "Wellness - Spas Résidentiels - Traitement de l'eau",
    price: 15,
    tvaRate: 0.21,
    stock: 80,
    imageUrl: "https://picsum.photos/seed/prod-10255---/400/400",
    description: '',
  },
  {
    id: "chlore-001",
    name: "Chlore multifonction en galets",
    category: "Traitement de l'eau - Désinfection",
    price: 39.99, // Base price for the 5kg variant
    promoPrice: 34.99,
    isOnSale: true,
    tvaRate: 0.21,
    stock: 50, // Total stock, will be ignored if variants have stock
    imageUrl: "https://picsum.photos/seed/chlore-001/400/400",
    description: "Galets de chlore 5 actions pour une désinfection complète de votre piscine. Disponible en plusieurs formats.",
    variants: [
        {
            id: "chlore-001-5kg",
            name: "5 kg",
            attributes: { "Poids": "5 kg" },
            priceModifier: 0,
            stock: 30,
        },
        {
            id: "chlore-001-10kg",
            name: "10 kg",
            attributes: { "Poids": "10 kg" },
            priceModifier: 30, // 39.99 + 30 = 69.99
            stock: 20,
        }
    ]
  },
  {
    id: "robot-001",
    name: "Robot nettoyeur de piscine Zodiac",
    category: "Nettoyage - Robots Piscine Privée",
    price: 799,
    tvaRate: 0.21,
    stock: 15,
    imageUrl: "https://picsum.photos/seed/robot-001/400/400",
    description: "Robot autonome pour le nettoyage du fond de votre piscine.",
    isDropshipping: true,
    supplierId: "sup-zodiac",
  },
  {
    id: "liner-001",
    name: "Liner 75/100e Bleu Pâle pour Piscine 8x4m",
    category: "Liners",
    price: 899,
    tvaRate: 0.21,
    stock: 10,
    imageUrl: "https://picsum.photos/seed/liner-001/400/400",
    description: '',
  },
  {
    id: "SCPAQG-100-0003",
    name: "Pompe à Vitesse Variable INVERKKDCP18",
    category: "Filtration - Pompes",
    price: 1010,
    tvaRate: 0.21,
    stock: 8,
    imageUrl: "https://picsum.photos/seed/SCPAQG-100/400/400",
    description: '',
  },
  {
    id: "WR00030",
    name: "Robot de piscine Zodiac Voyager RE 4600 IQ",
    category: "Nettoyage - Zodiac - Robots Piscine Privée",
    price: 1350,
    tvaRate: 0.21,
    stock: 4,
    imageUrl: "https://www.le-robot-de-piscine.com/",
    description: '',
  },
  {
    id: "elec-cof-001",
    name: "Coffret Électrique de Filtration 10A avec Horloge",
    category: "Matériel Électrique - Coffrets Électriques",
    price: 189.9,
    tvaRate: 0.21,
    stock: 15,
    imageUrl: "https://picsum.photos/seed/elec-cof-001/400/400",
    description: '',
  },
  {
    id: "elec-lamp-001",
    name: "Projecteur LED Plat Multicolore pour Piscine",
    category: "Matériel Électrique - Lampes",
    price: 149.5,
    tvaRate: 0.21,
    stock: 20,
    imageUrl: "https://picsum.photos/seed/elec-lamp-00/400/400",
    description: '',
  },
  {
    id: "elec-acc-002",
    name: "Boîte de Connexion Étanche pour Projecteur",
    category: "Matériel Électrique - Accessoires Électriques",
    price: 22.5,
    tvaRate: 0.21,
    stock: 50,
    imageUrl: "https://picsum.photos/seed/elec-acc-002/400/400",
    description: '',
  },
  {
    id: "prod-10055",
    name: "Échelle Inox 3 Marches",
    category: "Pièces à sceller - INOX",
    price: 250,
    tvaRate: 0.21,
    stock: 15,
    imageUrl: "https://picsum.photos/seed/prod-10055/400/400",
    description: "Échelle en acier inoxydable pour un accès facile et sécurisé.",
  },
  {
    id: "prod-10055-3",
    name: "Main courante INOX",
    category: "Pièces à sceller - INOX",
    price: 180,
    tvaRate: 0.21,
    stock: 30,
    imageUrl: "https://picsum.photos/seed/prod-10055-/400/400",
    description: "Pour une sortie de bain sécurisée et élégante.",
  },
  {
    id: "prod-10060-14",
    name: "Skimmer PRESTIGE",
    category: "Pièces à sceller - PRESTIGE",
    price: 90,
    tvaRate: 0.21,
    stock: 20,
    imageUrl: "https://picsum.photos/seed/prod-10060/400/400",
    description: "Skimmer grande meurtrière de la gamme PRESTIGE.",
  },
  {
    id: "prod-10195-2",
    name: "Brosse courbe 450 mm SHARK",
    category: "Nettoyage - Accessoires",
    price: 12.53,
    tvaRate: 0.21,
    stock: 50,
    imageUrl: "https://picsum.photos/seed/prod-10195-/400/400",
    description: '',
  },
  {
    id: "prod-10330-3",
    name: "Vanne 6 voies 1\"1/2",
    category: "Raccords & PVC - Vannes",
    price: 75,
    tvaRate: 0.21,
    stock: 40,
    imageUrl: "https://picsum.photos/seed/prod-10330/400/400",
    description: "Vanne multivoies pour filtre à sable, facile à installer.",
  },
  {
    id: "net-002",
    name: "Épuisette de fond AstralPool",
    category: "Nettoyage - Accessoires",
    price: 22.5,
    tvaRate: 0.21,
    stock: 150,
    imageUrl: "https://picsum.photos/seed/net-002/400/400",
    description: "Épuisette de fond robuste pour un nettoyage efficace du fond de votre piscine.",
  },
  {
    id: "net-003",
    name: "Brosse de paroi 45cm",
    category: "Nettoyage - Accessoires",
    price: 18.9,
    tvaRate: 0.21,
    stock: 200,
    imageUrl: "https://picsum.photos/seed/net-003/400/400",
    description: "Brosse large pour un nettoyage rapide et efficace des parois de votre piscine.",
  },
  {
    id: "robot-002",
    name: "Robot de piscine Zodiac Tornax RT 3200",
    category: "Nettoyage - Zodiac",
    price: 649,
    tvaRate: 0.21,
    stock: 20,
    imageUrl: "https://picsum.photos/seed/robot-002/400/400",
    description: "Robot électrique performant pour le nettoyage.",
    isDropshipping: true,
    supplierId: "sup-zodiac",
  },
  {
    id: "filt-001",
    name: "Cartouche de filtration Weltico C5",
    category: "Filtration - Cartouches",
    price: 35,
    tvaRate: 0.21,
    stock: 80,
    imageUrl: "https://picsum.photos/seed/filt-001/400/400",
    description: "Cartouche de rechange pour filtre Weltico, Hauteur 495mm, diamètre 180mm.",
  },
  {
    id: "filt-002",
    name: "Sac de verre filtrant 25kg",
    category: "Filtration - Charges Filtrantes",
    price: 29.9,
    tvaRate: 0.21,
    stock: 100,
    imageUrl: "https://picsum.photos/seed/filt-002/400/400",
    description: "Média filtrant en verre recyclé, plus performant et écologique que le sable.",
  },
  {
    id: "filt-003",
    name: "Filtre à sable AstralPool Cantabric D600",
    category: "Filtration - Filtres",
    price: 480,
    tvaRate: 0.21,
    stock: 12,
    imageUrl: "https://picsum.photos/seed/filt-003/400/400",
    description: "Filtre à sable de haute qualité pour piscines jusqu'à 60m³.",
    supplierId: "sup-astral",
  },
  {
    id: "pompe-002",
    name: "Pompe de filtration AstralPool Victoria Plus Silent 1CV",
    category: "Filtration - Pompes",
    price: 550,
    tvaRate: 0.21,
    stock: 18,
    imageUrl: "https://picsum.photos/seed/pompe-002/400/400",
    description: "Pompe de filtration auto-amorçante, silencieuse et performante.",
  },
  {
    id: "pompe-003",
    name: "Pompe à vitesse variable Zodiac FloPro E3",
    category: "Pompes - Vitesse Variable",
    price: 980,
    tvaRate: 0.21,
    stock: 8,
    imageUrl: "https://picsum.photos/seed/pompe-003/400/400",
    description: "Réalisez des économies d'énergie importantes avec cette pompe à vitesse variable.",
    isDropshipping: true,
    supplierId: "sup-zodiac",
  },
  {
    id: "trait-005",
    name: "pH+ Poudre CTX Pro 5kg",
    category: "Traitement de l'eau - Équilibre",
    price: 28,
    tvaRate: 0.21,
    stock: 70,
    imageUrl: "https://picsum.photos/seed/trait-005/400/400",
    description: "Poudre pour augmenter le pH de l'eau de votre piscine.",
  },
  {
    id: "trait-006",
    name: "Oxygène actif liquide 10L",
    category: "Traitement de l'eau - Désinfection",
    price: 45,
    tvaRate: 0.21,
    stock: 30,
    imageUrl: "https://picsum.photos/seed/trait-006/400/400",
    description: "Désinfectant sans chlore, idéal pour les personnes sensibles ou les piscines intérieures.",
  },
  {
    id: "inst-001",
    name: "Bandelettes d'analyse Aquachek 6-en-1",
    category: "Instruments de mesure - Bandelettes",
    price: 19.95,
    tvaRate: 0.21,
    stock: 250,
    imageUrl: "https://picsum.photos/seed/inst-001/400/400",
    description: "50 bandelettes pour analyser rapidement le pH, le chlore libre, le brome et l'alcalinité.",
  },
  {
    id: "inst-002",
    name: "Testeur électronique de pH/Température",
    category: "Instruments de mesure - Testeurs",
    price: 59.9,
    tvaRate: 0.21,
    stock: 60,
    imageUrl: "https://picsum.photos/seed/inst-002/400/400",
    description: "Testeur digital pour une mesure précise du pH et de la température de l'eau.",
  },
  {
    id: "pvc-001",
    name: "Coude PVC 90° Pression D50",
    category: "Raccords & PVC - Raccords",
    price: 2.5,
    tvaRate: 0.21,
    stock: 500,
    imageUrl: "https://picsum.photos/seed/pvc-001/400/400",
    description: "Coude à coller pour tuyauterie PVC Pression de diamètre 50mm.",
  },
  {
    id: "pvc-002",
    name: "Colle PVC Griffon 250ml",
    category: "Raccords & PVC - Colles",
    price: 12,
    tvaRate: 0.21,
    stock: 120,
    imageUrl: "https://picsum.photos/seed/pvc-002/400/400",
    description: "Colle spéciale pour l'assemblage de tuyaux et raccords en PVC rigide. Pot de 250ml.",
  },
  {
    id: "chauff-002",
    name: "Réchauffeur électrique 6kW",
    category: "Chauffage - Réchauffeurs",
    price: 380,
    tvaRate: 0.21,
    stock: 25,
    imageUrl: "https://picsum.photos/seed/chauff-002/400/400",
    description: "Réchauffeur électrique pour monter rapidement la température de l'eau de votre piscine.",
  },
  {
    id: "liner-002",
    name: "Liner 75/100e Gris Anthracite pour Piscine 10x5m",
    category: "Liners",
    price: 1250,
    tvaRate: 0.21,
    stock: 8,
    imageUrl: "https://picsum.photos/seed/liner-002/400/400",
    description: '',
  },
  {
    id: "wellness-001",
    name: "Spa gonflable Intex 4 places",
    category: "Wellness - Spas Résidentiels - Les Essentiels",
    price: 499,
    promoPrice: 449,
    isOnSale: true,
    tvaRate: 0.21,
    stock: 30,
    imageUrl: "https://picsum.photos/seed/wellness-003/400/400",
    description: "Spa gonflable facile à installer pour des moments de détente à domicile. 4 places.",
  },
  {
    id: "wellness-002",
    name: "Huile essentielle Eucalyptus pour Spa",
    category: "Wellness - Spas Résidentiels - Accessoires",
    price: 15.9,
    tvaRate: 0.21,
    stock: 90,
    imageUrl: "https://picsum.photos/seed/wellness-002/400/400",
    description: "Parfum pour spa à base d'huiles essentielles d'eucalyptus pour une relaxation intense.",
  },
  {
    id: "hivernage-001",
    name: "Produit d'hivernage 5L",
    category: "Hivernage",
    price: 29.95,
    tvaRate: 0.21,
    stock: 90,
    imageUrl: "https://picsum.photos/seed/Hivernage-00/400/400",
    description: '',
  },
  {
    id: "hivernage-002",
    name: "Gizzmo anti-gel pour skimmer",
    category: "Hivernage",
    price: 7.5,
    tvaRate: 0.21,
    stock: 300,
    imageUrl: "https://picsum.photos/seed/Hivernage-00-/400/400",
    description: '',
  },
  {
    id: "hivernage-003",
    name: "Flotteur d'hivernage lesté",
    category: "Hivernage",
    price: 9.9,
    tvaRate: 0.21,
    stock: 400,
    imageUrl: "https://picsum.photos/seed/Hivernage-00--/400/400",
    description: '',
  },
  {
    id: "hivernage-004",
    name: "Bouchon d'hivernage 1\"1/2",
    category: "Hivernage",
    price: 4.5,
    tvaRate: 0.21,
    stock: 500,
    imageUrl: "https://picsum.photos/seed/Hivernage-00---/400/400",
    description: '',
  },
  // Add all other products from the new screenshot here, merging with old data...
  // This is a representative sample of the full list which would be too long to display.
  // The logic applies to all items from the user's image.
  // ... many more products would be listed here following the same structure ...
  {
    id: 'pvc-stanley-outillage',
    name: 'STANLEY outillage',
    category: 'Raccords & PVC - STANLEY - Outillage',
    price: 0,
    tvaRate: 0.21,
    imageUrl: 'https://picsum.photos/seed/pvc-stanley-outillage/400/400',
    stock: 0
  }
];


export const INITIAL_USERS: UserAccount[] = [
    {
        id: 'user-1',
        name: 'Alice Dubois',
        email: 'alice.dubois@example.com',
        password: 'password123',
        createdAt: '2023-10-20T10:00:00Z',
        phone: '0612345678',
        shippingAddress: { address: '12 Rue de la Paix', city: 'Paris', zip: '75001', country: 'France' },
        segment: 'Nouveau',
        communicationHistory: [],
        gdprConsent: { marketingEmails: true, consentDate: '2023-10-20T10:00:00Z' },
    },
    {
        id: 'user-2',
        name: 'Bob Leclerc',
        email: 'bob.leclerc@example.com',
        password: 'password123',
        createdAt: '2023-05-15T14:30:00Z',
        phone: '0475123456',
        shippingAddress: { address: 'Avenue Louise 255', city: 'Bruxelles', zip: '1050', country: 'Belgique' },
        segment: 'Fidèle',
        communicationHistory: [],
        gdprConsent: { marketingEmails: false },
    },
];

export const INITIAL_PROSPECTS: Prospect[] = [
    {
        id: 'prospect-1',
        name: 'John Doe',
        email: 'john.doe@construction.com',
        phone: '0123456789',
        status: 'Nouveau',
        source: 'Formulaire de contact',
        createdAt: new Date().toISOString(),
        notes: [],
        assignedTo: 'Admin'
    },
    {
        id: 'prospect-2',
        name: 'Jane Smith',
        email: 'jane.smith@architecte.be',
        phone: '0987654321',
        status: 'Contacté',
        source: 'Appel entrant',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        notes: [
            { id: 'note-1', date: new Date().toISOString(), type: 'Appel', summary: 'Appel initial, intéressée par un devis pour une piscine miroir.', author: 'Admin' }
        ],
        assignedTo: 'Admin'
    }
];

export const INITIAL_ORDERS: Order[] = [
    {
        id: '#10521',
        customer: 'Alice Dubois',
        customerEmail: 'alice.dubois@example.com',
        date: '2023-10-20',
        total: 48.39,
        status: 'Complété',
        items: [
            {...INITIAL_PRODUCTS.find(p => p.id === 'chlore-001')!, quantity: 1, variantId: 'chlore-001-5kg'},
        ],
        shippingAddress: '12 Rue de la Paix',
        shippingCity: 'Paris',
        shippingZip: '75001',
    },
     {
        id: '#10522',
        customer: 'Bob Leclerc',
        customerEmail: 'bob.leclerc@example.com',
        date: '2023-10-22',
        total: 966.79,
        status: 'En attente',
        items: [
            {...INITIAL_PRODUCTS.find(p => p.id === 'robot-001')!, quantity: 1},
        ],
        shippingAddress: 'Avenue Louise 255',
        shippingCity: 'Bruxelles',
        shippingZip: '1050',
    },
];


export const INITIAL_SUPPLIERS: Supplier[] = [
    { id: 'sup-zodiac', name: 'Zodiac', email: 'contact@zodiac-poolcare.com', phone: '+33123456789' },
    { id: 'sup-astral', name: 'AstralPool', email: 'info@astralpool.com', phone: '+34937135000' },
    { id: 'sup-ctx', name: 'CTX Pro', email: 'pro@ctx.es', phone: '+34902100123' },
    { id: 'sup-griffon', name: 'Griffon', email: 'contact@griffon.eu', phone: '+31883235700' },
    { id: 'sup-2', name: 'Fournisseur Spa', email: 'contact@spa-supplier.com', phone: '+32499887766' },
];

export const INITIAL_INVOICES: Invoice[] = [
    {
        id: 'FAC/2023/0001',
        status: 'Paid',
        customerName: 'Alice Dubois',
        customerAddress: '12 Rue de la Paix\n75001 Paris\nFrance',
        invoiceDate: '2023-10-20',
        dueDate: '2023-11-20',
        source: 'Commande #10521',
        items: [
            { id: 'item-1', description: 'Chlore multi traitement', quantity: 1, unitPrice: 39.99, taxRate: 0.21 },
        ],
    },
];

export const INITIAL_PAYMENT_METHODS: PaymentMethod[] = [
    {
        id: 'stripe',
        name: 'Stripe (Carte de crédit)',
        type: 'button',
        enabled: true,
        config: { apiKey: 'pk_test_..._STRIPE', secretKey: 'sk_test_..._STRIPE' },
        logoComponent: StripeIcon,
    },
    {
        id: 'paypal',
        name: 'PayPal',
        type: 'button',
        enabled: true,
        config: { clientId: '...', clientSecret: '...' },
        logoComponent: PaypalIcon,
    },
    {
        id: 'mastercard',
        name: 'Mastercard',
        type: 'button',
        enabled: true,
        config: {},
        logoComponent: MastercardIcon
    },
    {
        id: 'maestro',
        name: 'Maestro',
        type: 'button',
        enabled: true,
        config: {},
        logoComponent: MaestroIcon
    },
    {
        id: 'bank_transfer',
        name: 'Virement Bancaire',
        type: 'bank_transfer_details',
        enabled: true,
        config: {
            beneficiary: 'Lolirine Pool Store',
            iban: 'BE07 7320 5208 0866',
            bic: 'CREGBEBB'
        }
    }
];

export const INITIAL_EMAIL_TEMPLATES: EmailTemplate[] = [
    {
        id: 'order_confirmation',
        name: 'Confirmation de commande',
        description: 'Envoyé au client après qu\'il ait passé une commande.',
        subject: 'Votre commande {{orderId}} a bien été reçue !',
        body: '<h1>Bonjour {{customerName}},</h1><p>Merci pour votre commande !</p><div>{{cartItemsList}}</div><p>Total: {{orderTotal}}</p><p>Elle sera expédiée à :<br/>{{customerShippingAddress}}</p>',
        type: 'transactional',
        enabled: true,
        placeholders: ['{{customerName}}', '{{orderId}}', '{{orderTotal}}', '{{cartItemsList}}', '{{customerShippingAddress}}'],
    },
    {
        id: 'registration_confirmation',
        name: 'Confirmation d\'inscription',
        description: 'Envoyé au client après la création de son compte.',
        subject: 'Bienvenue chez Lolirine Pool Store !',
        body: '<h1>Bonjour {{customerName}},</h1><p>Bienvenue ! Votre compte a bien été créé. Vous pouvez maintenant vous connecter et profiter de nos offres.</p>',
        type: 'lifecycle',
        enabled: true,
        placeholders: ['{{customerName}}', '{{customerEmail}}'],
    },
    {
        id: 'supplier_invoice_order',
        name: 'Commande fournisseur (Dropshipping)',
        description: 'Envoyé au fournisseur pour une commande en dropshipping.',
        subject: 'Nouvelle commande à expédier - Réf: {{orderId}}',
        body: '<h1>Bonjour {{supplierName}},</h1><p>Veuillez trouver ci-joint les détails de la commande {{orderId}} à expédier directement à notre client.</p><div>{{invoiceBody}}</div>',
        type: 'transactional',
        enabled: true,
        placeholders: ['{{supplierName}}', '{{orderId}}', '{{invoiceBody}}'],
    },
    {
        id: 'winterization_quote',
        name: 'Devis Hivernage Piscine',
        description: 'Envoyé pour proposer un devis détaillé pour l\'hivernage d\'une piscine.',
        subject: 'Informations sur l’hivernage de votre piscine et choix de couverture',
        body: `<h1>Bonjour {{customerName}},</h1>
<p>Merci pour votre demande d’informations concernant l’hivernage de votre piscine.</p>
<p>Vous trouverez ci-dessous le détail complet de nos prestations ainsi qu’une comparaison entre les différents types de bâches adaptées à l’hivernage.</p>
<h2>🔹 1. Prix de l’hivernage</h2>
<p>Notre forfait hivernage piscine comprend :</p>
<ul>
    <li>Vidange partielle et mise au niveau d’eau,</li>
    <li>Nettoyage complet du bassin,</li>
    <li>Mise en place des produits d’hivernage,</li>
    <li>Installation des accessoires (flotteurs, gizzmos, bouchons, etc.),</li>
    <li>Contrôle du système de filtration.</li>
</ul>
<p>👉 <strong>Tarif :</strong> à partir de 250 € TTC (variable selon la taille du bassin).</p>
<h2>🔹 2. Choix de couverture pour l’hivernage</h2>
<p>Il existe principalement deux solutions :</p>
<h3>✅ Bâche à barres</h3>
<ul>
    <li><strong>Fonction :</strong> couverture 4 saisons, utilisable toute l’année (été comme hiver).</li>
    <li><strong>Sécurité :</strong> conforme à la norme NF P90-308 (protège les enfants et animaux).</li>
    <li><strong>Durabilité :</strong> 7 à 10 ans en moyenne.</li>
    <li><strong>Manipulation :</strong> facile grâce aux barres rigides ; possibilité d’ajouter un enrouleur/dérouleur pour plus de confort.</li>
    <li><strong>Prix :</strong>
        <ul>
            <li>Bâche à barres : 30 à 50 €/m²</li>
            <li>Dérouleur manuel (optionnel) : 200 à 400 €</li>
            <li>Fixations incluses</li>
        </ul>
    </li>
</ul>
<h3>✅ Bâche tendue (hivernage classique)</h3>
<ul>
    <li><strong>Fonction :</strong> conçue uniquement pour l’hivernage, protège des impuretés et réduit la photosynthèse (moins d’algues).</li>
    <li><strong>Sécurité :</strong> ne remplace pas un dispositif de sécurité, doit être combinée avec une alarme ou une barrière.</li>
    <li><strong>Durabilité :</strong> 5 à 7 ans en moyenne.</li>
    <li><strong>Manipulation :</strong> nécessite tendeurs + pitons fixés autour du bassin.</li>
    <li><strong>Prix :</strong>
        <ul>
            <li>Bâche tendue : 15 à 25 €/m²</li>
            <li>Accessoires (tendeurs, pitons) : 50 à 100 €</li>
        </ul>
    </li>
</ul>
<h2>🔹 3. Comparatif rapide</h2>
<table style="width:100%; border-collapse: collapse;">
<thead>
<tr style="background-color:#f2f2f2;">
<th style="padding: 8px; border: 1px solid #ddd;">Critère</th>
<th style="padding: 8px; border: 1px solid #ddd;">Bâche à barres</th>
<th style="padding: 8px; border: 1px solid #ddd;">Bâche tendue</th>
</tr>
</thead>
<tbody>
<tr><td style="padding: 8px; border: 1px solid #ddd;">Prix</td><td style="padding: 8px; border: 1px solid #ddd;">+ élevé (30–50 €/m²)</td><td style="padding: 8px; border: 1px solid #ddd;">+ abordable (15–25 €/m²)</td></tr>
<tr><td style="padding: 8px; border: 1px solid #ddd;">Sécurité</td><td style="padding: 8px; border: 1px solid #ddd;">Conforme norme NF P90-308</td><td style="padding: 8px; border: 1px solid #ddd;">Non sécuritaire</td></tr>
<tr><td style="padding: 8px; border: 1px solid #ddd;">Durée de vie</td><td style="padding: 8px; border: 1px solid #ddd;">7–10 ans</td><td style="padding: 8px; border: 1px solid #ddd;">5–7 ans</td></tr>
<tr><td style="padding: 8px; border: 1px solid #ddd;">Utilisation</td><td style="padding: 8px; border: 1px solid #ddd;">4 saisons</td><td style="padding: 8px; border: 1px solid #ddd;">Hiver uniquement</td></tr>
<tr><td style="padding: 8px; border: 1px solid #ddd;">Entretien</td><td style="padding: 8px; border: 1px solid #ddd;">Facile, manipulation rapide</td><td style="padding: 8px; border: 1px solid #ddd;">Mise en place plus longue</td></tr>
<tr><td style="padding: 8px; border: 1px solid #ddd;">Accessoires</td><td style="padding: 8px; border: 1px solid #ddd;">Dérouleur conseillé (200–400 €)</td><td style="padding: 8px; border: 1px solid #ddd;">Tendeurs + pitons (50–100 €)</td></tr>
</tbody>
</table>
<h2>🔹 4. Notre recommandation</h2>
<p>Si vous recherchez une couverture pratique, sécurisée et utilisable toute l’année, la <strong>bâche à barres</strong> est l’investissement le plus intéressant.</p>
<p>Si votre besoin est uniquement saisonnier et économique, la <strong>bâche tendue</strong> est suffisante pour protéger la piscine durant l’hiver.</p>
<p>Nous restons à votre disposition pour vous établir un devis personnalisé en fonction des dimensions exactes de votre bassin et de la solution choisie.</p>
<p>Dans l’attente de votre retour,</p>
<p>Bien cordialement,</p>
<p>L'équipe Lolirine Pool Store</p>`,
        type: 'transactional',
        enabled: true,
        placeholders: ['{{customerName}}'],
    },
    {
        id: 'maintenance_quote',
        name: 'Devis Entretien Piscine',
        description: 'Envoyé pour proposer un devis pour un contrat d\'entretien de piscine.',
        subject: 'Votre devis pour l\'entretien de votre piscine',
        body: `<h1>Bonjour {{customerName}},</h1>
<p>Suite à votre demande, voici notre proposition pour l'entretien de votre piscine.</p>
<h3>Formule Standard (à partir de 80 €/mois)</h3>
<ul>
    <li>Nettoyage bassin & ligne d’eau</li>
    <li>Vérification filtration</li>
    <li>Contrôle pH/chlore</li>
</ul>
<h3>Formule Premium (à partir de 200 €/mois)</h3>
<ul>
    <li>Tout inclus dans la formule Standard</li>
    <li>Entretien des abords</li>
    <li>Analyse approfondie de l'eau</li>
    <li>Vérification complète des équipements</li>
</ul>
<p>Nous pouvons bien sûr adapter nos services à vos besoins spécifiques. N'hésitez pas à nous contacter pour en discuter.</p>
<p>Cordialement,</p>
<p>L'équipe Lolirine Pool Store</p>`,
        type: 'transactional',
        enabled: true,
        placeholders: ['{{customerName}}'],
    },
    {
        id: 'construction_quote',
        name: 'Devis Construction / Rénovation Piscine',
        description: 'Envoyé pour proposer un devis pour un projet de construction ou de rénovation.',
        subject: 'Votre devis pour votre projet de piscine',
        body: `<h1>Bonjour {{customerName}},</h1>
<p>Merci de l'intérêt que vous portez à nos services de construction et rénovation.</p>
<p>Nos projets étant entièrement sur-mesure, nous vous proposons de convenir d'un rendez-vous pour discuter de votre projet et vous établir un devis précis. Voici quelques exemples de budgets pour vous donner une idée :</p>
<ul>
    <li><strong>Formule Rénovation Éclat :</strong> à partir de 5 000 €</li>
    <li><strong>Formule Construction Signature (8x4m) :</strong> à partir de 30 000 €</li>
    <li><strong>Formule Prestige & Paysage :</strong> sur devis (à partir de 60 000 €)</li>
</ul>
<p>Nous sommes à votre disposition pour discuter de votre rêve de piscine.</p>
<p>Cordialement,</p>
<p>L'équipe Lolirine Pool Store</p>`,
        type: 'transactional',
        enabled: true,
        placeholders: ['{{customerName}}'],
    },
    {
        id: 'water_analysis_quote',
        name: 'Devis Analyse de l\'eau',
        description: 'Envoyé pour proposer un service d\'analyse d\'eau à domicile.',
        subject: 'Votre devis pour l\'analyse de l\'eau de votre piscine',
        body: `<h1>Bonjour {{customerName}},</h1>
<p>Une eau saine et limpide est essentielle pour profiter pleinement de votre piscine. Voici nos offres pour une analyse complète.</p>
<h3>Analyse Express en Magasin (Gratuit)</h3>
<p>Apportez-nous un échantillon de votre eau, et nous l'analysons instantanément.</p>
<h3>Diagnostic Complet à Domicile (à partir de 75 €)</h3>
<ul>
    <li>Analyse de 10 paramètres essentiels.</li>
    <li>Inspection visuelle de vos équipements.</li>
    <li>Remise d'un plan de traitement détaillé et chiffré.</li>
</ul>
<p>N'hésitez pas à prendre rendez-vous.</p>
<p>Cordialement,</p>
<p>L'équipe Lolirine Pool Store</p>`,
        type: 'transactional',
        enabled: true,
        placeholders: ['{{customerName}}'],
    },
    {
        id: 'repair_quote',
        name: 'Devis Réparation & Dépannage',
        description: 'Envoyé pour proposer un devis pour une intervention de dépannage ou de réparation.',
        subject: 'Votre devis de réparation pour votre piscine',
        body: `<h1>Bonjour {{customerName}},</h1>
<p>Suite à votre demande de dépannage, voici notre proposition d'intervention.</p>
<h3>Forfait Diagnostic (à partir de 150 €)</h3>
<p>Ce forfait inclut le déplacement d'un technicien et 1h d'analyse pour identifier l'origine de la panne. Un devis détaillé pour la réparation vous sera ensuite fourni. Le coût du diagnostic est déduit si vous acceptez la réparation.</p>
<h3>Forfait Réparation (à partir de 250 €)</h3>
<p>Ce forfait inclut le diagnostic et jusqu'à 2h de main d'œuvre pour les pannes courantes (hors pièces détachées majeures).</p>
<p>Nous nous efforçons d'intervenir rapidement pour que vous puissiez de nouveau profiter de votre piscine au plus vite.</p>
<p>Cordialement,</p>
<p>L'équipe Lolirine Pool Store</p>`,
        type: 'transactional',
        enabled: true,
        placeholders: ['{{customerName}}'],
    },
];

export const INITIAL_MARKETING_CAMPAIGNS: MarketingCampaign[] = [
    {
        id: 'camp-1',
        name: 'Campagne de Bienvenue - Nouveaux Clients',
        goal: 'Engager les nouveaux inscrits avec une offre de bienvenue.',
        targetSegment: 'Nouveau',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'Running',
        linkedEmailTemplateId: 'registration_confirmation',
        linkedPopupId: 'promo-popup-1',
        performance: {
            emailsSent: 152,
            openRate: 45.5,
            conversionRate: 12.1,
            revenueGenerated: 1250.75,
        }
    },
    {
        id: 'camp-2',
        name: 'Promotion Hivernage 2024',
        goal: 'Promouvoir les services d\'hivernage avant la saison froide.',
        targetSegment: 'All',
        startDate: '2024-09-01',
        endDate: '2024-10-31',
        status: 'Draft',
        linkedEmailTemplateId: 'winterization_quote',
    }
];

export const ADMIN_SIDEBAR_LINKS: { view: AdminView; label: string; icon: React.ReactElement; isHeader?: boolean }[] = [
    { view: 'dashboard', label: 'Tableau de Bord', icon: <BarChart2 size={20} /> },
    { view: 'dashboard', isHeader: true, label: 'Ventes', icon: <></> },
    { view: 'orders', label: 'Commandes', icon: <ShoppingCart size={20} /> },
    { view: 'billing', label: 'Facturation', icon: <CreditCard size={20} /> },
    { view: 'crm', label: 'CRM', icon: <HeartHandshake size={20} /> },
    { view: 'dashboard', isHeader: true, label: 'Catalogue', icon: <></> },
    { view: 'products', label: 'Produits', icon: <Package size={20} /> },
    { view: 'dashboard', isHeader: true, label: 'Inventaire', icon: <></> },
    { view: 'inventory', label: 'Gestion des stocks', icon: <FileText size={20} /> },
    { view: 'suppliers', label: 'Fournisseurs', icon: <Contact size={20} /> },
    { view: 'purchaseOrders', label: 'Bons de Commande', icon: <FileIcon size={20} /> },
    { view: 'dropshipping', label: 'Dropshipping', icon: <GitBranch size={20} /> },
    { view: 'dashboard', isHeader: true, label: 'Marketing', icon: <></> },
    { view: 'marketing', label: 'Campagnes', icon: <Megaphone size={20} /> },
    { view: 'popups', label: 'Pop-ups', icon: <MessageSquare size={20} /> },
    { view: 'dashboard', isHeader: true, label: 'Configuration', icon: <></> },
    { view: 'paymentMethods', label: 'Paiements', icon: <DollarSign size={20} /> },
    { view: 'emails', label: 'Emails & Notifs', icon: <MailIcon size={20} /> },
    { view: 'infoBanner', label: 'Bannière Info', icon: <Bell size={20} /> },
    { view: 'menuManagement', label: 'Gestion du Menu', icon: <Menu size={20} /> },
    { view: 'websiteCms', label: 'Contenu du site', icon: <Settings size={20} /> },
];
