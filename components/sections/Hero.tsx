"use client";

import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PERSONAL } from "@/lib/constants";

const ThreeProvider = dynamic(() => import("@/components/providers/ThreeProvider"), {
  ssr: false
});
const HeroWaveform = dynamic(() => import("@/components/canvas/HeroWaveform"), { ssr: false });
const FloatingShapes = dynamic(() => import("@/components/canvas/FloatingShapes"), { ssr: false });
const ParticleField = dynamic(() => import("@/components/canvas/ParticleField"), { ssr: false });

type HeroProps = {
  onSceneReady?: () => void;
};

export default function Hero({ onSceneReady }: HeroProps) {
  const [typed, setTyped] = useState("");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [canUse3D, setCanUse3D] = useState<boolean>(true);
  const [signalTime, setSignalTime] = useState<string>("");
  const readySignaled = useRef(false);
  const fullText = useMemo(() => PERSONAL.heroTyping, []);

  const signalReady = useCallback(() => {
    if (readySignaled.current) return;
    readySignaled.current = true;
    onSceneReady?.();
  }, [onSceneReady]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const probe = document.createElement("canvas");
    const supported = !!(
      probe.getContext("webgl2") ||
      probe.getContext("webgl") ||
      probe.getContext("experimental-webgl")
    );
    setCanUse3D(supported);
    if (!supported) {
      signalReady();
    }
  }, [signalReady]);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/New_York"
    });

    const tick = () => setSignalTime(formatter.format(new Date()));
    tick();
    const interval = window.setInterval(tick, 60000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTyped(fullText.slice(0, index));
      if (index >= fullText.length) window.clearInterval(timer);
    }, 36);
    return () => window.clearInterval(timer);
  }, [fullText]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-24">
      {canUse3D ? (
        <div className="absolute inset-0">
          <ThreeProvider
            className="h-full w-full"
            cameraPosition={[0, 0, 8.4]}
            fov={52}
            dpr={isMobile ? [1, 1.3] : [1, 1.8]}
            onCreated={signalReady}
          >
            <Suspense fallback={null}>
              <ParticleField count={isMobile ? 90 : 220} spread={17} />
            </Suspense>
            <Suspense fallback={null}>
              <HeroWaveform isMobile={isMobile} />
            </Suspense>
            <Suspense fallback={null}>
              <FloatingShapes />
            </Suspense>
          </ThreeProvider>
        </div>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(0,212,255,0.24),transparent_35%),radial-gradient(circle_at_85%_16%,rgba(168,85,247,0.25),transparent_34%),linear-gradient(180deg,#09090f_0%,#0a0a0a_70%)]" />
      )}

      <div className="section-shell relative z-10 flex min-h-[calc(100vh-6rem)] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl text-center"
        >
          <p className="font-heading text-xs uppercase tracking-[0.28em] text-secondaryText md:text-sm">
            FREQUENCY 001 - SIGNAL
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[rgb(160,224,245)]">
            Signal Live | {signalTime} ET
          </p>
          <h1 className="font-heading mt-5 text-5xl font-bold leading-[0.95] text-primaryText md:text-8xl">
            Deepak Meena
          </h1>
          <p className="readable-chip mt-5 h-8 text-sm text-[rgb(178,236,252)] md:text-lg">{typed}</p>
          <p className="readable-chip readable-chip-contrast mx-auto mt-6 max-w-2xl text-sm italic md:text-base">
            &quot;{PERSONAL.philosophy}&quot;
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => scrollTo("about")} className="button-gradient">
              Tune In
            </button>
            <button onClick={() => scrollTo("projects")} className="button-outline">
              View Work
            </button>
            <a href="/Deepak_Meena_Resume.pdf" download className="button-outline">
              Resume ↓
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-9 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-8 items-end gap-1 opacity-80">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <span
              key={item}
              className="w-1 animate-pulseSoft rounded-full bg-gradient-to-t from-freq-ai to-freq-music"
              style={{ height: `${8 + (item % 3) * 4}px`, animationDelay: `${item * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
