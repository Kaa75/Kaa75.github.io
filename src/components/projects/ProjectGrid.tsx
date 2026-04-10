'use client';

import { useState } from 'react';
import { projects, categories } from '@/data/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';

export function ProjectGrid() {
  const [filter, setFilter] = useState<string>('all');

  const filtered =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div>
      {/* Filter pills */}
      <nav aria-label="Project filters" className="flex flex-wrap gap-2 mb-10">
        {categories.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={`text-sm px-4 py-1.5 rounded-full border transition-colors duration-200 ${
              filter === value
                ? 'border-accent text-accent bg-accent/5'
                : 'border-border text-muted hover:border-accent/40 hover:text-foreground'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted py-20">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
