import { openDB } from 'idb'
import { QueryClient, useQuery } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'

// Create IndexedDB database
const createDB = async () => {
  return openDB('github-cache', 1, {
    upgrade(db) {
      db.createObjectStore('queries')
    },
  })
}

// Custom persister
const persister = {
  persistClient: async (client: any) => {
    const db = await createDB()
    await db.put('queries', client, 'queryData')
  },
  restoreClient: async () => {
    const db = await createDB()
    return db.get('queries', 'queryData')
  },
  removeClient: async () => {
    const db = await createDB()
    await db.delete('queries', 'queryData')
  },
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

// Initialize persistence separately
persistQueryClient({
  queryClient,
  persister,
})

// Query keys and hooks remain the same
export const queryKeys = {
  userProfile: (username: string) => ['user', username],
  userRepos: (username: string) => ['repos', username],
}

export const useUserProfile = (username: string) => {
  return useQuery({
    queryKey: queryKeys.userProfile(username),
    queryFn: () => fetchUserProfile(username),
  })
}

type Repository = {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  topics: string[]
  updated_at: string
  fork: boolean
  open_issues_count: number
}

type UserProfile = {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
}

export const fetchUserProfile = async (username: string): Promise<UserProfile> => {
  const response = await fetch(`https://api.github.com/users/${username}`)
  if (!response.ok) {
    throw new Error('Failed to fetch user profile')
  }
  return response.json()
}

export const fetchUserRepos = async (username: string): Promise<Repository[]> => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch repositories')
  }
  return response.json()
} 