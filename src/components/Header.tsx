import React, { useState, useEffect } from 'react';
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
  const [activeSection, setActiveSection] = useState<string>('about-studio');
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll state for subtle shadow & active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [
        'about-studio',
        'portfolio-grid',
        'advisory-program',
        'peer-reviews',
        'digital-store',
        'faq-section',
      ];

      const scrollPosition = window.scrollY + 180;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { label: 'Works', target: 'portfolio-grid' },
    { label: 'Advisory', target: 'advisory-program' },
    { label: 'Critiques', target: 'peer-reviews' },
    { label: 'Store', target: 'digital-store' },
    { label: 'FAQ', target: 'faq-section' },
  ];

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-2.5 sm:top-4 md:top-5 inset-x-0 z-40 px-3 sm:px-5 pointer-events-none transition-all duration-300">
      <div
        className={`pointer-events-auto max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full backdrop-blur-2xl transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-[#141518]/90 text-[#f5f4ef] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.65)]'
            : 'bg-[#faf9f6]/92 text-[#141517] border border-black/10 shadow-[0_12px_36px_rgba(0,0,0,0.12)]'
        } ${isScrolled ? 'scale-[0.99] shadow-2xl' : ''}`}
      >
        {/* Left: Brand Monogram & Name */}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 sm:gap-3 shrink-0 cursor-pointer group"
          title="Richard Godwin Atelier — Back to Top"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#c8a265]/50 bg-[#1c1d21] dark:bg-[#1c1d21] light:bg-[#efebe2] flex items-center justify-center text-[#c8a265] font-serif font-bold text-xs sm:text-sm tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
            <span>RG</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-tight text-sm sm:text-base font-bold leading-tight group-hover:text-[#c8a265] transition-colors">
              {ARCHITECT_INFO.name}
            </span>
            <span className="hidden lg:block text-[9.5px] uppercase tracking-widest text-[#8b8f9c] dark:text-[#8b8f9c] light:text-[#6a6e7b] font-mono leading-none mt-0.5">
              Architectural Practice
            </span>
          </div>
        </div>

        {/* Center: Desktop Floating Pill Navigation Track */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-0.5 lg:gap-1 px-1.5 py-1 rounded-full bg-black/20 dark:bg-black/20 light:bg-black/[0.05] border border-white/[0.05] light:border-black/[0.05]"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.target;
            return (
              <button
                key={link.target}
                onClick={() => onNavigate?.(link.target)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white/15 dark:bg-white/15 light:bg-black/10 text-[#f5f4ef] dark:text-[#f5f4ef] light:text-[#111214] font-semibold shadow-sm'
                    : 'text-[#9da1ae] dark:text-[#9da1ae] light:text-[#585c69] hover:text-[#f5f4ef] dark:hover:text-[#f5f4ef] light:hover:text-[#111214] hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle, Cart, Share, Standout CTA & Menu Trigger */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Theme Switcher Toggle */}
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] dark:bg-white/[0.06] dark:hover:bg-white/[0.12] light:bg-black/[0.06] light:hover:bg-black/[0.12] text-[#c8a265] flex items-center justify-center transition-all cursor-pointer border border-white/10 dark:border-white/10 light:border-black/10 hover:scale-105 active:scale-95"
            title={theme === 'dark' ? 'Switch to Light Limestone Mode' : 'Switch to Dark Obsidian Mode'}
            aria-label="Toggle theme appearance"
          >
            <span className="material-symbols-outlined text-[17px]">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] dark:bg-white/[0.06] dark:hover:bg-white/[0.12] light:bg-black/[0.06] light:hover:bg-black/[0.12] text-[#eae7e1] dark:text-[#eae7e1] light:text-[#2d3036] hover:text-[#c8a265] flex items-center justify-center transition-all cursor-pointer border border-white/10 dark:border-white/10 light:border-black/10 hover:scale-105 active:scale-95"
            aria-label="Shopping Bag"
            title="Open Shopping Bag"
          >
            <span className="material-symbols-outlined text-[17px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 bg-[#c8a265] text-[#121314] font-bold text-[9px] rounded-full flex items-center justify-center animate-scale-in">
                {cartCount}
              </span>
            )}
          </button>

          {/* Share Button (Hidden on smallest mobile screens) */}
          <div className="relative hidden sm:block">
            <button
              onClick={handleShare}
              className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] dark:bg-white/[0.06] dark:hover:bg-white/[0.12] light:bg-black/[0.06] light:hover:bg-black/[0.12] text-[#9396a1] dark:text-[#9396a1] light:text-[#636774] hover:text-[#eae7e1] dark:hover:text-[#eae7e1] light:hover:text-[#111214] flex items-center justify-center transition-all cursor-pointer border border-white/10 dark:border-white/10 light:border-black/10 hover:scale-105 active:scale-95"
              aria-label="Share Atelier"
              title="Share Link"
            >
              <span className="material-symbols-outlined text-[17px]">
                {copied ? 'check' : 'share'}
              </span>
            </button>
            {copied && (
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#1e2025] text-[10px] text-[#c8a265] whitespace-nowrap shadow-lg border border-[#323640] pointer-events-none">
                Copied!
              </span>
            )}
          </div>

          {/* Standout Primary Pill CTA Button (Sample Style) */}
          {onOpenContact && (
            <button
              onClick={onOpenContact}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#c8a265] hover:bg-[#d8b375] text-[#121314] font-semibold text-xs transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0"
              title="Inquire for Commission or Advisory"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#121314] animate-pulse" />
              <span>Inquire</span>
            </button>
          )}

          {/* Mobile Drawer Trigger (on mobile screens) */}
          <button
            onClick={onOpenMenu}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] dark:bg-white/[0.06] dark:hover:bg-white/[0.12] light:bg-black/[0.06] light:hover:bg-black/[0.12] text-[#eae7e1] dark:text-[#eae7e1] light:text-[#2d3036] hover:text-[#c8a265] flex items-center justify-center transition-all cursor-pointer border border-white/10 dark:border-white/10 light:border-black/10 md:hidden"
            aria-label="Open Navigation Menu"
          >
            <span className="material-symbols-outlined text-[18px]">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};
