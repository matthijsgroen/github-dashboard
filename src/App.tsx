import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const App: FC = () => {
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = new FormData(e.currentTarget).get('username')
    if (username) {
      navigate(`/${username}`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            GitHub Repository Explorer
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Enter a GitHub username to explore their repositories
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="GitHub username"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Explore Repositories
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
