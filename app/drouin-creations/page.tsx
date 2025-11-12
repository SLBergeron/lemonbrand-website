"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart, Printer, Mail, Calendar, X, Plus, Check, Globe } from "lucide-react";
import { useCalEmbed } from "@/app/hooks/useCalEmbed";
import { CONSTANTS } from "@/constants/links";

type Language = 'en' | 'fr';

// Language Toggle Component
function LanguageToggle({ language, setLanguage }: { language: Language; setLanguage: (lang: Language) => void }) {
  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-neutral-500" />
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
          language === 'en'
            ? 'bg-orange-500 text-white'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
        }`}
      >
        EN
      </button>
      <span className="text-neutral-300 dark:text-neutral-600">|</span>
      <button
        onClick={() => setLanguage('fr')}
        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
          language === 'fr'
            ? 'bg-orange-500 text-white'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
        }`}
      >
        FR
      </button>
    </div>
  );
}

// Types
interface CartItem {
  id: string;
  name: string;
  regularPrice: number;
  drouinPrice: number;
  delivery: string;
  deliveryDays: number;
  recurring?: {
    regularPrice: number;
    drouinPrice: number;
    period: string;
  };
  lineItems?: {
    label: string;
    value: string;
  }[];
}

// Service data
const WEBSITES_SERVICES = [
  { id: "landing", name: "Landing Page", regular: 1200, drouin: 900, delivery: "1 week", days: 7 },
  { id: "small-site", name: "Small Business Site (3-5 pages)", regular: 3500, drouin: 2625, delivery: "2 weeks", days: 14 },
  { id: "pro-site", name: "Professional Site (6-10 pages)", regular: 6500, drouin: 4875, delivery: "3 weeks", days: 21 },
  { id: "ecom-basic", name: "E-commerce Store (basic)", regular: 4500, drouin: 3375, delivery: "3 weeks", days: 21 },
  { id: "ecom-standard", name: "E-commerce Store (standard)", regular: 7500, drouin: 5625, delivery: "4 weeks", days: 28 },
  { id: "redesign", name: "Website Redesign", regular: 2500, drouin: 1875, delivery: "2 weeks", days: 14 },
  { id: "maintenance", name: "Website Maintenance", regular: 300, drouin: 225, delivery: "Ongoing", days: 0, recurring: true },
];

const BRANDING_SERVICES = [
  { id: "logo", name: "Logo Design (3 concepts)", regular: 800, drouin: 600, delivery: "1 week", days: 7 },
  { id: "brand-identity", name: "Brand Identity Package", regular: 2500, drouin: 1875, delivery: "2 weeks", days: 14 },
  { id: "business-card", name: "Business Card Design", regular: 200, drouin: 150, delivery: "3 days", days: 3 },
  { id: "social-graphics", name: "Social Media Graphics (10 templates)", regular: 500, drouin: 375, delivery: "1 week", days: 7 },
  { id: "print-collateral", name: "Print Collateral Design", regular: 400, drouin: 300, delivery: "1 week", days: 7 },
  { id: "brand-refresh", name: "Brand Refresh", regular: 1500, drouin: 1125, delivery: "2 weeks", days: 14 },
];

const AUTOMATION_SERVICES = [
  { id: "lead-response", name: "Lead Response Automation", regular: 1500, drouin: 1125, delivery: "1 week", days: 7 },
  { id: "quote-followup", name: "Quote Follow-up System", regular: 1200, drouin: 900, delivery: "1 week", days: 7 },
  { id: "reactivation", name: "Customer Reactivation Campaign", regular: 1000, drouin: 750, delivery: "1 week", days: 7 },
  { id: "chatbot", name: "AI Chatbot", regular: 2000, drouin: 1500, delivery: "2 weeks", days: 14, recurring: true, recurringRegular: 150, recurringDrouin: 113 },
  { id: "voice-agent", name: "AI Voice Agent", regular: 2500, drouin: 1875, delivery: "2 weeks", days: 14 },
  { id: "booking", name: "Appointment Booking Automation", regular: 1200, drouin: 900, delivery: "1 week", days: 7 },
  { id: "email-auto", name: "Email Marketing Automation", regular: 800, drouin: 600, delivery: "1 week", days: 7 },
  { id: "sms-auto", name: "SMS Marketing Automation", regular: 800, drouin: 600, delivery: "1 week", days: 7 },
  { id: "crm-setup", name: "CRM Setup & Integration", regular: 1500, drouin: 1125, delivery: "2 weeks", days: 14 },
  { id: "workflow", name: "Custom Workflow Automation", regular: 1000, drouin: 750, delivery: "1-2 weeks", days: 10 },
  { id: "review-system", name: "Review Collection System", regular: 600, drouin: 450, delivery: "1 week", days: 7 },
  { id: "dashboard", name: "Custom Dashboard", regular: 2000, drouin: 1500, delivery: "2 weeks", days: 14 },
  { id: "api-integration", name: "API Integration", regular: 1000, drouin: 750, delivery: "1 week", days: 7 },
];

const SEO_SERVICES = [
  { id: "seo-package", name: "SEO Optimization Package", regular: 1200, drouin: 900, delivery: "2 weeks", days: 14 },
  { id: "content-writing", name: "Content Writing (per page)", regular: 150, drouin: 113, delivery: "3 days", days: 3 },
  { id: "blog-setup", name: "Blog Setup + 5 Posts", regular: 1500, drouin: 1125, delivery: "2 weeks", days: 14 },
  { id: "gmb", name: "Google My Business Optimization", regular: 400, drouin: 300, delivery: "1 week", days: 7 },
  { id: "cro-audit", name: "Conversion Rate Optimization Audit", regular: 800, drouin: 600, delivery: "1 week", days: 7 },
  { id: "meta-ads", name: "Meta Ads Setup & Management", regular: 500, drouin: 375, delivery: "Ongoing", days: 0, recurring: true },
  { id: "google-ads", name: "Google Ads Setup & Management", regular: 600, drouin: 450, delivery: "Ongoing", days: 0, recurring: true },
];

const CONSULTING_SERVICES = [
  { id: "strategy", name: "Digital Strategy Session (2 hours)", regular: 400, drouin: 300, delivery: "1 day", days: 1 },
  { id: "audit", name: "Website Audit & Recommendations", regular: 600, drouin: 450, delivery: "1 week", days: 7 },
  { id: "auto-assessment", name: "Automation Opportunity Assessment", regular: 500, drouin: 375, delivery: "1 week", days: 7 },
  { id: "training", name: "Training Session (per hour)", regular: 200, drouin: 150, delivery: "On-demand", days: 0 },
  { id: "retainer", name: "Monthly Retainer (ongoing optimization)", regular: 800, drouin: 600, delivery: "Ongoing", days: 0, recurring: true },
];

