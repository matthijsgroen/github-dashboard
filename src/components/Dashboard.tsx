import { FC, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

type Repository = {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
}

const Dashboard: FC = () => {
  const { username } = useParams<{ username: string }>()
  const [repos, setRepos] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
        if (!response.ok) {
          throw new Error('Failed to fetch repositories')
        }
        const data = await response.json()
        setRepos(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepos()
  }, [username])

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
        <div className="text-red-600">{error}</div>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to Search
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {username}'s Repositories
        </h1>
        <Link
          to="/"
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          Back to Search
        </Link>
      </div>

      <div className="grid gap-4">
        {repos.map((repo) => (
          <div key={repo.id} className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-blue-600">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {repo.name}
              </a>
            </h2>
            {repo.description && (
              <p className="mt-2 text-gray-600">{repo.description}</p>
            )}
            <div className="mt-4 flex gap-4 text-sm">
              {repo.language && (
                <span className="text-gray-600">
                  Language: {repo.language}
                </span>
              )}
              <span className="text-gray-600">
                Stars: {repo.stargazers_count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard 