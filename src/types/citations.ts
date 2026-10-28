export interface YearWiseCitation {
  year: number;
  citations: number;
  works?: number;
}

export interface CitationPublication {
  id: string;
  title: string;
  authors: string;
  year: number | string;
  citations: number;
  doi?: string;
  venue?: string;
  type?: string;
}

export interface CitationMetrics {
  totalCitations: number;
  hIndex: number;
  i10Index: number;
  twoYearMeanCitedness?: number;
  worksCount: number;
  citationsSinceYear?: number;
  hIndexSinceYear?: number;
  i10IndexSinceYear?: number;
  benchmarkYear?: number;
}

export interface ResearcherCitationProfile {
  name: string;
  displayName: string;
  affiliation: string;
  profileUrl: string;
  openAlexUrl?: string;
  orcid?: string;
  source: string;
  sourceNote: string;
}

export interface CitationData {
  researcher: ResearcherCitationProfile;
  metrics: CitationMetrics;
  yearWiseCitations: YearWiseCitation[];
  publications: CitationPublication[];
  lastSyncTime: string;
  status?: string;
}
