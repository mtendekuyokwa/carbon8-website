import {
  AnimatedHeading,
  AnimatedText,
  MaskedImage,
} from "~/components/animated-heading";
import { siteAssets } from "~/lib/site-assets";

const ITEMS = [
  {
    title: "Community Consultation",
    desc: "Before any project begins, we engage directly with local chiefs, cooperatives, and farmer groups to understand their priorities and ensure the project reflects the needs of the community it will affect.",
    img: siteAssets.cardClockLamp,
  },
  {
    title: "Collaborative Restoration",
    desc: "We design and implement afforestation and reforestation projects in partnership with the communities involved, generating local employment and shared ownership rather than imposing a plan from outside.",
    img: siteAssets.cardPills,
  },
  {
    title: "Verification-Ready Development",
    desc: "Every project is developed and documented to meet the standards required by climate finance and carbon markets from the outset, ensuring credibility is built in rather than retrofitted.",
    img: siteAssets.cardWaitlist,
  },
] as const;

function CardNumber({ n }: { n: string }) {
  return <span className="mt-2 text-xs text-muted-foreground">({n})</span>;
}

export function BenefitsSection() {
  return (
    <section className="bg-[#F4F1EC] px-8 py-32 text-[#4A362E] md:px-12">
      <div className="mb-24 grid grid-cols-12 gap-12">
        <div className="col-span-12 md:col-span-7">
          <AnimatedHeading className="text-5xl font-medium leading-[1.05] md:text-6xl">
            How Our Approach
            <br />
            Works
          </AnimatedHeading>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 md:pt-4">
          <AnimatedText className="text-base leading-relaxed text-muted-foreground">
            We intend to build each project as a long-term partnership with
            the community carrying it forward — designed toward verifiable
            standards from day one.
          </AnimatedText>
        </div>
      </div>
      <div
        className="relative grid grid-cols-1 md:grid-cols-3"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "1px 100%, 1px 100%",
          backgroundPosition: "33.3333% 0, 66.6666% 0",
          backgroundRepeat: "no-repeat",
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 left-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.45) 15%, rgba(255,255,255,0.45) 85%, transparent 100%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 left-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.45) 15%, rgba(255,255,255,0.45) 85%, transparent 100%)",
          }}
        />
        {ITEMS.map((item, i) => {
          const n = `0${i + 1}`;
          const content = (
            <div>
              <div className="mb-4 flex items-start gap-3">
                <CardNumber n={n} />
                <AnimatedHeading as="h3" className="text-3xl font-medium" delay={i * 0.1}>
                  {item.title}
                </AnimatedHeading>
              </div>
              <AnimatedText
                className="max-w-sm text-sm leading-relaxed text-muted-foreground"
                delay={0.2 + i * 0.1}
              >
                {item.desc}
              </AnimatedText>
            </div>
          );
          const image = (
            <div className="aspect-square overflow-hidden">
              <MaskedImage
                src={item.img}
                alt={item.title}
                className="h-full w-full"
                delay={i * 0.12}
              />
            </div>
          );
          const reversed = i === 1;
          return (
            <div key={item.title} className="flex flex-col gap-8 p-10">
              {reversed ? (
                <>
                  {image}
                  <div className="mt-auto">{content}</div>
                </>
              ) : (
                <>
                  {content}
                  <div className="mt-auto">{image}</div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
