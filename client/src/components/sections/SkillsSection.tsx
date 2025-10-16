import React, { useEffect, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface Skill {
  name: string;
  level: number;
  color: string;
  icon: string;
}

const SkillsSection: React.FC = () => {
  const [sectionRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const [animatedLevels, setAnimatedLevels] = useState<{ [key: string]: number }>({});

  const skills: Skill[] = [
    { name: 'HTML5', level: 90, color: 'bg-orange-500', icon: 'H' },
    { name: 'CSS3', level: 85, color: 'bg-blue-500', icon: 'C' },
    { name: 'JavaScript', level: 80, color: 'bg-yellow-500', icon: 'JS' },
    { name: 'React', level: 75, color: 'bg-cyan-500', icon: 'R' },
    { name: 'Bootstrap', level: 90, color: 'bg-purple-500', icon: 'B' },
    { name: 'Tailwind CSS', level: 85, color: 'bg-teal-500', icon: 'T' },
    { name: 'TypeScript', level: 70, color: 'bg-blue-600', icon: 'TS' },
    { name: 'Git', level: 75, color: 'bg-red-500', icon: 'G' }
  ];

  const tools = [
    { name: 'VS Code', icon: '💻' },
    { name: 'Figma', icon: '🎨' },
    { name: 'Canva', icon: '🖌️' },
    { name: 'GitHub', icon: '🐙' },
    { name: 'Vercel', icon: '▲' },
    { name: 'Netlify', icon: '🌐' }
  ];

  // Animate progress bars when section comes into view
  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        const newLevels: { [key: string]: number } = {};
        skills.forEach(skill => {
          newLevels[skill.name] = skill.level;
        });
        setAnimatedLevels(newLevels);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isIntersecting, skills]);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 relative bg-slate-900"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent mb-6">
            Technical Skills
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {skills.map((skill, index) => (
            <div 
              key={skill.name}
              className={`bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl text-center border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: isIntersecting ? `${index * 100}ms` : '0ms'
              }}
            >
              {/* Skill Icon */}
              <div className={`w-16 h-16 ${skill.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <span className="text-white font-bold text-xl">{skill.icon}</span>
              </div>

              {/* Skill Name */}
              <h3 className="text-lg font-semibold text-white mb-4">{skill.name}</h3>

              {/* Progress Bar */}
              <div className="w-full bg-slate-700 rounded-full h-2 mb-2 overflow-hidden">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ease-out ${skill.color}`}
                  style={{ 
                    width: `${animatedLevels[skill.name] || 0}%`,
                    transitionDelay: `${index * 100 + 500}ms`
                  }}
                ></div>
              </div>

              {/* Percentage */}
              <span className="text-slate-400 text-sm font-medium">{skill.level}%</span>
            </div>
          ))}
        </div>

        {/* Tools & Technologies */}
        <div className={`transition-all duration-1000 delay-800 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-2xl font-bold text-white text-center mb-8">Tools & Technologies</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {tools.map((tool) => (
              <div 
                key={tool.name}
                className="bg-slate-800/50 backdrop-blur-md p-4 rounded-xl text-center border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </div>
                <p className="text-slate-300 text-sm font-medium">{tool.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl border border-slate-700/50 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">What I Bring to the Table</h3>
            <p className="text-slate-300 leading-relaxed">
              With a strong foundation in modern web technologies and a passion for creating exceptional user experiences, 
              I combine technical expertise with creative problem-solving to deliver high-quality solutions. 
              I'm constantly learning and adapting to new technologies to stay at the forefront of web development.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">Fast Development</h4>
                <p className="text-slate-400 text-sm">Quick turnaround with clean, efficient code</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">User-Focused</h4>
                <p className="text-slate-400 text-sm">Designs that prioritize user experience</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">Quality Assured</h4>
                <p className="text-slate-400 text-sm">Thoroughly tested and optimized solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/3 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
};

export default SkillsSection;