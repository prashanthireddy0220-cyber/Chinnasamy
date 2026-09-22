import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, CheckCircle2, Globe, Cpu, Users } from 'lucide-react';
import { professorData } from '../data/professorData';

export const ProfessionalMembership: React.FC = () => {
  const getMembershipIcon = (abbr: string) => {
    switch (abbr) {
      case 'IEEE EdSoc':
        return <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'CSI':
        return <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'ACM':
        return <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />;
      default:
        return <Award className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />;
    }
  };

  const getGradientStyle = (abbr: string) => {
    switch (abbr) {
      case 'IEEE EdSoc':
        return {
          bgBadge: 'bg-blue-100 dark:bg-blue-950/80 border-blue-300 dark:border-blue-500/30 text-blue-800 dark:text-blue-300',
          hoverBorder: 'hover:border-blue-500/60 dark:hover:shadow-[0_8px_30px_rgba(59,130,246,0.25)]',
          pillBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-500/30',
          accentGradient: 'from-blue-600 via-cyan-600 to-indigo-600 dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400',
        };
      case 'CSI':
        return {
          bgBadge: 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300',
          hoverBorder: 'hover:border-emerald-500/60 dark:hover:shadow-[0_8px_30px_rgba(16,185,129,0.25)]',
          pillBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30',
          accentGradient: 'from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400',
        };
      case 'ACM':
      default:
        return {
          bgBadge: 'bg-purple-100 dark:bg-purple-950/80 border-purple-300 dark:border-purple-500/30 text-purple-800 dark:text-purple-300',
          hoverBorder: 'hover:border-purple-500/60 dark:hover:shadow-[0_8px_30px_rgba(168,85,247,0.25)]',
          pillBg: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-500/30',
          accentGradient: 'from-purple-600 via-pink-600 to-cyan-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400',
        };
    }
  };

  return (
    <section id="memberships" className="py-24 relative bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-cyan-100 dark:from-blue-950/80 dark:via-purple-950/80 dark:to-cyan-950/80 border border-blue-300 dark:border-cyan-500/30 font-mono text-xs text-blue-900 dark:text-cyan-300 shadow-sm font-semibold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />
            GLOBAL PROFESSIONAL AFFILIATIONS
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight">
            PROFESSIONAL <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 dark:from-blue-400 dark:via-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">MEMBERSHIPS</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 font-light text-base max-w-2xl leading-relaxed">
            Active professional member of world-renowned technical societies driving scientific innovation and computing excellence.
          </p>
        </div>

        {/* Memberships Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {professorData.professionalMemberships.map((membership, idx) => {
            const styles = getGradientStyle(membership.abbreviation);
            const iconComp = getMembershipIcon(membership.abbreviation);

            return (
              <motion.div
                key={membership.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className={`group relative p-7 rounded-3xl bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/80 ${styles.hoverBorder} hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between shadow-xl cursor-default`}
              >
                {/* Top Badge & Abbreviation */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className={`p-3 rounded-2xl ${styles.bgBadge} border shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                      {iconComp}
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${styles.pillBg}`}>
                      {membership.badge}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-extrabold font-sans text-slate-900 dark:text-white leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {membership.title}
                    </h3>
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      {membership.society}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed pt-2">
                    {membership.description}
                  </p>
                </div>

                {/* Footer Status */}
                <div className="pt-5 mt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Status:</span>
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Active Member
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
