'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote, CheckCircle2, ArrowRight } from 'lucide-react';

export const SplitBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      quote: "The cold-pressed Kachi Ghani Mustard oil from SRSTI takes me back to my grandmother's kitchen in Rajasthan. The rich golden hue, authentic pungent aroma, and zero chemical aftertaste make it truly exceptional.",
      author: "Aditi S.",
      title: "Culinary Historian & Patron",
      location: "New Delhi"
    },
    {
      quote: "As a professional chef, pure unrefined fats are non-negotiable. SRSTI's wood-pressed groundnut and virgin black sesame oils have unmatched depth of flavor and high natural smoke points. An artisanal treasure.",
      author: "Chef Vikram R.",
      title: "Executive Chef & Restaurateur",
      location: "Bengaluru"
    },
    {
      quote: "The Kumkumadi botanical elixir and wood-pressed hair care set have transformed my daily ritual. The heavy amber glass packaging and genuine stone-pressed purity reflect world-class Indian luxury.",
      author: "Radhika M.",
      title: "Ayurvedic Wellness Advocate",
      location: "Mumbai"
    }
  ];

  const handleNext = () => setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  const activeTestimonial = testimonials[testimonialIndex];

  return (
    <section id="testimonials" className="relative w-full py-16 px-6 sm:px-10 bg-[#FFFFFF]">
      
      {/* Boxed Container (max-width: 1140px) */}
      <div className="max-w-[1140px] mx-auto rounded-none overflow-hidden shadow-luxury grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
        
        {/* ============================================================== */}
        {/* LEFT 55%: Photographic warm boutique shelf with badge quote     */}
        {/* ============================================================== */}
        <div className="lg:col-span-7 relative bg-[#1E1712] p-8 sm:p-12 flex flex-col items-center justify-center text-center overflow-hidden">
          
          {/* Real Photographic Boutique Apothecary Background */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/brand/store-shelf-bg.jpg"
              alt="SRSTI Heritage Apothecary Shelf"
              fill
              className="object-cover opacity-35 filter brightness-75 contrast-125"
            />
          </div>

          {/* Heavy Warm Studio Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 to-black/85 -z-10" />

          {/* Center Circular White Logo Badge with < > arrows on sides */}
          <div className="flex items-center space-x-6 mb-6">
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="w-8 h-8 rounded-full border border-white/40 text-white/80 hover:text-white hover:border-white flex items-center justify-center transition-all hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Circular White Emblem Logo Badge */}
            <div className="w-16 h-16 rounded-full bg-white p-2 shadow-glow flex items-center justify-center">
              <Image
                src="/images/brand/logo-hexagon.svg"
                alt="SRSTI Emblem"
                width={50}
                height={50}
                className="w-full h-full object-contain"
              />
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="w-8 h-8 rounded-full border border-white/40 text-white/80 hover:text-white hover:border-white flex items-center justify-center transition-all hover:scale-105"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quote mark */}
          <Quote className="w-6 h-6 text-[#D4AF37] opacity-80 mb-3" />

          {/* Centered Italic Quote Text in White */}
          <p className="text-white text-xs sm:text-[13px] italic font-serif leading-relaxed max-w-md tracking-wide">
            &ldquo;{activeTestimonial.quote}&rdquo;
          </p>

          {/* Author Citation */}
          <div className="mt-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#E5C04A] block">
              {activeTestimonial.author}
            </span>
            <span className="text-[9.5px] text-white/60 tracking-wider">
              {activeTestimonial.title} • {activeTestimonial.location}
            </span>
          </div>

          {/* Testimonial dot indicators */}
          <div className="flex space-x-1.5 mt-5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIndex(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  testimonialIndex === i ? 'w-6 bg-[#D4AF37]' : 'w-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>

        </div>

        {/* ============================================================== */}
        {/* RIGHT 45%: Solid Olive Green (#7D8735) with Photographic Branch */}
        {/* ============================================================== */}
        <div className="lg:col-span-5 relative bg-[#7D8735] p-8 sm:p-10 flex flex-col justify-center text-left text-white overflow-hidden">
          
          {/* Photographic Botanical Branch with Seamless Blending */}
          <div
            className="absolute -right-12 -bottom-10 w-72 h-72 pointer-events-none select-none z-5 opacity-90"
            style={{
              maskImage: 'radial-gradient(circle at 70% 70%, black 60%, transparent 95%)',
              WebkitMaskImage: 'radial-gradient(circle at 70% 70%, black 60%, transparent 95%)',
            }}
          >
            <Image
              src="/images/brand/newsletter-branch.png"
              alt="Artisanal botanical branch"
              width={280}
              height={280}
              className="object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)]"
            />
          </div>

          {/* Content (z-index 10) */}
          <div className="relative z-10 max-w-xs">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#FAF8EE]/80 uppercase block mb-1">
              ESTATE PRIVILEGES
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight uppercase leading-snug">
              Sign up for SEND
              <span className="block font-light text-[#FAF8EE]">Newsletter</span>
            </h3>

            <p className="text-[11px] text-white/80 mt-2 leading-relaxed">
              Receive fresh seasonal harvest allocations, Vedic wellness notes, and 10% off your first order.
            </p>

            {/* Newsletter Form */}
            {subscribed ? (
              <div className="mt-6 bg-white/20 backdrop-blur-sm border border-white/40 p-4 rounded-xl flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                <span className="text-xs font-semibold text-white">
                  Welcome! Your 10% privilege code (SRSTI10) has been sent to your inbox.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-6 space-y-3">
                {/* Transparent Outlined Email Input Field */}
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full bg-transparent border border-white/60 focus:border-white px-4 py-2.5 rounded-none text-xs text-white placeholder-white/60 outline-none transition-colors"
                  />
                </div>

                {/* White Pill SUBMIT Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 px-6 rounded-full bg-white hover:bg-[#FAF8EE] text-[#7D8735] hover:text-[#555C23] text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
                >
                  <span>SUBMIT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <span className="block text-[9px] text-white/60 mt-3">
              Protected data. Unsubscribe anytime with 1-click.
            </span>
          </div>

        </div>

      </div>

    </section>
  );
};
