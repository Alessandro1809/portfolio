'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Code, Rocket, Award } from 'lucide-react';

type TimelineExperience = {
  year: string;
  title: string;
  company: string;
  description: string;
};

type TimelineCopy = {
  heading: string;
  subheading: string;
  journeyContinues: string;
  experiences: TimelineExperience[];
};

type WorkTimelineProps = {
  timeline: TimelineCopy;
};

const WorkTimeline = ({ timeline }: WorkTimelineProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 1024;
  });
  const timelineRef = useRef<HTMLDivElement>(null);

  const icons = [Code, Briefcase, Rocket, Award];
  const experiences = timeline.experiences.map((experience, index) => ({
    id: index + 1,
    ...experience,
    icon: icons[index] ?? Code,
  }));

  useEffect(() => {
    // Check if desktop on mount and resize
    const checkDesktop = () => {
      const next = window.innerWidth >= 1024;
      setIsDesktop((prev) => (prev === next ? prev : next));
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    let rafId: number | null = null;
    const calculateProgress = () => {
      if (!timelineRef.current) return;
      
      const element = timelineRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = element.offsetHeight;
      
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      
      if (elementBottom < 0) {
        setScrollProgress(1);
      } else if (elementTop > windowHeight) {
        setScrollProgress(0);
      } else {
        const visibleRange = windowHeight + elementHeight;
        const scrolled = windowHeight - elementTop;
        const progress = Math.max(0, Math.min(1, scrolled / visibleRange));
        setScrollProgress(progress);
      }
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        calculateProgress();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Delay initial scroll calculation to allow layout to stabilize
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        calculateProgress();
      });
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkDesktop);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div id="experience" className="w-full text-white py-10 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 pb-[2vh]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-transparent bg-clip-text bg-linear-to-r from-green-400 to-white">
            {timeline.heading}
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">{timeline.subheading}</p>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Vertical line on mobile, S-curve on desktop */}
          <div className="block lg:hidden">
            {/* Mobile vertical line */}
            <div className="absolute left-7 top-0 bottom-0 w-1 bg-gray-700">
              {/* Animated progress line */}
              <div 
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-green-400 via-cyan-400 to-emerald-400 transition-all duration-300 ease-out"
                style={{
                  height: `${scrollProgress * 100}%`,
                  boxShadow: '0 0 20px #10b981, 0 0 40px #10b981'
                }}
              />
            </div>
          </div>

          {/* Desktop S-curve */}
          <svg 
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 110"
            preserveAspectRatio="none"
            style={{ height: '100%', minHeight: '800px' }}
          >
            <defs>
              <filter id="neonGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="neonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.8"/>
              </linearGradient>
            </defs>
            
            {/* Gray base path */}
            <path
              d="M 20,0 Q 20,16.6 50,33.3 T 80,66.6 Q 80,83.3 80,100"
              fill="none"
              stroke="#374151"
              strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Neon progress path */}
            <path
              d="M 20,0 Q 20,16.6 50,33.3 T 80,66.6 Q 80,83.3 80,100"
              fill="none"
              stroke="url(#neonGradient)"
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
              filter="url(#neonGlow)"
              strokeDasharray="2000"
              strokeDashoffset={2000 - (scrollProgress * 2000)}
              style={{
                transition: 'stroke-dashoffset 0.3s ease-out'
              }}
            />
          </svg>

          {/* Timeline items */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-0 lg:relative lg:h-[800px] min-h-[600px]">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              const itemProgress = Math.max(0, Math.min(1, (scrollProgress * experiences.length * 1.5) - index));
              
              // Desktop positions
              const desktopPositions = [
                { top: '5%', left: '20%' },
                { top: '35%', left: '80%' },
                { top: '65%', left: '20%' },
                { top: '95%', left: '80%' }
              ];

              return (
                <div
                  key={exp.id}
                  className="relative lg:absolute"
                  style={{
                    top: isDesktop ? desktopPositions[index].top : 'auto',
                    left: isDesktop ? desktopPositions[index].left : 'auto',
                    transform: isDesktop ? 'translate(-50%, -50%)' : 'none',
                    opacity: isDesktop ? itemProgress : 1,
                    scale: isDesktop ? itemProgress : 1,
                    transition: 'opacity 0.5s, scale 0.5s'
                  }}
                >
                  {/* Mobile Layout */}
                  <div className="flex items-start gap-6 lg:hidden">
                    {/* Icon circle with line connection */}
                    <div className="relative flex-shrink-0">
                      <div 
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center relative z-10 border-4 border-gray-900"
                        style={{
                          boxShadow: itemProgress > 0.5 ? '0 0 30px #10b981, 0 0 60px #10b981' : '0 0 15px #10b981',
                          transition: 'box-shadow 0.5s'
                        }}
                      >
                        <Icon className="w-7 h-7 text-black" strokeWidth={2.5} />
                        {/* Pulsing ring */}
                        {itemProgress > 0.5 && (
                          <div 
                            className="absolute inset-0 rounded-full border-3 border-green-400 animate-ping"
                            style={{ opacity: 0.3 }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Card */}
                    <div 
                      className="flex-1 bg-gray-900/60 backdrop-blur-sm rounded-xl p-5 border-2 border-green-500/30 relative"
                      style={{
                        boxShadow: itemProgress > 0.5 ? '0 0 20px rgba(16, 185, 129, 0.3)' : 'none',
                        transition: 'box-shadow 0.5s'
                      }}
                    >
                      {/* Neon corner accents */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400 rounded-tl-xl" 
                           style={{ boxShadow: '0 0 10px #10b981' }} />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-xl"
                           style={{ boxShadow: '0 0 10px #22d3ee' }} />
                      
                      <div className="text-green-400 font-bold text-xs sm:text-sm mb-2 uppercase tracking-wider"
                           style={{ textShadow: '0 0 10px #10b981' }}>
                        {exp.year}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                        {exp.title}
                      </h3>
                      <div className="text-cyan-400 text-base font-semibold mb-3"
                           style={{ textShadow: '0 0 10px #22d3ee' }}>
                        {exp.company}
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:block">
                    <div className="relative flex flex-col items-center">
                      {/* Icon circle with neon glow */}
                      <div className="relative mb-6 flex justify-center">
                        <div 
                          className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center relative z-10"
                          style={{
                            boxShadow: itemProgress > 0.5 ? '0 0 30px #10b981, 0 0 60px #10b981' : 'none',
                            transition: 'box-shadow 0.5s'
                          }}
                        >
                          <Icon className="w-10 h-10 text-black" strokeWidth={2.5} />
                          {/* Pulsing ring */}
                          {itemProgress > 0.5 && (
                            <div 
                              className="absolute inset-0 rounded-full border-4 border-green-400 animate-ping"
                              style={{ opacity: 0.3 }}
                            />
                          )}
                        </div>
                      </div>

                      {/* Card */}
                      <div 
                        className="w-80 bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-500/30 relative"
                        style={{
                          boxShadow: itemProgress > 0.5 ? '0 0 20px rgba(16, 185, 129, 0.3)' : 'none',
                          transition: 'box-shadow 0.5s'
                        }}
                      >
                        {/* Neon corner accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400 rounded-tl-2xl" 
                             style={{ boxShadow: '0 0 10px #10b981' }} />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-2xl"
                             style={{ boxShadow: '0 0 10px #22d3ee' }} />
                        
                        <div className="text-green-400 font-bold text-sm mb-2 uppercase tracking-wider"
                             style={{ textShadow: '0 0 10px #10b981' }}>
                          {exp.year}
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-white">
                          {exp.title}
                        </h3>
                        <div className="text-cyan-400 text-base font-semibold mb-3"
                             style={{ textShadow: '0 0 10px #22d3ee' }}>
                          {exp.company}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom completion indicator */}
        <div 
          className="text-center mt-16 sm:mt-20 lg:mt-52"
          style={{
            opacity: scrollProgress > 0.75 ? 1 : 0,
            transition: 'opacity 0.5s'
          }}
        >
          <div 
            className="inline-block bg-linear-to-r from-green-400 to-cyan-400 rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-bold text-sm sm:text-base text-black"
            style={{ boxShadow: '0 0 30px #10b981' }}
          >
            {timeline.journeyContinues}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkTimeline;
