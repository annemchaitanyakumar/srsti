const THREE = require('three');
const fs = require('fs');
const path = require('path');

class MockFileReader {
  async readAsArrayBuffer(blob) {
    this.result = await blob.arrayBuffer();
    if (this.onloadend) this.onloadend();
  }
  async readAsDataURL(blob) {
    const buf = Buffer.from(await blob.arrayBuffer());
    this.result = 'data:' + (blob.type || 'application/octet-stream') + ';base64,' + buf.toString('base64');
    if (this.onloadend) this.onloadend();
  }
}
global.FileReader = MockFileReader;

const { GLTFExporter } = require('three/examples/jsm/exporters/GLTFExporter.js');

function createRealisticLeafMesh() {
  const leafGroup = new THREE.Group();
  leafGroup.name = "BotanicalLeaf";

  // Create curved botanical leaf geometry using a high-resolution grid
  const segmentsU = 32; // across width
  const segmentsV = 48; // along length
  
  const positions = [];
  const uvs = [];
  const indices = [];

  const length = 2.6;
  const maxWidth = 1.05;

  for (let j = 0; j <= segmentsV; j++) {
    const v = j / segmentsV; // 0 (base) to 1 (tip)
    
    // Width envelope: smooth lanceolate shape (taper at base, wide in lower third, sharp tip)
    let widthProfile = Math.sin(Math.pow(v, 0.72) * Math.PI);
    if (v < 0.08) {
      widthProfile = (v / 0.08) * Math.sin(Math.pow(0.08, 0.72) * Math.PI);
    }
    const currentWidth = maxWidth * widthProfile;

    // Longitudinal arching curve (organic S-bend)
    const zArch = Math.sin(v * Math.PI) * 0.32 - Math.pow(v, 2) * 0.18;
    const yPos = (v - 0.5) * length;

    for (let i = 0; i <= segmentsU; i++) {
      const u = i / segmentsU;
      const uCentered = (u - 0.5) * 2; // -1 to +1

      const xPos = uCentered * (currentWidth * 0.5);

      // Transverse V-curl: leaves cup upward along the midrib
      const cupCurvature = Math.pow(Math.abs(uCentered), 1.6) * 0.16 * (1 - v * 0.4);

      // Organic subtle twist along length
      const twistAngle = (v - 0.5) * 0.28;
      const twistedX = xPos * Math.cos(twistAngle) - cupCurvature * Math.sin(twistAngle);
      const twistedZ = zArch + xPos * Math.sin(twistAngle) + cupCurvature * Math.cos(twistAngle);

      positions.push(twistedX, yPos, twistedZ);
      uvs.push(u, v);
    }
  }

  // Triangles
  for (let j = 0; j < segmentsV; j++) {
    for (let i = 0; i < segmentsU; i++) {
      const a = j * (segmentsU + 1) + i;
      const b = (j + 1) * (segmentsU + 1) + i;
      const c = (j + 1) * (segmentsU + 1) + (i + 1);
      const d = j * (segmentsU + 1) + (i + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  // PBR Leaf Material
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x556624, // Deep heritage olive green
    roughness: 0.35,
    metalness: 0.05,
    side: THREE.DoubleSide,
    name: "OliveLeafPBR"
  });

  const leafMesh = new THREE.Mesh(geometry, leafMaterial);
  leafMesh.name = "Blade";
  leafGroup.add(leafMesh);

  // Cylindrical stem (petiole)
  const curvePoints = [];
  const stemSegments = 30;
  for (let k = 0; k <= stemSegments; k++) {
    const t = k / stemSegments;
    const v = t * 1.12 - 0.12;
    const y = (v - 0.5) * length;
    const zArch = Math.sin(Math.max(0, v) * Math.PI) * 0.32 - Math.pow(Math.max(0, v), 2) * 0.18;
    curvePoints.push(new THREE.Vector3(0, y, zArch - 0.012));
  }
  const stemCurve = new THREE.CatmullRomCurve3(curvePoints);
  const stemGeometry = new THREE.TubeGeometry(stemCurve, 30, 0.024, 8, false);
  const stemMaterial = new THREE.MeshStandardMaterial({
    color: 0x3F4C18,
    roughness: 0.45,
    metalness: 0.02,
    name: "StemPBR"
  });
  const stemMesh = new THREE.Mesh(stemGeometry, stemMaterial);
  stemMesh.name = "Stem";
  leafGroup.add(stemMesh);

  return leafGroup;
}

// Convert JSON GLTF with embedded base64 buffers to valid binary GLB buffer
function gltfToGlb(gltfJson) {
  let binBuffer = Buffer.alloc(0);

  // Extract binary buffer from data uri
  if (gltfJson.buffers && gltfJson.buffers.length > 0) {
    const uri = gltfJson.buffers[0].uri;
    if (uri && uri.startsWith('data:')) {
      const base64Data = uri.split(',')[1];
      binBuffer = Buffer.from(base64Data, 'base64');
      delete gltfJson.buffers[0].uri;
      gltfJson.buffers[0].byteLength = binBuffer.length;
    }
  }

  // Pad binary buffer to 4-byte alignment
  const binPadding = (4 - (binBuffer.length % 4)) % 4;
  if (binPadding > 0) {
    binBuffer = Buffer.concat([binBuffer, Buffer.alloc(binPadding, 0x00)]);
  }

  const jsonString = JSON.stringify(gltfJson);
  let jsonBuffer = Buffer.from(jsonString, 'utf8');
  const jsonPadding = (4 - (jsonBuffer.length % 4)) % 4;
  if (jsonPadding > 0) {
    jsonBuffer = Buffer.concat([jsonBuffer, Buffer.alloc(jsonPadding, 0x20)]); // space padded
  }

  const headerLength = 12;
  const jsonChunkHeaderLength = 8;
  const binChunkHeaderLength = binBuffer.length > 0 ? 8 : 0;
  const totalLength = headerLength + jsonChunkHeaderLength + jsonBuffer.length + binChunkHeaderLength + binBuffer.length;

  const glbBuffer = Buffer.alloc(totalLength);
  let offset = 0;

  // GLB Header
  glbBuffer.writeUInt32LE(0x46546C67, offset); offset += 4; // magic: 'glTF'
  glbBuffer.writeUInt32LE(2, offset); offset += 4;          // version: 2
  glbBuffer.writeUInt32LE(totalLength, offset); offset += 4;// total length

  // JSON Chunk Header
  glbBuffer.writeUInt32LE(jsonBuffer.length, offset); offset += 4; // chunk length
  glbBuffer.writeUInt32LE(0x4E4F534A, offset); offset += 4;        // chunk type: 'JSON'
  jsonBuffer.copy(glbBuffer, offset); offset += jsonBuffer.length;

  // BIN Chunk Header (if present)
  if (binBuffer.length > 0) {
    glbBuffer.writeUInt32LE(binBuffer.length, offset); offset += 4; // chunk length
    glbBuffer.writeUInt32LE(0x004E4942, offset); offset += 4;        // chunk type: 'BIN\0'
    binBuffer.copy(glbBuffer, offset); offset += binBuffer.length;
  }

  return glbBuffer;
}

function generate() {
  const modelDir = path.join(__dirname, '../public/models');
  if (!fs.existsSync(modelDir)) {
    fs.mkdirSync(modelDir, { recursive: true });
  }

  const leaf = createRealisticLeafMesh();
  const exporter = new GLTFExporter();

  exporter.parse(leaf, (gltfJson) => {
    // 1. Write gltf file
    const gltfPath = path.join(modelDir, 'leaf.gltf');
    fs.writeFileSync(gltfPath, JSON.stringify(gltfJson, null, 2));
    console.log(`✓ Generated ${gltfPath}`);

    // 2. Write binary glb file
    const glbBuffer = gltfToGlb(gltfJson);
    const glbPath = path.join(modelDir, 'leaf.glb');
    fs.writeFileSync(glbPath, glbBuffer);
    console.log(`✓ Generated valid binary GLB: ${glbPath} (${glbBuffer.length} bytes)`);
  }, { binary: false });
}

generate();
