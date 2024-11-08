import { FC, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { RepositoryCard } from './RepositoryCard'
import { githubService } from '../services/github'

import { useQuery } from '@tanstack/react-query'
import { DashboardHeader } from './DashboardHeader'
import { RepositoryFilters } from './RepositoryFilters'

const Dashboard: FC = () => {
  const { username = '' } = useParams<{ username: string }>()
  const [includeForks, setIncludeForks] = useState(true)
  const [showOnlyWithIssues, setShowOnlyWithIssues] = useState(false)

  const {
    data: repos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['repos', username],
    queryFn: () => githubService.getAllUserRepos(username),
    enabled: !!username,
  })

  const filteredRepos = repos
    .filter((repo) => {
      if (!includeForks && repo.fork) return false
      if (showOnlyWithIssues && repo.open_issues === 0) return false
      return true
    })
    .sort((a, b) => b.stargazers_count - a.stargazers_count)

  const totalStars =
    repos?.reduce((sum, repo) => sum + repo.stargazers_count, 0) ?? 0
  const forkCount = repos.filter((repo) => repo.fork).length

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-gray-900">
        <div className="text-xl dark:text-white">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-4 dark:bg-gray-900">
        <div className="text-red-600 dark:text-red-400">
          {error instanceof Error ? error.message : 'An error occurred'}
        </div>
        <Link
          to="/"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Back to Search
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {repos?.[0]?.owner && (
        <DashboardHeader
          owner={repos[0].owner}
          totalRepos={repos.length}
          totalStars={totalStars}
        />
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <RepositoryFilters
            includeForks={includeForks}
            setIncludeForks={setIncludeForks}
            showOnlyWithIssues={showOnlyWithIssues}
            setShowOnlyWithIssues={setShowOnlyWithIssues}
            forkCount={forkCount}
            totalStars={totalStars}
            filteredCount={filteredRepos.length}
            totalCount={repos.length}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredRepos.map((repo) => (
              <RepositoryCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
