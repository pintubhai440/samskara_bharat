import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Pause, Play, RotateCcw, Sparkles } from 'lucide-react';

interface NarratorCharacterProps {
  textToNarrate: string;
  narratorTitle?: string;
  narratorSubtitle?: string;
  onNarrationStart?: () => void;
  onNarrationEnd?: () => void;
  className?: string;
}

export const NarratorCharacter: React.FC<NarratorCharacterProps> = ({
  textToNarrate,
  narratorTitle = 'Ananya (Student Mentor)',
  narratorSubtitle = 'Listening & Reflective Guide',
  onNarrationStart,
  onNarrationEnd,
  className = '',
}) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voiceName, setVoiceName] = useState<string>('Standard English Voice');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);

      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const indianVoice = voices.find(
          (v) =>
            v.lang.toLowerCase().includes('en-in') ||
            v.name.toLowerCase().includes('india') ||
            v.name.toLowerCase().includes('hindi')
        ) || voices.find((v) => v.lang.startsWith('en'));

        if (indianVoice) {
          setVoiceName(indianVoice.name);
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
    if (!isSupported) return;

    window.speechSynthesis.cancel();

    // Clean text of non-spoken formatting if any
    const cleanText = textToNarrate.replace(/[•\n]+/g, '. ');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        v.lang.toLowerCase().includes('en-in') ||
        v.name.toLowerCase().includes('india')
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Child-friendly pace and warm pitch
    utterance.rate = 0.88;
    utterance.pitch = 1.05;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      onNarrationStart?.();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      onNarrationEnd?.();
    };

    utterance.onerror = () => {
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
    }
  };

  const handleStopNarration = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const isMouthAnimated = isSpeaking && !isPaused;

  return (
    <div className={`flex flex-col items-center bg-white rounded-3xl p-5 sm:p-6 border border-[#22A06B]/25 shadow-xs ${className}`}>
      
      {/* 1. Animated Character Illustration (Indian School Student Mentor "Ananya") */}
      <div className="relative w-36 h-44 sm:w-44 sm:h-52 flex items-center justify-center select-none">
        
        {/* Soft Aura Glow when Speaking */}
        <div 
          className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#22A06B]/15 via-[#FF9933]/15 to-[#FFD166]/20 transition-opacity duration-500 blur-md ${
            isMouthAnimated ? 'opacity-100 scale-105' : 'opacity-40 scale-100'
          }`} 
          aria-hidden="true" 
        />

        {/* Polished SVG Character with Mouth & Arm Animation */}
        <svg
          viewBox="0 0 140 170"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
          aria-label="Student Mentor Character Ananya"
        >
          <defs>
            <linearGradient id="charShirt" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FFF9F0" />
            </linearGradient>
            <linearGradient id="charCollar" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22A06B" />
              <stop offset="100%" stopColor="#1B8256" />
            </linearGradient>
            <linearGradient id="charHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#17324D" />
              <stop offset="100%" stopColor="#0B1A28" />
            </linearGradient>
          </defs>

          {/* Torso & Uniform (Neat school shirt with fresh green collar & saffron badge) */}
          <path
            d="M 38 108 
               C 38 98, 48 95, 70 95 
               C 92 95, 102 98, 102 108 
               L 108 165 
               L 32 165 Z"
            fill="url(#charShirt)"
            stroke="#17324D"
            strokeWidth="1.8"
          />

          {/* Fresh Green Student Collar */}
          <path
            d="M 54 95 L 70 114 L 86 95 L 77 92 L 70 98 L 63 92 Z"
            fill="url(#charCollar)"
            stroke="#17324D"
            strokeWidth="1.2"
          />

          {/* Small Saffron Merit Badge on Lapel */}
          <circle cx="88" cy="118" r="4.5" fill="#FF9933" stroke="#FFD166" strokeWidth="0.8" />
          <path d="M 87 116 L 89 120" stroke="#FFFFFF" strokeWidth="0.8" />

          {/* Gesturing Right Arm (Animates toward text when speaking) */}
          <g className={`transition-transform duration-700 ease-in-out ${isMouthAnimated ? 'translate-x-1 -rotate-3 origin-bottom-left' : ''}`}>
            <path
              d="M 102 112 
                 C 108 116, 116 122, 122 130 
                 C 124 133, 126 136, 124 139 
                 C 121 140, 116 136, 112 132 
                 L 102 126 Z"
              fill="#FFB347"
            />
            {/* Extended gentle open guiding hand */}
            <ellipse cx="125" cy="138" rx="4" ry="5.5" fill="#FFB347" transform="rotate(-35 125 138)" />
          </g>

          {/* Left Arm resting at side */}
          <path
            d="M 38 112 C 32 120, 30 132, 28 144 L 34 146 C 36 136, 38 124, 42 118 Z"
            fill="#FFB347"
          />

          {/* Head & Neck */}
          <rect x="64" y="82" width="12" height="15" fill="#FFB347" />

          {/* Face Contour with Gentle Head Tilt when Speaking */}
          <g className={`transition-transform duration-500 origin-bottom ${isMouthAnimated ? '-rotate-1 translate-y-[0.5px]' : ''}`}>
            <circle cx="70" cy="58" r="26" fill="#FFB347" />

            {/* Hair: Neat, friendly modern Indian student braids & fringe */}
            <path
              d="M 44 54 
                 C 44 32, 54 24, 70 24 
                 C 86 24, 96 32, 96 54 
                 C 96 42, 90 35, 78 35 
                 C 68 35, 60 40, 44 54 Z"
              fill="url(#charHair)"
            />
            {/* Hair bangs / neat parted fringe */}
            <path
              d="M 48 46 C 58 40, 68 44, 73 48 C 66 42, 56 42, 48 46 Z"
              fill="#17324D"
            />
            <path
              d="M 92 46 C 82 40, 72 44, 67 48 C 74 42, 84 42, 92 46 Z"
              fill="#17324D"
            />

            {/* Kind, Expressive Eyes */}
            {/* Left Eye */}
            <ellipse cx="59" cy="56" rx="2.8" ry="3.8" fill="#17324D" />
            <circle cx="58" cy="54.5" r="1.1" fill="#FFFFFF" />
            <path d="M 55 51 C 57 49, 61 49, 63 51" stroke="#17324D" strokeWidth="1.2" strokeLinecap="round" />

            {/* Right Eye */}
            <ellipse cx="81" cy="56" rx="2.8" ry="3.8" fill="#17324D" />
            <circle cx="80" cy="54.5" r="1.1" fill="#FFFFFF" />
            <path d="M 77 51 C 79 49, 83 49, 85 51" stroke="#17324D" strokeWidth="1.2" strokeLinecap="round" />

            {/* Gentle friendly nose */}
            <path d="M 70 57 L 70 63 C 71 64, 73 63, 73 62" stroke="#E67E22" strokeWidth="1" strokeLinecap="round" fill="none" />

            {/* DYNAMIC ANIMATED MOUTH:
                Switches between speaking mouth movement and quiet gentle smile */}
            {isMouthAnimated ? (
              <g className="animate-pulse">
                {/* Speaking mouth shape */}
                <ellipse cx="70" cy="71" rx="4.5" ry="3.8" fill="#991B1B" />
                <ellipse cx="70" cy="70" rx="3.5" ry="1.2" fill="#FFFFFF" />
                <path d="M 66 70 C 68 73, 72 73, 74 70" stroke="#E67E22" strokeWidth="0.8" fill="none" />
              </g>
            ) : (
              /* Quiet gentle warm smile */
              <path
                d="M 64 69 C 67 74, 73 74, 76 69"
                stroke="#B91C1C"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            )}

            {/* Subtle Rosy Cheeks */}
            <ellipse cx="53" cy="62" rx="3.5" ry="2" fill="#FF9933" fillOpacity="0.25" />
            <ellipse cx="87" cy="62" rx="3.5" ry="2" fill="#FF9933" fillOpacity="0.25" />
          </g>
        </svg>

        {/* Small live audio wave badge when speaking */}
        {isMouthAnimated && (
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#22A06B] text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-xs animate-bounce">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            <span>Speaking</span>
          </div>
        )}
      </div>

      {/* 2. Character Name & Role */}
      <div className="text-center mt-2 mb-4">
        <h4 className="text-sm font-bold text-[#17324D] font-heading flex items-center justify-center gap-1">
          <span>{narratorTitle}</span>
          <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />
        </h4>
        <p className="text-[11px] text-gray-500 font-medium">
          {narratorSubtitle}
        </p>
      </div>

      {/* 3. Clearly Visible Narration Controls */}
      <div className="w-full space-y-2">
        {!isSpeaking ? (
          <button
            onClick={handleStartNarration}
            className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#22A06B] hover:bg-[#1a7e53] rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Listen to Passage (Narration)</span>
          </button>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 justify-center">
              {isPaused ? (
                <button
                  onClick={handleResumeNarration}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-[#22A06B] hover:bg-[#1a7e53] rounded-lg flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Resume</span>
                </button>
              ) : (
                <button
                  onClick={handlePauseNarration}
                  className="px-3 py-1.5 text-xs font-bold text-[#17324D] bg-[#FFF9F0] border border-[#FF9933]/40 rounded-lg flex items-center gap-1"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </button>
              )}

              <button
                onClick={handleStartNarration}
                className="px-2.5 py-1.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-1"
                title="Replay from Beginning"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay</span>
              </button>

              <button
                onClick={handleStopNarration}
                className="px-2.5 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-1"
                title="Stop Narration"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>Stop</span>
              </button>
            </div>

            <div className="text-[10px] text-gray-500 text-center">
              Active Voice: {voiceName.includes('(') ? voiceName.split('(')[0] : voiceName}
            </div>
          </div>
        )}

        <p className="text-[10px] text-gray-400 text-center pt-1 leading-tight">
          Natural Indian English · Child-friendly speed (0.88x) · Click to stop anytime
        </p>
      </div>

    </div>
  );
};
