import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/providers/MotionProvider';
import { Analytics } from '@/components/Analytics';
import { CookieConsent } from '@/components/CookieConsent';

export const metadata: Metadata = {
  title: {
    default: 'Karim Abboud — Software Engineer',
    template: '%s | Karim Abboud',
  },
  description:
    'Portfolio of Karim Abboud — Frontend Engineer, Cybersecurity enthusiast, and Full-Stack Developer based in Beirut, Lebanon.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://karimabboud.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Karim Abboud — Software Engineer',
    description:
      'Frontend Engineer, Cybersecurity enthusiast, and Full-Stack Developer.',
    siteName: 'Karim Abboud',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karim Abboud — Software Engineer',
    description:
      'Frontend Engineer, Cybersecurity enthusiast, and Full-Stack Developer.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh] flex flex-col">
        <MotionProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-md"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieConsent />
          <Analytics />
        </MotionProvider>
      </body>
    </html>
  );
}
