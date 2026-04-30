"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { sendContactEmail } from "@/lib/emailjs";
import { PERSONAL } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";

const ThreeProvider = dynamic(() => import("@/components/providers/ThreeProvider"), {
  ssr: false
});
const ParticleField = dynamic(() => import("@/components/canvas/ParticleField"), { ssr: false });

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

const iconClass = "h-5 w-5 fill-none stroke-current stroke-[1.8]";

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please complete all fields.");
      return;
    }
    setSending(true);
    try {
      await sendContactEmail(form);
      toast.success("Message sent successfully.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Unable to send right now. Please email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-shell relative z-10 py-8 md:py-14">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl opacity-70">
        <ThreeProvider
          className="h-full w-full"
          cameraPosition={[0, 0, 6.8]}
          dpr={isMobile ? [1, 1.2] : [1, 1.6]}
        >
          <Suspense fallback={null}>
            <ParticleField count={isMobile ? 80 : 170} spread={12} />
          </Suspense>
        </ThreeProvider>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative"
      >
        <SectionLabel code="FREQUENCY 009" title="CONNECT" />
        <h2 className="font-heading max-w-3xl text-3xl text-primaryText md:text-4xl">
          Want to collaborate on applied AI, GenAI, or data products? Send a message below.
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-5">
          <form
            onSubmit={handleSubmit}
            className="glass-card md:col-span-3 space-y-4 p-6"
            aria-label="Contact form"
          >
            <div>
              <label htmlFor="name" className="mb-1 block text-sm text-secondaryText">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={(event) => setForm((old) => ({ ...old, name: event.target.value }))}
                className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-primaryText outline-none transition-colors focus:border-freq-ai focus:ring-2 focus:ring-[rgba(0,212,255,0.2)]"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-secondaryText">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={(event) => setForm((old) => ({ ...old, email: event.target.value }))}
                className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-primaryText outline-none transition-colors focus:border-freq-ai focus:ring-2 focus:ring-[rgba(0,212,255,0.2)]"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm text-secondaryText">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={(event) => setForm((old) => ({ ...old, message: event.target.value }))}
                rows={5}
                className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-primaryText outline-none transition-colors focus:border-freq-ai focus:ring-2 focus:ring-[rgba(0,212,255,0.2)]"
                required
              />
            </div>
            <button type="submit" className="button-gradient w-full disabled:opacity-60" disabled={sending}>
              {sending ? "Sending..." : "Send message"}
            </button>
          </form>

          <aside className="glass-card md:col-span-2 p-6">
            <p className="text-sm text-secondaryText">
              Or email me directly at{" "}
              <a className="text-freq-ai hover:text-[rgb(149,230,255)]" href={`mailto:${PERSONAL.email}`}>
                {PERSONAL.email}
              </a>
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-secondaryText">
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="inline-flex items-center gap-2 text-sm transition-colors hover:text-freq-ai"
              >
                <svg viewBox="0 0 24 24" className={iconClass}>
                  <path d="M9 18.5c-3.5 1.1-3.5-1.8-4.9-2.2m9.8 4.4v-2.8c0-.9.3-1.8.8-2.4-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.2-3.2 4.3 4.3 0 0 1 .1-3.2s1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.3 4.3 0 0 1 .1 3.2 4.7 4.7 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .6.6.9 1.5.8 2.4v2.8" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex items-center gap-2 text-sm transition-colors hover:text-freq-ai"
              >
                <svg viewBox="0 0 24 24" className={iconClass}>
                  <rect x="3.5" y="3.5" width="17" height="17" rx="2.2" />
                  <path d="M8 10.3v6.1M8 7.7h0M12 16.4v-3.5c0-1.5 2-1.4 2 0v3.5M12 12.2c0-2.5 4-2.7 4 .7v3.5" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${PERSONAL.email}`}
                aria-label="Send email"
                className="inline-flex items-center gap-2 text-sm transition-colors hover:text-freq-ai"
              >
                <svg viewBox="0 0 24 24" className={iconClass}>
                  <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                  <path d="m4.5 7 7.5 5 7.5-5" />
                </svg>
                <span>Email</span>
              </a>
            </div>

            <a
              href="/Deepak_Meena_Resume.pdf"
              download
              className="mt-6 inline-flex text-sm text-freq-ai hover:text-[rgb(149,230,255)]"
            >
              Download my resume
            </a>
          </aside>
        </div>
      </motion.div>
    </section>
  );
}
