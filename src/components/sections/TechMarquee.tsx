'use client';

const TECHS = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'GSAP',
  'Three.js',
  'AWS Lambda',
  'Node.js',
  'Python',
  'PostgreSQL',
  'Docker',
  'WebGL',
  'Unity',
  'C#',
  'REST APIs',
  'Git',
];

// Dot separator between items
function Dot() {
  return (
    <span className="mx-5 w-1 h-1 rounded-full bg-accent/40 inline-block align-middle flex-shrink-0" />
  );
}

export function TechMarquee() {
  const items = [...TECHS, ...TECHS]; // duplicate for seamless loop

  return (
    <div
      className="relative overflow-hidden py-6 border-y border-border"
      aria-hidden="true"
    >
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[hsl(var(--background))] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[hsl(var(--background))] to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((tech, i) => (
          <span
            key={i}
            className="inline-flex items-center text-sm font-medium text-[hsl(var(--muted))] flex-shrink-0"
          >
            {tech}
            <Dot />
          </span>
        ))}
      </div>
    </div>
  );
}
