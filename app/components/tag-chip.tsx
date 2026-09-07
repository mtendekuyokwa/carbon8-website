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
        "inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase",
        tone === "green" && "bg-[#6E7F3C] text-white",
        tone === "sand" &&
          "border border-[#DED7C8] bg-[#F4F1EC] px-3 py-1 font-medium normal-case text-[#4A362E]/70",
        tone === "glass" && "bg-white/15 text-white backdrop-blur",
        className,
      )}
    >
      {label}
    </span>
  );
}
