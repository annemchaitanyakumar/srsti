'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowDown, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ALL_PRODUCTS } from '../../data/products';

export const HeroSection: React.FC = () => {
  const { addItem } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: '✦ 100% WOOD-PRESSED • ZERO HEAT • FSSAI CERTIFIED',
      titlePrimary: 'LIVING NECTAR OF',
      titleSecondary: 'ANCESTRAL SEEDS',
      subtitle: 'Cold-pressed in monolithic granite and Vaagai wood below 28°C. Unheated, unbleached, and hexane-free.',
      ctaPrimary: 'EXPLORE HARVESTS',
      ctaSecondary: 'EXPERIENCE THE GHANI',
      productToCart: ALL_PRODUCTS[0],
    },
    {
      badge: '✦ HARVEST 2026 • SINGLE-ORIGIN RAJASTHAN',
      titlePrimary: 'KACHI GHANI',
      titleSecondary: 'RAW MUSTARD OIL',
      subtitle: 'Pungent, golden, and rich in natural antioxidants. Pressed from indigenous heirloom seeds.',
      ctaPrimary: 'SHOP RAW MUSTARD',
      ctaSecondary: 'VIEW LAB REPORT',
      productToCart: ALL_PRODUCTS[0],
    },
    {
      badge: '✦ VEDIC WELLNESS RITUAL • TRIDOSHA BALANCING',
      titlePrimary: 'HERITAGE BLACK',
      titleSecondary: 'SESAME & SERUM',
      subtitle: 'The supreme oil of Ayurveda. Slow stone-pressed black til paired with restorative facial elixir.',
      ctaPrimary: 'SHOP GIFT COFFRET',
      ctaSecondary: 'DISCOVER RITUAL',
      productToCart: ALL_PRODUCTS[2],
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const active = slides[currentSlide];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[660px] lg:h-[720px] bg-gradient-to-b from-[#D9DADC] via-[#E6E7E9] to-[#F4F4F5] flex items-center overflow-hidden pt-12 lg:pt-10">
      
      {/* Background Soft Studio Atmosphere Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-white/60 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-[480px] h-[380px] bg-[#EEF0E0]/70 rounded-full blur-[110px]" />
      </div>

      {/* Carousel Arrow Left */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-[#4A4A4A] hover:text-[#6B742C] shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 border border-white"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Carousel Arrow Right */}
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-[#4A4A4A] hover:text-[#6B742C] shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 border border-white"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Main Content Grid */}
      <div className="max-w-[1240px] w-full mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">
        
        {/* Left Column: Stacked Title, Subtitle, Dual CTAs & Live Metrics */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left py-6">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center space-x-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#555C23] bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full w-fit mb-5 shadow-xs border border-white">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>{active.badge}</span>
          </div>

          {/* Large Stacked Title (48px, light-to-bold contrast, #FFFFFF with subtle drop shadow) */}
          <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold leading-[1.05] tracking-[0.03em] uppercase text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.22)]">
            <span className="block font-black text-white">
              {active.titlePrimary}
            </span>
            <span className="block font-light text-white opacity-95">
              {active.titleSecondary}
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="mt-4 text-sm sm:text-base font-semibold tracking-[0.06em] text-[#4A4A4A] max-w-lg leading-relaxed">
            {active.subtitle}
          </h2>

          {/* Dual Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <button
              onClick={() => scrollToSection('collections')}
              className="px-7 py-3 rounded-full bg-[#6B742C] hover:bg-[#555C23] text-white text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <span>{active.ctaPrimary}</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => scrollToSection('story-canvas')}
              className="px-6 py-3 rounded-full bg-white/90 hover:bg-white text-[#4A4A4A] hover:text-[#6B742C] text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 border border-white shadow-xs hover:shadow-md flex items-center space-x-2"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#6B742C]" />
              <span>{active.ctaSecondary}</span>
            </button>
          </div>

          {/* Heritage Metrics Bar */}
          <div className="mt-10 pt-6 border-t border-black/10 grid grid-cols-4 gap-2 text-left">
            <div>
              <span className="block text-lg font-black text-[#2C2C2C]">8.5 RPM</span>
              <span className="text-[9.5px] font-semibold text-[#6E6E6E] uppercase tracking-wider">Slow Churn</span>
            </div>
            <div>
              <span className="block text-lg font-black text-[#6B742C]">&lt; 28°C</span>
              <span className="text-[9.5px] font-semibold text-[#6E6E6E] uppercase tracking-wider">Zero Heat</span>
            </div>
            <div>
              <span className="block text-lg font-black text-[#2C2C2C]">0%</span>
              <span className="text-[9.5px] font-semibold text-[#6E6E6E] uppercase tracking-wider">Solvents</span>
            </div>
            <div>
              <span className="block text-lg font-black text-[#2C2C2C]">100%</span>
              <span className="text-[9.5px] font-semibold text-[#6E6E6E] uppercase tracking-wider">Native Seed</span>
            </div>
          </div>

        </div>

        {/* Right Column: Layered Photorealistic Studio Showcase */}
        <div className="lg:col-span-6 flex justify-center items-center relative py-4 lg:py-0 select-none">
          <div className="relative w-full max-w-[560px] aspect-[8/7] flex items-center justify-center">
            
            {/* Layer 1: Background Suspended Photographic Leaves */}
            <div className="absolute top-[8%] left-[12%] w-16 h-12 z-5 opacity-85 rotate-[-25deg] pointer-events-none">
              <Image
                src="/images/foliage/leaf-photo-sharp.png"
                alt="Organic leaf"
                width={70}
                height={50}
                className="object-contain filter blur-[1px] drop-shadow-sm"
              />
            </div>
            <div className="absolute top-[16%] right-[10%] w-14 h-10 z-5 opacity-80 rotate-[35deg] pointer-events-none">
              <Image
                src="/images/foliage/leaf-photo-sharp.png"
                alt="Organic leaf"
                width={65}
                height={45}
                className="object-contain filter blur-[1.5px] scale-x-[-1]"
              />
            </div>

            {/* Layer 2: Main 5-Bottle Studio Photography Cluster */}
            <div className="relative w-full h-full z-10">
              <Image
                src="/images/products/hero-bottles.png"
                alt="SRSTI Pure Cold-Pressed Heritage Oils - Studio Display"
                fill
                priority
                className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.14)] transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>

            {/* Layer 3: Grounding Contact Shadows */}
            <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[82%] h-8 z-8 pointer-events-none">
              <div className="w-full h-full rounded-full bg-radial from-black/25 via-black/10 to-transparent blur-md" />
            </div>

            {/* Layer 4: Mirror-Like Floor Reflection */}
            <div
              className="absolute top-[86%] left-0 right-0 h-[28%] z-6 pointer-events-none overflow-hidden opacity-35"
              style={{
                transform: 'scaleY(-1)',
                maskImage: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 80%)',
                WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 80%)',
                filter: 'blur(1.5px)',
              }}
            >
              <Image
                src="/images/products/hero-bottles.png"
                alt="Floor mirror reflection"
                fill
                className="object-contain object-bottom"
              />
            </div>

            {/* Layer 5: Foreground Photographic Leaves */}
            <div className="absolute bottom-[16%] left-[6%] w-20 h-14 z-15 rotate-[18deg] pointer-events-none">
              <Image
                src="/images/foliage/leaf-photo-sharp.png"
                alt="Foreground leaf"
                width={85}
                height={60}
                className="object-contain drop-shadow-md"
              />
            </div>
            <div className="absolute bottom-[12%] right-[12%] w-22 h-14 z-15 rotate-[-20deg] pointer-events-none">
              <Image
                src="/images/foliage/leaf-photo-sharp.png"
                alt="Foreground leaf"
                width={90}
                height={60}
                className="object-contain drop-shadow-md scale-x-[-1]"
              />
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
