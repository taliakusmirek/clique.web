/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'obsidian': '#0A0A0A',
        'cool-gray': '#94A3B8',
        'ai-purple': '#A020F0',
        'ai-purple-dark': '#2D0845',
        'soft-lavender': '#E6E6FA',
        'holographic': {
          start: '#E0E0E0',
          middle: '#C2C2C2',
          end: '#A4A4A4'
        }
      },
      backgroundImage: {
        'holographic': 'linear-gradient(45deg, #E0E0E0 0%, #C2C2C2 50%, #A4A4A4 100%)',
        'mirror-reflection': 'linear-gradient(180deg, rgba(160, 32, 240, 0.1) 0%, rgba(45, 8, 69, 0.2) 100%)',
      },
      fontFamily: {
        'neue-machina': ['Neue Machina', 'sans-serif'],
        'handwritten': ['Caveat', 'cursive'],
      },
      animation: {
        'pulse-scan': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'particle': 'particle 3s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: .5 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0,245,255,0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(0,245,255,0.8)' },
        },
        particle: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: 1 },
          '100%': { transform: 'translateY(-100px) scale(0)', opacity: 0 },
        },
      },
      boxShadow: {
        'mirror': '0 0 20px rgba(0,245,255,0.3)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    }
  ],
} 