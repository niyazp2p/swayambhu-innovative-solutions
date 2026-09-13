"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import { useScroll } from "@/providers/ScrollProvider";

interface SectorData {
  id: string;
  name: string;
  challenge: string;
  opportunity: string;
  approach: string;
  recoveryStat: string;
}

const sectors: SectorData[] = [
  {
    id: "manufacturing",
    name: "Manufacturing",
    challenge: "High-volume composite scrap and factory purge lumps destined for landfills.",
    opportunity: "Direct recovery into standardized raw material inputs and closed-loop resins.",
    approach: "On-site segregation paired with high-tonnage mechanical regrinding at Haridwar.",
    recoveryStat: "94% Material Retained",
  },
  {
    id: "fmcg",
    name: "FMCG",
    challenge: "Multi-layered packaging (MLP) and post-consumer plastic footprint compliance.",
    opportunity: "Audited Category-II EPR generation and 100% regulatory offset fulfillment.",
    approach: "Decentralized collection networks coupled with high-durability upcycled boards.",
    recoveryStat: "1,634+ MT Credits Issued",
  },
  {
    id: "retail",
    name: "Retail",
    challenge: "Unsegregated corrugated transit boxes, LDPE shrink wrap, and pallet stretch films.",
    opportunity: "Clean single-polymer aggregation maximizing scrap buyback value.",
    approach: "Automated baling schedules and direct-to-mill paper and poly recovery pipelines.",
    recoveryStat: "100% Recyclable Route",
  },
  {
    id: "industrial",
    name: "Industrial",
    challenge: "Complex, mixed material inputs with hazardous and non-hazardous commingling.",
    opportunity: "Recoverable value within the stream with strict environmental audit dossiers.",
    approach: "A structured pathway from source segregation to high-durability output assets.",
    recoveryStat: "Zero-Landfill Protocol",
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    challenge: "Heavy construction polymers, HDPE conduit scrap, and non-biodegradable debris.",
    opportunity: "Conversion into long-cycle utility products like public benches and school desks.",
    approach: "Heavy-duty thermal extrusion producing 30+ year lifespan weather-proof assets.",
    recoveryStat: "30+ Year Asset Life",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    challenge: "High daily volumes of wet organic food refuse combined with single-use guest plastics.",
    opportunity: "Decentralized clean cooking energy alongside zero-plastic hospitality certification.",
    approach: "Micro-biogas digester plants diverting organics directly into usable methane fuel.",
    recoveryStat: "11.12L+ Kgs Gas Yield",
  },
  {
    id: "institutions",
    name: "Institutions",
    challenge: "Scattered multi-building waste generation across large academic and research campuses.",
    opportunity: "Green campus accreditation, circular education, and Swachh audit elevation.",
    approach: "Dedicated campus MRFs with student and community participation models.",
    recoveryStat: "Varanasi Station Model",
  },
  {
    id: "government",
    name: "Government",
    challenge: "Overburdened municipal dumpsites and low Swachh Survekshan segregation scores.",
    opportunity: "Turnkey MRF operation with formalization of local informal waste-picker livelihoods.",
    approach: "Public-Private Partnerships (PPP) delivering 19-category sorting and EPR verification.",
    recoveryStat: "19 Streams Sorted",
  },
  {
    id: "logistics",
    name: "Logistics",
    challenge: "Excess packaging tape, broken crates, damaged pallets, and strapping bands.",
    opportunity: "Secondary packaging circularity eliminating recurring transit disposal costs.",
    approach: "Standardized warehouse collection hubs and batch extrusion recycling.",
    recoveryStat: "Closed Logistics Loop",
  },
];

