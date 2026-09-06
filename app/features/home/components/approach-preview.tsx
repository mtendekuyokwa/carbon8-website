import { PrincipleCard } from "~/components/principle-card";

export function ApproachPreview() {
  return (
    <section aria-labelledby="home-approach-heading">
      <h2
        id="home-approach-heading"
        className="font-heading text-3xl font-bold text-[#4A362E]"
      >
        Our approach
      </h2>
      <p className="mt-2 max-w-prose text-base leading-7 text-[#4A362E]">
        We are building a community-first way of developing projects, designed
        to be open about what stage every idea is at.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <PrincipleCard
          title="Community first"
          description="We are developing projects alongside chiefs, cooperatives, and farmer groups."
        />
        <PrincipleCard
          title="Honest finance"
          description="We explain climate finance in plain language so partners know what to expect."
        />
        <PrincipleCard
          title="Early concepts"
          description="Our first project ideas are concepts in development, shared openly as they take shape."
        />
      </div>
    </section>
  );
}
