import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Cpu, Shield, Cloud, Brain, Database, Award, ChevronRight, Sparkles } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import TextScramble from '../components/TextScramble';

const certifications = [
  'Certified Data Management Professional (CDMP)',
  'AI Product Manager: [Capstone Winner]',
  'SAFe 6.0 Product Owner - Product Manager',
  'AWS Certified Solutions Architect (SAA-C02)',
  'AWS Partner: Generative AI Essentials',
  'AWS Certified Cloud Practitioner (CLF-C01)',
  'IBM Watson Orchestrate',
  'IBM Enterprise Design Thinking Practitioner',
  'IBM Banking Industry Insights and Solutions - Silver',
  'IBM Insurance Insights and Solutions – Silver',
  'IBM Digital Insights - Knowledge Delivery',
  'IBM Big Data Foundations',
  'IBM Data Science Foundations',
  'Achieve New Heights with Microsoft Gen AI',
  'Project Management Institute - Agile Certified Professional (PMI - ACP)',
  'IBM Certified Solution Developer- DataStageV11.3'
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen w-full bg-[var(--cream)] py-20 lg:py-32 overflow-hidden"
      style={{ zIndex: 40 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--bronze)] rounded-full opacity-5 blur-3xl"
          style={{ animation: 'float 12s ease-in-out infinite' }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--orange-accent)] rounded-full opacity-5 blur-3xl"
          style={{ animation: 'float 10s ease-in-out infinite reverse' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <RevealOnScroll direction="up" delay={0}>
          <div className="mb-16 flex items-center gap-4">
            <Sparkles size={24} className="text-[var(--bronze)] animate-pulse" />
            <h2 
              className="text-4xl lg:text-6xl font-normal text-[var(--charcoal)]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {isVisible ? <TextScramble text="Projects" delay={200} /> : 'Projects'}
            </h2>
          </div>
        </RevealOnScroll>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Prop Wizard Card with 3D Tilt */}
          <RevealOnScroll direction="left" delay={200}>
            <div
              className="relative group cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => {
                setIsHovering(false);
                setMousePosition({ x: 0, y: 0 });
              }}
              style={{
                transform: isHovering 
                  ? `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg) scale(1.02)` 
                  : 'perspective(1000px) rotateY(0) rotateX(0) scale(1)',
                transition: 'transform 0.15s ease-out'
              }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white card-shadow group-hover:shadow-2xl transition-shadow duration-500">
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <img 
                    src="/prop-wizard.jpg" 
                    alt="Prop Wizard"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Animated Overlay */}
                  <div className="absolute inset-0 bg-[var(--bronze)]/0 group-hover:bg-[var(--bronze)]/10 transition-colors duration-500" />
                  
                  {/* Card Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-[var(--orange-accent)] text-white text-xs font-medium rounded-full animate-pulse">
                        AI Powered
                      </span>
                    </div>
                    <h3 
                      className="text-2xl lg:text-3xl font-normal text-white mb-2 group-hover:translate-x-2 transition-transform duration-300"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Prop Wizard
                    </h3>
                    <p className="text-white/80 text-sm lg:text-base mb-4 max-w-md">
                      Let AI do the heavy-lifting and deliver smart investment strategy on your real estate investment.
                    </p>
                    <p className="text-white/60 text-xs mb-4">
                      A Product built ground up with Machine Learning, GenAI and Analytics
                    </p>
                    <a 
                      href="https://drive.google.com/drive/folders/1ppmch1m-r4vUuy96vpO9XK4WyqXrx7fN?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[var(--bronze)] hover:text-white transition-colors duration-300 group/btn"
                    >
                      <span className="text-sm font-medium relative">
                        View Project
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--bronze)] group-hover/btn:w-full transition-all duration-300" />
                      </span>
                      <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* AI Product Management Card */}
          <RevealOnScroll direction="right" delay={400}>
            <div className="h-full bg-[var(--charcoal)] rounded-2xl p-8 lg:p-10 text-white flex flex-col justify-between card-shadow hover:shadow-2xl transition-all duration-500 group">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[var(--bronze)]/20 flex items-center justify-center group-hover:bg-[var(--bronze)]/30 group-hover:scale-110 transition-all duration-300">
                    <Brain size={24} className="text-[var(--bronze)]" />
                  </div>
                  <span className="px-3 py-1 bg-white/10 text-white/80 text-xs font-medium rounded-full">
                    Product Management
                  </span>
                </div>
                
                <h3 
                  className="text-2xl lg:text-3xl font-normal mb-4 group-hover:text-[var(--bronze)] transition-colors duration-300"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  AI Product Management
                </h3>
                
                <p className="text-white/70 text-sm lg:text-base mb-6">
                  Leading the development of AI-driven products from concept to launch, 
                  combining strategic vision with technical expertise.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    { icon: Cpu, label: 'Machine Learning' },
                    { icon: Cloud, label: 'Cloud Native' },
                    { icon: Database, label: 'Big Data' },
                    { icon: Shield, label: 'Governance' }
                  ].map(({ icon: Icon, label }, index) => (
                    <span 
                      key={index}
                      className="flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full text-xs text-white/60 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-default"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Icon size={12} /> {label}
                    </span>
                  ))}
                </div>
              </div>
              
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--bronze)] hover:bg-[var(--orange-accent)] rounded-full text-white font-medium transition-all duration-300 w-fit group/btn hover:scale-105 hover:shadow-lg">
                <span>Product Overview</span>
                <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </RevealOnScroll>
        </div>

        {/* Certifications Section */}
        <RevealOnScroll direction="up" delay={600}>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[var(--bronze)]/10 flex items-center justify-center">
                <Award size={20} className="text-[var(--bronze)]" />
              </div>
              <h3 
                className="text-2xl lg:text-3xl font-normal text-[var(--charcoal)]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Certifications
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-6 lg:p-8 card-shadow">
              <div className="grid md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <RevealOnScroll 
                    key={index}
                    direction="up" 
                    delay={700 + index * 30}
                  >
                    <div 
                      className="group flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--cream)] transition-all duration-300 cursor-default hover:translate-x-1"
                    >
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--bronze)] mt-2 group-hover:bg-[var(--orange-accent)] group-hover:scale-150 transition-all duration-300" />
                      <span className="text-sm text-[var(--charcoal)] group-hover:text-[var(--bronze)] transition-colors">{cert}</span>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};

export default Projects;
