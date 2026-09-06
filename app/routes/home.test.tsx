import { render, screen } from "@testing-library/react";

import Home from "~/routes/home";

describe("Home route", () => {
  it("renders hero, approach, and team sections in order", () => {
    const { container } = render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: "Climate Action Led by Communities",
      }),
    ).toBeInTheDocument();
    expect(
      container.querySelector("#home-team-heading"),
    ).toHaveTextContent("Meet the Team");
    expect(
      screen.getByRole("heading", { name: "How Our Approach Works" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /Get in Touch/ }).length,
    ).toBeGreaterThan(0);

    const headings = Array.from(
      container.querySelectorAll("h1, h2"),
    ).map((el) => el.textContent?.replace(/\s+/g, " ").trim());
    const approachIdx = headings.findIndex((t) =>
      t?.includes("How Our Approach"),
    );
    const teamIdx = headings.findIndex((t) => t?.includes("Meet the Team"));
    expect(approachIdx).toBeGreaterThanOrEqual(0);
    expect(teamIdx).toBeGreaterThanOrEqual(0);
    expect(approachIdx).toBeLessThan(teamIdx);
  });
});
