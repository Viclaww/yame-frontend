import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "yame-purple": "#0a1172",
      },
      backgroundImage: {
        lines: "url('/assets/lines.png')",
        brain: "url('/assets/bigbrain.png')",
        brain2: "url('/assets/bran.png')",
        gradient1:
          "linear-gradient(to right bottom, #4F4B4B ,#FFFFFF  ,#4F4B4B 60%,#FFFFFF,#4F4B4B )",
      },
      backgroundSize: {
        "50%": "100% 110%",
      },
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
