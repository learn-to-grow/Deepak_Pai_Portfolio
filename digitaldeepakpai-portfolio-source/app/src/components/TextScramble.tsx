import { useEffect, useState } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  trigger?: boolean;
}

const TextScramble = ({ text, className = '', delay = 0, trigger = true }: TextScrambleProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!trigger) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [trigger, delay]);

  return (
    <span 
      className={`${className} transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}
      style={{ display: 'inline-block' }}
    >
      {text}
    </span>
  );
};

export default TextScramble;
