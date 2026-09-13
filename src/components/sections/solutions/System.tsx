"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import {
  SearchCheck,
  Layers,
  Factory,
  RotateCcw,
  FileCheck2,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SystemStep {
  id: string;
  stepNumber: string;
  title: string;
  category: string;
  description: string;
  operationalDetail: string;
  deliverable: string;
  icon: React.ElementType;
}

const systemSteps: SystemStep[] = [
  {
    id: "audit",
    stepNumber: "01",
    title: "Facility Audit & Setup",
    category: "Source Intake Optimization",
    description:
      "We analyze your facility's waste profile and establish co-branded MRF centers at source.",
    operationalDetail:
      "Conducting compositional characterization, baseline volume logging, and deploying on-site segregation hardware tailored to corporate campuses and civic hubs.",
    deliverable: "Co-Branded MRF Center & Intake Baseline",
    icon: SearchCheck,
  },
  {
    id: "segregation",
    stepNumber: "02",
    title: "Segregation & Collection",
    category: "Decentralized Sorting",
    description:
      "Dignified livelihood workers sort materials into 19 distinct streams before eco-transit.",
    operationalDetail:
      "Manual and optical sorting differentiating polymers, paper, glass, metals, and organics, preserving material purity and formalizing green livelihoods.",
    deliverable: "19 Distinct Sorted Streams",
    icon: Layers,
  },
  {
    id: "recycling",
    stepNumber: "03",
    title: "Authorized Recycling",
    category: "Haridwar Plant Processing",
    description:
      "State-of-the-art upcycling processes run at our CPCB-registered Haridwar plant.",
    operationalDetail:
      "Decentralized washing, mechanical shredding, thermal compaction, and extrusion into high-density structural raw materials with zero chemical effluents.",
    deliverable: "CPCB Category-II Mechanical Recovery",
    icon: Factory,
  },
  {
    id: "products",
    stepNumber: "04",
    title: "Circular Products",
    category: "High-Durability Upcycling",
    description:
      "Single-use plastics are remanufactured into school desks, benches, and toilets.",
    operationalDetail:
      "Forming termite-proof, waterproof, 30+ year lifespan boards engineered into CSR school furniture, portable sanitation units, and municipal utility assets.",
    deliverable: "30+ Year Weatherproof Assets",
    icon: RotateCcw,
  },
  {
    id: "compliance",
    stepNumber: "05",
    title: "EPR & BRSR Reports",
    category: "Statutory Ledger Auditing",
    description:
      "We issue audit-ready compliance certificates and comprehensive ESG reports.",
    operationalDetail:
      "Delivering verified Category-II EPR credits via the national registry, GHG abatement certificates under ISO 14064, and audit trails for SEBI BRSR filings.",
    deliverable: "Verified EPR Transfer & BRSR Dossier",
    icon: FileCheck2,
  },
];

const easeExpo = [0.16, 1, 0.3, 1] as const;

