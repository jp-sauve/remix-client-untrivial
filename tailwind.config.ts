import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors';

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#F44250",
          yellow: "#FECC1B",
          green: "#6BD968",
        }
      }
    },
  },
  plugins: [],
} satisfies Config

