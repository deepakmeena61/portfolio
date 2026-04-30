"use client";

import { motion } from "framer-motion";
import { GitHubRepo } from "@/lib/github";

type ProjectCardProps = {
  repo: GitHubRepo;
  featured?: boolean;
  summaryOverride?: string;
};

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#00d4ff",
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Jupyter: "#f59e0b",
  HTML: "#f97316",
  CSS: "#6366f1",
  Shell: "#16a34a"
};

export default function ProjectCard({
  repo,
  featured = false,
  summaryOverride
}: ProjectCardProps) {
  const language = repo.language ?? "Code";
  const languageColor = LANGUAGE_COLORS[language] ?? "#8892a4";
  const description = summaryOverride ?? repo.description ?? "Project details available on GitHub.";

  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -4 }}
      className={`glass-card group h-full rounded-2xl border border-[rgba(255,255,255,0.1)] transition-all duration-300 hover:border-[rgba(0,212,255,0.35)] ${
        featured ? "p-7" : "p-5"
      }`}
    >
      <h3 className={`font-heading text-primaryText ${featured ? "text-2xl" : "text-lg"}`}>
        {repo.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-secondaryText">{description}</p>
      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-secondaryText">
        <span className="inline-flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: languageColor }}
            aria-hidden
          />
          {language}
        </span>
        <span>Stars: {repo.stargazers_count}</span>
        <span>Forks: {repo.forks_count}</span>
      </div>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex text-sm text-freq-ai transition-colors group-hover:text-[rgb(133,227,255)]"
      >
        View on GitHub
      </a>
    </motion.article>
  );
}
