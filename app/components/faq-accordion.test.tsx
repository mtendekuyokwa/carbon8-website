import { fireEvent, render, screen } from "@testing-library/react";

import { FAQAccordion } from "~/components/faq-accordion";

const ITEMS = [
  { question: "First question?", answer: "First answer." },
  { question: "Second question?", answer: "Second answer." },
] as const;

describe("FAQAccordion", () => {
  it("renders every question as a collapsed button", () => {
    render(<FAQAccordion items={ITEMS} />);
    for (const item of ITEMS) {
      expect(
        screen.getByRole("button", { name: item.question }),
      ).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("expands an answer when its question is clicked", () => {
    render(<FAQAccordion items={ITEMS} />);
    const trigger = screen.getByRole("button", { name: "First question?" });

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("First answer.")).toBeVisible();
  });
});
