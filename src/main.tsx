import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import LoadingScreen from './components/layout/LoadingScreen.tsx'

// Lazy load route components for code splitting
const App = lazy(() => import('./App.tsx'))
const VisitorEntry = lazy(() => import('./components/pages/VisitorEntry.tsx'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/portfolio" element={<App />} />
            <Route path="/" element={<VisitorEntry />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  </StrictMode>,
)
