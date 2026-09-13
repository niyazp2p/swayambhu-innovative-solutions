"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowDownRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useScroll } from "@/providers/ScrollProvider";

const easeCurve = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: easeCurve },
  },
};

export default function ManagementHero() {
  const { scrollTo } = useScroll();

  return (
    <section className="relative w-full min-h-[92svh] sm:min-h-[88svh] bg-[#0A0F0D] text-[#F3F4F1] flex flex-col justify-between overflow-hidden selection:bg-[#22C55E] selection:text-black border-b border-white/10">
      {/* 1. DUAL RESPONSIVE BACKGROUND ENGINE */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Mobile Viewport Image: Portrait Aspect Ratio */}
        <div className="relative w-full h-full block sm:hidden">
          <Image
            src="/phonebanner.png"
            alt="Swayambhu Mobile Infrastructure"
            fill
            priority
            className="object-cover object-center contrast-[1.05] brightness-[0.82]"
            sizes="100vw"
          />
        </div>

        {/* Desktop / Tablet Viewport Image: Landscape Aspect Ratio */}
        <div className="relative w-full h-full hidden sm:block">
          <Image
            src="/mainbanner.png"
            alt="Swayambhu Sustainable Infrastructure"
            fill
            priority
            className="object-cover object-center contrast-[1.06] brightness-[0.78]"
            sizes="100vw"
          />
        </div>

        {/* Minimal Gradient Overlays to Protect Image Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0D] via-[#0A0F0D]/40 to-[#0A0F0D]/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F0D]/80 via-transparent to-[#0A0F0D]/90" />
      </div>

      {/* 2. TOP HEADER HUD */}
      <header className="relative z-10 w-full max-w-5xl mx-auto pt-24 sm:pt-28 md:pt-32 px-5 sm:px-6 flex items-center justify-center shrink-0">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeCurve }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0F0D]/75 border border-white/15 backdrop-blur-md shadow-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
          </span>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-white/90 font-medium">
            Executive Governance
          </span>
        </motion.div>
      </header>

      {/* 3. CENTERED HERO CONTENT */}
      <main className="relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-8 flex-1 flex flex-col justify-center items-center text-center py-8 sm:py-14">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-3">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#22C55E] font-bold">
              01 // Leadership Directorate
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-3 sm:mb-4">
            <motion.h1
              variants={itemVariants}
              className="font-sans font-black uppercase text-[clamp(2.1rem,6.8vw,4.2rem)] leading-[0.95] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
            >
              Architecting <br />
              Trust & <br />
              <span className="text-[#22C55E]">Circular Scale.</span>
            </motion.h1>
          </div>

          {/* Supporting Copy */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-base text-white/90 font-light leading-relaxed max-w-lg mx-auto mb-6 sm:mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
          >
            The multidisciplinary leadership directing Swayambhu&apos;s circular infrastructure, statutory EPR compliance, and industrial operations across India.
          </motion.p>

          {/* Minimalist Metrics Strip */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-2 sm:gap-3.5 w-full max-w-md mb-6 sm:mb-8"
          >
            <div className="p-2.5 sm:p-3 rounded-xl bg-[#0A0F0D]/75 border border-white/15 backdrop-blur-md flex flex-col items-center justify-center shadow-md">
              <span className="text-sm sm:text-lg font-mono font-bold text-white tracking-tight">
                11+ Years
              </span>
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#22C55E] font-semibold mt-0.5">
                Track Record
              </span>
            </div>

            <div className="p-2.5 sm:p-3 rounded-xl bg-[#0A0F0D]/75 border border-white/15 backdrop-blur-md flex flex-col items-center justify-center shadow-md">
              <span className="text-sm sm:text-lg font-mono font-bold text-white tracking-tight">
                Haridwar
              </span>
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#22C55E] font-semibold mt-0.5">
                Primary Hub
              </span>
            </div>

            <div className="p-2.5 sm:p-3 rounded-xl bg-[#0A0F0D]/75 border border-white/15 backdrop-blur-md flex flex-col items-center justify-center shadow-md">
              <span className="text-sm sm:text-lg font-mono font-bold text-white tracking-tight">
                Cat-II
              </span>
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#22C55E] font-semibold mt-0.5">
                CPCB Recycler
              </span>
            </div>
          </motion.div>

          {/* Action Trigger */}
          <motion.div variants={itemVariants} className="w-full sm:w-auto flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo("#management", { offset: -40 })}
              className="w-full sm:w-auto bg-[#22C55E] hover:bg-[#16A34A] text-black px-7 py-3 font-bold text-xs font-mono uppercase tracking-[0.14em] transition-all shadow-[0_0_24px_rgba(34,197,94,0.35)] flex items-center justify-center gap-2"
            >
              <span>Explore Board Profiles</span>
              <ArrowDownRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>
      </main>

      {/* 4. STATUTORY ACCREDITATION DOCK */}
      <footer className="relative z-20 w-full border-t border-white/10 bg-[#0A0F0D]/90 backdrop-blur-xl py-3 shrink-0">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-white/70 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 text-[#22C55E]">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span className="uppercase tracking-wider font-semibold text-[11px] sm:text-xs">
              Board-Supervised Governance & Compliance
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] sm:text-[11px] text-white/50 uppercase tracking-widest">
            <span>Executive Leadership</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/20" />
            <span>Advisory Council</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/20" />
            <span>Operations Directorate</span>
          </div>
        </div>
      </footer>
    </section>
  );
}