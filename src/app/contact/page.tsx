import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Karim Abboud — email, LinkedIn, or GitHub.',
};

const LINKS = [
  {
    label: 'Email',
    value: 'karimabboud05@gmail.com',
    href: 'mailto:karimabboud05@gmail.com',
    description: 'Best for project inquiries and collaboration',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'karim-abboud-6bba15248',
    href: 'https://www.linkedin.com/in/karim-abboud-6bba15248/',
    description: 'Professional background and endorsements',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    external: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/Kaa75',
    href: 'https://github.com/Kaa75',
    description: 'Open-source work and side projects',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
    external: true,
  },
  {
    label: 'Resume',
    value: 'KarimAbboud_CV.pdf',
    href: '/KarimAbboud_CV.pdf',
    description: 'Download my full CV as PDF',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    download: true,
  },
];

export default function ContactPage() {
  return (
    <div className="section-spacing pt-32 min-h-[80dvh]">
      <div className="section-container max-w-2xl">
        {/* Header */}
        <div className="mb-16">
          <div className="w-8 h-px bg-accent mb-6" />
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] tracking-tighter font-semibold leading-[0.95] mb-5">
            Say Hello
          </h1>
          <p className="text-base text-[hsl(var(--muted))] leading-relaxed max-w-[46ch]">
            Open to new opportunities, freelance work, and interesting conversations.
            Pick your preferred channel below.
          </p>
        </div>

        {/* Link cards */}
        <div className="flex flex-col gap-3">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              {...(link.download ? { download: true } : {})}
              className="group flex items-center gap-5 p-5 rounded-2xl border border-border/60 bg-[hsl(var(--card))] hover:border-accent/40 hover:bg-[hsl(var(--card))]/80 transition-all duration-200"
            >
              {/* Icon */}
              <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/15 group-hover:bg-accent/15 transition-colors duration-200">
                {link.icon}
              </span>

              {/* Text */}
              <span className="flex-1 min-w-0">
                <span className="block text-xs uppercase tracking-widest text-[hsl(var(--muted))] font-medium mb-0.5">
                  {link.label}
                </span>
                <span className="block text-sm font-medium text-[hsl(var(--foreground))] truncate">
                  {link.value}
                </span>
                <span className="block text-xs text-[hsl(var(--muted))] mt-0.5">
                  {link.description}
                </span>
              </span>

              {/* Arrow */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0 text-[hsl(var(--muted))] -translate-x-1 group-hover:translate-x-0 group-hover:text-accent transition-all duration-200"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>

        {/* Availability note */}
        <p className="mt-12 text-xs text-[hsl(var(--muted))] text-center">
          Typically replies within 24 hours
        </p>
      </div>
    </div>
  );
}

