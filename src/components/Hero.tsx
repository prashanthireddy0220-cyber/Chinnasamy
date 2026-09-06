import React from 'react';
import { motion } from 'framer-motion';
import { Network, BookOpen, Download, Mail, Award, Sparkles, ChevronDown } from 'lucide-react';
import { professorData } from '../data/professorData';

interface HeroProps {
  onOpenCV: () => void;
}

const FLOATING_KEYWORDS = [
  { text: 'CRYPTOGRAPHY', top: '10%', left: '5%' },
  { text: 'CLOUD SECURITY', top: '25%', right: '0%' },
  { text: 'ACCESS CONTROL', top: '75%', left: '2%' },
  { text: 'AI', top: '80%', right: '10%' },
  { text: 'MACHINE LEARNING', top: '48%', left: '-8%' },
  { text: 'CYBERSECURITY', top: '5%', right: '15%' },
  { text: 'BLOCKCHAIN', top: '60%', right: '-5%' },
  { text: 'DEEP LEARNING', top: '-5%', left: '30%' },
];

export const Hero: React.FC<HeroProps> = ({ onOpenCV }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#050811] transition-colors duration-300">
      {/* Background Grids & Particle Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-100/40 via-slate-50 to-slate-50 dark:from-cyan-950/30 dark:via-[#050811] dark:to-[#050811] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c710_1px,transparent_1px),linear-gradient(to_bottom,#0284c710_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Decorative Blur Circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

        {/* Left Column: Academic Credentials & Title */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start space-y-6"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-100/90 dark:bg-cyan-950/80 border border-cyan-400/50 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300 font-mono text-xs tracking-widest shadow-sm dark:shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping" />
            RESEARCH • INNOVATION • ACADEMIA
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-600 dark:from-white dark:via-slate-100 dark:to-cyan-300 bg-clip-text text-transparent">
                {professorData.name}
              </span>
            </h1>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-cyan-700 dark:text-cyan-400 font-mono text-base sm:text-lg font-medium">
              <span>{professorData.designation}</span>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <span className="text-slate-600 dark:text-slate-300">{professorData.institution}</span>
            </div>
          </div>

          {/* Supporting Bio Text */}
          <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg font-light max-w-2xl leading-relaxed">
            Researcher in <span className="text-cyan-700 dark:text-cyan-300 font-medium">Artificial Intelligence</span>,{' '}
            <span className="text-blue-700 dark:text-blue-300 font-medium">Cybersecurity</span>,{' '}
            <span className="text-purple-700 dark:text-purple-300 font-medium">Cryptography</span>,{' '}
            <span className="text-cyan-700 dark:text-cyan-300 font-medium">Cloud Security</span> and Intelligent Systems.
            Dedicated to advancing secure architectures, deep learning models, and privacy-preserving access control.
          </p>

          {/* Quick Academic Highlights Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 py-2">
            <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-300 shadow-sm flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Top 2% Stanford-Elsevier Scientist 2025</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-300 shadow-sm flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Anna Univ Supervisor No. 4140166</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            {/* Primary: EXPLORE RESEARCH */}
            <button
              onClick={() => scrollToSection('research')}
              className="group relative px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-mono text-xs font-semibold tracking-wider shadow-md hover:shadow-lg dark:shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
            >
              <Network className="w-4 h-4" />
              EXPLORE RESEARCH

              {/* Hover Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 pointer-events-none z-30 px-2.5 py-1 rounded-md bg-slate-900 dark:bg-slate-950 border border-slate-700 dark:border-cyan-400/50 text-[10px] font-mono text-slate-100 dark:text-cyan-300 whitespace-nowrap shadow-xl">
                View Research Constellation
              </div>
            </button>

            {/* Primary: PUBLICATIONS */}
            <button
              onClick={() => scrollToSection('publications')}
              className="group relative px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 border border-cyan-500/40 text-cyan-700 dark:text-cyan-300 font-mono text-xs font-semibold tracking-wider hover:border-cyan-500 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2.5 cursor-pointer shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              PUBLICATIONS

              {/* Hover Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 pointer-events-none z-30 px-2.5 py-1 rounded-md bg-slate-900 dark:bg-slate-950 border border-slate-700 dark:border-cyan-400/50 text-[10px] font-mono text-slate-100 dark:text-cyan-300 whitespace-nowrap shadow-xl">
                Browse Research Papers
              </div>
            </button>

            {/* Secondary: CONNECT */}
            <button
              onClick={() => scrollToSection('contact')}
              className="group relative px-5 py-3.5 rounded-xl bg-white dark:bg-slate-950/80 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              CONNECT

              {/* Hover Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 pointer-events-none z-30 px-2 py-1 rounded-md bg-slate-900 dark:bg-slate-950 border border-slate-700 dark:border-cyan-400/50 text-[10px] font-mono text-slate-100 dark:text-cyan-300 whitespace-nowrap shadow-xl">
                Direct Inquiries
              </div>
            </button>

            {/* Secondary: DOWNLOAD CV */}
            <button
              onClick={onOpenCV}
              className="group relative px-5 py-3.5 rounded-xl bg-white dark:bg-slate-950/80 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              DOWNLOAD CV

              {/* Hover Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 pointer-events-none z-30 px-2 py-1 rounded-md bg-slate-900 dark:bg-slate-950 border border-slate-700 dark:border-cyan-400/50 text-[10px] font-mono text-slate-100 dark:text-cyan-300 whitespace-nowrap shadow-xl">
                Preview Official PDF CV
              </div>
            </button>
          </div>
        </motion.div>

        {/* Right Column: Avatar Photo with Circular Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex justify-center items-center relative w-full max-w-md lg:max-w-lg min-h-[380px] sm:min-h-[440px]"
        >
          {/* Animated Background Ring Effects */}
          <div className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-cyan-500/30 animate-spin-slow pointer-events-none" />
          <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-purple-500/20 border-dashed pointer-events-none" />
          <div className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-2xl pointer-events-none animate-pulse-slow" />

          {/* Circular Photo Avatar Frame */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-1.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_50px_rgba(0,240,255,0.35)] z-10 group cursor-pointer">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-slate-900 bg-slate-900 dark:bg-slate-950 relative">
              <img
                src={professorData.faceUrl}
                alt={professorData.name}
                className="w-full h-full object-cover object-top transform group-hover:scale-108 transition-transform duration-700"
                onError={(e) => {
                  (e.currentTarget.src = professorData.avatarUrl);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-[#050811]/60 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Hover Tooltip on Photo */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none z-30 px-3.5 py-1.5 rounded-full bg-slate-900 dark:bg-slate-900/95 border border-slate-700 dark:border-cyan-400/50 text-slate-100 dark:text-cyan-300 text-xs font-mono whitespace-nowrap shadow-lg flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Dr. P. Chinnasamy • Academic Leader & Researcher
            </div>
          </div>

          {/* Floating Orbiting Research Keywords */}
          {FLOATING_KEYWORDS.map((tag, idx) => (
            <motion.div
              key={tag.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.9, y: [0, -6, 0] }}
              transition={{
                duration: 4 + (idx % 3),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: idx * 0.2
              }}
              style={{
                top: tag.top,
                left: tag.left,
                right: tag.right
              }}
              className="absolute z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 border border-cyan-400/50 dark:border-cyan-500/40 text-[10px] font-mono tracking-widest text-cyan-800 dark:text-cyan-300 backdrop-blur-md shadow-md pointer-events-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping" />
              {tag.text}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => scrollToSection('about')}>
        <span className="font-mono text-[10px] tracking-widest uppercase">SCROLL TO EXPLORE</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
};
