import React, { useState, useEffect } from 'react';
import { useScrollProgress } from '../../hooks';

const ScrollToTop: React.FC = () => {
  const { isScrolled } = useScrollProgress({ offset: 500 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(isScrolled);
  }, [isScrolled]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-40 ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

export default ScrollToTop;