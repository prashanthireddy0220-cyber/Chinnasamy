import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Layers, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw,
  GraduationCap,
  Globe2
} from 'lucide-react';

export interface YearWisePublicationTimelineProps {
  chronologicalYears: string[];
  activeYearIndex: number;
  selectedYear: string | null;
  onSelectYear: (year: string) => void;
  isAllYears: boolean;
  onToggleAllYears: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReplay: () => void;
  onPrevYear: () => void;
  onNextYear: () => void;
  publicationCounts: Record<string, number>;
  maxCount: number;
  totalMatching: number;
  autoPlayProgress: number;
  isCompleted: boolean;
  shouldReduceMotion?: boolean;
}

export const YearWisePublicationTimeline: React.FC<YearWisePublicationTimelineProps> = ({
  chronologicalYears,
  activeYearIndex,
  selectedYear,
  onSelectYear,
  isAllYears,
  onToggleAllYears,
  isPlaying,
  onTogglePlay,
  onReplay,
  onPrevYear,
  onNextYear,
  publicationCounts,
  maxCount,
  totalMatching,
  autoPlayProgress,
  isCompleted,
  shouldReduceMotion = false
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const canGoPrev = activeYearIndex > 0;
  const canGoNext = activeYearIndex < chronologicalYears.length - 1;
  const currentYear = chronologicalYears[activeYearIndex] || chronologicalYears[0];
  const currentYearCount = publicationCounts[currentYear] || 0;

  // Safe normalized step ratio for researcher positioning across steps (0 to 1)
  const stepRatio = chronologicalYears.length > 1 
    ? activeYearIndex / (chronologicalYears.length - 1) 
    : 0;

  return (
    <div className="w-full my-6 sm:my-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative p-3.5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#0D1425] backdrop-blur-2xl border-2 border-cyan-400/30 dark:border-[#20D5F2]/40 shadow-2xl dark:shadow-[0_20px_50px_rgba(5,8,16,0.9)] overflow-hidden"
      >
        {/* =========================================================================
            BACKGROUND INFOGRAPHIC ELEMENTS: WORLD MAP MATRIX & GLOW ORBS
        ========================================================================= */}
        {/* Ambient Gradient Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-36 bg-[#20D5F2]/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-96 h-36 bg-[#A855F7]/10 blur-3xl pointer-events-none rounded-full" />

        {/* Subtle Scientific World Map Grid in Background */}
        <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-15 overflow-hidden">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400" preserveAspectRatio="none">
            <defs>
              <pattern id="scientific-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
                <circle cx="20" cy="20" r="0.75" fill="currentColor" className="text-cyan-400" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#scientific-grid-pattern)" />
            {/* World Continents Dotted Silhouettes */}
            <g fill="currentColor" className="text-cyan-500">
              {/* Americas */}
              <ellipse cx="220" cy="180" rx="90" ry="110" opacity="0.4" />
              {/* Europe & Africa */}
              <ellipse cx="500" cy="160" rx="60" ry="70" opacity="0.4" />
              <ellipse cx="520" cy="250" rx="70" ry="90" opacity="0.4" />
              {/* Asia & India */}
              <ellipse cx="720" cy="160" rx="100" ry="80" opacity="0.5" />
              <circle cx="680" cy="190" r="25" opacity="0.7" />
              {/* Australia */}
              <ellipse cx="840" cy="280" rx="45" ry="35" opacity="0.4" />
            </g>
          </svg>
        </div>

        {/* =========================================================================
            HEADER & ANIMATION PLAYBACK CONTROLS
        ========================================================================= */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 sm:pb-6 mb-4 sm:mb-6 border-b border-slate-200 dark:border-slate-800 gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#20D5F2]/10 border border-[#20D5F2]/30 text-cyan-800 dark:text-[#20D5F2] font-mono text-[10px] sm:text-[11px] font-bold tracking-wider mb-1.5 sm:mb-2">
              <Sparkles className="w-3 h-3 text-[#20D5F2]" />
              CHRONOLOGICAL RESEARCH PROGRESSION (2017 &rarr; 2026)
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-[#F5F7FF] leading-snug">
              YEAR-WISE <span className="bg-gradient-to-r from-[#20D5F2] via-[#4388FF] to-[#A855F7] bg-clip-text text-transparent">RESEARCH TIMELINE</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-[#91A0BA] font-sans mt-1">
              Automatic sequential progression from earliest to latest year. Publications automatically sync below.
            </p>
          </div>

          {/* Animation Playback Controls Panel */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full lg:w-auto justify-between lg:justify-end">
            
            {/* Play / Pause Toggle */}
            <button
              onClick={onTogglePlay}
              title={isPlaying ? 'Pause Automatic Animation' : 'Resume Automatic Animation'}
              className={`px-3 py-1.5 sm:py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                isPlaying
                  ? 'bg-cyan-500/10 border border-[#20D5F2] text-cyan-800 dark:text-[#20D5F2] hover:bg-cyan-500/20 shadow-[0_0_12px_rgba(32,213,242,0.2)]'
                  : 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Resume'}</span>
            </button>

            {/* Replay Sequence Button */}
            <button
              onClick={onReplay}
              title="Restart Chronological Progression from 2017"
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#050810] text-slate-700 dark:text-[#91A0BA] hover:text-[#20D5F2] hover:border-[#20D5F2]/50 font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#20D5F2]" />
              <span>Replay</span>
            </button>

            {/* Prev / Next Year Navigation */}
            <div className="flex items-center gap-1">
              <button
                onClick={onPrevYear}
                disabled={!canGoPrev}
                title="Step to Previous Year (Pauses auto-play)"
                className="px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#050810] text-slate-700 dark:text-[#91A0BA] hover:text-[#20D5F2] hover:border-[#20D5F2]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-mono text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <button
                onClick={onNextYear}
                disabled={!canGoNext}
                title="Step to Next Year (Pauses auto-play)"
                className="px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#050810] text-slate-700 dark:text-[#91A0BA] hover:text-[#20D5F2] hover:border-[#20D5F2]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-mono text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-sm"
              >
                <span className="hidden sm:inline">Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Toggle All Years Stacked Button */}
            <button
              onClick={onToggleAllYears}
              title={isAllYears ? 'Switch to Sequential Timeline Animation' : 'Display All Years Simultaneously'}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                isAllYears
                  ? 'bg-gradient-to-r from-[#20D5F2] via-[#4388FF] to-[#A855F7] text-slate-950 shadow-md shadow-[#20D5F2]/25'
                  : 'bg-slate-100 dark:bg-[#050810] border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-[#91A0BA] hover:text-[#20D5F2] hover:border-[#20D5F2]/40'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isAllYears ? 'All Years Active' : 'Show All Years'}</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            MAIN INFOGRAPHIC: ASCENDING STAIRCASE & GROWING BARS (2017 -> 2026)
        ========================================================================= */}
        <div
          ref={scrollContainerRef}
          className="w-full pb-2 pt-8 overflow-x-auto scrollbar-none sm:scrollbar-thin sm:scrollbar-thumb-cyan-500/20 relative"
        >
          {/* MOVING RESEARCHER AVATAR / CHARACTER WALKING ALONG THE ASCENDING STAIRCASE */}
          {!isAllYears && (
            <motion.div
              className="absolute z-30 pointer-events-none flex flex-col items-center"
              initial={false}
              animate={{
                left: `${stepRatio * 86 + 7}%`,
                bottom: `${14 + activeYearIndex * 4 + 18}px`
              }}
              transition={{
                type: shouldReduceMotion ? 'tween' : 'spring',
                stiffness: 120,
                damping: 17
              }}
            >
              {/* Researcher Badge Pill */}
              <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-slate-950/95 border border-[#20D5F2] text-[9px] sm:text-[10px] font-mono text-[#20D5F2] shadow-xl whitespace-nowrap mb-1 font-bold flex items-center gap-1 animate-pulse">
                <GraduationCap className="w-3 h-3 text-[#20D5F2]" />
                <span>Dr. Chinnasamy ({currentYear})</span>
              </div>

              {/* Stylized Researcher Avatar Token with Walking Bob */}
              <motion.div 
                animate={isPlaying ? { y: [0, -3, 0] } : { y: 0 }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#20D5F2] via-[#4388FF] to-[#A855F7] p-0.5 shadow-[0_0_20px_rgba(32,213,242,0.8)]"
              >
                <div className="w-full h-full rounded-full bg-[#050810] flex items-center justify-center">
                  <span className="text-xs sm:text-sm">👨‍🔬</span>
                </div>
              </motion.div>

              {/* Glowing Footstep Ripple on Stair Step */}
              <div className="w-2.5 h-1 rounded-full bg-[#20D5F2] shadow-[0_0_8px_#20D5F2] mt-0.5 animate-ping" />
            </motion.div>
          )}

          {/* 1. VERTICAL GROWING BARS CONTAINER */}
          <div className="w-full min-w-[340px] h-44 sm:h-52 flex items-end justify-between gap-1 sm:gap-2.5 px-1 sm:px-3 relative border-b-2 border-slate-300 dark:border-slate-800">
            {/* Horizontal Reference Grid Baselines */}
            <div className="absolute inset-x-0 bottom-1/4 border-b border-dashed border-slate-200 dark:border-slate-800/60 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-2/4 border-b border-dashed border-slate-200 dark:border-slate-800/60 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-3/4 border-b border-dashed border-slate-200 dark:border-slate-800/60 pointer-events-none" />

            {chronologicalYears.map((year, idx) => {
              const count = publicationCounts[year] || 0;
              const isSelected = !isAllYears && selectedYear === year;
              const isPastOrCurrent = isAllYears || idx <= activeYearIndex;
              const barHeightPercent = maxCount > 0 ? Math.max(14, (count / maxCount) * 100) : 0;

              return (
                <div
                  key={year}
                  onClick={() => onSelectYear(year)}
                  className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group relative z-10"
                >
                  {/* Publication Count Badge Above Bar */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ 
                      opacity: isPastOrCurrent ? 1 : 0.4,
                      y: 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className={`mb-1 sm:mb-1.5 px-1 sm:px-2 py-0.5 rounded-md sm:rounded-lg font-mono text-[9px] sm:text-xs font-bold text-center transition-all ${
                      isSelected
                        ? 'bg-[#20D5F2] text-slate-950 shadow-lg shadow-[#20D5F2]/40 scale-110 ring-2 ring-[#20D5F2]/50 font-extrabold'
                        : isPastOrCurrent
                        ? 'bg-slate-100 dark:bg-[#050810] text-slate-700 dark:text-[#91A0BA] border border-slate-200 dark:border-slate-800 group-hover:border-[#20D5F2]/50 group-hover:text-[#20D5F2]'
                        : 'bg-slate-100/40 dark:bg-[#050810]/40 text-slate-400 dark:text-slate-600 border border-dashed border-slate-300 dark:border-slate-800/40'
                    }`}
                  >
                    {count}
                  </motion.div>

                  {/* Vertical Animated Bar */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: isPastOrCurrent ? `${barHeightPercent}%` : '8%'
                    }}
                    transition={{ 
                      duration: shouldReduceMotion ? 0.2 : 0.6, 
                      ease: 'easeOut' 
                    }}
                    className={`w-full max-w-[22px] sm:max-w-[50px] rounded-t-md sm:rounded-t-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-end ${
                      isSelected
                        ? 'bg-gradient-to-t from-[#050810] via-[#20D5F2]/40 to-[#20D5F2] border-t-2 border-x-2 border-[#20D5F2] shadow-[0_0_25px_rgba(32,213,242,0.6)]'
                        : isPastOrCurrent
                        ? 'bg-gradient-to-t from-slate-200 dark:from-[#050810] to-[#4388FF]/80 dark:to-[#4388FF]/70 border-t border-x border-slate-300 dark:border-slate-700/60 group-hover:to-[#20D5F2]/80 group-hover:shadow-[0_0_15px_rgba(32,213,242,0.25)]'
                        : 'bg-slate-200/30 dark:bg-slate-900/40 border-t border-x border-dashed border-slate-300/40 dark:border-slate-800/40'
                    }`}
                  >
                    {/* Active Pulsing Beacon Dot */}
                    {isSelected && (
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-ping" />
                    )}
                  </motion.div>

                  {/* Base Stand Platform */}
                  <div
                    className={`w-full max-w-[26px] sm:max-w-[56px] h-1.5 sm:h-2 rounded-b-sm transition-colors ${
                      isSelected ? 'bg-[#20D5F2]' : isPastOrCurrent ? 'bg-slate-400 dark:bg-slate-700' : 'bg-slate-200 dark:bg-slate-800/50'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* 2. THE ASCENDING STAIRCASE TRACK (BELOW THE BARS) */}
          <div className="w-full min-w-[340px] flex items-end justify-between gap-1 sm:gap-2.5 px-1 sm:px-3 pt-1">
            {chronologicalYears.map((year, idx) => {
              const isSelected = !isAllYears && selectedYear === year;
              const isPastOrCurrent = isAllYears || idx <= activeYearIndex;
              // Ascending step height: step 0 (2017) starts at 8px, step 9 (2026) reaches 44px
              const stepHeight = 8 + idx * 4;

              return (
                <div
                  key={`stair-${year}`}
                  onClick={() => onSelectYear(year)}
                  className="flex-1 flex flex-col items-center justify-end cursor-pointer group"
                >
                  {/* Stepped Geometric Block */}
                  <div 
                    style={{ height: `${stepHeight}px` }}
                    className={`w-full rounded-t-sm transition-all duration-300 border-t border-x ${
                      isSelected
                        ? 'bg-gradient-to-t from-[#20D5F2]/30 via-[#20D5F2]/50 to-[#20D5F2] border-[#20D5F2] shadow-[0_0_15px_rgba(32,213,242,0.4)]'
                        : isPastOrCurrent
                        ? 'bg-gradient-to-t from-slate-200 dark:from-[#0D1425] to-[#4388FF]/30 border-slate-300 dark:border-[#4388FF]/30 group-hover:border-[#20D5F2]/40'
                        : 'bg-slate-100/50 dark:bg-[#050810]/40 border-dashed border-slate-200 dark:border-slate-800/40'
                    }`}
                  />

                  {/* Year Label */}
                  <div className="mt-1.5 sm:mt-2 text-center">
                    <span
                      className={`font-mono text-[9px] sm:text-xs font-bold block transition-all ${
                        isSelected
                          ? 'text-[#20D5F2] scale-110 font-extrabold underline decoration-2 underline-offset-2'
                          : isPastOrCurrent
                          ? 'text-slate-700 dark:text-[#91A0BA] group-hover:text-slate-900 dark:group-hover:text-[#F5F7FF]'
                          : 'text-slate-400 dark:text-slate-600'
                      }`}
                    >
                      {year}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            AUTO-PLAY REAL-TIME PROGRESS BAR
        ========================================================================= */}
        <div className="w-full bg-slate-200 dark:bg-slate-800/60 h-1.5 rounded-full overflow-hidden mt-3 sm:mt-4 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-[#20D5F2] via-[#4388FF] to-[#A855F7]"
            style={{
              width: isAllYears ? '100%' : `${autoPlayProgress}%`
            }}
            transition={{ ease: 'linear', duration: 0.1 }}
          />
        </div>

        {/* =========================================================================
            TIMELINE STATUS BAR & INFORMATIVE SUMMARY
        ========================================================================= */}
        <div className="mt-3 pt-2.5 sm:pt-3 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs font-mono text-slate-500 dark:text-[#91A0BA] gap-1.5 sm:gap-2 relative z-10 text-center sm:text-left">
          <div className="flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-[#20D5F2] shrink-0" />
            <span>
              Sequence: <strong className="text-slate-900 dark:text-[#F5F7FF]">{chronologicalYears[0]} &rarr; {chronologicalYears[chronologicalYears.length - 1]}</strong> ({chronologicalYears.length} publication years &bull; {totalMatching} total papers)
            </span>
          </div>

          <div className="text-cyan-800 dark:text-[#20D5F2] font-semibold">
            {isAllYears ? (
              `Displaying all ${totalMatching} publications grouped by year below`
            ) : isCompleted ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                ✓ Timeline complete (2017 &rarr; 2026). Replay or inspect any year.
              </span>
            ) : isPlaying ? (
              `Auto-playing: Year ${currentYear} (${activeYearIndex + 1} of ${chronologicalYears.length}) • ${currentYearCount} publications`
            ) : (
              `Paused on Year ${currentYear} (${currentYearCount} publications) • Click Resume to continue`
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
