import { ContactHero } from "~/features/contact/components/contact-hero";
import { ContactSection } from "~/features/contact/components/contact-form";

export function meta() {
  return [
    { title: "Contact — Carbon8" },
    {
      name: "description",
      content:
        "Get connected with Carbon8 Malawi: partner, volunteer, bring a community project idea, or send a general enquiry.",
    },
  ];
}

export default function Contact() {
  return (
    <main>
      <ContactHero />
      <ContactSection />
    </main>
  );
}
