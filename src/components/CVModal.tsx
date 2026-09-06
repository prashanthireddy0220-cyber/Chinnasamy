import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, X, CheckCircle2, ExternalLink } from 'lucide-react';
import { professorData } from '../data/professorData';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = professorData.cvUrl;
    link.download = 'Dr_P_Chinnasamy_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#080d1e] border border-slate-200 dark:border-cyan-500/40 p-6 sm:p-8 shadow-2xl dark:shadow-[0_0_50px_rgba(0,240,255,0.25)] space-y-6 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40">
                <FileText className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold font-sans text-slate-900 dark:text-white">
                  CURRICULUM VITAE
                </h3>
                <p className="font-mono text-xs text-cyan-700 dark:text-cyan-400 font-semibold">
                  Dr. P. Chinnasamy • Academic Profile
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 font-mono text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2">
                <span className="text-slate-500">Document:</span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">Chinnasamy.pdf</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2">
                <span className="text-slate-500">Institution:</span>
                <span className="text-cyan-700 dark:text-cyan-300 font-semibold">KARE</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2">
                <span className="text-slate-500">Specialization:</span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">AI, Cybersecurity, Cloud Security</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Format:</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">PDF Document</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleDownload}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md dark:shadow-cyan-500/25"
              >
                <Download className="w-4 h-4" />
                DOWNLOAD CV (PDF)
              </button>

              <a
                href={professorData.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="py-3.5 px-5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-cyan-500/50 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 font-mono text-xs font-semibold text-center flex items-center justify-center gap-2"
              >
                <span>OPEN PDF</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
