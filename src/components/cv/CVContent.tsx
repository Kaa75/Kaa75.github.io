'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from '@/components/providers/MotionProvider';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function CVContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.utils.toArray<HTMLElement>('[data-cv-section]').forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.05,
        });
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <article ref={containerRef} className="space-y-12" itemScope itemType="https://schema.org/Person">
      <meta itemProp="name" content="Karim Abboud" />
      <meta itemProp="jobTitle" content="Software Engineer" />
      <meta itemProp="email" content="karimabboud05@gmail.com" />

      {/* Contact info */}
      <section data-cv-section aria-labelledby="cv-contact" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
        <span>Beirut, Lebanon</span>
        <a href="tel:+96171394791" className="hover:text-accent transition-colors duration-200">+961 71 394 791</a>
        <a href="mailto:karimabboud05@gmail.com" className="hover:text-accent transition-colors duration-200">karimabboud05@gmail.com</a>
        <a href="https://www.linkedin.com/in/karim-abboud-6bba15248/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-200">LinkedIn</a>
        <a href="https://github.com/Kaa75" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-200">GitHub</a>
      </section>

      {/* Education */}
      <section data-cv-section aria-labelledby="cv-education">
        <h2 id="cv-education" className="text-xl font-semibold tracking-tight mb-6 pb-2 border-b border-border/50">
          Education
        </h2>
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h3 className="font-medium">American University of Beirut</h3>
            <span className="text-sm font-mono text-muted">Aug 2022 &ndash; May 2026 (Expected)</span>
          </div>
          <p className="text-sm text-foreground">
            Bachelor of Computer Science Engineering | Concentration: Cybersecurity & Networking
          </p>
          <p className="text-sm text-muted leading-relaxed">
            <span className="font-medium text-foreground">Relevant Coursework:</span>{' '}
            Ethical Hacking I & II, Cryptography & Network Security, Internet Security Lab, Software Security,
            DevSecOps & Cloud, Machine Learning, Computing Networks & Services, Data Structures & Algorithms.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section data-cv-section aria-labelledby="cv-experience">
        <h2 id="cv-experience" className="text-xl font-semibold tracking-tight mb-6 pb-2 border-b border-border/50">
          Experience
        </h2>
        <div className="space-y-8">
          <ExperienceItem
            title="Frontend Engineer"
            company="Anghami"
            location="Beirut, Lebanon"
            date="Jun 2025 – Sep 2025"
            tech="React, Next.js, JavaScript, TypeScript"
            bullets={[
              'Developed UI for Chromecast web app, integrating Google Cast SDK to replace native interface with a fully custom web-based experience.',
              'Migrated Angular landing pages to Next.js, improving load time by 35% and reducing bundle size by 40%.',
              'Optimized React state management and component architecture, improving rendering efficiency and scalability across multiple platforms.',
            ]}
          />
          <ExperienceItem
            title="Freelance Software Engineer — RSC Summit 2025"
            company="rscsummit.org"
            companyUrl="https://www.rscsummit.org/"
            location=""
            date="Aug 2025 – Oct 2025"
            tech="React, Next.js, TypeScript, AWS, Serverless"
            bullets={[
              'Built and deployed the official RSC Summit 2025 website (rscsummit.org) using React with serverless backend architecture.',
              'Implemented AWS serverless APIs using Lambda, API Gateway, and S3 for dynamic content and form handling.',
              'Achieved 99% Lighthouse performance score through static site generation, caching, and CDN optimization.',
            ]}
          />
          <ExperienceItem
            title="Freelance Software Engineer — OFOQ"
            company="ofoqinternational.com"
            companyUrl="https://www.ofoqinternational.com/"
            location=""
            date="Aug 2025 – Jan 2026"
            tech="React, TypeScript, MUI, Vite, AWS, Serverless, Bedrock"
            bullets={[
              'Built and deployed the complete full-stack OFOQ website (ofoqinternational.com).',
              'Designed serverless backend using AWS Lambda, API Gateway, and S3 for form submissions and custom CMS.',
              'Integrated AWS Bedrock powered AI workflows for automated booth generation.',
              'Improved cross-device responsiveness and reduced page load time using optimized asset delivery and caching.',
            ]}
          />
          <ExperienceItem
            title="Tutor & Teaching Assistant"
            company="American University of Beirut"
            location=""
            date="Aug 2023 – Aug 2025"
            tech="Python, Data Structures & Algorithms, Ethical Hacking I"
            bullets={[
              'Delivered guidance in Python, Data Structures, and cybersecurity concepts through weekly labs and one-on-one mentoring sessions for 30+ students.',
            ]}
          />
        </div>
      </section>

      {/* Certifications */}
      <section data-cv-section aria-labelledby="cv-certs">
        <h2 id="cv-certs" className="text-xl font-semibold tracking-tight mb-6 pb-2 border-b border-border/50">
          Certifications
        </h2>
        <ul className="space-y-2 text-sm">
          <li className="text-muted">
            <span className="text-foreground">Introduction to Cybersecurity</span> — Cisco
          </li>
          <li className="text-muted">
            <span className="text-foreground">React — The Complete Guide 2024 (incl. Next.js, Redux)</span> — Udemy
          </li>
        </ul>
      </section>

      {/* Skills */}
      <section data-cv-section aria-labelledby="cv-skills">
        <h2 id="cv-skills" className="text-xl font-semibold tracking-tight mb-6 pb-2 border-b border-border/50">
          Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <SkillGroup
            title="Languages"
            items={['Python', 'JavaScript/TypeScript', 'C/C++', 'Java', 'C#', 'Bash', 'PowerShell']}
          />
          <SkillGroup
            title="Frontend/Backend"
            items={['React', 'Next.js', 'Node.js', 'Django', 'Angular', 'MUI', 'Vite']}
          />
          <SkillGroup
            title="Cloud & DevOps"
            items={['AWS (Lambda, API Gateway, S3, Bedrock, DynamoDB, CloudFront)', 'Docker', 'Serverless', 'Git']}
          />
          <SkillGroup
            title="Security"
            items={['OWASP', 'Metasploit', 'Burp Suite', 'Nmap', 'Wireshark']}
          />
          <SkillGroup
            title="Spoken Languages"
            items={['English (Fluent)', 'Arabic (Native)']}
          />
        </div>
      </section>
    </article>
  );
}

function ExperienceItem({
  title,
  company,
  companyUrl,
  location,
  date,
  tech,
  bullets,
}: {
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  date: string;
  tech: string;
  bullets: string[];
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
        <h3 className="font-medium">{title}</h3>
        <span className="text-sm font-mono text-muted shrink-0">{date}</span>
      </div>
      {(company || location) && (
        <p className="text-sm text-muted">
          {company && companyUrl ? (
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors duration-200 underline-offset-2 hover:underline"
            >
              {company}
            </a>
          ) : (
            company
          )}
          {company && location ? ' — ' : ''}
          {location}
        </p>
      )}
      <p className="text-xs font-mono text-accent/70">{tech}</p>
      <ul className="space-y-1.5 text-sm text-muted leading-relaxed">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-accent/50 mt-1.5 shrink-0">&#x2022;</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-medium text-foreground mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="text-xs font-mono px-2.5 py-1 rounded-md border border-border/50 bg-surface text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
