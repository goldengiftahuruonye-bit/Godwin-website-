import React from 'react';
import { Project } from '../types/architecture';

interface FeaturedWorkGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const FeaturedWorkGrid: React.FC<FeaturedWorkGridProps> = ({
  projects,
  onSelectProject,
}) => {
  return (
    <section id="portfolio-grid" className="px-4 py-8 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-[#f5f4ef] font-serif">Featured Work</h2>
          <p className="text-[13px] text-[#8e929f]">Selected architectural works and drawings</p>
        </div>
        <span className="text-[#8e929f] text-[12px] font-mono">{projects.length} Projects</span>
      </div>

      {/* 3-Column Square Image Grid (matching screenshot) */}
      <div className="grid grid-cols-3 gap-2">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelectProject(project)}
            className="group relative aspect-square rounded-lg overflow-hidden bg-[#1c1e22] border border-[#272a30] focus:outline-none focus:ring-1 focus:ring-[#c8a265] cursor-pointer"
            title={`${project.title} — ${project.subtitle}`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-[#0d0e0f]/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-1.5 text-center">
              <span className="material-symbols-outlined text-[#eae7e1] text-[20px] mb-1">
                zoom_in
              </span>
              <span className="text-[9px] text-[#f5f4ef] font-medium leading-tight line-clamp-1">
                {project.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
