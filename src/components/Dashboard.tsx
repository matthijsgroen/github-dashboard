import { FC, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { RepositoryCard } from './RepositoryCard'
import { githubService } from '../services/github'

import { useQuery } from '@tanstack/react-query'
import { DashboardHeader } from './DashboardHeader'

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

  const filteredRepos = repos.filter((repo) => {
    if (!includeForks && repo.fork) return false
    if (showOnlyWithIssues && repo.open_issues === 0) return false
    return true
  })

  const totalStars =
    repos?.reduce((sum, repo) => sum + repo.stargazers_count, 0) ?? 0
  const forkCount = repos.filter((repo) => repo.fork).length

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <div className="text-red-600">
          {error instanceof Error ? error.message : 'An error occurred'}
        </div>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to Search
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {repos?.[0]?.owner && (
        <DashboardHeader
          owner={repos[0].owner}
          totalRepos={repos.length}
          totalStars={totalStars}
        />
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            GitHub Repositories
          </h1>

          <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={includeForks}
                    onChange={(e) => setIncludeForks(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    Show Forks
                  </span>
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={showOnlyWithIssues}
                    onChange={(e) => setShowOnlyWithIssues(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    Only With Issues
                  </span>
                </label>
                <span className="text-sm text-gray-500">
                  ({forkCount} forks, {totalStars} stars)
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Showing {filteredRepos.length} of {repos.length} repositories
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
