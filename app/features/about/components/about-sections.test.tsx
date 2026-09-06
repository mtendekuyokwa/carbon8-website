import { render, screen } from "@testing-library/react";

import { ApproachSection } from "~/features/about/components/approach-section";
import { GeoaiSection } from "~/features/about/components/geoai-section";
import { StorySection } from "~/features/about/components/story-section";
import { ValuesSection } from "~/features/about/components/values-section";

describe("About sections", () => {
  it("renders story, approach, GeoAI support framing, and values", () => {
    const { container } = render(
      <>
        <StorySection />
        <ApproachSection />
        <GeoaiSection />
        <ValuesSection />
      </>,
    );

    expect(
      container.querySelector("#about-story-heading"),
    ).toHaveTextContent("Climate action led by communities");
    expect(
      container.querySelector("#about-approach-heading"),
    ).toHaveTextContent("community-first");
    expect(
      container.querySelector("#about-geoai-heading"),
    ).toHaveTextContent("never replaces them");
    expect(screen.getByText("Map with communities")).toBeInTheDocument();
    expect(
      container.querySelector("#about-values-heading"),
    ).toHaveTextContent("What guides us");
  });

  it("contains no invented stats or testimonials", () => {
    const { container } = render(<GeoaiSection />);
    expect(container.textContent).not.toMatch(/\d+%|\$\d+/);
    expect(container.textContent).toMatch(/in development|support/i);
  });
});
