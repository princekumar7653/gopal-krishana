// Performance monitoring and device detection types

export type PerformanceMode = 'high' | 'medium' | 'low';

export interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  loadTime: number;
  renderTime: number;
  bundleSize?: number;
  deviceCapabilities: DeviceCapabilities;
}

export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLowEnd: boolean;
  supportsWebGL: boolean;
  supportsTouchEvents: boolean;
  supportsIntersectionObserver: boolean;
  supportsResizeObserver: boolean;
  maxTextureSize?: number;
  devicePixelRatio: number;
  screenResolution: {
    width: number;
    height: number;
  };
}

export interface PerformanceConfig {
  particleCount: number;
  animationQuality: 'high' | 'medium' | 'low';
  enable3D: boolean;
  enableParticles: boolean;
  enableComplexAnimations: boolean;
  imageQuality: 'high' | 'medium' | 'low';
  lazyLoadImages: boolean;
}

export interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

export interface NetworkInfo {
  effectiveType: '2g' | '3g' | '4g' | 'slow-2g';
  downlink: number;
  rtt: number;
  saveData: boolean;
}

export interface BatteryInfo {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
}

export interface PerformanceObserverEntry {
  name: string;
  entryType: string;
  startTime: number;
  duration: number;
}

// Performance monitoring service interface
export interface IPerformanceMonitor {
  startMonitoring(): void;
  stopMonitoring(): void;
  getMetrics(): PerformanceMetrics;
  adjustPerformanceMode(): PerformanceMode;
  onPerformanceModeChange(callback: (mode: PerformanceMode) => void): void;
}

// Device detector service interface
export interface IDeviceDetector {
  getCapabilities(): DeviceCapabilities;
  isMobile(): boolean;
  isLowEndDevice(): boolean;
  supportsFeature(feature: string): boolean;
}