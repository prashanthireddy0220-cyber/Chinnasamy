import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Sparkles, BookOpen, ChevronRight, Zap } from 'lucide-react';

interface ConstellationNode {
  id: string;
  title: string;
  shortDesc: string;
  topics: string[];
  angle: number;
}

const CONSTELLATION_NODES: ConstellationNode[] = [
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    shortDesc: 'Cognitive intelligence engines & adaptive algorithm frameworks.',
    topics: ['Personalized Learning AI', 'Cognitive Pedagogy', 'Decision Intelligence', 'Sub-network Optimization'],
    angle: 0
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    shortDesc: 'Supervised & ensemble classification algorithms.',
    topics: ['Drug-Drug Interaction ML', 'Chronic Kidney Disease Classifiers', 'Multi-label Feature Selection'],
    angle: 36
  },
  {
    id: 'cyber',
    title: 'Cybersecurity',
    shortDesc: 'Polymorphic malware analysis & network intrusion prevention.',
    topics: ['6G Intrusion Prevention', 'Zero-day Threat Detection', 'Network Telemetry Filters'],
    angle: 72
  },
  {
    id: 'crypto',
    title: 'Cryptography',
    shortDesc: 'Attribute-based encryption & privacy-preserving schemes.',
    topics: ['CP-ABE Schemes', 'Visual Cryptography', 'Post-Quantum Primitives', 'Key Management'],
    angle: 108
  },
  {
    id: 'cloud',
    title: 'Cloud Security',
    shortDesc: 'Multi-tenant cloud storage protection & lightweight decryption.',
    topics: ['Cloud Storage Access Control', 'Decryption Overhead Optimization', 'Encrypted Cloud Repositories'],
    angle: 144
  },
  {
    id: 'access',
    title: 'Access Control',
    shortDesc: 'Multilabel Access Control as a Service (ACaaS).',
    topics: ['Fine-grained Multilabel Control', 'Role-Based Access (RBAC)', 'Cloud Storage Policy Engine'],
    angle: 180
  },
  {
    id: 'blockchain',
    title: 'Blockchain',
    shortDesc: 'Decentralized provenance ledgers & educational certificate validation.',
    topics: ['Medi-Chain Drug Tracking', 'Educational Certificate Blockchain', 'Smart Contracts'],
    angle: 216
  },
  {
    id: 'dl',
    title: 'Deep Learning',
    shortDesc: 'Hybrid CNN-LSTM networks & computer vision liveness detection.',
    topics: ['Lung Cancer Analysis CNN', 'Facial Liveness Detection', 'Hairstyle AR CNN', 'Hybrid CNN-LSTM'],
    angle: 252
  },
  {
    id: 'healthcare',
    title: 'Healthcare Security',
    shortDesc: 'HCAC-EHR hybrid access control & secure medical record retrieval.',
    topics: ['HCAC-EHR Cloud', 'Visual Cryptography EHR', 'COVID-19 Face Tracking', 'Postpartum Depression ML'],
    angle: 288
  },
  {
    id: 'iot',
    title: 'IoT Security',
    shortDesc: 'Wireless sensor network threat analysis & smart monitors.',
    topics: ['WSN Threat Response', 'Smart Cradle IoT', 'Solar Weather Monitoring Node', 'Smart Bus Tracking'],
    angle: 324
  }
];

