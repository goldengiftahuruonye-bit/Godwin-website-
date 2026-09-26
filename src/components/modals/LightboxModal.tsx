import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../types/architecture';

interface LightboxModalProps {
  project: Project | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex?: number;
  totalProjects?: number;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  project,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalProjects,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div 
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-[#0e0f10]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Top Header */}
          <div className="flex items-center justify-between text-[#eae7e1] max-w-2xl lg:max-w-4xl w-full mx-auto pb-3 border-b border-[#2a2c30]">
            <div className="flex flex-col min-w-0 pr-4">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`meta-${project.id}`}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs uppercase tracking-wider text-[#c8a265] font-semibold">{project.category}</span>
                    <span className="text-[#656870]">·</span>
                    <span className="text-xs text-[#9a9da6]">{project.year}</span>
                    <span className="text-[#656870]">·</span>
                    <span className="text-xs text-[#9a9da6]">{project.location}</span>
                    {currentIndex !== undefined && totalProjects !== undefined && (
                      <>
                        <span className="text-[#656870]">·</span>
                        <span className="text-[11px] font-mono text-[#c8a265] px-1.5 py-0.5 rounded bg-[#c8a265]/10 border border-[#c8a265]/20">
                          {String(currentIndex + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#f5f4ef] truncate mt-0.5">{project.title}</h3>
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#1e2023] hover:bg-[#2c2f34] text-[#eae7e1] flex items-center justify-center transition-colors shrink-0 cursor-pointer border border-[#2c2f36]"
              aria-label="Close Preview"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Main Image Container with cross-fade animation */}
          <div className="relative w-full max-w-2xl lg:max-w-4xl mx-auto my-auto py-4">
            <div className="relative w-full aspect-square sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#161719] border border-[#2b2d32] shadow-2xl">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover select-none"
                    loading="eager"
                    referrerPolicy="no-referrer"
                    draggable={false}
                  />
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded bg-[#101112]/85 backdrop-blur-md text-[11px] text-[#b0b3bc] border border-[#2a2c30] pointer-events-none">
                    Photo: {project.photographerCredit}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Side Floating Nav Arrows on the image */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#121316]/80 hover:bg-[#121316] text-[#eae7e1] border border-white/10 flex items-center justify-center backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer z-10 shadow-lg"
                aria-label="Previous Project"
              >
                <span className="material-symbols-outlined text-[22px]">chevron_left</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#121316]/80 hover:bg-[#121316] text-[#eae7e1] border border-white/10 flex items-center justify-center backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer z-10 shadow-lg"
                aria-label="Next Project"
              >
                <span className="material-symbols-outlined text-[22px]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Narrative & Navigation */}
          <div className="max-w-2xl lg:max-w-4xl w-full mx-auto flex flex-col gap-3 pt-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`desc-${project.id}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="p-4 rounded-xl bg-[#191a1d] border border-[#26282d] text-left"
              >
                <p className="text-sm text-[#d4d6dc] leading-relaxed mb-3">{project.fullNarrative}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-[#2a2c30] text-xs">
                  <div>
                    <span className="text-[#848792] block">Client</span>
                    <span className="text-[#eae7e1] font-medium">{project.client}</span>
                  </div>
                  <div>
                    <span className="text-[#848792] block">Gross Area</span>
                    <span className="text-[#eae7e1] font-medium">{project.area}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[#848792] block">Materiality</span>
                    <span className="text-[#c8a265] font-medium truncate block">{project.materials.join(', ')}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={onPrev}
                className="px-4 py-2 rounded-full bg-[#1f2125] hover:bg-[#2c2f35] text-[#eae7e1] text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border border-[#2d3036] active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_left</span> Previous Project
              </button>
              <span className="text-[11px] text-[#787b86] hidden sm:inline">Use ← → arrow keys or Esc to close</span>
              <button
                onClick={onNext}
                className="px-4 py-2 rounded-full bg-[#1f2125] hover:bg-[#2c2f35] text-[#eae7e1] text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border border-[#2d3036] active:scale-95"
              >
                Next Project <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

