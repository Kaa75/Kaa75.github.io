import { experience } from '@/data/experience';

export function ExperienceSection() {
  const items = experience.filter((e) => e.featured);

  return (
    <section aria-labelledby="experience-heading" className="section-spacing">
      <div className="section-container max-w-4xl">
        <div className="w-8 h-px bg-accent mb-4" />
        <p className="text-xs tracking-[0.2em] uppercase text-accent font-medium mb-3">
          Experience
        </p>
        <h2
          id="experience-heading"
          className="text-3xl md:text-5xl tracking-tighter font-semibold mb-12"
        >
          Where I&apos;ve worked
        </h2>

        <ol className="space-y-10">
          {items.map((job) => (
            <li
              key={`${job.company}-${job.date}`}
              className="pl-6 border-l-2 border-accent/30 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="text-lg font-semibold">
                  {job.title} <span className="text-muted font-normal">· {job.company}</span>
                </h3>
                <span className="text-sm font-mono text-muted shrink-0">{job.date}</span>
              </div>
              <p className="text-xs font-mono text-accent">{job.tech}</p>
              <ul className="space-y-1.5 text-sm text-muted leading-relaxed list-disc pl-4 marker:text-accent/50">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
