"use client";

import { Metadata } from "next";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// TypeScript interfaces
interface PromptData {
  category: "quick" | "research" | "summary" | "email" | "product" | "strategy";
  title_fr: string;
  title_en: string;
  desc_fr: string;
  desc_en: string;
  prompt_fr: string;
  prompt_en: string;
}

type Language = "fr" | "en";
type Category = "all" | "quick" | "research" | "summary" | "email" | "product" | "strategy";

// All prompts data
const PROMPTS_DATA: PromptData[] = [
  // Quick prompts
  {
    category: "quick",
    title_fr: "Résumé en 3 Points",
    title_en: "3-Point Summary",
    desc_fr: "Obtenir l'essentiel rapidement",
    desc_en: "Get the essentials quickly",
    prompt_fr: "Résume ceci en exactement 3 points clés. Sois direct et concis. Texte: [INSÉRER LE TEXTE]",
    prompt_en: "Summarize this in exactly 3 key points. Be direct and concise. Text: [INSERT TEXT]"
  },
  {
    category: "quick",
    title_fr: "Pour ou Contre",
    title_en: "Pros and Cons",
    desc_fr: "Analyse rapide des avantages et inconvénients",
    desc_en: "Quick analysis of advantages and disadvantages",
    prompt_fr: "Liste 5 arguments POUR et 5 arguments CONTRE concernant: [INSÉRER LE SUJET]. Format tableau.",
    prompt_en: "List 5 arguments FOR and 5 arguments AGAINST regarding: [INSERT TOPIC]. Table format."
  },
  {
    category: "quick",
    title_fr: "Décision Rapide",
    title_en: "Quick Decision",
    desc_fr: "Aide à la prise de décision immédiate",
    desc_en: "Help with immediate decision making",
    prompt_fr: "J'hésite entre [OPTION A] et [OPTION B]. Donne-moi une recommandation claire en 3 phrases maximum avec ta logique.",
    prompt_en: "I'm hesitating between [OPTION A] and [OPTION B]. Give me a clear recommendation in maximum 3 sentences with your logic."
  },
  {
    category: "quick",
    title_fr: "Reformulation Simple",
    title_en: "Simple Rephrasing",
    desc_fr: "Rendre un message plus clair",
    desc_en: "Make a message clearer",
    prompt_fr: "Reformule ce texte de manière plus simple et directe, accessible à tous: [INSÉRER LE TEXTE]",
    prompt_en: "Rephrase this text in a simpler and more direct way, accessible to everyone: [INSERT TEXT]"
  },
  {
    category: "quick",
    title_fr: "Ordre du Jour",
    title_en: "Meeting Agenda",
    desc_fr: "Créer rapidement un agenda de réunion",
    desc_en: "Quickly create a meeting agenda",
    prompt_fr: "Crée un ordre du jour pour une réunion de [DURÉE] sur [SUJET]. 5 points maximum avec timing.",
    prompt_en: "Create an agenda for a [DURATION] meeting about [TOPIC]. Maximum 5 points with timing."
  },
  {
    category: "quick",
    title_fr: "Chiffres Clés",
    title_en: "Key Numbers",
    desc_fr: "Extraire les données importantes",
    desc_en: "Extract important data",
    prompt_fr: "Extrais uniquement les chiffres et statistiques clés de ce texte. Présente-les en liste: [INSÉRER LE TEXTE]",
    prompt_en: "Extract only the key numbers and statistics from this text. Present them as a list: [INSERT TEXT]"
  },
  // Research prompts
  {
    category: "research",
    title_fr: "Analyse Concurrentielle",
    title_en: "Competitive Analysis",
    desc_fr: "Analyse approfondie de la concurrence",
    desc_en: "In-depth competitive analysis",
    prompt_fr: "Effectue une analyse concurrentielle détaillée pour [SECTEUR]. Inclut concurrents, parts de marché, forces/faiblesses et recommandations.",
    prompt_en: "Conduct a detailed competitive analysis for [SECTOR]. Include competitors, market shares, strengths/weaknesses and recommendations."
  },
  {
    category: "research",
    title_fr: "Étude de Marché",
    title_en: "Market Study",
    desc_fr: "Recherche sur tendances et opportunités",
    desc_en: "Research on trends and opportunities",
    prompt_fr: "Réalise une étude de marché complète sur [SUJET] avec taille, segments, tendances et recommandations.",
    prompt_en: "Conduct a comprehensive market study on [TOPIC] with size, segments, trends and recommendations."
  },
  {
    category: "research",
    title_fr: "Analyse des Tendances",
    title_en: "Trend Analysis",
    desc_fr: "Identifier les tendances émergentes",
    desc_en: "Identify emerging trends",
    prompt_fr: "Identifie et analyse les 5 principales tendances dans [SECTEUR] pour les 2 prochaines années avec opportunités et risques.",
    prompt_en: "Identify and analyze the top 5 trends in [SECTOR] for the next 2 years with opportunities and risks."
  },
  // Summary prompts
  {
    category: "summary",
    title_fr: "Résumé de Rapport",
    title_en: "Report Summary",
    desc_fr: "Condenser un rapport long en points essentiels",
    desc_en: "Condense a long report into essentials",
    prompt_fr: "Crée un résumé exécutif du texte suivant: 1) Contexte, 2) Points clés (max 5), 3) Chiffres clés, 4) Implications, 5) Prochaines étapes.",
    prompt_en: "Create an executive summary: 1) Context, 2) Key points (max 5), 3) Key figures, 4) Implications, 5) Next steps."
  },
  {
    category: "summary",
    title_fr: "Synthèse de Réunion",
    title_en: "Meeting Synthesis",
    desc_fr: "Transformer notes en compte-rendu structuré",
    desc_en: "Transform notes into structured minutes",
    prompt_fr: "Transforme ces notes en compte-rendu: participants, objectifs, décisions, actions (responsable, échéance), points en suspens.",
    prompt_en: "Transform these notes into minutes: participants, objectives, decisions, actions (owner, deadline), outstanding items."
  },
  {
    category: "summary",
    title_fr: "Brief Hebdomadaire",
    title_en: "Weekly Brief",
    desc_fr: "Résumé des activités de la semaine",
    desc_en: "Weekly activities summary",
    prompt_fr: "Crée un brief hebdomadaire: 1) Réalisations (3), 2) Défis, 3) Décisions, 4) Priorités prochaines.",
    prompt_en: "Create a weekly brief: 1) Achievements (3), 2) Challenges, 3) Decisions, 4) Priorities next week."
  },
  // Email prompts
  {
    category: "email",
    title_fr: "Réponse Diplomatique",
    title_en: "Diplomatic Response",
    desc_fr: "Rédiger une réponse professionnelle à un courriel délicat",
    desc_en: "Draft a professional response to a delicate email",
    prompt_fr: "Rédige une réponse diplomatique et professionnelle au courriel suivant. Inclue reconnaissance, clarification et prochaines étapes.",
    prompt_en: "Draft a diplomatic professional response to the following email. Include acknowledgement, clarification and next steps."
  },
  {
    category: "email",
    title_fr: "Annonce Interne",
    title_en: "Internal Announcement",
    desc_fr: "Communiquer un changement important à l'équipe",
    desc_en: "Communicate an important change to the team",
    prompt_fr: "Rédige un courriel d'annonce interne: objet, contexte, impact, échéancier, ressources, message de clôture.",
    prompt_en: "Draft an internal announcement email: subject, context, impact, timeline, resources, closing message."
  },
  {
    category: "email",
    title_fr: "Suivi Client",
    title_en: "Client Follow-up",
    desc_fr: "Maintenir la relation après une rencontre",
    desc_en: "Maintain relationship after a meeting",
    prompt_fr: "Rédige un courriel de suivi après notre rencontre avec [CLIENT] incluant remerciements et prochaines étapes.",
    prompt_en: "Write a follow-up email after our meeting with [CLIENT] including thanks and next steps."
  },
  {
    category: "email",
    title_fr: "Refus Poli",
    title_en: "Polite Refusal",
    desc_fr: "Décliner une proposition tout en préservant la relation",
    desc_en: "Decline a proposal while preserving the relationship",
    prompt_fr: "Rédige un courriel pour décliner poliment [PROPOSITION] tout en proposant éventuellement une alternative.",
    prompt_en: "Draft an email to politely decline [PROPOSAL] while offering an alternative if possible."
  },
  // Product prompts
  {
    category: "product",
    title_fr: "Plan de Lancement Produit",
    title_en: "Product Launch Plan",
    desc_fr: "Créer une stratégie de lancement pour un nouveau produit",
    desc_en: "Create a launch strategy for a new product",
    prompt_fr: "Développe un plan de lancement complet pour [NOUVEAU PRODUIT] avec positionnement, segments, plan marketing 3 mois et KPIs.",
    prompt_en: "Develop a complete launch plan for [NEW PRODUCT] with positioning, segments, 3-month marketing plan and KPIs."
  },
  {
    category: "product",
    title_fr: "Analyse de Faisabilité",
    title_en: "Feasibility Analysis",
    desc_fr: "Évaluer la viabilité d'une nouvelle idée de produit",
    desc_en: "Evaluate a new product idea viability",
    prompt_fr: "Effectue une analyse de faisabilité pour [IDÉE] : technique, commerciale, financière, risques et recommandation GO/NO-GO.",
    prompt_en: "Perform a feasibility analysis for [IDEA]: technical, commercial, financial, risks and GO/NO-GO recommendation."
  },
  {
    category: "product",
    title_fr: "Test Concept Produit",
    title_en: "Product Concept Test",
    desc_fr: "Préparer les questions pour valider une idée",
    desc_en: "Prepare questions to validate an idea",
    prompt_fr: "Crée un guide d'entrevue pour tester le concept [PRODUIT] auprès de clients potentiels avec questions clés.",
    prompt_en: "Create an interview guide to test [PRODUCT] concept with key questions for potential customers."
  },
  // Strategy prompts
  {
    category: "strategy",
    title_fr: "Plan Stratégique Trimestriel",
    title_en: "Quarterly Strategic Plan",
    desc_fr: "Définir les priorités et objectifs du prochain trimestre",
    desc_en: "Define priorities for the next quarter",
    prompt_fr: "Crée un plan stratégique trimestriel: objectifs, initiatives, jalons et KPIs.",
    prompt_en: "Create a quarterly strategic plan: objectives, initiatives, milestones and KPIs."
  },
  {
    category: "strategy",
    title_fr: "Analyse SWOT Actionnable",
    title_en: "Actionable SWOT Analysis",
    desc_fr: "Transformer une SWOT en plan d'action",
    desc_en: "Transform a SWOT into an action plan",
    prompt_fr: "Réalise une SWOT pour [ENTREPRISE] et fournis 5 actions prioritaires à implémenter.",
    prompt_en: "Do a SWOT for [COMPANY] and provide 5 priority actions to implement."
  },
  {
    category: "strategy",
    title_fr: "Optimisation des Processus",
    title_en: "Process Optimization",
    desc_fr: "Identifier et améliorer les inefficacités opérationnelles",
    desc_en: "Identify and improve operational inefficiencies",
    prompt_fr: "Analyse et optimise le processus décrit: cartographie, goulots, propositions et ROI attendu.",
    prompt_en: "Analyze and optimize the described process: mapping, bottlenecks, proposals and expected ROI."
  },
  {
    category: "strategy",
    title_fr: "Matrice de Décision",
    title_en: "Decision Matrix",
    desc_fr: "Comparer objectivement plusieurs options",
    desc_en: "Objectively compare multiple options",
    prompt_fr: "Crée une matrice de décision pour [OPTIONS] avec critères pondérés et recommandation finale.",
    prompt_en: "Create a decision matrix for [OPTIONS] with weighted criteria and final recommendation."
  }
];

