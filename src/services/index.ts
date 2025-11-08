// Export all services
export { apiService, default as ApiService } from './api';
export { animationService, default as AnimationService } from './animations';
export { 
  performanceMonitor, 
  deviceDetector, 
  PerformanceMonitorService, 
  DeviceDetectorService 
} from './performance';

// Re-export types for convenience
export type {
  IApiService,
  IPerformanceMonitor,
  IDeviceDetector,
} from '../types';