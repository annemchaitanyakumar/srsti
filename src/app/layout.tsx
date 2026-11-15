import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import { SmoothScrollProvider } from '../components/ui/SmoothScrollProvider';
import { CartDrawer } from '../components/ui/CartDrawer';
import { QuickViewModal } from '../components/ui/QuickViewModal';
import { ParallaxLeaves } from '../components/ui/ParallaxLeaves';

export const metadata: Metadata = {
  title: "SRSTI — Ancestral Wood-Pressed Cold-Pressed Oils & Organic Terroir India",
  description: "Official online boutique of SRSTI Organic Terroir India. 100% pure ancestral wood-pressed oils (Lakdi Ghana / Chekku), unrefined kachi ghani mustard, virgin sesame, groundnut, and Ayurvedic botanicals.",
  keywords: "wood pressed oil, cold pressed oil, lakdi ghana, kachi ghani, chekku oil, organic oils india, pure mustard oil, cold pressed sesame oil, srsti organics, ayurvedic oil",
  icons: {
    icon: '/images/brand/logo-hexagon.svg',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <body className="antialiased bg-white text-[#2C2C2C] selection:bg-[#EEF0E0] selection:text-[#6B742C]">
        <CartProvider>
          <SmoothScrollProvider>
            {/* Multi-depth parallax foliage pinned to left and right edges */}
            <ParallaxLeaves />

            {/* Shopping Cart Drawer */}
            <CartDrawer />

            {/* Quick View Modal */}
            <QuickViewModal />

            {/* Page Content */}
            <main className="relative min-h-screen">
              {children}
            </main>
          </SmoothScrollProvider>
        </CartProvider>
      </body>
    </html>
  );
}
