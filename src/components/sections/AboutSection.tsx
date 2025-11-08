import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useTheme } from '../../contexts/ThemeContext';

const AboutSection: React.FC = () => {
  const { isDark } = useTheme();
  const [sectionRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const services = [
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      ),
      title: 'Web Development',
      description: 'Creating responsive and modern web applications',
      color: 'bg-blue-500'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
        </svg>
      ),
      title: 'UI/UX Design',
      description: 'Designing intuitive and beautiful user interfaces',
      color: 'bg-purple-500'
    }
  ];

  const stats = [
    { number: '6', label: 'Month Experience' },
    { number: '2+', label: 'Projects Completed' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`py-20 relative transition-colors duration-500 ${
        isDark ? 'bg-slate-800' : 'bg-gray-100'
      }`}
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent mb-6">
            About Me
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-slate-400' : 'text-gray-600'
          }`}>
            I am Gopal Krishna Chanchal, a seasoned frontend developer with over 6 Month of hands-on experience in creating modern, responsive web applications.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className={`text-lg leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>
              Proficient in HTML, CSS, Bootstrap, JavaScript, and React, I am well-versed in crafting dynamic and visually appealing web interfaces. 
              My expertise extends to utilizing modern frameworks and libraries to build scalable and maintainable codebases.
            </p>

            <p className={`text-lg leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>
              As an individual, I am proactive and always on the lookout for new opportunities to further enhance my skills and contribute to innovative projects. 
              I am confident in my ability to deliver high-quality results and thrive in a collaborative work environment.
            </p>

            <p className={`text-lg leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>
              My passion lies in creating seamless user experiences through clean, efficient code and modern design principles. 
              I believe in continuous learning and staying updated with the latest technologies and industry trends.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              {stats.slice(0, 2).map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-500">{stat.number}</div>
                  <div className={isDark ? 'text-slate-400' : 'text-gray-500'}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <a 
                href="/assets/Gopal_front_end_developer_resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 group"
              >
                Download Resume
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Services Grid */}
          <div className={`grid grid-cols-1 gap-6 transition-all duration-1000 delay-400 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {services.map((service, index) => (
              <div 
                key={index}
                className={`backdrop-blur-md p-6 rounded-2xl border hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 ${
                  isDark 
                    ? 'bg-slate-800/50 border-slate-700/50' 
                    : 'bg-white/70 border-gray-200/70 shadow-sm'
                }`}
              >
                <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                  {service.icon}
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>{service.title}</h3>
                <p className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-gray-600'
                }`}>{service.description}</p>
              </div>
            ))}

            {/* Additional Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.slice(2).map((stat, index) => (
                <div 
                  key={index}
                  className={`backdrop-blur-md p-4 rounded-xl border text-center hover:border-blue-500/50 transition-all duration-300 ${
                    isDark 
                      ? 'bg-slate-800/50 border-slate-700/50' 
                      : 'bg-white/70 border-gray-200/70 shadow-sm'
                  }`}
                >
                  <div className="text-2xl font-bold text-cyan-500">{stat.number}</div>
                  <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
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

export default AboutSection;