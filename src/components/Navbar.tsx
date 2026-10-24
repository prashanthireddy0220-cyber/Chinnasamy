import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bot, Sparkles, ChevronRight, FileText } from 'lucide-react';
import { professorData } from '../data/professorData';
import { ThemeToggle } from './ThemeToggle';
import facePhoto from '../assets/chinnasamy_face.jpg';

interface NavbarProps {
  onOpenAI: () => void;
}

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Research', href: '#research' },
  { name: 'Journey', href: '#journey' },
  { name: 'Impact', href: '#impact' },
  { name: 'Publications', href: '#publications' },
  { name: 'Patents', href: '#patents' },
  { name: 'Supervision', href: '#supervision' },
  { name: 'Awards', href: '#awards' },
  { name: 'Gallery', href: '#gallery' },
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
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
    <header className="fixed top-0 left-0 right-0 z-40 px-2 sm:px-4 py-2 sm:py-3 transition-all duration-300">
      <div className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#080d1a]/90 backdrop-blur-xl border border-slate-200/80 dark:border-[#20D5F2]/25 shadow-lg shadow-slate-200/50 dark:shadow-[0_10px_35px_rgba(5,8,16,0.8)] px-3 sm:px-4 py-2 sm:py-2.5'
          : 'bg-white/70 dark:bg-[#050810]/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/80 px-3 sm:px-5 py-2.5 sm:py-3'
      } flex items-center justify-between gap-2`}>

        {/* Brand Identity */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#20D5F2] via-[#4388FF] to-[#A855F7] p-0.5 shadow-md shadow-[#20D5F2]/25 group-hover:scale-105 transition-transform duration-300 shrink-0 overflow-hidden">
            <img
              src={facePhoto || professorData.faceUrl}
              alt={professorData.name}
              className="w-full h-full rounded-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-[#F5F7FF] tracking-wide group-hover:text-[#20D5F2] transition-colors truncate max-w-[110px] min-[360px]:max-w-[150px] sm:max-w-none">
              Dr. P. Chinnasamy
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] text-[#20D5F2] tracking-wider uppercase font-semibold truncate">
              Assoc. Professor • KARE
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-0.5 2xl:space-x-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`px-2 2xl:px-2.5 py-1.5 rounded-xl font-sans text-[11px] 2xl:text-xs transition-all duration-200 ${
                  isActive
                    ? 'text-[#20D5F2] bg-[#20D5F2]/10 border border-[#20D5F2]/40 shadow-[0_0_12px_rgba(32,213,242,0.15)] font-semibold'
                    : 'text-slate-700 dark:text-[#91A0BA] hover:text-[#20D5F2] dark:hover:text-[#20D5F2] hover:bg-slate-100 dark:hover:bg-[#0D1425]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Actions: Theme Switcher + ASK AI Button + Mobile Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Theme Mode Selector */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>

          {/* ASK AI Button */}
          <button
            onClick={onOpenAI}
            className="relative group px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#20D5F2]/15 via-[#4388FF]/15 to-[#A855F7]/15 hover:from-[#20D5F2] hover:via-[#4388FF] hover:to-[#A855F7] border border-[#20D5F2]/40 text-cyan-800 dark:text-[#20D5F2] hover:text-slate-950 font-mono text-[11px] sm:text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-1.5 sm:gap-2 shadow-[0_0_15px_rgba(32,213,242,0.15)] hover:shadow-[0_0_25px_rgba(32,213,242,0.4)] cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#20D5F2] group-hover:text-slate-950 animate-pulse" />
            <span className="hidden sm:inline">ASK AI</span>
            <Sparkles className="w-3 h-3 text-[#20D5F2] group-hover:text-slate-950" />

            {/* Hover Tooltip */}
            <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 pointer-events-none z-50 px-2.5 py-1 rounded-lg bg-slate-900 dark:bg-[#0D1425] border border-[#20D5F2]/50 text-[10px] font-mono text-[#20D5F2] whitespace-nowrap shadow-xl">
              Research AI Assistant
            </div>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-[#0D1425] border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-[#91A0BA] hover:text-[#20D5F2] dark:hover:text-[#20D5F2] focus:outline-none cursor-pointer"
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
            className="xl:hidden max-w-7xl mx-auto mt-2 p-3 sm:p-4 rounded-2xl bg-white/95 dark:bg-[#0D1425]/95 backdrop-blur-2xl border border-slate-200 dark:border-[#20D5F2]/30 shadow-2xl flex flex-col space-y-1 max-h-[calc(100vh-5.5rem)] overflow-y-auto"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl font-sans font-medium text-sm text-slate-800 dark:text-[#F5F7FF] hover:text-[#20D5F2] hover:bg-[#20D5F2]/10 border border-transparent hover:border-[#20D5F2]/20 transition-all"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-[#91A0BA]" />
              </a>
            ))}

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 px-2">
              <ThemeToggle showLabel />
              <a
                href={professorData.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-[#050810] border border-slate-300 dark:border-slate-800 text-center font-mono text-xs text-cyan-800 dark:text-[#20D5F2] flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-[#121B32] font-semibold"
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
