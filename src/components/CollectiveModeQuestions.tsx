import React, { useState, useEffect } from 'react';
import { ReflectionQuestion, QuestionOption } from '../types';
import { Users, BarChart3, Plus, Minus, RotateCcw, HelpCircle, AlertCircle, Sparkles, Save, CheckCircle2, CloudUpload, HardDrive, WifiOff } from 'lucide-react';
import { offlineLessonManager } from '../services/offlineLessonManager';

interface CollectiveModeQuestionsProps {
  questions: ReflectionQuestion[];
  initialClassSize?: number;
  onVotesChange?: (votes: Record<string, Record<string, number>>) => void;
  userId?: string;
  lessonId?: string;
}

export const CollectiveModeQuestions: React.FC<CollectiveModeQuestionsProps> = ({
  questions,
  initialClassSize = 35,
  onVotesChange,
  userId = 'guest',
  lessonId = 'class-6-satyavrata',
}) => {
  const [classSize, setClassSize] = useState<number>(initialClassSize);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved_offline' | 'saved_synced'>('idle');
  const [sessionNotes, setSessionNotes] = useState<string>('');
  
  // Real dynamic recorded response state: questionId -> optionId -> count
  const [votes, setVotes] = useState<Record<string, Record<string, number>>>(() => {
    // Initial zero votes to guarantee zero fabricated data
    const initial: Record<string, Record<string, number>> = {};
    questions.forEach((q) => {
      initial[q.id] = {};
      (q.options || []).forEach((opt) => {
        initial[q.id][opt.id] = 0;
      });
    });
    return initial;
  });

  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

  const activeQuestion = questions[activeQuestionIndex] || questions[0];

  // Calculate dynamic totals for the active question
  const currentQuestionVotes = votes[activeQuestion.id] || {};
  const totalResponsesForQuestion = Object.values(currentQuestionVotes).reduce((sum, v) => sum + (v || 0), 0);
  const notYetResponded = Math.max(0, classSize - totalResponsesForQuestion);

  const handleUpdateVote = (optionId: string, delta: number) => {
    setVotes((prev) => {
      const questionVotes = { ...(prev[activeQuestion.id] || {}) };
      const currentCount = questionVotes[optionId] || 0;
      const newCount = Math.max(0, currentCount + delta);

      // Prevent exceeding class size
      const currentTotal = Object.values(questionVotes).reduce((sum, v) => sum + v, 0);
      if (delta > 0 && currentTotal >= classSize) {
        return prev;
      }

      questionVotes[optionId] = newCount;
      const updated = {
        ...prev,
        [activeQuestion.id]: questionVotes,
      };
      onVotesChange?.(updated);
      return updated;
    });
  };

  const handleSetOptionCount = (optionId: string, count: number) => {
    setVotes((prev) => {
      const questionVotes = { ...(prev[activeQuestion.id] || {}) };
      questionVotes[optionId] = Math.max(0, count);
      const updated = {
        ...prev,
        [activeQuestion.id]: questionVotes,
      };
      onVotesChange?.(updated);
      return updated;
    });
  };

  const handleResetCurrentQuestionVotes = () => {
    setVotes((prev) => {
      const zeroed: Record<string, number> = {};
      (activeQuestion?.options || []).forEach((opt) => {
        zeroed[opt.id] = 0;
      });
      const updated = {
        ...prev,
        [activeQuestion.id]: zeroed,
      };
      onVotesChange?.(updated);
      return updated;
    });
  };

  // Option color helpers
  const optionColors = [
    { bg: 'bg-[#FF9933]', bar: 'bg-[#FF9933]', light: 'bg-[#FF9933]/10', border: 'border-[#FF9933]/30' },
    { bg: 'bg-[#38BDF8]', bar: 'bg-[#38BDF8]', light: 'bg-[#38BDF8]/10', border: 'border-[#38BDF8]/30' },
    { bg: 'bg-[#22A06B]', bar: 'bg-[#22A06B]', light: 'bg-[#22A06B]/10', border: 'border-[#22A06B]/30' },
    { bg: 'bg-[#17324D]', bar: 'bg-[#17324D]', light: 'bg-[#17324D]/10', border: 'border-[#17324D]/30' },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Teacher-Led Classroom Session Setup Header */}
      <div className="p-6 bg-white rounded-3xl border border-[#22A06B]/30 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#22A06B] uppercase tracking-wider mb-1">
              <Users className="w-4 h-4" />
              <span>Teacher Facilitated Classroom Activity</span>
            </div>
            <h3 className="text-xl font-bold text-[#17324D] font-heading">
              Collective Deliberation &amp; Response Distribution
            </h3>
          </div>

          {/* Enrolled Class Size Control */}
          <div className="flex items-center gap-2 bg-[#FFF9F0] p-2 rounded-2xl border border-[#FF9933]/25">
            <span className="text-xs font-bold text-[#17324D] whitespace-nowrap">
              Class Enrolled Size:
            </span>
            <input
              type="number"
              min={1}
              max={150}
              value={classSize}
              onChange={(e) => setClassSize(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 px-2.5 py-1 text-xs font-extrabold text-center bg-white border border-gray-300 rounded-xl"
            />
          </div>
        </div>

        {/* Live Participation Counter (Exact Denominator Specification) */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-[#FFF9F0] rounded-2xl border border-[#FF9933]/20">
            <span className="text-[11px] font-semibold text-gray-500 block">Total Enrolled Class Size</span>
            <span className="text-2xl font-black text-[#17324D]">{classSize}</span>
          </div>
          <div className="p-3 bg-[#22A06B]/10 rounded-2xl border border-[#22A06B]/30">
            <span className="text-[11px] font-semibold text-gray-600 block">Responses Received (Denominator)</span>
            <span className="text-2xl font-black text-[#22A06B]">{totalResponsesForQuestion}</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
            <span className="text-[11px] font-semibold text-gray-500 block">Not Yet Responded</span>
            <span className="text-2xl font-black text-gray-700">{notYetResponded}</span>
          </div>
        </div>

        {/* Teacher projector notice */}
        <p className="mt-3 text-[11px] text-gray-500 text-center font-medium">
          Displayed on classroom screen or projector · Count student hands or record votes per option · Percentages dynamically calculated based on respondents.
        </p>
      </div>

      {/* 2. Four Questions Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {questions.map((q, idx) => {
          const isActive = activeQuestionIndex === idx;
          const qVotes = votes[q.id] || {};
          const qTotal = Object.values(qVotes).reduce((sum, v) => sum + (v || 0), 0);

          return (
            <button
              key={q.id}
              onClick={() => setActiveQuestionIndex(idx)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-[#17324D] text-white shadow-xs scale-102'
                  : 'bg-white text-gray-700 hover:bg-[#FFF9F0] border border-gray-200'
              }`}
            >
              <span>Q{idx + 1}: {idx < 2 ? 'Likely Action & Motive' : 'Ethical Action & Reason'}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-[#FF9933] text-white' : 'bg-gray-100 text-gray-600'}`}>
                {qTotal} voted
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Active Question Card with Live Options & Dynamic Percentage Bars */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
        
        {/* Question Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#FF9933] uppercase">
              <span>Question {activeQuestion.questionNumber} of 4 · {activeQuestion.category}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#17324D] font-heading mt-1">
              {activeQuestion.question}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              💡 {activeQuestion.hint}
            </p>
          </div>

          <button
            onClick={handleResetCurrentQuestionVotes}
            className="self-start sm:self-auto px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl border border-gray-200 flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset votes for this question"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Votes</span>
          </button>
        </div>

        {/* Options List with Dynamic Vote Tallies and Real Percentages */}
        <div className="space-y-4">
          {(activeQuestion?.options || []).map((opt, optIdx) => {
            const count = currentQuestionVotes[opt.id] || 0;
            // Exact formula specified:
            // Percentage = (Number of students selecting option / Number of respondents) * 100
            const percentage = totalResponsesForQuestion > 0
              ? (count / totalResponsesForQuestion) * 100
              : 0;
            const formattedPercentage = percentage.toFixed(1);

            const color = optionColors[optIdx % optionColors.length];

            return (
              <div
                key={opt.id}
                className={`p-4 sm:p-5 rounded-2xl border ${color.border} ${color.light} transition-all space-y-3`}
              >
                {/* Option Header & Vote Count */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <span className={`w-6 h-6 rounded-lg ${color.bg} text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-[#17324D] leading-snug">
                        {opt.text}
                      </p>
                      {opt.tag && (
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mt-0.5">
                          Category: {opt.tag}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Share & Percentage Display */}
                  <div className="text-right shrink-0 sm:pl-4">
                    <div className="text-base sm:text-lg font-black text-[#17324D]">
                      {count} <span className="text-xs font-normal text-gray-500">students</span>
                    </div>
                    <div className="text-xs font-bold text-[#22A06B]">
                      {totalResponsesForQuestion > 0 ? `${formattedPercentage}% of respondents` : '0.0%'}
                    </div>
                  </div>
                </div>

                {/* Real-time Proportional Share Bar */}
                <div className="w-full bg-white/80 h-3 rounded-full overflow-hidden border border-gray-200">
                  <div
                    className={`${color.bar} h-full transition-all duration-300 ease-out`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Teacher Hand-Count Controls (Direct input & +1 / -1 buttons) */}
                <div className="flex items-center justify-between pt-2 border-t border-black/5 text-xs">
                  <span className="text-[11px] font-semibold text-gray-600">
                    Record Classroom Hand Tally:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleUpdateVote(opt.id, -1)}
                      disabled={count <= 0}
                      className="p-1 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                      aria-label="Subtract 1 hand"
                    >
                      <Minus className="w-3.5 h-3.5 text-gray-700" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUpdateVote(opt.id, 1)}
                      disabled={totalResponsesForQuestion >= classSize}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-gray-300 hover:bg-gray-100 flex items-center gap-1 cursor-pointer disabled:opacity-30"
                    >
                      <Plus className="w-3 h-3 text-[#22A06B]" />
                      <span>+1 Hand</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUpdateVote(opt.id, 5)}
                      disabled={totalResponsesForQuestion + 5 > classSize}
                      className="px-2 py-1 text-xs font-bold rounded-lg bg-white border border-gray-300 hover:bg-gray-100 cursor-pointer disabled:opacity-30"
                    >
                      +5
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* 4. Teacher-Facing Facilitation Guide */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF9F0] border border-[#FF9933]/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF9933] uppercase">
            <AlertCircle className="w-4 h-4 text-[#FF9933]" />
            <span>Facilitator Discussion Guidance (Essential Principle)</span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed font-sans">
            <strong>Key Pedagogical Reminder:</strong> {activeQuestion.facilitatorNotes}
          </p>
          <div className="text-[11px] text-gray-600 italic pt-1 border-t border-[#FF9933]/15">
            Important: The most popular option is not automatically the ethically right answer. Discuss why people act out of fear versus what true integrity (Satya) requires.
          </div>
        </div>

        {/* 5. Classroom Session Save & Offline Persistence */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-xs font-bold text-[#17324D] uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#22A06B]" />
                <span>Classroom Deliberation Log &amp; Voting Record</span>
              </h4>
              <p className="text-[11px] text-gray-500">
                Save student tally distribution and notes directly to this device for offline or online review.
              </p>
            </div>

            <button
              type="button"
              onClick={async () => {
                await offlineLessonManager.saveCollectiveSession(
                  userId,
                  lessonId,
                  classSize,
                  votes,
                  sessionNotes
                );
                const isOnline = offlineLessonManager.isNetworkOnline();
                setSaveStatus(isOnline ? 'saved_synced' : 'saved_offline');
                setTimeout(() => setSaveStatus('idle'), 4000);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#22A06B] hover:bg-[#1b8256] text-white text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Classroom Tally to Device</span>
            </button>
          </div>

          <textarea
            rows={2}
            value={sessionNotes}
            onChange={(e) => setSessionNotes(e.target.value)}
            placeholder="Optional facilitator observations (e.g. 'Class had a strong debate on Q2 regarding peer pressure vs bystander effect')..."
            className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#22A06B] focus:ring-1 focus:ring-[#22A06B]"
          />

          {saveStatus !== 'idle' && (
            <div className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              saveStatus === 'saved_synced' 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-amber-50 text-amber-900 border border-amber-200'
            }`}>
              {saveStatus === 'saved_synced' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Classroom session saved locally &amp; synced with Samskara Bharat cloud!</span>
                </>
              ) : (
                <>
                  <HardDrive className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Classroom session saved to device in Offline Mode! Will auto-sync when online.</span>
                </>
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

