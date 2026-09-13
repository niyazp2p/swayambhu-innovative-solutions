import AboutDescription from "@/components/sections/about/AboutDescription";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutManagement from "@/components/sections/about/AboutManagement";
import AboutTimeline from "@/components/sections/about/AboutTimeline";

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <AboutHero/>
      <AboutDescription/>
      <AboutTimeline/>
      <AboutManagement/>
    </main>
  );
}