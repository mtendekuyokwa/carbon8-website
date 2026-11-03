import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";
import { Eyebrow } from "~/components/eyebrow";

const POINTS = [
  {
    title: "What climate finance is",
    desc: "Money that pays for work which cuts emissions or helps people adapt to a changing climate — from public funds and grants to private investment. It can help pay for things like cleaner cookstoves, restored forests, or new livelihoods.",
  },
  {
    title: "How carbon markets fit in",
    desc: "One route is a carbon credit: a verified record that a project avoided or removed a quantity of greenhouse gas. Credits are only credible when independent checks confirm the change actually happened — and kept happening.",
  },
  {
    title: "Why communities come first",
    desc: "The people doing the work on the ground should understand the deal, help shape it, and share fairly in the benefits. We start with local consultation, and nothing moves forward without local ownership.",
  },
  {
    title: "Where Carbon8 is today",
    desc: "Our concepts are early and in development. We are documenting our approach in the open and designing toward verifiable standards from the outset, rather than retrofitting credibility later.",
  },
] as const;

export function ExplainerSection() {
  return (
    <section
      className="bg-pine px-4 py-16 text-cream sm:px-8 sm:py-24 md:px-12"
      aria-labelledby="finance-explainer-heading"
    >
      <div className="mx-auto max-w-5xl">
        <Eyebrow tone="faint-light" withRule className="mb-10">
          The basics
        </Eyebrow>
        {/* eslint-disable-next-line tailwindcss/no-unnecessary-arbitrary-value -- fractional bare value emits no CSS in Tailwind v4 */}
        <AnimatedHeading className="max-w-4xl leading-[1.05] font-medium">
          <span
            id="finance-explainer-heading"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", display: "block" }}
          >
            Four ideas that make the rest make sense.
          </span>
        </AnimatedHeading>
        <div className="mt-12 border-t border-white/15">
          {POINTS.map((item, i) => (
            <article
              key={item.title}
              className="grid gap-2 border-b border-white/15 py-8 md:grid-cols-[0.9fr_1.1fr] md:gap-8"
            >
              <AnimatedHeading
                as="h3"
                className="text-xl font-medium"
                delay={i * 0.08}
              >
                {item.title}
              </AnimatedHeading>
              <AnimatedText
                className="text-base leading-relaxed text-white/75"
                delay={i * 0.08 + 0.05}
              >
                {item.desc}
              </AnimatedText>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
