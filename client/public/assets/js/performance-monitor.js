/**
 * Performance Monitor System
 * Tracks FPS, memory usage, and optimizes animations based on device capabilities
 */

class PerformanceMonitor {
    constructor() {
        this.fps = 60;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fpsHistory = [];
        this.performanceMode = 'high';
        this.deviceCapabilities = this.detectDeviceCapabilities();
        this.isMonitoring = false;
        
        this.init();
    }

    init() {
        this.setInitialPerformanceMode();
        this.startMonitoring();
        this.setupEventListeners();
    }

    detectDeviceCapabilities() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        const capabilities = {
            webgl: !!gl,
            deviceMemory: navigator.deviceMemory || 4,
            hardwareConcurrency: navigator.hardwareConcurrency || 4,
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            isLowEnd: false
        };

        // Determine if device is low-end
        capabilities.isLowEnd = capabilities.deviceMemory < 4 || 
                               capabilities.hardwareConcurrency < 4 || 
                               capabilities.isMobile;

        return capabilities;
    }

    setInitialPerformanceMode() {
        if (this.deviceCapabilities.isLowEnd) {
            this.performanceMode = 'low';
        } else if (this.deviceCapabilities.isMobile) {
            this.performanceMode = 'medium';
        } else {
            this.performanceMode = 'high';
        }

        this.applyPerformanceMode();
    }

    startMonitoring() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        this.monitorFrame();
    }

    stopMonitoring() {
        this.isMonitoring = false;
    }

    monitorFrame() {
        if (!this.isMonitoring) return;

        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastTime;
        
        if (deltaTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / deltaTime);
            this.fpsHistory.push(this.fps);
            
            // Keep only last 10 FPS readings
            if (this.fpsHistory.length > 10) {
                this.fpsHistory.shift();
            }
            
            this.checkPerformance();
            
            this.frameCount = 0;
            this.lastTime = currentTime;
        }
        
        this.frameCount++;
        requestAnimationFrame(() => this.monitorFrame());
    }

    checkPerformance() {
        const avgFps = this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length;
        
        // Adjust performance mode based on FPS
        if (avgFps < 20 && this.performanceMode !== 'low') {
            this.degradePerformance();
        } else if (avgFps > 50 && this.performanceMode === 'low') {
            this.improvePerformance();
        }
    }

    degradePerformance() {
        const modes = ['high', 'medium', 'low'];
        const currentIndex = modes.indexOf(this.performanceMode);
        
        if (currentIndex < modes.length - 1) {
            this.performanceMode = modes[currentIndex + 1];
            this.applyPerformanceMode();
            // Performance degraded
        }
    }

    improvePerformance() {
        const modes = ['high', 'medium', 'low'];
        const currentIndex = modes.indexOf(this.performanceMode);
        
        if (currentIndex > 0) {
            this.performanceMode = modes[currentIndex - 1];
            this.applyPerformanceMode();
            // Performance improved
        }
    }

    applyPerformanceMode() {
        const body = document.body;
        
        // Remove existing performance classes
        body.classList.remove('perf-high', 'perf-medium', 'perf-low');
        
        // Add current performance class
        body.classList.add(`perf-${this.performanceMode}`);
        
        // Dispatch performance change event
        window.dispatchEvent(new CustomEvent('performanceModeChanged', {
            detail: { mode: this.performanceMode, capabilities: this.deviceCapabilities }
        }));
    }

    getPerformanceConfig() {
        const configs = {
            high: {
                fps: 60,
                quality: 'ultra',
                particleCount: 50,
                animationComplexity: 'full',
                enable3D: true,
                enableParticles: true,
                enableMorphing: true
            },
            medium: {
                fps: 30,
                quality: 'high',
                particleCount: 25,
                animationComplexity: 'reduced',
                enable3D: true,
                enableParticles: true,
                enableMorphing: false
            },
            low: {
                fps: 15,
                quality: 'medium',
                particleCount: 10,
                animationComplexity: 'minimal',
                enable3D: false,
                enableParticles: false,
                enableMorphing: false
            }
        };

        return configs[this.performanceMode];
    }

    setupEventListeners() {
        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopMonitoring();
            } else {
                this.startMonitoring();
            }
        });

        // Handle reduced motion preference
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            mediaQuery.addListener(() => this.handleReducedMotion(mediaQuery.matches));
            this.handleReducedMotion(mediaQuery.matches);
        }
    }

    handleReducedMotion(prefersReduced) {
        if (prefersReduced) {
            this.performanceMode = 'low';
            this.applyPerformanceMode();
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
    }

    // Public API
    getCurrentFPS() {
        return this.fps;
    }

    getAverageFPS() {
        return this.fpsHistory.length > 0 
            ? this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length 
            : 0;
    }

    getPerformanceMode() {
        return this.performanceMode;
    }

    getDeviceCapabilities() {
        return this.deviceCapabilities;
    }

    forcePerformanceMode(mode) {
        if (['high', 'medium', 'low'].includes(mode)) {
            this.performanceMode = mode;
            this.applyPerformanceMode();
        }
    }
}

// Global performance monitor instance
window.PerformanceMonitor = PerformanceMonitor;