import React, { useState, useRef, useEffect } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'walkthrough' | 'syllabus' | 'outcomes'>('walkthrough');

  // Format mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * (videoRef.current.duration || duration);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const jumpToTime = (secs: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = secs;
    setCurrentTime(secs);
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Video event listeners
  useEffect(() => {
    if (!isOpen) return;
    const video = videoRef.current;
    if (!video) return;

    // Autoplay when opened
    video.play().catch(() => {
      // Browsers might require muted autoplay
      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => {});
    });

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('ended', onEnded);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentChapter =
    currentTime < 25
      ? 'Chapter 1: Monolithic Massing & Volumetric Section'
      : currentTime < 50
      ? 'Chapter 2: Daylight Choreography & Tectonic Tolerances'
      : 'Chapter 3: Shuttering Formwork & Materiality Detail';

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0e0f10]/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-4xl bg-[#161719] rounded-2xl border border-[#2b2d33] overflow-hidden shadow-2xl flex flex-col my-auto max-h-[95vh] overflow-y-auto">
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-[#26282e] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c8a265] animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-[#c8a265] font-semibold">
              Cohort 04 Masterclass Preview
            </span>
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

        {/* Real Playable HTML5 Video Player */}
        <div className="relative w-full aspect-video bg-[#0b0c0d] overflow-hidden group select-none">
          <video
            ref={videoRef}
            playsInline
            poster={ARCHITECT_INFO.videoThumbnail}
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
          >
            <source src="/videos/studio_masterclass_preview.mp4" type="video/mp4" />
            <source src="/videos/studio_masterclass_preview.webm" type="video/webm" />
            Your browser does not support HTML5 video.
          </video>

          {/* Playing overlay indicator */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#121315]/85 backdrop-blur-md px-3 py-1 rounded-full text-xs text-[#eae7e1] border border-white/10 pointer-events-none">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#c8a265] animate-ping' : 'bg-[#7d818e]'}`} />
            <span className="font-mono text-[11px] tracking-wide">
              {isPlaying ? 'LIVE ARCHITECTURAL STREAM · 4K UHD' : 'PAUSED'}
            </span>
          </div>

          {/* Center Play/Pause button when paused */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all cursor-pointer z-10"
            >
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#121315]/90 hover:bg-[#c8a265] text-[#f5f4ef] hover:text-[#121314] backdrop-blur-md flex items-center justify-center shadow-2xl border border-[#c8a265]/50 transition-all hover:scale-105">
                <span className="material-symbols-outlined text-[36px] sm:text-[42px] pl-1">
                  play_arrow
                </span>
              </div>
            </div>
          )}

          {/* Bottom video scrub bar & controls */}
          <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-2 z-20">
            {/* Interactive Progress Bar */}
            <div
              className="w-full bg-[#2a2d34] hover:bg-[#343842] h-2 rounded-full overflow-hidden cursor-pointer relative group/scrub transition-all"
              onClick={handleSeek}
              title="Click to seek"
            >
              <div
                className="bg-[#c8a265] h-full rounded-full transition-all relative"
                style={{ width: `${Math.min(100, Math.max(0, (currentTime / (duration || 75)) * 100))}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/scrub:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between text-xs text-[#eae7e1] pt-0.5">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="hover:text-[#c8a265] cursor-pointer w-7 h-7 rounded-full bg-white/10 flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-[19px]">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <span className="font-mono text-[11px] text-[#b0b3bd]">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <span className="text-xs text-[#c8a265] font-medium hidden sm:inline">
                  {currentChapter}
                </span>
              </div>

              <div className="flex items-center gap-3 text-[#b0b3bd]">
                <button
                  onClick={toggleMute}
                  className="hover:text-white cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  <span className="material-symbols-outlined text-[19px]">
                    {isMuted ? 'volume_off' : 'volume_up'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation & Chapter Shortcuts */}
        <div className="p-4 sm:p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#26282e] pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('walkthrough')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'walkthrough'
                    ? 'bg-[#25272d] text-[#c8a265]'
                    : 'text-[#848895] hover:text-[#eae7e1]'
                }`}
              >
                Critique Chapters
              </button>
              <button
                onClick={() => setActiveTab('syllabus')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'syllabus'
                    ? 'bg-[#25272d] text-[#c8a265]'
                    : 'text-[#848895] hover:text-[#eae7e1]'
                }`}
              >
                6-Month Syllabus
              </button>
              <button
                onClick={() => setActiveTab('outcomes')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'outcomes'
                    ? 'bg-[#25272d] text-[#c8a265]'
                    : 'text-[#848895] hover:text-[#eae7e1]'
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
            <div className="space-y-2.5">
              <p className="text-xs text-[#b8bac4] leading-relaxed">
                In this preview session, Richard Godwin demonstrates live redline analysis on an 8-story cross-laminated timber hybrid civic building in Zurich. Click any chapter below to jump directly to that section in the video:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {[
                  { time: 5, label: '01: Monolithic Massing', desc: 'Volumetric proportion & void ratios' },
                  { time: 30, label: '02: Daylight Choreography', desc: 'Solar orientation & thermal envelope' },
                  { time: 55, label: '03: Materiality & Formwork', desc: 'Board-formed concrete tolerances' },
                ].map((chap) => (
                  <button
                    key={chap.time}
                    onClick={() => jumpToTime(chap.time)}
                    className="p-2.5 rounded-xl bg-[#191b1f] hover:bg-[#23262c] border border-[#27292f] hover:border-[#c8a265]/40 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#f5f4ef] group-hover:text-[#c8a265]">
                        {chap.label}
                      </span>
                      <span className="material-symbols-outlined text-[14px] text-[#717482] group-hover:text-[#c8a265]">
                        play_circle
                      </span>
                    </div>
                    <span className="text-[10px] text-[#818593] block mt-0.5">{chap.desc}</span>
                  </button>
                ))}
              </div>
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
