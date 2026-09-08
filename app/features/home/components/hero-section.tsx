import { useEffect, useState } from "react";

import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";
import { DualCTA } from "~/components/dual-cta";
import { ResponsivePicture } from "~/components/responsive-picture";

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

  useEffect(() => {
    const id = window.setInterval(goNext, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-svh w-full overflow-hidden md:h-screen md:min-h-[780px]">
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
      <div aria-hidden className="absolute inset-0 bg-black/30" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
      />
      <div className="absolute inset-0 flex flex-col justify-end px-4 pb-10 sm:px-8 md:px-12 md:pb-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <AnimatedHeading
              as="h1"
              className="font-medium leading-[1.05] text-white"
            >
              <span
                style={{
                  fontSize: "clamp(2.5rem, 1rem + 8vw, 4.04rem)",
                  lineHeight: 1.05,
                  display: "block",
                }}
              >
                Climate Action
                <br />
                Led by Communities
              </span>
            </AnimatedHeading>
            <div className="mt-6 md:mt-8">
              <AnimatedText className="max-w-xl leading-relaxed text-white">
                <span
                  style={{
                    fontSize: "clamp(1.0625rem, 1rem + 1vw, 1.28rem)",
                    lineHeight: 1.45,
                    display: "block",
                    maxWidth: "100%",
                  }}
                >
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
              className="flex-col items-start sm:flex-row sm:items-center"
            />
          </div>
        </div>
        <div
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/20 pt-4 text-xs tracking-[0.2em] text-white uppercase sm:text-sm md:mt-12 md:text-[15px]"
        >
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
          <span className="hidden sm:inline md:ml-auto">
            Carbon8 Malawi
          </span>
        </div>
      </div>
    </section>
  );
}
