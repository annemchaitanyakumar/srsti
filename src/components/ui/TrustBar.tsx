'use client';

import React from 'react';
import { Award, Droplet, ShieldCheck, Truck } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: Award,
      title: '100% ORGANIC & UNREFINED',
      subtitle: 'Certified Organic & Single-Origin India',
    },
    {
      icon: Droplet,
      title: 'WOOD-PRESSED AT < 28°C',
      subtitle: 'Ancestral Lakdi Ghani & Chekku',
    },
    {
      icon: ShieldCheck,
      title: 'FSSAI & LAB CERTIFIED',
      subtitle: 'Zero Hexane • 100% Batch Traceable',
    },
    {
      icon: Truck,
      title: 'FREE SHIPPING ABOVE ₹999',
      subtitle: 'Pan-India Delivery • Express 48h',
    },
  ];

  return (
    <div className="w-full max-w-[1140px] mx-auto px-4 mt-12 mb-6">
      <div className="bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#E0E0E0]/80 py-4 px-6 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#E0E0E0]">
        {trustItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`flex items-center space-x-3.5 px-4 ${
                idx !== 0 ? 'md:pl-6' : ''
              } pt-3 md:pt-0`}
            >
              <div className="w-9 h-9 rounded-full bg-[#FAF8EE] flex items-center justify-center shrink-0 border border-[#DDE2C1]/60">
                <Icon className="w-4 h-4 text-[#6B742C]" />
              </div>
              <div className="text-left">
                <h4 className="text-[11px] font-bold tracking-wider text-[#2C2C2C] uppercase leading-tight">
                  {item.title}
                </h4>
                <p className="text-[10px] text-[#6E6E6E] mt-0.5 leading-tight">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
