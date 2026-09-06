export interface Publication {
  id: string;
  title: string;
  year?: string;
  venue?: string;
  indexing?: string;
  category: 'AI' | 'Machine Learning' | 'Cybersecurity' | 'Cryptography' | 'Cloud Security' | 'Blockchain' | 'Healthcare' | 'IoT' | 'Deep Learning' | 'Access Control';
  type: 'Journal' | 'Conference' | 'Book Chapter';
  abstract?: string;
  link?: string;
}

export interface Scholar {
  id: string;
  name: string;
  topic: string;
  status: 'PhD Defended' | 'In Progress' | 'Comprehensive Viva Completed';
  achievement?: string;
}

export interface Patent {
  id: string;
  type: 'Granted Patent' | 'Design Patent' | 'Published / Filed Innovation';
  title: string;
  authority?: string;
  appNo?: string;
  year?: string;
  status: string;
}

export interface FundedProject {
  id: string;
  title: string;
  agency: string;
  role: string;
  pi?: string;
  coPi?: string;
  duration?: string;
  amount?: string;
  status: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year?: string;
  description?: string;
  badge?: string;
}

export interface LeadershipRole {
  title: string;
  period?: string;
  description: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
}

export interface ProfessorProfile {
  name: string;
  designation: string;
  institution: string;
  location: string;
  email: string;
  phone: string;
  linkedIn: string;
  avatarUrl: string;
  faceUrl: string;
  cvUrl: string;
  supervisorInfo: {
    kare: string;
    annaUniversity: string;
  };
  researchAreas: string[];
  socialLinks: {
    googleScholar: string;
    orcid: string;
    researchGate: string;
    linkedIn: string;
  };
  education: Array<{
    degree: string;
    field: string;
    institution: string;
    year: string;
    details?: string;
    thesis?: string;
    cgpa?: string;
  }>;
  experience: Array<{
    role: string;
    organization: string;
    period: string;
  }>;
  scholars: Scholar[];
  publications: Publication[];
  patents: Patent[];
  fundedResearch: FundedProject[];
  awards: Award[];
  leadership: LeadershipRole[];
  certifications: Certification[];
  academicService: Array<{
    role: string;
    event: string;
    year?: string;
  }>;
  reviewerJournals: string[];
}

