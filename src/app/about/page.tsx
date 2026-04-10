import type { Metadata } from 'next';
import { CVContent } from '@/components/cv/CVContent';

export const metadata: Metadata = {
  title: 'About',
  description:
    'CV and background of Karim Abboud — Frontend Engineer, Cybersecurity enthusiast, based in Beirut, Lebanon.',
};

export default function AboutPage() {
  return (
    <div className="section-spacing pt-32">
      <div className="section-container max-w-4xl">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-12">
          <div>
            <div className="w-8 h-px bg-accent mb-5" />
            <p className="text-xs tracking-[0.2em] uppercase text-accent font-medium mb-3">
              About
            </p>
            <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] tracking-tighter font-semibold leading-[0.95] mb-4">
              Karim Abboud
            </h1>
            <p className="text-base text-[hsl(var(--muted))] leading-relaxed max-w-[55ch]">
              Frontend Engineer &amp; Cybersecurity enthusiast based in Beirut,
              Lebanon. Building performant, secure web applications.
            </p>
          </div>
          <a
            href="/karim-abboud-cv.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-200 shrink-0 no-print"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </a>
        </div>
        <CVContent />
      </div>
    </div>
  );
}
