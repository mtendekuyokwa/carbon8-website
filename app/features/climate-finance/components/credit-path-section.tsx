const STEPS = [
  {
    title: "Listen",
    desc: "Communities decide whether a project fits their land and lives — and how any benefits will be shared.",
  },
  {
    title: "Design",
    desc: "The idea becomes a written plan, built to a recognised standard so it can be checked later.",
  },
  {
    title: "Measure",
    desc: "Record the starting point: the land, the forest, the cooking fires, before anything changes.",
  },
  {
    title: "Verify",
    desc: "An independent auditor checks the change really happened. Nobody marks their own homework.",
  },
  {
    title: "Sell",
    desc: "Only verified results become credits. Buyers pay for them.",
  },
  {
    title: "Share",
    desc: "Money flows back to the people doing the work, on the terms agreed in step one.",
  },
] as const;

export function CreditPathSection() {
  return (
    <section
      className="bg-pine px-4 py-20 text-cream sm:px-8 sm:py-28 md:px-12"
      aria-labelledby="finance-path-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <h2
            id="finance-path-heading"
            className="max-w-2xl font-medium tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.08 }}
          >
            How a carbon credit is made, and where we are on the path.
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-cream/70">
            Most projects settle who gets paid at the very end. We think that
            belongs at the very start.
          </p>
        </div>

        <div className="relative mt-16 lg:mt-24">
          {/* Track: vertical on small screens, horizontal from lg. */}
          <span
            aria-hidden="true"
            className="absolute inset-y-2 left-2.75 w-px bg-cream/20 lg:inset-x-[8.333%] lg:top-2.75 lg:bottom-auto lg:h-px lg:w-auto"
          />
          <ol className="relative grid gap-10 lg:grid-cols-6 lg:gap-6">
            {STEPS.map((step, i) => {
              const here = i === 0;
              return (
                <li
                  key={step.title}
                  className="relative grid grid-cols-[1.5rem_1fr] content-start gap-x-5 lg:grid-cols-1 lg:justify-items-center lg:text-center"
                  aria-current={here ? "step" : undefined}
                >
                  <span
                    aria-hidden="true"
                    className={
                      here
                        ? "relative z-10 mt-0.5 size-6 rounded-full bg-ember ring-6 ring-ember/25"
                        : "relative z-10 mt-0.5 size-6 rounded-full border-2 border-cream/40 bg-pine"
                    }
                  />
                  <div className="lg:mt-6">
                    <p className="text-sm text-cream/50">Step {i + 1}</p>
                    <h3 className="mt-1 text-2xl font-semibold">{step.title}</h3>
                    {here ? (
                      <p className="mt-3 inline-block rounded-full bg-ember px-3 py-1 text-sm font-semibold text-white">
                        We are here
                      </p>
                    ) : null}
                    <p className="mt-3 max-w-sm text-base leading-relaxed text-cream/75 lg:max-w-none lg:text-lg">
                      {step.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Return arc from Share back to Listen (lg only). */}
          <div aria-hidden="true" className="relative mt-10 hidden h-24 lg:block">
            <svg
              className="absolute inset-0 size-full overflow-visible"
              viewBox="0 0 1200 96"
              preserveAspectRatio="none"
            >
              <path
                d="M1100 0 C 1100 90, 100 90, 100 6"
                fill="none"
                stroke="var(--color-ember)"
                strokeWidth="2"
                strokeDasharray="6 8"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span className="absolute top-0 left-[8.333%] -translate-x-1/2 border-x-[7px] border-b-10 border-x-transparent border-b-ember" />
          </div>
          <p className="mt-10 max-w-md border-l-2 border-ember pl-5 text-lg leading-relaxed font-medium text-cream lg:mx-auto lg:-mt-6 lg:max-w-lg lg:border-l-0 lg:pl-0 lg:text-center">
            Step six is agreed in step one. That loop is the whole idea behind
            Carbon8.
          </p>
        </div>
      </div>
    </section>
  );
}
