import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bot, Sparkles, ChevronRight, FileText } from 'lucide-react';
import { professorData } from '../data/professorData';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onOpenAI: () => void;
}

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Research', href: '#research' },
  { name: 'Journey', href: '#journey' },
  { name: 'Publications', href: '#publications' },
  { name: 'Patents', href: '#patents' },
  { name: 'Supervision', href: '#supervision' },
  { name: 'Awards', href: '#awards' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenAI }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = NAV_LINKS.map(link => link.href.substring(1));
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 transition-all duration-300">
      <div className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-[#080d1e]/85 backdrop-blur-xl border border-slate-200/80 dark:border-cyan-500/20 shadow-lg shadow-slate-200/50 dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] px-4 py-2.5'
          : 'bg-white/60 dark:bg-slate-950/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 px-5 py-3'
      } flex items-center justify-between`}>

        {/* Brand Identity */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full rounded-[10px] bg-slate-900 dark:bg-[#050811] flex items-center justify-center font-bold text-xs text-cyan-400 font-mono">
              PC
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-sans font-bold text-sm text-slate-900 dark:text-slate-100 tracking-wide group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
              DR. P. CHINNASAMY
            </span>
            <span className="font-mono text-[9px] text-cyan-600 dark:text-cyan-400 tracking-wider uppercase font-semibold">
              Assoc. Professor • KARE
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-700 dark:text-cyan-300 bg-cyan-100/80 dark:bg-cyan-950/60 border border-cyan-400/50 dark:border-cyan-500/30 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200/60 dark:hover:bg-slate-900/60'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Actions: Lamp Pull-Cord Theme Switcher + ASK AI Button + Mobile Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Theme Mode Selector */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>

          {/* ASK AI Button */}
          <button
            onClick={onOpenAI}
            className="relative group px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 hover:from-cyan-500 hover:via-blue-600 hover:to-purple-600 border border-cyan-500/40 text-cyan-700 dark:text-cyan-300 hover:text-white text-xs font-mono font-semibold tracking-wider transition-all duration-300 flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.15)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] cursor-pointer"
          >
            <Bot className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:text-white animate-pulse" />
            <span>ASK AI</span>
            <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-300 group-hover:text-white" />

            {/* Hover Tooltip */}
            <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 pointer-events-none z-50 px-2.5 py-1 rounded-lg bg-slate-900 dark:bg-slate-950 border border-cyan-400/50 text-[10px] font-mono text-cyan-300 whitespace-nowrap shadow-xl">
              Research AI Assistant
            </div>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden max-w-7xl mx-auto mt-2 p-4 rounded-2xl bg-white/95 dark:bg-[#080d1e]/95 backdrop-blur-2xl border border-slate-200 dark:border-cyan-500/30 shadow-2xl flex flex-col space-y-2"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl font-mono text-sm text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 border border-transparent hover:border-cyan-300/40 dark:hover:border-cyan-500/20 transition-all"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </a>
            ))}

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 px-2">
              <ThemeToggle showLabel />
              <a
                href={professorData.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-center font-mono text-xs text-cyan-700 dark:text-cyan-400 flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-800 font-semibold"
              >
                <FileText className="w-4 h-4" />
                DOWNLOAD CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
