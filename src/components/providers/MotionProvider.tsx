'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

interface MotionContextValue {
  /** true when user prefers reduced motion OR has toggled low-power mode */
  reducedMotion: boolean;
  /** true when WebGL is available */
  webglAvailable: boolean;
  /** manual low-power toggle */
  lowPower: boolean;
  setLowPower: (v: boolean) => void;
}

const MotionContext = createContext<MotionContextValue>({
  reducedMotion: false,
  webglAvailable: true,
  lowPower: false,
  setLowPower: () => {},
});

export function useMotion() {
  return useContext(MotionContext);
}

function detectWebGL(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') || canvas.getContext('webgl');
    return !!gl;
  } catch {
    return false;
  }
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const [lowPower, setLowPower] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);

    setWebglAvailable(detectWebGL());

    return () => mq.removeEventListener('change', handler);
  }, []);

  const reducedMotion = prefersReduced || lowPower;

  return (
    <MotionContext.Provider
      value={{ reducedMotion, webglAvailable, lowPower, setLowPower }}
    >
      {children}
    </MotionContext.Provider>
  );
}
