import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, FileCheck, Users, CheckCircle2 } from 'lucide-react';
import { professorData } from '../data/professorData';

export const Leadership: React.FC = () => {
  return (
    <section id="leadership" className="py-24 relative bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/90 dark:bg-cyan-950/80 border border-cyan-400/50 dark:border-cyan-500/30 font-mono text-xs text-cyan-800 dark:text-cyan-400 shadow-sm">
            <Users className="w-3.5 h-3.5" />
            ADMINISTRATIVE RESPONSIBILITIES
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight">
            ACADEMIC <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">LEADERSHIP</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 font-light text-base max-w-2xl">
            Departmental administration, NAAC accreditation leadership, and R&D governance.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professorData.leadership.map((role, idx) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-mono text-[10px] font-bold border border-cyan-300 dark:border-cyan-500/30">
                    LEADERSHIP
                  </span>

                  {role.period && (
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      {role.period}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold font-sans text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                  {role.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                  {role.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 font-mono text-xs text-cyan-700 dark:text-cyan-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Department Administration</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
