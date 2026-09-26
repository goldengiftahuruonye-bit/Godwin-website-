import React from 'react';

interface FixedBottomBarProps {
  onOpenContact: () => void;
}

export const FixedBottomBar: React.FC<FixedBottomBarProps> = ({ onOpenContact }) => {
  const whatsappUrl = `https://wa.me/41790000000?text=${encodeURIComponent(
    'Hello Atelier Godwin. I am interested in inquiring about an architectural commission / 1:1 advisory cohort with Richard Godwin.'
  )}`;

  return (
    <>
      {/* Mobile Floating Bottom Dock */}
      <nav 
        aria-label="Mobile quick actions"
        className="fixed bottom-0 left-0 right-0 w-full z-40 pb-safe pointer-events-none transition-all md:hidden"
      >
        <div className="p-3 max-w-md mx-auto pointer-events-auto">
          <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-full bg-[#141517]/95 backdrop-blur-xl border border-[#2b2d34] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            {/* Button 1: Send Message */}
            <button
              onClick={onOpenContact}
              className="flex-1 h-11 sm:h-12 px-3 rounded-full bg-[#1f2125]/90 hover:bg-[#2c2f35] text-[#eae7e1] text-[13px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-[#2e3137]"
            >
              <span className="material-symbols-outlined text-[17px] text-[#9a9ea9]">mail</span>
              <span>Send Inquiry</span>
            </button>

            {/* Button 2: Chat on WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-11 sm:h-12 px-3 rounded-full bg-[#27241a] hover:bg-[#332e20] text-[#c8a265] text-[13px] font-medium flex items-center justify-center gap-1.5 transition-all relative overflow-hidden border border-[#c8a265]/40"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8a265] animate-pulse" />
              <span className="material-symbols-outlined text-[17px]">chat</span>
              <span className="font-semibold">WhatsApp</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Desktop / Tablet Floating Pill Widget (bottom right, unobtrusive) */}
      <aside 
        aria-label="Direct studio inquiry"
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2.5 p-1.5 pl-3 rounded-full bg-[#141517]/90 backdrop-blur-xl border border-[#2b2d34] shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all hover:border-[#c8a265]/50 group"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c8a265] animate-pulse" />
          <span className="text-xs text-[#9a9ea9] font-medium pr-1">Atelier Desk:</span>
        </div>

        <button
          onClick={onOpenContact}
          className="h-9 px-3.5 rounded-full bg-[#1f2125] hover:bg-[#2c2f35] text-[#eae7e1] hover:text-[#c8a265] text-xs font-semibold flex items-center gap-1.5 transition-all border border-[#2e3137] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[15px] text-[#c8a265]">mail</span>
          <span>Inquire</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 px-3.5 rounded-full bg-[#27241a] hover:bg-[#332e20] text-[#c8a265] text-xs font-semibold flex items-center gap-1.5 transition-all border border-[#c8a265]/40 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[15px]">chat</span>
          <span>WhatsApp</span>
        </a>
      </aside>
    </>
  );
};
