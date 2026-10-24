import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon,
  Award,
  CreditCard,
  GraduationCap,
  Sparkles,
  Eye,
  ExternalLink,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  CheckCircle2,
  Calendar,
  Building2,
  ShieldCheck,
  Maximize2
} from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  organization: string;
  category: 'awards' | 'memberships' | 'academic';
  categoryLabel: string;
  year: string;
  badge: string;
  badgeColor: 'amber' | 'cyan' | 'emerald' | 'purple' | 'blue';
  image: string;
  credentialId?: string;
  description: string;
  details?: string[];
  isDocument?: boolean;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'csi-cyber-2025',
    title: 'Cybersecurity Innovator of the Year Award',
    organization: 'Computer Society of India (CSI Mumbai Chapter)',
    category: 'awards',
    categoryLabel: 'Awards & Honors',
    year: '2025',
    badge: 'National Cyber Award',
    badgeColor: 'amber',
    image: '/assets/csi_cyber_security_award_2025.png',
    credentialId: 'CSI Cyber FIFC 2025',
    description: 'Conferred at the CSI Cyber FIFC Conference & Cyber Security Awards 2025 in recognition of pioneering research in cryptographic algorithms, access control architectures, and cloud security frameworks.',
    details: [
      'Conferred at CSI Cyber FIFC Conference 2025',
      'Recognized for Innovations in Cybersecurity',
      'Evaluation by National Cyber Advisory Committee'
    ],
    isDocument: true
  },
  {
    id: 'csi-innovative-2024',
    title: 'Innovative Research Award',
    organization: 'Computer Society of India (CSI Hyderabad Chapter)',
    category: 'awards',
    categoryLabel: 'Awards & Honors',
    year: '2024',
    badge: 'State Excellence Award',
    badgeColor: 'amber',
    image: '/assets/csi_innovative_research_award_2024.jpg',
    credentialId: 'CSI Annual Excellence 2024',
    description: 'Awarded at the Computer Society of India Annual Excellence Awards 2024 in Hyderabad for exemplary high-impact research publications, deep learning innovations, and patented technological contributions.',
    details: [
      'CSI Hyderabad Annual Excellence Ceremony',
      'Exemplary Contributions to Computing Research',
      'High-Impact Scopus/SCI Publications & Patents'
    ],
    isDocument: true
  },
  {
    id: 'ieee-membership-card',
    title: 'IEEE Podhigai Subsection Membership Card',
    organization: 'Institute of Electrical and Electronics Engineers (IEEE)',
    category: 'memberships',
    categoryLabel: 'Society Credentials',
    year: '2024–Present',
    badge: 'IEEE Member #94203253',
    badgeColor: 'cyan',
    image: '/assets/ieee_membership_card.jpg',
    credentialId: 'Member # 94203253',
    description: 'Official membership credential card of IEEE Region 10 and IEEE Education Society under the Podhigai Subsection. Fostering global engineering excellence, educational technology, and computing research.',
    details: [
      'IEEE Membership ID: 94203253',
      'Podhigai Subsection • Region 10 (Asia-Pacific)',
      'IEEE Education Society Professional Member'
    ],
    isDocument: true
  },
  {
    id: 'csi-life-member-card',
    title: 'Computer Society of India Life Membership Card',
    organization: 'Computer Society of India (CSI)',
    category: 'memberships',
    categoryLabel: 'Society Credentials',
    year: 'Life Member',
    badge: 'CSI Life ID #702224018',
    badgeColor: 'emerald',
    image: '/assets/csi_membership_card.png',
    credentialId: 'CSI ID: 702224018',
    description: 'Official Life Membership card verifying lifetime affiliation with the Computer Society of India. Actively advancing nationwide computing education, professional mentorship, and technical governance.',
    details: [
      'Official CSI Life Member ID: 702224018',
      'Life Member • Computer Society of India',
      'Active Contributor to National CSI Conventions'
    ],
    isDocument: true
  },
  {
    id: 'stanford-top-scientist',
    title: 'Stanford–Elsevier World Top 2% Scientist',
    organization: 'Stanford University & Elsevier BV',
    category: 'awards',
    categoryLabel: 'Awards & Honors',
    year: '2025',
    badge: 'World Top 2% Scientist',
    badgeColor: 'amber',
    image: '/assets/chinnasamy_avatar.jpg',
    credentialId: 'Stanford AI Global Ranking',
    description: 'Ranked in the prestigious Stanford University World Top 2% Scientists global list (2025) in Artificial Intelligence and Image Processing based on career-long citation impact, standardized h-index, and co-authorship weight.',
    details: [
      'Field: Artificial Intelligence & Image Processing',
      'Published by Stanford University & Elsevier',
      '169+ Indexed Research Publications'
    ],
    isDocument: false
  },
  {
    id: 'kare-academic-leadership',
    title: 'Academic Leadership & Department Direction',
    organization: 'Kalasalingam Academy of Research and Education (KARE)',
    category: 'academic',
    categoryLabel: 'Academic & Leadership',
    year: '2022–Present',
    badge: 'Associate Professor & HoD (i/c)',
    badgeColor: 'blue',
    image: '/assets/chinnasamy_face.jpg',
    credentialId: 'KARE Faculty Leadership',
    description: 'Leading Department of Computer Science & Engineering academic administration, steering NAAC Criteria 3 accreditation, mentoring research scholars, and chairing evaluation committees.',
    details: [
      'Head of Department (In-charge) since 2022',
      'Research Supervisor for Ph.D. Scholars',
      'NAAC Criteria 3 Key Indicators Lead'
    ],
    isDocument: false
  },
  {
    id: 'utar-senior-fellowship',
    title: 'UTAR Senior Research Associate Fellowship',
    organization: 'Universiti Tunku Abdul Rahman (UTAR), Malaysia',
    category: 'academic',
    categoryLabel: 'Academic & Leadership',
    year: '2024–2026',
    badge: 'International Fellowship',
    badgeColor: 'purple',
    image: '/assets/chinnasamy_avatar.jpg',
    credentialId: 'UTAR Malaysia Fellow',
    description: 'Senior Research Associate & International Collaborative Partner at UTAR Malaysia, conducting cross-border research on cloud security architectures, federated AI models, and zero-trust computing.',
    details: [
      'International Research Collaboration (2024–2026)',
      'Joint Publications in High-Impact Journals',
      'Zero-Trust Cloud & Medical AI Architectures'
    ],
    isDocument: false
  },
  {
    id: 'aicte-blockchain-fdp',
    title: 'AICTE Two-Week FDP on Blockchain Convener',
    organization: 'AICTE & Kalasalingam Academy of Research and Education',
    category: 'academic',
    categoryLabel: 'Academic & Leadership',
    year: 'Convener',
    badge: 'AICTE National FDP',
    badgeColor: 'cyan',
    image: '/assets/csi_logo.jpg',
    credentialId: 'AICTE FDP Convener',
    description: 'Convener and coordinator for the two-week AICTE-sponsored Faculty Development Program on Blockchain Technology and Applications, training over 100+ academic faculties and doctoral researchers nationwide.',
    details: [
      'Sponsored by AICTE, Government of India',
      'National Faculty Capacity Building Initiative',
      'Blockchain, Cryptography & Smart Contract Security'
    ],
    isDocument: false
  },
  {
    id: 'toycathon-sih-jury',
    title: 'National Evaluator: Toycathon & Smart India Hackathon',
    organization: 'Ministry of Education Innovation Cell (MIC) & AICTE',
    category: 'academic',
    categoryLabel: 'Academic & Leadership',
    year: '2021–2022',
    badge: 'National Jury Member',
    badgeColor: 'emerald',
    image: '/assets/acm_logo.png',
    credentialId: 'MIC/AICTE Jury',
    description: 'Selected as Primary Evaluator and National Jury Member evaluating cutting-edge innovations, hardware prototypes, and digital solutions by student engineering teams across India.',
    details: [
      'Primary Evaluator for Smart India Hackathon 2022',
      'Toycathon National Evaluator & Reviewer',
      'Evaluated 50+ Prototype Submissions'
    ],
    isDocument: false
  }
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Items', icon: Sparkles },
  { id: 'awards', label: 'Awards & Certificates', icon: Award },
  { id: 'memberships', label: 'Society Credentials', icon: CreditCard },
  { id: 'academic', label: 'Academic & Leadership', icon: GraduationCap },
];

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.year.toLowerCase().includes(q) ||
        (item.credentialId && item.credentialId.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Handle Lightbox Navigation
  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsZoomed(false);
  };

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
    setIsZoomed(false);
  }, []);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setIsZoomed(false);
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredItems.length) % filteredItems.length
        : null
    );
  }, [lightboxIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setIsZoomed(false);
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredItems.length : null
    );
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseLightbox();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleCloseLightbox, handlePrev, handleNext]);

  // Active item in lightbox
  const currentItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const getBadgeStyle = (color: GalleryItem['badgeColor']) => {
    switch (color) {
      case 'amber':
        return 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/40';
      case 'cyan':
        return 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/40';
      case 'emerald':
        return 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40';
      case 'purple':
        return 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-500/40';
      case 'blue':
      default:
        return 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-500/40';
    }
  };

  return (
    <section
      id="gallery"
      className="py-24 relative bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-cyan-500/10 via-amber-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/90 dark:bg-cyan-950/80 border border-cyan-400/50 dark:border-cyan-500/30 font-mono text-xs text-cyan-800 dark:text-cyan-400 shadow-sm font-semibold">
            <ImageIcon className="w-3.5 h-3.5" />
            PHOTO & CREDENTIAL ARCHIVE
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight">
            GALLERY &{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-amber-500 to-purple-600 dark:from-cyan-400 dark:via-amber-400 dark:to-purple-400 bg-clip-text text-transparent">
              CREDENTIAL VAULT
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 font-light text-base max-w-2xl leading-relaxed">
            High-resolution visual archive of national cybersecurity awards,
            verified professional society credentials, international research
            fellowships, and academic leadership milestones.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-white/80 dark:bg-[#0D1425]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 shadow-md">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 w-full lg:w-auto">
            {CATEGORY_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              const count =
                tab.id === 'all'
                  ? GALLERY_ITEMS.length
                  : GALLERY_ITEMS.filter((i) => i.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                      : 'text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-[#121B32]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title, year, or org..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-100 dark:bg-[#050810] border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 font-mono transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 space-y-3 p-8 rounded-3xl bg-white/60 dark:bg-[#0D1425]/60 border border-slate-200 dark:border-slate-800">
            <Search className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold font-sans text-slate-700 dark:text-slate-300">
              No gallery credentials match your search.
            </h3>
            <p className="text-xs font-mono text-slate-500">
              Try searching for &quot;CSI&quot;, &quot;IEEE&quot;, &quot;Award&quot;, or &quot;2025&quot;.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 font-mono text-xs font-bold transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredItems.map((item, idx) => {
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="group rounded-3xl bg-white/95 dark:bg-[#0D1425] border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-400/50 shadow-lg hover:shadow-2xl dark:hover:shadow-[0_15px_40px_rgba(32,213,242,0.15)] transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Card Visual / Image Frame */}
                  <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-100 to-slate-200 dark:from-[#050810] dark:to-[#0A0F1D] overflow-hidden flex items-center justify-center p-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleOpenLightbox(idx)}
                        className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/40 transition-transform active:scale-95 cursor-pointer"
                        title="Inspect Fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>

                      <a
                        href={item.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-white/90 hover:bg-white text-slate-900 transition-transform active:scale-95 shadow-lg"
                        title="Open Image Directly"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span
                        className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold border backdrop-blur-md shadow-sm ${getBadgeStyle(
                          item.badgeColor
                        )}`}
                      >
                        {item.badge}
                      </span>

                      <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md border border-white/10 font-mono text-[10px] font-semibold text-white shadow-sm flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        {item.year}
                      </span>
                    </div>

                    {/* Credential ID pill if present */}
                    {item.credentialId && (
                      <div className="absolute bottom-3 left-3 pointer-events-none">
                        <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 font-mono text-[9px] font-semibold text-cyan-300 shadow-sm flex items-center gap-1">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          {item.credentialId}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-mono">
                        <Building2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span className="truncate">{item.organization}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold font-sans text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {item.categoryLabel}
                      </span>

                      <button
                        onClick={() => handleOpenLightbox(idx)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors cursor-pointer group/btn"
                      >
                        <span>View Details</span>
                        <Eye className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6 overflow-hidden"
          >
            {/* Modal Dialog Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[94vh] rounded-3xl bg-white dark:bg-[#080D1A] border border-slate-200 dark:border-cyan-500/30 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="px-4 sm:px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/80 dark:bg-[#0D1425]/80 backdrop-blur-md">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border ${getBadgeStyle(
                      currentItem.badgeColor
                    )}`}
                  >
                    {currentItem.badge}
                  </span>

                  <h4 className="font-sans font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                    {currentItem.title}
                  </h4>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="p-2 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                    title={isZoomed ? 'Zoom Out' : 'Zoom In'}
                  >
                    {isZoomed ? (
                      <ZoomOut className="w-4 h-4" />
                    ) : (
                      <ZoomIn className="w-4 h-4" />
                    )}
                  </button>

                  <a
                    href={currentItem.image}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                    title="Open Full Image"
                  >
                    <Download className="w-4 h-4" />
                  </a>

                  <button
                    onClick={handleCloseLightbox}
                    className="p-2 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
                    title="Close (Esc)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body: Two columns (Image + Details) on desktop */}
              <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 min-h-0">
                {/* Image Stage */}
                <div className="lg:col-span-7 bg-slate-950 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden min-h-[320px] sm:min-h-[420px]">
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    className={`max-w-full max-h-[60vh] object-contain transition-transform duration-300 ${
                      isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                    }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />

                  {/* Previous Button */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer shadow-lg"
                    title="Previous (Left Arrow)"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer shadow-lg"
                    title="Next (Right Arrow)"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 font-mono text-[10px] text-slate-400 border border-white/10">
                    {lightboxIndex! + 1} / {filteredItems.length}
                  </div>
                </div>

                {/* Metadata Sidebar */}
                <div className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between space-y-6 bg-white dark:bg-[#080D1A] border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold">
                        <Building2 className="w-4 h-4 shrink-0" />
                        <span>{currentItem.organization}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold font-sans text-slate-900 dark:text-white leading-tight">
                        {currentItem.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                          Year: {currentItem.year}
                        </span>
                        {currentItem.credentialId && (
                          <span className="px-2 py-0.5 rounded-md bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 font-semibold border border-cyan-300 dark:border-cyan-500/40">
                            {currentItem.credentialId}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed pt-2 border-t border-slate-200 dark:border-slate-800">
                      {currentItem.description}
                    </p>

                    {/* Bullet Highlights if available */}
                    {currentItem.details && (
                      <div className="space-y-2 pt-2">
                        <h5 className="font-mono text-[11px] font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                          Key Highlights:
                        </h5>
                        <ul className="space-y-1.5">
                          {currentItem.details.map((detail, dIdx) => (
                            <li
                              key={dIdx}
                              className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Actions in Sidebar */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                    <a
                      href={currentItem.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold text-center flex items-center justify-center gap-2 transition-colors shadow-md shadow-cyan-500/30"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open Full Size</span>
                    </a>

                    <button
                      onClick={handleCloseLightbox}
                      className="py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
