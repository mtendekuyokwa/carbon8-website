import { HeartHandshake, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Link, useLocation } from "react-router";

import { BrandLogo } from "~/components/brand-logo";
import { cn } from "~/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Climate Finance", href: "/climate-finance" },
  { label: "Field Notes", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function getScrollSnapshot() {
  return window.scrollY > window.innerHeight - 80;
}

function getServerScrollSnapshot() {
  return false;
}

export function SiteHeader() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Live scroll position (not mount-time state): re-read on every scroll
  // event and on every render, so route changes pick up the current
  // position immediately instead of serving a stale value until next scroll.
  // Scroll state only matters on home (dark hero at top). Everywhere else
  // the header sits over light content, so the dark logo is always used.
  const scrolledPastHero = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getServerScrollSnapshot,
  );

  // Close the mobile menu on Escape + lock body scroll while open.
  // (Route changes close via onClick on each menu link — no effect needed.)
  useEffect(() => {
    if (!menuOpen) return;
    // React refs can repoint between renders — capture the toggle node now
    // so the cleanup below restores focus to the *original* button.
    const toggle = toggleRef.current;
    const container = menuRef.current;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }
      // Trap Tab focus inside the full-screen overlay while it is open.
      if (event.key !== "Tab" || !container) return;
      const focusables = container.querySelectorAll<HTMLElement>("a[href], button:not([aria-controls])");
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Move keyboard focus into the menu so users start inside the overlay.
    container?.querySelector<HTMLElement>("a[href]")?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      // Return focus to the toggle so keyboard users don't land at <body>.
      toggle?.focus();
    };
  }, [menuOpen]);

  const logoVariant =
    menuOpen || (isHome && !scrolledPastHero) ? "light" : "dark";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex items-center justify-between px-4 sm:top-6 sm:px-8">
        <Link to="/" aria-label="Carbon8 home">
          <BrandLogo
            variant={logoVariant}
            textClassName="text-2xl md:text-4xl"
            markClassName="h-7 md:h-10"
          />
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full p-2 text-white backdrop-blur-md md:flex"
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
            <HeartHandshake className="size-4" />
            Donate
          </Link>
        </nav>
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className={cn(
            "flex size-11 items-center justify-center md:hidden",
            logoVariant === "light" ? "text-white" : "text-bark",
          )}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>
      {menuOpen ? (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
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
                  "rounded-none p-4 text-2xl font-medium transition",
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
            <HeartHandshake className="size-5" />
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
