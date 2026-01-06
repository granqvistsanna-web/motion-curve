/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Framer theme colors - automatically adapt to dark/light mode
        theme: {
          bg: 'var(--framer-color-bg)',
          'bg-secondary': 'var(--framer-color-bg-secondary)',
          'bg-tertiary': 'var(--framer-color-bg-tertiary)',
          text: 'var(--framer-color-text)',
          'text-reversed': 'var(--framer-color-text-reversed)',
          'text-secondary': 'var(--framer-color-text-secondary)',
          'text-tertiary': 'var(--framer-color-text-tertiary)',
          tint: 'var(--framer-color-tint)',
          'tint-dimmed': 'var(--framer-color-tint-dimmed)',
          'tint-dark': 'var(--framer-color-tint-dark)',
          divider: 'var(--framer-color-divider)',
        },
      },
    },
  },
  plugins: [],
}
