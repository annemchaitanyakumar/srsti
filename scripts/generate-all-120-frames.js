const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const destFrames = path.join(__dirname, '../public/story-frames');
fs.mkdirSync(destFrames, { recursive: true });

const W = 1376;
const H = 768;

async function generateAllFrames() {
  console.log('Generating 120 unique, continuous photorealistic Apple-style story frames...');
  const tStart = Date.now();

  const ghaniBuffer = fs.readFileSync('public/images/story/story-ghani.jpg');
  const spoutBuffer = fs.readFileSync('public/images/story/story-spout.jpg');
  const dropBuffer = fs.readFileSync('public/images/story/story-drop.jpg');

  for (let i = 1; i <= 120; i++) {
    const frameNum = String(i).padStart(4, '0');
    let frameBuffer;

    if (i <= 40) {
      // ==============================================================
      // PHASE 1: FRAMES 1 TO 40 - GHANI STONE MILL ROTARY MOTION
      // ==============================================================
      const t = (i - 1) / 39; // 0.0 -> 1.0
      const zoom = 1.0 + t * 0.24; // Smooth push-in zoom 1.0 -> 1.24
      const cropW = Math.round(W / zoom);
      const cropH = Math.round(H / zoom);
      const cropLeft = Math.round((W - cropW) / 2);
      const cropTop = Math.round((H - cropH) / 2 + t * 25);

      // Rotating wooden beam & shadow angles
      const angle = t * Math.PI * 2.5; // 1.25 full circles
      const cx = 688;
      const cy = 410;
      const beamLen = 520;
      const bx = cx + Math.cos(angle) * beamLen;
      const by = cy + Math.sin(angle) * (beamLen * 0.55); // Isometric elliptical path

      // Expanding golden oil pool in the mortar
      const poolRadius = Math.round(35 + t * 65);
      const poolOpacity = 0.4 + t * 0.55;

      const svgOverlay = Buffer.from(`
        <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="oilPoolGrad" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stop-color="#FCD34D" stop-opacity="${poolOpacity}"/>
              <stop offset="40%" stop-color="#F59E0B" stop-opacity="${poolOpacity * 0.9}"/>
              <stop offset="75%" stop-color="#D97706" stop-opacity="${poolOpacity * 0.8}"/>
              <stop offset="100%" stop-color="#78350F" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="beamWood" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#3D2614" />
              <stop offset="50%" stop-color="#6B4226" />
              <stop offset="100%" stop-color="#2E1C0E" />
            </linearGradient>
            <filter id="shadowBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8"/>
            </filter>
          </defs>

          <!-- Golden Cold-Pressed Oil Glistening in Mortar Cavity -->
          <ellipse cx="${cx}" cy="${cy}" rx="${poolRadius}" ry="${Math.round(poolRadius * 0.65)}" fill="url(#oilPoolGrad)" />
          
          <!-- Concentric Oil Ripple Rings from Pressure -->
          <ellipse cx="${cx}" cy="${cy}" rx="${Math.round(poolRadius * 0.75)}" ry="${Math.round(poolRadius * 0.5)}" fill="none" stroke="#FDE68A" stroke-width="1.5" opacity="${0.3 + 0.3 * Math.sin(t * Math.PI * 8)}" />
          <ellipse cx="${cx}" cy="${cy}" rx="${Math.round(poolRadius * 0.4)}" ry="${Math.round(poolRadius * 0.28)}" fill="none" stroke="#F59E0B" stroke-width="1.2" opacity="0.5" />

          <!-- Beam Cast Shadow on Stone Floor -->
          <g filter="url(#shadowBlur)" opacity="0.45">
            <line x1="${cx}" y1="${cy + 15}" x2="${bx + 15}" y2="${by + 25}" stroke="#0A0806" stroke-width="32" stroke-linecap="round"/>
          </g>

          <!-- Rotating Massive Hardwood Yoke Beam (Kozhu) -->
          <line x1="${cx}" y1="${cy}" x2="${bx}" y2="${by}" stroke="url(#beamWood)" stroke-width="26" stroke-linecap="round"/>
          <line x1="${cx}" y1="${cy}" x2="${bx}" y2="${by}" stroke="#9A6B42" stroke-width="2" stroke-linecap="round" opacity="0.6"/>

          <!-- Iron Collar Band at Center Axis -->
          <circle cx="${cx}" cy="${cy}" r="16" fill="#1C1917" stroke="#D4AF37" stroke-width="1.5"/>
          <circle cx="${cx}" cy="${cy}" r="6" fill="#D4AF37"/>

          <!-- Outer Yoke Ring & Ropes -->
          <circle cx="${bx}" cy="${by}" r="14" fill="#292524" stroke="#A8A29E" stroke-width="2"/>
        </svg>
      `);

      frameBuffer = await sharp(ghaniBuffer)
        .extract({ left: cropLeft, top: cropTop, width: cropW, height: cropH })
        .resize(W, H)
        .composite([{ input: svgOverlay, top: 0, left: 0 }])
        .webp({ quality: 88 })
        .toBuffer();

    } else if (i <= 80) {
      // ==============================================================
      // PHASE 2: FRAMES 41 TO 80 - MACRO SPOUT OOZING VISCOUS GOLD
      // ==============================================================
      const t = (i - 41) / 39; // 0.0 -> 1.0
      const zoom = 1.0 + t * 0.32; // Macro push-in zoom 1.0 -> 1.32
      const cropW = Math.round(W / zoom);
      const cropH = Math.round(H / zoom);
      const cropLeft = Math.round((W - cropW) * 0.55);
      const cropTop = Math.round((H - cropH) * 0.48);

      // Viscous flow progression down the stone spout groove
      // Start of groove: (530, 290) -> Tip of stone spout: (765, 495)
      const flowProgress = Math.min(1.0, t / 0.65);
      const currentX = 530 + (765 - 530) * flowProgress;
      const currentY = 290 + (495 - 290) * flowProgress;
      const strokeW = 8 + flowProgress * 14;

      // Swelling golden teardrop bead at spout lip (t >= 0.60)
      let beadRadius = 0;
      let beadY = 495;
      if (t >= 0.60) {
        const beadT = (t - 0.60) / 0.40;
        beadRadius = 8 + beadT * 26; // Swells from 8px to 34px
        beadY = 495 + beadT * 20; // Elongates downward under gravity
      }

      const svgOverlay = Buffer.from(`
        <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="viscousFlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#92400E" stop-opacity="0.95"/>
              <stop offset="35%" stop-color="#D97706" stop-opacity="0.98"/>
              <stop offset="70%" stop-color="#F59E0B" stop-opacity="1"/>
              <stop offset="100%" stop-color="#FCD34D" stop-opacity="1"/>
            </linearGradient>
            <radialGradient id="dropletBeadGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#FEF08A"/>
              <stop offset="30%" stop-color="#FBBF24"/>
              <stop offset="70%" stop-color="#D97706"/>
              <stop offset="100%" stop-color="#78350F"/>
            </radialGradient>
            <filter id="liquidGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#B45309" flood-opacity="0.6"/>
            </filter>
          </defs>

          <!-- Viscous Golden Stream Creeping Down Carved Spout Runnel -->
          <path d="M 530 290 Q ${530 + (currentX - 530) * 0.4} ${290 + (currentY - 290) * 0.55} ${currentX} ${currentY}"
            fill="none" stroke="url(#viscousFlow)" stroke-width="${strokeW}" stroke-linecap="round" filter="url(#liquidGlow)"/>

          <!-- Specular Highlight Streak along Fluid Crest -->
          <path d="M 532 288 Q ${532 + (currentX - 530) * 0.4} ${288 + (currentY - 290) * 0.55} ${currentX - 4} ${currentY - 3}"
            fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.8"/>

          ${beadRadius > 0 ? `
            <!-- Golden Teardrop Bead Swelling & Quivering at Spout Lip -->
            <ellipse cx="765" cy="${beadY}" rx="${beadRadius}" ry="${Math.round(beadRadius * 1.35)}"
              fill="url(#dropletBeadGrad)" filter="url(#liquidGlow)"/>
            <!-- Meniscus Specular Highlight on Bead -->
            <ellipse cx="${765 - beadRadius * 0.3}" cy="${beadY - beadRadius * 0.4}" rx="${beadRadius * 0.35}" ry="${beadRadius * 0.22}"
              fill="#FFFFFF" opacity="0.85" transform="rotate(-15 ${765 - beadRadius * 0.3} ${beadY - beadRadius * 0.4})"/>
          ` : ''}
        </svg>
      `);

      frameBuffer = await sharp(spoutBuffer)
        .extract({ left: cropLeft, top: cropTop, width: cropW, height: cropH })
        .resize(W, H)
        .composite([{ input: svgOverlay, top: 0, left: 0 }])
        .webp({ quality: 88 })
        .toBuffer();

    } else {
      // ==============================================================
      // PHASE 3: FRAMES 81 TO 120 - DETACHMENT, FALL & BOTTLE ENTRY
      // ==============================================================
      const t = (i - 81) / 39; // 0.0 -> 1.0

      // Vertical camera tracking following droplet descent from y=180 to y=640
      const trackY = Math.round(t * 160);
      const cropW = Math.round(W / 1.15);
      const cropH = Math.round(H / 1.15);
      const cropLeft = Math.round((W - cropW) / 2);
      const cropTop = Math.min(H - cropH, Math.round(trackY));

      // Droplet kinematics: acceleration with gravity curve
      // Start detachment at y=170 -> bottle neck at y=620
      const fallProgress = Math.pow(t, 1.3);
      const dropY = Math.round(170 + (620 - 170) * Math.min(1.0, fallProgress));
      const dropX = Math.round(688 + Math.sin(t * Math.PI * 5) * 5); // Micro fluid wobble

      // Droplet surface tension oscillation (squash and stretch)
      const osc = Math.sin(t * Math.PI * 12);
      const rx = Math.round(22 * (1.0 + osc * 0.15));
      const ry = Math.round(30 * (1.0 - osc * 0.15));

      // Ripple waves inside bottle neck (t >= 0.85)
      let rippleR = 0;
      let rippleOpacity = 0;
      if (t >= 0.82) {
        const impactT = (t - 0.82) / 0.18;
        rippleR = Math.round(impactT * 70);
        rippleOpacity = Math.max(0, 1.0 - impactT);
      }

      const svgOverlay = Buffer.from(`
        <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="dropCaustic" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#FEF08A"/>
              <stop offset="25%" stop-color="#FCD34D"/>
              <stop offset="65%" stop-color="#F59E0B"/>
              <stop offset="90%" stop-color="#D97706"/>
              <stop offset="100%" stop-color="#78350F"/>
            </radialGradient>
            <filter id="dropGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#B45309" flood-opacity="0.65"/>
            </filter>
          </defs>

          ${t < 0.15 ? `
            <!-- Neck Pinch-Off Filament Thread -->
            <path d="M 688 120 C 688 145 ${dropX} 150 ${dropX} ${dropY - ry}"
              fill="none" stroke="#F59E0B" stroke-width="${Math.max(1, Math.round(6 * (1.0 - t / 0.15)))}" opacity="0.9"/>
          ` : ''}

          ${t < 0.88 ? `
            <!-- Falling Liquid Gold Droplet in Slow Motion -->
            <ellipse cx="${dropX}" cy="${dropY}" rx="${rx}" ry="${ry}"
              fill="url(#dropCaustic)" filter="url(#dropGlow)"/>

            <!-- Primary Specular Highlight Arc -->
            <ellipse cx="${dropX - rx * 0.35}" cy="${dropY - ry * 0.35}" rx="${rx * 0.35}" ry="${ry * 0.22}"
              fill="#FFFFFF" opacity="0.9" transform="rotate(-20 ${dropX - rx * 0.35} ${dropY - ry * 0.35})"/>

            <!-- Secondary Rim Caustic Glow -->
            <ellipse cx="${dropX + rx * 0.25}" cy="${dropY + ry * 0.25}" rx="${rx * 0.25}" ry="${ry * 0.18}"
              fill="#FEF08A" opacity="0.75"/>
          ` : ''}

          ${rippleR > 0 ? `
            <!-- Entry Ripple Waves & Golden Crown in Amber Bottle Neck -->
            <ellipse cx="688" cy="625" rx="${rippleR}" ry="${Math.round(rippleR * 0.45)}"
              fill="none" stroke="#FCD34D" stroke-width="3" opacity="${rippleOpacity}"/>
            <ellipse cx="688" cy="625" rx="${Math.round(rippleR * 0.6)}" ry="${Math.round(rippleR * 0.28)}"
              fill="none" stroke="#F59E0B" stroke-width="2" opacity="${rippleOpacity * 0.8}"/>
            <!-- Rising Liquid Golden Level Glow in Bottle -->
            <ellipse cx="688" cy="625" rx="55" ry="25" fill="#D97706" opacity="${0.4 + 0.4 * (t - 0.82) / 0.18}"/>
          ` : ''}
        </svg>
      `);

      frameBuffer = await sharp(dropBuffer)
        .extract({ left: cropLeft, top: cropTop, width: cropW, height: cropH })
        .resize(W, H)
        .composite([{ input: svgOverlay, top: 0, left: 0 }])
        .webp({ quality: 88 })
        .toBuffer();
    }

    // Write both .webp and .jpg frame files
    fs.writeFileSync(path.join(destFrames, `frame_${frameNum}.webp`), frameBuffer);
    fs.writeFileSync(path.join(destFrames, `frame_${frameNum}.jpg`), frameBuffer);

    if (i % 20 === 0 || i === 120) {
      console.log(`Generated frame ${i}/120 (${Date.now() - tStart}ms elapsed)...`);
    }
  }

  console.log(`COMPLETE: All 120 distinct, animated story frames generated in ${(Date.now() - tStart) / 1000}s!`);
}

generateAllFrames().catch(err => {
  console.error('Error generating frames:', err);
  process.exit(1);
});
