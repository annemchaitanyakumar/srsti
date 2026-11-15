const fs = require('fs');
const path = require('path');

// Ensure directories exist
const dirs = [
  'public/images/brand',
  'public/images/products',
  'public/images/foliage',
  'public/textures'
];
dirs.forEach(d => fs.mkdirSync(path.join(__dirname, '..', d), { recursive: true }));

console.log('Generating luxury vector assets...');

// 1. Hexagonal APIA Brand Emblem Logo
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="160" height="160">
  <defs>
    <linearGradient id="goldHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EAD179" />
      <stop offset="50%" stop-color="#C59B27" />
      <stop offset="100%" stop-color="#7D8735" />
    </linearGradient>
    <linearGradient id="innerBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#FAF8EE" />
    </linearGradient>
    <filter id="hexShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4F5720" flood-opacity="0.25"/>
    </filter>
  </defs>
  
  <!-- Outer Hexagon -->
  <polygon points="80,6 150,44 150,116 80,154 10,116 10,44" 
    fill="url(#innerBg)" stroke="url(#goldHexGrad)" stroke-width="3" filter="url(#hexShadow)" />
    
  <!-- Inner Hexagon Accent -->
  <polygon points="80,14 142,48 142,112 80,146 18,112 18,48" 
    fill="none" stroke="#6B742C" stroke-width="1" stroke-dasharray="2,2" opacity="0.6" />
    
  <!-- Olive Branch Wreath -->
  <g transform="translate(80, 52) scale(0.7)" stroke="#6B742C" fill="#7D8735" stroke-width="1.2">
    <!-- Center Olive Sprig -->
    <path d="M0,25 Q-15,5 -20,-15 Q-10,-5 0,15 Q10,-5 20,-15 Q15,5 0,25" />
    <!-- Olive Leaves -->
    <ellipse cx="-16" cy="-6" rx="9" ry="4" transform="rotate(-30 -16 -6)" />
    <ellipse cx="16" cy="-6" rx="9" ry="4" transform="rotate(30 16 -6)" />
    <ellipse cx="-8" cy="8" rx="8" ry="3.5" transform="rotate(-15 -8 8)" />
    <ellipse cx="8" cy="8" rx="8" ry="3.5" transform="rotate(15 8 8)" />
    <!-- Olive Fruit -->
    <ellipse cx="0" cy="-2" rx="4.5" ry="6.5" fill="#4F5720" stroke="#C59B27" stroke-width="1" />
  </g>
  
  <!-- Brand Typography -->
  <text x="80" y="100" font-family="'Plus Jakarta Sans', 'Montserrat', sans-serif" font-size="22" font-weight="700" 
    letter-spacing="4" fill="#2C2C2C" text-anchor="middle">APIA</text>
  <text x="80" y="114" font-family="'Plus Jakarta Sans', 'Montserrat', sans-serif" font-size="7.5" font-weight="600" 
    letter-spacing="3" fill="#6B742C" text-anchor="middle">TERROIR BIO</text>
  <line x1="50" y1="122" x2="110" y2="122" stroke="#C59B27" stroke-width="0.8" opacity="0.7" />
  <text x="80" y="132" font-family="'Plus Jakarta Sans', 'Montserrat', sans-serif" font-size="6" font-weight="500" 
    letter-spacing="2" fill="#888888" text-anchor="middle">DEPUIS 1932</text>
