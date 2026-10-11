import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    // Smooth delay so the visual opening sequence completes before moving to page 2
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* 3D Envelope Container */}
      <div 
        className="relative w-72 sm:w-84 h-48 sm:h-54 cursor-pointer select-none transition-transform duration-300 hover:scale-[1.02]"
        onClick={handleOpenClick}
        role="button"
        tabIndex={0}
        aria-label="Open apology letter envelope"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleOpenClick();
          }
        }}
      >
        {/* Shadow underneath */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-black/40 blur-xl rounded-full" />

        {/* Envelope Base / Back interior */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#2B0E1B] to-[#1A0811] border border-[#5A1C34]/40 shadow-2xl overflow-hidden">
          {/* Subtle warm interior lining pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#8C2B4E_0.8px,transparent_0.8px)] [background-size:12px_12px] opacity-25" />
        </div>

        {/* Letter Inside (Peeking out and sliding up on open) */}
        <motion.div
          initial={{ y: 0, opacity: 0.85 }}
          animate={isOpen ? { y: -70, opacity: 1, scale: 1.02 } : { y: 0, opacity: 0.85 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="absolute inset-x-4 top-3 bottom-3 rounded-lg paper-parchment p-3 shadow-md flex flex-col justify-between border border-[#D5C2A5]"
        >
          <div className="flex items-center justify-between border-b border-[#D5C2A5]/40 pb-1.5">
            <span className="font-serif italic text-xs text-[#6B513E] tracking-wider">For My Best Friend</span>
            <Heart className="w-3.5 h-3.5 text-[#B8405E] fill-[#B8405E]/40" />
          </div>
          <div className="space-y-1.5 my-auto px-1">
            <div className="h-1.5 w-4/5 bg-[#C9B89E]/60 rounded-full" />
            <div className="h-1.5 w-11/12 bg-[#C9B89E]/45 rounded-full" />
            <div className="h-1.5 w-2/3 bg-[#C9B89E]/50 rounded-full" />
          </div>
          <div className="text-right">
            <span className="font-handwriting text-sm text-[#7D2840]">With all my heart...</span>
          </div>
        </motion.div>

        {/* Envelope Front Left & Right Fold Panels */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left triangle flap */}
          <div 
            className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-tr from-[#3A1324] via-[#2F0F1D] to-[#250B16] border-l border-b border-[#631D38]/30 shadow-md"
            style={{
              clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
            }}
          />
          {/* Right triangle flap */}
          <div 
            className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-tl from-[#3A1324] via-[#2F0F1D] to-[#250B16] border-r border-b border-[#631D38]/30 shadow-md"
            style={{
              clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)',
            }}
          />
          {/* Bottom triangle flap */}
          <div 
            className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#45162B] to-[#300E1D] border-b border-[#732342]/40 shadow-lg"
            style={{
              clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
            }}
          />
        </div>

        {/* Envelope Top Flap (Flips open in 3D) */}
        <motion.div
          className="absolute top-0 inset-x-0 h-1/2 origin-top z-20 pointer-events-none"
          initial={{ rotateX: 0 }}
          animate={isOpen ? { rotateX: 180, zIndex: 1 } : { rotateX: 0, zIndex: 20 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className="w-full h-full bg-gradient-to-b from-[#551933] to-[#3B1223] border-t border-[#7E2849]/50 shadow-md"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
            }}
          />
        </motion.div>

        {/* Wax Seal / Rose Gold Heart Emblem (Fades when opened) */}
        <motion.div
          animate={isOpen ? { scale: 0, opacity: 0 } : { scale: [1, 1.05, 1], opacity: 1 }}
          transition={isOpen ? { duration: 0.3 } : { repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[#B8405E] via-[#8F2340] to-[#5C1126] border border-[#F4B6C2]/40 shadow-[0_4px_16px_rgba(184,64,94,0.5)]"
        >
          <Heart className="w-5 h-5 text-[#FAF6EE] fill-[#FAF6EE]" />
        </motion.div>
      </div>

      {/* Button: "Open My Letter 💌" */}
      <motion.button
        type="button"
        onClick={handleOpenClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        disabled={isOpen}
        className="mt-8 relative group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#B8405E] via-[#D25374] to-[#B8405E] text-[#FFF7F8] font-sans font-medium text-base shadow-[0_4px_24px_rgba(184,64,94,0.45)] hover:shadow-[0_6px_32px_rgba(184,64,94,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4B6C2] transition-all cursor-pointer min-h-[48px]"
      >
        <span className="relative z-10 flex items-center gap-2 font-medium tracking-wide">
          {isOpen ? 'Opening letter...' : 'Open My Letter 💌'}
        </span>
        <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>
    </div>
  );
};
