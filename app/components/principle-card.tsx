import { cn } from "~/lib/utils";

export type PrincipleCardProps = {
  title: string;
  description: string;
  className?: string;
};

export function PrincipleCard({
  title,
  description,
  className,
}: PrincipleCardProps) {
  return (
    <article
      className={cn(
        "border border-sand bg-white p-6",
        className,
      )}
    >
      <h3 className="font-heading text-xl font-semibold text-bark">
        {title}
      </h3>
      <p className="mt-2 text-base leading-6 text-bark">{description}</p>
    </article>
  );
}
