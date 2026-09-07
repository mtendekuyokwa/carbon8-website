import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";
import { Eyebrow } from "~/components/eyebrow";

export function ManifestoSection() {
  return (
    <section
      className="relative overflow-hidden bg-deep px-8 py-28 text-white md:px-12"
      aria-labelledby="home-manifesto-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/assets/planting-trees-960.jpg')] bg-cover bg-center opacity-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-deep/70 via-deep/85 to-deep/95"
      />
      <div className="relative mx-auto max-w-4xl">
        <Eyebrow tone="faint-light" className="mb-8">
          Manifesto
        </Eyebrow>
        <AnimatedHeading
          as="h2"
          className="text-4xl font-medium leading-[1.1] md:text-5xl"
        >
          <span id="home-manifesto-heading">
            What if the people restoring the land also held the value it creates?
          </span>
        </AnimatedHeading>
        <AnimatedText
          className="mt-8 max-w-3xl text-lg leading-relaxed text-white/80"
          delay={0.15}
        >
          Carbon finance was supposed to reward the communities doing the work.
          Too often, they&apos;re the last ones to see it. We&apos;re building
          Carbon8 so Malawian farmers, cooperatives, and local stewards
          aren&apos;t just the labor behind a project — they&apos;re partners in
          it, with a real stake in its outcome from the start.
        </AnimatedText>
        <AnimatedText
          className="mt-8 max-w-3xl text-xl font-medium leading-relaxed text-white"
          delay={0.25}
        >
          Carbon8 is what community-led restoration looks like when it&apos;s
          built with the people who live on the land, not around them.
        </AnimatedText>
      </div>
    </section>
  );
}
