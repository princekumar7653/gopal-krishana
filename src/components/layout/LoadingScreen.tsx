import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setOpacity(0);
      
      // Hide completely after fade out
      setTimeout(() => {
        setIsVisible(false);
        onLoadingComplete?.();
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div 
      id="loading-screen" 
      className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center transition-opacity duration-500"
      style={{ opacity }}
    >
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-400 animate-pulse">Loading Portfolio...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;