'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { HeroCanvas } from '@/components/three/HeroCanvas';
import { useMotion } from '@/components/providers/MotionProvider';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TECH_CHIPS = ['React', 'Next.js', 'NestJS', 'TypeScript', 'AWS', 'PostgreSQL'];

// headline words — split so each can mask-reveal individually
const HEADLINE_PARTS: { text: string; accent: boolean }[] = [
  { text: 'Fast Code.', accent: false },
  { text: 'Hardened', accent: true },
  { text: 'Systems.', accent: true },
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();

  // Mouse parallax on canvas wrapper
  useEffect(() => {
    if (reducedMotion || !canvasWrapperRef.current) return;
    const xTo = gsap.quickTo(canvasWrapperRef.current, 'x', {
      duration: 0.9,
      ease: 'power2.out',
    });
    const yTo = gsap.quickTo(canvasWrapperRef.current, 'y', {
      duration: 0.9,
      ease: 'power2.out',
    });
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 28;
      const ny = (e.clientY / window.innerHeight - 0.5) * 18;
      xTo(nx);
      yTo(ny);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reducedMotion]);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.1,
      });

      // Decorative line grows
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }
      )
        // Status badge drops in
        .from('[data-hero="badge"]', { y: 16, autoAlpha: 0, duration: 0.5 }, '-=0.3')
        // Words reveal from bottom of mask
        .from('[data-heroword]', {
          yPercent: 110,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
        }, '-=0.2')
        // Role line
        .from('[data-hero="role"]', { y: 14, autoAlpha: 0, duration: 0.5 }, '-=0.4')
        // Subtitle
        .from('[data-hero="subtitle"]', { y: 18, autoAlpha: 0, duration: 0.55 }, '-=0.3')
        // CTAs
        .from('[data-hero="cta"]', {
          y: 14,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.1,
        }, '-=0.25')
        // Tech chips pop in
        .from('[data-herochip]', {
          scale: 0.6,
          autoAlpha: 0,
          duration: 0.45,
          stagger: 0.07,
          ease: 'back.out(1.7)',
        }, '-=0.2');
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* 3D canvas — parallax wrapper */}
      <div ref={canvasWrapperRef} className="absolute inset-0 will-change-transform">
        <HeroCanvas />
      </div>

      {/* Content */}
      <div className="section-container relative z-10 py-36">
        <div className="max-w-2xl">
          {/* Decorative line */}
          <div
            ref={lineRef}
            className="w-12 h-px bg-accent mb-7"
          />

          {/* Status badge — specific to location/context, not generic availability */}
          <div
            data-hero="badge"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-xs text-accent font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Beirut, Lebanon · Open to remote & relocate
          </div>

          {/* Headline — word mask reveal */}
          <h1 className="text-[clamp(2.6rem,7vw,5.5rem)] tracking-tighter leading-[0.95] font-semibold mb-4 overflow-hidden">
            {HEADLINE_PARTS.map((part, i) => (
              <span key={i} className="block overflow-hidden pb-[0.15em]">
                <span
                  data-heroword
                  className={`inline-block${part.accent ? ' text-accent' : ''}`}
                >
                  {part.text}
                </span>
              </span>
            ))}
          </h1>

          {/* Title + one-line summary */}
          <p
            data-hero="role"
            className="text-lg md:text-xl text-foreground font-medium mb-3"
          >
            Full Stack &amp; Cloud Engineer
          </p>
          <p
            data-hero="subtitle"
            className="text-base text-muted leading-relaxed max-w-[52ch] mb-3"
          >
            I build and ship web products with React, Next.js, NestJS and AWS, and add AI
            integrations where they earn their place.
          </p>
          <p className="text-sm text-muted mb-10">
            Languages: Arabic (native), English (fluent).
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              data-hero="cta"
              href="/about"
              className="inline-flex items-center px-7 py-3.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_hsl(var(--accent)/0.3)]"
            >
              View CV
            </Link>
            <a
              data-hero="cta"
              href="/KarimAbboud_CV.pdf"
              download
              className="inline-flex items-center px-7 py-3.5 rounded-lg border border-border text-sm font-medium hover:border-accent/50 hover:text-accent active:scale-[0.98] transition-all duration-200"
            >
              Download CV
            </a>
            <Link
              data-hero="cta"
              href="/projects"
              className="inline-flex items-center px-7 py-3.5 rounded-lg border border-border text-sm font-medium hover:border-accent/50 hover:text-accent active:scale-[0.98] transition-all duration-200"
            >
              Explore Projects
            </Link>
          </div>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-2" aria-label="Core technologies">
            {TECH_CHIPS.map((chip) => (
              <span
                key={chip}
                data-herochip
                className="px-3 py-1 rounded-full border border-border text-xs text-muted bg-card"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted no-print pointer-events-none">
        <span className="text-[0.6rem] tracking-[0.25em] uppercase opacity-60">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-accent/50 to-transparent" />
      </div>
    </section>
  );
}
