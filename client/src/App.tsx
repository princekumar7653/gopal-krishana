import { useAppSelector, useAppDispatch } from './hooks/redux'
import { toggleTheme } from './store/slices/uiSlice'
import Button from './components/ui/Button'
import TestCard from './components/ui/TestCard'
import Header from './components/common/Header'
import Footer from './components/common/Footer'

function App() {
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector((state) => state.ui)

  const handleThemeToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Header />
        
        <main>
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Portfolio Setup Complete! 🎉
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                React + Vite + Tailwind CSS + Redux Toolkit
              </p>
              
              <div className="flex justify-center gap-4">
                <Button onClick={handleThemeToggle}>
                  Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
                </Button>
                <Button variant="outline">
                  Get Started
                </Button>
              </div>
            </div>
            
            <div className="mb-8">
              <TestCard />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  ⚡ Vite
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Lightning fast build tool with HMR
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  🎨 Tailwind CSS
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Utility-first CSS framework
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  🔄 Redux Toolkit
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Predictable state management
                </p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  )
}

export default App
