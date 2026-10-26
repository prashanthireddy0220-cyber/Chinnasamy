import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, User, RefreshCw, ChevronRight, Award, BookOpen, Shield, GraduationCap, Phone, Sparkle } from 'lucide-react';
import { professorData } from '../data/professorData';
import { generateAIResponse } from '../data/aiKnowledgeEngine';

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
  { label: 'Train Models AI', icon: Sparkles, query: 'How does Dr. Chinnasamy train AI and Machine Learning models?' },
  { label: 'Publications', icon: BookOpen, query: 'Show me recent publications and papers.' },
  { label: 'Patents', icon: Sparkles, query: 'What granted patents and innovations does he have?' },
  { label: 'Supervision', icon: GraduationCap, query: 'Who are his supervised Ph.D. scholars?' },
  { label: 'Awards', icon: Award, query: 'What international awards and recognitions has he received?' },
  { label: 'Contact', icon: Phone, query: 'How can I contact or collaborate with Dr. Chinnasamy?' }
];

const FOLLOW_UP_SUGGESTIONS = [
  "How does he train AI and Machine Learning models?",
  "What is his Ph.D. thesis topic?",
  "Tell me about the Stanford Top 2% ranking (2025 & 2026).",
  "What patents and innovations does he hold?",
  "What professional memberships does he hold?",
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
    return generateAIResponse(q);
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

      const localAnswer = generateAnswer(q);

      if (res.ok) {
        const data = await res.json();
        const hasValidAnswer = data.answer && !data.answer.includes("I don't have that information");
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: hasValidAnswer ? data.answer : localAnswer
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
      }, 300);
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
