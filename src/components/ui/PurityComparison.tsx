'use client';

import React from 'react';
import { XCircle, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const PurityComparison: React.FC = () => {
  const comparisonRows = [
    {
      metric: 'Extraction Temperature',
      refined: 'Heated to 180°C – 220°C in high-pressure metal expellers',
      refinedBad: true,
      srsti: 'Cold-pressed below 28°C under slow Vaagai wood and granite ghani',
      srstiGood: true,
    },
    {
      metric: 'Chemical Solvents (Hexane)',
      refined: 'Hexane solvent washed to force maximum yield extraction',
      refinedBad: true,
      srsti: '100% mechanical unhurried pressure; Zero chemicals or solvents ever',
      srstiGood: true,
    },
    {
      metric: 'Bleaching & Deodorization',
      refined: 'Chemically bleached and steam-stripped to eliminate natural scent',
      refinedBad: true,
      srsti: 'Natural 72-hour gravitational settling; Raw aroma & amber glow preserved',
      srstiGood: true,
    },
    {
      metric: 'Living Enzyme & Antioxidant Status',
      refined: 'All natural polyphenols, vitamin E, and bioactive lipids destroyed',
      refinedBad: true,
      srsti: 'Full cellular integrity intact; Rich in native polyphenols & omega fats',
      srstiGood: true,
    },
    {
      metric: 'Bottling & Packaging',
      refined: 'Thin transparent plastic bottles prone to microplastic leaching and light oxidation',
      refinedBad: true,
      srsti: 'Apothecary dark amber glass blocking 99.8% UV rays to ensure 24-month potency',
      srstiGood: true,
    },
  ];

  return (
    <section id="purity-matrix" className="relative w-full py-24 px-6 sm:px-10 bg-[#FAF9F5] border-t border-[#EAE7DF] overflow-hidden">
      <div className="max-w-[1140px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[10.5px] font-bold tracking-[0.25em] text-[#6B742C] uppercase bg-[#EEF0E0] px-4 py-1.5 rounded-full mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6B742C]" />
            <span>TRANSPARENCY STANDARD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C2C2C] uppercase tracking-wide">
            THE PURITY MATRIX
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#666666] leading-relaxed">
            Why discerning Indian families and chefs choose ancestral wood-pressed oils over commercial factory refined oils.
          </p>
        </div>

        {/* Comparison Table / Cards */}
        <div className="bg-white rounded-3xl border border-[#E0DED5] shadow-luxury overflow-hidden">
          
          {/* Header row */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-[#F4F2EB] border-b border-[#E0DED5] text-xs font-bold uppercase tracking-wider py-4 px-6 sm:px-8">
            <div className="md:col-span-4 text-[#4A4A4A]">Process / Quality Dimension</div>
            <div className="md:col-span-4 text-[#A84236] flex items-center space-x-1.5 mt-2 md:mt-0">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Commercial Refined Factory Oil</span>
            </div>
            <div className="md:col-span-4 text-[#555C23] flex items-center space-x-1.5 mt-2 md:mt-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6B742C]" />
              <span>SRSTI Ancestral Lakdi Ghani</span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#EFEFEA]">
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-6 sm:px-8 text-xs gap-4 items-center hover:bg-[#FAF9F5] transition-colors"
              >
                {/* Metric */}
                <div className="md:col-span-4 font-bold text-[#2C2C2C] uppercase tracking-wide">
                  {row.metric}
                </div>

                {/* Refined Oil */}
                <div className="md:col-span-4 flex items-start space-x-2 text-[#777777] leading-relaxed bg-[#FFF8F7] p-3 rounded-xl border border-[#F3D7D3]">
                  <XCircle className="w-4 h-4 text-[#D34533] shrink-0 mt-0.5" />
                  <span>{row.refined}</span>
                </div>

                {/* SRSTI Oil */}
                <div className="md:col-span-4 flex items-start space-x-2 text-[#2C2C2C] font-medium leading-relaxed bg-[#F8F9F0] p-3 rounded-xl border border-[#DCE2BE]">
                  <CheckCircle2 className="w-4 h-4 text-[#6B742C] shrink-0 mt-0.5" />
                  <span>{row.srsti}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table Bottom Footer */}
          <div className="bg-[#FAF8EE] p-6 text-center border-t border-[#E0DED5] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#555555]">
              Every single batch of SRSTI oils is certified by accredited third-party food testing laboratories.
            </span>
            <div className="flex items-center space-x-3 text-[11px] font-bold text-[#6B742C] uppercase tracking-wider">
              <span>✦ FSSAI LIC. 11223999000124</span>
              <span>•</span>
              <span>JAIVIK BHARAT ORGANIC</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
