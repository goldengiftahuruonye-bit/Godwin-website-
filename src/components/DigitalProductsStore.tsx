import React, { useState } from 'react';
import { DigitalProduct } from '../types/architecture';

interface DigitalProductsStoreProps {
  products: DigitalProduct[];
  onAddToCart: (product: DigitalProduct) => void;
  onOpenProductDetail: (product: DigitalProduct) => void;
}

export const DigitalProductsStore: React.FC<DigitalProductsStoreProps> = ({
  products,
  onAddToCart,
  onOpenProductDetail,
}) => {
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (e: React.MouseEvent, product: DigitalProduct) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="digital-store" className="w-full bg-[#eae5db] text-[#1c1b18] py-10 px-4 transition-colors">
      <div className="flex flex-col gap-1 mb-6 text-center">
        {/* Instant Digital Delivery pill */}
        <div className="inline-flex items-center justify-center gap-1.5 mx-auto px-3 py-0.5 rounded-full bg-[#ded6c7] text-[#1c1b18] text-[11px] uppercase tracking-wider mb-1 font-semibold border border-[#cdbfab]">
          <span>Instant Digital Delivery</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-[28px] sm:text-[30px] font-bold text-[#1a1916] tracking-tight font-serif">
          Architectural Toolkits &amp; Blueprints
        </h2>
        <p className="text-[14px] text-[#5c5850] max-w-xs mx-auto leading-relaxed">
          Production-ready BIM assemblies, parametric scripts, and deep-dive technical handbooks.
        </p>
      </div>

      {/* 2-Column Product Grid (matching screenshot) */}
      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => {
          const isAdded = addedId === product.id;

          return (
            <div
              key={product.id}
              onClick={() => onOpenProductDetail(product)}
              className="p-3.5 rounded-2xl bg-[#f6f3ed]/90 border border-[#dfd6c8] shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div className="flex flex-col gap-2.5">
                {/* Product Cover Artwork */}
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#e0d8cc] border border-[#d5cbbe]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {product.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#1b1c1e] text-[#c8a265] text-[10px] font-semibold tracking-wide shadow-sm">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Title & Short Description */}
                <div>
                  <h4 className="text-[13px] font-bold text-[#1b1916] line-clamp-1 leading-snug group-hover:text-[#916b2c] transition-colors">
                    {product.title}
                  </h4>
                  <p className="text-[11px] text-[#69655c] line-clamp-2 mt-0.5 leading-normal">
                    {product.shortDesc}
                  </p>
                </div>
              </div>

              {/* Bottom Price & Add to Cart button */}
              <div className="mt-3 pt-2 border-t border-[#e2d9cd] flex items-center justify-between">
                <span className="text-[17px] text-[#1c1b18] font-bold font-mono">
                  ${product.price.toFixed(2)}
                </span>
                
                <button
                  type="button"
                  onClick={(e) => handleAdd(e, product)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                    isAdded
                      ? 'bg-[#29784e] text-white scale-105'
                      : 'bg-[#1b1c1e] text-white hover:bg-[#c8a265] hover:text-[#121314]'
                  }`}
                  title={isAdded ? 'Added to Bag' : 'Add to Bag'}
                  aria-label={`Add ${product.title} to bag`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isAdded ? 'check' : 'shopping_bag'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
