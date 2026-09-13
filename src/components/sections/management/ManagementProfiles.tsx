"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import {
  Mail,
  Award,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

interface ExecutiveProfile {
  id: string;
  name: string;
  role: string;
  badge: string;
  alumniTag: string;
  linkedin: string;
  email: string;
  bio: string;
  operationalDomain: string;
  image: string;
  keyInitiatives: string[];
  accreditation: string;
}

const leadershipProfiles: ExecutiveProfile[] = [
  {
    id: "akansha-singh",
    name: "Akansha Singh",
    role: "Founder & CEO",
    badge: "Executive Leadership",
    alumniTag: "TISS Mumbai • Banasthali Alumna",
    linkedin: "https://www.linkedin.com/in/akansha-singh-63729256/",
    email: "contact@swayambhuinfo.com",
    bio: "Social entrepreneur, TISS Mumbai and Banasthali alumna, and Goldman Sachs 10k Women scholar leading Swayambhu's circular climate infrastructure and municipal public-private partnerships across India.",
    operationalDomain: "Enterprise Strategy & Policy Governance",
    image: "/team/akansha.jpg",
    keyInitiatives: [
      "Decentralized MRF deployment across multi-state civic corridors",
      "Statutory Category-II EPR compliance advisory for brand owners",
      "Spearheading social equity and dignified livelihoods for green workers",
    ],
    accreditation: "Goldman Sachs 10k Women Scholar",
  },
  {
    id: "ashutosh-kumar",
    name: "Ashutosh Kumar",
    role: "Co-Founder & CTO",
    badge: "Clean-Tech Directorate",
    alumniTag: "Lancaster University Alumnus",
    linkedin: "https://www.linkedin.com/in/ashutosh-kumar-923281164/",
    email: "contact@swayambhuinfo.com",
    bio: "Lancaster University alumnus and clean-tech innovator spearheading decentralized bio-methanation digesters, industrial MRF upcycling automation, and high-efficiency polymer processing lines.",
    operationalDomain: "Bio-Energy Systems & Polymer Automation",
    image: "/team/ashutosh.jpg",
    keyInitiatives: [
      "Anaerobic digestion plant engineering and rural biogas telemetry",
      "Automated optical and conveyor segregation lines across 19 streams",
      "Process optimization at the Haridwar mechanical recovery plant",
    ],
    accreditation: "Lancaster Univ. Clean-Tech Fellow",
  },
  {
    id: "sachin-kumar",
    name: "Sachin Kumar",
    role: "Head of Communications",
    badge: "Institutional Affairs",
    alumniTag: "Brand & Public Policy Strategist",
    linkedin: "https://www.linkedin.com/in/sachin-kumar-535438139/",
    email: "contact@swayambhuinfo.com",
    bio: "Directs brand storytelling, strategic stakeholder outreach, institutional public affairs, and national media campaigns for municipal recycling hubs and corporate circular initiatives.",
    operationalDomain: "ESG Disclosures & Public Affairs",
    image: "/team/sachin.jpg",
    keyInitiatives: [
      "Corporate ESG and SEBI BRSR alignment campaigns",
      "National stakeholder outreach across ULBs and railway junctions",
      "Multi-channel media documentation of grassroots circular impacts",
    ],
    accreditation: "National Environmental Comms Lead",
  },
  {
    id: "priyank-gupta",
    name: "Priyank Gupta",
    role: "General Manager",
    badge: "Manufacturing Operations",
    alumniTag: "Operations & Supply-Chain Lead",
    linkedin: "https://www.linkedin.com/in/priyank-gupta-a040a626/",
    email: "contact@swayambhuinfo.com",
    bio: "Directs multi-facility industrial operations, supply-chain logistics, Haridwar plant daily processing throughput, and multi-state MRF material flow compliance.",
    operationalDomain: "Industrial Logistics & Plant Throughput",
    image: "/team/priyank.jpg",
    keyInitiatives: [
      "Haridwar SIDCUL mechanical upcycling plant management",
      "Feedstock procurement and raw material weighbridge operations",
      "High-density recycled structural eco-board manufacturing runs",
    ],
    accreditation: "CPCB Multi-State Plant Supervisor",
  },
];

