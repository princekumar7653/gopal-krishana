import React, { useCallback, useMemo } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../ui/ThemeToggle';

interface AppHeaderProps {
  isScrolled: boolean;
  onToggleMobileMenu: () => void;
  onScrollToSection: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' }
] as const;

const AppHeader: React.FC<AppHeaderProps> = React.memo(({ 
  isScrolled, 
  onToggleMobileMenu, 
  onScrollToSection 
}) => {
  const { isDark } = useTheme();

  const handleNavClick = useCallback((sectionId: string) => {
    onScrollToSection(sectionId);
  }, [onScrollToSection]);

  const navButtonClass = useMemo(() => 
    `nav-link transition-colors duration-300 ${
      isDark ? 'text-slate-300 hover:text-blue-500' : 'text-gray-600 hover:text-blue-600'
    }`,
    [isDark]
  );

  const mobileMenuButtonClass = useMemo(() =>
    `lg:hidden p-2 rounded-lg backdrop-blur-md border transition-colors duration-300 ${
      isDark 
        ? 'bg-slate-800/50 border-slate-700/50 text-slate-300' 
        : 'bg-white/50 border-gray-300/50 text-gray-700'
    }`,
    [isDark]
  );

  return (
    <header 
      id="header" 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? isDark 
            ? 'bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-800/50' 
            : 'bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50'
          : ''
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Gopal Krishna Chanchal
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNavClick(item.id)} 
                className={navButtonClass}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button, Theme Toggle & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <a 
              href="/assets/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden lg:inline-flex bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2 rounded-full transition-all duration-300"
            >
              See My CV
            </a>

            <ThemeToggle />

            <button
              onClick={onToggleMobileMenu}
              className={mobileMenuButtonClass}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

AppHeader.displayName = 'AppHeader';

export default AppHeader;
