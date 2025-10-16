import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-full transition-all duration-500 ease-in-out
        ${isDark 
          ? 'bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50' 
          : 'bg-white/10 hover:bg-white/20 border border-gray-300/30'
        }
        backdrop-blur-md hover:scale-110 transform
        focus:outline-none focus:ring-2 focus:ring-blue-500/50
        group overflow-hidden
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background glow effect */}
      <div className={`
        absolute inset-0 rounded-full transition-all duration-500
        ${isDark 
          ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20' 
          : 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20'
        }
        opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100
      `} />
      
      {/* Icon container */}
      <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Sun Icon */}
        <svg
          className={`
            absolute w-6 h-6 transition-all duration-500 transform
            ${isDark 
              ? 'rotate-90 scale-0 opacity-0' 
              : 'rotate-0 scale-100 opacity-100'
            }
            text-yellow-500
          `}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>

        {/* Moon Icon */}
        <svg
          className={`
            absolute w-6 h-6 transition-all duration-500 transform
            ${isDark 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
            }
            text-blue-400
          `}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>

        {/* Animated stars for dark mode */}
        <div className={`
          absolute inset-0 transition-all duration-500
          ${isDark ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="absolute top-0 right-0 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
          <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1 left-0 w-0.5 h-0.5 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        </div>

        {/* Animated rays for light mode */}
        <div className={`
          absolute inset-0 transition-all duration-500
          ${!isDark ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="absolute top-0 left-1/2 w-0.5 h-1 bg-yellow-400 rounded-full animate-pulse transform -translate-x-1/2" />
          <div className="absolute bottom-0 left-1/2 w-0.5 h-1 bg-yellow-400 rounded-full animate-pulse transform -translate-x-1/2" />
          <div className="absolute left-0 top-1/2 w-1 h-0.5 bg-yellow-400 rounded-full animate-pulse transform -translate-y-1/2" />
          <div className="absolute right-0 top-1/2 w-1 h-0.5 bg-yellow-400 rounded-full animate-pulse transform -translate-y-1/2" />
        </div>
      </div>

      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200" />
    </button>
  );
};

export default ThemeToggle;