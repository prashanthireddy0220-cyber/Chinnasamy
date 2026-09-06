import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Filter, Calendar, Tag, ExternalLink, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { professorData, Publication } from '../data/professorData';

const YEAR_FILTERS = ['All', '2026', '2025', '2024'];
const CATEGORY_FILTERS = ['All', 'AI', 'Machine Learning', 'Cybersecurity', 'Cryptography', 'Cloud Security', 'Blockchain', 'Access Control'];
const TYPE_FILTERS = ['All', 'Journal', 'Conference'];

export const Publications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPublications = useMemo(() => {
    return professorData.publications.filter((pub) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        pub.title.toLowerCase().includes(q) ||
        pub.category.toLowerCase().includes(q) ||
        (pub.venue && pub.venue.toLowerCase().includes(q)) ||
        (pub.abstract && pub.abstract.toLowerCase().includes(q));

      const matchesYear = selectedYear === 'All' || pub.year === selectedYear;
      const matchesCategory = selectedCategory === 'All' || pub.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesType = selectedType === 'All' || pub.type.toLowerCase() === selectedType.toLowerCase();

      return matchesSearch && matchesYear && matchesCategory && matchesType;
    });
  }, [searchTerm, selectedYear, selectedCategory, selectedType]);

  const handleCopyCitation = (pub: Publication) => {
    const citation = `${professorData.name}. "${pub.title}." ${pub.venue || 'IEEE'}, ${pub.year || '2026'}. Indexed in ${pub.indexing || 'IEEE/Scopus'}.`;
    navigator.clipboard.writeText(citation);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="publications" className="py-24 relative bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/90 dark:bg-cyan-950/80 border border-cyan-400/50 dark:border-cyan-500/30 font-mono text-xs text-cyan-800 dark:text-cyan-400 shadow-sm">
            <BookOpen className="w-3.5 h-3.5" />
            SCHOLARLY OUTPUT & PAPERS
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight">
            PUBLICATIONS <span className="bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 bg-clip-text text-transparent">COMMAND CENTER</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 font-light text-base max-w-2xl">
            Explore peer-reviewed journal papers, conference proceedings, and book chapters.
          </p>
        </div>

        {/* Search & Filter Controls Panel */}
        <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-cyan-500/30 shadow-xl mb-10 space-y-6">

          {/* Top Row: Search Box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search research publications by title, keyword, or venue..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 focus:border-cyan-500 dark:focus:border-cyan-400 text-slate-900 dark:text-slate-100 font-sans text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Filter Pills Grid */}
          <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800/80">

            {/* Year Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 mr-2 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Year:
              </span>
              {YEAR_FILTERS.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    selectedYear === y
                      ? 'bg-cyan-600 dark:bg-cyan-500 text-white dark:text-black font-bold shadow-md dark:shadow-cyan-500/20'
                      : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 mr-2 font-semibold">
                <Tag className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Topic:
              </span>
              {CATEGORY_FILTERS.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    selectedCategory === c
                      ? 'bg-purple-600 text-white font-bold shadow-md dark:shadow-purple-500/20'
                      : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-purple-700 dark:hover:text-purple-300 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Type Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 mr-2 font-semibold">
                <Filter className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Type:
              </span>
              {TYPE_FILTERS.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    selectedType === t
                      ? 'bg-blue-600 text-white font-bold shadow-md dark:shadow-blue-500/20'
                      : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

          </div>

          {/* Active Filter Count */}
          <div className="flex items-center justify-between font-mono text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800/80">
            <span>Showing {filteredPublications.length} of {professorData.publications.length} publications</span>
            {(selectedYear !== 'All' || selectedCategory !== 'All' || selectedType !== 'All' || searchTerm) && (
              <button
                onClick={() => {
                  setSelectedYear('All');
                  setSelectedCategory('All');
                  setSelectedType('All');
                  setSearchTerm('');
                }}
                className="text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer font-semibold"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Publication Cards List */}
        {filteredPublications.length > 0 ? (
          <div className="space-y-4">
            {filteredPublications.map((pub, idx) => {
              const isExpanded = expandedId === pub.id;
              const isCopied = copiedId === pub.id;

              return (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="group relative p-6 rounded-3xl bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-400/50 hover:-translate-y-1 transition-all duration-300 shadow-xl dark:hover:shadow-[0_10px_30px_rgba(0,240,255,0.15)]"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">

                    <div className="space-y-2 flex-1">
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2">
                        {pub.year && (
                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 font-mono text-[10px] font-bold">
                            {pub.year}
                          </span>
                        )}

                        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30 font-mono text-[10px] font-semibold">
                          {pub.category}
                        </span>

                        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-500/30 font-mono text-[10px] font-semibold">
                          {pub.type}
                        </span>

                        {pub.indexing && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 font-mono text-[10px] font-semibold">
                            {pub.indexing}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold font-sans text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                        {pub.title}
                      </h3>

                      {/* Venue */}
                      {pub.venue && (
                        <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
                          Venue: <span className="text-slate-800 dark:text-slate-200 font-semibold">{pub.venue}</span>
                        </p>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {pub.link ? (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 hover:bg-cyan-200 dark:hover:bg-cyan-900 border border-cyan-400/50 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300 font-mono text-xs flex items-center gap-1.5 transition-all shadow-sm dark:shadow-[0_0_15px_rgba(0,240,255,0.15)] font-semibold cursor-pointer"
                        >
                          <span>Published Link</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-mono text-xs cursor-not-allowed">
                          Link Unavailable
                        </span>
                      )}

                      <button
                        onClick={() => handleCopyCitation(pub)}
                        title="Copy Citation"
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 hover:border-cyan-400 transition-all cursor-pointer"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : pub.id)}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 font-mono text-xs flex items-center gap-1.5 cursor-pointer font-semibold"
                      >
                        <span>{isExpanded ? 'Less' : 'Details'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                  </div>

                  {/* Expandable Abstract Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-3"
                      >
                        {pub.abstract && (
                          <div className="p-4 rounded-2xl bg-cyan-50/80 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-500/20">
                            <span className="font-mono text-[10px] text-cyan-800 dark:text-cyan-400 uppercase tracking-widest block mb-1 font-semibold">
                              ABSTRACT SUMMARY:
                            </span>
                            <p className="text-xs text-slate-700 dark:text-slate-300 font-light leading-relaxed">
                              {pub.abstract}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
                          <span>Authors: Dr. P. Chinnasamy et al.</span>
                          {pub.link ? (
                            <a
                              href={pub.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 hover:underline font-semibold"
                            >
                              <span>View Paper ({pub.indexing || 'Indexed'})</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-500">Official DOI Pending</span>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono text-sm shadow-md">
            No publications found. Try another search query or reset filters.
          </div>
        )}

      </div>
    </section>
  );
};
