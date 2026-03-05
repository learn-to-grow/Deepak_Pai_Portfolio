import { useEffect, useRef, useState } from 'react';
import { Briefcase, GraduationCap, BookOpen, Award, TrendingUp, Users, FileText, Cpu, BarChart3, HeartPulse, Network, Search, Scale } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import AnimatedCounter from '../components/AnimatedCounter';
import TextScramble from '../components/TextScramble';

const education = [
  {
    year: '2007',
    degree: 'Bachelors, Computer Science Engineering',
    school: 'CMRIT, Bengaluru, India'
  },
  {
    year: '2011',
    degree: 'Masters, Information Technology Management',
    school: 'Illinois Tech, Chicago, IL, US'
  }
];

const publications = [
  {
    title: 'IEEE Conference Speaker 2026',
    subtitle: 'ML for Student Dropout Prediction: Algorithmic Performance, Interpretability, and Fairness in East African Secondary Schools'
  },
  {
    title: 'FEMS-TTC-PPM: Multi-Layered AI-based Governance Framework for Financial Institutions',
    subtitle: 'Financial Enterprise Management Systems - Technical Transformation & Compliance'
  },
  {
    title: 'Keynote Speaker – AICCT 2025',
    subtitle: 'Computer Science Engineering Department'
  },
  {
    title: 'Prompt Engineering Frameworks for Generative AI in Credit Analysis',
    subtitle: 'Elsevier, 2025'
  }
];

const scholarlyArticles = [
  {
    title: 'ML-Based Control Systems for Autonomous Robotics',
    icon: Cpu,
    description: 'Exploring machine learning architectures for real-time robotic control and decision-making systems.'
  },
  {
    title: 'Big Data Analytics Integration',
    icon: BarChart3,
    description: 'Strategic approaches to integrating large-scale data analytics into enterprise ecosystems.'
  },
  {
    title: 'Predictive Healthcare Analytics',
    icon: HeartPulse,
    description: 'Leveraging predictive models to improve patient outcomes and healthcare resource allocation.'
  },
  {
    title: 'Deep Learning',
    icon: Network,
    description: 'Advanced neural network architectures and their applications in complex problem-solving.'
  },
  {
    title: 'RAG Framework',
    icon: Search,
    description: 'Retrieval-Augmented Generation for enhanced AI-powered information retrieval and synthesis.'
  },
  {
    title: 'Explainable and Scalable ML Methods',
    icon: Scale,
    description: 'Building transparent, interpretable machine learning models that scale efficiently.'
  }
];

const stats = [
  { value: 16, suffix: '+', label: 'Years Experience', icon: Briefcase },
  { value: 50, suffix: '+', label: 'Enterprise Projects', icon: TrendingUp },
  { value: 100, suffix: '+', label: 'Team Members Led', icon: Users },
  { value: 16, suffix: '', label: 'Certifications', icon: Award }
];

