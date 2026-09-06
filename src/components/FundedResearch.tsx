import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Globe2, Calendar, UserCheck, Activity } from 'lucide-react';
import { professorData } from '../data/professorData';

export const FundedResearch: React.FC = () => {
  return (
    <section id="funded" className="py-24 relative bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 dark:bg-emerald-950/80 border border-emerald-400/50 dark:border-emerald-500/30 font-mono text-xs text-emerald-800 dark:text-emerald-400 shadow-sm">
            <DollarSign className="w-3.5 h-3.5" />
            RESEARCH GRANTS & SPONSORED PROJECTS
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight">
            FUNDED <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">RESEARCH</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 font-light text-base max-w-2xl">
            International research grants and national agency funded projects in AI and machine learning.
          </p>
        </div>

        {/* Featured Funded Projects Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {professorData.fundedResearch.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="p-8 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-emerald-500/30 shadow-xl dark:shadow-2xl flex flex-col justify-between space-y-6 group hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold border border-emerald-300 dark:border-emerald-500/40">
                    {project.status}
                  </span>

                  {project.amount && (
                    <span className="font-mono font-bold text-sm text-emerald-800 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-300 dark:border-emerald-500/30">
                      Grant: {project.amount}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold font-sans text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-2 text-cyan-800 dark:text-cyan-300 font-semibold">
                    <Globe2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Funding Agency: {project.agency}</span>
                  </div>

                  {project.pi && (
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <UserCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span>PI: {project.pi}</span>
                    </div>
                  )}

                  {project.coPi && (
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <UserCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>Co-PI: {project.coPi}</span>
                    </div>
                  )}

                  {project.duration && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>Duration: {project.duration}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 font-mono text-xs text-slate-600 dark:text-slate-400 font-semibold">
                <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Role: {project.role}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
