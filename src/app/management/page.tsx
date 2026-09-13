import ManagementHero from "@/components/sections/management/ManagementHero";
import ManagementProfiles from "@/components/sections/management/ManagementProfiles";

export default function ManagementPage() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <ManagementHero/>
      <ManagementProfiles/>
    </main>
  );
}