"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { useScroll } from "@/providers/ScrollProvider";

interface HeroSlide {
  id: number;
  src: string;
  tag: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    src: "/assets/sol1.png",
    tag: "Polymer Flakes & Upcycled Lumbers",
  },
  {
    id: 2,
    src: "/assets/sol2.png",
    tag: "High-Throughput Material Sorting Hub",
  },
  {
    id: 3,
    src: "/assets/sol3.png",
    tag: "Decentralized Anaerobic Bio-Energy",
  },
  {
    id: 4,
    src: "/assets/sol4.png",
    tag: "30+ Year Lifespan Eco-Infrastructure",
  },
  {
    id: 5,
    src: "/assets/sol5.png",
    tag: "Transit & Campus Zero-Waste Ecosystem",
  },
];

export default function SolutionsHero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { scrollTo } = useScroll();

  // Automated 5-second image transition loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = slides[currentIdx];

  return (
    <section className="relative w-full min-h-[92svh] bg-[#0A0F0D] text-[#F3F4F1] flex flex-col justify-between overflow-hidden selection:bg-[#22C55E] selection:text-black">
      {/* 1. CINEMATIC 5-IMAGE CROSSFADE & SCALE STREAM */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
              scale: { duration: 6, ease: "linear" },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={activeSlide.src}
              alt={activeSlide.tag}
              fill
              priority
              className="object-cover object-center brightness-[0.72] contrast-[1.08]"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Architectural Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F0D] via-[#0A0F0D]/60 to-[#0A0F0D]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,197,94,0.14)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,15,13,0.85),transparent_20%,transparent_80%,rgba(10,15,13,0.85))]" />
      </div>

      {/* 2. TOP HUD: Centered Eyebrow Pill */}
      <header className="relative z-10 w-full max-w-5xl mx-auto pt-24 sm:pt-28 md:pt-32 px-6 flex items-center justify-center shrink-0">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0F0D]/75 border border-white/15 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
          </span>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-white/90">
            CPCB Registered
          </span>
        </div>
      </header>

      {/* 3. CENTERED HERO MONOLITH */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 flex-1 flex flex-col justify-center items-center text-center py-10 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.26em] text-[#22C55E] font-bold">
              Turnkey Circular Interventions
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-sans font-black uppercase text-[clamp(2.3rem,7vw,4.8rem)] leading-[0.94] tracking-[-0.035em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] mb-4 sm:mb-5">
            Scalable Infrastructure. <br />
            <span className="text-[#22C55E]">Zero Landfill Value.</span>
          </h1>

          {/* Concise Subtitle */}
          <p className="text-xs sm:text-base md:text-lg text-white/80 font-light leading-relaxed max-w-xl mx-auto mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
            Engineering decentralized recovery facilities, verified plastic credits, and bio-energy systems for enterprise ESG compliance.
          </p>

          {/* Centered Trigger Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#solutions-grid", { offset: -40 })}
            className="group bg-[#22C55E] hover:bg-[#16A34A] text-[#061209] px-7 sm:px-8 py-3.5 font-bold text-xs sm:text-sm uppercase tracking-[0.16em] transition-all duration-300 shadow-[0_0_24px_rgba(34,197,94,0.35)] flex items-center justify-center gap-2.5"
          >
            <span>Explore All Interventions</span>
            <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </motion.button>
        </motion.div>
      </main>

      {/* 4. BOTTOM TELEMETRY DOCK & TIMELINE SEQUENCER */}
      <footer className="relative z-20 w-full border-t border-white/10 bg-[#0A0F0D]/90 backdrop-blur-2xl py-4 shrink-0">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Active Image Tag with Animated Pulse */}
          <div className="flex items-center gap-2 text-xs font-mono text-white/80">
            <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
            <span className="text-white/40 uppercase tracking-widest text-[10px]">
              Stream 0{activeSlide.id} //
            </span>
            <span className="text-white font-medium">{activeSlide.tag}</span>
          </div>

          {/* 5-Slide Synchronized Progress Bars */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            {slides.map((s, idx) => {
              const isActive = currentIdx === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentIdx(idx)}
                  className="group relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                  style={{ width: isActive ? "36px" : "14px" }}
                  aria-label={`Slide ${idx + 1}`}
                >
                  <div className="absolute inset-0 bg-white/20" />
                  {isActive && (
                    <motion.div
                      layoutId="progressTrack"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="absolute inset-0 bg-[#22C55E]"
                    />
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </footer>
    </section>
  );
}