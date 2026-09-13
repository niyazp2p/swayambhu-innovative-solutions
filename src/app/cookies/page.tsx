"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cookie,
  ShieldCheck,
  CheckCircle2,
  Mail,
  ArrowUpRight,
  Sliders,
  Database,
  Lock,
} from "lucide-react";

const easeCurve = [0.16, 1, 0.3, 1] as const;

interface CookieCategory {
  id: string;
  name: string;
  badge: string;
  required: boolean;
  description: string;
  examples: string[];
}

const cookieCategories: CookieCategory[] = [
  {
    id: "essential",
    name: "Strictly Necessary & Session Tokens",
    badge: "Mandatory",
    required: true,
    description:
      "Essential for secure portal authentication, load balancing, CSRF protection, and preserving intake form state during technical submissions.",
    examples: ["_sw_session", "csrf_token", "cookie_consent_flag"],
  },
  {
    id: "telemetry",
    name: "Telemetry & Operational Analytics",
    badge: "Optional",
    required: false,
    description:
      "Aggregates anonymized latency, component rendering speeds, and mobile navigation pathways to optimize our ERP/CRM interface performance.",
    examples: ["_sw_perf", "viewport_density", "analytics_session"],
  },
  {
    id: "functional",
    name: "Functional & Interface Preferences",
    badge: "Optional",
    required: false,
    description:
      "Stores local viewport states, modal dismissals, and knowledge-base assistant chat interactions across visits.",
    examples: ["assistant_state", "preferred_intake_type"],
  },
];

