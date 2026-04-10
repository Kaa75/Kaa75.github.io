/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        surface: {
          DEFAULT: 'hsl(var(--surface))',
          elevated: 'hsl(var(--surface-elevated))',
        },
        muted: 'hsl(var(--muted))',
        border: 'hsl(var(--border))',
      },
      maxWidth: {
        content: '1400px',
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'glow-pulse-slow': 'glow-pulse-slow 6s ease-in-out infinite',
        'scroll-bounce': 'scroll-bounce 1.6s ease-in-out infinite',
        'float-badge': 'float-badge 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
