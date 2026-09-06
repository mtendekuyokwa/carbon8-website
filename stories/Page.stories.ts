import type { Meta, StoryObj } from "@storybook/react-vite";
import { createElement } from "react";
import { SiteFooter } from "~/components/layout/site-footer";
import { SiteHeader } from "~/components/layout/site-header";
import { ApproachPreview } from "~/features/home/components/approach-preview";
import { BenefitsSection } from "~/features/home/components/benefits-section";
import { HeroSection } from "~/features/home/components/hero-section";
import { ManifestoSection } from "~/features/home/components/manifesto-section";
import { MissionSection } from "~/features/home/components/mission-section";
import { StatusSection } from "~/features/home/components/status-section";
import { TeamSection } from "~/features/home/components/team-section";

// .ts extension (repo constraint) so JSX is expressed via createElement.
// Every story still renders the REAL production component — no copies.

function padded(child: React.ReactNode) {
  return createElement(
    "div",
    { style: { background: "#F4F1EC", padding: 24 } },
    child,
  );
}

const meta = {
  title: "Organisms/Sections",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Header: Story = { render: () => createElement(SiteHeader) };
export const Hero: Story = { render: () => createElement(HeroSection) };
export const Mission: Story = { render: () => createElement(MissionSection) };
export const Manifesto: Story = {
  render: () => createElement(ManifestoSection),
};
export const Benefits: Story = {
  render: () => createElement(BenefitsSection),
};
export const Team: Story = { render: () => createElement(TeamSection) };
export const Approach: Story = {
  render: () => padded(createElement(ApproachPreview)),
};
export const Status: Story = {
  render: () => padded(createElement(StatusSection)),
};
export const Footer: Story = { render: () => createElement(SiteFooter) };
