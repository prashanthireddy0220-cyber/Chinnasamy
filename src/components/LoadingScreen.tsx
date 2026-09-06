import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1400; // 1.4 seconds smooth loading
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-white transition-colors duration-300"
    >
      {/* Background grid lines effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c708_1px,transparent_1px),linear-gradient(to_bottom,#0284c708_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Glow aura */}
      <div className="absolute w-72 h-72 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />

      <div className="relative flex flex-col items-center z-10">
        {/* SVG Progress Ring */}
        <div className="relative flex items-center justify-center w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background ring */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="rgba(14, 165, 233, 0.15)"
              strokeWidth="4"
              fill="transparent"
            />
            {/* Progress ring */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="url(#cyan-purple-gradient)"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-75 ease-out"
            />
            <defs>
              <linearGradient id="cyan-purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Percentage */}
          <div className="absolute flex flex-col items-center">
            <span className="font-mono text-3xl font-bold tracking-tighter text-cyan-600 dark:text-cyan-400">
              {progress}%
            </span>
          </div>
        </div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex flex-col items-center space-y-2"
        >
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400 flex items-center gap-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping" />
            LOADING RESEARCH SYSTEM
          </span>

          <h2 className="font-sans text-xl font-semibold tracking-widest text-slate-900 dark:text-slate-200 mt-2">
            DR. P. CHINNASAMY
          </h2>

          <p className="font-mono text-[10px] tracking-wider text-slate-500">
            ASSOCIATE PROFESSOR • KARE
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
