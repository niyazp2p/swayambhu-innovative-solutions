"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Sparkles, Building2, Flame, Layers, ShieldCheck } from "lucide-react";

interface Milestone {
  id: string;
  year: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  impactTag: string;
  icon: React.ElementType;
}

const milestones: Milestone[] = [
  {
    id: "2015",
    year: "2015",
    badge: "01 // GENESIS",
    title: "Incorporation & Incubation",
    subtitle: "DBS Foundation & TISS Backed",
    description:
      "Incorporated as Swayambhu Innovative Solutions Pvt. Ltd.; incubated through Tata Institute of Social Sciences (TISS) and DBS Foundation, receiving Best Business Plan honor by Bihar Industries Association",
    impactTag: "Venture Incubation",
    icon: Building2,
  },
  {
    id: "2016-2017",
    year: "2016–17",
    badge: "02 // GLOBAL STAGE",
    title: "Global Recognition",
    subtitle: "WEF, Engie Paris & ADB Manila",
    description:
      "Decentralized bio-energy models featured at the World Economic Forum (WEF), selected for Engie Paris Clean-Tech showcase, and presented at the Asian Clean Energy Forum by ADB Manila",
    impactTag: "50+ Village Clusters",
    icon: Flame,
  },
  {
    id: "2018-2019",
    year: "2018–19",
    badge: "03 // IMPACT ACCELERATION",
    title: "International Climate Impact",
    subtitle: "USAID Bangkok Award & AIC",
    description:
      "Conferred the USAID Bangkok Circular Innovation Award (Women in Clean Energy), incubated at AIC-Banasthali, and executed community biogas installations with ThoughtWorks CSR",
    impactTag: "USAID Laureate",
    icon: Award,
  },
  {
    id: "2020-2021",
    year: "2020–21",
    badge: "04 // FORMALIZATION",
    title: "Formalization Initiative",
    subtitle: "NITI Aayog SISF & Haridwar Setup",
    description:
      "Organized plastic circularity backed by NITI Aayog SISF; formalized 200+ waste-pickers into formal green livelihoods and commissioned the CPCB-registered Haridwar mechanical recycling facility",
    impactTag: "200+ Formal Recyclers",
    icon: Layers,
  },
  {
    id: "2022-2023",
    year: "2022–23",
    badge: "05 // STRATEGIC MRFS",
    title: "Strategic Corporate MRFs",
    subtitle: "HUL Ajeetpur & Varanasi Station",
    description:
      "Commissioned Model MRF at Ajeetpur (Haridwar) using 8 tonnes of recycled plastic boards with HUL, and deployed the transit MRF hub at Varanasi Cantt Railway Station with Northern Railway.",
    impactTag: "Turnkey Transit Hubs",
    icon: Sparkles,
  },
  {
    id: "2024-2026",
    year: "2024–26",
    badge: "06 // PAN-INDIA EXPANSION",
    title: "Pan-India Scaling",
    subtitle: "Governor Award & Institutional Loop",
    description:
      "Honored as Best Plastic Recycler by the Governor of Uttarakhand, closed institutional zero-waste operations with Banasthali Vidyapith, and exceeded 1,634 MT CPCB Cat-II credit volume",
    impactTag: "1,634+ MT CPCB Cat-II",
    icon: ShieldCheck,
  },
];

