import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
}

const RevealOnScroll = ({ 
  children, 
  className = '', 
  direction = 'up',
  delay = 0,
  duration = 800,
  distance = 50
}: RevealOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reduced delay on mobile for smoother experience
          const actualDelay = isMobile ? Math.min(delay, 100) : delay;
          setTimeout(() => setIsVisible(true), actualDelay);
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: isMobile ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  }, [delay, isMobile]);

  const getTransform = () => {
    // Reduced distance on mobile
    const mobileDistance = isMobile ? Math.min(distance, 30) : distance;
    
    switch (direction) {
      case 'up': return `translateY(${mobileDistance}px)`;
      case 'down': return `translateY(-${mobileDistance}px)`;
      case 'left': return `translateX(${mobileDistance}px)`;
      case 'right': return `translateX(-${mobileDistance}px)`;
      default: return `translateY(${mobileDistance}px)`;
    }
  };

  // On mobile, use shorter duration
  const actualDuration = isMobile ? Math.min(duration, 500) : duration;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : getTransform(),
        transition: `opacity ${actualDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${actualDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
