"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FEATURED_REPOS, REPO_DESCRIPTION_OVERRIDES } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import ProjectCard from "@/components/ui/ProjectCard";
import { GitHubRepo } from "@/lib/github";

type ProjectsProps = {
  repos: GitHubRepo[];
};

const fallbackRepo = (name: string): GitHubRepo => ({
  id: name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0),
  name,
  description: "Repository details are available on GitHub.",
  html_url: "https://github.com/deepakmeena61",
  stargazers_count: 0,
  forks_count: 0,
  language: "Python",
  updated_at: "2026-01-01T00:00:00Z"
});

export default function Projects({ repos }: ProjectsProps) {
  const [language, setLanguage] = useState<string>("All");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-project-language-filter");
    if (stored) {
      setLanguage(stored);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("portfolio-project-language-filter", language);
  }, [hydrated, language]);

  const featured = useMemo(() => {
    return FEATURED_REPOS.map((item) => {
      const match =
        repos.find((repo) => repo.name.toLowerCase() === item.name.toLowerCase()) ??
        fallbackRepo(item.name);
      return { repo: match, summary: item.summary };
    });
  }, [repos]);

  const featuredNames = useMemo(
    () => new Set(FEATURED_REPOS.map((item) => item.name.toLowerCase())),
    []
  );

  const otherRepos = useMemo(() => {
    const filtered = repos.filter((repo) => !featuredNames.has(repo.name.toLowerCase()));
    if (language === "All") return filtered;
    return filtered.filter((repo) => (repo.language ?? "Unknown") === language);
  }, [featuredNames, language, repos]);

  const languages = useMemo(() => {
    const unique = new Set<string>();
    repos.forEach((repo) => unique.add(repo.language ?? "Unknown"));
    return ["All", ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, [repos]);

  useEffect(() => {
    if (!languages.includes(language)) {
      setLanguage("All");
    }
  }, [language, languages]);

  return (
    <section id="projects" className="section-shell relative z-10 py-6 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <SectionLabel code="FREQUENCY 005" title="OUTPUT" />
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl text-primaryText md:text-4xl">
              Repositories fetched at build time from the public GitHub API.
            </h2>
          </div>
          <label className="text-sm text-secondaryText">
            <span className="mb-1 block">Filter by language</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="rounded-xl border border-[rgba(255,255,255,0.14)] bg-[rgba(17,17,25,0.95)] px-3 py-2 text-sm text-primaryText outline-none focus:border-freq-ai"
              aria-label="Filter projects by language"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </label>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-8 grid gap-5 md:grid-cols-2"
        >
          {featured.map((entry) => (
            <motion.div key={entry.repo.name} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <ProjectCard repo={entry.repo} featured summaryOverride={entry.summary} />
            </motion.div>
          ))}
        </motion.div>

        <p className="font-heading mt-12 text-sm uppercase tracking-[0.24em] text-secondaryText">
          More Repositories
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {otherRepos.slice(0, 12).map((repo) => (
            <motion.div
              key={repo.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <ProjectCard
                repo={repo}
                summaryOverride={REPO_DESCRIPTION_OVERRIDES[repo.name]}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
