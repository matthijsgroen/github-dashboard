type RepositoryFiltersProps = {
  includeForks: boolean
  setIncludeForks: (value: boolean) => void
  showOnlyWithIssues: boolean
  setShowOnlyWithIssues: (value: boolean) => void
  forkCount: number
  totalStars: number
  filteredCount: number
  totalCount: number
}

export const RepositoryFilters = ({
  includeForks,
  setIncludeForks,
  showOnlyWithIssues,
  setShowOnlyWithIssues,
  filteredCount,
  totalCount,
}: RepositoryFiltersProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={includeForks}
            onChange={(e) => setIncludeForks(e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
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
          <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
            Only With Issues
          </span>
        </label>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-300 sm:ml-auto">
        Showing {filteredCount} of {totalCount} repositories
      </div>
    </div>
  </div>
)
