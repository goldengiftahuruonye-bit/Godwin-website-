import React from 'react';
import { ARCHITECT_INFO } from '../data/architecturalData';

export const AboutStudioSection: React.FC = () => {
  return (
    <section id="about-studio" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col gap-8">
      {/* 2-Column Responsive Layout on Desktop/Tablet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Narrative Biography & Spatial Manifesto */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[24px] sm:text-[28px] font-bold text-[#f5f4ef] font-serif">
              About the Atelier
            </h2>
            <span className="px-3 py-1 rounded-full bg-[#1f2125] border border-[#2d3036] text-[#c8a265] text-[11px] uppercase tracking-wider font-semibold">
              Studio Profile
            </span>
          </div>

          <div className="flex flex-col gap-4 text-[#9ea2af] text-[14px] sm:text-[15px] leading-[24px] sm:leading-[26px]">
            <p>
              {ARCHITECT_INFO.bioSummary}
            </p>
            <p>
              {ARCHITECT_INFO.bioExtended}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#16171a] border-l-2 border-[#c8a265] text-xs text-[#a2a6b2] italic">
            “Architecture begins when we cease treating materials as mere surfaces and begin honoring their geological and physical weight.”
            <span className="block mt-1 font-mono text-[10px] text-[#c8a265] not-italic">— Richard Godwin, Atelier Principal</span>
          </div>
        </div>

        {/* Right Column: Atelier Methodology & Tectonic Foundations Card */}
        <div className="lg:col-span-7">
          <div 
            id="studio-disciplines"
            className="p-5 sm:p-7 rounded-2xl bg-[#1a1c1f] border border-[#282a30] shadow-md flex flex-col gap-5"
          >
            <div className="flex items-center justify-between border-b border-[#26282e] pb-4">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-[#c8a265] font-semibold">
                  Atelier Methodology
                </span>
                <span className="text-[18px] sm:text-[20px] font-semibold text-[#f5f4ef] font-serif">
                  Tectonic Foundations &amp; Material Practice
                </span>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#24262c] text-[#c8a265] text-[11px] font-mono border border-[#30333b]">
                Monolithic
              </span>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-xl bg-[#141517] border border-[#23252a] flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#c8a265]">
                  <span className="material-symbols-outlined text-[20px]">foundation</span>
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-[#f5f4ef]">Geological Mass</span>
                </div>
                <p className="text-[12px] text-[#8e929f] leading-relaxed">
                  Monolithic board-formed concrete, basalt stonework, and heavy timber joinery engineered for century-long permanence.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141517] border border-[#23252a] flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#c8a265]">
                  <span className="material-symbols-outlined text-[20px]">wb_sunny</span>
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-[#f5f4ef]">Daylight Choreography</span>
                </div>
                <p className="text-[12px] text-[#8e929f] leading-relaxed">
                  Subterranean lightwells and parametric brise-soleil facades that sculpt changing diurnal shadows into living spaces.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141517] border border-[#23252a] flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#c8a265]">
                  <span className="material-symbols-outlined text-[20px]">architecture</span>
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-[#f5f4ef]">Precision Detailing</span>
                </div>
                <p className="text-[12px] text-[#8e929f] leading-relaxed">
                  Millimeter fabrication tolerances, physical 1:1 scale mockups, and coordinated BIM technical drawings.
                </p>
              </div>
            </div>

            {/* Studio Key Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#26282e] text-center">
              <div className="p-2 rounded-lg bg-[#141517]/60">
                <div className="text-[22px] sm:text-[26px] font-serif font-bold text-[#f5f4ef]">18+</div>
                <div className="text-[10px] sm:text-[11px] text-[#858895] uppercase tracking-wider font-mono">Built Pavilions</div>
              </div>
              <div className="p-2 rounded-lg bg-[#141517]/60">
                <div className="text-[22px] sm:text-[26px] font-serif font-bold text-[#c8a265]">15 Yrs</div>
                <div className="text-[10px] sm:text-[11px] text-[#858895] uppercase tracking-wider font-mono">Tectonic Practice</div>
              </div>
              <div className="p-2 rounded-lg bg-[#141517]/60">
                <div className="text-[20px] sm:text-[24px] font-serif font-bold text-[#f5f4ef]">Zurich / NYC</div>
                <div className="text-[10px] sm:text-[11px] text-[#858895] uppercase tracking-wider font-mono">Studio Locations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
