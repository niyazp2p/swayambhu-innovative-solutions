"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";

export default function SolutionsCTA() {
  const easeExpo = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative w-full bg-[#FDF8EE] text-[#171F1B] py-20 sm:py-28 md:py-36 px-5 sm:px-10 lg:px-16 overflow-hidden selection:bg-[#006B3C] selection:text-white border-t border-[#DDE5DC]">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40 select-none">
        <div className="max-w-7xl mx-auto h-full border-x border-[#006B3C]/10 grid grid-cols-2 md:grid-cols-4 divide-x border-[#006B3C]/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Eyebrow Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DDE5DC] mb-10 sm:mb-14">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#006B3C] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#006B3C] font-bold">
              03 // Partnership Action Desk
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#52605A] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#006B3C]" />
            <span className="hidden sm:inline">CPCB Category-II Compliant Framework</span>
            <span className="sm:hidden">CPCB Verified</span>
          </div>
        </div>

        {/* Full-Canvas Content Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading, Narrative & Brand Trademark */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-2xl bg-white border border-[#DDE5DC] p-2 flex items-center justify-center shadow-sm">
                <Image
                  src="/logo-trademarked.png"
                  alt="Swayambhu Registered Emblem"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#006B3C] font-bold">
                  Swayambhu Infrastructure
                </span>
                <span className="text-xs font-mono text-[#7B8580]">
                  Turnkey Circular Implementations
                </span>
              </div>
            </div>

            <h2 className="font-sans font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#171F1B] leading-[0.94]">
              Initiate Your <br />
              Circular <br />
              <span className="text-[#006B3C]">Transition.</span>
            </h2>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#006B3C] bg-[#EEF5ED] border border-[#006B3C]/15">
                <Sparkles className="w-3.5 h-3.5 text-[#006B3C]" />
                Haridwar Facility Processing
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#006B3C] bg-[#EEF5ED] border border-[#006B3C]/15">
                BRSR Core Ready
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#006B3C] bg-[#EEF5ED] border border-[#006B3C]/15">
                Multi-State Deployment
              </span>
            </div>
          </div>

          {/* Right Column: Contact Channels & Form Trigger */}
          <div className="lg:col-span-5 flex flex-col space-y-3.5 text-left lg:pl-4">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#7B8580] block mb-1">
              Direct Corporate Engagement
            </span>

            {/* Direct Contact Page Link */}
            <Link href="/contact" className="w-full">
              <motion.div
                whileHover={{ scale: 1.01, x: 2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: easeExpo }}
                className="group w-full p-5 rounded-2xl bg-[#006B3C] hover:bg-[#063D2A] text-white flex items-center justify-between transition-all shadow-[0_8px_24px_rgba(0,107,60,0.18)] cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#EEF5ED]/80">
                    Structured Scope Request
                  </span>
                  <span className="text-base sm:text-lg font-bold uppercase tracking-tight text-white mt-0.5">
                    Open Corporate Inquiry Form
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#063D2A] text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.div>
            </Link>

            {/* Direct Phone Desk */}
            <motion.a
              href="tel:+919205642777"
              whileHover={{ scale: 1.01, x: 2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: easeExpo }}
              className="group w-full p-4 sm:p-5 rounded-2xl bg-white hover:bg-[#EEF5ED] border border-[#DDE5DC] text-[#171F1B] flex items-center justify-between transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#EEF5ED] border border-[#006B3C]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#006B3C]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580]">
                    Direct Telephone Line
                  </span>
                  <span className="text-sm sm:text-base font-mono font-bold tracking-tight text-[#171F1B]">
                    +91 92056 42777
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full border border-[#DDE5DC] flex items-center justify-center group-hover:border-[#006B3C] transition-colors">
                <ArrowUpRight className="w-4 h-4 text-[#7B8580] group-hover:text-[#006B3C] transition-colors" />
              </div>
            </motion.a>

            {/* WhatsApp Enterprise Desk */}
            <motion.a
              href="https://wa.me/919205642777?text=Hello%20Swayambhu%20Team%2C%20I%20would%20like%20to%20inquire%20about%20CSR%2C%20EPR%20and%20ESG%20partnerships."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01, x: 2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: easeExpo }}
              className="group w-full p-4 sm:p-5 rounded-2xl bg-white hover:bg-[#EEF5ED] border border-[#DDE5DC] text-[#171F1B] flex items-center justify-between transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#EEF5ED] border border-[#006B3C]/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-[#006B3C]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B8580]">
                    Technical Consultation
                  </span>
                  <span className="text-sm sm:text-base font-mono font-bold tracking-tight text-[#171F1B]">
                    WhatsApp Enterprise Desk
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full border border-[#DDE5DC] flex items-center justify-center group-hover:border-[#006B3C] transition-colors">
                <ArrowUpRight className="w-4 h-4 text-[#7B8580] group-hover:text-[#006B3C] transition-colors" />
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}