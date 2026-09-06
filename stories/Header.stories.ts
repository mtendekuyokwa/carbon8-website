import type { Meta, StoryObj } from "@storybook/react-vite";
import { createElement } from "react";
import { DualCTA } from "~/components/dual-cta";
import { PrincipleCard } from "~/components/principle-card";
import { CTASection } from "~/components/layout/cta-section";

const meta = {
  title: "Molecules/DualCTA",
  component: DualCTA,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof DualCTA>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeroVariant: Story = {
  args: {
    primaryLabel: "Get in Touch",
    primaryHref: "mailto:openbasedigital@gmail.com",
    secondaryLabel: "Contribute",
    secondaryHref: "/contribute",
  },
};

export const FooterVariant: Story = {
  args: {
    primaryLabel: "Get in touch",
    primaryHref: "/contact",
    secondaryLabel: "Contribute",
    secondaryHref: "/contact",
  },
};

// Sibling molecules (.ts so createElement, no JSX); real components only.
export const Card: StoryObj = {
  render: () =>
    createElement(
      "div",
      { style: { maxWidth: 480 } },
      createElement(PrincipleCard, {
        title: "Community first",
        description:
          "Chiefs, cooperatives, and farmer groups shape every project from day one.",
      }),
    ),
};

export const CTAPanel: StoryObj = {
  render: () =>
    createElement(
      "div",
      { style: { maxWidth: 640 } },
      createElement(CTASection, {
        heading: "Partner with Carbon8",
        body: "Concept-stage organisation — register interest and help shape the first pilots.",
        primaryLabel: "Get in touch",
        primaryHref: "/contact",
        secondaryLabel: "Learn about our approach",
        secondaryHref: "/about",
      }),
    ),
};
