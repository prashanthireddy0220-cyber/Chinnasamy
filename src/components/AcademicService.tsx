import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Calendar, CheckCircle, Eye, ExternalLink, X, Award, Users, Mic, Sparkles } from 'lucide-react';
import { professorData, AcademicServiceItem } from '../data/professorData';

export const AcademicService: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{ title: string; event: string; src: string; role: string } | null>(null);

  const getBadgeClasses = (color?: string) => {
    switch (color) {
      case 'cyan':
        return 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/40';
      case 'amber':
        return 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/40';
      case 'purple':
        return 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-500/40';
      case 'emerald':
        return 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40';
      case 'blue':
      default:
        return 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-500/40';
    }
  };

  const getBorderGlow = (color?: string) => {
    switch (color) {
      case 'cyan':
        return 'hover:border-cyan-400/60 dark:hover:shadow-[0_10px_35px_rgba(6,182,212,0.2)]';
      case 'amber':
        return 'hover:border-amber-400/60 dark:hover:shadow-[0_10px_35px_rgba(245,158,11,0.2)]';
      case 'purple':
        return 'hover:border-purple-400/60 dark:hover:shadow-[0_10px_35px_rgba(168,85,247,0.2)]';
      case 'emerald':
        return 'hover:border-emerald-400/60 dark:hover:shadow-[0_10px_35px_rgba(16,185,129,0.2)]';
      case 'blue':
      default:
        return 'hover:border-blue-400/60 dark:hover:shadow-[0_10px_35px_rgba(59,130,246,0.2)]';
    }
  };

  return (
    <section id="service" className="py-24 relative bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/90 dark:bg-cyan-950/80 border border-cyan-400/50 dark:border-cyan-500/30 font-mono text-xs text-cyan-800 dark:text-cyan-400 shadow-sm font-semibold">
            <Globe className="w-3.5 h-3.5" />
            COMMUNITY & CONFERENCE LEADERSHIP
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight">
            ACADEMIC <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-amber-500 dark:from-blue-400 dark:via-cyan-400 dark:to-amber-400 bg-clip-text text-transparent">SERVICE</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 font-light text-base max-w-2xl">
            Keynote addresses, IEEE conference session chairs, guest of honor appointments, and national innovation jury evaluations.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {professorData.academicService.map((service, idx) => (
            <motion.div
              key={service.id || service.event}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className={`rounded-3xl bg-white/95 dark:bg-[#0D1425] backdrop-blur-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1.5 group ${getBorderGlow(service.badgeColor)}`}
            >
              <div>
                {/* Photo Header (if image exists) */}
                {service.image ? (
                  <div className="relative h-52 w-full overflow-hidden bg-slate-950 cursor-pointer" onClick={() => setSelectedImage({
                    title: service.role,
                    event: service.event,
                    src: service.image!,
                    role: service.badge || service.role
                  })}>
                    <img
                      src={service.image}
                      alt={service.event}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-semibold flex items-center gap-1.5 shadow-md">
                      <Eye className="w-3 h-3 text-cyan-400" />
                      <span>Click to view</span>
                    </div>

                    {service.badge && (
                      <div className="absolute bottom-3 left-3">
                        <span className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold border backdrop-blur-md shadow-md ${getBadgeClasses(service.badgeColor)}`}>
                          {service.badge}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 pb-0 flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold border ${getBadgeClasses(service.badgeColor)}`}>
                      {service.badge || service.role}
                    </span>
                    {service.year && (
                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        {service.year}
                      </span>
                    )}
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6 space-y-3">
                  {service.image && (
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider">
                        {service.role}
                      </span>
                      {service.year && (
                        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                          {service.year}
                        </span>
                      )}
                    </div>
                  )}

                  <h3 className="text-lg font-bold font-sans text-slate-900 dark:text-white leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {service.event}
                  </h3>

                  {service.organization && (
                    <p className="font-mono text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {service.organization}
                    </p>
                  )}

                  {service.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      {service.description}
                    </p>
                  )}

                  {/* Highlights list */}
                  {service.highlights && service.highlights.length > 0 && (
                    <div className="pt-2 space-y-1.5">
                      {service.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                          <CheckCircle className="w-3 h-3 text-cyan-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom action button if photo exists */}
              {service.image && (
                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedImage({
                      title: service.role,
                      event: service.event,
                      src: service.image!,
                      role: service.badge || service.role
                    })}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-mono text-xs font-semibold flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700/60 transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-500" />
                    <span>View Conference Photograph</span>
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>

      {/* Fullscreen Photograph Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm sm:text-base text-white truncate max-w-xs sm:max-w-md">
                      {selectedImage.event}
                    </h3>
                    <p className="font-mono text-[10px] sm:text-xs text-cyan-400">
                      {selectedImage.role} • Official Photograph
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={selectedImage.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-mono flex items-center gap-1.5"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="hidden sm:inline">Open Full Image</span>
                  </a>

                  <button
                    onClick={() => setSelectedImage(null)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Image Body */}
              <div className="p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-slate-950/80 min-h-[300px]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.event}
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
