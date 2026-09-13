"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import {
  Eye,
  ArrowUpRight,
  X,
  CheckCircle2,
  Recycle,
  Building2,
  Flame,
  Armchair,
  Landmark,
  Gauge,
  ChevronLeft,
  ChevronRight,
  FileCheck,
} from "lucide-react";

interface SolutionModule {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  metricBadge: string;
  summary: string;
  icon: React.ElementType;
  primaryProof: string;
  complianceTag: string;
  partnerReference: string;
  deliverables: string[];
  specs: { label: string; value: string }[];
}

const solutionsModules: SolutionModule[] = [
  {
    id: "epr",
    code: "01",
    title: "Plastic Recycling & Category-II EPR",
    subtitle: "CPCB Category-II Compliance",
    metricBadge: "1,634 MT Certified",
    summary:
      "CPCB-registered recycling infrastructure converting landfill-bound plastics into 30+ year lifespan boards while issuing audited Category-II certificates.",
    icon: Recycle,
    primaryProof: "1,634 MT Generated",
    complianceTag: "PWM Rules / CPCB Portal",
    partnerReference: "Brand Owners & PIBOs",
    deliverables: [
      "1,634 MT Category-II EPR Certificates generated and verified on the CPCB portal.",
      "Direct statutory plastic packaging compliance under MoEFCC PWM Rules.",
      "Recycled products remain 100% recyclable again at end-of-life.",
    ],
    specs: [
      { label: "Lifespan", value: "30+ Years" },
      { label: "Loop Integrity", value: "100% Closed Loop" },
      { label: "Output Stream", value: "Structural Eco-Boards" },
    ],
  },
  {
    id: "mrf",
    code: "02",
    title: "Material Recovery Facilities (MRFs)",
    subtitle: "Turnkey Segregation Infrastructure",
    metricBadge: "19-Stream Sorting",
    summary:
      "Establishing centralized and transit sorting centers in partnership with municipalities and corporations to divert maximum recyclables from dumpsites.",
    icon: Building2,
    primaryProof: "5 Operational Hubs",
    complianceTag: "Swachh Survekshan Standard",
    partnerReference: "Hindustan Unilever & Northern Railway",
    deliverables: [
      "Model MRF at Ajeetpur, Haridwar utilizing 8 tonnes of recycled plastic boards with HUL.",
      "Transit MRF hub at Varanasi Cantt Station running zero-waste operations with Northern Railway.",
      "High-precision optical & manual segregation across 19 dry waste streams.",
    ],
    specs: [
      { label: "Sorting Capacity", value: "6 Tonnes / Day" },
      { label: "Fractions", value: "19 Distinct Streams" },
      { label: "Civic Model", value: "PPP Integration" },
    ],
  },
  {
    id: "biogas",
    code: "03",
    title: "Community & Institutional Biogas",
    subtitle: "Decentralized Clean Cooking Energy",
    metricBadge: "11.12L+ Kgs Fuel",
    summary:
      "Decentralized anaerobic digesters converting food processing residue, organic municipal waste, and agricultural biomass into pressurized green gas.",
    icon: Flame,
    primaryProof: "122 Digesters Deployed",
    complianceTag: "Clean Cooking Fuel",
    partnerReference: "ThoughtWorks CSR & Rural Clusters",
    deliverables: [
      "122 individual and community digesters operational across rural and peri-urban clusters.",
      "11,12,030+ Kgs of clean cooking methane gas produced to date.",
      "Displaces firewood and commercial LPG, eliminating indoor particulate smoke pollution.",
    ],
    specs: [
      { label: "By-Product", value: "Organic Bio-Fertilizer" },
      { label: "Emissions", value: "Methane Capture" },
      { label: "Household Reach", value: "Clean Rural Energy" },
    ],
  },
  {
    id: "eco-furniture",
    code: "04",
    title: "Eco-Furniture & School Sanitation",
    subtitle: "CSR High-Impact Assets",
    metricBadge: "400+ Institutions",
    summary:
      "Anti-termite, waterproof, and fire-retardant school desks, benches, handwashing stations, and modular toilet units fabricated from compressed plastic boards.",
    icon: Armchair,
    primaryProof: "30+ Year Guarantee",
    complianceTag: "CSR Schedule VII",
    partnerReference: "ITC Limited & Lifebuoy / HUL",
    deliverables: [
      "Recycled dual-desks and benches deployed under corporate CSR with ITC Limited.",
      "Lifebuoy/HUL branded handwashing stations installed across 400+ government schools.",
      "Measurably reduced female student dropouts across schools in Arunachal Pradesh.",
    ],
    specs: [
      { label: "Material", value: "100% Recycled Polymer" },
      { label: "Durability", value: "Water & Termite Proof" },
      { label: "Maintenance", value: "Zero Chemical Paint" },
    ],
  },
  {
    id: "zero-waste",
    code: "05",
    title: "Campus & Station Zero-Waste",
    subtitle: "Complete Source-to-Output Auditing",
    metricBadge: "100% Landfill Diversion",
    summary:
      "Closed-loop segregation, sorting, and upcycling models engineered for railway junctions, university campuses, and large-scale industrial complexes.",
    icon: Landmark,
    primaryProof: "Zero Landfill Proof",
    complianceTag: "Zero-Waste Standard",
    partnerReference: "Tata Power & Banasthali Vidyapith",
    deliverables: [
      "Modelled on the Varanasi Railway Station Northern Railway partnership.",
      "Industrial factory waste recycling and resource circularity active with Tata Power.",
      "Comprehensive campus-wide zero-landfill operations with Banasthali Vidyapith.",
    ],
    specs: [
      { label: "Audit Readiness", value: "Real-Time Tracking" },
      { label: "Footprint", value: "Transit & Corporate Parks" },
      { label: "Chain of Custody", value: "100% Audited Proof" },
    ],
  },
  {
    id: "carbon",
    code: "06",
    title: "Carbon Neutral Solutions & BRSR",
    subtitle: "Scope 1, 2 & 3 Footprint Abatement",
    metricBadge: "ISO 14064 Aligned",
    summary:
      "Decentralized bio-energy, landfill diversion accounting, and certified carbon emission offsets calibrated for corporate ESG roadmaps and statutory reporting.",
    icon: Gauge,
    primaryProof: "BRSR Core Aligned",
    complianceTag: "GHG Protocol Baseline",
    partnerReference: "SEBI BRSR Compliance",
    deliverables: [
      "Quantified GHG & CO2e emissions reduction via organic waste diversion and bio-methane.",
      "Direct Scope 1, 2, and 3 footprint abatement data for corporate BRSR disclosures.",
      "Audit-ready verification dossiers for executive sustainability roadmaps and net-zero targets.",
    ],
    specs: [
      { label: "Accounting Standard", value: "ISO 14064 Protocol" },
      { label: "Audit Format", value: "Third-Party Ready" },
      { label: "Baseline Yield", value: "2,491 T CO₂e / 3.5k TPD" },
    ],
  },
];