export default function PromptsStAlbertPage() {
  const [language, setLanguage] = useState<Language>("fr");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [showToast, setShowToast] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prev => prev === "fr" ? "en" : "fr");
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const filteredPrompts = activeCategory === "all"
    ? PROMPTS_DATA
    : PROMPTS_DATA.filter(p => p.category === activeCategory);

  const categoryBadgeColors: Record<PromptData["category"], string> = {
    quick: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    research: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    summary: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    email: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    product: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
    strategy: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
  };

  return (
    <>
      {/* Custom Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://cdn.prod.website-files.com/67f2c3d3da332df3a9d5d98a/67f2c9fbe3dd7a3962ddff9a_St%20Albert%20Logo.svg"
                alt="St Albert Logo"
                className="h-12 w-auto"
              />
              <div>
                <div className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                  {language === "fr" ? "Bibliothèque de Prompts IA" : "AI Prompts Library"}
                </div>
              </div>
            </div>
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-sm hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Toggle language"
            >
              {language === "fr" ? "EN" : "FR"}
            </button>
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-32 pb-20">
        {/* Guide Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
          <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 md:p-12 border border-neutral-200 dark:border-neutral-700">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
              {language === "fr" ? "Comment utiliser ces prompts" : "How to use these prompts"}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
              {language === "fr"
                ? "Guide simple en 4 étapes pour maximiser l'efficacité de vos outils IA"
                : "Simple 4-step guide to maximize the efficiency of your AI tools"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                  {language === "fr" ? "Choisissez" : "Choose"}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {language === "fr"
                    ? "Sélectionnez la catégorie qui correspond à votre besoin actuel"
                    : "Select the category that matches your current need"}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                  {language === "fr" ? "Copiez" : "Copy"}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {language === "fr"
                    ? "Cliquez sur le bouton pour copier le prompt instantanément"
                    : "Click the button to copy the prompt instantly"}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                  {language === "fr" ? "Collez" : "Paste"}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {language === "fr"
                    ? "Collez dans ChatGPT, Claude ou votre outil IA préféré"
                    : "Paste into ChatGPT, Claude or your favorite AI tool"}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  4
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                  {language === "fr" ? "Personnalisez" : "Customize"}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {language === "fr"
                    ? "Remplacez les [VARIABLES] par vos informations spécifiques"
                    : "Replace [VARIABLES] with your specific information"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
          <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 md:p-12 border border-neutral-200 dark:border-neutral-700">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-8">
              {language === "fr" ? "Comment créer un bon prompt" : "How to create a good prompt"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🎯</span>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-50">
                    {language === "fr" ? "Soyez Spécifique" : "Be Specific"}
                  </h4>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {language === "fr"
                    ? "Définissez clairement votre objectif et le contexte."
                    : "Clearly define your objective and context."}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📋</span>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-50">
                    {language === "fr" ? "Structurez la Demande" : "Structure the Request"}
                  </h4>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {language === "fr"
                    ? "Utilisez des listes pour organiser la demande."
                    : "Use lists to organize the request."}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🎨</span>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-50">
                    {language === "fr" ? "Précisez le Format" : "Specify the Format"}
                  </h4>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {language === "fr"
                    ? "Indiquez tableau, liste, ou paragraphe."
                    : "Indicate table, list, or paragraph."}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🎭</span>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-50">
                    {language === "fr" ? "Définissez le Ton" : "Define the Tone"}
                  </h4>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {language === "fr"
                    ? "Précisez le style pour l'audience."
                    : "Specify the style for the audience."}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📏</span>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-50">
                    {language === "fr" ? "Limitez la Longueur" : "Limit the Length"}
                  </h4>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {language === "fr"
                    ? "Spécifiez la longueur souhaitée."
                    : "Specify the desired length."}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🔄</span>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-50">
                    {language === "fr" ? "Itérez et Affinez" : "Iterate and Refine"}
                  </h4>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {language === "fr"
                    ? "Demandez des clarifications après la première réponse."
                    : "Ask for clarifications after the first response."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                activeCategory === "all"
                  ? "bg-orange-500 text-white"
                  : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              {language === "fr" ? "Tous" : "All"}
            </button>
            <button
              onClick={() => setActiveCategory("quick")}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                activeCategory === "quick"
                  ? "bg-orange-500 text-white"
                  : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              {language === "fr" ? "Prompts Rapides" : "Quick Prompts"}
            </button>
            <button
              onClick={() => setActiveCategory("research")}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                activeCategory === "research"
                  ? "bg-orange-500 text-white"
                  : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              {language === "fr" ? "Recherche & Analyse" : "Research & Analysis"}
            </button>
            <button
              onClick={() => setActiveCategory("summary")}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                activeCategory === "summary"
                  ? "bg-orange-500 text-white"
                  : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              {language === "fr" ? "Résumés Exécutifs" : "Executive Summaries"}
            </button>
            <button
              onClick={() => setActiveCategory("email")}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                activeCategory === "email"
                  ? "bg-orange-500 text-white"
                  : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              {language === "fr" ? "Gestion des Courriels" : "Email Management"}
            </button>
            <button
              onClick={() => setActiveCategory("product")}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                activeCategory === "product"
                  ? "bg-orange-500 text-white"
                  : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              {language === "fr" ? "Développement Produit" : "Product Development"}
            </button>
            <button
              onClick={() => setActiveCategory("strategy")}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                activeCategory === "strategy"
                  ? "bg-orange-500 text-white"
                  : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              {language === "fr" ? "Planification Stratégique" : "Strategic Planning"}
            </button>
          </div>
        </div>

        {/* Prompts Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredPrompts.map((prompt, index) => (
                <motion.div
                  key={`${prompt.category}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-shadow"
                >
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${categoryBadgeColors[prompt.category]}`}>
                    {language === "fr"
                      ? prompt.category === "quick" ? "Prompts Rapides"
                        : prompt.category === "research" ? "Recherche & Analyse"
                        : prompt.category === "summary" ? "Résumés Exécutifs"
                        : prompt.category === "email" ? "Gestion des Courriels"
                        : prompt.category === "product" ? "Développement Produit"
                        : "Planification Stratégique"
                      : prompt.category === "quick" ? "Quick Prompts"
                        : prompt.category === "research" ? "Research & Analysis"
                        : prompt.category === "summary" ? "Executive Summaries"
                        : prompt.category === "email" ? "Email Management"
                        : prompt.category === "product" ? "Product Development"
                        : "Strategic Planning"
                    }
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                    {language === "fr" ? prompt.title_fr : prompt.title_en}
                  </h3>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    {language === "fr" ? prompt.desc_fr : prompt.desc_en}
                  </p>

                  <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 mb-4">
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 font-mono">
                      {language === "fr" ? prompt.prompt_fr : prompt.prompt_en}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(language === "fr" ? prompt.prompt_fr : prompt.prompt_en)}
                      className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-sm transition-colors"
                    >
                      {language === "fr" ? "Copier" : "Copy"}
                    </button>
                    <button
                      onClick={() => copyToClipboard(language === "fr" ? prompt.prompt_fr : prompt.prompt_en)}
                      className="px-3 py-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded-lg transition-colors"
                      title={language === "fr" ? "Copier" : "Copy"}
                    >
                      📋
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-6 py-3 rounded-full shadow-lg font-semibold"
          >
            {language === "fr" ? "Prompt copié dans le presse-papier!" : "Prompt copied to clipboard!"}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
