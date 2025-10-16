import React from 'react';
import { useCounterAnimation, useIntersectionObserver } from '../../hooks';
import type { HeroStat } from '../../types';

interface HeroStatsProps {
  stats: HeroStat[];
}

const StatCounter: React.FC<{ stat: HeroStat; isVisible: boolean; delay: number }> = ({ 
  stat, 
  isVisible, 
  delay 
}) => {
  const { elementRef } = useCounterAnimation(stat.value, {
    duration: 2,
    delay: isVisible ? delay : 0,
  });

  return (
    <div className="group text-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-primary-500/50 transition-all duration-300 hover:scale-105 counter-container">
      <div className="text-2xl font-bold text-primary-400 flex items-center justify-center">
        <span ref={elementRef}>0</span>
        {stat.suffix && <span className="ml-1">{stat.suffix}</span>}
      </div>
      <div className="text-xs text-slate-400">{stat.label}</div>
    </div>
  );
};

const HeroStats: React.FC<HeroStatsProps> = ({ stats }) => {
  const [containerRef, isVisible] = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div 
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="hero-stats grid grid-cols-3 gap-4 max-w-lg"
    >
      {stats.map((stat, index) => (
        <StatCounter
          key={stat.label}
          stat={stat}
          isVisible={isVisible}
          delay={index * 0.2}
        />
      ))}
    </div>
  );
};

export default HeroStats;