import React from 'react';
import { Logo } from './Logo';
import { Language } from '../types';
import { translations } from '../data/content';
import { Compass, Sparkles } from 'lucide-react';

// Tasteful illustration of Indian banyan tree of wisdom and learning children (no monuments/buildings)
import entranceIllustrationPath from '../assets/images/hero_banyan_education_1792686854824.jpg';

interface HeroEntranceProps {
  currentLang: Language;
  onExploreCurriculum: () => void;
  onBeginLearning: () => void;
}

export const HeroEntrance: React.FC<HeroEntranceProps> = ({
  currentLang,
  onExploreCurriculum,
  onBeginLearning,
}) => {
  const t = translations[currentLang];

  return (
    <section 
      id="entrance"
      className="relative w-full overflow-hidden py-12 sm:py-16 lg:py-20 bg-[#FFF9F0]"
    >
      {/* Subtle Background Radial Pattern */}
      <div 
        className="absolute inset-0 bg-jharokha-pattern opacity-40 pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left / Content Column: Strictly displaying Logo & Title, Sanskrit Motto, and two buttons */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-8 sm:space-y-10">
            
            {/* 1. Samskara Bharat Logo and Title (Prominent Symbol) */}
            <div className="w-full">
              <Logo size="hero" currentLang={currentLang} />
            </div>

            {/* 2. Prominent Sanskrit Motto */}
            <div className="w-full bg-white/90 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-[#FF9933]/30 shadow-xs relative">
              {/* Subtle top decorative arch notch */}
              <div 
                className="absolute -top-3 left-8 px-3 py-0.5 bg-[#FF9933] text-white text-[11px] font-bold rounded-full tracking-wider uppercase"
                aria-hidden="true"
              >
                Motto
              </div>

              {/* The exact requested Sanskrit Motto */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17324D] leading-snug tracking-tight font-devanagari text-balance">
                {t.motto.sanskrit}
              </h2>

              {/* Transliteration & meaning in chosen language */}
              <p className="mt-3 text-sm sm:text-base font-medium text-[#22A06B] italic">
                {t.motto.transliteration}
              </p>
              <p className="mt-2 text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
                &ldquo;{t.motto.meaning}&rdquo;
              </p>
            </div>

            {/* 3. Action Buttons: Explore Our Curriculum & Begin Learning */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-1">
              <button
                onClick={onExploreCurriculum}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-[#17324D] bg-white hover:bg-[#FFF2DE] border-2 border-[#17324D]/15 hover:border-[#FF9933] rounded-2xl shadow-2xs hover:shadow-sm transition-all duration-200 cursor-pointer whitespace-nowrap focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF9933]"
              >
                <Compass className="w-5 h-5 text-[#22A06B]" />
                <span>{t.entrance.exploreBtn}</span>
              </button>

              <button
                onClick={onBeginLearning}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-extrabold text-white bg-[#FF9933] hover:bg-[#f0851d] active:scale-[0.99] rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer whitespace-nowrap focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF9933]"
              >
                <Sparkles className="w-5 h-5 text-white" />
                <span>{t.entrance.beginBtn}</span>
              </button>
            </div>

          </div>

          {/* Right / Illustration Column: Tasteful illustration representing Indian heritage and modern education */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-xl group">
              {/* Soft decorative shadow backdrop with brand colors */}
              <div 
                className="absolute -inset-2 bg-gradient-to-tr from-[#FF9933]/20 via-[#FFD166]/20 to-[#22A06B]/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-90 transition-opacity" 
                aria-hidden="true"
              />

              {/* The illustration container */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-white/80 shadow-xl bg-white aspect-16/9 sm:aspect-16/10">
                <img
                  src={entranceIllustrationPath}
                  alt="Tasteful illustration of Indian heritage and modern education: banyan tree of wisdom with digital tablets, books, and students"
                  className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Subtle soft-edge inner vignette */}
                <div 
                  className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl pointer-events-none" 
                  aria-hidden="true" 
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
