"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageSquare, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";

export default function PartnerCTA() {
  const easeExpo = [0.16, 1, 0.3, 1] as const;

  return (
    <section id= "CTA" className="relative w-full bg-[#ECE8E1] text-[#0E1712] py-20 sm:py-28 md:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden selection:bg-[#063D2A] selection:text-white border-t border-[#063D2A]/15">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="max-w-7xl mx-auto h-full border-x border-[#063D2A]/10 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#063D2A]/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Eyebrow Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#063D2A]/15 mb-10 sm:mb-14">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#063D2A] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#063D2A] font-bold">
              05 // Direct Partnership Desk
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#063D2A]/70 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#063D2A]" />
            <span className="hidden xs:inline">CPCB Category-II Authorized</span>
            <span className="xs:hidden">CPCB Verified</span>
          </div>
        </div>

        {/* Full-Width Canvas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Monumental Headline & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-sans font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#0B1710] leading-[0.92]">
              Partner With <br className="hidden sm:inline" />
              Swayambhu For <br />
              <span className="text-[#063D2A]">
                CSR & ESG Excellence.
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-[#324538] font-light leading-relaxed max-w-2xl">
              Whether you need CPCB-verifiable Category-II EPR credits, co-branded MRF centers, or zero-waste campus implementations, call our technical partnership desk directly.
            </p>

            {/* Micro Tags */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#063D2A] bg-white/60 border border-[#063D2A]/15 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#063D2A]" />
                Haridwar Facility Ready
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#063D2A] bg-white/60 border border-[#063D2A]/15 backdrop-blur-sm">
                Instant WhatsApp Desk
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#063D2A] bg-white/60 border border-[#063D2A]/15 backdrop-blur-sm">
                BRSR & Audit Aligned
              </span>
            </div>
          </div>

          {/* Right Column: Full-Width Contact Channels */}
          <div className="lg:col-span-5 flex flex-col space-y-3.5 lg:pl-4">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#063D2A]/60 block mb-1">
              Direct Contact Channels
            </span>

            {/* Channel 1: Phone Desk */}
            <motion.a
              href="tel:+919205642777"
              whileHover={{ scale: 1.01, x: 2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: easeExpo }}
              className="group w-full p-4 sm:p-5 rounded-xl bg-[#063D2A] hover:bg-[#084A33] text-white flex items-center justify-between transition-all shadow-[0_4px_16px_rgba(6,61,42,0.15)]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                    Direct Phone Line
                  </span>
                  <span className="text-sm sm:text-base font-mono font-bold tracking-tight text-white">
                    +91 92056 42777
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.a>

            {/* Channel 2: WhatsApp Chat */}
            <motion.a
              href="https://wa.me/919205642777?text=Hello%20Swayambhu%20Team%2C%20I%20would%20like%20to%20inquire%20about%20CSR%2C%20EPR%20and%20ESG%20partnerships."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01, x: 2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: easeExpo }}
              className="group w-full p-4 sm:p-5 rounded-xl bg-white/80 hover:bg-white border border-[#063D2A]/15 text-[#063D2A] flex items-center justify-between transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#063D2A]/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-[#063D2A]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#063D2A]/60">
                    Direct Chat
                  </span>
                  <span className="text-sm sm:text-base font-mono font-bold tracking-tight text-[#063D2A]">
                    Connect on WhatsApp
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full border border-[#063D2A]/20 flex items-center justify-center group-hover:border-[#063D2A] transition-colors">
                <ArrowUpRight className="w-4 h-4 text-[#063D2A]/60 group-hover:text-[#063D2A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.a>

            {/* Channel 3: Route Link */}
            <Link href="/contact" className="w-full pt-1">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: easeExpo }}
                className="w-full py-3.5 px-5 rounded-xl border border-[#063D2A]/25 hover:border-[#063D2A] hover:bg-[#063D2A] text-[#063D2A] hover:text-white text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-200"
              >
                <span>Submit Detailed Scope Form</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}