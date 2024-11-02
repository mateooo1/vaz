import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Instrument Serif", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
