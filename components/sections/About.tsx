"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ALL_TECH, BIO_PARAGRAPHS, PERSONAL } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";

const ThreeProvider = dynamic(() => import("@/components/providers/ThreeProvider"), {
  ssr: false
});
const GlowOrb = dynamic(() => import("@/components/canvas/GlowOrb"), { ssr: false });

const sectionMotion = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  viewport: { once: true, margin: "-80px" }
} as const;

export default function About() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section id="about" className="section-shell relative z-10 py-10 md:py-16">
      <motion.div {...sectionMotion}>
        <SectionLabel code="FREQUENCY 002" title="ABOUT" />
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-4"
            >
              {BIO_PARAGRAPHS.map((paragraph) => (
                <motion.p
                  key={paragraph}
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  className="readable-body readable-paragraph text-[15px] leading-relaxed md:text-base"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            <p className="mt-6 text-sm text-[rgb(170,221,237)]">Location: {PERSONAL.location}</p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } }
              }}
              className="mt-7 flex flex-wrap gap-2"
            >
              {ALL_TECH.slice(0, 12).map((tech) => (
                <motion.span
                  key={tech}
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  className="rounded-full border border-[rgba(0,212,255,0.2)] bg-[rgba(0,212,255,0.1)] px-3 py-1 text-xs text-freq-ai"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <div className="glass-card h-[360px] overflow-hidden p-2 md:h-[430px]">
            <ThreeProvider
              className="h-full w-full"
              cameraPosition={[0, 0, 5.8]}
              fov={50}
              dpr={isMobile ? [1, 1.25] : [1, 1.8]}
            >
              <Suspense fallback={null}>
                <GlowOrb isMobile={isMobile} />
              </Suspense>
            </ThreeProvider>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
