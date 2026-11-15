'use client';

import React from 'react';
import { Sparkles, Truck, ShieldCheck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="w-full bg-[#1A1F0B] text-[#E8EDC8] text-[11px] font-medium tracking-wider py-2 px-4 border-b border-[#2D3512] relative z-50">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between">
        {/* Left perk */}
        <div className="hidden md:flex items-center space-x-2 text-[#C5CF8E]">
          <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Complimentary Express Shipping Across India on Orders Above ₹999</span>
        </div>

        {/* Center Banner */}
        <div className="w-full md:w-auto text-center flex items-center justify-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
          <span className="font-semibold text-white">
            WINTER HARVEST ALLOCATIONS LIVE • USE CODE <strong className="text-[#D4AF37] tracking-widest font-bold">SRSTI10</strong> FOR 10% OFF
          </span>
        </div>

        {/* Right standard */}
        <div className="hidden lg:flex items-center space-x-2 text-[#C5CF8E]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>FSSAI Organic • 100% Wood-Pressed • Zero Solvents</span>
        </div>
      </div>
    </div>
  );
};
