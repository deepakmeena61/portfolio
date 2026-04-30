"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { NAV_LINKS, PERSONAL } from "@/lib/constants";

const MOBILE_TRANSITION = { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] };

export default function Navbar() {
  const [active, setActive] = useState<string>("about");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const sectionIds = useMemo(() => NAV_LINKS.map((link) => link.id), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0.05
      }
    );

    sectionIds.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80] border-b border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.7)] backdrop-blur-xl">
        <div className="section-shell flex h-16 items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            aria-label="Go to top"
            className="font-heading inline-flex items-center gap-1 text-xl font-semibold text-primaryText"
          >
            {PERSONAL.shortLogo}
            <span className="inline-flex h-2 w-2 animate-pulseSoft rounded-full bg-freq-ai" />
          </button>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                aria-current={active === link.id ? "page" : undefined}
                className={`text-sm transition-colors ${
                  active === link.id
                    ? "text-freq-ai"
                    : "text-secondaryText hover:text-primaryText"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-freq-ai focus-visible:ring-offset-2 focus-visible:ring-offset-base`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="/Deepak_Meena_Resume.pdf"
              download
              className="rounded-full border border-[rgba(0,212,255,0.4)] px-4 py-1.5 text-sm text-freq-ai transition-colors hover:bg-[rgba(0,212,255,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-freq-ai focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              Resume
            </a>
          </nav>

          <button
            className="inline-flex items-center justify-center rounded-md border border-[rgba(255,255,255,0.12)] p-2 text-secondaryText focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-freq-ai focus-visible:ring-offset-2 focus-visible:ring-offset-base md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {menuOpen ? (
                <path d="m5 5 14 14M19 5 5 19" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={MOBILE_TRANSITION}
            className="fixed inset-0 z-[75] bg-[rgba(10,10,10,0.95)] backdrop-blur-md md:hidden"
          >
            <div className="mt-24 flex flex-col items-center gap-7">
              {NAV_LINKS.map((link, index) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.06,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  onClick={() => scrollTo(link.id)}
                  aria-current={active === link.id ? "page" : undefined}
                  className={`font-heading text-2xl transition-colors ${
                    active === link.id ? "text-freq-ai" : "text-primaryText"
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-freq-ai focus-visible:ring-offset-2 focus-visible:ring-offset-base`}
                >
                  {link.label}
                </motion.button>
              ))}
              <a
                href="/Deepak_Meena_Resume.pdf"
                download
                className="button-outline mt-2"
                onClick={() => setMenuOpen(false)}
              >
                Resume
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
