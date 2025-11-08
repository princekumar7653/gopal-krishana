import React, { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useTheme } from '../../contexts/ThemeContext';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const PortfolioSection: React.FC = () => {
  const { isDark } = useTheme();
  const [sectionRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const [activeFilter, setActiveFilter] = useState('all');

  const projects: Project[] = [
    {
      id: '1',
      title: 'Movie Generator App',
      description: 'A React-based movie discovery application with dynamic filtering and modern UI',
      image: '/assets/images/projects/movie-app.png',
      category: 'web',
      technologies: ['React', 'JavaScript', 'CSS'],
      liveUrl: 'https://shouravkumar21.github.io/harperdb-movies-generator/',
      githubUrl: 'https://github.com/princekumar7653/movie-generator-app'
    },
    {
      id: '2',
      title: 'Aer Agency Website',
      description: 'Modern agency website with responsive design and smooth animations',
      image: '/assets/images/projects/aer-agency.png',
      category: 'web',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://banao-assignment3.vercel.app',
      githubUrl: 'https://github.com/princekumar7653/aer-agency-website'
    },
    {
      id: '3',
      title: 'E-Commerce Dashboard',
      description: 'Admin dashboard for e-commerce platform with analytics and management features',
      image: '/assets/images/projects/ecommerce-dashboard.jpg',
      category: 'web',
      technologies: ['React', 'TypeScript', 'Tailwind'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: '4',
      title: 'Mobile App UI Design',
      description: 'Modern mobile app interface design with clean and intuitive user experience',
      image: '/assets/images/projects/mobile-ui.jpg',
      category: 'design',
      technologies: ['Figma', 'UI/UX'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: '5',
      title: 'Portfolio Website',
      description: 'Personal portfolio website with modern animations and responsive design',
      image: '/assets/images/projects/portfolio-website.jpg',
      category: 'web',
      technologies: ['React', 'TypeScript', 'GSAP'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: '6',
      title: 'Brand Identity Design',
      description: 'Complete brand identity design including logo, colors, and typography',
      image: '/assets/images/projects/brand-identity.jpg',
      category: 'design',
      technologies: ['Canva', 'Design'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'design', label: 'UI/UX Design' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      'React': 'bg-cyan-500',
      'JavaScript': 'bg-yellow-500',
      'TypeScript': 'bg-blue-600',
      'HTML': 'bg-orange-500',
      'CSS': 'bg-blue-500',
      'Tailwind': 'bg-teal-500',
      'UI/UX': 'bg-pink-500',
      'Node.js': 'bg-green-500',
      'express': 'bg-gray-700',
      'mongoDB': 'bg-green-700',
      'mysql': 'bg-blue-800',
    };
    return colors[tech] || 'bg-slate-500';
  };

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className={`py-20 relative transition-colors duration-500 ${
        isDark ? 'bg-slate-800' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent mb-6">
            My Portfolio
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-slate-400' : 'text-gray-600'
          }`}>
            Here are some of the projects I've worked on, showcasing my skills in frontend development and design
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : isDark 
                    ? 'bg-slate-700 text-slate-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`group backdrop-blur-md rounded-2xl overflow-hidden border hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 ${
                isDark 
                  ? 'bg-slate-800/50 border-slate-700/50' 
                  : 'bg-white/90 border-gray-200/50 shadow-lg'
              } ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: isIntersecting ? `${index * 150}ms` : '0ms'
              }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span 
                          key={tech}
                          className={`px-2 py-1 ${getTechColor(tech)} text-white text-xs rounded font-medium`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all group/btn"
                          title="View Live Demo"
                        >
                          <svg className="w-4 h-4 text-white group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                          </svg>
                        </a>
                      )}
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <a 
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all group/btn"
                          title="View Source Code"
                        >
                          <svg className="w-4 h-4 text-white group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {project.title}
                </h3>
                <p className={`text-sm mb-4 leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>
                
                {/* Technology Tags (Mobile) */}
                <div className="flex flex-wrap gap-2 lg:hidden">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className={`px-2 py-1 ${getTechColor(tech)} text-white text-xs rounded font-medium`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-800 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <a 
            href="https://github.com/princekumar7653" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 group"
          >
            View More Projects
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default PortfolioSection;