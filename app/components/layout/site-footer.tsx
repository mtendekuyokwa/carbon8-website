import { AtSign, Globe, Mail, MessageCircle, Share2 } from "lucide-react";
import { Link } from "react-router";

import { BrandLogo } from "~/components/brand-logo";
import { contactEmail } from "~/lib/site-assets";

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Climate Finance", href: "/climate-finance" },
  { label: "Field Notes", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

// Each matches an enquiry path on the contact page.
const GET_INVOLVED_LINKS = [
  { label: "Partner or fund", href: "/contact" },
  { label: "Volunteer", href: "/contact" },
  { label: "Bring a community idea", href: "/contact" },
] as const;

// Placeholder socials — real handles not provided yet. All point to
// /contact so no invented URLs ship; swap hrefs when handles exist.
const SOCIAL_LINKS = [
  { label: "Carbon8 on X (coming soon)", href: "/contact", Icon: AtSign },
  { label: "Carbon8 on Instagram (coming soon)", href: "/contact", Icon: Share2 },
  { label: "Carbon8 on LinkedIn (coming soon)", href: "/contact", Icon: Globe },
  { label: "Carbon8 on Facebook (coming soon)", href: "/contact", Icon: MessageCircle },
  { label: "Email Carbon8 (coming soon)", href: "/contact", Icon: Mail },
] as const;

const linkClass =
  "inline-block py-1.5 text-cream/80 transition-colors hover:text-white focus-visible:text-white sm:py-1";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-bark text-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-12 px-4 pt-20 pb-14 sm:grid-cols-3 sm:px-6 sm:pt-24 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <BrandLogo variant="light" />
          <p className="mt-5 max-w-xs text-lg leading-relaxed text-cream/80">
            Community-first climate action in Malawi, built in the open.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-base text-cream/70">
            <span aria-hidden="true" className="size-2 rounded-full bg-ember" />
            Concept stage, in development
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <Link
                key={label}
                to={href}
                aria-label={label}
                className="flex size-12 items-center justify-center rounded-lg border border-cream/25 text-cream/80 transition hover:border-cream/60 hover:text-white sm:size-10"
              >
                <Icon className="size-4" />
              </Link>
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-base font-semibold text-white">Explore</h2>
          <ul className="mt-5 space-y-2 text-lg sm:space-y-1.5">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Get involved">
          <h2 className="text-base font-semibold text-white">Get involved</h2>
          <ul className="mt-5 space-y-2 text-lg sm:space-y-1.5">
            {GET_INVOLVED_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 sm:col-span-1">
          <h2 className="text-base font-semibold text-white">Contact</h2>
          <ul className="mt-5 space-y-2 text-lg sm:space-y-1.5">
            <li className="py-1.5 text-cream/80 sm:py-1">Malawi-based social enterprise</li>
            <li>
              <a href={`mailto:${contactEmail}`} className={linkClass}>
                Email us
              </a>
            </li>
            <li>
              <Link to="/contact" className={linkClass}>
                Contact form
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-2 border-t border-cream/15 py-6 text-base text-cream/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Carbon8. All rights reserved.</p>
          <p>Community-first climate action.</p>
        </div>
      </div>

      {/* Generated contour terrain (not a map of a real place) — the land the work is about. */}
      <div
        aria-hidden="true"
        className="pointer-events-none h-44 opacity-40 select-none sm:h-60 lg:h-80"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, #000 60%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 60%)",
        }}
      >
        <img
          src="/assets/footer-terrain.svg"
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-[70%_100%]"
        />
      </div>
    </footer>
  );
}
