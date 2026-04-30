import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#0a0a0a",
        surface: "#111119",
        primaryText: "#f0f0f0",
        secondaryText: "#8892a4",
        mutedText: "#505868",
        freq: {
          ai: "#00d4ff",
          music: "#a855f7",
          soccer: "#22c55e",
          trekking: "#f59e0b",
          cooking: "#ef4444",
          journal: "#6366f1",
          data: "#14b8a6",
          lang: "#ec4899"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 212, 255, 0.22)",
        pulse: "0 0 24px rgba(168, 85, 247, 0.26)"
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.08)" }
        },
        waveSlide: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        drift: "drift 5s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.8s ease-in-out infinite",
        waveSlide: "waveSlide 9s linear infinite"
      },
      backgroundImage: {
        "freq-gradient": "linear-gradient(135deg, #00d4ff, #a855f7)"
      }
    }
  },
  plugins: []
};

export default config;
