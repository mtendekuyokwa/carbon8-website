import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";
import { Eyebrow } from "~/components/eyebrow";
import { TeamCarousel } from "~/components/team-carousel";
import type { CarouselItem } from "~/components/team-carousel";
import { siteAssets } from "~/lib/site-assets";

const TT_HOVES =
  '"TT Hoves", "Helvetica Neue", Helvetica, Arial, sans-serif';

const TEAM_ITEMS: CarouselItem[] = [
  {
    img: siteAssets.founderPatrick,
    role: "CO-FOUNDER, GEOAI LEAD",
    name: "Patrick",
  },
  {
    img: siteAssets.founderTawina,
    role: "CO-FOUNDER, METHODOLOGY LEAD",
    name: "Tawina",
  },
];

export function TeamSection() {
  return (
    <section
      className="px-4 py-16 sm:px-8 sm:py-24 md:px-12 md:py-32"
      style={{ fontFamily: TT_HOVES }}
      aria-labelledby="home-team-heading"
    >
      <div>
        <Eyebrow className="mb-10 flex flex-wrap gap-x-24 gap-y-2 md:mb-16">
          <span style={{ fontSize: "9px", fontFamily: TT_HOVES }}>
            Carbon8
          </span>
          <span style={{ fontSize: "9px", fontFamily: TT_HOVES }}>
            Who We Are
          </span>
        </Eyebrow>
        <AnimatedHeading className="font-medium leading-[1.05]">
          <span
            id="home-team-heading"
            style={{
              fontSize: "clamp(2rem, 1.25rem + 5vw, 3.25rem)",
              lineHeight: 1.05,
              display: "block",
              fontFamily: TT_HOVES,
            }}
          >
            Meet the Team
          </span>
        </AnimatedHeading>
      </div>
      <div className="mt-12 md:mt-20">
        <TeamCarousel
          items={TEAM_ITEMS}
          intro={
            <AnimatedText className="leading-relaxed text-muted-foreground">
              <span
                style={{
                  fontSize: "13px",
                  lineHeight: 1.5,
                  display: "block",
                  maxWidth: "100%",
                  fontFamily: TT_HOVES,
                }}
              >
                We are developing early climate concepts with local partners —
                meet the co-founders leading methodology and GeoAI.
              </span>
            </AnimatedText>
          }
        />
      </div>
    </section>
  );
}
