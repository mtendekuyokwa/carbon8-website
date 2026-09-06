import { render, screen } from "@testing-library/react";

import Home from "~/routes/home";

describe("Home route", () => {
  it("renders hero, team, and benefits sections", () => {
    const { container } = render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: "Climate Action Led by Communities",
      }),
    ).toBeInTheDocument();
    expect(
      container.querySelector("#home-team-heading"),
    ).toHaveTextContent("Get to Know the Work");
    expect(
      screen.getByRole("heading", { name: "Community-first" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /Get in Touch/ }).length,
    ).toBeGreaterThan(0);
  });
});
