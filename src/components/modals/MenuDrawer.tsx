import React from 'react';
import { ARCHITECT_INFO } from '../../data/architecturalData';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenContact,
  theme = 'dark',
  onToggleTheme,
}) => {
  if (!isOpen) return null;

  const links = [
    { label: 'Featured Projects & Built Work', target: 'portfolio-grid', icon: 'domain' },
    { label: 'About Atelier & Studio Profile', target: 'about-studio', icon: 'person' },
    { label: '1:1 Advisory Cohort', target: 'advisory-program', icon: 'school' },
    { label: 'Digital Blueprints & CAD Store', target: 'digital-store', icon: 'folder_zip' },
    { label: 'Client & Peer Reviews', target: 'peer-reviews', icon: 'grade' },
    { label: 'Frequently Asked Questions', target: 'faq-section', icon: 'help_outline' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-sm bg-[#161719] text-[#eae7e1] border-l border-[#2a2d33] h-full flex flex-col shadow-2xl z-10 p-6 justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#26282e] pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c8a265]/40 bg-[#202227]">
                <img 
                  src={ARCHITECT_INFO.portrait} 
                  alt={ARCHITECT_INFO.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-[#f5f4ef]">{ARCHITECT_INFO.name}</span>
                <span className="text-[11px] text-[#c8a265]">{ARCHITECT_INFO.credentials}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#202227] hover:bg-[#2c2f36] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 mb-8">
            <span className="text-[10px] uppercase tracking-widest text-[#787c8a] font-semibold block mb-2 px-3">
              Studio Navigation
            </span>
            {links.map((link) => (
              <button
                key={link.target}
                onClick={() => {
                  onClose();
                  onNavigate(link.target);
                }}
                className="w-full px-3 py-2.5 rounded-xl hover:bg-[#22242a] text-left text-xs font-medium text-[#d8dadf] hover:text-[#c8a265] flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-[#858997]">{link.icon}</span>
                  <span>{link.label}</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#555864]">chevron_right</span>
              </button>
            ))}

            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="w-full px-3 py-2.5 mt-2 rounded-xl bg-[#202227] hover:bg-[#262931] border border-[#2d3038] text-left text-xs font-medium text-[#eae7e1] flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-[#c8a265]">
                    {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                  </span>
                  <span>Appearance: {theme === 'dark' ? 'Dark Obsidian' : 'Light Limestone'}</span>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#161719] text-[#c8a265] border border-[#30333d]">
                  Switch
                </span>
              </button>
            )}
          </nav>
        </div>

        {/* Studio Info & Inquire CTA */}
        <div className="pt-6 border-t border-[#26282e] space-y-4">
          <div className="text-xs space-y-1 text-[#8b8e9b]">
            <div className="text-[#eae7e1] font-medium">Offices & Archives</div>
            <div>Zurich: Gotthardstrasse 26, 8002 Zürich</div>
            <div>New York: 180 Varick Street, Soho, NY 10014</div>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="w-full py-3 rounded-full bg-[#c8a265] hover:bg-[#dfb776] text-[#141413] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">mail</span>
            Request Studio Commission
          </button>

          <p className="text-[10px] text-center text-[#676b77]">
            © {new Date().getFullYear()} Richard Godwin Architecture & Spatial Systems. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
