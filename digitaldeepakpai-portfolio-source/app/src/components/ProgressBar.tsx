import { useEffect, useRef, useState } from 'react';

const ProgressBar = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      // Show/hide progress bar based on scroll
      setIsVisible(scrollTop > 100);

      // Determine active section
      const sections = ['hero', 'executive', 'value-creator', 'projects', 'contact'];
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'executive', label: 'About' },
    { id: 'value-creator', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  // Don't show on mobile
  if (isMobile) return null;

  return (
    <div 
      className={`fixed left-4 lg:left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3 lg:gap-4 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}
    >
      {/* Progress Bar Background */}
      <div className="absolute w-0.5 h-full bg-gray-200/20 dark:bg-white/10 rounded-full" />
      
      {/* Progress Bar Fill with glow */}
      <div 
        ref={progressRef}
        className="absolute w-0.5 bg-gradient-to-b from-[var(--bronze)] to-[var(--orange-accent)] rounded-full origin-top transition-all duration-100"
        style={{ height: `${scrollProgress}%`, boxShadow: '0 0 10px rgba(176, 137, 104, 0.5)' }}
      />
      
      {/* Section Dots */}
      <div className="relative flex flex-col gap-4 lg:gap-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`relative w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-300 cursor-pointer group ${
              activeSection === section.id 
                ? 'bg-[var(--bronze)] scale-125 lg:scale-150' 
                : 'bg-white/30 dark:bg-white/20 hover:bg-[var(--bronze)]/50'
            }`}
            style={activeSection === section.id ? { boxShadow: '0 0 10px rgba(176, 137, 104, 0.8)' } : {}}
            aria-label={`Go to ${section.label}`}
          >
            {/* Pulse animation for active */}
            {activeSection === section.id && (
              <span className="absolute inset-0 rounded-full bg-[var(--bronze)] animate-ping opacity-50" />
            )}
            
            {/* Tooltip */}
            <span className="absolute left-5 lg:left-6 top-1/2 -translate-y-1/2 px-2 lg:px-3 py-1 lg:py-1.5 bg-[var(--charcoal)] dark:bg-white text-white dark:text-[var(--charcoal)] text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-white/10 dark:border-black/10">
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
