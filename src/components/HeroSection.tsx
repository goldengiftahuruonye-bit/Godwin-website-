import React from 'react';
import { ARCHITECT_INFO } from '../data/architecturalData';

interface HeroSectionProps {
  onScrollToProjects: () => void;
  onOpenCommission: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToProjects,
  onOpenCommission,
}) => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24 flex flex-col items-center text-center relative">
      {/* 1. Status Pill with pulsing bronze dot */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:py-1.5 rounded-full bg-[#1e2023] border border-[#2d3036] text-[#c8a265] text-[11px] sm:text-[12px] font-semibold tracking-wider uppercase mb-5 sm:mb-8">
        <span className="w-2 h-2 rounded-full bg-[#c8a265] animate-pulse" />
        <span>NOW ACCEPTING SELECT COMMISSIONS &amp; ADVISORY</span>
      </div>

      {/* 2. Editorial Quote in Newsreader Serif */}
      <blockquote className="font-serif-quote text-[25px] sm:text-[36px] md:text-[44px] lg:text-[50px] leading-[1.26] sm:leading-[1.2] text-[#f2efe9] mb-4 sm:mb-6 max-w-3xl lg:max-w-4xl tracking-tight">
        “Synthesizing geological permanence, ambient daylight, and tectonic rigor into spaces that dignify human existence.”
      </blockquote>

      {/* 3. Architect Attribution Title */}
      <p className="text-[11px] sm:text-[13px] text-[#9a9da6] uppercase tracking-[0.2em] font-medium mb-8 sm:mb-12">
        {ARCHITECT_INFO.name} — {ARCHITECT_INFO.titles}
      </p>

      {/* 4. Action Pills (Stacked on mobile, side-by-side on tablet & desktop) */}
      <div className="w-full max-w-xl sm:max-w-2xl lg:max-w-3xl flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch justify-center">
        {/* Button 1: Studio Commission & Advisory Inquiry */}
        <button
          onClick={onOpenCommission}
          className="group flex-1 flex items-center justify-between p-2.5 sm:p-3 pl-3 sm:pl-4 rounded-full bg-[#1b1c1f] hover:bg-[#24262b] border border-[#292c32] hover:border-[#383c45] transition-all shadow-md text-left cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 bg-[#25272c] border border-[#3b3e47]">
              <img
                src={ARCHITECT_INFO.portrait}
                alt={ARCHITECT_INFO.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="text-[14px] sm:text-[15px] font-semibold text-[#f5f4ef] leading-tight truncate">
                Inquire for Architectural Commission
              </span>
              <span className="text-[11px] sm:text-[12px] text-[#8e929f] truncate">
                Direct Atelier Engagement • Zurich &amp; NYC
              </span>
            </div>
          </div>

          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#27292f] group-hover:bg-[#c8a265] text-[#eae7e1] group-hover:text-[#121314] flex items-center justify-center shrink-0 group-hover:scale-105 transition-all mr-1 shadow-sm">
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">arrow_outward</span>
          </div>
        </button>

        {/* Button 2: Explore Projects Pill */}
        <button
          onClick={onScrollToProjects}
          className="group flex-1 flex items-center justify-between px-5 sm:px-6 py-3 rounded-full bg-[#1b1c1f] hover:bg-[#24262b] border border-[#292c32] hover:border-[#383c45] text-[#eae7e1] hover:text-[#c8a265] transition-all shadow-md cursor-pointer"
        >
          <span className="text-[13px] sm:text-[14px] font-medium tracking-wide">
            Explore Built Projects &amp; Drawings
          </span>
          <span className="material-symbols-outlined text-[20px] text-[#8e929f] group-hover:text-[#c8a265] group-hover:translate-x-1 transition-all">
            arrow_forward
          </span>
        </button>
      </div>
    </section>
  );
};

