"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowDownRight, CheckCircle2 } from "lucide-react";
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
  hidden: { y: 22, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, ease: easeCurve },
  },
};

const telemetryPills = [
  { label: "Track Record", value: "11+ Years", meta: "Since 2015" },
  { label: "Waste Diverted", value: "19,838+ MT", meta: "Landfill Abatement" },
  { label: "EPR Generated", value: "1,634 MT", meta: "Cat-II Verified" },
];

export default function AboutHero() {
  const { scrollTo } = useScroll();

  return (
    <section className="relative w-full min-h-[92svh] bg-[#0A0F0D] text-[#F3F4F1] flex flex-col justify-between overflow-hidden selection:bg-[#22C55E] selection:text-black">
      {/* 1. BACKGROUND ENGINE WITH INCREASED IMAGE VISIBILITY */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <motion.div
          initial={{ scale: 1.14, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: easeCurve }}
          className="relative w-full h-full"
        >
          <Image
            src="/banner2.jpeg"
            alt="Swayambhu High-Throughput Sorting & Upcycling Facility"
            fill
            priority
            className="object-cover object-center grayscale-[0.1] contrast-[1.08] brightness-[0.78]"
          />
        </motion.div>

        {/* Dynamic Multi-Layer Overlays: Visible industrial depth with clean text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0D] via-[#0A0F0D]/55 to-[#0A0F0D]/65" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,197,94,0.18)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,15,13,0.85),transparent_20%,transparent_80%,rgba(10,15,13,0.85))]" />
      </div>

      {/* 2. TOP TELEMETRY HUD (Centered) */}
      <header className="relative z-10 w-full max-w-5xl mx-auto pt-24 sm:pt-28 md:pt-32 px-6 flex items-center justify-center shrink-0">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeCurve }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0F0D]/70 border border-white/15 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
          </span>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-white/90">
            Swayambhu Innovative Solutions
          </span>
        </motion.div>
      </header>

      {/* 3. CENTERED HERO CONTENT */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 flex-1 flex flex-col justify-center items-center text-center py-10 sm:py-14">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4 sm:mb-5">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.26em] text-[#22C55E] font-bold">
              01 // Corporate Identity & Vision
            </span>
          </motion.div>

          {/* Monumental Centered Headline */}
          <div className="overflow-hidden mb-4 sm:mb-6">
            <motion.h1
              variants={itemVariants}
              className="font-sans font-black uppercase text-[clamp(2.4rem,7.5vw,5.2rem)] leading-[0.92] tracking-[-0.035em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]"
            >
              Architecting India&apos;s <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E1E7E3] to-[#8FA295]">
                Decentralized
              </span>{" "}
              <br />
              <span className="text-[#22C55E]">Circular Economy.</span>
            </motion.h1>
          </div>

          {/* Subtext Body */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-base md:text-lg text-white/85 font-light leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
          >
            Swayambhu Innovative Solutions engineers decentralized Material Recovery Facilities (MRFs), CPCB Category-II certified mechanical recycling, community bio-methanation, and 30+ year lifespan municipal assets.
          </motion.p>

          {/* Quick Metrics Ribbon */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-2xl mb-8 sm:mb-10"
          >
            {telemetryPills.map((pill) => (
              <motion.div
                key={pill.label}
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-3 sm:p-3.5 rounded-xl bg-[#0A0F0D]/75 border border-white/15 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.5)]"
              >
                <span className="text-lg sm:text-2xl font-mono font-bold text-white tracking-tight">
                  {pill.value}
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#22C55E] font-semibold mt-0.5">
                  {pill.label}
                </span>
                <span className="text-[9px] font-mono text-white/50 mt-0.5">
                  {pill.meta}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Centered Action Button */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-3.5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("#description", { offset: -40 })}
              className="group relative overflow-hidden bg-[#22C55E] hover:bg-[#16A34A] text-[#061209] px-8 py-3.5 sm:py-4 font-bold text-xs sm:text-sm uppercase tracking-[0.16em] transition-all duration-300 shadow-[0_0_24px_rgba(34,197,94,0.35)] flex items-center justify-center gap-2.5 rounded-none"
            >
              <span>Explore Corporate Profile</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>
      </main>

      {/* 4. BALANCED STATUTORY ACCREDITATION DOCK */}
      <footer className="relative z-20 w-full border-t border-white/10 bg-[#0A0F0D]/90 backdrop-blur-2xl py-4 shrink-0">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs font-mono text-white/70">
            <div className="flex items-center gap-2 text-[#22C55E]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="uppercase tracking-wider font-semibold">
                Central Pollution Control Board Authorized
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-white/60 uppercase tracking-widest">
              <span>ISO 9001:2015</span>
              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/20" />
              <span>MSME ZED Silver</span>
              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/20" />
              <span>Cat-II , Authorised Registry</span>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}