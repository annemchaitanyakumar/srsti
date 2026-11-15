'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GhaniSceneProps {
  progress: number; // 0.0 to 1.0
  cameraMode?: 'director' | 'orbit' | 'macro' | 'bottle';
}

export const GhaniScene: React.FC<GhaniSceneProps> = ({ progress, cameraMode = 'director' }) => {
  const beamGroupRef = useRef<THREE.Group>(null);
  const cowGroupRef = useRef<THREE.Group>(null);
  const cowLegFLRef = useRef<THREE.Group>(null);
  const cowLegFRRef = useRef<THREE.Group>(null);
  const cowLegBLRef = useRef<THREE.Group>(null);
  const cowLegBRRef = useRef<THREE.Group>(null);
  const cowHeadRef = useRef<THREE.Group>(null);
  const dropletRef = useRef<THREE.Mesh>(null);
  const oilStreamRef = useRef<THREE.Mesh>(null);
  const oilPuddleRef = useRef<THREE.Mesh>(null);

  // Procedural Granite Shader Material
  const graniteMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#4A4D4A'),
      roughness: 0.85,
      metalness: 0.1,
      bumpScale: 0.08,
    });
  }, []);

  // Timber / Hardwood Material
  const timberMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#614227'),
      roughness: 0.65,
      metalness: 0.05,
    });
  }, []);

  // Cow / Bull Material (Traditional Zebu grey/white hide)
  const cowSkinMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E3DFD5'),
      roughness: 0.75,
      metalness: 0.02,
    });
  }, []);

  const cowHornMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2C2822'),
      roughness: 0.4,
      metalness: 0.2,
    });
  }, []);

  // Luxury Viscous Golden Cold-Pressed Oil Physical Material
  const goldenOilMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#E5A91A'),
      emissive: new THREE.Color('#3A2500'),
      roughness: 0.06,
      metalness: 0.05,
      transmission: 0.88,
      ior: 1.48, // Authentic vegetable oil refractive index
      thickness: 1.5,
      attenuationColor: new THREE.Color('#D97706'),
      attenuationDistance: 0.8,
      transparent: true,
      opacity: 0.96,
    });
  }, []);

  // Glass Material for the Collection Bottle
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#78350F'), // Amber UV glass
      roughness: 0.1,
      transmission: 0.85,
      ior: 1.52,
      thickness: 1.2,
      transparent: true,
      opacity: 0.85,
    });
  }, []);

  // Update animations based on progress
  useFrame((state) => {
    const p = Math.max(0, Math.min(1, progress));
    const angle = p * Math.PI * 4; // Two complete circles across scroll

    // 1. Rotate the beam & pestle around the mortar
    if (beamGroupRef.current) {
      beamGroupRef.current.rotation.y = angle;
    }

    // 2. Position the cow at the outer edge of the beam and calculate walk cycle
    if (cowGroupRef.current) {
      const radius = 3.6;
      const cowX = Math.cos(angle) * radius;
      const cowZ = Math.sin(angle) * radius;
      cowGroupRef.current.position.set(cowX, 0, cowZ);
      // Face tangential to circular path
      cowGroupRef.current.rotation.y = -angle + Math.PI / 2;

      // Leg walk cycle oscillations (0 to 35% active, dampens later)
      const walkSpeed = p * 40;
      const legSwingFL = Math.sin(walkSpeed) * 0.45;
      const legSwingFR = Math.sin(walkSpeed + Math.PI) * 0.45;
      const legSwingBL = Math.sin(walkSpeed + Math.PI * 0.5) * 0.4;
      const legSwingBR = Math.sin(walkSpeed + Math.PI * 1.5) * 0.4;

      if (cowLegFLRef.current) cowLegFLRef.current.rotation.x = legSwingFL;
      if (cowLegFRRef.current) cowLegFRRef.current.rotation.x = legSwingFR;
      if (cowLegBLRef.current) cowLegBLRef.current.rotation.x = legSwingBL;
      if (cowLegBRRef.current) cowLegBRRef.current.rotation.x = legSwingBR;

      // Gentle head bobbing
      if (cowHeadRef.current) {
        cowHeadRef.current.rotation.x = 0.2 + Math.sin(walkSpeed * 0.8) * 0.08;
      }
    }

    // 3. Oil oozing from spout (Phase 2: 0.35 -> 0.70)
    if (oilStreamRef.current) {
      if (p < 0.25) {
        oilStreamRef.current.scale.set(0.01, 0.01, 0.01);
      } else {
        const streamProgress = Math.min(1, Math.max(0, (p - 0.25) / 0.45));
        oilStreamRef.current.scale.set(
          0.8 + streamProgress * 0.4,
          streamProgress * 1.6,
          0.8 + streamProgress * 0.4
        );
      }
    }

    // 4. Detached Droplet falling into bottle neck (Phase 3: 0.70 -> 1.0)
    if (dropletRef.current) {
      if (p < 0.65) {
        dropletRef.current.visible = false;
      } else {
        dropletRef.current.visible = true;
        const dropNorm = (p - 0.65) / 0.35; // 0 to 1
        
        // Easing down with gravity curve
        const startY = 0.9;
        const endY = -1.35;
        const currentY = THREE.MathUtils.lerp(startY, endY, Math.pow(dropNorm, 1.4));
        dropletRef.current.position.set(1.42, currentY, 0);

        // Surface tension wobble
        const wobble = Math.sin(dropNorm * Math.PI * 6) * 0.15;
        dropletRef.current.scale.set(
          0.22 - wobble * 0.08,
          0.34 + wobble * 0.12,
          0.22 - wobble * 0.08
        );
      }
    }

    // 5. Bottle liquid level filling up in Phase 3
    if (oilPuddleRef.current) {
      if (p < 0.7) {
        oilPuddleRef.current.scale.set(0.1, 0.1, 0.1);
      } else {
        const fillNorm = (p - 0.7) / 0.3;
        oilPuddleRef.current.scale.set(1, 0.2 + fillNorm * 0.8, 1);
        oilPuddleRef.current.position.y = -2.1 + fillNorm * 0.4;
      }
    }

    // 6. Camera smooth interpolation according to timeline phase
    const camera = state.camera;
    if (cameraMode === 'director') {
      if (p < 0.35) {
        // Phase 1: Wide cinematic overview of Ghani & Cow orbit
        const t1 = p / 0.35;
        camera.position.lerp(new THREE.Vector3(5.5, 4.2, 5.8), 0.06);
        camera.lookAt(0, 0.6, 0);
      } else if (p < 0.7) {
        // Phase 2: Macro dolly toward the stone spout & viscous liquid
        const t2 = (p - 0.35) / 0.35;
        camera.position.lerp(new THREE.Vector3(2.6, 1.6, 1.8), 0.07);
        camera.lookAt(1.4, 0.9, 0);
      } else {
        // Phase 3: Vertical tracking downward following the oil droplet into the bottle
        const t3 = (p - 0.7) / 0.3;
        camera.position.lerp(new THREE.Vector3(2.3, 0.1 - t3 * 0.8, 2.0), 0.07);
        camera.lookAt(1.42, -1.2 - t3 * 0.3, 0);
      }
    } else if (cameraMode === 'macro') {
      camera.position.lerp(new THREE.Vector3(2.2, 1.4, 1.4), 0.08);
      camera.lookAt(1.4, 0.85, 0);
    } else if (cameraMode === 'bottle') {
      camera.position.lerp(new THREE.Vector3(2.2, -0.8, 1.8), 0.08);
      camera.lookAt(1.42, -1.5, 0);
    } else if (cameraMode === 'orbit') {
      camera.position.lerp(new THREE.Vector3(6.5, 5.0, 6.5), 0.08);
      camera.lookAt(0, 0.5, 0);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      
      {/* Studio Contact Shadow / Ground Plate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial color="#E8EBE4" roughness={0.9} />
      </mesh>

      {/* Subtle Circular Stone Floor Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.48, 0]}>
        <ringGeometry args={[3.2, 4.0, 48]} />
        <meshStandardMaterial color="#D7DBD0" roughness={0.95} />
      </mesh>

      {/* ============================================================== */}
      {/* 1. TRADITIONAL GRANITE GHANI / CHEKKU MORTAR (Stone Base)      */}
      {/* ============================================================== */}
      <group position={[0, 0, 0]}>
        {/* Massive Cylindrical Granite Mortar Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow material={graniteMaterial}>
          <cylinderGeometry args={[1.2, 1.4, 2.0, 36]} />
        </mesh>

        {/* Outer Sculpted Bas-Relief Ring */}
        <mesh position={[0, 0.5, 0]} castShadow material={graniteMaterial}>
          <torusGeometry args={[1.22, 0.08, 16, 36]} />
        </mesh>

        {/* Carved Mortar Cavity (Bowl where seeds are crushed) */}
        <mesh position={[0, 0.7, 0]} material={graniteMaterial}>
          <cylinderGeometry args={[0.9, 0.5, 0.9, 28]} />
        </mesh>

        {/* Crushed Argan / Sesame Seed Pulp Paste */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.75, 0.52, 0.4, 24]} />
          <meshStandardMaterial color="#784C1C" roughness={0.8} />
        </mesh>

        {/* Glistening Seed Oil Sheen in Mortar */}
        <mesh position={[0, 0.66, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.74, 24]} />
          <meshStandardMaterial
            color="#D97706"
            roughness={0.08}
            metalness={0.1}
            emissive="#B45309"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Lateral Stone Spout Channel (Kannu) */}
        <mesh position={[1.25, 0.85, 0]} rotation={[0, 0, -0.22]} castShadow material={graniteMaterial}>
          <boxGeometry args={[0.6, 0.22, 0.3]} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 2. ROTATING TIMBER BEAM & HARDWOOD PESTLE                      */}
      {/* ============================================================== */}
      <group ref={beamGroupRef} position={[0, 0, 0]}>
        {/* Angled Hardwood Pestle (Ulakka) Grinding inside Mortar */}
        <group position={[0.25, 1.1, 0]} rotation={[0.1, 0, 0.2]}>
          <mesh castShadow material={timberMaterial}>
            <cylinderGeometry args={[0.22, 0.28, 2.2, 20]} />
          </mesh>
          {/* Top Iron/Brass Reinforcing Collar */}
          <mesh position={[0, 1.0, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.15, 20]} />
            <meshStandardMaterial color="#B45309" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>

        {/* Radial Structural Timber Beam extending outward to cow yoke */}
        <group position={[1.8, 1.95, 0]} rotation={[0, 0, -0.06]}>
          <mesh castShadow material={timberMaterial}>
            <boxGeometry args={[3.8, 0.24, 0.22]} />
          </mesh>
          {/* Iron Lashings and Ring */}
          <mesh position={[-1.7, 0, 0]}>
            <boxGeometry args={[0.1, 0.28, 0.26]} />
            <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[1.8, 0, 0]}>
            <boxGeometry args={[0.1, 0.28, 0.26]} />
            <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Vertical Wooden Connecting Strut / Yoke Hanger */}
        <mesh position={[3.6, 1.3, 0]} material={timberMaterial} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 1.4, 12]} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 3. SACRED INDIAN BULL / COW (Zebu with Majestic Hump)          */}
      {/* ============================================================== */}
      <group ref={cowGroupRef} position={[3.6, 0, 0]}>
        {/* Torso & Ribcage */}
        <mesh position={[0, 1.25, 0]} castShadow material={cowSkinMaterial}>
          <capsuleGeometry args={[0.48, 1.1, 8, 16]} />
        </mesh>

        {/* Distinctive Indian Zebu Hump (Thimil) */}
        <mesh position={[0, 1.78, 0.35]} castShadow material={cowSkinMaterial}>
          <sphereGeometry args={[0.34, 16, 16]} />
        </mesh>

        {/* Muscular Neck & Dewlap Folds */}
        <mesh position={[0, 1.5, 0.75]} rotation={[-0.4, 0, 0]} castShadow material={cowSkinMaterial}>
          <cylinderGeometry args={[0.3, 0.42, 0.65, 14]} />
        </mesh>

        {/* Head with Muzzle */}
        <group ref={cowHeadRef} position={[0, 1.75, 1.1]}>
          {/* Cranium */}
          <mesh castShadow material={cowSkinMaterial}>
            <boxGeometry args={[0.34, 0.38, 0.48]} />
          </mesh>
          {/* Muzzle / Nose */}
          <mesh position={[0, -0.15, 0.28]} material={cowSkinMaterial}>
            <boxGeometry args={[0.26, 0.22, 0.28]} />
          </mesh>
          {/* Dark Snout */}
          <mesh position={[0, -0.16, 0.42]}>
            <boxGeometry args={[0.22, 0.16, 0.05]} />
            <meshStandardMaterial color="#2B2621" roughness={0.6} />
          </mesh>

          {/* Majestic Curved Horns */}
          <group position={[-0.18, 0.22, -0.05]} rotation={[0.4, -0.3, -0.5]}>
            <mesh castShadow material={cowHornMaterial}>
              <coneGeometry args={[0.08, 0.65, 12]} />
            </mesh>
          </group>
          <group position={[0.18, 0.22, -0.05]} rotation={[0.4, 0.3, 0.5]}>
            <mesh castShadow material={cowHornMaterial}>
              <coneGeometry args={[0.08, 0.65, 12]} />
            </mesh>
          </group>

          {/* Ears */}
          <mesh position={[-0.24, 0.05, -0.1]} rotation={[0, 0, 0.4]} material={cowSkinMaterial}>
            <coneGeometry args={[0.08, 0.3, 8]} />
          </mesh>
          <mesh position={[0.24, 0.05, -0.1]} rotation={[0, 0, -0.4]} material={cowSkinMaterial}>
            <coneGeometry args={[0.08, 0.3, 8]} />
          </mesh>
        </group>

        {/* 4 Articulated Walking Legs */}
        {/* Front Left Leg */}
        <group ref={cowLegFLRef} position={[-0.32, 0.9, 0.5]}>
          <mesh position={[0, -0.45, 0]} castShadow material={cowSkinMaterial}>
            <cylinderGeometry args={[0.09, 0.07, 0.9, 10]} />
          </mesh>
          <mesh position={[0, -0.9, 0]} material={cowHornMaterial}>
            <boxGeometry args={[0.12, 0.08, 0.14]} />
          </mesh>
        </group>

        {/* Front Right Leg */}
        <group ref={cowLegFRRef} position={[0.32, 0.9, 0.5]}>
          <mesh position={[0, -0.45, 0]} castShadow material={cowSkinMaterial}>
            <cylinderGeometry args={[0.09, 0.07, 0.9, 10]} />
          </mesh>
          <mesh position={[0, -0.9, 0]} material={cowHornMaterial}>
            <boxGeometry args={[0.12, 0.08, 0.14]} />
          </mesh>
        </group>

        {/* Back Left Leg */}
        <group ref={cowLegBLRef} position={[-0.32, 0.9, -0.5]}>
          <mesh position={[0, -0.45, 0]} castShadow material={cowSkinMaterial}>
            <cylinderGeometry args={[0.11, 0.07, 0.9, 10]} />
          </mesh>
          <mesh position={[0, -0.9, 0]} material={cowHornMaterial}>
            <boxGeometry args={[0.12, 0.08, 0.14]} />
          </mesh>
        </group>

        {/* Back Right Leg */}
        <group ref={cowLegBRRef} position={[0.32, 0.9, -0.5]}>
          <mesh position={[0, -0.45, 0]} castShadow material={cowSkinMaterial}>
            <cylinderGeometry args={[0.11, 0.07, 0.9, 10]} />
          </mesh>
          <mesh position={[0, -0.9, 0]} material={cowHornMaterial}>
            <boxGeometry args={[0.12, 0.08, 0.14]} />
          </mesh>
        </group>

        {/* Tail */}
        <mesh position={[0, 1.25, -0.6]} rotation={[-0.2, 0, 0]} material={cowSkinMaterial}>
          <cylinderGeometry args={[0.04, 0.02, 0.8, 8]} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 4. GOLDEN VISCOUS COLD-PRESSED OIL FLOW & SPOUT OOZING        */}
      {/* ============================================================== */}
      {/* Viscous Stream Dripping from Spout */}
      <mesh
        ref={oilStreamRef}
        position={[1.42, 0.72, 0]}
        material={goldenOilMaterial}
        castShadow
      >
        <cylinderGeometry args={[0.04, 0.06, 0.35, 16]} />
      </mesh>

      {/* Surface Bead / Droplet Forming at Spout Lip */}
      <mesh position={[1.42, 0.82, 0]} material={goldenOilMaterial}>
        <sphereGeometry args={[0.09, 16, 16]} />
      </mesh>

      {/* Falling Golden Oil Droplet (Slow-Motion 70% -> 100%) */}
      <mesh
        ref={dropletRef}
        position={[1.42, 0.5, 0]}
        material={goldenOilMaterial}
        castShadow
      >
        <sphereGeometry args={[0.22, 24, 24]} />
      </mesh>

      {/* ============================================================== */}
      {/* 5. ULTRA-LUXURY AMBER COLLECTION BOTTLE IN SHOWCASE BELOW     */}
      {/* ============================================================== */}
      <group position={[1.42, -1.8, 0]}>
        {/* Open Bottle Neck Funnel Receiving Drops */}
        <mesh position={[0, 0.5, 0]} material={glassMaterial}>
          <cylinderGeometry args={[0.18, 0.24, 0.45, 24, 1, true]} />
        </mesh>
        {/* Gold Neck Ring */}
        <mesh position={[0, 0.65, 0]}>
          <torusGeometry args={[0.2, 0.03, 16, 32]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Amber Glass Cylindrical Bottle Body */}
        <mesh position={[0, -0.3, 0]} material={glassMaterial} castShadow>
          <cylinderGeometry args={[0.5, 0.52, 1.2, 32]} />
        </mesh>

        {/* Rising Golden Oil Level inside Bottle */}
        <mesh
          ref={oilPuddleRef}
          position={[0, -0.6, 0]}
          material={goldenOilMaterial}
        >
          <cylinderGeometry args={[0.46, 0.46, 0.6, 24]} />
        </mesh>

        {/* Minimalist White / Gold Brand Label on Glass */}
        <mesh position={[0, -0.3, 0.52]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.6, 0.8]} />
          <meshStandardMaterial color="#FAF9F4" roughness={0.4} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 6. ACES FILMIC STUDIO LIGHTING PIPELINE                        */}
      {/* ============================================================== */}
      {/* Warm Key Light */}
      <directionalLight
        position={[8, 10, 6]}
        intensity={2.8}
        color="#FFF6E0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0005}
      />

      {/* Golden Rim Light (Enhances oil refraction & bottle sheen) */}
      <directionalLight
        position={[-6, 6, -5]}
        intensity={2.2}
        color="#F59E0B"
      />

      {/* Cool Soft Studio Fill Light */}
      <directionalLight
        position={[0, 5, -8]}
        intensity={1.2}
        color="#E2E8F0"
      />

      {/* Soft Ambient Illumination */}
      <ambientLight intensity={0.7} color="#FFFFFF" />

      {/* Direct Point Light on Oil Spout Caustic */}
      <pointLight position={[1.4, 1.2, 0.5]} intensity={1.8} color="#FDE047" distance={3.5} />
    </group>
  );
};

