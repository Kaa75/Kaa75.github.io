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
    tech: 'Linux, Infrastructure Automation',
    bullets: [
      'Maintain Linux-based infrastructure across environments and regions, supporting reliability and consistent operations.',
      'Develop automation scripts for environment provisioning, deployments and operational workflows.',
    ],
    featured: true,
  },
  {
    title: 'Freelance Software Engineer · Hostivite',
    company: 'Event Management Platform',
    date: 'Mar 2026 – Apr 2026',
    tech: 'React Native, Python, AWS Serverless, DynamoDB',
    bullets: [
      'Built a full-stack event app (web and React Native) with RSVP tracking, guest management and dynamic event templates.',
      'Developed a serverless Python backend with DynamoDB for guest-uploaded photo and video gallery management.',
      'Designed role-based dashboards with tailored statistics for admins, tenants and users.',
    ],
    featured: true,
  },
  {
    title: 'Freelance Software Engineer',
    company: 'OFOQ & RSC Summit 2025',
    date: 'Aug 2025 – Jan 2026',
    tech: 'React, Next.js, TypeScript, MUI, Vite, AWS Lambda, API Gateway, S3, Bedrock',
    bullets: [
      'OFOQ (ofoqinternational.com), Aug 2025 – Jan 2026: launched the full-stack site on AWS Lambda, API Gateway and S3 with a custom CMS and forms, plus AWS Bedrock workflows for automated booth generation.',
      'RSC Summit 2025 (rscsummit.org), Aug – Oct 2025: built the official site and its AWS serverless APIs, reaching a Lighthouse performance score of 99/100 through static generation, caching and CDN.',
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
      'Created and fixed reusable React components and refactored state management, shared across multiple platforms.',
    ],
    featured: true,
  },
  {
    title: 'Tutor & Teaching Assistant',
    company: 'American University of Beirut',
    date: 'Aug 2023 – Aug 2025',
    tech: 'Python, Data Structures & Algorithms, Ethical Hacking I',
    bullets: [
      'Mentored 30+ students in Python, Data Structures & Algorithms and Ethical Hacking through weekly labs and one-on-one sessions (EECE 230, 330, 503G).',
    ],
    featured: false,
  },
];
