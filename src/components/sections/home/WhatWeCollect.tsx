"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PackageCheck, 
  Layers, 
  Factory, 
  Flame, 
  Building2, 
  RotateCcw,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface WorkflowStep {
  id: string;
  code: string;
  title: string;
  category: string;
  items: string[];
  summary: string;
  metric: string;
  icon: React.ElementType;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: "collect",
    code: "01",
    title: "Collection & Intake",
    category: "Inflow Aggregation",
    icon: PackageCheck,
    summary: "Decentralized collection channels harvesting post-consumer and industrial streams across municipal and corporate hubs.",
    items: ["Post-Consumer Packaging", "Single-Layer Wrappers", "Corrugated Cartons", "Bulk Factory Scraps"],
    metric: "100% Traceable Origin",
  },
  {
    id: "sort",
    code: "02",
    title: "Polymer Sorting",
    category: "Optical & Manual Grade",
    icon: Layers,
    summary: "Systematic segregation identifying polymer structures to ensure maximum batch purity and zero contaminant carryover.",
    items: ["PET Bottles & Flakes", "HDPE Drums & Crates", "LDPE Film Wraps", "Multi-Layered Plastic (MLP)"],
    metric: "Grade Purity 99.4%",
  },
  {
    id: "process",
    code: "03",
    title: "Mechanical Processing",
    category: "Haridwar Facility",
    icon: Factory,
    summary: "Heavy shredding, friction washing, high-temperature de-inking, and precise polymer extrusion into clean granulate feeds.",
    items: ["Industrial Purge Lumps", "Shredded Regrind", "Clean Pellets", "Agricultural Liners"],
    metric: "Zero Chemical Effluents",
  },
  {
    id: "organic",
    code: "04",
    title: "Organic Biogas",
    category: "Anaerobic Digestion",
    icon: Flame,
    summary: "Biodegradable organic waste diverted away from rotting in open pits directly into closed community digestion cells.",
    items: ["Municipal Wet Refuse", "Food Processing Residue", "Horticulture Scrap", "Agri-Biomass"],
    metric: "Renewable Methane Fuel",
  },
  {
    id: "upcycle",
    code: "05",
    title: "30+ Year Upcycling",
    category: "Closed-Loop Assets",
    icon: Building2,
    summary: "Unrecyclable composite scrap compressed under thermal pressure into weather-proof, rot-free structural board products.",
    items: ["Eco-School Desks", "Municipal Public Benches", "Portable Toilets", "Collection Banks"],
    metric: "30+ Year Lifecycle",
  },
  {
    id: "repeat",
    code: "06",
    title: "Credit & Loop",
    category: "Regulatory Ledger",
    icon: RotateCcw,
    summary: "Closing the loop with fully compliant CPCB Category-II EPR generation, verified impact reporting, and circular commerce.",
    items: ["CPCB Category-II Credits", "Audited Plastic Proofs", "BRSR Impact Logs", "End-to-End Retrace"],
    metric: "Zero-Landfill Protocol",
  },
];

