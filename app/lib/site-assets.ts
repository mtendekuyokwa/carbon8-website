export const ASSET_BASE = "/assets/";

// Single source of truth for the public contact address — referenced by the
// hero CTA, the footer, and anywhere else email is shown.
export const contactEmail = "openbasedigital@gmail.com";

export const siteAssets = {
  hero: "/assets/smoke-coming-up-1920.jpg",
  logoMark: "/assets/8-in-carbon-8.png",
  logoWhite: "/assets/8-in-carbon-8.png",
  logoDark: "/assets/8-in-carbon-8.png",
  teamBlur: `${ASSET_BASE}community-led-960.jpg`,
  teamHappy: `${ASSET_BASE}collaboration-960.jpg`,
  teamYoung: `${ASSET_BASE}planting-trees-960.jpg`,
  cardClockLamp: `${ASSET_BASE}community-led-960.jpg`,
  cardPills: `${ASSET_BASE}collaboration-960.jpg`,
  cardWaitlist: `${ASSET_BASE}verification-ready-960.jpg`,
  founderTawina: "/assets/tawina.jpg",
  founderPatrick: "/assets/patrick.jpg",
} as const;
