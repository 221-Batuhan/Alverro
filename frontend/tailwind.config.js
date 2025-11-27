/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ALVERRO Luxury Palette
        charcoal: {
          DEFAULT: '#0E0E0F',
          light: '#1A1A1B',
        },
        emerald: {
          DEFAULT: '#0F3E36',
          light: '#1A5A4F',
          dark: '#0A2B25',
        },
        burgundy: {
          DEFAULT: '#4A0E1F',
          light: '#6B1A2F',
          dark: '#3A0B18',
        },
        gold: {
          DEFAULT: '#C9A86A',
          light: '#D4B888',
          dark: '#B8964F',
        },
        warmWhite: {
          DEFAULT: '#EDE8E3',
          light: '#F5F2EF',
          dark: '#E0D9D1',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant', 'Lora', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-down': 'slideDown 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
