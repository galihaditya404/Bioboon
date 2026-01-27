/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Dark Mode (The Void)
        void: '#050907',
        moss: '#1a2f23',
        bio: {
          400: '#4ade80',
          500: '#10b981',
          glow: '#d9f99d',
        },
        alert: '#ff4d4d',
        pale: '#ecfccb',

        // Light Mode (Daylight)
        day: {
          bg: '#f0fdf4', // Soft Mint
          surface: '#ffffff',
          text: '#14532d', // Deep Forest
          border: '#bbf7d0',
        }
      },
      fontFamily: {
        sans: ['"Space Mono"', 'monospace'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
      backgroundImage: {
        'noise': "url('/assets/noise.png')",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
