import { render, screen } from "@testing-library/react";
import { BlogCard } from "~/features/blog/components/blog-card";

jest.mock("react-router", () => ({
  Link: ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => <a href={to}>{children}</a>,
}));

describe("BlogCard", () => {
  it("renders title, date, and link to the article", () => {
    render(
      <BlogCard
        post={{
          slug: "building-in-the-open",
          title: "Building in the open",
          description: "How we share learning notes.",
          date: "2026-08-20",
          status: "concept",
        }}
      />,
    );
    expect(screen.getByText("Building in the open")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Building in the open" });
    expect(link).toHaveAttribute("href", "/blog/building-in-the-open");
  });
});
