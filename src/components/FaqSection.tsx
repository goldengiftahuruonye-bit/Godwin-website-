import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/architecturalData';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>([FAQ_ITEMS[0].id]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq-section" className="px-4 py-8 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-[11px] uppercase tracking-wider text-[#c8a265] font-semibold">
          Got Questions?
        </span>
        <h2 className="text-[22px] font-bold text-[#f5f4ef] font-serif">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl transition-all border ${
                isOpen
                  ? 'bg-[#1b1c1f] border-[#31343c]'
                  : 'bg-[#161719] border-[#24262b] hover:border-[#2d3037]'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between text-left text-[14px] font-medium text-[#f5f4ef] cursor-pointer gap-2"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span
                  className={`material-symbols-outlined text-[20px] text-[#8e929f] transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#c8a265]' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>

              {isOpen && (
                <div className="mt-2.5 text-[#9da1ad] text-[13px] leading-relaxed pt-1 border-t border-[#26282e]/80">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
