import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useTheme } from '../../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { isDark } = useTheme();
  const [footerRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const quickLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' }
  ];

  const services = [
    'Web Development',
    'UI/UX Design',
    'Responsive Design',
    'Frontend Consulting',
    'React Development',
    'Performance Optimization'
  ];

  const socialLinks = [
    {
      href: 'https://github.com/princekumar7653',
      label: 'GitHub',
      icon: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      )
    },
    {
      href: 'https://www.linkedin.com/feed/',
      label: 'LinkedIn',
      icon: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
    {
      href: 'https://www.instagram.com/prince_singh_53_85/',
      label: 'Instagram',
      icon: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    }
  ];

  const scrollToSection = (href: string) => {
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

  return (
    <footer 
      id="footer" 
      ref={footerRef}
      className={`relative transition-colors duration-500 ${
        isDark 
          ? 'bg-slate-800 border-t border-slate-700' 
          : 'bg-gray-100 border-t border-gray-200'
      }`}
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className={`space-y-4 transition-all duration-1000 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
                Prince Kumar
              </span>
            </div>
            <p className={`leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-gray-600'
            }`}>
              Frontend Developer passionate about creating modern, responsive web applications with cutting-edge technologies and exceptional user experiences.
            </p>
            <div className={`flex items-center space-x-2 ${
              isDark ? 'text-slate-400' : 'text-gray-500'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span className="text-sm">Noida, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`transition-all duration-1000 delay-200 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={`hover:text-blue-500 transition-colors duration-300 hover:translate-x-1 transform inline-block ${
                      isDark ? 'text-slate-400' : 'text-gray-600'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={`transition-all duration-1000 delay-400 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className={`transition-colors duration-300 ${
                    isDark 
                      ? 'text-slate-400 hover:text-slate-300' 
                      : 'text-gray-600 hover:text-gray-700'
                  }`}>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={`transition-all duration-1000 delay-600 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Get In Touch</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:chanchalgopalkrishna42@gmail.com" 
                  className={`hover:text-blue-500 transition-colors duration-300 flex items-center space-x-2 group ${
                    isDark ? 'text-slate-400' : 'text-gray-600'
                  }`}
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-sm">chanchalgopalkrishna42@gmail.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+917667765385" 
                  className={`hover:text-blue-500 transition-colors duration-300 flex items-center space-x-2 group ${
                    isDark ? 'text-slate-400' : 'text-gray-600'
                  }`}
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span className="text-sm">+91-7667765385</span>
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 ${
                    isDark ? 'bg-slate-700' : 'bg-gray-200'
                  }`}
                  title={social.label}
                >
                  <div className={`${isDark ? 'text-white' : 'text-gray-700'} group-hover:text-white transition-colors`}>
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-12 pt-8 flex flex-col md:flex-row justify-between items-center transition-all duration-1000 delay-800 ${
          isDark ? 'border-t border-slate-700' : 'border-t border-gray-200'
        } ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className={`text-sm ${
            isDark ? 'text-slate-400' : 'text-gray-500'
          }`}>
            © 2024 Prince Kumar. All rights reserved.
          </p>
          <p className={`text-sm mt-4 md:mt-0 flex items-center space-x-1 ${
            isDark ? 'text-slate-400' : 'text-gray-500'
          }`}>
            <span>Built with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>using React & Tailwind CSS</span>
          </p>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;