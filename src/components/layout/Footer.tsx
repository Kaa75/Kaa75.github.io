import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 no-print" role="contentinfo">
      <div className="section-container py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[hsl(var(--muted))]">
        <p>&copy; {year} Karim Abboud. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link
            href="https://www.linkedin.com/in/karim-abboud-6bba15248/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-200"
          >
            LinkedIn
          </Link>
          <Link
            href="https://github.com/Kaa75"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-200"
          >
            GitHub
          </Link>
          <Link
            href="mailto:karimabboud05@gmail.com"
            className="hover:text-accent transition-colors duration-200"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
