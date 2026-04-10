'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useMotion } from '@/components/providers/MotionProvider';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { reducedMotion } = useMotion();

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion) return;
    const el = e.currentTarget;
    el.style.willChange = 'transform';
    gsap.to(el, { y: -4, scale: 1.01, duration: 0.3, ease: 'power2.out' });
    gsap.to(el.querySelector('[data-card="shine"]'), { autoAlpha: 0.06, duration: 0.3 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion) return;
    const el = e.currentTarget;
    gsap.to(el, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => { el.style.willChange = 'auto'; },
    });
    gsap.to(el.querySelector('[data-card="shine"]'), { autoAlpha: 0, duration: 0.3 });
  };

  return (
    <Link
      ref={cardRef}
      href={`/projects/${project.slug}`}
      className="group relative block rounded-2xl border border-border/50 bg-surface p-6 transition-colors duration-200 hover:border-accent/30"
      style={{ opacity: reducedMotion ? 1 : undefined }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shine overlay */}
      <div
        data-card="shine"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent invisible opacity-0"
      />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Category badge */}
        <span className="self-start text-xs font-mono tracking-wider uppercase text-accent/80 px-2 py-1 rounded-md bg-accent/5 border border-accent/10">
          {project.category}
        </span>

        <h3 className="text-xl font-semibold tracking-tight group-hover:text-accent transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-sm text-muted leading-relaxed line-clamp-3">
          {project.summary}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-xs font-mono text-muted px-2 py-0.5 rounded border border-border/50"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-xs font-mono text-muted">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Public/Private indicator */}
        <div className="flex items-center gap-2 text-xs text-muted">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              project.isPublic ? 'bg-emerald-400' : 'bg-zinc-500'
            }`}
          />
          {project.isPublic ? 'Open Source' : 'Private'}
        </div>
      </div>
    </Link>
  );
}
