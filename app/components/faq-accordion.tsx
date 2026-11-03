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

/** Plain-language FAQ list. Shared by Climate Finance (and Contact later). */
export function FAQAccordion({ items, className }: FAQAccordionProps) {
  return (
    <Accordion
      className={cn("rounded-none border-sand bg-white", className)}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.question}
          value={item.question}
          className="border-sand data-open:bg-cream/60"
        >
          <AccordionTrigger className="min-h-12 px-5 py-4 text-lg leading-snug text-bark sm:px-6">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="px-1 text-base leading-7 text-bark/80 sm:px-2">
            <p>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