</svg>`;
fs.writeFileSync(path.join(__dirname, '../public/images/brand/logo-hexagon.svg'), logoSvg);

// 2. Hero Bottles Cluster with Realistic Reflections and Floating Olives
const heroBottlesSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 700" width="800" height="700">
  <defs>
    <!-- Glass & Liquid Gradients -->
    <linearGradient id="amberOil" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6E5507" />
      <stop offset="25%" stop-color="#D9A826" />
      <stop offset="50%" stop-color="#FCD34D" />
      <stop offset="75%" stop-color="#E59B12" />
      <stop offset="100%" stop-color="#4F3C03" />
    </linearGradient>
    <linearGradient id="greenOliveOil" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3D4512" />
      <stop offset="30%" stop-color="#809028" />
      <stop offset="50%" stop-color="#BACD40" />
      <stop offset="70%" stop-color="#6F7E1D" />
      <stop offset="100%" stop-color="#2D330C" />
    </linearGradient>
    <linearGradient id="darkGlass" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#181D10" />
      <stop offset="25%" stop-color="#384323" />
      <stop offset="50%" stop-color="#5B6C39" />
      <stop offset="75%" stop-color="#2B341B" />
      <stop offset="100%" stop-color="#11150B" />
    </linearGradient>
    <linearGradient id="glassGloss" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.6"/>
      <stop offset="20%" stop-color="#FFFFFF" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="goldLabel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FAF6E8" />
      <stop offset="100%" stop-color="#EEDCB0" />
    </linearGradient>
    <radialGradient id="groundReflection" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#4F5720" stop-opacity="0.22" />
      <stop offset="60%" stop-color="#4F5720" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#4F5720" stop-opacity="0" />
    </radialGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Ground Shadow & Caustic Reflection -->
  <ellipse cx="400" cy="590" rx="360" ry="40" fill="url(#groundReflection)" />
  <ellipse cx="410" cy="580" rx="180" ry="22" fill="#D9A826" opacity="0.18" filter="url(#softGlow)" />

  <!-- BOTTLE 1 (Far Left Background, Green Olive Oil) -->
  <g transform="translate(140, 160) scale(0.85)">
    <!-- Body -->
    <rect x="50" y="160" width="80" height="320" rx="14" fill="url(#greenOliveOil)" />
    <!-- Shoulder -->
    <path d="M50,160 Q50,90 80,75 L80,30 L100,30 L100,75 Q130,90 130,160 Z" fill="url(#greenOliveOil)" />
    <!-- Cap -->
    <rect x="78" y="0" width="24" height="34" rx="3" fill="#222" stroke="#6B742C" stroke-width="1.5" />
    <!-- Label -->
    <rect x="54" y="210" width="72" height="150" rx="4" fill="url(#goldLabel)" stroke="#D4AF37" stroke-width="1" />
    <text x="90" y="245" font-family="sans-serif" font-size="10" font-weight="700" fill="#2C2C2C" text-anchor="middle" letter-spacing="1">APIA</text>
    <text x="90" y="270" font-family="sans-serif" font-size="8" fill="#6B742C" text-anchor="middle">TERROIR</text>
    <text x="90" y="295" font-family="sans-serif" font-size="9" font-weight="600" fill="#333" text-anchor="middle">BIO</text>
    <!-- Glass Highlight -->
    <rect x="56" y="165" width="12" height="300" rx="6" fill="url(#glassGloss)" />
  </g>

  <!-- BOTTLE 4 (Far Right Background, Tall Slender Amber Bottle) -->
  <g transform="translate(530, 140) scale(0.82)">
    <rect x="50" y="160" width="76" height="350" rx="12" fill="url(#amberOil)" />
    <path d="M50,160 Q50,90 78,75 L78,25 L98,25 L98,75 Q126,90 126,160 Z" fill="url(#amberOil)" />
    <rect x="76" y="0" width="24" height="30" rx="3" fill="#D4AF37" />
    <rect x="54" y="210" width="68" height="160" rx="4" fill="#FFFFFF" opacity="0.9" />
    <text x="88" y="250" font-family="sans-serif" font-size="9" font-weight="700" fill="#2C2C2C" text-anchor="middle">PURE</text>
    <text x="88" y="275" font-family="sans-serif" font-size="8" fill="#6B742C" text-anchor="middle">ARGAN</text>
    <rect x="56" y="165" width="10" height="330" rx="5" fill="url(#glassGloss)" />
  </g>

  <!-- BOTTLE 2 (Center Left, White Label Argan Bottle) -->
  <g transform="translate(240, 100) scale(0.96)">
    <rect x="40" y="170" width="94" height="340" rx="16" fill="url(#darkGlass)" />
    <path d="M40,170 Q40,90 77,75 L77,25 L97,25 L97,75 Q134,90 134,170 Z" fill="url(#darkGlass)" />
    <rect x="75" y="0" width="24" height="30" rx="3" fill="#C59B27" />
    <!-- White Minimalist Label -->
    <rect x="46" y="200" width="82" height="200" rx="4" fill="#FFFFFF" filter="url(#softGlow)" />
    <rect x="50" y="204" width="74" height="192" rx="2" fill="none" stroke="#6B742C" stroke-width="0.8" />
    <text x="87" y="240" font-family="sans-serif" font-size="11" font-weight="700" fill="#2C2C2C" text-anchor="middle" letter-spacing="2">APIA</text>
    <path d="M70,265 Q87,255 104,265" stroke="#C59B27" fill="none" stroke-width="1.5" />
    <text x="87" y="285" font-family="sans-serif" font-size="8" font-weight="600" fill="#6B742C" text-anchor="middle" letter-spacing="1">HUILE D'ARGAN</text>
    <text x="87" y="300" font-family="sans-serif" font-size="7" fill="#888" text-anchor="middle">EXTRA VIERGE</text>
    <text x="87" y="340" font-family="sans-serif" font-size="8" font-weight="700" fill="#C59B27" text-anchor="middle">100% BIO</text>
    <text x="87" y="375" font-family="sans-serif" font-size="7" fill="#666" text-anchor="middle">250 ML</text>
    <rect x="46" y="175" width="14" height="320" rx="7" fill="url(#glassGloss)" />
  </g>

  <!-- BOTTLE 3 (Center Foreground Hero Bottle, BEKR / APIA Golden Glass) -->
  <g transform="translate(355, 60) scale(1.08)">
    <!-- Ground Mirror Reflection -->
    <g opacity="0.25" transform="scale(1, -0.2) translate(0, -2950)">
      <rect x="35" y="160" width="102" height="350" rx="18" fill="url(#amberOil)" />
    </g>
    <!-- Bottle Body -->
    <rect x="35" y="160" width="102" height="360" rx="18" fill="url(#amberOil)" stroke="#FAF4D0" stroke-width="0.8" />
    <path d="M35,160 Q35,80 76,65 L76,15 L96,15 L96,65 Q137,80 137,160 Z" fill="url(#amberOil)" />
    <!-- Gold Metallic Neck & Cap -->
    <rect x="74" y="0" width="24" height="25" rx="3" fill="#D4AF37" stroke="#FFF" stroke-width="0.5" />
    <rect x="74" y="25" width="24" height="42" fill="#C59B27" />
    <!-- Main Label with BEKR Brand Identity -->
    <rect x="42" y="210" width="88" height="210" rx="6" fill="#FAF8EE" stroke="#C59B27" stroke-width="1.2" />
    <text x="86" y="248" font-family="'Times New Roman', serif" font-size="18" font-weight="700" fill="#2C2C2C" text-anchor="middle" letter-spacing="3">BEKR</text>
    <text x="86" y="266" font-family="sans-serif" font-size="7" font-weight="600" fill="#6B742C" text-anchor="middle" letter-spacing="2">HUILE D'ARGAN</text>
    <line x1="56" y1="274" x2="116" y2="274" stroke="#D4AF37" stroke-width="0.8" />
    <text x="86" y="295" font-family="sans-serif" font-size="6.5" fill="#555" text-anchor="middle">PREMIÈRE PRESSION</text>
    <text x="86" y="308" font-family="sans-serif" font-size="6.5" fill="#555" text-anchor="middle">À FROID ARTISANALE</text>
    <!-- Certified Organic Gold Seal -->
    <circle cx="86" cy="345" r="18" fill="none" stroke="#D4AF37" stroke-width="1.2" stroke-dasharray="2,1" />
    <text x="86" y="348" font-family="sans-serif" font-size="7" font-weight="700" fill="#6B742C" text-anchor="middle">BIO</text>
    <text x="86" y="395" font-family="sans-serif" font-size="8" font-weight="600" fill="#2C2C2C" text-anchor="middle">500 ML</text>
    
    <!-- Primary Specular Highlight Streak -->
    <rect x="42" y="165" width="14" height="340" rx="7" fill="url(#glassGloss)" opacity="0.9" />
    <rect x="62" y="170" width="3" height="320" rx="1.5" fill="#FFFFFF" opacity="0.4" />
  </g>

  <!-- BOTTLE 5 (Right Foreground, Tall Yellow Terroir Bottle) -->
  <g transform="translate(470, 85) scale(1.0)">
    <rect x="40" y="170" width="92" height="350" rx="16" fill="url(#greenOliveOil)" />
    <path d="M40,170 Q40,90 76,75 L76,25 L96,25 L96,75 Q132,90 132,170 Z" fill="url(#greenOliveOil)" />
    <rect x="74" y="0" width="24" height="30" rx="3" fill="#FFFFFF" />
    <rect x="46" y="210" width="80" height="190" rx="4" fill="#FFFFFF" />
    <text x="86" y="250" font-family="sans-serif" font-size="11" font-weight="700" fill="#2C2C2C" text-anchor="middle">APIA</text>
    <text x="86" y="275" font-family="sans-serif" font-size="7.5" fill="#6B742C" text-anchor="middle" letter-spacing="1">OLIVE TERROIR</text>
    <text x="86" y="300" font-family="sans-serif" font-size="8" font-weight="600" fill="#333" text-anchor="middle">EXTRA VIERGE</text>
    <rect x="46" y="175" width="12" height="330" rx="6" fill="url(#glassGloss)" />
  </g>

  <!-- Floating Green Olives & Leaves around Hero Cluster -->
  <g transform="translate(180, 480) rotate(-25)">
    <ellipse cx="0" cy="0" rx="16" ry="10" fill="#65762A" stroke="#48551B" stroke-width="1.2" />
    <ellipse cx="-4" cy="-3" rx="5" ry="2.5" fill="#9FB53F" opacity="0.7" />
  </g>
  <g transform="translate(680, 460) rotate(20)">
    <ellipse cx="0" cy="0" rx="18" ry="11" fill="#4B581F" stroke="#364014" stroke-width="1.2" />
    <ellipse cx="-4" cy="-3" rx="6" ry="3" fill="#889E30" opacity="0.6" />
  </g>
  <g transform="translate(670, 310) rotate(-45)">
    <ellipse cx="0" cy="0" rx="14" ry="9" fill="#586622" stroke="#3E4A17" stroke-width="1.2" />
  </g>
  <g transform="translate(170, 260) rotate(35)">
    <ellipse cx="0" cy="0" rx="15" ry="9" fill="#6A7A28" stroke="#4B581B" stroke-width="1.2" />
  </g>
  
  <!-- Floating Olive Leaves -->
  <g transform="translate(230, 490) rotate(40)">
    <path d="M0,0 Q25,-8 50,0 Q25,8 0,0" fill="#7D8735" stroke="#555E22" stroke-width="0.8" />
    <line x1="0" y1="0" x2="48" y2="0" stroke="#9EAA4F" stroke-width="0.7" />
  </g>
  <g transform="translate(620, 500) rotate(-35)">
    <path d="M0,0 Q30,-9 60,0 Q30,9 0,0" fill="#6B742C" stroke="#48501B" stroke-width="0.8" />
    <line x1="0" y1="0" x2="58" y2="0" stroke="#97A53E" stroke-width="0.7" />
  </g>
  <g transform="translate(630, 240) rotate(15)">
    <path d="M0,0 Q24,-7 48,0 Q24,7 0,0" fill="#7D8735" stroke="#4F5720" stroke-width="0.8" />
  </g>
</svg>`;
fs.writeFileSync(path.join(__dirname, '../public/images/products/hero-bottles.svg'), heroBottlesSvg);

