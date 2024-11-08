import { type GitHubRepo, type GitHubUser } from '../types/github'

const GITHUB_API_URL = 'https://api.github.com'

const githubApi = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${GITHUB_API_URL}${endpoint}`)
  if (!response.ok) {
    throw new Error(`GitHub API Error: ${response.statusText}`)
  }
  return response.json()
}

export const githubService = {
  getAllUserRepos: async (username: string): Promise<GitHubRepo[]> => {
    const perPage = 100
    let page = 1
    let allRepos: GitHubRepo[] = []

    while (true) {
      const repos = await githubApi<GitHubRepo[]>(
        `/users/${username}/repos?per_page=${perPage}&page=${page}`
      )

      if (repos.length === 0) break

      allRepos = [...allRepos, ...repos]
      if (repos.length < perPage) break
      page++
    }

    return allRepos
  },

  getUser: (username: string) => githubApi<GitHubUser>(`/users/${username}`),
}
