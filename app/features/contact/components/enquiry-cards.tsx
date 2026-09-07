import { Handshake, Heart, Sprout, Mail } from "lucide-react";

import { cn } from "~/lib/utils";

export const ENQUIRY_TOPICS = [
  {
    value: "partner",
    label: "Partner with us",
    description: "Civic, funder, or technical partner exploring a pilot together.",
    Icon: Handshake,
  },
  {
    value: "volunteer",
    label: "Volunteer",
    description: "Offer time or skills — field, design, tech, or storytelling.",
    Icon: Heart,
  },
  {
    value: "community",
    label: "Community project",
    description: "Bring an early cookstove, forest, or livelihood idea to us.",
    Icon: Sprout,
  },
  {
    value: "general",
    label: "General enquiry",
    description: "Anything else — press, learning, or just saying hello.",
    Icon: Mail,
  },
] as const;

export type EnquiryTopic = (typeof ENQUIRY_TOPICS)[number]["value"];

export function EnquiryCards({
  value,
  onChange,
}: {
  value: EnquiryTopic;
  onChange: (next: EnquiryTopic) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="What is your message about?"
      className="grid gap-4 sm:grid-cols-2"
    >
      {ENQUIRY_TOPICS.map(({ value: topic, label, description, Icon }) => {
        const selected = topic === value;
        return (
          <button
            key={topic}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(topic)}
            className={cn(
              "rounded-none border p-6 text-left transition",
              selected
                ? "border-ember bg-ember/10 shadow-sm"
                : "border-foreground/15 bg-white hover:border-ember/60",
            )}
          >
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                selected ? "bg-ember-deep text-white" : "bg-bark text-cream",
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="mt-4 block text-xl font-semibold">{label}</span>
            <span className="mt-1 block text-lg leading-6 text-muted-foreground">
              {description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
