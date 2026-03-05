import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Linkedin, ArrowUpRight } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import TextScramble from '../components/TextScramble';
import ContactForm from '../components/ContactForm';
import SkillsRadarChart from '../components/SkillsRadarChart';

const Footer = () => {
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
    <footer
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-[var(--charcoal)] text-white py-20 lg:py-32 overflow-hidden"
      style={{ zIndex: 50 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 right-20 w-96 h-96 bg-[var(--bronze)] rounded-full opacity-10 blur-3xl"
          style={{ animation: 'float 10s ease-in-out infinite' }}
        />
        <div 
          className="absolute bottom-20 left-20 w-64 h-64 bg-[var(--orange-accent)] rounded-full opacity-5 blur-3xl"
          style={{ animation: 'float 8s ease-in-out infinite reverse' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main CTA */}
        <RevealOnScroll direction="up" delay={0}>
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] text-[var(--bronze)] uppercase mb-4">
              Let&apos;s Connect
            </p>
            <h2 
              className="text-4xl lg:text-6xl xl:text-7xl font-normal mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {isVisible ? <TextScramble text="Connect with Me" delay={200} /> : 'Connect with Me'}
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Ready to transform your enterprise systems and elevate your data strategy? 
              Let&apos;s discuss how we can work together.
            </p>
          </div>
        </RevealOnScroll>

        {/* Skills & Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Skills Radar Chart */}
          <div className="text-white">
            <SkillsRadarChart />
          </div>
          
          {/* Contact Form */}
          <ContactForm />
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-16">
          {[
            { icon: Mail, label: 'Email', value: 'deepakpai.ms@gmail.com', href: 'mailto:deepakpai.ms@gmail.com' },
            { icon: MapPin, label: 'Location', value: 'Pittsburgh, PA, USA', href: null }
          ].map((item, index) => (
            <RevealOnScroll key={index} direction="up" delay={300 + index * 100}>
              {item.href ? (
                <a 
                  href={item.href}
                  className="group flex flex-col items-center p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-[var(--bronze)]/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-14 h-14 rounded-full bg-[var(--bronze)]/20 flex items-center justify-center mb-4 group-hover:bg-[var(--bronze)]/30 group-hover:scale-110 transition-all duration-300">
                    <item.icon size={24} className="text-[var(--bronze)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.label}</h3>
                  <p className="text-white/60 text-sm text-center">{item.value}</p>
                  <ArrowUpRight size={16} className="mt-4 text-[var(--bronze)] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              ) : (
                <div className="flex flex-col items-center p-8 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-14 h-14 rounded-full bg-[var(--bronze)]/20 flex items-center justify-center mb-4">
                    <item.icon size={24} className="text-[var(--bronze)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.label}</h3>
                  <p className="text-white/60 text-sm text-center">{item.value}</p>
                </div>
              )}
            </RevealOnScroll>
          ))}
        </div>

        {/* Social Links - LinkedIn only */}
        <RevealOnScroll direction="up" delay={600}>
          <div className="flex justify-center mb-16">
            <a 
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#0077b5] hover:text-white transition-all duration-300 hover:scale-110"
            >
              <Linkedin size={22} className="group-hover:animate-bounce" />
            </a>
          </div>
        </RevealOnScroll>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Bottom Bar */}
        <RevealOnScroll direction="up" delay={700}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span 
                className="text-2xl font-normal"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Deepak Pai
              </span>
              <span className="text-white/40">|</span>
              <span className="text-sm text-white/60">Executive Leader</span>
            </div>
            
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} Deepak Pai
            </p>
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
    </footer>
  );
};

export default Footer;
