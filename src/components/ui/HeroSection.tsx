'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ArrowDown, RotateCcw, Sparkles, CheckCircle2, ShoppingBag, Eye } from 'lucide-react';
import { FloatingLeaves3D } from '../3d/FloatingLeaves3D';
import { ALL_PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';

// Dynamically import 3D Hero Scene with SSR disabled
const HeroScene3D = dynamic(
  () => import('../3d/HeroScene3D').then((mod) => mod.HeroScene3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[480px] sm:h-[540px] lg:h-[620px] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#6B742C] border-t-transparent rounded-full animate-spin" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B742C]">
            INITIALIZING 3D WEBGL STUDIO...
          </span>
        </div>
      </div>
    ),
  }
);

export const HeroSection: React.FC = () => {
  const { addItem, openQuickView } = useCart();
  const heroProduct = ALL_PRODUCTS[0]; // Flagship Kachi Ghani Mustard Oil

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full min-h-[92vh] bg-gradient-to-b from-[#FAF8F5] via-[#F4F1EA] to-[#ECE8DE] flex items-center overflow-hidden pt-20 pb-16 lg:py-24"
    >
      {/* 1. Real 3D GLB Leaves WebGL Background Canvas with Flutter Physics */}
      <FloatingLeaves3D count={14} interactive={true} className="z-10" />

      {/* 2. Soft Ambient Radial Studio Glow */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-white/70 rounded-full blur-[130px]" />
        <div className="absolute bottom-12 right-1/4 w-[500px] h-[400px] bg-[#EEF0E0]/60 rounded-full blur-[120px]" />
      </div>

      {/* 3. Main Hero Architectural Grid */}
      <div className="max-w-[1280px] w-full mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-20">
        
        {/* Left Column (6.5 cols): Editorial Typography & Command Center */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left">
          
          {/* Top Vedic Kicker */}
          <div className="inline-flex items-center space-x-2 text-[10px] sm:text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#555C23] bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full w-fit mb-5 shadow-xs border border-[#E0DED5]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>ESTD 1948 • VEDIC ESTATE PRESSERY • INDIA</span>
          </div>

          {/* Italic Serif Intro Accent Line */}
          <span className="font-serif italic text-lg sm:text-xl text-[#7D8735] font-normal mb-1">
            Pure living oil from ancestral soil.
          </span>

          {/* Masterpiece Hero Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold leading-[1.04] tracking-[0.02em] uppercase text-[#222712]">
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
              onClick={() => addItem(heroProduct)}
              className="px-8 py-3.5 rounded-full bg-[#6B742C] hover:bg-[#555C23] text-white text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-98 flex items-center space-x-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>ACQUIRE HARVEST RESERVE — ₹{heroProduct.price}</span>
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
              <span className="text-[11px] font-semibold text-[#4A4A4A]">Zero Heat (&lt;28°C)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#6B742C] shrink-0" />
              <span className="text-[11px] font-semibold text-[#4A4A4A]">Native Heirloom</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#6B742C] shrink-0" />
              <span className="text-[11px] font-semibold text-[#4A4A4A]">72h Gravity Settled</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#6B742C] shrink-0" />
              <span className="text-[11px] font-semibold text-[#4A4A4A]">FSSAI Organic</span>
            </div>
          </div>

        </div>

        {/* Right Column (6 cols): 3D WebGL Bottle Showcase Centerpiece */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center items-center relative select-none">
          
          <div className="relative w-full max-w-[520px] flex flex-col items-center">
            
            {/* Top Batch Metadata Badge */}
            <div className="w-full flex justify-between items-center mb-1 px-4 z-20">
              <span className="text-[9.5px] font-bold tracking-widest uppercase bg-white/90 text-[#6B742C] border border-[#DDE2C1] px-3.5 py-1 rounded-full shadow-xs">
                ✦ HARVEST 2026 RESERVE
              </span>
              <span className="text-[10px] font-semibold text-[#666666] tracking-wider uppercase bg-white/80 px-3 py-1 rounded-full border border-black/5">
                SINGLE-ORIGIN RAJASTHAN
              </span>
            </div>

            {/* Live Interactive 3D WebGL Glass Bottle Canvas with Drag Rotate */}
            <HeroScene3D />

            {/* Bottom Card Summary & Instant Add Button */}
            <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-[#E4E2DA] shadow-lg flex items-center justify-between -mt-3 z-20">
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-[9px] font-extrabold uppercase bg-[#FAF8EE] text-[#6B742C] px-2 py-0.5 rounded border border-[#DDE2C1]">
                    FLAGSHIP
                  </span>
                  <h4 className="text-xs font-bold text-[#2C2C2C] uppercase tracking-wider truncate">
                    {heroProduct.name}
                  </h4>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm font-extrabold text-[#6B742C]">
                    ₹{heroProduct.price.toLocaleString('en-IN')}
                  </span>
                  {heroProduct.oldPrice && (
                    <span className="text-[11px] text-[#999999] line-through">
                      ₹{heroProduct.oldPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-[10px] text-[#888888]">/ 500 ML • Amber Glass</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openQuickView(heroProduct)}
                  className="p-2 rounded-full bg-[#FAF8EE] hover:bg-white text-[#666] hover:text-[#6B742C] border border-[#E0DED5] transition-colors"
                  title="View Lab Analysis & Specs"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>

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

      </div>

    </section>
  );
};
