"use client";

import { useState, useEffect } from "react";
import {
  Truck,
  Factory,
  Users,
  Calendar,
  MapPin,
  BarChart3,
  ClipboardList,
  Database,
  Bell,
  Sun,
  Hand,
  Wifi,
  Clock,
  TreePine,
  Droplet,
  Snowflake,
  Building2,
  Route,
  MoreHorizontal,
  ChevronDown,
  Palette,
  BedDouble,
  Gauge,
  Check,
  Sparkles,
  Lock,
} from "lucide-react";

const CORRECT_PASSWORD = "EdisonBDE";
const STORAGE_KEY = "edison-proposal-auth";

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true");
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#042069] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Private Proposal</h1>
          <p className="text-[#888]">Enter the password to view this document.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className={`w-full px-4 py-3 bg-[#111] border rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#042069] transition-colors ${
              error ? "border-red-500" : "border-[#333]"
            }`}
            autoFocus
          />
          {error && (
            <p className="text-red-400 text-sm">Incorrect password. Please try again.</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-[#042069] text-white rounded-lg font-medium hover:bg-[#063099] transition-colors"
          >
            View Proposal
          </button>
        </form>

        <p className="text-center text-[#666] text-sm mt-8">
          Prepared by Lemonbrand
        </p>
      </div>
    </div>
  );
}

function Proposal() {
  return (
    <>
      <style jsx global>{`
        .edison-proposal {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 17px;
          line-height: 1.6;
          color: #ffffff;
          -webkit-font-smoothing: antialiased;
          background: #000000;
        }

        .edison-proposal .noise::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 1;
        }

        .edison-proposal .page {
          min-height: 100vh;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        @media (min-width: 480px) {
          .edison-proposal .page { padding: 2rem; }
        }

        @media (min-width: 768px) {
          .edison-proposal .page { padding: 3rem 4rem; }
        }

        @media (min-width: 1024px) {
          .edison-proposal .page { padding: 4rem 6rem; }
        }

        .edison-proposal .page-dark {
          background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(4, 32, 105, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(4, 32, 105, 0.1) 0%, transparent 40%),
            #000000;
        }

        .edison-proposal .page-dark-alt {
          background: radial-gradient(ellipse 100% 60% at 50% 120%, rgba(4, 32, 105, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse 40% 30% at 0% 50%, rgba(4, 32, 105, 0.08) 0%, transparent 40%),
            #000000;
        }

        .edison-proposal .page-blue {
          background: radial-gradient(ellipse 80% 60% at 20% 0%, rgba(4, 32, 105, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 100% 80%, rgba(4, 32, 105, 0.15) 0%, transparent 40%),
            linear-gradient(180deg, #050d1a 0%, #0a1628 100%);
        }

        .edison-proposal .page-cover {
          background: radial-gradient(ellipse 100% 80% at 50% 0%, rgba(4, 32, 105, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 80% 60% at 100% 100%, rgba(4, 32, 105, 0.15) 0%, transparent 40%),
            linear-gradient(180deg, #000000 0%, #050810 100%);
        }

        .edison-proposal .glow-brand {
          box-shadow: 0 0 40px rgba(4, 32, 105, 0.4), 0 0 80px rgba(4, 32, 105, 0.2);
        }

        .edison-proposal .glow-brand-sm {
          box-shadow: 0 0 20px rgba(4, 32, 105, 0.3), 0 0 40px rgba(4, 32, 105, 0.15);
        }

        .edison-proposal .glow-text {
          text-shadow: 0 0 40px rgba(4, 32, 105, 0.5);
        }

        .edison-proposal .accent-line {
          background: linear-gradient(90deg, #042069 0%, #0a3299 50%, transparent 100%);
        }

        .edison-proposal .card-glow {
          background: linear-gradient(180deg, rgba(4, 32, 105, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%);
          border: 1px solid rgba(4, 32, 105, 0.3);
          backdrop-filter: blur(10px);
        }

        .edison-proposal .glass {
          background: rgba(10, 22, 40, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .edison-proposal .grid-pattern::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(4, 32, 105, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(4, 32, 105, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }

        .edison-proposal .dot-pattern::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(4, 32, 105, 0.15) 1px, transparent 1px);
          background-size: 20px 20px;
          pointer-events: none;
          z-index: 0;
        }

        .edison-proposal .content-layer {
          position: relative;
          z-index: 2;
        }

        @media print {
          .edison-proposal * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .edison-proposal { font-size: 10pt; }
          .edison-proposal .page {
            min-height: auto;
            height: 100vh;
            padding: 0.5in 0.6in;
            page-break-after: always;
            background: #000000 !important;
          }
          .edison-proposal .no-print, .edison-proposal button { display: none !important; }
          .edison-proposal .noise::before, .edison-proposal .grid-pattern::after, .edison-proposal .dot-pattern::after { display: none !important; }
          .edison-proposal .glow-brand, .edison-proposal .glow-brand-sm { box-shadow: none !important; }
          .edison-proposal .glow-text { text-shadow: none !important; }
          .edison-proposal .accent-line { display: none !important; }
          .edison-proposal .hidden.md\\:block { display: block !important; }
          .edison-proposal .mockup-img { display: none !important; }
        }

        @page { size: letter; margin: 0; }
      `}</style>

      <div className="edison-proposal">
        {/* Print button */}
        <button
          onClick={() => window.print()}
          className="fixed top-4 right-4 bg-[#042069] text-white px-4 py-2 rounded-lg text-sm font-medium no-print z-50 hover:bg-[#063099] transition-colors glow-brand-sm"
        >
          Save as PDF
        </button>

        {/* PAGE 1: Cover */}
        <section className="page page-cover noise justify-between">
          <div className="content-layer flex justify-between text-sm text-[#888]">
            <div>
              <p className="font-medium text-white">Simon</p>
              <p>Lemonbrand</p>
            </div>
            <p>January 2026</p>
          </div>

          <div className="content-layer flex-1 flex flex-col justify-center max-w-xl">
            <div className="w-24 h-1 accent-line rounded-full mb-10" />
            <img src="/edison-logo.svg" alt="Edison Motors" className="h-10 mb-8 self-start" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 md:mb-6 glow-text">
              Lead Capture System<br />for Edison Motors
            </h1>
            <p className="text-lg text-[#999]">Turn your 1.2M followers into qualified buyers.</p>
          </div>

          <div className="content-layer flex justify-between items-end text-sm">
            <div>
              <p className="text-[#888] mb-1">Prepared for</p>
              <p className="text-lg font-semibold text-white">Eric Little, CEO</p>
            </div>
            <p className="text-[#888]">Valid 30 days</p>
          </div>
        </section>

        {/* PAGE 2: The Problem */}
        <section className="page page-dark noise">
          <div className="content-layer flex flex-col flex-1">
            <p className="text-[#4a7fff] text-sm font-semibold tracking-wide uppercase mb-6">THE OPPORTUNITY</p>
            <h2 className="text-3xl font-bold text-white mb-8 max-w-lg">
              You have the attention.<br />Now capture the interest.
            </h2>
            <div className="space-y-6 text-[#999] max-w-xl mb-auto">
              <p>Edison Motors has built something most companies dream of: 1.2 million followers who genuinely care about what you&apos;re building. The YouTube videos. The community. The excitement around diesel-electric trucks.</p>
              <p className="font-medium text-white">But right now, when someone watches a video and thinks &quot;I want one of those trucks&quot;—there&apos;s no easy way for them to tell you.</p>
              <div className="py-4">
                <div className="flex items-center gap-3 text-sm flex-wrap">
                  <span className="glass px-4 py-2 rounded-lg">Watches YouTube</span>
                  <span className="text-[#042069] font-bold">→</span>
                  <span className="glass px-4 py-2 rounded-lg">Visits website</span>
                  <span className="text-[#042069] font-bold">→</span>
                  <span className="glass px-4 py-2 rounded-lg border-dashed !border-[#333] text-[#666]">???</span>
                  <span className="text-[#042069] font-bold">→</span>
                  <span className="glass px-4 py-2 rounded-lg text-red-400 !border-red-900/30">Leaves</span>
                </div>
                <p className="text-xs text-[#666] mt-3">↑ Every day, high-intent buyers slip away because there&apos;s no clear next step.</p>
              </div>
              <p>This proposal fixes that. A dedicated page where interested buyers can tell you exactly what they want, when they need it, and how to reach them.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#222]">
              <p className="text-sm text-[#666]">The goal: every person who wants an Edison truck has a clear way to raise their hand.</p>
            </div>
          </div>
        </section>

        {/* PAGE 3: The Solution */}
        <section className="page page-dark-alt grid-pattern">
          <div className="content-layer flex flex-col flex-1">
            <p className="text-[#4a7fff] text-sm font-semibold tracking-wide uppercase mb-4">THE SOLUTION</p>
            <h2 className="text-2xl font-bold text-white mb-2">sales.edisonmotors.ca</h2>
            <p className="text-[#999] mb-8">A dedicated page for capturing buyer interest.</p>
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 flex-1">
              <div className="flex-1 space-y-4 md:space-y-6">
                <p className="text-[#999]">When a potential buyer lands on this page, they&apos;ll see the trucks, select what they&apos;re interested in, and tell you about their needs—all in under 60 seconds.</p>
                <div className="py-2">
                  <div className="inline-block bg-[#042069] text-white px-6 py-3 rounded-lg font-semibold glow-brand">I&apos;m Interested in Edison Trucks</div>
                  <p className="text-xs text-[#666] mt-2">↑ One clear call to action. No confusion.</p>
                </div>
                <div className="space-y-4 pt-4">
                  <h3 className="font-semibold text-white">What makes it work:</h3>
                  <ul className="space-y-2 text-[#999] text-sm">
                    <li className="flex gap-2"><span className="text-[#042069]">•</span>Built for phones—your audience is on mobile</li>
                    <li className="flex gap-2"><span className="text-[#042069]">•</span>Big buttons, easy to tap even with work gloves</li>
                    <li className="flex gap-2"><span className="text-[#042069]">•</span>4 simple steps, no typing required</li>
                    <li className="flex gap-2"><span className="text-[#042069]">•</span>Works even with spotty cell service</li>
                  </ul>
                </div>
              </div>
              <div className="hidden md:block w-56 flex-shrink-0">
                <div className="border-2 border-[#042069]/30 rounded-[2rem] overflow-hidden bg-[#111] p-2 glow-brand-sm">
                  <div className="w-20 h-5 bg-[#000] rounded-full mx-auto mb-2" />
                  <div className="bg-[#000] rounded-2xl p-4 space-y-3 h-80">
                    <div className="h-28 rounded-lg overflow-hidden bg-[#0a0a0a]">
                      <img src="/truck.png" alt="BDE Truck" className="w-full h-full object-contain" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-[#222] rounded w-3/4" />
                      <div className="h-3 bg-[#222] rounded w-full" />
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="h-10 bg-[#042069] rounded-lg glow-brand-sm" />
                      <div className="h-10 bg-[#111] border border-[#333] rounded-lg" />
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-[#666] text-center mt-2">Mobile-first design</p>
              </div>
            </div>
          </div>
        </section>

        {/* PAGE 4: The User Journey */}
        <section className="page page-blue dot-pattern">
          <div className="content-layer flex flex-col flex-1">
            <p className="text-[#4a7fff] text-sm font-semibold tracking-wide uppercase mb-4">THE EXPERIENCE</p>
            <h2 className="text-2xl font-bold text-white mb-2">4 steps. Under 60 seconds.</h2>
            <p className="text-[#999] mb-8">Here&apos;s what a buyer sees.</p>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 flex-1">
              {/* Step 1 */}
              <div className="card-glow rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#042069] text-white flex items-center justify-center text-sm font-bold glow-brand-sm">1</div>
                  <h3 className="font-semibold text-white">Choose Your Truck</h3>
                </div>
                <div className="bg-black rounded-xl p-3 space-y-2 mb-3">
                  <div className="border-2 border-[#042069] rounded-lg p-2 bg-[#042069]/10">
                    <div className="h-16 bg-[#0a0a0a] rounded overflow-hidden mockup-img">
                      <img src="/truck.png" alt="BDE Truck" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-white text-xs font-medium mt-1">BDE-Series Semi</p>
                    <p className="text-[#666] text-[10px]">605HP / 1405HP Hybrid</p>
                  </div>
                  <div className="border border-[#333] rounded-lg p-2">
                    <div className="h-14 bg-[#0a0a0a] rounded overflow-hidden mockup-img">
                      <img src="/chassis.png" alt="Class 5 Chassis" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-[#888] text-xs font-medium mt-1">Class 5 Chassis</p>
                    <p className="text-[#666] text-[10px]">Rolling chassis platform</p>
                  </div>
                </div>
                <p className="text-sm text-[#888]">BDE-Series Semi Truck or Class 5 Chassis</p>
              </div>

              {/* Step 2 */}
              <div className="card-glow rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#042069] text-white flex items-center justify-center text-sm font-bold glow-brand-sm">2</div>
                  <h3 className="font-semibold text-white">Tell Us Your Application</h3>
                </div>
                <div className="bg-black rounded-xl p-3 mb-3">
                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="bg-[#042069] rounded-lg p-2 text-center">
                      <TreePine className="w-4 h-4 mx-auto text-white" />
                      <p className="text-[8px] text-white mt-1">Logging</p>
                    </div>
                    <div className="bg-[#111] border border-[#333] rounded-lg p-2 text-center">
                      <Droplet className="w-4 h-4 mx-auto text-[#666]" />
                      <p className="text-[8px] text-[#666] mt-1">Oilfield</p>
                    </div>
                    <div className="bg-[#111] border border-[#333] rounded-lg p-2 text-center">
                      <Snowflake className="w-4 h-4 mx-auto text-[#666]" />
                      <p className="text-[8px] text-[#666] mt-1">Snow</p>
                    </div>
                    <div className="bg-[#111] border border-[#333] rounded-lg p-2 text-center">
                      <Building2 className="w-4 h-4 mx-auto text-[#666]" />
                      <p className="text-[8px] text-[#666] mt-1">Municipal</p>
                    </div>
                    <div className="bg-[#111] border border-[#333] rounded-lg p-2 text-center">
                      <Route className="w-4 h-4 mx-auto text-[#666]" />
                      <p className="text-[8px] text-[#666] mt-1">Long Haul</p>
                    </div>
                    <div className="bg-[#111] border border-[#333] rounded-lg p-2 text-center">
                      <MoreHorizontal className="w-4 h-4 mx-auto text-[#666]" />
                      <p className="text-[8px] text-[#666] mt-1">Other</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#888]">Logging, oilfield, snow removal, municipal, or other</p>
              </div>

              {/* Step 3 */}
              <div className="card-glow rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#042069] text-white flex items-center justify-center text-sm font-bold glow-brand-sm">3</div>
                  <h3 className="font-semibold text-white">Your Fleet & Timeline</h3>
                </div>
                <div className="bg-black rounded-xl p-3 space-y-2 mb-3">
                  <div>
                    <p className="text-[8px] text-[#666] mb-1">Fleet Size</p>
                    <div className="bg-[#111] border border-[#333] rounded-lg px-2 py-1.5 flex justify-between items-center">
                      <span className="text-white text-xs">6-10 trucks</span>
                      <ChevronDown className="w-3 h-3 text-[#666]" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[8px] text-[#666] mb-1">When are you looking to buy?</p>
                    <div className="bg-[#111] border border-[#333] rounded-lg px-2 py-1.5 flex justify-between items-center">
                      <span className="text-white text-xs">Within 3 months</span>
                      <ChevronDown className="w-3 h-3 text-[#666]" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[8px] text-[#666] mb-1">Province/State</p>
                    <div className="bg-[#111] border border-[#333] rounded-lg px-2 py-1.5 flex justify-between items-center">
                      <span className="text-white text-xs">British Columbia</span>
                      <ChevronDown className="w-3 h-3 text-[#666]" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#888]">How many trucks, when you&apos;re looking to buy</p>
              </div>

              {/* Step 4 */}
              <div className="card-glow rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#042069] text-white flex items-center justify-center text-sm font-bold glow-brand-sm">4</div>
                  <h3 className="font-semibold text-white">How to Reach You</h3>
                </div>
                <div className="bg-black rounded-xl p-3 space-y-2 mb-3">
                  <div>
                    <p className="text-[8px] text-[#666] mb-0.5">Name</p>
                    <div className="bg-[#111] border border-[#333] rounded px-2 py-1">
                      <span className="text-white text-xs">John Morrison</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[8px] text-[#666] mb-0.5">Company</p>
                    <div className="bg-[#111] border border-[#333] rounded px-2 py-1">
                      <span className="text-white text-xs">Morrison Trucking Ltd</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[8px] text-[#666] mb-0.5">Phone</p>
                    <div className="bg-[#111] border border-[#333] rounded px-2 py-1">
                      <span className="text-[#888] text-xs">250-555-0123</span>
                    </div>
                  </div>
                  <div className="bg-[#042069] rounded-lg py-1.5 text-center mt-1 glow-brand-sm">
                    <span className="text-white text-xs font-medium">Submit Interest</span>
                  </div>
                </div>
                <p className="text-sm text-[#888]">Name, company, phone, email—done</p>
              </div>
            </div>
          </div>
        </section>

        {/* PAGE 5: Future - Vehicle Configurator */}
        <section className="page page-dark-alt grid-pattern">
          <div className="content-layer flex flex-col flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4a7fff]" />
                <p className="text-[#4a7fff] text-sm font-semibold tracking-wide uppercase">COMING IN PHASE 2</p>
              </div>
              <p className="text-[#666] text-xs italic">Conceptual design — not final UI</p>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Style Your Rig</h2>
            <p className="text-[#999] mb-6">Let buyers customize their truck before they even talk to sales.</p>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 flex-1">
              <div className="flex-1">
                <div className="bg-black rounded-2xl p-6 border border-[#222]">
                  <div className="h-40 bg-[#0a0a0a] rounded-xl mb-6 flex items-center justify-center border border-[#222] overflow-hidden">
                    <img src="/truck.png" alt="BDE Truck" className="h-full object-contain" />
                  </div>
                  <div className="mb-5">
                    <p className="text-[#888] text-xs mb-2 flex items-center gap-2">
                      <Palette className="w-4 h-4" /> Exterior Color
                    </p>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-[#042069] flex items-center justify-center cursor-pointer">
                        <Check className="w-4 h-4 text-[#042069]" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#333] cursor-pointer" />
                      <div className="w-10 h-10 rounded-full bg-[#dc2626] border border-[#333] cursor-pointer" />
                      <div className="w-10 h-10 rounded-full bg-[#2563eb] border border-[#333] cursor-pointer" />
                      <div className="w-10 h-10 rounded-full bg-[#16a34a] border border-[#333] cursor-pointer" />
                      <div className="w-10 h-10 rounded-full bg-[#eab308] border border-[#333] cursor-pointer" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-[#111] border border-[#333] rounded-xl px-4 py-3">
                      <span className="text-white text-sm flex items-center gap-2">
                        <BedDouble className="w-4 h-4 text-[#666]" /> Sleeper Cabin
                      </span>
                      <div className="w-12 h-6 bg-[#042069] rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-[#111] border border-[#333] rounded-xl px-4 py-3">
                      <span className="text-white text-sm flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-[#666]" /> Dashboard Style
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#888] text-sm">Physical Gauges</span>
                        <ChevronDown className="w-4 h-4 text-[#666]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-64 space-y-4">
                <div className="glass rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">Why capture this?</h3>
                  <p className="text-sm text-[#888]">Configuration data tells sales exactly what each buyer wants—color, cabin type, features. No guessing on the first call.</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">Options include</h3>
                  <p className="text-sm text-[#888]">Exterior color, sleeper cabin, dashboard style, wheel options, interior materials, tech packages</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">Pricing flexibility</h3>
                  <p className="text-sm text-[#888]">Show prices or keep them hidden. Start without pricing, add when ready.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PAGE 6: What You Learn */}
        <section className="page page-dark noise">
          <div className="content-layer flex flex-col flex-1">
            <p className="text-[#4a7fff] text-sm font-semibold tracking-wide uppercase mb-4">WHAT YOU GET</p>
            <h2 className="text-2xl font-bold text-white mb-8">Every lead tells you exactly what they need.</h2>
            <div className="grid md:grid-cols-2 gap-8 flex-1">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#042069] glow-brand-sm">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Which truck they want</h3>
                    <p className="text-sm text-[#888]">BDE-Series Semi or Pickup Kit—know before you call</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#042069] glow-brand-sm">
                    <Factory className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Their industry</h3>
                    <p className="text-sm text-[#888]">Logging, oilfield, municipal—tailor your conversation</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#042069] glow-brand-sm">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Fleet size</h3>
                    <p className="text-sm text-[#888]">Single truck or 50+ units—prioritize accordingly</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#042069] glow-brand-sm">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Purchase timeline</h3>
                    <p className="text-sm text-[#888]">Ready now? Next quarter? Just researching?</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#042069] glow-brand-sm">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Where they&apos;re located</h3>
                    <p className="text-sm text-[#888]">Province/state for territory planning and logistics</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#042069] glow-brand-sm">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">How they found you</h3>
                    <p className="text-sm text-[#888]">YouTube, website, referral—track what&apos;s working</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-[#222]">
              <p className="text-sm text-[#888]">Every lead arrives with context. Your sales team knows exactly who they&apos;re calling and what to talk about.</p>
            </div>
          </div>
        </section>

        {/* PAGE 7: Where Leads Go */}
        <section className="page page-blue grid-pattern">
          <div className="content-layer flex flex-col flex-1">
            <p className="text-[#4a7fff] text-sm font-semibold tracking-wide uppercase mb-4">BEHIND THE SCENES</p>
            <h2 className="text-2xl font-bold text-white mb-2">Leads flow straight into Odoo.</h2>
            <p className="text-[#999] mb-8">No manual data entry. No spreadsheets. No lost leads.</p>
            <div className="flex-1">
              <div className="grid grid-cols-2 md:flex md:items-center md:justify-center gap-3 md:gap-4 mb-6 md:mb-10">
                <div className="glass rounded-xl p-3 md:p-4 text-center">
                  <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center bg-[#042069]">
                    <ClipboardList className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm font-medium">Buyer fills form</p>
                </div>
                <div className="hidden md:block text-[#042069] text-2xl font-bold glow-text">→</div>
                <div className="glass rounded-xl p-3 md:p-4 text-center">
                  <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center bg-[#042069]">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm font-medium">Data saved securely</p>
                </div>
                <div className="hidden md:block text-[#042069] text-2xl font-bold glow-text">→</div>
                <div className="glass rounded-xl p-3 md:p-4 text-center">
                  <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center bg-white p-1.5">
                    <img src="/odoo-logo.svg" alt="Odoo" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-white text-sm font-medium">Syncs to Odoo</p>
                </div>
                <div className="hidden md:block text-[#042069] text-2xl font-bold glow-text">→</div>
                <div className="glass rounded-xl p-3 md:p-4 text-center !border-[#042069]/50 glow-brand-sm">
                  <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center bg-[#042069] glow-brand-sm">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm font-medium">Team gets notified</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="card-glow rounded-xl p-5">
                  <h3 className="font-semibold text-white mb-2">Instant sync</h3>
                  <p className="text-sm text-[#888]">Leads appear in Odoo within seconds of submission. No waiting, no batching.</p>
                </div>
                <div className="card-glow rounded-xl p-5">
                  <h3 className="font-semibold text-white mb-2">Never loses data</h3>
                  <p className="text-sm text-[#888]">If Odoo is temporarily unavailable, leads queue up and sync when it&apos;s back.</p>
                </div>
                <div className="card-glow rounded-xl p-5">
                  <h3 className="font-semibold text-white mb-2">No duplicates</h3>
                  <p className="text-sm text-[#888]">If someone submits twice, the system recognizes them and updates their record.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PAGE 8: Why Mobile Matters */}
        <section className="page page-dark-alt noise">
          <div className="content-layer flex flex-col flex-1">
            <p className="text-[#4a7fff] text-sm font-semibold tracking-wide uppercase mb-4">BUILT FOR YOUR BUYERS</p>
            <h2 className="text-2xl font-bold text-white mb-8">Truckers live on their phones.</h2>
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 flex-1">
              <div className="flex-1">
                <p className="text-[#999] mb-4 md:mb-6">Your audience isn&apos;t sitting at a desk filling out contact forms. They&apos;re in the cab, at a job site, or watching your videos on a break. This system is designed for exactly that.</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 glass rounded-xl p-4">
                    <div className="w-10 h-10 rounded-lg bg-[#042069] flex items-center justify-center flex-shrink-0 glow-brand-sm">
                      <Sun className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">High contrast for sunlight</h3>
                      <p className="text-sm text-[#888]">Easy to read even in bright outdoor conditions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 glass rounded-xl p-4">
                    <div className="w-10 h-10 rounded-lg bg-[#042069] flex items-center justify-center flex-shrink-0 glow-brand-sm">
                      <Hand className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Big tap targets</h3>
                      <p className="text-sm text-[#888]">Works with work gloves and rough hands</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 glass rounded-xl p-4">
                    <div className="w-10 h-10 rounded-lg bg-[#042069] flex items-center justify-center flex-shrink-0 glow-brand-sm">
                      <Wifi className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Works offline</h3>
                      <p className="text-sm text-[#888]">Loads fast and functions even with spotty cell service</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 glass rounded-xl p-4">
                    <div className="w-10 h-10 rounded-lg bg-[#042069] flex items-center justify-center flex-shrink-0 glow-brand-sm">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Under 60 seconds</h3>
                      <p className="text-sm text-[#888]">Respect their time—quick selections, minimal typing</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block w-64 flex-shrink-0">
                <div className="bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border border-[#333]">
                  <div className="bg-black rounded-[2.2rem] overflow-hidden">
                    <div className="flex justify-between items-center px-6 pt-3 pb-2">
                      <span className="text-white text-[11px] font-medium">9:41</span>
                      <div className="w-28 h-7 bg-black rounded-full" />
                      <div className="flex gap-1 items-center">
                        <Wifi className="w-4 h-4 text-white" />
                        <div className="w-6 h-3 border border-white rounded-sm relative">
                          <div className="absolute inset-0.5 right-1 bg-white rounded-sm" />
                        </div>
                      </div>
                    </div>
                    <div className="px-5 pb-6 space-y-4">
                      <div className="pt-2">
                        <p className="text-[#042069] text-xs font-semibold">STEP 1 OF 4</p>
                        <p className="text-white text-lg font-bold mt-1">Choose Your Truck</p>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="h-1 flex-1 bg-[#042069] rounded-full" />
                        <div className="h-1 flex-1 bg-[#333] rounded-full" />
                        <div className="h-1 flex-1 bg-[#333] rounded-full" />
                        <div className="h-1 flex-1 bg-[#333] rounded-full" />
                      </div>
                      <div className="h-28 bg-[#0a0a0a] rounded-2xl border border-[#222] overflow-hidden">
                        <img src="/truck.png" alt="BDE Truck" className="w-full h-full object-contain" />
                      </div>
                      <div className="border-2 border-[#042069] rounded-2xl p-4 bg-[#042069]/10">
                        <p className="text-white text-sm font-semibold">BDE-Series Semi</p>
                        <p className="text-[#888] text-xs mt-0.5">605HP / 1405HP Hybrid</p>
                      </div>
                      <div className="border border-[#333] rounded-2xl p-4">
                        <p className="text-[#666] text-sm font-semibold">Pickup Conversion</p>
                        <p className="text-[#555] text-xs mt-0.5">Any 3/4 ton diesel</p>
                      </div>
                      <div className="bg-[#042069] rounded-2xl py-4 text-center">
                        <span className="text-white text-sm font-semibold">Continue</span>
                      </div>
                    </div>
                    <div className="flex justify-center pb-2">
                      <div className="w-32 h-1 bg-white/30 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PAGE 9: What's Included */}
        <section className="page page-blue dot-pattern">
          <div className="content-layer flex flex-col flex-1">
            <p className="text-[#4a7fff] text-sm font-semibold tracking-wide uppercase mb-4">WHAT GETS BUILT</p>
            <h2 className="text-2xl font-bold text-white mb-8">Phased approach. Start capturing leads immediately.</h2>
            <div className="space-y-6 flex-1">
              <div className="card-glow rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 bg-[#042069] rounded text-white text-xs font-bold glow-brand-sm">PHASE 1</div>
                  <h3 className="font-semibold text-white">Core Lead Capture</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-[#999]">
                  <ul className="space-y-2">
                    <li className="flex gap-2"><span className="text-[#042069]">✓</span>Landing page with truck imagery</li>
                    <li className="flex gap-2"><span className="text-[#042069]">✓</span>4-step interest form</li>
                    <li className="flex gap-2"><span className="text-[#042069]">✓</span>Mobile-responsive design</li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex gap-2"><span className="text-[#042069]">✓</span>Secure data storage</li>
                    <li className="flex gap-2"><span className="text-[#042069]">✓</span>Basic Odoo sync</li>
                    <li className="flex gap-2"><span className="text-[#042069]">✓</span>Traffic source tracking</li>
                  </ul>
                </div>
              </div>
              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 bg-[#333] rounded text-white text-xs font-bold">PHASE 2</div>
                  <h3 className="font-semibold text-white">Automation & Configurator</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-[#888]">
                  <ul className="space-y-2">
                    <li className="flex gap-2"><span className="text-[#666]">○</span>Real-time Odoo sync</li>
                    <li className="flex gap-2"><span className="text-[#666]">○</span>Vehicle configurator (style your rig)</li>
                    <li className="flex gap-2"><span className="text-[#666]">○</span>Color, cabin, dashboard options</li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex gap-2"><span className="text-[#666]">○</span>Lead scoring</li>
                    <li className="flex gap-2"><span className="text-[#666]">○</span>Admin dashboard</li>
                    <li className="flex gap-2"><span className="text-[#666]">○</span>Save & revisit configuration</li>
                  </ul>
                </div>
              </div>
              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 bg-[#333] rounded text-white text-xs font-bold">FUTURE</div>
                  <h3 className="font-semibold text-white">Enhancements</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-[#888]">
                  <ul className="space-y-2">
                    <li className="flex gap-2"><span className="text-[#666]">○</span>Dealer territory assignment</li>
                    <li className="flex gap-2"><span className="text-[#666]">○</span>Lead nurturing sequences</li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex gap-2"><span className="text-[#666]">○</span>Analytics dashboard</li>
                    <li className="flex gap-2"><span className="text-[#666]">○</span>A/B testing for conversion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PAGE 10: Ongoing Costs */}
        <section className="page page-dark grid-pattern">
          <div className="content-layer flex flex-col flex-1">
            <p className="text-[#4a7fff] text-sm font-semibold tracking-wide uppercase mb-4">ONGOING COSTS</p>
            <h2 className="text-2xl font-bold text-white mb-2">Simple and predictable.</h2>
            <p className="text-[#999] mb-8">After build, here&apos;s what it costs to run.</p>
            <div className="max-w-md mb-auto">
              <div className="glass rounded-xl overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-white/5">
                  <span className="text-[#999]">Website hosting</span>
                  <span className="text-white font-medium">~$20/mo</span>
                </div>
                <div className="flex justify-between items-center p-4 border-b border-white/5">
                  <span className="text-[#999]">Database</span>
                  <span className="text-white font-medium">~$25/mo</span>
                </div>
                <div className="flex justify-between items-center p-4 border-b border-white/5">
                  <span className="text-[#999]">Subdomain</span>
                  <span className="text-white font-medium">$0</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#042069]/20">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-white font-bold text-lg">~$45/mo</span>
                </div>
              </div>
              <p className="text-sm text-[#666] mt-4">Uses your existing Odoo setup. No additional software subscriptions required.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#222]">
              <p className="text-sm text-[#888]">Development cost discussed separately. This is just the ongoing operational expense.</p>
            </div>
          </div>
        </section>

        {/* PAGE 11: Next Steps */}
        <section className="page page-cover noise">
          <div className="content-layer flex flex-col flex-1">
            <p className="text-[#4a7fff] text-sm font-semibold tracking-wide uppercase mb-4">NEXT STEPS</p>
            <h2 className="text-2xl font-bold text-white mb-8">Ready when you are.</h2>
            <div className="space-y-6 max-w-lg mb-auto">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#042069] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 glow-brand-sm">1</div>
                <div>
                  <p className="font-semibold text-white">Review this proposal</p>
                  <p className="text-[#888] text-sm">Questions? Adjustments? Let me know what works.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#042069] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 glow-brand-sm">2</div>
                <div>
                  <p className="font-semibold text-white">Provide truck images</p>
                  <p className="text-[#888] text-sm">High-resolution photos for the form and landing page.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#042069] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 glow-brand-sm">3</div>
                <div>
                  <p className="font-semibold text-white">Confirm Odoo access</p>
                  <p className="text-[#888] text-sm">We&apos;ll need API credentials to set up the integration.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#042069] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 glow-brand-sm">4</div>
                <div>
                  <p className="font-semibold text-white">Launch</p>
                  <p className="text-[#888] text-sm">Start capturing leads and turning followers into buyers.</p>
                </div>
              </div>
            </div>
            <div className="border-t border-[#222] pt-8">
              <p className="text-[#888] mb-8 max-w-lg">Edison has built the audience. Now let&apos;s build the infrastructure to turn attention into sales.</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xl font-semibold text-white">Simon</p>
                  <p className="text-[#888]">Lemonbrand</p>
                </div>
                <p className="text-sm text-[#888]">simon@lemonbrand.io</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default function EdisonProposalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem(STORAGE_KEY);
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#042069] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <PasswordGate onUnlock={() => setIsAuthenticated(true)} />;
  }

  return <Proposal />;
}
