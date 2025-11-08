import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/layout/Sidebar';
import AppHeader from './components/layout/AppHeader';
import MobileMenu from './components/layout/MobileMenu';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import PortfolioSection from './components/sections/PortfolioSection';
import BlogSection from './components/sections/BlogSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/common/Footer';
import { PERSONAL_INFO } from './utils/constants';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false); // Changed to false for debugging
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Memoized scroll handler
  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    setScrollProgress(progress);
    setIsScrolled(scrollTop > 100);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, [updateScrollProgress]);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
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
  }, []);

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
      <AppHeader 
        isScrolled={isScrolled}
        onToggleMobileMenu={toggleMobileMenu}
        onScrollToSection={scrollToSection}
      />

      {/* Sidebar */}
      <Sidebar activeSection="" />

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        onScrollToSection={scrollToSection}
      />

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