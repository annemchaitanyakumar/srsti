'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, X, Menu, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Navbar: React.FC = () => {
  const { totalCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'RESERVE HARVESTS', href: '#collections' },
    { label: '3D LAKDI GHANI', href: '#story-canvas' },
    { label: 'THE 4 PILLARS', href: '#pillars' },
    { label: 'PURITY MATRIX', href: '#purity-matrix' },
    { label: 'AYURVEDIC BALM', href: '#spotlight' },
    { label: 'PATRON STORIES', href: '#testimonials' },
  ];

  return (
    <>
      {/* Top Thin 4px Accent Strip (#6B742C) */}
      <div className="fixed top-0 left-0 right-0 h-[4px] bg-[#6B742C] z-50" />

      {/* Main Single-Row Header */}
      <header
        className={`fixed top-[4px] left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs py-2.5'
            : 'bg-white/90 backdrop-blur-xs py-3.5'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10 flex items-center justify-between relative">
          
          {/* Hexagonal Olive & Gold Emblem Logo */}
          <Link
            href="/"
            className="flex items-center relative -mt-3 group"
            title="SRSTI Organic Terroir India"
          >
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 drop-shadow-md transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/brand/logo-hexagon.svg"
                alt="SRSTI Organic India"
                width={70}
                height={70}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <div className="ml-2.5 hidden sm:flex flex-col justify-center">
              <span className="text-[17px] font-extrabold tracking-[0.22em] text-[#2C2C2C] leading-none">
                SRSTI
              </span>
              <span className="text-[8.5px] font-bold tracking-[0.28em] text-[#6B742C] uppercase mt-1">
                ORGANIC INDIA
              </span>
            </div>
          </Link>

          {/* Horizontal Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#4A4A4A] hover:text-[#6B742C] transition-colors relative py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center space-x-3.5">
            
            {/* Search Icon */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center border border-[#6B742C] rounded-full px-3 py-1 bg-white shadow-xs">
                  <input
                    type="text"
                    placeholder="Search wood-pressed oils..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-xs outline-none w-36 sm:w-48 bg-transparent text-[#2C2C2C]"
                    autoFocus
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-[#888] hover:text-[#2C2C2C] ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-1.5 text-[#4A4A4A] hover:text-[#6B742C] transition-colors"
                  title="Search Oils"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Country & Currency Switcher (India 🇮🇳 IN / ₹) */}
            <div className="hidden sm:flex items-center space-x-1.5 text-[11px] font-bold text-[#4A4A4A] bg-[#FAF8EE] border border-[#DDE2C1]/80 px-2.5 py-1 rounded-full">
              <span className="text-sm">🇮🇳</span>
              <span className="tracking-wider">IN / ₹</span>
            </div>

            {/* Cart Counter Button */}
            <button
              onClick={openCart}
              className="relative flex items-center space-x-1.5 bg-[#FAF8EE] hover:bg-[#EEF0E0] border border-[#6B742C]/40 text-[#2C2C2C] px-3.5 py-1.5 rounded-full transition-all duration-200"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#6B742C]" />
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#6B742C] text-white text-[9.5px] font-bold">
                {totalCount}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-1.5 text-[#4A4A4A] hover:text-[#6B742C]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#EFEFEF] px-6 py-4 mt-2 space-y-3 shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-semibold tracking-wider text-[#4A4A4A] hover:text-[#6B742C] py-2 border-b border-[#F5F5F5]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex items-center space-x-2 text-xs font-bold text-[#4A4A4A]">
              <span>🇮🇳</span>
              <span>Delivering across India • Prices in INR (₹)</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