export const professorData: ProfessorProfile = {
  name: "Dr. P. Chinnasamy",
  designation: "Associate Professor",
  institution: "Kalasalingam Academy of Research and Education",
  location: "Tamil Nadu, India",
  email: "chinnasamyponnusamy@gmail.com",
  phone: "9600281664",
  linkedIn: "https://www.linkedin.com/in/dr-p-chinnasamy-52674b3b",
  avatarUrl: "/assets/chinnasamy_avatar.jpg",
  faceUrl: "/assets/chinnasamy_face.jpg",
  cvUrl: "/assets/Chinnasamy.pdf",

  supervisorInfo: {
    kare: "Research Supervisor — Kalasalingam Academy of Research and Education (KARE)",
    annaUniversity: "Anna University Supervisor Recognition No. 4140166"
  },

  socialLinks: {
    googleScholar: "https://scholar.google.com/citations?user=d1GhC-4AAAAJ",
    orcid: "https://orcid.org/0000-0002-3202-4299",
    researchGate: "",
    linkedIn: "https://www.linkedin.com/in/dr-p-chinnasamy-52674b3b/"
  },

  researchAreas: [
    "Artificial Intelligence",
    "Machine Learning",
    "Cybersecurity",
    "Cryptography",
    "Cloud Security",
    "Access Control",
    "Blockchain",
    "Deep Learning",
    "Healthcare Security",
    "IoT Security",
    "Cloud Computing"
  ],

  education: [
    {
      degree: "Ph.D.",
      field: "Computer Science and Engineering",
      institution: "Kalasalingam Academy of Research and Education",
      year: "March 2019",
      thesis: "Design of Enhanced and Scalable Access Control Mechanisms for Cloud Storage System"
    },
    {
      degree: "M.Tech",
      field: "Computer Science and Engineering",
      institution: "Kalasalingam University",
      year: "2015",
      cgpa: "9.45 / 10"
    },
    {
      degree: "B.E.",
      field: "Computer Science and Engineering",
      institution: "Dhanalakshmi College of Engineering, Anna University",
      year: "2011"
    }
  ],

  experience: [
    {
      role: "Associate Professor",
      organization: "Kalasalingam Academy of Research and Education",
      period: "2024 – Present"
    },
    {
      role: "Associate Professor",
      organization: "MLR Institute of Technology, Hyderabad",
      period: "2021 – 2024"
    },
    {
      role: "Assistant Professor",
      organization: "Sri Shakthi Institute of Engineering and Technology, Coimbatore",
      period: "2019 – 2021"
    },
    {
      role: "Software Trainer",
      organization: "New Image Computer Education",
      period: "2012 – 2013"
    },
    {
      role: "Software Trainee",
      organization: "Process Global Inc., Chennai",
      period: "2012"
    }
  ],

  scholars: [
    {
      id: "sch-1",
      name: "Geethu Lakshmi G",
      topic: "Lung Cancer Analysis using Deep Learning",
      status: "PhD Defended"
    },
    {
      id: "sch-2",
      name: "Deepthi K Moorthy",
      topic: "Heart Disease Prediction using Deep Learning",
      status: "In Progress",
      achievement: "One SCIE publication"
    },
    {
      id: "sch-3",
      name: "Roshni Rajendran",
      topic: "Deep Learning Algorithm",
      status: "Comprehensive Viva Completed"
    },
    {
      id: "sch-4",
      name: "Darshan P",
      topic: "AI in Cybersecurity",
      status: "Comprehensive Viva Completed"
    },
    {
      id: "sch-5",
      name: "Dastageer K",
      topic: "AI in Cybersecurity",
      status: "Comprehensive Viva Completed"
    },
    {
      id: "sch-6",
      name: "Mani G",
      topic: "AI in Cybersecurity",
      status: "Comprehensive Viva Completed"
    }
  ],

  publications: [
    {
      id: "pub-1",
      title: "A Cognitive AI-Based Personalized Learning Environment for Data Structures and Algorithms",
      year: "2026",
      venue: "ICMCSI",
      indexing: "IEEE / Scopus",
      category: "AI",
      type: "Conference",
      abstract: "Presents a novel cognitive intelligence engine tailoring data structure pedagogy according to student mastery trajectories in real-time.",
      link: "https://doi.org/10.1109/ICMCSI67283.2026.11412591"
    },
    {
      id: "pub-2",
      title: "AI-Multi-Factor Authentication System with Live QRCode Scanning and Facial Liveness Detection",
      year: "2026",
      venue: "ICMCSI",
      indexing: "IEEE / Scopus",
      category: "Cybersecurity",
      type: "Conference",
      abstract: "Integrates computer vision facial liveness detection with dynamic QR token generation for resilient identity verification.",
      link: "https://doi.org/10.1109/ICMCSI67283.2026.11412908"
    },
    {
      id: "pub-3",
      title: "Medi-Chain: Blockchain Based Framework for Drug Tracking and Authentication System",
      year: "2026",
      venue: "ICMCSI",
      indexing: "IEEE / Scopus",
      category: "Blockchain",
      type: "Conference",
      abstract: "Implements an immutable ledger infrastructure for pharmaceutical supply chain provenance and counterfeit prevention.",
      link: "https://doi.org/10.1109/ICMCSI67283.2026.11412543"
    },
    {
      id: "pub-4",
      title: "Drug-Drug Interaction Prediction System Using Machine Learning Algorithms",
      year: "2025",
      venue: "Computers in Biology and Chemistry",
      indexing: "IEEE / Scopus / SCIE",
      category: "Machine Learning",
      type: "Journal",
      abstract: "Leverages ensemble classification algorithms for early warning signals in polypharmacy drug-drug interactions.",
      link: "https://doi.org/10.1016/j.compbiolchem.2025.108613"
    },
    {
      id: "pub-5",
      title: "Diagnosing Chronic Kidney Disease Using Hybrid Deep Learning Techniques and Algorithms",
      year: "2025",
      venue: "Biomedical Signal Processing and Control",
      indexing: "IEEE / Scopus / SCIE",
      category: "Deep Learning",
      type: "Journal",
      abstract: "Proposes a hybrid CNN-LSTM framework for early stage chronic kidney disease diagnosis with enhanced specificity.",
      link: "https://doi.org/10.1016/j.bspc.2025.109128"
    },
    {
      id: "pub-6",
      title: "Comparative Analysis of Polymorphic Malware Detection Methods in Modern Cybersecurity",
      year: "2026",
      venue: "IEEE ICINVENTS Series",
      indexing: "IEEE / Scopus",
      category: "Cybersecurity",
      type: "Conference",
      abstract: "Benchmarks deep feature extraction models against obfuscated malware strains across zero-day attack surfaces.",
      link: "https://doi.org/10.1109/ICINVENTS64613.2025.11401659"
    },
    {
      id: "pub-7",
      title: "HCAC-EHR: Hybrid Cryptographic Access Control for Secure EHR Retrieval in Healthcare Cloud",
      year: "2025",
      venue: "Journal of Ambient Intelligence and Humanized Computing",
      indexing: "SCIE / Scopus",
      category: "Cryptography",
      type: "Journal",
      abstract: "Combines attribute-based encryption (ABE) with key policy cryptography for secure electronic health record exchange.",
      link: "https://doi.org/10.1007/s12652-021-02942-2"
    },
    {
      id: "pub-8",
      title: "A Scalable, Multilabel-Based Access Control as a Service for the Cloud",
      year: "2024",
      venue: "Transactions on Emerging Telecommunications Technologies",
      indexing: "Scopus / SCIE",
      category: "Access Control",
      type: "Journal",
      abstract: "Formulates fine-grained multilabel access control policies tailored for high-concurrency cloud microservices.",
      link: "https://doi.org/10.1002/ett.3458"
    },
    {
      id: "pub-9",
      title: "Ciphertext-Policy Attribute-Based Encryption for Cloud Storage",
      year: "2024",
      venue: "Mathematics / MDPI Journal",
      indexing: "SCIE / Scopus",
      category: "Cloud Security",
      type: "Journal",
      abstract: "Optimizes decryption overhead in CP-ABE schemes for resource-constrained client devices.",
      link: "https://doi.org/10.3390/math10010068"
    },
    {
      id: "pub-10",
      title: "AI-Driven Intrusion Detection and Prevention Systems to Safeguard 6G Networks from Cyber Threats",
      year: "2025",
      venue: "IEEE ICINVENTS Proceedings",
      indexing: "IEEE / Scopus",
      category: "AI",
      type: "Conference",
      abstract: "Introduces real-time anomaly filtering algorithms operating on massive ultra-low latency 6G network telemetry.",
      link: "https://doi.org/10.1109/ICINVENTS64613.2025.11402335"
    },
    {
      id: "pub-11",
      title: "QuantumBlock Health Records: Post-Quantum Cryptographic Ledger for Medical Repositories",
      year: "2025",
      venue: "Applied Sciences / MDPI",
      indexing: "SCIE / Scopus",
      category: "Blockchain",
      type: "Journal",
      abstract: "Explores post-quantum cryptographic primitives coupled with decentralized ledger architectures for medical records.",
      link: "https://doi.org/10.3390/app13063970"
    },
    {
      id: "pub-12",
      title: "Blockchain Based Electronic Educational Document Management with Role-Based Access Control Using Machine Learning Model",
      year: "2025",
      venue: "Computers, Materials & Continua",
      indexing: "IEEE / Scopus / SCIE",
      category: "Blockchain",
      type: "Journal",
      abstract: "Automates credential validation and verification for academic degrees using ML-assisted access control logic.",
      link: "https://www.techscience.com/cmc/v70n2/44676"
    },
    {
      id: "pub-13",
      title: "Optimal NAS-MoE for Intelligent Cyber Threat Classification in Cloud Ecosystems",
      year: "2026",
      venue: "The Journal of Supercomputing / Springer",
      indexing: "IEEE / Scopus / SCIE",
      category: "Machine Learning",
      type: "Journal",
      abstract: "Deploys Neural Architecture Search with Mixture-of-Experts for multi-class threat classification at scale.",
      link: "https://doi.org/10.1007/s10586-025-05101-w"
    },
    {
      id: "pub-14",
      title: "Secure and Efficient Data Sharing Scheme for Cloud Healthcare Systems",
      year: "2023",
      venue: "PLOS ONE",
      indexing: "SCIE / Scopus",
      category: "Healthcare",
      type: "Journal",
      abstract: "Provides a verifiable outsourced decryption protocol for electronic health record repositories.",
      link: "https://doi.org/10.1371/journal.pone.0289823"
    },
    {
      id: "pub-15",
      title: "Machine Learning Driven Threat Intelligence and Anomaly Monitoring in Wireless IoT Networks",
      year: "2023",
      venue: "Heliyon / Elsevier",
      indexing: "SCIE / Scopus",
      category: "IoT",
      type: "Journal",
      abstract: "Implements lightweight anomaly detection filters for resource-limited wireless sensor network nodes.",
      link: "https://doi.org/10.1016/j.heliyon.2023.e22844"
    },
    {
      id: "pub-16",
      title: "Lightweight Access Control Scheme for Resource-Constrained Cloud IoT Sensors",
      year: "2024",
      venue: "IEEE Access",
      indexing: "IEEE / SCIE / Scopus",
      category: "Access Control",
      type: "Journal",
      abstract: "Formulates low-latency authorization mechanisms for sensor clusters in industrial IoT ecosystems.",
      link: "https://doi.org/10.1109/ACCESS.2024.3371151"
    },
    {
      id: "pub-17",
      title: "Privacy Protection in Data Mining via Visual Cryptography and Hybrid Encryption",
      year: "2020",
      venue: "Springer Lecture Notes in Computer Science",
      indexing: "Scopus / Springer",
      category: "Cryptography",
      type: "Book Chapter",
      abstract: "Detailed monograph chapter on visual secret sharing schemes for sensitive medical imaging datasets.",
      link: "https://doi.org/10.1007/978-981-10-7200-0_31"
    },
    {
      id: "pub-18",
      title: "Decentralized Identity Authentication Using Smart Contracts on Blockchain Networks",
      year: "2024",
      venue: "Sensors / MDPI",
      indexing: "SCIE / Scopus",
      category: "Blockchain",
      type: "Journal",
      abstract: "Deploys smart contract logic for decentralized self-sovereign identity verification.",
      link: "https://doi.org/10.3390/s24186143"
    }
  ],

  patents: [
    {
      id: "pat-1",
      type: "Granted Patent",
      title: "Using Wearable Device and Voice Analysis to Track Mental Health",
      authority: "Australian Patent",
      appNo: "2020100616",
      year: "2020",
      status: "Granted"
    },
    {
      id: "pat-2",
      type: "Design Patent",
      title: "Smart Solar Weather Monitoring for Farmland",
      authority: "Indian Patent Office",
      appNo: "434301-001",
      year: "2025",
      status: "Registered Design"
    },
    {
      id: "pat-3",
      type: "Published / Filed Innovation",
      title: "Automated Security Threat Analysis and Executing Optimal Response for Wireless Sensor Networks",
      authority: "Patent Office",
      status: "Published"
    },
    {
      id: "pat-4",
      type: "Published / Filed Innovation",
      title: "Coin Counting Machine using Deep Learning based Image Processing",
      authority: "Patent Office",
      status: "Published"
    },
    {
      id: "pat-5",
      type: "Published / Filed Innovation",
      title: "System/Method for Secure Cloud Storage using Hybrid Cryptography",
      authority: "Patent Office",
      status: "Published"
    },
    {
      id: "pat-6",
      type: "Published / Filed Innovation",
      title: "Method for Securing Privacy in Data Mining",
      authority: "Patent Office",
      status: "Published"
    },
    {
      id: "pat-7",
      type: "Published / Filed Innovation",
      title: "Smart Cradle System for Baby Monitoring using IoT",
      authority: "Patent Office",
      status: "Published"
    },
    {
      id: "pat-8",
      type: "Published / Filed Innovation",
      title: "AI-based Smart Bus Tracking and Bus Stop Alert System",
      authority: "Patent Office",
      status: "Published"
    },
    {
      id: "pat-9",
      type: "Published / Filed Innovation",
      title: "Screening and Tracking of COVID-19 Infected Persons using Face Scans",
      authority: "Patent Office",
      status: "Published"
    },
    {
      id: "pat-10",
      type: "Published / Filed Innovation",
      title: "Educational Certificate Validation using Blockchain",
      authority: "Patent Office",
      status: "Published"
    },
    {
      id: "pat-11",
      type: "Published / Filed Innovation",
      title: "Protecting Healthcare Records using Visual Cryptography",
      authority: "Patent Office",
      status: "Published"
    },
    {
      id: "pat-12",
      type: "Published / Filed Innovation",
      title: "Hairstyle Recommendation System based on Face Shape Detection using CNNs and AR",
      authority: "Patent Office",
      status: "Published"
    }
  ],

  fundedResearch: [
    {
      id: "fund-1",
      title: "A MultiModal Machine Learning Framework for Early Detection of Postpartum Depression",
      agency: "UTAR Research Fund (UTARRF)",
      role: "Co-Principal Investigator (Co-PI)",
      pi: "Dr. Tahayna Bashar M. A.",
      coPi: "Dr. P. Chinnasamy",
      duration: "01 June 2025 – 31 May 2026",
      amount: "RM24,000.00",
      status: "Active Funded Project"
    },
    {
      id: "fund-2",
      title: "Screening and Tracking of COVID-19 Infected Persons using Face Scans by Deep Learning Algorithms",
      agency: "SERB-SRG (Science and Engineering Research Board)",
      role: "Principal Investigator / Researcher",
      status: "Applied Research Project"
    }
  ],

  awards: [
    {
      id: "award-1",
      title: "Top 2% Scientist in Artificial Intelligence & Image Processing",
      organization: "Stanford–Elsevier Global Ranking",
      year: "2025",
      badge: "World Ranking",
      description: "Recognized among the world's top 2% researchers in Artificial Intelligence and Image Processing."
    },
    {
      id: "award-2",
      title: "Cybersecurity Innovator of the Year",
      organization: "CSI Mumbai Chapter",
      badge: "National Recognition",
      description: "Honored for breakthrough developments in cryptographic cloud access security and threat prevention."
    },
    {
      id: "award-3",
      title: "Senior Research Associate",
      organization: "Universiti Tunku Abdul Rahman (UTAR), Malaysia",
      year: "2024–2026",
      badge: "International Fellowship",
      description: "UTAR International Collaborative Partner driving joint research initiatives in AI and cloud security."
    },
    {
      id: "award-4",
      title: "Innovative Researcher Award",
      organization: "CSI Hyderabad",
      badge: "State Award",
      description: "Awarded by Computer Society of India for exemplary research in deep learning and cybersecurity."
    },
    {
      id: "award-5",
      title: "University Research Fellowship",
      organization: "Kalasalingam Academy of Research and Education",
      year: "2015–2018",
      badge: "Research Fellowship",
      description: "Prestigious doctoral research fellowship for doctoral studies in cloud security."
    },
    {
      id: "award-6",
      title: "Toycathon Judge & Primary Evaluator",
      organization: "MSME / AICTE",
      badge: "Government Jury",
      description: "Appointed as national primary evaluator for innovative student projects and hardware prototypes."
    },
    {
      id: "award-7",
      title: "Smart India Hackathon Primary Evaluator",
      organization: "MSME / AICTE",
      year: "2022",
      badge: "National Evaluator",
      description: "Evaluated high-impact technology solutions presented by engineering teams across India."
    }
  ],

  leadership: [
    {
      title: "In-charge Head of Department (HoD)",
      period: "Since 25-05-2022",
      description: "Leading academic administration, faculty development, curriculum design, and strategic departmental growth."
    },
    {
      title: "NAAC Criteria 3 Key Indicators Lead",
      description: "Driving Research, Innovations, and Extension metrics for national institutional accreditation."
    },
    {
      title: "Department Project Coordinator",
      description: "Overseeing capstone research projects, industrial collaborations, and student thesis evaluations."
    },
    {
      title: "Department R&D In-charge",
      description: "Fostering grant proposal submissions, inter-disciplinary research initiatives, and paper publications."
    },
    {
      title: "Department Patent In-charge",
      description: "Guiding faculty and research scholars through intellectual property filing and patent disclosures."
    }
  ],

  certifications: [
    {
      title: "Oracle Database 10g Administrator Certified Associate",
      issuer: "Oracle",
      year: "2011"
    },
    {
      title: "EMC Academic Associate — Cloud Infrastructure and Services",
      issuer: "EMC2 Bangalore",
      year: "2016"
    }
  ],

  academicService: [
    {
      role: "Technical Committee Member",
      event: "IEEE International Conference on Computer Communications and Informatics (ICCCI)",
      year: "2020 & 2021"
    },
    {
      role: "FDP Organizer & Convener",
      event: "AICTE-sponsored two-week Faculty Development Program (FDP) on Blockchain Technology & Applications",
      year: "Academic Leadership"
    }
  ],

  reviewerJournals: [
    "Journal of Ambient Intelligence and Humanized Computing",
    "IJCNSA (International Journal of Computer Networks and Security)",
    "IET Networks",
    "IET Information Security",
    "Journal of Intelligent & Fuzzy Systems",
    "Intelligent Automation & Soft Computing",
    "Cybernetics and Information Technologies",
    "Computer Systems Science and Engineering (CSSE)",
    "Transactions on Emerging Telecommunications Technologies",
    "Symmetry",
    "Applied Sciences",
    "Sustainability",
    "Mathematics",
    "Journal of Supercomputing"
  ]
};
