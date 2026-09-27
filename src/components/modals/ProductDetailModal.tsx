import React, { useEffect } from 'react';
import { DigitalProduct } from '../../types/architecture';

interface ProductDetailModalProps {
  product: DigitalProduct | null;
  onClose: () => void;
  onAddToCart: (product: DigitalProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && product) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#0e0f10]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-xl bg-[#161719] rounded-2xl border border-[#2b2d33] p-5 sm:p-6 shadow-2xl text-[#eae7e1] max-h-[90vh] overflow-y-auto flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#26282e] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#c8a265] font-semibold">
                {product.badge || 'Architectural Specification'}
              </span>
              <span className="text-[#656870]">·</span>
              <span className="text-xs text-[#9a9da6]">{product.fileSize}</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#202227] hover:bg-[#2c2f36] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Product Hero preview */}
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#202227] border border-[#2c2f36] mb-4">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover" 
            />
          </div>

          <h3 className="text-xl font-bold text-[#f5f4ef] font-serif mb-2">{product.title}</h3>
          <p className="text-xs text-[#9fa3af] leading-relaxed mb-4">{product.fullDesc}</p>

          {/* Supported CAD formats */}
          <div className="p-3 rounded-xl bg-[#1b1d21] border border-[#26282e] mb-4">
            <span className="text-[11px] uppercase tracking-wider text-[#797d8b] font-semibold block mb-2">
              Supported CAD / BIM Formats
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.format.map((fmt, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-[#25272e] text-[#c8a265] text-xs font-mono font-medium border border-[#323640]">
                  {fmt}
                </span>
              ))}
            </div>
          </div>

          {/* What's Included */}
          <div className="p-3 rounded-xl bg-[#1b1d21] border border-[#26282e] mb-4 text-xs space-y-2">
            <span className="text-[11px] uppercase tracking-wider text-[#797d8b] font-semibold block">
              Deliverables Package:
            </span>
            {product.whatsIncluded.map((inc, i) => (
              <div key={i} className="flex items-start gap-2 text-[#d2d4dc]">
                <span className="material-symbols-outlined text-[15px] text-[#c8a265] shrink-0 mt-0.5">check_circle</span>
                <span>{inc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer with Price and Add to Bag */}
        <div className="pt-4 border-t border-[#26282e] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#7d818e]">Perpetual Studio License</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-[#c8a265]">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs text-[#6e727e] line-through font-mono">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="px-6 py-3 rounded-full bg-[#c8a265] hover:bg-[#dfb776] text-[#141413] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            Add to Bag (${product.price.toFixed(2)})
          </button>
        </div>
      </div>
    </div>
  );
};
