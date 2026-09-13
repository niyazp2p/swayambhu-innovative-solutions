"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  X,
  Building2,
  Users,
  Sparkles,
  Recycle,
  Eye,
} from "lucide-react";

interface FieldStory {
  id: string;
  tag: string;
  title: string;
  location: string;
  partner: string;
  metric: string;
  summary: string;
  detailedText: string;
  src: string;
}

const fieldStories: FieldStory[] = [
  {
    id: "img1",
    tag: "Riverbed Ecological Action",
    title: "Ghat Cleaning & Upcycling Drive",
    location: "Riverine Corridors",
    partner: "Lifebuoy / HUL & Local Youth",
    metric: "100% Diverted to CSR Units",
    summary:
      "Mobilized student ambassadors and frontline youth to clean sensitive river ghats, diverting discarded flexible packaging into durable handwashing stations.",
    detailedText:
      "Collected single-use plastics and multilayer polymers directly from high-footprint river ghats. All gathered plastic waste was segregated and converted through thermal compaction into clean-water sanitation stations donated back to regional rural schools.",
    src: "/assets/img1.jpg",
  },
  {
    id: "img2",
    tag: "Safai Mitra Formalization",
    title: "MRF Operations & Sanitation Collective",
    location: "Ajeetpur, Haridwar",
    partner: "Hindustan Unilever (HUL)",
    metric: "19 Clean Streams Sorted",
    summary:
      "Equipping frontline waste workers with safety gear, dignified wages, and institutional training across primary decentralized sorting hubs.",
    detailedText:
      "At our flagship Ajeetpur Material Recovery Facility (MRF), decentralized sorting systems support daily livelihoods for over 50 informal waste collectors. The facility operates 19 segregated streams to prevent combustible refuse from entering municipal landfills.",
    src: "/assets/img2.jpg",
  },
  {
    id: "img3",
    tag: "Circular Infrastructure",
    title: "Upcycled School Benches & Desks",
    location: "Government Schools Network",
    partner: "ITC Limited CSR Collaboration",
    metric: "30+ Year Expected Lifespan",
    summary:
      "Waterproof, termite-resistant student benches and desks manufactured from recycled plastic scrap, empowering classroom education.",
    detailedText:
      "Classroom furniture engineered from 100% upcycled post-consumer packaging boards. Replacing conventional timber with heavy-duty recycled polymer sheets reduces wood harvesting, stays moisture-proof during monsoon cycles, and remains fully recyclable at end-of-life.",
    src: "/assets/img3.jpg",
  },
  {
    id: "img4",
    tag: "Transit Hub Zero-Waste",
    title: "Pack with Purpose - Varanasi Station",
    location: "Varanasi Cantt Railway Station",
    partner: "Tetra Pak & Northern Railway",
    metric: "Model Station Circularity",
    summary:
      "Official inauguration of upcycled carton collection bins at Varanasi Cantt Railway Station in partnership with Tetra Pak.",
    detailedText:
      "Deployment of dedicated composite carton recovery bins across high-traffic rail platforms. In partnership with Northern Railway and Tetra Pak, discarded post-consumer beverage cartons are diverted directly into industrial recycling lines to produce composite boards and clean paper fibers.",
    src: "/assets/img4.jpg",
  },
];

const easeCurve = [0.16, 1, 0.3, 1] as const;

