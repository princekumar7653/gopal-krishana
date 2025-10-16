import React, { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../utils/constants';
import { useTheme } from '../../contexts/ThemeContext';
import type { HeroSectionProps } from '../../types';

const HeroSection: React.FC<HeroSectionProps> = ({ personalInfo = PERSONAL_INFO }) => {
    const { isDark } = useTheme();
    const [sectionRef] = useIntersectionObserver({ threshold: 0.2 });
    const contentRef = useRef<HTMLDivElement>(null);
    const [typedText, setTypedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const texts = [
        'Frontend Developer',
        'UI/UX Designer',
        'React Specialist',
        'Web Developer'
    ];

    // Simple typing animation
    useEffect(() => {
        const currentText = texts[currentIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (typedText.length < currentText.length) {
                    setTypedText(currentText.slice(0, typedText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (typedText.length > 0) {
                    setTypedText(typedText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setCurrentIndex((prev) => (prev + 1) % texts.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [typedText, currentIndex, isDeleting, texts]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = 80;
            const elementPosition = element.offsetTop - headerHeight;
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
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                );
            case 'linkedin':
                return (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                );
            case 'instagram':
                return (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                );
            case 'email':
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <section
            id="hero"
            ref={sectionRef}
            className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-24 lg:pt-20 transition-colors duration-500 ${isDark
                ? 'bg-slate-900'
                : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50'
                }`}
        >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg opacity-20 animate-bounce"></div>
                <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute bottom-32 left-1/4 w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-25 animate-bounce" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 py-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center" ref={contentRef}>
                    {/* Text Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <p className="text-blue-400 text-lg font-medium animate-pulse">
                                👋 Hello, I'm
                            </p>
                            <h1 className="text-5xl lg:text-7xl font-bold">
                                <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
                                    {personalInfo.name}
                                </span>
                            </h1>
                            <div className={`text-2xl lg:text-3xl h-12 flex items-center ${isDark ? 'text-slate-300' : 'text-gray-700'
                                }`}>
                                <span className="mr-2">I'm a</span>
                                <span className="text-blue-500 font-semibold">
                                    {typedText}
                                    <span className="animate-pulse">|</span>
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <span className={`px-3 py-1 rounded-full text-sm animate-pulse ${isDark
                                    ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                                    : 'bg-blue-100 border border-blue-200 text-blue-600'
                                    }`}>
                                    🚀 Available for Hire
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm animate-pulse ${isDark
                                    ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                                    : 'bg-green-100 border border-green-200 text-green-600'
                                    }`}>
                                    ✨ 50+ Projects Delivered
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'
                                }`}>
                                🎯 <strong className={isDark ? 'text-white' : 'text-gray-900'}>Transforming Ideas into Digital Reality</strong><br />
                                {personalInfo.description}
                            </p>

                            {/* Simple Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                {personalInfo.stats.map((stat, index) => (
                                    <div key={index} className={`text-center p-3 rounded-lg border hover:border-blue-500/50 transition-all duration-300 hover:scale-105 ${isDark
                                        ? 'bg-slate-800/50 border-slate-700/50'
                                        : 'bg-white/70 border-gray-200/70 shadow-sm'
                                        }`}>
                                        <div className="text-2xl font-bold text-blue-500">{stat.value}{stat.suffix}</div>
                                        <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => scrollToSection('portfolio')}
                                    className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
                                >
                                    🚀 View My Work
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </button>
                                <button
                                    onClick={() => scrollToSection('contact')}
                                    className={`group border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 ${isDark ? '' : 'bg-white/50 backdrop-blur-sm'
                                        }`}
                                >
                                    💬 Let's Talk
                                    <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                    </svg>
                                </button>
                            </div>

                            {/* Social Links */}
                            <div className="flex space-x-6">
                                {SOCIAL_LINKS.map((social) => (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`hover:text-blue-500 transition-colors duration-300 hover:scale-110 transform ${isDark ? 'text-slate-400' : 'text-gray-500'
                                            }`}
                                        aria-label={`Visit ${social.platform} profile`}
                                    >
                                        {getSocialIcon(social.platform)}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Profile Image */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative">
                            <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl hover:scale-105 transition-transform duration-300">
                                <img
                                    src={personalInfo.image}
                                    alt={personalInfo.name}
                                    className="w-full h-full object-cover"
                                    loading="eager"
                                />
                            </div>

                            {/* Floating elements around image */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-500 rounded-full animate-bounce"></div>
                            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <button
                    onClick={() => scrollToSection('about')}
                    className={`flex flex-col items-center hover:text-blue-500 transition-colors group ${isDark ? 'text-slate-400' : 'text-gray-500'
                        }`}
                >
                    <span className="text-sm mb-2 group-hover:text-blue-400">Scroll Down</span>
                    <svg className="w-6 h-6 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default HeroSection;