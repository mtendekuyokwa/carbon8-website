import { render, screen } from "@testing-library/react";

import { MissionSection } from "~/features/home/components/mission-section";

describe("MissionSection", () => {
  it("renders eyebrow, heading, intro and three pillars", () => {
    const { container } = render(<MissionSection />);

    expect(screen.getByText("Carbon8 — Our Mission")).toBeInTheDocument();
    expect(
      container.querySelector("#home-mission-heading"),
    ).toHaveTextContent("Our mission in Malawi");
    expect(screen.getByText("Community-led")).toBeInTheDocument();
    expect(screen.getByText("Plain-language finance")).toBeInTheDocument();
    expect(screen.getByText("Early and open")).toBeInTheDocument();
  });

  it("renders as text-first editorial list with no images", () => {
    render(<MissionSection />);
    expect(screen.queryAllByRole("img")).toHaveLength(0);
    expect(screen.getByRole("list") ?? screen.getByText("Community-led")).toBeTruthy();
  });
});
