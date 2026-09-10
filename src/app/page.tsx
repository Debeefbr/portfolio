import Hero from "@/components/sections/Hero";
import WorkedWith from "@/components/sections/WorkedWith";
import FeaturedWork from "@/components/sections/FeaturedWork";
import OrbCTA from "@/components/sections/OrbCTA";
import FooterContact from "@/components/layout/FooterContact";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <WorkedWith />
      <FeaturedWork />
      <OrbCTA />
      <FooterContact />
    </main>
  );
}
