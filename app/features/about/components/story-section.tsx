import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";
import { Eyebrow } from "~/components/eyebrow";

export function StorySection() {
  return (
    <section
      className="bg-[#F4F1EC] px-8 pt-32 pb-20 text-[#4A362E] md:px-12"
      aria-labelledby="about-story-heading"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
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
          <AnimatedText
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground"
            delay={0.2}
          >
            This is the landscape we work in: roads and rivers crossing forest
            and farmland, villages close to the trees they protect. Our role is
            to make that connection visible — and fundable — on the community&apos;s
            terms.
          </AnimatedText>
        </div>
        <figure className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-none shadow-none">
            <img
              src="/assets/arial-photograph.jpg"
              alt="Aerial photograph of a highway bridge crossing dense green forest, with a river, village homes, and winding local roads"
              className="aspect-[3/4] w-full object-cover"
              loading="eager"
            />
          </div>
          <figcaption className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
            <span
              aria-hidden="true"
              className="inline-block h-px w-10 bg-current opacity-40"
            />
            Where infrastructure meets forest — the lived landscape behind our
            community-first concepts.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
