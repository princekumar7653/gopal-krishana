import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import VisitorEntry from './components/pages/VisitorEntry.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/portfolio" element={<App />} />
          <Route path="/" element={<VisitorEntry />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </StrictMode>,
)
