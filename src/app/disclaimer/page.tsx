"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertOctagon,
  ShieldAlert,
  FileSpreadsheet,
  Building2,
  Mail,
  ArrowUpRight,
  ChevronDown,
  Scale,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
} from "lucide-react";

const easeCurve = [0.16, 1, 0.3, 1] as const;

interface DisclaimerSection {
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

const disclaimerSections: DisclaimerSection[] = [
  {
    id: "general-information",
    code: "01",
    title: "General Corporate Disclaimer",
    badge: "CIN: U74999BR2015PTC025206",
    summary:
      "Informational boundaries and statutory legal notices applicable to Swayambhu Innovative Solutions Private Limited's public digital platform and materials.",
    clauses: [
      {
        heading: "1.1 Informational Purpose Only",
        details:
          "The information provided on www.swayambhuinfo.com and associated digital interfaces is published strictly for corporate transparency, institutional orientation, and general informational purposes. It does not constitute binding legal, financial, statutory tax, or environmental engineering consultancy advice.",
      },
      {
        heading: "1.2 Absence of Professional Solicitations",
        details:
          "Browsing this portal or transmitting a technical scope via contact forms does not in itself establish a formal vendor, fiduciary, or client relationship. Legally enforceable commitments arise solely through executed bi-lateral agreements, non-disclosure covenants, or verified Purchase Orders.",
      },
      {
        heading: "1.3 Scope and Accuracy Verification",
        details:
          "While Swayambhu makes every reasonable effort to maintain accurate and up-to-date data points across facility capacities and corporate disclosures, all published content is provided on an 'as-is' and 'as-available' basis without express warranties of completeness or merchantability.",
      },
    ],
  },
  {
    id: "epr-cpcb-data",
    code: "02",
    title: "EPR Compliance & Portal Verifications",
    badge: "CPCB Category-II Verification",
    summary:
      "Statutory provisions regarding Central Pollution Control Board portal reconciliations, plastic recycling credits, and third-party audits.",
    clauses: [
      {
        heading: "2.1 Third-Party Statutory Portals",
        details:
          "Official Category-II Extended Producer Responsibility (EPR) credit issuances, transfers, and retirements are executed under the statutory mandate of the Central Pollution Control Board (CPCB) national portal. Swayambhu assumes no liability for national portal outages, third-party server downtimes, or delayed regulatory reconciliation beyond its physical plant boundary.",
      },
      {
        heading: "2.2 Audit Trail Veracity",
        details:
          "Tonnage metrics—such as the 1,634+ MT Category-II EPR fulfillment and 19,838+ MT landfill diversion—represent historical, physically audited operational data logged through certified weighbridge software and GRN systems. Future diversion forecasts or planned quotas are estimates subject to raw feedstock variation.",
      },
      {
        heading: "2.3 Buyer Due Diligence",
        details:
          "Brand Owners (PIBOs) and aggregators are required to independently review their specific state pollution board (SPCB) filings and annual targets prior to entering into statutory credit purchase allocations.",
      },
    ],
  },
  {
    id: "operational-metrics",
    code: "03",
    title: "Metrics, Forward-Looking & ESG Statements",
    badge: "BRSR / ISO Disclosures",
    summary:
      "Clarification regarding environmental projections, clean energy volume metrics, and CSR lifecycle claims.",
    clauses: [
      {
        heading: "3.1 Material Lifecycle Expectations",
        details:
          "Descriptions of structural products (e.g., 30+ year lifespan recycled eco-boards, desks, and sanitation blocks) are based on standard laboratory stress-testing and accelerated weathering models. Actual lifespan may vary based on environmental exposure, municipal maintenance protocols, and operational load.",
      },
      {
        heading: "3.2 Forward-Looking Projections",
        details:
          "Statements containing words such as 'target', 'project', 'expand', or 'forecast' regarding MRF capacity expansions or bio-methane yields constitute forward-looking assessments subject to logistics variables, seasonal agricultural waste yields, and civic policy shifts.",
      },
      {
        heading: "3.3 ESG & Carbon Abatement Disclosures",
        details:
          "Calculations regarding avoided emissions (CO2e) and organic landfill diversion are generated using recognized conversion standards (such as ISO 14064 principles). Clients remain responsible for validating these calculations within their custom SEBI BRSR or corporate carbon registries.",
      },
    ],
  },
  {
    id: "third-party-links",
    code: "04",
    title: "External Links & Institutional Partners",
    badge: "Independent Corporate Entities",
    summary:
      "Limitations regarding partner trademarks, third-party URLs, and external institutional affiliations.",
    clauses: [
      {
        heading: "4.1 Non-Endorsement of External Links",
        details:
          "Our platform may reference external institutional links or partner websites for context (e.g., CPCB portals, academic repositories, or corporate case references). Swayambhu does not control, endorse, or assume responsibility for content hosted on third-party domains.",
      },
      {
        heading: "4.2 Trademark Attribution",
        details:
          "All corporate names, brand marks, and partner references (e.g., references to Hindustan Unilever, ITC Limited, Northern Railway, or Tata Power) remain the intellectual property of their respective holders. Their display signifies historical or ongoing project collaboration and does not imply total operational endorsement of Swayambhu by said entities.",
      },
    ],
  },
  {
    id: "limitation-liability",
    code: "05",
    title: "Limitation of Damages & Remedies",
    badge: "Statutory Liability Cap",
    summary:
      "Exclusion of indirect, punitive, or consequential commercial damages arising from digital platform utilization.",
    clauses: [
      {
        heading: "5.1 Exclusion of Indirect Losses",
        details:
          "To the maximum extent permitted by applicable Indian law, Swayambhu, its directors, officers, and technical operators shall not be liable for any direct, indirect, incidental, punitive, or consequential losses resulting from website unavailability, data inaccuracies, or reliance on digital dashboards.",
      },
      {
        heading: "5.2 System Disruptions & Cyber Security",
        details:
          "While the company maintains industry-standard encryption and access tokens (OAuth2 Bearer controls), Swayambhu does not warrant that the website or its servers are completely immune to unauthorized cyber interceptions, malware, or telecommunication transmission failures.",
      },
    ],
  },
  {
    id: "jurisdiction-clarification",
    code: "06",
    title: "Jurisdiction & Statutory Inquiries",
    badge: "Arbitration & Legal Venue",
    summary:
      "Applicable legal jurisdiction, corporate registrations, and designated points of contact for legal notices.",
    clauses: [
      {
        heading: "6.1 Governing Law",
        details:
          "This Disclaimer and all matters arising out of web interaction are governed by the laws of the Republic of India. Courts having territorial jurisdiction over Patna, Bihar and Haridwar, Uttarakhand retain exclusive jurisdiction.",
      },
      {
        heading: "6.2 Clarifications & Formal Notice",
        details:
          "For formal inquiries regarding statutory verification, audit certificates, or legal notices, parties must address written communications to the legal secretariat at contact@swayambhuinfo.com or directly to our registered Patna / Haridwar offices.",
      },
    ],
  },
];

export default function DisclaimerPage() {
  const [activeSectionId, setActiveSectionId] = useState<string>(
    disclaimerSections[0].id
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const section of disclaimerSections) {
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
            <AlertOctagon className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
            <span className="text-[9px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/90 font-semibold">
              Statutory Disclosure & Notice
            </span>
          </motion.div>

          {/* Heading with Fluid Clamping */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeCurve }}
            className="font-sans font-black uppercase text-[clamp(1.85rem,6.5vw,4.2rem)] leading-[1.02] tracking-tight text-white mb-4 sm:mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
          >
            Disclaimer & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] via-[#4ADE80] to-[#8FA295]">
              Regulatory Statements.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeCurve }}
            className="text-xs sm:text-base text-white/80 font-light leading-relaxed max-w-2xl mx-0 sm:mx-auto mb-6 sm:mb-8"
          >
            Important legal notices, liability boundaries, and verification standards governing the use of Swayambhu Innovative Solutions Private Limited&apos;s digital domains and reporting datasets.
          </motion.p>

          {/* Responsive Metadata Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: easeCurve }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3.5 w-full max-w-3xl"
          >
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-start sm:items-center">
              <span className="text-[8px] sm:text-[9px] font-mono text-[#22C55E] uppercase tracking-wider font-semibold">Classification</span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-white mt-0.5">Public Notice</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-start sm:items-center">
              <span className="text-[8px] sm:text-[9px] font-mono text-[#22C55E] uppercase tracking-wider font-semibold">Scope</span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-white mt-0.5">All Digital Domains</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-start sm:items-center">
              <span className="text-[8px] sm:text-[9px] font-mono text-[#22C55E] uppercase tracking-wider font-semibold">Audited Status</span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-white mt-0.5">CPCB Category-II</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col items-start sm:items-center">
              <span className="text-[8px] sm:text-[9px] font-mono text-[#22C55E] uppercase tracking-wider font-semibold">Jurisdiction</span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-white mt-0.5">Republic of India</span>
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
            <span className="text-[#7B8580] uppercase text-[10px]">Clause:</span>
            <span className="truncate text-[#006B3C]">
              {disclaimerSections.find((s) => s.id === activeSectionId)?.title}
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
              {disclaimerSections.map((sec) => (
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
                  Notice Sections
                </span>
                <Scale className="w-3.5 h-3.5 text-[#7B8580]" />
              </div>

              <nav className="space-y-1.5" aria-label="Disclaimer sections">
                {disclaimerSections.map((sec) => {
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
                          isActive
                            ? "opacity-100 translate-x-0.5 -translate-y-0.5"
                            : "opacity-30 group-hover:opacity-100"
                        }`}
                      />
                    </a>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-[#DDE5DC] space-y-2">
                <span className="text-[9px] font-mono uppercase text-[#7B8580] tracking-wider block font-medium">
                  Legal Compliance Desk:
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
                <FileCheck2 className="w-4 h-4 text-[#006B3C] shrink-0" />
                <span>Statutory Verification</span>
              </div>
              <p className="text-[11px] text-[#52605A] font-light leading-relaxed">
                Central Pollution Control Board Category-II Registered Recycler • ISO 9001:2015 QMS Certified • Ministry of MSME ZED Silver Accredited.
              </p>
            </div>
          </aside>

          {/* MAIN ARTICLES */}
          <div className="w-full lg:col-span-8 space-y-6 sm:space-y-10">
            {disclaimerSections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-28 sm:scroll-mt-32 rounded-2xl sm:rounded-3xl bg-white border border-[#DDE5DC] p-5 sm:p-8 md:p-9 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4 sm:space-y-6"
              >
                {/* Article Header */}
                <div className="flex flex-col gap-2 pb-3.5 sm:pb-4 border-b border-[#DDE5DC]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#006B3C] font-bold">
                      SECTION {section.code} // NOTICE
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

            {/* Statutory Corporate Inquiries Block */}
            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#FAF8F5] to-[#EEF5ED] border border-[#DDE5DC] p-5 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-[#006B3C]">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <h3 className="text-sm sm:text-lg font-bold uppercase tracking-tight text-[#171F1B]">
                  Statutory Inquiries & Corporate Legal Registry
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#52605A] font-light leading-relaxed">
                For clarification regarding statutory metrics, audit dossiers, or official regulatory reporting, contact our institutional secretariat:
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
                  <span className="text-[10px] text-[#52605A] block mt-0.5">
                    CIN: U74999BR2015PTC025206
                  </span>
                  <span className="text-[11px] text-[#52605A] block mt-2 leading-relaxed">
                    Plot-5A2, SIDCUL, Haridwar, Uttarakhand
                  </span>
                </div>

                {/* Processing Plant Hub */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-[#DDE5DC]">
                  <span className="text-[8px] sm:text-[9px] text-[#7B8580] uppercase tracking-wider block mb-1">
                    Primary Recycling Plant
                  </span>
                  <span className="font-bold text-[#171F1B] block leading-snug">
                    Haridwar
                  </span>
                  <span className="text-[10px] text-[#52605A] block mt-0.5">
                    Plot-5A2, Sector 3, IIE BHEL, Haridwar
                  </span>
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
                <span>Document Classification: Public Statutory Notice</span>
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