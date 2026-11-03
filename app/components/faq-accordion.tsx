import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { cn } from "~/lib/utils";

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQAccordionProps = {
  items: readonly FAQItem[];
  className?: string;
};

/**
 * Plain-language FAQ list: large questions, an ember plus that turns into a
 * cross when open. Shared by Climate Finance (and Contact later).
 */
export function FAQAccordion({ items, className }: FAQAccordionProps) {
  return (
    <Accordion
      className={cn("rounded-none border-0 border-t border-bark/15", className)}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.question}
          value={item.question}
          className="border-b border-bark/15 data-open:bg-transparent"
        >
          <AccordionTrigger className="min-h-12 items-center gap-5 px-0 py-6 text-xl leading-snug font-semibold text-bark hover:no-underline focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-4 focus-visible:ring-offset-cream **:data-[slot=accordion-trigger-icon]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="relative ml-auto size-9 shrink-0 rounded-full border-2 border-ember transition-transform duration-300 group-aria-expanded/accordion-trigger:rotate-45 group-aria-expanded/accordion-trigger:bg-ember"
            >
              <span className="absolute top-1/2 left-1/2 h-0.5 w-3.5 -translate-1/2 rounded-full bg-ember group-aria-expanded/accordion-trigger:bg-white" />
              <span className="absolute top-1/2 left-1/2 h-3.5 w-0.5 -translate-1/2 rounded-full bg-ember group-aria-expanded/accordion-trigger:bg-white" />
            </span>
          </AccordionTrigger>
          <AccordionContent className="max-w-xl pr-12 pb-7 text-lg leading-relaxed text-bark/75">
            <p>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
