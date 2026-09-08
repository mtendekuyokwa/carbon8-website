import { ArrowUpRight } from "lucide-react";

import { SmartLink } from "~/components/smart-link";
import { cn } from "~/lib/utils";

export type DualCTAProps = {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  className?: string;
  /** Hide the secondary action below md (e.g. decluttered mobile hero). */
  hideSecondaryOnMobile?: boolean;
};

/** Ember pill + text link pair, as used in the hero and footer. */
export function DualCTA({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
  hideSecondaryOnMobile = false,
}: DualCTAProps) {
  return (
    <div className={cn("flex shrink-0 flex-wrap items-center gap-6", className)}>
      <SmartLink
        to={primaryHref}
        className="flex items-center gap-3 rounded-full bg-ember-deep py-2 pr-2 pl-6 text-lg font-medium text-white transition hover:bg-ember-deep/90"
      >
        {primaryLabel}
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bark text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </SmartLink>
      <SmartLink
        to={secondaryHref}
        className={cn(
          "flex items-center gap-1 text-lg font-medium text-white",
          hideSecondaryOnMobile && "hidden md:flex",
        )}
      >
        {secondaryLabel}
        <ArrowUpRight className="h-4 w-4" />
      </SmartLink>
    </div>
  );
}
