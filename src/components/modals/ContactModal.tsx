import React, { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'commission',
}) => {
  const [inquiryType, setInquiryType] = useState(defaultType);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [siteLocation, setSiteLocation] = useState('');
  const [budget, setBudget] = useState('500k-1.5m');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#0e0f10]/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg bg-[#161719] rounded-2xl border border-[#2b2d33] p-5 sm:p-6 shadow-2xl text-[#eae7e1] max-h-[90vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#26282e] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#c8a265]">architecture</span>
            <h3 className="font-semibold text-base text-[#f5f4ef]">Atelier Vance — Inquire</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#202227] hover:bg-[#2c2f36] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {sent ? (
          <div className="py-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#2a261c] text-[#c8a265] border border-[#c8a265]/40 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[30px]">mark_email_read</span>
            </div>
            <h4 className="text-lg font-bold text-[#f5f4ef]">Inquiry Dispatched</h4>
            <p className="text-xs text-[#9a9ea9] max-w-xs mt-1">
              Alexander Vance and the studio partners will review your project brief and respond within 24 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {/* Inquiry Scope Tabs */}
            <div>
              <label className="text-[#898d9b] block mb-1.5 font-medium">Inquiry Scope</label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'commission', label: 'Architectural Commission' },
                  { id: 'advisory', label: '1:1 Cohort Advisory' },
                  { id: 'enterprise', label: 'Studio CAD License' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setInquiryType(tab.id)}
                    className={`px-2 py-2 rounded-lg text-center font-medium transition-colors cursor-pointer ${
                      inquiryType === tab.id
                        ? 'bg-[#c8a265] text-[#141413] font-semibold'
                        : 'bg-[#1e2025] text-[#8e929f] hover:text-[#eae7e1]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[#898d9b] block mb-1 font-medium">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Rostova"
                  className="w-full px-3 py-2 rounded-lg bg-[#111213] border border-[#2e3137] text-xs text-[#eae7e1] focus:outline-none focus:border-[#c8a265]"
                />
              </div>
              <div>
                <label className="text-[#898d9b] block mb-1 font-medium">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@studio.com"
                  className="w-full px-3 py-2 rounded-lg bg-[#111213] border border-[#2e3137] text-xs text-[#eae7e1] focus:outline-none focus:border-[#c8a265]"
                />
              </div>
            </div>

            {/* Site / Location & Budget (for commissions) */}
            {inquiryType === 'commission' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[#898d9b] block mb-1 font-medium">Site / Country</label>
                  <input
                    type="text"
                    value={siteLocation}
                    onChange={(e) => setSiteLocation(e.target.value)}
                    placeholder="e.g. Grisons, Switzerland or Hudson Valley, NY"
                    className="w-full px-3 py-2 rounded-lg bg-[#111213] border border-[#2e3137] text-xs text-[#eae7e1] focus:outline-none focus:border-[#c8a265]"
                  />
                </div>
                <div>
                  <label className="text-[#898d9b] block mb-1 font-medium">Estimated Construction Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#111213] border border-[#2e3137] text-xs text-[#eae7e1] focus:outline-none focus:border-[#c8a265]"
                  >
                    <option value="500k-1.5m">$500k – $1.5M USD / CHF</option>
                    <option value="1.5m-3.5m">$1.5M – $3.5M USD / CHF</option>
                    <option value="3.5m+">$3.5M+ Institutional / Bespoke</option>
                  </select>
                </div>
              </div>
            )}

            {/* Project Details */}
            <div>
              <label className="text-[#898d9b] block mb-1 font-medium">Project Brief / Questions *</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your site context, required gross floor area, timeline, or advisory objectives..."
                className="w-full px-3 py-2 rounded-lg bg-[#111213] border border-[#2e3137] text-xs text-[#eae7e1] focus:outline-none focus:border-[#c8a265] resize-none"
              />
            </div>

            <div className="pt-2 border-t border-[#26282e] flex items-center justify-between">
              <span className="text-[11px] text-[#717582]">Confidential studio intake</span>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#c8a265] hover:bg-[#dfb776] text-[#141413] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                Send Direct Message
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