// 3. Featured Terroir Card 1: Single Bottle on Stone Pedestal with Raw Nuts
const product1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F2F3F0" />
    </linearGradient>
    <linearGradient id="stonePedestal" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E2E4DE" />
      <stop offset="50%" stop-color="#F5F6F2" />
      <stop offset="100%" stop-color="#D5D8D0" />
    </linearGradient>
    <linearGradient id="oilGreen" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3C481A" />
      <stop offset="35%" stop-color="#7C8F2C" />
      <stop offset="50%" stop-color="#9FB639" />
      <stop offset="70%" stop-color="#718225" />
      <stop offset="100%" stop-color="#2B3411" />
    </linearGradient>
    <linearGradient id="nutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#DDB382" />
      <stop offset="100%" stop-color="#8C5C31" />
    </linearGradient>
    <filter id="shadow1" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#000" flood-opacity="0.12"/>
    </filter>
  </defs>

  <rect width="500" height="500" fill="url(#bgGrad)" />
  
  <!-- Subtle Stone Pedestal Plate -->
  <ellipse cx="250" cy="420" rx="190" ry="42" fill="url(#stonePedestal)" stroke="#D8DBD2" stroke-width="1.5" />
  <ellipse cx="250" cy="412" rx="175" ry="35" fill="#EFEFEF" />
  <ellipse cx="250" cy="415" rx="80" ry="16" fill="#000000" opacity="0.15" />

  <!-- Bottle -->
  <g transform="translate(195, 60)" filter="url(#shadow1)">
    <!-- Body -->
    <rect x="20" y="140" width="70" height="230" rx="12" fill="url(#oilGreen)" />
    <!-- Shoulder -->
    <path d="M20,140 Q20,70 45,55 L45,18 L65,18 L65,55 Q90,70 90,140 Z" fill="url(#oilGreen)" />
    <!-- Cap -->
    <rect x="43" y="0" width="24" height="22" rx="2" fill="#2C2C2C" stroke="#D4AF37" stroke-width="1" />
    <!-- Label -->
    <rect x="25" y="170" width="60" height="135" rx="4" fill="#FAF9F4" stroke="#6B742C" stroke-width="0.8" />
    <text x="55" y="200" font-family="sans-serif" font-size="9" font-weight="700" fill="#2C2C2C" text-anchor="middle">APIA</text>
    <line x1="35" y1="208" x2="75" y2="208" stroke="#D4AF37" stroke-width="0.7" />
    <text x="55" y="224" font-family="sans-serif" font-size="6.5" font-weight="600" fill="#6B742C" text-anchor="middle">ARGAN BIO</text>
    <text x="55" y="238" font-family="sans-serif" font-size="6" fill="#666" text-anchor="middle">EXTRA VIERGE</text>
    <circle cx="55" cy="265" r="12" fill="#7D8735" opacity="0.15" />
    <text x="55" y="268" font-family="sans-serif" font-size="6.5" font-weight="700" fill="#6B742C" text-anchor="middle">100%</text>
    <text x="55" y="292" font-family="sans-serif" font-size="6" fill="#888" text-anchor="middle">100 ML</text>
    <!-- Highlight -->
    <rect x="24" y="145" width="8" height="215" rx="4" fill="#FFFFFF" opacity="0.4" />
  </g>

  <!-- Argan Nuts / Almonds on the stone plate -->
  <g transform="translate(130, 400)">
    <ellipse cx="0" cy="0" rx="18" ry="12" fill="url(#nutGrad)" transform="rotate(-15)" />
    <line x1="-12" y1="0" x2="12" y2="0" stroke="#613919" stroke-width="1.2" transform="rotate(-15)" />
  </g>
  <g transform="translate(160, 420)">
    <ellipse cx="0" cy="0" rx="14" ry="10" fill="url(#nutGrad)" transform="rotate(25)" />
  </g>
  <g transform="translate(350, 410)">
    <ellipse cx="0" cy="0" rx="16" ry="11" fill="url(#nutGrad)" transform="rotate(-20)" />
  </g>
  <g transform="translate(375, 425)">
    <ellipse cx="0" cy="0" rx="13" ry="9" fill="url(#nutGrad)" transform="rotate(35)" />
  </g>