export const ResearchConstellation: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('ai');
  const [containerDimensions, setContainerDimensions] = useState({ width: 600, height: 480 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getNodeCoords = (angle: number, index: number) => {
    const rad = (angle * Math.PI) / 180;
    const w = containerDimensions.width;
    const isSmallMobile = w < 380;
    const isMobile = w < 640;

    let rx: number;
    let ry: number;

    if (isSmallMobile) {
      // 320px - 380px screens: narrow space, use alternating inner/outer radii
      rx = index % 2 === 0 ? w * 0.23 : w * 0.31;
      ry = index % 2 === 0 ? 145 : 185;
    } else if (isMobile) {
      // 381px - 639px screens
      rx = index % 2 === 0 ? w * 0.27 : w * 0.34;
      ry = index % 2 === 0 ? 150 : 185;
    } else {
      // Desktop (640px+)
      rx = 175;
      ry = 150;
    }

    const x = Math.cos(rad) * rx;
    const y = Math.sin(rad) * ry;

    return { x, y };
  };

  const activeNode = CONSTELLATION_NODES.find(n => n.id === activeNodeId) || CONSTELLATION_NODES[0];

  return (
    <section id="research" className="py-24 relative bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      {/* Background Radial & Cyber Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-100/40 via-slate-50 to-slate-50 dark:from-cyan-950/20 dark:via-[#050811] dark:to-[#050811] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c708_1px,transparent_1px),linear-gradient(to_bottom,#0284c708_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#00f0ff06_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff06_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Title */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/90 dark:bg-cyan-950/80 border border-cyan-400/50 dark:border-cyan-500/30 font-mono text-xs text-cyan-800 dark:text-cyan-400 shadow-sm">
            <Network className="w-3.5 h-3.5" />
            INTERACTIVE RESEARCH CONSTELLATION
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans text-slate-900 dark:text-white tracking-tight">
            RESEARCH <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-500 bg-clip-text text-transparent">CONSTELLATION</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 font-light text-base max-w-2xl">
            Explore the interconnected ecosystem of Dr. Chinnasamy’s research domains. Click any node to reveal underlying topics and innovations.
          </p>
        </div>

        {/* Constellation Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Visual Interactive Constellation Canvas */}
          <div
            ref={containerRef}
            className="lg:col-span-7 relative w-full h-[480px] min-[400px]:h-[520px] sm:h-[500px] flex items-center justify-center bg-white/70 dark:bg-slate-950/40 rounded-3xl border border-cyan-400/30 dark:border-cyan-500/20 p-2 sm:p-4 shadow-xl overflow-hidden min-w-0"
          >

            {/* Orbiting concentric ring guides */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-cyan-500/15 pointer-events-none animate-pulse-slow" />
            <div className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-purple-500/15 pointer-events-none" />

            {/* Central Node: RESEARCH */}
            <div className="relative z-20 w-20 h-20 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 shadow-lg dark:shadow-[0_0_30px_rgba(0,240,255,0.4)] flex items-center justify-center text-center shrink-0">
              <div className="w-full h-full rounded-full bg-slate-900 dark:bg-[#080d1e] flex flex-col items-center justify-center p-1 sm:p-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mb-0.5 sm:mb-1 animate-pulse" />
                <span className="font-mono font-bold text-[11px] sm:text-sm text-cyan-300 tracking-wider">
                  RESEARCH
                </span>
                <span className="font-mono text-[7px] sm:text-[8px] text-slate-400 uppercase">CORE</span>
              </div>
            </div>

            {/* SVG Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {CONSTELLATION_NODES.map((node, index) => {
                const coords = getNodeCoords(node.angle, index);
                const x2Percent = 50 + (coords.x / containerDimensions.width) * 100;
                const y2Percent = 50 + (coords.y / containerDimensions.height) * 100;
                const isActive = node.id === activeNodeId;

                return (
                  <line
                    key={node.id}
                    x1="50%"
                    y1="50%"
                    x2={`${x2Percent}%`}
                    y2={`${y2Percent}%`}
                    stroke={isActive ? "#0284c7" : "rgba(14, 165, 233, 0.25)"}
                    strokeWidth={isActive ? "2.5" : "1"}
                    strokeDasharray={isActive ? "4,4" : "none"}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>

            {/* Satellite Nodes */}
            {CONSTELLATION_NODES.map((node, index) => {
              const coords = getNodeCoords(node.angle, index);
              const isActive = node.id === activeNodeId;

              return (
                <motion.button
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  style={{ x: coords.x, y: coords.y }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group absolute z-30 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full backdrop-blur-md border font-mono text-[10px] sm:text-xs transition-all duration-300 flex items-center gap-1 sm:gap-1.5 cursor-pointer max-w-[135px] min-[400px]:max-w-[160px] sm:max-w-none ${
                    isActive
                      ? 'bg-cyan-600 dark:bg-cyan-500 text-white dark:text-black font-bold border-cyan-400 dark:border-cyan-300 shadow-md dark:shadow-[0_0_20px_rgba(0,240,255,0.6)] scale-105 sm:scale-110'
                      : 'bg-white/90 dark:bg-slate-900/80 text-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700/80 hover:border-cyan-500 hover:text-cyan-700 dark:hover:text-cyan-300 shadow-sm'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-white dark:bg-black animate-ping' : 'bg-cyan-500 dark:bg-cyan-400 group-hover:animate-ping'}`} />
                  <span className="truncate">{node.title}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Column: Node Details Inspector Card */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-cyan-500/30 shadow-xl dark:shadow-2xl flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-cyan-700 dark:text-cyan-400 tracking-widest uppercase flex items-center gap-1.5 font-semibold">
                      <Zap className="w-4 h-4" />
                      NODE DETAILS
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-mono text-[10px]">
                      {activeNode.id.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-sans text-slate-900 dark:text-white">
                    {activeNode.title}
                  </h3>

                  <p className="text-slate-700 dark:text-slate-300 font-light text-sm leading-relaxed">
                    {activeNode.shortDesc}
                  </p>
                </div>

                {/* Sub-Topics List */}
                <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                    Core Focus Topics:
                  </h4>
                  <div className="space-y-2">
                    {activeNode.topics.map((topic, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#publications"
                    className="inline-flex items-center gap-2 text-xs font-mono text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 hover:underline font-semibold"
                  >
                    <BookOpen className="w-4 h-4" />
                    View Publications in {activeNode.title} →
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
