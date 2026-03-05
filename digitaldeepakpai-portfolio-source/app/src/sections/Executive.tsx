import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import TextScramble from '../components/TextScramble';

const accomplishments = [
  {
    title: 'Modernized fortune companies\' credit and lending platforms',
    description: 'accelerating time-to-decision, improving transparency, and optimizing customer experience.'
  },
  {
    title: 'Built resilient, compliant data product & ecosystems',
    description: 'with strong governance, lineage, AI and real-time analytical capabilities.'
  },
  {
    title: 'Translated enterprise strategy into scalable architecture',
    description: 'aligning business, technology, and operational priorities to achieve measurable results.'
  },
  {
    title: 'Reduced operational cost & risk',
    description: 'through data quality frameworks, automation and cloud-native architectures.'
  },
  {
    title: 'Lead teams toward engineering excellence',
    description: 'fostering collaboration, clarity, and a culture of ownership.'
  }
];

const Executive = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="executive"
      className="relative min-h-screen w-full bg-white py-20 lg:py-32 overflow-hidden"
      style={{ zIndex: 20 }}
    >
      {/* Animated Background Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[var(--bronze)]/20 to-transparent"
          style={{ animation: 'lineMove 8s linear infinite' }}
        />
        <div 
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[var(--bronze)]/10 to-transparent"
          style={{ animation: 'lineMove 12s linear infinite reverse' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <RevealOnScroll direction="up" delay={0}>
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-[var(--bronze)] animate-pulse" />
              <p className="text-xs tracking-[0.3em] text-[var(--bronze)] uppercase">
                Transforming Enterprise Systems - Elevating Data - Engineering Trust
              </p>
            </div>
            <h2 
              className="text-4xl lg:text-6xl font-normal text-[var(--charcoal)] mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {isVisible ? <TextScramble text="Deepak Pai" delay={200} /> : 'Deepak Pai'}
            </h2>
            <p className="text-lg text-[var(--text-muted)]">
              Executive Leader | Engineering | Strategy - Data & AI
            </p>
          </div>
        </RevealOnScroll>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Intro */}
          <RevealOnScroll direction="left" delay={200}>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--cream)] rounded-full mb-6 group hover:bg-[var(--bronze)] transition-colors duration-300">
                <span className="w-2 h-2 rounded-full bg-[var(--bronze)] group-hover:bg-white animate-pulse" />
                <span className="text-sm font-medium text-[var(--bronze)] group-hover:text-white transition-colors">Get future-ready</span>
              </div>
              
              <p className="text-lg lg:text-xl text-[var(--charcoal)] leading-relaxed mb-8">
                I build modern, compliant, cutting edge data ecosystems that power innovation, 
                excellence, and enterprise-wide digital transformation. With over{' '}
                <span className="relative inline-block">
                  <span className="font-semibold text-[var(--bronze)]">16 years</span>
                  <span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--bronze)]"
                    style={{ animation: isVisible ? 'expandLine 1s ease-out 0.5s forwards' : 'none', transformOrigin: 'left' }}
                  />
                </span>{' '}
                of modernizing digital systems—I specialize in translating complexity into clarity, and strategy into 
                measurable business outcomes.
              </p>

              <div className="flex items-center gap-4">
                <div className="w-16 h-0.5 bg-[var(--bronze)]" />
                <span className="text-sm text-[var(--text-muted)]">Value Creator</span>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right Column - Accomplishments */}
          <RevealOnScroll direction="right" delay={400}>
            <div>
              <h3 
                className="text-2xl font-normal text-[var(--charcoal)] mb-8 flex items-center gap-3"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                <span className="w-8 h-8 rounded-full bg-[var(--bronze)]/10 flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-[var(--bronze)]" />
                </span>
                Accomplishments
              </h3>
              
              <div className="space-y-4">
                {accomplishments.map((item, index) => (
                  <RevealOnScroll 
                    key={index} 
                    direction="right" 
                    delay={500 + index * 100}
                  >
                    <div 
                      className="group flex gap-4 p-4 rounded-xl hover:bg-[var(--cream)] transition-all duration-300 cursor-default hover:translate-x-2"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-full bg-[var(--bronze)]/10 flex items-center justify-center group-hover:bg-[var(--bronze)] group-hover:scale-110 transition-all duration-300">
                          <CheckCircle2 
                            size={14} 
                            className="text-[var(--bronze)] group-hover:text-white transition-colors duration-300" 
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--charcoal)] mb-1 group-hover:text-[var(--bronze)] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-1 h-32 bg-gradient-to-b from-[var(--bronze)] to-transparent opacity-30" />
      <div className="absolute bottom-1/4 left-0 w-32 h-1 bg-gradient-to-r from-[var(--bronze)] to-transparent opacity-30" />

      {/* CSS Animations */}
      <style>{`
        @keyframes lineMove {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes expandLine {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
};

export default Executive;
