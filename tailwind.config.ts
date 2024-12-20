import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "mainColor": "#3CB731",
        "mainRed": "#FF3A3E",
        "mainBlue": "#2676FF",
        "mainHover": "#35A42C",
        "mainRedHover": "#E03437",
        "mainBlueHover": "#2266DC"
      },
    },
  },
  plugins: [],
} satisfies Config;
