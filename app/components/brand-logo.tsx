import { cn } from "~/lib/utils";

type BrandLogoProps = {
  variant?: "light" | "dark";
  className?: string;
  markClassName?: string;
  textClassName?: string;
};

export function BrandLogo({
  variant = "dark",
  className,
  markClassName,
  textClassName,
}: BrandLogoProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-1.5", className)}
      aria-label="Carbon8"
      role="img"
    >
      <span
        aria-hidden="true"
        className={cn(
          "font-brand text-4xl font-semibold tracking-tight",
          variant === "light" ? "text-white" : "text-bark",
          textClassName,
        )}
      >
        carbon
      </span>
      <img
        src="/assets/8-in-carbon-8.png"
        alt=""
        aria-hidden="true"
        className={cn(
          "h-10 w-auto",
          variant === "light" && "brightness-0 invert",
          markClassName,
        )}
      />
    </span>
  );
}
