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
    <section id="advisory-program" className="px-4 py-6">
      <div className="p-5 rounded-2xl bg-[#1a1c1f] border border-[#292c32] shadow-lg flex flex-col gap-4">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full bg-[#29251c] border border-[#c8a265]/40 text-[#c8a265] text-[11px] font-semibold tracking-wider">
            LIMITED AVAILABILITY
          </span>
          <span className="text-[#8e929f] text-[12px] font-mono">{mentorship.cohort}</span>
        </div>

        {/* Heading & Subtitle */}
        <div>
          <h3 className="text-[20px] font-bold text-[#f5f4ef] font-serif leading-snug">
            {mentorship.title}
          </h3>
          <p className="text-[13px] text-[#8e929f] mt-1 leading-relaxed">
            {mentorship.subtitle}
          </p>
        </div>

        {/* Feature Bullets */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#121315] border border-[#2b2e35] flex items-center justify-center shrink-0 mt-0.5 text-[#c8a265]">
              <span className="material-symbols-outlined text-[13px]">calendar_today</span>
            </div>
            <div className="text-[#d8dadf] text-[13px]">
              <span className="font-semibold text-[#f5f4ef]">Duration:</span> {mentorship.duration}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#121315] border border-[#2b2e35] flex items-center justify-center shrink-0 mt-0.5 text-[#c8a265]">
              <span className="material-symbols-outlined text-[13px]">videocam</span>
            </div>
            <div className="text-[#d8dadf] text-[13px]">
              <span className="font-semibold text-[#f5f4ef]">Cadence:</span> {mentorship.cadence}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#121315] border border-[#2b2e35] flex items-center justify-center shrink-0 mt-0.5 text-[#c8a265]">
              <span className="material-symbols-outlined text-[13px]">forum</span>
            </div>
            <div className="text-[#d8dadf] text-[13px]">
              <span className="font-semibold text-[#f5f4ef]">Method:</span> {mentorship.method}
            </div>
          </div>
        </div>

        {/* Custom Video Player Card Mock */}
        <div 
          onClick={onOpenVideo}
          className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#0c0d0e] mt-2 border border-[#292c32] shadow-inner group cursor-pointer"
        >
          <img
            src={ARCHITECT_INFO.videoThumbnail}
            alt="Studio Critique Walkthrough"
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
          />

          {/* Center Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#121315]/80 backdrop-blur-md border border-[#c8a265]/40 flex items-center justify-center text-[#eae7e1] group-hover:scale-110 group-hover:bg-[#c8a265] group-hover:text-[#121314] transition-all shadow-xl">
              <span className="material-symbols-outlined text-[28px] pl-0.5">play_arrow</span>
            </div>
          </div>

          {/* Video Scrub Bar & Timestamp */}
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col gap-1.5">
            <div className="w-full bg-[#34373e] h-1 rounded-full overflow-hidden">
              <div className="bg-[#c8a265] h-full w-[24%]" />
            </div>
            <div className="flex items-center justify-between text-[#eae7e1] text-[11px]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#c8a265]">play_circle</span>
                <span className="font-medium">Studio Walkthrough &amp; Redline Session</span>
              </div>
              <span className="font-mono text-[#b0b3bd]">{mentorship.videoDuration}</span>
            </div>
          </div>
        </div>

        {/* Quick Apply Button */}
        <button
          onClick={onOpenBooking}
          className="w-full mt-1 py-3 rounded-full bg-[#202227] hover:bg-[#2b2e35] text-[#eae7e1] hover:text-[#c8a265] border border-[#2e3137] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">edit_calendar</span>
          <span>Apply for Cohort 04 Review</span>
        </button>
      </div>
    </section>
  );
};
