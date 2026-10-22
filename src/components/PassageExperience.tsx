import React, { useState, useEffect, useRef } from 'react';
import { ThreeDStudentNarrator } from './ThreeDStudentNarrator';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Square, 
  CheckCircle2, 
  Feather, 
  Volume2, 
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface PassageExperienceProps {
  passageText: string;
  isCompleted: boolean;
  onMarkCompleted: () => void;
  onProceedToQuestions: () => void;
}

export const PassageExperience: React.FC<PassageExperienceProps> = ({
  passageText,
  isCompleted,
  onMarkCompleted,
  onProceedToQuestions,
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [voiceName, setVoiceName] = useState<string>('Indian English Voice (Tuned 11–12 yr)');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

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

  const handleStartNarration = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    // Clean text for natural speech
    const spokenText = passageText.replace(/\n+/g, '. ');
    const utterance = new SpeechSynthesisUtterance(spokenText);

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().includes('en-in') ||
        v.name.toLowerCase().includes('india')
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Natural 11-12 year old schoolchild voice tuning
    utterance.pitch = 1.28;
    utterance.rate = 0.94;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Passage speech notice:', e.error);
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

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePauseNarration = () => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleResumeNarration = () => {
    if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else if (!isSpeaking) {
      handleStartNarration();
    }
  };

  const handleReplayNarration = () => {
    window.speechSynthesis.cancel();
    handleStartNarration();
  };

  const handleStopNarration = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#17324D] font-heading flex items-center gap-2">
            <Feather className="w-6 h-6 text-[#38BDF8]" />
            <span>Modern Reflection Passage</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            A contemporary school scenario connecting Satyavrata’s dilemma to 21st-century student life
          </p>
        </div>

        {/* Audio Controls Pill */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-[#38BDF8]/30 shadow-xs">
          {!isSpeaking ? (
            <button
              onClick={handleStartNarration}
              className="px-4 py-2 text-xs font-bold text-white bg-[#38BDF8] hover:bg-[#20a4df] rounded-xl flex items-center gap-1.5 transition-transform hover:scale-102 cursor-pointer shadow-xs"
              title="Listen to Ananya read the reflection passage"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen to Passage</span>
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
            title="Replay Passage"
            aria-label="Replay Passage"
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

      {/* Grid: 3D Character on Left, Written Passage on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: 3D Animated Schoolchild Character */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl p-5 border border-[#38BDF8]/30 shadow-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="text-xs font-bold text-[#38BDF8] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3D Student Narrator</span>
              </span>
              <span className="text-[10px] font-semibold bg-[#FFF9F0] text-[#17324D] border border-gray-200 px-2 py-0.5 rounded-full">
                Ananya (Class 6)
              </span>
            </div>

            <ThreeDStudentNarrator
              isSpeaking={isSpeaking}
              isPaused={isPaused}
              activeSection={1}
              narratorName="Ananya"
              narratorRole="Class 6 Student Mentor"
            />

            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-[10px] text-gray-500">
              <span className="font-semibold text-[#17324D]">Voice: </span>
              <span>{voiceName}</span>
            </div>
          </div>
        </div>

        {/* Right: Written Passage Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8] bg-[#38BDF8]/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Reflection Case Study</span>
              </span>
              {isSpeaking && !isPaused && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#22A06B] bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full animate-pulse">
                  <Volume2 className="w-3 h-3" />
                  <span>Narration in progress</span>
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#17324D] font-heading">
              A Difficult Choice at School
            </h3>

            {/* Formatted Passage Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
              <p className="p-4 rounded-2xl bg-[#FFF9F0]/60 border border-[#FF9933]/15">
                During a school exhibition, a student notices that a classmate has accidentally damaged an important project. Another student is wrongly blamed for the damage. The teacher asks the class what happened.
              </p>

              <p className="p-4 rounded-2xl bg-[#FFF9F0]/60 border border-[#FF9933]/15">
                The student who witnessed the incident faces a difficult choice. Telling the truth could embarrass the classmate who caused the damage. Remaining silent could allow an innocent student to be punished for something they did not do.
              </p>

              <p className="p-4 rounded-2xl bg-[#FFF9F0]/60 border border-[#FF9933]/15">
                The student must decide how to respond while considering truth, compassion, fairness, and responsibility.
              </p>

              <div className="p-4 rounded-2xl bg-[#17324D] text-white space-y-1">
                <span className="text-[11px] font-bold text-[#FFD166] uppercase tracking-wider block">
                  Central Reflection Knot:
                </span>
                <p className="text-sm font-semibold">
                  What should you do when truth, compassion, and justice seem to conflict?
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100">
              <span className="text-xs text-gray-500">
                Status: {isCompleted ? 'Passage Studied ✓' : 'Pending completion'}
              </span>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={onMarkCompleted}
                  className={`px-5 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-[#22A06B] hover:bg-[#1b8256] text-white shadow-xs'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isCompleted ? 'Passage Studied ✓' : 'Mark Passage as Studied'}</span>
                </button>

                <button
                  onClick={onProceedToQuestions}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#38BDF8] hover:bg-[#20a4df] rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Proceed to 4 Questions</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
