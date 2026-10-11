import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';

interface Page2ApologyProps {
  onNext: () => void;
  onPrev: () => void;
}

export const Page2Apology: React.FC<Page2ApologyProps> = ({ onNext }) => {
  const paragraphs = [
    {
      id: 'greeting',
      text: "Hey Bestie ❤️🩹",
      isHeading: true,
    },
    {
      id: 'para-1',
      text: "I'm really sorry for the joke I made about my ex. I was just joking, but I didn't realize that my words would hurt you.",
      isHeading: false,
    },
    {
      id: 'para-2',
      text: "I never wanted to make you feel like you aren't my best friend or that I don't enjoy talking to you. You are important to me, and I genuinely value our friendship.",
      isHeading: false,
    },
    {
      id: 'para-3',
      text: "I know I made a mistake, and I'm truly sorry.",
      isHeading: false,
      isEmphasized: true,
    },
  ];

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-5 py-8 max-w-xl mx-auto">
      {/* Subtle animated background heart with soft glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.08, 0.16, 0.08],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-[#B8405E] to-[#691835] blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute text-[#B8405E]"
        >
          <Heart className="w-48 h-48 sm:w-64 sm:h-64 fill-current stroke-none opacity-20" />
        </motion.div>
      </div>

      {/* Chapter header indicator */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xs text-[#E8A5B8] uppercase tracking-widest font-sans mb-6"
      >
        My Sincere Apology
      </motion.div>

      {/* Emotional message card with frosted glass & burgundy vignette */}
      <div className="w-full bg-[#1F0D17]/85 backdrop-blur-md rounded-2xl border border-[#521C30]/50 p-6 sm:p-8 shadow-2xl relative">
        <div className="space-y-6">
          {paragraphs.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + idx * 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {p.isHeading ? (
                <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF6EE] font-medium tracking-tight border-b border-[#47182A]/70 pb-4">
                  {p.text}
                </h2>
              ) : p.isEmphasized ? (
                <div className="p-4 rounded-xl bg-[#2D1221]/70 border border-[#7A2846]/40 text-[#FAF6EE] font-serif text-lg sm:text-xl italic font-normal leading-relaxed">
                  "{p.text}"
                </div>
              ) : (
                <p className="font-sans text-base sm:text-lg text-[#F2E4EC] leading-relaxed font-light">
                  {p.text}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Action button to continue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.1 }}
          className="mt-8 pt-4 border-t border-[#3E1424]/60 flex justify-end"
        >
          <button
            type="button"
            onClick={onNext}
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#B8405E] hover:bg-[#C94A6B] text-[#FFF7F8] font-sans text-sm font-medium transition-all shadow-[0_4px_18px_rgba(184,64,94,0.35)] cursor-pointer min-h-[44px] active:scale-95"
          >
            <span>What I Need You To Know</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
