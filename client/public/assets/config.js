/**
 * Portfolio Configuration
 * Configure backend URL and other settings
 */

// Backend configuration
window.BACKEND_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3003'
  : 'https://your-production-backend.herokuapp.com';

// Portfolio configuration
window.PORTFOLIO_CONFIG = {
  // Email service fallbacks (optional)
  emailjs: {
    serviceId: 'YOUR_EMAILJS_SERVICE_ID',
    templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY'
  },
  
  formspree: {
    formId: 'YOUR_FORMSPREE_FORM_ID'
  },
  
  // Analytics (optional)
  analytics: {
    enabled: true,
    trackVisitors: true
  },
  
  // UI settings
  ui: {
    showPerformanceIndicator: false, // Set to true for debugging
    enableAnimations: true,
    theme: 'dark'
  }
};

// Configuration loaded
console.log('Portfolio configuration loaded');