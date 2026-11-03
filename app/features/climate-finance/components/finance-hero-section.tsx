import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Real climate-finance terms, each rewritten as the question it actually asks. */
const TRANSLATIONS = [
  { term: "Additionality", plain: "Would this have happened anyway, without the money?" },
  { term: "Baseline", plain: "What was happening before anything changed?" },
  { term: "MRV", plain: "Who checks the results, and how?" },
  { term: "Leakage", plain: "Did the damage just move somewhere else?" },
  { term: "Permanence", plain: "Will the trees still be standing a generation from now?" },
  { term: "Benefit sharing", plain: "Who gets paid, and who gets a say?" },
] as const;

export function FinanceHeroSection() {
  const reduce = useReducedMotion() ?? false;
  const step = 0.35;
  const start = 0.4;

  return (
    <section
      className="bg-cream px-4 pt-28 pb-16 text-bark sm:px-8 sm:pt-36 sm:pb-24 md:px-12"
      aria-labelledby="finance-hero-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h1
            id="finance-hero-heading"
            className="font-medium tracking-tight"
            style={{ fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)", lineHeight: 1.02 }}
          >
            Climate finance, minus the jargon.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-bark/75">
            Every term in this field hides a plain question. Communities,
            partners, and funders should all be able to ask it. Here are the
            ones we hear most.
          </p>
          <p className="mt-10 max-w-md border-l-2 border-ember pl-5 text-base leading-relaxed text-bark/75">
            Carbon8 is at concept stage. Nothing on this page describes a live
            project, a credit for sale, or a guaranteed payment.
          </p>
        </div>

        <dl className="grid gap-12 sm:gap-14">
          {TRANSLATIONS.map((row, i) => {
            const strikeDelay = start + i * step;
            return (
              <div key={row.term}>
                <dt
                  className="relative w-fit font-semibold tracking-tight text-bark/30"
                  style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)", lineHeight: 1 }}
                >
                  {row.term}
                  <motion.span
                    aria-hidden="true"
                    className="absolute -inset-x-2 top-[55%] h-1 origin-left -rotate-2 rounded-full bg-ember"
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.45, delay: strikeDelay, ease: [...EASE] }}
                  />
                </dt>
                <motion.dd
                  className="mt-3 max-w-lg text-2xl leading-snug font-semibold text-bark sm:text-3xl"
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: strikeDelay + 0.25, ease: [...EASE] }}
                >
                  {row.plain}
                </motion.dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