export default function AboutTimeline() {
  const [activeMilestone, setActiveMilestone] = useState<Milestone>(milestones[0]);
  const ActiveIcon = activeMilestone.icon;

  return (
    <section className="relative w-full bg-[#111613] text-[#F3F4F1] py-20 sm:py-28 md:py-36 px-5 sm:px-10 lg:px-16 overflow-hidden selection:bg-[#22C55E] selection:text-black">
      {/* Ambient Radial Lighting */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1310] via-transparent to-[#0E1310]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Eyebrow Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-12 sm:mb-16">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#8EA394]">
              03 // Historical Trajectory
            </span>
          </div>

          <span className="text-[10px] sm:text-xs font-mono text-white/50 uppercase tracking-wider">
            2015 — 2026 Milestone Arc
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-12 sm:mb-16 text-left">
          <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-none mb-4">
            A Decade Of <br />
            <span className="text-[#22C55E]">Material Circularity.</span>
          </h2>
          <p className="text-xs sm:text-base text-white/70 font-light leading-relaxed">
            From a localized Bihar bio-energy pilot to an authorized CPCB Category-II recycling infrastructure spanning transit hubs and corporate partnerships
          </p>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP HORIZONTAL CIRCUIT (Interactive on Hover)        */}
        {/* ======================================================== */}
        <div className="hidden lg:flex flex-col space-y-10">
          {/* Horizontal Track Spine */}
          <div className="relative pt-6 pb-4">
            {/* Base Continuous Conduit Line */}
            <div className="absolute top-[37px] left-0 right-0 h-[2px] bg-white/[0.08] z-0" />

            <div className="grid grid-cols-6 gap-4 relative z-10">
              {milestones.map((m) => {
                const isActive = activeMilestone.id === m.id;
                const ItemIcon = m.icon;

                return (
                  <div
                    key={m.id}
                    onMouseEnter={() => setActiveMilestone(m)}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    {/* Node Circuit Button */}
                    <div
                      className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-[#22C55E] text-black shadow-[0_0_24px_rgba(34,197,94,0.7)] scale-110"
                          : "bg-[#16201A] border border-white/15 text-white/60 group-hover:border-[#22C55E]/60 group-hover:text-white"
                      }`}
                    >
                      <ItemIcon className="w-5 h-5" />

                      {isActive && (
                        <span className="absolute inset-0 rounded-full border border-[#22C55E] animate-ping opacity-60 pointer-events-none" />
                      )}
                    </div>

                    {/* Year Stamp */}
                    <span
                      className={`text-sm font-mono tracking-tight font-bold mt-3 transition-colors ${
                        isActive ? "text-[#22C55E]" : "text-white/40 group-hover:text-white"
                      }`}
                    >
                      {m.year}
                    </span>

                    {/* Miniature Tag */}
                    <span
                      className={`text-[9px] font-mono uppercase tracking-widest mt-1 text-center line-clamp-1 transition-colors ${
                        isActive ? "text-white/90" : "text-white/30"
                      }`}
                    >
                      {m.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Milestone Stage Screen */}
          <div className="relative p-8 sm:p-10 rounded-2xl bg-[#16201A]/90 border border-white/10 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-12 gap-8 items-center"
              >
                <div className="col-span-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#22C55E] uppercase tracking-wider">
                      {activeMilestone.badge}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span className="text-xs font-mono text-white/50">
                      {activeMilestone.subtitle}
                    </span>
                  </div>

                  <h3 className="text-3xl font-black uppercase text-white tracking-tight leading-snug">
                    {activeMilestone.title}
                  </h3>

                  <p className="text-white/70 text-base leading-relaxed font-light max-w-2xl">
                    {activeMilestone.description}
                  </p>
                </div>

                <div className="col-span-4 border-l border-white/[0.08] pl-8 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8EA394] font-semibold block mb-1">
                      Target Accomplishment
                    </span>
                    <span className="text-xl font-mono font-bold text-white block">
                      {activeMilestone.impactTag}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#22C55E] shrink-0">
                      <ActiveIcon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase text-white/40">
                        Operational Period
                      </span>
                      <span className="text-xs font-mono font-bold text-white">
                        {activeMilestone.year} Roadmap
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MOBILE HORIZONTAL SWIPEABLE CAROUSEL (Snap Connected)   */}
        {/* ======================================================== */}
        <div className="block lg:hidden text-left">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-6 pt-2 snap-x snap-mandatory -mx-5 px-5">
            {milestones.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="snap-center shrink-0 w-[290px] sm:w-[340px] rounded-2xl bg-[#16201A] border border-white/10 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden"
                >
                  {/* Subtle Connecting Marker Badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-mono font-bold text-[#22C55E]">
                        {item.year}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-white/40">
                      0{idx + 1} / 06
                    </span>
                  </div>

                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8EA394] block">
                      {item.subtitle}
                    </span>
                    <h4 className="text-lg font-bold uppercase tracking-tight text-white leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-white/70 font-light leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-white/40">Result</span>
                    <span className="text-xs font-mono font-semibold text-[#22C55E]">
                      {item.impactTag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Swipe Indicator Note */}
          <div className="flex items-center justify-center gap-2 pt-2 text-[10px] font-mono text-white/40 uppercase tracking-widest">
            <span>← Swipe To Trace Timeline →</span>
          </div>
        </div>
      </div>
    </section>
  );
}