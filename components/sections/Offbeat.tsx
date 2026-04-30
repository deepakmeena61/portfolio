"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import HobbyCard from "@/components/ui/HobbyCard";
import { HOBBIES } from "@/lib/constants";

const ThreeProvider = dynamic(() => import("@/components/providers/ThreeProvider"), {
  ssr: false
});
const MiniEqualizer = dynamic(() => import("@/components/canvas/MiniEqualizer"), { ssr: false });

const desktopOffsets = [
  "md:col-span-5",
  "md:col-span-4 md:mt-8",
  "md:col-span-3 md:mt-16",
  "md:col-span-6 md:-mt-4",
  "md:col-span-6 md:mt-4"
];

export default function Offbeat() {
  return (
    <section id="offbeat" className="section-shell relative z-10 py-6 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <SectionLabel code="FREQUENCY 007" title="OFFBEAT" />
        <h2 className="font-heading text-3xl text-primaryText md:text-4xl">
          The frequencies I tune into when the IDE is closed.
        </h2>

        <div className="glass-card mt-8 h-36 overflow-hidden p-2 md:h-44">
          <ThreeProvider className="h-full w-full" cameraPosition={[0, 0, 6]} dpr={[1, 1.3]}>
            <Suspense fallback={null}>
              <MiniEqualizer />
            </Suspense>
          </ThreeProvider>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mobile-scroll-row mt-6 md:hidden"
        >
          {HOBBIES.map((hobby) => (
            <motion.div
              key={hobby.key}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <HobbyCard
                title={hobby.title}
                description={hobby.description}
                accent={hobby.accent}
                icon={hobby.icon}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-7 hidden gap-4 md:grid md:grid-cols-12"
        >
          {HOBBIES.map((hobby, index) => (
            <motion.div
              key={hobby.key}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className={desktopOffsets[index]}
            >
              <HobbyCard
                title={hobby.title}
                description={hobby.description}
                accent={hobby.accent}
                icon={hobby.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
