'use client';

import Link from 'next/link';
import { gsap } from 'gsap';
import { useMotion } from '@/components/providers/MotionProvider';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  /** Heading level for the title, so the page outline stays sequential. */
  headingLevel?: 2 | 3;
}

const actionClass =
  'relative z-20 inline-flex items-center gap-1 text-sm font-medium text-accent underline-offset-4 hover:underline';

export function ProjectCard({ project, headingLevel = 3 }: ProjectCardProps) {
  const { reducedMotion } = useMotion();
  const Heading = `h${headingLevel}` as const;

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const el = e.currentTarget;
    el.style.willChange = 'transform';
    gsap.to(el, { y: -4, scale: 1.01, duration: 0.3, ease: 'power2.out' });
    gsap.to(el.querySelector('[data-card="shine"]'), { autoAlpha: 0.06, duration: 0.3 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const el = e.currentTarget;
    gsap.to(el, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        el.style.willChange = 'auto';
      },
    });
    gsap.to(el.querySelector('[data-card="shine"]'), { autoAlpha: 0, duration: 0.3 });
  };

  return (
    <article
      className="group relative h-full rounded-2xl border border-border/50 bg-surface p-6 transition-colors duration-200 hover:border-accent/30 focus-within:border-accent/50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        data-card="shine"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent invisible opacity-0"
      />

      <div className="relative z-10 flex h-full flex-col gap-4">
        <span className="self-start text-xs font-mono tracking-wider uppercase text-accent px-2 py-1 rounded-md bg-accent/5 border border-accent/10">
          {project.category}
        </span>

        <Heading className="text-xl font-semibold tracking-tight group-hover:text-accent transition-colors duration-200">
          {/* Stretched link: the whole card opens the project page */}
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:z-10 after:rounded-2xl"
          >
            {project.title}
          </Link>
        </Heading>

        <p className="text-sm text-muted leading-relaxed">{project.summary}</p>

        {/* Full tech stack, never truncated */}
        <ul className="flex flex-wrap gap-2 mt-auto pt-2" aria-label="Tech stack">
          {project.tech.map((t) => (
            <li
              key={t}
              className="text-xs font-mono text-muted px-2 py-0.5 rounded border border-border/50"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={actionClass}
            >
              Live site<span className="sr-only"> for {project.title} (opens in new tab)</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={actionClass}
            >
              GitHub<span className="sr-only"> repo for {project.title} (opens in new tab)</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.backendRepoUrl && (
            <a
              href={project.backendRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={actionClass}
            >
              Backend<span className="sr-only"> repo for {project.title} (opens in new tab)</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-muted">
          <span
            aria-hidden="true"
            className={`w-1.5 h-1.5 rounded-full ${
              project.isPublic ? 'bg-emerald-400' : 'bg-zinc-500'
            }`}
          />
          {project.isPublic ? 'Open Source' : 'Private'}
        </div>
      </div>
    </article>
  );
}
