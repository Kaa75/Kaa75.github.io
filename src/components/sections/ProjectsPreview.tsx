'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { useMotion } from '@/components/providers/MotionProvider';
import { SplitText } from '@/components/animations/SplitText';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ProjectsPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Decorative line grows
      tl.fromTo(
        '[data-preview="line"]',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }
      )
        .from('[data-preview="label"]', { y: 10, autoAlpha: 0, duration: 0.4 }, '-=0.2')
        // SplitText owns the heading reveal — stagger cards after label
        .from(
          '[data-preview="card"]',
          { y: 50, autoAlpha: 0, duration: 0.65, stagger: 0.14 },
          '+=0.3'
        );
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  const featured = projects.slice(0, 3);

  return (
    <section ref={sectionRef} className="section-spacing">
      <div className="section-container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div data-preview="line" className="w-8 h-px bg-accent mb-4" />
            <p
              data-preview="label"
              className="text-xs tracking-[0.2em] uppercase text-accent font-medium mb-3"
            >
              Selected Work
            </p>
            {reducedMotion ? (
              <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold">
                Projects
              </h2>
            ) : (
              <SplitText
                text="Projects"
                tag="h2"
                className="text-3xl md:text-5xl tracking-tighter font-semibold"
                splitType="chars"
                from={{ opacity: 0, y: 60, rotateX: -15 }}
                to={{ opacity: 1, y: 0, rotateX: 0 }}
                duration={0.9}
                delay={40}
                ease="power4.out"
                threshold={0.15}
                rootMargin="-80px"
                textAlign="left"
              />
            )}
          </div>
          <Link
            href="/projects"
            className="text-sm text-accent hover:underline underline-offset-4 transition-colors duration-200 hidden sm:block"
          >
            View all projects
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <div key={project.slug} data-preview="card">
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

        <Link
          href="/projects"
          className="block text-center text-sm text-accent hover:underline underline-offset-4 mt-8 sm:hidden"
        >
          View all projects
        </Link>
      </div>
    </section>
  );
}
