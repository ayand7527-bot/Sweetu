import React from 'react';
import { motion } from 'motion/react';
import { Envelope } from '../Envelope';
import { Sparkles } from 'lucide-react';

interface Page1SurpriseProps {
  onOpenLetter: () => void;
}

export const Page1Surprise: React.FC<Page1SurpriseProps> = ({ onOpenLetter }) => {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 max-w-xl mx-auto">
      {/* Subtle glowing badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#35101F]/60 border border-[#631D38]/50 text-xs text-[#F7D6D8] tracking-widest uppercase mb-6"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#F4B6C2]" />
        <span>From Someone Who Really Cares</span>
      </motion.div>

      {/* Main heading */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#FAF6EE] glow-text-subtle mb-3"
      >
        Hey, Bestie... 🥺
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35 }}
        className="font-sans text-base sm:text-lg text-[#E0CFD6] max-w-md mx-auto leading-relaxed mb-10 font-normal"
      >
        I have something to tell you. Please read this till the end.
      </motion.p>

      {/* Envelope + Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex justify-center"
      >
        <Envelope onOpen={onOpenLetter} />
      </motion.div>

      {/* Reassuring micro-note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-xs text-[#C5A8B5] mt-10 tracking-wide font-sans"
      >
        Take a quiet breath · Just for you and me
      </motion.p>
    </div>
  );
};
