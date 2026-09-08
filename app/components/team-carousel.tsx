import type { ReactNode } from "react";

import { MaskedImage } from "~/components/animated-heading";

const TT_HOVES =
  '"TT Hoves", "Helvetica Neue", Helvetica, Arial, sans-serif';

export type CarouselItem = {
  img: string;
  role: string;
  name: string;
};

export function TeamCarousel({
  intro,
  items,
}: {
  intro: ReactNode;
  items: CarouselItem[];
}) {
  return (
    <div className="relative">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-3">
        <div className="w-full shrink-0 lg:w-[216px]">
          {intro}
        </div>
        <div className="grid min-w-0 flex-1 grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-3">
          {items.map((m, i) => (
            <div
              key={`${m.role}-${i}`}
              className="min-w-0"
              style={{ fontFamily: TT_HOVES }}
            >
              <div className="group aspect-[3/4] overflow-hidden bg-muted relative">
                <MaskedImage
                  src={m.img}
                  alt={m.name}
                  className="h-full w-full object-cover object-top grayscale contrast-[1.05] brightness-[1.02] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-[1.03]"
                  delay={i * 0.08}
                />
                {/* Brand duotone wash — lifts on hover to reveal full color */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-primary/25 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent"
                />
              </div>
              <div className="pt-6">
                <p className="text-base tracking-[0.2em] text-muted-foreground uppercase">
                  {m.role}
                </p>
                <p className="mt-2 text-xl font-medium">{m.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
