import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, Heart, Feather } from 'lucide-react';

interface Page4HeartLetterProps {
  onNext: () => void;
  onPrev: () => void;
}

export const Page4HeartLetter: React.FC<Page4HeartLetterProps> = ({ onNext, onPrev }) => {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-xl mx-auto">
      {/* Chapter header */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xs text-[#E8A5B8] uppercase tracking-widest font-sans mb-5 flex items-center gap-1.5"
      >
        <Feather className="w-3.5 h-3.5 text-[#F4B6C2]" />
        <span>A Letter From My Heart</span>
      </motion.div>

      {/* Realistic Animated Paper Letter */}
      <motion.div
        initial={{ opacity: 0, y: 25, rotate: -0.5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }}
        className="w-full relative paper-parchment rounded-xl p-6 sm:p-9 border border-[#DECDB3] text-[#2C1810] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_2px_10px_rgba(40,10,20,0.2)]"
      >
        {/* Subtle decorative paper watermark & wax stamp */}
        <div className="absolute top-5 right-5 sm:top-6 sm:right-6 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#8C2341] to-[#551025] shadow-md border border-[#F4B6C2]/30 text-[#FAF6EE]">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
        </div>

        {/* Realistic paper crease line */}
        <div className="absolute inset-x-0 top-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#C4B29A]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-2/3 h-[1px] bg-gradient-to-r from-transparent via-[#C4B29A]/40 to-transparent pointer-events-none" />

        {/* Salutation */}
        <div className="mb-5 border-b border-[#D8C7AF] pb-3 pr-12">
          <p className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#3A1822]">
            Dear Bestie,
          </p>
        </div>

        {/* Letter Body */}
        <div className="space-y-4 font-serif text-base sm:text-lg text-[#321C16] leading-relaxed">
          <p>
            I know you're hurt, and I understand why. I never meant to make you feel unimportant.
          </p>

          <p>
            I'm not asking you to forget your feelings or forgive me immediately. I just want you to know that I truly value you and our friendship.
          </p>

          <p>
            I'm sorry for hurting you. You deserve honesty, respect, and a friend who listens when something hurts you.
          </p>

          <p>
            Whenever you're ready, I'd love for us to talk and clear things up.
          </p>

          <p className="font-medium text-[#4A1525]">
            No pressure. Just a genuine sorry from my heart. ❤️🩹
          </p>
        </div>

        {/* Signature */}
        <div className="mt-8 pt-4 border-t border-[#D8C7AF] flex flex-col items-end">
          <span className="font-handwriting text-2xl sm:text-3xl text-[#7A1F38] font-bold">
            Your Best Friend ❤️
          </span>
          <span className="font-sans text-xs text-[#7A6456] mt-0.5 tracking-wider uppercase">
            Always here for you
          </span>
        </div>
      </motion.div>

      {/* Navigation controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full flex items-center justify-between mt-8"
      >
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[#CFAFBD] hover:text-[#FAF6EE] hover:bg-[#2D0F1E] transition-colors text-sm font-sans min-h-[44px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B8405E] hover:bg-[#C94A6B] text-[#FFF7F8] font-sans text-sm font-medium transition-all shadow-[0_4px_18px_rgba(184,64,94,0.35)] cursor-pointer min-h-[44px] active:scale-95"
        >
          <span>One Last Thought</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </div>
  );
};
