import React, { useState, useEffect } from 'react';
import { SOCIAL_LINKS } from '../../utils/constants';
import { useActiveSection } from '../../hooks/useIntersectionObserver';
import type { SidebarProps } from '../../types';

const Sidebar: React.FC<SidebarProps> = ({ activeSection: propActiveSection }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionIds = ['hero', 'about', 'skills', 'portfolio', 'blog', 'contact'];
  const hookActiveSection = useActiveSection(sectionIds);
  const activeSection = propActiveSection || hookActiveSection;

  // Show sidebar after initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Update scroll progress
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);
  const handleNavClick = (href: string) => {
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

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return (
          <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case 'email':
        return (
          <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        );
    }
  };

  // Enhanced navigation items with blog
  const enhancedNavItems = [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
    { id: 'blog', label: 'Blog', href: '#blog' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsHidden(!isHidden)}
        className={`fixed left-2 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex items-center justify-center w-10 h-10 bg-slate-800/90 backdrop-blur-md rounded-full border border-slate-700/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 group ${
          isHidden ? 'translate-x-0' : 'translate-x-20'
        }`}
        title={isHidden ? 'Show Sidebar' : 'Hide Sidebar'}
      >
        <svg 
          className={`w-5 h-5 text-slate-300 group-hover:text-white transition-all duration-300 ${
            isHidden ? 'rotate-0' : 'rotate-180'
          }`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside 
        id="sidebar" 
        className={`fixed left-6 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block transition-all duration-500 ease-in-out ${
          isVisible && !isHidden ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
        }`}
      >
      <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-4 space-y-4 border border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
        {/* Quick Navigation */}
        <div className="space-y-2">
          {enhancedNavItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.href)}
              className={`group relative block w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 scale-125'
                  : 'bg-slate-400 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500'
              }`}
              title={item.label}
              aria-label={`Navigate to ${item.label}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Tooltip */}
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                {item.label}
              </div>
              
              {/* Active indicator */}
              {activeSection === item.id && (
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-30 animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>

        {/* Social Links */}
        <div className="space-y-3">
          {SOCIAL_LINKS.map((social, index) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block p-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              title={social.platform}
              aria-label={`Visit ${social.platform} profile`}
              style={{ animationDelay: `${(index + enhancedNavItems.length) * 100}ms` }}
            >
              {getSocialIcon(social.platform)}
              
              {/* Tooltip */}
              <div className="absolute left-12 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                {social.platform}
              </div>
            </a>
          ))}
        </div>

        {/* Scroll Progress Indicator */}
        <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          ></div>
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;