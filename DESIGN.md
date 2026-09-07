---
version: alpha
name: Carbon8
description: A warm, community-first environmental system with rounded, friendly typography and an earthy, sun-lit palette.
colors:
  primary: "#4A362E"
  secondary: "#C46A2E"
  tertiary: "#6E7F3C"
  accent-deep: "#4F5A2A"
  neutral: "#F4F1EC"
  surface: "#FFFFFF"
  on-surface: "#4A362E"
  error: "#B3402A"
  border: "#DED7C8"
  overlay: "#4A362E4D"
typography:
  headline-display:
    fontFamily: "Baloo 2"
    fontSize: "72px"
    fontWeight: 700
    lineHeight: "84px"
    letterSpacing: "-1px"
  headline-lg:
    fontFamily: "Baloo 2"
    fontSize: "48px"
    fontWeight: 700
    lineHeight: "56px"
    letterSpacing: "-0.5px"
  headline-md:
    fontFamily: "Baloo 2"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: "40px"
    letterSpacing: "-0.3px"
  headline-sm:
    fontFamily: "Baloo 2"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: "28px"
    letterSpacing: "0px"
  body-lg:
    fontFamily: "Inter"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "28px"
  body-md:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  body-sm:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  label-lg:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: "24px"
  label-md:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: "20px"
  label-sm:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "16px"
    letterSpacing: "0.08em"
rounded:
  none: 0px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  xs: 8px
  sm: 16px
  md: 32px
  lg: 48px
  xl: 80px
components:
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "#FFFFFF"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    height: "52px"
    width: "160px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    height: "52px"
    width: "160px"
    border: "1.5px solid {colors.primary}"
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: "24px"
    border: "1px solid {colors.border}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
    border: "1px solid {colors.border}"
  chip:
    backgroundColor: "{colors.tertiary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "6px 14px"
---

## Overview

Carbon8 feels warm, grounded, and community-first rather than corporate or clinical. The visual tone is light and sun-lit, built around the earthy palette sampled from the logo, with a rounded, friendly headline style that echoes the wordmark's own soft, hand-cupped mark. It needs to carry real weight with funders and climate-finance partners while still reading as approachable to the chiefs, cooperatives, and farmer groups the organisation works alongside — so confidence comes from generous space and clear structure, not density or gloss.

## Colors

