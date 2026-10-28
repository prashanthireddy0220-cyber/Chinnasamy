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
  Maximize2,
  Layers,
  MapPin,
  Clock,
  Camera
} from 'lucide-react';

export interface EventPhoto {
  url: string;
  title: string;
  caption: string;
  time?: string;
  location?: string;
  type?: string;
}

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
  images?: EventPhoto[];
  credentialId?: string;
  description: string;
  details?: string[];
  isDocument?: boolean;
  eventSeries?: string;
  eventVenue?: string;
}

// 4 Photos belonging to the same Francis Xavier Engineering College Event
const FXEC_WORKSHOP_PHOTOS: EventPhoto[] = [
  {
    url: '/assets/fxec_workshop_memento_presentation_2026.png',
    title: 'Resource Person Felicitation & Memento Presentation',
    caption: 'Dr. P. Chinnasamy receiving ceremonial memento plaque & honor on stage from Department of AI & DS leadership and dignitaries.',
    time: 'Thursday, 12/02/2026 10:26 AM GMT+05:30',
    location: 'APJ Auditorium, Francis Xavier Engineering College, Vannarpettai, Tirunelveli',
    type: 'Honor & Felicitation'
  },
  {
    url: '/assets/fxec_workshop_keynote_speech_2026.png',
    title: 'Workshop Keynote Address on Research Paper Writing',
    caption: 'Delivering keynote lecture on "Think – Write – Publish" to faculty members, research scholars, and students at APJ Auditorium.',
    time: 'Thursday, 12/02/2026 11:11 AM GMT+05:30',
    location: 'APJ Auditorium, Francis Xavier Engineering College, Tirunelveli',
    type: 'Keynote Lecture'
  },
  {
    url: '/assets/fxec_workshop_technical_session_2026.jpg',
    title: 'Scholarly Publication & Methodology Technical Session',
    caption: 'Conducting in-depth deliberation on "Doing Research and Performing an Experiment vs Writing a Good Research Paper".',
    time: 'Thursday, 12/02/2026 11:11 AM GMT+05:30',
    location: 'APJ Auditorium, Francis Xavier Engineering College, Tirunelveli',
    type: 'Technical Deliberation'
  },
  {
    url: '/assets/fxec_research_paper_workshop_poster_2026.jpg',
    title: 'Official Workshop Poster: Think – Write – Publish',
    caption: 'Official Event Poster & Brochure for the State-Level Research Paper Writing Workshop organized by Dept. of AI & DS.',
    time: 'Thursday, February 12th, 2026 (9:00 AM – 4:00 PM)',
    location: 'Francis Xavier Engineering College (Autonomous), Vannarpettai, Tirunelveli',
    type: 'Official Event Brochure'
  }
];

