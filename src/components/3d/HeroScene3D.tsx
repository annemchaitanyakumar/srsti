'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const HeroScene3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animId: number;
    let isDisposed = false;
    let isVisible = true;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.1, 7.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting Setup (Awwwards 3-point luxury lighting)
    const ambientLight = new THREE.AmbientLight(0xfff9ef, 1.4);
    scene.add(ambientLight);

    // Main Studio Key Light (soft white key)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5, 9, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Golden Oil Rim Light (radiates through amber liquid from behind)
    const rimLight = new THREE.DirectionalLight(0xf7b938, 3.8);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    // Subtle Cool Fill Light (crisp glass edge reflections)
    const fillLight = new THREE.DirectionalLight(0xddeeff, 1.5);
    fillLight.position.set(-6, 2, 4);
    scene.add(fillLight);

    // 3. Construct 3D Luxury Glass Bottle (Pure Three.js PBR Geometry)
    const bottleGroup = new THREE.Group();
    bottleGroup.position.set(0, -0.35, 0);
    scene.add(bottleGroup);

    // Outer Bottle Lathe Geometry (Refined apothecary silhouette)
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.86, 0));
    points.push(new THREE.Vector2(0.92, 0.08));
    points.push(new THREE.Vector2(0.92, 2.2));
    points.push(new THREE.Vector2(0.88, 2.5));
    points.push(new THREE.Vector2(0.65, 2.85));
    points.push(new THREE.Vector2(0.36, 3.1));
    points.push(new THREE.Vector2(0.32, 3.2));
    points.push(new THREE.Vector2(0.32, 3.9));
    points.push(new THREE.Vector2(0.38, 3.95));
    points.push(new THREE.Vector2(0.38, 4.1));
    points.push(new THREE.Vector2(0.32, 4.1));
    points.push(new THREE.Vector2(0.24, 4.1));
    points.push(new THREE.Vector2(0, 4.1));

    const bottleGeo = new THREE.LatheGeometry(points, 64);

    // Outer Glass Physical Material (authentic soda-lime glass)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.03,
      ior: 1.52,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      attenuationColor: new THREE.Color(0xfff7e6),
      attenuationDistance: 1.9,
    });

    const bottleMesh = new THREE.Mesh(bottleGeo, glassMat);
    bottleMesh.castShadow = true;
    bottleMesh.position.y = -1.25;
    bottleGroup.add(bottleMesh);

    // Inner Liquid Geometry & Radiant Amber Material
    const liquidPoints: THREE.Vector2[] = [];
    liquidPoints.push(new THREE.Vector2(0, 0.08));
    liquidPoints.push(new THREE.Vector2(0.82, 0.08));
    liquidPoints.push(new THREE.Vector2(0.82, 2.15));
    liquidPoints.push(new THREE.Vector2(0.78, 2.45));
    liquidPoints.push(new THREE.Vector2(0.58, 2.75));
    liquidPoints.push(new THREE.Vector2(0.28, 2.95));
    liquidPoints.push(new THREE.Vector2(0, 2.95));

    const liquidGeo = new THREE.LatheGeometry(liquidPoints, 64);
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: 0xE5A31E, // Radiant raw golden oil
      emissive: 0x3A2200,
      roughness: 0.12,
      metalness: 0.08,
      transmission: 0.72,
      ior: 1.48, // Vegetable oil refractive index
      transparent: true,
      opacity: 0.96,
      attenuationColor: new THREE.Color(0xF5A000),
      attenuationDistance: 0.8,
    });

    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.position.y = -1.25;
    bottleGroup.add(liquidMesh);

    // Metallic Brushed Gold Cap
    const capGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.65, 48);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      metalness: 0.9,
      roughness: 0.22,
    });
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.y = 2.9;
    bottleGroup.add(capMesh);

    // Foil Embossed Label Plane
    const labelGeo = new THREE.CylinderGeometry(0.93, 0.93, 1.45, 48, 1, true, -Math.PI * 0.34, Math.PI * 0.68);
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 1024;
    labelCanvas.height = 768;
    const lCtx = labelCanvas.getContext('2d');
    if (lCtx) {
      lCtx.fillStyle = '#FFFFFF';
      lCtx.fillRect(0, 0, 1024, 768);

      // Fine golden border
      lCtx.strokeStyle = '#6B742C';
      lCtx.lineWidth = 6;
      lCtx.strokeRect(30, 30, 964, 708);

      lCtx.strokeStyle = '#D4AF37';
      lCtx.lineWidth = 2;
      lCtx.strokeRect(45, 45, 934, 678);

      lCtx.textAlign = 'center';

      lCtx.fillStyle = '#6B742C';
      lCtx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
      lCtx.fillText('ESTD 1948 • VEDIC PRESSERY', 512, 135);

      lCtx.fillStyle = '#1A1D0B';
      lCtx.font = '800 68px "Playfair Display", serif';
      lCtx.fillText('SRSTI', 512, 245);

      lCtx.fillStyle = '#6B742C';
      lCtx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
      lCtx.fillText('KACHI GHANI MUSTARD', 512, 330);

      lCtx.fillStyle = '#555555';
      lCtx.font = '500 24px "Plus Jakarta Sans", sans-serif';
      lCtx.fillText('COLD-PRESSED IN LAKDI GHANI < 28°C', 512, 400);
      lCtx.fillText('100% UNREFINED • ZERO SOLVENTS', 512, 445);

      lCtx.fillStyle = '#D4AF37';
      lCtx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
      lCtx.fillText('500 ML • SINGLE-ORIGIN RAJASTHAN', 512, 530);

      lCtx.fillStyle = '#222222';
      lCtx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      lCtx.fillText('FSSAI LIC. 11223999000124', 512, 630);
    }

    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const labelMat = new THREE.MeshStandardMaterial({
      map: labelTexture,
      roughness: 0.45,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.position.y = -0.15;
    bottleGroup.add(labelMesh);

    // Realistic Floor Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
      grad.addColorStop(0.3, 'rgba(0, 0, 0, 0.22)');
      grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.06)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.26;
    bottleGroup.add(shadowMesh);

    // 4. Construct 3D Curved Botanical Leaves (Swirling in WebGL 3D Space)
    const leafInstances: {
      mesh: THREE.Mesh;
      baseY: number;
      orbitRadius: number;
      orbitSpeed: number;
      orbitPhase: number;
      verticalPhase: number;
      verticalSpeed: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
    }[] = [];

    const createLeafGeometry = (scale = 1.0) => {
      const segU = 16;
      const segV = 24;
      const pos: number[] = [];
      const uvs: number[] = [];
      const idx: number[] = [];
      const length = 1.45 * scale;
      const width = 0.58 * scale;

      for (let j = 0; j <= segV; j++) {
        const v = j / segV;
        const wProfile = Math.sin(Math.pow(v, 0.75) * Math.PI) * width;
        const zArch = Math.sin(v * Math.PI) * 0.22 * scale;
        const y = (v - 0.5) * length;

        for (let i = 0; i <= segU; i++) {
          const u = i / segU;
          const uNorm = (u - 0.5) * 2;
          const x = uNorm * (wProfile * 0.5);
          const vCurl = Math.pow(Math.abs(uNorm), 1.6) * 0.08 * scale;
          pos.push(x, y, zArch + vCurl);
          uvs.push(u, v);
        }
      }

      for (let j = 0; j < segV; j++) {
        for (let i = 0; i < segU; i++) {
          const a = j * (segU + 1) + i;
          const b = (j + 1) * (segU + 1) + i;
          const c = (j + 1) * (segU + 1) + (i + 1);
          const d = j * (segU + 1) + (i + 1);
          idx.push(a, b, d);
          idx.push(b, c, d);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geo.setIndex(idx);
      geo.computeVertexNormals();
      return geo;
    };

    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x586A26,
      roughness: 0.32,
      metalness: 0.06,
      side: THREE.DoubleSide,
    });

    const leafCount = 9;
    for (let i = 0; i < leafCount; i++) {
      const scale = 0.65 + Math.random() * 0.55;
      const geo = createLeafGeometry(scale);
      const leafMesh = new THREE.Mesh(geo, leafMat);
      
      const orbitRadius = 1.6 + Math.random() * 1.8;
      const orbitSpeed = (0.2 + Math.random() * 0.25) * (Math.random() > 0.5 ? 1 : -1);
      const orbitPhase = Math.random() * Math.PI * 2;
      const baseY = -1.0 + Math.random() * 2.8;

      leafMesh.castShadow = true;
      scene.add(leafMesh);

      leafInstances.push({
        mesh: leafMesh,
        baseY,
        orbitRadius,
        orbitSpeed,
        orbitPhase,
        verticalPhase: Math.random() * Math.PI * 2,
        verticalSpeed: 0.6 + Math.random() * 0.6,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.012,
      });
    }

    // 5. Interactive 360° Drag & Mouse Parallax Controls
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isPointerDown = false;
    let pointerStartX = 0;
    let dragVelocity = 0;
    let currentManualRotY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isPointerDown = true;
      pointerStartX = e.clientX;
      dragVelocity = 0;
      setIsInteracting(true);
      if (container.setPointerCapture) {
        container.setPointerCapture(e.pointerId);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 0.35;
      mouse.targetY = y * 0.25;

      if (isPointerDown) {
        const deltaX = e.clientX - pointerStartX;
        pointerStartX = e.clientX;
        dragVelocity = deltaX * 0.008;
        currentManualRotY += dragVelocity;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      isPointerDown = false;
      setIsInteracting(false);
      if (container.releasePointerCapture) {
        try {
          container.releasePointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });

    // 6. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 7. Intersection Observer for 60fps Performance Optimization
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 8. Render Loop (60 FPS Physical Motion)
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return; // Pause GPU processing when scrolled off-screen

      const elapsed = clock.getElapsedTime();

      // Mouse smoothing
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Damp drag velocity
      if (!isPointerDown) {
        dragVelocity *= 0.94;
        currentManualRotY += dragVelocity;
      }

      // Bottle Rotation & Float Physics
      const idleSpin = Math.sin(elapsed * 0.4) * 0.08;
      bottleGroup.rotation.y = currentManualRotY + mouse.x * 0.5 + idleSpin;
      bottleGroup.rotation.x = THREE.MathUtils.lerp(bottleGroup.rotation.x, -mouse.y * 0.35, 0.05);
      bottleGroup.position.y = -0.35 + Math.sin(elapsed * 0.8) * 0.06;

      // Update 3D Leaf Orbits & Tumbling
      for (let i = 0; i < leafInstances.length; i++) {
        const item = leafInstances[i];
        const angle = elapsed * item.orbitSpeed + item.orbitPhase;
        
        const x = Math.cos(angle) * item.orbitRadius + mouse.x * 0.6;
        const z = Math.sin(angle) * item.orbitRadius;
        const y = item.baseY + Math.sin(elapsed * item.verticalSpeed + item.verticalPhase) * 0.35 - mouse.y * 0.4;

        item.mesh.position.set(x, y, z);

        item.mesh.rotation.x += item.rotSpeedX;
        item.mesh.rotation.y += item.rotSpeedY;
        item.mesh.rotation.z += item.rotSpeedZ + Math.sin(elapsed * 1.2) * 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      observer.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      bottleGeo.dispose();
      glassMat.dispose();
      liquidGeo.dispose();
      liquidMat.dispose();
      capGeo.dispose();
      capMat.dispose();
      labelGeo.dispose();
      labelMat.dispose();
      labelTexture.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();
      leafMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center ${className}`}>
      {/* Interactive WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-[480px] sm:h-[540px] lg:h-[620px] relative cursor-grab active:cursor-grabbing select-none touch-none"
        title="Click and drag to rotate bottle in 360°"
      />

      {/* Floating 360° Interactive Hint Pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-20">
        <div className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
          isInteracting
            ? 'bg-[#6B742C] text-white shadow-md scale-105'
            : 'bg-white/80 backdrop-blur-md text-[#555C23] border border-[#DDE2C1] shadow-xs'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
          <span>{isInteracting ? 'ROTATING 360°' : '360° INTERACTIVE • DRAG TO ROTATE'}</span>
        </div>
      </div>
    </div>
  );
};
