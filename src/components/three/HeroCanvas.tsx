'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useMotion } from '@/components/providers/MotionProvider';
import { HeroFallback } from '@/components/three/HeroFallback';

const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then((m) => m.HeroScene),
  { ssr: false }
);

export function HeroCanvas() {
  const { webglAvailable, reducedMotion } = useMotion();
  const [ready, setReady] = useState(false);

  // Only load the 3D scene on wide screens, and only once the page is idle.
  // Phones get the static SVG: keeps main-thread time and JS payload down.
  useEffect(() => {
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 400));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = idle(() => setReady(true));
    return () => cancel(id as number);
  }, []);

  if (!webglAvailable || reducedMotion || !ready) {
    return <HeroFallback />;
  }

  return <HeroScene />;
}
