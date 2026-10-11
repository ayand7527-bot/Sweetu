import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, RotateCcw, ArrowLeft, MessageCircleHeart, Sparkles } from 'lucide-react';

interface Page5FinalMessageProps {
  onPrev: () => void;
  onRestart: () => void;
}

type UserResponse = 'ready' | 'time' | null;

export const Page5FinalMessage: React.FC<Page5FinalMessageProps> = ({ onPrev, onRestart }) => {
  const [choice, setChoice] = useState<UserResponse>(null);

  const handleSelect = (selected: UserResponse) => {
    setChoice(selected);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-xl mx-auto text-center">
      {/* Softly glowing heart in background */}
      <div className="relative mb-6">
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 bg-[#B8405E] blur-2xl rounded-full"
        />
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#3F1122] to-[#250914] border border-[#7D2444]/60 flex items-center justify-center shadow-lg">
          <Heart className="w-8 h-8 text-[#F4B6C2] fill-[#F4B6C2]/40" />
        </div>
      </div>

      {/* Main heading */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#FAF6EE] mb-4 glow-text-subtle"
      >
        Can We Talk When You're Ready? 🥺
      </motion.h2>

      {/* Supporting text */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-sans text-base sm:text-lg text-[#E0CFD6] max-w-md mx-auto leading-relaxed mb-8 font-light"
      >
        I'm not asking you to forget what happened. I just hope I can make things right with you, one honest conversation at a time.
      </motion.p>

      {/* Interactive Response Section */}
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {!choice ? (
            <motion.div
              key="options"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full"
            >
              {/* Option 1: Ready to talk */}
              <button
                type="button"
                onClick={() => handleSelect('ready')}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#B8405E] to-[#D25374] text-white font-sans text-sm font-medium shadow-[0_4px_20px_rgba(184,64,94,0.4)] hover:shadow-[0_6px_28px_rgba(184,64,94,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer min-h-[48px]"
              >
                <span>I'm Ready to Talk 💗</span>
              </button>

              {/* Option 2: Need some time */}
              <button
                type="button"
                onClick={() => handleSelect('time')}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#270E1A] hover:bg-[#341323] text-[#F0E6EC] border border-[#6B223D]/60 font-sans text-sm font-medium shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer min-h-[48px]"
              >
                <span>I Need Some Time 🤍</span>
              </button>
            </motion.div>
          ) : choice === 'ready' ? (
            <motion.div
              key="response-ready"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#331121]/95 to-[#1E0914]/95 border border-[#8C2B4E]/60 shadow-2xl text-center space-y-4"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#B8405E]/20 text-[#F4B6C2] mb-1">
                <MessageCircleHeart className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF6EE] font-medium leading-snug">
                Thank you for giving us a chance to talk. ❤️
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#E2D2DB] leading-relaxed font-light max-w-sm mx-auto">
                Whenever you feel ready to text or call, I'll be right here. No rush at all, bestie. Take everything at your own pace.
              </p>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setChoice(null)}
                  className="text-xs text-[#C5A8B5] hover:text-[#FAF6EE] underline cursor-pointer py-1.5 px-3"
                >
                  Change response
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="response-time"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#250F1B]/95 to-[#160610]/95 border border-[#591C33]/60 shadow-2xl text-center space-y-4"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#591C33]/40 text-[#F0E6EC] mb-1">
                <Sparkles className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF6EE] font-medium leading-snug">
                It's okay. Take all the time you need. I'll respect your space. 🤍
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#DBCAD4] leading-relaxed font-light max-w-sm mx-auto">
                Your peace of mind matters most. Whenever you feel comfortable in the future, the door is always open. No pressure, ever.
              </p>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setChoice(null)}
                  className="text-xs text-[#C5A8B5] hover:text-[#FAF6EE] underline cursor-pointer py-1.5 px-3"
                >
                  Change response
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12 flex items-center gap-4 text-xs text-[#CFAFBD]"
      >
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full hover:text-[#FAF6EE] hover:bg-[#2D0F1E] transition-colors cursor-pointer min-h-[44px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to letter</span>
        </button>

        <span className="text-[#591C33]">·</span>

        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full hover:text-[#FAF6EE] hover:bg-[#2D0F1E] transition-colors cursor-pointer min-h-[44px]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Read from start</span>
        </button>
      </motion.div>
    </div>
  );
};
