"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import {
  Building2,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  School,
  Train,
  Box,
  HeartHandshake,
  Zap,
} from "lucide-react";

interface CaseStudy {
  id: string;
  code: string;
  partnerName: string;
  projectTitle: string;
  logo: string;
  category: string;
  summary: string;
  metrics: { value: string; label: string }[];
  highlight: string;
  icon: React.ElementType;
}

const caseStudiesData: CaseStudy[] = [
  {
    id: "hul",
    code: "01",
    partnerName: "Hindustan Unilever Limited (HUL)",
    projectTitle: "Ajeetpur Model MRF & School Handwashing Stations",
    logo: "/partners/hul-logo.png",
    category: "Model MRF & CSR Sanitation",
    summary:
      "Constructed a model Material Recovery Facility (MRF) at Ajeetpur, Haridwar using 8 tonnes of recycled plastic compressed boards. Manufactured Lifebuoy-branded recycled-plastic handwashing stations for 400+ government schools.",
    metrics: [
      { value: "8 Tonnes Plastic", label: "Used in MRF Construction" },
      { value: "400+ Schools", label: "Handwashing Infrastructure" },
    ],
    highlight: "Model MRF Architecture with Lifebuoy CSR",
    icon: Building2,
  },
  {
    id: "itc",
    code: "02",
    partnerName: "ITC Limited",
    projectTitle: "Eco-School Desks & Anganwadi Furniture",
    logo: "/partners/itc-logo.webp",
    category: "Circular Educational Assets",
    summary:
      "Supply of eco-friendly recycled-plastic desks and benches to underprivileged government schools and Anganwadi centers, replacing wooden furniture with 30+ year lifespan termite-proof plastic boards.",
    metrics: [
      { value: "30+ Year Lifespan", label: "Termite & Waterproof Desks" },
      { value: "100% Recyclable", label: "At End-of-Life" },
    ],
    highlight: "Plywood Replacement in Rural Primary Schools",
    icon: School,
  },
  {
    id: "railways",
    code: "03",
    partnerName: "Northern Railway (Indian Railways)",
    projectTitle: "Varanasi Railway Station MRF Zero-Waste Model",
    logo: "/partners/northern-railway.png",
    category: "Transit Hub Zero-Waste",
    summary:
      "Operation of the Material Recovery Facility at Varanasi Railway Station, collecting, segregating, and upcycling station and train waste toward a zero-waste-to-landfill railway standard.",
    metrics: [
      { value: "Zero-Waste Hub", label: "Station & Train Waste MRF" },
      { value: "Varanasi Junction", label: "Model Replicable Across India" },
    ],
    highlight: "First-of-its-kind Railway Transit MRF",
    icon: Train,
  },
  {
    id: "tetra-pak",
    code: "04",
    partnerName: "Tetra Pak",
    projectTitle: "Used Beverage Carton Upcycling & Community Camps",
    logo: "/partners/tetrapark.png",
    category: "Carton Recovery & Public Health",
    summary:
      "Partnership to collect and upcycle used beverage cartons into durable recycled sheets, combined with joint community outreach including free eye check-up camps alongside product installations.",
    metrics: [
      { value: "Carton Upcycling", label: "Beverage Carton Recycling" },
      { value: "Health Camps", label: "Eye Check-up Community Drives" },
    ],
    highlight: "Pack with Purpose Recycling Initiative",
    icon: Box,
  },
  {
    id: "arunachal",
    code: "05",
    partnerName: "Government of Arunachal Pradesh",
    projectTitle: "School Dropout Reduction & Sanitation Infrastructure",
    logo: "/partners/banasthali.png",
    category: "Public Sector Social Equity",
    summary:
      "Installation of eco-friendly plastic benches and portable toilet blocks in government schools facing high dropout rates, significantly improving enrollment and reducing girls' dropout linked to sanitation access.",
    metrics: [
      { value: "Reduced Dropouts", label: "Improved Girls' School Retention" },
      { value: "Sanitation Access", label: "Modular Eco-Toilet Blocks" },
    ],
    highlight: "Civic School Hygiene Transformation",
    icon: HeartHandshake,
  },
  {
    id: "tata-power",
    code: "06",
    partnerName: "Tata Power & Municipalities",
    projectTitle: "Factory Waste Recycling & Swachh Survekshan Support",
    logo: "/partners/tata-power-logo.png",
    category: "Industrial & Municipal Loop",
    summary:
      "Collaboration with Tata Power on factory plastic waste recycling, combined with municipal MRF partnerships (Nagar Nigam Rishikesh) improving local waste segregation and Swachh Survekshan performance.",
    metrics: [
      { value: "Tata Power", label: "Factory Plastic Waste Recycling" },
      { value: "Nagar Nigam", label: "Swachh Survekshan Support" },
    ],
    highlight: "Corporate & ULB Synergy in Uttarakhand",
    icon: Zap,
  },
];

