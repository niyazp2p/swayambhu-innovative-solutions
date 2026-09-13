"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Inline brand SVGs
function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function XIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.82 0-1.611.166-1.921.467-.39.378-.517 1.054-.517 2.016v1.497h4.331l-.645 3.667h-3.686v7.98H9.101z" />
    </svg>
  );
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Solutions", href: "/solutions" },
  { name: "Impact", href: "/impact" },
  { name: "Management", href: "/management" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
  { name: "X", href: "https://x.com", icon: XIcon },
  { name: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { name: "YouTube", href: "https://youtube.com", icon: YoutubeIcon },
  { name: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      clipPath: "circle(0% at 92% 5%)",
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
    open: {
      opacity: 1,
      clipPath: "circle(150% at 92% 5%)",
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const navItemVariants: Variants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.035, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#070B09]/80 backdrop-blur-2xl border-b border-white/[0.08] py-3 shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
            : "bg-transparent py-5 sm:py-6"
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between relative">
          
          {/* ========================================================= */}
          {/* 1. LEFT: LOGO & BRAND (Fixed width anchor on desktop)   */}
          {/* ========================================================= */}
          <Link
            href="/"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            onClick={() => setIsLogoHovered(true)}
            className="group flex items-center gap-3 relative z-30 select-none shrink-0"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/transparent.png"
                alt="Swayambhu Logo"
                width={40}
                height={40}
                className={`w-full h-full object-contain transition-all duration-500 ease-out ${
                  isLogoHovered
                    ? "brightness-100 invert-0 filter drop-shadow-[0_0_12px_rgba(34,197,94,0.45)]"
                    : "brightness-0 invert opacity-95 filter drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]"
                }`}
                priority
              />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.24em] text-white leading-tight">
                Swayambhu
              </span>
              <span className="text-[8px] sm:text-[8.5px] font-mono font-medium uppercase tracking-[0.28em] text-white/50 group-hover:text-white/75 transition-colors">
                Innovative Solutions
              </span>
            </div>
          </Link>

          {/* ========================================================= */}
          {/* 2. CENTER: ABSOLUTE CENTERED NAVIGATION PILL              */}
          {/* ========================================================= */}
          <div className="hidden xl:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5 bg-white/[0.04] backdrop-blur-2xl px-2.5 py-1.5 rounded-full border border-white/[0.09] shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                  className="relative px-3 py-1 text-[11px] uppercase tracking-[0.12em] font-medium transition-colors duration-200"
                >
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive ? "text-white font-semibold" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-white/[0.12] border border-white/[0.18] rounded-full shadow-[0_0_12px_rgba(255,255,255,0.08)]"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ========================================================= */}
          {/* 3. RIGHT: DESKTOP SOCIAL SUITE                            */}
          {/* ========================================================= */}
          <div className="hidden xl:flex items-center gap-1.5 shrink-0 relative z-30">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -1.5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white bg-white/[0.03] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.22] transition-all duration-200 backdrop-blur-md"
                  aria-label={item.name}
                >
                  <Icon className="w-3.5 h-3.5" />
                </motion.a>
              );
            })}
          </div>

          {/* ========================================================= */}
          {/* 4. MOBILE / TABLET: ANIMATED TOGGLE BUTTON                */}
          {/* ========================================================= */}
          <div className="flex items-center xl:hidden relative z-50">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full bg-white/[0.05] border border-white/[0.12] text-white backdrop-blur-md focus:outline-none active:scale-95 transition-transform"
              aria-label="Toggle navigation menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="w-4 h-[1.5px] bg-white block origin-center"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.18 }}
                className="w-4 h-[1.5px] bg-white/70 block"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="w-4 h-[1.5px] bg-white block origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ========================================================= */}
      {/* 5. MOBILE CURTAIN MENU (Fully Centered, Frosted Glass)    */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-[#070B09]/95 backdrop-blur-3xl xl:hidden flex flex-col justify-between pt-28 pb-10 px-6 overflow-y-auto"
          >
            {/* Background Ambient Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#22C55E]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Centered Navigation Links */}
            <div className="flex flex-col items-center justify-center gap-4 my-auto py-2">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  custom={idx}
                  variants={navItemVariants}
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    onClick={() => {
                      setActiveLink(link.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className="inline-flex items-center gap-2 group text-xl sm:text-2xl font-medium uppercase tracking-[0.14em] text-white/75 hover:text-white transition-colors py-1"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-[#22C55E] transition-all duration-200" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Section: Centered Status & Socials */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="flex flex-col items-center gap-4 border-t border-white/[0.08] pt-6 shrink-0"
            >
              <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-[0.24em] text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                <span>Circular Material Infrastructure</span>
              </div>

              {/* Social Icons Row */}
              <div className="flex items-center justify-center gap-2.5">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white bg-white/[0.04] border border-white/[0.1] hover:border-white/30 transition-all active:scale-95"
                      aria-label={item.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}