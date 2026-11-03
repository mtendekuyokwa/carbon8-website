import { CreditPathSection } from "~/features/climate-finance/components/credit-path-section";
import { FinanceFaqSection } from "~/features/climate-finance/components/finance-faq-section";
import { FinanceHeroSection } from "~/features/climate-finance/components/finance-hero-section";

export function meta() {
  return [
    { title: "Climate Finance — Carbon8" },
    {
      name: "description",
      content:
        "Climate finance and carbon markets explained in plain language by Carbon8 Malawi, a community-first climate organisation at concept stage.",
    },
  ];
}

export default function ClimateFinance() {
  return (
    <main>
      <FinanceHeroSection />
      <CreditPathSection />
      <FinanceFaqSection />
    </main>
  );
}
