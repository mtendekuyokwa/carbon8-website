import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";
import { TeamCarousel } from "~/components/team-carousel";
import type { CarouselItem } from "~/components/team-carousel";
import { siteAssets } from "~/lib/site-assets";

const TT_HOVES =
  '"TT Hoves", "Helvetica Neue", Helvetica, Arial, sans-serif';

const TEAM_ITEMS: CarouselItem[] = [
  {
    img: siteAssets.teamBlur,
    role: "OUR STORY",
    name: "Community-led from the start",
  },
  {
    img: siteAssets.teamHappy,
    role: "OUR APPROACH",
    name: "Plain-language climate finance",
  },
  {
    img: siteAssets.teamYoung,
    role: "EARLY CONCEPTS",
    name: "Shaped with local partners",
  },
  {
    img: siteAssets.teamHappy,
    role: "IN DEVELOPMENT",
    name: "Projects taking shape",
  },
  {
    img: siteAssets.teamBlur,
    role: "GET INVOLVED",
    name: "Partner with us",
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
        <div
          className="mb-16 flex gap-24 tracking-[0.2em] text-muted-foreground uppercase"
          style={{ fontSize: "11.26px", fontFamily: TT_HOVES }}
        >
          <span>Carbon8</span>
          <span>Who We Are</span>
        </div>
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
            Get to Know the Work
            <br />
            that Moves Us Forward
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
                  fontSize: "16.89px",
                  lineHeight: 1.5,
                  display: "block",
                  width: "270px",
                  fontFamily: TT_HOVES,
                }}
              >
                We are developing early climate concepts with local partners —
                and explaining climate finance in plain language along the way.
              </span>
            </AnimatedText>
          }
        />
      </div>
    </section>
  );
}