const easeExpo = [0.16, 1, 0.3, 1] as const;

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy>(caseStudiesData[0]);
  const [mobileIdx, setMobileIdx] = useState(0);
  const [dragDirection, setDragDirection] = useState(0);

  const total = caseStudiesData.length;

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

  const currentMobile = caseStudiesData[mobileIdx];
  const MobileIcon = currentMobile.icon;
  const SelectedIcon = selectedCase.icon;

  return (
    <section className="relative w-full bg-[#FDF8EE] text-[#171F1B] py-20 sm:py-28 md:py-36 px-5 sm:px-10 lg:px-16 overflow-hidden selection:bg-[#006B3C] selection:text-white border-t border-[#DDE5DC]">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40 select-none">
        <div className="max-w-7xl mx-auto h-full border-x border-[#006B3C]/10 grid grid-cols-2 md:grid-cols-4 divide-x border-[#006B3C]/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Eyebrow Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DDE5DC] mb-10 sm:mb-14">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#006B3C]" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#006B3C] font-bold">
              02 // Proof of Work & Collaborations
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#52605A] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#006B3C]" />
            <span>Audited Corporate Interventions</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 text-left">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#171F1B] leading-none">
              Validated By <br />
              <span className="text-[#006B3C]">Industry Leaders.</span>
            </h2>
            <p className="text-xs sm:text-base text-[#52605A] font-light leading-relaxed max-w-2xl pt-1">
              Real-world interventions validated by multinational brands, public railway systems, and provincial governments.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#DDE5DC] text-xs font-mono text-[#006B3C] shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>6 Turnkey Case Studies</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 1. DESKTOP INTERACTIVE CONSOLE (Tabs + Live Dossier)     */}
        {/* ========================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start text-left">
          {/* Left Column: Interactive Selector List */}
          <div className="col-span-5 space-y-3">
            {caseStudiesData.map((item) => {
              const isSelected = selectedCase.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedCase(item)}
                  className={`group p-4 sm:p-4.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-white border-[#006B3C] shadow-[0_8px_24px_rgba(0,107,60,0.08)] translate-x-1"
                      : "bg-[#FAF8F5]/80 hover:bg-white border-[#DDE5DC] hover:border-[#006B3C]/30"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-12 h-12 rounded-xl bg-white border border-[#DDE5DC] p-1.5 flex items-center justify-center shrink-0 shadow-sm">
                      <Image
                        src={item.logo}
                        alt={item.partnerName}
                        width={44}
                        height={44}
                        className="object-contain max-h-9"
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase text-[#006B3C] font-bold">
                        {item.code} // {item.category}
                      </span>
                      <h4 className="text-sm font-bold uppercase tracking-tight text-[#171F1B] group-hover:text-[#006B3C] transition-colors leading-snug">
                        {item.partnerName}
                      </h4>
                    </div>
                  </div>

                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected
                        ? "text-[#006B3C] translate-x-0.5 -translate-y-0.5"
                        : "text-[#7B8580] group-hover:text-[#171F1B]"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Case Dossier Card */}
          <div className="col-span-7 sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCase.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.35, ease: easeExpo }}
                className="rounded-3xl bg-white border border-[#DDE5DC] p-8 sm:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.04)] space-y-6"
              >
                {/* Dossier Header */}
                <div className="flex items-center justify-between pb-6 border-b border-[#DDE5DC]">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-2xl bg-[#FDF8EE] border border-[#DDE5DC] p-2 flex items-center justify-center shrink-0 shadow-sm">
                      <Image
                        src={selectedCase.logo}
                        alt={selectedCase.partnerName}
                        width={56}
                        height={56}
                        className="object-contain max-h-12"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#006B3C] font-bold tracking-wider block">
                        PARTNERSHIP DOSSIER {selectedCase.code}
                      </span>
                      <h3 className="text-xl font-bold uppercase text-[#171F1B] tracking-tight">
                        {selectedCase.partnerName}
                      </h3>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#EEF5ED] border border-[#006B3C]/15 text-[#006B3C] font-semibold">
                    {selectedCase.category}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#006B3C]">
                    <SelectedIcon className="w-4 h-4" />
                    <span>{selectedCase.highlight}</span>
                  </div>
                  <h4 className="text-2xl font-black uppercase text-[#171F1B] tracking-tight leading-snug">
                    {selectedCase.projectTitle}
                  </h4>
                  <p className="text-sm text-[#52605A] font-light leading-relaxed pt-1">
                    {selectedCase.summary}
                  </p>
                </div>

                {/* Metric Strip */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {selectedCase.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#DDE5DC] text-left"
                    >
                      <span className="text-xl font-mono font-bold text-[#006B3C] block">
                        {metric.value}
                      </span>
                      <span className="text-[11px] font-mono uppercase text-[#7B8580] tracking-wider block mt-0.5">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA Action */}
                <div className="pt-6 border-t border-[#DDE5DC] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#7B8580]">
                    Verified CPCB & Municipal Implementation
                  </span>
                  <Link href={`/contact?partner=${selectedCase.id}`}>
                    <button className="px-5 py-2.5 rounded-xl bg-[#006B3C] hover:bg-[#063D2A] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm">
                      <span>Replicate Model</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. MOBILE VIEW: SWIPEABLE CAROUSEL (Infinite-feel cards) */}
        {/* ========================================================= */}
        <div className="block lg:hidden text-left">
          <div className="relative min-h-[440px] w-full flex items-center justify-center">
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
                className="w-full bg-white border border-[#DDE5DC] rounded-3xl p-6 shadow-[0_12px_32px_rgba(0,0,0,0.04)] flex flex-col justify-between active:cursor-grabbing text-left"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#DDE5DC] mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] p-1.5 flex items-center justify-center shrink-0">
                        <Image
                          src={currentMobile.logo}
                          alt={currentMobile.partnerName}
                          width={40}
                          height={40}
                          className="object-contain max-h-8"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono uppercase text-[#006B3C] font-bold block">
                          CASE {currentMobile.code} // 06
                        </span>
                        <h4 className="text-sm font-bold uppercase text-[#171F1B] tracking-tight">
                          {currentMobile.partnerName}
                        </h4>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-[#EEF5ED] text-[#006B3C] text-[9px] font-mono font-bold">
                      {currentMobile.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="space-y-2 mb-4">
                    <h3 className="text-lg font-bold uppercase tracking-tight text-[#171F1B] leading-snug">
                      {currentMobile.projectTitle}
                    </h3>
                    <p className="text-xs text-[#52605A] font-light leading-relaxed">
                      {currentMobile.summary}
                    </p>
                  </div>

                  {/* Two Metrics */}
                  <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-[#FAF8F5] border border-[#DDE5DC] mb-4">
                    {currentMobile.metrics.map((metric, idx) => (
                      <div key={idx}>
                        <span className="text-xs font-mono font-bold text-[#006B3C] block">
                          {metric.value}
                        </span>
                        <span className="text-[9px] font-mono text-[#7B8580] uppercase block">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-[#DDE5DC] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#006B3C] font-semibold">
                    {currentMobile.highlight}
                  </span>

                  <Link href={`/contact?partner=${currentMobile.id}`}>
                    <button className="h-8 px-3 rounded-lg bg-[#006B3C] text-white text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                      <span>Scope</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-5 px-1">
            <div className="flex items-center gap-1.5">
              {caseStudiesData.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setDragDirection(idx > mobileIdx ? 1 : -1);
                    setMobileIdx(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    mobileIdx === idx ? "w-6 bg-[#006B3C]" : "w-1.5 bg-[#006B3C]/20"
                  }`}
                  aria-label={`Case ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-lg border border-[#DDE5DC] bg-white flex items-center justify-center text-[#171F1B] shadow-sm"
                aria-label="Previous case"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-lg border border-[#DDE5DC] bg-white flex items-center justify-center text-[#171F1B] shadow-sm"
                aria-label="Next case"
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