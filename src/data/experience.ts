export interface Experience {
  title: string;
  company: string;
  companyUrl?: string;
  location?: string;
  date: string;
  tech: string;
  bullets: string[];
  /** Shown on the home page timeline. Teaching role stays CV-only. */
  featured: boolean;
}

// Newest first.
export const experience: Experience[] = [
  {
    title: 'DevOps Engineer',
    company: 'Murex',
    date: 'May 2026 – Present',
    // TODO(karim): add location, and any tools you want listed (e.g. Bash, Ansible, Terraform).
    tech: 'Linux, Automation',
    bullets: [
      'Run Linux infrastructure across multiple environments and regions.',
      'Write automation scripts for provisioning and deployments.',
    ],
    featured: true,
  },
  {
    title: 'Freelance Software Engineer',
    company: 'OFOQ & RSC Summit 2025',
    // TODO(karim): confirm the start date. CV says Aug 2025 for both projects.
    date: 'Aug 2025 – Jan 2026',
    tech: 'React, Next.js, TypeScript, MUI, Vite, AWS Lambda, API Gateway, S3, Bedrock',
    bullets: [
      'OFOQ (ofoqinternational.com): built the full-stack site, a serverless backend for forms and a custom CMS, and AWS Bedrock workflows that generate exhibition booths.',
      'RSC Summit 2025 (rscsummit.org): built the official site and its AWS serverless APIs, reaching a Lighthouse performance score of 99/100.',
    ],
    featured: true,
  },
  {
    title: 'Frontend Engineer',
    company: 'Anghami',
    location: 'Beirut, Lebanon',
    date: 'Jun 2025 – Sep 2025',
    tech: 'React, Next.js, JavaScript, TypeScript, Google Cast SDK',
    bullets: [
      'Built the UI for the Chromecast web app with the Google Cast SDK, replacing the native interface with a custom web experience.',
      'Migrated Angular landing pages to Next.js: load time down 35%, bundle size down 40%.',
      'Refactored shared React components and state management for better rendering efficiency across platforms.',
    ],
    featured: true,
  },
  {
    title: 'Tutor & Teaching Assistant',
    company: 'American University of Beirut',
    date: 'Aug 2023 – Aug 2025',
    tech: 'Python, Data Structures & Algorithms, Ethical Hacking I',
    bullets: [
      'Ran weekly labs and one-on-one mentoring in Python, data structures and cybersecurity for 30+ students.',
    ],
    featured: false,
  },
];
