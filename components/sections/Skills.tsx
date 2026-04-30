"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CERTIFICATIONS, SKILL_BANDS } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import SkillBadge from "@/components/ui/SkillBadge";

const ThreeProvider = dynamic(() => import("@/components/providers/ThreeProvider"), {
  ssr: false
});
const SkillSpheres = dynamic(() => import("@/components/canvas/SkillSpheres"), { ssr: false });

export default function Skills() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section id="skills" className="section-shell relative z-10 py-6 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <SectionLabel code="FREQUENCY 004" title="SPECTRUM" />
        <h2 className="font-heading text-3xl text-primaryText md:text-4xl">
          Technologies I work with, grouped by frequency band.
        </h2>

        <div className="glass-card mt-8 h-[280px] overflow-hidden p-2 md:h-[360px]">
          <ThreeProvider
            className="h-full w-full"
            cameraPosition={isMobile ? [0, 0, 9.4] : [0, 0, 8.2]}
            fov={50}
            dpr={isMobile ? [1, 1.2] : [1, 1.8]}
          >
            <Suspense fallback={null}>
              <SkillSpheres isMobile={isMobile} />
            </Suspense>
          </ThreeProvider>
        </div>

        <p className="mt-5 text-xs text-secondaryText">
          Hover a sphere to inspect each full skill group.
        </p>

        <div className="mt-4 grid gap-3 border-t border-[rgba(255,255,255,0.08)] pt-4 md:grid-cols-2 xl:grid-cols-3">
          {SKILL_BANDS.map((group) => (
            <article
              key={group.label}
              className="glass-card rounded-xl p-4"
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: group.color }}
                  aria-hidden
                />
                <h3 className="font-heading text-sm text-primaryText">{group.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <SkillBadge key={`${group.label}-${item}`} label={item} />
                ))}
              </div>
            </article>
          ))}
          <article className="glass-card rounded-xl p-4">
            <h3 className="font-heading text-sm text-primaryText">Certification</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {CERTIFICATIONS.map((item) => (
                <SkillBadge key={item} label={item} />
              ))}
            </div>
          </article>
        </div>
      </motion.div>
    </section>
  );
}
