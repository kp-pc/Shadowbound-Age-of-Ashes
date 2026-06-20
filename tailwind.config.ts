import type { Config } from "tailwindcss";
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        darkFantasy: {
          primary: "#2A0845",
          secondary: "#4A1456",
          accent: "#6B206D",
          highlight: "#E0B0FF",
          shadow: "#1A0828",
          border: "#3A1446"
        },
        gothic: {
          serif: "'Gothic Serif', serif",
          display: "'Dark Fantasy Display', serif"
        }
      },
      fontFamily: {
        gothic: [
          "'Gothic Serif', serif",
          "'Dark Fantasy Display', serif"
        ]
      },
      keyframes: {
        "spell-cast": {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.1)" }
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;
