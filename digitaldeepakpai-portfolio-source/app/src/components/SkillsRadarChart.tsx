import { useEffect, useState, useRef } from 'react';

interface Skill {
  name: string;
  level: number;
}

const skills: Skill[] = [
  { name: 'Data Engineering', level: 95 },
  { name: 'AI/ML Strategy', level: 90 },
  { name: 'Cloud Architecture', level: 88 },
  { name: 'Leadership', level: 92 },
  { name: 'Product Management', level: 85 },
  { name: 'Governance', level: 90 },
  { name: 'Big Data Analytics', level: 87 },
  { name: 'GenAI/RAG', level: 82 },
];

const SkillsRadarChart = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Intersection Observer to trigger animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation effect
  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    
    hasAnimated.current = true;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setAnimationProgress(easeOut);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView]);

  // Chart dimensions
  const size = 400;
  const center = size / 2;
  const maxRadius = 140;
  const labelRadius = 165;

  // Calculate point position for a skill
  const getPointPosition = (index: number, level: number) => {
    const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
    const radius = (level * animationProgress / 100) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Calculate label position
  const getLabelPosition = (index: number) => {
    const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
    return {
      x: center + labelRadius * Math.cos(angle),
      y: center + labelRadius * Math.sin(angle),
    };
  };

  // Build polygon points
  const polygonPoints = skills.map((skill, i) => {
    const pos = getPointPosition(i, skill.level);
    return `${pos.x},${pos.y}`;
  }).join(' ');

  return (
    <div ref={containerRef} className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#B08968]/20 flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B08968" strokeWidth="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </div>
        <h3 
          className="text-xl lg:text-2xl font-normal text-[var(--charcoal)] dark:text-white"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Skills & Expertise
        </h3>
      </div>

      {/* Chart Container */}
      <div className="bg-white dark:bg-white/5 rounded-2xl p-6 card-shadow">
        {/* Radar Chart SVG */}
        <div className="relative w-full flex justify-center mb-8">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="max-w-full h-auto"
            style={{ overflow: 'visible' }}
          >
            {/* Background grid circles */}
            {[20, 40, 60, 80, 100].map((level) => (
              <circle
                key={level}
                cx={center}
                cy={center}
                r={(level / 100) * maxRadius}
                fill="none"
                stroke="rgba(176, 137, 104, 0.2)"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
            ))}

            {/* Axis lines */}
            {skills.map((_, i) => {
              const angle = (i * 2 * Math.PI) / skills.length - Math.PI / 2;
              const x2 = center + maxRadius * Math.cos(angle);
              const y2 = center + maxRadius * Math.sin(angle);
              return (
                <line
                  key={`axis-${i}`}
                  x1={center}
                  y1={center}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(176, 137, 104, 0.25)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Skill polygon area */}
            <polygon
              points={polygonPoints}
              fill="rgba(176, 137, 104, 0.3)"
              stroke="#B08968"
              strokeWidth="2"
              style={{ transition: 'all 0.3s ease' }}
            />

            {/* Skill points (interactive circles) */}
            {skills.map((skill, i) => {
              const pos = getPointPosition(i, skill.level);
              const isHovered = hoveredSkill === skill.name;
              return (
                <g key={`point-${i}`}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isHovered ? 10 : 7}
                    fill={isHovered ? '#E85A24' : '#B08968'}
                    stroke="white"
                    strokeWidth="2"
                    style={{ 
                      cursor: 'pointer', 
                      transition: 'all 0.2s ease',
                      filter: isHovered ? 'drop-shadow(0 0 8px rgba(232, 90, 36, 0.5))' : 'none'
                    }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  />
                  {/* Percentage tooltip on hover */}
                  {isHovered && (
                    <g>
                      <rect
                        x={pos.x - 25}
                        y={pos.y - 35}
                        width="50"
                        height="22"
                        rx="4"
                        fill="#E85A24"
                      />
                      <text
                        x={pos.x}
                        y={pos.y - 20}
                        textAnchor="middle"
                        fontSize="12"
                        fill="white"
                        fontWeight="bold"
                      >
                        {skill.level}%
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Skill name labels - OUTSIDE the chart */}
            {skills.map((skill, i) => {
              const pos = getLabelPosition(i);
              const isHovered = hoveredSkill === skill.name;
              
              // Determine text anchor based on position
              const isLeft = pos.x < center;
              const isRight = pos.x > center;
              const textAnchor = isLeft ? 'end' : isRight ? 'start' : 'middle';
              
              return (
                <text
                  key={`label-${i}`}
                  x={pos.x + (isLeft ? -10 : isRight ? 10 : 0)}
                  y={pos.y + 5}
                  textAnchor={textAnchor}
                  fontSize="13"
                  fontWeight={isHovered ? 'bold' : '500'}
                  fill={isHovered ? '#E85A24' : '#B08968'}
                  style={{ 
                    cursor: 'pointer', 
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {skill.name}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Skills Legend/List */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {skills.map((skill) => {
            const isHovered = hoveredSkill === skill.name;
            return (
              <div
                key={skill.name}
                className={`flex items-center gap-2 p-3 rounded-lg transition-all cursor-pointer ${
                  isHovered 
                    ? 'bg-[#B08968]/15 scale-105' 
                    : 'hover:bg-[var(--cream)] dark:hover:bg-white/5'
                }`}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div 
                  className={`w-3 h-3 rounded-full flex-shrink-0 transition-colors ${
                    isHovered ? 'bg-[#E85A24]' : 'bg-[#B08968]'
                  }`} 
                />
                <span className={`text-sm truncate transition-colors ${
                  isHovered ? 'text-[#E85A24] font-medium' : 'text-[var(--charcoal)] dark:text-white/80'
                }`}>
                  {skill.name}
                </span>
                <span className={`text-sm ml-auto flex-shrink-0 font-semibold transition-colors ${
                  isHovered ? 'text-[#E85A24]' : 'text-[#B08968]'
                }`}>
                  {skill.level}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillsRadarChart;