</svg>`;
fs.writeFileSync(path.join(__dirname, '../public/images/products/product-1-bottle.svg'), product1Svg);

// 4. Featured Terroir Card 2: Luxury Gift Box Set with Patterned Packaging & Dropper Bottle
const product2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <linearGradient id="boxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F4F4F0" />
    </linearGradient>
    <pattern id="zelligePattern" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M10,0 L20,10 L10,20 L0,10 Z" fill="none" stroke="#6B742C" stroke-width="0.8" opacity="0.35" />
      <circle cx="10" cy="10" r="3" fill="#D4AF37" opacity="0.4" />
    </pattern>
    <linearGradient id="amberGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#704F0E" />
      <stop offset="40%" stop-color="#EAA622" />
      <stop offset="70%" stop-color="#FAD45A" />
      <stop offset="100%" stop-color="#5E3F05" />
    </linearGradient>
    <filter id="boxShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000" flood-opacity="0.14"/>
    </filter>
  </defs>

  <rect width="500" height="500" fill="#FBFBFA" />
  
  <!-- Ground Shadow -->
  <ellipse cx="250" cy="430" rx="200" ry="24" fill="#000000" opacity="0.12" />

  <!-- Background Gift Box -->
  <g transform="translate(130, 90)" filter="url(#boxShadow)">
    <rect x="0" y="0" width="170" height="310" rx="6" fill="url(#boxGrad)" stroke="#E0E0D8" stroke-width="1.2" />
    <rect x="10" y="10" width="150" height="290" fill="url(#zelligePattern)" />
    <rect x="35" y="80" width="100" height="150" rx="4" fill="#FFFFFF" stroke="#6B742C" stroke-width="1" />
    <text x="85" y="120" font-family="sans-serif" font-size="12" font-weight="700" fill="#2C2C2C" text-anchor="middle" letter-spacing="2">APIA</text>
    <text x="85" y="140" font-family="sans-serif" font-size="8" font-weight="600" fill="#6B742C" text-anchor="middle">COFFRET BIO</text>
    <line x1="55" y1="150" x2="115" y2="150" stroke="#D4AF37" stroke-width="1" />
    <text x="85" y="170" font-family="sans-serif" font-size="7" fill="#666" text-anchor="middle">ÉDITION LIMITÉE</text>
  </g>

  <!-- Dropper Bottle in Foreground Left -->
  <g transform="translate(260, 160)" filter="url(#boxShadow)">
    <!-- Bottle -->
    <rect x="25" y="110" width="60" height="155" rx="10" fill="url(#amberGold)" />
    <path d="M25,110 Q25,65 45,55 L45,28 L65,28 L65,55 Q85,65 85,110 Z" fill="url(#amberGold)" />
    <!-- Pipette Dropper Top -->
    <rect x="42" y="15" width="26" height="16" fill="#D4AF37" rx="2" />
    <path d="M47,15 C47,0 63,0 63,15 Z" fill="#222222" />
    <!-- Dropper Label -->
    <rect x="30" y="130" width="50" height="100" rx="3" fill="#FFFFFF" />
    <text x="55" y="155" font-family="sans-serif" font-size="8" font-weight="700" fill="#2C2C2C" text-anchor="middle">SÉRUM</text>
    <text x="55" y="170" font-family="sans-serif" font-size="6" fill="#6B742C" text-anchor="middle">ARGAN PURE</text>
    <rect x="28" y="115" width="6" height="140" rx="3" fill="#FFFFFF" opacity="0.45" />
  </g>

  <!-- Small Cosmetic Jar Foreground Center-Right -->
  <g transform="translate(195, 330)" filter="url(#boxShadow)">
    <rect x="0" y="20" width="65" height="55" rx="8" fill="#FFFFFF" stroke="#E2E2DC" stroke-width="1" />
    <rect x="-2" y="5" width="69" height="18" rx="4" fill="#D4AF37" />
    <text x="32" y="48" font-family="sans-serif" font-size="7" font-weight="700" fill="#6B742C" text-anchor="middle">BAUME</text>
    <text x="32" y="60" font-family="sans-serif" font-size="5.5" fill="#888" text-anchor="middle">50 ML</text>
  </g>
</svg>`;
fs.writeFileSync(path.join(__dirname, '../public/images/products/product-2-boxset.svg'), product2Svg);

