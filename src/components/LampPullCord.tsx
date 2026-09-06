import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Sun, Moon, Lightbulb, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LampPullCordProps {
  className?: string;
  showLabel?: boolean;
}

export const LampPullCord: React.FC<LampPullCordProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const [isPulling, setIsPulling] = useState(false);
  const controls = useAnimation();

  const handlePull = async () => {
    if (isPulling) return;
    setIsPulling(true);

    // 1. Downward cord stretch motion
    await controls.start({
      y: 22,
      transition: { duration: 0.15, ease: 'easeOut' }
    });

    // 2. Toggle Theme state
    toggleTheme();

    // 3. Elastic spring rebound animation
    await controls.start({
      y: [22, -6, 4, -2, 0],
      transition: { duration: 0.45, ease: 'easeInOut' }
    });

    setIsPulling(false);
  };

  return (
    <div className={`relative flex items-center gap-3 select-none ${className}`}>
      <div className="relative flex flex-col items-center group">
        {/* Lamp Socket Base Cap */}
        <div className="relative flex flex-col items-center z-10">
          <div className="w-6 h-1.5 rounded-t-sm bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 border-b border-amber-800 shadow-sm" />
          
          {/* Socket Body */}
          <div className="w-4 h-2.5 bg-gradient-to-b from-slate-700 to-slate-900 border-x border-slate-600 flex items-center justify-center">
            <div className="w-2 h-0.5 bg-amber-500/40 rounded-full" />
          </div>

          {/* Glowing Light Bulb Dome */}
          <motion.div
            animate={{
              scale: theme === 'dark' ? [1, 1.05, 1] : [1, 1.08, 1],
            }}
            transition={{ repeat: Infinity, duration: 3 }}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 shadow-md ${
              theme === 'light'
                ? 'bg-gradient-to-tr from-amber-300 via-yellow-400 to-amber-200 text-amber-900 shadow-[0_0_16px_rgba(251,191,36,0.85)] border border-amber-300'
                : 'bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 text-white shadow-[0_0_16px_rgba(0,240,255,0.7)] border border-cyan-400/50'
            }`}
          >
            {theme === 'light' ? (
              <Lightbulb className="w-3.5 h-3.5 text-amber-950 animate-pulse" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-white animate-pulse" />
            )}
          </motion.div>
        </div>

        {/* Pull Cord String & Pendant Handle */}
        <motion.div
          animate={controls}
          onClick={handlePull}
          className="relative flex flex-col items-center cursor-pointer pt-0.5 group/cord"
          role="button"
          tabIndex={0}
          aria-label={`Pull lamp cord to switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handlePull();
            }
          }}
        >
          {/* Beaded Chain String */}
          <div className="w-[2px] h-8 bg-gradient-to-b from-slate-400 via-amber-300 to-slate-400 dark:from-slate-500 dark:via-cyan-300 dark:to-slate-500 relative flex flex-col items-center justify-between">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 dark:bg-cyan-400 -mt-1 shadow-sm" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-400 shadow-sm" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 dark:bg-cyan-400 shadow-sm" />
          </div>

          {/* Metal Pull Bell Pendant Handle */}
          <div className="relative group-hover/cord:scale-115 transition-transform duration-200">
            <div className={`w-3.5 h-4.5 rounded-b-full rounded-t-sm bg-gradient-to-b ${
              theme === 'light'
                ? 'from-amber-400 via-yellow-500 to-amber-600 border border-amber-300 shadow-[0_2px_8px_rgba(245,158,11,0.5)]'
                : 'from-cyan-400 via-blue-500 to-purple-600 border border-cyan-300 shadow-[0_2px_10px_rgba(0,240,255,0.6)]'
            } flex items-center justify-center`}>
              <div className="w-1 h-2 bg-white/50 rounded-full" />
            </div>

            {/* Click Pull Ripple Effect */}
            {isPulling && (
              <motion.span
                initial={{ scale: 0.8, opacity: 1 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 rounded-full bg-amber-400/80 dark:bg-cyan-400/80 pointer-events-none"
              />
            )}
          </div>

          {/* Hover Tooltip */}
          <div className="absolute top-full right-1/2 translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 pointer-events-none z-50 px-2.5 py-1 rounded-xl bg-slate-900 dark:bg-slate-950 border border-amber-400/40 dark:border-cyan-400/50 text-[10px] font-mono text-amber-300 dark:text-cyan-300 whitespace-nowrap shadow-xl flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400 dark:text-cyan-400 animate-spin-slow" />
            <span>Pull Lamp Cord ({theme === 'dark' ? 'Light Mode' : 'Dark Mode'})</span>
          </div>
        </motion.div>
      </div>

      {showLabel && (
        <button
          onClick={handlePull}
          className="font-mono text-xs text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors"
        >
          {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      )}
    </div>
  );
};
