import { HeartHandshake } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

import { BrandLogo } from "~/components/brand-logo";
import { cn } from "~/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Field Notes", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteHeader() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  // Scroll state only matters on home (dark hero at top). Everywhere else
  // the header sits over light content, so the dark logo is always used.
  const [scrolledPastHero, setScrolledPastHero] = useState(
    () =>
      typeof window !== "undefined" &&
      window.scrollY > window.innerHeight - 80,
  );

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      setScrolledPastHero(window.scrollY > window.innerHeight - 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const logoVariant = !isHome || scrolledPastHero ? "dark" : "light";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed top-6 right-0 left-0 z-50 flex items-center justify-between px-8">
      <Link to="/" aria-label="Carbon8 home">
        <BrandLogo variant={logoVariant} />
      </Link>
      <nav
        aria-label="Primary"
        className="flex items-center gap-1 rounded-full py-2 pr-2 pl-2 text-white backdrop-blur-md"
        style={{ background: "var(--header-bg)" }}
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={cn(
              "rounded-full px-6 py-2.5 text-xl font-medium transition",
              isActive(item.href)
                ? "bg-white/10 font-medium"
                : "opacity-80 hover:opacity-100",
            )}
          >
            {item.label}
          </Link>
        ))}
        <Link
          to="/contact"
          className="ml-2 flex items-center gap-2 rounded-full bg-ember-deep px-5 py-2.5 text-xl font-medium text-white transition hover:bg-ember-deep/90"
        >
          <HeartHandshake className="h-4 w-4" />
          Donate
        </Link>
      </nav>
    </header>
  );
}