// 5. Featured Terroir Card 3: Green Glass Extra Virgin Bottle with Tiled Background
const product3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <linearGradient id="emeraldOil" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2D3B16" />
      <stop offset="35%" stop-color="#556F24" />
      <stop offset="55%" stop-color="#809F30" />
      <stop offset="80%" stop-color="#556F24" />
      <stop offset="100%" stop-color="#222D0F" />
    </linearGradient>
    <filter id="tileSubtle" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#000" flood-opacity="0.1"/>
    </filter>
  </defs>

  <rect width="500" height="500" fill="#FFFFFF" />
  
  <!-- Subtle Subway Tiled Kitchen / Boutique Background -->
  <g opacity="0.12" stroke="#4A4A4A" stroke-width="1">
    <rect x="20" y="20" width="140" height="60" fill="none" />
    <rect x="180" y="20" width="140" height="60" fill="none" />
    <rect x="340" y="20" width="140" height="60" fill="none" />
    <rect x="90" y="90" width="140" height="60" fill="none" />
    <rect x="250" y="90" width="140" height="60" fill="none" />
    <rect x="410" y="90" width="70" height="60" fill="none" />
    <rect x="20" y="160" width="140" height="60" fill="none" />
    <rect x="180" y="160" width="140" height="60" fill="none" />
    <rect x="340" y="160" width="140" height="60" fill="none" />
  </g>

  <!-- Shadow -->
  <ellipse cx="250" cy="425" rx="120" ry="20" fill="#000000" opacity="0.14" />

  <!-- Bottle -->
  <g transform="translate(195, 60)" filter="url(#tileSubtle)">
    <rect x="20" y="130" width="70" height="250" rx="12" fill="url(#emeraldOil)" />
    <path d="M20,130 Q20,65 45,50 L45,15 L65,15 L65,50 Q90,65 90,130 Z" fill="url(#emeraldOil)" />
    <!-- White / Gold Cap -->
    <rect x="43" y="0" width="24" height="20" rx="2" fill="#FAF6EE" stroke="#D4AF37" stroke-width="1.2" />
    <!-- Round/Oval Vintage Terroir Label -->
    <rect x="25" y="165" width="60" height="150" rx="6" fill="#FAF8EE" stroke="#6B742C" stroke-width="1" />
    <ellipse cx="55" cy="205" rx="22" ry="22" fill="none" stroke="#D4AF37" stroke-width="1" />
    <text x="55" y="208" font-family="serif" font-size="10" font-weight="700" fill="#2C2C2C" text-anchor="middle">APIA</text>
    <text x="55" y="245" font-family="sans-serif" font-size="7" font-weight="700" fill="#6B742C" text-anchor="middle">TERROIR</text>
    <text x="55" y="260" font-family="sans-serif" font-size="6" fill="#666" text-anchor="middle">OLIVE EXTRA</text>
    <text x="55" y="285" font-family="sans-serif" font-size="7" font-weight="600" fill="#D4AF37" text-anchor="middle">750 ML</text>
    <rect x="24" y="135" width="8" height="235" rx="4" fill="#FFFFFF" opacity="0.45" />
  </g>
