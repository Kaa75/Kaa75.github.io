'use client';

import dynamic from 'next/dynamic';
import { useMotion } from '@/components/providers/MotionProvider';
import { HeroFallback } from '@/components/three/HeroFallback';

const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then((m) => m.HeroScene),
  { ssr: false }
);

export function HeroCanvas() {
  const { webglAvailable, reducedMotion } = useMotion();

  if (!webglAvailable || reducedMotion) {
    return <HeroFallback />;
  }

  return <HeroScene />;
}
