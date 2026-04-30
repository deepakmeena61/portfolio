"use client";

import { motion } from "framer-motion";
import type { JSX } from "react";

type HobbyCardProps = {
  title: string;
  description: string;
  accent: string;
  icon: "soccer" | "mountain" | "headphones" | "flame" | "journal";
};

const iconFor = (icon: HobbyCardProps["icon"]): JSX.Element => {
  switch (icon) {
    case "soccer":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.8]">
          <circle cx="12" cy="12" r="8.6" />
          <path d="M12 7.8 8.8 10l1 3.7H14l1-3.7zM8.8 10 6.4 8.9M15.2 10l2.4-1.1M9.8 13.7l-2 2.8M14.2 13.7l2 2.8M12 7.8V5.4" />
        </svg>
      );
    case "mountain":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.8]">
          <path d="M3.5 18.5 10.2 7.2l2.4 4.2 1.8-2.8 6.1 9.9z" />
          <path d="m9.9 7.6 1.4-2.2 2.1 3.2" />
        </svg>
      );
    case "headphones":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.8]">
          <path d="M4.5 13.5a7.5 7.5 0 0 1 15 0" />
          <rect x="3.8" y="13.2" width="4" height="6.3" rx="1.4" />
          <rect x="16.2" y="13.2" width="4" height="6.3" rx="1.4" />
        </svg>
      );
    case "flame":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.8]">
          <path d="M12.1 3.9c2.3 3 4.8 4.6 4.8 8.2a5 5 0 1 1-10 0c0-2.4 1.4-4.6 3.4-6.3.5 2 1.7 2.8 1.8 2.8s.5-2 .1-4.7z" />
        </svg>
      );
    case "journal":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.8]">
          <rect x="5.2" y="4.4" width="13.6" height="15.2" rx="1.6" />
          <path d="M8.6 8.5h6.8M8.6 12h6.8M8.6 15.5h4.2" />
        </svg>
      );
    default:
      return <></>;
  }
};

export default function HobbyCard({ title, description, accent, icon }: HobbyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -4 }}
      className="glass-card group relative h-full overflow-hidden p-6"
      style={{
        borderTop: `3px solid ${accent}`
      }}
    >
      <span
        className="absolute right-5 top-5 opacity-65 transition-opacity group-hover:opacity-90"
        style={{ color: accent }}
        aria-hidden
      >
        {iconFor(icon)}
      </span>
      <h3 className="font-heading text-xl font-semibold text-primaryText">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-secondaryText">{description}</p>
    </motion.article>
  );
}
