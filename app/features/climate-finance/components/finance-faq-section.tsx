import { AnimatedHeading } from "~/components/animated-heading";
import { Eyebrow } from "~/components/eyebrow";
import { FAQAccordion, type FAQItem } from "~/components/faq-accordion";
import { CTASection } from "~/components/layout/cta-section";

const FAQS: readonly FAQItem[] = [
  {
    question: "Is Carbon8 selling carbon credits today?",
    answer:
      "No. Carbon8 is at concept stage. We have no live projects, no credits issued, and nothing for sale. When that changes, we will say so clearly and show the evidence behind it.",
  },
  {
    question: "Who is climate finance meant to benefit?",
    answer:
      "The communities doing the work on the ground, first. Our approach is to agree how benefits are shared with local partners before a project moves forward — not after money starts to flow.",
  },
  {
    question: "What standards will Carbon8 projects follow?",
    answer:
      "We are designing our concepts toward recognised, verifiable standards used in climate finance and carbon markets, so credibility is built in from the outset. We will name specific standards once a concept is far enough along to commit to them.",
  },
  {
    question: "How would anyone know a project really worked?",
    answer:
      "Through independent verification. Tools like satellite imagery and GeoAI can support monitoring over time, alongside community records — but they support local verification, they never replace it.",
  },
  {
    question: "Does taking part cost a community anything?",
    answer:
      "Our early work is conversation: listening, mapping, and co-designing small pilot concepts with local partners. Any future commitment would be discussed openly, in plain language, before anything is agreed.",
  },
  {
    question: "I'm a funder or partner — how can I get involved?",
    answer:
      "Get in touch. We are looking for partners who want to shape early concepts with us and who value doing it openly. Our contact page has a route for partners and funders.",
  },
];

export function FinanceFaqSection() {
  return (
    <section
      className="bg-cream px-4 py-16 text-bark sm:px-8 sm:py-24 md:px-12"
      aria-labelledby="finance-faq-heading"
    >
      <div className="mx-auto max-w-5xl">
        <Eyebrow withRule className="mb-10">
          Questions we hear
        </Eyebrow>
        {/* eslint-disable-next-line tailwindcss/no-unnecessary-arbitrary-value -- fractional bare value emits no CSS in Tailwind v4 */}
        <AnimatedHeading className="max-w-4xl leading-[1.05] font-medium">
          <span
            id="finance-faq-heading"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", display: "block" }}
          >
            Frequently asked questions
          </span>
        </AnimatedHeading>
        <FAQAccordion items={FAQS} className="mt-12" />
        <CTASection
          className="mt-16"
          heading="Still have a question?"
          body="If something here is unclear, that is on us. Send us your question and we will answer it in plain language."
          primaryLabel="Ask us"
          primaryHref="/contact"
          secondaryLabel="Read our field notes"
          secondaryHref="/blog"
        />
      </div>
    </section>
  );
}