export default function CookiesPage() {
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    essential: true,
    telemetry: true,
    functional: true,
  });
  const [savedStatus, setSavedStatus] = useState<boolean>(false);

  const toggleCategory = (id: string) => {
    if (id === "essential") return;
    setPreferences((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSavePreferences = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2200);
  };

  return (
    <main className="relative w-full bg-[#FDF8EE] text-[#171F1B] selection:bg-[#006B3C] selection:text-white pb-16 sm:pb-24">
      {/* 1. DARK CHARCOAL AUTHORITY HERO */}
      <section className="relative w-full bg-[#0A0F0D] text-[#F3F4F1] pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-20 px-4 sm:px-8 lg:px-16 overflow-hidden border-b border-white/10 selection:bg-[#22C55E] selection:text-black">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[650px] h-[240px] sm:h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.14)_0%,transparent_70%)] blur-2xl sm:blur-3xl" />
          <div className="max-w-7xl mx-auto h-full border-x border-white/[0.04] grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.04]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F0D]/90 via-transparent to-[#0A0F0D]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-left sm:text-center flex flex-col items-start sm:items-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeCurve }}
            className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#0A0F0D]/90 border border-white/15 backdrop-blur-md mb-4 sm:mb-6 shadow-md"
          >
            <Cookie className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
            <span className="text-[9px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/90 font-semibold">
              Telemetry & Consent Architecture
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeCurve }}
            className="font-sans font-black uppercase text-[clamp(1.85rem,6.5vw,4.2rem)] leading-[1.02] tracking-tight text-white mb-4 sm:mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
          >
            Cookies & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] via-[#4ADE80] to-[#8FA295]">
              Session Governance.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeCurve }}
            className="text-xs sm:text-base text-white/80 font-light leading-relaxed max-w-2xl mx-0 sm:mx-auto mb-6 sm:mb-8"
          >
            Transparent tracking controls governing how Swayambhu Innovative Solutions stores minimal functional state, session cookies, and interface analytics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: easeCurve }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3.5 w-full max-w-2xl"
          >
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-start sm:items-center">
              <span className="text-[8px] sm:text-[9px] font-mono text-[#22C55E] uppercase tracking-wider font-semibold">Third-Party Sale</span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-white mt-0.5">Zero Tracking</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-start sm:items-center">
              <span className="text-[8px] sm:text-[9px] font-mono text-[#22C55E] uppercase tracking-wider font-semibold">Security</span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-white mt-0.5">Encrypted Tokens</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-start sm:items-center col-span-2 sm:col-span-1">
              <span className="text-[8px] sm:text-[9px] font-mono text-[#22C55E] uppercase tracking-wider font-semibold">Audit Norm</span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-white mt-0.5">DPDPA Aligned</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. MINIMAL LIGHT AESTHETIC CONFIGURATOR & POLICY LEDGER */}
      <section className="relative z-10 w-full max-w-4xl mx-auto py-10 sm:py-16 px-4 sm:px-8 text-left space-y-8 sm:space-y-12">
        {/* Interactive Consent Controller */}
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#DDE5DC] p-5 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#DDE5DC]">
            <div className="flex items-center gap-2.5">
              <Sliders className="w-4 h-4 text-[#006B3C]" />
              <h2 className="text-base sm:text-xl font-bold uppercase tracking-tight text-[#171F1B]">
                Cookie Control Center
              </h2>
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase text-[#006B3C] bg-[#EEF5ED] px-2.5 py-1 rounded-full font-semibold">
              Live Configuration
            </span>
          </div>

          <div className="space-y-4">
            {cookieCategories.map((cat) => {
              const isEnabled = preferences[cat.id];
              return (
                <div
                  key={cat.id}
                  className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 transition-all"
                >
                  <div className="space-y-1 max-w-lg">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs sm:text-sm font-bold text-[#171F1B]">
                        {cat.name}
                      </h3>
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                          cat.required
                            ? "bg-[#DDE5DC] text-[#52605A]"
                            : "bg-[#EEF5ED] text-[#006B3C]"
                        }`}
                      >
                        {cat.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#52605A] font-light leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cat.examples.map((ex) => (
                        <span
                          key={ex}
                          className="text-[9px] font-mono bg-white border border-[#DDE5DC] text-[#7B8580] px-1.5 py-0.5 rounded"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center self-end sm:self-center">
                    <button
                      disabled={cat.required}
                      onClick={() => toggleCategory(cat.id)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        cat.required || isEnabled ? "bg-[#006B3C]" : "bg-[#DDE5DC]"
                      } ${cat.required ? "opacity-60 cursor-not-allowed" : ""}`}
                      role="switch"
                      aria-checked={cat.required || isEnabled}
                      aria-label={`Toggle ${cat.name}`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                          cat.required || isEnabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#DDE5DC]">
            <span className="text-[11px] font-mono text-[#7B8580] text-center sm:text-left">
              Changes take effect immediately across all subdomain sessions.
            </span>
            <button
              onClick={handleSavePreferences}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#006B3C] hover:bg-[#063D2A] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              {savedStatus ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Preferences Stored</span>
                </>
              ) : (
                <span>Save Selection</span>
              )}
            </button>
          </div>
        </div>

        {/* Minimal Explanatory Text */}
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#DDE5DC] p-5 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
          <div className="space-y-2">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#006B3C] font-bold block">
              Governance Summary
            </span>
            <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-[#171F1B]">
              Storage Duration & Browser Clearance
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#52605A] font-light leading-relaxed">
            <p>
              Session tokens remain active solely for the duration of an active browser window. Functional preference cookies are retained for a maximum duration of 12 months before automated invalidation, requiring re-consent upon policy version increments.
            </p>
            <p>
              You can revoke or clear existing cookie payloads at any time through standard browser privacy preferences (Settings &gt; Privacy &gt; Clear Site Data) or by toggling options above.
            </p>
          </div>

          <div className="pt-4 border-t border-[#DDE5DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#7B8580]">
              <Lock className="w-3.5 h-3.5 text-[#006B3C]" />
              <span>Full legal text available in our Privacy Policy</span>
            </div>
            <Link
              href="/privacy-policy"
              className="inline-flex items-center gap-1 text-[#006B3C] font-bold hover:underline"
            >
              <span>View Privacy Policy</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}