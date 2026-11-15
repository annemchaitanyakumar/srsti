'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface LeafConfig {
  id: string;
  side: 'left' | 'right';
  top: string;
  offset: string;
  width: number;
  height: number;
  plane: 'foreground' | 'midground' | 'background';
  blur: number;
  initRotateZ: number;
  initRotateY: number;
  scrollYDelta: number;
  scrollRotateDelta: number;
  flipX?: boolean;
}

export const ParallaxLeaves: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leafRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 9 High-resolution photographic olive leaves placed along far-left and far-right edges
  const leaves: LeafConfig[] = [
    // --- LEFT VIEWPORT EDGE ---
    {
      id: 'leaf-left-fg-1',
      side: 'left',
      top: '12%',
      offset: '-55px',
      width: 165,
      height: 110,
      plane: 'foreground',
      blur: 4,
      initRotateZ: -28,
      initRotateY: 20,
      scrollYDelta: -360,
      scrollRotateDelta: 35,
    },
    {
      id: 'leaf-left-mg-1',
      side: 'left',
      top: '32%',
      offset: '-28px',
      width: 98,
      height: 68,
      plane: 'midground',
      blur: 0,
      initRotateZ: 18,
      initRotateY: 0,
      scrollYDelta: -180,
      scrollRotateDelta: -25,
    },
    {
      id: 'leaf-left-bg-1',
      side: 'left',
      top: '52%',
      offset: '-18px',
      width: 58,
      height: 42,
      plane: 'background',
      blur: 2,
      initRotateZ: -14,
      initRotateY: 10,
      scrollYDelta: -85,
      scrollRotateDelta: 18,
    },
    {
      id: 'leaf-left-fg-2',
      side: 'left',
      top: '70%',
      offset: '-60px',
      width: 155,
      height: 105,
      plane: 'foreground',
      blur: 4,
      initRotateZ: 38,
      initRotateY: -15,
      scrollYDelta: -340,
      scrollRotateDelta: -40,
    },
    {
      id: 'leaf-left-mg-2',
      side: 'left',
      top: '88%',
      offset: '-24px',
      width: 92,
      height: 64,
      plane: 'midground',
      blur: 0,
      initRotateZ: -32,
      initRotateY: 0,
      scrollYDelta: -175,
      scrollRotateDelta: 30,
    },

    // --- RIGHT VIEWPORT EDGE ---
    {
      id: 'leaf-right-mg-1',
      side: 'right',
      top: '18%',
      offset: '-32px',
      width: 104,
      height: 72,
      plane: 'midground',
      blur: 0,
      initRotateZ: 36,
      initRotateY: 0,
      scrollYDelta: -190,
      scrollRotateDelta: -28,
      flipX: true,
    },
    {
      id: 'leaf-right-fg-1',
      side: 'right',
      top: '42%',
      offset: '-65px',
      width: 175,
      height: 118,
      plane: 'foreground',
      blur: 4,
      initRotateZ: -42,
      initRotateY: -22,
      scrollYDelta: -380,
      scrollRotateDelta: 45,
      flipX: true,
    },
    {
      id: 'leaf-right-bg-1',
      side: 'right',
      top: '64%',
      offset: '-16px',
      width: 62,
      height: 44,
      plane: 'background',
      blur: 2,
      initRotateZ: 16,
      initRotateY: 15,
      scrollYDelta: -90,
      scrollRotateDelta: -16,
      flipX: true,
    },
    {
      id: 'leaf-right-mg-2',
      side: 'right',
      top: '84%',
      offset: '-28px',
      width: 95,
      height: 66,
      plane: 'midground',
      blur: 0,
      initRotateZ: 48,
      initRotateY: 0,
      scrollYDelta: -185,
      scrollRotateDelta: 32,
      flipX: true,
    },
  ];

  useEffect(() => {
    let ctxInstance: { revert: () => void } | null = null;
    let isMounted = true;

    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (!isMounted || !containerRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      ctxInstance = gsap.context(() => {
        leaves.forEach((leaf, idx) => {
          const el = leafRefs.current[idx];
          if (!el) return;

          gsap.to(el, {
            y: leaf.scrollYDelta,
            rotateZ: leaf.initRotateZ + leaf.scrollRotateDelta,
            rotateY: leaf.initRotateY + (leaf.plane === 'foreground' ? 25 : 0),
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1.2,
            },
          });
        });
      }, containerRef.current);
    }).catch(err => {
      console.warn('ParallaxLeaves GSAP fallback:', err);
    });

    return () => {
      isMounted = false;
      if (ctxInstance && typeof ctxInstance.revert === 'function') {
        ctxInstance.revert();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
    >
      {leaves.map((leaf, idx) => {
        const isLeft = leaf.side === 'left';
        return (
          <div
            key={leaf.id}
            ref={(el) => {
              leafRefs.current[idx] = el;
            }}
            className="absolute will-change-transform"
            style={{
              top: leaf.top,
              left: isLeft ? leaf.offset : undefined,
              right: !isLeft ? leaf.offset : undefined,
              width: `${leaf.width}px`,
              height: `${leaf.height}px`,
              filter: leaf.blur > 0 ? `blur(${leaf.blur}px)` : 'none',
              transform: `translate3d(0, 0, 0) rotateZ(${leaf.initRotateZ}deg) rotateY(${leaf.initRotateY}deg) ${
                leaf.flipX ? 'scaleX(-1)' : ''
              }`,
            }}
          >
            <Image
              src="/images/foliage/leaf-photo-sharp.png"
              alt="Feuille d'olivier naturelle"
              width={leaf.width}
              height={leaf.height}
              priority={leaf.plane === 'foreground'}
              className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)]"
            />
          </div>
        );
      })}
    </div>
  );
};
