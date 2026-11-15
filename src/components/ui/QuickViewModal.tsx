'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Star, ShieldCheck, Droplet, Thermometer, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const handleAddAndClose = () => {
    addItem(quickViewProduct, quantity);
    closeQuickView();
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-12 border border-[#E0E0E0]">
        
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#666] hover:text-[#2C2C2C] flex items-center justify-center shadow-sm transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Column: Product Visual */}
        <div className="md:col-span-5 bg-gradient-to-b from-[#F7F8F1] to-[#EEF0E0] p-8 flex flex-col items-center justify-center relative">
          {quickViewProduct.badge && (
            <span className="absolute top-4 left-4 bg-[#6B742C] text-white text-[9px] font-extrabold tracking-widest px-2.5 py-1 rounded-full uppercase">
              {quickViewProduct.badge}
            </span>
          )}

          <div className="relative w-full aspect-square max-w-[240px]">
            <Image
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>

          <div className="mt-4 text-center">
            <span className="text-[10px] font-bold text-[#6B742C] tracking-widest uppercase">
              BOTTLED AT SOURCE • SINGLE ORIGIN
            </span>
            <span className="block text-xs font-semibold text-[#555] mt-0.5">
              {quickViewProduct.volume}
            </span>
          </div>
        </div>

        {/* Right Column: Details & Technical Specifications */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between text-left">
          <div>
            <div className="text-[10px] font-bold tracking-[0.2em] text-[#7D8735] uppercase mb-1">
              SRSTI ORGANIC TERROIR INDIA
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#2C2C2C] uppercase tracking-wide">
              {quickViewProduct.name}
            </h3>

            {quickViewProduct.subtitle && (
              <h4 className="text-xs font-semibold text-[#6E6E6E] tracking-wider mt-0.5 uppercase">
                {quickViewProduct.subtitle}
              </h4>
            )}

            {/* Stars & Reviews */}
            <div className="flex items-center space-x-1.5 my-2.5">
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#2C2C2C]">5.0</span>
              <span className="text-xs text-[#888]">({quickViewProduct.reviewsCount} verified reviews)</span>
            </div>

            {/* Pricing in INR */}
            <div className="flex items-center space-x-3 my-3">
              {quickViewProduct.oldPrice && (
                <span className="text-sm text-[#888] line-through">
                  ₹{quickViewProduct.oldPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-2xl font-black text-[#2C2C2C]">
                ₹{quickViewProduct.price.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-[#555] leading-relaxed mb-4">
              {quickViewProduct.description}
            </p>

            {/* Technical Laboratory Spec Grid */}
            <div className="grid grid-cols-2 gap-2 p-3 bg-[#FAF8EE] rounded-xl border border-[#DDE2C1]/60 mb-5">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-3.5 h-3.5 text-[#6B742C]" />
                <div>
                  <span className="text-[9px] text-[#888] block">COLD PRESS TEMP</span>
                  <span className="text-[11px] font-bold text-[#2C2C2C]">{quickViewProduct.coldPressTemp}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Droplet className="w-3.5 h-3.5 text-[#D4AF37]" />
                <div>
                  <span className="text-[9px] text-[#888] block">FREE ACIDITY</span>
                  <span className="text-[11px] font-bold text-[#2C2C2C]">{quickViewProduct.acidity}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7D8735]" />
                <div>
                  <span className="text-[9px] text-[#888] block">OLEIC ACID</span>
                  <span className="text-[11px] font-bold text-[#2C2C2C]">{quickViewProduct.oleicAcid}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6B742C]" />
                <div>
                  <span className="text-[9px] text-[#888] block">BIOACTIVE POLYPHENOLS</span>
                  <span className="text-[11px] font-bold text-[#2C2C2C]">{quickViewProduct.polyphenols}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quantity and Add to Cart Action */}
          <div className="flex items-center space-x-4 pt-4 border-t border-[#EFEFEF]">
            <div className="flex items-center border border-[#D0D0D0] rounded-full px-3 py-1.5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-[#666] hover:text-[#2C2C2C]"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold text-[#2C2C2C] px-3">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-[#666] hover:text-[#2C2C2C]"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleAddAndClose}
              className="flex-1 py-3 px-6 rounded-full bg-[#6B742C] hover:bg-[#555C23] text-white text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>ADD TO BAG • ₹{(quickViewProduct.price * quantity).toLocaleString('en-IN')}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
