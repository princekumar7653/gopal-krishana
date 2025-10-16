// Main JavaScript for Modern Portfolio

class ModernPortfolio {
    constructor() {
        this.performanceMonitor = null;
        this.deviceDetector = null;
        this.errorHandler = null;
        this.init();
    }

    init() {
        this.initializeFoundation();
        this.setupEventListeners();
        this.initializeComponents();
        this.handleLoading();
        this.setupScrollProgress();
        this.setupSmoothScrolling();
    }

    initializeFoundation() {
        // Initialize performance monitoring and device detection
        try {
            this.performanceMonitor = new PerformanceMonitor();
            this.deviceDetector = new DeviceDetector();
            this.errorHandler = new ErrorHandler();

            // Listen for performance mode changes
            window.addEventListener('performanceModeChanged', (event) => {
                this.handlePerformanceModeChange(event.detail);
            });

            // Performance foundation initialized

        } catch (error) {
            // Continue with basic functionality
        }
    }

    handlePerformanceModeChange(detail) {
        const { mode, capabilities } = detail;

        // Adjust animations based on performance mode
        this.adjustAnimationsForPerformance(mode);

        // Update UI indicators if needed
        this.updatePerformanceIndicators(mode);
    }

    adjustAnimationsForPerformance(mode) {
        const config = this.performanceMonitor?.getPerformanceConfig() || {};

        // Apply performance-based CSS classes
        document.body.classList.remove('perf-high', 'perf-medium', 'perf-low');
        document.body.classList.add(`perf-${mode}`);

        // Adjust particle count
        if (config.particleCount !== undefined) {
            this.updateParticleCount(config.particleCount);
        }

        // Enable/disable 3D effects
        if (!config.enable3D) {
            document.body.classList.add('disable-3d');
        } else {
            document.body.classList.remove('disable-3d');
        }

        // Enable/disable particles
        if (!config.enableParticles) {
            document.body.classList.add('disable-particles');
        } else {
            document.body.classList.remove('disable-particles');
        }
    }

    updateParticleCount(newCount) {
        // Update existing particle systems
        const particleContainers = document.querySelectorAll('.particle');
        const currentCount = particleContainers.length;

        if (newCount < currentCount) {
            // Remove excess particles
            for (let i = newCount; i < currentCount; i++) {
                if (particleContainers[i]) {
                    particleContainers[i].remove();
                }
            }
        }
    }

    updatePerformanceIndicators(mode) {
        // Add visual indicator for performance mode (optional)
        const indicator = document.querySelector('.performance-indicator');
        if (indicator) {
            indicator.textContent = `Performance: ${mode}`;
            indicator.className = `performance-indicator perf-${mode}`;
        }
    }

    setupEventListeners() {
        // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.loadComponents();
        });

        // Window Load
        window.addEventListener('load', () => {
            this.hideLoadingScreen();
        });

        // Scroll Events
        window.addEventListener('scroll', () => {
            this.updateScrollProgress();
            this.updateHeaderBackground();
            this.handleScrollAnimations();
        });

        // Resize Events
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    initializeComponents() {
        // Initialize all interactive components
        this.initMobileMenu();
        this.initScrollToTop();
        this.initParticles();
    }

    handleLoading() {
        // Show loading screen initially
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    setupScrollProgress() {
        const progressBar = document.getElementById('scroll-progress');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            this.updateScrollProgress();
        });
    }

    updateScrollProgress() {
        const progressBar = document.getElementById('scroll-progress');
        if (!progressBar) return;

        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;

        progressBar.style.transform = `scaleX(${Math.min(scrollPercent, 1)})`;
    }

    updateHeaderBackground() {
        const header = document.getElementById('header');
        if (!header) return;

        const scrollY = window.scrollY;

        if (scrollY > 100) {
            header.classList.add('glass');
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('glass');
            header.classList.remove('shadow-lg');
        }
    }

    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                    const targetPosition = target.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Update active navigation link on scroll
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');

                    // Remove active class from all nav links
                    navLinks.forEach(link => link.classList.remove('active'));

                    // Add active class to current section's nav link
                    const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -50% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenuClose = document.getElementById('mobile-menu-close');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

        if (!mobileMenuToggle || !mobileMenu) return;

        const openMenu = () => {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('hidden');
            }
            document.body.classList.add('overflow-hidden');
        };

        const closeMenu = () => {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.add('hidden');
            }
            document.body.classList.remove('overflow-hidden');
        };

        // Toggle menu
        mobileMenuToggle.addEventListener('click', openMenu);

        // Close menu
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMenu);
        }

        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', closeMenu);
        }

        // Close menu when clicking on menu links
        mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    initScrollToTop() {
        // Create scroll to top button
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
        `;
        scrollToTopBtn.className = 'fixed bottom-8 right-8 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 pointer-events-none z-40';
        scrollToTopBtn.id = 'scroll-to-top';

        document.body.appendChild(scrollToTopBtn);

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                scrollToTopBtn.classList.add('opacity-100');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
                scrollToTopBtn.classList.remove('opacity-100');
            }
        });

        // Scroll to top functionality
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    initParticles() {
        // Create floating particles for hero section
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;

        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle bg-primary-500 opacity-20';

            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 6}s`;
            particle.style.animationDuration = `${6 + Math.random() * 4}s`;

            heroSection.appendChild(particle);
        }
    }

    handleScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-slide-up');
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                }
            });
        }, observerOptions);

        // Observe elements with animation class
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('opacity-0', 'translate-y-8');
            observer.observe(el);
        });
    }

    handleResize() {
        // Handle window resize events
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

        if (window.innerWidth >= 1024) {
            // Desktop view - hide mobile menu
            if (mobileMenu) {
                mobileMenu.classList.add('translate-x-full');
                mobileMenu.classList.remove('translate-x-0');
            }
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.add('hidden');
            }
            document.body.classList.remove('overflow-hidden');
        }
    }

    async loadComponents() {
        // Skip component loading since content is inline
        // Initialize animations directly
        setTimeout(() => {
            this.handleScrollAnimations();
        }, 100);
    }

    async loadComponent(elementId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (response.ok) {
                const html = await response.text();
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = html;
                }
            }
        } catch (error) {
            // Fallback to inline content if component files don't exist
            this.createFallbackContent(elementId);
        }
    }

    createFallbackContent(elementId) {
        // Create fallback content when component files are not available
        const element = document.getElementById(elementId);
        if (!element) return;

        switch (elementId) {
            case 'header':
                this.createHeaderContent(element);
                break;
            case 'sidebar':
                this.createSidebarContent(element);
                break;
            case 'hero':
                this.createHeroContent(element);
                break;
            case 'about':
                this.createAboutContent(element);
                break;
            case 'skills':
                this.createSkillsContent(element);
                break;
            case 'portfolio':
                this.createPortfolioContent(element);
                break;
            case 'blog':
                this.createBlogContent(element);
                break;
            case 'contact':
                this.createContactContent(element);
                break;
            case 'footer':
                this.createFooterContent(element);
                break;
        }
    }

    // Fallback content creation methods will be implemented in components.js
}

// Initialize the portfolio
const portfolio = new ModernPortfolio();