import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";

import { EnquiryCards } from "~/features/contact/components/enquiry-cards";
import type { EnquiryTopic } from "~/features/contact/components/enquiry-cards";

type Errors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

function validate(fields: {
  name: string;
  email: string;
  message: string;
  consent: boolean;
}): Errors {
  const errors: Errors = {};
  if (fields.name.trim().length < 2) errors.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
    errors.email = "Enter a valid email address.";
  if (fields.message.trim().length < 10)
    errors.message = "Give us a little more detail (10+ characters).";
  if (!fields.consent)
    errors.consent = "Please accept the privacy note so we can reply.";
  return errors;
}

const inputClass =
  "w-full rounded-2xl border border-foreground/15 bg-white px-5 py-3 text-lg text-bark placeholder:text-muted-foreground/70 focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/40";

export function ContactSection() {
  const [topic, setTopic] = useState<EnquiryTopic>("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate({ name, email, message, consent });
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  }

  if (sent) {
    return (
      <section
        className="bg-cream px-4 py-12 text-bark sm:px-8 sm:py-20 md:px-12"
        aria-labelledby="contact-form-heading"
      >
        <div
          role="status"
          className="mx-auto max-w-2xl rounded-3xl border border-foreground/15 bg-white p-6 text-center sm:p-10"
        >
          <p className="text-base tracking-[0.2em] uppercase text-muted-foreground">
            Message noted
          </p>
          <h2
            id="contact-form-heading"
            className="mt-3 text-3xl font-semibold"
          >
            Thanks{name.trim() ? `, ${name.trim()}` : ""} — we&apos;ve got it.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg leading-6 text-muted-foreground">
            Online sending opens soon while we&apos;re in development. For now
            your note is validated and ready — please reach out again once the
            inbox launches.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="bg-cream px-4 py-12 text-bark sm:px-8 sm:py-20 md:px-12"
      aria-labelledby="contact-form-heading"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <h2 id="contact-form-heading" className="text-3xl font-semibold">
            What&apos;s your message about?
          </h2>
          <p className="mt-3 max-w-md text-lg leading-6 text-muted-foreground">
            Choose a path — the form adapts its hint to match. Life is better
            when we shape projects together.
          </p>
          <div className="mt-8">
            <EnquiryCards value={topic} onChange={setTopic} />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl border border-foreground/15 bg-white p-6 sm:p-8"
        >
          <div className="grid gap-5">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-lg font-medium">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className={inputClass}
              />
              {errors.name ? (
                <p id="contact-name-error" role="alert" className="mt-2 text-base text-red-700">
                  {errors.name}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-lg font-medium">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.org"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                className={inputClass}
              />
              {errors.email ? (
                <p id="contact-email-error" role="alert" className="mt-2 text-base text-red-700">
                  {errors.email}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block text-lg font-medium">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={
                  topic === "partner"
                    ? "Tell us about your organisation and the pilot you have in mind…"
                    : topic === "volunteer"
                      ? "Tell us your skills and availability…"
                      : topic === "community"
                        ? "Tell us about your community and the idea you want to explore…"
                        : "How can we help?"
                }
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={inputClass}
              />
              {errors.message ? (
                <p id="contact-message-error" role="alert" className="mt-2 text-base text-red-700">
                  {errors.message}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="contact-consent" className="flex cursor-pointer items-start gap-3 text-lg">
                <input
                  id="contact-consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  aria-describedby={errors.consent ? "contact-consent-error" : undefined}
                  className="mt-1.5 h-5 w-5 accent-ember-deep"
                />
                I understand Carbon8 is in development and my note will be used
                only to reply.
              </label>
              {errors.consent ? (
                <p id="contact-consent-error" role="alert" className="mt-2 text-base text-red-700">
                  {errors.consent}
                </p>
              ) : null}
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-3 rounded-full bg-ember-deep py-2 pr-2 pl-6 text-lg font-medium text-white transition hover:bg-ember-deep/90"
            >
              Send message
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bark text-white">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </button>
            <p className="text-base text-muted-foreground">
              Concept-stage form — validation runs in your browser, online
              sending opens soon.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
