'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  shippingRemaining: number;
  freeShippingThreshold: number;
  
  // Quick View Modal
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Sound effects
  soundEnabled: boolean;
  toggleSound: () => void;
  playDropletSound: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Initialize from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('srsti_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore SSR or storage errors
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('srsti_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const playDropletSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(350, audioCtx.currentTime + 0.18);
      
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.22);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.23);
    } catch {
      // Web Audio might be locked until user gesture
    }
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(prev => !prev);

  const addItem = (product: Product, quantity = 1, selectedSize?: string) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedSize: selectedSize || product.volume }];
    });
    playDropletSound();
    setIsOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const toggleSound = () => setSoundEnabled(prev => !prev);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 999; // Free shipping above ₹999 across India
  const shippingRemaining = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        shippingRemaining,
        freeShippingThreshold,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        soundEnabled,
        toggleSound,
        playDropletSound
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
