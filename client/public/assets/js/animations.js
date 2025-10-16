// Animations JavaScript for Modern Portfolio

class PortfolioAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupTypingAnimation();
        this.setupPortfolioFilters();
        this.setupParallaxEffects();
        this.setupSkillAnimations();
    }

    setupScrollAnimations() {
        // Enhanced Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Add animation classes based on element type
                    if (element.classList.contains('stagger-1')) {
                        setTimeout(() => this.animateElement(element), 100);
                    } else if (element.classList.contains('stagger-2')) {
                        setTimeout(() => this.animateElement(element), 200);
                    } else if (element.classList.contains('stagger-3')) {
                        setTimeout(() => this.animateElement(element), 300);
                    } else if (element.classList.contains('stagger-4')) {
                        setTimeout(() => this.animateElement(element), 400);
                    } else if (element.classList.contains('stagger-5')) {
                        setTimeout(() => this.animateElement(element), 500);
                    } else if (element.classList.contains('stagger-6')) {
                        setTimeout(() => this.animateElement(element), 600);
                    } else {
                        this.animateElement(element);
                    }
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.classList.add('animate-slide-up');
    }

    setupTypingAnimation() {
        const typingElement = document.querySelector('.typing-animation');
        if (!typingElement) return;

        const texts = [
            'Frontend Developer',
            'UI/UX Designer', 
            'React Developer',
            'Web Developer'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';

        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const type = () => {
            const fullText = texts[textIndex];
            
            if (isDeleting) {
                currentText = fullText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = fullText.substring(0, charIndex + 1);
                charIndex++;
            }

            typingElement.textContent = currentText;

            let speed = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === fullText.length) {
                speed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                speed = 500;
            }

            setTimeout(type, speed);
        };

        // Start typing animation after a delay
        setTimeout(type, 1000);
    }

    setupPortfolioFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-primary-500', 'text-white');
                    btn.classList.add('bg-slate-700', 'text-slate-300');
                });
                
                button.classList.add('active', 'bg-primary-500', 'text-white');
                button.classList.remove('bg-slate-700', 'text-slate-300');

                // Filter portfolio items
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    setupSkillAnimations() {
        const skillBars = document.querySelectorAll('.progress-bar');
        
        const animateSkillBars = () => {
            skillBars.forEach((bar, index) => {
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-in-out';
                    bar.style.width = width;
                }, index * 200);
            });
        };

        // Animate skill bars when they come into view
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkillBars();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(skillsSection);
        }
    }

    // Utility method to add ripple effect to buttons
    static addRippleEffect(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Method to handle smooth scrolling with offset
    static smoothScrollTo(target, offset = 80) {
        const element = document.querySelector(target);
        if (element) {
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }

    // Method to animate counter numbers
    static animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Method to create floating particles
    static createFloatingParticles(container, count = 10) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute w-2 h-2 bg-primary-500 rounded-full opacity-30';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (5 + Math.random() * 5) + 's';
            
            container.appendChild(particle);
        }
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
    
    // Add ripple effect to all buttons with btn-ripple class
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-ripple')) {
            const button = e.target.closest('.btn-ripple');
            PortfolioAnimations.addRippleEffect(button, e);
        }
    });
    
    // Add smooth scrolling to all anchor links
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const target = link.getAttribute('href');
            PortfolioAnimations.smoothScrollTo(target);
        }
    });
});

// Add CSS for ripple effect
const rippleCSS = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);