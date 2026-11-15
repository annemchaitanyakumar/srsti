'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Sparkles, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    totalCount,
    shippingRemaining,
    freeShippingThreshold,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'SRSTI10' || couponCode.trim().toUpperCase() === 'VEDIC10') {
      setCouponApplied(true);
      setDiscountAmount(subtotal * 0.1);
    } else {
      alert('Invalid promo code. Try "SRSTI10" for 10% privilege discount!');
    }
  };

  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderCompleted(true);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Slide-over Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-[#EFEFEF] flex items-center justify-between bg-[#FAF8EE]">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#6B742C]" />
              <h3 className="text-sm font-bold tracking-wider uppercase text-[#2C2C2C]">
                YOUR BAG ({totalCount})
              </h3>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-[#666] hover:text-[#2C2C2C] rounded-full hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 py-3 bg-[#EEF0E0]/60 border-b border-[#DDE2C1]/60">
            {shippingRemaining > 0 ? (
              <div>
                <p className="text-[11px] text-[#555]">
                  Add <span className="font-bold text-[#6B742C]">₹{shippingRemaining.toLocaleString('en-IN')}</span> more for <span className="font-semibold">FREE Express Shipping</span> across India!
                </p>
                <div className="w-full h-1.5 bg-[#DDE2C1] rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-[#6B742C] rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, ((freeShippingThreshold - shippingRemaining) / freeShippingThreshold) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-[#6B742C]">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>PRIVILEGE UNLOCKED: FREE SHIPPING APPLIED</span>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {orderCompleted ? (
              <div className="text-center py-12 px-4">
                <CheckCircle2 className="w-12 h-12 text-[#6B742C] mx-auto mb-3" />
                <h4 className="text-base font-bold text-[#2C2C2C] uppercase tracking-wider">
                  ORDER CONFIRMED!
                </h4>
                <p className="text-xs text-[#666] mt-2">
                  Thank you for supporting traditional Indian wood-pressed farming. A confirmation email and tracking link have been dispatched.
                </p>
                <button
                  onClick={() => {
                    setOrderCompleted(false);
                    closeCart();
                  }}
                  className="mt-6 px-6 py-2 rounded-full bg-[#6B742C] text-white text-xs font-bold uppercase tracking-wider"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <ShoppingBag className="w-12 h-12 text-[#BFBFBF] mx-auto mb-3" />
                <h4 className="text-sm font-bold text-[#4A4A4A] uppercase tracking-wider">
                  YOUR BAG IS EMPTY
                </h4>
                <p className="text-xs text-[#888] mt-1.5 mb-6">
                  Explore our pure ancestral wood-pressed oils and Ayurvedic botanicals.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-full border border-[#6B742C] text-[#6B742C] hover:bg-[#6B742C] hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  EXPLORE OILS
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex space-x-3.5 pb-4 border-b border-[#EFEFEF] items-center"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 bg-[#FAF9F4] rounded-lg shrink-0 p-1 border border-[#EFEFEF]">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-[#2C2C2C] uppercase tracking-wide truncate">
                      {item.product.name}
                    </h5>
                    <span className="text-[10px] text-[#888] block">
                      {item.product.volume} • ₹{item.product.price.toLocaleString('en-IN')}
                    </span>

                    {/* Quantity Stepper */}
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex items-center border border-[#D0D0D0] rounded-full px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="text-[#666] hover:text-[#2C2C2C] p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#2C2C2C] px-2">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="text-[#666] hover:text-[#2C2C2C] p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-[#999] hover:text-red-600 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#2C2C2C]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {items.length > 0 && !orderCompleted && (
            <div className="p-5 border-t border-[#EFEFEF] bg-[#FAF8EE]/40 space-y-3.5">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#888] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Privilege Code (try: SRSTI10)"
                    className="w-full text-xs pl-8 pr-3 py-2 border border-[#D0D0D0] rounded-full outline-none focus:border-[#6B742C]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-[#EFEFEF] hover:bg-[#6B742C] text-[#2C2C2C] hover:text-white text-xs font-bold transition-colors"
                >
                  APPLY
                </button>
              </form>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-[#6E6E6E]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2C2C2C]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-[#6B742C] font-semibold">
                    <span>Privilege Discount (10%)</span>
                    <span>-₹{Math.round(discountAmount).toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping (India)</span>
                  <span>{shippingCost === 0 ? <strong className="text-[#6B742C]">FREE</strong> : `₹${shippingCost}`}</span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-[#2C2C2C] pt-2 border-t border-[#E0E0E0]">
                  <span>TOTAL (INCL. TAXES)</span>
                  <span>₹{Math.round(finalTotal).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3 rounded-full bg-[#6B742C] hover:bg-[#555C23] text-white text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 shadow-md flex items-center justify-center space-x-2 disabled:opacity-75"
              >
                {isCheckingOut ? (
                  <span>DISPATCHING ORDER...</span>
                ) : (
                  <>
                    <span>PROCEED TO SECURE CHECKOUT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <span className="block text-[9.5px] text-center text-[#888]">
                UPI • RuPay • NetBanking • Visa • Mastercard • Fast Pan-India Dispatch
              </span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
