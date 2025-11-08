import React, { useCallback } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
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

const MobileMenu: React.FC<MobileMenuProps> = React.memo(({ isOpen, onClose, onScrollToSection }) => {
  const handleNavClick = useCallback((sectionId: string) => {
    onScrollToSection(sectionId);
  }, [onScrollToSection]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 h-full w-80 bg-slate-800/95 backdrop-blur-md transform transition-transform duration-300 lg:hidden z-50 border-l border-slate-700/50">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Menu
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-700"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-4">
            {NAV_ITEMS.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNavClick(item.id)} 
                className="block w-full text-left py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 border-t border-slate-700">
              <a 
                href="/assets/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-lg transition-colors"
              >
                See My CV
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
});

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;
