"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { 
  Eye, 
  ArrowUpRight, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Recycle, 
  Building2, 
  Flame, 
  Armchair, 
  Landmark, 
  Gauge,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface SolutionItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  summary: string;
  icon: React.ElementType;
  primaryProof: string;
  modalPoints: string[];
  partnerTag: string;
  contactType: string;
}

const solutionsData: SolutionItem[] = [
  {
    id: "epr",
    code: "01",
    title: "Plastic Recycling & EPR",
    subtitle: "CPCB Category-II Compliance",
    summary: "Converting landfill-bound polymers into 30+ year lifespan assets with verifiable EPR credit generation.",
    icon: Recycle,
    primaryProof: "1,634 MT Credits Generated",
    partnerTag: "CPCB Category-II Authorized",
    contactType: "EPR Credits (Category-II)",
    modalPoints: [
      "1,634 MT Category-II EPR Certificates generated to date.",
      "Fulfills statutory packaging obligations under Central PWM Rules.",
      "Manufactured products are 100% recyclable again at end-of-life.",
    ],
  },
  {
    id: "mrf",
    code: "02",
    title: "Material Recovery Facilities",
    subtitle: "Turnkey Municipal Infrastructure",
    summary: "Establishing 19-category sorting hubs diverting maximum municipal and institution tonnage from dumpsites.",
    icon: Building2,
    primaryProof: "19 Streams Segregated",
    partnerTag: "HUL & Northern Railway Model",
    contactType: "Material Recovery Facility (MRF)",
    modalPoints: [
      "Model MRF at Ajeetpur, Haridwar producing 8 tonnes of plastic boards with HUL.",
      "Railway MRF at Varanasi Station in partnership with Northern Railway.",
      "Directly boosts Swachh Survekshan municipal audit rankings.",
    ],
  },
  {
    id: "biogas",
    code: "03",
    title: "Community Bio-Gas Plants",
    subtitle: "Decentralized Clean Fuel",
    summary: "Diverting wet organic mass into clean anaerobic cooking energy for rural and peri-urban clusters.",
    icon: Flame,
    primaryProof: "11.12 Lakh+ Kgs Clean Gas",
    partnerTag: "122 Plants Deployed",
    contactType: "Community Biogas Systems",
    modalPoints: [
      "122 community and cluster plants operational across regions.",
      "11,12,030+ Kgs of clean methane cooking gas produced.",
      "Displaces firewood and expensive LPG while mitigating indoor smoke.",
    ],
  },
  {
    id: "eco-furniture",
    code: "04",
    title: "Eco-School Infrastructure",
    subtitle: "Recycled Plastic Assets",
    summary: "Termite-proof, waterproof recycled classroom desks, handwashing units, and sanitation blocks.",
    icon: Armchair,
    primaryProof: "400+ School Stations",
    partnerTag: "ITC & Lifebuoy Initiatives",
    contactType: "CSR School & Sanitation Assets",
    modalPoints: [
      "Recycled dual-desks and benches deployed under CSR with ITC Limited.",
      "Lifebuoy/HUL handwashing stations delivered to 400+ government schools.",
      "Demonstrated reduction in female student dropouts across Arunachal Pradesh.",
    ],
  },
  {
    id: "zero-waste",
    code: "05",
    title: "Campus Zero-Waste",
    subtitle: "Corporate & Transit Hubs",
    summary: "Comprehensive on-site sorting, collection, and circular upcycling for complex transit and corporate sites.",
    icon: Landmark,
    primaryProof: "Zero-Waste-to-Landfill",
    partnerTag: "Tata Power & Station Scale",
    contactType: "Material Recovery Facility (MRF)",
    modalPoints: [
      "Modelled after the Varanasi Northern Railway Station hub transformation.",
      "Factory waste stream circularity deployed with Tata Power.",
      "Guaranteed zero-waste-to-landfill diversion protocols.",
    ],
  },
  {
    id: "carbon",
    code: "06",
    title: "Carbon Offset Solutions",
    subtitle: "Scope 1, 2 & 3 Mitigation",
    summary: "Data-verified emissions reduction through organic diversion, bio-energy, and audit-ready BRSR reporting.",
    icon: Gauge,
    primaryProof: "BRSR / ESG Aligned",
    partnerTag: "Net-Zero Roadmap Strategy",
    contactType: "EPR Credits (Category-II)",
    modalPoints: [
      "Quantified GHG & CO2e emissions abatement through organic bio-diversion.",
      "Empirical accounting for Scope 1, 2, and 3 BRSR corporate reporting.",
      "Audit-ready verification dossiers for executive sustainability roadmaps.",
    ],
  },
];

