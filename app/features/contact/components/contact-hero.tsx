import { AnimatedHeading, AnimatedText } from "~/components/animated-heading";
import { Eyebrow } from "~/components/eyebrow";
import { ResponsivePicture } from "~/components/responsive-picture";

export function ContactHero() {
  return (
    <section
      className="relative overflow-hidden bg-bark px-4 pt-28 pb-12 text-cream sm:px-8 sm:pt-32 sm:pb-16 md:px-12"
      aria-labelledby="contact-heading"
    >
      <ResponsivePicture
        src="/assets/collaboration-1920.jpg"
        srcSet="/assets/collaboration-960.jpg 960w, /assets/collaboration-1920.jpg 1920w"
        sizes="100vw"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-bark/70"
      />
      <div className="relative mx-auto max-w-6xl">
        <Eyebrow tone="faint-light" withRule className="mb-10">
          Connect
        </Eyebrow>
        <AnimatedHeading className="max-w-4xl font-medium leading-[1.05]">
          <span
            id="contact-heading"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.65rem)", display: "block" }}
          >
            Get connected — let&apos;s start a conversation.
          </span>
        </AnimatedHeading>
        <AnimatedText
          className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/80"
          delay={0.1}
        >
          Interested in partnering, volunteering, or bringing an early project
          idea to your community? Pick a path below and send us a note — we
          read every message.
        </AnimatedText>
        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-lg text-cream/80">
          <div>
              <dt className="text-base tracking-[0.2em] uppercase opacity-80">
                Where
              </dt>
            <dd>Malawi-based social enterprise</dd>
          </div>
          <div>
              <dt className="text-base tracking-[0.2em] uppercase opacity-80">
                Email
              </dt>
            <dd>Contact form for now — email coming soon</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
