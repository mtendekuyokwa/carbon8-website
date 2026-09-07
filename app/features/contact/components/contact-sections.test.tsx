import { fireEvent, render, screen } from "@testing-library/react";

import { ContactHero } from "~/features/contact/components/contact-hero";
import { ContactSection } from "~/features/contact/components/contact-form";

describe("Contact page", () => {
  it("renders hero and enquiry paths without invented contact details", () => {
    render(
      <>
        <ContactHero />
        <ContactSection />
      </>,
    );
    expect(screen.getByRole("heading", { name: /get connected/i })).toBeInTheDocument();
    expect(screen.getByRole("radiogroup", { name: /what is your message about/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /partner with us/i })).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/info@carbon8|\+265|testimonial/i);
  });

  it("shows validation errors then a success state", () => {
    render(<ContactSection />);
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Amina" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "amina@example.org" } });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Our village wants to explore a cookstove pilot." },
    });
    fireEvent.click(screen.getByLabelText(/i understand carbon8/i));
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByRole("status")).toHaveTextContent(/thanks, amina/i);
  });
});
