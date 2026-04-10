import type { Metadata } from 'next';
import { ProjectGrid } from '@/components/projects/ProjectGrid';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A curated collection of web, freelance, cybersecurity, and AI projects by Karim Abboud.',
};

export default function ProjectsPage() {
  return (
    <div className="section-spacing pt-32">
      <div className="section-container">
        <div className="mb-12">
          <div className="w-8 h-px bg-accent mb-5" />
          <p className="text-xs tracking-[0.2em] uppercase text-accent font-medium mb-3">
            Work
          </p>
          <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] tracking-tighter font-semibold leading-[0.95] mb-4">
            Projects
          </h1>
          <p className="text-base text-[hsl(var(--muted))] leading-relaxed max-w-[55ch]">
            A selection of personal, freelance, and academic work spanning
            frontend engineering, cybersecurity, and AI.
          </p>
        </div>
        <ProjectGrid />
      </div>
    </div>
  );
}
