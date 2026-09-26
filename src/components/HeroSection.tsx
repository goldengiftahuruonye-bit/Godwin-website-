import React from 'react';
import { ARCHITECT_INFO } from '../data/architecturalData';

interface HeroSectionProps {
  onScrollToProjects: () => void;
  onScrollToPodcast: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToProjects,
  onScrollToPodcast,
}) => {
  return (
    <section className="px-4 py-8 flex flex-col items-center text-center relative">
      {/* 1. Status Pill with pulsing bronze dot */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e2023] border border-[#2d3036] text-[#c8a265] text-[11px] font-semibold tracking-wider uppercase mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c8a265] animate-pulse" />
        <span>NOW ACCEPTING SELECT COMMISSIONS & ADVISORY</span>
      </div>

      {/* 2. Editorial Quote in Newsreader Serif */}
      <blockquote className="font-serif-quote text-[25px] sm:text-[27px] leading-[36px] text-[#f2efe9] mb-4 max-w-sm tracking-tight">
        “Synthesizing geological permanence, ambient daylight, and tectonic rigor into spaces that dignify human existence.”
      </blockquote>

      {/* 3. Architect Attribution Title */}
      <p className="text-[12px] text-[#9a9da6] uppercase tracking-widest font-medium mb-8">
        Alexander Vance — Principal Architect &amp; Spatial Theorist
      </p>

      {/* 4. Stacked Action Pills */}
      <div className="w-full flex flex-col gap-3">
        {/* Button 1: Audio Broadcast Pill */}
        <button
          onClick={onScrollToPodcast}
          className="group flex items-center justify-between p-2.5 pl-3 rounded-full bg-[#1b1c1f] hover:bg-[#24262b] border border-[#292c32] hover:border-[#383c45] transition-all shadow-md text-left cursor-pointer w-full"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-[#25272c] border border-[#3b3e47]">
              <img
                src={ARCHITECT_INFO.portrait}
                alt="Alexander Vance"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col text-left min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[15px] font-semibold text-[#f5f4ef] leading-tight">
                  Listen to Spatial Discourse
                </span>
                <span className="material-symbols-outlined text-[#c8a265] text-[16px]">
                  graphic_eq
                </span>
              </div>
              <span className="text-[12px] text-[#8e929f] truncate">
                {ARCHITECT_INFO.podcast.episode}
              </span>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#27292f] group-hover:bg-[#c8a265] text-[#eae7e1] group-hover:text-[#121314] flex items-center justify-center shrink-0 group-hover:scale-105 transition-all mr-1 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
          </div>
        </button>

        {/* Button 2: Explore Projects Pill */}
        <button
          onClick={onScrollToProjects}
          className="flex items-center justify-between px-5 py-3 rounded-full bg-[#1b1c1f] hover:bg-[#24262b] border border-[#292c32] hover:border-[#383c45] text-[#eae7e1] hover:text-[#c8a265] transition-all shadow-md cursor-pointer w-full"
        >
          <span className="text-[13px] font-medium tracking-wide">
            Explore Built Projects &amp; Drawings
          </span>
          <span className="material-symbols-outlined text-[20px] text-[#8e929f] group-hover:translate-x-0.5 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>
    </section>
  );
};
