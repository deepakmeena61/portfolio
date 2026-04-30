"use client";

import type { JSX } from "react";
import { motion } from "framer-motion";
import { ACHIEVEMENTS } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";

const iconClass = "h-6 w-6 fill-none stroke-current stroke-[1.8]";

function iconFor(kind: string): JSX.Element {
  if (kind === "brain") {
    return (
      <svg viewBox="0 0 24 24" className={iconClass}>
        <path d="M9.4 5.5a2.8 2.8 0 0 0-4.2 2.4v.4A2.7 2.7 0 0 0 4.8 13a2.8 2.8 0 0 0 2.8 4h.5M14.6 5.5a2.8 2.8 0 0 1 4.2 2.4v.4a2.7 2.7 0 0 1 .4 4.7 2.8 2.8 0 0 1-2.8 4h-.5M9.2 7.5c0-1.9 1.3-3.3 2.8-3.3s2.8 1.4 2.8 3.3M9.2 17.2c0 1.9 1.3 3.3 2.8 3.3s2.8-1.4 2.8-3.3M12 8.4v7.2M9.2 12h5.6" />
      </svg>
    );
  }
  if (kind === "chart") {
    return (
      <svg viewBox="0 0 24 24" className={iconClass}>
        <path d="M4 18.5h16M7 16V9M12 16V6M17 16v-4" />
      </svg>
    );
  }
  if (kind === "bot") {
    return (
      <svg viewBox="0 0 24 24" className={iconClass}>
        <rect x="5" y="8" width="14" height="10" rx="2" />
        <circle cx="9.5" cy="13" r="1" />
        <circle cx="14.5" cy="13" r="1" />
        <path d="M12 8V5.5M9 18v1.8M15 18v1.8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={iconClass}>
      <path d="M12 3.6v16.8M8 7.6H6.7A2.7 2.7 0 0 0 4 10.3c0 1.5 1.2 2.7 2.7 2.7H8m0-5.4h4.8a3 3 0 1 1 0 6H8m8 0h1.3a2.7 2.7 0 1 1 0 5.4H16" />
    </svg>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="section-shell relative z-10 py-6 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <SectionLabel code="FREQUENCY 006" title="RESONANCE" />
        <h2 className="font-heading text-3xl text-primaryText md:text-4xl">
          Selected outcomes from GenAI, ML, and analytics initiatives.
        </h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-8 grid gap-4 md:grid-cols-2"
        >
          {ACHIEVEMENTS.map((item) => (
            <motion.article
              key={item.title}
              variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
              className="glass-card border-l-[3px] border-l-freq-ai p-6"
            >
              <div className="mb-3 text-freq-ai">{iconFor(item.icon)}</div>
              <h3 className="font-heading text-xl text-primaryText">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-secondaryText">{item.detail}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
