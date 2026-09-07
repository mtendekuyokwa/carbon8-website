import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { TagChip } from "~/components/tag-chip";
import { CTASection } from "~/components/layout/cta-section";
import { BlogCard } from "~/features/blog/components/blog-card";

const samplePost = {
  slug: "building-in-the-open",
  title: "Building in the open: our blog",
  description:
    "How we will share learning notes as Carbon8 grows from concept to pilot.",
  date: "2026-08-20",
  tags: ["community", "meta"],
  status: "concept" as const,
};

function WithRouter({ children }: { children: React.ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

const meta = {
  title: "Organisms/Blog",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const TagChips: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <TagChip label="community" tone="green" />
      <TagChip label="#meta" tone="sand" />
      <div className="bg-[#4A362E] p-4">
        <TagChip label="community" tone="glass" />
      </div>
    </div>
  ),
};

export const CardDefault: Story = {
  render: () => (
    <WithRouter>
      <BlogCard post={samplePost} index={0} />
    </WithRouter>
  ),
};

export const CardSecond: Story = {
  render: () => (
    <WithRouter>
      <BlogCard
        post={{ ...samplePost, slug: "climate-finance-plain-language" }}
        index={1}
      />
    </WithRouter>
  ),
};

export const BlogCTA: Story = {
  render: () => (
    <CTASection
      heading="Questions about community-first climate action?"
      body="We share plain-language explainers and project updates as they happen."
      primaryLabel="Get in touch →"
      primaryHref="mailto:openbasedigital@gmail.com"
    />
  ),
};
