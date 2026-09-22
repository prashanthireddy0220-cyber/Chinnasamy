import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, User, RefreshCw, ChevronRight, Award, BookOpen, Shield, GraduationCap, Phone, Sparkle } from 'lucide-react';
import { professorData } from '../data/professorData';

interface ResearchAIProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

const QUICK_ACTIONS = [
  { label: 'Research Areas', icon: Shield, query: 'What are Dr. Chinnasamy’s main research areas?' },
  { label: 'Publications', icon: BookOpen, query: 'Show me recent publications and papers.' },
  { label: 'Patents', icon: Sparkles, query: 'What granted patents and innovations does he have?' },
  { label: 'Supervision', icon: GraduationCap, query: 'Who are his supervised Ph.D. scholars?' },
  { label: 'Awards', icon: Award, query: 'What international awards and recognitions has he received?' },
  { label: 'Academic Journey', icon: GraduationCap, query: 'Tell me about his education and academic career.' },
  { label: 'Contact', icon: Phone, query: 'How can I contact or collaborate with Dr. Chinnasamy?' }
];

const FOLLOW_UP_SUGGESTIONS = [
  "What is his Ph.D. thesis topic?",
  "Tell me about the Stanford Top 2% ranking.",
  "What professional memberships does he hold?",
  "What funded research projects does he lead?",
  "Where can I download his CV?"
];

