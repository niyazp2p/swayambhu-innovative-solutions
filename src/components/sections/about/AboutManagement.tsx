"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowUpRight, ShieldCheck, ChevronRight } from "lucide-react";

interface Leader {
  name: string;
  role: string;
  credentials: string;
  bio: string;
  image: string;
  slug: string;
  focus: string;
}

const leaders: Leader[] = [
  {
    name: "Akansha Singh",
    role: "Founder & CEO",
    credentials: "TISS Mumbai • Banasthali Alumna",
    bio: "Pioneering decentralized circular infrastructure, social equity frameworks, and public-private municipal partnerships across India.",
    image: "/team/akansha.jpg",
    slug: "akansha-singh",
    focus: "Enterprise Governance & Policy",
  },
  {
    name: "Ashutosh Kumar",
    role: "Co-Founder & CTO",
    credentials: "Lancaster University Alumnus",
    bio: "Directing technical architecture across decentralized bio-methanation systems, automated MRF processing, and industrial extrusion lines.",
    image: "/team/ashutosh.jpg",
    slug: "ashutosh-kumar",
    focus: "Plant Automation & Bio-Tech",
  },
  {
    name: "Sachin Kumar",
    role: "Head of Communications",
    credentials: "Brand & Public Affairs Strategist",
    bio: "Leading enterprise communications, institutional partnerships, BRSR disclosures, and national stakeholder outreach for green initiatives.",
    image: "/team/sachin.jpg",
    slug: "sachin-kumar",
    focus: "ESG Disclosure & PR",
  },
  {
    name: "Priyank Gupta",
    role: "General Manager",
    credentials: "Manufacturing Operations Lead",
    bio: "Supervising high-tonnage mechanical recycling throughput, regional supply-chain operations, and facility standards at Haridwar.",
    image: "/team/priyank.jpg",
    slug: "priyank-gupta",
    focus: "Plant Logistics & Production",
  },
];

const easeCurve = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeCurve },
  },
};

export default function AboutManagement() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="management"
      ref={sectionRef}
      className="relative w-full bg-[#ECE8E1] text-[#0D1812] py-20 sm:py-28 md:py-36 px-5 sm:px-10 lg:px-16 overflow-hidden selection:bg-[#063D2A] selection:text-white border-t border-[#063D2A]/15"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40 select-none">
        <div className="max-w-7xl mx-auto h-full border-x border-[#063D2A]/10 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#063D2A]/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeCurve }}
          className="flex items-center justify-between pb-4 border-b border-[#063D2A]/15 mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#063D2A]" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#063D2A] font-semibold">
              04 // Executive Leadership
            </span>
          </div>

          <Link
            href="/management"
            className="group inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono text-[#063D2A] hover:underline uppercase tracking-wider font-semibold"
          >
            <span>Full Board & Advisors</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Section Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 text-left">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#0B1710] leading-none">
              The Minds Steering <br />
              <span className="text-[#063D2A]">Decentralized Scale.</span>
            </h2>
            <p className="text-[#34483B] text-xs sm:text-base font-light leading-relaxed pt-1">
              Cross-disciplinary innovators combining clean-tech engineering, institutional governance, social equity, and industrial operations.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#063D2A] px-4 py-2 rounded-lg bg-white/70 border border-[#063D2A]/15 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#063D2A]" />
            <span>Operational & Governance Board</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 1. DESKTOP GRID: 4-COLUMN CARDS WITH CINEMATIC ZOOM     */}
        {/* ======================================================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
        >
          {leaders.map((leader) => (
            <motion.div
              key={leader.slug}
              variants={cardVariants}
              className="group relative rounded-2xl bg-white/80 border border-[#063D2A]/15 hover:border-[#063D2A]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_rgba(6,61,42,0.04)] hover:shadow-[0_12px_32px_rgba(6,61,42,0.08)] hover:-translate-y-1"
            >
              <div>
                {/* Image Container with Ambient Scrim */}
                <div className="relative w-full h-72 overflow-hidden bg-[#ECE8E1]">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover object-center filter grayscale contrast-[1.05] brightness-95 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                  {/* Operational Focus Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-2.5 py-1 rounded-md bg-white/90 border border-[#063D2A]/15 backdrop-blur-md text-[9px] font-mono uppercase tracking-wider text-[#063D2A] font-semibold">
                      {leader.focus}
                    </span>
                  </div>
                </div>

                {/* Profile Meta Body */}
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#063D2A]/70 block">
                    {leader.credentials}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-[#0B1710] leading-tight">
                    {leader.name}
                  </h3>
                  <span className="text-xs font-mono font-semibold text-[#063D2A] block">
                    {leader.role}
                  </span>
                  <p className="text-xs text-[#3E5244] font-light leading-relaxed pt-2">
                    {leader.bio}
                  </p>
                </div>
              </div>

              {/* Card Footer: Detail Link */}
              <div className="p-6 pt-0 border-t border-[#063D2A]/10 mt-4 flex items-center justify-between">
                <Link
                  href={`/management#${leader.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#063D2A] group-hover:text-[#094F37] transition-colors uppercase tracking-wider pt-3"
                >
                  <span>Detailed Bio</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ======================================================== */}
        {/* 2. MOBILE VIEW: SNAP HORIZONTAL CARD STREAM               */}
        {/* ======================================================== */}
        <div className="block md:hidden text-left">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory -mx-5 px-5">
            {leaders.map((leader, idx) => (
              <div
                key={leader.slug}
                className="snap-center shrink-0 w-[285px] rounded-2xl bg-white border border-[#063D2A]/15 flex flex-col justify-between overflow-hidden shadow-lg"
              >
                <div>
                  <div className="relative w-full h-64 overflow-hidden bg-[#ECE8E1]">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover object-center filter contrast-[1.05]"
                      sizes="285px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-white/90 border border-[#063D2A]/15 text-[9px] font-mono text-[#063D2A] font-bold uppercase tracking-wider">
                      0{idx + 1} // {leader.role}
                    </span>
                  </div>

                  <div className="p-5 space-y-1.5">
                    <span className="text-[10px] font-mono text-[#063D2A]/70 block uppercase">
                      {leader.credentials}
                    </span>
                    <h3 className="text-lg font-bold uppercase text-[#0B1710] tracking-tight leading-snug">
                      {leader.name}
                    </h3>
                    <p className="text-xs text-[#3E5244] font-light leading-relaxed pt-1 line-clamp-3">
                      {leader.bio}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-[#063D2A]/10">
                  <Link
                    href={`/management#${leader.slug}`}
                    className="w-full py-2.5 px-3 rounded-lg bg-[#ECE8E1]/80 hover:bg-[#ECE8E1] border border-[#063D2A]/15 text-xs font-mono uppercase tracking-wider text-[#063D2A] font-bold flex items-center justify-between"
                  >
                    <span>Inspect Profile</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 pt-2 text-[10px] font-mono text-[#063D2A]/60 uppercase tracking-widest">
            <span>← Swipe To View Leadership →</span>
          </div>
        </div>

        {/* Global Directory Redirect Strip */}
        <div className="mt-14 pt-8 border-t border-[#063D2A]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <span className="text-xs font-mono text-[#34483B] uppercase tracking-wider">
            Looking for advisory board members and regional project directors?
          </span>
          <Link
            href="/management"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#063D2A] hover:bg-[#094F37] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm"
          >
            <span>Explore Complete Management Page</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}