import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Trophy, 
  Award, 
  TrendingUp, 
  Globe2, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  Info,
  GraduationCap
} from 'lucide-react';
import { professorData } from '../data/professorData';

interface MilestoneStep {
  year: string;
  title: string;
  category: string;
  metric: string;
  heightPercent: number; // For bar chart relative height
  color: string;
  badge: string;
  summary: string;
  verifiedSource: string;
  isPinnacle?: boolean;
}

const MILESTONES: MilestoneStep[] = [
  {
    year: '2021',
    title: 'Cloud Security & Access Control Foundations',
    category: 'Doctoral Foundations & Security Architectures',
    metric: '15+ Scopus Papers',
    heightPercent: 35,
    color: '#4388FF',
    badge: 'Foundation Phase',
    summary: 'Published breakthrough scalable attribute-based access control models for cloud multi-authority systems.',
    verifiedSource: 'KARE Doctoral Research & IEEE/Scopus Venues'
  },
  {
    year: '2022',
    title: 'AI Authentication & Supervisor Recognition',
    category: 'Biometrics & Research Mentorship',
    metric: 'Supervisor No. 4140166',
    heightPercent: 48,
    color: '#20D5F2',
    badge: 'State Recognition',
    summary: 'Appointed recognized supervisor at Anna University & KARE; developed AI-MFA anti-spoofing liveness detection.',
    verifiedSource: 'Anna University Chennai Recognition Order'
  },
  {
    year: '2023',
    title: 'Medi-Chain & Cognitive Deep Learning',
    category: 'Healthcare Security & Patents',
    metric: '3 Granted / Design Patents',
    heightPercent: 62,
    color: '#A855F7',
    badge: 'Patents & Innovations',
    summary: 'Invented Medi-Chain blockchain EHR architectures and patented smart IoT solar weather monitoring systems.',
    verifiedSource: 'Australian Patent Office (IP Australia) & Indian Patent Office'
  },
  {
    year: '2024',
    title: 'CSI Award & UTAR International Fellowship',
    category: 'International Collaborative Research',
    metric: 'RM 24,000 Grant Award',
    heightPercent: 75,
    color: '#38BDF8',
    badge: 'Fellowship & Award',
    summary: 'Conferred CSI Innovative Research Award; appointed Senior Research Associate at UTAR Malaysia for AI depression detection.',
    verifiedSource: 'CSI Annual Excellence Awards & UTAR Malaysia MoA'
  },
  {
    year: '2025',
    title: 'Stanford World Top 2% Scientist Ranking (2025)',
    category: 'Artificial Intelligence & Image Processing',
    metric: 'Top 2% Worldwide',
    heightPercent: 88,
    color: '#F59E0B',
    badge: 'World Pinnacle Ranking',
    summary: 'Ranked among the top 2% of researchers worldwide in AI & Image Processing based on composite citation metrics and h-index.',
    verifiedSource: 'Stanford University & Elsevier BV Global Ranking (2025)',
    isPinnacle: true
  },
  {
    year: '2026',
    title: 'World Top 2% Scientist Global Recognition (2026)',
    category: 'Artificial Intelligence & Image Processing',
    metric: 'Top 2% Worldwide (2026)',
    heightPercent: 100,
    color: '#F59E0B',
    badge: 'Consecutive World Ranking',
    summary: 'Reaffirmed and recognized among the World Top 2% Scientists in 2026 by Stanford University & Elsevier in Artificial Intelligence and Image Processing, celebrating consecutive global citation excellence.',
    verifiedSource: 'Stanford University & Elsevier BV Global Ranking (2025, 2026)',
    isPinnacle: true
  }
];

