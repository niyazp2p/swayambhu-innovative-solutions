"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Clock, ArrowDownRight, ShieldCheck, Factory, Layers } from "lucide-react";
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

const operationalPillars = [
  {
    icon: ShieldCheck,
    title: "Statutory EPR Category-II",
    meta: "CPCB Portal Audited",
    detail: "Direct PIBO compliance credit transfer",
  },
  {
    icon: Factory,
    title: "Turnkey MRF Deployment",
    meta: "Decentralized Sorting",
    detail: "19-stream source segregation units",
  },
  {
    icon: Layers,
    title: "Circular CSR Assets",
    meta: "Schedule VII Aligned",
    detail: "Termite-proof eco-furniture & sanitation",
  },
];

export default function ContactHero() {
  const { scrollTo } = useScroll();

  return (
    <section className="relative w-full min-h-[90svh] sm:min-h-[88svh] bg-[#0A0F0D] text-[#F3F4F1] flex flex-col justify-between overflow-hidden selection:bg-[#22C55E] selection:text-black border-b border-white/10">
      {/* 1. DUAL RESPONSIVE BACKGROUND ENGINE */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Mobile Viewport: Centered facility focus */}
        <div className="relative w-full h-full block sm:hidden">
          <Image
            src="/assets/sol1.png"
            alt="Swayambhu Processing Facility"
            fill
            priority
            className="object-cover object-[78%_center] contrast-[1.08] brightness-[0.48]"
            sizes="100vw"
          />
        </div>

        {/* Desktop Viewport: Full horizontal perspective */}
        <div className="relative w-full h-full hidden sm:block">
          <Image
            src="/assets/sol1.png"
            alt="Swayambhu Material Recovery Facility"
            fill
            priority
            className="object-cover object-center contrast-[1.06] brightness-[0.44]"
            sizes="100vw"
          />
        </div>

        {/* Dynamic Vignette Overlays for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0D] via-[#0A0F0D]/55 to-[#0A0F0D]/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F0D]/85 via-[#0A0F0D]/40 to-transparent hidden lg:block" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,197,94,0.12)_0%,transparent_70%)]" />
      </div>

      {/* 2. TOP HEADER HUD */}
      <header className="relative z-10 w-full max-w-5xl mx-auto pt-24 sm:pt-28 md:pt-32 px-5 sm:px-6 flex items-center justify-center shrink-0">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeCurve }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0F0D]/85 border border-white/15 backdrop-blur-md shadow-lg"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
          </span>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-white/90 font-medium">
            Enterprise Engagement Desk
          </span>
        </motion.div>
      </header>

      {/* 3. CENTERED HERO MONOLITH */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-10 flex-1 flex flex-col justify-center items-center text-center py-8 sm:py-14">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-3">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#22C55E] font-bold">
              01 // Institutional Inquiries
            </span>
          </motion.div>

          {/* Core Headline */}
          <div className="overflow-hidden mb-3 sm:mb-4">
            <motion.h1
              variants={itemVariants}
              className="font-sans font-black uppercase text-[clamp(2.1rem,6.8vw,4.4rem)] leading-[0.95] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
            >
              Initiate Your <br />
              Circular & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] via-[#4ADE80] to-[#8FA295]">
                EPR Mandate.
              </span>
            </motion.h1>
          </div>

          {/* Supporting Copy */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-base text-white/85 font-light leading-relaxed max-w-xl mx-auto mb-7 sm:mb-9 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] px-2"
          >
            Connect with Swayambhu&apos;s executive team for CPCB Category-II plastic credits, turnkey Material Recovery Facilities, or corporate CSR circular assets.
          </motion.p>

          {/* Scope Pillar Telemetry Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-2xl mb-7 sm:mb-9"
          >
            {operationalPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-3.5 sm:p-4 rounded-2xl bg-[#0A0F0D]/75 hover:bg-[#0A0F0D]/90 border border-white/15 backdrop-blur-md transition-colors flex flex-col items-center justify-center text-center shadow-md"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/25 flex items-center justify-center text-[#22C55E] mb-2">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-white tracking-tight">
                    {pillar.title}
                  </span>
                  <span className="text-[9px] font-mono text-[#22C55E] uppercase tracking-wider mt-0.5 font-semibold">
                    {pillar.meta}
                  </span>
                  <span className="text-[9px] font-mono text-white/50 mt-0.5">
                    {pillar.detail}
                  </span>
                </div>
              );
            })}
          </motion.div>

          {/* CTA Action Trigger */}
          <motion.div variants={itemVariants} className="w-full sm:w-auto flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo("#contact-ledge", { offset: -30 })}
              className="w-full sm:w-auto bg-[#22C55E] hover:bg-[#16A34A] text-black px-8 py-3.5 font-bold text-xs font-mono uppercase tracking-[0.14em] transition-all shadow-[0_0_24px_rgba(34,197,94,0.35)] flex items-center justify-center gap-2"
            >
              <span>Transmit Scope Details</span>
              <ArrowDownRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>
      </main>

      {/* 4. FOOTER CREDENTIALS & SLA DOCK */}
      <footer className="relative z-20 w-full border-t border-white/10 bg-[#0A0F0D]/90 backdrop-blur-xl py-3 shrink-0">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-mono text-white/70 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 text-[#22C55E]">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span className="uppercase tracking-wider font-semibold text-[11px] sm:text-xs">
              Response SLA: Corporate Proposals Provided in 24 Hours
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-white/50 uppercase tracking-widest">
            <span>CPCB Registered</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/20" />
            <span>ISO 9001:2015</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/20" />
            <span>ZED Silver Certified</span>
          </div>
        </div>
      </footer>
    </section>
  );
}