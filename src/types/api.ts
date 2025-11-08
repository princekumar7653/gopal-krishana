// API related types and interfaces

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export class ApiError extends Error {
  public status: number;
  public code: string;

  constructor(message: string, status: number, code: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export interface ContactFormSubmissionResponse {
  success: boolean;
  message: string;
}

// API Service interface
export interface IApiService {
  getSkills(): Promise<import('./index').SkillCategory[]>;
  getProjects(): Promise<import('./index').Project[]>;
  submitContactForm(data: import('./index').ContactFormData): Promise<ContactFormSubmissionResponse>;
}

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Request configuration
export interface RequestConfig {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}