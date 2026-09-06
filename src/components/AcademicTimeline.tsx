import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar, Award, CheckCircle2, BookOpen } from 'lucide-react';
import { professorData } from '../data/professorData';

export const AcademicTimeline: React.FC = () => {
  const [tab, setTab] = useState<'education' | 'experience'>('education');

  return (
    <section id="journey" className="py-24 relative bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/90 dark:bg-cyan-950/80 border border-cyan-400/50 dark:border-cyan-500/30 font-mono text-xs text-cyan-800 dark:text-cyan-400 shadow-sm">
            <GraduationCap className="w-3.5 h-3.5" />
            ACADEMIC & PROFESSIONAL TRAJECTORY
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight">
            ACADEMIC & CAREER <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">JOURNEY</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 font-light text-base max-w-2xl">
            A milestone-driven timeline of doctoral research, academic honors, and teaching tenure.
          </p>

          {/* Toggle Tabs */}
          <div className="flex items-center p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md mt-4">
            <button
              onClick={() => setTab('education')}
              className={`px-5 py-2 rounded-xl font-mono text-xs font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                tab === 'education'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-600 text-white shadow-md dark:shadow-cyan-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              EDUCATION
            </button>
            <button
              onClick={() => setTab('experience')}
              className={`px-5 py-2 rounded-xl font-mono text-xs font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                tab === 'experience'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-600 text-white shadow-md dark:shadow-cyan-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              EXPERIENCE
            </button>
          </div>
        </div>

        {/* Timeline Content */}
        {tab === 'education' ? (
          <div className="relative max-w-4xl mx-auto py-8">
            {/* Center Vertical Connecting Line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 transform sm:-translate-x-1/2" />

            <div className="space-y-12">
              {professorData.education.map((edu, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={edu.degree + edu.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      isEven ? 'sm:flex-row-reverse' : ''
                    } justify-between gap-8`}
                  >
                    {/* Node Dot */}
                    <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-[#050811] border-2 border-cyan-500 dark:border-cyan-400 flex items-center justify-center shadow-md dark:shadow-[0_0_15px_rgba(0,240,255,0.6)] z-20">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-300 animate-ping" />
                    </div>

                    {/* Content Card */}
                    <div className="w-full sm:w-[calc(50%-2.5rem)] ml-12 sm:ml-0 p-6 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-cyan-500/20 shadow-xl hover:border-cyan-400/50 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-mono text-xs font-bold border border-cyan-300 dark:border-cyan-500/30">
                          {edu.degree}
                        </span>
                        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                          {edu.year}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-sans text-slate-900 dark:text-slate-100 mt-1">
                        {edu.field}
                      </h3>

                      <p className="text-sm font-mono text-cyan-700 dark:text-cyan-400 mt-0.5">
                        {edu.institution}
                      </p>

                      {edu.thesis && (
                        <div className="mt-4 p-3.5 rounded-2xl bg-cyan-50/80 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/30 space-y-1">
                          <span className="font-mono text-[10px] uppercase text-cyan-800 dark:text-cyan-300 font-semibold tracking-wider flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                            DOCTORAL THESIS:
                          </span>
                          <p className="text-xs text-slate-700 dark:text-slate-200 font-light italic">
                            "{edu.thesis}"
                          </p>
                        </div>
                      )}

                      {edu.cgpa && (
                        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-400/50 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-semibold">
                          <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          CGPA: {edu.cgpa}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Experience Timeline */
          <div className="relative max-w-4xl mx-auto py-8">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 transform sm:-translate-x-1/2" />

            <div className="space-y-12">
              {professorData.experience.map((exp, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={exp.role + exp.organization}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      isEven ? 'sm:flex-row-reverse' : ''
                    } justify-between gap-8`}
                  >
                    {/* Node Dot */}
                    <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-[#050811] border-2 border-purple-500 dark:border-purple-400 flex items-center justify-center shadow-md dark:shadow-[0_0_15px_rgba(139,92,246,0.6)] z-20">
                      <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-300" />
                    </div>

                    {/* Content Card */}
                    <div className="w-full sm:w-[calc(50%-2.5rem)] ml-12 sm:ml-0 p-6 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-purple-500/20 shadow-xl hover:border-purple-400/50 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-mono text-xs font-bold border border-purple-300 dark:border-purple-500/30">
                          {exp.period}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      </div>

                      <h3 className="text-xl font-bold font-sans text-slate-900 dark:text-slate-100">
                        {exp.role}
                      </h3>

                      <p className="text-sm font-mono text-slate-600 dark:text-slate-300 mt-1">
                        {exp.organization}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
