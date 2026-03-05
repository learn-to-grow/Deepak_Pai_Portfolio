import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if touch device or mobile
    const checkTouch = () => {
      setIsTouchDevice(
        window.matchMedia('(pointer: coarse)').matches || 
        window.innerWidth < 1024
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorTrail = cursorTrailRef.current;
    if (!cursor || !cursorDot || !cursorTrail) return;

    const moveCursor = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Smooth cursor animation
    const animate = () => {
      // Different lerp speeds for different elements
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.12;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.12;
      
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.4;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.4;

      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.06;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.06;

      cursor.style.transform = `translate(${cursorPos.current.x - 16}px, ${cursorPos.current.y - 16}px) ${isClicking ? 'scale(0.8)' : isHovering ? 'scale(2)' : 'scale(1)'}`;
      cursorDot.style.transform = `translate(${dotPos.current.x - 3}px, ${dotPos.current.y - 3}px) ${isClicking ? 'scale(0.5)' : 'scale(1)'}`;
      cursorTrail.style.transform = `translate(${trailPos.current.x - 24}px, ${trailPos.current.y - 24}px)`;
      cursorTrail.style.opacity = isHovering ? '0.3' : '0.1';

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    // Handle hover states
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      window.removeEventListener('resize', checkTouch);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isTouchDevice, isHovering, isClicking]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Trail effect */}
      <div
        ref={cursorTrailRef}
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-[var(--bronze)]/30 pointer-events-none z-[9998]"
      />
      
      {/* Main cursor circle */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[var(--bronze)] pointer-events-none z-[9999] transition-all duration-150 ${
          isHovering ? 'bg-[var(--bronze)]/10' : ''
        }`}
      />
      
      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] transition-all duration-100 ${
          isHovering ? 'bg-[var(--orange-accent)] scale-150' : 'bg-[var(--bronze)]'
        }`}
      />
    </>
  );
};

export default CustomCursor;
