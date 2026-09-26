import React, { useState } from 'react';
import { ARCHITECT_INFO } from '../data/architecturalData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMenu: () => void;
  viewMode: 'mobile' | 'expanded';
  onToggleViewMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenMenu,
  viewMode,
  onToggleViewMode,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <header className="fixed top-0 max-w-md w-full z-40 pt-safe bg-[#121314]/85 backdrop-blur-xl border-b border-[#25272b]/60 transition-all">
      <div className="h-16 px-4 flex items-center justify-between">
        {/* Left: Cart & Share buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={onOpenCart}
            className="relative w-11 h-11 flex items-center justify-center text-[#eae7e1] hover:text-[#c8a265] transition-colors cursor-pointer"
            aria-label="Shopping Bag"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-[#c8a265] text-[#121314] font-semibold text-[11px] rounded-full flex items-center justify-center animate-scale-in">
                {cartCount}
              </span>
            )}
          </button>
          
          <button
            onClick={handleShare}
            className="relative w-11 h-11 flex items-center justify-center text-[#9396a1] hover:text-[#eae7e1] transition-colors cursor-pointer"
            aria-label="Share Storefront"
            title="Share Atelier"
          >
            <span className="material-symbols-outlined text-[20px]">
              {copied ? 'check' : 'share'}
            </span>
            {copied && (
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#1e2025] text-[10px] text-[#c8a265] whitespace-nowrap shadow-lg border border-[#323640]">
                Link Copied
              </span>
            )}
          </button>
        </div>

        {/* Center: Monogram & Studio Title */}
        <div className="flex items-center gap-2">
          {/* Architectural Monogram Icon */}
          <div className="w-8 h-8 rounded-full border border-[#c8a265]/40 bg-[#1c1d20] flex items-center justify-center text-[#c8a265] font-serif font-bold text-sm tracking-tighter shadow-sm">
            <span>AV</span>
          </div>
          <span className="font-serif tracking-tight text-base font-semibold text-[#f5f4ef]">
            Atelier Vance
          </span>
        </div>

        {/* Right: Architect Avatar & Menu & View Switcher */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleViewMode}
            className="w-8 h-8 rounded-full bg-[#1b1c1f] hover:bg-[#27292e] text-[#8e929f] hover:text-[#eae7e1] flex items-center justify-center transition-colors cursor-pointer text-xs"
            title={viewMode === 'mobile' ? 'Switch to Expanded Desktop Layout' : 'Switch to Mobile Screen Layout'}
          >
            <span className="material-symbols-outlined text-[17px]">
              {viewMode === 'mobile' ? 'laptop' : 'smartphone'}
            </span>
          </button>

          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#33363e] shrink-0 bg-[#222429]">
            <img
              src={ARCHITECT_INFO.portrait}
              alt={ARCHITECT_INFO.name}
              className="w-full h-full object-cover"
            />
          </div>

          <button
            onClick={onOpenMenu}
            className="w-11 h-11 flex items-center justify-center text-[#eae7e1] hover:text-[#c8a265] transition-colors cursor-pointer"
            aria-label="Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};
