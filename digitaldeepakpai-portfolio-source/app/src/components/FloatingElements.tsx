import { useEffect, useRef } from 'react';

interface FloatingElement {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  shape: 'circle' | 'square' | 'triangle';
}

const FloatingElements = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elementsRef = useRef<FloatingElement[]>([]);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize floating elements
    const elementCount = 8;
    elementsRef.current = [];
    
    for (let i = 0; i < elementCount; i++) {
      elementsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 60 + 20,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.1 + 0.05,
        shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle'
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      elementsRef.current.forEach((element) => {
        // Update position
        element.x += element.speedX;
        element.y += element.speedY;

        // Wrap around edges
        if (element.x < -element.size) element.x = canvas.width + element.size;
        if (element.x > canvas.width + element.size) element.x = -element.size;
        if (element.y < -element.size) element.y = canvas.height + element.size;
        if (element.y > canvas.height + element.size) element.y = -element.size;

        // Draw shape
        ctx.save();
        ctx.globalAlpha = element.opacity;
        ctx.strokeStyle = '#B08968';
        ctx.lineWidth = 1;

        if (element.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(element.x, element.y, element.size / 2, 0, Math.PI * 2);
          ctx.stroke();
        } else if (element.shape === 'square') {
          ctx.strokeRect(
            element.x - element.size / 2,
            element.y - element.size / 2,
            element.size,
            element.size
          );
        } else if (element.shape === 'triangle') {
          ctx.beginPath();
          ctx.moveTo(element.x, element.y - element.size / 2);
          ctx.lineTo(element.x + element.size / 2, element.y + element.size / 2);
          ctx.lineTo(element.x - element.size / 2, element.y + element.size / 2);
          ctx.closePath();
          ctx.stroke();
        }

        ctx.restore();
      });

      rafIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default FloatingElements;
