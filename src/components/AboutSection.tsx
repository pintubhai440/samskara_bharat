import React from 'react';
import { Language } from '../types';
import { translations } from '../data/content';
import { Target, Compass, Lightbulb, CheckCircle2, Award } from 'lucide-react';

interface AboutSectionProps {
  currentLang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const about = t.about;

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-t border-[#FF9933]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF9933] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF9933]" aria-hidden="true" />
            <span>{about.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight font-heading text-balance">
            {about.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-sans">
            {about.subtitle}
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Vision */}
          <div className="p-8 rounded-3xl bg-[#FFF9F0] border border-[#FF9933]/25 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FF9933]/15 flex items-center justify-center text-[#FF9933] mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#17324D] font-heading mb-3">
                {about.visionTitle}
              </h3>
              <p className="text-gray-700 leading-relaxed text-[15px]">
                {about.visionText}
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="p-8 rounded-3xl bg-[#FFF9F0] border border-[#22A06B]/25 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#22A06B]/15 flex items-center justify-center text-[#22A06B] mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#17324D] font-heading mb-3">
                {about.missionTitle}
              </h3>
              <p className="text-gray-700 leading-relaxed text-[15px]">
                {about.missionText}
              </p>
            </div>
          </div>
        </div>

        {/* Educational Philosophy: Chintan */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#17324D] to-[#1e4163] text-white shadow-md mb-12 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFD166] uppercase tracking-wider mb-3">
              <Lightbulb className="w-4 h-4" />
              <span>Pedagogical Core</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading mb-4 text-[#FFF9F0]">
              {about.philosophyTitle}
            </h3>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed font-sans">
              {about.philosophyText}
            </p>
          </div>
          
          {/* Subtle Indian decorative arch curve in background */}
          <div 
            className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full border-8 border-white/5 pointer-events-none"
            aria-hidden="true" 
          />
        </div>

        {/* Objectives & Expected Outcomes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Core Objectives */}
          <div className="p-8 rounded-3xl bg-white border border-gray-200/90 shadow-2xs">
            <h3 className="text-xl font-bold text-[#17324D] font-heading mb-6 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#22A06B]" />
              <span>{about.objectivesTitle}</span>
            </h3>
            <ul className="space-y-4">
              {about.objectivesList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5 text-[15px] text-gray-700 leading-relaxed">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[#22A06B]/10 text-[#22A06B] font-bold text-xs flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expected Outcomes */}
          <div className="p-8 rounded-3xl bg-white border border-gray-200/90 shadow-2xs">
            <h3 className="text-xl font-bold text-[#17324D] font-heading mb-6 flex items-center gap-2.5">
              <Award className="w-5 h-5 text-[#FF9933]" />
              <span>{about.outcomesTitle}</span>
            </h3>
            <ul className="space-y-4">
              {about.outcomesList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5 text-[15px] text-gray-700 leading-relaxed">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[#FF9933]/15 text-[#FF9933] font-bold text-xs flex items-center justify-center mt-0.5">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
