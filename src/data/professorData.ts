export interface Publication {
  id: string;
  title: string;
  authors?: string;
  year?: string;
  venue?: string;
  indexing?: string;
  category: 'AI' | 'Machine Learning' | 'Cybersecurity' | 'Cryptography' | 'Cloud Security' | 'Blockchain' | 'Healthcare' | 'IoT' | 'Deep Learning' | 'Access Control' | string;
  type: 'Journal' | 'Conference' | 'Book Chapter' | string;
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
  authors?: string;
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
  image?: string;
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
    scopus: string;
    webOfScience: string;
    vidwan: string;
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
  professionalMemberships: Array<{
    id: string;
    title: string;
    society: string;
    abbreviation: string;
    role: string;
    membershipId?: string;
    description: string;
    badge: string;
    logo?: string;
    cardImage?: string;
    certificates?: Array<{
      title: string;
      image: string;
    }>;
  }>;
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
    researchGate: "https://www.researchgate.net/profile/Chinnasamy-Ponnusamy?ev=hdr_xprf",
    linkedIn: "https://www.linkedin.com/in/dr-p-chinnasamy-52674b3b/",
    scopus: "https://www.scopus.com/authid/detail.uri?authorId=57201503238",
    webOfScience: "https://www.webofscience.com/wos/author/record/W-8274-2018",
    vidwan: "https://vidwan.inflibnet.ac.in/profile/179307"
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
    "id": "sci-1",
    "title": "HCAC-EHR: Hybrid Cryptographic Access Control for Secure EHR Retrieval in Healthcare Cloud",
    "authors": "P. Chinnasamy, P. Deepalakshmi",
    "venue": "Journal of Ambient Intelligence and Humanized Computing, Vol. 13, pp-1001-1019",
    "year": "2022",
    "link": "https://doi.org/10.1007/s12652-021-02942-2",
    "indexing": "SCI (Q1, IF: 7.104)",
    "category": "Cryptography",
    "type": "Journal",
    "abstract": "Presents a hybrid cryptographic access control mechanism combining attribute-based encryption (ABE) with key policy cryptography for secure electronic health record exchange in medical cloud environments."
  },
  {
    "id": "sci-2",
    "title": "A Scalable, Multilabel-Based Access Control as a Service for the Cloud (SMBACaaS)",
    "authors": "P. Chinnasamy, P. Deepalakshmi",
    "venue": "Transactions on Emerging Telecommunications Technologies, Vol.29, No.8",
    "year": "2018",
    "link": "https://doi.org/10.1002/ett.3458",
    "indexing": "SCI (Q2, IF: 3.310)",
    "category": "Access Control",
    "type": "Journal",
    "abstract": "Formulates fine-grained multilabel access control as a service policies tailored for high-concurrency cloud storage and microservices."
  },
  {
    "id": "sci-3",
    "title": "CiphertextPolicy Attribute-Based Encryption for Cloud Storage: Toward Data Privacy and Authentication in AIenabled IoT System",
    "authors": "Chinnasamy P, Deepalakshmi P, Dutta AK, You J, Joshi GP",
    "venue": "Mathematics, 10(1):68",
    "year": "2022",
    "link": "https://doi.org/10.3390/math10010068",
    "indexing": "SCI (Q1, IF: 2.592)",
    "category": "Cloud Security",
    "type": "Journal",
    "abstract": "Optimizes decryption overhead in CP-ABE schemes for resource-constrained client devices in AI-enabled IoT cloud ecosystems."
  },
  {
    "id": "sci-4",
    "title": "Optimal Deep Reinforcement Learning for Intrusion Detection in UAVs",
    "authors": "V. Praveena, A. Vijayaraj, P. Chinnasamy, Ihsan Ali, Roobaea Alroobaea, Saleh Yahya Alyahyan, Muhammad Ahsan Raza",
    "venue": "Computers, Materials & Continua, Vol.70, No.2, pp. 2639-2653",
    "year": "2022",
    "link": "https://www.techscience.com/cmc/v70n2/44676",
    "indexing": "SCI (Q2, IF: 3.860)",
    "category": "Deep Learning",
    "type": "Journal",
    "abstract": "Deploys deep reinforcement learning algorithms for real-time intrusion detection and cyber threat mitigation across Unmanned Aerial Vehicle (UAV) networks."
  },
  {
    "id": "sci-5",
    "title": "Smart Contract-Enabled Secure Sharing of Health Data for a Mobile CloudBased E-Health System",
    "authors": "P. Chinnasamy, Ashwag Albakri, Mudassir Khan, A. Ambeth Raja, Ajmeera Kiran, Jyothi Chinna Babu",
    "venue": "Applied Sciences, 13(6), 3970",
    "year": "2023",
    "link": "https://doi.org/10.3390/app13063970",
    "indexing": "SCIE (Q2, IF: 2.838)",
    "category": "Blockchain",
    "type": "Journal",
    "abstract": "Leverages decentralized smart contracts and mobile cloud storage for secure, audit-verifiable patient health record sharing."
  },
  {
    "id": "sci-6",
    "title": "Heat and Mass Transport in Casson Nanofluid Flow over a 3-D Riga Plate with Cattaneo-Christov Double Flux: A Computational Modeling through Analytical Method",
    "authors": "Loganathan K, Eswaramoorthi S, Chinnasamy P, Jain R, Sivasakthivel R, Ali R, Devi NN",
    "venue": "Symmetry, 15(3), 725",
    "year": "2023",
    "link": "https://doi.org/10.3390/sym1503725",
    "indexing": "SCIE (Q2, IF: 2.940)",
    "category": "AI",
    "type": "Journal",
    "abstract": "Presents advanced computational modeling and numerical heat/mass transport analysis across 3D Riga plate configurations."
  },
  {
    "id": "sci-7",
    "title": "Edge Detection using Fast Pixel based Matching and Contours Mapping Algorithms",
    "authors": "T. S. Arulananth, P. Chinnasamy, J. Chinna Babu, Ajmeera Kiran, J. Hemalatha, Mohamed Abbas",
    "venue": "PLOS ONE, 18(8): e0289823",
    "year": "2023",
    "link": "https://doi.org/10.1371/journal.pone.0289823",
    "indexing": "SCIE (Q1, IF: 3.752)",
    "category": "AI",
    "type": "Journal",
    "abstract": "Proposes fast pixel-based matching and contour mapping algorithms for high-precision computer vision edge detection."
  },
  {
    "id": "sci-8",
    "title": "Health Recommendation System using Deep Learning-based Collaborative Filtering",
    "authors": "P. Chinnasamy, Wing-Keung Wong, A. Ambeth Raja, Osamah Ibrahim Khalaf, Ajmeera Kiran, J. Chinna Babu",
    "venue": "Heliyon, e22844",
    "year": "2023",
    "link": "https://doi.org/10.1016/j.heliyon.2023.e22844",
    "indexing": "SCIE (Q1, IF: 4.0)",
    "category": "Deep Learning",
    "type": "Journal",
    "abstract": "Implements neural collaborative filtering models for personalized medical recommendations and treatment tracking."
  },
  {
    "id": "sci-9",
    "title": "Peristaltic transport of Sutterby nanofluid flow in an inclined tapered channel with an artificial neural network model and biomedical engineering application",
    "authors": "Chinnasamy, P., Sivajothi, R., Sathish, S. et al.",
    "venue": "Scientific Reports 14, 555",
    "year": "2024",
    "link": "https://doi.org/10.1038/s41598-023-49480-9",
    "indexing": "SCIE (Q1, IF: 4.6)",
    "category": "Machine Learning",
    "type": "Journal",
    "abstract": "Integrates artificial neural network regression with fluid dynamics simulations for biomedical engineering channel applications."
  },
  {
    "id": "sci-10",
    "title": "Classification of Paediatric Pneumonia using Modified DenseNet-121 Deep-learning Model",
    "authors": "T. S. Arulananth, S. W. Prakash, R. K. Ayyasamy, V. P. Kavitha, P. G. Kuppusamy, P. Chinnasamy",
    "venue": "IEEE Access",
    "year": "2024",
    "link": "https://doi.org/10.1109/ACCESS.2024.3371151",
    "indexing": "SCIE (Q1, IF: 3.9)",
    "category": "Deep Learning",
    "type": "Journal",
    "abstract": "Develops a modified DenseNet-121 architecture for automated diagnostic classification of pediatric pneumonia from X-ray imaging."
  },
  {
    "id": "sci-11",
    "title": "Semantic segmentation of urban environments: Leveraging U-Net deep learning model for cityscape image analysis",
    "authors": "Arulananth TS, Kuppusamy PG, Ayyasamy RK, Alhashmi SM, Mahalakshmi M, K. Vasanth, P. Chinnasamy",
    "venue": "PLOS ONE 19(4): e0300767",
    "year": "2024",
    "link": "https://doi.org/10.1371/journal.pone.0300767",
    "indexing": "SCIE (Q1, IF: 3.752)",
    "category": "Deep Learning",
    "type": "Journal",
    "abstract": "Applies customized U-Net convolutional neural networks for pixel-level semantic segmentation of autonomous vehicle urban scenes."
  },
  {
    "id": "sci-12",
    "title": "Integrating Intelligent Breach Detection System Into 6g Enabled Smart Grid-Based Cyber Physical Systems",
    "authors": "P. Chinnasamy, Rafath Samrin, B. Ben Sujitha, R. Augasthega, Manikandan Rajagopal, A. Nageswaran",
    "venue": "Wireless Personal Communications",
    "year": "2024",
    "link": "https://doi.org/10.1007/s11277-024-11192-2",
    "indexing": "SCIE (Q2, IF: 2.2)",
    "category": "Cybersecurity",
    "type": "Journal",
    "abstract": "Designs an intelligent breach detection framework safeguarding 6G-enabled smart grid cyber-physical infrastructures."
  },
  {
    "id": "sci-13",
    "title": "Blockchain 6G-Based Wireless Network Security Management with Optimization Using Machine Learning Techniques",
    "authors": "Chinnasamy P, Babu GC, Ayyasamy RK, Amutha S, Sinha K, Balaram A",
    "venue": "Sensors, 24(18):6143",
    "year": "2024",
    "link": "https://doi.org/10.3390/s24186143",
    "indexing": "SCIE (Q1, IF: 3.4)",
    "category": "Blockchain",
    "type": "Journal",
    "abstract": "Combines ML optimization algorithms with blockchain ledgers to manage security protocols across next-gen 6G wireless networks."
  },
  {
    "id": "sci-14",
    "title": "Towards enhanced assessment question classification: a study using machine learning, deep learning, and generative AI",
    "authors": "Gani, M. O., Ayyasamy, R. K., Alhashmi, S. M., Alam, K. S., Sangodiah, A., Khaleduzzman, K., & Ponnusamy, C.",
    "venue": "Connection Science, 37(1)",
    "year": "2025",
    "link": "https://doi.org/10.1080/09540091.2024.2445249",
    "indexing": "SCIE (Q2, IF: 3.2)",
    "category": "AI",
    "type": "Journal",
    "abstract": "Evaluates generative AI, transformer networks, and ML classifiers for automated educational assessment item categorization."
  },
  {
    "id": "sci-15",
    "title": "Wireless mmWave Communication in 5G Network Slicing with Routing Model Based on IoT and Deep Learning Model",
    "authors": "R. Suganya, L. Sujithra, Ramesh Kumar Ayyasamy, P. Chinnasamy",
    "venue": "Transactions on Emerging Telecommunications Technologies, 36: e70071",
    "year": "2025",
    "link": "https://doi.org/10.1002/ett.70071",
    "indexing": "SCIE (Q1, IF: 2.5)",
    "category": "Deep Learning",
    "type": "Journal",
    "abstract": "Proposes an IoT and deep learning-based routing model for mmWave communication optimization in 5G network slicing."
  },
  {
    "id": "sci-16",
    "title": "QuantumBlock Health Records: Enhancing Healthcare Data Security with Quantum Cryptography and Blockchain Technology",
    "authors": "P. Chinnasamy, Logeshwari Dhavamani, Rameshkumar Ayyasamy, B. Santhosh Kumar, Ajmeera Kiran",
    "venue": "Cluster Computing, 28, 474",
    "year": "2025",
    "link": "https://doi.org/10.1007/s10586-025-05101-w",
    "indexing": "SCIE (Q1, IF: 4.1)",
    "category": "Blockchain",
    "type": "Journal",
    "abstract": "Integrates post-quantum cryptographic primitives with distributed ledger networks to secure sensitive electronic health record exchange."
  },
  {
    "id": "sci-17",
    "title": "Blockchain based electronic educational document management with role-based access control using machine learning model",
    "authors": "Chinnasamy, P., Subashini, B., Ayyasamy, R.K. et al.",
    "venue": "Scientific Reports 15, 18828",
    "year": "2025",
    "link": "https://doi.org/10.1038/s41598-025-99683-5",
    "indexing": "SCIE (Q1, IF: 3.8)",
    "category": "Blockchain",
    "type": "Journal",
    "abstract": "Automates credential validation and verification for academic degrees using ML-assisted role-based access control."
  },
  {
    "id": "sci-18",
    "title": "Machine Learning Approach for Securing Autonomous Vehicle Applications in Urban Networks",
    "authors": "Chinnasamy, P., Javid Ali, L., Qamar, S., Manikandan, G., Arumugam, M., & Hariharasitaraman, S.",
    "venue": "IETE Journal of Research, 1–12",
    "year": "2025",
    "link": "https://doi.org/10.1080/03772063.2025.2504091",
    "indexing": "SCIE (Q2, IF: 1.3)",
    "category": "Machine Learning",
    "type": "Journal",
    "abstract": "Develops machine learning algorithms to protect connected autonomous vehicle telemetry and V2X communications against cyber attacks."
  },
  {
    "id": "sci-19",
    "title": "Optimization enabled ResNet features with transfer learning for Alzheimer’s Disease Detection",
    "authors": "Deepthi K Moorthy, P Chinnasamy, P Nagaraj",
    "venue": "Computational Biology and Chemistry, 108613",
    "year": "2025",
    "link": "https://doi.org/10.1016/j.compbiolchem.2025.108613",
    "indexing": "SCIE (Q2, IF: 3.1)",
    "category": "Deep Learning",
    "type": "Journal",
    "abstract": "Combines metaheuristic feature selection with transfer-learned ResNet architectures for early stage Alzheimer's disease diagnosis."
  },
  {
    "id": "sci-20",
    "title": "AI-Driven intrusion detection and prevention systems to safeguard 6G networks from cyber threats",
    "authors": "P Chinnasamy, Yarramsetti, S., Ayyasamy, R.K. et al.",
    "venue": "Scientific Reports, 15, 37901",
    "year": "2025",
    "link": "https://doi.org/10.1038/s41598-025-21648-5",
    "indexing": "SCIE (Q1, IF: 3.8)",
    "category": "Cybersecurity",
    "type": "Journal",
    "abstract": "Formulates real-time AI intrusion detection models capable of processing high-throughput 6G network traffic telemetry."
  },
  {
    "id": "sci-21",
    "title": "Online suicide ideation detection (OnSIDe): a context-aware transfer learning approach using BERT-CNN",
    "authors": "Balakrishnan V, Loganathamoorthy D, Kumar Ayyasamy R, Alhashmi SM, P Chinnasamy",
    "venue": "PeerJ Computer Science 11:e3239",
    "year": "2025",
    "link": "https://doi.org/10.7717/peerj-cs.3239",
    "indexing": "SCIE (Q1, IF: 2.5)",
    "category": "AI",
    "type": "Journal",
    "abstract": "Presents context-aware BERT-CNN hybrid models for detecting suicide ideation signals across online social media platforms."
  },
  {
    "id": "sci-22",
    "title": "Optimal NAS-MoE: optimized NASNet and MoE model for lung adenocarcinoma classification with explainable AI",
    "authors": "G. Geethu Lakshmi, P Chinnasamy, P. Nagaraj",
    "venue": "Biomedical Signal Processing and Control, Volume 113, Part C, 109128",
    "year": "2026",
    "link": "https://doi.org/10.1016/j.bspc.2025.109128",
    "indexing": "SCIE (Q1, IF: 4.9)",
    "category": "AI",
    "type": "Journal",
    "abstract": "Deploys Neural Architecture Search with Mixture-of-Experts (NAS-MoE) and XAI heatmaps for precision lung adenocarcinoma diagnosis."
  },
  {
    "id": "sci-23",
    "title": "A hybrid deep learning framework for fake news detection using LSTM-CGPNN and metaheuristic optimization",
    "authors": "Ayyasamy, R.K., P Chinnasamy, Bhargavi, K.N. et al.",
    "venue": "Scientific Reports 15, 41522",
    "year": "2025",
    "link": "https://doi.org/10.1038/s41598-025-25311-x",
    "indexing": "SCIE (Q1, IF: 3.8)",
    "category": "Machine Learning",
    "type": "Journal",
    "abstract": "Proposes an LSTM-CGPNN hybrid model paired with metaheuristic optimization for identifying misinformation across online networks."
  },
  {
    "id": "sci-24",
    "title": "Optical communication network signal analysis and cyber security modelling by frequency modulation with machine learning algorithm",
    "authors": "Ayyasamy, R.K., Prasad, B., Ponnusamy, C. et al.",
    "venue": "Scientific Reports",
    "year": "2026",
    "link": "https://doi.org/10.1038/s41598-026-56831-9",
    "indexing": "SCIE (Q1, IF: 3.8)",
    "category": "Cybersecurity",
    "type": "Journal",
    "abstract": "Models frequency modulation telemetry for optical signal analysis and cyber security intrusion prevention using machine learning."
  },
  {
    "id": "scop-1",
    "title": "A Survey on Blockchain Technology: A Steps towards Sustainable Development",
    "authors": "P.Chinnasamy, P.Deepalakshmi",
    "venue": "International Journal of Innovative Technology and Exploring Engineering (IJITEE), Vol.9, No. 2S2",
    "year": "2019",
    "link": "http://dx.doi.org/10.35940/ijitee.B1109.1292S219",
    "indexing": "Scopus Indexed",
    "category": "Blockchain",
    "type": "Journal",
    "abstract": "A comprehensive review of blockchain technology paradigms and decentralization steps supporting sustainable smart applications."
  },
  {
    "id": "scop-2",
    "title": "Real-Time Demand Response Control for Smart Grid based on User Preference",
    "authors": "V.Praveena, P.Chinnasamy, P.Deepalakshmi",
    "venue": "International Journal of Advanced Science and Technology, Vol. 29, No. 9s, pp.3184-3192",
    "year": "2020",
    "indexing": "Scopus Indexed",
    "category": "IoT",
    "type": "Journal",
    "abstract": "Formulates intelligent demand response management algorithms for smart grid energy optimization according to real-time user preferences."
  },
  {
    "id": "scop-3",
    "title": "A Trusted-Role based Access Control Model for Secure Cloud Storage",
    "authors": "P.Chinnasamy, A.Ganesan, V.Prasathkumar, V.Praveena",
    "venue": "International Journal of Advanced Science and Technology, Vol. 29, No. 9s, pp.3253-3259",
    "year": "2020",
    "indexing": "Scopus Indexed",
    "category": "Access Control",
    "type": "Journal",
    "abstract": "Proposes a trusted-role based access control mechanism for cloud storage repositories providing role-based security enforcement."
  },
  {
    "id": "scop-4",
    "title": "Software Defined Network with QoS",
    "authors": "M.Maragatharajan, M.Dhillipkumar, S. Kailasam, P.Chinnasamy",
    "venue": "International Journal of Advanced Science and Technology, Vol. 29, No. 9s, pp.6816-6822",
    "year": "2020",
    "indexing": "Scopus Indexed",
    "category": "Cloud Security",
    "type": "Journal",
    "abstract": "Implements Quality-of-Service flow management algorithms for Software Defined Networks across enterprise cloud topologies."
  },
  {
    "id": "scop-5",
    "title": "Detection and Categorization of Plant Leaf Diseases using Neural Networks",
    "authors": "V.Praveena, P.Chinnasamy, P.Muneeshwari, R.Anantha Kumar, B.Ben Sujitha",
    "venue": "European Journal of Molecular & Clinical Medicine, Vol.7, No.4, pp. 2438-2445",
    "year": "2020",
    "indexing": "Scopus Indexed",
    "category": "Deep Learning",
    "type": "Journal",
    "abstract": "Deploys convolutional neural networks for early diagnosis and classification of agricultural plant leaf pathologies."
  },
  {
    "id": "scop-6",
    "title": "Blockchain based Access Control and Data Sharing Systems for Smart Devices",
    "authors": "P.Chinnasamy, B Vinodhini, V Praveena, C Vinothini, B Ben Sujitha",
    "venue": "Journal of Physics: Conference Series (ICDIIS '20), Vol. 1767, pp. 012056",
    "year": "2020",
    "link": "https://doi.org/10.1088/1742-6596/1767/1/012056",
    "indexing": "Scopus Indexed",
    "category": "Blockchain",
    "type": "Conference",
    "abstract": "Integrates blockchain smart contracts with IoT device authorization for secure peer-to-peer data sharing."
  },
  {
    "id": "scop-7",
    "title": "Secure Smart Green House Farming using Blockchain Technology",
    "authors": "P.Chinnasamy, R.Geetha, S.Geetha, S.P.Balakannan, K.Ramprathap, V.Praveena",
    "venue": "Turkish Journal of Computer and Mathematics Education, Vol.12, No.6, pp. 2858-2865",
    "year": "2021",
    "link": "https://doi.org/10.17762/turcomat.v12i6.5793",
    "indexing": "Scopus Indexed",
    "category": "Blockchain",
    "type": "Journal",
    "abstract": "Implements distributed blockchain telemetry tracking for automated green house IoT agricultural management."
  },
  {
    "id": "scop-8",
    "title": "COVID-19 Vaccine Sentiment Analysis using Public Opinions on Twitter",
    "authors": "P.Chinnasamy, V.Suresh, K.Ramprathap, B.Jency A Jebamani, K.Srinivas Rao, M.Shiva Kranthi",
    "venue": "Materials Today: Proceedings",
    "year": "2022",
    "link": "https://doi.org/10.1016/j.matpr.2022.04.809",
    "indexing": "Scopus Indexed",
    "category": "Machine Learning",
    "type": "Journal",
    "abstract": "Applies natural language processing and sentiment classification to analyze public perception of COVID-19 vaccination drives."
  },
  {
    "id": "scop-9",
    "title": "Machine Learning Based Cardiovascular Disease Prediction",
    "authors": "P.Chinnasamy, S. Arun Kumar, V. Navya, Lakshmi Priya, Bolludu Shuruthi",
    "venue": "Materials Today: Proceedings",
    "year": "2022",
    "link": "https://doi.org/10.1016/j.matpr.2022.04.907",
    "indexing": "Scopus Indexed",
    "category": "Machine Learning",
    "type": "Journal",
    "abstract": "Evaluates ensemble machine learning classifiers for clinical risk scoring and early detection of cardiovascular diseases."
  },
  {
    "id": "scop-10",
    "title": "Artificial Intelligence based Smart Bus Tracking and Bus Stop Alert System for Passengers",
    "authors": "P.Chinnasamy, B.Dhanalakshmi, V.Praveena, T.Raghunathan, A. Allwyn Sundarraj, Gopika Venu",
    "venue": "AIP Conference Proceedings",
    "year": "2023",
    "indexing": "Scopus Indexed",
    "category": "AI",
    "type": "Conference",
    "abstract": "Deploys GPS telemetry and AI prediction modules for real-time urban transit bus tracking and passenger arrival alerts."
  },
  {
    "id": "scop-11",
    "title": "AApexChain: A Decentralized Pseudonymous Smart Contracts based Applications in Digital Currency",
    "authors": "T.S.RajaRajeswari, P.Chinnasamy, K.B.Sri Sathya, S. Fowjiya, N.Saranya, M. Maragatharajan",
    "venue": "AIP Conference Proceedings",
    "year": "2023",
    "indexing": "Scopus Indexed",
    "category": "Blockchain",
    "type": "Conference",
    "abstract": "Designs AApexChain pseudonymous smart contracts for privacy-preserving digital currency transactions."
  },
  {
    "id": "scop-12",
    "title": "Predictive Analysis of BigMart Sales using Machine Learning Algorithms",
    "authors": "P.Chinnasamy, B. Jency A Jebamani, N.Kumareshan, V. Prasathkumar, S.Dhanasekaran",
    "venue": "AIP Conference Proceedings",
    "year": "2023",
    "indexing": "Scopus Indexed",
    "category": "Machine Learning",
    "type": "Conference",
    "abstract": "Applies machine learning forecasting algorithms for retail sales prediction and inventory demand optimization."
  },
  {
    "id": "scop-13",
    "title": "Securing sensitive health data: A creative solution for personal health record protection in cloud environment using attribute-based access control",
    "authors": "P. Chinnasamy, P. Siva Padmini, Sreenivasulu Gogula, K. Ramprathap, N. Kumareshan, Manjunathan Alagarsamy",
    "venue": "AIP Conf. Proc. 3300 (1): 020100",
    "year": "2025",
    "link": "https://doi.org/10.1063/5.0277372",
    "indexing": "Scopus Indexed",
    "category": "Access Control",
    "type": "Conference",
    "abstract": "Formulates attribute-based encryption mechanisms safeguarding personal health records stored in multi-tenant cloud storage."
  },
  {
    "id": "scop-14",
    "title": "Exploring the fusion of cryptography methods for enhanced security in healthcare record management on the cloud",
    "authors": "P. Chinnasamy, Likha Chandran, Sreenivasulu Gogula, N. Kumareshan, J. Sathiamoorthy, Manjunathan Alagarsamy",
    "venue": "AIP Conf. Proc. 3300 (1): 020117",
    "year": "2025",
    "link": "https://doi.org/10.1063/5.0277709",
    "indexing": "Scopus Indexed",
    "category": "Cryptography",
    "type": "Conference",
    "abstract": "Explores hybrid cryptographic primitives combining symmetric and asymmetric encryption for electronic health record repositories."
  },
  {
    "id": "scop-15",
    "title": "A deep learning framework based on modified convolutional neural network for content based image retrieval using elasticsearch integration",
    "authors": "P. Chinnasamy, Maloth Ramesh Naik, Ramesh Kumar Ayyasamy, Likha Chandran, Ajmeera Kiran, Manjunathan Alagarsamy",
    "venue": "AIP Conf. Proc. 3300 (1): 020197",
    "year": "2025",
    "link": "https://doi.org/10.1063/5.0277377",
    "indexing": "Scopus Indexed",
    "category": "Deep Learning",
    "type": "Conference",
    "abstract": "Integrates custom CNN feature extractors with Elasticsearch indices for rapid content-based visual information retrieval."
  },
  {
    "id": "scop-16",
    "title": "BlockCertify: On the design and implementation of a secure verification and validation of educational certificates using blockchain technology",
    "authors": "P. Chinnasamy, Vishal Dhatrika, Srikanth Bhyrapuneni, Ajmeera Kiran, B. Anandkumar, Raja Manikandan",
    "venue": "AIP Conf. Proc. 3300 (1): 020146",
    "year": "2025",
    "link": "https://doi.org/10.1063/5.0277375",
    "indexing": "Scopus Indexed",
    "category": "Blockchain",
    "type": "Conference",
    "abstract": "Deploys BlockCertify smart contracts for tampered-proof academic certificate issuance, validation, and anti-fraud verification."
  },
  {
    "id": "scop-17",
    "title": "Evolution of advanced manufacturing technologies: Impact on industry 4.0 and beyond",
    "authors": "P. Michael Preetam Raj, Sravan K. Vittapu, Manu Gupta, P. Chinnasamy, Priyanka B. Ganganaik, Pranjali Gajbhiye",
    "venue": "AIP Conf. Proc. 3342 (1): 020024",
    "year": "2025",
    "link": "https://doi.org/10.1063/5.0297990",
    "indexing": "Scopus Indexed",
    "category": "IoT",
    "type": "Conference",
    "abstract": "Analyzes smart factory automation and cyber-physical systems integration driving Industry 4.0 transformation."
  },
  {
    "id": "bc-1",
    "title": "Improved Key Generation Scheme of RSA (IKGSR) Algorithm Based on Offline Storage for Cloud",
    "authors": "Chinnasamy P, Deepalakshmi P.",
    "venue": "Advances in Big Data and Cloud Computing, AISC, vol 645. Springer",
    "year": "2018",
    "link": "https://doi.org/10.1007/978-981-10-7200-0_31",
    "indexing": "Scopus / Springer",
    "category": "Cryptography",
    "type": "Book Chapter",
    "abstract": "Proposes an improved RSA key generation scheme utilizing offline key storage to mitigate cloud side-channel key leakage."
  },
  {
    "id": "bc-2",
    "title": "Access Control Mechanisms for Electronic Health Records in Cloud Environment",
    "authors": "P. Chinnasamy, P. Deepalakshmi",
    "venue": "Intelligent Data Security Solutions for e-Health Applications, pp-113-130, Elsevier",
    "year": "2020",
    "link": "https://doi.org/10.1016/B978-0-12-819511-6.00006-6",
    "indexing": "Scopus / Elsevier",
    "category": "Access Control",
    "type": "Book Chapter",
    "abstract": "Systematic monograph analyzing fine-grained authorization models for sensitive patient medical data across cloud storage infrastructures."
  },
  {
    "id": "bc-3",
    "title": "Efficient Data Security Using Hybrid Cryptography on Cloud Computing",
    "authors": "P. Chinnasamy, S. Padmavathi, R. Swathy, S. Rakesh",
    "venue": "Lecture Notes in Networks and Systems, vol 145. Springer",
    "year": "2020",
    "link": "https://doi.org/10.1007/978-981-15-7345-3_46",
    "indexing": "Scopus / Springer",
    "category": "Cryptography",
    "type": "Book Chapter",
    "abstract": "Presents a hybrid cryptographic pipeline integrating symmetric AES ciphers with RSA asymmetric key distribution for cloud storage."
  },
  {
    "id": "bc-4",
    "title": "Secure and Efficient data sharing scheme in cloud for protecting data in smart cities",
    "authors": "P. Chinnasamy, V. Praveena",
    "venue": "Advanced Control for Smart Cities: An Industry 4.0 Perspective, Springer",
    "year": "2020",
    "link": "https://doi.org/10.1007/978-3-030-48539-9_4",
    "indexing": "Scopus / Springer",
    "category": "Cloud Security",
    "type": "Book Chapter",
    "abstract": "Formulates privacy-preserving cloud data sharing protocols for sensor streams in smart municipal environments."
  },
  {
    "id": "bc-5",
    "title": "Blockchain Technologies in Smart-Cities",
    "authors": "P. Chinnasamy, C. Vinothini, S. ArunKumar, S. AllwynSundarraj, S.V. AnnlinJeba, V. Praveena",
    "venue": "Blockchain Technologies and its Applications, ISRL, vol 203. Springer",
    "year": "2021",
    "link": "https://doi.org/10.1007/978-3-030-69395-4_11",
    "indexing": "Scopus / Springer",
    "category": "Blockchain",
    "type": "Book Chapter",
    "abstract": "Explores decentralized ledger implementations for municipal data verification, smart grid accounting, and public service records."
  },
  {
    "id": "bc-6",
    "title": "Data Security and Privacy Requirements in Edge Computing: A Systematic Review",
    "authors": "P. Chinnasamy, D. Rojaramni, V. Praveena, S.V. AnnlinJeba, B. Bensujin",
    "venue": "Cases on Edge Computing and Analytics, IGI Global",
    "year": "2021",
    "link": "https://doi.org/10.4018/978-1-7998-4873-8.ch009",
    "indexing": "Scopus / IGI Global",
    "category": "Cloud Security",
    "type": "Book Chapter",
    "abstract": "Comprehensive investigation of threat vectors, edge node privacy requirements, and lightweight cryptographic countermeasures."
  },
  {
    "id": "bc-7",
    "title": "Deep Learning: Algorithms, Techniques, and Applications — A Systematic Survey",
    "authors": "Chinnasamy, P., Sathya, K. B., Jebamani, B. J., Nithyasri, A., & Fowjiya, S.",
    "venue": "Deep Learning Research Applications for Natural Language Processing (pp. 1-17), IGI Global",
    "year": "2023",
    "link": "https://doi.org/10.4018/978-1-6684-6001-6.ch001",
    "indexing": "Scopus / IGI Global",
    "category": "Deep Learning",
    "type": "Book Chapter",
    "abstract": "Surveys deep learning model taxonomies, optimization loss functions, and NLP transformers across domain applications."
  },
  {
    "id": "bc-8",
    "title": "E-Voting System Using Blockchain",
    "authors": "Raja Rajeswari, T.S., Khajashareef, S.K., Sandhya, N., Chinnasamy, P.",
    "venue": "Innovations in Signal Processing and Embedded Systems, AIS. Springer",
    "year": "2023",
    "link": "https://doi.org/10.1007/978-981-19-1669-4_1",
    "indexing": "Web of Science / Springer",
    "category": "Blockchain",
    "type": "Book Chapter",
    "abstract": "Designs an immutable, zero-knowledge e-voting framework preventing voter fraud and tally manipulation."
  },
  {
    "id": "bc-9",
    "title": "Transforming Education With AI-Driven Intelligent Tutoring Systems",
    "authors": "Chinnasamy, P., Rani, R. M., Ayyasamy, R. K., Sujithra, L. R., Mounika, T., & Cherukuvada, S.",
    "venue": "Driving Quality Education Through AI and Data Science (pp. 239-258). IGI Global",
    "year": "2025",
    "link": "https://doi.org/10.4018/979-8-3693-8292-9.ch011",
    "indexing": "Scopus / IGI Global",
    "category": "AI",
    "type": "Book Chapter",
    "abstract": "Explores cognitive adaptive learning engines and intelligent tutoring models personalizing academic curricula."
  },
  {
    "id": "bc-10",
    "title": "Design and Implementation of News Collection System using Machine Learning Algorithms",
    "authors": "P. Chinnasamy, E. Anupriya, V. Suresh, I. Gugan, N. Saranya, T.S. Arulananth",
    "venue": "Advancements in Science and Technology for Healthcare, Agriculture, and Environmental Sustainability, CRC Press",
    "year": "2024",
    "link": "http://dx.doi.org/10.1201/9781032708348-80",
    "indexing": "Scopus / CRC Press",
    "category": "Machine Learning",
    "type": "Book Chapter",
    "abstract": "Builds web scraping and machine learning classification algorithms for real-time news aggregation and topic modeling."
  },
  {
    "id": "bc-11",
    "title": "Real Time Vehicle Detection and Counting for Traffic Management Applications",
    "authors": "P. Chinnasamy, S.P. Kavya, B. Jency A Jebamani, P. Purushotham, S.V. Annlin Jeba",
    "venue": "Advancements in Science and Technology for Healthcare, Agriculture, and Environmental Sustainability, CRC Press",
    "year": "2024",
    "link": "http://dx.doi.org/10.1201/9781032708348-81",
    "indexing": "Scopus / CRC Press",
    "category": "Deep Learning",
    "type": "Book Chapter",
    "abstract": "Applies computer vision YOLO detection models for real-time urban vehicle tracking and traffic density estimation."
  },
  {
    "id": "bc-12",
    "title": "Secured certificate generation using LSB and hybrid watermarking using MATLAB",
    "authors": "T. S. Arulananth, S. Jayanthi, P. Sudha Kiran, P. Chinnasamy, S. Kavitha, K. Saravanan",
    "venue": "Integrated Technologies in Electrical, Electronics and Biotechnology Engineering, CRC Press",
    "year": "2024",
    "link": "http://dx.doi.org/10.1201/9781003606208-10",
    "indexing": "Scopus / CRC Press",
    "category": "Cryptography",
    "type": "Book Chapter",
    "abstract": "Combines LSB steganography with hybrid digital watermarking for tamper-evident digital certificate generation."
  },
  {
    "id": "bc-13",
    "title": "An Approach for Lung Cancer Detection Using an Optimization-Enabled Squeeze-InceptionV3 Model",
    "authors": "Lakshmi, G.G., Nagaraj, P., P. Chinnasamy",
    "venue": "ICT Systems and Sustainability. ICT4SD 2025. LNNS, vol 1648. Springer",
    "year": "2026",
    "link": "https://doi.org/10.1007/978-3-032-06671-8_28",
    "indexing": "Scopus / Springer",
    "category": "Deep Learning",
    "type": "Book Chapter",
    "abstract": "Proposes an optimized Squeeze-InceptionV3 architecture for early lung cancer nodule identification on CT scans."
  },
  {
    "id": "bc-14",
    "title": "Enhancing Women’s Safety Through Cloud-Based AbhayaPradha System: A Technological Approach",
    "authors": "P. Chinnasamy, Kalaimagal, S., Ayyasamy, R.K., Raja Kumar, N., Krishnamoorthy, P., Chandran, L.",
    "venue": "Advancement in Cyber Security and Digital Forensics. ICACSDF 2025. LNNS, vol 1692. Springer",
    "year": "2026",
    "link": "https://doi.org/10.1007/978-981-95-3701-3_47",
    "indexing": "Scopus / Springer",
    "category": "Cloud Security",
    "type": "Book Chapter",
    "abstract": "Develops the cloud-backed AbhayaPradha emergency alert and location tracking framework for personal safety."
  },
  {
    "id": "bc-15",
    "title": "An Efficient Data Security on Cloud Environments Using an Enhanced Advanced Encryption Standard (EAES) Algorithm",
    "authors": "P. Chinnasamy, Reddy, P.D.K., Ayyasamy, R.K., Dhamayanthi, P., Harika, P.L., Degala, D.P.",
    "venue": "Advancement in Cyber Security and Digital Forensics. ICACSDF 2025. LNNS, vol 1692. Springer",
    "year": "2026",
    "link": "https://doi.org/10.1007/978-981-95-3701-3_50",
    "indexing": "Scopus / Springer",
    "category": "Cryptography",
    "type": "Book Chapter",
    "abstract": "Enhances AES block cipher S-box key substitution matrices for accelerated cloud data encryption with reduced computational latency."
  },
  {
    "id": "bc-16",
    "title": "Future Gazing: Harnessing LSTM Networks for Astute Stock Market",
    "authors": "Chinnasamy, P., Raza, M.T., Kumar, N., Yogi Reddy, M., Reddy, B.T.",
    "venue": "Smart Trends in Computing and Communications. SmartCom 2026. LNNS, vol 1994. Springer",
    "year": "2026",
    "link": "https://doi.org/10.1007/978-3-032-27160-0_16",
    "indexing": "Scopus / Springer",
    "category": "Deep Learning",
    "type": "Book Chapter",
    "abstract": "Formulates stacked LSTM networks for multi-step financial time series stock price forecasting."
  },
  {
    "id": "bc-17",
    "title": "Smart Plant Health and Care Assistant Using Machine Learning",
    "authors": "Chinnasamy, P., Kumar, S., Kumar, G., Kumar, R., Kumari, R.",
    "venue": "Smart Trends in Computing and Communications. SmartCom 2026. LNNS, vol 1993. Springer",
    "year": "2026",
    "link": "https://doi.org/10.1007/978-3-032-27157-0_19",
    "indexing": "Scopus / Springer",
    "category": "Machine Learning",
    "type": "Book Chapter",
    "abstract": "Deploys machine learning classification and IoT sensors for automated plant soil moisture and disease monitoring."
  },
  {
    "id": "bc-18",
    "title": "A Computer Vision Approach to Pneumonia Prediction Using Deep Learning",
    "authors": "Chinnasamy, P., Harshini, A.V.L., Meenakshi, Y., Thanu Sri, D., Kumar, P.N.",
    "venue": "Smart Trends in Computing and Communications. SmartCom 2026. LNNS, vol 1996. Springer",
    "year": "2026",
    "link": "https://doi.org/10.1007/978-3-032-27154-9_10",
    "indexing": "Scopus / Springer",
    "category": "Deep Learning",
    "type": "Book Chapter",
    "abstract": "Builds a computer vision deep learning model detecting pulmonary opacities and diagnosing pneumonia from chest X-rays."
  },
  {
    "id": "bc-19",
    "title": "Architectural Design and Implementation of INGRION: Innovating Financial Transactions through Blockchain Technology",
    "authors": "Chinnasamy, P., Kiransuryakumar, K., Shreyaas, S., Kirthick Balaji, S.S., Tirumala Naidu, G.",
    "venue": "Smart Trends in Computing and Communications. SmartCom 2026. LNNS, vol 2018. Springer",
    "year": "2026",
    "link": "https://doi.org/10.1007/978-3-032-28293-4_16",
    "indexing": "Scopus / Springer",
    "category": "Blockchain",
    "type": "Book Chapter",
    "abstract": "Architects the INGRION decentralized blockchain transaction ledger for high-concurrency financial settlements."
  },
  {
    "id": "bc-20",
    "title": "Skill Ladder—An Intelligent Career Development System Integrating Resume Analysis, Learning, and Job Management",
    "authors": "Chinnasamy, P., Sai, P.S.S.P., Reddy, N.H., Mahendra, M., Nagalinga, K.",
    "venue": "Smart Trends in Computing and Communications. SmartCom 2026. LNNS, vol 1960. Springer",
    "year": "2026",
    "link": "https://doi.org/10.1007/978-3-032-25483-2_8",
    "indexing": "Scopus / Springer",
    "category": "AI",
    "type": "Book Chapter",
    "abstract": "Presents Skill Ladder, an AI career development platform integrating NLP resume parsing with skill gap recommendation engines."
  },
  {
    "id": "ij-1",
    "title": "A Survey on Enhancing Cloud Security through Access Control Models and Technologies",
    "authors": "P. Chinnasamy, P. Deepalakshmi",
    "venue": "International Journal of Computer Science and Engineering, Vol. 9, No.05",
    "year": "2017",
    "indexing": "Google Scholar",
    "category": "Cloud Security",
    "type": "Journal",
    "abstract": "A survey of access control models, encryption schemes, and threat mitigation paradigms in cloud storage systems."
  },
  {
    "id": "conf-1",
    "title": "Design of Secure Storage for Health-care Cloud using Hybrid Cryptography",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICICCT 2018",
    "year": "2018",
    "link": "https://doi.org/10.1109/ICICCT.2018.8473107",
    "indexing": "IEEE / Scopus",
    "category": "Cryptography",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICICCT 2018 focusing on cryptography innovations."
  },
  {
    "id": "conf-2",
    "title": "Hybrid Cryptographic Technique Using OTP:RSA",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ITCOSP 2017",
    "year": "2017",
    "link": "https://doi.org/10.1109/ITCOSP.2017.8303131",
    "indexing": "IEEE / Scopus",
    "category": "Cryptography",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ITCOSP 2017 focusing on cryptography innovations."
  },
  {
    "id": "conf-3",
    "title": "Smart Health Predicting System Using K-Means Algorithm",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2020",
    "year": "2020",
    "link": "https://doi.org/10.1109/ICCCI48352.2020.9104206",
    "indexing": "IEEE / Scopus",
    "category": "Machine Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2020 focusing on machine learning innovations."
  },
  {
    "id": "conf-4",
    "title": "Providing Resilience on Cloud Computing",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2021",
    "year": "2021",
    "link": "https://doi.org/10.1109/ICCCI50826.2021.9402681",
    "indexing": "IEEE / Scopus",
    "category": "Cloud Security",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2021 focusing on cloud security innovations."
  },
  {
    "id": "conf-5",
    "title": "Smart Contract enabled Online Examination System Based in Blockchain Network",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2021",
    "year": "2021",
    "link": "https://doi.org/10.1109/ICCCI50826.2021.9402420",
    "indexing": "IEEE / Scopus",
    "category": "Blockchain",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2021 focusing on blockchain innovations."
  },
  {
    "id": "conf-6",
    "title": "Detection of Distributed Denial of Service Attacks in SDN using Machine learning techniques",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2021",
    "year": "2021",
    "link": "https://doi.org/10.1109/ICCCI50826.2021.9402517",
    "indexing": "IEEE / Scopus",
    "category": "Cybersecurity",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2021 focusing on cybersecurity innovations."
  },
  {
    "id": "conf-7",
    "title": "Detecting Fake News Using Machine Learning Algorithms",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2021",
    "year": "2021",
    "link": "https://doi.org/10.1109/ICCCI50826.2021.9402470",
    "indexing": "IEEE / Scopus",
    "category": "Machine Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2021 focusing on machine learning innovations."
  },
  {
    "id": "conf-8",
    "title": "Analysis of Intruder Detection in Big Data Analytics",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2021",
    "year": "2021",
    "link": "https://doi.org/10.1109/ICCCI50826.2021.9402402",
    "indexing": "IEEE / Scopus",
    "category": "Cybersecurity",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2021 focusing on cybersecurity innovations."
  },
  {
    "id": "conf-9",
    "title": "The Proficient Nano Remote Sensor Network Using Energy Preserving Routing Strategy",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2021",
    "year": "2021",
    "link": "https://doi.org/10.1109/ICCCI50826.2021.9402416",
    "indexing": "IEEE / Scopus",
    "category": "IoT",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2021 focusing on iot innovations."
  },
  {
    "id": "conf-10",
    "title": "Secure Data Storage Using Erasure Coding In Cloud Environment",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2021",
    "year": "2021",
    "link": "https://doi.org/10.1109/ICCCI50826.2021.9402639",
    "indexing": "IEEE / Scopus",
    "category": "Cloud Security",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2021 focusing on cloud security innovations."
  },
  {
    "id": "conf-11",
    "title": "Automatic Ontology Framework for Personal Health Service Using Semantic Web",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2021",
    "year": "2021",
    "link": "https://doi.org/10.1109/ICCCI50826.2021.9402366",
    "indexing": "IEEE / Scopus",
    "category": "Healthcare",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2021 focusing on healthcare innovations."
  },
  {
    "id": "conf-12",
    "title": "GAS LEVEL DETECTION AND AUTOMATIC BOOKING NOTIFICATION USING IOT",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2021",
    "year": "2021",
    "link": "https://doi.org/10.1109/ICCCI50826.2021.9402380",
    "indexing": "IEEE / Scopus",
    "category": "IoT",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2021 focusing on iot innovations."
  },
  {
    "id": "conf-13",
    "title": "An Automated Framework For Dynamic Web Information Retrieval Using Deep Learning",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2022",
    "year": "2022",
    "link": "https://doi.org/10.1109/ICCCI54379.2022.9741044",
    "indexing": "IEEE / Scopus",
    "category": "Deep Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2022 focusing on deep learning innovations."
  },
  {
    "id": "conf-14",
    "title": "Adaptive Intelligence System based on the Internet of Things for Patient Monitoring in Remote Area",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2022",
    "year": "2022",
    "link": "https://doi.org/10.1109/ICCCI54379.2022.9741062",
    "indexing": "IEEE / Scopus",
    "category": "Healthcare",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2022 focusing on healthcare innovations."
  },
  {
    "id": "conf-15",
    "title": "Plant Monitoring System Cum Smart Irrigation using Bolt IOT",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2022",
    "year": "2022",
    "link": "https://doi.org/10.1109/ICCCI54379.2022.9741003",
    "indexing": "IEEE / Scopus",
    "category": "IoT",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2022 focusing on iot innovations."
  },
  {
    "id": "conf-16",
    "title": "IoT Based Smart Notice Board for Smart Cities",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2022",
    "year": "2022",
    "link": "https://doi.org/10.1109/ICCCI54379.2022.9740884",
    "indexing": "IEEE / Scopus",
    "category": "IoT",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2022 focusing on iot innovations."
  },
  {
    "id": "conf-17",
    "title": "IoT based Smart Gardening for Smart Cities using Blockchain Technology",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2022",
    "year": "2022",
    "link": "https://doi.org/10.1109/ICCCI54379.2022.9741024",
    "indexing": "IEEE / Scopus",
    "category": "Blockchain",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2022 focusing on blockchain innovations."
  },
  {
    "id": "conf-18",
    "title": "An Approach to Detect COVID19 Disease from CT Scan Images using CNN- VGG16 Model",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2022",
    "year": "2022",
    "link": "https://doi.org/10.1109/ICCCI54379.2022.9741050",
    "indexing": "IEEE / Scopus",
    "category": "Deep Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2022 focusing on deep learning innovations."
  },
  {
    "id": "conf-19",
    "title": "Online Automobile Rental and E-Marketplace with Augmented Reality (AR)",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ASSIC 2022",
    "year": "2022",
    "link": "https://doi.org/10.1109/ASSIC55218.2022.10088370",
    "indexing": "IEEE / Scopus",
    "category": "AI",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ASSIC 2022 focusing on ai innovations."
  },
  {
    "id": "conf-20",
    "title": "Fraud Account Detection on Social Network using Machine Learning Techniques",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ASSIC 2022",
    "year": "2022",
    "link": "https://doi.org/10.1109/ASSIC55218.2022.10088336",
    "indexing": "IEEE / Scopus",
    "category": "Machine Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ASSIC 2022 focusing on machine learning innovations."
  },
  {
    "id": "conf-21",
    "title": "An Efficient Phishing Attack Detection using Machine Learning Algorithms",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ASSIC 2022",
    "year": "2022",
    "link": "https://doi.org/10.1109/ASSIC55218.2022.10088399",
    "indexing": "IEEE / Scopus",
    "category": "Cybersecurity",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ASSIC 2022 focusing on cybersecurity innovations."
  },
  {
    "id": "conf-22",
    "title": "Applications of Blockchain Technology in Modern Education System – Systematic Review",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2023",
    "year": "2023",
    "link": "https://doi.org/10.1109/ICCCI56745.2023.10128381",
    "indexing": "IEEE / Scopus",
    "category": "Blockchain",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2023 focusing on blockchain innovations."
  },
  {
    "id": "conf-23",
    "title": "BookChain: A Secure Library Book Storing and Sharing in Academic Institutions using Blockchain Technology",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2023",
    "year": "2023",
    "link": "https://doi.org/10.1109/ICCCI56745.2023.10128571",
    "indexing": "IEEE / Scopus",
    "category": "Blockchain",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2023 focusing on blockchain innovations."
  },
  {
    "id": "conf-24",
    "title": "E- Governance Services using Artificial Intelligence Techniques",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2023",
    "year": "2023",
    "link": "https://doi.org/10.1109/ICCCI56745.2023.10128646",
    "indexing": "IEEE / Scopus",
    "category": "AI",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2023 focusing on ai innovations."
  },
  {
    "id": "conf-25",
    "title": "BDDoS: BLOCKING DISTRIBUTED DENIAL OF SERVICE FLOODING ATTACKS WITH DYNAMIC PATH DETECTORS",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2023",
    "year": "2023",
    "link": "https://doi.org/10.1109/ICCCI56745.2023.10128499",
    "indexing": "IEEE / Scopus",
    "category": "Cybersecurity",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2023 focusing on cybersecurity innovations."
  },
  {
    "id": "conf-26",
    "title": "Banking Data Migration from On-Premise to Cloud",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2023",
    "year": "2023",
    "link": "https://doi.org/10.1109/ICCCI56745.2023.10128622",
    "indexing": "IEEE / Scopus",
    "category": "Cloud Security",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2023 focusing on cloud security innovations."
  },
  {
    "id": "conf-27",
    "title": "A Survey on Data Security using Reversible Cellular Automata",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2023",
    "year": "2023",
    "link": "https://doi.org/10.1109/ICCCI56745.2023.10128482",
    "indexing": "IEEE / Scopus",
    "category": "Cryptography",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2023 focusing on cryptography innovations."
  },
  {
    "id": "conf-28",
    "title": "Image Based Plant Disease Detection Model Using Convolution Neural Network",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2023",
    "year": "2023",
    "link": "https://doi.org/10.1109/ICCCI56745.2023.10128618",
    "indexing": "IEEE / Scopus",
    "category": "Deep Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2023 focusing on deep learning innovations."
  },
  {
    "id": "conf-29",
    "title": "Heart Diseases Prediction Using Machine Learning Algorithms",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2023",
    "year": "2023",
    "link": "https://doi.org/10.1109/ICCCI56745.2023.10128590",
    "indexing": "IEEE / Scopus",
    "category": "Machine Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2023 focusing on machine learning innovations."
  },
  {
    "id": "conf-30",
    "title": "The Role of ERINE Model in Analyzing Hotel Reviews using Chinese Sentiment Analysis",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2023",
    "year": "2023",
    "link": "https://doi.org/10.1109/ICCCI56745.2023.10128534",
    "indexing": "IEEE / Scopus",
    "category": "AI",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2023 focusing on ai innovations."
  },
  {
    "id": "conf-31",
    "title": "Industry 4.0 Digital Technologies and Information Systems: Implications for Manufacturing Firms Innovation Performance",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCCI 2023",
    "year": "2023",
    "link": "https://doi.org/10.1109/ICCCI56745.2023.10128638",
    "indexing": "IEEE / Scopus",
    "category": "IoT",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCCI 2023 focusing on iot innovations."
  },
  {
    "id": "conf-32",
    "title": "Plant Disease Prediction Using Convolutional Neural Networks",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE RMKMATE 2023",
    "year": "2023",
    "link": "https://doi.org/10.1109/RMKMATE59243.2023.10369533",
    "indexing": "IEEE / Scopus",
    "category": "Deep Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE RMKMATE 2023 focusing on deep learning innovations."
  },
  {
    "id": "conf-33",
    "title": "Design of Dynamic NOC based Multi-core Floating Point processing element FFT for VLSI Architecture",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICERCS 2023",
    "year": "2023",
    "link": "https://doi.org/10.1109/ICERCS57948.2023.10434193",
    "indexing": "IEEE / Scopus",
    "category": "AI",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICERCS 2023 focusing on ai innovations."
  },
  {
    "id": "conf-34",
    "title": "AI Enhanced Phishing Detection System",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE INCOS 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/INCOS59338.2024.10527485",
    "indexing": "IEEE / Scopus",
    "category": "Cybersecurity",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE INCOS 2024 focusing on cybersecurity innovations."
  },
  {
    "id": "conf-35",
    "title": "Ultrasonic Sensor for Blind People",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ASSIC 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/ASSIC60049.2024.10507971",
    "indexing": "IEEE / Scopus",
    "category": "IoT",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ASSIC 2024 focusing on iot innovations."
  },
  {
    "id": "conf-36",
    "title": "EDITH: Enhanced Disease Identification and Tracking Through Hybridization",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ASSIC 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/ASSIC60049.2024.10507917",
    "indexing": "IEEE / Scopus",
    "category": "Healthcare",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ASSIC 2024 focusing on healthcare innovations."
  },
  {
    "id": "conf-37",
    "title": "Analysis of Stock Market Values Using an Optimal Probability with KNN",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ASSIC 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/ASSIC60049.2024.10507959",
    "indexing": "IEEE / Scopus",
    "category": "Machine Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ASSIC 2024 focusing on machine learning innovations."
  },
  {
    "id": "conf-38",
    "title": "Comment Analyzer by Sentimental Analysis through Natural Language Processing",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCSP 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/ICCSP60870.2024.10544106",
    "indexing": "IEEE / Scopus",
    "category": "AI",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCSP 2024 focusing on ai innovations."
  },
  {
    "id": "conf-39",
    "title": "Blockchain Enabled Privacy-Preserved Secure e-voting System for Smart Cities",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICSTEM 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/ICSTEM61137.2024.10560826",
    "indexing": "IEEE / Scopus",
    "category": "Blockchain",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICSTEM 2024 focusing on blockchain innovations."
  },
  {
    "id": "conf-40",
    "title": "Blockchain Enabled Privacy-Preserved Supply-Chain Management for Tracing the Food Goods",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICSTEM 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/ICSTEM61137.2024.10560589",
    "indexing": "IEEE / Scopus",
    "category": "Blockchain",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICSTEM 2024 focusing on blockchain innovations."
  },
  {
    "id": "conf-41",
    "title": "Fake Social Media Profile Identification and Report Using Machine Learning",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE IConSCEPT 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/IConSCEPT61884.2024.10627774",
    "indexing": "IEEE / Scopus",
    "category": "Machine Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE IConSCEPT 2024 focusing on machine learning innovations."
  },
  {
    "id": "conf-42",
    "title": "The Future of Online Shopping: Blockchain-Powered E-Commerce Platforms",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE IConSCEPT 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/IConSCEPT61884.2024.10627920",
    "indexing": "IEEE / Scopus",
    "category": "Blockchain",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE IConSCEPT 2024 focusing on blockchain innovations."
  },
  {
    "id": "conf-43",
    "title": "IoT Based Alcohol Detection and Vehicle Control System",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICDICI 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/ICDICI62993.2024.10810851",
    "indexing": "IEEE / Scopus",
    "category": "IoT",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICDICI 2024 focusing on iot innovations."
  },
  {
    "id": "conf-44",
    "title": "Crop Optimization and Disease Detection using Satellite Imagery & Artificial Intelligence",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICoICI 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/ICoICI62503.2024.10696197",
    "indexing": "IEEE / Scopus",
    "category": "AI",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICoICI 2024 focusing on ai innovations."
  },
  {
    "id": "conf-45",
    "title": "Smart Drive Safe: Harnessing CNN for Enhanced Traffic Sign Recognition and Voice Alerts",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICESC 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/ICESC60852.2024.10690129",
    "indexing": "IEEE / Scopus",
    "category": "Deep Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICESC 2024 focusing on deep learning innovations."
  },
  {
    "id": "conf-46",
    "title": "Defending Against Digital Threats: Machine Learning Techniques for Cyber Persecution Detection",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE AiDAS 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/AiDAS63860.2024.10730176",
    "indexing": "IEEE / Scopus",
    "category": "Cybersecurity",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE AiDAS 2024 focusing on cybersecurity innovations."
  },
  {
    "id": "conf-47",
    "title": "Enhancing IoT Data Security: Integrating Elliptic Galois Cryptography with Matrix XOR Steganography and Adaptive Firefly Optimization",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE I-SMAC 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/I-SMAC61858.2024.10714687",
    "indexing": "IEEE / Scopus",
    "category": "Cryptography",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE I-SMAC 2024 focusing on cryptography innovations."
  },
  {
    "id": "conf-48",
    "title": "AI-Driven Assessment and Evaluation: Enhancing Sustainability in Educational Practices",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICACRS 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/ICACRS62842.2024.10841634",
    "indexing": "IEEE / Scopus",
    "category": "AI",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICACRS 2024 focusing on ai innovations."
  },
  {
    "id": "conf-49",
    "title": "Secure Student Record Management using Visual Cryptography in Educational Systems",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCES 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/ICCES63552.2024.10860025",
    "indexing": "IEEE / Scopus",
    "category": "Cryptography",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCES 2024 focusing on cryptography innovations."
  },
  {
    "id": "conf-50",
    "title": "Energy Conservation Using Piezo Electric Effect Through Modern Technology",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCES 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/ICCES63552.2024.10859986",
    "indexing": "IEEE / Scopus",
    "category": "IoT",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCES 2024 focusing on iot innovations."
  },
  {
    "id": "conf-51",
    "title": "Enhancing Healthcare Record Privacy Through the Integration of Visual Cryptography and Diverse Image Encryption Techniques",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCES 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/ICCES63552.2024.10859628",
    "indexing": "IEEE / Scopus",
    "category": "Cryptography",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCES 2024 focusing on cryptography innovations."
  },
  {
    "id": "conf-52",
    "title": "Hair Style Recommendations using CNN and AR",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCES 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/ICCES63552.2024.10859745",
    "indexing": "IEEE / Scopus",
    "category": "Deep Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCES 2024 focusing on deep learning innovations."
  },
  {
    "id": "conf-53",
    "title": "Industrial IoT Smart Manufacturing Systems based on Cloud Computing Energy Efficiency Analysis using Machine Learning Algorithms",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICEARS 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICEARS64219.2025.10940573",
    "indexing": "IEEE / Scopus",
    "category": "Machine Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICEARS 2025 focusing on machine learning innovations."
  },
  {
    "id": "conf-54",
    "title": "Blockchain Integration for Robust Intellectual Property Protection in New Product Development (NPD)",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICEARS 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICEARS64219.2025.10941076",
    "indexing": "IEEE / Scopus",
    "category": "Blockchain",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICEARS 2025 focusing on blockchain innovations."
  },
  {
    "id": "conf-55",
    "title": "GUARDTRACK: RFID and Wi-Fi based Smart Entry System",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICTMIM 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICTMIM65579.2025.10987920",
    "indexing": "IEEE / Scopus",
    "category": "IoT",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICTMIM 2025 focusing on iot innovations."
  },
  {
    "id": "conf-56",
    "title": "Design and Implementation of an IoT-based Emergency Alert and GPS Tracking System using MQTT and GSM/GPS Module",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICTMIM 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICTMIM65579.2025.10987939",
    "indexing": "IEEE / Scopus",
    "category": "IoT",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICTMIM 2025 focusing on iot innovations."
  },
  {
    "id": "conf-57",
    "title": "E-Buddy for Rescue Child Labour",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE BITCON 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/BITCON63716.2024.10985103",
    "indexing": "IEEE / Scopus",
    "category": "AI",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE BITCON 2024 focusing on ai innovations."
  },
  {
    "id": "conf-58",
    "title": "Software Based Self Determined Welfare Scheme",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE BITCON 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/BITCON63716.2024.10984593",
    "indexing": "IEEE / Scopus",
    "category": "AI",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE BITCON 2024 focusing on ai innovations."
  },
  {
    "id": "conf-59",
    "title": "Skin Cancer Classification using Machine Learning Techniques",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE BITCON 2024",
    "year": "2024",
    "link": "https://doi.org/10.1109/BITCON63716.2024.10985339",
    "indexing": "IEEE / Scopus",
    "category": "Machine Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE BITCON 2024 focusing on machine learning innovations."
  },
  {
    "id": "conf-60",
    "title": "Enhancing Diabetic Patient Care: Neural Network-Based Models for Readmission Prediction",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICICV 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICICV64824.2025.11085594",
    "indexing": "IEEE / Scopus",
    "category": "Deep Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICICV 2025 focusing on deep learning innovations."
  },
  {
    "id": "conf-61",
    "title": "Early Alzheimer’s Disease Stage Identification and Categorization Through Deep Learning",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICIRCA 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICIRCA65293.2025.11089745",
    "indexing": "IEEE / Scopus",
    "category": "Deep Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICIRCA 2025 focusing on deep learning innovations."
  },
  {
    "id": "conf-62",
    "title": "Managing Network Security in IT Sector using the Suricata",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICSSAS 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICSSAS66150.2025.11080990",
    "indexing": "IEEE / Scopus",
    "category": "Cybersecurity",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICSSAS 2025 focusing on cybersecurity innovations."
  },
  {
    "id": "conf-63",
    "title": "AI-Driven Predictive Resource Allocation for Disaster Response",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCRTEE 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICCRTEE64519.2025.11052926",
    "indexing": "IEEE / Scopus",
    "category": "AI",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCRTEE 2025 focusing on ai innovations."
  },
  {
    "id": "conf-64",
    "title": "Personalized AI Framework for Monitoring Pregnancy Nutrition and Diabetes Friendly Diet with Real Time Water Tracking",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCRTEE 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICCRTEE64519.2025.11053006",
    "indexing": "IEEE / Scopus",
    "category": "Healthcare",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCRTEE 2025 focusing on healthcare innovations."
  },
  {
    "id": "conf-65",
    "title": "Decentralized Data Validation for Ethical AI Training",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCRTEE 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICCRTEE64519.2025.11053001",
    "indexing": "IEEE / Scopus",
    "category": "Blockchain",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCRTEE 2025 focusing on blockchain innovations."
  },
  {
    "id": "conf-66",
    "title": "Accessible Thermal Night Vision Solutions to Protect Vulnerable Communities in Low-Visibility Conditions",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCRTEE 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICCRTEE64519.2025.11052955",
    "indexing": "IEEE / Scopus",
    "category": "AI",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCRTEE 2025 focusing on ai innovations."
  },
  {
    "id": "conf-67",
    "title": "Portable Live Sign Language Translator using Convolution Neural Network",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICCRTEE 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICCRTEE64519.2025.11052916",
    "indexing": "IEEE / Scopus",
    "category": "Deep Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICCRTEE 2025 focusing on deep learning innovations."
  },
  {
    "id": "conf-68",
    "title": "Detection of IoT Botnet Attacks using Hybrid Deep Learning Models",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICOECA 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICOECA66273.2025.00061",
    "indexing": "IEEE / Scopus",
    "category": "Cybersecurity",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICOECA 2025 focusing on cybersecurity innovations."
  },
  {
    "id": "conf-69",
    "title": "Optimizing Fraud Detection Performance with XGBoost Algorithm in Credit Card Transactions",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE InTech 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/InTech64186.2025.11198523",
    "indexing": "IEEE / Scopus",
    "category": "Machine Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE InTech 2025 focusing on machine learning innovations."
  },
  {
    "id": "conf-70",
    "title": "FinGuard — AI-Powered Credit Risk Assessment for the Underbanked using Machine Learning",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICFT 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICFT66708.2025.11336615",
    "indexing": "IEEE / Scopus",
    "category": "Machine Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICFT 2025 focusing on machine learning innovations."
  },
  {
    "id": "conf-71",
    "title": "Secure File Sharing in Modern Browsers: Implementing End-to-End Encryption and User Centric Access Control Mechanisms",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICICNIS 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICICNIS66685.2025.11315646",
    "indexing": "IEEE / Scopus",
    "category": "Cryptography",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICICNIS 2025 focusing on cryptography innovations."
  },
  {
    "id": "conf-72",
    "title": "AI–Driven Football Match Analysis using Deep Learning Algorithms",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICICNIS 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICICNIS66685.2025.11315517",
    "indexing": "IEEE / Scopus",
    "category": "Deep Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICICNIS 2025 focusing on deep learning innovations."
  },
  {
    "id": "conf-73",
    "title": "Enhancing Data Privacy in Healthcare Systems with Permissioned Blockchains",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE GITCON 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/GITCON65266.2025.11376718",
    "indexing": "IEEE / Scopus",
    "category": "Blockchain",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE GITCON 2025 focusing on blockchain innovations."
  },
  {
    "id": "conf-74",
    "title": "Mitigating DDoS Attacks in Cloud-Based Systems with Real-Time Detection Algorithms",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE GITCON 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/GITCON65266.2025.11378176",
    "indexing": "IEEE / Scopus",
    "category": "Cybersecurity",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE GITCON 2025 focusing on cybersecurity innovations."
  },
  {
    "id": "conf-75",
    "title": "Federated Learning for Privacy-Preserving AI Model Training",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE GITCON 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/GITCON65266.2025.11377081",
    "indexing": "IEEE / Scopus",
    "category": "AI",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE GITCON 2025 focusing on ai innovations."
  },
  {
    "id": "conf-76",
    "title": "Decentralized Identity Management Using Blockchain Technology",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE GITCON 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/GITCON65266.2025.11376642",
    "indexing": "IEEE / Scopus",
    "category": "Blockchain",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE GITCON 2025 focusing on blockchain innovations."
  },
  {
    "id": "conf-77",
    "title": "Reinforcement Learning for Real-Time Decision Making in Autonomous Systems",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE GITCON 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/GITCON65266.2025.11377057",
    "indexing": "IEEE / Scopus",
    "category": "AI",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE GITCON 2025 focusing on ai innovations."
  },
  {
    "id": "conf-78",
    "title": "Edge Computing for Real-Time Analytics in Embedded IoT Systems",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE GITCON 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/GITCON65266.2025.11377137",
    "indexing": "IEEE / Scopus",
    "category": "IoT",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE GITCON 2025 focusing on iot innovations."
  },
  {
    "id": "conf-79",
    "title": "Enhancing Cyber Attack Detection: A Comparative Analysis of Labeled and Unlabeled Data in Machine Learning Models",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICOIICS 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICOIICS67115.2025.11390522",
    "indexing": "IEEE / Scopus",
    "category": "Cybersecurity",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICOIICS 2025 focusing on cybersecurity innovations."
  },
  {
    "id": "conf-80",
    "title": "Intelligent Question Paper Generation System for Academic Assessments",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE AI Summit 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/AISummit66170.2025.11411597",
    "indexing": "IEEE / Scopus",
    "category": "AI",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE AI Summit 2025 focusing on ai innovations."
  },
  {
    "id": "conf-81",
    "title": "A Cognitive AI-Based Personalized Learning Environment for Data Structures and Algorithms",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICMCSI 2026",
    "year": "2026",
    "link": "https://doi.org/10.1109/ICMCSI67283.2026.11412591",
    "indexing": "IEEE / Scopus",
    "category": "AI",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICMCSI 2026 focusing on ai innovations."
  },
  {
    "id": "conf-82",
    "title": "AI-MultiFactor Authentication System with Live QRCode Scanning and Facial Liveness Detection",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICMCSI 2026",
    "year": "2026",
    "link": "https://doi.org/10.1109/ICMCSI67283.2026.11412908",
    "indexing": "IEEE / Scopus",
    "category": "Cybersecurity",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICMCSI 2026 focusing on cybersecurity innovations."
  },
  {
    "id": "conf-83",
    "title": "Medi-Chain: Blockchain Based Framework for Drug Tracking and Authentication System",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICMCSI 2026",
    "year": "2026",
    "link": "https://doi.org/10.1109/ICMCSI67283.2026.11412543",
    "indexing": "IEEE / Scopus",
    "category": "Blockchain",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICMCSI 2026 focusing on blockchain innovations."
  },
  {
    "id": "conf-84",
    "title": "Drug-Drug Interaction Prediction System Using Machine Learning Algorithms",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICINVENTS 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICINVENTS64613.2025.11401659",
    "indexing": "IEEE / Scopus",
    "category": "Machine Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICINVENTS 2025 focusing on machine learning innovations."
  },
  {
    "id": "conf-85",
    "title": "Diagnosing Chronic Kidney Disease Using Hybrid Deep Learning Techniques and Algorithms",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICINVENTS 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICINVENTS64613.2025.11402335",
    "indexing": "IEEE / Scopus",
    "category": "Deep Learning",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICINVENTS 2025 focusing on deep learning innovations."
  },
  {
    "id": "conf-86",
    "title": "Comparative Analysis of Polymorphic Malware Detection Methods in Modern Cybersecurity",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICAUC 2026",
    "year": "2026",
    "link": "https://doi.org/10.1109/ICAUC68182.2026.11441025",
    "indexing": "IEEE / Scopus",
    "category": "Cybersecurity",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICAUC 2026 focusing on cybersecurity innovations."
  },
  {
    "id": "conf-87",
    "title": "Enhancing Cryptographic Key Generation and Intrusion Detection using Machine Learning",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICAFT 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICAFT66710.2025.11452960",
    "indexing": "IEEE / Scopus",
    "category": "Cryptography",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICAFT 2025 focusing on cryptography innovations."
  },
  {
    "id": "conf-88",
    "title": "DeepCrypt: A Hybrid Framework for Secure Image using CNN and AES",
    "authors": "P. Chinnasamy et al.",
    "venue": "IEEE ICAFT 2025",
    "year": "2025",
    "link": "https://doi.org/10.1109/ICAFT66710.2025.11452724",
    "indexing": "IEEE / Scopus",
    "category": "Cryptography",
    "type": "Conference",
    "abstract": "Peer-reviewed paper presented at IEEE ICAFT 2025 focusing on cryptography innovations."
  }
],

  patents: [
  {
    "id": "pat-1",
    "type": "Granted Patent",
    "title": "Using Wearable Device and Voice Analysis to Track Mental Health",
    "authority": "Australian Patent Office",
    "appNo": "2020100616",
    "year": "2020",
    "status": "Granted",
    "authors": "P.Deepalakshmi, K.MuthamilSudar, P.Nagaraj, S.Geetha, Y.Swathy, P.Chinnasamy"
  },
  {
    "id": "pat-2",
    "type": "Design Patent",
    "title": "Smart Solar Weather Monitoring for Farmland",
    "authority": "Indian Patent Office",
    "appNo": "434301001",
    "year": "2025",
    "status": "Registered Design",
    "authors": "Dr. Dhiyanesh B, Dr. Dayana R, Ms. Shermy R P, Dr G Augusta Kani, Ms. Jayashree V, Dr. Jayakumar.M, Dr.P.Chinnasamy, Dr.B.Balakriuthiga, Keshav Sinha, Dr. C.Siva Krishnaiah"
  },
  {
    "id": "pat-3",
    "type": "Published / Filed Innovation",
    "title": "Automated Security Threat Analysis and Executing Optimal Response for Wireless Sensor Networks",
    "authority": "Indian Patent Office",
    "appNo": "201941052542",
    "year": "2019",
    "status": "Published",
    "authors": "P.Deepalakshmi, V.Praveena, P.Chinnasamy, S.Geetha, Sudha, P.Nagaraj, K.Muthamil Sudar"
  },
  {
    "id": "pat-4",
    "type": "Published / Filed Innovation",
    "title": "Coin Counting Machine using Deep Learning based Image Processing",
    "authority": "Indian Patent Office",
    "appNo": "202141057652",
    "year": "2021",
    "status": "Published",
    "authors": "Dr. P.Chinnasamy, Dr.P.Deepalakshmi, Dr.K.Srinivas Rao, Dr.E.Anupriya, Mrs. K.Pushpa Rani, Mrs. N.Thulasi Chitra, Mrs. T.Raja Rajeswari, Dr. V.Praveena"
  },
  {
    "id": "pat-5",
    "type": "Published / Filed Innovation",
    "title": "System/Method for Secure Cloud Storage using Hybrid Cryptography",
    "authority": "Indian Patent Office",
    "appNo": "202141057660",
    "year": "2021",
    "status": "Published",
    "authors": "Dr. P.Chinnasamy, Dr.K.Srinivas Rao, Dr.B.Madhuravani, Dr.P.Subhasini, Mrs. T.Raja Rajeswari, Mr.T.Vinod, Mr.M.Srinivasa Rao"
  },
  {
    "id": "pat-6",
    "type": "Published / Filed Innovation",
    "title": "Method for Securing Privacy in Data Mining",
    "authority": "Indian Patent Office",
    "appNo": "202141057656",
    "year": "2021",
    "status": "Published",
    "authors": "Dr. A.Kiran, Dr. D.Vasumathi, Dr.K.Srinivas Rao, Dr.P.Subhasini, Dr.P.Chinnasamy, Mrs. P.Devika, Mr.B.Anand, Mr. Venkata Siva Rao"
  },
  {
    "id": "pat-7",
    "type": "Published / Filed Innovation",
    "title": "Smart Wheel Chair",
    "authority": "Indian Patent Office",
    "appNo": "202141057658",
    "year": "2021",
    "status": "Published",
    "authors": "Mrs. K. Pushpa Rani, Dr.P. Chinnasamy, Mrs. N. Thulasi Chitra, Mrs. T.S. RajaRajeswari, Mr. B. Devananda Rao, Mrs.S.Spandana, Mr.B.Srinivasulu, Mrs.S.Amani"
  },
  {
    "id": "pat-8",
    "type": "Published / Filed Innovation",
    "title": "Pet Feeder Automation using Raspberry Pi based on Internet of Things",
    "authority": "Indian Patent Office",
    "appNo": "202141057654",
    "year": "2021",
    "status": "Published",
    "authors": "Mr. B. Devananda Rao, Mrs. K. Pushpa Rani, Mrs. N. Thulasi Chitra, Dr.P. Chinnasamy, Mrs. T. Raja Rajeswari, Mr. S.K. Lokesh Naik, Mr. K. Shekar, Mr. P. Purushotham"
  },
  {
    "id": "pat-9",
    "type": "Published / Filed Innovation",
    "title": "Smart Gas Leakage and Usage Detection System",
    "authority": "Indian Patent Office",
    "appNo": "202141057657",
    "year": "2021",
    "status": "Published",
    "authors": "Mrs. T.S. RajaRajeswari, Dr. P. Chinnasamy, Mrs. K. Pushpa Rani, Mrs. N. Thulasi Chitra, Mr. S.K. Lokesh Naik, Mrs. A. Ashwini, Mrs. S. Spandana, Mr. T. Vinod"
  },
  {
    "id": "pat-10",
    "type": "Published / Filed Innovation",
    "title": "System for Big Data Security in Distributed Environment Using Cryptographic based Model",
    "authority": "Indian Patent Office",
    "appNo": "202141057661",
    "year": "2021",
    "status": "Published",
    "authors": "Dr. N Sirisha, Dr. K.V.D. Kiran, Mrs. K Pushpa Rani, Mrs. N Thulasi Chitra, Mrs. T Raja Rajeswari, Dr. P Chinnasamy, Mr. Srinivasulu, Ms. B Lakshmi"
  },
  {
    "id": "pat-11",
    "type": "Published / Filed Innovation",
    "title": "Method for Identifying Confidential Data using Unsupervised Machine Learning in Data Leakage Prevention",
    "authority": "Indian Patent Office",
    "appNo": "202141057659",
    "year": "2021",
    "status": "Published",
    "authors": "Dr.P.Subhasini, Dr.K.Srinivas Rao, Dr.P. Chinnasamy, Dr.A.Kiran, Mr.KashiSaiPrasad, Mrs.Soleti Navya, Mrs.N.Sandhya Rani, Mrs.Appam Ashwini"
  },
  {
    "id": "pat-12",
    "type": "Published / Filed Innovation",
    "title": "Smart Cradle System for Baby Monitoring using IoT",
    "authority": "Indian Patent Office",
    "appNo": "202241025412",
    "year": "2022",
    "status": "Published",
    "authors": "Mrs. N.Thulasi Chitra, Mrs. K.Pushpa Rani, Mrs. T.S. RajaRajeswari, Mrs. B. Devananda Rao, Dr. P.Chinnasamy, Mrs. S.Spandana, Mr. B.Srinivasulu, Ms. N.Sandhya Rani"
  },
  {
    "id": "pat-13",
    "type": "Published / Filed Innovation",
    "title": "An Artificial Intelligence Based Smart Bus Tracking and Bus Stop Alert System for Passengers",
    "authority": "Indian Patent Office",
    "appNo": "202241025413",
    "year": "2022",
    "status": "Published",
    "authors": "Dr. P. Chinnasamy, Dr. P. Deepalakshmi, Dr. K. Srinivas Rao, Dr. E. Anupriya, Dr. T. S. Arulananth, Dr. E. Sivakumar, Dr. P. Subhasini, Dr. A. Kiran"
  },
  {
    "id": "pat-14",
    "type": "Published / Filed Innovation",
    "title": "Screening and Tracking of COVID-19 Infected Persons using Face Scans",
    "authority": "Indian Patent Office",
    "appNo": "202241025410",
    "year": "2022",
    "status": "Published",
    "authors": "Dr.P. Chinnasamy, Dr.P. Deepalakshmi, Dr. K. Srinivas Rao, Dr. E. Anupriya, Dr. T.S. Arulananth, Dr. E. Sivakumar, Dr. A. Kiran"
  },
  {
    "id": "pat-15",
    "type": "Published / Filed Innovation",
    "title": "An System/Method to Create and Validate the Educational Certificates using Blockchain Technology",
    "authority": "Indian Patent Office",
    "appNo": "202241027370",
    "year": "2022",
    "status": "Filed",
    "authors": "Dr. P. Chinnasamy, Dr. P. Deepalakshmi, Dr. K. Srinivas Rao, Mr. Vishal Dhatrika, Mr. Dachiraju Hemanth Kumar, Mr. K Harish Chandra Prasad, Mr. Sanagala Praveen, Dr.M. Usha"
  },
  {
    "id": "pat-16",
    "type": "Published / Filed Innovation",
    "title": "Protecting Healthcare Records using Visual Cryptography for Hospital Management Systems",
    "authority": "Indian Patent Office",
    "appNo": "202541078078",
    "year": "2025",
    "status": "Published",
    "authors": "P. Chinnasamy, B. KIRAN, D.SANDEEP, A. JAYA KRISHNA, A. SIVA GANESH"
  },
  {
    "id": "pat-17",
    "type": "Published / Filed Innovation",
    "title": "Hairstyle Recommendation System based on Face Shape Detection using CNNs and AR",
    "authority": "Indian Patent Office",
    "appNo": "202541078079",
    "year": "2025",
    "status": "Published",
    "authors": "P. Chinnasamy, C. Naveen, D. BHARGAVA REDDY, D. MANOJ KUMAR, CH. YUGANDHAR"
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
      year: "2025",
      badge: "National Recognition",
      description: "Honored at the CSI Cyber FIFC Conference & Cyber Security Awards 2025 as Cyber Security Innovator of the Year.",
      image: "/assets/csi_cyber_security_award_2025.png"
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
      title: "Innovative Research Award",
      organization: "CSI Hyderabad Chapter",
      year: "2024",
      badge: "State Award",
      description: "Awarded by Computer Society of India at Annual Excellence Awards 2024 for exemplary research in deep learning and cybersecurity.",
      image: "/assets/csi_innovative_research_award_2024.jpg"
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

  professionalMemberships: [
    {
      id: "mem-1",
      title: "IEEE Education Society",
      society: "Institute of Electrical and Electronics Engineers (IEEE)",
      abbreviation: "IEEE EdSoc",
      role: "Professional Member",
      membershipId: "94203253",
      description: "Active member of IEEE (Member # 94203253, Podhigai Subsection) and IEEE Education Society, dedicated to advancing education in engineering, computing, and technology fields globally.",
      badge: "IEEE Member",
      logo: "/assets/ieee_edsoc_logo.png",
      cardImage: "/assets/ieee_membership_card.jpg"
    },
    {
      id: "mem-2",
      title: "Computer Society of India (CSI)",
      society: "Computer Society of India",
      abbreviation: "CSI",
      role: "Life Member",
      membershipId: "702224018",
      description: "Official Life Member of the Computer Society of India (CSI ID: 702224018). Fostering knowledge exchange, computing research advancement, and technology standards across India.",
      badge: "CSI Life Member",
      logo: "/assets/csi_logo.jpg",
      cardImage: "/assets/csi_membership_card.png",
      certificates: [
        {
          title: "CSI Cyber Security Innovator of the Year Award (2025)",
          image: "/assets/csi_cyber_security_award_2025.png"
        },
        {
          title: "CSI Hyderabad Chapter Innovative Research Award (2024)",
          image: "/assets/csi_innovative_research_award_2024.jpg"
        }
      ]
    },
    {
      id: "mem-3",
      title: "Association for Computing Machinery (ACM)",
      society: "Association for Computing Machinery",
      abbreviation: "ACM",
      role: "Professional Member",
      description: "Professional member of ACM, the world's largest educational and scientific computing society driving innovation and computing ethics.",
      badge: "ACM Member",
      logo: "/assets/acm_logo.png"
    }
  ]
};
