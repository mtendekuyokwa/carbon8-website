import { DualCTA } from "~/components/dual-cta";
import { FAQAccordion, type FAQItem } from "~/components/faq-accordion";

const GROUPS: readonly { id: string; heading: string; items: readonly FAQItem[] }[] = [
  {
    id: "finance-faq-land",
    heading: "If you live and work on the land",
    items: [
      {
        question: "Who decides what happens on our land?",
        answer:
          "You do. Our work starts with listening to local chiefs, cooperatives, and farmer groups. Nothing moves forward without local ownership.",
      },
      {
        question: "Will our community actually see the money?",
        answer:
          "That is the question we want settled first, not last. How benefits are shared is agreed openly with local partners before a project moves forward — and written down in plain language.",
      },
      {
        question: "Does taking part cost anything?",
        answer:
          "Our early work is conversation: listening, mapping, and co-designing small pilot concepts. Any future commitment would be discussed openly before anything is agreed.",
      },
    ],
  },
  {
    id: "finance-faq-funders",
    heading: "If you fund or partner with us",
    items: [
      {
        question: "Is Carbon8 selling carbon credits today?",
        answer:
          "No. Carbon8 is at concept stage. We have no live projects, no credits issued, and nothing for sale. When that changes, we will say so clearly and show the evidence behind it.",
      },
      {
        question: "What standards will your projects follow?",
        answer:
          "We are designing our concepts toward recognised, verifiable standards so credibility is built in from the outset. We will name specific standards once a concept is far enough along to commit to them.",
      },
      {
        question: "How would anyone know a project really worked?",
        answer:
          "Through independent verification. Satellite imagery and GeoAI can support monitoring over time, alongside community records — they support local verification, they never replace it.",
      },
    ],
  },
];

export function FinanceFaqSection() {
  return (
    <>
      <section
        className="bg-cream px-4 py-20 text-bark sm:px-8 sm:py-28 md:px-12"
        aria-labelledby="finance-faq-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="finance-faq-heading"
            className="max-w-2xl font-medium tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.08 }}
          >
            The questions people ask us, sorted by who is asking.
          </h2>
          <div className="mt-14 grid gap-16 lg:grid-cols-2 lg:gap-14">
            {GROUPS.map((group) => (
              <div key={group.id} aria-labelledby={group.id} role="group">
                <h3 id={group.id} className="mb-4 text-lg font-medium text-ember-deep">
                  {group.heading}
                </h3>
                <FAQAccordion items={group.items} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="bg-deep px-4 py-16 text-white sm:px-8 sm:py-20 md:px-12"
        aria-labelledby="finance-ask-heading"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 id="finance-ask-heading" className="text-3xl font-medium tracking-tight sm:text-4xl">
              Found a word we haven&apos;t explained?
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-white/75">
              Send it to us. We&apos;ll answer you directly and add a plain
              version to this page.
            </p>
          </div>
          <DualCTA
            primaryLabel="Send us a question"
            primaryHref="/contact"
            secondaryLabel="Read our field notes"
            secondaryHref="/blog"
          />
        </div>
      </section>
    </>
  );
}
