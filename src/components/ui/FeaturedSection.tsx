'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { FEATURED_SPECIALITIES } from '../../data/products';
import { TrustBar } from './TrustBar';

export const FeaturedSection: React.FC = () => {
  const { addItem, openQuickView } = useCart();

  return (
    <section id="terroir" className="relative w-full bg-[#EFEFEF] py-20 px-6 sm:px-10 overflow-hidden">
      
      <div className="max-w-[1140px] mx-auto">
        
        {/* Section Header: Left-aligned uppercase title (22px, #6B742C) */}
        <div className="mb-10 text-left">
          <h2 className="text-[22px] sm:text-2xl font-bold tracking-[0.08em] uppercase text-[#6B742C]">
            OUR LOCAL SPECIALTIES
          </h2>
          <div className="w-10 h-[2px] bg-[#6B742C] mt-2 opacity-60" />
        </div>

        {/* 3 Square Product Cards Grid (gap: 24px) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_SPECIALITIES.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-xl group relative border border-[#E2E2E2] hover:border-[#DDE2C1]"
            >
              {/* Quick View Floating Action */}
              <button
                onClick={() => openQuickView(product)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-[#6E6E6E] hover:text-[#6B742C] shadow-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                title="Quick View"
              >
                <Eye className="w-4 h-4" />
              </button>

              {/* Photorealistic Square Studio Product Frame with Micro-Zoom */}
              <div
                onClick={() => openQuickView(product)}
                className="relative w-full aspect-square max-w-[260px] my-4 cursor-pointer overflow-hidden flex items-center justify-center"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={260}
                  height={260}
                  className="object-contain transition-transform duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03] drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
                />
              </div>

              {/* Product Info Block */}
              <div className="w-full mt-2">
                
                {/* Centered Uppercase Product Title (12px, #2C2C2C, letter-spacing: 0.08em) */}
                <h3 className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#2C2C2C]">
                  {product.name}
                </h3>

                {/* 5 Gold Star Rating (#D4AF37) */}
                <div className="flex items-center justify-center space-x-1 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]"
                    />
                  ))}
                </div>

                {/* Pricing: Strikethrough Old Price + Bold Current Price in INR */}
                <div className="flex items-center justify-center space-x-2.5 my-2.5">
                  {product.oldPrice && (
                    <span className="text-xs text-[#8E8E8E] line-through">
                      ₹{product.oldPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-sm font-extrabold text-[#2C2C2C]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Pill-shaped ADD TO CART Button (border: 1px solid #888, border-radius: 999px) */}
                <button
                  onClick={() => addItem(product)}
                  className="w-full max-w-[170px] mx-auto py-2 px-4 rounded-full border border-[#888888] text-[#4A4A4A] hover:bg-[#6B742C] hover:border-[#6B742C] hover:text-white text-[10.5px] font-bold tracking-[0.1em] uppercase transition-all duration-300 flex items-center justify-center space-x-1.5 mt-2"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>ADD TO CART</span>
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* Clean 4-Item Trust Bar */}
        <div className="mt-14">
          <TrustBar />
        </div>

      </div>

    </section>
  );
};