const ValueCreator = () => {
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
      id="value-creator"
      className="relative min-h-screen w-full bg-[var(--charcoal)] text-white py-20 lg:py-32 overflow-hidden"
      style={{ zIndex: 30 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-20 w-64 h-64 bg-[var(--bronze)] rounded-full opacity-10 blur-3xl"
          style={{ animation: 'float 10s ease-in-out infinite' }}
        />
        <div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-[var(--orange-accent)] rounded-full opacity-5 blur-3xl"
          style={{ animation: 'float 8s ease-in-out infinite reverse' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <RevealOnScroll direction="up" delay={0}>
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 hover:bg-white/20 transition-colors duration-300">
              <Award size={16} className="text-[var(--bronze)]" />
              <span className="text-sm font-medium text-[var(--bronze)]">Value Creator</span>
            </div>
            <h2 
              className="text-4xl lg:text-6xl font-normal mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {isVisible ? <TextScramble text="About Me" delay={200} /> : 'About Me'}
            </h2>
          </div>
        </RevealOnScroll>

        {/* Stats Grid */}
        <RevealOnScroll direction="up" delay={200}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="group relative p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-[var(--bronze)]/30 transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--bronze)]/20 flex items-center justify-center group-hover:bg-[var(--bronze)]/30 group-hover:scale-110 transition-all duration-300">
                    <stat.icon size={20} className="text-[var(--bronze)]" />
                  </div>
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-[var(--bronze)] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  <AnimatedCounter 
                    end={stat.value} 
                    suffix={stat.suffix}
                    trigger={isVisible}
                    duration={2000 + index * 200}
                  />
                </div>
                <p className="text-sm text-white/60">{stat.label}</p>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-[var(--bronze)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* About Text */}
          <RevealOnScroll direction="left" delay={300}>
            <div>
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed mb-8">
                I am a passionate problem solver and engineering enthusiast, who firmly believes in 
                leadership style that combines <span className="text-[var(--bronze)] font-semibold">technical depth</span> with 
                <span className="text-[var(--bronze)] font-semibold"> human-centered collaboration</span>.
              </p>
              <p className="text-lg text-white/60 leading-relaxed">
                My approach focuses on building high-performing teams, fostering innovation, and delivering 
                measurable business value through technology excellence.
              </p>
            </div>
          </RevealOnScroll>

          {/* Experience Highlight */}
          <RevealOnScroll direction="right" delay={400}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-[var(--bronze)]/30 transition-all duration-500 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[var(--bronze)]/20 flex items-center justify-center group-hover:bg-[var(--bronze)]/30 group-hover:scale-110 transition-all duration-300">
                  <Briefcase size={24} className="text-[var(--bronze)]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Experience</h3>
                  <p className="text-sm text-white/60">Serving US Fortune 500 Enterprises</p>
                </div>
              </div>
              
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-6xl lg:text-7xl font-bold text-[var(--bronze)]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  <AnimatedCounter end={16} suffix="+" trigger={isVisible} duration={2500} />
                </span>
                <span className="text-lg text-white/60">years</span>
              </div>
              
              <p className="text-white/70">
                Seasoned Engineering Leader building modern cutting edge data products and enterprise solutions.
              </p>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-sm text-white/40">Since 2011</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-2 h-2 rounded-full bg-[var(--bronze)]"
                      style={{ animation: `pulse 1s ease-in-out ${i * 0.2}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Education & Publications Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Education */}
          <RevealOnScroll direction="up" delay={500}>
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-[var(--bronze)]/20 flex items-center justify-center">
                  <GraduationCap size={20} className="text-[var(--bronze)]" />
                </div>
                <h3 
                  className="text-2xl font-normal"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Education
                </h3>
              </div>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div 
                    key={index} 
                    className="group flex gap-6 p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-[var(--bronze)]/30 transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="flex-shrink-0">
                      <span className="text-2xl font-bold text-[var(--bronze)]" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {edu.year}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1 group-hover:text-[var(--bronze)] transition-colors">{edu.degree}</h4>
                      <p className="text-sm text-white/60">{edu.school}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Publications */}
          <RevealOnScroll direction="up" delay={600}>
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-[var(--bronze)]/20 flex items-center justify-center">
                  <BookOpen size={20} className="text-[var(--bronze)]" />
                </div>
                <h3 
                  className="text-2xl font-normal"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Publications & Speaking
                </h3>
              </div>
              
              <div className="space-y-4">
                {publications.map((pub, index) => (
                  <div 
                    key={index} 
                    className="group p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-[var(--bronze)]/30 transition-all duration-300 hover:translate-x-2"
                  >
                    <h4 className="font-semibold text-white mb-1 group-hover:text-[var(--bronze)] transition-colors">{pub.title}</h4>
                    <p className="text-sm text-white/60 leading-relaxed">{pub.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Scholarly Article Review Section */}
        <RevealOnScroll direction="up" delay={700}>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[var(--bronze)]/20 flex items-center justify-center">
                <FileText size={20} className="text-[var(--bronze)]" />
              </div>
              <h3 
                className="text-2xl lg:text-3xl font-normal"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Scholarly Article Review
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scholarlyArticles.map((article, index) => (
                <RevealOnScroll 
                  key={index}
                  direction="up" 
                  delay={800 + index * 100}
                >
                  <div className="group p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-[var(--bronze)]/30 transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="w-12 h-12 rounded-full bg-[var(--bronze)]/20 flex items-center justify-center mb-4 group-hover:bg-[var(--bronze)]/30 group-hover:scale-110 transition-all duration-300">
                      <article.icon size={24} className="text-[var(--bronze)]" />
                    </div>
                    <h4 className="font-semibold text-white mb-2 group-hover:text-[var(--bronze)] transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
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

export default ValueCreator;
