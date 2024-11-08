import { type FC } from 'react'

type Repository = {
  id: number
  name: string
  description?: string | null
  html_url: string
  fork: boolean
  stargazers_count: number
  language?: string | null
  topics?: string[]
  open_issues_count: number
  updated_at: string
}

type RepositoryCardProps = {
  repo: Repository
}

export const RepositoryCard: FC<RepositoryCardProps> = ({ repo }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
    <a 
      href={repo.html_url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block p-6 h-full"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-blue-600 hover:underline">
            {repo.name}
          </h2>
          {repo.fork && (
            <span className="text-sm text-gray-500">Fork</span>
          )}
        </div>
        <div className="text-gray-500">
          {repo.stargazers_count} stars
        </div>
      </div>
      <p className="text-gray-700">{repo.description}</p>
      <div className="flex items-center justify-between">
        <div className="text-gray-500">
          {repo.language}
        </div>
        <div className="text-gray-500">
          {repo.topics?.join(', ')}
        </div>
        <div className="text-gray-500">
          {repo.open_issues_count} open issues
        </div>
        <div className="text-gray-500">
          Updated on {new Date(repo.updated_at).toLocaleDateString()}
        </div>
      </div>
    </a>
  </div>
) 