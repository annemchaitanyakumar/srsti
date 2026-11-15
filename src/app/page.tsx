'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { AnnouncementBar } from '../components/ui/AnnouncementBar';
import { Navbar } from '../components/ui/Navbar';
import { HeroSection } from '../components/ui/HeroSection';
import { PillarsSection } from '../components/ui/PillarsSection';
import { CollectionsSection } from '../components/ui/CollectionsSection';
import { PurityComparison } from '../components/ui/PurityComparison';
import { SpotlightSection } from '../components/ui/SpotlightSection';
import { SplitBanner } from '../components/ui/SplitBanner';
import { Footer } from '../components/ui/Footer';

// Dynamically import Apple-style Frame Sequence Scrubber with ssr: false
const ScrollStoryCanvas = dynamic(
  () => import('../components/3d/ScrollStoryCanvas').then((mod) => mod.ScrollStoryCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-[#111111] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            LOADING ANCESTRAL LAKDI GHANA...
          </span>
        </div>
      </div>
    ),
  }
);

export default function Home() {
  return (
    <div className="relative w-full overflow-x-hidden bg-white">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Top Header Bar & Crest */}
      <Navbar />

      {/* 3. Hero Section (Cinematic Editorial Layout with Live Stats) */}
      <HeroSection />

      {/* 4. Apple-Style Sticky HTML5 Canvas Frame Sequence Scrubber (180vh pinned, no gap) */}
      <ScrollStoryCanvas />

      {/* 5. The 4 Pillars of Vedic Extraction */}
      <PillarsSection />

      {/* 6. Dynamic Reserve Collections with Category Filtering & INR Pricing */}
      <CollectionsSection />

      {/* 7. The Purity Matrix: Commercial Refined vs. SRSTI Lakdi Ghani */}
      <PurityComparison />

      {/* 8. Spotlight Product Feature (Ayurvedic Almond & Moringa Balm) */}
      <SpotlightSection />

      {/* 9. Patron Stories & Privilege Newsletter Banner */}
      <SplitBanner />

      {/* 10. Contact Strip & 4-Column Footer */}
      <Footer />
    </div>
  );
}
