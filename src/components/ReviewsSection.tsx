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
  const [mobileIndex, setMobileIndex] = useState(0);
  const currentMobileReview = reviews[mobileIndex] || reviews[0];

  return (
    <section id="peer-reviews" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col gap-6">
      {/* Top Header with Overall Score & Write CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#25282e] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] uppercase tracking-wider text-[#c8a265] font-semibold">
              Peer Endorsements
            </span>
          </div>
          <h2 className="text-[24px] sm:text-[28px] font-bold text-[#f5f4ef] font-serif">
            Architectural Critiques &amp; Colleague Reviews
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center text-[#c8a265]">
              {[1, 2, 3, 4, 5].map((s) => (
                <span 
                  key={s} 
                  className="material-symbols-outlined text-[18px]" 
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <span className="text-[13px] text-[#9ea2af]">
              5.0 · Verified Critiques from RIBA, SIA &amp; AIA Fellows
            </span>
          </div>
        </div>

        <button
          onClick={onOpenWriteReview}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#1e2025] hover:bg-[#c8a265] text-[#eae7e1] hover:text-[#121314] text-[13px] font-semibold border border-[#30333b] hover:border-[#c8a265] transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[16px]">edit</span>
          <span>Submit Critique</span>
        </button>
      </div>

      {/* Desktop & Tablet Grid: Show all reviews side-by-side (hidden on mobile, visible on sm/md/lg/xl) */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {reviews.slice(0, 3).map((review) => (
          <div
            key={review.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#18191c] border border-[#27292f] hover:border-[#383b45] transition-all flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-0.5 text-[#c8a265]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span 
                      key={s} 
                      className="material-symbols-outlined text-[16px]" 
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-[11px] font-mono text-[#787c8a]">{review.date}</span>
              </div>

              <blockquote className="font-serif-quote text-[17px] lg:text-[18px] leading-[26px] text-[#e0ded8] mb-4">
                “{review.quote}”
              </blockquote>
            </div>

            <div className="pt-3 border-t border-[#25272e] flex flex-col">
              <span className="text-[13px] font-semibold text-[#f5f4ef]">{review.author}</span>
              <span className="text-[11px] text-[#8e929f]">{review.role} · {review.firm}</span>
              {review.projectOrCohort && (
                <span className="text-[10px] text-[#c8a265] mt-1 font-mono">{review.projectOrCohort}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Card Carousel (visible on < sm screens) */}
      <div className="sm:hidden p-5 rounded-2xl bg-[#18191c] border border-[#27292f] flex flex-col items-center text-center gap-3">
        <div className="flex items-center gap-1 text-[#c8a265]">
          {[1, 2, 3, 4, 5].map((s) => (
            <span 
              key={s} 
              className="material-symbols-outlined text-[18px]" 
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
          ))}
        </div>

        <blockquote className="font-serif-quote text-[19px] leading-[28px] text-[#dedbd4] my-1">
          “{currentMobileReview.quote}”
        </blockquote>

        <p className="text-[12px] text-[#8e929f]">
          — {currentMobileReview.author}, {currentMobileReview.role} at {currentMobileReview.firm}
        </p>

        {reviews.length > 1 && (
          <div className="flex items-center gap-1.5 pt-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setMobileIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === mobileIndex ? 'bg-[#c8a265] w-5' : 'bg-[#33363e] w-2'
                }`}
                title={`Review ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