const GALLERY_ITEMS: GalleryItem[] = [
  // 1. MASTER EVENT ALBUM (Contains all 4 photos together in the same event item)
  {
    id: 'fxec-research-workshop-2026-album',
    title: 'Research Paper Writing Workshop: Think – Write – Publish',
    organization: 'Francis Xavier Engineering College (Autonomous), Tirunelveli',
    category: 'academic',
    categoryLabel: 'Academic & Leadership',
    year: 'Feb 12, 2026',
    badge: 'Same Event • 4 Photos',
    badgeColor: 'cyan',
    image: '/assets/fxec_workshop_memento_presentation_2026.png',
    images: FXEC_WORKSHOP_PHOTOS,
    credentialId: 'FXEC Keynote Resource Person',
    description: 'Invited as Chief Resource Person and Keynote Speaker for the state-level workshop on "Research Paper Writing: Think - Write - Publish" organized by the Department of Artificial Intelligence & Data Science (AI & DS) at Francis Xavier Engineering College (Autonomous), Tirunelveli. Conducted comprehensive technical sessions on experimental methodology, manuscript composition, Scopus/SCI indexing, and peer-review navigation for faculties and research scholars.',
    details: [
      'Chief Resource Person: Dr. P. Chinnasamy (Associate Professor - KARE, World Top 2% Scientist)',
      'Host: Department of Artificial Intelligence & Data Science (AI & DS), FXEC',
      'Venue: APJ Auditorium, Francis Xavier Engineering College, Vannarpettai, Tirunelveli, Tamil Nadu',
      'Date & Time: Thursday, February 12, 2026 (9:00 AM – 4:00 PM)',
      'Convenor: Dr. A. Jainul Fathima (HoD / AI&DS) • Coordinator: Mrs. S. Anitha (AP / AI&DS)',
      'GPS Verified: Lat 8.732093, Long 77.723530 • Barani Nagar, Tirunelveli',
      'Complete 4-Photo Collection: Felicitation Memento, Keynote Lecture, Technical Session, and Official Poster'
    ],
    isDocument: false,
    eventSeries: 'fxec-workshop-2026',
    eventVenue: 'APJ Auditorium, Francis Xavier Engineering College, Tirunelveli'
  },

  // 2. MEMENTO PRESENTATION PHOTO (Award & Felicitation)
  {
    id: 'fxec-workshop-2026-memento',
    title: 'Keynote Resource Person Felicitation & Memento Presentation',
    organization: 'Francis Xavier Engineering College (Autonomous), Tirunelveli',
    category: 'awards',
    categoryLabel: 'Awards & Honors',
    year: 'Feb 12, 2026',
    badge: 'Memento & Honor',
    badgeColor: 'amber',
    image: '/assets/fxec_workshop_memento_presentation_2026.png',
    images: FXEC_WORKSHOP_PHOTOS,
    credentialId: 'FXEC Event Memento #2026',
    description: 'Conferred ceremonial memento plaque and honored on dais by the Department of Artificial Intelligence and Data Science (AI & DS) leadership at Francis Xavier Engineering College for outstanding contribution as Keynote Speaker and Resource Person.',
    details: [
      'Conferred on stage at APJ Auditorium, Francis Xavier Engineering College',
      'Presented by Department Head and Faculty Leadership',
      'Event: Research Paper Writing Workshop (Think – Write – Publish)',
      'GPS Tagged: Barani Nagar, Tirunelveli • 10:26 AM, 12/02/2026'
    ],
    isDocument: false,
    eventSeries: 'fxec-workshop-2026'
  },

  // 3. KEYNOTE ADDRESS STAGE PHOTO
  {
    id: 'fxec-workshop-2026-keynote',
    title: 'Keynote Address on Research Paper Writing @ APJ Auditorium',
    organization: 'Francis Xavier Engineering College, Tirunelveli',
    category: 'academic',
    categoryLabel: 'Academic & Leadership',
    year: 'Feb 12, 2026',
    badge: 'Keynote Address',
    badgeColor: 'blue',
    image: '/assets/fxec_workshop_keynote_speech_2026.png',
    images: FXEC_WORKSHOP_PHOTOS,
    credentialId: 'FXEC Keynote Lecture',
    description: 'Delivering the keynote address on research conceptualization and scholarly publication to faculties, postgraduate scholars, and students at the APJ Auditorium, Francis Xavier Engineering College, Tirunelveli.',
    details: [
      'Keynote Topic: Think – Write – Publish Research Methodology',
      'Audience: Engineering faculties, Ph.D. scholars, and graduate students',
      'Venue: APJ Auditorium, Francis Xavier Engineering College, Tirunelveli',
      'GPS Verified: Lat 8.732160, Long 77.723461 • 11:11 AM, 12/02/2026'
    ],
    isDocument: false,
    eventSeries: 'fxec-workshop-2026'
  },

  // 4. TECHNICAL SESSION PHOTO
  {
    id: 'fxec-workshop-2026-session',
    title: 'Technical Session on Scholarly Publishing & Research Rigor',
    organization: 'Francis Xavier Engineering College, Tirunelveli',
    category: 'academic',
    categoryLabel: 'Academic & Leadership',
    year: 'Feb 12, 2026',
    badge: 'Technical Deliberation',
    badgeColor: 'purple',
    image: '/assets/fxec_workshop_technical_session_2026.jpg',
    images: FXEC_WORKSHOP_PHOTOS,
    credentialId: 'FXEC Technical Masterclass',
    description: 'Conducting in-depth technical masterclass on "Doing Research and Performing an Experiment vs Writing a Good Research Paper", breaking down IEEE/SCI peer-review mechanisms and scientific paper drafting.',
    details: [
      'Interactive Discussion on Manuscript Drafting & Scientific Novelty',
      'Comparative Analysis: Experimental Validation vs Paper Structure',
      'Targeting High-Impact Scopus & Web of Science Journals',
      'GPS Verified: Lat 8.732093, Long 77.723530 • 11:11 AM, 12/02/2026'
    ],
    isDocument: false,
    eventSeries: 'fxec-workshop-2026'
  },

  // 5. OFFICIAL POSTER & BROCHURE
  {
    id: 'fxec-workshop-2026-poster',
    title: 'Official Workshop Poster: Think – Write – Publish',
    organization: 'Francis Xavier Engineering College (Autonomous), Tirunelveli',
    category: 'academic',
    categoryLabel: 'Academic & Leadership',
    year: 'Feb 12, 2026',
    badge: 'Official Brochure',
    badgeColor: 'emerald',
    image: '/assets/fxec_research_paper_workshop_poster_2026.jpg',
    images: FXEC_WORKSHOP_PHOTOS,
    credentialId: 'FXEC AI&DS Workshop Poster',
    description: 'Official promotional poster and event brochure for the State-Level Research Paper Writing Workshop organized by the Department of Artificial Intelligence and Data Science at Francis Xavier Engineering College.',
    details: [
      'Resource Person: Dr. P. Chinnasamy (World Top 2% Scientist)',
      'Organizers: Mrs. S. Anitha (Coordinator) & Dr. A. Jainul Fathima (Convenor)',
      'Venue: APJ Auditorium, Francis Xavier Engineering College, Vannarpettai, Tirunelveli',
      'Schedule: Thursday, 12th February 2026 • 9.00 AM to 4.00 PM'
    ],
    isDocument: true,
    eventSeries: 'fxec-workshop-2026'
  },

  // EXISTING GALLERY ITEMS
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
    id: 'toycathon-2021-primary-evaluator',
    title: 'Primary Evaluator Certificate – Toycathon 2021',
    organization: 'Ministry of Education & AICTE (Govt. of India)',
    category: 'awards',
    categoryLabel: 'Awards & Honors',
    year: '2021',
    badge: 'Primary Evaluator',
    badgeColor: 'amber',
    image: '/assets/toycathon_2021_primary_evaluator_certificate.jpg',
    credentialId: 'Toycathon 2021 Evaluator',
    description: "Awarded certificate for exceptional contribution as a Primary Evaluator in 'Toycathon, 2021', an inter-ministerial initiative organized by 6 Union Ministries and AICTE to discover and promote indigenous toy and game innovations.",
    details: [
      'Issued by Ministry of Education & AICTE',
      'Signed by AICTE Chairman Prof. Anil Sahasrabudhe & Dr. Abhay Jere',
      'Assessed national student prototypes and indigenous concepts',
      'Joint Initiative of 6 Union Ministries of India'
    ],
    isDocument: true
  },
  {
    id: 'toycathon-2021-judge',
    title: 'Judge Certificate – Toycathon 2021',
    organization: 'Ministry of Education & AICTE (Govt. of India)',
    category: 'awards',
    categoryLabel: 'Awards & Honors',
    year: '2021',
    badge: 'National Judge',
    badgeColor: 'amber',
    image: '/assets/toycathon_2021_judge_certificate.jpg',
    credentialId: 'Toycathon 2021 Judge',
    description: "Awarded certificate for exceptional contribution as a Judge in 'Toycathon, 2021', evaluating innovative physical and digital toy prototypes, gaming concepts, and student designs.",
    details: [
      'Conferred by Ministry of Education & AICTE',
      'Signed by AICTE Chairman Prof. Anil Sahasrabudhe & Dr. Mohit Gambhir',
      'National Grand Finale & Prototype Evaluation Panel',
      'Promoting Indian ethos and creative engineering solutions'
    ],
    isDocument: true
  },
  {
    id: 'ieee-senior-membership-card',
    title: 'IEEE Senior Member Official Credential Card',
    organization: 'Institute of Electrical and Electronics Engineers (IEEE)',
    category: 'memberships',
    categoryLabel: 'Society Credentials',
    year: 'Valid through 2027',
    badge: 'IEEE Senior Member #94203253',
    badgeColor: 'blue',
    image: '/assets/ieee_senior_membership_card.png',
    credentialId: 'Member # 94203253',
    description: 'Official IEEE Senior Member credential card (Podhigai Subsection, Region 10). Elevation to Senior Member grade recognizes significant performance and leadership across engineering, computing, and technology fields.',
    details: [
      'Elevated Grade: IEEE Senior Member (SMIEEE)',
      'IEEE Membership ID: 94203253 • Podhigai Subsection',
      'Valued IEEE Member for 4 years • Valid through 31 Dec 2027',
      'Signed by Jill I. Gostin, 2027 IEEE President & CEO',
      'IEEE Region 10 (Asia-Pacific) & Global Technical Societies'
    ],
    isDocument: true
  },
  {
    id: 'ieee-senior-member-document',
    title: 'IEEE Senior Member Official Elevation Document',
    organization: 'Institute of Electrical and Electronics Engineers (IEEE)',
    category: 'memberships',
    categoryLabel: 'Society Credentials',
    year: '2024–2027',
    badge: 'Official Document',
    badgeColor: 'cyan',
    image: '/assets/ieee_senior_membership_certificate.png',
    credentialId: 'IEEE SM # 94203253',
    description: 'Complete official IEEE Senior Membership document and digital wallet credential confirming active elevation and global membership across 500,000+ professionals worldwide.',
    details: [
      'Official IEEE Membership Renewal & Elevation Document',
      'Part of global community of 500,000+ professionals',
      'Contains verified digital QR wallet authentication',
      'IEEE HQ: 3 Park Avenue, 17th Floor, New York, NY, USA'
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
    year: '2025, 2026',
    badge: 'World Top 2% Scientist',
    badgeColor: 'amber',
    image: '/assets/chinnasamy_avatar.jpg',
    credentialId: 'Stanford AI Global Ranking',
    description: 'Ranked in the prestigious Stanford University World Top 2% Scientists global list (2025 & 2026) in Artificial Intelligence and Image Processing based on career-long citation impact, standardized h-index, and co-authorship weight.',
    details: [
      'Field: Artificial Intelligence & Image Processing',
      'Published by Stanford University & Elsevier',
      '178+ Indexed Research Publications'
    ],
    isDocument: false
  },
  {
    id: 'ieee-iccci-session-chair',
    title: 'IEEE International Conference Session Chair',
    organization: 'IEEE & Sri Shakthi Institute of Engineering & Technology (ICCCI)',
    category: 'academic',
    categoryLabel: 'Academic & Leadership',
    year: 'Session Chair',
    badge: 'IEEE Session Chair',
    badgeColor: 'cyan',
    image: '/assets/ieee_session_chair_iccci.jpg',
    credentialId: 'IEEE ICCCI Technical Session Chair',
    description: 'Served as Session Chair and Technical Evaluator at the IEEE International Conference on Computer Communication and Informatics (ICCCI), evaluating scholarly presentations, methodology rigor, and peer-reviewed contributions across AI, networking, and computing.',
    details: [
      'Technical Session Chair for peer-reviewed paper tracks',
      'IEEE International Conference on Computer Communication and Informatics (ICCCI)',
      'Technical Co-Sponsorship: IEEE Region 10',
      'Evaluated cutting-edge research presentations in AI, Cloud, and Cybersecurity',
      'Presided over author defense and technical Q&A evaluation panel'
    ],
    isDocument: false
  },
  {
    id: 'guest-of-honor-thiruthangal-nadar',
    title: 'National Conference: Guest of Honor @ Thiruthangal Nadar College',
    organization: 'Thiruthangal Nadar College, Chennai',
    category: 'academic',
    categoryLabel: 'Academic & Leadership',
    year: 'Guest of Honor',
    badge: 'Guest of Honor',
    badgeColor: 'amber',
    image: '/assets/guest_of_honor_thiruthangal_nadar_college.jpg',
    credentialId: 'National Conference Dignitary on Dais',
    description: 'Invited as the Guest of Honor at the National Conference at Thiruthangal Nadar College, Chennai, gracing the central presidential dais alongside management, principal, and department heads during the inaugural ceremony.',
    details: [
      'Role: Conferred Guest of Honor on Central Dais',
      'Venue: Selvammal Hall / Auditorium, Thiruthangal Nadar College, Chennai',
      'Inauguration and Presidential Address alongside College Leadership',
      'Addressed delegates, researchers, and faculty on emerging computing frontiers',
      'Presided over official release and ceremonial lighting of the lamp'
    ],
    isDocument: false
  },
  {
    id: 'thiruthangal-nadar-seminar',
    title: 'National Seminar Keynote Speaker @ Thiruthangal Nadar College',
    organization: 'Thiruthangal Nadar College & ICSSR / MHRD',
    category: 'academic',
    categoryLabel: 'Academic & Leadership',
    year: 'Keynote Speaker',
    badge: 'National Seminar Keynote',
    badgeColor: 'blue',
    image: '/assets/national_seminar_thiruthangal_nadar_college.jpg',
    credentialId: 'ICSSR-MHRD Sponsored',
    description: 'Invited Keynote Speaker delivering an expert technical session on "Machine Learning Applications in Crime Prediction" at the ICSSR-sponsored National Seminar organized by the Department of Software Applications, Thiruthangal Nadar College, Chennai.',
    details: [
      'Sponsored by Indian Council of Social Science Research (ICSSR), MHRD',
      'Host: Dept. of Software Applications, Thiruthangal Nadar College, Chennai',
      'Topic: Machine Learning Applications in Crime Prediction',
      'Session addressing faculty members, research scholars, and postgraduate students'
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
    image: '/assets/toycathon_2021_primary_evaluator_certificate.jpg',
    credentialId: 'MIC/AICTE Jury',
    description: 'Selected as Primary Evaluator and National Jury Member evaluating cutting-edge innovations, hardware prototypes, and digital solutions by student engineering teams across India.',
    details: [
      'Primary Evaluator for Smart India Hackathon 2022',
      'Toycathon National Evaluator & Reviewer',
      'Evaluated 50+ Prototype Submissions'
    ],
    isDocument: true
  }
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Items', icon: Sparkles },
  { id: 'awards', label: 'Awards & Honors', icon: Award },
  { id: 'memberships', label: 'Society Credentials', icon: CreditCard },
  { id: 'academic', label: 'Academic & Leadership', icon: GraduationCap },
];

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeSubPhotoIndex, setActiveSubPhotoIndex] = useState<number>(0);
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
        (item.eventSeries && item.eventSeries.toLowerCase().includes(q)) ||
        (item.credentialId && item.credentialId.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Handle Lightbox Navigation
  const handleOpenLightbox = (index: number, subIndex: number = 0) => {
    setLightboxIndex(index);
    setActiveSubPhotoIndex(subIndex);
    setIsZoomed(false);
  };

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
    setActiveSubPhotoIndex(0);
    setIsZoomed(false);
  }, []);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setIsZoomed(false);
    const item = filteredItems[lightboxIndex];
    if (item.images && item.images.length > 1 && activeSubPhotoIndex > 0) {
      setActiveSubPhotoIndex(prev => prev - 1);
      return;
    }
    const newIdx = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxIndex(newIdx);
    setActiveSubPhotoIndex(0);
  }, [lightboxIndex, filteredItems, activeSubPhotoIndex]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setIsZoomed(false);
    const item = filteredItems[lightboxIndex];
    if (item.images && item.images.length > 1 && activeSubPhotoIndex < item.images.length - 1) {
      setActiveSubPhotoIndex(prev => prev + 1);
      return;
    }
    const newIdx = (lightboxIndex + 1) % filteredItems.length;
    setLightboxIndex(newIdx);
    setActiveSubPhotoIndex(0);
  }, [lightboxIndex, filteredItems, activeSubPhotoIndex]);

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

  // Active photo inside current item
  const activePhoto = useMemo(() => {
    if (!currentItem) return null;
    if (currentItem.images && currentItem.images.length > 0) {
      const idx = Math.min(activeSubPhotoIndex, currentItem.images.length - 1);
      return currentItem.images[idx];
    }
    return {
      url: currentItem.image,
      title: currentItem.title,
      caption: currentItem.description
    };
  }, [currentItem, activeSubPhotoIndex]);

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
            High-resolution visual archive of keynote workshops, national awards,
            verified professional society credentials, and academic leadership milestones.
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
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
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
              Try searching for &quot;Francis Xavier&quot;, &quot;CSI&quot;, &quot;IEEE&quot;, &quot;Award&quot;, or &quot;2026&quot;.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 font-mono text-xs font-bold transition-all cursor-pointer"
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
              const hasMultiPhotos = Boolean(item.images && item.images.length > 1);

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
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
                      <button
                        onClick={() => handleOpenLightbox(idx, 0)}
                        className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/40 transition-transform active:scale-95 cursor-pointer"
                        title="Inspect Fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Inspect {hasMultiPhotos ? '(4 Photos)' : ''}</span>
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
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
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

                    {/* Multi-Photo Carousel Strip on Card */}
                    {hasMultiPhotos && item.images && (
                      <div className="absolute bottom-3 inset-x-3 flex items-center justify-between z-10 pointer-events-auto">
                        <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-cyan-400/40 font-mono text-[9px] font-bold text-cyan-300 flex items-center gap-1">
                          <Layers className="w-3 h-3 text-cyan-400" />
                          <span>Same Event ({item.images.length} Photos)</span>
                        </span>

                        <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-1.5 py-1 rounded-lg border border-white/10">
                          {item.images.map((img, subIdx) => (
                            <button
                              key={subIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenLightbox(idx, subIdx);
                              }}
                              className="w-4 h-4 rounded-full overflow-hidden border border-white/40 hover:border-cyan-400 transition-all cursor-pointer"
                              title={`View photo ${subIdx + 1}: ${img.type || img.title}`}
                            >
                              <img src={img.url} alt="" className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Credential ID pill if present and not multi-photos */}
                    {!hasMultiPhotos && item.credentialId && (
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
                        onClick={() => handleOpenLightbox(idx, 0)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors cursor-pointer group/btn"
                      >
                        <span>{hasMultiPhotos ? 'View All 4 Photos' : 'View Details'}</span>
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

      {/* Fullscreen Lightbox Modal with Event Album Switcher */}
      <AnimatePresence>
        {currentItem && activePhoto && (
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
                    href={activePhoto.url}
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
                <div className="lg:col-span-7 bg-slate-950 flex flex-col justify-between p-3 sm:p-6 relative overflow-hidden min-h-[340px] sm:min-h-[460px]">
                  
                  {/* Central Main Image Display */}
                  <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                    <img
                      key={activePhoto.url}
                      src={activePhoto.url}
                      alt={activePhoto.title || currentItem.title}
                      className={`max-w-full max-h-[50vh] object-contain transition-transform duration-300 ${
                        isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                      }`}
                      onClick={() => setIsZoomed(!isZoomed)}
                    />

                    {/* Previous Button */}
                    <button
                      onClick={handlePrev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer shadow-lg z-20"
                      title="Previous"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Next Button */}
                    <button
                      onClick={handleNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer shadow-lg z-20"
                      title="Next"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* EVENT ALBUM THUMBNAIL SELECTOR (If multi-photo event) */}
                  {currentItem.images && currentItem.images.length > 1 && (
                    <div className="mt-3 pt-3 border-t border-white/10 z-20">
                      <div className="flex items-center justify-between text-white/70 text-[11px] font-mono mb-2">
                        <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                          <Camera className="w-3.5 h-3.5" />
                          <span>Same Event Photos ({activeSubPhotoIndex + 1} of {currentItem.images.length})</span>
                        </span>
                        <span>Click thumbnail to view</span>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {currentItem.images.map((photo, pIdx) => {
                          const isCurrent = pIdx === activeSubPhotoIndex;
                          return (
                            <button
                              key={pIdx}
                              onClick={() => {
                                setActiveSubPhotoIndex(pIdx);
                                setIsZoomed(false);
                              }}
                              className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer group text-left ${
                                isCurrent
                                  ? 'border-cyan-400 ring-2 ring-cyan-400/40 scale-102'
                                  : 'border-white/20 hover:border-white/60 opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img src={photo.url} alt="" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1">
                                <span className="font-mono text-[9px] text-white font-bold truncate">
                                  #{pIdx + 1} {photo.type}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Status Indicator Bar */}
                  <div className="mt-2 flex items-center justify-between text-slate-400 font-mono text-[10px]">
                    <span className="truncate max-w-[260px]">{activePhoto.caption || currentItem.title}</span>
                    <span className="px-2 py-0.5 rounded bg-black/70 border border-white/10">
                      Item {lightboxIndex! + 1} of {filteredItems.length}
                    </span>
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
                        {activePhoto.title || currentItem.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-cyan-500" />
                          <span>{currentItem.year}</span>
                        </span>
                        {currentItem.credentialId && (
                          <span className="px-2 py-0.5 rounded-md bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 font-semibold border border-cyan-300 dark:border-cyan-500/40">
                            {currentItem.credentialId}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Active Photo Caption / Description */}
                    <div className="p-3.5 rounded-2xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/50 space-y-1.5">
                      <div className="font-mono text-[11px] font-bold text-cyan-800 dark:text-cyan-300 uppercase tracking-wide">
                        Photo Context:
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                        {activePhoto.caption}
                      </p>
                      {activePhoto.location && (
                        <div className="flex items-start gap-1.5 font-mono text-[10px] text-slate-500 dark:text-slate-400 pt-1 border-t border-cyan-200/60 dark:border-cyan-800/40">
                          <MapPin className="w-3 h-3 text-cyan-500 shrink-0 mt-0.5" />
                          <span>{activePhoto.location}</span>
                        </div>
                      )}
                      {activePhoto.time && (
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                          <Clock className="w-3 h-3 text-cyan-500 shrink-0" />
                          <span>Timestamp: {activePhoto.time}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed pt-1">
                      {currentItem.description}
                    </p>

                    {/* Bullet Highlights if available */}
                    {currentItem.details && (
                      <div className="space-y-2 pt-1">
                        <h5 className="font-mono text-[11px] font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                          Event & Session Highlights:
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
                      href={activePhoto.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold text-center flex items-center justify-center gap-2 transition-colors shadow-md shadow-cyan-500/30 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open Full Size</span>
                    </a>

                    <button
                      onClick={handleCloseLightbox}
                      className="py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold transition-colors cursor-pointer"
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
