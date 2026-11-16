export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  role: string;
  category: 'web' | 'freelance' | 'crypto' | 'ai' | 'game' | 'systems';
  isPublic: boolean;
  repoUrl?: string;
  backendRepoUrl?: string;
  liveUrl?: string;
  image?: string;
  /** Private projects use an anonymized case study instead of source code */
  caseStudy?: string;
  /** Anonymized screenshots shown in the case study */
  screenshots?: { src: string; alt: string }[];
  /** For demo mode: additional private data shown only in local admin mode */
  demoData?: Record<string, unknown>;
}

// Order = relevance to full-stack roles. Keep the strongest work first.
//
// TODO(karim): add your NestJS project here once you confirm its name, what it
// does and the repo link. NestJS / Redux Toolkit / PostgreSQL / CI/CD are
// deliberately NOT listed on any project until you confirm you used them there.
export const projects: Project[] = [
  {
    slug: 'ofoq-website',
    title: 'OFOQ International Website',
    summary:
      'Corporate site with a custom CMS and AI-generated exhibition booths, running on AWS serverless.',
    description: `Corporate website for OFOQ International (ofoqinternational.com), built and shipped end to end as the sole engineer.

I built the React and TypeScript front end with MUI and Vite, and a serverless backend on AWS Lambda, API Gateway and S3 that handles form submissions and a custom CMS. I also wired AWS Bedrock workflows that generate exhibition booth designs automatically. Asset delivery and caching were tuned to cut page load time and keep the layout responsive across devices.

Live in production at ofoqinternational.com.`,
    // TODO(karim): add one concrete number (load time, booths generated, etc.) if you have it.
    tech: ['React', 'TypeScript', 'MUI', 'Vite', 'AWS Lambda', 'API Gateway', 'S3', 'AWS Bedrock'],
    role: 'Freelance Full-Stack Engineer (Solo)',
    category: 'freelance',
    isPublic: false,
    liveUrl: 'https://ofoqinternational.com',
  },
  {
    slug: 'rsc-summit-2025',
    title: 'RSC Summit 2025 Website',
    summary:
      'Official conference website on Next.js and AWS serverless, scoring 99/100 on Lighthouse performance.',
    description: `Official website for RSC Summit 2025 (rscsummit.org), built and deployed as the sole engineer.

I built the site with React, Next.js and TypeScript, and implemented the AWS serverless APIs behind it (Lambda, API Gateway, S3) for dynamic content and form handling. Static generation, caching and CDN delivery bring it to a Lighthouse performance score of 99/100.`,
    tech: ['React', 'Next.js', 'TypeScript', 'AWS Lambda', 'API Gateway', 'S3'],
    role: 'Freelance Full-Stack Engineer (Solo)',
    category: 'freelance',
    isPublic: false,
    liveUrl: 'https://rscsummit.org',
  },
  {
    slug: 'hostivite',
    title: 'Hostivite',
    summary:
      'Private event-planning and guest-management app with RSVP tracking, on a serverless AWS backend.',
    description: `Hostivite is a private freelance event-management app (Mar–Apr 2026): RSVP tracking, guest management and dynamic event templates, with a web app and a React Native app.

I built it end to end: a serverless Python backend on AWS with DynamoDB (including a guest-uploaded photo and video gallery) and role-based dashboards that show admins, tenants and users different statistics.

This is a private project, so there is no public repo. The case study below is anonymized.`,
    tech: ['React Native', 'Python', 'AWS Serverless', 'DynamoDB'],
    role: 'Freelance Full-Stack Engineer (Solo)',
    category: 'freelance',
    isPublic: false,
    // TODO(karim): add anonymized screenshots to `screenshots`, the real problem
    // statement and one verified outcome. The old 500+ RSVPs / 99.9% uptime /
    // 2 days to 30 minutes figures were removed because they were not verified.
    caseStudy: `## Problem
Hosts needed one place to plan events, manage guests and collect RSVPs and photos, with different views for admins, tenants and guests.

## My role
Sole engineer, from design to deployment: web and React Native apps, Python backend and AWS infrastructure.

## Architecture
React Native and web clients call Python serverless functions on AWS. DynamoDB stores events, guests, RSVPs and gallery metadata for guest-uploaded photos and videos. Role-based dashboards give admins, tenants and users scoped statistics.`,
    screenshots: [],
  },
  {
    slug: 'clinical-trials-agent',
    title: 'Clinical Trials Data Analyst Agent',
    summary:
      'Final-year project: a LangGraph agent that analyzes clinical trial datasets and writes the report, on AWS Bedrock.',
    description: `Final-year project: an AI agent that ingests structured clinical trial datasets and produces analytical reports automatically.

I built the multi-step agent workflow with LangGraph (data interpretation, statistical analysis, report synthesis), the Python tooling behind it, and a React front end for dataset upload, parameter selection and viewing the generated report. Inference runs on AWS Bedrock foundation models.`,
    // TODO(karim): add one concrete result (accuracy, time saved, dataset size).
    tech: ['LangGraph', 'AWS Bedrock', 'React', 'TypeScript', 'Python'],
    role: 'Full-Stack Developer & ML Engineer',
    category: 'ai',
    isPublic: true,
    repoUrl: 'https://github.com/mmb84-aub/Q-Trial',
  },
  {
    slug: 'cryptography-site',
    title: 'Cryptography & Network Security',
    summary:
      'Interactive web app that walks through classical and modern ciphers step by step.',
    description: `Web app built for the EECE 455 Cryptography & Network Security course. Users enter plaintext, pick parameters and watch encryption and decryption step by step.

I led the React front end and implemented the cipher algorithms. They run in an Express backend, so no cryptographic logic ships to the client. A Caesar cipher demo is available below.`,
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'CSS Modules'],
    role: 'Frontend Lead & Algorithm Implementation',
    category: 'crypto',
    isPublic: true,
    repoUrl: 'https://github.com/Kaa75/EECE455_Frontend',
    backendRepoUrl: 'https://github.com/Kaa75/EECE455_Backend',
  },
  {
    slug: 'erp-system',
    title: 'ERP System',
    summary:
      'Multi-module ERP with role-based access, automated invoicing and reporting dashboards.',
    description: `Multi-module enterprise resource planning system. I built secure authentication, role-based access control, automated invoicing and data-integrity checks, plus the REST APIs that feed real-time reporting dashboards.`,
    tech: ['Django', 'Python', 'JavaScript', 'HTML/CSS', 'PostgreSQL'],
    role: 'Full-Stack Developer',
    category: 'web',
    isPublic: false,
  },
  {
    slug: 'proxyguard',
    title: 'ProxyGuard — Python Proxy Server',
    summary:
      'Multi-threaded caching proxy with IP blocking that cut response latency by 45%.',
    description: `Multi-threaded proxy server built from scratch on Python sockets, with response caching, configurable IP blocking, request logging and a Flask admin interface for monitoring. Caching cut response latency by 45%.`,
    tech: ['Python', 'Sockets', 'Flask', 'Threading'],
    role: 'Developer',
    category: 'systems',
    // TODO(karim): github.com/Kaa75/proxyguard returns 404. Add the real repo URL (and set isPublic: true) or leave private.
    isPublic: false,
  },
  {
    slug: 'minigolf-3d-ai',
    title: 'MiniGolf 3D AI',
    summary:
      'Unity MiniGolf where an AI agent, trained with PPO and genetic algorithms, finishes holes in 5 shots or fewer.',
    description: `3D MiniGolf environment in Unity with an AI agent trained using Proximal Policy Optimization and genetic algorithms. The agent consistently completes holes within 5 shots. Includes procedurally generated courses and a live view of the agent's decisions.`,
    tech: ['Unity', 'C#', 'Reinforcement Learning', 'PPO', 'Genetic Algorithms'],
    role: 'Developer & ML Engineer',
    category: 'game',
    isPublic: true,
    repoUrl: 'https://github.com/Rayan28461/MiniGolf3D',
  },
];

export const categories = [
  { value: 'all', label: 'All' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'web', label: 'Web' },
  { value: 'ai', label: 'AI / ML' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'systems', label: 'Systems' },
  { value: 'game', label: 'Games' },
] as const;
