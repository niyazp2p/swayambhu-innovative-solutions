"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  ShieldCheck,
  FileCheck2,
  Building2,
  Mail,
  Phone,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  AlertTriangle,
  Gavel,
  Lock,
} from "lucide-react";

const easeCurve = [0.16, 1, 0.3, 1] as const;

interface TermsSection {
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

const termsSections: TermsSection[] = [
  {
    id: "acceptance-scope",
    code: "01",
    title: "Acceptance & Corporate Scope",
    badge: "CIN: U74999BR2015PTC025206",
    summary:
      "Statutory terms governing access to Swayambhu's digital portals, ERP/CRM operational panels, and circular infrastructure services.",
    clauses: [
      {
        heading: "1.1 Binding Agreement",
        details:
          "These Terms of Service constitute a legally binding agreement between your organization and Swayambhu Innovative Solutions Private Limited (CIN: U74999BR2015PTC025206). By accessing www.swayambhuinfo.com, submitting inquiries through our Contact Ledger, or logging into operational panels (Panel 1 - CRM / Panel 2 - ERP), you acknowledge and agree to comply with these terms.",
      },
      {
        heading: "1.2 Eligible Entities",
        details:
          "Services, technical scopes, and documentation are intended strictly for legally incorporated business entities, Brand Owners (PIBOs), Municipal Corporations (ULBs), registered scrap suppliers, institutional partners, and accredited CSR foundations.",
      },
      {
        heading: "1.3 Multi-Panel Operational Integration",
        details:
          "Access to internal panels—specifically relationship outreach (Panel 1) and resource planning/weighbridge management (Panel 2)—is governed by strict Role-Based Access Control (RBAC). Unauthorized attempts to bypass token authentication or access cross-plant records are strictly prohibited.",
      },
    ],
  },
  {
    id: "epr-compliance",
    code: "02",
    title: "EPR Certificates & Statutory Verification",
    badge: "CPCB Category-II Rules",
    summary:
      "Protocols governing Category-II credit generation, data veracity, and Central Pollution Control Board audit alignments.",
    clauses: [
      {
        heading: "2.1 CPCB Recycling Credit Authenticity",
        details:
          "All plastic waste processing records, Goods Receipt Notes (GRN), and Category-II Extended Producer Responsibility (EPR) compliance credits are generated in compliance with the Plastic Waste Management (PWM) Rules, 2016 (as amended) and CPCB directives.",
      },
      {
        heading: "2.2 Audit Trail Verification & Non-Duplication",
        details:
          "EPR credits and mass-balance figures provided by Swayambhu represent physically verified processing at our Haridwar recycling facilities or authorized partner MRF networks. Any duplication, fraudulent multi-claiming, or unauthorized transfer of statutory certificates is actionable under Indian environmental statutes.",
      },
      {
        heading: "2.3 Statutory Disclosure Mandate",
        details:
          "Swayambhu reserves the statutory right to share processing logs, weighbridge manifests, and transactional credit ledgers directly with the Central Pollution Control Board, State Pollution Control Boards, and statutory environmental auditors.",
      },
    ],
  },
  {
    id: "portal-security",
    code: "03",
    title: "Digital Security, RBAC & Portal Usage",
    badge: "OAuth2 & Role Isolation",
    summary:
      "Standards of acceptable use, credential preservation, and intellectual integrity across all digital infrastructure.",
    clauses: [
      {
        heading: "3.1 Credential Responsibility",
        details:
          "Users granted credentials for operational dashboards (e.g., Plant Managers, Weighbridge Operators, Corporate Officers) are solely responsible for maintaining the confidentiality of their OAuth2 bearer session tokens and passwords. Any operation executed under an authenticated identity is attributed directly to that user.",
      },
      {
        heading: "3.2 Restrictive Prohibitions",
        details:
          "Users shall not inject malicious code, execute unauthorized penetration testing, reverse-engineer proprietary mass-balance deduction algorithms, or deploy automated scraping bots against our data infrastructure.",
      },
      {
        heading: "3.3 Session Termination",
        details:
          "Swayambhu reserves the right to terminate or suspend access to digital panels immediately upon detecting credential compromises, unauthorized data querying, or breach of confidentiality covenants.",
      },
    ],
  },
  {
    id: "intellectual-property",
    code: "04",
    title: "Intellectual Property & Technical Formats",
    badge: "Protected Assets & Formats",
    summary:
      "Ownership covenants covering engineering blueprints, proprietary MRF designs, circular school assets, and brand marks.",
    clauses: [
      {
        heading: "4.1 Proprietary Assets & Frameworks",
        details:
          "All visual layouts, engineering schematics for decentralized MRFs, technical specifications for upcycled polymer boards, trademarked logos, and custom UI workflows belong exclusively to Swayambhu Innovative Solutions Private Limited.",
      },
      {
        heading: "4.2 Limited License",
        details:
          "Institutional partners and clients are granted a non-exclusive, non-transferable, revocable license to access verification dossiers, compliance certificates, and technical proposals solely for internal compliance verification and contractual deployment.",
      },
    ],
  },
  {
    id: "liability-warranties",
    code: "05",
    title: "Liability Limitations & Force Majeure",
    badge: "Statutory Safe Harbor",
    summary:
      "Disclaimers, indirect damage safe harbors, and operating contingencies during regulatory or environmental disruptions.",
    clauses: [
      {
        heading: "5.1 Service Continuity Disclaimer",
        details:
          "While Swayambhu targets 99.5% uptime during operating hours, digital portals and API endpoints are provided on an 'as-is' and 'as-available' basis without warranties of uninterrupted latency during external upstream outages.",
      },
      {
        heading: "5.2 Indirect Damage Limitation",
        details:
          "To the maximum extent permitted under applicable law, Swayambhu shall not be held liable for indirect, incidental, consequential, or punitive damages arising from temporary portal downtime, transmission latencies, or third-party telecom disruptions.",
      },
      {
        heading: "5.3 Regulatory Force Majeure",
        details:
          "Neither party shall be held in breach for delays or non-performance resulting from statutory lockouts, CPCB national portal server outages, natural disasters, or statutory shifts in regional waste intake regulations.",
      },
    ],
  },
  {
    id: "jurisdiction-arbitration",
    code: "06",
    title: "Governing Law & Dispute Resolution",
    badge: "Arbitration & Jurisdiction",
    summary:
      "Legal dispute mechanisms, arbitration provisions under Indian law, and judicial venue designations.",
    clauses: [
      {
        heading: "6.1 Governing Law",
        details:
          "These Terms of Service are governed by, construed, and interpreted in accordance with the laws of the Republic of India, without regard to conflict of law principles.",
      },
      {
        heading: "6.2 Amicable Settlement & Arbitration",
        details:
          "Any dispute arising out of or related to these terms shall first be subject to 30 days of formal executive mediation. If unresolved, disputes shall be adjudicated by a sole arbitrator under the Arbitration and Conciliation Act, 1996.",
      },
      {
        heading: "6.3 Judicial Jurisdiction",
        details:
          "Subject to arbitration, courts having territorial jurisdiction over Patna, Bihar and Haridwar, Uttarakhand shall retain exclusive jurisdiction over any legal proceedings arising from these terms.",
      },
    ],
  },
];

export default function TermsOfServicePage() {
  const [activeSectionId, setActiveSectionId] = useState<string>(termsSections[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const section of termsSections) {
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
      {/* 1. DARK CHARCOAL AUTHORITY HERO HEADER */}
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
            <Scale className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
            <span className="text-[9px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/90 font-semibold">
              Corporate Legal & Operational Terms
            </span>
          </motion.div>

          {/* Heading with Fluid Clamping */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeCurve }}
            className="font-sans font-black uppercase text-[clamp(1.85rem,6.5vw,4.2rem)] leading-[1.02] tracking-tight text-white mb-4 sm:mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
          >
            Terms of Service & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] via-[#4ADE80] to-[#8FA295]">
              Institutional Standards.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeCurve }}
            className="text-xs sm:text-base text-white/80 font-light leading-relaxed max-w-2xl mx-0 sm:mx-auto mb-6 sm:mb-8"
          >
            Governing engagement criteria, statutory CPCB Category-II verification protocols, digital portal access, and commercial commitments with Swayambhu Innovative Solutions Private Limited.
          </motion.p>