</svg>`;
fs.writeFileSync(path.join(__dirname, '../public/images/products/product-3-terroir.svg'), product3Svg);

// 6. Spotlight Product Feature: "CRÈME MAINS ARGAN 100 ML" Mosaic Tin + Glass Bowl of Oil
const spotlightTinSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <!-- Moroccan Zellige Mosaic Rosette Pattern -->
    <pattern id="moroccanMosaic" width="60" height="60" patternUnits="userSpaceOnUse">
      <rect width="60" height="60" fill="#FAF9F5" />
      <!-- Central Rosette -->
      <circle cx="30" cy="30" r="14" fill="none" stroke="#6B742C" stroke-width="1.5" />
      <circle cx="30" cy="30" r="8" fill="#D4AF37" opacity="0.4" />
      <!-- Star Petals -->
      <polygon points="30,12 34,26 48,30 34,34 30,48 26,34 12,30 26,26" fill="#809028" opacity="0.6" />
      <polygon points="17,17 27,24 30,12 33,24 43,17 36,27 48,30 36,33 43,43 33,36 30,48 27,36 17,43 24,33 12,30 24,27" fill="none" stroke="#6B742C" stroke-width="0.8" />
    </pattern>
    <linearGradient id="tinMetalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E2E4DE" />
      <stop offset="30%" stop-color="#FFFFFF" />
      <stop offset="70%" stop-color="#F2F3EC" />
      <stop offset="100%" stop-color="#D3D6CD" />
    </linearGradient>
    <linearGradient id="oilBowlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047" />
      <stop offset="40%" stop-color="#EAB308" />
      <stop offset="80%" stop-color="#CA8A04" />
      <stop offset="100%" stop-color="#854D0E" />
    </linearGradient>
    <filter id="tinShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="-10" dy="16" stdDeviation="16" flood-color="#000" flood-opacity="0.14"/>
    </filter>
  </defs>

  <!-- Shadows -->
  <ellipse cx="250" cy="510" rx="160" ry="25" fill="#000000" opacity="0.12" />
  <ellipse cx="430" cy="505" rx="70" ry="18" fill="#000000" opacity="0.1" />

  <!-- Tin Package (3D Angled Canister) -->
  <g transform="translate(150, 70)" filter="url(#tinShadow)">
    <!-- Main Canister Body -->
    <rect x="0" y="0" width="180" height="420" rx="10" fill="url(#tinMetalGrad)" stroke="#D4AF37" stroke-width="1.2" />
    
    <!-- Top Tin Rim -->
    <rect x="-4" y="-6" width="188" height="16" rx="4" fill="#C59B27" stroke="#FAF6EE" stroke-width="0.8" />
    
    <!-- Header Area -->
    <rect x="15" y="25" width="150" height="90" fill="#FFFFFF" />
    <text x="90" y="55" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#2C2C2C" text-anchor="middle" letter-spacing="2">APIA</text>
    <text x="90" y="75" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="600" fill="#6B742C" text-anchor="middle" letter-spacing="1.5">CRÈME MAINS ARGAN</text>
    <text x="90" y="95" font-family="'Plus Jakarta Sans', sans-serif" font-size="7.5" fill="#666" text-anchor="middle">SOIN HYDRATANT 100 ML</text>
    
    <!-- Intricate Moroccan Mosaic Center Section -->
    <rect x="15" y="125" width="150" height="220" fill="url(#moroccanMosaic)" stroke="#6B742C" stroke-width="1" />
    
    <!-- Bottom Foil Area -->
    <rect x="15" y="355" width="150" height="50" fill="#FFFFFF" />
    <text x="90" y="380" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="700" fill="#C59B27" text-anchor="middle">BIO TERROIR DU MAROC</text>
    <text x="90" y="395" font-family="'Plus Jakarta Sans', sans-serif" font-size="6.5" fill="#888" text-anchor="middle">PREMIÈRE PRESSION À FROID</text>

    <!-- Chrome Reflection Line -->
    <rect x="12" y="5" width="14" height="410" fill="#FFFFFF" opacity="0.5" />
  </g>

  <!-- Glass Bowl with Golden Cold-Pressed Oil & Refraction -->
  <g transform="translate(370, 390)">
    <!-- Glass Dish Outline -->
    <ellipse cx="60" cy="80" rx="58" ry="24" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="1.5" opacity="0.6" />
    <!-- Golden Liquid -->
    <ellipse cx="60" cy="76" rx="52" ry="20" fill="url(#oilBowlGrad)" />
    <ellipse cx="56" cy="72" rx="42" ry="14" fill="#FDE047" opacity="0.4" />
    <!-- Glass Rim Highlight -->
    <path d="M10,76 Q60,98 110,76" fill="none" stroke="#FFFFFF" stroke-width="2.5" opacity="0.8" />
    <ellipse cx="60" cy="65" rx="55" ry="16" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.7" />
  </g>

  <!-- Floating Green Olive Sprig Overlapping -->
  <g transform="translate(110, 240) rotate(-45)">
    <path d="M0,0 Q35,-12 70,0 Q35,12 0,0" fill="#7D8735" stroke="#4F5720" stroke-width="1" />
    <line x1="0" y1="0" x2="68" y2="0" stroke="#A3B43C" stroke-width="1" />
  </g>
  <g transform="translate(100, 320) rotate(25)">
    <ellipse cx="0" cy="0" rx="16" ry="10" fill="#6B742C" />
  </g>
  <g transform="translate(490, 360) rotate(15)">
    <path d="M0,0 Q30,-9 60,0 Q30,9 0,0" fill="#6B742C" stroke="#4F5720" stroke-width="1" />
    <ellipse cx="45" cy="18" rx="12" ry="8" fill="#586622" />
  </g>
</svg>`;
fs.writeFileSync(path.join(__dirname, '../public/images/products/spotlight-creme-tin.svg'), spotlightTinSvg);

// 7. Catalog Grid 4 Product Assets
// Catalog 1: 3 dark amber bottles cluster
const cat1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="amberDark" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#42280A" />
      <stop offset="40%" stop-color="#A16207" />
      <stop offset="65%" stop-color="#CA8A04" />
      <stop offset="100%" stop-color="#2D1A04" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="#FAFAFA" />
  <ellipse cx="200" cy="350" rx="120" ry="18" fill="#000000" opacity="0.12" />
  <!-- Left Bottle -->
  <g transform="translate(100, 80) scale(0.75)">
    <rect x="20" y="90" width="55" height="260" rx="8" fill="url(#amberDark)" />
    <path d="M20,90 Q20,40 38,30 L38,5 L58,5 L58,30 Q75,40 75,90 Z" fill="url(#amberDark)" />
    <rect x="36" y="-8" width="22" height="16" rx="2" fill="#D4AF37" />
    <rect x="24" y="120" width="46" height="140" fill="#FAF8EE" />
    <rect x="22" y="95" width="6" height="240" fill="#FFF" opacity="0.4" />
  </g>
  <!-- Right Bottle -->
  <g transform="translate(240, 80) scale(0.75)">
    <rect x="20" y="90" width="55" height="260" rx="8" fill="url(#amberDark)" />
    <path d="M20,90 Q20,40 38,30 L38,5 L58,5 L58,30 Q75,40 75,90 Z" fill="url(#amberDark)" />
    <rect x="36" y="-8" width="22" height="16" rx="2" fill="#D4AF37" />
    <rect x="24" y="120" width="46" height="140" fill="#FAF8EE" />
    <rect x="22" y="95" width="6" height="240" fill="#FFF" opacity="0.4" />
  </g>
  <!-- Center Bottle -->
  <g transform="translate(165, 45) scale(0.9)">
    <rect x="20" y="90" width="60" height="280" rx="10" fill="url(#amberDark)" stroke="#FAF6EE" stroke-width="0.5" />
    <path d="M20,90 Q20,40 40,30 L40,5 L60,5 L60,30 Q80,40 80,90 Z" fill="url(#amberDark)" />
    <rect x="38" y="-10" width="24" height="18" rx="2" fill="#C59B27" />
    <rect x="25" y="130" width="50" height="160" fill="#FAF8EE" stroke="#6B742C" stroke-width="0.8" />
    <text x="50" y="165" font-family="sans-serif" font-size="8" font-weight="700" fill="#2C2C2C" text-anchor="middle">APIA</text>
    <text x="50" y="185" font-family="sans-serif" font-size="6" fill="#6B742C" text-anchor="middle">ARGAN BIO</text>
    <rect x="23" y="95" width="8" height="260" fill="#FFF" opacity="0.45" />
  </g>
