import ComplexWasteStreams from "@/components/sections/home/ComplexWasteStreams";
import HeroSection from "@/components/sections/home/HeroSection";
import Overview from "@/components/sections/home/Overview";
import PartnerCTA from "@/components/sections/home/PartnerCTA";
import PartnerStrip from "@/components/sections/home/PartnerStrip";
import Solutions from "@/components/sections/home/Solutions";
import WhatWeCollect from "@/components/sections/home/WhatWeCollect";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <HeroSection />
      <Overview/>
      <PartnerStrip/>
      <WhatWeCollect/>
      <Solutions/>
      <ComplexWasteStreams/>
      <PartnerCTA/>
    </main>
  );
}