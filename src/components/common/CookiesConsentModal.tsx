"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cookie, X } from "lucide-react";

export default function CookiesConsentModal() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Immediately suppress on all admin routes
  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [isAdminRoute]);

  if (isAdminRoute) {
    return null;
  }

  const handleAction = () => {
    setIsVisible(false);
  };

  const easeCurve = [0.16, 1, 0.3, 1] as const;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center sm:items-end sm:justify-start p-4 sm:p-6 md:p-8">
          {/* Mobile Background Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0A0F0D]/40 backdrop-blur-sm pointer-events-auto sm:hidden"
            onClick={handleAction}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.45, ease: easeCurve }}
            className="pointer-events-auto relative w-full max-w-[370px] sm:max-w-[420px] rounded-3xl bg-[#FDF8EE] border border-[#DDE5DC] p-6 sm:p-7 shadow-[0_20px_50px_rgba(6,61,42,0.18)] text-left select-none"
          >
            {/* Top Eyebrow Bar */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#DDE5DC] mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#EEF5ED] border border-[#006B3C]/15 flex items-center justify-center text-[#006B3C]">
                  <Cookie className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#006B3C] font-bold block">
                    Privacy Governance
                  </span>
                  <span className="text-xs font-bold uppercase tracking-tight text-[#171F1B] block">
                    Cookies Consent
                  </span>
                </div>
              </div>

              <button
                onClick={handleAction}
                className="w-7 h-7 rounded-full bg-white border border-[#DDE5DC] hover:border-[#006B3C] text-[#7B8580] hover:text-[#171F1B] flex items-center justify-center transition-colors"
                aria-label="Dismiss Cookie Banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Narrative Content */}
            <div className="space-y-2 mb-5">
              <p className="text-xs text-[#52605A] font-light leading-relaxed">
                We utilize telemetry and essential functional cookies to optimize operational portals, maintain statutory session security, and analyze digital resource flows[cite: 3].
              </p>
              <div className="flex items-center gap-1.5 pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#006B3C]" />
                <span className="text-[10px] font-mono text-[#7B8580] uppercase tracking-wider">
                  Audit-Safe Data Processing
                </span>
              </div>
            </div>

            {/* Action Buttons: Accept & Reject */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAction}
                className="w-full py-3 px-4 rounded-xl bg-[#006B3C] hover:bg-[#063D2A] text-white font-mono text-xs font-bold uppercase tracking-[0.14em] text-center transition-colors shadow-sm cursor-pointer"
              >
                Accept All
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAction}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#EEF5ED] border border-[#DDE5DC] hover:border-[#006B3C]/40 text-[#171F1B] font-mono text-xs font-bold uppercase tracking-[0.14em] text-center transition-colors shadow-sm cursor-pointer"
              >
                Reject All
              </motion.button>
            </div>

            {/* Subtle Legal Notice Footnote */}
            <div className="mt-4 pt-3 border-t border-[#DDE5DC]/70 flex items-center justify-between text-[10px] font-mono text-[#7B8580]">
              <span>Read Compliance Standard</span>
              <Link
                href="/privacy"
                onClick={handleAction}
                className="text-[#006B3C] hover:underline font-semibold"
              >
                Privacy Policy &rarr;
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}