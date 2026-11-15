'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ALL_PRODUCTS } from '../../data/products';
import { Product } from '../../types';

export const CollectionsSection: React.FC = () => {
  const { addItem, openQuickView } = useCart();
  const [selectedTab, setSelectedTab] = useState<'all' | 'culinary' | 'massage' | 'hair-skin'>('all');

  const filterTabs = [
    { key: 'all', label: 'ALL HARVESTS' },
    { key: 'culinary', label: 'DAILY CULINARY' },
    { key: 'massage', label: 'AYURVEDIC MASSAGE (ABHYANGA)' },
    { key: 'hair-skin', label: 'HAIR & SKIN NECTARS' },
  ];

  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    if (selectedTab === 'all') return true;
    return product.usageType === selectedTab || product.category === selectedTab;
  });

  return (
    <section id="collections" className="relative w-full py-24 px-6 sm:px-10 bg-[#FFFFFF]">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#EFEFEF] pb-6 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10.5px] font-bold tracking-[0.25em] text-[#6B742C] uppercase bg-[#FAF8EE] border border-[#DDE2C1]/80 px-3.5 py-1 rounded-full mb-2">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>ESTATE RESERVE COLLECTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C2C2C] uppercase tracking-wide">
              COLD-PRESSED HARVESTS
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#666666] max-w-xl">
              Artisanal single-origin oils extracted on Indian granite &amp; Vaagai wood ghani. Unheated, unfiltered, and bottled in UV-protective dark glass.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key as typeof selectedTab)}
                className={`text-[11px] font-bold tracking-wider px-4 py-2 rounded-full uppercase transition-all duration-200 ${
                  selectedTab === tab.key
                    ? 'bg-[#6B742C] text-white shadow-sm'
                    : 'bg-[#F4F4F5] hover:bg-[#EAEAEA] text-[#4A4A4A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-5 border border-[#EAEAEA] hover:border-[#6B742C]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
            >
              {/* Badge & Quick View */}
              <div className="flex items-center justify-between w-full mb-2">
                {product.badge ? (
                  <span className="text-[9px] font-extrabold tracking-wider px-2.5 py-0.5 rounded-full uppercase bg-[#6B742C] text-white">
                    {product.badge}
                  </span>
                ) : <span />}

                <button
                  onClick={() => openQuickView(product)}
                  className="w-8 h-8 rounded-full bg-[#FAF8EE] hover:bg-white text-[#666] hover:text-[#6B742C] shadow-xs flex items-center justify-center transition-colors"
                  title="Quick View Specifications"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Product Visual Container with Micro-Zoom */}
              <div
                onClick={() => openQuickView(product)}
                className="relative w-full aspect-square max-w-[220px] mx-auto my-3 cursor-pointer overflow-hidden flex items-center justify-center"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={220}
                  height={220}
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.04] drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
                />
              </div>

              {/* Product Metadata */}
              <div className="w-full mt-2 text-center">
                
                {/* Ayurvedic Dosha Badge */}
                {product.dosha && (
                  <span className="text-[9.5px] font-semibold text-[#8B9356] bg-[#FAF9F2] px-2.5 py-0.5 rounded-md inline-block uppercase tracking-wider mb-1.5">
                    {product.dosha}
                  </span>
                )}

                <h3 className="text-xs font-bold text-[#2C2C2C] uppercase tracking-wider truncate">
                  {product.name}
                </h3>
                <span className="text-[10px] text-[#888888] block truncate mt-0.5">
                  {product.subtitle}
                </span>

                {/* 5-Star Rating */}
                <div className="flex items-center justify-center space-x-1 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]"
                    />
                  ))}
                  <span className="text-[10px] font-semibold text-[#888] ml-1">
                    ({product.reviewsCount})
                  </span>
                </div>

                {/* Pricing in INR */}
                <div className="flex items-center justify-center space-x-2 my-2.5">
                  {product.oldPrice && (
                    <span className="text-xs text-[#8E8E8E] line-through">
                      ₹{product.oldPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-base font-extrabold text-[#2C2C2C]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10.5px] text-[#6E6E6E] font-medium">
                    / {product.volume}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addItem(product)}
                  className="w-full py-2.5 px-4 rounded-full border border-[#6B742C] text-[#6B742C] hover:bg-[#6B742C] hover:text-white text-[10.5px] font-bold tracking-[0.12em] uppercase transition-all duration-300 flex items-center justify-center space-x-1.5 shadow-xs hover:shadow-md"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO BAG</span>
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
