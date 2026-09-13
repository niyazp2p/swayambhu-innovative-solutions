"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  ArrowUpRight,
  CheckCircle2,
  Scale,
  ChevronDown,
  FileText,
  MapPin,
} from "lucide-react";

const easeCurve = [0.16, 1, 0.3, 1] as const;

interface PolicySection {
  id: string;
  code: string;
  title: string;
  badge: string;
  summary: string;
  clauses: {
    heading: string;
    details: string;
  }[];
}

const policySections: PolicySection[] = [
  {
    id: "identity-governance",
    code: "01",
    title: "Corporate Identity & Regulatory Scope",
    badge: "CIN: U74999BR2015PTC025206",
    summary:
      "Statutory data processing practices governed by Swayambhu Innovative Solutions Private Limited under Indian Information Technology laws and CPCB portal audit guidelines.",
    clauses: [
      {
        heading: "1.1 Data Fiduciary Identification",
        details:
          "This Privacy Policy outlines data handling by Swayambhu Innovative Solutions Private Limited (CIN: U74999BR2015PTC025206), having its registered office in Patna, Bihar, and primary industrial operations in SIDCUL, Haridwar, Uttarakhand. References to 'we', 'our', or 'the Company' apply to our enterprise domains (www.swayambhuinfo.com), CRM intake channels, and operational ERP telemetry systems.",
      },
      {
        heading: "1.2 Legal Framework & Compliance Norms",
        details:
          "We process personal, operational, and institutional data in accordance with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023 (DPDPA).",
      },
      {
        heading: "1.3 Scope of Enterprise Engagement",
        details:
          "This document applies to corporate partners, brand owners (PIBOs), municipal corporations (ULBs), CSR sponsors, scrap aggregators, job applicants, and visitors submitting technical scopes or navigating our digital interfaces.",
      },
    ],
  },
  {
    id: "data-collection",
    code: "02",
    title: "Information Collection Architecture",
    badge: "Telemetry & Intake Streams",
    summary:
      "Structured collection of direct enterprise inputs, weighbridge documentation, and digital analytical signals.",
    clauses: [
      {
        heading: "2.1 Technical Scope & Inbound Inquiries",
        details:
          "When submitting intake forms through our Contact Ledger, EPR Desk, or AI Assistant, we collect identifying corporate metadata including full name, official corporate designation, business email address, direct phone contact, organization legal name, and required waste tonnage or material grade specifications.",
      },
      {
        heading: "2.2 Supply Chain & Vendor Data (Panel-1 & Panel-2)",
        details:
          "In executing Material Recovery Facility (MRF) and mechanical upcycling operations, we record vehicle registration numbers, weighbridge gross/tare metrics, GSTIN records, driver manifests, and bank settlement details for registered scrap aggregators and offtakers.",
      },
      {
        heading: "2.3 Automated Session & Telemetry Metadata",
        details:
          "Our servers log browser type, operating system parameters, IP address hashes, timestamp latencies, referring URLs, and aggregated interaction events to preserve portal security and prevent denial-of-service disruptions.",
      },
    ],
  },
  {
    id: "processing-purposes",
    code: "03",
    title: "Purpose of Processing & Statutory Mandates",
    badge: "Legitimate Business Use",
    summary:
      "Purpose-bound execution of EPR compliance certificates, MRF turnkey contracts, and CSR impact audits.",
    clauses: [
      {
        heading: "3.1 CPCB Category-II EPR Fulfillment",
        details:
          "Data submitted by brand owners is processed strictly to generate verifiable Category-II plastic recycling credits, statutory PWM compliance certificates, and tamper-proof chain-of-custody ledgers on official Central Pollution Control Board portals.",
      },
      {
        heading: "3.2 Turnkey Contract Execution & Operations",
        details:
          "Vendor, employee, and municipal data are leveraged for automated daily progress reports (DPR), material mass-balance calculations, logistics dispatch gating, and statutory tax invoicing.",
      },
      {
        heading: "3.3 Institutional Governance & SLA Commitments",
        details:
          "Corporate contact submissions allow our executive secretariat to route formal proposals, execute non-disclosure agreements, and uphold our 24-hour turnaround response commitments.",
      },
    ],
  },
  {
    id: "security-retention",
    code: "04",
    title: "Data Safeguards & Retention Schedules",
    badge: "ISO 9001 & CPCB Auditable",
    summary:
      "Cryptographic protection, role-based database permissions, and statutory archival timelines.",
    clauses: [
      {
        heading: "4.1 Cryptographic & Infrastructure Protections",
        details:
          "All web sessions are enforced via TLS 1.3 encryption. Backend operational modules operate under OAuth2 Bearer token authentication with bcrypt credential hashing, role-based authorization barriers (RBAC), and isolated database containerization.",
      },
      {
        heading: "4.2 Retention & Immutability Standards",
        details:
          "Weighbridge procurement logs, goods receipt notes (GRN), and EPR certificate audit trails are maintained for a mandatory minimum of 5 to 7 operational years to satisfy CPCB and GST statutory audit mandates. General technical inquiries are archived every 24 months if no contractual relationship ensues.",
      },
      {
        heading: "4.3 Third-Party Disclosure & Zero-Sale Guarantee",
        details:
          "Swayambhu does not sell, lease, or monetize personal or commercial contact information. Disclosures are strictly limited to statutory regulatory auditors (CPCB/SPCB), official tax bodies, or certified banking gateways supporting financial settlements.",
      },
    ],
  },
  {
    id: "cookies-telemetry",
    code: "05",
    title: "Cookie Governance & Tracking Telemetry",
    badge: "Functional & Analytical",
    summary:
      "Mechanisms governing cookie sessions, user consents, and technical preference retention.",
    clauses: [
      {
        heading: "5.1 Essential & Functional Cookies",
        details:
          "These cookies are required to authenticate session states, sustain secure portal routing, remember user form entries across viewports, and preserve cookie preference flags.",
      },
      {
        heading: "5.2 Analytical & Performance Measurement",
        details:
          "Aggregated cookies track page latency, component rendering speeds, and mobile layout fidelity without storing unhashed personal identifiers. Users can reject non-essential cookies via our floating consent prompt.",
      },
    ],
  },
  {
    id: "fiduciary-rights",
    code: "06",
    title: "Data Principal Rights & Redressal Desk",
    badge: "Grievance Mechanism",
    summary:
      "Protocols for exercising access, correction, data portability, and grievance redressal under Indian law.",
    clauses: [
      {
        heading: "6.1 Principal Rights",
        details:
          "You hold the right to confirm if we process your personal data, review a summary of stored corporate data, request correction of inaccurate metadata, and withdraw consent for non-statutory communications.",
      },
      {
        heading: "6.2 Grievance Officer Contact",
        details:
          "For formal notices, data removal requests, or regulatory queries, contact our designated Grievance Officer in writing at contact@swayambhuinfo.com or at our registered Haridwar / Patna locations. Formal responses will be dispatched within 30 statutory days.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  const [activeSectionId, setActiveSectionId] = useState<string>(policySections[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Auto-track active section while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const section of policySections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSectionId(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative w-full bg-[#FDF8EE] text-[#171F1B] selection:bg-[#006B3C] selection:text-white pb-16 sm:pb-24">
      {/* 1. CHARCOAL AUTHORITY HERO HEADER (Fitted for mobile screens) */}
      <section className="relative w-full bg-[#0A0F0D] text-[#F3F4F1] pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-20 px-4 sm:px-8 lg:px-16 overflow-hidden border-b border-white/10 selection:bg-[#22C55E] selection:text-black">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[650px] h-[240px] sm:h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.14)_0%,transparent_70%)] blur-2xl sm:blur-3xl" />
          <div className="max-w-7xl mx-auto h-full border-x border-white/[0.04] grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.04]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F0D]/90 via-transparent to-[#0A0F0D]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-left sm:text-center flex flex-col items-start sm:items-center">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeCurve }}
            className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#0A0F0D]/90 border border-white/15 backdrop-blur-md mb-4 sm:mb-6 shadow-md"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
            <span className="text-[9px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/90 font-semibold">
              Statutory Privacy & Governance
            </span>
          </motion.div>

          {/* Heading with Fluid Clamping */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeCurve }}
            className="font-sans font-black uppercase text-[clamp(1.85rem,6.5vw,4.2rem)] leading-[1.02] tracking-tight text-white mb-4 sm:mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
          >
            Privacy Policy & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] via-[#4ADE80] to-[#8FA295]">
              Data Protection Standard.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeCurve }}
            className="text-xs sm:text-base text-white/80 font-light leading-relaxed max-w-2xl mx-0 sm:mx-auto mb-6 sm:mb-8"
          >
            Swayambhu Innovative Solutions Private Limited upholds enterprise confidentiality, verified CPCB audit-trail integrity, and transparent data processing across all platforms.
          </motion.p>

          {/* Responsive Metadata Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: easeCurve }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3.5 w-full max-w-3xl"
          >
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-start sm:items-center">
              <span className="text-[8px] sm:text-[9px] font-mono text-[#22C55E] uppercase tracking-wider font-semibold">Entity</span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-white mt-0.5">Pvt Ltd</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-start sm:items-center">
              <span className="text-[8px] sm:text-[9px] font-mono text-[#22C55E] uppercase tracking-wider font-semibold">Effective</span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-white mt-0.5">September 2026</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-start sm:items-center">
              <span className="text-[8px] sm:text-[9px] font-mono text-[#22C55E] uppercase tracking-wider font-semibold">Jurisdiction</span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-white mt-0.5">India</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-start sm:items-center">
              <span className="text-[8px] sm:text-[9px] font-mono text-[#22C55E] uppercase tracking-wider font-semibold">Audit Norm</span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-white mt-0.5">CPCB Aligned</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. MOBILE STICKY ACCORDION TRAY (<lg screens) */}
      <div className="sticky top-16 z-30 block lg:hidden w-full bg-[#FDF8EE]/95 border-b border-[#DDE5DC] backdrop-blur-md px-4 py-2.5 shadow-sm">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#DDE5DC] text-left text-xs font-mono font-bold text-[#171F1B]"
          aria-expanded={mobileMenuOpen}
        >
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-[#006B3C] shrink-0" />
            <span className="text-[#7B8580] uppercase text-[10px]">Section:</span>
            <span className="truncate text-[#006B3C]">
              {policySections.find((s) => s.id === activeSectionId)?.title}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-[#7B8580] shrink-0 transition-transform duration-200 ${
              mobileMenuOpen ? "rotate-180 text-[#006B3C]" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-2 bg-white rounded-2xl border border-[#DDE5DC] shadow-lg divide-y divide-[#DDE5DC]/60 max-h-[60vh] overflow-y-auto"
            >
              {policySections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={() => {
                    setActiveSectionId(sec.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block px-3.5 py-3 text-xs font-mono transition-colors ${
                    activeSectionId === sec.id
                      ? "bg-[#EEF5ED] text-[#006B3C] font-bold"
                      : "text-[#52605A] hover:bg-[#FAF8F5]"
                  }`}
                >
                  <span className="text-[10px] text-[#7B8580] mr-2">SEC {sec.code} //</span>
                  {sec.title}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. LIGHT AESTHETIC SPLIT BODY CONTENT */}
      <section className="relative z-10 w-full max-w-7xl mx-auto py-8 sm:py-16 md:py-24 px-4 sm:px-8 lg:px-16 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* DESKTOP STICKY SIDEBAR (Hidden on mobile) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-[#DDE5DC] shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DDE5DC]">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#006B3C] font-bold">
                  Policy Index
                </span>
                <Scale className="w-3.5 h-3.5 text-[#7B8580]" />
              </div>

              <nav className="space-y-1.5" aria-label="Privacy sections">
                {policySections.map((sec) => {
                  const isActive = activeSectionId === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={() => setActiveSectionId(sec.id)}
                      className={`group w-full p-3 rounded-xl text-xs font-mono flex items-center justify-between transition-all ${
                        isActive
                          ? "bg-[#EEF5ED] text-[#006B3C] font-bold border border-[#006B3C]/20 shadow-sm"
                          : "text-[#52605A] hover:bg-[#FAF8F5] hover:text-[#171F1B]"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className="text-[10px] opacity-60">{sec.code}.</span>
                        <span className="truncate">{sec.title}</span>
                      </span>
                      <ArrowUpRight
                        className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                          isActive ? "opacity-100 translate-x-0.5 -translate-y-0.5" : "opacity-30 group-hover:opacity-100"
                        }`}
                      />
                    </a>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-[#DDE5DC] space-y-2">
                <span className="text-[9px] font-mono uppercase text-[#7B8580] tracking-wider block font-medium">
                  Direct Rights Inquiries:
                </span>
                <a
                  href="mailto:contact@swayambhuinfo.com"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#006B3C] hover:underline truncate w-full"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">contact@swayambhuinfo.com</span>
                </a>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-[#FAF8F5] border border-[#DDE5DC] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#171F1B]">
                <CheckCircle2 className="w-4 h-4 text-[#006B3C] shrink-0" />
                <span>Statutory Registrations</span>
              </div>
              <p className="text-[11px] text-[#52605A] font-light leading-relaxed">
                CPCB Registered Recycler (PWM Rules) • ISO 9001:2015 QMS • ZED Silver Certified (Ministry of MSME).
              </p>
            </div>
          </aside>

          {/* MAIN ARTICLES (Optimized layout, margins & typography for mobile) */}
          <div className="w-full lg:col-span-8 space-y-6 sm:space-y-10">
            {policySections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-28 sm:scroll-mt-32 rounded-2xl sm:rounded-3xl bg-white border border-[#DDE5DC] p-5 sm:p-8 md:p-9 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4 sm:space-y-6"
              >
                {/* Article Header */}
                <div className="flex flex-col gap-2 pb-3.5 sm:pb-4 border-b border-[#DDE5DC]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#006B3C] font-bold">
                      SECTION {section.code} // GOVERNANCE
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#EEF5ED] text-[#006B3C] text-[9px] sm:text-[10px] font-mono font-semibold truncate max-w-[170px] sm:max-w-none text-right">
                      {section.badge}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-[#171F1B] leading-snug">
                    {section.title}
                  </h2>
                </div>

                {/* Section Summary */}
                <p className="text-xs sm:text-sm text-[#52605A] font-light leading-relaxed bg-[#FAF8F5] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#DDE5DC]/70">
                  {section.summary}
                </p>

                {/* Clauses Stack */}
                <div className="space-y-4 sm:space-y-6 pt-1">
                  {section.clauses.map((clause, idx) => (
                    <div key={idx} className="space-y-1 sm:space-y-1.5">
                      <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#171F1B] tracking-tight">
                        {clause.heading}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#52605A] font-light leading-relaxed">
                        {clause.details}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}

            {/* Fiduciary Redressal & Hub Footprint Card */}
            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#FAF8F5] to-[#EEF5ED] border border-[#DDE5DC] p-5 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-[#006B3C]">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <h3 className="text-sm sm:text-lg font-bold uppercase tracking-tight text-[#171F1B]">
                  Statutory Grievance Redressal
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#52605A] font-light leading-relaxed">
                In compliance with the Information Technology Act, 2000 and DPDPA 2023, data principals may direct notices, grievances, or erasure claims to our corporate offices:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1 text-xs font-mono">
                {/* Registered HQ Node */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#DDE5DC]">
                  <span className="text-[8px] sm:text-[9px] text-[#7B8580] uppercase tracking-wider block mb-1">
                    Corporate Entity
                  </span>
                  <span className="font-bold text-[#171F1B] block leading-snug">
                    Swayambhu Innovative Solutions Pvt. Ltd.
                  </span>
                  <span className="text-[10px] text-[#52605A] block mt-0.5">CIN: U74999BR2015PTC025206</span>
                  <span className="text-[11px] text-[#52605A] block mt-2 leading-relaxed">
                    Plot-5A2, Sector 3, IIE BHEL, Haridwar
                  </span>
                </div>

                {/* Processing Plant Hub */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#DDE5DC]">
                  <span className="text-[8px] sm:text-[9px] text-[#7B8580] uppercase tracking-wider block mb-1">
                    Operational Redressal Hub
                  </span>
                  <span className="font-bold text-[#171F1B] block leading-snug">
                    Haridwar
                  </span>
                  <span className="text-[10px] text-[#52605A] block mt-0.5">Plot-5A2, Sector 3, IIE BHEL, Haridwar</span>
                  <div className="mt-2 space-y-1">
                    <a
                      href="tel:+919205642777"
                      className="text-[#006B3C] font-bold hover:underline block truncate"
                    >
                      +91 9205642777
                    </a>
                    <a
                      href="mailto:contact@swayambhuinfo.com"
                      className="text-[#006B3C] font-bold hover:underline block truncate"
                    >
                      contact@swayambhuinfo.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-[10px] sm:text-[11px] font-mono text-[#7B8580]">
                <span>Document Classification: Public Corporate Policy</span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-[#006B3C] font-bold hover:underline"
                >
                  <span>Access Central Contact Ledger</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}