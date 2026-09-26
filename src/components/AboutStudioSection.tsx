import React from 'react';
import { ARCHITECT_INFO } from '../data/architecturalData';

export const AboutStudioSection: React.FC = () => {
  return (
    <section id="about-studio" className="px-4 py-8 flex flex-col gap-5">
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[22px] font-bold text-[#f5f4ef] font-serif">About the Atelier</h2>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#1f2125] border border-[#2d3036] text-[#c8a265] text-[11px] uppercase tracking-wider font-semibold">
          Studio Profile
        </span>
      </div>

      {/* Narrative Paragraphs */}
      <div className="flex flex-col gap-3 text-[#9ea2af] text-[14px] leading-[22px]">
        <p>
          {ARCHITECT_INFO.bioSummary}
        </p>
        <p>
          {ARCHITECT_INFO.bioExtended}
        </p>
      </div>

      {/* Studio Tectonic Principles & Architectural Disciplines */}
      <div 
        id="studio-disciplines"
        className="mt-1 p-5 rounded-xl bg-[#1a1c1f] border border-[#282a30] shadow-sm flex flex-col gap-4"
      >
        <div className="flex items-center justify-between border-b border-[#26282e] pb-3">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-[#c8a265] font-semibold">
              Atelier Methodology
            </span>
            <span className="text-[17px] font-semibold text-[#f5f4ef] font-serif">
              Tectonic Foundations &amp; Material Practice
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded bg-[#24262c] text-[#c8a265] text-[11px] font-mono border border-[#30333b]">
            Monolithic
          </span>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-lg bg-[#141517] border border-[#23252a] flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[#c8a265]">
              <span className="material-symbols-outlined text-[18px]">foundation</span>
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#f5f4ef]">Geological Mass</span>
            </div>
            <p className="text-[12px] text-[#8e929f] leading-relaxed">
              Monolithic board-formed concrete, basalt stonework, and heavy timber joinery engineered for century-long permanence.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#141517] border border-[#23252a] flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[#c8a265]">
              <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#f5f4ef]">Daylight Choreography</span>
            </div>
            <p className="text-[12px] text-[#8e929f] leading-relaxed">
              Subterranean lightwells and parametric brise-soleil facades that sculpt changing diurnal shadows into living spaces.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#141517] border border-[#23252a] flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[#c8a265]">
              <span className="material-symbols-outlined text-[18px]">architecture</span>
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#f5f4ef]">Precision Detailing</span>
            </div>
            <p className="text-[12px] text-[#8e929f] leading-relaxed">
              Millimeter fabrication tolerances, physical 1:1 scale mockups, and coordinated BIM technical drawings.
            </p>
          </div>
        </div>

        {/* Studio Key Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#26282e] text-center">
          <div>
            <div className="text-[18px] font-serif font-bold text-[#f5f4ef]">18+</div>
            <div className="text-[10px] text-[#858895] uppercase tracking-wider font-mono">Built Pavilions</div>
          </div>
          <div>
            <div className="text-[18px] font-serif font-bold text-[#c8a265]">15 Yrs</div>
            <div className="text-[10px] text-[#858895] uppercase tracking-wider font-mono">Tectonic Practice</div>
          </div>
          <div>
            <div className="text-[18px] font-serif font-bold text-[#f5f4ef]">Zurich / NYC</div>
            <div className="text-[10px] text-[#858895] uppercase tracking-wider font-mono">Studio Locations</div>
          </div>
        </div>
      </div>
    </section>
  );
};
