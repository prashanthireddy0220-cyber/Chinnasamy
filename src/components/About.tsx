import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, Cpu, Database, Lock, Globe, Server, CheckCircle, Activity, Award } from 'lucide-react';
import { professorData } from '../data/professorData';

const FOCUS_AREA_DETAILS: Record<string, { icon: any; summary: string; details: string }> = {
  "Artificial Intelligence": {
    icon: Brain,
    summary: "Cognitive intelligence engines & personalized learning frameworks.",
    details: "Focusing on cognitive AI architectures, autonomous decision-making engines, and intelligent pedagogy modeling."
  },
  "Machine Learning": {
    icon: Cpu,
    summary: "Predictive analytics & drug-interaction models.",
    details: "Utilizing classification, ensemble algorithms, and feature extraction for healthcare diagnostics and threat prediction."
  },
  "Cybersecurity": {
    icon: Shield,
    summary: "Polymorphic malware analysis & 6G intrusion detection.",
    details: "Designing resilient threat monitoring protocols, anomaly detection filters, and security mechanisms against zero-day exploits."
  },
  "Cryptography": {
    icon: Lock,
    summary: "Attribute-based encryption (CP-ABE) & hybrid algorithms.",
    details: "Pioneering mathematical cryptography, key-policy attribute-based encryption, and visual cryptography for medical data."
  },
  "Cloud Security": {
    icon: Server,
    summary: "Scalable access control as a service (ACaaS) & cloud storage.",
    details: "Engineering multi-tenant access control mechanisms and lightweight decryption schemes for secure cloud repositories."
  },
  "Access Control": {
    icon: Lock,
    summary: "Multilabel & fine-grained access policies.",
    details: "Researching scalable, multilabel-based access control frameworks for cloud ecosystems and enterprise EHR systems."
  },
  "Blockchain": {
    icon: Database,
    summary: "Medi-Chain drug tracking & educational certificate validation.",
    details: "Developing decentralized smart contract frameworks for pharmaceutical supply chain provenance and tamper-proof records."
  },
  "Deep Learning": {
    icon: Activity,
    summary: "CNN/LSTM healthcare diagnostics & computer vision.",
    details: "Applying hybrid CNN-LSTM networks for chronic kidney disease detection, lung cancer analysis, and facial liveness scanning."
  },
  "Healthcare Security": {
    icon: Shield,
    summary: "HCAC-EHR hybrid access control & privacy protection.",
    details: "Safeguarding electronic health records (EHR) through visual cryptography and post-quantum health record privacy."
  },
  "IoT Security": {
    icon: Globe,
    summary: "Wireless sensor network threat response & smart monitoring.",
    details: "Implementing threat analysis for wireless sensor networks, smart cradle monitoring systems, and solar weather IoT nodes."
  },
  "Cloud Computing": {
    icon: Server,
    summary: "Distributed cloud infrastructure & microservice authorization.",
    details: "Designing scalable cloud storage architectures with optimal decryption overhead for resource-constrained client devices."
  }
};

export const About: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string>("Cryptography");

  const activeDetail = FOCUS_AREA_DETAILS[selectedArea] || FOCUS_AREA_DETAILS["Cryptography"];
  const IconComponent = activeDetail.icon;

  return (
    <section id="about" className="py-24 relative bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/90 dark:bg-cyan-950/80 border border-cyan-400/50 dark:border-cyan-500/30 font-mono text-xs text-cyan-800 dark:text-cyan-400 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
            ACADEMIC PROFILE & IDENTITY
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight">
            ABOUT <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">DR. P. CHINNASAMY</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 font-light text-base max-w-2xl">
            Associate Professor at Kalasalingam Academy of Research and Education (KARE), Tamil Nadu.
            Bridging theoretical computer science with practical intelligent cybersecurity solutions.
          </p>
        </div>

        {/* Top Grid: Bio Card + Identity Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

          {/* Left: Academic Identity Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 p-8 rounded-3xl bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6 shadow-xl dark:shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-700 dark:text-cyan-400 tracking-wider uppercase font-semibold">
                  CAREER PROFILE
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-400/50 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 font-mono text-xs">
                  ACTIVE RESEARCHER
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-sans">
                Research Identity & Leadership
              </h3>

              <p className="text-slate-700 dark:text-slate-300 font-light leading-relaxed text-sm sm:text-base">
                Dr. P. Chinnasamy is an accomplished academician and researcher specializing in{' '}
                <strong className="text-cyan-700 dark:text-cyan-300 font-medium">Artificial Intelligence, Cybersecurity, Cryptography, and Cloud Access Control</strong>.
                He earned his Ph.D. in Computer Science and Engineering in March 2019, focusing on scalable access control for cloud storage.
                With over a decade of combined teaching, industrial training, and supervisory experience, he leads advanced doctoral research projects at Kalasalingam Academy of Research and Education.
              </p>
            </div>

            {/* Credentials Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-mono text-xs text-slate-900 dark:text-slate-200 font-semibold">Ph.D. in Computer Science</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Awarded March 2019 (Cloud Storage Access Control)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-mono text-xs text-slate-900 dark:text-slate-200 font-semibold">M.Tech (CGPA: 9.45 / 10)</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Kalasalingam University (2015)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-mono text-xs text-slate-900 dark:text-slate-200 font-semibold">Top 2% World Ranking</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Stanford–Elsevier Global Ranking 2025 (AI & Image)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-mono text-xs text-slate-900 dark:text-slate-200 font-semibold">International Collaborative Partner</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Senior Research Associate @ UTAR Malaysia</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Interactive Focus Areas Inspector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 p-8 rounded-3xl bg-white/90 dark:bg-slate-900/60 backdrop-blur-xl border border-cyan-400/30 dark:border-cyan-500/20 flex flex-col justify-between space-y-6 shadow-xl relative"
          >
            <div className="space-y-3">
              <span className="font-mono text-xs text-purple-600 dark:text-purple-400 tracking-wider uppercase flex items-center gap-2 font-semibold">
                <Brain className="w-4 h-4" />
                INTERACTIVE DOMAIN INSPECTOR
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-sans">
                Research Specializations
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
                Click on any focus area tag below to inspect Dr. Chinnasamy's specialized contribution:
              </p>
            </div>

            {/* Selected Focus Area Detail Card */}
            <div className="p-5 rounded-2xl bg-cyan-50/80 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/30 space-y-3 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-400/40">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono font-bold text-sm text-cyan-800 dark:text-cyan-300">
                    {selectedArea}
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">{activeDetail.summary}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-2 border-t border-cyan-300/40 dark:border-cyan-500/20">
                {activeDetail.details}
              </p>
            </div>

            {/* Focus Area Tags Selector */}
            <div className="flex flex-wrap gap-2 pt-2">
              {professorData.researchAreas.map((area) => {
                const isSelected = selectedArea === area;
                return (
                  <button
                    key={area}
                    onClick={() => setSelectedArea(area)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold shadow-md dark:shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                        : 'bg-slate-100 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {area}
                  </button>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
