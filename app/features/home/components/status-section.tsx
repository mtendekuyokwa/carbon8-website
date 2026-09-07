export function StatusSection() {
  return (
    <section
      aria-labelledby="home-status-heading"
      className="bg-deep p-6 text-white sm:p-8"
    >
      <h2
        id="home-status-heading"
        className="font-heading text-3xl font-bold text-white"
      >
        Where we are
      </h2>
      <p className="mt-2 max-w-prose text-base leading-7 text-white">
        Carbon8 is a new organisation. We are developing our first project
        concepts and will share verified updates as the work progresses.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Project stages">
        <li className="rounded-full bg-growth px-4 py-1.5 text-lg font-medium text-white">
          concept
        </li>
        <li className="rounded-full bg-growth px-4 py-1.5 text-lg font-medium text-white">
          in_development
        </li>
      </ul>
    </section>
  );
}
