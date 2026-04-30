import PortfolioShell from "@/components/PortfolioShell";
import { getGitHubRepos } from "@/lib/github";

export default async function Home() {
  const repos = await getGitHubRepos();
  return <PortfolioShell repos={repos} />;
}
