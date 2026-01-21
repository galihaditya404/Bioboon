/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: '#050907', // Deepest background
        moss: '#1a2f23', // Organic texture/secondary
        bio: {
          400: '#4ade80', // Standard vitality
          500: '#10b981',
          glow: '#d9f99d', // Bioluminescence
        },
        alert: '#ff4d4d',
        pale: '#ecfccb', // Text
      },
      fontFamily: {
        sans: ['"Space Mono"', 'monospace'], // Technical data look
        serif: ['"Cormorant Garamond"', 'serif'], // Organic/Human touch
      },
      backgroundImage: {
        'noise': "url('/assets/noise.png')", // We will use CSS filter instead for noise
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
