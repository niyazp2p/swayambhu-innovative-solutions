"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowDownRight, ArrowRight, ShieldCheck, Activity, CheckCircle2 } from "lucide-react";
import { useScroll } from "@/providers/ScrollProvider";

const easeCurve = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
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

const certifications = [
  {
    id: "cpcb",
    badge: "/certs/cpcb-badge.jpg",
    label: "CPCB Category-II",
    sub: "Authorized Recycler",
  },
  {
    id: "iso",
    badge: "/certs/iso-9001.webp",
    label: "ISO 9001:2015",
    sub: "Certified Operations",
  },
  {
    id: "zed",
    badge: "/certs/zed-silver.webp",
    label: "ZED Silver",
    sub: "Zero Defect Zero Effect",
  },
];

export default function HeroSection() {
  const { scrollTo } = useScroll();

  return (
    <section className="relative w-full min-h-[100svh] bg-[#070B09] text-[#F3F4F1] flex flex-col justify-between overflow-hidden selection:bg-[#22C55E] selection:text-black">
      {/* 1. BACKGROUND ENGINE */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <motion.img
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: easeCurve }}
          src="/banner.png"
          alt="Swayambhu Material Recovery Facility"
          className="w-full h-full object-cover object-[62%_center] sm:object-center grayscale-[0.35] contrast-[1.08] brightness-[0.75]"
        />

        {/* Contrast Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B09] via-[#070B09]/75 to-transparent sm:hidden" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B09]/95 via-[#070B09]/75 to-transparent sm:w-4/5 hidden sm:block" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B09]/80 via-transparent to-[#070B09]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_40%,rgba(16,77,48,0.22)_0%,transparent_70%)]" />
      </div>

      {/* 2. TOP HUD */}
      <header className="relative z-10 w-full max-w-7xl mx-auto pt-24 sm:pt-28 md:pt-32 px-6 sm:px-10 lg:px-16 flex items-center justify-center sm:justify-between shrink-0">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeCurve }}
          className="flex items-center gap-2.5 sm:gap-3"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
          </span>
          <span className="text-[10px] sm:text-xs tracking-[0.24em] sm:tracking-[0.28em] uppercase text-white/70 font-mono font-medium">
            Circular Material Infrastructure
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="hidden md:flex items-center gap-4 text-[10px] uppercase font-mono tracking-widest text-white/50"
        >
          <span>Haridwar // FACILITY ACTIVE</span>
          <span className="h-2 w-[1px] bg-white/20" />
          <span>INDEX: 99.4% PURITY</span>
        </motion.div>
      </header>

      {/* 3. HERO BODY */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex-1 flex flex-col justify-center py-6 sm:py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center sm:items-start text-center sm:text-left"
        >
          {/* Main Headline */}
          <div className="overflow-hidden mb-3 sm:mb-6">
            <motion.h1
              variants={itemVariants}
              className="font-sans font-black uppercase tracking-[-0.045em] leading-[0.84] text-[#FFFFFF] text-[clamp(3rem,14vw,7.2rem)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
            >
              Waste <br />
              Isn&apos;t <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FFFFFF] via-[#E2E8E0] to-[#8FA295]">
                Waste.
              </span>
            </motion.h1>
          </div>

          {/* Subtext, Metrics & Right-Aligned Buttons Split */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            {/* Left Col: Narrative + Micro Badges */}
            <div className="lg:col-span-7 space-y-4 flex flex-col items-center sm:items-start">
              <motion.div variants={itemVariants} className="space-y-2 flex flex-col items-center sm:items-start">
                <h2 className="text-base sm:text-2xl font-semibold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
                  <span>Until we decide it is.</span>
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                </h2>
                <p className="text-white/80 text-xs sm:text-base md:text-lg leading-relaxed max-w-md sm:max-w-xl font-light">
                  Swayambhu transforms complex industrial and municipal waste streams into high-purity raw materials through autonomous recovery and closed-loop infrastructure.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 pt-1 w-full"
              >
                <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.1] px-3 py-1.5 rounded-sm backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span className="text-[10px] sm:text-xs font-mono uppercase text-white/70 tracking-wider">
                    Recovery: <strong className="text-white font-semibold">99.4%</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.1] px-3 py-1.5 rounded-sm backdrop-blur-md">
                  <Activity className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span className="text-[10px] sm:text-xs font-mono uppercase text-white/70 tracking-wider">
                    EPR: <strong className="text-white font-semibold">1,634 MT</strong>
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Col: Desktop Right-Aligned Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end items-stretch sm:items-center gap-3 w-full"
            >
              <motion.button
                onClick={() => scrollTo("#about", { offset: -40 })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto group relative overflow-hidden bg-[#22C55E] hover:bg-[#16A34A] text-[#061209] px-7 py-3.5 sm:py-4 font-bold text-xs sm:text-sm uppercase tracking-[0.15em] transition-all duration-300 shadow-[0_0_24px_rgba(34,197,94,0.25)] flex items-center justify-center gap-2.5 rounded-none"
              >
                <span>Explore The System</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </motion.button>

              <motion.button
  onClick={() => scrollTo("#CTA", { offset: -40 })}
  whileHover={{ scale: 1.02, backgroundColor: "rgba(6, 61, 42, 0.35)" }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
  className="relative w-full sm:w-auto group overflow-hidden border border-white/20 hover:border-[#B69A5B] text-[#FDF8EE] px-7 py-3.5 sm:py-4 font-semibold text-xs sm:text-sm uppercase tracking-[0.15em] transition-colors duration-500 backdrop-blur-md flex items-center justify-center gap-2.5 rounded-none shadow-sm"
>
  {/* Fluid ambient sheen wipe */}
  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

  <span className="relative z-10 font-mono tracking-[0.16em]">Partner With Us</span>
  
  <ArrowRight className="relative z-10 w-4 h-4 text-[#B69A5B] opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300 ease-out" />
</motion.button>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* 4. FULL-WIDTH STATIC ACCREDITATION DOCK */}
      <footer className="relative z-20 w-full border-t border-white/[0.08] bg-[#070B09]/90 backdrop-blur-2xl py-3.5 sm:py-4 shrink-0">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-3 divide-x divide-white/[0.08] items-center">
            {certifications.map((item, index) => {
              const alignClass =
                index === 0
                  ? "sm:justify-start sm:pl-0 sm:pr-6"
                  : index === 1
                  ? "sm:justify-center sm:px-6"
                  : "sm:justify-end sm:pr-0 sm:pl-6";

              return (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-2 group ${alignClass}`}
                >
                  <div className="relative h-8 w-8 sm:h-11 sm:w-11 shrink-0 rounded-full overflow-hidden bg-white/[0.04] p-1 border border-white/[0.12] flex items-center justify-center group-hover:border-[#22C55E]/50 transition-colors">
                    <Image
                      src={item.badge}
                      alt={item.label}
                      width={44}
                      height={44}
                      className="h-full w-full object-contain"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-tight text-white group-hover:text-[#4ADE80] transition-colors leading-tight">
                        {item.label}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0 hidden sm:inline-block" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] md:text-[11px] font-mono text-white/50 leading-tight">
                      {item.sub}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </footer>
    </section>
  );
}