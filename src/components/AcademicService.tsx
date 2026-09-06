import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Calendar, CheckCircle } from 'lucide-react';
import { professorData } from '../data/professorData';

export const AcademicService: React.FC = () => {
  return (
    <section id="service" className="py-20 relative bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/90 dark:bg-cyan-950/80 border border-cyan-400/50 dark:border-cyan-500/30 font-mono text-xs text-cyan-800 dark:text-cyan-400 shadow-sm">
            <Globe className="w-3.5 h-3.5" />
            COMMUNITY & CONFERENCE ROLES
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight">
            ACADEMIC <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">SERVICE</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {professorData.academicService.map((service, idx) => (
            <motion.div
              key={service.event}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3 shadow-xl"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-mono text-[10px] font-bold border border-blue-300 dark:border-blue-500/30">
                  {service.role}
                </span>

                <h3 className="text-base font-bold font-sans text-slate-900 dark:text-white leading-snug">
                  {service.event}
                </h3>
              </div>

              {service.year && (
                <div className="font-mono text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800 font-semibold">
                  Period / Year: {service.year}
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