export default function FieldInAction() {
  const [activeStory, setActiveStory] = useState<FieldStory | null>(null);

  return (
    <section
      id="field-in-action"
      className="relative w-full bg-[#0A0F0D] text-[#F3F4F1] py-16 sm:py-24 md:py-32 px-4 sm:px-8 lg:px-16 overflow-hidden selection:bg-[#22C55E] selection:text-black border-t border-white/10"
    >
      {/* 1. ARCHITECTURAL BACKGROUND ENGINE */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[750px] h-[300px] sm:h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.1)_0%,transparent_70%)] blur-3xl" />
        <div className="max-w-7xl mx-auto h-full border-x border-white/[0.04] grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.04]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F0D] via-transparent to-[#0A0F0D]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* TOP SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10 mb-10 sm:mb-14">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#22C55E] text-[10px] font-mono uppercase tracking-[0.2em]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ground Verification Dossier</span>
            </div>
            <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              Field in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] via-[#4ADE80] to-[#8FA295]">Action.</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/70 max-w-xl font-light leading-relaxed">
              Decentralized sorting facilities, riverbed remediation campaigns, and circular asset installations delivering tangible proof across India.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-white/50 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
            <span>Trust & Scale</span>
          </div>
        </div>

        {/* FIELD STORIES GRID: 2x2 Clean Light-on-Dark Aesthetics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {fieldStories.map((story, idx) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: easeCurve }}
              className="group rounded-3xl bg-[#FDF8EE] text-[#171F1B] border border-[#DDE5DC] overflow-hidden flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-[#22C55E]/60 text-left"
            >
              <div>
                {/* Visual Image Container */}
                <div className="relative w-full h-56 sm:h-72 overflow-hidden bg-black/10">
                  <Image
                    src={story.src}
                    alt={story.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#0A0F0D]/85 backdrop-blur-md border border-white/20 text-[#22C55E] text-[10px] font-mono uppercase tracking-wider font-semibold">
                      {story.tag}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Bottom Metric Pill */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-medium drop-shadow-md">
                      <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
                      <span>{story.location}</span>
                    </div>
                    <span className="text-[10px] font-mono bg-[#006B3C] text-white px-2.5 py-0.5 rounded-full font-bold uppercase">
                      {story.metric}
                    </span>
                  </div>
                </div>

                {/* Content Payload */}
                <div className="p-5 sm:p-7 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#006B3C] font-semibold uppercase tracking-wider">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{story.partner}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#171F1B] leading-tight group-hover:text-[#006B3C] transition-colors">
                    {story.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#52605A] font-light leading-relaxed">
                    {story.summary}
                  </p>
                </div>
              </div>

              {/* Action Ribbon */}
              <div className="p-5 sm:p-7 pt-0 border-t border-[#DDE5DC]/70 mt-2 flex items-center justify-between">
                <button
                  onClick={() => setActiveStory(story)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#006B3C] hover:text-[#063D2A] transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect On-Site Dossier</span>
                </button>

                <Link
                  href="/contact"
                  className="w-8 h-8 rounded-xl bg-[#EEF5ED] hover:bg-[#006B3C] text-[#006B3C] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
                  aria-label={`Inquire regarding ${story.title}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* POPUP DETAIL MODAL */}
      <AnimatePresence>
        {activeStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStory(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.3, ease: easeCurve }}
              className="relative w-full max-w-xl bg-[#FDF8EE] border border-[#DDE5DC] rounded-3xl overflow-hidden shadow-2xl text-[#171F1B] z-10 text-left"
            >
              {/* Modal Image Header */}
              <div className="relative w-full h-52 sm:h-64 bg-black/20">
                <Image
                  src={activeStory.src}
                  alt={activeStory.title}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <button
                  onClick={() => setActiveStory(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[10px] font-mono text-[#22C55E] uppercase tracking-wider font-semibold block mb-1">
                    {activeStory.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight">
                    {activeStory.title}
                  </h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="grid grid-cols-2 gap-3 py-2 border-y border-[#DDE5DC] text-xs font-mono">
                  <div>
                    <span className="text-[9px] text-[#7B8580] uppercase block">Location</span>
                    <span className="font-bold text-[#171F1B]">{activeStory.location}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#7B8580] uppercase block">Key Partner</span>
                    <span className="font-bold text-[#006B3C]">{activeStory.partner}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#006B3C] font-bold block">
                    Operational Scope & Lifecycle Execution
                  </span>
                  <p className="text-xs sm:text-sm text-[#52605A] font-light leading-relaxed">
                    {activeStory.detailedText}
                  </p>
                </div>

                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setActiveStory(null)}
                    className="px-4 py-2.5 rounded-xl border border-[#DDE5DC] text-xs font-mono uppercase tracking-wider font-semibold text-[#52605A] hover:bg-[#EEF5ED] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <Link
                    href="/contact"
                    className="px-5 py-2.5 rounded-xl bg-[#006B3C] hover:bg-[#063D2A] text-white text-xs font-mono uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>Initiate Similar Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}