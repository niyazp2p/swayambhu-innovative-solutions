"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Recycle,
  Building2,
  Flame,
  Armchair,
  Landmark,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface WorkCard {
  id: string;
  code: string;
  title: string;
  category: string;
  impactMetric: string;
  description: string;
  partnerTag: string;
  icon: React.ElementType;
}

const operationalCards: WorkCard[] = [
  {
    id: "mrf",
    code: "01",
    title: "Material Recovery Facilities",
    category: "Decentralized Sorting",
    impactMetric: "19 Streams Segregated",
    description:
      "Decentralized MRF hubs diverting post-consumer and industrial tonnage from dumping yards.",
    partnerTag: "HUL Ajeetpur & Varanasi",
    icon: Building2,
  },
  {
    id: "mechanical-recycling",
    code: "02",
    title: "Polymer Mechanical Recycling",
    category: "Haridwar Facility",
    impactMetric: "1,634 MT Cat-II EPR",
    description:
      "CPCB-registered compaction and extrusion converting flexible MLP plastics into structural assets.",
    partnerTag: "Statutory PWM Compliance",
    icon: Recycle,
  },
  {
    id: "biogas",
    code: "03",
    title: "Decentralized Biogas Plants",
    category: "Bio-Energy Systems",
    impactMetric: "11.12L+ Kgs Clean Gas",
    description:
      "Anaerobic digestion cells transforming organic refuse into clean methane cooking fuel.",
    partnerTag: "122 Operational Units",
    icon: Flame,
  },
  {
    id: "eco-infrastructure",
    code: "04",
    title: "CSR Eco-School Furniture",
    category: "30+ Yr Upcycled Assets",
    impactMetric: "400+ Schools Equipped",
    description:
      "Termite-proof, waterproof recycled classroom desks and modular handwashing blocks.",
    partnerTag: "ITC Limited & Lifebuoy",
    icon: Armchair,
  },
  {
    id: "station-zerowaste",
    code: "05",
    title: "Campus & Station Zero-Waste",
    category: "Transit Hub Management",
    impactMetric: "100% Landfill Diversion",
    description:
      "Integrated source segregation and verifiable chain-of-custody audit logs for transit hubs.",
    partnerTag: "Northern Railway & Tata Power",
    icon: Landmark,
  },
];

const easeExpo = [0.16, 1, 0.3, 1] as const;

