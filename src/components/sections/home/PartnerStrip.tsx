"use client";

import React from "react";
import Image from "next/image";

interface Partner {
  name: string;
  logo: string;
}

const partners: Partner[] = [
  { name: "Hindustan Unilever Limited", logo: "/partners/hul-logo.png" },
  { name: "ITC Limited", logo: "/partners/itc-logo.webp" },
  { name: "Tata Power", logo: "/partners/tata-power-logo.png" },
  { name: "Tetra Pak", logo: "/partners/tetrapark.png" },
  { name: "Northern Railway", logo: "/partners/northern-railway.png" },
  { name: "Banasthali Vidyapith", logo: "/partners/banasthali.png" },
];

export default function PartnerStrip() {
  // Triple clone for uninterrupted, smooth infinite translation
  const partnerRail = [...partners, ...partners, ...partners];

  return (
    <div className="relative w-full overflow-hidden border-y border-[#063D2A]/10 bg-[#ECE8E1] py-6 sm:py-8 select-none">
      {/* Soft Edge Fade Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-[#ECE8E1] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-[#ECE8E1] to-transparent" />

      {/* Infinite Translate Track */}
      <div className="flex w-max animate-partner-marquee items-center gap-12 sm:gap-20 hover:[animation-play-state:paused]">
        {partnerRail.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="group relative flex items-center justify-center h-12 sm:h-14 w-28 sm:w-36 shrink-0 transition-transform duration-300"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={140}
              height={56}
              className="h-full w-full object-contain filter grayscale opacity-40 contrast-125 transition-all duration-400 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}