import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, ShieldCheck, Database, Cloud } from 'lucide-react';
import { professorData } from '../data/professorData';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-20 relative bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/90 dark:bg-cyan-950/80 border border-cyan-400/50 dark:border-cyan-500/30 font-mono text-xs text-cyan-800 dark:text-cyan-400 shadow-sm">
            <Award className="w-3.5 h-3.5" />
            PROFESSIONAL CREDENTIALS
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight">
            CERTIFICATIONS & <span className="bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">TRAINING</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {professorData.certifications.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all flex items-start gap-4 shadow-xl"
            >
              <div className="p-3 rounded-2xl bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 shrink-0">
                {cert.issuer.includes('Oracle') ? <Database className="w-6 h-6" /> : <Cloud className="w-6 h-6" />}
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-cyan-700 dark:text-cyan-400 font-bold uppercase tracking-wider">
                    {cert.issuer}
                  </span>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold">{cert.year}</span>
                </div>

                <h3 className="text-base font-bold font-sans text-slate-900 dark:text-white leading-snug">
                  {cert.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
