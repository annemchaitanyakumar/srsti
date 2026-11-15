'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FloatingLeafInstance {
  mesh: THREE.Mesh;
  initialPos: THREE.Vector3;
  rotSpeed: THREE.Vector3;
  floatPhase: number;
  floatSpeed: number;
  floatAmplitude: THREE.Vector3;
  baseScale: number;
}

export const FloatingLeaves3D: React.FC<{
  count?: number;
  interactive?: boolean;
  className?: string;
}> = ({ count = 12, interactive = true, className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isDisposed = false;
    let isVisible = true;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting for realistic leaf sheen & highlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 2.2);
    sunLight.position.set(5, 8, 6);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.2); // Warm golden rim
    rimLight.position.set(-6, -4, -3);
    scene.add(rimLight);

    // 3. Mouse & Scroll state
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollVelocity = 0;
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 1.5;
      mouse.targetY = y * 1.5;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      scrollVelocity = THREE.MathUtils.clamp(delta * 0.005, -0.4, 0.4);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 4. Generate 3D Organic Curved Botanical Leaf Geometry
    const createCurvedLeafGeometry = (scale = 1.0) => {
      const segU = 14;
      const segV = 20;
      const pos: number[] = [];
      const uvs: number[] = [];
      const idx: number[] = [];
      const length = 1.4 * scale;
      const width = 0.52 * scale;

      for (let j = 0; j <= segV; j++) {
        const v = j / segV;
        const wProfile = Math.sin(Math.pow(v, 0.72) * Math.PI) * width;
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

    // Shared Double-Sided PBR Leaf Material
    const leafMaterial = new THREE.MeshStandardMaterial({
      color: 0x566827,
      roughness: 0.35,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });

    const leaves: FloatingLeafInstance[] = [];

    // Spawn 3D Leaf Instances across Depth Planes (Foreground, Midground, Background)
    for (let i = 0; i < count; i++) {
      const z = THREE.MathUtils.lerp(-4.5, 3.5, Math.random());
      const depthRatio = (z + 4.5) / 8.0; // 0 (deep background) to 1 (near foreground)
      const baseScale = THREE.MathUtils.lerp(0.4, 0.95, depthRatio);

      const geo = createCurvedLeafGeometry(baseScale);
      const leafMesh = new THREE.Mesh(geo, leafMaterial);

      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 9;

      leafMesh.position.set(x, y, z);
      leafMesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      scene.add(leafMesh);

      leaves.push({
        mesh: leafMesh,
        initialPos: new THREE.Vector3(x, y, z),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.006
        ),
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.8 + Math.random() * 0.6,
        floatAmplitude: new THREE.Vector3(
          0.25 + Math.random() * 0.25,
          0.4 + Math.random() * 0.35,
          0.2 + Math.random() * 0.2
        ),
        baseScale
      });
    }

    // 5. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 6. Intersection Observer for Performance Throttling
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 7. 60 FPS Physics Simulation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Save 100% GPU/CPU when scrolled away

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Damp scroll velocity
      scrollVelocity *= 0.92;

      // Update 3D leaf instances
      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];
        const time = elapsedTime * leaf.floatSpeed + leaf.floatPhase;

        // Harmonic organic floating wave
        const floatX = Math.sin(time * 0.7) * leaf.floatAmplitude.x;
        const floatY = Math.cos(time * 0.9) * leaf.floatAmplitude.y;
        const floatZ = Math.sin(time * 0.5) * leaf.floatAmplitude.z;

        // Interactive mouse parallax offset proportional to depth
        const depthFactor = (leaf.initialPos.z + 5) * 0.15;
        const mouseOffsetX = mouse.x * depthFactor;
        const mouseOffsetY = mouse.y * depthFactor;

        // Scroll drift effect
        leaf.initialPos.y -= scrollVelocity * (0.8 + depthFactor);

        // Screen wrap-around for infinite continuous flow
        if (leaf.initialPos.y < -5.5) leaf.initialPos.y = 5.5;
        if (leaf.initialPos.y > 5.5) leaf.initialPos.y = -5.5;

        leaf.mesh.position.set(
          leaf.initialPos.x + floatX + mouseOffsetX,
          leaf.initialPos.y + floatY + mouseOffsetY,
          leaf.initialPos.z + floatZ
        );

        // Continuous 3D rotation & organic aerodynamic flutter
        leaf.mesh.rotation.x += leaf.rotSpeed.x + scrollVelocity * 0.05;
        leaf.mesh.rotation.y += leaf.rotSpeed.y;
        leaf.mesh.rotation.z += leaf.rotSpeed.z + Math.sin(time) * 0.003;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      leaves.forEach((l) => l.mesh.geometry.dispose());
      leafMaterial.dispose();
      renderer.dispose();
    };
  }, [count, interactive]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none z-15 overflow-hidden ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};
