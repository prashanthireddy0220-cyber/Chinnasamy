import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ShieldCheck, Award, FileText, CheckCircle2 } from 'lucide-react';
import { professorData } from '../data/professorData';

export const Patents: React.FC = () => {
  return (
    <section id="patents" className="py-24 relative bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/90 dark:bg-cyan-950/80 border border-cyan-400/50 dark:border-cyan-500/30 font-mono text-xs text-cyan-800 dark:text-cyan-400 shadow-sm">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            INTELLECTUAL PROPERTY & PATENTS
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight">
            PATENTS & <span className="bg-gradient-to-r from-amber-600 via-cyan-600 to-blue-600 dark:from-amber-400 dark:via-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">INNOVATION</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 font-light text-base max-w-2xl">
            Granted international patents, registered design rights, and published intellectual property disclosures.
          </p>
        </div>

        {/* Top Featured Highlights: Granted & Design Patents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {professorData.patents.slice(0, 2).map((patent, idx) => (
            <motion.div
              key={patent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="p-8 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-amber-300 dark:border-amber-500/40 shadow-xl dark:shadow-2xl relative overflow-hidden flex flex-col justify-between space-y-6 group hover:border-amber-500 hover:-translate-y-1.5 hover:shadow-2xl dark:hover:shadow-[0_15px_35px_rgba(245,158,11,0.25)] transition-all duration-300 cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-400/50 dark:border-amber-500/40 text-amber-800 dark:text-amber-300 font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    {patent.type}
                  </span>

                  {patent.year && (
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      Year: {patent.year}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold font-sans text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                  {patent.title}
                </h3>

                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 font-mono text-xs group-hover:border-amber-400/40 transition-colors">
                  <div>
                    <span className="text-slate-500 block text-[10px]">AUTHORITY:</span>
                    <span className="text-cyan-700 dark:text-cyan-300 font-semibold">{patent.authority}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">APPLICATION / NO:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">{patent.appNo}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between font-mono text-xs text-emerald-700 dark:text-emerald-400 font-semibold pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Status: {patent.status}</span>
                </div>
                <span className="text-[10px] text-amber-700 dark:text-amber-400/80 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors font-semibold">Verified Patent</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Published / Filed Innovations Grid */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-widest text-center mb-6">
            PUBLISHED & FILED INNOVATIONS ({professorData.patents.length - 2})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {professorData.patents.slice(2).map((patent, idx) => (
              <motion.div
                key={patent.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group relative p-5 rounded-2xl bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-400/50 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_8px_25px_rgba(0,240,255,0.15)] transition-all duration-300 flex items-start gap-4 cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 font-mono text-[9px] uppercase border border-slate-200 dark:border-slate-800 font-semibold">
                      {patent.status}
                    </span>
                  </div>
                  <h4 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-200 leading-snug">
                    {patent.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
