import { render, screen } from "@testing-library/react";

import { TeamSection } from "~/features/home/components/team-section";

describe("TeamSection", () => {
  it("renders heading and carousel cards", () => {
    const { container } = render(<TeamSection />);

    expect(
      container.querySelector("#home-team-heading"),
    ).toHaveTextContent("Meet the Team");
    expect(screen.getByText("Patrick")).toBeInTheDocument();
    expect(screen.getByText("Tawina")).toBeInTheDocument();
  });

  it("renders team photos without carousel controls", () => {
    render(<TeamSection />);

    expect(screen.getByAltText("Patrick")).toBeInTheDocument();
    expect(screen.getByAltText("Tawina")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Next" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Previous" }),
    ).not.toBeInTheDocument();
  });
});
