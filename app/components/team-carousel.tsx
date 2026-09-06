import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

import { MaskedImage } from "~/components/animated-heading";

const TT_HOVES =
  '"TT Hoves", "Helvetica Neue", Helvetica, Arial, sans-serif';

export type CarouselItem = {
  img: string;
  role: string;
  name: string;
};

const INTRO_WIDTH = 324;
const GAP = 11.26;
const VISIBLE = 3.25;

export function TeamCarousel({
  intro,
  items,
}: {
  intro: ReactNode;
  items: CarouselItem[];
}) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const maxIndex = Math.max(0, Math.ceil(items.length - VISIBLE));

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex" style={{ gap: GAP }}>
        <div className="shrink-0" style={{ width: INTRO_WIDTH }}>
          {intro}
        </div>
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <motion.div
            className="flex"
            style={{
              gap: GAP,
              width: `calc(${items.length} * ((100% - ${(VISIBLE - 1) * GAP}px) / ${VISIBLE}) + ${(items.length - 1) * GAP}px)`,
            }}
            animate={{
              x: `calc(${-index} * (100% + ${GAP}px) / ${items.length})`,
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {items.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className="shrink-0"
                style={{
                  width: `calc((100% - ${(items.length - 1) * GAP}px) / ${items.length})`,
                  fontFamily: TT_HOVES,
                }}
              >
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <MaskedImage
                    src={m.img}
                    alt={m.name}
                    className="h-full w-full"
                    delay={i * 0.08}
                  />
                </div>
                <div className="pt-6">
                  <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    {m.role}
                  </p>
                  <p className="mt-2 text-xl font-medium">{m.name}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {hovered ? (
          <motion.div
            className="absolute top-[35%] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="flex cursor-pointer items-center justify-center gap-4 rounded-full"
              style={{
                width: 126,
                height: 126,
                background: "rgba(72, 72, 72, 0.16)",
                backdropFilter: "blur(84px)",
                WebkitBackdropFilter: "blur(84px)",
              }}
            >
              <button
                type="button"
                aria-label="Previous"
                disabled={index === 0}
                onClick={() => setIndex((v) => Math.max(0, v - 1))}
                className="flex cursor-pointer items-center justify-center text-white transition disabled:opacity-30"
              >
                <ArrowLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                aria-label="Next"
                disabled={index >= maxIndex}
                onClick={() => setIndex((v) => Math.min(maxIndex, v + 1))}
                className="flex cursor-pointer items-center justify-center text-white transition disabled:opacity-30"
              >
                <ArrowRight className="h-7 w-7" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
