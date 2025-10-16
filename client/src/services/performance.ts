import type {
  PerformanceMetrics,
  DeviceCapabilities,
  PerformanceMode,
  PerformanceConfig,
  IPerformanceMonitor,
  IDeviceDetector,
  MemoryInfo,
  NetworkInfo,
  BatteryInfo
} from '../types/performance';
import { PERFORMANCE_THRESHOLDS } from '../utils/constants';

class PerformanceMonitorService implements IPerformanceMonitor {
  private metrics: PerformanceMetrics;
  private isMonitoring = false;
  private performanceObserver: PerformanceObserver | null = null;
  private frameCount = 0;
  private lastFrameTime = 0;
  private fps = 0;
  private callbacks: ((mode: PerformanceMode) => void)[] = [];
  private currentMode: PerformanceMode = 'high';

  constructor() {
    this.metrics = this.initializeMetrics();
  }

  /**
   * Initialize default metrics
   */
  private initializeMetrics(): PerformanceMetrics {
    return {
      fps: 60,
      memoryUsage: 0,
      loadTime: 0,
      renderTime: 0,
      deviceCapabilities: deviceDetector.getCapabilities(),
    };
  }

  /**
   * Start performance monitoring
   */
  startMonitoring(): void {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.startFPSMonitoring();
    this.startMemoryMonitoring();
    this.startPerformanceObserver();
    this.measureLoadTime();

    console.log('Performance monitoring started');
  }

  /**
   * Stop performance monitoring
   */
  stopMonitoring(): void {
    if (!this.isMonitoring) return;

    this.isMonitoring = false;
    
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
      this.performanceObserver = null;
    }

    console.log('Performance monitoring stopped');
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Adjust performance mode based on current metrics
   */
  adjustPerformanceMode(): PerformanceMode {
    const { fps, memoryUsage, deviceCapabilities } = this.metrics;

    let newMode: PerformanceMode = 'high';

    // Check FPS thresholds
    if (fps < PERFORMANCE_THRESHOLDS.fps.low) {
      newMode = 'low';
    } else if (fps < PERFORMANCE_THRESHOLDS.fps.medium) {
      newMode = 'medium';
    }

    // Check memory usage
    if (memoryUsage > PERFORMANCE_THRESHOLDS.memory.medium) {
      newMode = 'low';
    } else if (memoryUsage > PERFORMANCE_THRESHOLDS.memory.high) {
      if (newMode === 'high') newMode = 'medium';
    }

    // Check device capabilities
    if (deviceCapabilities.isLowEnd || deviceCapabilities.isMobile) {
      if (newMode === 'high') newMode = 'medium';
    }

    // Update mode if changed
    if (newMode !== this.currentMode) {
      this.currentMode = newMode;
      this.notifyModeChange(newMode);
    }

    return newMode;
  }

  /**
   * Register callback for performance mode changes
   */
  onPerformanceModeChange(callback: (mode: PerformanceMode) => void): void {
    this.callbacks.push(callback);
  }

  /**
   * Notify all callbacks of mode change
   */
  private notifyModeChange(mode: PerformanceMode): void {
    this.callbacks.forEach(callback => {
      try {
        callback(mode);
      } catch (error) {
        console.error('Error in performance mode callback:', error);
      }
    });
  }

  /**
   * Start FPS monitoring
   */
  private startFPSMonitoring(): void {
    const measureFPS = (timestamp: number) => {
      if (this.lastFrameTime === 0) {
        this.lastFrameTime = timestamp;
      }

      const delta = timestamp - this.lastFrameTime;
      this.frameCount++;

      // Calculate FPS every second
      if (delta >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / delta);
        this.metrics.fps = this.fps;
        this.frameCount = 0;
        this.lastFrameTime = timestamp;

        // Check if performance mode needs adjustment
        this.adjustPerformanceMode();
      }

      if (this.isMonitoring) {
        requestAnimationFrame(measureFPS);
      }
    };

    requestAnimationFrame(measureFPS);
  }

  /**
   * Start memory monitoring
   */
  private startMemoryMonitoring(): void {
    const updateMemoryUsage = () => {
      if (!this.isMonitoring) return;

      try {
        const memoryInfo = this.getMemoryInfo();
        if (memoryInfo) {
          this.metrics.memoryUsage = memoryInfo.usedJSHeapSize;
        }
      } catch (error) {
        console.warn('Memory monitoring not available:', error);
      }

      setTimeout(updateMemoryUsage, 5000); // Check every 5 seconds
    };

    updateMemoryUsage();
  }

  /**
   * Start Performance Observer
   */
  private startPerformanceObserver(): void {
    if (!('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver not supported');
      return;
    }

    try {
      this.performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          if (entry.entryType === 'measure') {
            this.metrics.renderTime = entry.duration;
          }
        });
      });

      this.performanceObserver.observe({ 
        entryTypes: ['measure', 'navigation', 'paint'] 
      });
    } catch (error) {
      console.warn('Failed to start PerformanceObserver:', error);
    }
  }

  /**
   * Measure page load time
   */
  private measureLoadTime(): void {
    if ('performance' in window && 'timing' in performance) {
      const timing = performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      this.metrics.loadTime = loadTime;
    }
  }

  /**
   * Get memory information
   */
  private getMemoryInfo(): MemoryInfo | null {
    // @ts-ignore - performance.memory is not in standard types
    const memory = (performance as any).memory;
    
    if (memory) {
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
      };
    }

    return null;
  }

  /**
   * Get performance configuration based on current mode
   */
  getPerformanceConfig(): PerformanceConfig {
    const mode = this.currentMode;
    
    return {
      particleCount: PERFORMANCE_THRESHOLDS.particles[mode],
      animationQuality: mode,
      enable3D: mode === 'high',
      enableParticles: mode !== 'low',
      enableComplexAnimations: mode === 'high',
      imageQuality: mode,
      lazyLoadImages: mode !== 'high',
    };
  }
}

