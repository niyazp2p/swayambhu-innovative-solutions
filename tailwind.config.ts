import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        swayam: {
          forest: "#006B3C",    // Primary brand / Primary CTA
          deep: "#063D2A",      // Hero & high-authority dark sections
          emerald: "#28A745",   // Secondary actions & active highlights
          leaf: "#88C34A",      // Natural sustainability accents
          gold: "#B69A5B",      // Champagne gold compliance & credential accent
          ivory: "#FDF8EE",     // Main background & warm surfaces
          sage: "#EEF5ED",      // Secondary background & soft pills
          surface: "#FFFFFF",   // Cards & clean surface containers
          dark: "#171F1B",      // Primary typography
          secondary: "#52605A", // Supporting body copy
          muted: "#7B8580",     // Metadata & captions
          border: "#DDE5DC",    // Clean UI dividing lines
        },
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "var(--font-poppins)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #063D2A 0%, #006B3C 55%, #28A745 100%)",
        "hero-subtle": "radial-gradient(circle at 85% 15%, rgba(40, 167, 69, 0.18) 0%, rgba(6, 61, 42, 0.98) 70%)",
        "emerald-glow": "radial-gradient(circle at 50% 50%, rgba(40, 167, 69, 0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(6, 61, 42, 0.06)",
        "glass-elevated": "0 12px 40px -4px rgba(6, 61, 42, 0.12)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.35)",
        "cta-hover": "0 10px 25px -3px rgba(0, 107, 60, 0.35)",
        "gold-glow": "0 0 20px -3px rgba(182, 154, 91, 0.3)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
      animation: {
        ticker: "ticker 35s linear infinite",
        "pulse-slow": "pulseGlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;