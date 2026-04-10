'use client';

import { useState, useCallback, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useMotion } from '@/components/providers/MotionProvider';

gsap.registerPlugin(useGSAP);

/**
 * Interactive Caesar Cipher demo — runs entirely client-side.
 *
 * Security note: This is a classical educational cipher. It provides
 * no real cryptographic security. The implementation runs in the browser
 * with no server calls and processes only user-provided plaintext.
 * No sensitive data is handled; the cipher is for demonstration only.
 */
export function CaesarCipherDemo() {
  const [plaintext, setPlaintext] = useState('HELLO WORLD');
  const [shift, setShift] = useState(3);
  const outputRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();

  const encrypt = useCallback((text: string, s: number): string => {
    return text
      .split('')
      .map((char) => {
        if (/[A-Z]/.test(char)) {
          return String.fromCharCode(((char.charCodeAt(0) - 65 + s) % 26) + 65);
        }
        if (/[a-z]/.test(char)) {
          return String.fromCharCode(((char.charCodeAt(0) - 97 + s) % 26) + 97);
        }
        return char;
      })
      .join('');
  }, []);

  const ciphertext = encrypt(plaintext.toUpperCase(), shift);

  const handleShiftChange = (newShift: number) => {
    setShift(newShift);
    if (!reducedMotion && outputRef.current) {
      gsap.from(outputRef.current, {
        y: 8,
        autoAlpha: 0.5,
        duration: 0.25,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="mt-12 p-6 rounded-2xl border border-border/50 bg-[hsl(var(--surface))]"
    >
      <h2 className="text-xl font-semibold tracking-tight mb-2">
        Interactive Caesar Cipher
      </h2>
      <p className="text-sm text-[hsl(var(--muted))] mb-6">
        A classical substitution cipher — each letter is shifted by a fixed
        number of positions in the alphabet. Adjust the shift value and see the
        output change in real time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="cipher-input" className="block text-sm font-medium">
              Plaintext
            </label>
            <input
              id="cipher-input"
              type="text"
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              maxLength={100}
              className="w-full px-4 py-3 rounded-lg border border-border bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-mono text-sm focus:border-accent focus:outline-none transition-colors duration-200"
              placeholder="Enter text to encrypt"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="cipher-shift" className="block text-sm font-medium">
              Shift:{' '}
              <span className="font-mono text-accent">{shift}</span>
            </label>
            <input
              id="cipher-shift"
              type="range"
              min={0}
              max={25}
              value={shift}
              onChange={(e) => handleShiftChange(Number(e.target.value))}
              className="w-full accent-[hsl(var(--accent))]"
            />
            <div className="flex justify-between text-xs font-mono text-[hsl(var(--muted))]">
              <span>0</span>
              <span>25</span>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="space-y-2">
          <span className="block text-sm font-medium">Ciphertext</span>
          <div
            ref={outputRef}
            className="px-4 py-3 rounded-lg border border-accent/20 bg-accent/5 font-mono text-sm text-accent min-h-[48px] flex items-center break-all"
            aria-live="polite"
            role="status"
          >
            {ciphertext || <span className="text-[hsl(var(--muted))]">...</span>}
          </div>

          {/* Alphabet visualization */}
          <div className="mt-4 space-y-1">
            <div className="flex gap-0.5 overflow-x-auto">
              {Array.from({ length: 26 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center min-w-[1.5rem]"
                >
                  <span className="text-[10px] font-mono text-[hsl(var(--muted))]">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-[10px] text-accent/50">&darr;</span>
                  <span className="text-[10px] font-mono text-accent">
                    {String.fromCharCode(65 + ((i + shift) % 26))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-[hsl(var(--muted))]">
        This runs entirely in your browser. No data is sent to any server.
        The Caesar cipher is for educational purposes only and provides no
        real cryptographic security.
      </p>
    </div>
  );
}