</svg>`;
fs.writeFileSync(path.join(__dirname, '../public/images/products/catalog-1-cluster.svg'), cat1Svg);

// Catalog 2: Luxury white box set with dropper and botanical extracts
const cat2Svg = product2Svg;
fs.writeFileSync(path.join(__dirname, '../public/images/products/catalog-2-giftset.svg'), cat2Svg);

// Catalog 3: Apothecary set with jars & amber dropper bottles
const cat3Svg = product2Svg;
fs.writeFileSync(path.join(__dirname, '../public/images/products/catalog-3-apothecary.svg'), cat3Svg);

// Catalog 4: Two tall slim dark glass terroir bottles with gold neck foil
const cat4Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="terroirGoldNeck" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1E2310" />
      <stop offset="35%" stop-color="#4B5620" />
      <stop offset="65%" stop-color="#6F802A" />
      <stop offset="100%" stop-color="#161A0C" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="#FAFAFA" />
  <ellipse cx="200" cy="355" rx="110" ry="16" fill="#000000" opacity="0.12" />
  <!-- Bottle 1 -->
  <g transform="translate(130, 40) scale(0.85)">
    <rect x="20" y="100" width="60" height="290" rx="10" fill="url(#terroirGoldNeck)" />
    <path d="M20,100 Q20,40 40,30 L40,0 L60,0 L60,30 Q80,40 80,100 Z" fill="url(#terroirGoldNeck)" />
    <rect x="38" y="-12" width="24" height="45" fill="#D4AF37" rx="1" />
    <rect x="25" y="140" width="50" height="170" fill="#FAF8EE" stroke="#6B742C" stroke-width="0.8" />
    <text x="50" y="175" font-family="sans-serif" font-size="8" font-weight="700" fill="#2C2C2C" text-anchor="middle">APIA</text>
    <text x="50" y="195" font-family="sans-serif" font-size="6.5" fill="#6B742C" text-anchor="middle">CUVÉE BIO</text>
    <rect x="23" y="105" width="8" height="270" fill="#FFF" opacity="0.4" />
  </g>
  <!-- Bottle 2 -->
  <g transform="translate(205, 40) scale(0.85)">
    <rect x="20" y="100" width="60" height="290" rx="10" fill="url(#terroirGoldNeck)" />
    <path d="M20,100 Q20,40 40,30 L40,0 L60,0 L60,30 Q80,40 80,100 Z" fill="url(#terroirGoldNeck)" />
    <rect x="38" y="-12" width="24" height="45" fill="#D4AF37" rx="1" />
    <rect x="25" y="140" width="50" height="170" fill="#FAF8EE" stroke="#6B742C" stroke-width="0.8" />
    <text x="50" y="175" font-family="sans-serif" font-size="8" font-weight="700" fill="#2C2C2C" text-anchor="middle">APIA</text>
    <text x="50" y="195" font-family="sans-serif" font-size="6.5" fill="#6B742C" text-anchor="middle">RÉSERVE</text>
    <rect x="23" y="105" width="8" height="270" fill="#FFF" opacity="0.4" />
  </g>
</svg>`;
fs.writeFileSync(path.join(__dirname, '../public/images/products/catalog-4-slim-bottles.svg'), cat4Svg);

// 8. Multi-depth Parallax Foliage Leaves
// Leaf Sharp 1
const leafSharp1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="200" height="120">
  <defs>
    <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8FA034" />
      <stop offset="45%" stop-color="#6B742C" />
      <stop offset="85%" stop-color="#4F5720" />
      <stop offset="100%" stop-color="#343A14" />
    </linearGradient>
  </defs>
  <path d="M10,60 C40,20 120,10 190,60 C120,110 40,100 10,60 Z" fill="url(#leafGrad1)" stroke="#3A4016" stroke-width="1.2" />
  <!-- Central Vein -->
  <path d="M10,60 Q100,58 186,60" fill="none" stroke="#B0C447" stroke-width="1.8" />
  <!-- Side Veins -->
  <path d="M40,59 Q60,40 80,30 M70,59 Q95,40 120,28 M100,60 Q130,42 155,35" fill="none" stroke="#9AB038" stroke-width="0.9" opacity="0.75" />
  <path d="M40,61 Q60,80 80,90 M70,61 Q95,80 120,92 M100,60 Q130,78 155,85" fill="none" stroke="#5E6723" stroke-width="0.9" opacity="0.65" />
  <!-- Dew Drop -->
  <ellipse cx="120" cy="45" rx="5" ry="3.5" fill="#FFFFFF" opacity="0.6" />
</svg>`;
fs.writeFileSync(path.join(__dirname, '../public/images/foliage/leaf-sharp-1.svg'), leafSharp1);

// Leaf Sharp 2
const leafSharp2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140" width="220" height="140">
  <defs>
    <linearGradient id="leafGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4D561F" />
      <stop offset="50%" stop-color="#7D8735" />
      <stop offset="100%" stop-color="#9EAA4F" />
    </linearGradient>
  </defs>
  <path d="M15,70 C50,15 140,5 205,70 C140,135 50,125 15,70 Z" fill="url(#leafGrad2)" stroke="#384015" stroke-width="1" />
  <path d="M15,70 Q110,68 200,70" fill="none" stroke="#C4D658" stroke-width="2" />
</svg>`;
fs.writeFileSync(path.join(__dirname, '../public/images/foliage/leaf-sharp-2.svg'), leafSharp2);

