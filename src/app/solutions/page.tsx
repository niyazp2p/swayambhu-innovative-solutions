import SolutionsCTA from "@/components/sections/solutions/SolutionsCTA";
import SolutionsGrid from "@/components/sections/solutions/SolutionsGrid";
import SolutionsHero from "@/components/sections/solutions/SolutionsHero";
import HowOurSystemsOperate from "@/components/sections/solutions/System";

export default function SolutionsPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <SolutionsHero/>
      <SolutionsGrid/>
      <HowOurSystemsOperate/>
      <SolutionsCTA/>
    </main>
  );
}