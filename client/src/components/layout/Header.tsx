import React, { useState, useEffect } from 'react';
import { useActiveSection } from '../../hooks';
import { NAVIGATION_ITEMS, PERSONAL_INFO } from '../../utils/constants';
import type { HeaderProps } from '../../types';

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(NAVIGATION_ITEMS.map(item => item.id));

  // Close mobile menu when clicking outside or on navigation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('#mobile-menu') && !target.closest('#mobile-menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header 
        id="header" 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'glass shadow-lg' : ''
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold gradient-text">{PERSONAL_INFO.name}</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {NAVIGATION_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`nav-link text-slate-300 hover:text-primary-500 transition-colors duration-300 ${
                    activeSection === item.id ? 'active' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              <a 
                href="/assets/gopal.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden lg:inline-flex btn-ripple bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full transition-all duration-300"
              >
                Download CV
              </a>

              {/* Mobile Menu Toggle */}
              <button 
                id="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg glass-light"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu-overlay" 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-80 glass transform transition-transform duration-300 lg:hidden z-50 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold gradient-text">Menu</span>
            <button 
              id="mobile-menu-close"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-700"
              aria-label="Close mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="space-y-4">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className={`block w-full text-left py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors ${
                  activeSection === item.id ? 'bg-slate-700 text-primary-500' : ''
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 border-t border-slate-700">
              <a 
                href="/assets/gopal.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg transition-colors"
              >
                Download CV
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;