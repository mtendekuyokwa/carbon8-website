import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";

const VALUES = [
  {
    title: "Community-led",
    desc: "Nothing moves forward without local ownership.",
  },
  {
    title: "Plain-language finance",
    desc: "No jargon standing in the way of participation.",
  },
  {
    title: "Early and open",
    desc: "We publish what we are learning, including what is not working yet.",
  },
] as const;

export function ValuesSection() {
  return (
    <section
      className="bg-[#F4F1EC] px-8 py-20 text-[#4A362E] md:px-12"
      aria-labelledby="about-values-heading"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedHeading className="max-w-4xl font-medium leading-[1.05]">
          <span
            id="about-values-heading"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", display: "block" }}
          >
            What guides us.
          </span>
        </AnimatedHeading>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {VALUES.map((item, i) => (
            <li
              key={item.title}
              className="rounded-2xl border border-foreground/15 bg-white/40 p-8"
            >
              <AnimatedHeading
                as="h3"
                className="text-xl font-medium"
                delay={i * 0.08}
              >
                {item.title}
              </AnimatedHeading>
              <AnimatedText
                className="mt-3 text-base leading-relaxed text-muted-foreground"
                delay={0.1 + i * 0.08}
              >
                {item.desc}
              </AnimatedText>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
