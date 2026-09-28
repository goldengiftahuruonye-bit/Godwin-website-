import React, { useState, useEffect } from 'react';
import { CartItem, DigitalProduct } from '../../types/architecture';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checking_out' | 'success'>('cart');
  const [email, setEmail] = useState('');
  const [studioName, setStudioName] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [downloadedItems, setDownloadedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleCheckoutSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || !email.includes('@')) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setCheckoutStep('checking_out');
    setTimeout(() => {
      setCheckoutStep('success');
    }, 1200);
  };

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleDownloadItem = (product: DigitalProduct) => {
    const downloadUrl = product.downloadUrl || `/downloads/${product.id}.zip`;
    const filename = product.downloadFilename || `${product.id}.zip`;

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadedItems((prev) => ({ ...prev, [product.id]: true }));
  };

  const handleDownloadAll = () => {
    const masterSuiteUrl = '/downloads/richard_godwin_complete_architectural_suite.zip';
    const link = document.createElement('a');
    link.href = masterSuiteUrl;
    link.download = 'richard_godwin_complete_architectural_suite.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    items.forEach((item) => {
      setDownloadedItems((prev) => ({ ...prev, [item.product.id]: true }));
    });
  };

  const handleCopyUrl = (url: string, id: string) => {
    const fullUrl = window.location.origin + url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleReset = () => {
    onClearCart();
    setCheckoutStep('cart');
    setDownloadedItems({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#161719] text-[#eae7e1] border-l border-[#2a2d33] h-full flex flex-col shadow-2xl z-10">
        {/* Header */}
        <div className="h-16 px-5 border-b border-[#26282e] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#c8a265]">shopping_bag</span>
            <h3 className="font-semibold text-base text-[#f5f4ef]">Digital Atelier Cart</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#24262b] text-[#9a9ea8] font-mono">
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#202227] hover:bg-[#2c2f36] flex items-center justify-center text-[#eae7e1] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {checkoutStep === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#2a261c] border border-[#c8a265]/40 text-[#c8a265] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[32px]">check_circle</span>
              </div>
              <span className="text-xs uppercase tracking-widest text-[#c8a265] font-semibold">Transfer Complete</span>
              <h4 className="text-xl font-bold text-[#f5f4ef] mt-1 mb-2">Order Confirmed!</h4>
              <p className="text-sm text-[#a4a7b2] max-w-xs mb-6">
                Your instant download links and VAT license receipt have been dispatched to <span className="text-[#eae7e1] font-mono">{email || 'your email'}</span>.
              </p>
              
              <div className="w-full p-4 rounded-xl bg-[#1c1e22] border border-[#2c2f35] text-left mb-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#7d818e] uppercase font-semibold">
                  <span>Immediate Download Archives:</span>
                  <span className="text-[11px] font-mono text-[#c8a265]">Single-Seat License</span>
                </div>
                {items.map((item) => {
                  const isDownloaded = !!downloadedItems[item.product.id];
                  const downloadUrl = item.product.downloadUrl || `/downloads/${item.product.id}.zip`;
                  const downloadFilename = item.product.downloadFilename || `${item.product.id}.zip`;
                  const isCopied = copiedId === item.product.id;

                  return (
                    <div key={item.product.id} className="py-2.5 border-b border-[#272a30] last:border-0 text-xs flex flex-col gap-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0 pr-2">
                          <span className="text-[#eae7e1] font-medium truncate block">{item.product.title}</span>
                          <span className="text-[10px] text-[#8e929f] font-mono">{item.product.fileSize} · Real .ZIP Archive</span>
                        </div>
                        <a 
                          href={downloadUrl}
                          download={downloadFilename}
                          onClick={() => setDownloadedItems((prev) => ({ ...prev, [item.product.id]: true }))}
                          className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1 shrink-0 transition-all cursor-pointer no-underline ${
                            isDownloaded 
                              ? 'bg-[#253229] text-[#69d78e] border border-[#375240]' 
                              : 'bg-[#c8a265] text-[#141413] hover:bg-[#dfb776] shadow-sm'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {isDownloaded ? 'check' : 'download'}
                          </span>
                          <span>{isDownloaded ? 'Downloaded' : 'Download .ZIP'}</span>
                        </a>
                      </div>

                      {/* Direct URL with Copy option */}
                      <div className="flex items-center justify-between bg-[#141517] px-2.5 py-1.5 rounded-lg border border-[#23252a] text-[10px] text-[#7d818e] font-mono">
                        <span className="truncate max-w-[210px] text-[#9ca0ae]" title={downloadUrl}>
                          {downloadUrl}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyUrl(downloadUrl, item.product.id)}
                          className="hover:text-[#c8a265] transition-colors flex items-center gap-1 cursor-pointer ml-2 shrink-0"
                        >
                          <span className="material-symbols-outlined text-[12px]">
                            {isCopied ? 'check' : 'content_copy'}
                          </span>
                          <span>{isCopied ? 'Copied' : 'Copy Link'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {items.length > 1 && (
                <div className="w-full mb-3 flex flex-col gap-1.5">
                  <a
                    href="/downloads/richard_godwin_complete_architectural_suite.zip"
                    download="richard_godwin_complete_architectural_suite.zip"
                    onClick={handleDownloadAll}
                    className="w-full py-2.5 rounded-xl bg-[#26282e] hover:bg-[#31343c] text-[#c8a265] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#3b3e47] cursor-pointer no-underline"
                  >
                    <span className="material-symbols-outlined text-[16px]">folder_zip</span>
                    Download All Packages (.ZIP Master Bundle)
                  </a>
                  <div className="flex items-center justify-between bg-[#141517] px-2.5 py-1.5 rounded-lg border border-[#23252a] text-[10px] text-[#7d818e] font-mono">
                    <span className="truncate max-w-[210px] text-[#9ca0ae]">
                      /downloads/richard_godwin_complete_architectural_suite.zip
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyUrl('/downloads/richard_godwin_complete_architectural_suite.zip', 'all')}
                      className="hover:text-[#c8a265] transition-colors flex items-center gap-1 cursor-pointer ml-2 shrink-0"
                    >
                      <span className="material-symbols-outlined text-[12px]">
                        {copiedId === 'all' ? 'check' : 'content_copy'}
                      </span>
                      <span>{copiedId === 'all' ? 'Copied' : 'Copy Link'}</span>
                    </button>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 rounded-full bg-[#24262b] hover:bg-[#2f3239] text-[#eae7e1] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Return to Storefront
              </button>
            </div>
          ) : checkoutStep === 'checking_out' ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full border-2 border-[#c8a265] border-t-transparent animate-spin mb-4" />
              <p className="text-sm font-medium text-[#eae7e1]">Generating encrypted download keys...</p>
              <p className="text-xs text-[#80838e] mt-1">Packaging CAD assemblies and license certificates</p>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-full bg-[#202227] flex items-center justify-center text-[#6e727e] mb-3">
                <span className="material-symbols-outlined text-[28px]">shopping_bag</span>
              </div>
              <h4 className="text-base font-medium text-[#eae7e1]">Your bag is empty</h4>
              <p className="text-xs text-[#828694] mt-1 max-w-xs">
                Explore our architectural standard detail libraries, parametric facade scripts, and studio practice kits.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="space-y-3">
                {items.map((item) => (
                  <div 
                    key={item.product.id}
                    className="p-3.5 rounded-xl bg-[#1d1f23] border border-[#2b2d34] flex gap-3 items-center justify-between"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#24262b] shrink-0 border border-[#32353d]">
                      <picture className="w-full h-full block">
                        {item.product.webpImage && (
                          <source type="image/webp" srcSet={item.product.webpImage} />
                        )}
                        <img 
                          src={item.product.image} 
                          alt={item.product.title} 
                          width={56}
                          height={56}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </picture>
                    </div>
                    <div className="flex-1 min-w-0 pr-2">
                      <h5 className="text-xs font-semibold text-[#f5f4ef] truncate">{item.product.title}</h5>
                      <span className="text-[11px] text-[#c8a265] font-mono block mt-0.5">${item.product.price.toFixed(2)}</span>
                      <span className="text-[10px] text-[#7d818f] truncate block">{item.product.fileSize}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center border border-[#32353c] rounded-full bg-[#161719] px-1.5 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="w-5 h-5 flex items-center justify-center text-[#9a9ea9] hover:text-[#eae7e1] text-xs cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-mono px-2 text-[#eae7e1]">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="w-5 h-5 flex items-center justify-center text-[#9a9ea9] hover:text-[#eae7e1] text-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#6d717d] hover:text-[#e05d52] p-1 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Instant Checkout Form */}
              <form onSubmit={handleCheckoutSubmit} className="mt-4 pt-4 border-t border-[#292c32] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-[#c8a265] font-semibold block">Checkout Recipient</span>
                  <span className="text-[10px] text-[#8e929f] font-mono">Immediate link delivery</span>
                </div>
                <div>
                  <label className="text-[11px] text-[#868a97] block mb-1">Architect / Studio Work Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(false);
                    }}
                    placeholder="architect@studio.com"
                    className={`w-full px-3 py-2 rounded-lg bg-[#111213] border text-xs text-[#eae7e1] focus:outline-none transition-colors ${
                      emailError ? 'border-[#e05d52] ring-1 ring-[#e05d52]' : 'border-[#2e3137] focus:border-[#c8a265]'
                    }`}
                  />
                  {emailError && (
                    <span className="text-[10px] text-[#e05d52] mt-1 block">
                      Please enter a valid work email to receive your license files.
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-[11px] text-[#868a97] block mb-1">Practice / Company Name (Optional for Invoice)</label>
                  <input
                    type="text"
                    value={studioName}
                    onChange={(e) => setStudioName(e.target.value)}
                    placeholder="Godwin & Partners Architects"
                    className="w-full px-3 py-2 rounded-lg bg-[#111213] border border-[#2e3137] text-xs text-[#eae7e1] focus:outline-none focus:border-[#c8a265]"
                  />
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        {checkoutStep === 'cart' && items.length > 0 && (
          <div className="p-5 border-t border-[#26282e] bg-[#141517] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#8c909e]">
              <span>Delivery Method</span>
              <span className="text-[#c8a265] font-medium">Instant Encrypted .ZIP Download</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold text-[#f5f4ef]">
              <span>Subtotal</span>
              <span className="font-mono text-lg text-[#c8a265]">${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => handleCheckoutSubmit()}
              className="w-full py-3.5 rounded-full bg-[#c8a265] hover:bg-[#dfb776] text-[#141413] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              Complete Instant Checkout (${subtotal.toFixed(2)})
            </button>

            <a
              href={`mailto:goldengiftahuruonye@gmail.com?subject=${encodeURIComponent(
                'Studio Invoice & Payment Plan Inquiry — Atelier CAD Suite'
              )}&body=${encodeURIComponent(
                `Hello Atelier Godwin (goldengiftahuruonye@gmail.com),\n\nI would like to request a formal studio tax invoice or installment payment plan for the following CAD/BIM tools in my cart:\n\n${items
                  .map((it) => `- ${it.product.title} (Qty: ${it.quantity}) — $${it.product.price * it.quantity}`)
                  .join('\n')}\n\nTotal Value: $${subtotal.toFixed(2)}\n\nPlease advise on billing and wire details.`
              )}`}
              className="w-full py-2.5 rounded-full bg-[#1e2025] hover:bg-[#282a30] text-[#c8a265] text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#323640] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">receipt_long</span>
              <span>Request Studio Invoice &amp; Payment Plan via Email</span>
            </a>

            <p className="text-[10px] text-center text-[#6e727e]">
              Direct studio desk: goldengiftahuruonye@gmail.com · Includes commercial license
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
