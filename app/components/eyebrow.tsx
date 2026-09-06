import { cn } from "~/lib/utils";

export type EyebrowProps = {
  children?: React.ReactNode;
  tone?: "muted" | "light" | "faint-light";
  withRule?: boolean;
  className?: string;
};

const TONES = {
  muted: "text-muted-foreground",
  light: "text-white",
  "faint-light": "text-white/60",
} as const;

export function Eyebrow({
  children,
  tone = "muted",
  withRule = false,
  className,
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-xs tracking-[0.2em] uppercase",
        TONES[tone],
        withRule && "flex items-center gap-6",
        className,
      )}
    >
      {withRule ? (
        <>
          <span aria-hidden className="h-px w-10 bg-foreground/30" />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </p>
  );
}