const ADDONS_SERVICES = [
  { id: "bilingual", name: "Bilingual Content (EN/FR)", regular: 0, drouin: 0, delivery: "+1 week", days: 7, note: "+30% of project" },
  { id: "rush", name: "Rush Delivery (1 week turnaround)", regular: 0, drouin: 0, delivery: "-50% time", days: 0, note: "+40% of project" },
  { id: "revision", name: "Additional Revision Round", regular: 150, drouin: 113, delivery: "3 days", days: 3 },
  { id: "animation", name: "Custom Animation/Interaction", regular: 300, drouin: 225, delivery: "1 week", days: 7 },
  { id: "video", name: "Video Production (promotional)", regular: 1500, drouin: 1125, delivery: "2 weeks", days: 14 },
  { id: "social-mgmt", name: "Social Media Management", regular: 600, drouin: 450, delivery: "Ongoing", days: 0, recurring: true },
  { id: "ab-testing", name: "Landing Page A/B Testing", regular: 800, drouin: 600, delivery: "2 weeks", days: 14 },
  { id: "email-templates", name: "Email Template Design (5 templates)", regular: 500, drouin: 375, delivery: "1 week", days: 7 },
];

const PACKAGES = [
  {
    id: "starter",
    name: "Starter Package",
    regular: 5300,
    drouin: 4000,
    delivery: "3 weeks",
    days: 21,
    includes: [
      "3-page website",
      "Logo design",
      "Basic SEO setup",
      "Contact form automation",
      "Full digital audit",
      "Digital growth business plan",
      "Social media strategy plan",
      "5 hours of strategic consulting"
    ],
  },
  {
    id: "growth",
    name: "Growth Package",
    regular: 9100,
    drouin: 6800,
    delivery: "4 weeks",
    days: 28,
    includes: [
      "5-page website",
      "Brand identity package",
      "SEO optimization",
      "Lead response automation",
      "Google My Business setup",
      "Full digital audit",
      "Digital growth business plan",
      "Social media strategy plan",
      "8 hours of strategic consulting"
    ],
  },
  {
    id: "premium",
    name: "Premium Package",
    regular: 16000,
    drouin: 12000,
    delivery: "8 weeks",
    days: 56,
    includes: [
      "10-page website",
      "Full branding suite",
      "E-commerce (basic)",
      "AI chatbot",
      "Email automation",
      "3 months maintenance included",
      "Full digital audit",
      "Digital growth business plan",
      "Social media strategy plan",
      "10 hours of strategic consulting"
    ],
  },
];

// Translations
const TRANSLATIONS = {
  en: {
    // Hero
    discountBadge: "25% Drouin Client Discount Applied",
    heroTitle: "Services & Pricing for Drouin Creations Clients",
    heroSubtitle: "Select what you need. See your price. Print your quote. All prices in CAD.",
    viewQuote: "View Quote",

    // Calculator
    calculatorTitle: "Website Pricing Calculator",
    calculatorSubtitle: "Custom quote in 30 seconds.",
    yourRequirements: "Your Requirements",
    yourPrice: "Your Price",
    numberOfPages: "Number of Pages",
    complexityLevel: "Complexity Level",
    basic: "Basic",
    basicDesc: "Landing page, simple layout",
    standard: "Standard",
    standardDesc: "Multi-page, forms, basic SEO",
    advanced: "Advanced",
    advancedDesc: "Custom design, animations",
    premium: "Premium",
    premiumDesc: "Bespoke UX, advanced interactions",
    ecommerce: "E-commerce",
    noEcommerce: "No e-commerce",
    basicStore: "Basic store",
    standardStore: "Standard store",
    advancedStore: "Advanced store",
    additionalFeatures: "Additional Features",
    bilingual: "Bilingual (EN/FR)",
    cmsIntegration: "CMS Integration",
    blogSetup: "Blog Setup",
    seoPackage: "SEO Package",
    analyticsSetup: "Analytics Setup",
    emailIntegration: "Email Integration",
    bookingSystem: "Booking System",
    customForms: "Custom Forms",
    selectedItems: "Selected Items",
    regularPrice: "Regular Price",
    drouinSpecial: "Drouin Special (25% off)",
    estimatedDelivery: "Estimated Delivery",
    fromProjectStart: "From project start",
    addToQuote: "Add to Quote",
    notSure: "Not sure where to start? Let's discuss your project together.",
    bookACall: "Book a Call",

    // Packages
    packageDeals: "Package Deals",
    delivery: "Delivery",

    // Service Menu
    aLaCarte: "À La Carte Services",
    websites: "Websites",
    branding: "Branding",
    automation: "Automation",
    seo: "SEO",
    consulting: "Consulting",
    addons: "Add-ons",
    service: "Service",
    regular: "Regular",
    action: "Action",
    add: "Add",

    // Cart
    yourQuote: "Your Quote",
    reviewServices: "Review your selected services and pricing",
    quoteEmpty: "Your quote is empty.",
    quoteEmptyDesc: "Click \"Add to Quote\" on any service to get started.",
    configDetails: "Configuration Details:",
    subtotalRegular: "Subtotal (Regular):",
    drouinDiscount: "Drouin Discount (25%):",
    total: "TOTAL:",
    totalDeliveryTime: "Total Delivery Time:",
    weeksText: "weeks",
    someServicesParallel: "(Some services run in parallel)",
    printThisQuote: "Print This Quote",
    sendQuoteToDrouin: "Send Quote to Drouin",

    // Quote Form
    sendYourQuote: "Send Your Quote",
    fillDetails: "Fill in your details and we'll send this quote to you and Drouin Creations.",
    name: "Name",
    yourName: "Your name",
    email: "Email",
    yourEmail: "your@email.com",
    phone: "Phone",
    phoneNumber: "(123) 456-7890",
    company: "Company",
    companyName: "Your company name",
    message: "Message (optional)",
    additionalDetails: "Any additional details...",
    sendQuote: "Send Quote",

    // Bottom CTA
    readyToStart: "Ready to Get Started?",
    readyDesc: "Add services to your quote and send it to Drouin Creations, or book a call to discuss your project.",
    viewYourQuote: "View Your Quote",

    // Package items
    starterPackage: "Starter Package",
    growthPackage: "Growth Package",
    premiumPackage: "Premium Package",
  },
  fr: {
    // Hero
    discountBadge: "25% de rabais client Drouin appliqué",
    heroTitle: "Services et tarifs pour les clients Drouin Creations",
    heroSubtitle: "Sélectionnez ce dont vous avez besoin. Voyez votre prix. Imprimez votre soumission. Tous les prix en CAD.",
    viewQuote: "Voir la soumission",

    // Calculator
    calculatorTitle: "Calculateur de prix de site Web",
    calculatorSubtitle: "Soumission personnalisée en 30 secondes.",
    yourRequirements: "Vos besoins",
    yourPrice: "Votre prix",
    numberOfPages: "Nombre de pages",
    complexityLevel: "Niveau de complexité",
    basic: "Basique",
    basicDesc: "Page d'atterrissage, mise en page simple",
    standard: "Standard",
    standardDesc: "Multi-pages, formulaires, SEO de base",
    advanced: "Avancé",
    advancedDesc: "Design personnalisé, animations",
    premium: "Premium",
    premiumDesc: "UX sur mesure, interactions avancées",
    ecommerce: "Commerce électronique",
    noEcommerce: "Pas de commerce électronique",
    basicStore: "Boutique basique",
    standardStore: "Boutique standard",
    advancedStore: "Boutique avancée",
    additionalFeatures: "Fonctionnalités additionnelles",
    bilingual: "Bilingue (EN/FR)",
    cmsIntegration: "Intégration CMS",
    blogSetup: "Configuration de blog",
    seoPackage: "Forfait SEO",
    analyticsSetup: "Configuration Analytics",
    emailIntegration: "Intégration courriel",
    bookingSystem: "Système de réservation",
    customForms: "Formulaires personnalisés",
    selectedItems: "Items sélectionnés",
    regularPrice: "Prix régulier",
    drouinSpecial: "Spécial Drouin (25% de rabais)",
    estimatedDelivery: "Livraison estimée",
    fromProjectStart: "Depuis le début du projet",
    addToQuote: "Ajouter à la soumission",
    notSure: "Pas sûr par où commencer? Discutons de votre projet ensemble.",
    bookACall: "Réserver un appel",

    // Packages
    packageDeals: "Forfaits",
    delivery: "Livraison",

    // Service Menu
    aLaCarte: "Services à la carte",
    websites: "Sites Web",
    branding: "Image de marque",
    automation: "Automatisation",
    seo: "SEO",
    consulting: "Consultation",
    addons: "Extras",
    service: "Service",
    regular: "Régulier",
    action: "Action",
    add: "Ajouter",

    // Cart
    yourQuote: "Votre soumission",
    reviewServices: "Examinez vos services sélectionnés et les prix",
    quoteEmpty: "Votre soumission est vide.",
    quoteEmptyDesc: "Cliquez sur \"Ajouter à la soumission\" sur n'importe quel service pour commencer.",
    configDetails: "Détails de configuration:",
    subtotalRegular: "Sous-total (Régulier):",
    drouinDiscount: "Rabais Drouin (25%):",
    total: "TOTAL:",
    totalDeliveryTime: "Temps de livraison total:",
    weeksText: "semaines",
    someServicesParallel: "(Certains services s'exécutent en parallèle)",
    printThisQuote: "Imprimer cette soumission",
    sendQuoteToDrouin: "Envoyer la soumission à Drouin",

    // Quote Form
    sendYourQuote: "Envoyer votre soumission",
    fillDetails: "Remplissez vos coordonnées et nous enverrons cette soumission à vous et Drouin Creations.",
    name: "Nom",
    yourName: "Votre nom",
    email: "Courriel",
    yourEmail: "votre@courriel.com",
    phone: "Téléphone",
    phoneNumber: "(123) 456-7890",
    company: "Entreprise",
    companyName: "Nom de votre entreprise",
    message: "Message (optionnel)",
    additionalDetails: "Détails supplémentaires...",
    sendQuote: "Envoyer la soumission",

    // Bottom CTA
    readyToStart: "Prêt à commencer?",
    readyDesc: "Ajoutez des services à votre soumission et envoyez-la à Drouin Creations, ou réservez un appel pour discuter de votre projet.",
    viewYourQuote: "Voir votre soumission",

    // Package items
    starterPackage: "Forfait démarrage",
    growthPackage: "Forfait croissance",
    premiumPackage: "Forfait premium",
  }
};

