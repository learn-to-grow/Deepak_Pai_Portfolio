import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-[100] w-12 h-12 rounded-full bg-white/90 dark:bg-[var(--charcoal)]/90 backdrop-blur-sm shadow-lg border border-[var(--bronze)]/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-6 h-6">
        <Sun 
          size={20} 
          className={`absolute inset-0 m-auto text-[var(--bronze)] transition-all duration-500 ${
            theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        <Moon 
          size={20} 
          className={`absolute inset-0 m-auto text-[var(--bronze)] transition-all duration-500 ${
            theme === 'light' ? 'opacity-0 -rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
      </div>
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-[var(--charcoal)] dark:bg-white text-white dark:text-[var(--charcoal)] text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;
