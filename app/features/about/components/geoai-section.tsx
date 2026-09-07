import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";
import { Eyebrow } from "~/components/eyebrow";

const USES = [
  {
    title: "Map with communities",
    desc: "Satellite imagery helps sketch where forests, farmland, and settlements are — then local partners correct and complete the picture. Ground truth stays with the community.",
  },
  {
    title: "Plan pilots openly",
    desc: "Maps and simple analyses are shared back in plain language so everyone can see what an early pilot concept covers — and what it does not claim yet.",
  },
  {
    title: "Support honest monitoring",
    desc: "As pilots take shape, GeoAI can help track change over time alongside community records — a support for future measurement, not a substitute for local verification.",
  },
] as const;

export function GeoaiSection() {
  return (
    <section
      className="bg-pine px-8 py-24 text-cream md:px-12"
      aria-labelledby="about-geoai-heading"
    >
      <div className="mx-auto max-w-5xl">
        <Eyebrow tone="faint-light" withRule className="mb-10">
          GeoAI as a support tool
        </Eyebrow>
        <AnimatedHeading className="max-w-4xl font-medium leading-[1.05]">
          <span
            id="about-geoai-heading"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", display: "block" }}
          >
            GeoAI supports community decisions — it never replaces them.
          </span>
        </AnimatedHeading>
        <AnimatedText
          className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80"
          delay={0.1}
        >
          We use geospatial AI — satellite imagery plus open mapping methods —
          as a practical support tool: to listen better, plan pilots more
          openly, and keep future monitoring honest. Communities lead; GeoAI
          assists.
        </AnimatedText>
        <div className="mt-12 border-t border-white/15">
          {USES.map((item, i) => (
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
                className="mt-0 text-base leading-relaxed text-white/70"
                delay={0.1 + i * 0.08}
              >
                {item.desc}
              </AnimatedText>
            </article>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-white/60">
          Our methods are in development and shared openly as they take shape —
          including limits and uncertainties. Nothing here is presented as
          finished or verified.
        </p>
      </div>
    </section>
  );
}
