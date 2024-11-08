import { useState, FormEvent, ChangeEvent, FC } from 'react'
import { useNavigate } from 'react-router-dom'

type GitHubUser = {
  login: string
  avatar_url: string
  name: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
}

const GitHubSearch: FC = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!username.trim()) return

    setIsLoading(true)
    setError('')
    setUser(null)

    try {
      const response = await fetch(`https://api.github.com/users/${username}`)
      if (!response.ok) {
        throw new Error(response.status === 404 
          ? 'User not found' 
          : 'Error fetching user data'
        )
      }
      const data = await response.json()
      setUser(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewDashboard = () => {
    if (user) {
      navigate(`/dashboard/${user.login}`)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        GitHub User Search
      </h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          type="text"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="w-full max-w-md px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button 
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-center">
          {error}
        </div>
      )}

      {user && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center gap-4">
            <img 
              src={user.avatar_url} 
              alt={user.login}
              className="w-32 h-32 rounded-full"
            />
            <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
            {user.bio && (
              <p className="text-gray-600 text-center">{user.bio}</p>
            )}
            <div className="flex gap-6 text-center">
              <div>
                <div className="font-bold">{user.public_repos}</div>
                <div className="text-gray-600">Repositories</div>
              </div>
              <div>
                <div className="font-bold">{user.followers}</div>
                <div className="text-gray-600">Followers</div>
              </div>
              <div>
                <div className="font-bold">{user.following}</div>
                <div className="text-gray-600">Following</div>
              </div>
            </div>
            <button
              onClick={handleViewDashboard}
              className="mt-4 px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              View Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default GitHubSearch