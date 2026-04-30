"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { GitHubRepo } from "@/lib/github";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Offbeat from "@/components/sections/Offbeat";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import WaveformDivider from "@/components/ui/WaveformDivider";

type PortfolioShellProps = {
  repos: GitHubRepo[];
};

export default function PortfolioShell({ repos }: PortfolioShellProps) {
  const [heroReady, setHeroReady] = useState(false);
  const [timerReady, setTimerReady] = useState(false);
  const [failsafeReady, setFailsafeReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setTimerReady(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const failsafe = window.setTimeout(() => setFailsafeReady(true), 7000);
    return () => window.clearTimeout(failsafe);
  }, []);

  const loading = !((heroReady && timerReady) || failsafeReady);

  return (
    <MotionConfig reducedMotion="user">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "rgba(17,17,25,0.95)",
            color: "#f0f0f0",
            border: "1px solid rgba(255,255,255,0.12)"
          }
        }}
      />
      <div className="noise-overlay" />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <AnimatePresence>{loading ? <LoadingScreen /> : null}</AnimatePresence>
      <motion.div
        animate={{ opacity: loading ? 0.18 : 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <main id="main-content">
          <Hero onSceneReady={() => setHeroReady(true)} />
          <WaveformDivider variant={1} idSuffix="hero-about" />
          <About />
          <WaveformDivider variant={2} idSuffix="about-experience" />
          <Experience />
          <WaveformDivider variant={3} idSuffix="experience-skills" />
          <Skills />
          <WaveformDivider variant={4} idSuffix="skills-projects" />
          <Projects repos={repos} />
          <WaveformDivider variant={1} idSuffix="projects-achievements" />
          <Achievements />
          <WaveformDivider variant={2} idSuffix="achievements-offbeat" />
          <Offbeat />
          <WaveformDivider variant={3} idSuffix="offbeat-resume" />
          <Resume />
          <WaveformDivider variant={4} idSuffix="resume-contact" />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </MotionConfig>
  );
}
