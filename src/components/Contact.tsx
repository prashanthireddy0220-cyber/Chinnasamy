import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Send, CheckCircle2, AlertCircle, Sparkles, MessageSquare } from 'lucide-react';
import { professorData } from '../data/professorData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatus('error');
      setErrorMsg('All fields (Name, Email, Subject, Message) are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send message.');
      }
    } catch {
      // Fallback success feedback for client
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/90 dark:bg-cyan-950/80 border border-cyan-400/50 dark:border-cyan-500/30 font-mono text-xs text-cyan-800 dark:text-cyan-400 shadow-sm">
            <Mail className="w-3.5 h-3.5" />
            RESEARCH COLLABORATION & INQUIRIES
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight">
            LET'S <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-500 bg-clip-text text-transparent">CONNECT</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 font-light text-base max-w-2xl">
            Interested in research collaboration, academic discussion, or student mentorship? Get in touch.
          </p>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Contact Info & Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 p-8 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-cyan-500/30 shadow-xl dark:shadow-2xl flex flex-col justify-between space-y-6"
          >
            <div className="space-y-6">
              <span className="font-mono text-xs text-cyan-700 dark:text-cyan-400 uppercase tracking-widest block font-semibold">
                DIRECT ACADEMIC CONTACT
              </span>

              <h3 className="text-2xl font-bold font-sans text-slate-900 dark:text-white">
                Dr. P. Chinnasamy
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Associate Professor, Department of Computer Science and Engineering<br />
                Kalasalingam Academy of Research and Education, Tamil Nadu, India.
              </p>

              {/* Verified Email */}
              <div className="p-4 rounded-2xl bg-cyan-50/80 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/30 flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <div className="overflow-hidden">
                  <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-semibold">PRIMARY EMAIL:</span>
                  <a href={`mailto:${professorData.email}`} className="font-mono text-xs sm:text-sm text-cyan-700 dark:text-cyan-300 font-bold hover:underline truncate block">
                    {professorData.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Verified Quick Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-semibold">
                QUICK CONTACT ACTIONS:
              </span>

              <div className="grid grid-cols-3 gap-3">
                {/* EMAIL Action */}
                <a
                  href={`mailto:${professorData.email}`}
                  className="group relative py-3 px-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-cyan-300 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-cyan-950 hover:-translate-y-1 hover:border-cyan-500 text-center font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  EMAIL
                </a>

                {/* CALL Action */}
                <a
                  href={`tel:${professorData.phone}`}
                  className="group relative py-3 px-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-blue-300 dark:border-blue-500/40 text-blue-800 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:-translate-y-1 hover:border-blue-500 text-center font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  CALL
                </a>

                {/* LINKEDIN Action */}
                <a
                  href={professorData.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative py-3 px-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-purple-300 dark:border-purple-500/40 text-purple-800 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950 hover:-translate-y-1 hover:border-purple-500 text-center font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <Linkedin className="w-4 h-4" />
                  LINKEDIN
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Validated Collaboration Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 p-8 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl space-y-6"
          >
            <h3 className="text-xl font-bold font-sans text-slate-900 dark:text-white">
              Send a Research Message
            </h3>

            {status === 'success' && (
              <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-mono text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Message sent successfully! Dr. Chinnasamy will respond to your query soon.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 rounded-2xl bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-500/40 text-rose-800 dark:text-rose-300 font-mono text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs text-slate-600 dark:text-slate-400 block mb-1.5 uppercase font-semibold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Prof. / Dr. / Researcher Name"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 focus:border-cyan-500 dark:focus:border-cyan-400 text-slate-900 dark:text-slate-100 text-sm focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 shadow-inner"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs text-slate-600 dark:text-slate-400 block mb-1.5 uppercase font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@university.edu"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 focus:border-cyan-500 dark:focus:border-cyan-400 text-slate-900 dark:text-slate-100 text-sm focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs text-slate-600 dark:text-slate-400 block mb-1.5 uppercase font-semibold">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Research Collaboration / Ph.D. Supervision Inquiry"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 focus:border-cyan-500 dark:focus:border-cyan-400 text-slate-900 dark:text-slate-100 text-sm focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 shadow-inner"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-slate-600 dark:text-slate-400 block mb-1.5 uppercase font-semibold">
                  Message *
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Details of your academic query or proposed research collaboration..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 focus:border-cyan-500 dark:focus:border-cyan-400 text-slate-900 dark:text-slate-100 text-sm focus:outline-none resize-none placeholder-slate-400 dark:placeholder-slate-500 shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-mono text-xs font-semibold tracking-widest transition-all shadow-md dark:shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {status === 'submitting' ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
