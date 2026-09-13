"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";
import { Factory, Users, MapPin, ArrowUpRight } from "lucide-react";
import { useScroll } from "@/providers/ScrollProvider";

const easeCurve = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, ease: easeCurve },
  },
};

const pillars = [
  {
    code: "01",
    title: "Material Processing Hub",
    description:
      "Industrial-grade mechanical recovery and extrusion facility operating at SIDCUL, Haridwar, transforming complex polymer scrap into high-density 30+ year lifespan structural boards.",
    tag: "Haridwar, Uttarakhand",
    icon: Factory,
  },
  {
    code: "02",
    title: "Formal Green Livelihoods",
    description:
      "Transforming the unorganized waste ecosystem by formalizing 200+ waste-pickers—predominantly women—with verified living wages, safety protocols, and direct banking inclusion.",
    tag: "Social Equity & Inclusion",
    icon: Users,
  },
  {
    code: "03",
    title: "Multi-State Operational Reach",
    description:
      "Active turnkey material supply chains and municipal recovery networks deployed across Haridwar, Dehradun, Rishikesh, Varanasi, Bihar, and Arunachal Pradesh.",
    tag: "Pan-India Expansion",
    icon: MapPin,
  },
];

export default function AboutDescription() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-12% 0px" });
  const { scrollTo } = useScroll();

  return (
    <section
      id="description"
      ref={containerRef}
      className="relative w-full bg-[#ECE8E1] text-[#0D1812] py-20 sm:py-28 md:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden selection:bg-[#063D2A] selection:text-white"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="max-w-7xl mx-auto h-full border-x border-[#063D2A]/10 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#063D2A]/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Eyebrow Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeCurve }}
          className="flex items-center justify-between pb-4 border-b border-[#063D2A]/15 mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#063D2A]" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#063D2A] font-semibold">
              02 // Corporate Thesis & Impact
            </span>
          </div>

          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#063D2A]/60">
            Swayambhu Operational Core
          </span>
        </motion.div>

        {/* 12-Column Structural Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Thesis & Interactive Logo Seal */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-[3.6rem] uppercase tracking-tight text-[#0B1710] leading-[0.94]">
                From Dumping Yards <br />
                To Audited <br />
                <span className="text-[#063D2A]">Value Loops.</span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-[#2B3E32] font-normal leading-relaxed pt-2 border-l-2 border-[#063D2A]/30 pl-4">
                The world does not simply suffer from an abundance of waste—it
                suffers from an inefficiency of decentralized recovery
                infrastructure. Swayambhu constructs vertically integrated
                material systems connecting informal collectors, urban local
                bodies, and institutional ESG roadmaps.
              </p>
            </motion.div>

            {/* Emblem Capsule Card */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl bg-white/70 border border-[#063D2A]/15 flex items-center gap-5 shadow-[0_4px_24px_rgba(6,61,42,0.04)] backdrop-blur-sm"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1.2, ease: easeCurve }}
                className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 p-1.5 rounded-full bg-[#FAF8F5] border border-[#063D2A]/20 flex items-center justify-center shadow-inner"
              >
                <Image
                  src="/transparent.png"
                  alt="Swayambhu Registered Emblem"
                  width={72}
                  height={72}
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#063D2A] font-bold">
                  Certified Value Creation
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#0B1710] tracking-tight leading-snug">
                  Closed-Loop Recycling
                </h3>
                <p className="text-xs text-[#4F6255] font-light leading-relaxed mt-0.5">
                  Converting post-consumer packaging, multi-layer plastics, and
                  organic streams into quantifiable ecological assets.
                </p>
              </div>
            </motion.div>

            {/* Direct Connect Action */}
            <motion.div variants={itemVariants} className="pt-2">
              <button
                onClick={() => scrollTo("#contact", { offset: -40 })}
                className="group inline-flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-[0.16em] text-[#063D2A] hover:text-[#094F37] transition-colors"
              >
                <span>Review Municipal & Corporate Models</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: 3 Pillars of Operation */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5 lg:border-l lg:border-[#063D2A]/10 lg:pl-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#063D2A]/70 font-semibold block mb-2">
              Operational Anchors
            </span>

            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.code}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 sm:p-6 rounded-xl bg-white/70 hover:bg-white border border-[#063D2A]/10 hover:border-[#063D2A]/30 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#ECE8E1] border border-[#063D2A]/15 flex items-center justify-center text-[#063D2A]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#063D2A]">
                        {pillar.code}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#063D2A]/10 text-[#063D2A] uppercase tracking-wider">
                      {pillar.tag}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-[#0B1710] uppercase tracking-tight mb-1.5">
                    {pillar.title}
                  </h4>

                  <p className="text-xs sm:text-[13px] text-[#425549] font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}