import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { saveCitationsToDb, getCitationsFromDb, initDb } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'citations.json');

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

export interface CitationData {
  researcher: {
    name: string;
    displayName: string;
    affiliation: string;
    profileUrl: string;
    openAlexUrl?: string;
    orcid?: string;
    source: string;
    sourceNote: string;
  };
  metrics: {
    totalCitations: number;
    hIndex: number;
    i10Index: number;
    twoYearMeanCitedness?: number;
    worksCount: number;
    citationsSinceYear?: number;
    hIndexSinceYear?: number;
    i10IndexSinceYear?: number;
    benchmarkYear?: number;
  };
  yearWiseCitations: YearWiseCitation[];
  publications: CitationPublication[];
  lastSyncTime: string;
  status?: string;
}

// Fallback initial data to guarantee zero downtime
const FALLBACK_DATA: CitationData = {
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
    totalCitations: 2778,
    citationsSinceYear: 2763,
    hIndex: 28,
    hIndexSinceYear: 28,
    i10Index: 63,
    i10IndexSinceYear: 63,
    benchmarkYear: 2021,
    twoYearMeanCitedness: 5.85,
    worksCount: 178
  },
  yearWiseCitations: [
    { year: 2020, citations: 7, works: 4 },
    { year: 2021, citations: 59, works: 17 },
    { year: 2022, citations: 242, works: 13 },
    { year: 2023, citations: 384, works: 22 },
    { year: 2024, citations: 607, works: 33 },
    { year: 2025, citations: 862, works: 50 },
    { year: 2026, citations: 586, works: 13 }
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
    }
  ],
  lastSyncTime: new Date().toISOString()
};

let memoryCachedData: CitationData | null = null;

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getCachedCitationData(): CitationData {
  if (memoryCachedData && memoryCachedData.metrics && memoryCachedData.publications) {
    return memoryCachedData;
  }

  try {
    ensureDataDir();
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content) as CitationData;
      if (parsed && parsed.metrics && parsed.publications) {
        memoryCachedData = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[CitationSync] Error reading cached file, using fallback:', err);
  }
  return FALLBACK_DATA;
}

async function tryFetchGoogleScholar(): Promise<Partial<CitationData> | null> {
  try {
    const res = await fetch('https://scholar.google.com/citations?user=d1GhC-4AAAAJ&hl=en&pagesize=100', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });

    if (!res.ok) return null;
    const html = await res.text();

    const totalMatch = html.match(/<td class="gsc_rsb_std">(\d+)<\/td><td class="gsc_rsb_std">(\d+)<\/td>/g);
    if (!totalMatch) return null;

    const numPairs: { all: number; since: number }[] = [];
    for (const m of totalMatch) {
      const nums = [...m.matchAll(/<td class="gsc_rsb_std">(\d+)<\/td>/g)].map(x => parseInt(x[1], 10));
      if (nums.length >= 2) {
        numPairs.push({ all: nums[0], since: nums[1] });
      }
    }

    if (numPairs.length < 3) return null;

    const totalCitations = numPairs[0].all;
    const citationsSinceYear = numPairs[0].since;
    const hIndex = numPairs[1].all;
    const hIndexSinceYear = numPairs[1].since;
    const i10Index = numPairs[2].all;
    const i10IndexSinceYear = numPairs[2].since;

    const years = [...html.matchAll(/<span class="gsc_g_t"[^>]*>(\d+)<\/span>/g)].map(m => parseInt(m[1], 10));
    const cits = [...html.matchAll(/<span class="gsc_g_al">(\d+)<\/span>/g)].map(m => parseInt(m[1], 10));

    const yearWiseCitations: YearWiseCitation[] = [];
    for (let i = 0; i < Math.min(years.length, cits.length); i++) {
      yearWiseCitations.push({
        year: years[i],
        citations: cits[i]
      });
    }

    return {
      metrics: {
        totalCitations,
        citationsSinceYear,
        hIndex,
        hIndexSinceYear,
        i10Index,
        i10IndexSinceYear,
        benchmarkYear: 2021,
        twoYearMeanCitedness: 5.85,
        worksCount: 178
      },
      yearWiseCitations: yearWiseCitations.length > 0 ? yearWiseCitations : undefined
    };
  } catch (err) {
    console.warn('[CitationSync] Google Scholar direct fetch note:', err);
    return null;
  }
}

