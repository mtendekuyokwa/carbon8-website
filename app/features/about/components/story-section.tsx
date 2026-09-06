import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";
import { Eyebrow } from "~/components/eyebrow";

export function StorySection() {
  return (
    <section
      className="bg-[#F4F1EC] px-8 pt-32 pb-20 text-[#4A362E] md:px-12"
      aria-labelledby="about-story-heading"
    >
      <div className="mx-auto max-w-5xl">
        <Eyebrow withRule className="mb-10">
          About Carbon8
        </Eyebrow>
        <AnimatedHeading className="max-w-4xl font-medium leading-[1.05]">
          <span
            id="about-story-heading"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.65rem)", display: "block" }}
          >
            Climate action led by communities, explained in plain language.
          </span>
        </AnimatedHeading>
        <AnimatedText
          className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80"
          delay={0.1}
        >
          Carbon8 Malawi is developing early community-first climate concepts —
          cookstove, forest, and livelihood ideas shaped alongside local partners
          from the start.
        </AnimatedText>
        <AnimatedText
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground"
          delay={0.15}
        >
          We are in the early stages: listening first, co-designing small
          pilots, and documenting everything in the open so communities, civic
          partners, and funders can shape what comes next together. Every
          project is a concept or in development — shared openly while it takes
          shape.
        </AnimatedText>
      </div>
    </section>
  );
}
