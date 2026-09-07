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
      className="px-8 py-32 md:px-12"
      style={{ fontFamily: TT_HOVES }}
      aria-labelledby="home-team-heading"
    >
      <div style={{ paddingLeft: "335.26px" }}>
        <Eyebrow className="mb-16 flex gap-24">
          <span style={{ fontSize: "14px", fontFamily: TT_HOVES }}>
            Carbon8
          </span>
          <span style={{ fontSize: "14px", fontFamily: TT_HOVES }}>
            Who We Are
          </span>
        </Eyebrow>
        <AnimatedHeading className="font-medium leading-[1.05]">
          <span
            id="home-team-heading"
            style={{
              fontSize: "58.55px",
              lineHeight: 1.05,
              display: "block",
              fontFamily: TT_HOVES,
            }}
          >
            Meet the Team
          </span>
        </AnimatedHeading>
      </div>
      <div className="mt-20">
        <TeamCarousel
          items={TEAM_ITEMS}
          intro={
            <AnimatedText className="leading-relaxed text-muted-foreground">
              <span
                style={{
                  fontSize: "19px",
                  lineHeight: 1.5,
                  display: "block",
                  width: "270px",
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
