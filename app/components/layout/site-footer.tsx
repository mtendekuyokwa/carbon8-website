import { ArrowUpRight, AtSign, Globe, Mail, MessageCircle, Share2 } from "lucide-react";

import { BrandLogo } from "~/components/brand-logo";

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Communities", href: "/communities" },
  { label: "Climate Finance", href: "/climate-finance" },
  { label: "News", href: "/news" },
] as const;

const GET_INVOLVED_LINKS = [
  { label: "Get in touch", href: "/contact" },
  { label: "Contribute", href: "/contact" },
  { label: "Partner with us", href: "/contact" },
  { label: "Volunteer", href: "/contact" },
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

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-bark text-cream">
      <div className="mx-auto max-w-6xl px-6 pt-12">
        <div className="flex flex-col items-start justify-between gap-6 bg-white/5 p-6 sm:p-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">Subscribe to newsletter</h2>
            <p className="mt-1 max-w-md text-lg leading-6 opacity-80">
              Stories from the field, early project drops, and simple ways to
              act — once a month, no noise.
            </p>
          </div>
          <form
            action="/contact"
            method="get"
            className="w-full max-w-md"
          >
            <label htmlFor="footer-newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:rounded-full sm:bg-white/10 sm:p-2 sm:pl-5 sm:focus-within:ring-2 sm:focus-within:ring-ember">
              <div className="flex flex-1 items-center gap-2 rounded-full bg-white/10 px-5 py-3 sm:bg-transparent sm:px-0 sm:py-0">
                <Mail className="h-4 w-4 shrink-0 opacity-60" aria-hidden="true" />
                <input
                  id="footer-newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.org"
                  autoComplete="email"
                  className="w-full bg-transparent text-lg placeholder:text-cream/50 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="flex shrink-0 items-center justify-center gap-3 rounded-full bg-ember py-2 pr-2 pl-6 text-lg font-medium text-white transition hover:bg-ember/90"
              >
                Subscribe
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bark text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            </div>
            <p className="mt-2 text-base opacity-60 sm:pl-5">
              No spam, unsubscribe anytime. Signup opens soon.
            </p>
          </form>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <BrandLogo variant="light" />
          <p className="mt-4 max-w-xs text-lg leading-6 opacity-80">
            Community-first climate organisation.
          </p>
          <p className="mt-3 inline-block rounded-full border border-white/20 px-3 py-1 text-base opacity-80">
            Concept — in development
          </p>
          <div className="mt-5 flex gap-2">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 opacity-80 transition hover:opacity-100"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-lg font-semibold tracking-wide uppercase opacity-70">
            Explore
          </h2>
          <ul className="mt-4 space-y-2 text-lg">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="opacity-80 hover:opacity-100">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Get involved">
          <h2 className="text-lg font-semibold tracking-wide uppercase opacity-70">
            Get involved
          </h2>
          <ul className="mt-4 space-y-2 text-lg">
            {GET_INVOLVED_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="opacity-80 hover:opacity-100">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-lg font-semibold tracking-wide uppercase opacity-70">
            Contact
          </h2>
          <ul className="mt-4 space-y-2 text-lg opacity-80">
            <li>Malawi-based social enterprise</li>
            <li>
              <a href="/contact" className="hover:opacity-100">
                Contact form (email coming soon)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-base opacity-70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Carbon8. All rights reserved.</p>
          <p>Community-first climate action.</p>
        </div>
      </div>
    </footer>
  );
}