          {/* Responsive Metadata Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: easeCurve }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3.5 w-full max-w-3xl"
          >
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-start sm:items-center">
              <span className="text-[8px] sm:text-[9px] font-mono text-[#22C55E] uppercase tracking-wider font-semibold">Jurisdiction</span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-white mt-0.5">Republic of India</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-start sm:items-center">
              <span className="text-[8px] sm:text-[9px] font-mono text-[#22C55E] uppercase tracking-wider font-semibold">Version</span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-white mt-0.5">2026.1 Formal</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-start sm:items-center">
              <span className="text-[8px] sm:text-[9px] font-mono text-[#22C55E] uppercase tracking-wider font-semibold">Compliance</span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-white mt-0.5">CPCB Aligned</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-start sm:items-center">
              <span className="text-[8px] sm:text-[9px] font-mono text-[#22C55E] uppercase tracking-wider font-semibold">Security</span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-white mt-0.5">RBAC Enforced</span>
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
            <span className="text-[#7B8580] uppercase text-[10px]">Article:</span>
            <span className="truncate text-[#006B3C]">
              {termsSections.find((s) => s.id === activeSectionId)?.title}
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
              {termsSections.map((sec) => (
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
                  <span className="text-[10px] text-[#7B8580] mr-2">ART {sec.code} //</span>
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
                  Document Index
                </span>
                <Gavel className="w-3.5 h-3.5 text-[#7B8580]" />
              </div>

              <nav className="space-y-1.5" aria-label="Terms sections">
                {termsSections.map((sec) => {
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
                  Legal & Statutory Desk:
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
                <ShieldCheck className="w-4 h-4 text-[#006B3C] shrink-0" />
                <span>Auditable Execution</span>
              </div>
              <p className="text-[11px] text-[#52605A] font-light leading-relaxed">
                CPCB Registered Category-II Recycler • ISO 9001:2015 QMS Standard • ZED Silver Certified.
              </p>
            </div>
          </aside>

          {/* MAIN ARTICLES */}
          <div className="w-full lg:col-span-8 space-y-6 sm:space-y-10">
            {termsSections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-28 sm:scroll-mt-32 rounded-2xl sm:rounded-3xl bg-white border border-[#DDE5DC] p-5 sm:p-8 md:p-9 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4 sm:space-y-6"
              >
                {/* Article Header */}
                <div className="flex flex-col gap-2 pb-3.5 sm:pb-4 border-b border-[#DDE5DC]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#006B3C] font-bold">
                      ARTICLE {section.code} // COVENANT
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

            {/* Legal Redressal & Institutional Footprint Card */}
            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#FAF8F5] to-[#EEF5ED] border border-[#DDE5DC] p-5 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-[#006B3C]">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <h3 className="text-sm sm:text-lg font-bold uppercase tracking-tight text-[#171F1B]">
                  Legal Secretariat & Notices
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#52605A] font-light leading-relaxed">
                Formal legal notices, statutory declarations, or contractual escalations must be transmitted in writing to our registered corporate office or verified legal email desk:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1 text-xs font-mono">
                {/* Registered HQ Node */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#DDE5DC]">
                  <span className="text-[8px] sm:text-[9px] text-[#7B8580] uppercase tracking-wider block mb-1">
                    Registered Corporate Entity
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
                    Industrial Facility Node
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
                <span>Document Classification: Public Terms of Service</span>
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