'use client';

import React from 'react';
import { Flame, Trees, Droplets, Shield } from 'lucide-react';

export const PillarsSection: React.FC = () => {
  const pillars = [
    {
      step: 'PILLAR 01',
      title: 'SEASONED VAAGAI WOOD PESTLE',
      subtitle: 'Natural Heat Dissipation (< 28°C)',
      description: 'Unlike modern expeller steel screws that overheat oil seeds to 180°C and destroy cellular lipids, our seasoned Vaagai wood pestles absorb heat naturally. The oil emerges pure, cold, and biologically active.',
      icon: Flame,
      stat: '0°C Added Heat',
      statLabel: 'Room-Temp Pressing'
    },
    {
      step: 'PILLAR 02',
      title: 'INDIGENOUS NATIVE SEEDS',
      subtitle: 'Single-Origin Organic Collectives',
      description: 'We partner directly with organic farmer collectives in Rajasthan, Saurashtra, and Malabar. Heirloom non-GMO black mustard, native black sesame, and rain-fed groundnuts harvested at peak maturity.',
      icon: Trees,
      stat: '100% Native',
      statLabel: 'Single-Origin Seeds'
    },
    {
      step: 'PILLAR 03',
      title: '72-HOUR GRAVITY SETTLING',
      subtitle: 'Zero Hexane • Zero Chemical Bleach',
      description: 'Commercial refineries use synthetic chemicals to bleach and deodorize oil. At SRSTI, our raw nectar settles naturally by gravitational decanting across 72 hours, leaving living enzymes and aroma completely whole.',
      icon: Droplets,
      stat: '72 Hours',
      statLabel: 'Natural Sedimentation'
    },
    {
      step: 'PILLAR 04',
      title: 'APOTHECARY AMBER GLASS',
      subtitle: '99.8% UV Shielding Protection',
      description: 'Transparent plastic bottles leach microplastics and allow light to oxidize vital polyphenols. We bottle immediately into pharmaceutical-grade dark amber studio glass with airtight seals.',
      icon: Shield,
      stat: '99.8% UV Block',
      statLabel: 'Zero Oxidation'
    }
  ];

  return (
    <section id="pillars" className="relative w-full py-24 px-6 sm:px-10 bg-[#FAF9F5] border-t border-b border-[#E8E6DF] overflow-hidden">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[10.5px] font-bold tracking-[0.25em] text-[#6B742C] uppercase bg-[#EEF0E0] px-4 py-1.5 rounded-full mb-3">
            <span>THE SRSTI STANDARD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C2C2C] uppercase tracking-wide">
            THE 4 PILLARS OF VEDIC EXTRACTION
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#666666] leading-relaxed">
            How we protect the living nutritional integrity of India&apos;s most sacred oil seeds through ancestral wisdom and uncompromising craft.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-[#E5E3DC] hover:border-[#6B742C]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Badge & Number */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#6B742C] uppercase">
                      {pillar.step}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#FAF8EE] group-hover:bg-[#6B742C] flex items-center justify-center transition-colors duration-300 border border-[#DDE2C1]/60">
                      <Icon className="w-5 h-5 text-[#6B742C] group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold text-[#2C2C2C] uppercase tracking-wide leading-snug">
                    {pillar.title}
                  </h3>
                  <h4 className="text-[11px] font-semibold text-[#8B9356] uppercase tracking-wider mt-1">
                    {pillar.subtitle}
                  </h4>

                  <p className="mt-4 text-xs text-[#666666] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Stat Pill */}
                <div className="mt-6 pt-5 border-t border-[#F0EFEA] flex items-center justify-between">
                  <div>
                    <span className="block text-sm font-black text-[#2C2C2C]">
                      {pillar.stat}
                    </span>
                    <span className="text-[10px] text-[#888888] uppercase tracking-wider">
                      {pillar.statLabel}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#6B742C] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Verified →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
