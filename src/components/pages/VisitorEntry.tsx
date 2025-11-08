import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface VisitorData {
  name: string;
  email: string;
  purpose: string;
  timestamp: string;
  userAgent: string;
  referrer: string;
  language: string;
  timezone: string;
}

const VisitorEntry: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Check if visitor has already visited in this session
    const currentVisitor = sessionStorage.getItem('currentVisitor');
    const hasVisitedToday = localStorage.getItem('hasVisitedToday');
    const today = new Date().toDateString();

    // If visitor has already filled form today, redirect to portfolio
    if (currentVisitor || (hasVisitedToday === today)) {
      navigate('/portfolio');
      return;
    }

    // Animate form entrance
    setTimeout(() => {
      setIsAnimated(true);
    }, 300);
  }, [navigate]);

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const validateEmail = (email: string): boolean => {
    if (!email) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (error) setError('');
  };

  const storeVisitorData = (visitorData: VisitorData) => {
    // Store in localStorage for analytics
    const visitors = JSON.parse(localStorage.getItem('portfolioVisitors') || '[]');
    visitors.push(visitorData);

    // Keep only last 100 visitors
    if (visitors.length > 100) {
      visitors.splice(0, visitors.length - 100);
    }

    localStorage.setItem('portfolioVisitors', JSON.stringify(visitors));

    // Store current visitor session
    sessionStorage.setItem('currentVisitor', JSON.stringify(visitorData));

    // Mark that user has visited today
    const today = new Date().toDateString();
    localStorage.setItem('hasVisitedToday', today);
  };

  const sendEmailNotification = async (visitorData: VisitorData) => {
    // Get backend URL from environment or use default
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3003';

    try {
      const response = await fetch(`${backendUrl}/api/visitor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitorData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send notification');
      }

      return await response.json();
    } catch (error) {
      // Fallback: still log locally even if email fails
      console.warn('Email notification failed:', error);
      return {
        success: true,
        method: 'local_only',
        message: 'Visitor logged locally, email notification failed'
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!validateName(formData.name)) {
      setError('Please enter a valid name (at least 2 characters)');
      return;
    }

    if (formData.email && !validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const visitorData: VisitorData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        purpose: formData.purpose,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };

      // Store visitor data locally
      storeVisitorData(visitorData);

      // Send email notification
      await sendEmailNotification(visitorData);

      // Show success message
      setShowSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/portfolio');
      }, 2000);

    } catch (error) {
      console.error('Error processing visitor entry:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 font-sans min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-shape w-64 h-64 bg-gradient-to-r from-blue-500 to-cyan-500 top-10 left-10 absolute rounded-full opacity-10 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="floating-shape w-48 h-48 bg-gradient-to-r from-purple-500 to-blue-500 top-1/3 right-20 absolute rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="floating-shape w-32 h-32 bg-gradient-to-r from-cyan-500 to-purple-500 bottom-20 left-1/4 absolute rounded-full opacity-10 animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="floating-shape w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-500 bottom-32 right-1/3 absolute rounded-full opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className={`glass rounded-2xl p-8 shadow-2xl transition-all duration-800 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Welcome!</h1>
            <p className="text-slate-400">Please enter your name to explore my portfolio</p>
          </div>

          {/* Entry Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-slate-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 transition-all duration-300 ${formData.name && validateName(formData.name) ? 'border-green-500' : 'border-slate-600'
                  }`}
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email (Optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-slate-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 transition-all duration-300 ${formData.email && validateEmail(formData.email) ? 'border-green-500' :
                  formData.email && !validateEmail(formData.email) ? 'border-red-500' : 'border-slate-600'
                  }`}
                placeholder="your.email@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-slate-300 mb-2">
                Purpose of Visit (Optional)
              </label>
              <select
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
              >
                <option value="">Select purpose</option>
                <option value="hiring">Looking to hire</option>
                <option value="collaboration">Collaboration opportunity</option>
                <option value="inspiration">Seeking inspiration</option>
                <option value="networking">Networking</option>
                <option value="other">Other</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-ripple bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              <span className="flex items-center justify-center gap-2 relative z-10">
                <span>{isLoading ? 'Processing...' : 'Enter Portfolio'}</span>
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                )}
              </span>
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 pt-6 border-t border-slate-700">
            <p className="text-xs text-slate-500 mb-3">
              Your information helps me understand my visitors better
            </p>
            <button
              onClick={() => navigate('/portfolio')}
              className="text-xs text-slate-400 hover:text-slate-300 underline transition-colors duration-300"
            >
              Skip and go directly to portfolio →
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="glass rounded-2xl p-8 max-w-sm mx-4 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Welcome!</h3>
            <p className="text-slate-300 mb-4">Redirecting to portfolio...</p>
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorEntry;