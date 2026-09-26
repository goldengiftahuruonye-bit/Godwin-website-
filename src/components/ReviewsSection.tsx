import React, { useState } from 'react';
import { PeerReview } from '../types/architecture';

interface ReviewsSectionProps {
  reviews: PeerReview[];
  onOpenWriteReview: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onOpenWriteReview,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentReview = reviews[currentIndex] || reviews[0];

  return (
    <section id="peer-reviews" className="px-4 py-8 flex flex-col gap-4">
      <div className="p-5 rounded-2xl bg-[#18191c] border border-[#27292f] flex flex-col items-center text-center gap-3">
        {/* Stars & Rating Count */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-[#c8a265]">
            {[1, 2, 3, 4, 5].map((s) => (
              <span 
                key={s} 
                className="material-symbols-outlined text-[20px]" 
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            ))}
          </div>
          <span className="text-[13px] text-[#f5f4ef] font-semibold tracking-wide">
            5.0 ({reviews.length + 45} Verified Architectural Reviews)
          </span>
        </div>

        {/* Testimonial Quote in Newsreader serif italic */}
        <blockquote className="font-serif-quote text-[20px] sm:text-[22px] leading-[30px] text-[#dedbd4] my-1 max-w-sm">
          “{currentReview.quote}”
        </blockquote>

        <p className="text-[12px] text-[#8e929f]">
          — {currentReview.author}, {currentReview.role} at {currentReview.firm}
        </p>

        {/* Dots indicator for multiple reviews */}
        {reviews.length > 1 && (
          <div className="flex items-center gap-1.5 pt-1">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex ? 'bg-[#c8a265] w-4' : 'bg-[#33363e]'
                }`}
                title={`Review ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Pill CTA: Write a Review */}
        <button
          onClick={onOpenWriteReview}
          type="button"
          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#202227] hover:bg-[#2b2e35] text-[#eae7e1] text-[13px] font-medium border border-[#2f323a] transition-all shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px] text-[#c8a265]">edit</span>
          <span>Write a Review</span>
        </button>
      </div>
    </section>
  );
};