export default function ImpactHero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % operationalCards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeCard = operationalCards[activeIdx];
  const ActiveIcon = activeCard.icon;

  return (
    <section className="relative w-full min-h-[92svh] bg-[#0A0F0D] text-[#F3F4F1] flex flex-col justify-between overflow-hidden selection:bg-[#22C55E] selection:text-black">
      {/* Background Image: High Clarity with Subtle Contrast */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/banner2.jpeg"
          alt="Swayambhu Processing Facility"
          fill
          priority
          className="object-cover object-center grayscale-[0.15] contrast-[1.08] brightness-[0.72]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0D] via-[#0A0F0D]/35 to-[#0A0F0D]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F0D]/80 via-[#0A0F0D]/40 to-transparent lg:block hidden" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,197,94,0.12)_0%,transparent_70%)]" />
      </div>

      {/* Top Header Eyebrow */}
      <header className="relative z-10 w-full max-w-7xl mx-auto pt-24 sm:pt-28 md:pt-32 px-5 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0F0D]/70 border border-white/15 backdrop-blur-md shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
          </span>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-white/95 font-semibold">
            Verified Environmental Proof
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/70 px-3 py-1 rounded-full bg-[#0A0F0D]/50 border border-white/10 backdrop-blur-sm uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
          <span>ISO 14064 Accounting Standard</span>
        </div>
      </header>

      {/* Core Split Grid */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 flex-1 flex flex-col justify-center py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (Maintains Authority Dark Contrast) */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left space-y-5">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.26em] text-[#22C55E] font-bold">
              01 // Measured Outcomes
            </span>

            <h1 className="font-sans font-black uppercase text-[clamp(2.3rem,6.5vw,4.4rem)] leading-[0.94] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              Data-Backed <br />
              Circularity. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] via-[#4ADE80] to-[#8FA295]">
                Zero-Landfill Proof.
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-white/90 font-light leading-relaxed max-w-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Channeling enterprise packaging and municipal waste into verified Category-II EPR credits, clean bio-methane, and long-lifespan municipal assets.
            </p>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 pt-1 w-full max-w-md">
              <div className="p-3 rounded-xl bg-[#0A0F0D]/75 border border-white/15 backdrop-blur-md shadow-xl text-center">
                <span className="text-base sm:text-xl font-mono font-bold text-white block">
                  19,838+
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-[#22C55E] uppercase tracking-wider block mt-0.5 font-semibold">
                  MT Diverted
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#0A0F0D]/75 border border-white/15 backdrop-blur-md shadow-xl text-center">
                <span className="text-base sm:text-xl font-mono font-bold text-white block">
                  6,800+
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-[#22C55E] uppercase tracking-wider block mt-0.5 font-semibold">
                  MT Upcycled
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#0A0F0D]/75 border border-white/15 backdrop-blur-md shadow-xl text-center">
                <span className="text-base sm:text-xl font-mono font-bold text-white block">
                  1,634
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-[#22C55E] uppercase tracking-wider block mt-0.5 font-semibold">
                  MT Cat-II EPR
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A0F0D]/80 border border-[#22C55E]/40 hover:border-[#22C55E] text-xs font-mono font-bold uppercase tracking-wider text-[#22C55E] hover:text-[#4ADE80] transition-all backdrop-blur-sm shadow-md"
              >
                <span>Request Inquiry</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Light Aesthetic Cards */}
          <div
            className="lg:col-span-5 flex flex-col justify-center items-center relative min-h-[340px] sm:min-h-[380px] w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="absolute w-72 h-72 bg-[#22C55E]/15 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard.id}
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.96 }}
                transition={{ duration: 0.35, ease: easeExpo }}
                className="w-full max-w-sm sm:max-w-md rounded-2xl bg-[#FDF8EE] border border-[#DDE5DC] p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.45)] text-left relative overflow-hidden"
              >
                {/* Card Header (Light) */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#DDE5DC] mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#EEF5ED] border border-[#006B3C]/15 flex items-center justify-center text-[#006B3C]">
                      <ActiveIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-[#006B3C] uppercase tracking-wider font-bold block">
                        STAGE {activeCard.code} // 05
                      </span>
                      <span className="text-[11px] font-mono text-[#52605A] block">
                        {activeCard.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#EEF5ED] border border-[#006B3C]/10 text-[#006B3C] font-semibold">
                    {activeCard.partnerTag}
                  </span>
                </div>

                {/* Card Body (Light) */}
                <div className="space-y-2 mb-4">
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#171F1B] leading-tight">
                    {activeCard.title}
                  </h2>
                  <p className="text-xs text-[#52605A] font-light leading-relaxed">
                    {activeCard.description}
                  </p>
                </div>

                {/* Metric Strip (Light) */}
                <div className="p-3 rounded-lg bg-white border border-[#DDE5DC] flex items-center justify-between shadow-sm">
                  <span className="text-[9px] font-mono uppercase text-[#7B8580] tracking-wider font-medium">
                    Validated Metric
                  </span>
                  <span className="text-xs font-mono font-bold text-[#006B3C]">
                    {activeCard.impactMetric}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#006B3C] to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5 mt-5">
              {operationalCards.map((card, idx) => {
                const isCurrent = activeIdx === idx;
                return (
                  <button
                    key={card.id}
                    onClick={() => setActiveIdx(idx)}
                    className="group relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                    style={{ width: isCurrent ? "28px" : "8px" }}
                    aria-label={`Go to ${card.title}`}
                  >
                    <div className="absolute inset-0 bg-white/25 group-hover:bg-white/40" />
                    {isCurrent && (
                      <motion.div
                        layoutId="impactHeroProgress"
                        className="absolute inset-0 bg-[#22C55E]"
                        transition={{ duration: 4, ease: "linear" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      {/* Bottom Telemetry Footer */}
      <footer className="relative z-20 w-full border-t border-white/10 bg-[#0A0F0D]/90 backdrop-blur-2xl py-3 shrink-0">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-mono text-white/70 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 text-[#22C55E]">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span className="uppercase tracking-wider font-semibold text-[11px] sm:text-xs">
              Central Pollution Control Board Verified Facility
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-white/50 uppercase tracking-widest">
            <span>Haridwar SIDCUL Hub</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/20" />
            <span>Northern Railway Hub</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/20" />
            <span>HUL Project Prabhat</span>
          </div>
        </div>
      </footer>
    </section>
  );
}