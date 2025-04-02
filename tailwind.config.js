/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'obsidian': '#050A0B',
        'cool-gray': '#9FABAE',
        'ai-purple': '#66909E',
        'ai-purple-dark': '#344B53',
        'soft-lavender': '#FFFFFF',
        'text-primary': '#050A0B',
        'holographic': {
          start: '#E0E0E0',
          middle: '#C2C2C2',
          end: '#A4A4A4'
        }
      },
      backgroundImage: {
        'holographic': 'linear-gradient(45deg, #E0E0E0 0%, #C2C2C2 50%, #A4A4A4 100%)',
        'mirror-reflection': 'linear-gradient(180deg, rgba(102, 144, 158, 0.1) 0%, rgba(52, 75, 83, 0.2) 100%)',
        'hero-gradient': 'linear-gradient(to bottom, rgba(5, 10, 11, 0.8) 0%, rgba(5, 10, 11, 0.4) 50%, rgba(5, 10, 11, 0) 100%)',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['Space Grotesk', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        'widest': '0.2em',
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
          '0%, 100%': { boxShadow: '0 0 15px rgba(102,144,158,0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(102,144,158,0.8)' },
        },
        particle: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: 1 },
          '100%': { transform: 'translateY(-100px) scale(0)', opacity: 0 },
        },
      },
      boxShadow: {
        'mirror': '0 0 20px rgba(102,144,158,0.3)',
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