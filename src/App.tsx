import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { HeaderNav } from './components/HeaderNav';
import { Page1Surprise } from './components/pages/Page1Surprise';
import { Page2Apology } from './components/pages/Page2Apology';
import { Page3WhatIWantYouToKnow } from './components/pages/Page3WhatIWantYouToKnow';
import { Page4HeartLetter } from './components/pages/Page4HeartLetter';
import { Page5FinalMessage } from './components/pages/Page5FinalMessage';
import { ambientSound } from './utils/ambientAudio';

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(1);

  const totalPages = 5;

  // Handle user starting audio
  const startAudioIfAllowed = useCallback(() => {
    if (!ambientSound.getIsPlaying()) {
      ambientSound.start();
      setIsAudioPlaying(true);
    }
  }, []);

  const handleToggleAudio = useCallback(() => {
    const active = ambientSound.toggleMute();
    setIsAudioPlaying(active);
  }, []);

  const goToNext = useCallback(() => {
    if (currentPage < totalPages) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
      startAudioIfAllowed();
    }
  }, [currentPage, totalPages, startAudioIfAllowed]);

  const goToPrev = useCallback(() => {
    if (currentPage > 1) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        setDirection(page > currentPage ? 1 : -1);
        setCurrentPage(page);
        startAudioIfAllowed();
      }
    },
    [currentPage, totalPages, startAudioIfAllowed]
  );

  const handleOpenLetter = useCallback(() => {
    startAudioIfAllowed();
    setDirection(1);
    setCurrentPage(2);
  }, [startAudioIfAllowed]);

  const handleRestart = useCallback(() => {
    setDirection(-1);
    setCurrentPage(1);
  }, []);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentPage < totalPages) {
        goToNext();
      } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, goToNext, goToPrev]);

  // Page motion variants
  const pageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <div className="relative min-h-screen bg-[#120D12] text-[#F7F2EC] flex flex-col justify-between selection:bg-[#B8405E]/40 selection:text-white overflow-x-hidden">
      {/* Background dynamic ambient particles / stars */}
      <ParticleCanvas mode={currentPage === 1 ? 'stars' : 'ambient'} />

      {/* Atmospheric radial gradient vignettes */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(184,64,94,0.18),rgba(255,255,255,0))]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_50%_120%,rgba(74,21,37,0.25),rgba(255,255,255,0))]" />

      {/* Persistent sticky header with step indicators & audio toggle */}
      <HeaderNav
        currentPage={currentPage}
        totalPages={totalPages}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        onSelectPage={goToPage}
        onNext={goToNext}
        onPrev={goToPrev}
      />

      {/* Main Content Area */}
      <main className="relative flex-1 flex items-center justify-center w-full px-2 sm:px-4 py-4 sm:py-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            {currentPage === 1 && <Page1Surprise onOpenLetter={handleOpenLetter} />}
            {currentPage === 2 && (
              <Page2Apology onNext={goToNext} onPrev={goToPrev} />
            )}
            {currentPage === 3 && (
              <Page3WhatIWantYouToKnow onNext={goToNext} onPrev={goToPrev} />
            )}
            {currentPage === 4 && (
              <Page4HeartLetter onNext={goToNext} onPrev={goToPrev} />
            )}
            {currentPage === 5 && (
              <Page5FinalMessage onPrev={goToPrev} onRestart={handleRestart} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Discreet bottom footer */}
      <footer className="w-full py-3 px-4 text-center text-[11px] text-[#A68896] tracking-wider font-sans border-t border-[#2A0E1A]/40 bg-[#120D12]/60 backdrop-blur-xs">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <span>Made sincerely from the heart</span>
          <span>Best friends forever 🫂</span>
        </div>
      </footer>
    </div>
  );
}
