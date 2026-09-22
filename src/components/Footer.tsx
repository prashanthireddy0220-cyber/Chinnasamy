import React from 'react';
import { ChevronUp, ExternalLink, Shield, BookOpen, Award, Users, Mail } from 'lucide-react';
import { professorData } from '../data/professorData';
import facePhoto from '../assets/chinnasamy_face.jpg';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 dark:bg-[#03050c] border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 py-16 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Col 1: Bio */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 p-0.5 shadow-md shadow-cyan-500/30 overflow-hidden shrink-0">
                <img
                  src={facePhoto || professorData.faceUrl}
                  alt={professorData.name}
                  className="w-full h-full rounded-full object-cover object-center"
                />
              </div>

              <div>
                <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-slate-100">
                  Dr. P. Chinnasamy
                </h3>
                <p className="font-mono text-xs text-cyan-700 dark:text-cyan-400 font-semibold">
                  Associate Professor • KARE
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 font-light max-w-md leading-relaxed">
              Kalasalingam Academy of Research and Education, Tamil Nadu. Specialist in Artificial Intelligence, Cybersecurity, Cryptography, Cloud Access Control, and Intelligent Systems.
            </p>

            <div className="font-mono text-[11px] text-cyan-700 dark:text-cyan-300 font-semibold">
              AI • Cybersecurity • Cryptography • Cloud Security • Blockchain
            </div>
          </div>

          {/* Col 2: Research Profiles & Socials */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="font-mono text-xs text-slate-900 dark:text-slate-200 font-bold uppercase tracking-widest">
              RESEARCH PROFILES
            </h4>

            <div className="space-y-2 font-mono text-xs">
              <a
                href={professorData.socialLinks.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all cursor-pointer shadow-sm"
              >
                <span>Google Scholar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={professorData.socialLinks.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all cursor-pointer shadow-sm"
              >
                <span>ORCID Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={professorData.socialLinks.scopus}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all cursor-pointer shadow-sm"
              >
                <span>Scopus Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={professorData.socialLinks.webOfScience}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all cursor-pointer shadow-sm"
              >
                <span>Web of Science (WoS)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={professorData.socialLinks.vidwan}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all cursor-pointer shadow-sm"
              >
                <span>Vidwan Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={professorData.socialLinks.researchGate}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all cursor-pointer shadow-sm"
              >
                <span>ResearchGate</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={professorData.socialLinks.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 text-slate-700 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-300 transition-all cursor-pointer shadow-sm"
              >
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Back To Top */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dr. P. Chinnasamy. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 text-cyan-700 dark:text-cyan-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <span>BACK TO TOP</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
