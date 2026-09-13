import FieldInAction from "@/components/sections/impact/'FieldInAction";
import CaseStudies from "@/components/sections/impact/CaseStudies";
import ImpactHero from "@/components/sections/impact/ImpactHero";
import SolutionsCTA from "@/components/sections/solutions/SolutionsCTA";

export default function ImapctPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <ImpactHero/>
      <CaseStudies/>
      <FieldInAction/>
      <SolutionsCTA/>
    </main>
  );
}