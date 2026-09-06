import { BenefitsSection } from "~/features/home/components/benefits-section";
import { HeroSection } from "~/features/home/components/hero-section";
import { ManifestoSection } from "~/features/home/components/manifesto-section";
import { MissionSection } from "~/features/home/components/mission-section";
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

export function links() {
  return [
    {
      rel: "preload",
      as: "image",
      href: "/assets/smoke-coming-up-1920.jpg",
      imageSrcSet:
        "/assets/smoke-coming-up-960.jpg 960w, /assets/smoke-coming-up-1920.jpg 1920w",
      imageSizes: "100vw",
    },
  ];
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <MissionSection />
      <ManifestoSection />
      <BenefitsSection />
      <TeamSection />
    </main>
  );
}
