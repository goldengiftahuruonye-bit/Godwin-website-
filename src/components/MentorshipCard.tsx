import React, { useState, useRef, useEffect } from 'react';
import { ARCHITECT_INFO } from '../data/architecturalData';

interface MentorshipCardProps {
  onOpenVideo: () => void;
  onOpenBooking: () => void;
  onOpenPaymentPlan?: () => void;
}

export const MentorshipCard: React.FC<MentorshipCardProps> = ({
  onOpenVideo,
  onOpenBooking,
  onOpenPaymentPlan,
}) => {
  const { mentorship } = ARCHITECT_INFO;
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Time format helper mm:ss
  const formatTime = (timeInSecs: number) => {
    if (isNaN(timeInSecs)) return '00:00';
    const mins = Math.floor(timeInSecs / 60);
    const secs = Math.floor(timeInSecs % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle play/pause
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

  // Toggle mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Scrub bar change
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = newPercentage * (videoRef.current.duration || duration);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Enter native fullscreen
  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      videoRef.current.requestFullscreen?.().catch(() => {
        onOpenVideo();
      });
    }
  };

  // Update time and duration from video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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
  }, []);

  // Chapter label based on playback time
  const currentChapter =
    currentTime < 25
      ? '01: Monolithic Massing & Volumetric Section'
      : currentTime < 50
      ? '02: Daylight Choreography & Tectonic Tolerances'
      : '03: Shuttering Formwork & Materiality Detail';

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

            {/* Action Buttons: Apply & Payment Plan */}
            <div className="flex flex-col sm:flex-row gap-2.5 mt-2">
              <button
                onClick={onOpenBooking}
                className="flex-1 py-3 px-5 rounded-full bg-[#c8a265] hover:bg-[#d8b375] text-[#121314] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
              >
                <span className="material-symbols-outlined text-[17px]">edit_calendar</span>
                <span>Apply for Cohort 04</span>
              </button>

              <button
                onClick={onOpenPaymentPlan || onOpenBooking}
                className="py-3 px-4 rounded-full bg-[#202227] hover:bg-[#282a31] text-[#c8a265] hover:text-[#f5f4ef] border border-[#343842] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                title="Inquire about 2-part milestone or 6-month monthly payment plans"
              >
                <span className="material-symbols-outlined text-[16px]">credit_card</span>
                <span>Payment Plan Options</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#7d818f] font-mono pt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8a265]" />
              <span>Inquiries &amp; financing dispatched directly to: goldengiftahuruonye@gmail.com</span>
            </div>
          </div>

          {/* Right Column: Realistic & Playable Interactive Video Player */}
          <div className="lg:col-span-7">
            <div
              className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-[#0c0d0e] border border-[#292c32] shadow-2xl group select-none"
              onMouseEnter={() => setShowControls(true)}
            >
              {/* Actual HTML5 Video Element */}
              <video
                ref={videoRef}
                playsInline
                preload="metadata"
                poster={ARCHITECT_INFO.videoThumbnail}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer"
              >
                <source src="/videos/studio_masterclass_preview.mp4" type="video/mp4" />
                <source src="/videos/studio_masterclass_preview.webm" type="video/webm" />
                Your browser does not support HTML5 video.
              </video>

              {/* Status Header Overlay */}
              <div className="absolute top-3 sm:top-4 inset-x-3 sm:inset-x-4 flex items-center justify-between pointer-events-none z-10 transition-opacity">
                <div className="inline-flex items-center gap-2 bg-[#121315]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-[#eae7e1]">
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#c8a265] animate-ping' : 'bg-[#7d818e]'}`} />
                  <span className="font-mono uppercase tracking-wider text-[10px]">
                    {isPlaying ? 'CRITIQUE STREAM ACTIVE' : 'STUDIO WALKTHROUGH'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onOpenVideo}
                  className="pointer-events-auto inline-flex items-center gap-1.5 bg-[#121315]/85 hover:bg-[#1f2127] backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 hover:border-[#c8a265]/50 text-[11px] text-[#c8a265] transition-all cursor-pointer shadow-lg"
                  title="Open Cinema Mode with Syllabus"
                >
                  <span className="material-symbols-outlined text-[15px]">fullscreen</span>
                  <span className="hidden sm:inline font-medium">Expand Modal</span>
                </button>
              </div>

              {/* Large Center Play/Pause Button Overlay (Visible when paused or hovered) */}
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all cursor-pointer z-10"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#141518]/90 hover:bg-[#c8a265] text-[#f5f4ef] hover:text-[#121314] backdrop-blur-md border border-[#c8a265]/60 flex items-center justify-center transition-all transform hover:scale-110 shadow-[0_8px_32px_rgba(0,0,0,0.8)] group-hover:border-[#c8a265]">
                    <span className="material-symbols-outlined text-[34px] sm:text-[40px] pl-1">
                      play_arrow
                    </span>
                  </div>
                </div>
              )}

              {/* Bottom Interactive Video Controls Dock */}
              <div
                className={`absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col gap-2 z-20 transition-opacity duration-300 ${
                  showControls || !isPlaying ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                }`}
              >
                {/* Interactive Clickable/Draggable Scrub Bar */}
                <div
                  onClick={handleSeek}
                  className="w-full bg-[#2a2d34] hover:bg-[#343842] h-2 rounded-full overflow-hidden cursor-pointer relative group/scrub transition-all"
                  title="Click to seek"
                >
                  <div
                    className="bg-[#c8a265] h-full rounded-full transition-all relative"
                    style={{ width: `${Math.min(100, Math.max(0, (currentTime / (duration || 75)) * 100))}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/scrub:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Control Buttons & Timestamp Information */}
                <div className="flex items-center justify-between text-[#eae7e1] text-[11px] sm:text-xs pt-1">
                  {/* Left: Play/Pause, Mute, Chapter */}
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#c8a265] text-[#eae7e1] hover:text-[#121314] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                      title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                    >
                      <span className="material-symbols-outlined text-[17px]">
                        {isPlaying ? 'pause' : 'play_arrow'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="text-[#9ea2af] hover:text-[#f5f4ef] transition-colors cursor-pointer shrink-0"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isMuted ? 'volume_off' : 'volume_up'}
                      </span>
                    </button>

                    <span className="font-mono text-[#a2a6b4] text-[11px] shrink-0">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>

                    <span className="text-[11px] text-[#c8a265] font-medium truncate hidden md:inline pl-1">
                      {currentChapter}
                    </span>
                  </div>

                  {/* Right: Fullscreen / Expand */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 text-[#b2b5c0] hover:text-[#f5f4ef] flex items-center justify-center transition-colors cursor-pointer"
                      title="Fullscreen"
                    >
                      <span className="material-symbols-outlined text-[17px]">fullscreen</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
