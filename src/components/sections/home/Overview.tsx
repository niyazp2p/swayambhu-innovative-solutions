"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";

export default function Overview() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  const easeExpo = [0.16, 1, 0.3, 1] as const;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: easeExpo },
    },
  };

  const outputs = [
    { code: "01", name: "Eco-Benches" },
    { code: "02", name: "School Desks" },
    { code: "03", name: "Sanitation Stations" },
    { code: "04", name: "Portable Toilets" },
    { code: "05", name: "Plastic Banks" },
    { code: "06", name: "Structural Boards" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#ECE8E1] text-[#0D1812] pt-12 sm:pt-16 pb-16 sm:pb-24 px-6 sm:px-10 lg:px-16 overflow-hidden selection:bg-[#063D2A] selection:text-[#ECE8E1]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Compact Hairline Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeExpo }}
          className="flex items-center justify-between pb-4 border-b border-[#063D2A]/15 mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#063D2A]" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.24em] text-[#063D2A] font-semibold">
              01 // The Thesis
            </span>
          </div>

          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#063D2A]/60">
            Haridwar Facility • Est. 2015
          </span>
        </motion.div>

        {/* 12-Column Structural Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
        >
          {/* Left Column: Monumental Editorial Statement */}
          <div className="lg:col-span-7 space-y-6">
            <motion.h2
              variants={itemVariants}
              className="font-sans font-light text-[2.4rem] xs:text-[2.9rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] leading-[0.92] tracking-[-0.035em] uppercase text-[#0B1710]"
            >
              The world <br />
              doesn&apos;t have <br />
              a waste problem. <br />
              <span className="font-extrabold text-[#063D2A]">
                It has a value recovery problem.
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg font-normal text-[#2A3F33] leading-relaxed max-w-xl border-l-2 border-[#063D2A]/30 pl-4"
            >
              Millions of tonnes of potentially valuable material disappear into inefficient systems every year. The opportunity is not simply to move waste — but to recover what it can become.
            </motion.p>
          </div>

          {/* Right Column: Identity, Narrative, and Balanced Output Grid */}
          <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-[#063D2A]/10 lg:pl-10">
            {/* Identity Capsule */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 p-1.5 rounded-full border border-[#063D2A]/20 bg-white/60 backdrop-blur-md flex items-center justify-center shadow-sm">
                <Image
                  src="/transparent.png"
                  alt="Swayambhu Emblem"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-[13px] sm:text-sm font-bold uppercase tracking-[0.14em] text-[#0B1710] leading-tight">
                  Swayambhu Solutions
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-[#063D2A] tracking-wider uppercase">
                  Community-Rooted Infrastructure
                </span>
              </div>
            </motion.div>

            {/* Narrative Body */}
            <motion.div
              variants={itemVariants}
              className="space-y-3 text-[#304537] text-xs sm:text-[14px] leading-relaxed font-light"
            >
              <p>
                Since 2015, Swayambhu has built a decentralized model spanning mechanical plastic recycling, Material Recovery Facilities (MRFs), Extended Producer Responsibility (EPR) credits, and community biogas plants.
              </p>
              <p>
                We develop comprehensive strategies for post-consumer waste: organizing local communities, training women waste-pickers into formal green careers, and converting landfill-bound plastics into long-cycle utility infrastructure.
              </p>
            </motion.div>

            {/* Symmetrical 6-Cell Output Matrix */}
            <motion.div variants={itemVariants} className="pt-2">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#063D2A] font-semibold">
                  30+ Year Upcycled Output
                </span>
                <span className="text-[9px] font-mono text-[#063D2A]/50">
                  HARIDWAR FACILITY
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {outputs.map((item) => (
                  <div
                    key={item.code}
                    className="p-2.5 rounded bg-white/50 border border-[#063D2A]/10 hover:border-[#063D2A]/30 transition-colors flex flex-col justify-between"
                  >
                    <span className="text-[9px] font-mono text-[#063D2A]/60 block mb-1">
                      {item.code}
                    </span>
                    <span className="text-xs font-semibold text-[#0B1710] tracking-tight">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}