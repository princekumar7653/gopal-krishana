/**
 * Device Detection and Optimization System
 * Detects device capabilities and applies appropriate optimizations
 */

class DeviceDetector {
    constructor() {
        this.device = this.detectDevice();
        this.capabilities = this.detectCapabilities();
        this.network = this.detectNetwork();
        this.init();
    }

    init() {
        this.applyDeviceOptimizations();
        this.setupNetworkMonitoring();
        this.setupOrientationHandling();
    }

    detectDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        
        const device = {
            isMobile: /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent),
            isTablet: /ipad|android(?!.*mobile)|tablet/i.test(userAgent),
            isDesktop: false,
            isIOS: /iphone|ipad|ipod/i.test(userAgent),
            isAndroid: /android/i.test(userAgent),
            isSafari: /safari/i.test(userAgent) && !/chrome/i.test(userAgent),
            isChrome: /chrome/i.test(userAgent),
            isFirefox: /firefox/i.test(userAgent),
            isEdge: /edge/i.test(userAgent)
        };

        device.isDesktop = !device.isMobile && !device.isTablet;
        
        return device;
    }

    detectCapabilities() {
        const capabilities = {
            // Hardware
            deviceMemory: navigator.deviceMemory || 4,
            hardwareConcurrency: navigator.hardwareConcurrency || 4,
            
            // Graphics
            webgl: this.checkWebGLSupport(),
            webgl2: this.checkWebGL2Support(),
            
            // Features
            touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
            pointerEvents: 'PointerEvent' in window,
            intersectionObserver: 'IntersectionObserver' in window,
            
            // Performance indicators
            isLowEnd: false,
            performanceLevel: 'high'
        };

        // Determine performance level
        if (capabilities.deviceMemory < 2 || capabilities.hardwareConcurrency < 2) {
            capabilities.isLowEnd = true;
            capabilities.performanceLevel = 'low';
        } else if (capabilities.deviceMemory < 4 || capabilities.hardwareConcurrency < 4 || this.device.isMobile) {
            capabilities.performanceLevel = 'medium';
        }

        return capabilities;
    }

    checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            return !!gl;
        } catch (e) {
            return false;
        }
    }

    checkWebGL2Support() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl2');
            return !!gl;
        } catch (e) {
            return false;
        }
    }

    detectNetwork() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        const network = {
            effectiveType: connection?.effectiveType || '4g',
            downlink: connection?.downlink || 10,
            rtt: connection?.rtt || 100,
            saveData: connection?.saveData || false,
            isSlowConnection: false
        };

        // Determine if connection is slow
        network.isSlowConnection = network.effectiveType === 'slow-2g' || 
                                  network.effectiveType === '2g' || 
                                  network.downlink < 1.5 ||
                                  network.saveData;

        return network;
    }

    applyDeviceOptimizations() {
        const body = document.body;
        if (!body) return; // Safety check
        
        // Add device classes
        if (this.device.isMobile) body.classList.add('is-mobile');
        if (this.device.isTablet) body.classList.add('is-tablet');
        if (this.device.isDesktop) body.classList.add('is-desktop');
        if (this.device.isIOS) body.classList.add('is-ios');
        if (this.device.isAndroid) body.classList.add('is-android');
        
        // Add capability classes
        if (!this.capabilities.webgl) body.classList.add('no-webgl');
        if (this.capabilities.isLowEnd) body.classList.add('low-end-device');
        if (!this.capabilities.touchSupport) body.classList.add('no-touch');
        
        // Add performance level class
        body.classList.add(`perf-${this.capabilities.performanceLevel}`);
        
        // Network optimizations
        if (this.network.isSlowConnection) {
            body.classList.add('slow-connection');
            this.applySlowConnectionOptimizations();
        }
    }

    applySlowConnectionOptimizations() {
        // Reduce animation complexity
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
        
        // Disable non-essential animations
        const style = document.createElement('style');
        style.textContent = `
            .slow-connection .particle,
            .slow-connection .floating-elements,
            .slow-connection .morphing-bg {
                display: none !important;
            }
            
            .slow-connection .animate-float-1,
            .slow-connection .animate-float-2,
            .slow-connection .animate-float-3 {
                animation: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    setupNetworkMonitoring() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        if (connection) {
            connection.addEventListener('change', () => {
                this.network = this.detectNetwork();
                this.handleNetworkChange();
            });
        }
    }

    handleNetworkChange() {
        const body = document.body;
        
        if (this.network.isSlowConnection) {
            body.classList.add('slow-connection');
            this.applySlowConnectionOptimizations();
        } else {
            body.classList.remove('slow-connection');
        }
        
        // Dispatch network change event
        window.dispatchEvent(new CustomEvent('networkChanged', {
            detail: this.network
        }));
    }

    setupOrientationHandling() {
        if (this.device.isMobile || this.device.isTablet) {
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    this.handleOrientationChange();
                }, 100);
            });
        }
    }

    handleOrientationChange() {
        const orientation = window.orientation || 0;
        const body = document.body;
        
        // Remove existing orientation classes
        body.classList.remove('portrait', 'landscape');
        
        // Add current orientation class
        if (Math.abs(orientation) === 90) {
            body.classList.add('landscape');
        } else {
            body.classList.add('portrait');
        }
        
        // Dispatch orientation change event
        window.dispatchEvent(new CustomEvent('orientationChanged', {
            detail: { orientation }
        }));
    }

    // Public API
    getDevice() {
        return this.device;
    }

    getCapabilities() {
        return this.capabilities;
    }

    getNetwork() {
        return this.network;
    }

    isLowEndDevice() {
        return this.capabilities.isLowEnd;
    }

    isMobileDevice() {
        return this.device.isMobile;
    }

    hasWebGLSupport() {
        return this.capabilities.webgl;
    }

    isSlowConnection() {
        return this.network.isSlowConnection;
    }

    getOptimalSettings() {
        return {
            enableAnimations: !this.network.isSlowConnection,
            enable3D: this.capabilities.webgl && !this.capabilities.isLowEnd,
            enableParticles: !this.capabilities.isLowEnd && !this.network.isSlowConnection,
            animationDuration: this.network.isSlowConnection ? 0.2 : 0.6,
            particleCount: this.capabilities.isLowEnd ? 10 : this.device.isMobile ? 25 : 50,
            quality: this.capabilities.performanceLevel
        };
    }
}

// Create global device detector instance
window.deviceDetector = new DeviceDetector();

// Export for module usage
window.DeviceDetector = DeviceDetector;