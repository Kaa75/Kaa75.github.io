'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from '@/components/providers/MotionProvider';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Every figure here is backed by the CV: CTFs and years (own record),
// Lighthouse (rscsummit.org), load time (Anghami Next.js migration).
const STATS = [
  { value: 15, prefix: '', suffix: '+', label: 'CTF Competitions' },
  { value: 3, prefix: '', suffix: '+', label: 'Years Building' },
  { value: 99, prefix: '', suffix: '', label: 'Lighthouse · RSC Summit' },
  { value: 35, prefix: '−', suffix: '%', label: 'Load Time · Anghami' },
];

const format = (i: number, n: number) => `${STATS[i].prefix}${n}${STATS[i].suffix}`;

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();

  useGSAP(
    () => {
      // Markup is server-rendered with the final values, so no-JS, crawlers and
      // reduced-motion users all see the real numbers. Only animate from 0 when
      // motion is allowed.
      if (reducedMotion) return;

      const nums = gsap.utils.toArray<HTMLElement>('[data-stat-num]');
      nums.forEach((el, i) => {
        el.textContent = format(i, 0);
      });

      // Single timeline + single ScrollTrigger owns both the card fade and counter-ups
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
          onEnter: () => {
            // Counter-up animations start with the timeline
            nums.forEach((el, i) => {
              const obj = { val: 0 };
              gsap.to(obj, {
                val: STATS[i].value,
                duration: 1.6,
                ease: 'power2.out',
                onUpdate: () => {
                  el.textContent = format(i, Math.round(obj.val));
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
                className="text-[clamp(2.5rem,5vw,3.5rem)] font-semibold tracking-tighter text-accent leading-none"
              >
                {format(i, stat.value)}
              </span>
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
