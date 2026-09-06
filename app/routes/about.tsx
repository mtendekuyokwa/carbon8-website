import { ApproachSection } from "~/features/about/components/approach-section";
import { GeoaiSection } from "~/features/about/components/geoai-section";
import { StorySection } from "~/features/about/components/story-section";
import { ValuesSection } from "~/features/about/components/values-section";

export function meta() {
  return [
    { title: "About — Carbon8" },
    {
      name: "description",
      content:
        "About Carbon8 Malawi: community-first climate concepts, plain-language finance, and GeoAI as a support tool.",
    },
  ];
}

export default function About() {
  return (
    <main>
      <StorySection />
      <ApproachSection />
      <GeoaiSection />
      <ValuesSection />
    </main>
  );
}
