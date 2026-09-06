import { fireEvent, render, screen } from "@testing-library/react";

import { TeamSection } from "~/features/home/components/team-section";

describe("TeamSection", () => {
  it("renders heading and carousel cards", () => {
    const { container } = render(<TeamSection />);

    expect(
      container.querySelector("#home-team-heading"),
    ).toHaveTextContent("Get to Know the Work");
    expect(
      screen.getByText("Community-led from the start"),
    ).toBeInTheDocument();
  });

  it("reveals carousel controls on hover", async () => {
    const { container } = render(<TeamSection />);
    const carousel = container.querySelector("section > div:last-child > div");
    if (!carousel) throw new Error("carousel wrapper not found");

    fireEvent.mouseEnter(carousel);

    expect(
      await screen.findByRole("button", { name: "Next" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Previous" }),
    ).toBeInTheDocument();
  });
});
