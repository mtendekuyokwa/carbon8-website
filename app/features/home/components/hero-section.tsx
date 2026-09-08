import { useEffect, useState } from "react";

import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";
import { DualCTA } from "~/components/dual-cta";
import { ResponsivePicture } from "~/components/responsive-picture";
import { cn } from "~/lib/utils";

const HERO_SLIDES = [
  {
    src: "/assets/smoke-coming-up-1920.jpg",
    srcSet:
      "/assets/smoke-coming-up-960.jpg 960w, /assets/smoke-coming-up-1920.jpg 1920w",
    alt: "Aerial view of tree canopy with smoke rising",
  },
  {
    src: "/assets/industry-1920.jpg",
    srcSet: "/assets/industry-960.jpg 960w, /assets/industry-1920.jpg 1920w",
    alt: "Industrial site at dusk",
  },
  {
    src: "/assets/tree-planting-1920.jpg",
    srcSet:
      "/assets/tree-planting-960.jpg 960w, /assets/tree-planting-1920.jpg 1920w",
    alt: "Community volunteers planting young trees",
  },
] as const;

const ROTATE_MS = 6000;

export function HeroSection() {
  const [active, setActive] = useState(0);

  const goNext = () => {
    setActive((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const goTo = (index: number) => {
    setActive(index % HERO_SLIDES.length);
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setInterval(goNext, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative flex w-full flex-col overflow-hidden md:block md:h-screen md:min-h-[520px]">
      {HERO_SLIDES.map((slide, i) => (
        <ResponsivePicture
          key={slide.src}
          src={slide.src}
          srcSet={slide.srcSet}
          sizes="100vw"
          alt={slide.alt}
          aria-hidden={i !== active}
          fetchPriority={i === 0 ? "high" : "low"}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/40 md:bg-black/30"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent md:from-black/80 md:via-black/35"
      />
      {/* Mobile: in-flow so the section grows with content (never clips).
          Desktop: absolute overlay pinned to the viewport-height hero. */}
      <div className="relative flex min-h-svh flex-col justify-end px-5 pt-28 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-8 md:absolute md:inset-0 md:px-12 md:pt-0 md:pb-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="max-w-3xl">
            <AnimatedHeading
              as="h1"
              className="text-[clamp(2rem,0.5rem+8vw,2.9rem)] font-medium leading-[1.05] text-white md:text-[4.04rem]"
            >
              Climate Action
              <br />
              Led by Communities
            </AnimatedHeading>
            <div className="mt-4 md:mt-8">
              <AnimatedText className="max-w-xl leading-relaxed text-white">
                <span className="block text-[16px] leading-[1.55] md:hidden">
                  Community-first climate projects, shaped with local partners
                  from the start.
                </span>
                <span className="hidden text-[1.28rem] leading-[1.45] md:block">
                  Carbon8 is developing community-first climate projects and
                  plain-language climate finance explainers — shaped with local
                  partners from the start.
                </span>
              </AnimatedText>
            </div>
          </div>
          <div className="shrink-0 pb-1">
            <DualCTA
              primaryLabel="Get in Touch"
              primaryHref="mailto:openbasedigital@gmail.com"
              secondaryLabel="Contribute"
              secondaryHref="/contact"
              hideSecondaryOnMobile
              className="flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6 [&>a:first-child]:min-h-[48px] [&>a:first-child]:justify-center"
            />
          </div>
        </div>
        {/* Mobile: dot indicators replace the wrapping counter row. */}
        <div
          className="mt-6 flex items-center gap-1 md:hidden"
          role="group"
          aria-label="Hero slides"
        >
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className="flex h-6 w-6 items-center justify-center"
            >
              <span
                aria-hidden
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === active ? "w-6 bg-white" : "w-1.5 bg-white/50",
                )}
              />
            </button>
          ))}
          <span className="ml-2 text-xs tracking-[0.2em] text-white/80 uppercase">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(HERO_SLIDES.length).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-8 hidden flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/20 pt-4 text-xs tracking-[0.2em] text-white uppercase sm:text-sm md:mt-12 md:flex md:text-[10px]">
          <span>Community-First Climate Action</span>
          <span className="flex items-center gap-6">
            <span>
              <span className="text-white">
                {String(active + 1).padStart(2, "0")}
              </span>{" "}
              / {String(HERO_SLIDES.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={goNext}
              className="cursor-pointer uppercase transition hover:text-white"
            >
              Next
            </button>
          </span>
          <span className="hidden sm:inline md:ml-auto">Carbon8 Malawi</span>
        </div>
      </div>
    </section>
  );
}