export default function DrouinCreationsPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const t = TRANSLATIONS[language];

  // Cal.com embed options
  const calOptions = useCalEmbed({
    namespace: CONSTANTS.CALCOM_NAMESPACE,
    styles: {
      branding: {
        brandColor: CONSTANTS.CALCOM_BRAND_COLOR,
      },
    },
    hideEventTypeDetails: CONSTANTS.CALCOM_HIDE_EVENT_TYPE_DETAILS,
    layout: CONSTANTS.CALCOM_LAYOUT,
    theme: "auto",
  });

  // Website Calculator State
  const [pageCount, setPageCount] = useState([5]);
  const [complexity, setComplexity] = useState("standard");
  const [ecommerce, setEcommerce] = useState("none");
  const [features, setFeatures] = useState({
    bilingual: false,
    cms: false,
    blog: false,
    seo: false,
    analytics: false,
    email: false,
    booking: false,
    forms: false,
  });

  // Quote Form State
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  // Get max pages and tier info based on complexity
  const getTierInfo = (complexityLevel: string) => {
    switch (complexityLevel) {
      case "basic": return { max: 3, next: "standard", label: "Basic" };
      case "standard": return { max: 7, next: "advanced", label: "Standard" };
      case "advanced": return { max: 20, next: "premium", label: "Advanced" };
      case "premium": return { max: 20, next: null, label: "Premium" };
      default: return { max: 20, next: null, label: "Basic" };
    }
  };

  // Auto-upgrade tier when page count exceeds maximum
  useEffect(() => {
    const tierInfo = getTierInfo(complexity);
    const currentPages = pageCount[0];

    if (currentPages > tierInfo.max && tierInfo.next) {
      setComplexity(tierInfo.next);
    }
  }, [pageCount, complexity]);

  // Add to cart function
  const addToCart = (item: CartItem) => {
    // Check if item already exists
    const exists = cart.find((i) => i.id === item.id);
    if (!exists) {
      setCart([...cart, item]);
      setIsCartOpen(true);
    }
  };

  // Remove from cart
  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  // Calculate website price with line items
  const calculateWebsitePrice = () => {
    const lineItems: { label: string; value: string }[] = [];
    let basePrice = 0;
    const pages = pageCount[0];

    // Base price by complexity and page count
    let websiteBasePrice = 0;
    if (complexity === "basic") {
      if (pages <= 3) websiteBasePrice = 800 + (pages - 1) * 200;
      else websiteBasePrice = 1200 + (pages - 3) * 300;
    } else if (complexity === "standard") {
      if (pages <= 7) websiteBasePrice = 2500 + (pages - 4) * 400;
      else websiteBasePrice = 4500 + (pages - 7) * 500;
    } else if (complexity === "advanced") {
      websiteBasePrice = 5000 + (pages - 8) * 600;
    } else if (complexity === "premium") {
      websiteBasePrice = 10000 + Math.max(0, (pages - 10)) * 800;
    }

    basePrice = websiteBasePrice;
    lineItems.push({
      label: `${complexity.charAt(0).toUpperCase() + complexity.slice(1)} Website (${pages} page${pages > 1 ? 's' : ''})`,
      value: `$${websiteBasePrice.toLocaleString()}`
    });

    // E-commerce addon
    if (ecommerce === "basic") {
      basePrice += 1500;
      lineItems.push({ label: "Basic E-commerce", value: "+$1,500" });
    } else if (ecommerce === "standard") {
      basePrice += 3000;
      lineItems.push({ label: "Standard E-commerce", value: "+$3,000" });
    } else if (ecommerce === "advanced") {
      basePrice += 5000;
      lineItems.push({ label: "Advanced E-commerce", value: "+$5,000" });
    }

    // Feature addons (apply bilingual last since it's a multiplier)
    const priceBeforeBilingual = basePrice;
    if (features.cms) {
      basePrice += 800;
      lineItems.push({ label: "CMS Integration", value: "+$800" });
    }
    if (features.blog) {
      basePrice += 600;
      lineItems.push({ label: "Blog Setup", value: "+$600" });
    }
    if (features.seo) {
      basePrice += 1200;
      lineItems.push({ label: "SEO Optimization", value: "+$1,200" });
    }
    if (features.analytics) {
      basePrice += 400;
      lineItems.push({ label: "Analytics Setup", value: "+$400" });
    }
    if (features.email) {
      basePrice += 500;
      lineItems.push({ label: "Email Marketing", value: "+$500" });
    }
    if (features.booking) {
      basePrice += 800;
      lineItems.push({ label: "Booking System", value: "+$800" });
    }
    if (features.forms) {
      basePrice += 600;
      lineItems.push({ label: "Custom Forms", value: "+$600" });
    }
    if (features.bilingual) {
      const bilingualIncrease = Math.round(basePrice * 0.3);
      basePrice *= 1.3;
      lineItems.push({ label: "Bilingual (30%)", value: `+$${bilingualIncrease.toLocaleString()}` });
    }

    const regularPrice = Math.round(basePrice);
    const drouinPrice = Math.round(basePrice * 0.75); // 25% off

    // Calculate delivery time
    let deliveryWeeks = 1;
    if (pages > 10) deliveryWeeks = 4;
    else if (pages > 5) deliveryWeeks = 3;
    else if (pages > 3) deliveryWeeks = 2;

    if (ecommerce !== "none") deliveryWeeks += 1;
    if (complexity === "premium") deliveryWeeks += 1;

    return {
      regularPrice,
      drouinPrice,
      delivery: `${deliveryWeeks} weeks`,
      days: deliveryWeeks * 7,
      lineItems,
    };
  };

  const websiteCalcResult = calculateWebsitePrice();

  // Add custom website to cart
  const addCustomWebsite = () => {
    const item: CartItem = {
      id: `custom-website-${Date.now()}`,
      name: `Custom Website (${pageCount[0]} pages, ${complexity})`,
      regularPrice: websiteCalcResult.regularPrice,
      drouinPrice: websiteCalcResult.drouinPrice,
      delivery: websiteCalcResult.delivery,
      deliveryDays: websiteCalcResult.days,
      lineItems: websiteCalcResult.lineItems,
    };
    addToCart(item);
  };

  // Calculate cart totals
  const calculateTotals = () => {
    const regularTotal = cart.reduce((sum, item) => sum + item.regularPrice, 0);
    const drouinTotal = cart.reduce((sum, item) => sum + item.drouinPrice, 0);
    const discount = regularTotal - drouinTotal;

    // Calculate delivery (max of all items for sequential, with some parallelization)
    const maxDelivery = Math.max(...cart.map(item => item.deliveryDays), 0);
    const totalDelivery = Math.ceil(maxDelivery / 7); // Convert to weeks

    return { regularTotal, drouinTotal, discount, totalDelivery };
  };

  const totals = calculateTotals();

  // Print quote - open in new tab
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print the quote.');
      return;
    }

    const quoteHtml = generatePrintableQuote();
    printWindow.document.write(quoteHtml);
    printWindow.document.close();

    // Wait for content to load, then trigger print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
  };

  // Generate printable quote HTML
  const generatePrintableQuote = () => {
    const date = new Date().toLocaleDateString();

    const servicesRows = cart.map(item => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px 8px; font-weight: 500;">
          ${item.name}
          ${item.lineItems && item.lineItems.length > 0 ? `
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f3f4f6;">
              <div style="font-size: 11px; font-weight: 600; color: #6b7280; margin-bottom: 4px;">Configuration Details:</div>
              ${item.lineItems.map(lineItem => `
                <div style="font-size: 11px; color: #6b7280; display: flex; justify-content: space-between; padding: 2px 0;">
                  <span>${lineItem.label}</span>
                  <span style="font-weight: 500;">${lineItem.value}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </td>
        <td style="padding: 12px 8px; text-align: right; color: #9ca3af; text-decoration: line-through; vertical-align: top;">
          $${item.regularPrice.toLocaleString()}
          ${item.recurring ? `<div style="font-size: 11px;">+$${item.recurring.regularPrice}/mo</div>` : ''}
        </td>
        <td style="padding: 12px 8px; text-align: right; font-weight: 600; vertical-align: top;">
          $${item.drouinPrice.toLocaleString()}
          ${item.recurring ? `<div style="font-size: 11px; font-weight: 400;">+$${item.recurring.drouinPrice}/mo</div>` : ''}
        </td>
        <td style="padding: 12px 8px; text-align: right; font-size: 14px; vertical-align: top;">${item.delivery}</td>
      </tr>
    `).join('');

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote - Lemon Brand × Drouin Creations</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: white;
      color: #1f2937;
      padding: 40px;
      max-width: 900px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 32px;
      padding-bottom: 16px;
      border-bottom: 2px solid #1f2937;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-section img {
      height: 40px;
      width: auto;
    }

    .header-right {
      text-align: right;
    }

    .header-right p:first-child {
      font-weight: 700;
      font-size: 14px;
    }

    .header-right p:last-child {
      font-size: 12px;
      color: #6b7280;
      margin-top: 4px;
    }

    .card {
      background: white;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      margin-bottom: 24px;
      overflow: hidden;
    }

    .card-header {
      padding: 16px 20px 12px;
      border-bottom: 1px solid #e5e7eb;
    }

    .card-title {
      font-size: 16px;
      font-weight: 700;
      color: #1f2937;
    }

    .card-content {
      padding: 16px 20px;
    }

    .info-row {
      margin-bottom: 8px;
      font-size: 14px;
    }

    .info-row span {
      font-weight: 600;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      text-align: left;
      padding: 8px;
      font-size: 14px;
      font-weight: 600;
      border-bottom: 2px solid #1f2937;
    }

    th:nth-child(2),
    th:nth-child(3),
    th:nth-child(4) {
      text-align: right;
    }

    .summary-card {
      background: #f9fafb;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .summary-row.discount {
      color: #16a34a;
      font-weight: 500;
    }

    .summary-row.total {
      font-size: 20px;
      font-weight: 700;
      padding-top: 12px;
      border-top: 2px solid #1f2937;
      margin-top: 8px;
    }

    .delivery-info {
      font-size: 12px;
      color: #6b7280;
      margin-top: 12px;
    }

    ol {
      padding-left: 20px;
      font-size: 14px;
      line-height: 1.8;
    }

    ol li {
      margin-bottom: 6px;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      color: #6b7280;
      border-top: 1px solid #d1d5db;
      padding-top: 16px;
      margin-top: 32px;
    }

    .footer p {
      margin-bottom: 8px;
    }

    .footer p:first-child {
      font-weight: 600;
      font-size: 14px;
      color: #1f2937;
    }

    @media print {
      body {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="header">
    <div class="logo-section">
      <img src="/assets/logo_lemonbrand_256x256.svg" alt="Lemon Brand" />
      <img src="/assets/Lemonbrand_Wordmark.svg" alt="Lemon Brand" />
    </div>
    <div class="header-right">
      <p>SERVICE QUOTE</p>
      <p>${date}</p>
    </div>
  </div>

  ${quoteForm.name ? `
  <!-- Client Information -->
  <div class="card">
    <div class="card-header">
      <div class="card-title">Client Information</div>
    </div>
    <div class="card-content">
      <div class="info-row"><span>Name:</span> ${quoteForm.name}</div>
      ${quoteForm.company ? `<div class="info-row"><span>Company:</span> ${quoteForm.company}</div>` : ''}
      ${quoteForm.email ? `<div class="info-row"><span>Email:</span> ${quoteForm.email}</div>` : ''}
      ${quoteForm.phone ? `<div class="info-row"><span>Phone:</span> ${quoteForm.phone}</div>` : ''}
    </div>
  </div>
  ` : ''}

  <!-- Selected Services -->
  <div class="card">
    <div class="card-header">
      <div class="card-title">Selected Services</div>
    </div>
    <div class="card-content">
      ${cart.length === 0 ? '<p style="color: #6b7280; font-size: 14px;">No services selected.</p>' : `
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Regular</th>
            <th>Drouin Price</th>
            <th>Delivery</th>
          </tr>
        </thead>
        <tbody>
          ${servicesRows}
        </tbody>
      </table>
      `}
    </div>
  </div>

  ${cart.length > 0 ? `
  <!-- Pricing Summary -->
  <div class="card summary-card">
    <div class="card-header">
      <div class="card-title">Pricing Summary</div>
    </div>
    <div class="card-content">
      <div class="summary-row">
        <span>Subtotal (Regular):</span>
        <span style="color: #9ca3af;">$${totals.regularTotal.toLocaleString()} CAD</span>
      </div>
      <div class="summary-row discount">
        <span>Drouin Client Discount (25%):</span>
        <span>-$${totals.discount.toLocaleString()} CAD</span>
      </div>
      <div class="summary-row total">
        <span>TOTAL:</span>
        <span>$${totals.drouinTotal.toLocaleString()} CAD</span>
      </div>
      <div class="delivery-info">
        <p>Estimated delivery: ~${totals.totalDelivery} weeks (some services run in parallel)</p>
      </div>
    </div>
  </div>
  ` : ''}

  <!-- Next Steps -->
  <div class="card">
    <div class="card-header">
      <div class="card-title">Next Steps</div>
    </div>
    <div class="card-content">
      <ol>
        <li>Review this quote with your Drouin Creations representative</li>
        <li>Contact us at <strong>simon@lemonbrand.io</strong> with any questions</li>
        <li>Book a call at <strong>lemonbrand.io/drouin-creations</strong></li>
        <li>Upon approval, we'll send a detailed project scope and timeline</li>
      </ol>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p>LEMON BRAND × DROUIN CREATIONS</p>
    <p>simon@lemonbrand.io • lemonbrand.com</p>
    <p>Quote valid for 30 days from date of issue</p>
  </div>
</body>
</html>
    `;
  };

  // Send quote
  const handleSendQuote = async () => {
    if (!quoteForm.name || !quoteForm.email) {
      alert("Please fill in your name and email.");
      return;
    }

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          quoteForm,
          totals,
        }),
      });

      if (response.ok) {
        alert("Quote sent successfully! We'll be in touch soon.");
      } else {
        alert("Failed to send quote. Please try again or contact us directly.");
      }
    } catch (error) {
      console.error("Error sending quote:", error);
      alert("Failed to send quote. Please try again or contact us directly.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Partnership Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-800 shadow-lg border border-neutral-200 dark:border-neutral-700">
              <img
                src="https://www.drouincreations.com/we/we.dll/Pic?UN=246965&F=C&T=801&Age=1387088034"
                alt="Drouin Creations"
                className="h-10 w-auto object-contain"
              />
              <span className="text-2xl font-bold text-neutral-400 dark:text-neutral-600">×</span>
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/logo_lemonbrand_256x256.svg"
                  alt="Lemon Brand"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <Image
                  src="/assets/Lemonbrand_Wordmark.svg"
                  alt="Lemon Brand"
                  width={72}
                  height={20}
                  className="h-5 w-auto"
                />
              </div>
            </div>
          </motion.div>

          <Badge className="mb-4 bg-orange-500 text-white hover:bg-orange-600">
            {t.discountBadge}
          </Badge>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto"
          >
            {t.heroSubtitle}
          </motion.p>

          {/* Cart Trigger Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col items-center gap-4"
          >
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white relative">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {t.viewQuote}
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-green-500">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader className="px-2">
                  <SheetTitle>{t.yourQuote}</SheetTitle>
                  <SheetDescription>
                    {t.reviewServices}
                  </SheetDescription>
                </SheetHeader>

                {/* Cart Items */}
                <div className="mt-8 px-4 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500">
                      <ShoppingCart className="mx-auto h-12 w-12 mb-4 opacity-50" />
                      <p>{t.quoteEmpty}</p>
                      <p className="text-sm mt-2">{t.quoteEmptyDesc}</p>
                    </div>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <Card key={item.id} className="relative">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-base">{item.name}</CardTitle>
                                <CardDescription className="text-sm mt-1">
                                  {t.delivery}: {item.delivery}
                                </CardDescription>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                className="h-8 w-8 p-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            {item.lineItems && item.lineItems.length > 0 && (
                              <div className="mb-4 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
                                <div className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
                                  {t.configDetails}
                                </div>
                                <div className="space-y-1">
                                  {item.lineItems.map((lineItem, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-xs">
                                      <span className="text-neutral-600 dark:text-neutral-400">{lineItem.label}</span>
                                      <span className="font-medium text-neutral-900 dark:text-neutral-100">{lineItem.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-neutral-500 line-through">
                                  ${item.regularPrice.toLocaleString()} CAD
                                </span>
                              </div>
                              <div className="flex justify-between font-semibold text-green-600">
                                <span>Drouin Special:</span>
                                <span>${item.drouinPrice.toLocaleString()} CAD</span>
                              </div>
                              {item.recurring && (
                                <div className="text-sm text-neutral-600 mt-2">
                                  + ${item.recurring.drouinPrice}/mo ongoing
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      <Separator className="my-6" />

                      {/* Totals */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-neutral-600">
                          <span>{t.subtotalRegular}</span>
                          <span>${totals.regularTotal.toLocaleString()} CAD</span>
                        </div>
                        <div className="flex justify-between text-sm text-green-600 font-medium">
                          <span>{t.drouinDiscount}</span>
                          <span>-${totals.discount.toLocaleString()} CAD</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>{t.total}</span>
                          <span className="text-orange-500">
                            ${totals.drouinTotal.toLocaleString()} CAD
                          </span>
                        </div>
                        <div className="text-sm text-neutral-600 text-center pt-2">
                          {t.totalDeliveryTime} ~{totals.totalDelivery} {t.weeksText}
                          <br />
                          <span className="text-xs">{t.someServicesParallel}</span>
                        </div>
                      </div>

                      <Separator className="my-6" />

                      {/* Actions */}
                      <div className="space-y-3">
                        <Button
                          onClick={handlePrint}
                          variant="outline"
                          className="w-full"
                        >
                          <Printer className="mr-2 h-4 w-4" />
                          {t.printThisQuote}
                        </Button>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full bg-orange-500 hover:bg-orange-600">
                              <Mail className="mr-2 h-4 w-4" />
                              {t.sendQuoteToDrouin}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>{t.sendYourQuote}</DialogTitle>
                              <DialogDescription>
                                {t.fillDetails}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">{t.name}</Label>
                                <Input
                                  id="name"
                                  value={quoteForm.name}
                                  onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                                  placeholder={t.yourName}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">{t.email}</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  value={quoteForm.email}
                                  onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                                  placeholder={t.yourEmail}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone">{t.phone}</Label>
                                <Input
                                  id="phone"
                                  value={quoteForm.phone}
                                  onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                                  placeholder={t.phoneNumber}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="company">{t.company}</Label>
                                <Input
                                  id="company"
                                  value={quoteForm.company}
                                  onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                                  placeholder={t.companyName}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="message">{t.message}</Label>
                                <Textarea
                                  id="message"
                                  value={quoteForm.message}
                                  onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                                  placeholder={t.additionalDetails}
                                  rows={3}
                                />
                              </div>
                            </div>
                            <Button onClick={handleSendQuote} className="w-full bg-orange-500 hover:bg-orange-600">
                              {t.sendQuote}
                            </Button>
                          </DialogContent>
                        </Dialog>

                        <Button
                          data-cal-namespace={calOptions.namespace}
                          data-cal-link={CONSTANTS.CALCOM_LINK}
                          data-cal-config={`{"layout":"${calOptions.layout}"}`}
                          variant="outline"
                          className="w-full"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {t.bookACall}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Language Toggle */}
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Website Pricing Calculator */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">{t.calculatorTitle}</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">{t.calculatorSubtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-0 items-stretch overflow-hidden border border-neutral-200 dark:border-neutral-700 rounded-3xl">
            {/* Left: Calculator Inputs */}
            <div className="bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 p-8 lg:p-12 shadow-[8px_0_24px_rgba(0,0,0,0.1)] dark:shadow-[8px_0_24px_rgba(0,0,0,0.3)] relative z-10 rounded-l-3xl">
              <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-8">
                {t.yourRequirements}
              </h3>

              {/* Page Count Slider */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    {t.numberOfPages}
                  </Label>
                  <span className="text-2xl font-bold text-orange-500 dark:text-orange-400 tabular-nums">
                    {pageCount[0]}
                  </span>
                </div>
                <Slider
                  value={pageCount}
                  onValueChange={setPageCount}
                  max={20}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                  <span>1</span>
                  <span>10</span>
                  <span>20</span>
                </div>
                <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
                  {getTierInfo(complexity).max < 20
                    ? `${getTierInfo(complexity).label} tier: up to ${getTierInfo(complexity).max} pages. Selecting more will upgrade to ${getTierInfo(getTierInfo(complexity).next || complexity).label} tier.`
                    : `${getTierInfo(complexity).label} tier: up to 20 pages.`
                  }
                </p>
              </div>

              {/* Complexity */}
              <div className="mb-6">
                <Label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 block mb-2">{t.complexityLevel}</Label>
                <RadioGroup value={complexity} onValueChange={setComplexity} className="space-y-0.5">
                  <div className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <RadioGroupItem value="basic" id="basic" />
                    <Label htmlFor="basic" className="cursor-pointer text-sm flex-1">
                      {t.basic}
                      <span className="block text-xs text-neutral-500">{t.basicDesc}</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="cursor-pointer text-sm flex-1">
                      {t.standard}
                      <span className="block text-xs text-neutral-500">{t.standardDesc}</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced" className="cursor-pointer text-sm flex-1">
                      {t.advanced}
                      <span className="block text-xs text-neutral-500">{t.advancedDesc}</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <RadioGroupItem value="premium" id="premium" />
                    <Label htmlFor="premium" className="cursor-pointer text-sm flex-1">
                      {t.premium}
                      <span className="block text-xs text-neutral-500">{t.premiumDesc}</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* E-commerce */}
              <div className="mb-6">
                <Label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 block mb-2">{t.ecommerce}</Label>
                <RadioGroup value={ecommerce} onValueChange={setEcommerce} className="space-y-0.5">
                  <div className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <RadioGroupItem value="none" id="ecom-none" />
                    <Label htmlFor="ecom-none" className="cursor-pointer text-sm">
                      {t.noEcommerce}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <RadioGroupItem value="basic" id="ecom-basic" />
                    <Label htmlFor="ecom-basic" className="cursor-pointer text-sm">
                      {t.basicStore} +$1,500
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <RadioGroupItem value="standard" id="ecom-standard" />
                    <Label htmlFor="ecom-standard" className="cursor-pointer text-sm">
                      {t.standardStore} +$3,000
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <RadioGroupItem value="advanced" id="ecom-advanced" />
                    <Label htmlFor="ecom-advanced" className="cursor-pointer text-sm">
                      {t.advancedStore} +$5,000
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Additional Features */}
              <div>
                <Label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 block mb-2">{t.additionalFeatures}</Label>
                <div className="grid grid-cols-1 gap-0.5">
                  <div className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <Checkbox
                      id="bilingual"
                      checked={features.bilingual}
                      onCheckedChange={(checked) =>
                        setFeatures({ ...features, bilingual: checked as boolean })
                      }
                    />
                    <Label htmlFor="bilingual" className="cursor-pointer text-sm">
                      {t.bilingual} +30%
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <Checkbox
                      id="cms"
                      checked={features.cms}
                      onCheckedChange={(checked) =>
                        setFeatures({ ...features, cms: checked as boolean })
                      }
                    />
                    <Label htmlFor="cms" className="cursor-pointer text-sm">
                      {t.cmsIntegration} +$800
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <Checkbox
                      id="blog"
                      checked={features.blog}
                      onCheckedChange={(checked) =>
                        setFeatures({ ...features, blog: checked as boolean })
                      }
                    />
                    <Label htmlFor="blog" className="cursor-pointer text-sm">
                      {t.blogSetup} +$600
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <Checkbox
                      id="seo"
                      checked={features.seo}
                      onCheckedChange={(checked) =>
                        setFeatures({ ...features, seo: checked as boolean })
                      }
                    />
                    <Label htmlFor="seo" className="cursor-pointer text-sm">
                      {t.seoPackage} +$1,200
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <Checkbox
                      id="analytics"
                      checked={features.analytics}
                      onCheckedChange={(checked) =>
                        setFeatures({ ...features, analytics: checked as boolean })
                      }
                    />
                    <Label htmlFor="analytics" className="cursor-pointer text-sm">
                      {t.analyticsSetup} +$400
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <Checkbox
                      id="email"
                      checked={features.email}
                      onCheckedChange={(checked) =>
                        setFeatures({ ...features, email: checked as boolean })
                      }
                    />
                    <Label htmlFor="email" className="cursor-pointer text-sm">
                      {t.emailIntegration} +$500
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <Checkbox
                      id="booking"
                      checked={features.booking}
                      onCheckedChange={(checked) =>
                        setFeatures({ ...features, booking: checked as boolean })
                      }
                    />
                    <Label htmlFor="booking" className="cursor-pointer text-sm">
                      {t.bookingSystem} +$800
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <Checkbox
                      id="forms"
                      checked={features.forms}
                      onCheckedChange={(checked) =>
                        setFeatures({ ...features, forms: checked as boolean })
                      }
                    />
                    <Label htmlFor="forms" className="cursor-pointer text-sm">
                      {t.customForms} +$600
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Calculator Result */}
            <div className="bg-gradient-to-br from-neutral-100 to-white dark:from-neutral-900 dark:to-neutral-800 p-8 lg:p-12 rounded-r-3xl flex flex-col">
              <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-8">
                {t.yourPrice}
              </h3>

              {/* Price Breakdown */}
              <div className="flex-1 space-y-6">
                {/* Selected Items Breakdown */}
                <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-4">
                    {t.selectedItems}
                  </div>
                  <div className="space-y-2">
                    {websiteCalcResult.lineItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-neutral-700 dark:text-neutral-300">{item.label}</span>
                        <span className="font-semibold text-neutral-900 dark:text-neutral-100">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                  <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">
                    {t.regularPrice}
                  </div>
                  <div className="text-3xl font-bold text-neutral-400 dark:text-neutral-600 line-through">
                    ${websiteCalcResult.regularPrice.toLocaleString()}
                  </div>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">CAD</p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
                  <div className="text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400 mb-2">
                    {t.drouinSpecial}
                  </div>
                  <div className="text-5xl font-bold text-green-600 dark:text-green-400">
                    ${websiteCalcResult.drouinPrice.toLocaleString()}
                  </div>
                  <p className="mt-1 text-xs text-green-600/80 dark:text-green-400/80">CAD</p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20">
                  <div className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400 mb-2">
                    {t.estimatedDelivery}
                  </div>
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {websiteCalcResult.delivery}
                  </div>
                  <p className="mt-1 text-xs text-orange-600/80 dark:text-orange-400/80">{t.fromProjectStart}</p>
                </div>
              </div>

              {/* Add to Quote Button */}
              <Button
                onClick={addCustomWebsite}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white h-12 text-base"
              >
                <Plus className="mr-2 h-5 w-5" />
                {t.addToQuote}
              </Button>

              {/* Book a Call Section */}
              <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center mb-3">
                  {t.notSure}
                </p>
                <Button
                  data-cal-namespace={calOptions.namespace}
                  data-cal-link={CONSTANTS.CALCOM_LINK}
                  data-cal-config={`{"layout":"${calOptions.layout}"}`}
                  variant="outline"
                  className="w-full h-12 text-base border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  {t.bookACall}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Package Deals */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">{t.packageDeals}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
              <Card key={pkg.id} className="relative hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{pkg.name}</CardTitle>
                  <CardDescription>{t.delivery}: {pkg.delivery}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {pkg.includes.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500 line-through">
                        Regular: ${pkg.regular.toLocaleString()} CAD
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Drouin Special:</span>
                      <span className="text-2xl font-bold text-green-600">
                        ${pkg.drouin.toLocaleString()} CAD
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() =>
                      addToCart({
                        id: pkg.id,
                        name: pkg.name,
                        regularPrice: pkg.regular,
                        drouinPrice: pkg.drouin,
                        delivery: pkg.delivery,
                        deliveryDays: pkg.days,
                      })
                    }
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {t.addToQuote}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Service Menu */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">{t.aLaCarte}</h2>
          <Tabs defaultValue="websites" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
              <TabsTrigger value="websites">{t.websites}</TabsTrigger>
              <TabsTrigger value="branding">{t.branding}</TabsTrigger>
              <TabsTrigger value="automation">{t.automation}</TabsTrigger>
              <TabsTrigger value="seo">{t.seo}</TabsTrigger>
              <TabsTrigger value="consulting">{t.consulting}</TabsTrigger>
              <TabsTrigger value="addons">{t.addons}</TabsTrigger>
            </TabsList>

            {/* Websites Tab */}
            <TabsContent value="websites">
              <Card>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto -mx-6 px-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[200px]">{t.service}</TableHead>
                          <TableHead className="text-right hidden sm:table-cell">{t.regular}</TableHead>
                          <TableHead className="text-right min-w-[100px]">{t.drouinSpecial}</TableHead>
                          <TableHead className="text-center hidden md:table-cell">{t.delivery}</TableHead>
                          <TableHead className="text-center min-w-[80px]">{t.action}</TableHead>
                        </TableRow>
                      </TableHeader>
                    <TableBody>
                      {WEBSITES_SERVICES.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium">{service.name}</TableCell>
                          <TableCell className="text-right text-neutral-500 line-through hidden sm:table-cell">
                            ${service.regular.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right font-semibold text-green-600">
                            ${service.drouin.toLocaleString()}
                            {service.recurring && <span className="text-xs">/mo</span>}
                          </TableCell>
                          <TableCell className="text-center text-sm hidden md:table-cell">{service.delivery}</TableCell>
                          <TableCell className="text-center">
                            <Button
                              size="sm"
                              onClick={() =>
                                addToCart({
                                  id: service.id,
                                  name: service.name,
                                  regularPrice: service.regular,
                                  drouinPrice: service.drouin,
                                  delivery: service.delivery,
                                  deliveryDays: service.days,
                                })
                              }
                              className="bg-orange-500 hover:bg-orange-600"
                            >
                              {t.add}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Branding Tab */}
            <TabsContent value="branding">
              <Card>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto -mx-6 px-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[200px]">{t.service}</TableHead>
                          <TableHead className="text-right hidden sm:table-cell">{t.regular}</TableHead>
                          <TableHead className="text-right min-w-[100px]">{t.drouinSpecial}</TableHead>
                          <TableHead className="text-center hidden md:table-cell">{t.delivery}</TableHead>
                          <TableHead className="text-center min-w-[80px]">{t.action}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {BRANDING_SERVICES.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell className="font-medium">{service.name}</TableCell>
                            <TableCell className="text-right text-neutral-500 line-through hidden sm:table-cell">
                              ${service.regular.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right font-semibold text-green-600">
                              ${service.drouin.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-center text-sm hidden md:table-cell">{service.delivery}</TableCell>
                            <TableCell className="text-center">
                              <Button
                                size="sm"
                                onClick={() =>
                                  addToCart({
                                    id: service.id,
                                    name: service.name,
                                    regularPrice: service.regular,
                                    drouinPrice: service.drouin,
                                    delivery: service.delivery,
                                    deliveryDays: service.days,
                                  })
                                }
                                className="bg-orange-500 hover:bg-orange-600"
                              >
                                {t.add}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Automation Tab */}
            <TabsContent value="automation">
              <Card>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto -mx-6 px-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[200px]">{t.service}</TableHead>
                          <TableHead className="text-right hidden sm:table-cell">{t.regular}</TableHead>
                          <TableHead className="text-right min-w-[100px]">{t.drouinSpecial}</TableHead>
                          <TableHead className="text-center hidden md:table-cell">{t.delivery}</TableHead>
                          <TableHead className="text-center min-w-[80px]">{t.action}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {AUTOMATION_SERVICES.map((service: any) => (
                          <TableRow key={service.id}>
                            <TableCell className="font-medium">{service.name}</TableCell>
                            <TableCell className="text-right text-neutral-500 line-through hidden sm:table-cell">
                              ${service.regular.toLocaleString()}
                              {service.recurring && (
                                <div className="text-xs">+ ${service.recurringRegular}/mo</div>
                              )}
                            </TableCell>
                            <TableCell className="text-right font-semibold text-green-600">
                              ${service.drouin.toLocaleString()}
                              {service.recurring && (
                                <div className="text-xs">+ ${service.recurringDrouin}/mo</div>
                              )}
                            </TableCell>
                            <TableCell className="text-center text-sm hidden md:table-cell">{service.delivery}</TableCell>
                            <TableCell className="text-center">
                              <Button
                                size="sm"
                                onClick={() =>
                                  addToCart({
                                    id: service.id,
                                    name: service.name,
                                    regularPrice: service.regular,
                                    drouinPrice: service.drouin,
                                    delivery: service.delivery,
                                    deliveryDays: service.days,
                                    ...(service.recurring && {
                                      recurring: {
                                        regularPrice: service.recurringRegular,
                                        drouinPrice: service.recurringDrouin,
                                        period: "monthly",
                                      },
                                    }),
                                  })
                                }
                                className="bg-orange-500 hover:bg-orange-600"
                              >
                                {t.add}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo">
              <Card>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto -mx-6 px-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[200px]">{t.service}</TableHead>
                          <TableHead className="text-right hidden sm:table-cell">{t.regular}</TableHead>
                          <TableHead className="text-right min-w-[100px]">{t.drouinSpecial}</TableHead>
                          <TableHead className="text-center hidden md:table-cell">{t.delivery}</TableHead>
                          <TableHead className="text-center min-w-[80px]">{t.action}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {SEO_SERVICES.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell className="font-medium">{service.name}</TableCell>
                            <TableCell className="text-right text-neutral-500 line-through hidden sm:table-cell">
                              ${service.regular.toLocaleString()}
                              {service.recurring && <span className="text-xs">/mo</span>}
                            </TableCell>
                            <TableCell className="text-right font-semibold text-green-600">
                              ${service.drouin.toLocaleString()}
                              {service.recurring && <span className="text-xs">/mo</span>}
                            </TableCell>
                            <TableCell className="text-center text-sm hidden md:table-cell">{service.delivery}</TableCell>
                            <TableCell className="text-center">
                              <Button
                                size="sm"
                                onClick={() =>
                                  addToCart({
                                    id: service.id,
                                    name: service.name,
                                    regularPrice: service.regular,
                                    drouinPrice: service.drouin,
                                    delivery: service.delivery,
                                    deliveryDays: service.days,
                                  })
                                }
                                className="bg-orange-500 hover:bg-orange-600"
                              >
                                {t.add}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Consulting Tab */}
            <TabsContent value="consulting">
              <Card>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto -mx-6 px-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[200px]">{t.service}</TableHead>
                          <TableHead className="text-right hidden sm:table-cell">{t.regular}</TableHead>
                          <TableHead className="text-right min-w-[100px]">{t.drouinSpecial}</TableHead>
                          <TableHead className="text-center hidden md:table-cell">{t.delivery}</TableHead>
                          <TableHead className="text-center min-w-[80px]">{t.action}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {CONSULTING_SERVICES.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell className="font-medium">{service.name}</TableCell>
                            <TableCell className="text-right text-neutral-500 line-through hidden sm:table-cell">
                              ${service.regular.toLocaleString()}
                              {service.recurring && <span className="text-xs">/mo</span>}
                            </TableCell>
                            <TableCell className="text-right font-semibold text-green-600">
                              ${service.drouin.toLocaleString()}
                              {service.recurring && <span className="text-xs">/mo</span>}
                            </TableCell>
                            <TableCell className="text-center text-sm hidden md:table-cell">{service.delivery}</TableCell>
                            <TableCell className="text-center">
                              <Button
                                size="sm"
                                onClick={() =>
                                  addToCart({
                                    id: service.id,
                                    name: service.name,
                                    regularPrice: service.regular,
                                    drouinPrice: service.drouin,
                                    delivery: service.delivery,
                                    deliveryDays: service.days,
                                  })
                                }
                                className="bg-orange-500 hover:bg-orange-600"
                              >
                                {t.add}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add-ons Tab */}
            <TabsContent value="addons">
              <Card>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto -mx-6 px-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[200px]">{t.service}</TableHead>
                          <TableHead className="text-right hidden sm:table-cell">{t.regular}</TableHead>
                          <TableHead className="text-right min-w-[100px]">{t.drouinSpecial}</TableHead>
                          <TableHead className="text-center hidden md:table-cell">{t.delivery}</TableHead>
                          <TableHead className="text-center min-w-[80px]">{t.action}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ADDONS_SERVICES.map((service: any) => (
                          <TableRow key={service.id}>
                            <TableCell className="font-medium">
                              {service.name}
                              {service.note && (
                                <div className="text-xs text-neutral-500">{service.note}</div>
                              )}
                            </TableCell>
                            <TableCell className="text-right text-neutral-500 line-through hidden sm:table-cell">
                              {service.regular > 0 ? `$${service.regular.toLocaleString()}` : service.note}
                              {service.recurring && <span className="text-xs">/mo</span>}
                            </TableCell>
                            <TableCell className="text-right font-semibold text-green-600">
                              {service.drouin > 0 ? `$${service.drouin.toLocaleString()}` : service.note}
                              {service.recurring && <span className="text-xs">/mo</span>}
                            </TableCell>
                            <TableCell className="text-center text-sm hidden md:table-cell">{service.delivery}</TableCell>
                            <TableCell className="text-center">
                              {service.regular > 0 && (
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    addToCart({
                                      id: service.id,
                                      name: service.name,
                                      regularPrice: service.regular,
                                      drouinPrice: service.drouin,
                                      delivery: service.delivery,
                                      deliveryDays: service.days,
                                    })
                                  }
                                  className="bg-orange-500 hover:bg-orange-600"
                                >
                                  Add
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Bottom CTAs */}
        <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold">{t.readyToStart}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                {t.readyDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => setIsCartOpen(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {t.viewYourQuote} ({cart.length})
                </Button>
                <Button
                  data-cal-namespace={calOptions.namespace}
                  data-cal-link={CONSTANTS.CALCOM_LINK}
                  data-cal-config={`{"layout":"${calOptions.layout}"}`}
                  size="lg"
                  variant="outline"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  {t.bookACall}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

    </div>
  );
}
