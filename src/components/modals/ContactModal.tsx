import React, { useState, useEffect } from 'react';
import { ARCHITECT_INFO } from '../../data/architecturalData';

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
  const [phone, setPhone] = useState('');
  const [siteLocation, setSiteLocation] = useState('');
  const [budget, setBudget] = useState('500k-1.5m');
  const [paymentPlan, setPaymentPlan] = useState('2-part');
  const [financedService, setFinancedService] = useState('advisory');
  const [message, setMessage] = useState('');
  const [submittedBrief, setSubmittedBrief] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (defaultType) {
      setInquiryType(defaultType);
    }
  }, [defaultType, isOpen]);

  if (!isOpen) return null;

  const targetEmail = ARCHITECT_INFO.inquiryEmail || 'goldengiftahuruonye@gmail.com';

  const getInquiryLabel = (type: string) => {
    switch (type) {
      case 'commission':
        return 'Architectural Commission';
      case 'advisory':
        return '1:1 Cohort Advisory';
      case 'payment-plan':
        return 'Payment Plan & Installment Financing';
      case 'enterprise':
        return 'Studio CAD Licensing & BIM Suite';
      default:
        return 'Studio Inquiry';
    }
  };

  const getPaymentPlanLabel = (plan: string) => {
    switch (plan) {
      case '2-part':
        return '2-Part Milestone Plan (50% upfront deposit / 50% project delivery)';
      case '3-part':
        return '3-Part Tranche Plan (40% kickoff / 30% schematic design / 30% permit closeout)';
      case '6-month':
        return '6-Month Equal Installment Plan (Monthly automatic billing)';
      case 'custom':
        return 'Custom Studio Retainer / Corporate Escrow Agreement';
      default:
        return plan;
    }
  };

  const constructEmailBody = () => {
    const lines = [
      `ATELIER RICHARD GODWIN — DIRECT CLIENT INQUIRY`,
      `=============================================`,
      `Inquiry Category: ${getInquiryLabel(inquiryType)}`,
      `Client / Practitioner: ${name}`,
      `Client Email: ${email}`,
      phone ? `Phone / WhatsApp: ${phone}` : '',
      siteLocation ? `Project Location / Jurisdiction: ${siteLocation}` : '',
      inquiryType === 'commission' ? `Estimated Construction Budget: ${budget}` : '',
      inquiryType === 'payment-plan' ? `Service to Finance: ${financedService}` : '',
      inquiryType === 'payment-plan' ? `Preferred Payment Structure: ${getPaymentPlanLabel(paymentPlan)}` : '',
      ``,
      `PROJECT BRIEF & REQUIREMENTS:`,
      `-----------------------------`,
      message,
      ``,
      `=============================================`,
      `Direct Recipient: ${targetEmail}`,
      `Generated from Atelier Godwin Web Portal`,
    ].filter(Boolean);

    return lines.join('\n');
  };

  const mailSubject = `[Atelier Godwin] ${getInquiryLabel(inquiryType)} - ${name || 'Inquiry'}`;

  const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(
    mailSubject
  )}&body=${encodeURIComponent(constructEmailBody())}`;

  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    targetEmail
  )}&su=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(constructEmailBody())}`;

  const whatsappUrl = `https://wa.me/41790000000?text=${encodeURIComponent(
    `Hello Richard Godwin Atelier (${targetEmail}).\n\nI have submitted an inquiry for: ${getInquiryLabel(
      inquiryType
    )}.\n\nFrom: ${name} (${email})\n\nBrief: ${message.slice(0, 180)}...`
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const brief = constructEmailBody();
    setSubmittedBrief(brief);

    // Automatically trigger native mail client dispatch
    window.location.href = mailtoUrl;
  };

  const handleCopyBrief = async () => {
    try {
      if (navigator.clipboard && submittedBrief) {
        await navigator.clipboard.writeText(
          `To: ${targetEmail}\nSubject: ${mailSubject}\n\n${submittedBrief}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // fallback
    }
  };

  const handleReset = () => {
    setSubmittedBrief(null);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0e0f10]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-xl bg-[#161719] rounded-2xl border border-[#2b2d33] p-5 sm:p-7 shadow-2xl text-[#eae7e1] my-auto max-h-[92vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#26282e] pb-3.5 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1f2125] border border-[#c8a265]/40 flex items-center justify-center text-[#c8a265] text-xs font-serif font-bold">
              RG
            </div>
            <div>
              <h3 className="font-semibold text-base text-[#f5f4ef] leading-tight">
                Direct Atelier Inquiry &amp; Payment Desk
              </h3>
              <p className="text-[11px] text-[#8e929f] font-mono">
                Direct to: <span className="text-[#c8a265]">{targetEmail}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#202227] hover:bg-[#2c2f36] flex items-center justify-center transition-colors cursor-pointer text-[#a5a8b4]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {submittedBrief ? (
          /* Dispatched Confirmation Screen with 1-Click Mailbox Actions */
          <div className="py-4 space-y-4">
            <div className="p-4 rounded-xl bg-[#1b1e22] border border-[#2d3038] text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#2a261c] text-[#c8a265] border border-[#c8a265]/40 flex items-center justify-center mx-auto mb-2">
                <span className="material-symbols-outlined text-[26px]">forward_to_inbox</span>
              </div>
              <h4 className="text-base font-bold text-[#f5f4ef]">
                Inquiry Prepared for Direct Dispatch
              </h4>
              <p className="text-xs text-[#9a9ea9] max-w-md mx-auto leading-relaxed">
                Your brief has been formatted for direct delivery to{' '}
                <strong className="text-[#c8a265] font-mono">{targetEmail}</strong>. If your email
                client didn't open automatically, use any of the direct actions below:
              </p>
            </div>

            {/* Direct 1-Click Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {/* Option A: Open Gmail in Browser */}
              <a
                href={gmailWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#202227] hover:bg-[#282a31] border border-[#31343c] hover:border-[#c8a265]/60 flex items-center gap-3 transition-all group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-[#281e1e] border border-[#e05244]/40 text-[#e05244] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-semibold text-[#f5f4ef] group-hover:text-[#c8a265] flex items-center gap-1">
                    <span>Open in Gmail Web</span>
                    <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                  </div>
                  <div className="text-[10px] text-[#848895]">Compose in browser window</div>
                </div>
              </a>

              {/* Option B: Open Default Mail Client */}
              <a
                href={mailtoUrl}
                className="p-3 rounded-xl bg-[#202227] hover:bg-[#282a31] border border-[#31343c] hover:border-[#c8a265]/60 flex items-center gap-3 transition-all group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-[#1e2329] border border-[#448ae0]/40 text-[#448ae0] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">send</span>
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-semibold text-[#f5f4ef] group-hover:text-[#c8a265] flex items-center gap-1">
                    <span>Default Mail App</span>
                    <span className="material-symbols-outlined text-[13px]">launch</span>
                  </div>
                  <div className="text-[10px] text-[#848895]">Apple Mail, Outlook, etc.</div>
                </div>
              </a>

              {/* Option C: WhatsApp Direct */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#202227] hover:bg-[#282a31] border border-[#31343c] hover:border-[#25d366]/60 flex items-center gap-3 transition-all group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-[#18261e] border border-[#25d366]/40 text-[#25d366] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-semibold text-[#f5f4ef] group-hover:text-[#25d366] flex items-center gap-1">
                    <span>Send via WhatsApp</span>
                    <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                  </div>
                  <div className="text-[10px] text-[#848895]">Instant mobile chat</div>
                </div>
              </a>

              {/* Option D: Copy Brief to Clipboard */}
              <button
                type="button"
                onClick={handleCopyBrief}
                className="p-3 rounded-xl bg-[#202227] hover:bg-[#282a31] border border-[#31343c] hover:border-[#c8a265]/60 flex items-center gap-3 transition-all group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-[#26241a] border border-[#c8a265]/40 text-[#c8a265] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-semibold text-[#f5f4ef] group-hover:text-[#c8a265]">
                    {copied ? 'Copied to Clipboard!' : 'Copy Formatted Text'}
                  </div>
                  <div className="text-[10px] text-[#848895]">Paste directly into any email</div>
                </div>
              </button>
            </div>

            {/* Formatted Preview Box */}
            <div className="p-3.5 rounded-xl bg-[#121315] border border-[#262930] text-left">
              <div className="flex items-center justify-between text-[11px] text-[#828695] mb-1.5 font-mono">
                <span>PREVIEW OF DISPATCHED BRIEF</span>
                <span className="text-[#c8a265]">Recipient: {targetEmail}</span>
              </div>
              <pre className="text-[11px] text-[#cfd2dc] whitespace-pre-wrap font-mono leading-relaxed max-h-36 overflow-y-auto">
                {submittedBrief}
              </pre>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2 rounded-full bg-[#24262b] hover:bg-[#2f3239] text-[#eae7e1] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Done / Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {/* Inquiry Scope Tabs with Dedicated Payment Plan Tab */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[#898d9b] font-medium">Inquiry &amp; Payment Scope</label>
                <span className="text-[10px] text-[#c8a265] font-mono">Direct routing enabled</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  { id: 'commission', label: 'Commission' },
                  { id: 'advisory', label: '1:1 Advisory' },
                  { id: 'payment-plan', label: 'Payment Plan' },
                  { id: 'enterprise', label: 'CAD License' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setInquiryType(tab.id)}
                    className={`px-2.5 py-2 rounded-lg text-center font-medium transition-all cursor-pointer text-xs ${
                      inquiryType === tab.id
                        ? 'bg-[#c8a265] text-[#141413] font-bold shadow-sm'
                        : 'bg-[#1e2025] text-[#8e929f] hover:text-[#eae7e1] hover:bg-[#25272e]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dedicated Payment Plan Configuration Box */}
            {inquiryType === 'payment-plan' && (
              <div className="p-3.5 rounded-xl bg-[#1b1d22] border border-[#c8a265]/30 space-y-3">
                <div className="flex items-center gap-2 text-[#c8a265]">
                  <span className="material-symbols-outlined text-[17px]">credit_card</span>
                  <span className="font-semibold text-xs uppercase tracking-wide">
                    Installment &amp; Financing Preferences
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[#8b8f9e] block mb-1 font-medium">
                      Select Program / Service
                    </label>
                    <select
                      value={financedService}
                      onChange={(e) => setFinancedService(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-lg bg-[#111213] border border-[#2e3137] text-xs text-[#eae7e1] focus:outline-none focus:border-[#c8a265]"
                    >
                      <option value="1:1 Architectural Advisory Cohort ($4,200 total)">
                        1:1 Architectural Advisory Cohort
                      </option>
                      <option value="Private Architectural Design Commission">
                        Private Architectural Design Commission
                      </option>
                      <option value="Multi-Seat Studio CAD & BIM License ($1,850 total)">
                        Multi-Seat Studio CAD &amp; BIM License
                      </option>
                      <option value="Bespoke Tectonic Consulting / Drawing Audit">
                        Bespoke Tectonic Consulting
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[#8b8f9e] block mb-1 font-medium">
                      Installment Structure
                    </label>
                    <select
                      value={paymentPlan}
                      onChange={(e) => setPaymentPlan(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-lg bg-[#111213] border border-[#2e3137] text-xs text-[#eae7e1] focus:outline-none focus:border-[#c8a265]"
                    >
                      <option value="2-part">2-Part Milestone (50% Deposit / 50% Final)</option>
                      <option value="3-part">3-Part Tranche (40% / 30% / 30%)</option>
                      <option value="6-month">6-Month Equal Installment Plan</option>
                      <option value="custom">Custom Studio Escrow / Purchase Order</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Name & Email Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[#898d9b] block mb-1 font-medium">Your Full Name *</label>
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
                <label className="text-[#898d9b] block mb-1 font-medium">Your Email Address *</label>
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

            {/* Phone & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[#898d9b] block mb-1 font-medium">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+41 79 123 45 67"
                  className="w-full px-3 py-2 rounded-lg bg-[#111213] border border-[#2e3137] text-xs text-[#eae7e1] focus:outline-none focus:border-[#c8a265]"
                />
              </div>
              <div>
                <label className="text-[#898d9b] block mb-1 font-medium">
                  Site / City / Country (Optional)
                </label>
                <input
                  type="text"
                  value={siteLocation}
                  onChange={(e) => setSiteLocation(e.target.value)}
                  placeholder="e.g. Zurich, New York, or Oslo"
                  className="w-full px-3 py-2 rounded-lg bg-[#111213] border border-[#2e3137] text-xs text-[#eae7e1] focus:outline-none focus:border-[#c8a265]"
                />
              </div>
            </div>

            {/* Estimated Budget for Commissions */}
            {inquiryType === 'commission' && (
              <div>
                <label className="text-[#898d9b] block mb-1 font-medium">
                  Estimated Construction Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#111213] border border-[#2e3137] text-xs text-[#eae7e1] focus:outline-none focus:border-[#c8a265]"
                >
                  <option value="500k-1.5m">$500k – $1.5M USD / CHF</option>
                  <option value="1.5m-3.5m">$1.5M – $3.5M USD / CHF</option>
                  <option value="3.5m+">$3.5M+ Bespoke Architectural Masterplan</option>
                </select>
              </div>
            )}

            {/* Message Details */}
            <div>
              <label className="text-[#898d9b] block mb-1 font-medium">
                {inquiryType === 'payment-plan'
                  ? 'Payment Plan Notes & Scheduling Requirements *'
                  : 'Project Brief / Inquiry Details *'}
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  inquiryType === 'payment-plan'
                    ? 'State your preferred billing start date, studio invoicing details, or installment milestones...'
                    : 'Describe your site topography, project timeline, required floor area, or advisory objectives...'
                }
                className="w-full px-3 py-2 rounded-lg bg-[#111213] border border-[#2e3137] text-xs text-[#eae7e1] focus:outline-none focus:border-[#c8a265] resize-none"
              />
            </div>

            {/* Direct Routing Guarantee Note */}
            <div className="p-2.5 rounded-lg bg-[#131416] border border-[#24262b] flex items-center justify-between text-[11px] text-[#868a97]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c8a265] animate-pulse" />
                <span>
                  Direct route to: <strong className="text-[#eae7e1]">{targetEmail}</strong>
                </span>
              </div>
              <span className="text-[#c8a265] font-mono text-[10px]">24hr Response</span>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 border-t border-[#26282e] flex items-center justify-between">
              <span className="text-[11px] text-[#717582]">Confidential studio protocol</span>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-[#c8a265] hover:bg-[#dfb776] text-[#141413] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">mail</span>
                <span>Dispatch to Email</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
