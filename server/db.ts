import { MongoClient, Db, Collection } from 'mongodb';
import { CitationData } from './citationSyncService.js';

let client: MongoClient | null = null;
let db: Db | null = null;
let citationsCollection: Collection<any> | null = null;

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.MONGODB_DB_NAME || 'portfolio';
const COLLECTION_NAME = 'citations';

/**
 * Initializes MongoDB connection if MONGODB_URI is provided in environment.
 * Gracefully logs status and allows the application to operate with or without MongoDB.
 */
export async function initDb(): Promise<boolean> {
  if (!MONGODB_URI) {
    console.log('[MongoDB] No MONGODB_URI found in environment. Using filesystem JSON cache.');
    return false;
  }

  try {
    if (!client) {
      client = new MongoClient(MONGODB_URI);
      await client.connect();
      db = client.db(DB_NAME);
      citationsCollection = db.collection(COLLECTION_NAME);
      console.log(`[MongoDB] Connected successfully to database: "${DB_NAME}", collection: "${COLLECTION_NAME}".`);
    }
    return true;
  } catch (error: any) {
    console.warn(`[MongoDB] Connection attempt failed (${error?.message || error}). Falling back to local cache.`);
    client = null;
    db = null;
    citationsCollection = null;
    return false;
  }
}

/**
 * Fetches citation data from MongoDB if connected.
 */
export async function getCitationsFromDb(): Promise<CitationData | null> {
  try {
    if (!citationsCollection) {
      const connected = await initDb();
      if (!connected || !citationsCollection) return null;
    }

    const doc = await citationsCollection.findOne({ _id: 'dr_chinnasamy_citations' as any });
    if (doc) {
      const { _id, ...citationData } = doc;
      return citationData as CitationData;
    }
    return null;
  } catch (err: any) {
    console.warn('[MongoDB] Failed to read citations from MongoDB:', err?.message || err);
    return null;
  }
}

/**
 * Saves or updates citation metrics and publication records in MongoDB.
 */
export async function saveCitationsToDb(data: CitationData): Promise<boolean> {
  try {
    if (!citationsCollection) {
      const connected = await initDb();
      if (!connected || !citationsCollection) return false;
    }

    await citationsCollection.updateOne(
      { _id: 'dr_chinnasamy_citations' as any },
      { $set: { ...data, updatedAt: new Date() } },
      { upsert: true }
    );
    console.log('[MongoDB] Citation metrics and publications saved to MongoDB.');
    return true;
  } catch (err: any) {
    console.warn('[MongoDB] Failed to save citations to MongoDB:', err?.message || err);
    return false;
  }
}

export function isDbConnected(): boolean {
  return client !== null && citationsCollection !== null;
}
