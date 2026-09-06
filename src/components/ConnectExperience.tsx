import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, CheckCircle2, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { professorData } from '../data/professorData';

interface ConnectExperienceProps {
  onConnected: () => void;
}

const RESEARCH_NODES = [
  { id: 'ai', name: 'Artificial Intelligence', label: 'AI', angle: 0 },
  { id: 'ml', name: 'Machine Learning', label: 'ML', angle: 40 },
  { id: 'cyber', name: 'Cybersecurity', label: 'Cybersecurity', angle: 80 },
  { id: 'crypto', name: 'Cryptography', label: 'Cryptography', angle: 120 },
  { id: 'cloud', name: 'Cloud Security', label: 'Cloud Security', angle: 160 },
  { id: 'access', name: 'Access Control', label: 'Access Control', angle: 200 },
  { id: 'block', name: 'Blockchain', label: 'Blockchain', angle: 240 },
  { id: 'dl', name: 'Deep Learning', label: 'Deep Learning', angle: 280 },
  { id: 'iot', name: 'IoT Security', label: 'IoT Security', angle: 320 }
];

export const ConnectExperience: React.FC<ConnectExperienceProps> = ({ onConnected }) => {
  const [connecting, setConnecting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [established, setEstablished] = useState(false);
  const [containerDimensions, setContainerDimensions] = useState({ width: 800, height: 500 });
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
    const isSmallMobile = w < 440;
    const isMobile = w < 640;

    let rx: number;
    let ry: number;

    if (isSmallMobile) {
      rx = index % 2 === 0 ? w * 0.28 : w * 0.38;
      ry = index % 2 === 0 ? 145 : 185;
    } else if (isMobile) {
      rx = index % 2 === 0 ? w * 0.30 : w * 0.38;
      ry = index % 2 === 0 ? 160 : 200;
    } else {
      // Desktop: ample radius so node labels NEVER overlap with the central avatar photo
      rx = index % 2 === 0 ? 215 : 260;
      ry = index % 2 === 0 ? 185 : 225;
    }

    const x = Math.cos(rad) * rx;
    const y = Math.sin(rad) * ry;

    return { x, y };
  };

  const handleConnect = () => {
    if (connecting || established) return;
    setConnecting(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setConnecting(false);
          setEstablished(true);

          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00f0ff', '#3b82f6', '#8b5cf6']
          });

          setTimeout(() => {
            onConnected();
          }, 1200);
          return 100;
        }
        return prev + 5;
      });
    }, 45);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden"
    >
      {/* Background Radial & Cyber Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,240,255,0.12)_0%,_rgba(5,8,17,1)_70%)] dark:block hidden" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(2,132,199,0.08)_0%,_rgba(248,250,252,1)_70%)] dark:hidden block" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70a_1px,transparent_1px),linear-gradient(to_bottom,#0284c70a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#00f0ff0a_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff0a_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      {/* Main Node Diagram Area */}
      <div ref={containerRef} className="relative w-full max-w-4xl h-[480px] md:h-[540px] flex items-center justify-center min-w-0">

        {/* Pulsing Shockwave Rings */}
        <div className={`absolute w-72 h-72 rounded-full border border-cyan-500/20 transition-all duration-700 ${connecting || established ? 'scale-150 border-cyan-400/60 animate-ping' : 'animate-pulse'}`} />
        <div className={`absolute w-96 h-96 rounded-full border border-purple-500/20 transition-all duration-700 ${connecting || established ? 'scale-125 border-purple-400/60' : ''}`} />
        <div className={`absolute w-[480px] h-[480px] rounded-full border border-blue-500/10 hidden md:block`} />

        {/* SVG Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {RESEARCH_NODES.map((node, index) => {
            const coords = getNodeCoords(node.angle, index);
            const x2Percent = 50 + (coords.x / containerDimensions.width) * 100;
            const y2Percent = 50 + (coords.y / containerDimensions.height) * 100;

            return (
              <g key={node.id}>
                <line
                  x1="50%"
                  y1="50%"
                  x2={`${x2Percent}%`}
                  y2={`${y2Percent}%`}
                  stroke={connecting || established ? "#00f0ff" : "rgba(56, 189, 248, 0.25)"}
                  strokeWidth={connecting || established ? "2.5" : "1"}
                  strokeDasharray={connecting ? "6,6" : "none"}
                  className="transition-all duration-500"
                />
                {connecting && (
                  <circle cx={`${x2Percent}%`} cy={`${y2Percent}%`} r="3" fill="#00f0ff">
                    <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Outer Research Nodes */}
        {RESEARCH_NODES.map((node, index) => {
          const coords = getNodeCoords(node.angle, index);

          return (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: connecting || established ? 1.1 : 1,
                opacity: 1,
                x: coords.x,
                y: coords.y
              }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`group absolute z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border text-xs font-mono transition-all duration-300 cursor-pointer ${
                connecting || established
                  ? 'bg-cyan-600 dark:bg-cyan-950/80 border-cyan-400 text-white dark:text-cyan-300 shadow-md dark:shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-white/90 dark:bg-slate-900/80 border-slate-300 dark:border-slate-700/80 text-slate-800 dark:text-slate-300 hover:border-cyan-500 hover:text-cyan-700 dark:hover:text-cyan-300 hover:scale-110 shadow-sm'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${connecting || established ? 'bg-white dark:bg-cyan-400 animate-ping' : 'bg-cyan-600 dark:bg-cyan-500/80 group-hover:bg-cyan-400'}`} />
              <span className="hidden sm:inline">{node.name}</span>
              <span className="sm:hidden">{node.label}</span>
            </motion.div>
          );
        })}

        {/* Center Node (Dr. P. Chinnasamy) */}
        <motion.div
          animate={{
            scale: connecting ? [1, 1.08, 1] : established ? 1.1 : 1,
            boxShadow: connecting ? '0 0 50px rgba(0,240,255,0.6)' : '0 0 25px rgba(0,240,255,0.25)'
          }}
          transition={{ repeat: connecting ? Infinity : 0, duration: 1 }}
          className={`relative z-20 w-44 h-44 md:w-52 md:h-52 rounded-full p-1.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center backdrop-blur-xl shadow-2xl transition-all duration-500 group cursor-pointer ${
            established ? 'ring-4 ring-cyan-400/80' : ''
          }`}
        >
          <div className="w-full h-full rounded-full bg-slate-900 dark:bg-[#080d1e] relative overflow-hidden border-2 border-white dark:border-slate-900 shadow-inner">
            <img
              src={professorData.faceUrl}
              alt={professorData.name}
              className="w-full h-full object-cover object-top transform group-hover:scale-108 transition-transform duration-700"
              onError={(e) => {
                (e.currentTarget.src = professorData.avatarUrl);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 dark:from-[#050811]/50 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Action Footer Controls */}
      <div className="relative z-30 flex flex-col items-center text-center mt-2 px-4 space-y-4">
        {!established && !connecting && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-2"
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-slate-600 dark:text-slate-400 flex items-center gap-2 font-semibold">
              <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              ESTABLISH A CONNECTION
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm font-light">
              Connect to Dr. Chinnasamy’s intelligent research network to enter the portfolio space.
            </p>
          </motion.div>
        )}

        {connecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center space-y-2"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-700 dark:text-cyan-400 animate-pulse font-bold">
              ESTABLISHING CONNECTION... {progress}%
            </span>
            <div className="w-64 h-2 bg-slate-200 dark:bg-slate-900 rounded-full border border-cyan-400/30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}

        {established && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center space-y-1 text-cyan-700 dark:text-cyan-400"
          >
            <div className="flex items-center gap-2 text-base md:text-lg font-mono font-bold tracking-wider">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 animate-bounce" />
              CONNECTION ESTABLISHED ✓
            </div>
            <p className="font-sans text-sm text-slate-700 dark:text-slate-200 font-light">
              WELCOME TO THE RESEARCH SPACE
            </p>
          </motion.div>
        )}

        {/* CONNECT BUTTON */}
        {!connecting && !established && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConnect}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 font-mono text-sm font-semibold tracking-widest text-white shadow-lg dark:shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-xl transition-all duration-300 border border-cyan-300/40 flex items-center gap-3 cursor-pointer"
          >
            <Network className="w-4 h-4 text-cyan-200" />
            CONNECT
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