export default function ComplexWasteStreams() {
  const [activeSector, setActiveSector] = useState<SectorData>(sectors[3]); // Default: Industrial
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useScroll();

  const handleSectorClick = (sector: SectorData, index: number) => {
    setActiveSector(sector);
    // Smooth auto-scroll for horizontal mobile pill container
    if (scrollRef.current) {
      const pill = scrollRef.current.children[index] as HTMLElement;
      if (pill) {
        scrollRef.current.scrollTo({
          left: pill.offsetLeft - 24,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section className="relative w-full bg-[#101512] text-[#F3F4F1] py-16 sm:py-24 md:py-32 px-5 sm:px-10 lg:px-16 overflow-hidden selection:bg-[#22C55E] selection:text-black">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-1/3 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C100E] via-transparent to-[#0C100E]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Eyebrow */}
        <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-white/[0.08] mb-8 sm:mb-14">
          <div className="flex items-center gap-2">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#8EA394]">
              04 // Sector Interventions
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-white/50 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
            <span className="hidden xs:inline">Turnkey Industrial Circularity</span>
            <span className="xs:hidden">Circularity</span>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* ======================================================== */}
          {/* LEFT: MONUMENTAL EDITORIAL HEADLINE                       */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-sans font-black uppercase text-[clamp(2.5rem,11vw,5.5rem)] leading-[0.88] tracking-[-0.04em] text-white">
                Built For <br />
                Complex <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#22C55E] via-[#4ADE80] to-[#80A88B]">
                  Waste <br />
                  Streams.
                </span>
              </h2>

              <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed mt-4 sm:mt-6 max-w-md">
                Every sector generates unique waste topologies. Swayambhu constructs dedicated material value chains calibrated to your specific regulatory and operational reality.
              </p>
            </div>

            {/* Micro Badge (Desktop Only to preserve vertical rhythm on mobile) */}
            <div className="hidden lg:flex mt-8 pt-6 border-t border-white/[0.08] items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-white/80">
                <Sparkles className="w-4 h-4 text-[#22C55E]" />
                <span>Active Target: <strong className="text-[#22C55E]">{activeSector.name}</strong></span>
              </div>

              <button
                onClick={() => scrollTo("#CTA", { offset: -40 })}
                className="group inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white/70 hover:text-[#22C55E] transition-colors"
              >
                <span>Scope Sector</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT: INTERACTIVE SECTORS & ADAPTIVE CARDS               */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-10">
            
            {/* 1. SECTOR SELECTOR: Desktop wraps naturally; Mobile provides smooth horizontal snap bar */}
            <div 
              ref={scrollRef}
              className="flex items-center gap-2 sm:gap-x-8 sm:gap-y-4 overflow-x-auto sm:overflow-visible no-scrollbar pb-2 sm:pb-0 sm:flex-wrap -mx-5 px-5 sm:mx-0 sm:px-0"
            >
              {sectors.map((sector, index) => {
                const isSelected = activeSector.id === sector.id;
                return (
                  <button
                    key={sector.id}
                    onClick={() => handleSectorClick(sector, index)}
                    onMouseEnter={() => setActiveSector(sector)}
                    className={`relative shrink-0 text-sm sm:text-2xl md:text-3xl font-light tracking-tight transition-all duration-200 cursor-pointer px-3 py-1.5 sm:px-0 sm:py-0 rounded-full sm:rounded-none border sm:border-none ${
                      isSelected
                        ? "text-white font-semibold border-[#22C55E]/60 bg-[#22C55E]/10 sm:bg-transparent"
                        : "text-white/40 border-white/10 hover:text-white/75 bg-white/[0.02] sm:bg-transparent"
                    }`}
                  >
                    <span>{sector.name}</span>

                    {/* Desktop Architectural Outline Box */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeSectorOutline"
                        className="hidden sm:block absolute -inset-x-2.5 -inset-y-1 rounded border border-[#22C55E]/60 bg-[#22C55E]/[0.06]"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hairline Divider */}
            <div className="h-[1px] w-full bg-white/[0.08]" />

            {/* 2. DYNAMIC CONTENT: Stacked card format on Mobile, 3-column on Desktop */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSector.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-8"
              >
                {/* Column 1: Challenge */}
                <div className="p-4 sm:p-0 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/[0.06] sm:border-none space-y-1.5 sm:space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8EA394] font-semibold block">
                    Challenge
                  </span>
                  <p className="text-xs sm:text-[13px] text-white/75 font-light leading-relaxed">
                    {activeSector.challenge}
                  </p>
                </div>

                {/* Column 2: Opportunity */}
                <div className="p-4 sm:p-0 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/[0.06] sm:border-none space-y-1.5 sm:space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#22C55E] font-semibold block">
                    Opportunity
                  </span>
                  <p className="text-xs sm:text-[13px] text-white/75 font-light leading-relaxed">
                    {activeSector.opportunity}
                  </p>
                </div>

                {/* Column 3: Approach */}
                <div className="p-4 sm:p-0 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/[0.06] sm:border-none space-y-1.5 sm:space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8EA394] font-semibold block">
                    Approach
                  </span>
                  <p className="text-xs sm:text-[13px] text-white/75 font-light leading-relaxed">
                    {activeSector.approach}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Status Footer & Mobile CTA */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
              <span className="text-white/40 uppercase tracking-wider text-[11px] sm:text-xs">Validated Metric</span>
              <span className="text-[#22C55E] font-bold tracking-wider text-[11px] sm:text-xs">{activeSector.recoveryStat}</span>
            </div>

            {/* Mobile-only CTA */}
            <div className="block lg:hidden pt-2">
              <button
                onClick={() => scrollTo("#contact", { offset: -40 })}
                className="w-full py-3 rounded-lg border border-[#22C55E]/40 bg-[#22C55E]/10 hover:bg-[#22C55E] text-[#22C55E] hover:text-black font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <span>Scope {activeSector.name} Partnership</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}