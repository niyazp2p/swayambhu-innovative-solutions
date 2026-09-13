"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useScroll } from "@/providers/ScrollProvider";

export default function Footer() {
  const { scrollTo } = useScroll();

  const menuLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Material Streams", href: "/solutions" },
    { label: "Corporate ESG", href: "/solutions" },
    { label: "Sector Scope", href: "/solutions" },
    { label: "Direct Contact", href: "/contact" },
  ];

  const importantLinks = [
    { label: "Haridwar MRF Hub", href: "/solutions" },
    { label: "CPCB Category-II EPR", href: "/epr-compliance" },
    { label: "Community Biogas Plants", href: "/solutions" },
    { label: "30+ Yr Upcycled Assets", href: "/solutions" },
    { label: "Northern Railway Case Study", href: "/impact" },
    { label: "Partner With Us", href: "/contact" },
  ];

  const credentials = [
    {
      badge: "/certs/cpcb-badge.jpg",
      title: "CPCB Category-II",
      meta: "Authorized Recycler",
    },
    {
      badge: "/certs/iso-9001.webp",
      title: "ISO 9001:2015",
      meta: "Standardized Operations",
    },
    {
      badge: "/certs/zed-silver.webp",
      title: "MSME ZED Silver",
      meta: "Zero Defect Zero Effect",
    },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollTo(href, { offset: -40 });
    }
  };

  return (
    <footer className="relative w-full bg-[#0D120F] text-[#F3F4F1] border-t border-white/[0.08] overflow-hidden selection:bg-[#22C55E] selection:text-black">
      {/* Background Architectural Glow Accent */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pt-16 sm:pt-20 pb-12 px-6 sm:px-10 lg:px-16">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/[0.08]">
          
          {/* Col 1: Brand Identity with Direct Logo */}
          <div className="lg:col-span-4 space-y-5 text-left">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-full p-1 bg-white/[0.06] border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  src="/logo-trademarked.png"
                  alt="Swayambhu Registered Trademark Emblem"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold uppercase tracking-wider text-white leading-tight">
                  Swayambhu Innovative Solutions
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#22C55E] mt-0.5">
                  Private Limited • Est. 2015
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-white/65 font-light leading-relaxed max-w-sm">
              CPCB-authorized circular infrastructure firm pioneering high-purity
              polymer recycling, verifiable EPR credit ledgers, and turnkey CSR
              material transformation.
            </p>

            {/* Pure SVG Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Swayambhu on LinkedIn"
                className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:text-[#22C55E] hover:border-[#22C55E]/40 transition-all duration-200"
              >
                <svg
                  className="w-3.5 h-3.5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.55a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Swayambhu on X"
                className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:text-[#22C55E] hover:border-[#22C55E]/40 transition-all duration-200"
              >
                <svg
                  className="w-3.5 h-3.5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Swayambhu on YouTube"
                className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:text-[#22C55E] hover:border-[#22C55E]/40 transition-all duration-200"
              >
                <svg
                  className="w-3.5 h-3.5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Swayambhu on Instagram"
                className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:text-[#22C55E] hover:border-[#22C55E]/40 transition-all duration-200"
              >
                <svg
                  className="w-3.5 h-3.5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#8EA394] font-semibold block">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs sm:text-[13px]">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/70 hover:text-[#22C55E] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Initiatives & Facilities */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#8EA394] font-semibold block">
              Core Verticals
            </span>
            <ul className="space-y-2.5 text-xs sm:text-[13px]">
              {importantLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#22C55E]/60" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Details */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#8EA394] font-semibold block">
              Facility & Desk
            </span>

            <div className="space-y-3 text-xs sm:text-[13px] font-light text-white/75">
              <div>
                <span className="text-[10px] font-mono uppercase text-white/40 block">
                  Processing Hub
                </span>
                <span className="text-white/90">
                  Plot-5A2, SIDCUL, Haridwar, Uttarakhand
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-white/40 block">
                  Email Desk
                </span>
                <a
                  href="mailto:contact@swayambhuinfo.com"
                  className="text-[#22C55E] hover:underline"
                >
                  contact@swayambhuinfo.com
                </a>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-white/40 block">
                  Direct Line
                </span>
                <a
                  href="tel:+919205642777"
                  className="font-mono text-white/90 hover:text-[#22C55E]"
                >
                  +91 9205642777
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials Dock (Centered on Mobile & Desktop) */}
        <div className="py-8 border-b border-white/[0.08]">
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8EA394] block text-center mb-6">
            Official Accreditations & Registry
          </span>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-14">
            {credentials.map((cert) => (
              <div
                key={cert.title}
                className="flex items-center gap-3 group text-center sm:text-left"
              >
                <div className="relative w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 p-1 flex items-center justify-center shrink-0 group-hover:border-[#22C55E]/50 transition-colors">
                  <Image
                    src={cert.badge}
                    alt={cert.title}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase tracking-tight">
                    {cert.title}
                  </span>
                  <span className="text-[10px] font-mono text-white/50">
                    {cert.meta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] font-mono text-white/50">
          <div>
            © {new Date().getFullYear()} Swayambhu Innovative Solutions Pvt. Ltd. All Rights Reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/disclaimer"
              className="hover:text-white transition-colors"
            >
              Disclaimer
            </Link>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors"
            >
              Cookies Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}