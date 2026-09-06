import { ArrowUpRight } from "lucide-react";

import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";
import { siteAssets } from "~/lib/site-assets";

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[780px] w-full overflow-hidden">
      <img
        src={siteAssets.hero}
        alt="Aerial view of tree canopy with smoke rising"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
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
              <AnimatedText className="max-w-xl leading-relaxed text-white/85">
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
              href="/contact"
              className="flex items-center gap-3 rounded-full bg-white py-2 pr-2 pl-6 text-sm font-medium text-foreground transition hover:bg-white/90"
            >
              Get in Touch
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-white">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
            <a
              href="/projects"
              className="flex items-center gap-1 text-sm font-medium text-white"
            >
              Explore Projects
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div
          className="mt-12 flex items-center justify-between border-t border-white/20 tracking-[0.2em] text-white/70 uppercase"
          style={{ fontSize: "12px" }}
        >
          <span>Community-First Climate Action</span>
          <span className="flex items-center gap-6">
            <span>
              <span className="text-white">01</span> / 04
            </span>
            <span>Next</span>
          </span>
          <span>Scroll to Explore</span>
        </div>
      </div>
    </section>
  );
}
