import { cn } from "~/lib/utils";

export type CTASectionProps = {
  heading: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
};

export function CTASection({
  heading,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: CTASectionProps) {
  return (
    <section
      aria-labelledby="cta-heading"
      className={cn(
        "rounded-2xl border border-[#DED7C8] bg-white p-6 sm:p-8",
        className,
      )}
    >
      <h2
        id="cta-heading"
        className="font-heading text-2xl font-semibold text-[#4A362E]"
      >
        {heading}
      </h2>
      <p className="mt-2 max-w-prose text-base leading-7 text-[#4A362E]">
        {body}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={primaryHref}
          className="inline-flex h-13 min-w-40 items-center justify-center rounded-xl bg-[#C46A2E] px-6 text-base font-medium text-white"
        >
          {primaryLabel}
        </a>
        {secondaryLabel && secondaryHref ? (
          <a
            href={secondaryHref}
            className="inline-flex h-13 min-w-40 items-center justify-center rounded-xl border-[1.5px] border-[#4A362E] bg-transparent px-6 text-base font-medium text-[#4A362E]"
          >
            {secondaryLabel}
          </a>
        ) : null}
      </div>
    </section>
  );
}
