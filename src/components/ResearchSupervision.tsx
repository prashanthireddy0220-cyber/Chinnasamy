import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, CheckCircle2, Clock, Sparkles, GraduationCap } from 'lucide-react';
import { professorData } from '../data/professorData';

export const ResearchSupervision: React.FC = () => {
  return (
    <section id="supervision" className="py-24 relative bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/90 dark:bg-cyan-950/80 border border-cyan-400/50 dark:border-cyan-500/30 font-mono text-xs text-cyan-800 dark:text-cyan-400 shadow-sm">
            <Users className="w-3.5 h-3.5" />
            DOCTORAL GUIDANCE & MENTORSHIP
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight">
            RESEARCH <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">SUPERVISION</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 font-light text-base max-w-2xl">
            Mentoring Ph.D. scholars in deep learning algorithms, healthcare diagnostics, and cloud cybersecurity.
          </p>

          {/* Supervisor Badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
            <div className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900/90 border border-cyan-400/50 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300 font-mono text-xs flex items-center gap-2 shadow-md">
              <GraduationCap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{professorData.supervisorInfo.kare}</span>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900/90 border border-purple-400/50 dark:border-purple-500/40 text-purple-800 dark:text-purple-300 font-mono text-xs flex items-center gap-2 shadow-md">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>{professorData.supervisorInfo.annaUniversity}</span>
            </div>
          </div>
        </div>

        {/* Scholar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professorData.scholars.map((scholar, idx) => {
            const isDefended = scholar.status === 'PhD Defended';
            const isInProgress = scholar.status === 'In Progress';

            return (
              <motion.div
                key={scholar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-400/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl hover:shadow-2xl dark:hover:shadow-[0_12px_35px_rgba(0,240,255,0.18)] group cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">
                      PHD SCHOLAR
                    </span>
                    <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold border flex items-center gap-1 ${
                      isDefended
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-400/50 dark:border-emerald-500/40'
                        : isInProgress
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-400/50 dark:border-amber-500/40'
                        : 'bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border-cyan-400/50 dark:border-cyan-500/40'
                    }`}>
                      {isDefended ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {scholar.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-sans text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                    {scholar.name}
                  </h3>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80">
                    <span className="font-mono text-[10px] text-cyan-700 dark:text-cyan-400 uppercase tracking-wider block mb-1 font-semibold">
                      RESEARCH TOPIC:
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-200 font-light leading-relaxed">
                      {scholar.topic}
                    </p>
                  </div>
                </div>

                {scholar.achievement && (
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                    <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Achievement: {scholar.achievement}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
