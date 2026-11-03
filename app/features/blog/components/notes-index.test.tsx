import { fireEvent, render, screen, within } from "@testing-library/react";

import { NotesIndex } from "~/features/blog/components/notes-index";
import type { BlogPostMeta } from "~/lib/blog.server";

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

const POSTS: BlogPostMeta[] = [
  {
    slug: "newest",
    title: "Newest note",
    description: "Newest description.",
    date: "2026-09-04",
    tags: ["Community"],
  },
  {
    slug: "finance",
    title: "Finance note",
    description: "Finance description.",
    date: "2026-09-03",
    tags: ["Climate finance"],
    author: "Patrick Kuyokwa",
    authorRole: "Co-founder, GeoAI Lead",
    authorImage: "/assets/patrick.jpg",
  },
];

function list() {
  return screen.getByRole("list", { name: "Field notes" });
}

describe("NotesIndex", () => {
  it("lists every note as a link with a readable date", () => {
    render(<NotesIndex posts={POSTS} />);
    expect(within(list()).getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Finance note" })).toHaveAttribute(
      "href",
      "/blog/finance",
    );
    expect(screen.getByText("3 Sept 2026")).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/2026-09-03/);
  });

  it("filters by topic with real counts", () => {
    render(<NotesIndex posts={POSTS} />);
    const finance = screen.getByRole("button", { name: /Climate finance 1/ });
    expect(screen.getByRole("button", { name: /All notes 2/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    fireEvent.click(finance);

    expect(finance).toHaveAttribute("aria-pressed", "true");
    expect(within(list()).getAllByRole("listitem")).toHaveLength(1);
    expect(screen.queryByRole("link", { name: "Newest note" })).not.toBeInTheDocument();
  });

  it("previews the note being hovered or focused", () => {
    const { container } = render(<NotesIndex posts={POSTS} />);
    const preview = container.querySelector("aside")!;
    expect(preview).toHaveTextContent("Newest description.");

    fireEvent.focus(screen.getByRole("link", { name: "Finance note" }));

    expect(preview).toHaveTextContent("Finance description.");
    expect(preview).toHaveTextContent("Patrick Kuyokwa");
  });

  it("hides topics that have no notes", () => {
    render(<NotesIndex posts={POSTS} />);
    expect(screen.queryByRole("button", { name: /GeoAI/ })).not.toBeInTheDocument();
  });
});
