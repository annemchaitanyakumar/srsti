'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Thermometer, Disc, ShieldCheck } from 'lucide-react';

export const ScrollStoryCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [frameCount, setFrameCount] = useState(111);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    let isCancelled = false;

    // Load frames dynamically using manifest.json or fallback list
    const initFrames = async () => {
      let frameFiles: string[] = [];

      try {
        const res = await fetch('/story-frames/manifest.json');
        if (res.ok) {
          const list = await res.json();
          if (Array.isArray(list) && list.length > 0) {
            frameFiles = list;
          }
        }
      } catch {
        // fallback
      }

      if (frameFiles.length === 0) {
        for (let i = 1; i <= 111; i++) {
          frameFiles.push(`frame_${String(i).padStart(3, '0')}.png`);
        }
      }

      if (isCancelled) return;
      setFrameCount(frameFiles.length);

      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      frameFiles.forEach((file, index) => {
        const img = new Image();
        img.src = `/story-frames/${file}`;
        img.onload = () => {
          loadedCount++;
          if (index === 0 || loadedCount >= 3) {
            isLoadedRef.current = true;
            drawFrame(currentProgress, loadedImages);
          }
        };
        img.onerror = () => {
          const webpName = file.replace(/\.png$/, '.webp');
          img.src = `/story-frames/${webpName}`;
        };
        loadedImages.push(img);
      });

      framesRef.current = loadedImages;
    };

    initFrames();

    return () => {
      isCancelled = true;
    };
  }, []);

  const drawCoverImage = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvasW: number,
    canvasH: number,
    scaleFactor = 1.0,
    alpha = 1.0
  ) => {
    if (!img || !img.complete || img.naturalWidth === 0) return;
    ctx.save();
    ctx.globalAlpha = alpha;

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const canvasRatio = canvasW / canvasH;
    const imgRatio = imgW / imgH;

    let renderW = canvasW;
    let renderH = canvasH;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderW = canvasW * scaleFactor;
      renderH = (canvasW / imgRatio) * scaleFactor;
    } else {
      renderH = canvasH * scaleFactor;
      renderW = (canvasH * imgRatio) * scaleFactor;
    }

    offsetX = (canvasW - renderW) / 2;
    offsetY = (canvasH - renderH) / 2;

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    ctx.restore();
  };

  const drawFrame = (progress: number, overrideImages?: HTMLImageElement[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const images = overrideImages || framesRef.current;
    const total = images.length > 0 ? images.length : frameCount;

    if (images.length > 0 && isLoadedRef.current) {
      const clampedProgress = Math.max(0, Math.min(1, progress));
      const exactIndex = clampedProgress * (total - 1);
      const indexA = Math.floor(exactIndex);
      const indexB = Math.min(total - 1, Math.ceil(exactIndex));
      const blendFactor = exactIndex - indexA;

      const imgA = images[indexA];
      const imgB = images[indexB];

      if (imgA && imgA.complete && imgA.naturalWidth > 0) {
        drawCoverImage(ctx, imgA, width, height, 1.0, 1.0);
      }

      if (indexA !== indexB && imgB && imgB.complete && imgB.naturalWidth > 0 && blendFactor > 0.05) {
        drawCoverImage(ctx, imgB, width, height, 1.0, blendFactor);
      }
    } else {
      // Graceful fallback
      ctx.fillStyle = '#1A1815';
      ctx.fillRect(0, 0, width, height);
    }

    // Subtle dark gradient overlay at bottom
    const gradient = ctx.createLinearGradient(0, height * 0.45, 0, height);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.45)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.82)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  };

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(currentProgress);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentProgress]);

  // Client-safe GSAP ScrollTrigger setup
  useEffect(() => {
    let scrollTriggerInstance: unknown = null;
    let isMounted = true;

    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (!isMounted || !containerRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=180%',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.5,
        onUpdate: (self) => {
          const prog = self.progress;
          setCurrentProgress(prog);
          drawFrame(prog);
        },
      });
    }).catch(err => {
      console.warn('ScrollTrigger fallback:', err);
    });

    return () => {
      isMounted = false;
      if (scrollTriggerInstance && typeof (scrollTriggerInstance as { kill: () => void }).kill === 'function') {
        (scrollTriggerInstance as { kill: () => void }).kill();
      }
    };
  }, []);

  const currentFrameNumber = Math.min(frameCount, Math.floor(currentProgress * (frameCount - 1)) + 1);

  return (
    <div
      id="story-canvas"
      ref={containerRef}
      className="relative w-full h-screen bg-[#111111] overflow-hidden select-none"
    >
      {/* HTML5 Apple-style Fullscreen Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Top Floating Telemetry Strip */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none max-w-[1240px] mx-auto">
        <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white text-[11px] font-bold tracking-widest uppercase">
          <Disc className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
          <span>LAKDI GHANA SCROLL STORY</span>
        </div>

        <div className="hidden sm:flex items-center space-x-4 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-white text-[10.5px]">
          <div className="flex items-center space-x-1.5">
            <Thermometer className="w-3.5 h-3.5 text-[#6B742C]" />
            <span className="font-semibold text-white/90">24.6°C (Zero Added Heat)</span>
          </div>
          <span className="text-white/30">•</span>
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-semibold text-white/90">Frame {String(currentFrameNumber).padStart(3, '0')} / {frameCount}</span>
          </div>
        </div>
      </div>

      {/* Minimalist Floating Editorial Captions */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-end pb-16 sm:pb-20 px-6 sm:px-16 z-20 max-w-[1240px] mx-auto left-0 right-0">
        
        {/* Caption 1: 0% - 35% */}
        <div
          className={`transition-all duration-700 max-w-xl ${
            currentProgress < 0.35
              ? 'opacity-100 translate-y-0 block'
              : 'opacity-0 translate-y-4 hidden'
          }`}
        >
          <div className="flex items-center space-x-2 text-[11px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-2">
            <span>01 / 03</span>
            <span className="w-6 h-px bg-[#D4AF37]" />
            <span>ANCESTRAL EXTRACTION IN LAKDI GHANA</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-light text-white tracking-wide font-serif leading-tight">
            The Sacred Rhythm <span className="italic font-normal">of the Wooden Pestle &amp; Mortar</span>
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed font-sans max-w-md">
            Slow, unhurried cold pressing below 9 RPM. Natural extraction in Vaagai wood absorbs friction, keeping temperature strictly below 28°C to protect living enzymes and delicate aromas.
          </p>
        </div>

        {/* Caption 2: 35% - 70% */}
        <div
          className={`transition-all duration-700 max-w-xl ${
            currentProgress >= 0.35 && currentProgress < 0.70
              ? 'opacity-100 translate-y-0 block'
              : 'opacity-0 translate-y-4 hidden'
          }`}
        >
          <div className="flex items-center space-x-2 text-[11px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-2">
            <span>02 / 03</span>
            <span className="w-6 h-px bg-[#D4AF37]" />
            <span>UNREFINED VISCOUS EXTRACTION</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-light text-white tracking-wide font-serif leading-tight">
            Pure Golden Nectar <span className="italic font-normal">from Indigenous Indian Seeds</span>
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed font-sans max-w-md">
            Under unhurried mechanical compression, virgin unrefined oil seeps along the natural wooden spout, rich in native vitamin E, natural phosphatides, and vital antioxidants.
          </p>
        </div>

        {/* Caption 3: 70% - 100% */}
        <div
          className={`transition-all duration-700 max-w-xl ${
            currentProgress >= 0.70
              ? 'opacity-100 translate-y-0 block'
              : 'opacity-0 translate-y-4 hidden'
          }`}
        >
          <div className="flex items-center space-x-2 text-[11px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-2">
            <span>03 / 03</span>
            <span className="w-6 h-px bg-[#D4AF37]" />
            <span>ARTISANAL BOTTLING IN UV GLASS</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-light text-white tracking-wide font-serif leading-tight">
            Each Precious Drop <span className="italic font-normal">Bottled at the Farm Pressery</span>
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed font-sans max-w-md">
            Decanted naturally by 72-hour gravitational settling with zero hexane solvent or bleaching chemicals. Sealed in dark apothecary glass to protect living bioactivity for 24 months.
          </p>
        </div>

      </div>

      {/* Discrete Thin Progress Line along bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-30 pointer-events-none">
        <div
          className="h-full bg-[#D4AF37] transition-all duration-75"
          style={{ width: `${currentProgress * 100}%` }}
        />
      </div>
    </div>
  );
};
