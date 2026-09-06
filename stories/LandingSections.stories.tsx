import type { Meta, StoryObj } from "@storybook/react-vite";
import { SiteFooter } from "~/components/layout/site-footer";
import { SiteHeader } from "~/components/layout/site-header";
import { BenefitsSection } from "~/features/home/components/benefits-section";
import { HeroSection } from "~/features/home/components/hero-section";
import { ManifestoSection } from "~/features/home/components/manifesto-section";
import { MissionSection } from "~/features/home/components/mission-section";
import { TeamSection } from "~/features/home/components/team-section";

// Template: the landing page composed from organisms, mirroring
// app/routes/home.tsx inside the root layout (header + footer).
// No copies — every piece is the real production component.

function LandingTemplate() {
  return (
    <div>
      <SiteHeader />
      <main>
        <HeroSection />
        <MissionSection />
        <ManifestoSection />
        <BenefitsSection />
        <TeamSection />
      </main>
      <SiteFooter />
    </div>
  );
}

const meta = {
  title: "Templates/LandingPage",
  component: LandingTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof LandingTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
