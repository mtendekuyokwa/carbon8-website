import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { BrandLogo } from "~/components/brand-logo";
import { cn } from "~/lib/utils";

const NAV_ITEMS = ["Home", "About", "Projects", "Contact"] as const;

const NAV_HREFS: Record<(typeof NAV_ITEMS)[number], string> = {
  Home: "/",
  About: "/about",
  Projects: "/projects",
  Contact: "/contact",
};

export function SiteHeader() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight - 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-6 right-0 left-0 z-50 flex items-center justify-between px-8">
      <a href="/" aria-label="Carbon8 home">
        <BrandLogo variant={pastHero ? "dark" : "light"} />
      </a>
      <nav
        aria-label="Primary"
        className="flex items-center gap-1 rounded-full py-2 pr-2 pl-2 text-white backdrop-blur-md"
        style={{ background: "var(--header-bg)" }}
      >
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item}
            href={NAV_HREFS[item]}
            className={cn(
              "rounded-full px-5 py-2 text-sm transition",
              i === 0
                ? "bg-white/10 font-medium"
                : "opacity-80 hover:opacity-100",
            )}
          >
            {item}
          </a>
        ))}
        <button
          type="button"
          className="ml-2 flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:bg-white/10"
        >
          <Menu className="h-4 w-4" />
          Menu
        </button>
      </nav>
    </header>
  );
}
