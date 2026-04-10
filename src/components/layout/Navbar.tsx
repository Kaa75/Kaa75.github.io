'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useMotion } from '@/components/providers/MotionProvider';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const { lowPower, setLowPower } = useMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* Trap focus inside mobile menu when open */
  useEffect(() => {
    if (!menuOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [menuOpen]);

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className="fixed top-0 inset-x-0 z-40 border-b border-border/50 bg-[hsl(var(--background)/.85)] backdrop-blur-md supports-[backdrop-filter]:bg-[hsl(var(--background)/.6)]"
    >
      <div className="section-container flex items-center justify-between h-16">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight hover:text-accent transition-colors duration-200"
        >
          K.A
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm tracking-wide transition-colors duration-200 ${
                pathname === href
                  ? 'text-accent'
                  : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]'
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => setLowPower(!lowPower)}
            aria-pressed={lowPower}
            className="text-xs px-3 py-1.5 rounded-full border border-border text-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] hover:border-accent/50 transition-colors duration-200"
          >
            {lowPower ? 'Full Motion' : 'Low Power'}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 -mr-2"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="sr-only">{menuOpen ? 'Close' : 'Menu'}</span>
          <div className="w-5 flex flex-col gap-1">
            <span
              className={`block h-px bg-current transition-transform duration-200 ${
                menuOpen ? 'translate-y-[5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-px bg-current transition-opacity duration-200 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-px bg-current transition-transform duration-200 ${
                menuOpen ? '-translate-y-[5px] -rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border/50 bg-[hsl(var(--background))]">
          <div className="section-container py-4 flex flex-col gap-4">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-base transition-colors duration-200 ${
                  pathname === href
                    ? 'text-accent'
                    : 'text-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]'
                }`}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={() => setLowPower(!lowPower)}
              aria-pressed={lowPower}
              className="text-sm text-left text-[hsl(var(--muted))]"
            >
              {lowPower ? 'Enable Full Motion' : 'Enable Low Power Mode'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