export const ResearchAI: React.FC<ResearchAIProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: "👋 Hello! I’m the AI Assistant for Dr. P. Chinnasamy. What would you like to know?"
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen]);

  const generateAnswer = (q: string): string => {
    const lowerQ = q.toLowerCase().trim();

    // 1. Greetings & Meta questions
    if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|who are you|what can you do|help|start)/i.test(lowerQ)) {
      return `👋 Hello! I am Dr. P. Chinnasamy's AI Academic Assistant. I can answer any questions about his research in AI & Cybersecurity, 150+ publications, 17 patents, Ph.D. supervision, Stanford Top 2% global ranking, research profiles (Scopus, WoS, Vidwan, Google Scholar), education, or contact details. What would you like to know?`;
    }

    // 2. Who is he / Bio / Designation / University / Location / Work
    if (lowerQ.includes("who is") || lowerQ.includes("about") || lowerQ.includes("designation") || lowerQ.includes("position") || lowerQ.includes("work") || lowerQ.includes("university") || lowerQ.includes("college") || lowerQ.includes("institution") || lowerQ.includes("kare") || lowerQ.includes("kalasalingam") || lowerQ.includes("location") || lowerQ.includes("where")) {
      return `Dr. P. Chinnasamy is an Associate Professor in the Department of Computer Science & Engineering at Kalasalingam Academy of Research and Education (KARE), Tamil Nadu, India. He holds a Ph.D. in CSE (2019) and specializes in Artificial Intelligence, Cybersecurity, Cryptography, and Cloud Access Control. He is recognized among the Top 2% World Ranking Scientists by Stanford–Elsevier (2025).`;
    }

    // 3. Research Areas / Focus / Specializations
    if (lowerQ.includes("research area") || lowerQ.includes("interest") || lowerQ.includes("focus") || lowerQ.includes("domain") || lowerQ.includes("specializ") || lowerQ.includes("topic") || lowerQ.includes("field") || lowerQ.includes("ai") || lowerQ.includes("cybersecurity") || lowerQ.includes("cryptography") || lowerQ.includes("cloud") || lowerQ.includes("blockchain") || lowerQ.includes("iot") || lowerQ.includes("healthcare")) {
      return `Dr. Chinnasamy's primary research domains include:
• Artificial Intelligence & Machine Learning
• Cybersecurity & Cryptography (CP-ABE, Hybrid Cryptography)
• Cloud Security & Access Control as a Service (ACaaS)
• Blockchain Technologies (Medi-Chain Drug Tracking)
• Deep Learning for Healthcare (CNN-LSTM Diagnostics)
• IoT Security & WSN Threat Monitoring Protocols.`;
    }

    // 4. Publications / Papers / SCI / SCIE / Impact Factor / IEEE / Springer / Journal / Conference
    if (lowerQ.includes("publication") || lowerQ.includes("paper") || lowerQ.includes("journal") || lowerQ.includes("conference") || lowerQ.includes("doi") || lowerQ.includes("sci") || lowerQ.includes("impact factor") || lowerQ.includes("q1") || lowerQ.includes("q2") || lowerQ.includes("how many paper") || lowerQ.includes("book chapter")) {
      return `Dr. Chinnasamy has authored over 150+ scholarly publications!
• 24 SCI/SCIE Indexed Journal Papers with Impact Factors up to 7.104 (Q1/Q2 in Springer, IEEE, Elsevier, Mathematics).
• 17 Scopus-Indexed Papers.
• 20 Book Chapters in Springer, Elsevier, IGI Global, & CRC Press.
• 88 IEEE International Conference Papers.
All publications include verified DOI links on the Publications Command Center of this website!`;
    }

    // 5. Patents / Innovations / Granted / Australian / Design Patent
    if (lowerQ.includes("patent") || lowerQ.includes("innovation") || lowerQ.includes("australian") || lowerQ.includes("design patent") || lowerQ.includes("granted") || lowerQ.includes("how many patent") || lowerQ.includes("weather") || lowerQ.includes("mental health")) {
      return `Dr. Chinnasamy holds 17 total patents!
Key highlights include:
1. Granted Australian Patent (App: 2020100616): "Using Wearable Device and Voice Analysis to Track Mental Health".
2. Granted Indian Design Patent (App: 434301-001): Smart Solar Weather Monitoring Node.
3. 15 Published/Filed Indian Patents spanning AI intrusion detection, smart cradle monitoring, and WSN security.`;
    }

    // 6. Ph.D. Supervision / Scholars / Students / KARE / Anna University
    if (lowerQ.includes("scholar") || lowerQ.includes("supervis") || lowerQ.includes("student") || lowerQ.includes("guid") || lowerQ.includes("phd") || lowerQ.includes("doctor") || lowerQ.includes("anna university")) {
      return `Dr. Chinnasamy is an official Ph.D. Supervisor at Kalasalingam Academy of Research and Education (KARE) and Anna University (Supervisor Recognition No. 4140166).
He guides scholars including:
• Geethu Lakshmi G (Ph.D. Defended)
• Deepthi K Moorthy (In Progress)
• Roshni Rajendran (In Progress)
• Darshan P (In Progress)
• Dastageer K (In Progress)
• Mani G (Comprehensive Viva Completed).`;
    }

    // 7. Awards / Honors / Stanford / Top 2% / Global Ranking / Senior Research Associate
    if (lowerQ.includes("award") || lowerQ.includes("ranking") || lowerQ.includes("stanford") || lowerQ.includes("top 2%") || lowerQ.includes("honor") || lowerQ.includes("utar") || lowerQ.includes("csi") || lowerQ.includes("best faculty") || lowerQ.includes("recogni")) {
      return `Dr. Chinnasamy's major honors include:
🏆 Top 2% World Ranking Scientist (Stanford–Elsevier Global Ranking 2025 in AI & Image Processing).
🏅 Senior Research Associate @ UTAR Malaysia (2024–2026).
🎖️ CSI Cybersecurity Innovator of the Year Award.
🌟 Outstanding Researcher & Best Faculty Award recipient.`;
    }

    // 8. Research Profiles / Scopus / Web of Science / WoS / Vidwan / ResearchGate / Google Scholar / ORCID
    if (lowerQ.includes("scopus") || lowerQ.includes("web of science") || lowerQ.includes("wos") || lowerQ.includes("vidwan") || lowerQ.includes("researchgate") || lowerQ.includes("scholar link") || lowerQ.includes("orcid") || lowerQ.includes("profile link") || lowerQ.includes("h-index")) {
      return `Here are Dr. Chinnasamy's official research profile links:
• Scopus: https://www.scopus.com/authid/detail.uri?authorId=57201503238
• Web of Science (WoS): https://www.webofscience.com/wos/author/record/W-8274-2018
• Vidwan: https://vidwan.inflibnet.ac.in/profile/179307
• Google Scholar: https://scholar.google.com/citations?user=d1GhC-4AAAAJ
• ORCID: https://orcid.org/0000-0002-3202-4299
• ResearchGate: https://www.researchgate.net/profile/Chinnasamy-Ponnusamy
• LinkedIn: https://www.linkedin.com/in/dr-p-chinnasamy-52674b3b/`;
    }

    // 9. Education / Degrees / Thesis / Qualifications
    if (lowerQ.includes("education") || lowerQ.includes("qualification") || lowerQ.includes("degree") || lowerQ.includes("thesis") || lowerQ.includes("m.tech") || lowerQ.includes("b.e") || lowerQ.includes("cgpa")) {
      return `Dr. Chinnasamy's academic qualifications:
🎓 Ph.D. in Computer Science & Engineering (March 2019, KARE) — Thesis: "Design of Enhanced and Scalable Access Control Mechanisms for Cloud Storage System".
🎓 M.Tech in CSE (2015, KARE) — CGPA 9.45 / 10 (First Class with Distinction).
🎓 B.E. in CSE (2013, Anna University).`;
    }

    // 10. Funded Research / Grants / UTAR / SERB
    if (lowerQ.includes("funded") || lowerQ.includes("grant") || lowerQ.includes("project") || lowerQ.includes("budget") || lowerQ.includes("money") || lowerQ.includes("serb")) {
      return `Dr. Chinnasamy is Co-Principal Investigator (Co-PI) for the UTAR International Research Fund project titled "MultiModal Machine Learning Framework for Early Detection of Postpartum Depression" (RM 24,000 grant / ~₹4.5 Lakhs). He has also worked on SERB-SRG COVID-19 tracking research systems.`;
    }

    // 11. Professional Memberships
    if (lowerQ.includes("membership") || lowerQ.includes("ieee") || lowerQ.includes("csi") || lowerQ.includes("acm") || lowerQ.includes("professional body") || lowerQ.includes("society")) {
      return `Dr. Chinnasamy holds 3 prestigious international professional memberships:
1. IEEE Education Society (Professional Member)
2. Computer Society of India (CSI - Professional Member)
3. Association for Computing Machinery (ACM - Professional Member).`;
    }

    // 12. Contact / Email / Phone / Address / Reach / Message
    if (lowerQ.includes("contact") || lowerQ.includes("email") || lowerQ.includes("phone") || lowerQ.includes("mobile") || lowerQ.includes("address") || lowerQ.includes("reach") || lowerQ.includes("message") || lowerQ.includes("connect")) {
      return `You can reach Dr. P. Chinnasamy directly:
✉️ Email: chinnasamyponnusamy@gmail.com
📞 Phone: +91 9600281664
📍 Office: Department of CSE, Kalasalingam Academy of Research and Education (KARE), Krishnankoil, Tamil Nadu 626126, India.
💼 LinkedIn: https://www.linkedin.com/in/dr-p-chinnasamy-52674b3b/`;
    }

    // 13. CV / Resume / Download
    if (lowerQ.includes("cv") || lowerQ.includes("resume") || lowerQ.includes("download") || lowerQ.includes("pdf")) {
      return `You can view or download Dr. Chinnasamy's official PDF Curriculum Vitae directly using the "DOWNLOAD CV" button in the Hero section or top navigation bar!`;
    }

    // 14. Teaching / Subjects / Courses
    if (lowerQ.includes("teach") || lowerQ.includes("subject") || lowerQ.includes("course") || lowerQ.includes("class")) {
      return `Dr. Chinnasamy teaches core CSE and specialization courses including Cybersecurity, Cryptography & Network Security, Artificial Intelligence, Machine Learning, Cloud Security, Operating Systems, and Distributed Systems.`;
    }

    // 15. Intelligent Natural Language Fallback (Handles any question without generic failure)
    return `Dr. P. Chinnasamy is an Associate Professor at Kalasalingam Academy of Research and Education (KARE), ranked among the Top 2% World Scientists by Stanford University (2025). He specializes in AI, Cybersecurity, Cryptography, and Cloud Access Control, with 150+ papers and 17 patents.

Regarding your query ("${q}"): You can find full details across the website sections, or feel free to contact Dr. Chinnasamy directly at chinnasamyponnusamy@gmail.com or +91 9600281664!`;
  };

  const handleSend = async (queryText?: string) => {
    const q = (queryText || inputQuery).trim();
    if (!q || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: q
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q })
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: data.answer || generateAnswer(q)
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('API unavailable');
      }
    } catch {
      setTimeout(() => {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: generateAnswer(q)
        };
        setMessages((prev) => [...prev, aiMsg]);
        setLoading(false);
      }, 400);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 dark:bg-black/70 backdrop-blur-sm"
          />

          {/* Right-Side Chat Drawer */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[440px] md:w-[480px] h-full bg-white dark:bg-[#080d1e]/98 text-slate-900 dark:text-slate-100 backdrop-blur-2xl border-l border-slate-200 dark:border-cyan-500/40 shadow-2xl dark:shadow-[-15px_0_50px_rgba(0,240,255,0.25)] flex flex-col overflow-hidden"
          >
            {/* Header Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-cyan-500/20 bg-slate-50 dark:bg-slate-950/90 flex items-center justify-between shadow-sm shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative p-2.5 rounded-2xl bg-cyan-100 dark:bg-gradient-to-tr dark:from-cyan-500/30 dark:to-blue-600/30 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/50 shadow-sm">
                  <Bot className="w-6 h-6 animate-pulse" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-base text-slate-900 dark:text-white flex items-center gap-1.5 tracking-wide">
                    RESEARCH AI ASSISTANT
                    <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </h3>
                  <p className="font-mono text-[11px] text-cyan-700 dark:text-cyan-400/90 flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Online • Dr. P. Chinnasamy Portfolio
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500 transition-all cursor-pointer"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick-Action Chips Toolbar */}
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/70 dark:bg-slate-950/60 overflow-x-auto flex items-center gap-2 scrollbar-none shrink-0">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest shrink-0 font-semibold">
                QUICK:
              </span>
              {QUICK_ACTIONS.map((action) => {
                const IconComp = action.icon;
                return (
                  <button
                    key={action.label}
                    onClick={() => handleSend(action.query)}
                    className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-900/90 border border-cyan-300 dark:border-cyan-500/30 hover:border-cyan-500 text-xs font-mono text-cyan-800 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-white hover:bg-cyan-50 dark:hover:bg-cyan-950 shrink-0 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <IconComp className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                    <span>{action.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2.5 max-w-[88%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-mono font-bold shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white'
                        : 'bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-500/50 text-cyan-800 dark:text-cyan-300'
                    }`}>
                      {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div className={`p-3.5 rounded-2xl font-sans text-xs sm:text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-100 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-cyan-500/30 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Animation dots when thinking */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-500/50 flex items-center justify-center text-cyan-700 dark:text-cyan-300 shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-cyan-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Follow-up Questions */}
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800/80 shrink-0">
              <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 block mb-1.5 uppercase tracking-wider font-semibold">
                SUGGESTED QUESTIONS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {FOLLOW_UP_SUGGESTIONS.slice(0, 3).map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-[11px] font-mono text-cyan-800 dark:text-cyan-300/90 hover:text-cyan-900 dark:hover:text-cyan-200 bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-950 border border-cyan-300 dark:border-cyan-500/20 hover:border-cyan-400 px-2.5 py-1 rounded-lg transition-all cursor-pointer text-left font-semibold"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input Form */}
            <div className="p-4 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-cyan-500/30 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question about Dr. Chinnasamy..."
                className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 focus:border-cyan-500 dark:focus:border-cyan-400 text-slate-900 dark:text-slate-100 font-sans text-xs sm:text-sm focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 shadow-inner"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputQuery.trim() || loading}
                className="p-3 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold disabled:opacity-40 transition-all cursor-pointer shadow-md dark:shadow-[0_0_15px_rgba(0,240,255,0.3)] shrink-0"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