export default function Solutions() {
  const [activeModal, setActiveModal] = useState<SolutionItem | null>(null);
  const [mobileIdx, setMobileIdx] = useState(0);
  const [dragDirection, setDragDirection] = useState<number>(0);

  const handleOpenModal = (item: SolutionItem) => {
    setActiveModal(item);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleNext = () => {
    setDragDirection(1);
    setMobileIdx((prev) => (prev + 1) % solutionsData.length);
  };

  const handlePrev = () => {
    setDragDirection(-1);
    setMobileIdx((prev) => (prev - 1 + solutionsData.length) % solutionsData.length);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const activeMobileItem = solutionsData[mobileIdx];
  const MobileIcon = activeMobileItem.icon;

  return (
    <section
      id="solutions"
      className="relative w-full bg-[#ECE8E1] text-[#0E1712] py-16 sm:py-24 md:py-32 px-5 sm:px-10 lg:px-16 overflow-hidden selection:bg-[#063D2A] selection:text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#063D2A]/15 mb-8 sm:mb-12">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#063D2A]" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.24em] text-[#063D2A] font-semibold">
              03 // Corporate Interventions
            </span>
          </div>

          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#063D2A]/60">
            Turnkey Formats
          </span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 sm:mb-14 text-left">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-sans font-light text-3xl xs:text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#0B1710] leading-none">
              Solutions For <span className="font-extrabold text-[#063D2A]">Corporates.</span>
            </h2>
            <p className="text-xs sm:text-base text-[#3A4E42] font-light leading-relaxed">
              Structured partnership formats scoped to corporate ESG mandates, regional waste typologies, and statutory compliance.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#063D2A]">
            <ShieldCheck className="w-4 h-4" />
            <span>6 Turnkey Formats</span>
          </div>
        </div>

        {/* 1. MOBILE VIEW: SWIPEABLE CARDS WITH SPRING DYNAMICS */}
        <div className="block md:hidden">
          <div className="relative min-h-[380px] w-full flex items-center justify-center">
            <AnimatePresence mode="wait" custom={dragDirection}>
              <motion.div
                key={activeMobileItem.id}
                custom={dragDirection}
                initial={{ opacity: 0, x: dragDirection >= 0 ? 90 : -90, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dragDirection >= 0 ? -90 : 90, scale: 0.95 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="w-full bg-white border border-[#063D2A]/15 rounded-2xl p-6 shadow-[0_12px_32px_rgba(6,61,42,0.06)] flex flex-col justify-between active:cursor-grabbing text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#ECE8E1]/80 border border-[#063D2A]/10 flex items-center justify-center text-[#063D2A]">
                      <MobileIcon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#063D2A]/70">
                      {activeMobileItem.code} / 06
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#063D2A] font-semibold block mb-1">
                    {activeMobileItem.subtitle}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-[#0B1710] mb-2 leading-tight">
                    {activeMobileItem.title}
                  </h3>
                  <p className="text-xs text-[#405347] font-light leading-relaxed mb-6">
                    {activeMobileItem.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#063D2A]/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-[#063D2A]">
                    {activeMobileItem.primaryProof}
                  </span>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleOpenModal(activeMobileItem)}
                      className="w-9 h-9 rounded-full border border-[#063D2A]/20 bg-[#ECE8E1]/40 text-[#063D2A] flex items-center justify-center transition-colors active:bg-[#063D2A] active:text-white cursor-pointer"
                      aria-label="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>

                    <Link href={`/contact?type=${encodeURIComponent(activeMobileItem.contactType)}#contact-ledge`}>
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        className="w-9 h-9 rounded-full bg-[#063D2A] text-white flex items-center justify-center shadow-sm cursor-pointer"
                        aria-label="Connect"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Controller: Pagination Dots & Direct Arrows */}
          <div className="flex items-center justify-between mt-5 px-1">
            <div className="flex items-center gap-1.5">
              {solutionsData.map((item, idx) => (
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
                className="w-8 h-8 rounded-full border border-[#063D2A]/20 bg-white/70 flex items-center justify-center text-[#063D2A]"
                aria-label="Previous card"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="w-8 h-8 rounded-full border border-[#063D2A]/20 bg-white/70 flex items-center justify-center text-[#063D2A]"
                aria-label="Next card"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* 2. DESKTOP VIEW: CLEAN 6-CARD GRID */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {solutionsData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative bg-white/70 hover:bg-white border border-[#063D2A]/10 hover:border-[#063D2A]/30 rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(6,61,42,0.08)] hover:-translate-y-1 text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#ECE8E1]/80 border border-[#063D2A]/10 flex items-center justify-center text-[#063D2A] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-[#063D2A]/50 group-hover:text-[#063D2A] transition-colors">
                      {item.code}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#063D2A] font-semibold block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-[#0B1710] mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#405347] font-light leading-relaxed mb-6">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#063D2A]/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-medium text-[#063D2A]">
                    {item.primaryProof}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleOpenModal(item)}
                      className="w-8 h-8 rounded-full border border-[#063D2A]/20 hover:border-[#063D2A] hover:bg-[#063D2A] text-[#063D2A] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                      aria-label={`View ${item.title} Details`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </motion.button>

                    <Link href={`/contact?type=${encodeURIComponent(item.contactType)}#contact-ledge`}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        className="w-8 h-8 rounded-full border border-[#063D2A]/20 hover:border-[#063D2A] hover:bg-[#063D2A] text-[#063D2A] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                        aria-label="Direct Partner Inquiry"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* POPUP DETAIL MODAL */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-[#0A140F]/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#063D2A]/15 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)] text-[#0B1710] z-10 text-left"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#063D2A]/10 mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#063D2A] font-bold">
                    INTERVENTION {activeModal.code}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#063D2A]/10 text-[#063D2A]">
                    {activeModal.partnerTag}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCloseModal}
                  className="w-8 h-8 rounded-full bg-[#ECE8E1] hover:bg-[#063D2A] text-[#063D2A] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tight text-[#0B1710] mb-2 leading-tight">
                {activeModal.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4A5D51] font-light leading-relaxed mb-6">
                {activeModal.summary}
              </p>

              <div className="space-y-3 mb-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#063D2A] font-bold block">
                  Key Deliverables & Proof Points:
                </span>
                {activeModal.modalPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#063D2A] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-[13px] text-[#25382D] leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#063D2A]/10">
                <Link
                  href={`/contact?type=${encodeURIComponent(activeModal.contactType)}#contact-ledge`}
                  className="flex-1"
                  onClick={handleCloseModal}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    className="w-full bg-[#063D2A] hover:bg-[#0A4D35] text-white py-3 px-5 text-xs font-semibold uppercase tracking-[0.14em] flex items-center justify-center gap-2 rounded-lg transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Initiate Partnership</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleCloseModal}
                  className="py-3 px-4 border border-[#063D2A]/20 hover:bg-[#ECE8E1] text-[#063D2A] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Dismiss
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}