export const ResearchImpact: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeStepIndex, setActiveStepIndex] = useState<number>(MILESTONES.length - 1); // Default to 2026 pinnacle

  const activeMilestone = MILESTONES[activeStepIndex];

  return (
    <section id="impact" className="py-24 relative bg-slate-50 dark:bg-[#050810] text-slate-900 dark:text-[#F5F7FF] transition-colors duration-300 overflow-hidden">
      {/* Background World Map & Scientific Geodesic Grid SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-25 overflow-hidden">
        <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <radialGradient id="mapGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#20D5F2" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#4388FF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#050810" stopOpacity="0" />
            </radialGradient>
            <pattern id="dotGrid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#20D5F2" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapGlow)" />
          <rect width="100%" height="100%" fill="url(#dotGrid)" />

          {/* Abstract World Continents Coordinate Lines */}
          <path d="M 200 250 Q 300 200 450 260 T 650 240 T 900 280 T 1100 220" fill="none" stroke="#20D5F2" strokeWidth="0.8" opacity="0.35" strokeDasharray="4 6" />
          <path d="M 150 450 Q 350 420 550 480 T 850 460 T 1050 500" fill="none" stroke="#4388FF" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 5" />
          
          {/* Research Connection Pulses */}
          <circle cx="750" cy="380" r="4" fill="#20D5F2" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="750" cy="380" r="3" fill="#20D5F2" />
          <circle cx="820" cy="420" r="3" fill="#A855F7" />
          <circle cx="320" cy="320" r="3" fill="#4388FF" />
          <line x1="750" y1="380" x2="820" y2="420" stroke="#20D5F2" strokeWidth="1" opacity="0.4" strokeDasharray="2 3" />
          <line x1="750" y1="380" x2="320" y2="320" stroke="#4388FF" strokeWidth="1" opacity="0.3" strokeDasharray="2 4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 dark:bg-amber-950/40 border border-amber-400/50 dark:border-amber-500/40 font-mono text-xs text-amber-800 dark:text-amber-400 shadow-sm font-semibold tracking-wider"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            STANFORD–ELSEVIER TOP 2% SCIENTISTS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-slate-900 dark:text-[#F5F7FF]"
          >
            RESEARCH IMPACT & <span className="bg-gradient-to-r from-amber-500 via-[#20D5F2] to-[#A855F7] bg-clip-text text-transparent">GLOBAL RECOGNITION</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-slate-600 dark:text-[#91A0BA] font-light text-base sm:text-lg max-w-2xl"
          >
            Visualizing Dr. P. Chinnasamy’s multi-year citation ascent, patent growth, and Stanford University global ranking milestone.
          </motion.p>
        </div>

        {/* =========================================================================
            MAIN INFOGRAPHIC: THE ASCENDING STAIRCASE & GROWING BARS
        ========================================================================= */}
        <div className="p-4 sm:p-10 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#0D1425] backdrop-blur-xl border border-slate-200 dark:border-[#20D5F2]/25 shadow-2xl dark:shadow-[0_20px_50px_rgba(5,8,16,0.9)] mb-10">
          
          {/* Header of Infographic */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 mb-8 border-b border-slate-200 dark:border-slate-800/80 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#20D5F2] to-[#4388FF] flex items-center justify-center p-2.5 shadow-lg shadow-[#20D5F2]/25">
                <Globe2 className="w-full h-full text-slate-950" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-[#F5F7FF]">
                  Global Citation & Impact Ascent
                </h3>
                <p className="font-mono text-xs text-slate-500 dark:text-[#91A0BA]">
                  Interactive year-by-year ranking progression (Click any year)
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-mono text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Current Status: World Top 2% (2025, 2026)</span>
            </div>
          </div>

          {/* Desktop & Tablet Staircase Visualization */}
          <div className="relative pt-12 pb-6 hidden md:block">

            {/* Moving Researcher Avatar / Character along the staircase */}
            <motion.div
              className="absolute z-20 pointer-events-none flex flex-col items-center"
              initial={false}
              animate={{
                left: `${(activeStepIndex / (MILESTONES.length - 1)) * 80 + 10}%`,
                bottom: `${MILESTONES[activeStepIndex].heightPercent * 2.3 + 55}px`
              }}
              transition={{
                type: shouldReduceMotion ? 'tween' : 'spring',
                stiffness: 120,
                damping: 18
              }}
            >
              {/* Researcher Badge Indicator */}
              <div className="px-2.5 py-1 rounded-lg bg-slate-950 border border-[#20D5F2] text-[10px] font-mono text-[#20D5F2] shadow-xl whitespace-nowrap mb-1 font-bold animate-bounce flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-[#20D5F2]" />
                <span>Dr. Chinnasamy</span>
              </div>

              {/* Stylized Scientist / Researcher SVG Icon */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#20D5F2] via-[#4388FF] to-[#A855F7] p-0.5 shadow-[0_0_20px_rgba(32,213,242,0.6)]">
                <div className="w-full h-full rounded-full bg-[#050810] flex items-center justify-center">
                  <span className="text-xs font-bold text-[#F5F7FF]">👨‍🔬</span>
                </div>
              </div>
            </motion.div>

            {/* Horizontal Bar Chart Container */}
            <div className="h-72 flex items-end justify-between gap-4 sm:gap-6 px-4 relative border-b-2 border-slate-300 dark:border-slate-800">

              {/* Subtle Horizontal Reference Grid Lines */}
              <div className="absolute inset-x-0 bottom-1/4 border-b border-dashed border-slate-200 dark:border-slate-800/60 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-2/4 border-b border-dashed border-slate-200 dark:border-slate-800/60 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-3/4 border-b border-dashed border-slate-200 dark:border-slate-800/60 pointer-events-none" />

              {MILESTONES.map((step, idx) => {
                const isSelected = activeStepIndex === idx;

                return (
                  <div
                    key={step.year}
                    onClick={() => setActiveStepIndex(idx)}
                    className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group relative z-10"
                  >
                    {/* Top Metric Pill */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className={`mb-2 px-2 py-0.5 rounded-md font-mono text-[10px] text-center font-bold transition-all ${
                        isSelected
                          ? 'bg-slate-900 dark:bg-[#050810] text-[#20D5F2] border border-[#20D5F2]/50 shadow-md scale-105'
                          : 'bg-slate-100 dark:bg-[#080D1A] text-slate-500 dark:text-[#91A0BA] border border-transparent group-hover:border-slate-700'
                      }`}
                    >
                      {step.metric}
                    </motion.div>

                    {/* Growing Vertical Bar */}
                    <motion.div
                      initial={shouldReduceMotion ? { height: `${step.heightPercent}%` } : { height: 0 }}
                      whileInView={{ height: `${step.heightPercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.15, ease: 'easeOut' }}
                      className={`w-full max-w-[80px] rounded-t-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-end p-2 ${
                        step.isPinnacle
                          ? 'bg-gradient-to-t from-amber-600/40 via-amber-500/60 to-amber-400 border-t-2 border-x-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.3)]'
                          : isSelected
                          ? 'bg-gradient-to-t from-[#050810] via-[#20D5F2]/30 to-[#20D5F2] border-t-2 border-x-2 border-[#20D5F2] shadow-[0_0_20px_rgba(32,213,242,0.3)]'
                          : 'bg-gradient-to-t from-slate-200 dark:from-[#050810] to-slate-400 dark:to-slate-700/60 border-t border-x border-slate-300 dark:border-slate-700/60 group-hover:to-[#20D5F2]/60'
                      }`}
                    >
                      {/* Pinnacle Laurel Icon */}
                      {step.isPinnacle && (
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-amber-300 animate-pulse">
                          <Trophy className="w-5 h-5 drop-shadow-md" />
                        </div>
                      )}
                    </motion.div>

                    {/* Step Platform Base */}
                    <div className={`w-full max-w-[84px] h-3 rounded-b-md transition-colors ${
                      isSelected ? 'bg-[#20D5F2]' : 'bg-slate-300 dark:bg-slate-800'
                    }`} />

                    {/* Year Label */}
                    <div className="mt-3 text-center">
                      <span className={`font-mono text-sm font-bold block transition-colors ${
                        isSelected
                          ? 'text-[#20D5F2] scale-110'
                          : 'text-slate-600 dark:text-[#91A0BA] group-hover:text-slate-900 dark:group-hover:text-[#F5F7FF]'
                      }`}>
                        {step.year}
                      </span>
                    </div>

                  </div>
                );
              })}

            </div>
          </div>

          {/* Mobile Vertical Stepped Timeline */}
          <div className="md:hidden space-y-3 pt-4">
            {MILESTONES.map((step, idx) => {
              const isSelected = activeStepIndex === idx;

              return (
                <div
                  key={step.year}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#050810] border-[#20D5F2] shadow-lg shadow-[#20D5F2]/15'
                      : 'bg-slate-50 dark:bg-[#050810]/60 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-[#20D5F2]">{step.year}</span>
                    <span className="px-2 py-0.5 rounded-full font-mono text-[10px] bg-[#20D5F2]/10 text-[#20D5F2] border border-[#20D5F2]/30 font-semibold">
                      {step.metric}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-[#F5F7FF]">{step.title}</h4>
                </div>
              );
            })}
          </div>

          {/* =========================================================================
              ACTIVE MILESTONE DETAIL PANEL
          ========================================================================= */}
          <motion.div
            key={activeMilestone.year}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mt-8 p-6 rounded-2xl border transition-all ${
              activeMilestone.isPinnacle
                ? 'bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/40 shadow-xl'
                : 'bg-slate-50 dark:bg-[#050810] border-slate-200 dark:border-[#20D5F2]/30'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold ${
                  activeMilestone.isPinnacle
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-[#20D5F2] text-slate-950 shadow-md'
                }`}>
                  {activeMilestone.year} • {activeMilestone.badge}
                </span>
                <span className="font-mono text-xs text-slate-500 dark:text-[#91A0BA]">
                  {activeMilestone.category}
                </span>
              </div>

              <div className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Impact Metric: {activeMilestone.metric}</span>
              </div>
            </div>

            <h4 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-[#F5F7FF] mb-2">
              {activeMilestone.title}
            </h4>

            <p className="text-sm text-slate-700 dark:text-[#91A0BA] font-light leading-relaxed mb-4">
              {activeMilestone.summary}
            </p>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-800/80 font-mono text-xs text-slate-500 dark:text-[#91A0BA]">
              <ShieldCheck className="w-4 h-4 text-[#20D5F2]" />
              <span>Verified Citation Record: <strong className="text-slate-800 dark:text-slate-200">{activeMilestone.verifiedSource}</strong></span>
            </div>
          </motion.div>

          {/* =========================================================================
              METHODOLOGY & CITATION FOOTNOTE
          ========================================================================= */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex items-start gap-2.5 text-xs font-mono text-slate-500 dark:text-[#91A0BA] leading-relaxed">
            <Info className="w-4 h-4 text-[#20D5F2] shrink-0 mt-0.5" />
            <p>
              <strong>Methodology & Verification Note:</strong> Stanford University & Elsevier BV Data-Repository (Ioannidis, J.P.A. 2025/2026). The World Top 2% Scientists List evaluates standardized citation indicators, composite c-scores, h-index, and co-authorship impact across 22 scientific fields and 174 subfields in Artificial Intelligence & Image Processing. All milestones reflect verified academic records.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
