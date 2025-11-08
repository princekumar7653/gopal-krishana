import React from 'react';
import { useScrollProgress } from '../../hooks';

const ScrollProgressBar: React.FC = () => {
  const { scrollProgress } = useScrollProgress();

  return (
    <div 
      id="scroll-progress"
      className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500 transform origin-left z-50 transition-transform duration-300"
      style={{ 
        transform: `scaleX(${Math.min(scrollProgress, 1)})` 
      }}
    />
  );
};

export default ScrollProgressBar;