import { type FC } from 'react'
import { GitHubRepo } from '../types/github'

type RepositoryCardProps = {
  repo: GitHubRepo
}

export const RepositoryCard: FC<RepositoryCardProps> = ({ repo }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 h-full"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            {repo.name}
          </h2>
          {repo.fork && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full mt-1">
              Fork
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
          <svg
            className="w-4 h-4 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {repo.stargazers_count}
        </div>
      </div>

      {repo.description && (
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {repo.description}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {repo.language && (
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
            {repo.language}
          </span>
        )}
        {repo.topics?.slice(0, 3).map((topic) => (
          <span
            key={topic}
            className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full"
          >
            {topic}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3 text-xs">
        <span className="text-gray-500 dark:text-gray-400 ml-auto">
          Updated {new Date(repo.updated_at).toLocaleDateString()}
        </span>
      </div>
    </a>
  </div>
)
