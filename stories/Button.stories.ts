import type { Meta, StoryObj } from "@storybook/react-vite";
import { createElement } from "react";
import { BrandLogo } from "~/components/brand-logo";
import { Eyebrow } from "~/components/eyebrow";
import { Button } from "~/components/ui/button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "destructive", "link"],
    },
    size: { control: "select", options: ["default", "xs", "sm", "lg"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { children: "Get in touch" } };
export const Secondary: Story = {
  args: { variant: "secondary", children: "Partner with us" },
};
export const Outline: Story = {
  args: { variant: "outline", children: "Learn about our approach" },
};
export const TertiaryLink: Story = {
  args: { variant: "link", children: "Register interest" },
};

// Sibling atoms in the same catalogue file (.ts so createElement, no JSX);
// each still renders its real production component.
export const EyebrowMuted: Story = {
  render: () =>
    createElement(Eyebrow, { withRule: true }, "Carbon8 — Our Mission"),
};
export const EyebrowLight: Story = {
  render: () =>
    createElement(
      "span",
      { style: { background: "#4F5A2A", padding: 16, display: "inline-block" } },
      createElement(
        Eyebrow,
        {
          tone: "faint-light",
        },
        "Manifesto",
      ),
    ),
};
export const LogoDark: Story = {
  render: () => createElement(BrandLogo, { variant: "dark" }),
};
export const LogoLight: Story = {
  render: () =>
    createElement(
      "span",
      { style: { background: "#4A362E", padding: 12, display: "inline-block" } },
      createElement(BrandLogo, { variant: "light" }),
    ),
};
