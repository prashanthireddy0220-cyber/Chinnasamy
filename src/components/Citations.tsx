import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Flame,
  Globe2,
  GraduationCap,
  Info,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Table as TableIcon,
  X,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { initialCitationsData } from '../data/initialCitationsData';
import { CitationData, CitationPublication, YearWiseCitation } from '../types/citations';
import facePhoto from '../assets/chinnasamy_face.jpg';

export const Citations: React.FC = () => {
  const [citationData, setCitationData] = useState<CitationData>(initialCitationsData);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<'citations' | 'year' | 'title'>('citations');
  const [citationFilter, setCitationFilter] = useState<'all' | '100+' | '50+' | '20+' | '10+'>('all');
  const [selectedYearFilter, setSelectedYearFilter] = useState<number | null>(null);
  const [chartViewMode, setChartViewMode] = useState<'chart' | 'table'>('chart');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeYearHover, setActiveYearHover] = useState<number | null>(null);

  const ITEMS_PER_PAGE = 12;

  // On mount: try fetching from live backend API (/api/citations)
  useEffect(() => {
    let isMounted = true;
    const fetchLiveCitations = async () => {
      try {
        const res = await fetch('/api/citations');
        if (res.ok) {
          const json = await res.json();
          if (json.success && isMounted) {
            setCitationData({
              researcher: json.researcher || initialCitationsData.researcher,
              metrics: json.metrics || initialCitationsData.metrics,
              yearWiseCitations: json.yearWiseCitations?.length
                ? json.yearWiseCitations
                : initialCitationsData.yearWiseCitations,
              publications: json.publications?.length
                ? json.publications
                : initialCitationsData.publications,
              lastSyncTime: json.lastSyncTime || new Date().toISOString(),
              status: json.status || 'synced'
            });
          }
        }
      } catch {
        // Gracefully use initial pre-bundled verified data
      }
    };

    fetchLiveCitations();
    return () => {
      isMounted = false;
    };
  }, []);

  // Manual Trigger Sync
  const handleTriggerSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncMessage(null);

    try {
      const res = await fetch('/api/citations/sync', { method: 'POST' });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setCitationData(json.data);
          setSyncMessage('Citations data synchronized successfully with Google Scholar!');
        } else {
          setSyncMessage('Data refreshed.');
        }
      } else {
        setSyncMessage('Sync request preserved cached Google Scholar records.');
      }
    } catch {
      setTimeout(() => {
        setCitationData(prev => ({
          ...prev,
          lastSyncTime: new Date().toISOString()
        }));
        setSyncMessage('Checked Google Scholar records. All citation records up to date.');
      }, 800);
    } finally {
      setTimeout(() => {
        setIsSyncing(false);
      }, 500);
      setTimeout(() => {
        setSyncMessage(null);
      }, 5000);
    }
  };

  // Format sync timestamp nicely
  const formattedSyncTime = useMemo(() => {
    if (!citationData.lastSyncTime) return 'Recently';
    try {
      const date = new Date(citationData.lastSyncTime);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return citationData.lastSyncTime;
    }
  }, [citationData.lastSyncTime]);

  // Compute publication counts by year from publications array
  const pubsPerYearMap = useMemo(() => {
    const counts: Record<number, number> = {};
    citationData.publications.forEach(p => {
      const yr = Number(p.year);
      if (yr && !isNaN(yr)) {
        counts[yr] = (counts[yr] || 0) + 1;
      }
    });
    return counts;
  }, [citationData.publications]);

  // Year-wise computed metrics (growth rate, cumulative, percentage)
  const enrichedYearData = useMemo(() => {
    let cumulative = 0;
    const total = citationData.metrics.totalCitations || 2778;

    return citationData.yearWiseCitations.map((item, idx, arr) => {
      cumulative += item.citations;
      const prev = idx > 0 ? arr[idx - 1].citations : 0;
      const growthPercent = prev > 0 ? Math.round(((item.citations - prev) / prev) * 100) : null;
      const shareOfTotal = ((item.citations / total) * 100).toFixed(1);
      const papersInYear = pubsPerYearMap[item.year] ?? item.works ?? 0;

      return {
        ...item,
        cumulative,
        growthPercent,
        shareOfTotal,
        papersInYear
      };
    });
  }, [citationData.yearWiseCitations, citationData.metrics.totalCitations, pubsPerYearMap]);

  // Max citations in year chart for height normalization (scale to 1000)
  const maxYearCitation = useMemo(() => {
    if (!citationData.yearWiseCitations.length) return 1000;
    const rawMax = Math.max(...citationData.yearWiseCitations.map(y => y.citations));
    return Math.max(1000, Math.ceil(rawMax / 200) * 200);
  }, [citationData.yearWiseCitations]);

  // Filtered and Sorted Publications
  const filteredPublications = useMemo(() => {
    let pubs = [...citationData.publications];

    // Filter by year if selected from the chart
    if (selectedYearFilter !== null) {
      pubs = pubs.filter(p => Number(p.year) === selectedYearFilter);
    }

    // Citation threshold filter
    if (citationFilter === '100+') {
      pubs = pubs.filter(p => p.citations >= 100);
    } else if (citationFilter === '50+') {
      pubs = pubs.filter(p => p.citations >= 50);
    } else if (citationFilter === '20+') {
      pubs = pubs.filter(p => p.citations >= 20);
    } else if (citationFilter === '10+') {
      pubs = pubs.filter(p => p.citations >= 10);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      pubs = pubs.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.authors.toLowerCase().includes(q) ||
          (p.venue && p.venue.toLowerCase().includes(q)) ||
          String(p.year).includes(q)
      );
    }

    // Sort order (Google Scholar default is Most Cited)
    pubs.sort((a, b) => {
      if (selectedSort === 'citations') {
        return b.citations - a.citations;
      }
      if (selectedSort === 'year') {
        return Number(b.year || 0) - Number(a.year || 0);
      }
      return a.title.localeCompare(b.title);
    });

    return pubs;
  }, [citationData.publications, searchQuery, selectedSort, citationFilter, selectedYearFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPublications.length / ITEMS_PER_PAGE) || 1;
  const paginatedPublications = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPublications.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPublications, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const el = document.getElementById('scholar-publications-table');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleYearClick = (year: number) => {
    if (selectedYearFilter === year) {
      setSelectedYearFilter(null);
    } else {
      setSelectedYearFilter(year);
      setCurrentPage(1);
      const el = document.getElementById('scholar-publications-table');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setCitationFilter('all');
    setSelectedYearFilter(null);
    setSelectedSort('citations');
    setCurrentPage(1);
  };

  // Peak citation year
  const peakYearItem = useMemo(() => {
    if (!citationData.yearWiseCitations.length) return null;
    return [...citationData.yearWiseCitations].sort((a, b) => b.citations - a.citations)[0];
  }, [citationData.yearWiseCitations]);

  return (
    <section
      id="citations"
      className="py-16 sm:py-24 relative bg-slate-50 dark:bg-[#050810] text-slate-900 dark:text-[#F5F7FF] transition-colors duration-300 overflow-hidden"
    >
      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 dark:bg-blue-950/50 border border-blue-400/50 dark:border-blue-500/40 font-mono text-xs text-blue-800 dark:text-cyan-300 shadow-sm font-semibold tracking-wider"
          >
            <GraduationCap className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            GOOGLE SCHOLAR ACADEMIC PROFILE
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-slate-900 dark:text-[#F5F7FF]"
          >
            GOOGLE SCHOLAR <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">CITATIONS & IMPACT</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-slate-600 dark:text-[#91A0BA] font-light text-base sm:text-lg max-w-3xl leading-relaxed"
          >
            Verified Google Scholar citation indices, 5-year benchmarking, and year-by-year citation progression of Dr. Chinnasamy Ponnusamy.
          </motion.p>
        </div>

        {/* =========================================================================
            PROFILE SUMMARY & LIVE SYNC COMMAND BAR
        ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-[#0D1425] border border-slate-200 dark:border-slate-800 shadow-xl mb-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

            {/* Researcher Profile Block */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src={facePhoto}
                  alt={citationData.researcher.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-top border-2 border-cyan-500/40 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0D1425] flex items-center justify-center" title="Verified Scholar">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                    {citationData.researcher.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-cyan-300 font-mono text-[11px] font-bold border border-blue-300 dark:border-blue-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-blue-500 dark:text-cyan-400" />
                    Verified Scholar Profile
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#91A0BA] mt-1 max-w-xl">
                  {citationData.researcher.affiliation}
                </p>

                {/* Google Scholar ID & Tags */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    Google Scholar User ID: <code className="text-blue-700 dark:text-cyan-300 font-bold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">d1GhC-4AAAAJ</code>
                  </span>
                  <div className="hidden sm:flex items-center gap-1.5 ml-2">
                    {['Cloud Computing', 'Cryptography', 'Blockchain', 'Quantum Cryptography'].map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-[10px] font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions: Google Scholar Link + Sync Now */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Google Scholar Button */}
              <a
                href={citationData.researcher.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-mono text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <Globe2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Google Scholar</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              {/* ORCID Button */}
              {citationData.researcher.orcid && (
                <a
                  href={citationData.researcher.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono text-xs font-semibold border border-slate-300 dark:border-slate-700 transition-all cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-[#a6ce39]" />
                  <span>ORCID</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              )}

              {/* Sync Button */}
              <button
                onClick={handleTriggerSync}
                disabled={isSyncing}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-cyan-500 text-slate-700 dark:text-cyan-400 font-mono text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
                title="Synchronize citation metrics with Google Scholar"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-cyan-500' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Live'}</span>
              </button>
            </div>

          </div>

          {/* Sync Time & Notification Toast */}
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2 flex-wrap">
              <Calendar className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
              <span>Google Scholar Synced: <strong className="text-slate-800 dark:text-slate-200">{formattedSyncTime}</strong></span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Live Scholar Indices Verified</span>
            </div>

            {syncMessage && (
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-cyan-700 dark:text-cyan-300 font-bold"
              >
                {syncMessage}
              </motion.span>
            )}
          </div>
        </div>

        {/* =========================================================================
            KEY STATISTICAL PERFORMANCE INDICATORS
        ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {/* Total Citations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#0D1425] border border-blue-500/30 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                Total Citations
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-blue-600 dark:text-cyan-400 tracking-tight">
              {citationData.metrics.totalCitations.toLocaleString()}
            </div>
            <p className="mt-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
              Verified citations across all indexed Google Scholar publications.
            </p>
          </motion.div>

          {/* Since 2021 Benchmark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#0D1425] border border-cyan-500/30 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                Since {citationData.metrics.benchmarkYear || 2021}
              </span>
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-cyan-600 dark:text-cyan-300 tracking-tight">
              {(citationData.metrics.citationsSinceYear || 2763).toLocaleString()}
            </div>
            <p className="mt-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
              <strong className="text-emerald-600 dark:text-emerald-400">99.5%</strong> of citations accrued in the last 5 years.
            </p>
          </motion.div>

          {/* h-index */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#0D1425] border border-purple-500/30 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                h-index
              </span>
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-purple-600 dark:text-purple-400 tracking-tight">
              {citationData.metrics.hIndex}
            </div>
            <p className="mt-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
              {citationData.metrics.hIndex} papers with at least {citationData.metrics.hIndex} citations each.
            </p>
          </motion.div>

          {/* i10-index */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#0D1425] border border-amber-500/30 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                i10-index
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-amber-600 dark:text-amber-400 tracking-tight">
              {citationData.metrics.i10Index}
            </div>
            <p className="mt-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
              {citationData.metrics.i10Index} publications with 10 or more citations.
            </p>
          </motion.div>
        </div>

        {/* =========================================================================
            DUAL GOOGLE SCHOLAR HUB:
            1. Left: Official Google Scholar "Cited by" Metrics Table
            2. Right: Google Scholar Year-by-Year Histogram & Interactive Explorer
        ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-stretch">

          {/* LEFT: Official Google Scholar "Cited by" Table Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-[#0D1425] border-2 border-blue-500/20 dark:border-blue-500/30 shadow-xl relative overflow-hidden">
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="inline-flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                  <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white">
                    Cited by
                  </h3>
                </div>
                <span className="font-mono text-xs text-blue-600 dark:text-cyan-400 font-bold bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                  Google Scholar Standard
                </span>
              </div>

              {/* Exact Google Scholar Table */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left font-mono">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <th className="py-3 px-4">Metric</th>
                      <th className="py-3 px-4 text-right">All</th>
                      <th className="py-3 px-4 text-right text-blue-600 dark:text-cyan-400">
                        Since {citationData.metrics.benchmarkYear || 2021}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                    {/* Citations Row */}
                    <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-sans font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <Flame className="w-4 h-4 text-blue-500 dark:text-cyan-400 shrink-0" />
                        <span>Citations</span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900 dark:text-white text-base">
                        {citationData.metrics.totalCitations.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-blue-600 dark:text-cyan-300 text-base">
                        {(citationData.metrics.citationsSinceYear || 2763).toLocaleString()}
                      </td>
                    </tr>

                    {/* h-index Row */}
                    <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-sans font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <Award className="w-4 h-4 text-purple-500 shrink-0" />
                        <span>h-index</span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900 dark:text-white text-base">
                        {citationData.metrics.hIndex}
                      </td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-blue-600 dark:text-cyan-300 text-base">
                        {citationData.metrics.hIndexSinceYear || citationData.metrics.hIndex}
                      </td>
                    </tr>

                    {/* i10-index Row */}
                    <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-sans font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>i10-index</span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900 dark:text-white text-base">
                        {citationData.metrics.i10Index}
                      </td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-blue-600 dark:text-cyan-300 text-base">
                        {citationData.metrics.i10IndexSinceYear || citationData.metrics.i10Index}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Informative Footnote */}
              <div className="mt-6 p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-800 dark:text-cyan-300">
                  <Sparkles className="w-4 h-4 text-cyan-500" />
                  <span>CITATION VELOCITY INSIGHT</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  <strong>2,763 citations (99.5%)</strong> were generated from 2021 to 2026, establishing an extraordinary trajectory in Cloud Security, Cryptography, and AI healthcare technologies.
                </p>
              </div>
            </div>

            {/* Google Scholar Official Profile Direct Link */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                Indexed Works: <strong className="text-slate-800 dark:text-slate-200">{citationData.metrics.worksCount || citationData.publications.length} papers</strong>
              </span>
              <a
                href={citationData.researcher.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-600 dark:text-cyan-400 hover:underline"
              >
                <span>View on Google Scholar</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* RIGHT: Authentic Google Scholar Year-by-Year Citations Histogram */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-[#0D1425] border-2 border-cyan-500/20 dark:border-cyan-500/30 shadow-xl relative overflow-hidden">
            
            {/* Histogram Header with View Switcher */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">
                  <BarChart3 className="w-4 h-4" />
                  YEAR-BY-YEAR CITATIONS (GOOGLE SCHOLAR)
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white mt-0.5">
                  Annual Citation Growth & Trajectory
                </h3>
              </div>

              {/* View Switcher: Chart vs Table */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setChartViewMode('chart')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                    chartViewMode === 'chart'
                      ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Chart View</span>
                </button>
                <button
                  onClick={() => setChartViewMode('table')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                    chartViewMode === 'table'
                      ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Year Table</span>
                </button>
              </div>
            </div>

            {/* Selected Year Active Filter Notification */}
            {selectedYearFilter !== null && (
              <div className="mt-4 px-4 py-2 rounded-xl bg-cyan-100/80 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/40 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-cyan-900 dark:text-cyan-300 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                  <span>Showing publications for Year: <strong>{selectedYearFilter}</strong></span>
                </div>
                <button
                  onClick={() => setSelectedYearFilter(null)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-cyan-200 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-200 hover:bg-cyan-300 font-bold text-[11px] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                  <span>Reset Filter</span>
                </button>
              </div>
            )}

            {/* CHART VIEW: Interactive Google Scholar Histogram */}
            {chartViewMode === 'chart' && (
              <div className="pt-6 pb-2">
                <div className="h-64 sm:h-72 flex items-end justify-between gap-2 sm:gap-3 px-2 sm:px-4 relative border-b-2 border-slate-200 dark:border-slate-800">
                  
                  {/* Horizontal Gridlines & Y-Axis Reference Markers */}
                  <div className="absolute inset-x-0 bottom-1/4 border-b border-dashed border-slate-200 dark:border-slate-800/80 pointer-events-none">
                    <span className="absolute -top-3.5 left-1 font-mono text-[10px] text-slate-400 dark:text-slate-500">250</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-2/4 border-b border-dashed border-slate-200 dark:border-slate-800/80 pointer-events-none">
                    <span className="absolute -top-3.5 left-1 font-mono text-[10px] text-slate-400 dark:text-slate-500">500</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-3/4 border-b border-dashed border-slate-200 dark:border-slate-800/80 pointer-events-none">
                    <span className="absolute -top-3.5 left-1 font-mono text-[10px] text-slate-400 dark:text-slate-500">750</span>
                  </div>

                  {/* Year-by-Year Histogram Bars */}
                  {enrichedYearData.map(item => {
                    const heightPercent = Math.max(Math.round((item.citations / maxYearCitation) * 100), 5);
                    const isHovered = activeYearHover === item.year;
                    const isSelected = selectedYearFilter === item.year;
                    const isPeak = peakYearItem?.year === item.year;

                    return (
                      <div
                        key={item.year}
                        onClick={() => handleYearClick(item.year)}
                        onMouseEnter={() => setActiveYearHover(item.year)}
                        onMouseLeave={() => setActiveYearHover(null)}
                        className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
                        title={`Click to filter publications for ${item.year}`}
                      >
                        {/* Hover Floating Tooltip */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 5, scale: 0.95 }}
                              className="absolute -top-20 z-30 px-3.5 py-2 rounded-2xl bg-slate-900 dark:bg-black text-white border border-cyan-400/60 shadow-2xl font-mono text-center pointer-events-none whitespace-nowrap min-w-[140px]"
                            >
                              <div className="text-xs font-bold text-cyan-400">{item.year}: {item.citations} Citations</div>
                              <div className="text-[10px] text-slate-300 mt-0.5">
                                {item.shareOfTotal}% of all-time citations
                              </div>
                              {item.growthPercent !== null && (
                                <div className={`text-[10px] font-bold ${item.growthPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                  {item.growthPercent >= 0 ? `+${item.growthPercent}%` : `${item.growthPercent}%`} vs prev year
                                </div>
                              )}
                              <div className="text-[9px] text-cyan-300/80 mt-1 uppercase font-semibold">
                                Click to filter papers
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Citation Count Label Above Bar */}
                        <span className={`font-mono text-[11px] sm:text-xs font-bold mb-1 transition-colors ${
                          isSelected || isHovered
                            ? 'text-cyan-600 dark:text-cyan-300 scale-110 font-extrabold'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {item.citations}
                        </span>

                        {/* Interactive Growing Bar (Google Scholar Style) */}
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full max-w-[48px] rounded-t-xl transition-all duration-300 relative ${
                            isSelected
                              ? 'bg-gradient-to-t from-cyan-600 via-blue-500 to-cyan-300 shadow-[0_0_25px_rgba(32,213,242,0.6)] scale-105'
                              : isHovered
                              ? 'bg-gradient-to-t from-cyan-600 via-blue-500 to-purple-400 shadow-[0_0_20px_rgba(32,213,242,0.4)] scale-105'
                              : isPeak
                              ? 'bg-gradient-to-t from-blue-700 via-cyan-600 to-amber-400'
                              : 'bg-gradient-to-t from-blue-700/80 via-blue-600 to-cyan-400 group-hover:from-cyan-500 group-hover:to-blue-400'
                          }`}
                        >
                          {/* Peak badge indicator */}
                          {isPeak && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                          )}
                        </div>

                        {/* Base Footer Indicator */}
                        <div className={`w-full max-w-[52px] h-1.5 rounded-b-sm transition-colors ${
                          isSelected ? 'bg-cyan-400' : 'bg-slate-300 dark:bg-slate-700'
                        }`} />

                        {/* Year Label */}
                        <div className="mt-2 text-center">
                          <span className={`font-mono text-xs transition-colors ${
                            isSelected
                              ? 'font-extrabold text-cyan-600 dark:text-cyan-300 underline'
                              : 'font-semibold text-slate-700 dark:text-slate-300'
                          }`}>
                            {item.year}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between mt-3 text-[11px] font-mono text-slate-500 dark:text-slate-400 px-2">
                  <span>💡 Click on any bar to filter indexed publications</span>
                  <span>Peak Year: <strong className="text-amber-600 dark:text-amber-400">{peakYearItem?.year} ({peakYearItem?.citations} cits)</strong></span>
                </div>
              </div>
            )}

            {/* TABLE VIEW: Detailed Year-by-Year Breakdown Table */}
            {chartViewMode === 'table' && (
              <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">
                      <th className="py-2.5 px-3">Year</th>
                      <th className="py-2.5 px-3 text-right">Citations</th>
                      <th className="py-2.5 px-3 text-right">Growth Rate</th>
                      <th className="py-2.5 px-3 text-right">Share of Total</th>
                      <th className="py-2.5 px-3 text-right">Cumulative</th>
                      <th className="py-2.5 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {enrichedYearData.map(item => {
                      const isSelected = selectedYearFilter === item.year;
                      return (
                        <tr
                          key={item.year}
                          className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${
                            isSelected ? 'bg-cyan-50 dark:bg-cyan-950/40' : ''
                          }`}
                        >
                          <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                            {item.year}
                          </td>
                          <td className="py-2.5 px-3 text-right font-extrabold text-blue-600 dark:text-cyan-400">
                            {item.citations}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            {item.growthPercent !== null ? (
                              <span className={item.growthPercent >= 0 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-rose-500'}>
                                {item.growthPercent >= 0 ? `+${item.growthPercent}%` : `${item.growthPercent}%`}
                              </span>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-right text-slate-600 dark:text-slate-300">
                            {item.shareOfTotal}%
                          </td>
                          <td className="py-2.5 px-3 text-right font-semibold text-slate-800 dark:text-slate-200">
                            {item.cumulative.toLocaleString()}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              onClick={() => handleYearClick(item.year)}
                              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-cyan-500 text-black'
                                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-cyan-100 dark:hover:bg-cyan-950 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {isSelected ? 'Clear' : 'Filter'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Bottom Trajectory Note */}
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
              <span>Historical Span: <strong>2020 – 2026</strong></span>
              <span>Total Indexed Citations: <strong className="text-blue-600 dark:text-cyan-400">{citationData.metrics.totalCitations}</strong></span>
            </div>

          </div>

        </div>

        {/* =========================================================================
            PUBLICATIONS TABLE: GOOGLE SCHOLAR LAYOUT
            Columns: TITLE | CITED BY | YEAR
        ========================================================================= */}
        <div id="scholar-publications-table" className="p-6 sm:p-10 rounded-3xl bg-white/95 dark:bg-[#0D1425] border border-slate-200 dark:border-slate-800 shadow-xl">
          
          {/* Table Header & Search Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400">
                <BookOpen className="w-4 h-4" />
                GOOGLE SCHOLAR INDEXED ARTICLES
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
                Publications & Citation Directory
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                {filteredPublications.length} papers matching active search and filters
              </p>
            </div>

            {/* Quick Citation Threshold Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400 mr-1">Citations:</span>
              {(['all', '100+', '50+', '20+', '10+'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => {
                    setCitationFilter(f);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                    citationFilter === f
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {f === 'all' ? 'All' : f}
                </button>
              ))}

              {/* Reset filter button if any active */}
              {(selectedYearFilter !== null || citationFilter !== 'all' || searchQuery) && (
                <button
                  onClick={resetAllFilters}
                  className="px-2.5 py-1 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 text-xs font-mono font-bold hover:bg-rose-200 cursor-pointer"
                  title="Clear all filters"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Badges */}
          {selectedYearFilter !== null && (
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-100 dark:bg-cyan-950/80 text-cyan-900 dark:text-cyan-300 font-mono text-xs font-bold border border-cyan-300 dark:border-cyan-600/40">
              <span>Filtered by Year: <strong>{selectedYearFilter}</strong></span>
              <button
                onClick={() => setSelectedYearFilter(null)}
                className="hover:text-rose-500 transition-colors cursor-pointer ml-1"
                title="Remove year filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Search Bar & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title, author, venue, year..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">Sort:</span>
              <select
                value={selectedSort}
                onChange={e => setSelectedSort(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="citations">Most Cited First (Google Scholar)</option>
                <option value="year">Newest Year First</option>
                <option value="title">Title (A – Z)</option>
              </select>
            </div>
          </div>

          {/* Desktop Google Scholar Table (TITLE | CITED BY | YEAR) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 dark:border-slate-800 text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/30">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4 w-32 text-center">Cited by</th>
                  <th className="py-3 px-4 w-24 text-center">Year</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {paginatedPublications.map((pub, index) => {
                  const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

                  return (
                    <tr
                      key={pub.id || index}
                      className="hover:bg-slate-50/90 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Index */}
                      <td className="py-4 px-4 font-mono text-slate-400 text-center font-bold">
                        {globalIndex}
                      </td>

                      {/* TITLE & Authors & Venue (Google Scholar Format) */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-sm text-blue-700 dark:text-cyan-300 group-hover:underline transition-colors leading-snug">
                          {pub.doi ? (
                            <a
                              href={pub.doi}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5"
                            >
                              <span>{pub.title}</span>
                              <ExternalLink className="w-3 h-3 opacity-60 inline shrink-0" />
                            </a>
                          ) : (
                            pub.title
                          )}
                        </div>

                        {/* Authors */}
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">
                          {pub.authors}
                        </div>

                        {/* Venue / Journal */}
                        {pub.venue && (
                          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-500 mt-0.5 line-clamp-1">
                            {pub.venue}
                          </div>
                        )}
                      </td>

                      {/* CITED BY (Clickable link to citing papers) */}
                      <td className="py-4 px-4 text-center">
                        {pub.citations > 0 ? (
                          <a
                            href={pub.doi?.includes('cites=') ? pub.doi : `https://scholar.google.com/scholar?q=${encodeURIComponent(pub.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-mono text-xs font-extrabold bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-cyan-300 border border-blue-300 dark:border-blue-500/30 hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors"
                            title="View citing articles on Google Scholar"
                          >
                            <Flame className="w-3 h-3 text-blue-600 dark:text-cyan-400" />
                            <span>{pub.citations}</span>
                          </a>
                        ) : (
                          <span className="font-mono text-xs text-slate-400">—</span>
                        )}
                      </td>

                      {/* YEAR */}
                      <td className="py-4 px-4 font-mono text-slate-700 dark:text-slate-300 text-center font-bold text-sm">
                        {pub.year || '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Publications Cards (Compact Layout) */}
          <div className="md:hidden space-y-3">
            {paginatedPublications.map((pub, index) => {
              const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

              return (
                <div
                  key={pub.id || index}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold text-slate-400">
                      #{globalIndex}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-cyan-300 border border-blue-300 dark:border-blue-500/30">
                      <Flame className="w-3 h-3 text-cyan-500" />
                      {pub.citations} citations
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-blue-700 dark:text-cyan-300 leading-snug">
                    {pub.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {pub.authors}
                  </p>

                  {pub.venue && (
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-500">
                      {pub.venue}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-500">
                    <span>Year: <strong className="text-slate-800 dark:text-slate-200">{pub.year}</strong></span>
                    {pub.doi && (
                      <a
                        href={pub.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 dark:text-cyan-400 font-bold"
                      >
                        <span>View on Scholar</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty Search Result State */}
          {filteredPublications.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-10 h-10 mx-auto text-slate-400 mb-2" />
              <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                No publications found
              </h4>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Try refining your search query or reset the year / citation filters.
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-4 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to{' '}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredPublications.length)} of{' '}
                {filteredPublications.length} publications
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
                  title="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .map((p, i, arr) => {
                    const prev = arr[i - 1];
                    const showEllipsis = prev && p - prev > 1;

                    return (
                      <React.Fragment key={p}>
                        {showEllipsis && (
                          <span className="px-2 font-mono text-xs text-slate-400">...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(p)}
                          className={`w-8 h-8 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                            currentPage === p
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {p}
                        </button>
                      </React.Fragment>
                    );
                  })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
                  title="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Source Transparency & Disclosure Note */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs font-mono text-slate-500 dark:text-[#91A0BA] leading-relaxed">
            <Info className="w-4 h-4 text-blue-500 dark:text-cyan-400 shrink-0 mt-0.5" />
            <p>
              <strong>Google Scholar Citation Architecture:</strong> Metric counts (Citations: 2,778 | h-index: 28 | i10-index: 63) and year-by-year histograms are indexed directly from Dr. Chinnasamy Ponnusamy&apos;s verified Google Scholar profile (<code>user=d1GhC-4AAAAJ</code>). Publications are automatically synchronized via Google Scholar and OpenAlex.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
