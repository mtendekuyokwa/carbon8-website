import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";
import { Eyebrow } from "~/components/eyebrow";

const TT_HOVES =
  '"TT Hoves", "Helvetica Neue", Helvetica, Arial, sans-serif';

const PILLARS = [
  {
    index: "01",
    title: "Community-led",
    desc: "Early cookstove, forest, and livelihood concepts shaped alongside Malawian partners — led by the communities they serve. Nothing moves forward without local ownership.",
  },
  {
    index: "02",
    title: "Plain-language finance",
    desc: "Climate finance explainers in clear terms so communities, partners, and funders can shape early concepts together — no jargon standing in the way of participation.",
  },
  {
    index: "03",
    title: "Early and open",
    desc: "In-development pilots shared openly while they take shape — not finished work presented as done. We publish what we are learning, including what is not working yet.",
  },
] as const;

export function MissionSection() {
  return (
    <section
      className="bg-[#F4F1EC] px-8 py-32 text-[#4A362E] md:px-12"
      style={{ fontFamily: TT_HOVES }}
      aria-labelledby="home-mission-heading"
    >
      <div className="mx-auto max-w-5xl">
        <Eyebrow
          withRule
          className="mb-10"
        >
          <span style={{ fontSize: "11.26px", fontFamily: TT_HOVES }}>
            Carbon8 — Our Mission
          </span>
        </Eyebrow>
        <AnimatedHeading className="max-w-4xl font-medium leading-[1.05]">
          <span
            id="home-mission-heading"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.65rem)",
              lineHeight: 1.05,
              display: "block",
              fontFamily: TT_HOVES,
            }}
          >
            Our mission in Malawi: rooted locally, growing together.
          </span>
        </AnimatedHeading>
        <AnimatedText
          className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80 md:text-xl"
          delay={0.1}
        >
          Carbon8 Malawi is developing early community-first climate concepts
          — shaped with local partners from the start, and explained in plain
          language along the way.
        </AnimatedText>
        <AnimatedText
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground"
          delay={0.15}
        >
          We are in the early stages: listening first, co-designing small
          pilots, and documenting everything in the open so communities, civic
          partners, and funders can shape what comes next together.
        </AnimatedText>
        <ol className="mt-16 border-t border-foreground/15">
          {PILLARS.map((item, i) => (
            <li
              key={item.title}
              className="grid grid-cols-12 gap-4 border-b border-foreground/15 py-10 md:gap-8"
            >
              <span className="col-span-2 text-sm text-muted-foreground md:col-span-1">
                ({item.index})
              </span>
              <AnimatedHeading
                as="h3"
                className="col-span-10 text-2xl font-medium md:col-span-4 md:text-3xl"
                delay={i * 0.08}
              >
                {item.title}
              </AnimatedHeading>
              <AnimatedText
                className="col-span-10 col-start-3 max-w-xl text-base leading-relaxed text-muted-foreground md:col-span-7 md:col-start-6"
                delay={0.15 + i * 0.08}
              >
                {item.desc}
              </AnimatedText>
            </li>
          ))}
        </ol>
        <div
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 tracking-[0.2em] text-muted-foreground uppercase"
          style={{ fontSize: "12px" }}
        >
          <span>Malawi — Community-first</span>
          <span>In development</span>
        </div>
      </div>
    </section>
  );
}
