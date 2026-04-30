export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

type GitHubApiRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: "Financial-Fraud-Detection",
    description:
      "Machine learning workflows for fraud detection using classification and robust feature engineering.",
    html_url: "https://github.com/deepakmeena61/Financial-Fraud-Detection",
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    updated_at: "2026-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Image-Colorisation",
    description:
      "Black and White image colourisation using GAN with U-Net style generation.",
    html_url: "https://github.com/deepakmeena61/Image-Colorisation",
    stargazers_count: 0,
    forks_count: 0,
    language: "Jupyter Notebook",
    updated_at: "2026-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Bank-Marketing-Prediction-System",
    description:
      "Marketing response prediction workflow with class balancing and comparative modeling.",
    html_url: "https://github.com/deepakmeena61/Bank-Marketing-Prediction-System",
    stargazers_count: 0,
    forks_count: 0,
    language: "Jupyter Notebook",
    updated_at: "2026-01-01T00:00:00Z"
  }
];

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const endpoint =
    "https://api.github.com/users/deepakmeena61/repos?sort=updated&direction=desc&per_page=100";

  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/vnd.github+json"
      },
      next: { revalidate: 86400 }
    });

    if (!response.ok) {
      throw new Error(`GitHub fetch failed with status ${response.status}`);
    }

    const repos = (await response.json()) as GitHubApiRepo[];
    const normalized: GitHubRepo[] = repos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      language: repo.language,
      updated_at: repo.updated_at
    }));

    return normalized.length > 0 ? normalized : FALLBACK_REPOS;
  } catch {
    return FALLBACK_REPOS;
  }
}
