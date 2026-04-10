'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from '@/components/providers/MotionProvider';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STATS = [
  { value: 15, suffix: '+', label: 'CTF Competitions' },
  { value: 6,  suffix: '',  label: 'Production Apps' },
  { value: 3,  suffix: '+', label: 'Years Building' },
  { value: 4,  suffix: '',  label: 'Languages & Stacks' },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();

  useGSAP(
    () => {
      if (reducedMotion) {
        gsap.set('[data-stat-num]', { autoAlpha: 1 });
        document.querySelectorAll<HTMLElement>('[data-stat-num]').forEach((el, i) => {
          el.textContent = `${STATS[i].value}${STATS[i].suffix}`;
        });
        return;
      }

      // Single timeline + single ScrollTrigger owns both the card fade and counter-ups
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
          onEnter: () => {
            // Counter-up animations start with the timeline
            document.querySelectorAll<HTMLElement>('[data-stat-num]').forEach((el, i) => {
              const obj = { val: 0 };
              gsap.to(obj, {
                val: STATS[i].value,
                duration: 1.6,
                ease: 'power2.out',
                onUpdate: () => {
                  el.textContent = `${Math.round(obj.val)}${STATS[i].suffix}`;
                },
              });
            });
          },
        },
      });

      tl.from('[data-stat-card]', {
        y: 40,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
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
              className="bg-card px-8 py-10 flex flex-col items-center justify-center text-center"
            >
              <span
                data-stat-num
                aria-hidden="true"
                className="text-[clamp(2.5rem,5vw,3.5rem)] font-semibold tracking-tighter text-accent leading-none"
              >
                0{stat.suffix}
              </span>
              <span className="sr-only">{stat.value}{stat.suffix}</span>
              <span className="mt-2 text-xs text-muted tracking-widest uppercase font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
