import { getGitHubProjects, type GetProjectsOptions, type Project } from "@/lib/github"
import { useEffect, useState } from "react"

export function useGitHubProjects(
  username: string,
  opts: GetProjectsOptions = {}
) {
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const { perPage, imageChooser, filter, token } = opts

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getGitHubProjects(username, { perPage, imageChooser, filter, token })
      .then((p) => {
        if (!cancelled) {
          setProjects(p)
          setError(null)
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [username, perPage, token])

  return { projects, error, loading }
}
