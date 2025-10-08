// lib/github.ts
export type GitHubRepo = {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
}

export interface Project {
  title: string
  description: string
  image: string
  liveUrl: string
  repositoryUrl: string
}

const API_BASE = "https://api.github.com"

export type GetProjectsOptions = {
  perPage?: number
  imageChooser?: (repo: GitHubRepo, index: number) => string
  filter?: (repo: GitHubRepo) => boolean
  token?: string
}

export async function fetchUserRepos(
  username: string,
  perPage = 9,
  token?: string
): Promise<GitHubRepo[]> {
  const url = `${API_BASE}/users/${encodeURIComponent(
    username
  )}/repos?sort=updated&per_page=${perPage}`

  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  if (!res.ok) {
    const remaining = res.headers.get("x-ratelimit-remaining")
    if (res.status === 403 && remaining === "0") {
      throw new Error(
        "GitHub rate limit exceeded (no-auth is 60 req/hr per IP). Try later or add a token."
      )
    }
    throw new Error(`GitHub error ${res.status}`)
  }

  return (await res.json()) as GitHubRepo[]
}

export function repoToProject(
  repo: GitHubRepo,
  image: string
): Project {
  return {
    title: repo.name,
    description: repo.description ?? "",
    image,
    liveUrl: repo.homepage || repo.html_url,
    repositoryUrl: repo.html_url,
  }
}

export async function getGitHubProjects(
  username: string,
  opts: GetProjectsOptions = {}
): Promise<Project[]> {
  const {
    perPage = 9,
    imageChooser = (_r, i) => `/backgrounds/gta/${(i % 3) + 1}.png`,
    filter,
    token,
  } = opts

  const repos = await fetchUserRepos(username, perPage, token)
  const filtered = filter ? repos.filter(filter) : repos
  return filtered.map((r, i) => repoToProject(r, imageChooser(r, i)))
}