/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#F7F8F1',
          100: '#EEF0E0',
          200: '#DDE2C1',
          300: '#C7CE9B',
          400: '#9EAA4F',
          500: '#7D8735', // Secondary Olive Green
          600: '#6B742C', // Primary Olive Gold Accent
          700: '#555C23',
          800: '#42481C',
          900: '#2F3314',
        },
        gold: {
          400: '#E5C04A',
          500: '#D4AF37', // Gold star
          600: '#B89726',
        },
        studio: {
          start: '#D9DADC',
          end: '#F4F4F5',
          alt: '#EFEFEF',
          pure: '#FFFFFF',
        },
        charcoal: {
          900: '#1A1A1A',
          800: '#2C2C2C', // Dark Text
          700: '#4A4A4A', // Nav Text
          600: '#555555',
          500: '#6E6E6E', // Muted Text
          400: '#8E8E8E',
          300: '#BFBFBF',
          200: '#E0E0E0',
          100: '#EFEFEF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'Cormorant Garamond', 'serif'],
      },
      letterSpacing: {
        widest: '0.12em',
        luxury: '0.08em',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.07)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'pill': '0 4px 20px rgba(107, 116, 44, 0.15)',
        'glow': '0 0 25px rgba(212, 175, 55, 0.35)',
      }
    },
  },
  plugins: [],
};

