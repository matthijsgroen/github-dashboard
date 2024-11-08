import { FC, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchUserProfile, fetchUserRepos } from '../api/github'
import { RepositoryCard } from './RepositoryCard'

const Dashboard: FC = () => {
  const { username = '' } = useParams<{ username: string }>()
  const [includeForks, setIncludeForks] = useState(true)
  const [showOnlyWithIssues, setShowOnlyWithIssues] = useState(false)

  // Fetch user profile
  const { 
    data: user,
    isLoading: isLoadingUser,
    error: userError
  } = useQuery({
    queryKey: ['user', username],
    queryFn: () => fetchUserProfile(username),
    enabled: !!username,
  })

  // Fetch repositories
  const { 
    data: repos = [],
    isLoading: isLoadingRepos,
    error: reposError
  } = useQuery({
    queryKey: ['repos', username],
    queryFn: () => fetchUserRepos(username),
    enabled: !!username,
  })

  const isLoading = isLoadingUser || isLoadingRepos
  const error = userError || reposError

  const filteredRepos = repos.filter(repo => {
    if (!includeForks && repo.fork) return false
    if (showOnlyWithIssues && repo.open_issues_count === 0) return false
    return true
  })

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

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  const forkCount = repos.filter(repo => repo.fork).length

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center gap-6">
          <img 
            src={user?.avatar_url} 
            alt={user?.login} 
            className="w-20 h-20 rounded-full"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.name || user?.login}
            </h1>
            {user?.bio && (
              <p className="text-gray-600 mt-1">{user.bio}</p>
            )}
            <div className="mt-2 flex items-center gap-4">
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">{totalStars}</span>
                <span className="text-gray-500">total stars</span>
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">{repos.length} repositories</span>
            </div>
          </div>
          <Link
            to="/"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Back to Search
          </Link>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
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
              <span className="ml-3 text-sm font-medium text-gray-900">Show Forks</span>
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showOnlyWithIssues}
                onChange={(e) => setShowOnlyWithIssues(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">Only With Issues</span>
            </label>
            <span className="text-sm text-gray-500">
              ({forkCount} forks)
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Showing {filteredRepos.length} of {repos.length} repositories
          </div>
        </div>
      </div>

      {/* Repositories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRepos.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard 