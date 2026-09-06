import { GeoaiSection } from "~/features/about/components/geoai-section";
import { StorySection } from "~/features/about/components/story-section";

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
      <GeoaiSection />
    </main>
  );
}
