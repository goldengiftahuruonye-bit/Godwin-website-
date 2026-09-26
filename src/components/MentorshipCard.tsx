import React from 'react';
import { ARCHITECT_INFO } from '../data/architecturalData';

interface MentorshipCardProps {
  onOpenVideo: () => void;
  onOpenBooking: () => void;
}

export const MentorshipCard: React.FC<MentorshipCardProps> = ({
  onOpenVideo,
  onOpenBooking,
}) => {
  const { mentorship } = ARCHITECT_INFO;

  return (
    <section id="advisory-program" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="p-5 sm:p-8 lg:p-10 rounded-2xl bg-[#1a1c1f] border border-[#292c32] shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Advisory Program Details */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5">
            {/* Top Badges */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#29251c] border border-[#c8a265]/40 text-[#c8a265] text-[11px] font-semibold tracking-wider">
                LIMITED AVAILABILITY
              </span>
              <span className="text-[#8e929f] text-[12px] font-mono">{mentorship.cohort}</span>
            </div>

            {/* Heading & Subtitle */}
            <div>
              <h3 className="text-[22px] sm:text-[26px] font-bold text-[#f5f4ef] font-serif leading-snug">
                {mentorship.title}
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#8e929f] mt-2 leading-relaxed">
                {mentorship.subtitle}
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#121315] border border-[#2b2e35] flex items-center justify-center shrink-0 mt-0.5 text-[#c8a265]">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                </div>
                <div className="text-[#d8dadf] text-[13px] sm:text-[14px]">
                  <span className="font-semibold text-[#f5f4ef]">Duration:</span> {mentorship.duration}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#121315] border border-[#2b2e35] flex items-center justify-center shrink-0 mt-0.5 text-[#c8a265]">
                  <span className="material-symbols-outlined text-[14px]">videocam</span>
                </div>
                <div className="text-[#d8dadf] text-[13px] sm:text-[14px]">
                  <span className="font-semibold text-[#f5f4ef]">Cadence:</span> {mentorship.cadence}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#121315] border border-[#2b2e35] flex items-center justify-center shrink-0 mt-0.5 text-[#c8a265]">
                  <span className="material-symbols-outlined text-[14px]">forum</span>
                </div>
                <div className="text-[#d8dadf] text-[13px] sm:text-[14px]">
                  <span className="font-semibold text-[#f5f4ef]">Method:</span> {mentorship.method}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={onOpenBooking}
              className="w-full mt-2 py-3.5 px-6 rounded-full bg-[#202227] hover:bg-[#c8a265] text-[#eae7e1] hover:text-[#121314] border border-[#2e3137] hover:border-[#c8a265] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span className="material-symbols-outlined text-[17px]">edit_calendar</span>
              <span>Apply for Cohort 04 Review</span>
            </button>
          </div>

          {/* Right Column: Custom Video Player Mockup */}
          <div className="lg:col-span-7">
            <div 
              onClick={onOpenVideo}
              className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-[#0c0d0e] border border-[#292c32] shadow-2xl group cursor-pointer"
            >
              <img
                src={ARCHITECT_INFO.videoThumbnail}
                alt="Studio Critique Walkthrough"
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Center Play Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#121315]/85 backdrop-blur-md border border-[#c8a265]/50 flex items-center justify-center text-[#eae7e1] group-hover:scale-110 group-hover:bg-[#c8a265] group-hover:text-[#121314] transition-all shadow-2xl">
                  <span className="material-symbols-outlined text-[28px] sm:text-[34px] pl-0.5">play_arrow</span>
                </div>
              </div>

              {/* Video Scrub Bar & Timestamp */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-2">
                <div className="w-full bg-[#34373e] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#c8a265] h-full w-[24%]" />
                </div>
                <div className="flex items-center justify-between text-[#eae7e1] text-[11px] sm:text-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#c8a265]">play_circle</span>
                    <span className="font-medium">Studio Walkthrough &amp; Redline Session</span>
                  </div>
                  <span className="font-mono text-[#b0b3bd]">{mentorship.videoDuration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
