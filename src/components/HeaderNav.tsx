import React from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderNavProps {
  currentPage: number;
  totalPages: number;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onSelectPage: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentPage,
  totalPages,
  isAudioPlaying,
  onToggleAudio,
  onSelectPage,
  onNext,
  onPrev,
}) => {
  const pageTitles = [
    'Surprise',
    'Apology',
    'Truth',
    'Letter',
    'A Question',
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-4 py-3 bg-[#120D12]/80 backdrop-blur-md border-b border-[#3B1223]/40 transition-colors">
      <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Previous page jump (if > 1) or Subtle Title */}
        <div className="flex items-center gap-1.5 min-w-[70px]">
          {currentPage > 1 ? (
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous section"
              className="inline-flex items-center gap-1 text-xs text-[#E0CFD6] hover:text-white px-2 py-1 rounded-md hover:bg-white/5 transition-colors cursor-pointer min-h-[40px]"
            >
              <ChevronLeft className="w-4 h-4 text-[#F4B6C2]" />
              <span className="hidden xs:inline">Back</span>
            </button>
          ) : (
            <span className="font-serif italic text-xs text-[#C5A8B5] tracking-wide">
              For Bestie
            </span>
          )}
        </div>

        {/* Center: Step indicators */}
        <nav aria-label="Page navigation" className="flex items-center gap-1.5 sm:gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isActive = pageNum === currentPage;
            const isCompleted = pageNum < currentPage;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onSelectPage(pageNum)}
                aria-label={`Jump to page ${pageNum}: ${pageTitles[idx]}`}
                aria-current={isActive ? 'step' : undefined}
                className="group relative flex items-center justify-center p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4B6C2] rounded-full cursor-pointer"
              >
                <div
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-6 sm:w-8 bg-gradient-to-r from-[#B8405E] to-[#F4B6C2] shadow-[0_0_10px_rgba(244,182,194,0.6)]'
                      : isCompleted
                      ? 'w-2 sm:w-2.5 bg-[#8C2B4E]/80'
                      : 'w-1.5 sm:w-2 bg-[#4A1525]/60 hover:bg-[#691F37]'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Right: Sound toggle + Next helper */}
        <div className="flex items-center gap-1 min-w-[70px] justify-end">
          <button
            type="button"
            onClick={onToggleAudio}
            aria-label={isAudioPlaying ? 'Mute gentle music' : 'Play gentle background music'}
            title={isAudioPlaying ? 'Mute ambient melody' : 'Play soothing melody'}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-sans transition-all min-h-[40px] cursor-pointer ${
              isAudioPlaying
                ? 'bg-[#4A1525]/70 text-[#FCEEF2] border border-[#8C2B4E]/60 shadow-[0_0_12px_rgba(184,64,94,0.35)]'
                : 'bg-white/5 text-[#B89FA8] hover:text-[#FAF6EE] border border-white/5 hover:border-white/10'
            }`}
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#F4B6C2] animate-pulse" />
                <span className="text-[11px] font-medium hidden sm:inline">Music</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#B89FA8]" />
                <span className="text-[11px] font-medium hidden sm:inline">Muted</span>
              </>
            )}
          </button>

          {currentPage < totalPages && currentPage > 1 && (
            <button
              type="button"
              onClick={onNext}
              aria-label="Next section"
              className="p-1.5 text-[#E0CFD6] hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer min-h-[40px] min-w-[32px] flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4 text-[#F4B6C2]" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
