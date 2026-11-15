'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, Headphones } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white text-[#2C2C2C]">
      
      {/* ============================================================== */}
      {/* FULL-WIDTH #EFEFEF CONTACT STRIP WITH 3 CENTERED ITEMS         */}
      {/* ============================================================== */}
      <div className="w-full bg-[#EFEFEF] border-t border-b border-[#E0E0E0] py-6 px-6">
        <div className="max-w-[1140px] mx-auto flex flex-col md:flex-row items-center justify-around gap-6 text-center">
          
          {/* Phone */}
          <a
            href="tel:+918041238900"
            className="flex items-center space-x-3 text-[#4A4A4A] hover:text-[#6B742C] transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs border border-[#E0E0E0] group-hover:border-[#6B742C]">
              <Phone className="w-4 h-4 text-[#6B742C]" />
            </div>
            <span className="text-xs sm:text-[13px] font-bold tracking-wider">
              +91 (080) 4123 8900
            </span>
          </a>

          <div className="hidden md:block w-px h-6 bg-[#D0D0D0]" />

          {/* Email */}
          <a
            href="mailto:care@srsti.in"
            className="flex items-center space-x-3 text-[#4A4A4A] hover:text-[#6B742C] transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs border border-[#E0E0E0] group-hover:border-[#6B742C]">
              <Mail className="w-4 h-4 text-[#6B742C]" />
            </div>
            <span className="text-xs sm:text-[13px] font-bold tracking-wider">
              care@srsti.in
            </span>
          </a>

          <div className="hidden md:block w-px h-6 bg-[#D0D0D0]" />

          {/* Support */}
          <a
            href="mailto:support@srstibio.in"
            className="flex items-center space-x-3 text-[#4A4A4A] hover:text-[#6B742C] transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs border border-[#E0E0E0] group-hover:border-[#6B742C]">
              <Headphones className="w-4 h-4 text-[#6B742C]" />
            </div>
            <span className="text-xs sm:text-[13px] font-bold tracking-wider">
              support@srstibio.in
            </span>
          </a>

        </div>
      </div>

      {/* ============================================================== */}
      {/* CLEAN WHITE 4-COLUMN FOOTER                                    */}
      {/* ============================================================== */}
      <div className="max-w-[1140px] mx-auto py-16 px-6 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-left">
          
          {/* Column 1: INFORMATION */}
          <div>
            <h4 className="text-[12px] font-extrabold tracking-[0.14em] uppercase text-[#2C2C2C] mb-5 border-b border-[#EFEFEF] pb-2">
              ABOUT SRSTI
            </h4>
            <ul className="space-y-2.5 text-[11px] text-[#6E6E6E]">
              <li>
                <Link href="#about" className="hover:text-[#6B742C] transition-colors">
                  Our Indian Heritage
                </Link>
              </li>
              <li>
                <Link href="#coop" className="hover:text-[#6B742C] transition-colors">
                  Organic Farmer Cooperatives
                </Link>
              </li>
              <li>
                <Link href="#charte" className="hover:text-[#6B742C] transition-colors">
                  Zero Heat &amp; Solvent Charter
                </Link>
              </li>
              <li>
                <Link href="#terms" className="hover:text-[#6B742C] transition-colors">
                  Terms of Service &amp; Shipping
                </Link>
              </li>
              <li>
                <Link href="#legal" className="hover:text-[#6B742C] transition-colors">
                  Privacy Policy &amp; Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: OUR HARVESTS */}
          <div>
            <h4 className="text-[12px] font-extrabold tracking-[0.14em] uppercase text-[#2C2C2C] mb-5 border-b border-[#EFEFEF] pb-2">
              OUR HARVESTS
            </h4>
            <ul className="space-y-2.5 text-[11px] text-[#6E6E6E]">
              <li>
                <Link href="#terroir" className="hover:text-[#6B742C] transition-colors">
                  Kachi Ghani Mustard Oil
                </Link>
              </li>
              <li>
                <Link href="#terroir" className="hover:text-[#6B742C] transition-colors">
                  Wood-Pressed Black Sesame
                </Link>
              </li>
              <li>
                <Link href="#terroir" className="hover:text-[#6B742C] transition-colors">
                  Cold-Pressed Groundnut Oil
                </Link>
              </li>
              <li>
                <Link href="#spotlight" className="hover:text-[#6B742C] transition-colors">
                  Ayurvedic Botanical Balms
                </Link>
              </li>
              <li>
                <Link href="#catalog" className="hover:text-[#6B742C] transition-colors">
                  Heritage Gift Coffrets
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: CUSTOMER CARE */}
          <div>
            <h4 className="text-[12px] font-extrabold tracking-[0.14em] uppercase text-[#2C2C2C] mb-5 border-b border-[#EFEFEF] pb-2">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2.5 text-[11px] text-[#6E6E6E]">
              <li>
                <Link href="#account" className="hover:text-[#6B742C] transition-colors">
                  My Account / Sign In
                </Link>
              </li>
              <li>
                <Link href="#track" className="hover:text-[#6B742C] transition-colors">
                  Track Pan-India Order
                </Link>
              </li>
              <li>
                <Link href="#shipping" className="hover:text-[#6B742C] transition-colors">
                  Shipping &amp; Free Delivery
                </Link>
              </li>
              <li>
                <Link href="#gifting" className="hover:text-[#6B742C] transition-colors">
                  Corporate &amp; Wedding Gifting
                </Link>
              </li>
              <li>
                <Link href="#club" className="hover:text-[#6B742C] transition-colors">
                  Seasonal Harvest Circle
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: HERITAGE & LAB */}
          <div>
            <h4 className="text-[12px] font-extrabold tracking-[0.14em] uppercase text-[#2C2C2C] mb-5 border-b border-[#EFEFEF] pb-2">
              HERITAGE &amp; LAB
            </h4>
            <ul className="space-y-2.5 text-[11px] text-[#6E6E6E]">
              <li>
                <Link href="#fssai" className="hover:text-[#6B742C] transition-colors">
                  FSSAI &amp; Jaivik Bharat Organic
                </Link>
              </li>
              <li>
                <Link href="#story-canvas" className="hover:text-[#6B742C] transition-colors">
                  The Lakdi Ghani 3D Journey
                </Link>
              </li>
              <li>
                <Link href="#reports" className="hover:text-[#6B742C] transition-colors">
                  Batch Lab Purity Certificates
                </Link>
              </li>
              <li>
                <Link href="#ayurveda" className="hover:text-[#6B742C] transition-colors">
                  Vedic Extraction Philosophy
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-[#6B742C] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM BAR: COPYRIGHT & PAYMENT CARDS ICONS                    */}
      {/* ============================================================== */}
      <div className="w-full border-t border-[#EFEFEF] py-5 px-6">
        <div className="max-w-[1140px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E8E8E]">
          
          {/* Copyright text */}
          <div className="flex items-center space-x-2">
            <span>© 2026 SRSTI ORGANIC TERROIR INDIA. ALL RIGHTS RESERVED.</span>
          </div>

          {/* Indian & Global Payment Badges */}
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="px-2.5 py-1 border border-[#E0E0E0] rounded text-[10px] font-black tracking-wider text-[#00796B] bg-[#FAFAFA]">
              UPI
            </span>
            <span className="px-2.5 py-1 border border-[#E0E0E0] rounded text-[10px] font-black tracking-wider text-[#0C419A] bg-[#FAFAFA]">
              RuPay
            </span>
            <span className="px-2.5 py-1 border border-[#E0E0E0] rounded text-[10px] font-bold text-[#1A1F71] bg-[#FAFAFA]">
              VISA
            </span>
            <span className="px-2.5 py-1 border border-[#E0E0E0] rounded text-[10px] font-bold text-[#EB001B] bg-[#FAFAFA]">
              Mastercard
            </span>
            <span className="px-2.5 py-1 border border-[#E0E0E0] rounded text-[10px] font-bold text-[#2C2C2C] bg-[#FAFAFA]">
              NetBanking
            </span>
          </div>

        </div>
      </div>

    </footer>
  );
};
