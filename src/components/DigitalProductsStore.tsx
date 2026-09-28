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
    <section id="digital-store" className="w-full bg-[#eae5db] text-[#1c1b18] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-2 text-center">
          {/* Instant Digital Delivery pill */}
          <div className="inline-flex items-center justify-center gap-1.5 mx-auto px-3.5 py-1 rounded-full bg-[#ded6c7] text-[#1c1b18] text-[11px] uppercase tracking-wider mb-1 font-semibold border border-[#cdbfab]">
            <span>Instant Digital Delivery</span>
          </div>

          {/* Section Heading */}
          <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#1a1916] tracking-tight font-serif">
            Architectural Toolkits &amp; Blueprints
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#5c5850] max-w-xl mx-auto leading-relaxed">
            Production-ready BIM assemblies, parametric scripts, construction redlines, and deep-dive technical handbooks.
          </p>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {products.map((product) => {
            const isAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => onOpenProductDetail(product)}
                className="p-4 sm:p-5 rounded-2xl bg-[#f6f3ed]/90 hover:bg-[#ffffff] border border-[#dfd6c8] hover:border-[#b08538]/50 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div className="flex flex-col gap-3">
                  {/* Product Cover Artwork */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#e0d8cc] border border-[#d5cbbe]">
                    <picture className="w-full h-full block">
                      {product.srcsetWebp && (
                        <source
                          type="image/webp"
                          srcSet={product.srcsetWebp}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      )}
                      {product.webpImage && !product.srcsetWebp && (
                        <source type="image/webp" srcSet={product.webpImage} />
                      )}
                      <img
                        src={product.image}
                        alt={product.title}
                        width={400}
                        height={300}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </picture>
                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#1b1c1e] text-[#c8a265] text-[10px] font-semibold tracking-wide shadow-sm">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h4 className="text-[14px] sm:text-[15px] font-bold text-[#1b1916] line-clamp-1 leading-snug group-hover:text-[#916b2c] transition-colors">
                      {product.title}
                    </h4>
                    <p className="text-[12px] text-[#69655c] line-clamp-2 mt-1 leading-relaxed">
                      {product.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Bottom Price & Add to Cart button */}
                <div className="mt-4 pt-3 border-t border-[#e2d9cd] flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[18px] sm:text-[20px] text-[#1c1b18] font-bold font-mono">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-[#7a766c] uppercase tracking-wider font-mono">
                      {product.fileSize} · {product.modulesOrPages}
                    </span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={(e) => handleAdd(e, product)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                      isAdded
                        ? 'bg-[#29784e] text-white scale-105'
                        : 'bg-[#1b1c1e] text-white hover:bg-[#c8a265] hover:text-[#121314]'
                    }`}
                    title={isAdded ? 'Added to Bag' : 'Add to Bag'}
                    aria-label={`Add ${product.title} to bag`}
                  >
                    <span className="material-symbols-outlined text-[19px]">
                      {isAdded ? 'check' : 'shopping_bag'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
