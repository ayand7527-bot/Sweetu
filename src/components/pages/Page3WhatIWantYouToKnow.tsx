import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Page3WhatIWantYouToKnowProps {
  onNext: () => void;
  onPrev: () => void;
}

export const Page3WhatIWantYouToKnow: React.FC<Page3WhatIWantYouToKnowProps> = ({ onNext, onPrev }) => {
  const lines = [
    {
      id: 'line-1',
      text: "I may not always say the right things.",
      subtle: false,
    },
    {
      id: 'line-2',
      text: "Sometimes I joke without thinking about how you might feel.",
      subtle: false,
    },
    {
      id: 'line-3',
      text: "But that doesn't mean our friendship is fake or that I don't care.",
      subtle: false,
    },
    {
      id: 'line-4',
      text: "Our friendship means more than my stupid jokes. 🫂",
      subtle: false,
      highlight: true,
    },
  ];

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-5 py-8 max-w-xl mx-auto">
      {/* Chapter header */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xs text-[#E8A5B8] uppercase tracking-widest font-sans mb-6"
      >
        From My Heart
      </motion.div>

      {/* Main glowing handwritten message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="text-center mb-10 w-full"
      >
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#2E101E]/90 to-[#1D0813]/90 border border-[#732342]/40 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#8C2B4E_0%,transparent_60%)] opacity-30 pointer-events-none" />
          <h2 className="font-handwriting text-3xl sm:text-4xl md:text-5xl text-[#FCEEF2] glow-text-subtle leading-tight font-medium">
            "One stupid joke should never define a friendship that means so much to me. ❤️"
          </h2>
        </div>
      </motion.div>

      {/* Reveal lines one by one */}
      <div className="w-full space-y-4 mb-8">
        {lines.map((line, idx) => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.8 + idx * 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`p-4 rounded-xl transition-all ${
              line.highlight
                ? 'bg-[#331121]/80 border border-[#8C2B4E]/60 text-[#FAF6EE] shadow-lg'
                : 'bg-[#1D0A14]/60 border border-[#421426]/40 text-[#EBDDE4]'
            }`}
          >
            <p className={`font-sans text-base sm:text-lg ${line.highlight ? 'font-medium' : 'font-normal'}`}>
              {line.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.8 }}
        className="w-full flex items-center justify-between pt-2"
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
          <span>Read My Full Letter</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </div>
  );
};
