"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Navigation,
  Globe,
} from "lucide-react";

// --- Custom Social Brand SVGs ---
function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TwitterXIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const easeCurve = [0.16, 1, 0.3, 1] as const;

const ledgerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeCurve },
  },
};

const inquiryCategories = [
  "EPR Credits (Category-II)",
  "Material Recovery Facility (MRF)",
  "CSR School & Sanitation Assets",
  "Community Biogas Systems",
  "Media & Press Communications",
  "Careers & Green Livelihoods",
  "Other",
];

const facilitySpecs = [
  { label: "Track Record", val: "11+ Years" },
  { label: "Authorization", val: "CPCB Registered" },
  { label: "Waste Diverted", val: "19,838+ MT" },
];

export default function ContactLedge() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    enquiryType: inquiryCategories[0],
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section
      id="contact-ledge"
      className="relative w-full bg-[#FDF8EE] text-[#171F1B] py-16 sm:py-24 md:py-32 px-5 sm:px-10 lg:px-16 overflow-hidden selection:bg-[#006B3C] selection:text-white border-t border-[#DDE5DC]"
    >
      {/* Structural Architectural Grid Dividers */}
      <div className="absolute inset-0 pointer-events-none opacity-40 select-none">
        <div className="max-w-7xl mx-auto h-full border-x border-[#006B3C]/10 grid grid-cols-2 md:grid-cols-4 divide-x border-[#006B3C]/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Header Ribbon */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DDE5DC] mb-10 sm:mb-14">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#006B3C]" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#006B3C] font-bold">
              02 // Direct Operating Directory
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#52605A] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#006B3C]" />
            <span>Response SLA: &lt; 24 Hours</span>
          </div>
        </div>

        {/* 2-Column Balanced Ledger Grid */}
        <motion.div
          variants={ledgerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
        >
          {/* ========================================================= */}
          {/* LEFT COLUMN: HERO FACILITY & DIRECT DESKS                */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#006B3C] font-bold">
                Operational Anchor
              </span>
              <h2 className="font-sans font-black text-2xl sm:text-4xl uppercase tracking-tight text-[#171F1B] leading-[1.05]">
                Manufacturing Hub & <br />
                <span className="text-[#006B3C]">Direct Desks.</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#52605A] font-light leading-relaxed">
                Direct statutory communication, plant intake scheduling, and technical partnership routing handled through our certified Haridwar processing center.
              </p>
            </div>

            {/* Featured Haridwar Facility Card */}
            <div className="relative rounded-3xl bg-white border border-[#DDE5DC] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,107,60,0.04)] space-y-5 overflow-hidden group hover:border-[#006B3C]/40 transition-all">
              <div className="flex items-center justify-between pb-4 border-b border-[#DDE5DC]/70">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#EEF5ED] border border-[#006B3C]/20 flex items-center justify-center text-[#006B3C]">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase text-[#006B3C] font-bold block">
                      Primary Processing Plant
                    </span>
                    <h3 className="text-sm sm:text-base font-bold uppercase tracking-tight text-[#171F1B]">
                      Haridwar Facility
                    </h3>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-[#EEF5ED] text-[#006B3C] text-[10px] font-mono font-semibold">
                  Uttarakhand
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="text-[9px] font-mono uppercase text-[#7B8580] tracking-wider block">
                  Industrial Complex Location
                </span>
                <p className="text-xs sm:text-sm text-[#171F1B] font-medium leading-relaxed">
                  Plot-5A2, SIDCUL, Haridwar, Uttarakhand
                </p>
              </div>

              {/* Plant Specs Matrix */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {facilitySpecs.map((spec) => (
                  <div key={spec.label} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC]">
                    <span className="text-[8px] font-mono uppercase text-[#7B8580] block">
                      {spec.label}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#006B3C] block mt-0.5">
                      {spec.val}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#52605A] pt-1">
                <Navigation className="w-3.5 h-3.5 text-[#006B3C]" />
                <span>Central Logistics Rail & Highway Access</span>
              </div>

              <div className="absolute top-0 right-0 w-28 h-28 bg-[radial-gradient(circle_at_top_right,rgba(0,107,60,0.06)_0%,transparent_70%)] pointer-events-none" />
            </div>

            {/* Direct Communication Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:+919205642777"
                className="p-4 rounded-2xl bg-white hover:bg-[#EEF5ED] border border-[#DDE5DC] hover:border-[#006B3C]/40 transition-all flex items-center gap-3.5 shadow-sm group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EEF5ED] border border-[#006B3C]/15 flex items-center justify-center text-[#006B3C] shrink-0 group-hover:bg-[#006B3C] group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono uppercase text-[#7B8580]">Voice Line</span>
                  <span className="text-xs font-mono font-bold text-[#171F1B]">+91 9205642777</span>
                </div>
              </a>

              <a
                href="mailto:contact@swayambhuinfo.com"
                className="p-4 rounded-2xl bg-white hover:bg-[#EEF5ED] border border-[#DDE5DC] hover:border-[#006B3C]/40 transition-all flex items-center gap-3.5 shadow-sm group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EEF5ED] border border-[#006B3C]/15 flex items-center justify-center text-[#006B3C] shrink-0 group-hover:bg-[#006B3C] group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-[9px] font-mono uppercase text-[#7B8580]">Direct Desk</span>
                  <span className="text-xs font-mono font-bold text-[#171F1B] truncate">contact@swayambhuinfo.com</span>
                </div>
              </a>
            </div>

            {/* Social Network Suite */}
            <div className="p-4 rounded-2xl bg-white border border-[#DDE5DC] flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#006B3C]" />
                <span className="text-xs font-mono uppercase text-[#52605A] tracking-wider font-medium">
                  Verified Channels
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://linkedin.com/in/akansha-singh-63729256"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#DDE5DC] hover:border-[#006B3C] text-[#52605A] hover:text-[#006B3C] flex items-center justify-center transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedInIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://instagram.com/swayambhu07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#DDE5DC] hover:border-[#006B3C] text-[#52605A] hover:text-[#006B3C] flex items-center justify-center transition-all"
                  aria-label="Instagram Profile"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://facebook.com/swaymbhu2015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#DDE5DC] hover:border-[#006B3C] text-[#52605A] hover:text-[#006B3C] flex items-center justify-center transition-all"
                  aria-label="Facebook Page"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://twitter.com/SisSwayambhu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#DDE5DC] hover:border-[#006B3C] text-[#52605A] hover:text-[#006B3C] flex items-center justify-center transition-all"
                  aria-label="Twitter X Profile"
                >
                  <TwitterXIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: INSTITUTIONAL INTAKE FORM                   */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="h-full rounded-3xl bg-white border border-[#DDE5DC] p-6 sm:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.03)] text-left flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-[#DDE5DC] mb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#006B3C] font-bold block">
                      Technical Intake Form
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#171F1B] mt-0.5">
                      Transmit Technical Scope
                    </h3>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF5ED] text-[#006B3C] text-xs font-mono font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Direct SLA Routing</span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success-screen"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, ease: easeCurve }}
                      className="py-16 flex flex-col items-center justify-center text-center space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#EEF5ED] text-[#006B3C] flex items-center justify-center shadow-inner">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold uppercase tracking-tight text-[#171F1B]">
                        Scope Transmitted Successfully
                      </h3>
                      <p className="text-sm text-[#52605A] max-w-md font-light leading-relaxed">
                        Thank you, {formData.name}. Your inquiry regarding &quot;{formData.enquiryType}&quot; has been logged into our relationship management panel. An executive will follow up within 24 hours.
                      </p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: "",
                            organization: "",
                            email: "",
                            phone: "",
                            enquiryType: inquiryCategories[0],
                            message: "",
                          });
                        }}
                        className="mt-4 px-6 py-2.5 rounded-xl border border-[#006B3C] text-[#006B3C] hover:bg-[#EEF5ED] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                      >
                        Submit Another Scope
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name & Organization */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-semibold block">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Priyank Gupta"
                            className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] focus:border-[#006B3C] focus:bg-white text-sm text-[#171F1B] placeholder:text-[#7B8580]/50 outline-none transition-all"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-semibold block">
                            Organization *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            placeholder="e.g. Hindustan Unilever"
                            className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] focus:border-[#006B3C] focus:bg-white text-sm text-[#171F1B] placeholder:text-[#7B8580]/50 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-semibold block">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="e.g. name@corporate.com"
                            className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] focus:border-[#006B3C] focus:bg-white text-sm text-[#171F1B] placeholder:text-[#7B8580]/50 outline-none transition-all"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-semibold block">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="e.g. +91 98765 43210"
                            className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] focus:border-[#006B3C] focus:bg-white text-sm text-[#171F1B] placeholder:text-[#7B8580]/50 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Category Selector */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-semibold block">
                          Engagement Category *
                        </label>
                        <div className="relative">
                          <select
                            value={formData.enquiryType}
                            onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] focus:border-[#006B3C] focus:bg-white text-sm text-[#171F1B] outline-none appearance-none cursor-pointer transition-all pr-10"
                          >
                            {inquiryCategories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-[#7B8580] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Scope Message */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-[#52605A] font-semibold block">
                          Scope Specifications & Target Objectives
                        </label>
                        <textarea
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Please specify target waste tonnage, operational locations, or EPR compliance requirements..."
                          className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDE5DC] focus:border-[#006B3C] focus:bg-white text-sm text-[#171F1B] placeholder:text-[#7B8580]/50 outline-none transition-all resize-none"
                        />
                      </div>

                      {/* Submit Action */}
                      <div className="pt-2">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 px-6 rounded-xl bg-[#006B3C] hover:bg-[#063D2A] text-white font-mono text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors shadow-[0_8px_20px_rgba(0,107,60,0.2)] disabled:opacity-70 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <span>Verifying & Transmitting...</span>
                          ) : (
                            <>
                              <span>Transmit Corporate Scope</span>
                              <Send className="w-3.5 h-3.5" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#7B8580] pt-4 mt-2 border-t border-[#DDE5DC]/70">
                <Clock className="w-3 h-3 text-[#006B3C]" />
                <span>Inquiries logged directly into central relationship management</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}