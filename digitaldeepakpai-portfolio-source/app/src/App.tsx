import { useEffect, useRef } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Hero from './sections/Hero';
import Executive from './sections/Executive';
import ValueCreator from './sections/ValueCreator';
import Projects from './sections/Projects';
import Footer from './sections/Footer';
import CustomCursor from './components/CustomCursor';
import ProgressBar from './components/ProgressBar';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <ThemeProvider>
      <div ref={mainRef} className="relative overflow-x-hidden transition-colors duration-500">
        <CustomCursor />
        <ProgressBar />
        <ThemeToggle />
        
        <main className="relative">
          <Hero />
          <Executive />
          <ValueCreator />
          <Projects />
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
