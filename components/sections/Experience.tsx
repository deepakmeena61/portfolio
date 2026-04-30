"use client";

import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import TimelineCard from "@/components/ui/TimelineCard";

export default function Experience() {
  return (
    <section id="experience" className="section-shell relative z-10 py-6 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <SectionLabel code="FREQUENCY 003" title="EXPERIENCE" />
        <h2 className="font-heading max-w-3xl text-3xl text-primaryText md:text-4xl">
          Roles across applied ML, analytics, and product-facing data science.
        </h2>

        <div className="relative mt-10">
          <div className="absolute bottom-0 left-[11px] top-0 w-[2px] bg-gradient-to-b from-freq-ai to-freq-music md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-9">
            {EXPERIENCE.map((item, index) => {
              const onRight = index % 2 === 1;
              return (
                <div
                  key={item.role}
                  className={`relative flex pl-10 md:pl-0 ${onRight ? "md:justify-start" : "md:justify-end"}`}
                >
                  <span className="absolute left-0 top-8 h-6 w-6 animate-pulseSoft rounded-full border border-[rgba(255,255,255,0.2)] bg-[linear-gradient(135deg,#00d4ff,#a855f7)] md:left-1/2 md:-translate-x-1/2" />
                  <TimelineCard
                    period={item.period}
                    role={item.role}
                    company={item.company}
                    description={item.description}
                    reverse={onRight}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
