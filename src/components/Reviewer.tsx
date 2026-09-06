import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { professorData } from '../data/professorData';

export const Reviewer: React.FC = () => {
  return (
    <section id="reviewer" className="py-24 relative bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/90 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-500/30 font-mono text-xs text-purple-800 dark:text-purple-300 shadow-sm">
            <BookOpen className="w-3.5 h-3.5" />
            PEER REVIEW & EDITORIAL CONTRIBUTIONS
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight">
            JOURNAL <span className="bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 dark:from-purple-400 dark:via-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">REVIEWER</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 font-light text-base max-w-2xl">
            Serving as an invited reviewer for leading SCIE, IEEE, IET, and Springer indexed international journals.
          </p>
        </div>

        {/* Reviewer Journals Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {professorData.reviewerJournals.map((journal, idx) => (
            <motion.div
              key={journal}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="group relative p-5 rounded-2xl bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/60 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-[0_8px_25px_rgba(168,85,247,0.2)] transition-all duration-300 flex items-center justify-between gap-3 shadow-md cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 border border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 shrink-0 group-hover:bg-purple-200 dark:group-hover:bg-purple-900 group-hover:text-purple-900 dark:group-hover:text-purple-200 transition-colors">
                  <CheckCircle className="w-4 h-4" />
                </div>

                <span className="font-sans text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  {journal}
                </span>
              </div>

              {/* Hover Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/90 border border-purple-300 dark:border-purple-400/40 text-[9px] font-mono text-purple-800 dark:text-purple-300 shrink-0 font-semibold">
                Peer Reviewer
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