export async function syncCitationData(): Promise<{ success: boolean; data: CitationData; message: string }> {
  try {
    console.log('[CitationSync] Starting live synchronization with Google Scholar & OpenAlex for Dr. P. Chinnasamy...');

    // Try Google Scholar live scrape first
    const scholarPartial = await tryFetchGoogleScholar();
    if (scholarPartial && scholarPartial.metrics) {
      const cached = getCachedCitationData();
      const updatedData: CitationData = {
        ...cached,
        metrics: {
          ...cached.metrics,
          ...scholarPartial.metrics
        },
        yearWiseCitations: scholarPartial.yearWiseCitations || cached.yearWiseCitations,
        lastSyncTime: new Date().toISOString(),
        status: 'synced'
      };

      memoryCachedData = updatedData;
      ensureDataDir();
      fs.writeFileSync(DATA_FILE, JSON.stringify(updatedData, null, 2), 'utf-8');
      saveCitationsToDb(updatedData).catch(err => console.warn('[CitationSync] DB save note:', err?.message));

      console.log(`[CitationSync] Google Scholar sync succeeded! Total citations: ${updatedData.metrics.totalCitations}`);
      return {
        success: true,
        data: updatedData,
        message: 'Citations data synchronized successfully from Google Scholar!'
      };
    }
    
    // Fetch author metadata from OpenAlex as fallback
    const authorRes = await fetch('https://api.openalex.org/authors/A5005688960', {
      headers: {
        'User-Agent': 'DrChinnasamyPortfolio/1.0 (mailto:chinnasamyponnusamy@gmail.com)'
      }
    });

    if (!authorRes.ok) {
      throw new Error(`OpenAlex Author API responded with status ${authorRes.status}`);
    }

    const author = await authorRes.json();

    // Fetch top cited works (100 publications)
    const worksRes = await fetch(
      'https://api.openalex.org/works?filter=author.id:A5005688960&sort=cited_by_count:desc&per-page=100',
      {
        headers: {
          'User-Agent': 'DrChinnasamyPortfolio/1.0 (mailto:chinnasamyponnusamy@gmail.com)'
        }
      }
    );

    let worksList: CitationPublication[] = [];
    if (worksRes.ok) {
      const worksData = await worksRes.json();
      if (Array.isArray(worksData.results)) {
        worksList = worksData.results.map((w: any, idx: number) => ({
          id: w.id || `pub-${idx}`,
          title: w.title || 'Untitled Scholarly Work',
          authors: Array.isArray(w.authorships)
            ? w.authorships.map((a: any) => a?.author?.display_name).filter(Boolean).join(', ')
            : 'Dr. P. Chinnasamy',
          year: w.publication_year || '',
          citations: typeof w.cited_by_count === 'number' ? w.cited_by_count : 0,
          doi: w.doi || w.primary_location?.landing_page_url || '',
          venue: w.primary_location?.source?.display_name || 'Indexed Journal / Conference',
          type: w.type || 'journal-article'
        }));
      }
    }

    // Extract year-wise counts
    const countsByYear: YearWiseCitation[] = Array.isArray(author.counts_by_year)
      ? author.counts_by_year
          .map((c: any) => ({
            year: Number(c.year),
            citations: Number(c.cited_by_count || 0),
            works: Number(c.works_count || 0)
          }))
          .sort((a: YearWiseCitation, b: YearWiseCitation) => a.year - b.year)
      : FALLBACK_DATA.yearWiseCitations;

    const updatedData: CitationData = {
      researcher: {
        name: 'Dr. P. Chinnasamy',
        displayName: author.display_name || 'Dr. P. Chinnasamy',
        affiliation:
          'Associate Professor, Department of Computer Science & Engineering, Kalasalingam Academy of Research and Education (KARE)',
        profileUrl: 'https://scholar.google.com/citations?user=d1GhC-4AAAAJ',
        openAlexUrl: 'https://openalex.org/A5005688960',
        orcid: 'https://orcid.org/0000-0002-3202-4299',
        source: 'OpenAlex Verified Academic Scholarly Index',
        sourceNote:
          'Citation statistics and publications are automatically synchronized via OpenAlex scholarly metrics API for Google Scholar profile (user=d1GhC-4AAAAJ) and ORCID (0000-0002-3202-4299).'
      },
      metrics: {
        totalCitations: author.cited_by_count || 2141,
        hIndex: author.summary_stats?.h_index || 25,
        i10Index: author.summary_stats?.i10_index || 56,
        twoYearMeanCitedness: Number((author.summary_stats?.['2yr_mean_citedness'] || 5.85).toFixed(2)),
        worksCount: author.works_count || (worksList.length > 0 ? worksList.length : 155)
      },
      yearWiseCitations: countsByYear.length > 0 ? countsByYear : FALLBACK_DATA.yearWiseCitations,
      publications: worksList.length > 0 ? worksList : FALLBACK_DATA.publications,
      lastSyncTime: new Date().toISOString(),
      status: 'synced'
    };

    // Update memory cache
    memoryCachedData = updatedData;

    // Save to local cache file
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(updatedData, null, 2), 'utf-8');

    // Asynchronously save to MongoDB if connected
    saveCitationsToDb(updatedData).catch(err =>
      console.warn('[CitationSync] MongoDB async save notice:', err?.message)
    );

    console.log(`[CitationSync] Sync completed successfully! Total citations: ${updatedData.metrics.totalCitations}, Total works: ${updatedData.publications.length}`);

    return {
      success: true,
      data: updatedData,
      message: 'Citations data synchronized successfully.'
    };
  } catch (err: any) {
    console.error('[CitationSync] Live sync failed, preserving existing data:', err?.message || err);
    const existing = getCachedCitationData();
    return {
      success: false,
      data: existing,
      message: `Synchronization failed (${err?.message || 'Network error'}). Preserved previous data.`
    };
  }
}

/**
 * Daily background synchronization schedule:
 * Runs immediately on startup and repeats every 24 hours (86,400,000 ms).
 */
export async function startAutoSyncSchedule(): Promise<void> {
  // Try loading latest records from MongoDB first
  try {
    const dbData = await getCitationsFromDb();
    if (dbData && dbData.metrics) {
      memoryCachedData = dbData;
      console.log('[CitationSync] Successfully hydrated citation metrics from MongoDB.');
    }
  } catch (err: any) {
    console.warn('[CitationSync] MongoDB hydration notice:', err?.message);
  }

  // Run on startup
  syncCitationData().catch(err => console.warn('[CitationSync] Initial startup sync notice:', err?.message));

  // 24 hour recurring timer
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  setInterval(() => {
    console.log('[CitationSync] Running daily automated citation synchronization...');
    syncCitationData().catch(err => console.error('[CitationSync] Scheduled sync error:', err?.message));
  }, ONE_DAY_MS);
}