export default function WhatWeCollect() {
  const [activeStep, setActiveStep] = useState<WorkflowStep>(workflowSteps[0]);
  const [mobileAngle, setMobileAngle] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  const rotateWheel = (direction: "next" | "prev") => {
    const stepAngle = 360 / workflowSteps.length;
    if (direction === "next") {
      const nextIdx = (mobileIndex + 1) % workflowSteps.length;
      setMobileIndex(nextIdx);
      setMobileAngle((prev) => prev - stepAngle);
      setActiveStep(workflowSteps[nextIdx]);
    } else {
      const prevIdx = (mobileIndex - 1 + workflowSteps.length) % workflowSteps.length;
      setMobileIndex(prevIdx);
      setMobileAngle((prev) => prev + stepAngle);
      setActiveStep(workflowSteps[prevIdx]);
    }
  };

  return (
    <section
      id="solutions"
      className="relative w-full bg-[#121815] text-[#F3F4F1] py-20 sm:py-28 md:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden selection:bg-[#22C55E] selection:text-black"
    >
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(18,24,21,0.8),transparent_40%,rgba(18,24,21,0.9))]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-12 sm:mb-16">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#8EA394]">
              02 // Intake Streams & Processing
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-white/50 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Industrial Scrap • Organics • Polymers</span>
          </div>
        </div>

        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-4">
            What We <span className="text-[#22C55E]">Collect.</span>
          </h2>
          <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed font-light">
            Hover through the horizontal processing chain to inspect our material intake streams, purification mechanisms, and upcycled assets.
          </p>
        </div>

        {/* 1. DESKTOP HORIZONTAL WORKFLOW */}
        <div className="hidden lg:flex flex-col space-y-8">
          <div className="grid grid-cols-6 gap-3">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep.id === step.id;
              return (
                <div
                  key={step.id}
                  onMouseEnter={() => setActiveStep(step)}
                  className={`group relative p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[160px] ${
                    isActive
                      ? "bg-[#18231D] border-[#22C55E]/60 shadow-[0_4px_24px_rgba(34,197,94,0.15)] -translate-y-1"
                      : "bg-[#151D18]/70 border-white/[0.07] hover:border-white/20 hover:bg-[#151D18]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono tracking-widest ${isActive ? "text-[#22C55E] font-bold" : "text-white/40"}`}>
                      {step.code}
                    </span>
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-[#22C55E]" : "text-white/40 group-hover:text-white/80"}`} />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block mb-1">
                      {step.category}
                    </span>
                    <h3 className={`text-sm font-bold uppercase tracking-tight leading-snug ${isActive ? "text-white" : "text-white/80"}`}>
                      {step.title}
                    </h3>
                  </div>

                  <div className={`h-[2px] w-full rounded-full transition-all ${isActive ? "bg-[#22C55E]" : "bg-white/[0.06]"}`} />
                </div>
              );
            })}
          </div>

          <div className="relative p-8 sm:p-10 rounded-2xl bg-[#16201A]/90 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="grid grid-cols-12 gap-8 items-center">
              <div className="col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#22C55E] uppercase tracking-wider">
                    Phase {activeStep.code} // {activeStep.category}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span className="text-xs font-mono text-white/50">{activeStep.metric}</span>
                </div>

                <h3 className="text-3xl font-black uppercase tracking-tight text-white">
                  {activeStep.title}
                </h3>

                <p className="text-white/70 text-base leading-relaxed font-light">
                  {activeStep.summary}
                </p>
              </div>

              <div className="col-span-5 border-l border-white/[0.08] pl-8">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8EA394] font-semibold block mb-3">
                  Collected Materials & Outputs:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {activeStep.items.map((item) => (
                    <div
                      key={item}
                      className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-medium text-white/90 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MOBILE INTERACTIVE SPIN WHEEL */}
        <div className="flex flex-col lg:hidden items-center space-y-6">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <motion.div
              animate={{ rotate: mobileAngle }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-[#22C55E]/30"
            >
              {workflowSteps.map((step, idx) => {
                const angle = (idx * (360 / workflowSteps.length) - 90) * (Math.PI / 180);
                const r = 115;
                const x = r * Math.cos(angle);
                const y = r * Math.sin(angle);
                const isSelected = activeStep.id === step.id;

                return (
                  <div
                    key={step.id}
                    style={{
                      position: "absolute",
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-transform ${
                      isSelected
                        ? "bg-[#22C55E] text-black scale-125 shadow-[0_0_15px_rgba(34,197,94,0.8)]"
                        : "bg-[#18231D] text-white/60 border border-white/20"
                    }`}
                  >
                    {step.code}
                  </div>
                );
              })}
            </motion.div>

            <div className="relative z-10 w-28 h-28 rounded-full bg-[#18231D] border border-[#22C55E]/40 flex flex-col items-center justify-center text-center p-2 shadow-inner">
              <span className="text-[9px] font-mono uppercase text-[#22C55E] font-bold">
                {activeStep.code} / 06
              </span>
              <span className="text-xs font-black uppercase text-white tracking-tight mt-0.5">
                {activeStep.title.split(" ")[0]}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => rotateWheel("prev")}
              className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono uppercase tracking-wider text-white active:scale-95"
            >
              Prev Stage
            </button>
            <button
              onClick={() => rotateWheel("next")}
              className="px-4 py-2 rounded-full bg-[#22C55E] text-black text-xs font-mono font-bold uppercase tracking-wider active:scale-95 flex items-center gap-1"
            >
              <span>Next Stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full p-6 rounded-2xl bg-[#16201A] border border-white/10 text-left space-y-4 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#22C55E] uppercase tracking-wider font-bold">
                    {activeStep.category}
                  </span>
                  <span className="text-[10px] font-mono text-white/40">{activeStep.metric}</span>
                </div>
                <h4 className="text-xl font-black uppercase text-white">{activeStep.title}</h4>
              </div>

              <p className="text-xs text-white/70 leading-relaxed font-light">
                {activeStep.summary}
              </p>

              <div className="pt-2 border-t border-white/[0.08]">
                <span className="text-[10px] font-mono uppercase text-white/40 block mb-2">
                  Key Inflow & Products:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeStep.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[11px] text-white/90"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}