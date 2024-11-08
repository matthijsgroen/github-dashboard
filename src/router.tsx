import { createHashRouter } from 'react-router-dom'
import App from './App'
import Dashboard from './components/Dashboard'

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/:username',
    element: <Dashboard />,
  },
])
