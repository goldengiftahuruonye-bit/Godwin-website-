import React from 'react';
import { ARCHITECT_INFO } from '../data/architecturalData';
import { RgLogo } from './RgLogo';

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
      {/* Brand Monogram Crest Emblem */}
      <div className="mb-3 sm:mb-5">
        <RgLogo size="lg" glow className="hover:scale-105 transition-transform" />
      </div>

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

      {/* 4. Hero CTA Section (Two Distinct Cards: Left Secondary Inquiry, Right Dominant Primary Showcase) */}
      <div className="w-full max-w-4xl lg:max-w-5xl flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3.5 sm:gap-4 md:gap-5 lg:gap-6 mt-2">
        {/* LEFT CTA — SECONDARY ACTION: Inquire for Visualization Commission */}
        {/* On mobile: order-2 (underneath primary) | On desktop: order-1 (left) */}
        <button
          type="button"
          onClick={onOpenCommission}
          aria-label="Inquire for Visualization Commission"
          className="group order-2 md:order-1 flex-1 md:flex-[1] flex items-center justify-between p-2.5 sm:p-3 pl-3 sm:pl-3.5 md:pl-4 pr-3 sm:pr-3.5 md:pr-4 rounded-full bg-[#15161a]/90 hover:bg-[#1e2026] border border-[#292b33] hover:border-[#3d414d] text-left transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a265] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121314]"
        >
          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 pr-2">
            {/* Small circular avatar */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0 bg-[#212329] border border-[#353842] shadow-inner">
              <img
                src={ARCHITECT_INFO.portrait}
                alt={ARCHITECT_INFO.name}
                width={48}
                height={48}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Typography */}
            <div className="flex flex-col text-left min-w-0">
              <span className="text-[13px] sm:text-[14px] md:text-[14.5px] font-semibold text-[#f1eee8] group-hover:text-white leading-snug transition-colors truncate">
                Inquire for Visualization Commission
              </span>
              <span className="text-[11px] sm:text-[11.5px] md:text-[12px] text-[#898d99] font-normal leading-tight mt-0.5 truncate">
                Direct Atelier Engagement • Zurich &amp; NYC
              </span>
            </div>
          </div>

          {/* Far-right circular arrow button */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/[0.06] group-hover:bg-white/[0.12] border border-white/10 text-[#d8dadf] group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105">
            <span className="material-symbols-outlined text-[17px] sm:text-[19px] md:text-[20px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              arrow_outward
            </span>
          </div>
        </button>

        {/* RIGHT CTA — PRIMARY ACTION: Explore The Interior Design Studio */}
        {/* On mobile: order-1 (rendered on top) | On desktop: order-2 (right) */}
        {/* Visually dominant: 1.15-1.3x weight, warm gold gradient, soft ambient glow, hover elevation */}
        <button
          type="button"
          onClick={onScrollToProjects}
          aria-label="Explore the Interior Design Studio portfolio"
          className="group order-1 md:order-2 flex-1 md:flex-[1.28] flex items-center justify-between p-2.5 sm:p-3 md:p-3.5 pl-3 sm:pl-3.5 md:pl-4 pr-3 sm:pr-3.5 md:pr-4 rounded-full bg-gradient-to-r from-[#dfbe7b] via-[#e5c786] to-[#d6b168] hover:from-[#e5c786] hover:to-[#dfbe7b] text-left transition-all duration-300 ease-out shadow-[0_4px_25px_rgba(223,190,123,0.32),0_1px_3px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_35px_rgba(223,190,123,0.48),0_2px_6px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 sm:hover:-translate-y-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfbe7b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121314]"
        >
          <div className="flex items-center gap-3 sm:gap-3.5 md:gap-4 min-w-0 pr-2">
            {/* Dark circular architectural icon area */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#141517] text-[#dfbe7b] flex items-center justify-center shrink-0 shadow-md border border-black/15 group-hover:scale-105 transition-transform duration-300">
              {/* Architectural pavilion/facade outline icon */}
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#dfbe7b]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 10.5L12 3l9 7.5v9.5a1 1 0 01-1 1H4a1 1 0 01-1-1v-9.5z" />
                <path d="M7 21V11" />
                <path d="M10 21V8.5" />
                <path d="M14 21V8.5" />
                <path d="M17 21V12.5" />
              </svg>
            </div>

            {/* Dominant Typography hierarchy */}
            <div className="flex flex-col text-left min-w-0">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#3a2e19] leading-none mb-1">
                FEATURED STUDIO →
              </span>
              <h3 className="font-sans font-extrabold text-[13px] sm:text-[15px] md:text-[16px] lg:text-[17px] text-[#121314] leading-[1.14] tracking-tight uppercase">
                EXPLORE THE INTERIOR DESIGN STUDIO
              </h3>
              <span className="text-[10.5px] sm:text-[11.5px] md:text-[12px] text-[#4d3d23] font-medium leading-tight mt-0.5 truncate">
                View the full interior design portfolio
              </span>
            </div>
          </div>

          {/* Far-right dark circular arrow button */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-[#141517] text-[#dfbe7b] flex items-center justify-center shrink-0 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:bg-[#1a1c1f]">
            <span className="material-symbols-outlined text-[19px] sm:text-[21px] md:text-[23px] text-[#dfbe7b] transition-transform duration-300 group-hover:translate-x-1">
              arrow_forward
            </span>
          </div>
        </button>
      </div>
    </section>
  );
};

