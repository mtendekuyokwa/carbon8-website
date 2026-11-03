import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";
import { Eyebrow } from "~/components/eyebrow";

export function FinanceHeroSection() {
  return (
    <section
      className="bg-cream px-4 pt-28 pb-12 text-bark sm:px-8 sm:pt-32 sm:pb-20 md:px-12"
      aria-labelledby="finance-hero-heading"
    >
      <div className="mx-auto max-w-5xl">
        <Eyebrow withRule className="mb-10">
          Climate finance, explained
        </Eyebrow>
        {/* eslint-disable-next-line tailwindcss/no-unnecessary-arbitrary-value -- fractional bare value emits no CSS in Tailwind v4 */}
        <AnimatedHeading as="h1" className="max-w-4xl leading-[1.05] font-medium">
          <span
            id="finance-hero-heading"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.65rem)", display: "block" }}
          >
            Climate finance in plain language — so everyone knows what to expect.
          </span>
        </AnimatedHeading>
        <AnimatedText
          className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80"
          delay={0.1}
        >
          Climate finance can sound like a closed room of jargon. We want
          communities, partners, and funders to understand it well enough to
          shape early concepts together — and to ask hard questions.
        </AnimatedText>
        <AnimatedText
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground"
          delay={0.15}
        >
          This page is a starting point, not a promise. Carbon8 is at concept
          stage: nothing here describes a live project, a credit for sale, or a
          guaranteed payment.
        </AnimatedText>
      </div>
    </section>
  );
}