const easeExpo = [0.16, 1, 0.3, 1] as const;

export default function SolutionsGrid() {
  const [activeModal, setActiveModal] = useState<SolutionModule | null>(null);
  const [mobileIdx, setMobileIdx] = useState(0);
  const [dragDirection, setDragDirection] = useState(0);

  const total = solutionsModules.length;

  const handleNext = () => {
    setDragDirection(1);
    setMobileIdx((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setDragDirection(-1);
    setMobileIdx((prev) => (prev - 1 + total) % total);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -40) {
      handleNext();
    } else if (info.offset.x > 40) {
      handlePrev();
    }
  };

  const currentMobile = solutionsModules[mobileIdx];
  const MobileIcon = currentMobile.icon;

  return (
    <section
      id="solutions-grid"
      className="relative w-full bg-[#ECE8E1] text-[#0E1712] py-20 sm:py-28 md:py-36 px-5 sm:px-10 lg:px-16 overflow-hidden selection:bg-[#063D2A] selection:text-white border-t border-[#063D2A]/15"
    >
      <div className="absolute inset-0 pointer-events-none opacity-40 select-none">
        <div className="max-w-7xl mx-auto h-full border-x border-[#063D2A]/10 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#063D2A]/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#063D2A]/15 mb-10 sm:mb-14">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#063D2A]" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#063D2A] font-bold">
              02 // Turnkey Service Architecture
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#063D2A]/70">
            <FileCheck className="w-3.5 h-3.5 text-[#063D2A]" />
            <span>6 CPCB-Compliant Modules</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 text-left">
          <div className="max-w-3xl space-y-2">
            <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#0B1710] leading-none">
              Turnkey Circular <br />
              <span className="text-[#063D2A]">Interventions.</span>
            </h2>
            <p className="text-xs sm:text-base text-[#34483B] font-light leading-relaxed pt-1">
              Structured partnership formats scoped to corporate ESG roadmaps, statutory EPR mandates, and municipal waste realities.
            </p>
          </div>

          <span className="hidden lg:inline-flex px-4 py-2 rounded-full bg-white/70 border border-[#063D2A]/15 text-xs font-mono text-[#063D2A]">
            Interactive Technical Catalog
          </span>
        </div>

        {/* 1. DESKTOP GRID */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {solutionsModules.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative rounded-2xl bg-white/80 hover:bg-white border border-[#063D2A]/15 hover:border-[#063D2A]/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(6,61,42,0.08)] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#063D2A]/10">
                    <div className="w-10 h-10 rounded-xl bg-[#ECE8E1]/90 border border-[#063D2A]/10 flex items-center justify-center text-[#063D2A] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#063D2A]/60 group-hover:text-[#063D2A] transition-colors">
                      {item.code} // 06
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#063D2A] font-bold block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-[#0B1710] mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#425549] font-light leading-relaxed mb-6">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#063D2A]/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono uppercase text-[#063D2A]/60">Verified Output</span>
                    <span className="text-xs font-mono font-bold text-[#063D2A]">
                      {item.primaryProof}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => setActiveModal(item)}
                      className="w-9 h-9 rounded-full border border-[#063D2A]/20 hover:border-[#063D2A] hover:bg-[#063D2A] text-[#063D2A] hover:text-white flex items-center justify-center transition-all shadow-sm"
                      aria-label={`View ${item.title} deep-dive`}
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>

                    <Link href={`/contact?module=${item.id}`}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        className="w-9 h-9 rounded-full bg-[#063D2A] text-white flex items-center justify-center shadow-sm hover:bg-[#094F37] transition-colors cursor-pointer"
                        aria-label="Connect to contact page"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. MOBILE VIEW */}
        <div className="block md:hidden text-left">
          <div className="relative min-h-[410px] w-full flex items-center justify-center">
            <AnimatePresence mode="wait" custom={dragDirection}>
              <motion.div
                key={currentMobile.id}
                custom={dragDirection}
                initial={{ opacity: 0, x: dragDirection >= 0 ? 80 : -80, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dragDirection >= 0 ? -80 : 80, scale: 0.96 }}
                transition={{ duration: 0.28, ease: easeExpo }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={handleDragEnd}
                className="w-full bg-white border border-[#063D2A]/15 rounded-2xl p-6 shadow-[0_12px_32px_rgba(6,61,42,0.06)] flex flex-col justify-between active:cursor-grabbing text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#063D2A]/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#ECE8E1] border border-[#063D2A]/10 flex items-center justify-center text-[#063D2A]">
                        <MobileIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase text-[#063D2A] font-bold">
                        MODULE {currentMobile.code} / 06
                      </span>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full bg-[#063D2A]/10 text-[#063D2A] text-[10px] font-mono font-bold">
                      {currentMobile.metricBadge}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#063D2A] font-semibold block mb-1">
                    {currentMobile.subtitle}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-[#0B1710] mb-2 leading-tight">
                    {currentMobile.title}
                  </h3>
                  <p className="text-xs text-[#425549] font-light leading-relaxed mb-4">
                    {currentMobile.summary}
                  </p>

                  <div className="p-3 rounded-xl bg-[#ECE8E1]/50 border border-[#063D2A]/10 space-y-1">
                    <span className="text-[9px] font-mono uppercase text-[#063D2A]/60 block">Reference Partner</span>
                    <span className="text-xs font-mono font-bold text-[#063D2A] block">{currentMobile.partnerReference}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#063D2A]/10 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#063D2A]">
                    {currentMobile.primaryProof}
                  </span>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setActiveModal(currentMobile)}
                      className="w-9 h-9 rounded-full border border-[#063D2A]/25 bg-white text-[#063D2A] flex items-center justify-center shadow-sm"
                      aria-label="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>

                    <Link href={`/contact?module=${currentMobile.id}`}>
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 rounded-full bg-[#063D2A] text-white flex items-center justify-center shadow-sm cursor-pointer"
                        aria-label="Connect to contact page"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-5 px-1">
            <div className="flex items-center gap-1.5">
              {solutionsModules.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setDragDirection(idx > mobileIdx ? 1 : -1);
                    setMobileIdx(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    mobileIdx === idx ? "w-6 bg-[#063D2A]" : "w-1.5 bg-[#063D2A]/20"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="w-9 h-9 rounded-full border border-[#063D2A]/20 bg-white flex items-center justify-center text-[#063D2A] shadow-sm"
                aria-label="Previous card"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="w-9 h-9 rounded-full border border-[#063D2A]/20 bg-white flex items-center justify-center text-[#063D2A] shadow-sm"
                aria-label="Next card"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-[#0A140F]/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25, ease: easeExpo }}
              className="relative w-full max-w-xl bg-[#FAF8F5] border border-[#063D2A]/20 rounded-3xl p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.3)] text-[#0B1710] z-10 text-left max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#063D2A]/10 mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#063D2A] font-bold">
                    MODULE {activeModal.code} // DOSSIER
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#063D2A]/10 text-[#063D2A] font-bold">
                    {activeModal.complianceTag}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveModal(null)}
                  className="w-8 h-8 rounded-full bg-[#ECE8E1] hover:bg-[#063D2A] text-[#063D2A] hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#063D2A] font-semibold block">
                  {activeModal.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0B1710] leading-tight">
                  {activeModal.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#425549] font-light leading-relaxed">
                  {activeModal.summary}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-2xl bg-white border border-[#063D2A]/10 mb-6">
                {activeModal.specs.map((spec) => (
                  <div key={spec.label} className="text-left">
                    <span className="text-[9px] font-mono uppercase text-[#063D2A]/60 block">{spec.label}</span>
                    <span className="text-xs font-mono font-bold text-[#063D2A] block mt-0.5">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#063D2A] font-bold block">
                  Deliverables & Verification Metrics:
                </span>
                {activeModal.deliverables.map((deliv, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#063D2A] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-[13px] text-[#24372C] leading-relaxed">
                      {deliv}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#063D2A]/10">
                <Link
                  href={`/contact?module=${activeModal.id}`}
                  className="flex-1"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    className="w-full bg-[#063D2A] hover:bg-[#094F37] text-white py-3.5 px-5 text-xs font-bold uppercase tracking-[0.14em] flex items-center justify-center gap-2 rounded-xl transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Initiate Module Scope</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </Link>
                <button
                  onClick={() => setActiveModal(null)}
                  className="py-3.5 px-5 border border-[#063D2A]/25 hover:bg-[#ECE8E1] text-[#063D2A] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}