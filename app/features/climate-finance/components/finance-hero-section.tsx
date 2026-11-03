/**
 * The terms are kept, not dismissed: funders rely on them and communities
 * deserve to know them. Each is paired with the question it actually asks.
 * Consent and benefit-sharing lead because they come first for communities;
 * the rest are standard carbon-credit integrity criteria.
 */
const TERMS = [
  {
    term: "Free, prior and informed consent",
    question: "Did the community agree, knowing everything, before anything started?",
  },
  {
    term: "Benefit sharing",
    question: "Who gets paid, how much, and who decided?",
  },
  {
    term: "Additionality",
    question: "Would this have happened anyway, without the money?",
  },
  {
    term: "Permanence",
    question: "Will the change last for decades, not just a few seasons?",
  },
  {
    term: "Leakage",
    question: "Did the damage simply move somewhere else?",
  },
  {
    term: "Independent verification",
    question: "Who checks the results, and do they answer to anyone involved?",
  },
] as const;

export function FinanceHeroSection() {
  return (
    <section
      className="bg-cream px-4 pt-28 pb-20 text-bark sm:px-8 sm:pt-36 sm:pb-28 md:px-12"
      aria-labelledby="finance-hero-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h1
          id="finance-hero-heading"
          className="max-w-4xl font-medium tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)", lineHeight: 1.04 }}
        >
          Nobody can agree to what they don&apos;t understand.
        </h1>

        <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="max-w-md text-lg leading-relaxed text-bark/80">
              Climate finance runs on technical words. Each one stands for a
              question that communities, partners, and funders all have a right
              to ask — and to have answered before anything is signed.
            </p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-bark/80">
              We keep the terms, because you will meet them in every agreement.
              Beside each one is the question it really asks.
            </p>
            <p className="mt-10 max-w-md border-l-2 border-ember pl-5 text-base leading-relaxed text-bark/70">
              Carbon8 is at concept stage. Nothing on this page describes a live
              project, a credit for sale, or a guaranteed payment.
            </p>
          </div>

          <div>
            <div
              aria-hidden="true"
              className="hidden grid-cols-[minmax(0,13rem)_1fr] gap-8 pb-3 text-sm text-bark/60 sm:grid"
            >
              <span>The term</span>
              <span>The question it asks</span>
            </div>
            <dl className="border-t border-bark/20">
              {TERMS.map((row) => (
                <div
                  key={row.term}
                  className="grid gap-2 border-b border-bark/20 py-6 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-8 sm:py-7"
                >
                  <dt className="text-base leading-snug font-medium text-ember-deep sm:pt-1">
                    {row.term}
                  </dt>
                  <dd className="text-xl leading-snug font-semibold text-bark sm:text-2xl">
                    {row.question}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
