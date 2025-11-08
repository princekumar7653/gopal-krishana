import React from 'react';
import { PERSONAL_INFO } from '../../utils/constants';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  link: string;
}

const BlogSection: React.FC = () => {
  const [sectionRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Modern Frontend Development Trends in 2024',
      excerpt: 'Exploring the latest trends in frontend development including React 18, Next.js 14, and the rise of AI-powered development tools that are shaping the future of web development.',
      category: 'Development',
      readTime: '5 min read',
      date: 'December 15, 2023',
      author: 'Gopal Krishna Chanchal',
      image: '/assets/images/projects/blog-frontend.jpg',
      link: '#'
    },
    {
      id: '2',
      title: 'Essential UI/UX Design Principles for Developers',
      excerpt: 'A comprehensive guide to understanding user interface and user experience design principles that every frontend developer should know to create better web applications.',
      category: 'Design',
      readTime: '7 min read',
      date: 'November 28, 2023',
      author: 'Gopal Krishna Chanchal',
      image: '/assets/images/projects/blog-design.jpg',
      link: '#'
    },
    {
      id: '3',
      title: 'React Performance Optimization Techniques',
      excerpt: 'Learn advanced React performance optimization techniques including memoization, code splitting, and bundle optimization to create lightning-fast web applications.',
      category: 'React',
      readTime: '8 min read',
      date: 'October 20, 2023',
      author: 'Gopal Krishna Chanchal',
      image: '/assets/images/projects/blog-react.jpg',
      link: '#'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'development':
        return 'bg-blue-500';
      case 'design':
        return 'bg-purple-500';
      case 'react':
        return 'bg-cyan-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <section 
      id="blog" 
      ref={sectionRef}
      className="py-20 relative bg-slate-900"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent mb-6">
            Latest Blog Posts
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Sharing my thoughts, experiences, and insights about web development, design trends, and technology
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article 
              key={post.id}
              className={`bg-slate-800/50 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: isIntersecting ? `${index * 200}ms` : '0ms'
              }}
            >
              {/* Post Image */}
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className={`${getCategoryColor(post.category)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {post.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center text-slate-400 text-sm mb-3">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {post.date}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 hover:text-blue-500 transition-colors cursor-pointer line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-400 mb-4 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{(PERSONAL_INFO && PERSONAL_INFO.name && PERSONAL_INFO.name.charAt(0)) || 'G'}</span>
                    </div>
                    <span className="text-slate-400 text-sm">{post.author}</span>
                  </div>
                  <a 
                    href={post.link}
                    className="inline-flex items-center text-blue-500 hover:text-blue-400 transition-colors text-sm font-medium group"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Posts Button */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-600 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <a 
            href="#" 
            className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 group"
          >
            View All Posts
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

export default BlogSection;