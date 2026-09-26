import React, { useState } from 'react';
import { Project } from '../types/architecture';

interface FeaturedWorkGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const FeaturedWorkGrid: React.FC<FeaturedWorkGridProps> = ({
  projects,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Residential', 'Cultural', 'Pavilion', 'Theoretical'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="portfolio-grid" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col gap-6">
      {/* Header with Title and Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#25282e] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] uppercase tracking-wider text-[#c8a265] font-semibold">
              Selected Works
            </span>
          </div>
          <h2 className="text-[24px] sm:text-[28px] font-bold text-[#f5f4ef] font-serif">
            Featured Architecture &amp; Drawings
          </h2>
          <p className="text-[13px] sm:text-[14px] text-[#8e929f]">
            Built monolithic residences, civic installations, and research pavilions
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#c8a265] text-[#121314] font-semibold shadow-sm'
                  : 'bg-[#1a1c1f] text-[#9ea2af] hover:text-[#eae7e1] border border-[#2b2e35]'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-[#686c78] text-[11px] font-mono ml-1 hidden sm:inline">
            {filteredProjects.length} Projects
          </span>
        </div>
      </div>

      {/* Responsive Grid: 2 cols on mobile, 3 on tablet, 3-4 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {filteredProjects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelectProject(project)}
            className="group relative aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden bg-[#1c1e22] border border-[#272a30] hover:border-[#c8a265]/50 focus:outline-none focus:ring-1 focus:ring-[#c8a265] cursor-pointer shadow-sm hover:shadow-lg transition-all"
            title={`${project.title} — ${project.subtitle}`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
            />

            {/* Badges on image */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-[#121315]/85 backdrop-blur-md text-[10px] text-[#c8a265] font-semibold uppercase tracking-wider border border-[#2a2c32]">
                {project.category}
              </span>
            </div>

            {/* Permanent bottom label gradient on desktop & mobile */}
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end text-left transition-all">
              <span className="text-[13px] sm:text-[14px] font-semibold text-[#f5f4ef] leading-tight group-hover:text-[#c8a265] transition-colors line-clamp-1">
                {project.title}
              </span>
              <span className="text-[11px] text-[#b0b3bc] truncate mt-0.5">
                {project.location} · {project.year}
              </span>
            </div>

            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-[#0d0e0f]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-[#161719]/80 backdrop-blur-md border border-[#c8a265]/50 flex items-center justify-center text-[#c8a265] shadow-lg scale-90 group-hover:scale-100 transition-transform">
                <span className="material-symbols-outlined text-[22px]">zoom_in</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