// Leaf Blur (Foreground DOF)
const leafBlur = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 160" width="260" height="160">
  <defs>
    <filter id="dofBlur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="7" />
    </filter>
  </defs>
  <g filter="url(#dofBlur)">
    <path d="M20,80 C60,20 170,10 240,80 C170,150 60,140 20,80 Z" fill="#6B742C" opacity="0.85" />
    <path d="M20,80 Q130,78 236,80" fill="none" stroke="#A8BC3F" stroke-width="3" opacity="0.7" />
  </g>
</svg>`;
fs.writeFileSync(path.join(__dirname, '../public/images/foliage/leaf-blur-1.svg'), leafBlur);
fs.writeFileSync(path.join(__dirname, '../public/images/foliage/leaf-blur-2.svg'), leafBlur);

// 9. Newsletter Banner Olive Branch (Plump Green Olives on Branch)
const newsletterBranchSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <linearGradient id="branchWood" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4A3B2C" />
      <stop offset="100%" stop-color="#7B644B" />
    </linearGradient>
    <radialGradient id="plumpOlive" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#A6BE3C" />
      <stop offset="40%" stop-color="#7A8E26" />
      <stop offset="85%" stop-color="#485715" />
      <stop offset="100%" stop-color="#283309" />
    </radialGradient>
    <filter id="branchShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="-6" dy="10" stdDeviation="10" flood-color="#000" flood-opacity="0.25"/>
    </filter>
  </defs>

  <g transform="translate(100, 20)" filter="url(#branchShadow)">
    <!-- Branch Stem -->
    <path d="M380,40 Q250,140 120,240 Q60,300 0,400" fill="none" stroke="url(#branchWood)" stroke-width="8" stroke-linecap="round" />
    <path d="M220,165 Q180,220 160,290" fill="none" stroke="url(#branchWood)" stroke-width="5" stroke-linecap="round" />
    
    <!-- Big Plump Olive 1 -->
    <g transform="translate(160, 290)">
      <ellipse cx="0" cy="0" rx="36" ry="46" fill="url(#plumpOlive)" transform="rotate(15)" />
      <ellipse cx="-10" cy="-14" rx="10" ry="16" fill="#D3E66E" opacity="0.45" transform="rotate(15)" />
    </g>

    <!-- Plump Olive 2 -->
    <g transform="translate(230, 360)">
      <ellipse cx="0" cy="0" rx="34" ry="44" fill="url(#plumpOlive)" transform="rotate(-20)" />
      <ellipse cx="-8" cy="-12" rx="9" ry="14" fill="#D3E66E" opacity="0.4" transform="rotate(-20)" />
    </g>

    <!-- Olive 3 -->
    <g transform="translate(320, 240)">
      <ellipse cx="0" cy="0" rx="30" ry="40" fill="url(#plumpOlive)" transform="rotate(40)" />
      <ellipse cx="-8" cy="-10" rx="8" ry="12" fill="#D3E66E" opacity="0.4" transform="rotate(40)" />
    </g>

    <!-- Surrounding Fresh Leaves -->
    <g transform="translate(140, 200) rotate(-40)">
      <path d="M0,0 Q60,-20 120,0 Q60,20 0,0" fill="#7D8735" stroke="#4F5720" stroke-width="1.2" />
      <line x1="0" y1="0" x2="116" y2="0" stroke="#A8BC3F" stroke-width="1.4" />
    </g>
    <g transform="translate(200, 140) rotate(25)">
      <path d="M0,0 Q70,-22 140,0 Q70,22 0,0" fill="#6B742C" stroke="#3D4517" stroke-width="1.2" />
      <line x1="0" y1="0" x2="135" y2="0" stroke="#BDD24B" stroke-width="1.4" />
    </g>
    <g transform="translate(110, 260) rotate(60)">
      <path d="M0,0 Q50,-18 100,0 Q50,18 0,0" fill="#8C9A35" stroke="#525E1C" stroke-width="1" />
    </g>
  </g>
</svg>`;
fs.writeFileSync(path.join(__dirname, '../public/images/brand/newsletter-branch.svg'), newsletterBranchSvg);

// 10. Testimonial Background: Darkened Warm Store-Shelf Boutique
const storeShelfBg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="woodShelfDark" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#241B14" />
      <stop offset="50%" stop-color="#382A1E" />
      <stop offset="100%" stop-color="#19120D" />
    </linearGradient>
    <linearGradient id="vignetteDark" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.82" />
      <stop offset="50%" stop-color="#1B1712" stop-opacity="0.75" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.88" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#woodShelfDark)" />
  
  <!-- Shelves with blurred apothecary glass bottles -->
  <g opacity="0.25">
    <rect x="0" y="160" width="800" height="14" fill="#5A4330" />
    <rect x="0" y="340" width="800" height="14" fill="#5A4330" />
    <!-- Row 1 Bottles -->
    <rect x="80" y="60" width="30" height="100" rx="4" fill="#C59B27" />
    <rect x="130" y="50" width="35" height="110" rx="4" fill="#7D8735" />
    <rect x="190" y="70" width="28" height="90" rx="4" fill="#D4AF37" />
    <rect x="240" y="45" width="40" height="115" rx="5" fill="#6B742C" />
    <rect x="520" y="50" width="32" height="110" rx="4" fill="#C59B27" />
    <rect x="580" y="65" width="36" height="95" rx="4" fill="#8C9A35" />
    <rect x="640" y="40" width="42" height="120" rx="4" fill="#D4AF37" />
    <!-- Row 2 Bottles -->
    <rect x="70" y="220" width="38" height="120" rx="5" fill="#7D8735" />
    <rect x="130" y="235" width="32" height="105" rx="4" fill="#C59B27" />
    <rect x="620" y="215" width="44" height="125" rx="5" fill="#6B742C" />
    <rect x="685" y="230" width="36" height="110" rx="4" fill="#D4AF37" />
  </g>

  <!-- Heavy Warm Vignette Overlay -->
  <rect width="800" height="500" fill="url(#vignetteDark)" />
</svg>`;
fs.writeFileSync(path.join(__dirname, '../public/images/brand/store-shelf-bg.svg'), storeShelfBg);

console.log('All vector assets created successfully!');

