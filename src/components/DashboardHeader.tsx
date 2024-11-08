type DashboardHeaderProps = {
  owner: {
    login: string
    avatar_url: string
  }
  totalRepos: number
  totalStars: number
}

export const DashboardHeader = ({
  owner,
  totalRepos,
  totalStars,
}: DashboardHeaderProps) => (
  <header className="bg-white border-b border-gray-200 shadow-sm">
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={owner.avatar_url}
            alt={`${owner.login}'s avatar`}
            className="h-16 w-16 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{owner.login}</h1>
            <div className="flex gap-4 mt-1 text-gray-600">
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
