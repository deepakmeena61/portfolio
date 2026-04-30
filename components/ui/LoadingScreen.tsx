"use client";

import { motion } from "framer-motion";

const bars = [0, 1, 2, 3, 4];

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.985 }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-0 z-[120] grid place-items-center bg-base"
      aria-live="polite"
    >
      <div className="text-center">
        <h2 className="font-heading text-4xl tracking-tight text-primaryText md:text-5xl">
          Deepak Meena
        </h2>
        <div className="mt-5 flex items-end justify-center gap-2">
          {bars.map((bar) => (
            <motion.span
              key={bar}
              animate={{
                height: ["10px", `${16 + (bar % 3) * 9}px`, "10px"]
              }}
              transition={{
                duration: 1.1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: bar * 0.08
              }}
              className="w-2 rounded-full bg-gradient-to-t from-freq-ai to-freq-music"
            />
          ))}
        </div>
        <p className="mt-4 text-sm text-mutedText">Tuning in...</p>
      </div>
    </motion.div>
  );
}
