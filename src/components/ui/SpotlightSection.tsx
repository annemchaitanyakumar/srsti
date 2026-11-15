'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import { SPOTLIGHT_PRODUCT } from '../../data/products';

export const SpotlightSection: React.FC = () => {
  const { openQuickView } = useCart();
  const stageRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section id="spotlight" className="relative w-full bg-[#FFFFFF] py-24 px-6 sm:px-12 overflow-hidden">
      
      <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Photorealistic Metallic Tin & Golden Oil Bowl with floating leaves */}
        <div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-6 flex justify-center items-center relative select-none"
        >
          <div
            className="relative w-full max-w-[500px] aspect-square group cursor-pointer"
            onClick={() => openQuickView(SPOTLIGHT_PRODUCT)}
          >
            {/* Soft Studio Shadow Plane under Tin & Bowl */}
            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[85%] h-8 rounded-full bg-radial from-black/20 via-black/06 to-transparent blur-md pointer-events-none" />

            {/* High-Resolution Studio Photography of Tin & Oil Bowl (z-index 10) */}
            <div className="relative w-full h-full z-10">
              <Image
                src="/images/products/spotlight-creme-tin.png"
                alt="SRSTI Ayurvedic Almond & Moringa Hand Balm with Golden Nectar Bowl"
                fill
                priority
                className="object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.14)] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.025]"
              />
            </div>

          </div>
        </div>

        {/* Right Column: Title (28px, #6B742C), 2 short paragraphs, pill button */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          
          {/* Title: AYURVEDIC HAND & BODY BALM (28px, #6B742C) */}
          <h2 className="text-2xl sm:text-[28px] font-bold tracking-[0.06em] uppercase text-[#6B742C] leading-snug">
            AYURVEDIC HAND BALM
            <span className="block text-xl sm:text-2xl font-light text-[#2C2C2C] mt-1">
              100 ML
            </span>
          </h2>

          <div className="w-10 h-[2px] bg-[#6B742C] my-4 opacity-50" />

          {/* Paragraph 1 */}
          <p className="text-[13px] text-[#666666] leading-relaxed max-w-[420px]">
            Our Ayurvedic hand and body balm is a deeply restorative treatment concentrated with cold-pressed sweet almond oil, moringa seed nectar, and pure Indian beeswax.
          </p>

          {/* Paragraph 2 */}
          <p className="mt-3 text-[13px] text-[#666666] leading-relaxed max-w-[420px]">
            Enriched with natural vitamin E and bioactive omegas, it absorbs effortlessly to fortify the lipid barrier, soothe dryness, and impart a luminous botanical glow.
          </p>

          {/* Pill CTA Button (border: 1px solid #6B742C, border-radius: 999px) */}
          <div className="mt-8">
            <button
              onClick={() => openQuickView(SPOTLIGHT_PRODUCT)}
              className="py-2.5 px-8 rounded-full border border-[#6B742C] text-[#6B742C] hover:bg-[#6B742C] hover:text-white text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 shadow-xs hover:shadow-md"
            >
              DISCOVER RITUAL
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};
