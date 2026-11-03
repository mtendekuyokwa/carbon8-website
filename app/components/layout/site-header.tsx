import { HeartHandshake } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Link, useLocation } from "react-router";

import { BrandLogo } from "~/components/brand-logo";
import { contactEmail } from "~/lib/site-assets";
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
  const reduceMotion = useReducedMotion() ?? false;
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
          className="flex h-11 items-center gap-3 rounded-full pr-4 pl-5 text-base font-medium text-white backdrop-blur-md focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:outline-none md:hidden"
          style={{ background: "var(--header-bg)" }}
        >
          <span aria-hidden="true">{menuOpen ? "Close" : "Menu"}</span>
          {/* Two lines that rotate into a cross. */}
          <span aria-hidden="true" className="relative block h-2.5 w-5">
            <span
              className={cn(
                "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 motion-reduce:transition-none",
                menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-0.5 rounded-full bg-current transition-all duration-300 motion-reduce:transition-none",
                menuOpen ? "top-1/2 w-5 -translate-y-1/2 -rotate-45" : "top-full w-3.5 -translate-y-full",
              )}
            />
          </span>
        </button>
      </header>
      {menuOpen ? (
        <motion.div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-bark px-6 pt-28 pb-8 text-cream md:hidden"
          // Grows out of the toggle in the top-right corner.
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { clipPath: "circle(0% at calc(100% - 3.5rem) 2.4rem)" }
          }
          animate={
            reduceMotion
              ? { opacity: 1 }
              : { clipPath: "circle(150% at calc(100% - 3.5rem) 2.4rem)" }
          }
          transition={{ duration: reduceMotion ? 0.15 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-72 opacity-25"
            style={{
              maskImage: "linear-gradient(to bottom, transparent, #000 70%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 70%)",
            }}
          >
            <img
              src="/assets/footer-terrain.svg"
              alt=""
              className="size-full object-cover object-[70%_100%]"
            />
          </div>

          <nav aria-label="Mobile" className="relative">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <motion.li
                    key={item.label}
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-4 rounded-none py-2.5 font-semibold tracking-tight transition-colors focus-visible:text-white focus-visible:outline-none",
                        active ? "text-white" : "text-cream/65 hover:text-white",
                      )}
                      style={{ fontSize: "clamp(2.25rem, 10vw, 3rem)", lineHeight: 1.1 }}
                    >
                      {item.label}
                      {active ? (
                        <span aria-hidden="true" className="size-2.5 rounded-full bg-ember" />
                      ) : null}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            className="relative mt-auto flex flex-col gap-4 pt-8"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.45 }}
          >
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-ember-deep px-5 py-4 text-xl font-medium text-white transition hover:bg-ember-deep/90"
            >
              <HeartHandshake className="size-5" />
              Donate
            </Link>
            <div className="flex items-center justify-between text-base text-cream/70">
              <span>Community-first climate action.</span>
              <a href={`mailto:${contactEmail}`} className="py-2 text-cream underline-offset-4 hover:underline">
                Email us
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </>
  );
}
