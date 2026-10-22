import React, { useState, useEffect, useRef } from 'react';
import { ExplanationSection } from '../types';
import { ThreeDStudentNarrator } from './ThreeDStudentNarrator';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Square, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  Volume2, 
  ArrowRight,
  Info
} from 'lucide-react';

interface GuidedExplanationExperienceProps {
  sections: ExplanationSection[];
  isCompleted: boolean;
  onMarkCompleted: () => void;
  onProceedToProgress?: () => void;
}

export const GuidedExplanationExperience: React.FC<GuidedExplanationExperienceProps> = ({
  sections,
  isCompleted,
  onMarkCompleted,
  onProceedToProgress,
}) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [guidedCompleted, setGuidedCompleted] = useState<boolean>(false);
  const [voiceName, setVoiceName] = useState<string>('Indian English Voice (Tuned 11–12 yr)');
  const [characterOffsetY, setCharacterOffsetY] = useState<number>(0);

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isSpeakingRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  const activeIndexRef = useRef<number>(0);

  // Keep refs in sync for speech callbacks
  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
    isPausedRef.current = isPaused;
    activeIndexRef.current = activeSectionIndex;
  }, [isSpeaking, isPaused, activeSectionIndex]);

  // Update voice list
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const inVoice = voices.find(
          (v) =>
            v.lang.toLowerCase().includes('en-in') ||
            v.name.toLowerCase().includes('india') ||
            v.name.toLowerCase().includes('hindi')
        ) || voices.find((v) => v.lang.startsWith('en'));

        if (inVoice) {
          setVoiceName(`${inVoice.name} (Tuned 11–12 yr Student Cadence)`);
        }
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Update character vertical offset to align visually with the active section
  useEffect(() => {
    const activeEl = sectionRefs.current[activeSectionIndex];
    const container = scrollContainerRef.current;
    if (activeEl && container) {
      const offset = activeEl.offsetTop - container.offsetTop;
      // Clamp reasonable downward translation
      setCharacterOffsetY(Math.max(0, Math.min(offset, 650)));
    }
  }, [activeSectionIndex]);

  // Smoothly scroll active section into view without dislodging the window header or left sidebar
  const scrollToActiveSection = (index: number) => {
    const el = sectionRefs.current[index];
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  };

  // Helper to narrate a given section
  const speakSection = (index: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    if (index >= sections.length) {
      setIsSpeaking(false);
      setIsPaused(false);
      setGuidedCompleted(true);
      return;
    }

    const part = sections[index];
    // Natural conversational text for Ananya
    const cleanContent = part.content.replace(/\n+/g, ' ');
    const text = `Section ${part.partNumber}. ${part.heading}. ${part.title}. ${cleanContent}. Key takeaway: ${part.keyTakeaway}`;

    const utterance = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().includes('en-in') ||
        v.name.toLowerCase().includes('india')
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Natural 11-12 year old schoolchild tuning
    utterance.pitch = 1.28;
    utterance.rate = 0.94;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      // If user paused or manually interrupted, do not proceed automatically
      if (!isSpeakingRef.current || isPausedRef.current) return;

      const nextIndex = index + 1;
      if (nextIndex < sections.length) {
        setActiveSectionIndex(nextIndex);
        scrollToActiveSection(nextIndex);
        // Small pause between sections for comprehension
        setTimeout(() => {
          if (isSpeakingRef.current && !isPausedRef.current) {
            speakSection(nextIndex);
          }
        }, 550);
      } else {
        setIsSpeaking(false);
        setIsPaused(false);
        setGuidedCompleted(true);
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Speech synthesis notice:', e.error);
      }
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onpause = () => {
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Start guided journey from Section 1
  const handleStartGuidedNarration = () => {
    setActiveSectionIndex(0);
    scrollToActiveSection(0);
    setIsSpeaking(true);
    setIsPaused(false);
    setGuidedCompleted(false);
    speakSection(0);
  };

  // Pause
  const handlePauseNarration = () => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  // Resume
  const handleResumeNarration = () => {
    if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else if (!isSpeaking) {
      setIsSpeaking(true);
      setIsPaused(false);
      speakSection(activeSectionIndex);
    }
  };

  // Replay from Section 1
  const handleReplayNarration = () => {
    window.speechSynthesis.cancel();
    setActiveSectionIndex(0);
    scrollToActiveSection(0);
    setGuidedCompleted(false);
    setIsSpeaking(true);
    setIsPaused(false);
    speakSection(0);
  };

  // Stop
  const handleStopNarration = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  // Manual Section Click
  const handleSelectSectionManually = (index: number) => {
    setActiveSectionIndex(index);
    scrollToActiveSection(index);

    if (isSpeaking) {
      // Continue speaking from the newly selected section smoothly
      speakSection(index);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#17324D] font-heading flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#22A06B]" />
            <span>Guided Explanation: Bodha &amp; Viveka</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Four-part ethical synthesis with synchronised 3D child narration and guided section progression
          </p>
        </div>

        {/* Global Narration Controls Pill */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-[#FF9933]/30 shadow-xs">
          {!isSpeaking ? (
            <button
              onClick={handleStartGuidedNarration}
              className="px-4 py-2 text-xs font-bold text-white bg-[#FF9933] hover:bg-[#e68524] rounded-xl flex items-center gap-1.5 transition-transform hover:scale-102 cursor-pointer shadow-xs"
              title="Start guided explanation from Section 1"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen to Explanation</span>
            </button>
          ) : isPaused ? (
            <button
              onClick={handleResumeNarration}
              className="px-4 py-2 text-xs font-bold text-white bg-[#22A06B] hover:bg-[#1b8256] rounded-xl flex items-center gap-1.5 transition-transform hover:scale-102 cursor-pointer shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Resume</span>
            </button>
          ) : (
            <button
              onClick={handlePauseNarration}
              className="px-4 py-2 text-xs font-bold text-[#17324D] bg-[#FFD166] hover:bg-[#f3c250] rounded-xl flex items-center gap-1.5 transition-transform hover:scale-102 cursor-pointer shadow-xs"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </button>
          )}

          <button
            onClick={handleReplayNarration}
            className="p-2 text-gray-600 hover:text-[#17324D] hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            title="Replay from Section 1"
            aria-label="Replay from Section 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {isSpeaking && (
            <button
              onClick={handleStopNarration}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
              title="Stop Narration"
              aria-label="Stop Narration"
            >
              <Square className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Manual Section Quick Jump Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        <span className="text-gray-400 text-[11px] shrink-0 uppercase tracking-wider">
          Jump to Section:
        </span>
        {sections.map((part, idx) => {
          const isActive = activeSectionIndex === idx;
          return (
            <button
              key={part.partNumber}
              onClick={() => handleSelectSectionManually(idx)}
              className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#17324D] text-white border-[#17324D] shadow-xs'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#FF9933]'
              }`}
            >
              <span>{`Part ${part.partNumber}`}</span>
            </button>
          );
        })}
      </div>

      {/* Main Guided Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================
            LEFT COLUMN: 3D ANIMATED NARRATOR (WITH DYNAMIC MOVEMENT)
           ======================================================== */}
        <div className="lg:col-span-4 relative">
          
          {/* Desktop Sticky Container with Smooth Downward Translation */}
          <div 
            className="sticky top-28 transition-transform duration-700 ease-out"
            style={{
              transform: `translateY(${characterOffsetY}px)`,
            }}
          >
            <div className="bg-white rounded-3xl p-5 border border-[#22A06B]/30 shadow-md space-y-4">
              
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-xs font-bold text-[#22A06B] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>3D Guided Mentor</span>
                </span>
                <span className="text-[10px] font-semibold bg-[#FFF9F0] text-[#FF9933] border border-[#FF9933]/30 px-2 py-0.5 rounded-full">
                  Accompanying Section {activeSectionIndex + 1} of 4
                </span>
              </div>

              {/* 3D Student Narrator (Three.js WebGL Real-Time Character) */}
              <ThreeDStudentNarrator
                isSpeaking={isSpeaking}
                isPaused={isPaused}
                activeSection={activeSectionIndex + 1}
                narratorName="Ananya"
                narratorRole="Class 6 Student Mentor"
              />

              {/* Speech Engine Transparency Notice */}
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-[10px] text-gray-500 space-y-1">
                <div className="font-semibold text-[#17324D]">
                  Voice Engine: {voiceName}
                </div>
                <p className="leading-tight text-gray-400">
                  Cadence tuned for 11–12 year old student comprehension. Automatic scrolling moves with each section.
                </p>
              </div>

              {/* Section Progress Dots */}
              <div className="flex items-center justify-center gap-2 pt-1">
                {sections.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectSectionManually(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeSectionIndex === i
                        ? 'w-7 bg-[#22A06B]'
                        : i < activeSectionIndex
                        ? 'w-2.5 bg-green-300'
                        : 'w-2.5 bg-gray-200'
                    }`}
                    title={`Jump to Section ${i + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* ========================================================
            RIGHT COLUMN: 4 CLEARLY SEPARATED NUMBERED SECTIONS
           ======================================================== */}
        <div ref={scrollContainerRef} className="lg:col-span-8 space-y-6">
          
          {sections.map((part, idx) => {
            const isActive = activeSectionIndex === idx;

            return (
              <div
                key={part.partNumber}
                ref={(el) => { sectionRefs.current[idx] = el; }}
                className={`p-6 sm:p-8 rounded-3xl transition-all duration-500 space-y-4 ${
                  isActive
                    ? 'bg-white border-2 border-[#22A06B] shadow-lg ring-4 ring-[#22A06B]/10 scale-[1.01]'
                    : 'bg-white/90 border border-gray-200 shadow-2xs opacity-85 hover:opacity-100'
                }`}
              >
                {/* Section Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                      isActive ? 'bg-[#22A06B] text-white shadow-xs' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {part.partNumber}
                    </span>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#22A06B]">
                      {part.heading}
                    </span>
                  </div>

                  {isActive && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FF9933] bg-[#FFF9F0] border border-[#FF9933]/30 px-2.5 py-0.5 rounded-full">
                      <Volume2 className="w-3 h-3 animate-pulse" />
                      <span>Currently Active Section</span>
                    </span>
                  )}
                </div>

                {/* Section Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#17324D] font-heading">
                  {part.title}
                </h3>

                {/* Section Content */}
                <div className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans whitespace-pre-line space-y-2">
                  {part.content}
                </div>

                {/* Key Takeaway Banner */}
                <div className="mt-3 p-3.5 bg-[#FFF9F0] rounded-2xl border border-[#FF9933]/25 text-xs font-semibold text-[#17324D] flex items-start gap-2">
                  <span className="text-[#FF9933] text-sm shrink-0">💡</span>
                  <div>
                    <strong className="text-[#FF9933] font-bold">Key Principle: </strong>
                    <span>{part.keyTakeaway}</span>
                  </div>
                </div>

                {/* Action to listen specifically to this section */}
                <div className="pt-2 flex items-center justify-between border-t border-gray-100 text-xs">
                  <button
                    onClick={() => {
                      setActiveSectionIndex(idx);
                      speakSection(idx);
                    }}
                    className="inline-flex items-center gap-1.5 font-bold text-[#22A06B] hover:text-[#18754e] cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#22A06B]" />
                    <span>Listen to this section</span>
                  </button>

                  <span className="text-[11px] text-gray-400">
                    Section {part.partNumber} of 4
                  </span>
                </div>

              </div>
            );
          })}

          {/* Core Guiding Principle Card */}
          <div className="p-6 sm:p-7 bg-gradient-to-r from-[#17324D] to-[#254668] text-white rounded-3xl shadow-md space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#FFD166] uppercase tracking-wider bg-white/10 px-3 py-0.5 rounded-full">
                Core Guiding Principle
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold font-heading text-white">
              Compassion Without Cover-Up · Truth Without Cruelty
            </h4>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
              Compassion does not require hiding wrongdoing or allowing an innocent peer to suffer punishment. Honesty does not require public humiliation or vengeance. Ethical maturity means speaking the truth responsibly and privately to the teacher, clearing the innocent while preserving human dignity.
            </p>
          </div>

          {/* Completion Status & Explicit Confirmation */}
          <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-amber-400'}`} />
                <h4 className="text-sm font-bold text-[#17324D]">
                  {isCompleted ? 'Explanation Review Completed ✓' : 'Record Explanation Progress'}
                </h4>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {guidedCompleted
                  ? 'All 4 sections have been studied with Ananya. Click below to record your completion.'
                  : 'Study all four sections or listen to the guided narration before completing.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onMarkCompleted}
                className={`px-5 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                  isCompleted
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-[#22A06B] hover:bg-[#1b8256] text-white shadow-xs'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? 'Explanation Completed ✓' : 'Mark Explanation as Complete'}</span>
              </button>

              {onProceedToProgress && (
                <button
                  onClick={onProceedToProgress}
                  className="px-4 py-2.5 text-xs font-bold text-white bg-[#38BDF8] hover:bg-[#20a4df] rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Progress Tracker</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
