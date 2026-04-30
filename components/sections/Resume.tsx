"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Resume() {
  return (
    <section id="resume" className="section-shell relative z-10 py-6 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <SectionLabel code="FREQUENCY 008" title="RESUME" />
        <h2 className="font-heading text-3xl text-primaryText md:text-4xl">
          Download my full resume for a detailed look at my experience, skills, and projects.
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/Deepak_Meena_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="button-gradient"
          >
            View Resume
          </a>
          <a href="/Deepak_Meena_Resume.pdf" download className="button-outline">
            Download Resume
          </a>
        </div>

        <div className="glass-card mt-8 hidden overflow-hidden p-3 md:block">
          <iframe
            src="/Deepak_Meena_Resume.pdf"
            title="Deepak Meena Resume PDF Preview"
            className="h-[560px] w-full rounded-lg border border-[rgba(255,255,255,0.08)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
