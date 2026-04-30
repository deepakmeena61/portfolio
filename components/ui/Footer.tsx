import { PERSONAL } from "@/lib/constants";

const iconClass = "h-5 w-5 fill-none stroke-current stroke-[1.8]";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-transparent pb-10 pt-8">
      <div className="section-shell">
        <div className="gradient-line mb-8 opacity-80" />
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-secondaryText">
            &copy; 2026 Deepak Meena. Built with Next.js, Three.js &amp; Framer Motion.
          </p>

          <div className="flex flex-wrap items-center gap-5 text-secondaryText">
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-freq-ai"
              aria-label="GitHub profile"
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
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-freq-ai"
              aria-label="LinkedIn profile"
            >
              <svg viewBox="0 0 24 24" className={iconClass}>
                <rect x="3.5" y="3.5" width="17" height="17" rx="2.2" />
                <path d="M8 10.3v6.1M8 7.7h0M12 16.4v-3.5c0-1.5 2-1.4 2 0v3.5M12 12.2c0-2.5 4-2.7 4 .7v3.5" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-freq-ai"
              aria-label="Send email"
            >
              <svg viewBox="0 0 24 24" className={iconClass}>
                <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                <path d="m4.5 7 7.5 5 7.5-5" />
              </svg>
              <span>Email</span>
            </a>
            <a
              href="/Deepak_Meena_Resume.pdf"
              download
              className="text-sm text-freq-ai transition-colors hover:text-[rgb(130,227,255)]"
            >
              Resume
            </a>
          </div>
        </div>
        <p className="mt-5 text-xs text-mutedText">
          Currently mixing beats &amp; training models 🎧
        </p>
      </div>
    </footer>
  );
}
