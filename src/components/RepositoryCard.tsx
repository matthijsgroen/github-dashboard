import { type FC } from 'react'
import { GitHubRepo } from '../types/github'
import { StarIcon, GitForkIcon, IssueIcon } from './icons'

type RepositoryCardProps = {
  repo: GitHubRepo
}

export const RepositoryCard = ({ repo }: RepositoryCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-md">
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium truncate"
        >
          {repo.name}
        </a>
        <div className="flex items-center gap-1 text-yellow-500">
          <StarIcon className="h-4 w-4" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {repo.stargazers_count}
          </span>
        </div>
      </div>

      {repo.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {repo.description}
        </p>
      )}

      <div className="flex items-center gap-3 text-sm">
        {repo.language && (
          <span className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
            {repo.language}
          </span>
        )}
        {repo.fork && (
          <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <GitForkIcon className="h-4 w-4" />
            Fork
          </span>
        )}
        {repo.open_issues > 0 && (
          <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <IssueIcon className="h-4 w-4" />
            {repo.open_issues}
          </span>
        )}
      </div>
    </div>
  </div>
)
