'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CATALOG_PRODUCTS } from '../../data/products';

export const CatalogGrid: React.FC = () => {
  const { addItem, openQuickView } = useCart();

  return (
    <section id="catalog" className="relative w-full bg-[#FFFFFF] py-20 px-6 sm:px-10 border-t border-[#EFEFEF]">
      
      <div className="max-w-[1140px] mx-auto">
        
        {/* 4 Equal Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATALOG_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-white p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-xl group relative border border-[#E8E8E8] hover:border-[#DDE2C1]"
            >
              {/* Pill Badge (NEW, -20%, TOP, BIO) above product image */}
              <div className="w-full flex justify-start items-center mb-1">
                {product.badge && (
                  <span
                    className={`text-[8.5px] font-bold tracking-widest px-2 py-0.5 rounded-full uppercase ${
                      product.badge.includes('-')
                        ? 'bg-[#C59B27] text-white'
                        : 'bg-[#6B742C] text-white'
                    }`}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Quick View Button */}
              <button
                onClick={() => openQuickView(product)}
                className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-white/95 hover:bg-white text-[#6E6E6E] hover:text-[#6B742C] shadow-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                title="Quick View"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>

              {/* Photorealistic Square Studio Product Frame with Micro-Zoom */}
              <div
                onClick={() => openQuickView(product)}
                className="relative w-full aspect-square max-w-[200px] my-3 cursor-pointer overflow-hidden flex items-center justify-center"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="object-contain transition-transform duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03] drop-shadow-[0_10px_20px_rgba(0,0,0,0.12)]"
                />
              </div>

              {/* Info Area */}
              <div className="w-full mt-2">
                
                {/* Centered Title (12px, bold, uppercase) */}
                <h3 className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#2C2C2C] truncate">
                  {product.name}
                </h3>

                {/* 5-Star Rating (#D4AF37) */}
                <div className="flex items-center justify-center space-x-1 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]"
                    />
                  ))}
                </div>

                {/* Pricing: Old strikethrough + Current Price in INR */}
                <div className="flex items-center justify-center space-x-2 my-2">
                  {product.oldPrice && (
                    <span className="text-[11px] text-[#8E8E8E] line-through">
                      ₹{product.oldPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-sm font-bold text-[#2C2C2C]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Pill ADD TO CART Button */}
                <button
                  onClick={() => addItem(product)}
                  className="w-full py-2 px-4 rounded-full border border-[#888888] text-[#4A4A4A] hover:bg-[#6B742C] hover:border-[#6B742C] hover:text-white text-[10px] font-bold tracking-[0.1em] uppercase transition-all duration-300 flex items-center justify-center space-x-1 mt-2"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>ADD TO CART</span>
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
