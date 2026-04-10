'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from '@/components/providers/MotionProvider';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STATS = [
  { value: 15, suffix: '+', label: 'CTF Competitions' },
  { value: 99, suffix: '%', label: 'Lighthouse Score' },
  { value: 35, suffix: '%', label: 'Faster Load Times' },
  { value: 3,  suffix: '+', label: 'Years Building' },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();

  useGSAP(
    () => {
      if (reducedMotion) {
        // Show immediately without animation
        gsap.set('[data-stat-num]', { autoAlpha: 1 });
        document.querySelectorAll<HTMLElement>('[data-stat-num]').forEach((el, i) => {
          el.textContent = `${STATS[i].value}${STATS[i].suffix}`;
        });
        return;
      }

      // Fade in section
      gsap.from('[data-stat-card]', {
        y: 40,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      // Counter-up for each number
      document.querySelectorAll<HTMLElement>('[data-stat-num]').forEach((el, i) => {
        const target = STATS[i].value;
        const suffix = STATS[i].suffix;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}${suffix}`;
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section ref={sectionRef} className="section-spacing">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {STATS.map((stat, i) => (
            <div
              key={i}
              data-stat-card
              className="bg-[hsl(var(--card))] px-8 py-10 flex flex-col items-center justify-center text-center"
            >
              <span
                data-stat-num
                className="text-[clamp(2.5rem,5vw,3.5rem)] font-semibold tracking-tighter text-accent leading-none"
                aria-label={`${stat.value}${stat.suffix}`}
              >
                0{stat.suffix}
              </span>
              <span className="mt-2 text-xs text-[hsl(var(--muted))] tracking-widest uppercase font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