- **Primary (#4A362E) — Carbon Brown:** The main text color, used for the wordmark, headings, and footer background. It anchors the palette and reads as serious and rooted without going stark black.
- **Secondary (#C46A2E) — Ember Orange:** The primary accent, reserved for the main call-to-action, icons, and hover states. It should stay a deliberate accent rather than a dominant color — used sparingly, it signals warmth and action.
- **Tertiary (#6E7F3C) — Growth Green:** A secondary accent for buttons, section dividers, and icons that need to feel more organic than the orange. Also used as the chip fill for tags and category labels.
- **Accent-deep (#4F5A2A) — Deep Green:** Reserved for subheadings and alternate section backgrounds, giving pages a way to shift tone between sections without introducing a new color family.
- **Neutral (#F4F1EC) — Warm Off-White:** The default page background. It's warmer than pure white, keeping the site from feeling sterile.
- **Surface (#FFFFFF):** Card and panel backgrounds that sit just above the neutral page background, giving light, subtle separation without needing shadow.
- **On-surface (#4A362E):** The default text color on both the neutral background and surface panels — Carbon Brown reused for consistency and legibility.
- **Error (#B3402A):** A muted brick red for form validation and warning states, close enough to Ember Orange to stay in-family while remaining distinguishable.
- **Border (#DED7C8):** A soft warm-tan line for card edges, dividers, and input outlines — present enough to define structure without adding visual weight.
- **Overlay (#4A362E4D):** A translucent Carbon Brown scrim for use over any future project photography, keeping overlaid text readable while staying inside the palette rather than defaulting to plain black.

Exact hex values should be reconfirmed against the vector logo file before development, per the brand brief.

## Typography

Headlines use Baloo 2, a rounded, confident sans that echoes the bold, cupped shape of the "8&" mark in the logo — this is the one place the brand gets to feel a little playful. Weights stay in the 600–700 range rather than the heaviest cut, so headlines feel warm and assured rather than shouty. Letter spacing stays close to neutral (only slightly tight at the largest display size) since rounded typefaces lose their friendliness when tracked too tight.

Body and interface text use Inter, a clean, modern, highly legible sans that stays out of the way of the message — appropriate for an audience that ranges from district officials to funders reading detailed climate-finance explainers. Labels use a modest medium weight for UI text, with `label-sm` reserved for small tracked microcopy such as form field labels or metadata, used lightly rather than as a dominant design motif.

## Layout & Spacing

The site is built around a boxed, left-aligned content column rather than a full-bleed cinematic layout — this is a working information site with a lot of plain-language explanation to deliver, not a single-message manifesto. Sections stack vertically with clear, generous breathing room, and alternate between the neutral background and surface or accent-deep backgrounds to create rhythm as the page moves from mission, to approach, to current status, to call-to-action.

Use the spacing scale in clear steps: `8px`, `16px`, `32px`, `48px`, and `80px`. Tight spacing holds together small clusters like a label and its icon; the larger steps separate major page sections so each part of the story — story, approach, values, current status — gets room to be read as its own idea.

## Elevation & Depth

Depth stays gentle and tonal. Cards separate from the page through a warm border and a slight background shift (surface white against the off-white page) rather than heavy shadow, keeping the interface calm and legible on both mobile and desktop. Once project photography exists, the Carbon Brown overlay is the preferred way to keep text readable over an image rather than reaching for a plain black scrim.

## Shapes

Cards and panels are flat — sharp `0px` corners with a `1px` warm-tan border for structure. Only buttons, inputs, and chips keep rounded corners (buttons `12px`, inputs `8px`, chips fully round). Never add rounding to a card surface.

## Components

**Buttons**

- `button-primary` is the main call to action — Ember Orange fill with white text, `12px` radius, comfortable padding. Used once per section as the clear next step (Get in touch, Partner with us).
- `button-secondary` is an outlined action in Carbon Brown — used for a supporting action alongside a primary button, such as "Learn about our approach."
- `button-tertiary` is text-only, set in Ember Orange, used for low-emphasis inline links and secondary navigation.
- Keep button height around `52px` with a minimum width near `160px` so labels have room, especially for longer CTAs like "Register interest."
- Hover states darken the fill or deepen the border slightly — no shadow or motion effects.

**Cards**

- Cards are flat, sharp-edged surfaces: `1px` warm-tan border, `0px` radius, `24px` padding.
- Use cards for the principle/approach blocks, project category placeholders, and team member slots — each should be built to hold a photo, heading, and short copy so it's ready for real content later.
- Keep card copy concise; these are entry points into a topic, not the full explanation.

**Inputs**

- Inputs sit on a white surface with a warm-tan border and `8px` rounding, matching the calm, structured feel of the rest of the system.
- Use clear focus states (a Carbon Brown or Ember Orange outline) rather than fill changes, and keep padding generous so the contact form feels easy to use on a phone.

**Chips and labels**

- Chips use the Growth Green fill with white text and full rounding — suited to project-category tags (Afforestation, Forest Restoration) and audience tags ("I am a…" community / partner / funder).
- Reserve `label-sm` tracked microcopy for small structural labels (form fields, section eyebrows used sparingly), not as a decorative motif repeated on every section.

**Navigation**

- The top nav sits on the warm off-white background with Carbon Brown text — light and legible without needing a dark bar.
- The primary CTA (Get in touch / Partner with us) is the one filled, high-visibility control in the nav; everything else stays text-based.

## Do's and Don'ts

- Do keep the palette warm and earthy — brown, ember orange, and growth green — and let the off-white background carry most of the page.
- Do use Baloo 2 for headlines and Inter for everything functional, keeping the rounded headline voice as the brand's one distinctive flourish.
- Do build every content block (cards, team slots, project categories) as a template ready to receive real photos and copy later, without redesign.
- Do use honest, forward-looking language in placeholder sections instead of invented numbers or testimonials.
- Don't introduce shadows, gradients, or glossy effects — depth comes from borders and tonal surface shifts only.
- Don't let Ember Orange dominate; it's an accent for action and emphasis, not a background color.
- Don't mix rounded corners into cards or panels — flat surfaces only; rounding lives on buttons, inputs, and chips.
- Don't crowd sections with too many competing calls to action — one clear primary CTA per section.
