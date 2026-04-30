"use client";

import { motion } from "framer-motion";

type TimelineCardProps = {
  period: string;
  role: string;
  company: string;
  description: string;
  reverse?: boolean;
};

export default function TimelineCard({
  period,
  role,
  company,
  description,
  reverse = false
}: TimelineCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, x: reverse ? 60 : -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-80px" }}
      className="glass-card relative w-full p-6 md:max-w-[48%]"
    >
      <p className="font-heading text-xs uppercase tracking-[0.16em] text-freq-ai">
        {period}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-primaryText">{role}</h3>
      <p className="mt-1 text-sm text-secondaryText">{company}</p>
      <p className="mt-4 text-sm leading-relaxed text-secondaryText">{description}</p>
    </motion.article>
  );
}
