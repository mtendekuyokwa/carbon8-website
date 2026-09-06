import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";

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
    <section className="relative h-screen min-h-[780px] w-full overflow-hidden">
      {HERO_SLIDES.map((slide, i) => (
        <img
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
      <div className="absolute inset-0 flex flex-col justify-end px-8 pb-16 md:px-12">
        <div className="flex items-end justify-between gap-8">
          <div className="max-w-3xl">
            <AnimatedHeading
              as="h1"
              className="font-medium leading-[1.05] text-white"
            >
              <span
                style={{
                  fontSize: "72.73px",
                  lineHeight: 1.05,
                  display: "block",
                }}
              >
                Climate Action
                <br />
                Led by Communities
              </span>
            </AnimatedHeading>
            <div className="mt-8 w-max">
              <AnimatedText className="max-w-xl leading-relaxed text-white">
                <span
                  style={{
                    fontSize: "20.99px",
                    lineHeight: "28.21px",
                    display: "block",
                    width: "608px",
                  }}
                >
                  Carbon8 is developing community-first climate projects and
                  plain-language climate finance explainers — shaped with local
                  partners from the start.
                </span>
              </AnimatedText>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-6 pb-1">
            <a
              href="mailto:openbasedigital@gmail.com"
              className="flex items-center gap-3 rounded-full bg-[#C46A2E] py-2 pr-2 pl-6 text-sm font-medium text-white transition hover:bg-[#C46A2E]/90"
            >
              Get in Touch
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4A362E] text-white">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
            <a
              href="/contribute"
              className="flex items-center gap-1 text-sm font-medium text-white"
            >
              Contribute
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div
          className="mt-12 flex items-center justify-between border-t border-white/20 tracking-[0.2em] text-white uppercase"
          style={{ fontSize: "12px" }}
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
          <span>Carbon8 Malawi</span>
        </div>
      </div>
    </section>
  );
}
