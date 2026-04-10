'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useMotion } from '@/components/providers/MotionProvider';
import type { Project } from '@/data/projects';
import { CaesarCipherDemo } from '@/components/demos/CaesarCipherDemo';
import { HostiviteCaseStudy } from '@/components/projects/HostiviteCaseStudy';

gsap.registerPlugin(useGSAP);

export function ProjectDetailContent({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-detail="title"]', { y: 30, autoAlpha: 0, duration: 0.7 })
        .from(
          '[data-detail="meta"]',
          { y: 20, autoAlpha: 0, duration: 0.5 },
          '-=0.4'
        )
        .from(
          '[data-detail="body"]',
          { y: 20, autoAlpha: 0, duration: 0.5 },
          '-=0.3'
        );
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  const isDemoMode =
    typeof window !== 'undefined' &&
    process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  return (
    <div ref={containerRef} className="section-spacing pt-32">
      <div className="section-container max-w-4xl">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] transition-colors duration-200 mb-8"
        >
          <span aria-hidden="true">&larr;</span>
          All Projects
        </Link>

        <h1
          data-detail="title"
          className="text-4xl md:text-5xl tracking-tighter font-semibold mb-6"
        >
          {project.title}
        </h1>

        {/* Meta row */}
        <div
          data-detail="meta"
          className="flex flex-wrap gap-6 text-sm text-[hsl(var(--muted))] mb-10 pb-8 border-b border-border/50"
        >
          <div>
            <span className="block text-xs uppercase tracking-wider mb-1">
              Role
            </span>
            <span className="text-[hsl(var(--foreground))]">{project.role}</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider mb-1">
              Category
            </span>
            <span className="text-[hsl(var(--foreground))] capitalize">
              {project.category}
            </span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider mb-1">
              Status
            </span>
            <span className="text-[hsl(var(--foreground))]">
              {project.isPublic ? 'Open Source' : 'Private'}
            </span>
          </div>
        </div>

        {/* Body */}
        <div data-detail="body" className="space-y-8">
          {/* Description */}
          <div className="prose prose-invert prose-sm max-w-none">
            {project.description.split('\n\n').map((paragraph, i) => (
              <p
                key={i}
                className="text-base text-[hsl(var(--muted))] leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tech stack */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-sm font-mono px-3 py-1 rounded-lg border border-border/50 bg-[hsl(var(--surface))] text-[hsl(var(--muted))]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-lg border border-border text-sm font-medium hover:border-accent/50 hover:text-accent transition-colors duration-200"
              >
                Frontend Repo
              </a>
            )}
            {project.backendRepoUrl && (
              <a
                href={project.backendRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-lg border border-border text-sm font-medium hover:border-accent/50 hover:text-accent transition-colors duration-200"
              >
                Backend Repo
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity duration-200"
              >
                Live Site
              </a>
            )}
          </div>

          {/* Hostivite case study */}
          {project.slug === 'hostivite' && (
            <HostiviteCaseStudy
              caseStudy={project.caseStudy || ''}
              demoData={isDemoMode ? project.demoData : undefined}
            />
          )}

          {/* Cryptography interactive demo */}
          {project.slug === 'cryptography-site' && <CaesarCipherDemo />}
        </div>
      </div>
    </div>
  );
}
