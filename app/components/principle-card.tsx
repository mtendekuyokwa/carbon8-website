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
        "rounded-2xl border border-[#DED7C8] bg-white p-6",
        className,
      )}
    >
      <h3 className="font-heading text-xl font-semibold text-[#4A362E]">
        {title}
      </h3>
      <p className="mt-2 text-base leading-6 text-[#4A362E]">{description}</p>
    </article>
  );
}
