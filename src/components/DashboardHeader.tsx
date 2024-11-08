type DashboardHeaderProps = {
  owner: {
    login: string
    avatar_url: string
    html_url: string
  }
  totalRepos: number
  totalStars: number
}

export const DashboardHeader = ({
  owner,
  totalRepos,
  totalStars,
}: DashboardHeaderProps) => (
  <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={owner.avatar_url}
            alt={`${owner.login}'s avatar`}
            className="h-16 w-16 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
          />
          <div>
            <a
              href={owner.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {owner.login}
            </a>
            <div className="flex gap-4 mt-1 text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-1">
                <span className="font-medium">{totalRepos}</span> repositories
              </span>
              <span className="flex items-center gap-1">
                <span className="font-medium">{totalStars}</span> total stars
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
)
