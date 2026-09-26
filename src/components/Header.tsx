import React, { useState } from 'react';
import { ARCHITECT_INFO } from '../data/architecturalData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMenu: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onNavigate?: (sectionId: string) => void;
  onOpenContact?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenMenu,
  theme,
  onToggleTheme,
  onNavigate,
  onOpenContact,
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

  const navLinks = [
    { label: 'Atelier', target: 'about-studio' },
    { label: 'Built Works', target: 'portfolio-grid' },
    { label: '1:1 Advisory', target: 'advisory-program' },
    { label: 'Toolkits & BIM', target: 'digital-store' },
    { label: 'Critiques', target: 'peer-reviews' },
    { label: 'FAQ', target: 'faq-section' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 pt-safe bg-[#121314]/90 backdrop-blur-xl border-b border-[#25272b]/60 transition-colors">
      <div className="max-w-7xl mx-auto h-16 sm:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Monogram & Studio Branding */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#c8a265]/40 bg-[#1c1d20] flex items-center justify-center text-[#c8a265] font-serif font-bold text-sm sm:text-base tracking-tighter shadow-sm">
            <span>RG</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-tight text-base sm:text-lg font-bold text-[#f5f4ef] leading-tight">
              Richard Godwin
            </span>
            <span className="hidden sm:block text-[10px] sm:text-[11px] text-[#8e929f] uppercase tracking-widest font-mono">
              Architectural Practice &amp; Spatial Systems
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Bar (hidden on mobile, visible on md/lg/xl) */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-5 lg:gap-8">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => onNavigate?.(link.target)}
              className="text-[13px] font-medium text-[#9a9ea9] hover:text-[#c8a265] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#c8a265]/40"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions: Theme Toggle, Cart, Share, Inquire CTA & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Theme Switcher Toggle */}
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1b1c1f] hover:bg-[#27292e] text-[#c8a265] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 border border-[#2d3036]"
            title={theme === 'dark' ? 'Switch to Light Limestone Mode' : 'Switch to Dark Obsidian Mode'}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Shopping Bag */}
          <button
            onClick={onOpenCart}
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1b1c1f] hover:bg-[#27292e] text-[#eae7e1] hover:text-[#c8a265] flex items-center justify-center transition-all cursor-pointer border border-[#2d3036]"
            aria-label="Shopping Bag"
            title="Open Shopping Bag"
          >
            <span className="material-symbols-outlined text-[19px] sm:text-[21px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#c8a265] text-[#121314] font-semibold text-[10px] rounded-full flex items-center justify-center animate-scale-in">
                {cartCount}
              </span>
            )}
          </button>

          {/* Share Link */}
          <button
            onClick={handleShare}
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1b1c1f] hover:bg-[#27292e] text-[#9396a1] hover:text-[#eae7e1] flex items-center justify-center transition-all cursor-pointer border border-[#2d3036]"
            aria-label="Share Storefront"
            title="Share Atelier Link"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
              {copied ? 'check' : 'share'}
            </span>
            {copied && (
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#1e2025] text-[10px] text-[#c8a265] whitespace-nowrap shadow-lg border border-[#323640]">
                Link Copied
              </span>
            )}
          </button>

          {/* Desktop Commission CTA Button */}
          {onOpenContact && (
            <button
              onClick={onOpenContact}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#24221c] hover:bg-[#342e20] text-[#c8a265] text-xs font-semibold border border-[#c8a265]/40 transition-all cursor-pointer shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8a265] animate-pulse" />
              <span>Inquire</span>
            </button>
          )}

          {/* Architect Portrait Avatar */}
          <div 
            onClick={onOpenContact}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#33363e] shrink-0 bg-[#222429] cursor-pointer hover:border-[#c8a265] transition-colors"
            title="Richard Godwin — Principal Architect"
          >
            <img
              src={ARCHITECT_INFO.portrait}
              alt={ARCHITECT_INFO.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile & Drawer Menu Button */}
          <button
            onClick={onOpenMenu}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1b1c1f] hover:bg-[#27292e] text-[#eae7e1] hover:text-[#c8a265] flex items-center justify-center transition-all cursor-pointer border border-[#2d3036] md:hidden"
            aria-label="Open Navigation Menu"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};
