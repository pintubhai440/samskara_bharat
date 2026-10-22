import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/content';
import { BookOpen, Feather, HelpCircle, Compass, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  currentLang: Language;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  // Sample interactive demonstration of a real module
  const sampleCycle = [
    {
      step: 0,
      phase: "01. Storytelling (Katha)",
      title: "The Scholar, the Boatman & the River",
      content: "A learned scholar boarded a boat to cross a swollen river. Proud of his intellectual feats, he mocked the simple boatman for not knowing grammar, astronomy, or poetry: 'You have wasted half your life!' Suddenly, fierce storm waves battered the frail boat, cracking the timber. The boatman calmly turned to the trembling scholar and asked: 'Sir, do you know how to swim?'",
      badge: "Narrative Immersion"
    },
    {
      step: 1,
      phase: "02. Reflection Passage (Prashna Prasanga)",
      title: "The Moment of Realization",
      content: "The scholar stared at the surging black waters. All his books, citations, and degrees were completely useless against the physical reality of the river. He had confused accumulation of information with genuine, humble wisdom that saves lives and serves others.",
      badge: "The Moral Knot"
    },
    {
      step: 2,
      phase: "03. Reflection Questions (Chintan)",
      title: "Self-Inquiry & Personal Examination",
      content: "1. Why did the scholar feel superior to the boatman?\n2. Think of a time you felt proud of high marks or a gaming score and looked down on a peer. How did that make them feel?\n3. What is the difference between having information (Jnana) and having humility (Vinaya)?",
      badge: "Introspective Prompts"
    },
    {
      step: 3,
      phase: "04. Guided Explanation (Bodha)",
      title: "Civilizational Synthesis & Modern Life",
      content: "Vidya Dadati Vinayam ('True learning bestows modesty'). In our digital age, raw information is abundant on smartphones, but character and empathy cannot be downloaded. Modesty in achievement opens doors to lifelong learning and deep friendship.",
      badge: "Ethical Integration"
    },
    {
      step: 4,
      phase: "05. Progress Tracking (Sadhana)",
      title: "Reflective Growth Journal",
      content: "The student logs their reflection in their private notebook: 'This week, I helped a classmate who struggled with math without boasting or laughing.' Milestone registered: Vinaya Level 1 Achieved.",
      badge: "Character Milestone"
    }
  ];

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <BookOpen className="w-5 h-5" />;
      case 1:
        return <Feather className="w-5 h-5" />;
      case 2:
        return <HelpCircle className="w-5 h-5" />;
      case 3:
        return <Compass className="w-5 h-5" />;
      case 4:
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-t border-[#FF9933]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF9933] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF9933]" aria-hidden="true" />
            <span>{t.howItWorks.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17324D] tracking-tight font-heading text-balance">
            {t.howItWorks.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-sans">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* 5-Step Linear Sequence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
          {t.howItWorks.steps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#FFF9F0] border-[#FF9933] shadow-md ring-2 ring-[#FF9933]/25'
                    : 'bg-white border-gray-200 hover:border-[#FF9933]/40 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-gray-400">
                      {step.number}
                    </span>
                    <div className={`p-2 rounded-xl ${isActive ? 'bg-[#FF9933] text-white' : 'bg-[#FFF9F0] text-[#17324D]'}`}>
                      {getStepIcon(idx)}
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-[#17324D] font-heading mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium mb-3">
                    {step.subtitle}
                  </p>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pt-2 border-t border-gray-100">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Step-by-Step Sample Sandbox */}
        <div className="bg-[#FFF9F0] p-6 sm:p-10 rounded-3xl border border-[#FF9933]/25 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#FF9933]/15">
            <div>
              <span className="text-xs font-bold text-[#22A06B] uppercase tracking-wider">
                {t.howItWorks.sampleSubtitle}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#17324D] font-heading mt-0.5">
                {t.howItWorks.sampleTitle}
              </h3>
            </div>
            
            {/* Step navigation buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500 mr-2">
                Phase {activeStepIndex + 1} of 5
              </span>
              <button
                onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : 4))}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white border border-gray-200 text-[#17324D] hover:bg-[#FFEECF] transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setActiveStepIndex((prev) => (prev < 4 ? prev + 1 : 0))}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#FF9933] text-white hover:bg-[#e68524] transition-colors flex items-center gap-1"
              >
                <span>Next Phase</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Active Phase Display Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-2xs">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-extrabold text-[#FF9933] tracking-wide uppercase">
                {sampleCycle[activeStepIndex].phase}
              </span>
              <span className="text-xs font-bold text-[#22A06B] bg-[#22A06B]/10 px-2.5 py-0.5 rounded-full">
                {sampleCycle[activeStepIndex].badge}
              </span>
            </div>

            <h4 className="text-lg sm:text-xl font-bold text-[#17324D] font-heading mb-3">
              {sampleCycle[activeStepIndex].title}
            </h4>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line font-sans">
              {sampleCycle[activeStepIndex].content}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
