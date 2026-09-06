import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const GREETINGS = [
  { text: "Hello", lang: "English" },
  { text: "வணக்கம்", lang: "Tamil" },
  { text: "నమస్కారం", lang: "Telugu" },
  { text: "नमस्ते", lang: "Hindi" },
  { text: "ನಮಸ್ಕಾರ", lang: "Kannada" },
  { text: "നമസ്കാരം", lang: "Malayalam" },
  { text: "নমস্কার", lang: "Bengali" },
  { text: "Bonjour", lang: "French" },
  { text: "Hola", lang: "Spanish" },
  { text: "Ciao", lang: "Italian" },
  { text: "Hallo", lang: "German" },
  { text: "مرحباً", lang: "Arabic" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "你好", lang: "Chinese" },
  { text: "안녕하세요", lang: "Korean" },
  { text: "Hello", lang: "English" }
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < GREETINGS.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 260);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        onComplete();
      }, 950);
      return () => clearTimeout(finalTimer);
    }
  }, [currentIndex, onComplete]);

  const currentGreeting = GREETINGS[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden"
    >
      {/* Dynamic Background Network Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-100/30 via-slate-50 to-slate-50 dark:from-cyan-900/20 dark:via-[#050811] dark:to-[#050811]" />

      <div className="relative z-10 max-w-3xl px-6 text-center flex flex-col items-center space-y-6">
        {/* Multi-language Greeting Heading */}
        <div className="h-28 md:h-36 flex items-center justify-center relative w-full overflow-visible">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-cyan-600 dark:from-white dark:via-slate-200 dark:to-cyan-400 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_35px_rgba(0,240,255,0.35)] py-2 select-none"
            >
              {currentGreeting.text}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-700 dark:text-slate-300 font-light max-w-2xl leading-relaxed"
        >
          Explore the research, innovation and academic journey of{' '}
          <span className="font-semibold text-cyan-700 dark:text-cyan-300 whitespace-nowrap">Dr. P. Chinnasamy</span>.
        </motion.p>

        {/* Progress bar indicator */}
        <div className="w-48 h-0.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-6 overflow-hidden opacity-70">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${((currentIndex + 1) / GREETINGS.length) * 100}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};
