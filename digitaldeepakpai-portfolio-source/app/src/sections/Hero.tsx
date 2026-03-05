import { useEffect, useRef, useState } from 'react';
import { Linkedin, Mail, ArrowDown } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import TextScramble from '../components/TextScramble';
import FloatingElements from '../components/FloatingElements';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Parallax effect for profile card (desktop only)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = (e.clientX - rect.left - rect.width / 2) / 50;
    const y = (e.clientY - rect.top - rect.height / 2) / 50;
    setMousePos({ x, y });
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('executive');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center bg-[var(--cream)] dark:bg-[#1A1A1A] overflow-hidden transition-colors duration-500"
      style={{ zIndex: 10 }}
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Layers */}
      {!isMobile && <FloatingElements />}
      <ParticleBackground />
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-64 lg:w-96 h-64 lg:h-96 bg-[var(--warm-beige)] rounded-full opacity-30 blur-3xl"
          style={{ 
            animation: 'float 8s ease-in-out infinite',
            transform: isMobile ? 'none' : `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)` 
          }}
        />
        <div 
          className="absolute bottom-20 right-10 w-80 lg:w-[500px] h-80 lg:h-[500px] bg-[var(--bronze)] rounded-full opacity-10 blur-3xl"
          style={{ 
            animation: 'float 10s ease-in-out infinite reverse',
            transform: isMobile ? 'none' : `translate(${mousePos.x}px, ${mousePos.y}px)` 
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-[var(--orange-accent)] rounded-full opacity-5 blur-3xl"
          style={{ 
            animation: 'pulse 6s ease-in-out infinite'
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Profile Card with 3D tilt (desktop only) */}
          <div
            className={`relative mx-auto lg:mx-0 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
            style={isMobile ? {} : {
              transform: `perspective(1000px) rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div className="bg-white/90 dark:bg-white/10 backdrop-blur-sm rounded-2xl card-shadow p-6 sm:p-8 lg:p-10 max-w-xs sm:max-w-sm hover:shadow-2xl transition-all duration-500">
              {/* Profile Image */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto mb-6">
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, var(--bronze), var(--orange-accent), var(--bronze))',
                    animation: 'spin 4s linear infinite'
                  }}
                />
                <div className="absolute inset-1 rounded-full bg-white dark:bg-[#1A1A1A]" />
                <img
                  src="/profile-photo.png"
                  alt="Deepak Pai"
                  className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-[#2A2A2A] shadow-lg"
                />
              </div>

              {/* Name & Title with scramble effect */}
              <div className="text-center mb-6">
                <h2 
                  className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[var(--charcoal)] dark:text-white mb-2" 
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {isLoaded ? (
                    <TextScramble text="Deepak Pai" delay={500} />
                  ) : 'Deepak Pai'}
                </h2>
                <div 
                  className={`w-12 h-0.5 bg-[var(--bronze)] mx-auto mb-4 transition-all duration-1000 delay-700 ${
                    isLoaded ? 'w-12' : 'w-0'
                  }`}
                />
                <p className="text-xs tracking-[0.2em] text-[var(--text-muted)] uppercase">
                  Engineering | Data | Strategy |<br className="hidden sm:block" /> Value Creator
                </p>
              </div>

              {/* Social Links - LinkedIn & Email only */}
              <div className={`flex justify-center gap-4 pt-4 border-t border-gray-100 dark:border-white/10 transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <a 
                  href="https://linkedin.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="group w-10 h-10 rounded-full bg-[var(--cream)] dark:bg-white/10 flex items-center justify-center text-[var(--charcoal)] dark:text-white hover:bg-[#0077b5] hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Linkedin size={18} />
                </a>
                <a 
                  href="mailto:deepakpai.ms@gmail.com"
                  aria-label="Email"
                  className="group w-10 h-10 rounded-full bg-[var(--cream)] dark:bg-white/10 flex items-center justify-center text-[var(--charcoal)] dark:text-white hover:bg-[var(--bronze)] hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal text-[var(--charcoal)] dark:text-white mb-4 leading-tight transition-all duration-1000 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {isLoaded ? (
                <>
                  <TextScramble text="Digital" delay={300} />
                  <br />
                  <span className="italic">
                    <TextScramble text="Insights" delay={500} />
                  </span>
                </>
              ) : (
                <>
                  Digital<br />
                  <span className="italic">Insights</span>
                </>
              )}
            </h1>
            
            <p
              className={`text-lg sm:text-xl lg:text-2xl text-[var(--bronze)] mb-6 lg:mb-8 transition-all duration-1000 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Welcomes You
            </p>

            {/* Animated Button */}
            <button
              onClick={scrollToNext}
              className={`group relative btn-outline inline-flex items-center gap-2 overflow-hidden transition-all duration-1000 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span className="relative z-10">Explore Projects</span>
              <ArrowDown size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-y-1" />
              <span className="absolute inset-0 bg-[var(--charcoal)] dark:bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </button>

            <p className={`mt-8 lg:mt-12 text-[var(--text-muted)] text-sm max-w-md mx-auto lg:mx-0 leading-relaxed transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              This is my digital sandbox—where curiosity meets creativity, and ideas turn into impactful solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Animated Scroll indicator */}
      <div className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-[var(--bronze)] tracking-widest uppercase">Scroll</span>
          <div className="w-5 lg:w-6 h-8 lg:h-10 border-2 border-[var(--bronze)] rounded-full flex justify-center pt-1.5 lg:pt-2">
            <div className="w-1 lg:w-1.5 h-2 lg:h-3 bg-[var(--bronze)] rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
