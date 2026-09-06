import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Lock, Database, Shield, HeartPulse, CheckCircle2 } from 'lucide-react';

const ECOSYSTEM_PATHWAYS = [
  {
    title: 'Intelligent Systems & Healthcare AI Pathway',
    icon: Brain,
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-400/40 dark:border-cyan-500/40',
    steps: [
      { name: 'Artificial Intelligence', desc: 'Cognitive Engine Architectures' },
      { name: 'Machine Learning', desc: 'Classification & Predictive Models' },
      { name: 'Deep Learning', desc: 'Hybrid CNN-LSTM Networks' },
      { name: 'Healthcare & Cybersecurity', desc: 'EHR Protection & Medical AI' }
    ]
  },
  {
    title: 'Cryptographic Cloud Security Pathway',
    icon: Lock,
    color: 'from-purple-500 to-indigo-600',
    borderColor: 'border-purple-400/40 dark:border-purple-500/40',
    steps: [
      { name: 'Cryptography', desc: 'Attribute-Based Encryption (CP-ABE)' },
      { name: 'Access Control', desc: 'Multilabel Access Control (ACaaS)' },
      { name: 'Cloud Security', desc: 'Scalable Cloud Repositories' },
      { name: 'Secure Data Retrieval', desc: 'Zero-Leakage Cloud Ecosystems' }
    ]
  },
  {
    title: 'Decentralized Trust & Blockchain Pathway',
    icon: Database,
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-400/40 dark:border-emerald-500/40',
    steps: [
      { name: 'Blockchain', desc: 'Immutable Ledger Primitives' },
      { name: 'Trust & Provenance', desc: 'Smart Contract Protocols' },
      { name: 'Role-Based Access', desc: 'ML-Driven Identity Logic' },
      { name: 'Education & Healthcare', desc: 'Medi-Chain & Certificate Validation' }
    ]
  }
];

export const ResearchMap: React.FC = () => {
  return (
    <section id="ecosystem" className="py-24 relative bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* Background Radial */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/90 dark:bg-cyan-950/80 border border-cyan-400/50 dark:border-cyan-500/30 font-mono text-xs text-cyan-800 dark:text-cyan-400 shadow-sm">
            <Shield className="w-3.5 h-3.5" />
            RESEARCH INTEGRATION & MAP
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight">
            RESEARCH <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-500 bg-clip-text text-transparent">ECOSYSTEM</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 font-light text-base max-w-2xl">
            Visualizing the synergistic interconnections across Dr. Chinnasamy’s core research pathways.
          </p>
        </div>

        {/* Pathways Stack */}
        <div className="space-y-12">
          {ECOSYSTEM_PATHWAYS.map((pathway, idx) => {
            const PathwayIcon = pathway.icon;
            return (
              <motion.div
                key={pathway.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`p-8 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border ${pathway.borderColor} shadow-xl dark:shadow-2xl space-y-6`}
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${pathway.color} text-white shadow-lg`}>
                    <PathwayIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 dark:text-white">
                    {pathway.title}
                  </h3>
                </div>

                {/* Horizontal Connected Nodes Flow */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                  {pathway.steps.map((step, stepIdx) => (
                    <div key={step.name} className="relative flex flex-col justify-between p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-cyan-700 dark:text-cyan-400 font-bold">
                          STAGE 0{stepIdx + 1}
                        </span>
                        {stepIdx < 3 && (
                          <ArrowRight className="w-4 h-4 text-cyan-600 dark:text-cyan-400 hidden md:block" />
                        )}
                      </div>

                      <h4 className="font-sans font-bold text-base text-slate-900 dark:text-slate-100">
                        {step.name}
                      </h4>

                      <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
