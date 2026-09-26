import React, { useState } from 'react';
import { ARCHITECT_INFO } from '../../data/architecturalData';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(252); // 4:12 in seconds
  const [totalTime] = useState(1110); // 18:30 in seconds
  const [activeTab, setActiveTab] = useState<'walkthrough' | 'syllabus' | 'outcomes'>('walkthrough');

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#0e0f10]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-3xl bg-[#161719] rounded-2xl border border-[#2b2d33] overflow-hidden shadow-2xl flex flex-col">
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-[#26282e] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c8a265] animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-[#c8a265] font-semibold">Cohort 04 Masterclass Preview</span>
            <span className="text-[#5b5e67]">·</span>
            <span className="text-xs text-[#9a9da6]">{ARCHITECT_INFO.mentorship.duration}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#202227] hover:bg-[#2c2f36] text-[#eae7e1] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="relative w-full aspect-video bg-[#0b0c0d] overflow-hidden group">
          <img
            src={ARCHITECT_INFO.videoThumbnail}
            alt="Studio Masterclass Walkthrough"
            className="w-full h-full object-cover opacity-85"
          />

          {/* Playing overlay indicator */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#121315]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs text-[#eae7e1]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-mono text-[11px]">STUDIO CRITIQUE FEED · 4K UHD</span>
          </div>

          {/* Center Play/Pause button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="pointer-events-auto w-16 h-16 rounded-full bg-[#121315]/80 hover:bg-[#121315] text-[#eae7e1] backdrop-blur-md flex items-center justify-center shadow-2xl border border-[#c8a265]/40 transition-transform hover:scale-105 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[32px] text-[#c8a265] pl-0.5">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
          </div>

          {/* Bottom video scrub bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2">
            <div className="w-full bg-[#2d3036] h-1.5 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              setCurrentTime(pos * totalTime);
            }}>
              <div 
                className="bg-[#c8a265] h-full rounded-full transition-all"
                style={{ width: `${(currentTime / totalTime) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-[#eae7e1]">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-[#c8a265] cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]">{isPlaying ? 'pause' : 'play_arrow'}</span>
                </button>
                <span className="font-mono text-[11px] text-[#b0b3bd]">{formatTime(currentTime)} / {formatTime(totalTime)}</span>
                <span className="text-xs text-[#c8a265] font-medium hidden sm:inline">Chapter 2: Cantilever Deflection & Shuttering Tolerances</span>
              </div>
              <div className="flex items-center gap-3 text-[#b0b3bd]">
                <button className="hover:text-white cursor-pointer"><span className="material-symbols-outlined text-[18px]">subtitles</span></button>
                <button className="hover:text-white cursor-pointer"><span className="material-symbols-outlined text-[18px]">volume_up</span></button>
                <button className="hover:text-white cursor-pointer"><span className="material-symbols-outlined text-[18px]">fullscreen</span></button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation & Content */}
        <div className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#26282e] pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('walkthrough')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'walkthrough' ? 'bg-[#25272d] text-[#c8a265]' : 'text-[#848895] hover:text-[#eae7e1]'
                }`}
              >
                Critique Walkthrough
              </button>
              <button
                onClick={() => setActiveTab('syllabus')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'syllabus' ? 'bg-[#25272d] text-[#c8a265]' : 'text-[#848895] hover:text-[#eae7e1]'
                }`}
              >
                6-Month Syllabus
              </button>
              <button
                onClick={() => setActiveTab('outcomes')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'outcomes' ? 'bg-[#25272d] text-[#c8a265]' : 'text-[#848895] hover:text-[#eae7e1]'
                }`}
              >
                Cohort Deliverables
              </button>
            </div>
            <span className="text-xs text-[#c8a265] font-medium hidden sm:inline">
              Only {ARCHITECT_INFO.mentorship.spotsRemaining} Seats Left in Cohort 04
            </span>
          </div>

          {activeTab === 'walkthrough' && (
            <div className="text-xs text-[#b8bac4] space-y-2">
              <p>
                In this preview session, Richard Godwin demonstrates live redline analysis on an 8-story cross-laminated timber hybrid civic building in Zurich.
              </p>
              <p>
                Watch how we deconstruct the building envelope into three primary thermal zones, re-route plumbing risers into modular structural cavities, and specify seismic dowel pin details.
              </p>
            </div>
          )}

          {activeTab === 'syllabus' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#1a1c1f] border border-[#27292f]">
                <span className="text-[#c8a265] font-semibold block">Month 1–2: Tectonic Assemblies</span>
                <span className="text-[#9699a4]">Thermal massing, concrete mixology & curtain wall envelope integration.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#1a1c1f] border border-[#27292f]">
                <span className="text-[#c8a265] font-semibold block">Month 3–4: Studio Economics & Fees</span>
                <span className="text-[#9699a4]">Structuring high-margin commission contracts & preventing scope creep.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#1a1c1f] border border-[#27292f]">
                <span className="text-[#c8a265] font-semibold block">Month 5: Competition Strategy</span>
                <span className="text-[#9699a4]">Framing provocative architectural narratives for jury panels.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#1a1c1f] border border-[#27292f]">
                <span className="text-[#c8a265] font-semibold block">Month 6: Studio Monograph</span>
                <span className="text-[#9699a4]">Publishing your design philosophy, case studies, and brand monograph.</span>
              </div>
            </div>
          )}

          {activeTab === 'outcomes' && (
            <div className="p-3 rounded-lg bg-[#1a1c1f] border border-[#27292f] text-xs text-[#9699a4] space-y-1.5">
              <div className="flex items-center gap-2 text-[#eae7e1]">
                <span className="material-symbols-outlined text-[16px] text-[#c8a265]">check</span>
                <span>Complete review and redlines on 3 active projects in your studio</span>
              </div>
              <div className="flex items-center gap-2 text-[#eae7e1]">
                <span className="material-symbols-outlined text-[16px] text-[#c8a265]">check</span>
                <span>Full access to Godwin Studio Revit / Rhino detail standards ($400+ value)</span>
              </div>
              <div className="flex items-center gap-2 text-[#eae7e1]">
                <span className="material-symbols-outlined text-[16px] text-[#c8a265]">check</span>
                <span>Direct bi-weekly async Loom & voice review access with Richard Godwin</span>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2 border-t border-[#26282e]">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#787b86]">Cohort 04 Admissions</span>
              <span className="text-xs text-[#eae7e1] font-semibold">Starts October 2026</span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="px-6 py-2.5 rounded-full bg-[#c8a265] hover:bg-[#dfb776] text-[#141413] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              Apply for 1:1 Advisory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
