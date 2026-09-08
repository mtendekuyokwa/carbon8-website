import { HeartHandshake, Menu, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Close the mobile menu on Escape + lock body scroll while open.
  // (Route changes close via onClick on each menu link — no effect needed.)
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const logoVariant =
    menuOpen || (isHome && !scrolledPastHero) ? "light" : "dark";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="fixed top-4 right-0 left-0 z-50 flex items-center justify-between px-4 sm:top-6 sm:px-8">
        <Link to="/" aria-label="Carbon8 home">
          <BrandLogo
            variant={logoVariant}
            textClassName="text-2xl md:text-4xl"
            markClassName="h-7 md:h-10"
          />
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full py-2 pr-2 pl-2 text-white backdrop-blur-md md:flex"
          style={{ background: "var(--header-bg)" }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2.5 text-base font-medium transition lg:px-6 lg:text-xl",
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
            className="ml-2 flex items-center gap-2 rounded-full bg-ember-deep px-4 py-2.5 text-base font-medium text-white transition hover:bg-ember-deep/90 lg:px-5 lg:text-xl"
          >
            <HeartHandshake className="h-4 w-4" />
            Donate
          </Link>
        </nav>
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className={cn(
            "flex h-11 w-11 items-center justify-center md:hidden",
            logoVariant === "light" ? "text-white" : "text-bark",
          )}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>
      {menuOpen ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col bg-bark px-6 pt-24 pb-8 text-cream md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-4 text-2xl font-medium transition",
                  isActive(item.href)
                    ? "bg-white/10"
                    : "opacity-80 hover:bg-white/5 hover:opacity-100",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-ember-deep px-5 py-4 text-xl font-medium text-white transition hover:bg-ember-deep/90"
          >
            <HeartHandshake className="h-5 w-5" />
            Donate
          </Link>
          <p className="mt-auto pt-8 text-base opacity-70">
            Community-first climate action.
          </p>
        </div>
      ) : null}
    </>
  );
}
