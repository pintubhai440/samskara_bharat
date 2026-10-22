import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/content';
import { User, Users, GitFork, Check, Sparkles, BookOpen } from 'lucide-react';

interface LearningModesSectionProps {
  currentLang: Language;
}

export const LearningModesSection: React.FC<LearningModesSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const modes = t.modes;
  const [activeTab, setActiveTab] = useState<'both' | 'individual' | 'collective'>('both');

  return (
    <section id="modes" className="py-16 sm:py-24 bg-[#FFF9F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#22A06B] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#22A06B]" aria-hidden="true" />
            <span>{modes.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight font-heading text-balance">
            {modes.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-sans">
            {modes.subtitle}
          </p>
        </div>

        {/* Central Proposition: Both Modes Share the Same Learning Journey */}
        <div className="mb-14 p-6 sm:p-8 bg-gradient-to-r from-[#FF9933]/15 via-white to-[#22A06B]/15 rounded-3xl border border-[#FF9933]/30 shadow-2xs text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#FF9933] mb-2">
            <GitFork className="w-4 h-4" />
            <span>{modes.sharedCoreTitle}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#17324D] font-heading mb-2">
            One Unified Syllabus · Two Experiential Paths
          </h3>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
            {modes.sharedCoreDescription}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-[#17324D]">
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200">Same 16 Gunas</span>
            <span className="text-gray-400">·</span>
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200">Same Epics &amp; Panchatantra Tales</span>
            <span className="text-gray-400">·</span>
            <span className="px-3 py-1 bg-white rounded-full border border-gray-200">Same 5-Phase Reflection Cycle</span>
          </div>
        </div>

        {/* Mode Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 1. Individual Mode (Swadhyaya) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#FF9933]/30 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FF9933]/15 text-[#FF9933] flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#FF9933] bg-[#FF9933]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Swadhyaya
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#17324D] font-heading mb-2">
                {modes.individualTitle}
              </h3>
              <p className="text-sm text-[#22A06B] font-semibold mb-6">
                {modes.individualSubtitle}
              </p>

              <ul className="space-y-4">
                {modes.individualPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] text-gray-700 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-[#FF9933]/20 text-[#FF9933] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="font-semibold text-[#17324D]">Environment:</span>
              <span>Home study, library hours, private self-paced exploration</span>
            </div>
          </div>

          {/* 2. Collective Mode (Satsanga / Sahachintan) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#22A06B]/30 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#22A06B]/15 text-[#22A06B] flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#22A06B] bg-[#22A06B]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Satsanga
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#17324D] font-heading mb-2">
                {modes.collectiveTitle}
              </h3>
              <p className="text-sm text-[#FF9933] font-semibold mb-6">
                {modes.collectiveSubtitle}
              </p>

              <ul className="space-y-4">
                {modes.collectivePoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] text-gray-700 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-[#22A06B]/20 text-[#22A06B] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="font-semibold text-[#17324D]">Environment:</span>
              <span>School classrooms, morning assemblies, guided circles</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
