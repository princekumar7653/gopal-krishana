import type { 
  SkillCategory, 
  Project, 
  ContactFormData, 
  ContactFormSubmissionResponse,
  IApiService 
} from '../types';
import { ApiError } from '../types';
import { API_BASE_URL } from '../utils/constants';

class ApiService implements IApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic fetch wrapper with error handling
   */
  private async fetchWithErrorHandling<T>(
    url: string, 
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData.code || 'FETCH_ERROR'
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Handle network errors or other fetch failures
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error occurred',
        0,
        'NETWORK_ERROR'
      );
    }
  }

  /**
   * Fetch skills data from JSON file or API
   */
  async getSkills(): Promise<SkillCategory[]> {
    try {
      // First try to fetch from static JSON file
      const response = await fetch('/data/skills.json');
      if (response.ok) {
        const data = await response.json();
        return data.skillCategories;
      }
      
      // Fallback to API endpoint
      const apiData = await this.fetchWithErrorHandling<{ skillCategories: SkillCategory[] }>(
        `${this.baseUrl}/api/skills`
      );
      return apiData.skillCategories;
    } catch (error) {
      console.error('Failed to fetch skills:', error);
      
      // Return fallback data if both sources fail
      return this.getFallbackSkills();
    }
  }

  /**
   * Fetch projects data from JSON file or API
   */
  async getProjects(): Promise<Project[]> {
    try {
      // First try to fetch from static JSON file
      const response = await fetch('/data/projects.json');
      if (response.ok) {
        const data = await response.json();
        return data.projects;
      }
      
      // Fallback to API endpoint
      const apiData = await this.fetchWithErrorHandling<{ projects: Project[] }>(
        `${this.baseUrl}/api/projects`
      );
      return apiData.projects;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      
      // Return fallback data if both sources fail
      return this.getFallbackProjects();
    }
  }

  /**
   * Submit contact form data
   */
  async submitContactForm(data: ContactFormData): Promise<ContactFormSubmissionResponse> {
    try {
      // Validate form data
      this.validateContactForm(data);

      const response = await this.fetchWithErrorHandling<ContactFormSubmissionResponse>(
        `${this.baseUrl}/api/contact`,
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      );

      return response;
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(
        'Failed to submit contact form. Please try again later.',
        500,
        'SUBMISSION_ERROR'
      );
    }
  }

  /**
   * Validate contact form data
   */
  private validateContactForm(data: ContactFormData): void {
    const errors: string[] = [];

    if (!data.name?.trim()) {
      errors.push('Name is required');
    }

    if (!data.email?.trim()) {
      errors.push('Email is required');
    } else if (!this.isValidEmail(data.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!data.subject?.trim()) {
      errors.push('Subject is required');
    }

    if (!data.message?.trim()) {
      errors.push('Message is required');
    } else if (data.message.length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    if (errors.length > 0) {
      throw new ApiError(
        errors.join(', '),
        400,
        'VALIDATION_ERROR'
      );
    }
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Fallback skills data
   */
  private getFallbackSkills(): SkillCategory[] {
    return [
      {
        name: "Frontend Development",
        skills: [
          {
            name: "React",
            proficiency: 85,
            icon: "react",
            description: "Component-based development and state management"
          },
          {
            name: "TypeScript",
            proficiency: 80,
            icon: "typescript",
            description: "Type-safe JavaScript development"
          },
          {
            name: "JavaScript",
            proficiency: 90,
            icon: "javascript",
            description: "ES6+, DOM manipulation, and modern JavaScript"
          }
        ]
      }
    ];
  }

  /**
   * Fallback projects data
   */
  private getFallbackProjects(): Project[] {
    return [
      {
        id: "portfolio",
        title: "Portfolio Website",
        description: "Modern React portfolio with TypeScript",
        longDescription: "A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.",
        image: "/assets/images/portfolio-placeholder.jpg",
        images: ["/assets/images/portfolio-placeholder.jpg"],
        technologies: ["React", "TypeScript", "Tailwind CSS"],
        category: "Web Application",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        completedDate: "2024-01"
      }
    ];
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      return await this.fetchWithErrorHandling<{ status: string; timestamp: string }>(
        `${this.baseUrl}/api/health`
      );
    } catch (error) {
      return {
        status: 'offline',
        timestamp: new Date().toISOString()
      };
    }
  }
}

// Create and export singleton instance
export const apiService = new ApiService();
export default ApiService;