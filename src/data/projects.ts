export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  role: string;
  category: 'web' | 'freelance' | 'crypto' | 'ai' | 'game' | 'security' | 'systems';
  isPublic: boolean;
  repoUrl?: string;
  backendRepoUrl?: string;
  liveUrl?: string;
  image?: string;
  /** Hostivite uses anonymized case study instead of source code */
  caseStudy?: string;
  /** For demo mode: additional private data shown only in local admin mode */
  demoData?: Record<string, unknown>;
}

export const projects: Project[] = [
  {
    slug: 'hostivite',
    title: 'Hostivite',
    summary:
      'Private freelance event planning & guest management system with RSVP and microsite publishing.',
    description: `Hostivite is a full-stack event management platform built for private clients. It allows event planners to create branded microsites for each event, manage guest lists with RSVP tracking, send invitations, and publish event details — all from a single dashboard.

The system features role-based access control, real-time RSVP analytics, customizable event templates, and automated email notifications. Each event gets its own unique microsite with a custom URL, responsive design, and interactive RSVP forms.

**Note:** This is a private project. The case study below uses anonymized data and screenshots. No source code or private GitHub links are provided.`,
    tech: ['React', 'Next.js', 'TypeScript', 'AWS Lambda', 'DynamoDB', 'S3', 'SES'],
    role: 'Full-Stack Engineer (Solo)',
    category: 'freelance',
    isPublic: false,
    caseStudy: `## Challenge
A client needed a scalable event management system that could handle multiple simultaneous events with unique branding per event, guest management, and real-time RSVP tracking.

## Solution
Built a serverless architecture using AWS Lambda + API Gateway for the backend, DynamoDB for data storage, and S3 + CloudFront for static asset delivery. The frontend uses Next.js with SSG for event microsites (fast load times, SEO-friendly) and a React admin dashboard for event management.

## Key Features
- **Event Microsite Generator:** Each event gets a unique, branded landing page with custom colors, images, and RSVP forms
- **Guest Management:** Import guest lists via CSV, track RSVPs in real-time, send automated reminders
- **Analytics Dashboard:** Real-time attendance tracking, RSVP conversion rates, email open rates
- **Role-Based Access:** Event planners, coordinators, and viewers each have scoped permissions

## Results
- Handled 500+ concurrent RSVPs during peak event without performance issues
- Reduced event setup time from 2 days to ~30 minutes
- 99.9% uptime across 3 months of production use`,
    demoData: {
      sampleEvents: [
        { name: 'Annual Gala 2025', guests: 320, rsvpRate: 0.78 },
        { name: 'Tech Meetup Q3', guests: 150, rsvpRate: 0.92 },
      ],
    },
  },
  {
    slug: 'cryptography-site',
    title: 'Cryptography & Network Security',
    summary:
      'Educational web app demonstrating classical and modern cryptographic algorithms with interactive visualizations.',
    description: `A full-stack web application built for the EECE 455 Cryptography & Network Security course. The frontend provides interactive demonstrations of various cipher algorithms — users can input plaintext, select parameters, and see step-by-step encryption/decryption in real time.

The backend implements the actual cryptographic algorithms in a secure, sandboxed environment, ensuring no sensitive operations are exposed client-side.`,
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'CSS Modules'],
    role: 'Frontend Lead & Algorithm Implementation',
    category: 'crypto',
    isPublic: true,
    repoUrl: 'https://github.com/Kaa75/EECE455_Frontend',
    backendRepoUrl: 'https://github.com/Kaa75/EECE455_Backend',
  },
  {
    slug: 'clinical-trials-agent',
    title: 'Clinical Trials Data Analyst Agent',
    summary:
      'Agentic system automating clinical trial data analysis using LLM workflows with LangChain and AWS Bedrock.',
    description: `Final Year Project — an AI-powered system that ingests structured clinical trial datasets and generates analytical reports automatically. Uses multi-step LLM workflows via LangChain with tool-based agents for data interpretation, statistical analysis, and report synthesis.

Features a React frontend for dataset upload, parameter selection, and interactive report visualization. Powered by AWS Bedrock foundation models for scalable, cost-effective inference.`,
    tech: ['React', 'LangChain', 'AWS Bedrock', 'Python', 'TypeScript'],
    role: 'Full-Stack Developer & ML Engineer',
    category: 'ai',
    isPublic: true,
    repoUrl: 'https://github.com/Kaa75/clinical-trials-agent',
  },
  {
    slug: 'rsc-summit-2025',
    title: 'RSC Summit 2025 Website',
    summary:
      'Official event website with serverless backend, achieving 99% Lighthouse performance.',
    description: `Built and deployed the official RSC Summit 2025 website (rscsummit.org) using React with a serverless backend architecture. Implemented AWS serverless APIs using Lambda, API Gateway, and S3 for dynamic content and form handling. Achieved a 99% Lighthouse performance score through static site generation, caching, and CDN optimization.`,
    tech: ['React', 'Next.js', 'TypeScript', 'AWS Lambda', 'API Gateway', 'S3'],
    role: 'Full-Stack Engineer (Solo)',
    category: 'freelance',
    isPublic: false,
    liveUrl: 'https://rscsummit.org',
  },
  {
    slug: 'ofoq-website',
    title: 'OFOQ International Website',
    summary:
      'Full-stack corporate website with AI-powered booth generation using AWS Bedrock.',
    description: `Designed and deployed the complete OFOQ International website with a serverless backend using AWS Lambda, API Gateway, and S3. Integrated AWS Bedrock-powered AI workflows for automated booth generation. Optimized for cross-device responsiveness and fast page loads.`,
    tech: ['React', 'TypeScript', 'MUI', 'Vite', 'AWS Lambda', 'AWS Bedrock'],
    role: 'Full-Stack Engineer (Solo)',
    category: 'freelance',
    isPublic: false,
    liveUrl: 'https://ofoqinternational.com',
  },
  {
    slug: 'minigolf-3d-ai',
    title: 'MiniGolf 3D AI',
    summary:
      'Unity-based 3D MiniGolf with AI trained via PPO and genetic algorithms.',
    description: `Built a 3D MiniGolf environment in Unity and trained an AI agent using Proximal Policy Optimization (PPO) and genetic algorithms. The agent consistently completes holes within 5 shots. Features procedurally generated courses and real-time visualization of the AI decision-making process.`,
    tech: ['Unity', 'C#', 'Reinforcement Learning', 'PPO', 'Genetic Algorithms'],
    role: 'Developer & ML Engineer',
    category: 'game',
    isPublic: true,
    repoUrl: 'https://github.com/Rayan28461/MiniGolf3D',
  },
  {
    slug: 'erp-system',
    title: 'ERP System',
    summary:
      'Multi-module enterprise resource planning system with role-based access and real-time dashboards.',
    description: `A comprehensive ERP system featuring secure authentication, role-based access control, automated invoicing, and data integrity checks. RESTful APIs power front-end dashboards for real-time reporting across all business modules.`,
    tech: ['Django', 'Python', 'JavaScript', 'HTML/CSS', 'PostgreSQL'],
    role: 'Full-Stack Developer',
    category: 'web',
    isPublic: false,
  },
  {
    slug: 'proxyguard',
    title: 'ProxyGuard — Python Proxy Server',
    summary:
      'Multi-threaded proxy server with caching and IP-blocking, reducing response latency by 45%.',
    description: `A performant multi-threaded proxy server built from scratch using Python sockets. Features include response caching, configurable IP blocking rules, request logging, and a Flask-based admin interface for monitoring. Reduced response latency by 45% through intelligent caching strategies.`,
    tech: ['Python', 'Sockets', 'Flask', 'Threading'],
    role: 'Developer',
    category: 'systems',
    isPublic: true,
    repoUrl: 'https://github.com/Kaa75/proxyguard',
  },
];

export const categories = [
  { value: 'all', label: 'All' },
  { value: 'web', label: 'Web' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'ai', label: 'AI / ML' },
  { value: 'game', label: 'Games' },
  { value: 'security', label: 'Security' },
  { value: 'systems', label: 'Systems' },
] as const;
