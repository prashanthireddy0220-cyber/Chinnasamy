import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, 
  Sun, 
  Sparkles, 
  Terminal, 
  BookOpen, 
  Check, 
  Palette,
  ChevronDown
} from 'lucide-react';
import { useTheme, Theme } from '../context/ThemeContext';

interface ThemeOption {
  id: Theme;
  name: string;
  subtitle: string;
  icon: React.ElementType;
  primaryBg: string;
  accentColor: string;
  badgeBg: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'dark',
    name: 'DARK',
    subtitle: 'Cyberpunk Charcoal',
    icon: Moon,
    primaryBg: '#050811',
    accentColor: '#00f0ff',
    badgeBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  },
  {
    id: 'light',
    name: 'LIGHT',
    subtitle: 'Clean Slate Minimal',
    icon: Sun,
    primaryBg: '#ffffff',
    accentColor: '#0284c7',
    badgeBg: 'bg-sky-500/20 text-sky-600 border-sky-500/30',
  },
  {
    id: 'neural',
    name: 'NEURAL',
    subtitle: 'AI Synapse Glow',
    icon: Sparkles,
    primaryBg: '#08071b',
    accentColor: '#c084fc',
    badgeBg: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
  {
    id: 'matrix',
    name: 'MATRIX',
    subtitle: 'Terminal Green Code',
    icon: Terminal,
    primaryBg: '#020604',
    accentColor: '#00ff66',
    badgeBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'times',
    name: 'TIMES',
    subtitle: 'Editorial Newspaper',
    icon: BookOpen,
    primaryBg: '#fbf9f4',
    accentColor: '#b45309',
    badgeBg: 'bg-amber-500/20 text-amber-700 border-amber-500/30',
  },
];

interface ThemeSelectorProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ className = '', showLabel = false }) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];
  const CurrentIcon = currentOption.icon;

  // Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (selectedId: Theme) => {
    setTheme(selectedId);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Selector Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 transition-all duration-200 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
        aria-label="Select Theme Mode"
        aria-expanded={isOpen}
      >
        {/* Animated Palette / Active Icon */}
        <div className="relative flex items-center justify-center w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
          <CurrentIcon className="w-3.5 h-3.5" style={{ color: currentOption.accentColor }} />
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider">
          <span>{currentOption.name}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {showLabel && (
          <span className="hidden sm:inline font-mono text-[10px] text-slate-500 dark:text-slate-400">
            MODE
          </span>
        )}
      </button>

      {/* Floating Popover Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-64 rounded-2xl bg-white/95 dark:bg-[#0c1222]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-900/20 dark:shadow-[0_15px_40px_rgba(0,0,0,0.7)] p-2 z-50 overflow-hidden"
          >
            {/* Header Title */}
            <div className="px-3 py-2 mb-1 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                <Palette className="w-3.5 h-3.5 text-cyan-500" />
                <span>SELECT THEME MODE</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">5 Modes</span>
            </div>

            {/* Theme Options List */}
            <div className="space-y-1">
              {THEME_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = theme === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-sans text-xs transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30 text-slate-900 dark:text-white font-semibold'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Swatch & Icon Container */}
                      <div
                        className="relative w-7 h-7 rounded-lg flex items-center justify-center border shadow-sm transition-transform group-hover:scale-105"
                        style={{
                          backgroundColor: opt.primaryBg,
                          borderColor: opt.accentColor + '50',
                        }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: opt.accentColor }} />
                      </div>

                      {/* Theme Name & Subtitle */}
                      <div className="flex flex-col text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs tracking-wide">
                            {opt.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">
                          {opt.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Right side: Checkmark or Swatch dots */}
                    <div className="flex items-center gap-2">
                      {/* Swatch Indicator Dot */}
                      <div className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded-full border border-black/20"
                          style={{ backgroundColor: opt.primaryBg }}
                        />
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: opt.accentColor }}
                        />
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-cyan-500 text-black flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
