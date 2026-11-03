import { render, screen } from "@testing-library/react";
import { BlogCard } from "~/features/blog/components/blog-card";

jest.mock("react-router", () => ({
  Link: ({
    to,
    children,
    ...rest
  }: {
    to: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));

const POST = {
  slug: "building-in-the-open",
  title: "Building in the open",
  description: "How we share learning notes.",
  date: "2026-08-20",
  status: "concept" as const,
  tags: ["Community", "Malawi"],
  author: "Tawina",
  authorRole: "Co-founder, Community Lead",
  authorImage: "/assets/tawina.jpg",
};

describe("BlogCard", () => {
  it("renders title, date, and link to the article", () => {
    render(<BlogCard index={0} post={POST} />);
    expect(screen.getByText("Building in the open")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Building in the open" });
    expect(link).toHaveAttribute("href", "/blog/building-in-the-open");
  });

  it("shows a journal-style date, topic, and author byline", () => {
    const { container } = render(<BlogCard index={1} post={POST} />);
    const time = container.querySelector("time");
    expect(time).toHaveAttribute("dateTime", "2026-08-20");
    expect(time).toHaveTextContent("20");
    expect(time).toHaveTextContent("Aug 2026");
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("Tawina")).toBeInTheDocument();
    expect(container.querySelector('img[src="/assets/tawina-128.jpg"]')).not.toBeNull();
  });

  it("is a single link target with no raw ISO date or hashtags", () => {
    const { container } = render(<BlogCard index={0} post={POST} variant="lead" />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByText("20 August 2026")).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/2026-08-20|#/);
  });
});