export default function HowOurSystemsOperate() {
  const [activeStep, setActiveStep] = useState<SystemStep>(systemSteps[0]);
  const [mobileIdx, setMobileIdx] = useState(0);
  const [dragDirection, setDragDirection] = useState(0);

  const total = systemSteps.length;

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

  const currentMobile = systemSteps[mobileIdx];
  const MobileIcon = currentMobile.icon;
  const ActiveDesktopIcon = activeStep.icon;

  return (
    <section className="relative w-full bg-[#0D120F] text-[#F3F4F1] py-20 sm:py-28 md:py-36 px-5 sm:px-10 lg:px-16 overflow-hidden selection:bg-[#22C55E] selection:text-black border-t border-white/[0.08]">
      {/* Background Architectural Ambience */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F0D] via-transparent to-[#0A0F0D]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#22C55E 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Eyebrow Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-10 sm:mb-14">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#8EA394]">
              Operational Lifecycle
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-white/50 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Traceable Audit Trail</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 text-left">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-none">
              How Our Systems <br />
              <span className="text-[#22C55E]">Operate.</span>
            </h2>
            <p className="text-xs sm:text-base text-white/70 font-light leading-relaxed max-w-2xl pt-1">
              From custom facility collection audits to fully certified recycling, Our operational lifecycle guarantees complete compliance and traceability.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white/70">
            <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Source-to-Output Architecture</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 1. DESKTOP WORKSPACE: INTERACTIVE 5-STAGE CONSOLE        */}
        {/* ======================================================== */}
        <div className="hidden lg:flex flex-col space-y-8">
          {/* Horizontal Stage Selectors */}
          <div className="grid grid-cols-5 gap-3">
            {systemSteps.map((step) => {
              const Icon = step.icon;
              const isSelected = activeStep.id === step.id;

              return (
                <div
                  key={step.id}
                  onMouseEnter={() => setActiveStep(step)}
                  onClick={() => setActiveStep(step)}
                  className={`group relative p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[170px] text-left ${
                    isSelected
                      ? "bg-[#16221A] border-[#22C55E]/60 shadow-[0_6px_28px_rgba(34,197,94,0.16)] -translate-y-1"
                      : "bg-[#121914]/80 border-white/[0.06] hover:bg-[#151F18] hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono font-bold tracking-widest ${
                        isSelected ? "text-[#22C55E]" : "text-white/40 group-hover:text-white/70"
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isSelected ? "text-[#22C55E]" : "text-white/35 group-hover:text-white/70"
                      }`}
                    />
                  </div>

                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 block mb-1">
                      {step.category}
                    </span>
                    <h3
                      className={`text-sm font-bold uppercase tracking-tight leading-snug transition-colors ${
                        isSelected ? "text-white" : "text-white/80 group-hover:text-white"
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>

                  <div
                    className={`h-[2px] w-full rounded-full transition-all duration-300 ${
                      isSelected ? "bg-[#22C55E]" : "bg-white/[0.06]"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Active Terminal Inspection Panel */}
          <div className="relative p-8 sm:p-10 rounded-2xl bg-[#141C16] border border-white/10 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.5)] text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: easeExpo }}
                className="grid grid-cols-12 gap-8 items-center"
              >
                {/* Left Overview */}
                <div className="col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#22C55E] uppercase tracking-wider">
                      PHASE {activeStep.stepNumber} // {activeStep.category}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span className="text-xs font-mono text-white/50">Verified System</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] shrink-0">
                      <ActiveDesktopIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                      {activeStep.title}
                    </h3>
                  </div>

                  <p className="text-white/85 text-base leading-relaxed font-light">
                    {activeStep.description}
                  </p>

                  <p className="text-xs text-white/55 font-light leading-relaxed pt-1">
                    {activeStep.operationalDetail}
                  </p>
                </div>

                {/* Right Specification Dossier */}
                <div className="col-span-5 border-l border-white/[0.08] pl-8 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8EA394] font-semibold block mb-2">
                      Key Deliverable & Target Output
                    </span>
                    <span className="text-base font-mono font-bold text-white block">
                      {activeStep.deliverable}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                    <span className="text-[9px] font-mono uppercase text-white/40 block">
                      Standard Regulatory Anchor
                    </span>
                    <span className="text-xs font-mono text-[#22C55E] font-medium block">
                      CPCB Schedule II & PWM Protocol Certified
                    </span>
                  </div>

                  <Link href="/contact" className="w-full">
                    <button className="w-full py-3 px-5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                      <span>Initiate System Audit</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. MOBILE VIEW: SWIPEABLE STEP CAROUSEL                  */}
        {/* ======================================================== */}
        <div className="block lg:hidden text-left">
          <div className="relative min-h-[380px] w-full flex items-center justify-center">
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
                className="w-full bg-[#141C16] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between active:cursor-grabbing text-left"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
                        <MobileIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#22C55E] uppercase tracking-wider">
                        STAGE {currentMobile.stepNumber} // 05
                      </span>
                    </div>

                    <span className="text-[9px] font-mono text-white/40 uppercase">
                      Operational Step
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8EA394] block mb-1">
                    {currentMobile.category}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2 leading-tight">
                    {currentMobile.title}
                  </h3>
                  <p className="text-xs text-white/80 font-light leading-relaxed mb-4">
                    {currentMobile.description}
                  </p>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1 mb-2">
                    <span className="text-[9px] font-mono uppercase text-white/40 block">
                      Target Output
                    </span>
                    <span className="text-xs font-mono font-bold text-[#22C55E] block">
                      {currentMobile.deliverable}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white/50 uppercase">
                    Audit Verified
                  </span>

                  <Link href="/contact">
                    <button className="h-8 px-3 rounded-lg bg-[#22C55E] text-black text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                      <span>Scope</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Controller Indicators */}
          <div className="flex items-center justify-between mt-5 px-1">
            <div className="flex items-center gap-1.5">
              {systemSteps.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setDragDirection(idx > mobileIdx ? 1 : -1);
                    setMobileIdx(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    mobileIdx === idx ? "w-6 bg-[#22C55E]" : "w-1.5 bg-white/20"
                  }`}
                  aria-label={`Step ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-white"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-white"
                aria-label="Next step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}