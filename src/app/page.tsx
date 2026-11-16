import { HeroSection } from '@/components/sections/HeroSection';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { StatsSection } from '@/components/sections/StatsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsPreview } from '@/components/sections/ProjectsPreview';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechMarquee />
      <StatsSection />
      <ExperienceSection />
      <ProjectsPreview />
    </>
  );
}
