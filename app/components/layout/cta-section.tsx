import { SmartLink } from "~/components/smart-link";
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
        "border border-sand bg-white p-6 sm:p-8",
        className,
      )}
    >
      <h2
        id="cta-heading"
        className="font-heading text-2xl font-semibold text-bark"
      >
        {heading}
      </h2>
      <p className="mt-2 max-w-prose text-base leading-7 text-bark">
        {body}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <SmartLink
          to={primaryHref}
          className="inline-flex h-13 min-w-40 items-center justify-center rounded-xl bg-ember px-6 text-base font-medium text-white"
        >
          {primaryLabel}
        </SmartLink>
        {secondaryLabel && secondaryHref ? (
          <SmartLink
            to={secondaryHref}
            className="inline-flex h-13 min-w-40 items-center justify-center rounded-xl border-[1.5px] border-bark bg-transparent px-6 text-base font-medium text-bark"
          >
            {secondaryLabel}
          </SmartLink>
        ) : null}
      </div>
    </section>
  );
}
