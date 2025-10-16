import { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import PortfolioSection from './components/sections/PortfolioSection';
import BlogSection from './components/sections/BlogSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/common/Footer';
import { PERSONAL_INFO } from './utils/constants';
import { useTheme } from './contexts/ThemeContext';
import ThemeToggle from './components/ui/ThemeToggle';

function App() {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false); // Changed to false for debugging
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll progress tracking
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  if (isLoading) {
    return (
      <div id="loading-screen" className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 animate-pulse mb-4">Loading Portfolio...</p>
          <button
            onClick={handleLoadComplete}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2 rounded-full transition-all duration-300"
          >
            Enter Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`
      ${isDark 
        ? 'bg-slate-900 text-slate-100' 
        : 'bg-gray-50 text-gray-900'
      } 
      font-sans overflow-x-hidden transition-colors duration-500
    `}>
      {/* Scroll Progress Indicator */}
      <div
        id="scroll-progress"
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform origin-left z-50 transition-transform duration-300"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Header */}
      <header id="header" className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? isDark 
            ? 'bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-800/50' 
            : 'bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50'
          : ''
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">Prince Kumar</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button onClick={() => scrollToSection('hero')} className={`nav-link transition-colors duration-300 ${isDark ? 'text-slate-300 hover:text-blue-500' : 'text-gray-600 hover:text-blue-600'}`}>Home</button>
              <button onClick={() => scrollToSection('about')} className={`nav-link transition-colors duration-300 ${isDark ? 'text-slate-300 hover:text-blue-500' : 'text-gray-600 hover:text-blue-600'}`}>About</button>
              <button onClick={() => scrollToSection('skills')} className={`nav-link transition-colors duration-300 ${isDark ? 'text-slate-300 hover:text-blue-500' : 'text-gray-600 hover:text-blue-600'}`}>Skills</button>
              <button onClick={() => scrollToSection('portfolio')} className={`nav-link transition-colors duration-300 ${isDark ? 'text-slate-300 hover:text-blue-500' : 'text-gray-600 hover:text-blue-600'}`}>Portfolio</button>
              <button onClick={() => scrollToSection('blog')} className={`nav-link transition-colors duration-300 ${isDark ? 'text-slate-300 hover:text-blue-500' : 'text-gray-600 hover:text-blue-600'}`}>Blog</button>
              <button onClick={() => scrollToSection('contact')} className={`nav-link transition-colors duration-300 ${isDark ? 'text-slate-300 hover:text-blue-500' : 'text-gray-600 hover:text-blue-600'}`}>Contact</button>
            </nav>

            {/* CTA Button, Theme Toggle & Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              <a href="/assets/gopal.pdf" target="_blank" rel="noopener noreferrer"
                className="hidden lg:inline-flex bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2 rounded-full transition-all duration-300">
                Download CV
              </a>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className={`lg:hidden p-2 rounded-lg backdrop-blur-md border transition-colors duration-300 ${
                  isDark 
                    ? 'bg-slate-800/50 border-slate-700/50 text-slate-300' 
                    : 'bg-white/50 border-gray-300/50 text-gray-700'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar activeSection="" />

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="fixed top-0 right-0 h-full w-80 bg-slate-800/95 backdrop-blur-md transform transition-transform duration-300 lg:hidden z-50 border-l border-slate-700/50">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <nav className="space-y-4">
                <button onClick={() => scrollToSection('hero')} className="block w-full text-left py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors">Home</button>
                <button onClick={() => scrollToSection('about')} className="block w-full text-left py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors">About</button>
                <button onClick={() => scrollToSection('skills')} className="block w-full text-left py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors">Skills</button>
                <button onClick={() => scrollToSection('portfolio')} className="block w-full text-left py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors">Portfolio</button>
                <button onClick={() => scrollToSection('blog')} className="block w-full text-left py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors">Blog</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors">Contact</button>

                <div className="pt-4 border-t border-slate-700">
                  <a href="/assets/gopal.pdf" target="_blank" rel="noopener noreferrer"
                    className="block w-full text-center bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-lg transition-colors">
                    Download CV
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <HeroSection personalInfo={PERSONAL_INFO} />

        {/* About Section */}
        <AboutSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Portfolio Section */}
        <PortfolioSection />

        {/* Blog Section */}
        <BlogSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;