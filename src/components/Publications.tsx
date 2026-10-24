import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Search, 
  BookOpen, 
  Filter, 
  Tag, 
  ExternalLink, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  Sparkles, 
  Layers,
  ArrowLeft,
  ArrowRight,
  Pause,
  Play
} from 'lucide-react';
import { professorData, Publication } from '../data/professorData';
import { YearWisePublicationTimeline } from './YearWisePublicationTimeline';

const TOPIC_FILTERS = [
  'All', 
  'AI', 
  'Machine Learning', 
  'Cybersecurity', 
  'Cryptography', 
  'Cloud Security', 
  'Blockchain', 
  'Healthcare', 
  'IoT', 
  'Deep Learning', 
  'Access Control'
];

const TYPE_FILTERS = ['All', 'Journal', 'Conference', 'Book Chapter'];

const ITEMS_PER_PAGE = 15;
const STEP_DURATION_MS = 3400; // 3.4 seconds per year: sufficient time to read titles, venues and counts
const TICK_INTERVAL_MS = 100;

export const Publications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  
  // DEFAULT VIEW: Automatic sequential progression active by default!
  const [isAllYears, setIsAllYears] = useState<boolean>(false);
  const [activeYearIndex, setActiveYearIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [autoPlayProgress, setAutoPlayProgress] = useState<number>(0);
  const [isHoveredOnCards, setIsHoveredOnCards] = useState<boolean>(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState<boolean>(false);

  // Timeline container ref for in-view detection
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: false, amount: 0.15 });

  // Detect user prefers-reduced-motion accessibility preference
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setShouldReduceMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  // Chronological years (earliest to latest: 2017 -> 2026)
  const chronologicalYears = useMemo(() => {
    const yearsSet = new Set<string>();
    professorData.publications.forEach((p) => {
      if (p.year) yearsSet.add(p.year);
    });
    return Array.from(yearsSet).sort((a, b) => Number(a) - Number(b));
  }, []);

  // Descending years (2026 -> 2017) for All Years stacked mode
  const descendingYears = useMemo(() => {
    return [...chronologicalYears].reverse();
  }, [chronologicalYears]);

  // Active year derived from chronological active index
  const selectedYear = chronologicalYears[activeYearIndex] || chronologicalYears[0] || '2017';

  // Filter publications by Search, Topic, and Type
  const baseFilteredPublications = useMemo(() => {
    return professorData.publications.filter((pub) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        pub.title.toLowerCase().includes(q) ||
        pub.category.toLowerCase().includes(q) ||
        (pub.venue && pub.venue.toLowerCase().includes(q)) ||
        (pub.abstract && pub.abstract.toLowerCase().includes(q)) ||
        (pub.authors && pub.authors.toLowerCase().includes(q));

      const matchesTopic =
        selectedTopic === 'All' ||
        pub.category.toLowerCase() === selectedTopic.toLowerCase();

      const matchesType =
        selectedType === 'All' ||
        pub.type.toLowerCase() === selectedType.toLowerCase();

      return matchesSearch && matchesTopic && matchesType;
    });
  }, [searchTerm, selectedTopic, selectedType]);

  // Year-wise grouped publications map
  const publicationsByYear = useMemo(() => {
    const map: Record<string, Publication[]> = {};
    chronologicalYears.forEach((y) => {
      map[y] = [];
    });

    baseFilteredPublications.forEach((pub) => {
      const y = pub.year || 'Unknown';
      if (!map[y]) map[y] = [];
      map[y].push(pub);
    });

    return map;
  }, [chronologicalYears, baseFilteredPublications]);

  // Publication counts map per year for the timeline bars
  const publicationCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    chronologicalYears.forEach((y) => {
      counts[y] = publicationsByYear[y]?.length || 0;
    });
    return counts;
  }, [chronologicalYears, publicationsByYear]);

  // Highest count in any year for proportional bar scaling
  const maxYearCount = useMemo(() => {
    let max = 0;
    chronologicalYears.forEach((y) => {
      const count = publicationCounts[y] || 0;
      if (count > max) max = count;
    });
    return Math.max(max, 1);
  }, [chronologicalYears, publicationCounts]);

  // =========================================================================
  // AUTOMATIC TIMELINE PROGRESSION ENGINE
  // =========================================================================
  useEffect(() => {
    // Only tick when in viewport, auto-play active, not in All-Years mode, not paused by card hover, not completed
    if (!isInView || !isPlaying || isAllYears || isHoveredOnCards || isCompleted) {
      return;
    }

    const interval = setInterval(() => {
      setAutoPlayProgress((prev) => {
        const next = prev + (TICK_INTERVAL_MS / STEP_DURATION_MS) * 100;
        if (next >= 100) {
          setActiveYearIndex((prevIndex) => {
            if (prevIndex < chronologicalYears.length - 1) {
              return prevIndex + 1;
            } else {
              setIsCompleted(true);
              setIsPlaying(false);
              return prevIndex;
            }
          });
          return 0;
        }
        return next;
      });
    }, TICK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isInView, isPlaying, isAllYears, isHoveredOnCards, isCompleted, chronologicalYears.length]);

  // Publications for current display view
  const currentViewPublications = useMemo(() => {
    if (isAllYears) {
      return baseFilteredPublications;
    }
    return publicationsByYear[selectedYear] || [];
  }, [isAllYears, selectedYear, baseFilteredPublications, publicationsByYear]);

  // Reset page to 1 whenever view filters or year selection changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedYear, isAllYears, searchTerm, selectedTopic, selectedType]);

  const totalPages = Math.max(1, Math.ceil(currentViewPublications.length / ITEMS_PER_PAGE));

  // Sliced publications for pagination in focused year view
  const paginatedPublications = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return currentViewPublications.slice(start, start + ITEMS_PER_PAGE);
  }, [currentViewPublications, currentPage]);

  const handleCopyCitation = (pub: Publication) => {
    const citation = `${pub.authors || professorData.name}. "${pub.title}." ${pub.venue || 'Peer-reviewed venue'}, ${pub.year || '2026'}.${pub.indexing ? ` Indexed in ${pub.indexing}.` : ''}${pub.link ? ` Available: ${pub.link}` : ''}`;
    navigator.clipboard.writeText(citation);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // User manually selects a year bar
  const handleSelectYear = (year: string) => {
    const idx = chronologicalYears.indexOf(year);
    if (idx !== -1) {
      setActiveYearIndex(idx);
      setIsAllYears(false);
      setIsPlaying(false); // Pauses auto-play on manual click so user can read at their own pace
      setAutoPlayProgress(100);
    }
  };

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (isCompleted) {
      setActiveYearIndex(0);
      setIsCompleted(false);
      setIsPlaying(true);
      setAutoPlayProgress(0);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Replay from earliest year (2017)
  const handleReplay = () => {
    setActiveYearIndex(0);
    setIsCompleted(false);
    setIsAllYears(false);
    setIsPlaying(true);
    setAutoPlayProgress(0);
  };

  // Step to previous year
  const handlePrevYear = () => {
    if (activeYearIndex > 0) {
      setActiveYearIndex((prev) => prev - 1);
      setIsAllYears(false);
      setIsPlaying(false);
      setAutoPlayProgress(100);
    }
  };

  // Step to next year
  const handleNextYear = () => {
    if (activeYearIndex < chronologicalYears.length - 1) {
      setActiveYearIndex((prev) => prev + 1);
      setIsAllYears(false);
      setIsPlaying(false);
      setAutoPlayProgress(100);
    }
  };

  // Toggle Show All Years
  const handleToggleAllYears = () => {
    const nextState = !isAllYears;
    setIsAllYears(nextState);
    if (nextState) {
      setIsPlaying(false);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedTopic('All');
    setSelectedType('All');
    setIsAllYears(false);
    setActiveYearIndex(0);
    setIsPlaying(true);
    setIsCompleted(false);
    setAutoPlayProgress(0);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    const element = document.getElementById('year-publications-list');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="publications" className="py-16 sm:py-24 relative bg-slate-50 dark:bg-[#050810] text-slate-900 dark:text-[#F5F7FF] transition-colors duration-300 overflow-hidden">
      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#20D5F2]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 -right-48 w-96 h-96 bg-[#A855F7]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">

        {/* =========================================================================
            1. PUBLICATIONS COMMAND CENTER HEADING & EXTERNAL ACADEMIC PROFILES
        ========================================================================= */}
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#20D5F2]/10 border border-[#20D5F2]/30 font-mono text-[11px] sm:text-xs text-cyan-800 dark:text-[#20D5F2] shadow-sm tracking-wider font-semibold"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#20D5F2]" />
            SCHOLARLY OUTPUT & PAPERS
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-slate-900 dark:text-[#F5F7FF] leading-tight"
          >
            PUBLICATIONS <span className="bg-gradient-to-r from-[#20D5F2] via-[#4388FF] to-[#A855F7] bg-clip-text text-transparent">COMMAND CENTER</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-slate-600 dark:text-[#91A0BA] font-light text-sm sm:text-lg max-w-2xl px-2"
          >
            Explore peer-reviewed journal papers, conference proceedings, and book chapters.
          </motion.p>

          {/* Academic Profile Direct Links */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-1 sm:pt-2 font-mono text-[11px] sm:text-xs"
          >
            <a
              href={professorData.socialLinks.scopus}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-amber-50 dark:bg-[#0D1425] border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 hover:border-amber-500 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all shadow-sm"
            >
              <span>Scopus</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={professorData.socialLinks.webOfScience}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-purple-50 dark:bg-[#0D1425] border border-purple-300 dark:border-purple-500/30 text-purple-800 dark:text-purple-300 hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all shadow-sm"
            >
              <span>Web of Science</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={professorData.socialLinks.vidwan}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-emerald-50 dark:bg-[#0D1425] border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all shadow-sm"
            >
              <span>Vidwan</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={professorData.socialLinks.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-cyan-50 dark:bg-[#0D1425] border border-cyan-300 dark:border-[#20D5F2]/40 text-cyan-800 dark:text-[#20D5F2] hover:border-[#20D5F2] hover:shadow-[0_0_15px_rgba(32,213,242,0.25)] transition-all shadow-sm"
            >
              <span>Google Scholar</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={professorData.socialLinks.orcid}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-lime-50 dark:bg-[#0D1425] border border-lime-300 dark:border-lime-500/30 text-lime-800 dark:text-lime-300 hover:border-lime-500 hover:shadow-[0_0_15px_rgba(132,204,22,0.2)] transition-all shadow-sm"
            >
              <span>ORCID</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={professorData.socialLinks.researchGate}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-blue-50 dark:bg-[#0D1425] border border-blue-300 dark:border-[#4388FF]/40 text-blue-800 dark:text-[#4388FF] hover:border-[#4388FF] hover:shadow-[0_0_15px_rgba(67,136,255,0.25)] transition-all shadow-sm"
            >
              <span>ResearchGate</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        </div>

        {/* =========================================================================
            2. SEARCH & FILTER CONTROLS PANEL
        ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#0D1425] backdrop-blur-xl border border-slate-200 dark:border-[#20D5F2]/25 shadow-xl mb-6 space-y-4 sm:space-y-5"
        >
          {/* Search Field */}
          <div className="relative">
            <Search className="absolute left-3.5 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-cyan-600 dark:text-[#20D5F2]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, author, keyword, or venue..."
              className="w-full pl-10 sm:pl-12 pr-14 sm:pr-16 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#050810] border border-slate-300 dark:border-slate-800 focus:border-cyan-500 dark:focus:border-[#20D5F2] text-slate-900 dark:text-[#F5F7FF] font-sans text-xs sm:text-base placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#20D5F2]/20 transition-all shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-[10px] sm:text-xs font-mono text-slate-500 dark:text-[#91A0BA] hover:text-slate-900 dark:hover:text-[#20D5F2] cursor-pointer font-bold px-2 py-1 rounded-md bg-slate-200 dark:bg-[#0D1425]"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Filter Rows: Topic & Type */}
          <div className="space-y-3 pt-1 border-t border-slate-200 dark:border-slate-800/80">
            {/* Topic Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
              <span className="font-mono text-xs text-slate-600 dark:text-[#91A0BA] flex items-center gap-1.5 font-semibold shrink-0">
                <Tag className="w-3.5 h-3.5 text-[#A855F7]" /> Topic:
              </span>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {TOPIC_FILTERS.map((c) => {
                  const isActive = selectedTopic === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setSelectedTopic(c)}
                      className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#A855F7] text-white font-bold shadow-md shadow-[#A855F7]/25 border border-[#A855F7]'
                          : 'bg-slate-100 dark:bg-[#050810] text-slate-600 dark:text-[#91A0BA] hover:text-[#A855F7] border border-slate-200 dark:border-slate-800/80 hover:border-[#A855F7]/40'
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
              <span className="font-mono text-xs text-slate-600 dark:text-[#91A0BA] flex items-center gap-1.5 font-semibold shrink-0">
                <Filter className="w-3.5 h-3.5 text-[#4388FF]" /> Type:
              </span>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {TYPE_FILTERS.map((t) => {
                  const isActive = selectedType === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setSelectedType(t)}
                      className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#4388FF] text-white font-bold shadow-md shadow-[#4388FF]/25 border border-[#4388FF]'
                          : 'bg-slate-100 dark:bg-[#050810] text-slate-600 dark:text-[#91A0BA] hover:text-[#4388FF] border border-slate-200 dark:border-slate-800/80 hover:border-[#4388FF]/40'
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Filter Status & Reset */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 font-mono text-[11px] sm:text-xs text-slate-500 dark:text-[#91A0BA] pt-2 border-t border-slate-200 dark:border-slate-800/80 text-center sm:text-left">
            <span>
              Matching publications: <strong className="text-[#20D5F2]">{baseFilteredPublications.length}</strong> of {professorData.publications.length} papers in dataset
            </span>
            {(selectedTopic !== 'All' || selectedType !== 'All' || searchTerm || isAllYears) && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-cyan-700 dark:text-[#20D5F2] hover:underline cursor-pointer font-semibold py-1 px-2.5 rounded-lg bg-cyan-50 dark:bg-[#050810] border border-cyan-200 dark:border-[#20D5F2]/30"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters & Restart Timeline</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* =========================================================================
            3. YEAR-WISE RESEARCH PUBLICATIONS TIMELINE COMPONENT
        ========================================================================= */}
        <div ref={timelineRef}>
          <YearWisePublicationTimeline
            chronologicalYears={chronologicalYears}
            activeYearIndex={activeYearIndex}
            selectedYear={selectedYear}
            onSelectYear={handleSelectYear}
            isAllYears={isAllYears}
            onToggleAllYears={handleToggleAllYears}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            onReplay={handleReplay}
            onPrevYear={handlePrevYear}
            onNextYear={handleNextYear}
            publicationCounts={publicationCounts}
            maxCount={maxYearCount}
            totalMatching={baseFilteredPublications.length}
            autoPlayProgress={autoPlayProgress}
            isCompleted={isCompleted}
            shouldReduceMotion={shouldReduceMotion}
          />
        </div>

        {/* =========================================================================
            4. PUBLICATIONS LIST: AUTOMATICALLY ADVANCING WITH TIMELINE
        ========================================================================= */}
        <div id="year-publications-list" className="space-y-6 sm:space-y-8 mt-6 sm:mt-8">

          {/* MODE 1: SEQUENTIAL PROGRESSIVE YEAR VIEW (DEFAULT AUTOMATIC VIEW) */}
          {!isAllYears && selectedYear && (
            <div 
              onMouseEnter={() => setIsHoveredOnCards(true)}
              onMouseLeave={() => setIsHoveredOnCards(false)}
              className="space-y-4 sm:space-y-6"
            >
              {/* Year Heading & Navigation Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-slate-200 dark:border-slate-800 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-[#20D5F2] to-[#4388FF] text-slate-950 font-mono text-sm sm:text-base font-extrabold shadow-lg shadow-[#20D5F2]/25">
                      {selectedYear}
                    </span>
                    <h3 className="text-xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-[#F5F7FF]">
                      <span className="bg-gradient-to-r from-[#20D5F2] via-[#4388FF] to-[#A855F7] bg-clip-text text-transparent">
                        {currentViewPublications.length} {currentViewPublications.length === 1 ? 'Publication' : 'Publications'}
                      </span>
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-[#91A0BA] font-mono mt-1.5">
                    <span>Year {activeYearIndex + 1} of {chronologicalYears.length} in chronological sequence</span>
                    {isHoveredOnCards && (
                      <span className="inline-flex items-center gap-1 text-cyan-600 dark:text-[#20D5F2] bg-cyan-50 dark:bg-cyan-950/40 px-2 py-0.5 rounded-md border border-cyan-300 dark:border-cyan-800 text-[11px] font-bold">
                        <Pause className="w-3 h-3" /> Paused for reading
                      </span>
                    )}
                  </div>
                </div>

                {/* Return to All Years and Prev/Next Controls */}
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <button
                    onClick={handleTogglePlay}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0D1425] text-slate-700 dark:text-[#91A0BA] hover:text-[#20D5F2] hover:border-[#20D5F2]/50 font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm text-xs"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? 'Pause' : 'Resume'}</span>
                  </button>

                  <button
                    onClick={handleToggleAllYears}
                    className="px-3 py-1.5 rounded-xl bg-[#20D5F2]/10 border border-[#20D5F2]/40 text-cyan-800 dark:text-[#20D5F2] hover:bg-[#20D5F2]/20 font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm text-xs"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>View All Years &rarr;</span>
                  </button>
                </div>
              </div>

              {/* Animated Publication Cards Grid for Current Animated Year */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedYear}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: shouldReduceMotion ? 0.15 : 0.35 }}
                  className="space-y-3 sm:space-y-4"
                >
                  {paginatedPublications.length > 0 ? (
                    paginatedPublications.map((pub, idx) => (
                      <PublicationCardItem
                        key={pub.id}
                        pub={pub}
                        idx={idx}
                        expandedId={expandedId}
                        copiedId={copiedId}
                        onToggleExpand={(id) => setExpandedId(expandedId === id ? null : id)}
                        onCopyCitation={handleCopyCitation}
                      />
                    ))
                  ) : (
                    <div className="p-8 sm:p-12 text-center rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-[#0D1425] border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-[#91A0BA] font-mono text-xs sm:text-sm space-y-2">
                      <p className="font-semibold text-slate-700 dark:text-slate-300">
                        No publications matching current filters in {selectedYear}.
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="text-xs text-[#20D5F2] hover:underline cursor-pointer font-bold"
                      >
                        Reset filters to view all papers &rarr;
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Pagination Controls if active year has more than ITEMS_PER_PAGE (e.g. 2025 has 47) */}
              {totalPages > 1 && (
                <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-mono text-xs">
                  <span className="text-slate-500 dark:text-[#91A0BA]">
                    Page <strong className="text-slate-900 dark:text-[#F5F7FF]">{currentPage}</strong> of <strong className="text-[#20D5F2]">{totalPages}</strong> ({currentViewPublications.length} papers in {selectedYear})
                  </span>

                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0D1425] text-slate-700 dark:text-[#F5F7FF] hover:border-[#20D5F2] hover:text-[#20D5F2] disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold"
                    >
                      &larr; Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => handlePageChange(p)}
                        className={`w-7 sm:w-8 h-7 sm:h-8 rounded-lg sm:rounded-xl font-mono text-xs transition-all cursor-pointer font-bold ${
                          p === currentPage
                            ? 'bg-[#20D5F2] text-slate-950 shadow-md shadow-[#20D5F2]/25'
                            : 'bg-white dark:bg-[#0D1425] border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-[#91A0BA] hover:text-[#20D5F2]'
                        }`}
                      >
                        {p}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0D1425] text-slate-700 dark:text-[#F5F7FF] hover:border-[#20D5F2] hover:text-[#20D5F2] disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold"
                    >
                      Next &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODE 2: ALL YEARS GROUPED STACKED VIEW (WHEN USER CLICKS "SHOW ALL YEARS") */}
          {isAllYears && (
            <div className="space-y-8 sm:space-y-12">
              {baseFilteredPublications.length === 0 ? (
                <div className="p-8 sm:p-12 text-center rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-[#0D1425] border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-[#91A0BA] font-mono text-xs sm:text-sm space-y-2">
                  <p className="font-semibold text-slate-700 dark:text-slate-300">
                    No publications matching your current search or filters.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-[#20D5F2] hover:underline cursor-pointer font-bold"
                  >
                    Reset filters to view all research papers &rarr;
                  </button>
                </div>
              ) : (
                descendingYears.map((year) => {
                  const yearPubs = publicationsByYear[year] || [];
                  if (yearPubs.length === 0) return null;

                  return (
                    <div key={year} className="space-y-3 sm:space-y-4">
                      {/* Section Heading: "[Year] — [Count] Publications" */}
                      <div className="sticky top-14 sm:top-16 z-20 py-2.5 sm:py-3 px-3.5 sm:px-6 rounded-xl sm:rounded-2xl bg-white/95 dark:bg-[#0D1425]/95 backdrop-blur-xl border border-slate-200 dark:border-[#20D5F2]/35 shadow-lg flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                          <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg sm:rounded-xl bg-[#20D5F2] text-slate-950 font-mono text-xs sm:text-sm font-bold shadow-sm shrink-0">
                            {year}
                          </span>
                          <h3 className="font-display font-extrabold text-sm sm:text-xl text-slate-900 dark:text-[#F5F7FF] truncate">
                            <span className="bg-gradient-to-r from-[#20D5F2] to-[#4388FF] bg-clip-text text-transparent">
                              {yearPubs.length} {yearPubs.length === 1 ? 'Publication' : 'Publications'}
                            </span>
                          </h3>
                        </div>

                        <button
                          onClick={() => handleSelectYear(year)}
                          title={`Focus on ${year} only`}
                          className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#050810] text-slate-700 dark:text-[#91A0BA] hover:text-[#20D5F2] hover:border-[#20D5F2]/50 font-mono text-[10px] sm:text-xs font-semibold shrink-0 cursor-pointer transition-all shadow-sm"
                        >
                          Focus {year} &rarr;
                        </button>
                      </div>

                      {/* Publication Cards for this Year */}
                      <div className="space-y-3 sm:space-y-4 pt-1">
                        {yearPubs.map((pub, idx) => (
                          <PublicationCardItem
                            key={pub.id}
                            pub={pub}
                            idx={idx}
                            expandedId={expandedId}
                            copiedId={copiedId}
                            onToggleExpand={(id) => setExpandedId(expandedId === id ? null : id)}
                            onCopyCitation={handleCopyCitation}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

// =========================================================================
// REUSABLE PUBLICATION CARD ITEM COMPONENT
// =========================================================================
interface PublicationCardItemProps {
  pub: Publication;
  idx: number;
  expandedId: string | null;
  copiedId: string | null;
  onToggleExpand: (id: string) => void;
  onCopyCitation: (pub: Publication) => void;
}

const PublicationCardItem: React.FC<PublicationCardItemProps> = ({
  pub,
  idx,
  expandedId,
  copiedId,
  onToggleExpand,
  onCopyCitation
}) => {
  const isExpanded = expandedId === pub.id;
  const isCopied = copiedId === pub.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(idx * 0.02, 0.2) }}
      className="group relative p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#0D1425] backdrop-blur-xl border border-slate-200 dark:border-slate-800/90 hover:border-[#20D5F2]/50 hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-300 shadow-xl dark:shadow-[0_4px_25px_rgba(5,8,16,0.5)] dark:hover:shadow-[0_10px_35px_rgba(32,213,242,0.12)]"
    >
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 sm:gap-5">
        <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
          
          {/* Badges: Year, Topic, Type, and Verified Indexing */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {pub.year && (
              <span className="px-2 sm:px-2.5 py-0.5 rounded-md sm:rounded-full bg-cyan-100 dark:bg-[#050810] text-cyan-800 dark:text-[#20D5F2] border border-cyan-300 dark:border-[#20D5F2]/40 font-mono text-[10px] sm:text-[11px] font-bold">
                {pub.year}
              </span>
            )}

            <span className="px-2 sm:px-2.5 py-0.5 rounded-md sm:rounded-full bg-purple-100 dark:bg-[#050810] text-purple-800 dark:text-[#A855F7] border border-purple-300 dark:border-[#A855F7]/40 font-mono text-[10px] sm:text-[11px] font-semibold">
              {pub.category}
            </span>

            <span className="px-2 sm:px-2.5 py-0.5 rounded-md sm:rounded-full bg-blue-100 dark:bg-[#050810] text-blue-800 dark:text-[#4388FF] border border-blue-300 dark:border-[#4388FF]/40 font-mono text-[10px] sm:text-[11px] font-semibold">
              {pub.type}
            </span>

            {pub.indexing && (
              <span className="px-2 sm:px-2.5 py-0.5 rounded-md sm:rounded-full bg-emerald-100 dark:bg-[#050810] text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30 font-mono text-[10px] sm:text-[11px] font-semibold">
                {pub.indexing}
              </span>
            )}
          </div>

          {/* Publication Title */}
          <h4 className="text-base sm:text-xl font-bold font-display text-slate-900 dark:text-[#F5F7FF] group-hover:text-cyan-700 dark:group-hover:text-[#20D5F2] transition-colors leading-snug">
            {pub.title}
          </h4>

          {/* Authors */}
          <p className="font-sans text-xs sm:text-sm text-slate-700 dark:text-[#91A0BA] leading-relaxed">
            <span className="font-semibold text-slate-800 dark:text-slate-300">Authors:</span> {pub.authors || professorData.name}
          </p>

          {/* Venue */}
          {pub.venue && (
            <p className="font-mono text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
              <span className="text-slate-500">Venue:</span> <span className="text-slate-800 dark:text-slate-200 font-semibold">{pub.venue}</span>
            </p>
          )}
        </div>

        {/* Action Buttons: Published Link, Copy Citation, Details */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 shrink-0 pt-2 sm:pt-0">
          {pub.link ? (
            <a
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl bg-cyan-100 dark:bg-[#20D5F2]/10 hover:bg-cyan-200 dark:hover:bg-[#20D5F2]/20 border border-cyan-400/50 dark:border-[#20D5F2]/40 text-cyan-800 dark:text-[#20D5F2] font-mono text-[11px] sm:text-xs flex items-center gap-1 sm:gap-1.5 transition-all shadow-sm font-semibold cursor-pointer"
            >
              <span>Published Link</span>
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </a>
          ) : (
            <span className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-[#050810] border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-mono text-[11px] sm:text-xs cursor-not-allowed">
              Link Unavailable
            </span>
          )}

          <button
            onClick={() => onCopyCitation(pub)}
            title="Copy Publication Citation"
            className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-[#050810] border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-[#91A0BA] hover:text-[#20D5F2] hover:border-[#20D5F2]/50 transition-all cursor-pointer"
            aria-label="Copy Citation"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>

          <button
            onClick={() => onToggleExpand(pub.id)}
            className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-[#050810] border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-[#91A0BA] hover:text-[#20D5F2] hover:border-[#20D5F2]/50 font-mono text-[11px] sm:text-xs flex items-center gap-1 sm:gap-1.5 cursor-pointer font-semibold transition-all"
          >
            <span>{isExpanded ? 'Less' : 'Details'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Details Accordion */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2.5 sm:space-y-3"
          >
            {pub.abstract && (
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-cyan-50/80 dark:bg-[#050810] border border-cyan-200 dark:border-[#20D5F2]/25">
                <span className="font-mono text-[10px] text-cyan-800 dark:text-[#20D5F2] uppercase tracking-widest block mb-1 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#20D5F2]" /> ABSTRACT / DESCRIPTION:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-[#F5F7FF] font-light leading-relaxed">
                  {pub.abstract}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-slate-600 dark:text-[#91A0BA] pt-1">
              <span>Verified Citation: {pub.indexing || 'Peer-Reviewed Research Paper'}</span>
              {pub.link && (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-cyan-700 dark:text-[#20D5F2] hover:underline font-semibold"
                >
                  <span>Direct Venue Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