const easeExpo = [0.16, 1, 0.3, 1] as const;

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function ManagementProfiles() {
  const [activeTab, setActiveTab] = useState<ExecutiveProfile>(leadershipProfiles[0]);
  const [mobileIdx, setMobileIdx] = useState(0);
  const [dragDirection, setDragDirection] = useState(0);

  const total = leadershipProfiles.length;

  const handleNext = () => {
    setDragDirection(1);
    setMobileIdx((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setDragDirection(-1);
    setMobileIdx((prev) => (prev - 1 + total) % total);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -40) {
      handleNext();
    } else if (info.offset.x > 40) {
      handlePrev();
    }
  };

  const currentMobile = leadershipProfiles[mobileIdx];

  return (
    <section
      id="management"
      className="relative w-full bg-[#FDF8EE] text-[#171F1B] py-20 sm:py-28 md:py-36 px-5 sm:px-10 lg:px-16 overflow-hidden selection:bg-[#006B3C] selection:text-white border-t border-[#DDE5DC]"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40 select-none">
        <div className="max-w-7xl mx-auto h-full border-x border-[#006B3C]/10 grid grid-cols-2 md:grid-cols-4 divide-x border-[#006B3C]/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Eyebrow Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DDE5DC] mb-10 sm:mb-14">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#006B3C]" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#006B3C] font-bold">
              02 // Corporate Stewardship
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#52605A] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#006B3C]" />
            <span>Board Directorate</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 text-left">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#171F1B] leading-none">
              Meet The <br />
              <span className="text-[#006B3C]">Executive Board.</span>
            </h2>
            <p className="text-xs sm:text-base text-[#52605A] font-light leading-relaxed pt-1">
              Cross-disciplinary innovators combining environmental engineering, institutional governance, social equity, and industrial operations.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#DDE5DC] text-xs font-mono text-[#006B3C] shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Executive Profiles & Verification</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 1. DESKTOP VIEW: INTERACTIVE SPLIT INSPECTOR CONSOLE      */}
        {/* ========================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start text-left">
          {/* Left Column: Interactive Leader Selection Stack */}
          <div className="col-span-5 space-y-3">
            {leadershipProfiles.map((person) => {
              const isSelected = activeTab.id === person.id;
              return (
                <div
                  key={person.id}
                  onClick={() => setActiveTab(person)}
                  className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-white border-[#006B3C] shadow-[0_10px_28px_rgba(0,107,60,0.08)] translate-x-1"
                      : "bg-[#FAF8F5]/80 hover:bg-white border-[#DDE5DC] hover:border-[#006B3C]/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#EEF5ED] border border-[#DDE5DC] shrink-0">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className="object-cover object-center"
                        sizes="56px"
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#006B3C] font-bold">
                        {person.badge}
                      </span>
                      <h3 className="text-base font-bold uppercase tracking-tight text-[#171F1B] group-hover:text-[#006B3C] transition-colors leading-snug">
                        {person.name}
                      </h3>
                      <span className="text-xs font-mono text-[#7B8580]">
                        {person.role}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-mono font-bold transition-transform ${
                      isSelected
                        ? "text-[#006B3C] translate-x-0.5"
                        : "text-[#7B8580] group-hover:text-[#171F1B]"
                    }`}
                  >
                    // Inspect
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Profile Dossier Card */}
          <div className="col-span-7 sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.98 }}
                transition={{ duration: 0.32, ease: easeExpo }}
                className="rounded-3xl bg-white border border-[#DDE5DC] p-8 sm:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.04)] space-y-6"
              >
                {/* Dossier Header */}
                <div className="flex items-start justify-between pb-6 border-b border-[#DDE5DC]">
                  <div className="flex items-center gap-5">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#DDE5DC] shadow-sm shrink-0">
                      <Image
                        src={activeTab.image}
                        alt={activeTab.name}
                        fill
                        className="object-cover object-center"
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#006B3C] font-bold block mb-1">
                        {activeTab.alumniTag}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#171F1B] tracking-tight">
                        {activeTab.name}
                      </h3>
                      <span className="text-sm font-mono font-semibold text-[#006B3C] block">
                        {activeTab.role}
                      </span>
                    </div>
                  </div>

                  {/* LinkedIn & Email Direct Channels */}
                  <div className="flex items-center gap-2">
                        <a
                        href={activeTab.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-[#EEF5ED] hover:bg-[#006B3C] border border-[#006B3C]/20 text-[#006B3C] hover:text-white flex items-center justify-center transition-all shadow-sm"
                        aria-label={`${activeTab.name} LinkedIn Profile`}
                        >
                        <LinkedInIcon className="w-4 h-4" />
                        </a>
                    <a
                      href={`mailto:${activeTab.email}`}
                      className="w-10 h-10 rounded-xl bg-[#FAF8F5] hover:bg-[#171F1B] border border-[#DDE5DC] text-[#52605A] hover:text-white flex items-center justify-center transition-all shadow-sm"
                      aria-label={`Email ${activeTab.name}`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Domain Focus Strip */}
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#DDE5DC] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#006B3C]" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#52605A]">
                      Primary Domain:
                    </span>
                    <span className="text-xs font-mono font-bold text-[#171F1B]">
                      {activeTab.operationalDomain}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#EEF5ED] text-[#006B3C] font-semibold">
                    {activeTab.accreditation}
                  </span>
                </div>

                {/* Biography Narrative */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#7B8580] font-bold block">
                    Leadership Bio & Background:
                  </span>
                  <p className="text-sm text-[#52605A] font-light leading-relaxed">
                    {activeTab.bio}
                  </p>
                </div>

                {/* Strategic Initiatives */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#006B3C] font-bold block">
                    Key Operational Directives:
                  </span>
                  <div className="space-y-2">
                    {activeTab.keyInitiatives.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#171F1B]">
                        <Award className="w-4 h-4 text-[#006B3C] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Footer Strip */}
                <div className="pt-5 border-t border-[#DDE5DC] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#7B8580]">
                    Verified Corporate Officer
                  </span>
                  <a
                    href={activeTab.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#006B3C] hover:underline"
                  >
                    <span>Connect on LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. MOBILE VIEW: SWIPEABLE DOSSIER CAROUSEL                */}
        {/* ========================================================= */}
        <div className="block lg:hidden text-left">
          <div className="relative min-h-[490px] w-full flex items-center justify-center">
            <AnimatePresence mode="wait" custom={dragDirection}>
              <motion.div
                key={currentMobile.id}
                custom={dragDirection}
                initial={{ opacity: 0, x: dragDirection >= 0 ? 80 : -80, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dragDirection >= 0 ? -80 : 80, scale: 0.96 }}
                transition={{ duration: 0.28, ease: easeExpo }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={handleDragEnd}
                className="w-full bg-white border border-[#DDE5DC] rounded-3xl p-6 shadow-[0_12px_32px_rgba(0,0,0,0.04)] flex flex-col justify-between active:cursor-grabbing text-left"
              >
                <div>
                  {/* Top Mobile Header */}
                  <div className="flex items-start justify-between pb-4 border-b border-[#DDE5DC] mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#FAF8F5] border border-[#DDE5DC] shrink-0">
                        <Image
                          src={currentMobile.image}
                          alt={currentMobile.name}
                          fill
                          className="object-cover object-center"
                          sizes="56px"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono uppercase text-[#006B3C] font-bold block">
                          {currentMobile.badge}
                        </span>
                        <h3 className="text-lg font-bold uppercase text-[#171F1B] tracking-tight leading-tight">
                          {currentMobile.name}
                        </h3>
                        <span className="text-xs font-mono text-[#7B8580] block">
                          {currentMobile.role}
                        </span>
                      </div>
                    </div>

                    <a
                        href={currentMobile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-xl bg-[#EEF5ED] text-[#006B3C] border border-[#006B3C]/20 flex items-center justify-center shadow-sm shrink-0"
                        aria-label={`${currentMobile.name} LinkedIn`}
                        >
                        <LinkedInIcon className="w-4 h-4" />
                        </a>
                  </div>

                  {/* Alumni Badge */}
                  <div className="mb-3">
                    <span className="text-[10px] font-mono text-[#006B3C] px-2.5 py-1 rounded-md bg-[#EEF5ED] inline-block font-semibold">
                      {currentMobile.alumniTag}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-[#52605A] font-light leading-relaxed mb-4 line-clamp-4">
                    {currentMobile.bio}
                  </p>

                  {/* Primary Directive */}
                  <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#DDE5DC] mb-3">
                    <span className="text-[9px] font-mono uppercase text-[#7B8580] tracking-wider block mb-1">
                      Key Objective
                    </span>
                    <span className="text-xs font-medium text-[#171F1B] block">
                      {currentMobile.keyInitiatives[0]}
                    </span>
                  </div>
                </div>

                {/* Mobile Bottom Footer */}
                <div className="pt-3 border-t border-[#DDE5DC] flex items-center justify-between">
                  <a
                    href={`mailto:${currentMobile.email}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#52605A]"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Inquire</span>
                  </a>

                  <a
                    href={currentMobile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 px-3 rounded-lg bg-[#006B3C] text-white text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls: Pagination and Arrows */}
          <div className="flex items-center justify-between mt-5 px-1">
            <div className="flex items-center gap-1.5">
              {leadershipProfiles.map((person, idx) => (
                <button
                  key={person.id}
                  onClick={() => {
                    setDragDirection(idx > mobileIdx ? 1 : -1);
                    setMobileIdx(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    mobileIdx === idx ? "w-6 bg-[#006B3C]" : "w-1.5 bg-[#006B3C]/20"
                  }`}
                  aria-label={`Profile ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-lg border border-[#DDE5DC] bg-white flex items-center justify-center text-[#171F1B] shadow-sm"
                aria-label="Previous profile"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-lg border border-[#DDE5DC] bg-white flex items-center justify-center text-[#171F1B] shadow-sm"
                aria-label="Next profile"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}