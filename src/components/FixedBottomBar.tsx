import React from 'react';

interface FixedBottomBarProps {
  onOpenContact: () => void;
}

export const FixedBottomBar: React.FC<FixedBottomBarProps> = ({ onOpenContact }) => {
  const whatsappUrl = `https://wa.me/41790000000?text=${encodeURIComponent(
    'Hello Atelier Vance. I am interested in inquiring about an architectural commission / 1:1 advisory cohort.'
  )}`;

  return (
    <nav className="fixed bottom-0 max-w-md w-full z-40 pb-safe pointer-events-none transition-all">
      <div className="p-3 pointer-events-auto">
        <div className="flex items-center gap-2 p-2 rounded-full bg-[#141517]/90 backdrop-blur-xl border border-[#2b2d34] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          {/* Button 1: Send Message (opens Commission modal) */}
          <button
            onClick={onOpenContact}
            className="flex-1 h-12 px-4 rounded-full bg-[#1f2125]/90 hover:bg-[#2c2f35] text-[#eae7e1] text-[13px] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#2e3137]"
          >
            <span className="material-symbols-outlined text-[18px] text-[#9a9ea9]">mail</span>
            <span>Send Inquiry</span>
          </button>

          {/* Button 2: Chat on WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-12 px-4 rounded-full bg-[#27241a] hover:bg-[#332e20] text-[#c8a265] text-[13px] font-medium flex items-center justify-center gap-2 transition-all relative overflow-hidden border border-[#c8a265]/40"
          >
            <span className="w-2 h-2 rounded-full bg-[#c8a265] animate-pulse" />
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span className="font-semibold">Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </nav>
  );
};
