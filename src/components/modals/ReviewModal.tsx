import React, { useState } from 'react';
import { PeerReview } from '../../types/architecture';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Omit<PeerReview, 'id' | 'date'>) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [firm, setFirm] = useState('');
  const [projectOrCohort, setProjectOrCohort] = useState('Advisory Cohort Alumni');
  const [quote, setQuote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !quote) return;

    onSubmitReview({
      author,
      role: role || 'Lead Architect',
      firm: firm || 'Architecture Practice',
      projectOrCohort,
      rating,
      quote,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#0e0f10]/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md bg-[#161719] rounded-2xl border border-[#2b2d33] p-5 shadow-2xl text-[#eae7e1]">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#26282e] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#c8a265]">rate_review</span>
            <h3 className="font-semibold text-base text-[#f5f4ef]">Submit Colleague Review</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#202227] hover:bg-[#2c2f36] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#2a261c] text-[#c8a265] border border-[#c8a265]/40 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[26px]">check</span>
            </div>
            <h4 className="text-base font-semibold text-[#f5f4ef]">Thank You</h4>
            <p className="text-xs text-[#9a9ea9] mt-1">Your testimonial has been verified and added to the studio dossier.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {/* Rating Stars */}
            <div>
              <label className="text-[#898d9b] block mb-1.5 font-medium">Evaluation Rating</label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer transition-transform hover:scale-110"
                  >
                    <span 
                      className={`material-symbols-outlined text-[24px] ${
                        star <= rating ? 'text-[#c8a265]' : 'text-[#383b44]'
                      }`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  </button>
                ))}
                <span className="text-xs text-[#c8a265] ml-2 font-mono font-semibold">{rating}.0 / 5.0</span>
              </div>
            </div>

            {/* Author Name */}
            <div>
              <label className="text-[#898d9b] block mb-1 font-medium">Full Name *</label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. David Lindgren, AIA"
                className="w-full px-3 py-2 rounded-lg bg-[#111213] border border-[#2e3137] text-xs text-[#eae7e1] focus:outline-none focus:border-[#c8a265]"
              />
            </div>

            {/* Role & Firm */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[#898d9b] block mb-1 font-medium">Professional Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Design Principal"
                  className="w-full px-3 py-2 rounded-lg bg-[#111213] border border-[#2e3137] text-xs text-[#eae7e1] focus:outline-none focus:border-[#c8a265]"
                />
              </div>
              <div>
                <label className="text-[#898d9b] block mb-1 font-medium">Studio / Practice</label>
                <input
                  type="text"
                  value={firm}
                  onChange={(e) => setFirm(e.target.value)}
                  placeholder="Nordic Architects"
                  className="w-full px-3 py-2 rounded-lg bg-[#111213] border border-[#2e3137] text-xs text-[#eae7e1] focus:outline-none focus:border-[#c8a265]"
                />
              </div>
            </div>

            {/* Relationship */}
            <div>
              <label className="text-[#898d9b] block mb-1 font-medium">Collaboration Type</label>
              <select
                value={projectOrCohort}
                onChange={(e) => setProjectOrCohort(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#111213] border border-[#2e3137] text-xs text-[#eae7e1] focus:outline-none focus:border-[#c8a265]"
              >
                <option value="Advisory Cohort Alumni">1:1 Advisory Cohort Alumni</option>
                <option value="Client Commission">Residential / Cultural Commission Client</option>
                <option value="BIM Toolkits User">Digital Blueprints & CAD Toolkits User</option>
                <option value="Academic Colleague">Academic / Masterclass Colleague</option>
              </select>
            </div>

            {/* Testimonial Quote */}
            <div>
              <label className="text-[#898d9b] block mb-1 font-medium">Testimonial Critique *</label>
              <textarea
                required
                rows={3}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Share how Alexander's spatial critique, architectural details, or advisory shaped your practice..."
                className="w-full px-3 py-2 rounded-lg bg-[#111213] border border-[#2e3137] text-xs text-[#eae7e1] focus:outline-none focus:border-[#c8a265] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#c8a265] hover:bg-[#dfb776] text-[#141413] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md mt-2"
            >
              Publish Architectural Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
