"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IconArrowLeft, IconCommand, IconSettings, IconUser } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

/**
 * Sarah Dashboard Template
 * This page demonstrates the design system and layout principles for the Sarah Dashboard.
 * Use this as a reference for creating new pages in the dashboard.
 */

export default function TemplatePage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <Link 
            href="/sarah/dashboard" 
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-orange-500 transition-colors w-fit"
        >
            <IconArrowLeft className="w-4 h-4" />
            Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
                Design System Template
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 mt-1">
                A reference for building consistent, high-quality dashboard pages.
                </p>
            </div>
            {/* Optional Header Actions */}
            <button className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                Primary Action
            </button>
        </div>
      </div>

      {/* Grid Layout Example */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Card Type 1: Standard Content Card */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 bg-white dark:bg-neutral-900/80 backdrop-blur-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <IconCommand className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Primary Content Area</h2>
                    <p className="text-sm text-neutral-500">Main focus of the page</p>
                </div>
            </div>
            
            <div className="space-y-4">
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    This is a standard content card. It uses the default background with a subtle border.
                    The typography is clean and readable, with distinct hierarchy between headings and body text.
                </p>
                <div className="h-32 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-400 text-sm">
                    Placeholder Content
                </div>
            </div>
        </motion.div>

        {/* Card Type 2: Sidebar/Secondary Card */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-neutral-900/80 backdrop-blur-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm h-fit"
        >
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-4">
                Quick Actions
            </h3>
            <div className="space-y-2">
                {[
                    { icon: IconUser, label: "Profile Settings" },
                    { icon: IconSettings, label: "Preferences" },
                    { icon: IconCommand, label: "Shortcuts" }
                ].map((item, i) => (
                    <button 
                        key={i}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-left group"
                    >
                        <item.icon className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </motion.div>

        {/* Card Type 3: Metric/Status Cards */}
        <div className="md:col-span-3 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {['Total Users', 'Active Sessions', 'Bounce Rate', 'Avg. Duration'].map((metric, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (i * 0.05) }}
                    className="bg-white dark:bg-neutral-900/80 backdrop-blur-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 hover:border-orange-200 dark:hover:border-orange-800 transition-colors group cursor-default"
                >
                    <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">{metric}</p>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-orange-500 transition-colors">
                        {Math.floor(Math.random() * 1000)}
                    </p>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
