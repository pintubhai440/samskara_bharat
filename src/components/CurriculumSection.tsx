import React, { useState } from 'react';
import { Language } from '../types';
import { translations, sampleGunas, all16GunasList } from '../data/content';
import { Sparkles, Scroll, ShieldCheck } from 'lucide-react';
// Culturally neutral Indian storytelling scene with open storybook and Panchatantra wildlife in nature
import epicsIllustrationPath from '../assets/images/curriculum_panchatantra_nature_1792686854604.jpg';

interface CurriculumSectionProps {
  currentLang: Language;
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [expandedGuna, setExpandedGuna] = useState<string>('satya');

  const filteredGunas = sampleGunas.filter((guna) => {
    if (selectedGrade === 'all') return true;
    if (selectedGrade === 'lkg-2') return guna.grades.includes('LKG');
    if (selectedGrade === '3-5') return guna.grades.includes('3') || guna.grades.includes('LKG - 10');
    if (selectedGrade === '6-8') return guna.grades.includes('6') || guna.grades.includes('3') || guna.grades.includes('LKG - 10');
    if (selectedGrade === '9-10') return guna.grades.includes('9') || guna.grades.includes('3') || guna.grades.includes('LKG - 10');
    return true;
  });

  return (
    <section id="curriculum" className="py-16 sm:py-24 bg-[#FFF9F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#22A06B] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#22A06B]" aria-hidden="true" />
            <span>{t.curriculum.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight font-heading text-balance">
            {t.curriculum.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-sans">
            {t.curriculum.subtitle}
          </p>
        </div>

        {/* 16 Gunas Banner & Visual Strip */}
        <div className="mb-14 p-6 sm:p-8 bg-white rounded-3xl border border-[#FF9933]/25 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#17324D] font-heading flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FF9933]" />
                <span>{t.curriculum.gunasHeading}</span>
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                The 16 foundational virtues cultivated progressively from LKG to Class 10
              </p>
            </div>
            <div className="text-xs font-bold text-[#22A06B] bg-[#22A06B]/10 px-3.5 py-1.5 rounded-full self-start md:self-auto">
              16 Gunas Framework
            </div>
          </div>

          {/* 16 Gunas Grid of Compact Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3">
            {all16GunasList.map((guna) => {
              const displayName = currentLang === 'te' ? guna.te : currentLang === 'hi' ? guna.hi : guna.en;
              return (
                <div
                  key={guna.id}
                  className="p-2.5 rounded-xl bg-[#FFF9F0] border border-[#FF9933]/15 text-center flex flex-col justify-center items-center hover:bg-[#FFEECF] hover:border-[#FF9933] transition-colors"
                >
                  <span className="text-xs font-bold text-[#17324D] font-devanagari truncate w-full">
                    {guna.name.split(' ')[0]}
                  </span>
                  <span className="text-[11px] text-gray-600 font-medium truncate w-full mt-0.5">
                    {displayName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Three Epics Showcase with Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16 p-8 sm:p-10 bg-white rounded-3xl border border-gray-200/90 shadow-xs">
          <div className="lg:col-span-5 relative">
            <div className="overflow-hidden rounded-2xl shadow-md border border-[#FF9933]/30 aspect-4/3">
              <img
                src={epicsIllustrationPath}
                alt="Classical Indian epics and Panchatantra wisdom tales illustration"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-3 text-center text-xs text-gray-500 italic">
              Living tales: Ramayana, Mahabharata &amp; Panchatantra
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF9933]">
              <Scroll className="w-4 h-4" />
              <span>Living Streams of Wisdom</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17324D] font-heading">
              {t.curriculum.sourcesTitle}
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-[#FF9933]/20">
                <h4 className="font-bold text-[#17324D] text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF9933]" />
                  <span>The Ramayana: Dharma, Duty &amp; Unshakable Loyalty</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                  Episodes focusing on truthfulness, devotion, respecting elders, and keeping promises even when difficult.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-[#38BDF8]/30">
                <h4 className="font-bold text-[#17324D] text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                  <span>The Mahabharata: Ethical Dilemmas &amp; Moral Courage</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                  Multi-layered narratives where right and wrong require deep reflection, discernment, and conscience.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-[#22A06B]/25">
                <h4 className="font-bold text-[#17324D] text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22A06B]" />
                  <span>Panchatantra: Prudence, Friendship &amp; Living Wisdom</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                  Delightful, clever animal allegories teaching practical discernment, true companionship, and quick wit.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grade-Calibrated Interactive Explorer */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#17324D] font-heading">
                Explore Gunas by Grade Level
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Select a class band to see how moral dilemmas scale with age
              </p>
            </div>

            {/* Grade Band Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-gray-200 overflow-x-auto">
              {t.curriculum.gradeTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedGrade(tab.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    selectedGrade === tab.id
                      ? 'bg-[#FF9933] text-white shadow-2xs'
                      : 'text-gray-600 hover:text-[#17324D] hover:bg-[#FFF9F0]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Guna Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGunas.map((guna) => {
              const isExpanded = expandedGuna === guna.id;
              const name = currentLang === 'te' ? guna.nameTe : currentLang === 'hi' ? guna.nameHi : guna.nameEn;
              const meaning = currentLang === 'te' ? guna.meaningTe : currentLang === 'hi' ? guna.meaningHi : guna.meaningEn;

              return (
                <div
                  key={guna.id}
                  onClick={() => setExpandedGuna(guna.id)}
                  className={`p-6 rounded-3xl bg-white border transition-all cursor-pointer flex flex-col justify-between ${
                    isExpanded
                      ? 'border-[#FF9933] shadow-md ring-2 ring-[#FF9933]/20'
                      : 'border-gray-200 hover:border-[#FF9933]/50 shadow-2xs'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold text-[#FF9933]">
                        {guna.epicSource}
                      </span>
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-md">
                        Grades: {guna.grades}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-[#17324D] font-heading mb-1">
                      {name}
                    </h4>
                    <span className="text-xs font-bold text-[#22A06B] font-devanagari">
                      {guna.sanskrit}
                    </span>

                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                      {meaning}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                    <div className="text-xs text-gray-700">
                      <strong className="text-[#17324D]">Classical Episode: </strong>
                      <span>{guna.storyExample}</span>
                    </div>
                    <div className="text-xs text-[#22A06B]">
                      <strong>Modern Life Skill: </strong>
                      <span>{guna.modernApplication}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modern Life Skills Synthesis Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#22A06B]/30 shadow-xs flex flex-col lg:flex-row items-center gap-8">
          <div className="w-16 h-16 rounded-2xl bg-[#22A06B]/15 text-[#22A06B] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-[#17324D] font-heading">
              {t.curriculum.modernSkillsTitle}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
              We translate classical Gunas into tangible behavioral skills: handling digital screen habits with moderation (Sanyama), practicing cyber-empathy without trolling (Ahimsa), accepting examination setbacks with calm poise (Samatvam), and standing up for vulnerable peers (Dhairya).
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
