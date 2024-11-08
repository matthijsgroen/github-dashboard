export type GitHubUser = {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
}

type GithubRepoOwner = {
  login: string
  id: number
  avatar_url: string
  url: string
  html_url: string
  type: string
  site_admin: boolean
}

type GithubLicense = {
  key: string
  name: string
  spdx_id: string
  url: string
  node_id: string
}

export type GitHubRepo = {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: GithubRepoOwner
  html_url: string
  description: string | null
  fork: boolean
  url: string
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  language: string | null
  forks_count: number
  open_issues_count: number
  license: GithubLicense | null
  visibility: string
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
  topics: string[]
}
