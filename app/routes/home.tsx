import { BenefitsSection } from "~/features/home/components/benefits-section";
import { HeroSection } from "~/features/home/components/hero-section";
import { TeamSection } from "~/features/home/components/team-section";

export function meta() {
  return [
    { title: "Carbon8 — Climate action led by communities" },
    {
      name: "description",
      content:
        "Carbon8 is developing community-first climate projects and plain-language climate finance explainers.",
    },
  ];
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TeamSection />
      <BenefitsSection />
    </main>
  );
}
