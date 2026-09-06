import { ArrowUpRight } from "lucide-react";

import { cn } from "~/lib/utils";

export type DualCTAProps = {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  className?: string;
};

/** Ember pill + text link pair, as used in the hero and footer. */
export function DualCTA({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: DualCTAProps) {
  return (
    <div className={cn("flex shrink-0 items-center gap-6", className)}>
      <a
        href={primaryHref}
        className="flex items-center gap-3 rounded-full bg-[#C46A2E] py-2 pr-2 pl-6 text-sm font-medium text-white transition hover:bg-[#C46A2E]/90"
      >
        {primaryLabel}
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4A362E] text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </a>
      <a
        href={secondaryHref}
        className="flex items-center gap-1 text-sm font-medium text-white"
      >
        {secondaryLabel}
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}
