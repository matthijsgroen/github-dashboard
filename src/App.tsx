import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import GitHubSearch from './components/GitHubSearch'
import Dashboard from './components/Dashboard'

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<GitHubSearch />} />
      <Route path="/dashboard/:username" element={<Dashboard />} />
    </Routes>
  )
}

export default App
