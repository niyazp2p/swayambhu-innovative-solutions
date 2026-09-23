"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/lib/api-client";

const easeCurve = [0.16, 1, 0.3, 1] as const;

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter both operator identifier and passkey.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      // Form-URL-Encoded payload required by FastAPI OAuth2PasswordRequestForm
      const params = new URLSearchParams();
      params.append("username", email.trim());
      params.append("password", password);

      const response = await apiClient.post("/auth/login", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const { access_token } = response.data;
      if (!access_token) {
        throw new Error("Missing authentication token from server.");
      }

      // Sync user session & retrieve /auth/me profile
      await login(access_token);
      router.push("/admin/dashboard");
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      if (typeof detail === "string") {
        setErrorMessage(detail);
      } else if (Array.isArray(detail)) {
        setErrorMessage(detail[0]?.msg || "Invalid credentials format.");
      } else {
        setErrorMessage("Invalid credentials or server unavailable.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[100svh] w-full bg-[#070B09] text-[#F3F4F1] flex items-center justify-center p-4 sm:p-6 lg:p-10 select-none overflow-x-hidden font-sans selection:bg-[#22C55E] selection:text-black">
      
      {/* 1. FAST BACKGROUND ENGINE WITH OPTIMIZED CONTRAST */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/banner2.jpeg"
          alt="Swayambhu Processing Facility"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover object-center grayscale-[0.25] contrast-[1.08] brightness-[0.42]"
        />
        {/* Soft Vignettes & Atmospheric Lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B09] via-[#070B09]/80 to-[#070B09]/90 sm:via-[#070B09]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(34,197,94,0.18)_0%,transparent_70%)]" />
      </div>

      {/* 2. SPLIT VIEWPORT CARD CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: easeCurve }}
        className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0A0F0D]/85 backdrop-blur-2xl shadow-[0_24px_60px_rgba(0,0,0,0.85)] overflow-hidden"
      >
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: MINIMAL BRAND TELEMETRY & STATUTORY AUTHORITY                */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
          
          {/* Top Brand Eyebrow */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#121A15] p-1.5 border border-[#22C55E]/30 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.18)]">
                  <Image
                    src="/main logo.png"
                    alt="Swayambhu Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-[0.22em] text-white">
                    Swayambhu
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#22C55E]">
                    Terminal v1
                  </span>
                </div>
              </div>

              {/* Live Signal Pulse */}
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
                </span>
                <span className="text-[9px] font-mono tracking-wider text-[#A7BAAC] uppercase font-semibold">
                  Online
                </span>
              </div>
            </div>

            {/* Minimal Monumental Typography */}
            <div className="space-y-2 pt-2 sm:pt-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#22C55E] font-semibold block">
                Resource Ledger
              </span>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                Operations <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] via-[#4ADE80] to-[#ECE8E1]">
                  Console.
                </span>
              </h1>
              <p className="text-xs text-[#9BB1A3] font-light leading-relaxed max-w-sm pt-1">
                Centralized weighbridge capture, daily DPR reconciliation, and statutory CPCB Cat-II audit verification.
              </p>
            </div>
          </div>

          {/* Minimal Bottom Pill */}
          <div className="hidden sm:flex items-center gap-2 pt-6 lg:pt-8 text-[11px] font-mono text-[#7A9182]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
            <span>Encrypted Session Protocol (OAuth2)</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: LIGHT & DARK HYBRID LOGIN FORM                              */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-[#FDF8EE] text-[#171F1B] relative">
          
          <div className="w-full max-w-sm mx-auto space-y-5 sm:space-y-6">
            
            {/* Header Lockup */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#006B3C] font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>Station Authentication</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#171F1B]">
                Operator Sign In
              </h2>
              <p className="text-xs text-[#52605A] font-light">
                Enter your authorized credentials to access facility controls.
              </p>
            </div>

            {/* Error Message Toast */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-2.5 text-xs">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span className="leading-tight">{errorMessage}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interactive Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Operator Identifier Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-[11px] font-mono uppercase tracking-wider text-[#3D4741] font-bold flex justify-between"
                >
                  <span>Operator Identity / Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7B8580]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@swayambhuinfo.com"
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-white border border-[#DDE5DC] text-[#171F1B] text-xs sm:text-sm placeholder:text-[#9EA8A2] focus:outline-none focus:border-[#006B3C] focus:ring-1 focus:ring-[#006B3C] transition-all font-mono shadow-sm"
                  />
                </div>
              </div>

              {/* Passkey Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="text-[11px] font-mono uppercase tracking-wider text-[#3D4741] font-bold flex justify-between"
                >
                  <span>Authorization Passkey</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7B8580]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-11 py-3 rounded-xl bg-white border border-[#DDE5DC] text-[#171F1B] text-xs sm:text-sm placeholder:text-[#9EA8A2] focus:outline-none focus:border-[#006B3C] focus:ring-1 focus:ring-[#006B3C] transition-all font-mono shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#7B8580] hover:text-[#171F1B] transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full mt-2 py-3.5 px-5 rounded-xl bg-[#006B3C] hover:bg-[#063D2A] text-white font-bold text-xs sm:text-sm uppercase tracking-[0.14em] font-mono transition-colors shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authorizing...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Micro Footnote */}
            <div className="pt-2 border-t border-[#DDE5DC] flex items-center justify-between text-[10px] font-mono text-[#7B8580]">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#006B3C]" />
                <span>Zero-trust isolated</span>
              </div>
              <span>v1.4.2</span>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}