class DeviceDetectorService implements IDeviceDetector {
  private capabilities: DeviceCapabilities;

  constructor() {
    this.capabilities = this.detectCapabilities();
  }

  /**
   * Get device capabilities
   */
  getCapabilities(): DeviceCapabilities {
    return { ...this.capabilities };
  }

  /**
   * Check if device is mobile
   */
  isMobile(): boolean {
    return this.capabilities.isMobile;
  }

  /**
   * Check if device is low-end
   */
  isLowEndDevice(): boolean {
    return this.capabilities.isLowEnd;
  }

  /**
   * Check if device supports a specific feature
   */
  supportsFeature(feature: string): boolean {
    switch (feature) {
      case 'webgl':
        return this.capabilities.supportsWebGL;
      case 'touch':
        return this.capabilities.supportsTouchEvents;
      case 'intersectionObserver':
        return this.capabilities.supportsIntersectionObserver;
      case 'resizeObserver':
        return this.capabilities.supportsResizeObserver;
      default:
        return false;
    }
  }

  /**
   * Detect device capabilities
   */
  private detectCapabilities(): DeviceCapabilities {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent);
    const isDesktop = !isMobile && !isTablet;

    // Detect low-end device based on various factors
    const isLowEnd = this.detectLowEndDevice();

    // WebGL support
    const supportsWebGL = this.detectWebGLSupport();

    // Touch events support
    const supportsTouchEvents = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Intersection Observer support
    const supportsIntersectionObserver = 'IntersectionObserver' in window;

    // Resize Observer support
    const supportsResizeObserver = 'ResizeObserver' in window;

    // Get screen resolution
    const screenResolution = {
      width: window.screen.width,
      height: window.screen.height,
    };

    // Device pixel ratio
    const devicePixelRatio = window.devicePixelRatio || 1;

    // Max texture size (if WebGL is available)
    let maxTextureSize: number | undefined;
    if (supportsWebGL) {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl && 'getParameter' in gl) {
          const webglContext = gl as WebGLRenderingContext;
          maxTextureSize = webglContext.getParameter(webglContext.MAX_TEXTURE_SIZE);
        }
      } catch (error) {
        console.warn('Failed to get max texture size:', error);
      }
    }

    return {
      isMobile,
      isTablet,
      isDesktop,
      isLowEnd,
      supportsWebGL,
      supportsTouchEvents,
      supportsIntersectionObserver,
      supportsResizeObserver,
      maxTextureSize,
      devicePixelRatio,
      screenResolution,
    };
  }

  /**
   * Detect if device is low-end
   */
  private detectLowEndDevice(): boolean {
    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 1;
    if (cores <= 2) return true;

    // Check memory (if available)
    // @ts-ignore - deviceMemory is not in standard types
    const memory = (navigator as any).deviceMemory;
    if (memory && memory <= 2) return true;

    // Check connection (if available)
    // @ts-ignore - connection is not in standard types
    const connection = (navigator as any).connection;
    if (connection && connection.effectiveType === 'slow-2g') return true;

    // Check user agent for known low-end devices
    const userAgent = navigator.userAgent.toLowerCase();
    const lowEndPatterns = [
      'android 4',
      'android 5',
      'iphone os 9',
      'iphone os 10',
    ];

    return lowEndPatterns.some(pattern => userAgent.includes(pattern));
  }

  /**
   * Detect WebGL support
   */
  private detectWebGLSupport(): boolean {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get network information
   */
  getNetworkInfo(): NetworkInfo | null {
    // @ts-ignore - connection is not in standard types
    const connection = (navigator as any).connection;
    
    if (connection) {
      return {
        effectiveType: connection.effectiveType || '4g',
        downlink: connection.downlink || 10,
        rtt: connection.rtt || 100,
        saveData: connection.saveData || false,
      };
    }

    return null;
  }

  /**
   * Get battery information
   */
  async getBatteryInfo(): Promise<BatteryInfo | null> {
    try {
      // @ts-ignore - getBattery is not in standard types
      const battery = await (navigator as any).getBattery();
      
      if (battery) {
        return {
          charging: battery.charging,
          level: battery.level,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
        };
      }
    } catch (error) {
      console.warn('Battery API not available:', error);
    }

    return null;
  }
}

// Create singleton instances
export const performanceMonitor = new PerformanceMonitorService();
export const deviceDetector = new DeviceDetectorService();

// Export classes for advanced usage
export { PerformanceMonitorService, DeviceDetectorService };