import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { professorData } from '../src/data/professorData.js';
import { generateAIResponse } from '../src/data/aiKnowledgeEngine.js';
import {
  getCachedCitationData,
  syncCitationData,
  startAutoSyncSchedule
} from './citationSyncService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: '*' }));
app.use(express.json());

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { success: false, error: 'Too many requests, please try again later.' }
});

app.use('/api/', apiLimiter);

// Root Status & Health Check
app.get('/', (_req: Request, res: Response) => {
  res.send(`
    <div style="font-family: system-ui, sans-serif; padding: 3rem; text-align: center; background: #050811; color: #e2e8f0; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-center;">
      <h1 style="color: #00f0ff; margin-bottom: 0.5rem;">⚡ Dr. P. Chinnasamy Portfolio API</h1>
      <p style="color: #94a3b8; max-w: 600px; line-height: 1.6;">The backend API server is online and operational on port 5000.</p>
      <div style="margin-top: 1.5rem;">
        <a href="http://localhost:5173/" style="display: inline-block; padding: 0.75rem 1.5rem; background: linear-gradient(to right, #00f0ff, #3b82f6); color: #000; font-weight: bold; text-decoration: none; border-radius: 0.75rem;">Open Web Application (http://localhost:5173) &rarr;</a>
      </div>
    </div>
  `);
});

// Contact API
app.post('/api/contact', (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields (name, email, subject, message) are required.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    // Logging message server-side (can be connected to nodemailer or MongoDB)
    console.log(`[Contact Form Received] From: ${name} (${email}) | Subject: ${subject}`);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! Dr. P. Chinnasamy will get back to you soon.'
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Failed to process message submission.'
    });
  }
});

// Publications API
app.get('/api/publications', (req: Request, res: Response) => {
  try {
    let results = [...professorData.publications];
    const { search, year, category, type } = req.query;

    if (search) {
      const q = String(search).toLowerCase();
      results = results.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.venue && p.venue.toLowerCase().includes(q)) ||
          (p.abstract && p.abstract.toLowerCase().includes(q))
      );
    }

    if (year && year !== 'All') {
      results = results.filter(p => p.year === String(year));
    }

    if (category && category !== 'All') {
      results = results.filter(p => p.category.toLowerCase() === String(category).toLowerCase());
    }

    if (type && type !== 'All') {
      results = results.filter(p => p.type.toLowerCase() === String(type).toLowerCase());
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      publications: results
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Error fetching publications.'
    });
  }
});

// Research Areas API
app.get('/api/research', (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    researchAreas: professorData.researchAreas,
    institution: professorData.institution,
    designation: professorData.designation
  });
});

// Scholars API
app.get('/api/scholars', (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    supervisorInfo: professorData.supervisorInfo,
    scholars: professorData.scholars
  });
});

// AI Research Assistant API
app.post('/api/ai/chat', (req: Request, res: Response) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Valid question parameter is required.'
      });
    }

    const answer = generateAIResponse(question);

    return res.status(200).json({
      success: true,
      answer
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'AI assistant error.'
    });
  }
});

// Citations & Metrics API (automatically synced with OpenAlex / Google Scholar profile)
app.get('/api/citations', (_req: Request, res: Response) => {
  try {
    const data = getCachedCitationData();
    return res.status(200).json({
      success: true,
      ...data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch citations data.'
    });
  }
});

// Manual / Triggered Citation Synchronization
app.post('/api/citations/sync', async (_req: Request, res: Response) => {
  try {
    const result = await syncCitationData();
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err?.message || 'Sync operation failed.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`⚡ [Server] Dr. Chinnasamy Portfolio API running on port ${PORT}`);
  // Start automated daily citation synchronization schedule
  startAutoSyncSchedule();
});

