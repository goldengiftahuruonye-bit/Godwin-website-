import React, { useState, useEffect } from 'react';
import { ARCHITECT_INFO } from '../data/architecturalData';

export const AboutStudioSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(494); // 08:14
  const totalSeconds = 2880; // 48:00

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSeconds((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return totalSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalSeconds]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSkip = (delta: number) => {
    setCurrentSeconds((prev) => Math.max(0, Math.min(totalSeconds, prev + delta)));
  };

  const progressPercent = (currentSeconds / totalSeconds) * 100;

  return (
    <section id="about-studio" className="px-4 py-8 flex flex-col gap-4">
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

      {/* Highlighted Media Sub-Card (Podcast Broadcast) */}
      <div 
        id="podcast-highlight"
        className="mt-2 p-4 rounded-xl bg-[#1a1c1f] border border-[#282a30] shadow-sm flex flex-col gap-3"
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-[#c8a265] font-semibold">
              Featured Broadcast
            </span>
            <span className="text-[17px] font-semibold text-[#f5f4ef] font-serif">
              {ARCHITECT_INFO.podcast.title}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#24262c] text-[#8e929f] text-[11px] font-mono border border-[#30333b]">
            {ARCHITECT_INFO.podcast.duration}
          </span>
        </div>

        <p className="text-[13px] text-[#8e929f] leading-relaxed">
          {ARCHITECT_INFO.podcast.description}
        </p>

        {/* Audio Scrub Mock Container */}
        <div className="p-3 rounded-lg bg-[#141517] border border-[#23252a] flex flex-col gap-2">
          {/* Timestamp and Waveform */}
          <div className="flex items-center justify-between text-[#858895] text-[11px] font-mono">
            <span>{formatSeconds(currentSeconds)}</span>
            
            {/* Waveform graphic */}
            <div className="flex items-center gap-1 h-6">
              {[40, 70, 30, 85, 55, 95, 45, 60, 35, 75, 50, 90, 65, 35].map((height, idx) => (
                <span
                  key={idx}
                  className={`w-0.5 rounded-full transition-all duration-300 ${
                    idx < 6 ? 'bg-[#c8a265]' : 'bg-[#3e424c]'
                  } ${isPlaying ? 'animate-pulse' : ''}`}
                  style={{ 
                    height: `${height * (isPlaying ? 0.3 + (idx % 3) * 0.2 : 0.22)}px`,
                    animationDelay: `${idx * 100}ms`
                  }}
                />
              ))}
            </div>

            <span>{formatSeconds(totalSeconds)}</span>
          </div>

          {/* Scrub Track */}
          <div 
            className="w-full bg-[#24262c] h-1.5 rounded-full overflow-hidden cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              setCurrentSeconds(Math.floor(pct * totalSeconds));
            }}
          >
            <div
              className="bg-[#c8a265] h-full rounded-full transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Audio Controls */}
          <div className="flex items-center justify-center gap-6 pt-1 text-[#eae7e1]">
            <button
              type="button"
              onClick={() => handleSkip(-10)}
              className="text-[#8e929f] hover:text-[#eae7e1] transition-colors p-1 cursor-pointer"
              title="Rewind 10s"
            >
              <span className="material-symbols-outlined text-[20px]">replay_10</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 rounded-full bg-[#c8a265] hover:bg-[#dfb776] text-[#121314] flex items-center justify-center shadow transition-transform active:scale-95 cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSkip(30)}
              className="text-[#8e929f] hover:text-[#eae7e1] transition-colors p-1 cursor-pointer"
              title="Forward 30s"
            >
              <span className="material-symbols-outlined text-[20px]">forward_30</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
