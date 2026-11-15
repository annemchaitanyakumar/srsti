'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowDown, RotateCcw, ShieldCheck, Sparkles, CheckCircle2, Droplets } from 'lucide-react';
import { FloatingLeaves3D } from '../3d/FloatingLeaves3D';
import { ALL_PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';

export const HeroSection: React.FC = () => {
  const { addItem, openQuickView } = useCart();
  const heroProduct = ALL_PRODUCTS[0]; // Flagship Kachi Ghani Mustard Oil
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 15, y: y * 15 });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[90vh] bg-gradient-to-b from-[#FAF8F5] via-[#F4F1EA] to-[#ECE8DE] flex items-center overflow-hidden pt-20 pb-16 lg:py-24"
    >
      {/* 1. Real 3D GLB Leaves WebGL Canvas with Motion & Parallax */}
      <FloatingLeaves3D count={14} interactive={true} className="z-10" />

      {/* 2. Soft Ambient Radial Studio Glow */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-white/70 rounded-full blur-[130px]" />
        <div className="absolute bottom-12 right-1/4 w-[500px] h-[400px] bg-[#EEF0E0]/60 rounded-full blur-[120px]" />
      </div>

      {/* 3. Main Hero Architectural Grid */}
      <div className="max-w-[1240px] w-full mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-20">
        
        {/* Left Column (7 cols): Editorial Typography & Command Center */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Top Vedic Tag */}
          <div className="inline-flex items-center space-x-2 text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#555C23] bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full w-fit mb-5 shadow-xs border border-[#E0DED5]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>ESTD 1948 • VEDIC ESTATE PRESSERY • INDIA</span>
          </div>

          {/* Italic Serif Intro Accent Line */}
          <span className="font-serif italic text-lg sm:text-xl text-[#7D8735] font-normal mb-1">
            Pure living oil from ancestral soil.
          </span>

          {/* Masterpiece Hero Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.04] tracking-[0.02em] uppercase text-[#222712]">
            ANCESTRAL PURITY,
            <span className="block font-light text-[#555C23]">
              BOTTLED IN TIME.
            </span>
          </h1>

          {/* Editorial Narrative */}
          <p className="mt-5 text-sm sm:text-base text-[#555555] max-w-xl leading-relaxed font-normal">
            Cold-pressed in seasoned Vaagai wood and monolithic granite ghanis below 28°C. Single-origin, unheated, unbleached, and 100% hexane-free — honouring the timeless nutritional intelligence of native Indian oil seeds.
          </p>

          {/* Dual Action CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => scrollTo('collections')}
              className="px-8 py-3.5 rounded-full bg-[#6B742C] hover:bg-[#555C23] text-white text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-98 flex items-center space-x-2"
            >
              <span>EXPLORE RESERVE HARVESTS</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => scrollTo('story-canvas')}
              className="px-7 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#333333] hover:text-[#6B742C] text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 border border-[#D5D2C7] shadow-xs hover:shadow-md flex items-center space-x-2"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#6B742C]" />
              <span>THE 3D GHANI STORY</span>
            </button>
          </div>

          {/* 4 Quality Checkmarks */}
          <div className="mt-10 pt-6 border-t border-[#E2DFD6] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#6B742C] shrink-0" />
              <span className="text-[11px] font-semibold text-[#4A4A4A]">Zero Added Heat (&lt;28°C)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#6B742C] shrink-0" />
              <span className="text-[11px] font-semibold text-[#4A4A4A]">Single-Origin Seeds</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#6B742C] shrink-0" />
              <span className="text-[11px] font-semibold text-[#4A4A4A]">72h Gravity Settled</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#6B742C] shrink-0" />
              <span className="text-[11px] font-semibold text-[#4A4A4A]">FSSAI Certified Organic</span>
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Architectural Showcase Centerpiece */}
        <div className="lg:col-span-5 flex justify-center items-center relative select-none">
          <div
            className="relative w-full max-w-[440px] aspect-[4/5] rounded-[32px] bg-gradient-to-b from-white/95 to-[#F4F1EA]/80 p-8 border border-white shadow-[0_25px_60px_-15px_rgba(79,87,32,0.18)] backdrop-blur-sm flex flex-col justify-between items-center transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
            }}
          >
            {/* Top Floating Badge */}
            <div className="w-full flex justify-between items-center z-20">
              <span className="text-[9.5px] font-bold tracking-widest uppercase bg-[#FAF8EE] text-[#6B742C] border border-[#DDE2C1] px-3 py-1 rounded-full">
                ✦ HARVEST 2026 RESERVE
              </span>
              <span className="text-[10px] font-semibold text-[#888888] tracking-wider uppercase">
                FIRST COLD PRESS
              </span>
            </div>

            {/* Central Masterpiece Product Image */}
            <div
              onClick={() => openQuickView(heroProduct)}
              className="relative w-full aspect-square max-w-[280px] my-4 cursor-pointer group flex items-center justify-center"
            >
              <Image
                src={heroProduct.image}
                alt={heroProduct.name}
                width={280}
                height={280}
                priority
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.16)] transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Soft Ambient Contact Shadow */}
            <div className="w-3/4 h-5 rounded-full bg-radial from-black/25 via-black/08 to-transparent blur-md -mt-6 pointer-events-none" />

            {/* Bottom Card Summary & Instant Add Button */}
            <div className="w-full bg-white/90 rounded-2xl p-4 border border-[#E8E6DF] shadow-xs flex items-center justify-between mt-2 z-20">
              <div className="text-left">
                <h4 className="text-xs font-bold text-[#2C2C2C] uppercase tracking-wider truncate">
                  {heroProduct.name}
                </h4>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="text-sm font-extrabold text-[#6B742C]">
                    ₹{heroProduct.price.toLocaleString('en-IN')}
                  </span>
                  {heroProduct.oldPrice && (
                    <span className="text-[11px] text-[#999999] line-through">
                      ₹{heroProduct.oldPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-[10px] text-[#888888]">/ 500 ML</span>
                </div>
              </div>

              <button
                onClick={() => addItem(heroProduct)}
                className="py-2 px-4 rounded-full bg-[#6B742C] hover:bg-[#555C23] text-white text-[10.5px] font-bold tracking-wider uppercase transition-colors shadow-xs"
              >
                + ADD
              </button>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
