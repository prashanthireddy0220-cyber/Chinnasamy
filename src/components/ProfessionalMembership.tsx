import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, CheckCircle2, Globe, Cpu, Users, ExternalLink, X, Eye, IdCard, Sparkles } from 'lucide-react';
import { professorData } from '../data/professorData';

interface ImageModalState {
  title: string;
  src: string;
}

export const ProfessionalMembership: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ImageModalState | null>(null);

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
                    <div className="w-12 h-12 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md group-hover:scale-105 transition-transform duration-300 flex items-center justify-center overflow-hidden shrink-0">
                      {membership.logo ? (
                        <img
                          src={membership.logo}
                          alt={`${membership.title} logo`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        iconComp
                      )}
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
                    {membership.membershipId && (
                      <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 pt-1">
                        <IdCard className="w-3.5 h-3.5" />
                        Membership ID: {membership.membershipId}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed pt-1">
                    {membership.description}
                  </p>

                  {/* Official Membership Card Link */}
                  {membership.cardImage && (
                    <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3">
                      <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider flex items-center justify-between">
                        <span>Official Credential Card:</span>
                      </div>

                      {/* Clickable Card Link / Button */}
                      <button
                        onClick={() => setActiveModal({
                          title: `Official ${membership.title} Card ${membership.membershipId ? `(ID: ${membership.membershipId})` : ''}`,
                          src: membership.cardImage!
                        })}
                        className="w-full group/card p-3 rounded-2xl bg-gradient-to-r from-blue-50 via-cyan-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-cyan-300/80 dark:border-cyan-500/40 hover:border-cyan-500 text-cyan-900 dark:text-cyan-200 text-xs font-mono font-bold transition-all duration-300 flex items-center justify-between gap-2 shadow-sm hover:shadow-md cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <IdCard className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover/card:scale-110 transition-transform" />
                          <span>View Official {membership.abbreviation} Membership Card</span>
                        </div>
                        <div className="p-1 rounded-lg bg-cyan-200/80 dark:bg-cyan-900/80 text-cyan-800 dark:text-cyan-200">
                          <Eye className="w-3.5 h-3.5" />
                        </div>
                      </button>

                      {/* Certificate Links */}
                      {membership.certificates && membership.certificates.length > 0 && (
                        <div className="pt-2 space-y-1.5">
                          <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold block">
                            Recognized Award Certificates:
                          </span>
                          {membership.certificates.map((cert) => (
                            <button
                              key={cert.title}
                              onClick={() => setActiveModal({
                                title: cert.title,
                                src: cert.image
                              })}
                              className="w-full text-left p-2 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 text-[11px] font-mono text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all flex items-center justify-between gap-2 cursor-pointer"
                            >
                              <span className="truncate">{cert.title}</span>
                              <ExternalLink className="w-3 h-3 shrink-0 text-slate-400" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
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

      {/* Fullscreen Image Preview Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                    <IdCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm sm:text-base text-white truncate max-w-xs sm:max-w-md">
                      {activeModal.title}
                    </h3>
                    <p className="font-mono text-[10px] sm:text-xs text-cyan-400">
                      Verified Membership Credential Document
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activeModal.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-mono flex items-center gap-1.5"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="hidden sm:inline">Open Full Image</span>
                  </a>

                  <button
                    onClick={() => setActiveModal(null)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Image Body */}
              <div className="p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-slate-950/80 min-h-[300px]">
                <img
                  src={activeModal.src}
                  alt={activeModal.title}
                  className="max-h-[70vh] w-auto object-contain rounded-2xl border border-slate-800 shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
