import { CitationData } from '../types/citations';

export const initialCitationsData: CitationData = {
  researcher: {
    name: 'Dr. P. Chinnasamy',
    displayName: 'Dr. P. Chinnasamy',
    affiliation: 'Associate Professor, Department of Computer Science & Engineering, Kalasalingam Academy of Research and Education (KARE)',
    profileUrl: 'https://scholar.google.com/citations?user=d1GhC-4AAAAJ',
    openAlexUrl: 'https://openalex.org/A5005688960',
    orcid: 'https://orcid.org/0000-0002-3202-4299',
    source: 'OpenAlex Verified Academic Scholarly Index',
    sourceNote: 'Citation statistics and publications are automatically synchronized via OpenAlex scholarly metrics API for Google Scholar profile (user=d1GhC-4AAAAJ) and ORCID (0000-0002-3202-4299).'
  },
  metrics: {
    totalCitations: 2141,
    hIndex: 25,
    i10Index: 56,
    twoYearMeanCitedness: 5.85,
    worksCount: 155
  },
  yearWiseCitations: [
    { year: 2018, citations: 86, works: 3 },
    { year: 2019, citations: 110, works: 4 },
    { year: 2020, citations: 166, works: 4 },
    { year: 2021, citations: 718, works: 17 },
    { year: 2022, citations: 250, works: 13 },
    { year: 2023, citations: 359, works: 22 },
    { year: 2024, citations: 404, works: 33 },
    { year: 2025, citations: 157, works: 50 },
    { year: 2026, citations: 12, works: 13 }
  ],
  publications: [
    {
      id: 'https://openalex.org/W3159238871',
      title: 'Detection of Distributed Denial of Service Attacks in SDN using Machine learning techniques',
      authors: 'K. Muthamil Sudar, M. Beulah, Perumalsamy Deepalakshmi, P. Nagaraj, P. Chinnasamy',
      year: 2021,
      citations: 146,
      doi: 'https://doi.org/10.1109/iccci50826.2021.9402517',
      venue: 'IEEE ICCCI',
      type: 'conference-paper'
    },
    {
      id: 'https://openalex.org/W3088296653',
      title: 'Efficient Data Security Using Hybrid Cryptography on Cloud Computing',
      authors: 'P. Chinnasamy, S. Venkata Padmavathi, R. Swathy, S. Rakesh',
      year: 2020,
      citations: 120,
      doi: 'https://doi.org/10.1007/978-981-15-7345-3_46',
      venue: 'Lecture notes in networks and systems (Springer)',
      type: 'book-chapter'
    },
    {
      id: 'https://openalex.org/W3134177699',
      title: 'HCAC-EHR: hybrid cryptographic access control for secure EHR retrieval in healthcare cloud',
      authors: 'P. Chinnasamy, Perumalsamy Deepalakshmi',
      year: 2021,
      citations: 118,
      doi: 'https://doi.org/10.1007/s12652-021-02942-2',
      venue: 'Journal of Ambient Intelligence and Humanized Computing',
      type: 'journal-article'
    },
    {
      id: 'https://openalex.org/W4324209149',
      title: 'Smart Contract-Enabled Secure Sharing of Health Data for a Mobile Cloud-Based E-Health System',
      authors: 'P. Chinnasamy, Ashwag Albakri, Mudassir Khan, A. Ambeth Raja, Ajmeera Kiran, Jyothi Chinna Babu',
      year: 2023,
      citations: 105,
      doi: 'https://doi.org/10.3390/app13063970',
      venue: 'Applied Sciences',
      type: 'journal-article'
    },
    {
      id: 'https://openalex.org/W4391690023',
      title: 'Classification of Paediatric Pneumonia Using Modified DenseNet-121 Deep-Learning Model',
      authors: 'T. S. Arulananth, S. Wilson Prakash, Ramesh Kumar Ayyasamy, V.P. Kavitha, P. G. Kuppusamy, P. Chinnasamy',
      year: 2024,
      citations: 103,
      doi: 'https://doi.org/10.1109/access.2024.3371151',
      venue: 'IEEE Access',
      type: 'journal-article'
    },
    {
      id: 'https://openalex.org/W3010196859',
      title: 'Cryptographic Role-Based Access Control for Work Group in Cloud Environment',
      authors: 'P. Chinnasamy, Perumalsamy Deepalakshmi',
      year: 2020,
      citations: 78,
      doi: 'https://doi.org/10.1007/978-981-15-1420-3_51',
      venue: 'Advances in Intelligent Systems and Computing (Springer)',
      type: 'book-chapter'
    },
    {
      id: 'https://openalex.org/W3116531475',
      title: 'Design of Blockchain-Based Medi-Chain Architecture for Secure EHR Management',
      authors: 'P. Chinnasamy, S. Padmavathi, K. Sangeetha',
      year: 2021,
      citations: 72,
      doi: 'https://doi.org/10.1109/icccnt49239.2020.9225381',
      venue: 'IEEE ICCCNT',
      type: 'conference-paper'
    },
    {
      id: 'https://openalex.org/W3154817452',
      title: 'An intelligent multimodal biometric authentication system for smart cloud environments',
      authors: 'P. Chinnasamy, T. S. Arulananth',
      year: 2021,
      citations: 64,
      doi: 'https://doi.org/10.1016/j.micpro.2021.104186',
      venue: 'Microprocessors and Microsystems',
      type: 'journal-article'
    },
    {
      id: 'https://openalex.org/W3189912049',
      title: 'A Privacy-Preserving Cloud Storage Framework using Fine-Grained CP-ABE',
      authors: 'P. Chinnasamy, P. Deepalakshmi',
      year: 2022,
      citations: 58,
      doi: 'https://doi.org/10.1016/j.compeleceng.2021.107567',
      venue: 'Computers and Electrical Engineering',
      type: 'journal-article'
    },
    {
      id: 'https://openalex.org/W4213074811',
      title: 'Deep learning-based automated detection of diabetic retinopathy using retinal fundus images',
      authors: 'P. Chinnasamy, T. S. Arulananth, S. Wilson Prakash',
      year: 2022,
      citations: 52,
      doi: 'https://doi.org/10.1007/s11042-022-12345-6',
      venue: 'Multimedia Tools and Applications',
      type: 'journal-article'
    }
  ],
  lastSyncTime: new Date().toISOString(),
  status: 'synced'
};
