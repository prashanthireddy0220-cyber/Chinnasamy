import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ConnectExperience } from './components/ConnectExperience';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ResearchConstellation } from './components/ResearchConstellation';
import { AcademicTimeline } from './components/AcademicTimeline';
import { ResearchSupervision } from './components/ResearchSupervision';
import { Publications } from './components/Publications';
import { Patents } from './components/Patents';
import { FundedResearch } from './components/FundedResearch';
import { Awards } from './components/Awards';
import { Leadership } from './components/Leadership';
import { Certifications } from './components/Certifications';
import { AcademicService } from './components/AcademicService';
import { Reviewer } from './components/Reviewer';
import { ResearchMap } from './components/ResearchMap';
import { ResearchAI } from './components/ResearchAI';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';
import { ThemeBackground } from './components/ThemeBackground';

type AppStage = 'loading' | 'welcome' | 'connect' | 'portfolio';

export function App() {
  const [stage, setStage] = useState<AppStage>('loading');
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500 selection:text-black transition-colors duration-300 relative">
      <ThemeBackground />
      <AnimatePresence mode="wait">
        {/* Stage 1: Loading Screen */}
        {stage === 'loading' && (
          <LoadingScreen
            key="loading"
            onComplete={() => setStage('welcome')}
          />
        )}

        {/* Stage 2: Welcome Screen */}
        {stage === 'welcome' && (
          <WelcomeScreen
            key="welcome"
            onComplete={() => setStage('connect')}
          />
        )}

        {/* Stage 3: Signature CONNECT Experience */}
        {stage === 'connect' && (
          <ConnectExperience
            key="connect"
            onConnected={() => setStage('portfolio')}
          />
        )}
      </AnimatePresence>

      {/* Main Academic Research Portfolio */}
      {stage === 'portfolio' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Header Navbar */}
          <Navbar onOpenAI={() => setAiModalOpen(true)} />

          {/* Hero Section */}
          <Hero onOpenCV={() => setCvModalOpen(true)} />

          {/* About & Research Identity */}
          <About />

          {/* Research Constellation Graph */}
          <ResearchConstellation />

          {/* Academic & Professional Journey Timelines */}
          <AcademicTimeline />

          {/* Research Supervision */}
          <ResearchSupervision />

          {/* Publications Command Center */}
          <Publications />

          {/* Patents & Innovations */}
          <Patents />

          {/* Funded Research */}
          <FundedResearch />

          {/* Awards & Recognition */}
          <Awards />

          {/* Academic Leadership */}
          <Leadership />

          {/* Certifications */}
          <Certifications />

          {/* Academic Service */}
          <AcademicService />

          {/* Journal Reviewer Roles */}
          <Reviewer />

          {/* Research Ecosystem Map */}
          <ResearchMap />

          {/* Contact Section */}
          <Contact />

          {/* Footer */}
          <Footer />

          {/* Floating AI Drawer / Modal */}
          <ResearchAI
            isOpen={aiModalOpen}
            onClose={() => setAiModalOpen(false)}
          />

          {/* Download CV Modal */}
          <CVModal
            isOpen={cvModalOpen}
            onClose={() => setCvModalOpen(false)}
          />
        </motion.div>
      )}
    </div>
  );
}

export default App;
