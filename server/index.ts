import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { professorData } from '../src/data/professorData.js';

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

    const q = question.toLowerCase().trim();

    let answer = "";

    if (q.includes("research area") || q.includes("interest") || q.includes("focus") || q.includes("work on")) {
      answer = `Dr. P. Chinnasamy's core research areas include ${professorData.researchAreas.slice(0, 7).join(", ")}, along with ${professorData.researchAreas.slice(7).join(", ")}.`;
    } else if (q.includes("phd") || q.includes("doctorate") || q.includes("thesis") || q.includes("degree") || q.includes("education")) {
      const phd = professorData.education.find(e => e.degree.includes("Ph.D."));
      answer = `Dr. Chinnasamy completed his Ph.D. in CSE in ${phd?.year}. His thesis was titled "${phd?.thesis}". He also holds an M.Tech (CGPA 9.45/10) from Kalasalingam University and a B.E. from Anna University.`;
    } else if (q.includes("patent") || q.includes("invention") || q.includes("granted")) {
      answer = `Dr. Chinnasamy holds a Granted Australian Patent (App No: 2020100616) titled "${professorData.patents[0].title}", a Design Patent (App: 434301-001) for Smart Solar Weather Monitoring, and over 10 published/filed innovations in AI, Cloud Security, IoT, and Healthcare.`;
    } else if (q.includes("scholar") || q.includes("student") || q.includes("supervision") || q.includes("guided")) {
      answer = `Dr. Chinnasamy is a recognized supervisor at KARE and Anna University (Recognition No. 4140166). He guides Ph.D. scholars including Geethu Lakshmi G (PhD Defended), Deepthi K Moorthy (In Progress), Roshni Rajendran, Darshan P, Dastageer K, and Mani G.`;
    } else if (q.includes("publication") || q.includes("paper") || q.includes("journal") || q.includes("ieee") || q.includes("recent")) {
      answer = `Dr. Chinnasamy has authored numerous publications in top IEEE/Scopus venue including papers on Cognitive AI, AI-MFA with Liveness Detection, Medi-Chain Blockchain, Drug Interaction ML, and HCAC-EHR Cloud Security.`;
    } else if (q.includes("award") || q.includes("stanford") || q.includes("ranking") || q.includes("top 2%")) {
      answer = `Dr. Chinnasamy is recognized in the Stanford-Elsevier Global Ranking 2025 among the Top 2% Scientists in AI & Image Processing. He has also received Cybersecurity Innovator of the Year from CSI Mumbai and is a Senior Research Associate with UTAR Malaysia.`;
    } else if (q.includes("role") || q.includes("hod") || q.includes("designation") || q.includes("position") || q.includes("leadership")) {
      answer = `Dr. Chinnasamy serves as Associate Professor at Kalasalingam Academy of Research and Education (KARE). He has also served as In-charge HoD, NAAC Criteria 3 Lead, Department R&D In-charge, and Patent In-charge.`;
    } else if (q.includes("collaborate") || q.includes("contact") || q.includes("email") || q.includes("reach")) {
      answer = `You can connect with Dr. Chinnasamy for research collaborations via email at chinnasamyponnusamy@gmail.com, or through the contact form on this portfolio.`;
    } else if (q.includes("funding") || q.includes("grant") || q.includes("project") || q.includes("utar")) {
      answer = `Dr. Chinnasamy is Co-PI on a RM24,000 UTAR Research Fund project titled "A MultiModal Machine Learning Framework for Early Detection of Postpartum Depression" (2025–2026), and has worked on SERB-SRG COVID-19 screening frameworks.`;
    } else {
      answer = "I don't have that information in Dr. P. Chinnasamy's academic profile.";
    }

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

app.listen(PORT, () => {
  console.log(`⚡ [Server] Dr. Chinnasamy Portfolio API running on port ${PORT}`);
});
