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
        "mainHover": "#6AC662",
        "mainRedHover": "#FC686B",
        "mainBlueHover": "#5995FC"
      },
    },
  },
  plugins: [],
} satisfies Config;
