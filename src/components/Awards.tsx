import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Sparkles, Medal, Star, CheckCircle } from 'lucide-react';
import { professorData } from '../data/professorData';

export const Awards: React.FC = () => {
  return (
    <section id="awards" className="py-24 relative bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-400/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/90 dark:bg-amber-950/80 border border-amber-400/50 dark:border-amber-500/30 font-mono text-xs text-amber-800 dark:text-amber-400 shadow-sm">
            <Trophy className="w-3.5 h-3.5" />
            HONORS & GLOBAL RECOGNITION
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight">
            AWARDS & <span className="bg-gradient-to-r from-amber-600 via-cyan-600 to-purple-600 dark:from-amber-400 dark:via-cyan-400 dark:to-purple-500 bg-clip-text text-transparent">RECOGNITION</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 font-light text-base max-w-2xl">
            Prestigious international rankings, national society awards, and evaluation jury appointments.
          </p>
        </div>

        {/* Top Highlight Card: Stanford 2% Scientist */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-50 via-white to-white dark:from-amber-950/40 dark:via-slate-900/90 dark:to-slate-900/90 border border-amber-300 dark:border-amber-500/50 shadow-xl dark:shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 mb-12 relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-[0_15px_40px_rgba(245,158,11,0.3)] transition-all duration-300 cursor-pointer"
        >
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 font-mono text-xs font-bold">
              <Award className="w-3.5 h-3.5" />
              GLOBAL SCIENTIST RANKING 2025
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold font-sans text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
              Top 2% World Scientist
            </h3>

            <p className="text-sm font-mono text-amber-700 dark:text-amber-300 font-semibold">
              Artificial Intelligence and Image Processing • Stanford–Elsevier Global Ranking
            </p>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-light leading-relaxed">
              Recognized among the top 2% of researchers worldwide in Artificial Intelligence and Image Processing based on standardized citation metrics, h-index, and co-authorship impact.
            </p>
          </div>

          <div className="w-32 h-32 rounded-full bg-amber-100 dark:bg-amber-500/10 border-2 border-amber-400/60 flex flex-col items-center justify-center p-4 text-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500">
            <Trophy className="w-10 h-10 text-amber-600 dark:text-amber-400 mb-1 animate-bounce" />
            <span className="font-mono text-xs font-bold text-amber-800 dark:text-amber-300">TOP 2%</span>
          </div>
        </motion.div>

        {/* Other Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professorData.awards.slice(1).map((award, idx) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl dark:hover:shadow-[0_12px_35px_rgba(245,158,11,0.2)] group cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono text-[10px] font-bold border border-amber-300 dark:border-amber-500/30">
                    {award.badge || 'AWARD'}
                  </span>

                  {award.year && (
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      {award.year}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold font-sans text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                  {award.title}
                </h3>

                <p className="font-mono text-xs text-cyan-700 dark:text-cyan-400 font-semibold">
                  {award.organization}
                </p>

                {award.description && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed pt-2 border-t border-slate-200 dark:border-slate-800">
                    {award.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
