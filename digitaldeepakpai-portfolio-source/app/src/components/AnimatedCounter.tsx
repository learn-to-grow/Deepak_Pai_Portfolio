import { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  trigger?: boolean;
}

const AnimatedCounter = ({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  className = '',
  trigger = true 
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // If trigger is false, just show the end value immediately
    if (!trigger) {
      setCount(end);
      return;
    }

    // Only animate once when trigger becomes true
    if (trigger && !hasAnimated.current) {
      hasAnimated.current = true;
      
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(easeOut * end);
        
        setCount(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [trigger, end, duration]);

  return (
    <span className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
