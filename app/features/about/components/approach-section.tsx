import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";

const STEPS = [
  {
    index: "01",
    title: "Listen first",
    desc: "We start with chiefs, cooperatives, and farmer groups — understanding priorities before proposing any project concept.",
  },
  {
    index: "02",
    title: "Co-design small pilots",
    desc: "Early cookstove, forest, and livelihood concepts are shaped together, kept small enough to learn from and adjust.",
  },
  {
    index: "03",
    title: "Explain finance plainly",
    desc: "Climate finance explainers in clear terms, so communities, partners, and funders can shape early concepts together.",
  },
] as const;

export function ApproachSection() {
  return (
    <section
      className="bg-[#F4F1EC] px-8 py-20 text-[#4A362E] md:px-12"
      aria-labelledby="about-approach-heading"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedHeading className="max-w-4xl font-medium leading-[1.05]">
          <span
            id="about-approach-heading"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", display: "block" }}
          >
            Our approach: community-first, early and open.
          </span>
        </AnimatedHeading>
        <ol className="mt-12 border-t border-foreground/15">
          {STEPS.map((item, i) => (
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
      </div>
    </section>
  );
}
