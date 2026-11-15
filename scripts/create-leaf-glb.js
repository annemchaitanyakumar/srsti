const THREE = require('three');
const { GLTFExporter } = require('three/examples/jsm/exporters/GLTFExporter.js');
const fs = require('fs');
const path = require('path');

function createRealisticLeafMesh() {
  const leafGroup = new THREE.Group();
  leafGroup.name = "BotanicalLeaf";

  // Create curved botanical leaf geometry using a high-resolution grid
  const segmentsU = 32; // across width
  const segmentsV = 48; // along length
  
  const positions = [];
  const uvs = [];
  const normals = [];
  const indices = [];

  const length = 2.4;
  const maxWidth = 0.95;

  for (let j = 0; j <= segmentsV; j++) {
    const v = j / segmentsV; // 0 (base) to 1 (tip)
    
    // Width envelope: smooth lanceolate shape (taper at base, wide in lower third, sharp tip)
    // using sin curve with bias
    let widthProfile = Math.sin(Math.pow(v, 0.7) * Math.PI);
    if (v < 0.1) {
      widthProfile = (v / 0.1) * Math.sin(Math.pow(0.1, 0.7) * Math.PI);
    }
    const currentWidth = maxWidth * widthProfile;

    // Longitudinal arching curve (S-curve bend)
    const zArch = Math.sin(v * Math.PI) * 0.28 - Math.pow(v, 2) * 0.15;
    const yPos = (v - 0.5) * length;

    for (let i = 0; i <= segmentsU; i++) {
      const u = i / segmentsU; // 0 (left edge) to 0.5 (midrib) to 1 (right edge)
      const uCentered = (u - 0.5) * 2; // -1 to +1

      const xPos = uCentered * (currentWidth * 0.5);

      // Transverse V-curl: leaves cup upward along the midrib
      const cupCurvature = Math.pow(Math.abs(uCentered), 1.6) * 0.14 * (1 - v * 0.5);

      // Organic subtle twist along length
      const twistAngle = (v - 0.5) * 0.25;
      const twistedX = xPos * Math.cos(twistAngle) - cupCurvature * Math.sin(twistAngle);
      const twistedZ = zArch + xPos * Math.sin(twistAngle) + cupCurvature * Math.cos(twistAngle);

      positions.push(twistedX, yPos, twistedZ);
      uvs.push(u, v);
    }
  }

  // Generate triangles
  for (let j = 0; j < segmentsV; j++) {
    for (let i = 0; i < segmentsU; i++) {
      const a = j * (segmentsU + 1) + i;
      const b = (j + 1) * (segmentsU + 1) + i;
      const c = (j + 1) * (segmentsU + 1) + (i + 1);
      const d = j * (segmentsU + 1) + (i + 1);

      // Face 1
      indices.push(a, b, d);
      // Face 2
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  // Create PBR leaf material
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x5D6C29, // Rich olive green
    roughness: 0.38,
    metalness: 0.05,
    side: THREE.DoubleSide,
    name: "LeafPBRMaterial"
  });

  const leafMesh = new THREE.Mesh(geometry, leafMaterial);
  leafMesh.name = "LeafBlade";
  leafGroup.add(leafMesh);

  // Add cylindrical 3D central stem (midrib & petiole)
  const curvePoints = [];
  const stemSegments = 30;
  for (let k = 0; k <= stemSegments; k++) {
    const t = k / stemSegments;
    const v = t * 1.1 - 0.1; // extends slightly below leaf base
    const y = (v - 0.5) * length;
    const zArch = Math.sin(Math.max(0, v) * Math.PI) * 0.28 - Math.pow(Math.max(0, v), 2) * 0.15;
    curvePoints.push(new THREE.Vector3(0, y, zArch - 0.015));
  }
  const stemCurve = new THREE.CatmullRomCurve3(curvePoints);
  const stemGeometry = new THREE.TubeGeometry(stemCurve, 30, 0.022, 8, false);
  const stemMaterial = new THREE.MeshStandardMaterial({
    color: 0x48541E, // Slightly deeper stem green
    roughness: 0.5,
    metalness: 0.02,
    name: "StemMaterial"
  });
  const stemMesh = new THREE.Mesh(stemGeometry, stemMaterial);
  stemMesh.name = "LeafStem";
  leafGroup.add(stemMesh);

  return leafGroup;
}

async function exportGLB() {
  const modelDir = path.join(__dirname, '../public/models');
  if (!fs.existsSync(modelDir)) {
    fs.mkdirSync(modelDir, { recursive: true });
  }

  const leaf = createRealisticLeafMesh();
  const exporter = new GLTFExporter();

  exporter.parse(
    leaf,
    (gltf) => {
      const buffer = Buffer.from(gltf);
      const outPath = path.join(modelDir, 'leaf.glb');
      fs.writeFileSync(outPath, buffer);
      console.log(`✓ Successfully generated 3D GLB leaf model: ${outPath} (${buffer.length} bytes)`);
    },
    (err) => {
      console.error('Failed to export GLTF:', err);
    },
    { binary: true }
  );
}

exportGLB();
