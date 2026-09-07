import { cn } from "~/lib/utils";

export function TagChip({
  label,
  tone = "green",
  className,
}: {
  label: string;
  tone?: "green" | "sand" | "glass";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3.5 py-1.5 text-base font-semibold tracking-wide uppercase",
        tone === "green" && "bg-deep text-white",
        tone === "sand" &&
          "border border-sand bg-cream px-3 py-1 font-medium normal-case text-bark/80",
        tone === "glass" && "bg-white/15 text-white backdrop-blur",
        className,
      )}
    >
      {label}
    </span>
  );
}
