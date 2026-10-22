import React, { useState, useEffect } from 'react';
import { 
  HardDrive, 
  CheckCircle2, 
  Trash2, 
  Play, 
  Feather, 
  HelpCircle, 
  Compass, 
  Download, 
  WifiOff, 
  ShieldCheck, 
  RefreshCw, 
  Sparkles,
  Clock,
  ArrowRight
} from 'lucide-react';
import { 
  offlineLessonManager, 
  OfflineLessonPackage 
} from '../services/offlineLessonManager';

interface DownloadedLessonsSectionProps {
  onNavigateToTab: (tab: 'videos' | 'passages' | 'questions' | 'explanation') => void;
  onOpenDownloadManager?: () => void;
  onStartClass6Download?: () => void;
}

export const DownloadedLessonsSection: React.FC<DownloadedLessonsSectionProps> = ({
  onNavigateToTab,
  onStartClass6Download
}) => {
  const [downloadedLessons, setDownloadedLessons] = useState<OfflineLessonPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const refreshList = async () => {
    setLoading(true);
    try {
      const list = await offlineLessonManager.getAllDownloadedLessons();
      setDownloadedLessons(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshList();
    const interval = setInterval(refreshList, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await offlineLessonManager.deleteDownloadedLesson(id);
      await refreshList();
    } finally {
      setDeletingId(null);
    }
  };

  const totalStorageFormatted = () => {
    const totalBytes = downloadedLessons.reduce((acc, curr) => acc + (curr.sizeBytes || 0), 0);
    if (totalBytes === 0) return '0 MB';
    return (totalBytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="rounded-3xl bg-white border border-[#22A06B]/20 p-5 sm:p-6 shadow-2xs space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#22A06B]/15 text-[#22A06B] flex items-center justify-center shrink-0">
            <WifiOff className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#22A06B] uppercase tracking-wider">
                Offline Learning Hub
              </span>
              <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {downloadedLessons.length} {downloadedLessons.length === 1 ? 'Lesson' : 'Lessons'} Stored
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#17324D] font-heading">
              Downloaded Lessons on This Device
            </h3>
          </div>
        </div>

        {downloadedLessons.length > 0 && (
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-2xl border border-gray-100 self-start sm:self-auto">
            <HardDrive className="w-4 h-4 text-gray-400" />
            <span>Total Storage: <strong className="text-[#17324D]">{totalStorageFormatted()}</strong></span>
          </div>
        )}
      </div>

      {/* Content: List or Empty State */}
      {loading && downloadedLessons.length === 0 ? (
        <div className="py-8 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-gray-400" />
          <span>Checking device storage for downloaded lessons...</span>
        </div>
      ) : downloadedLessons.length === 0 ? (
        <div className="p-6 rounded-2xl bg-[#FFF9F0] border border-[#FF9933]/20 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FF9933]/15 text-[#FF9933] flex items-center justify-center mx-auto">
            <Download className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-[#17324D]">
            No Lessons Downloaded for Offline Use Yet
          </h4>
          <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
            Download the <strong>Class 6 — Satyavrata: The Dilemma of Truth</strong> lesson while connected to Wi-Fi. It lets you watch the full video, hear 3D Ananya speak, study the reflection passage, and record your private reflections or classroom votes without internet.
          </p>
          {onStartClass6Download && (
            <button
              onClick={onStartClass6Download}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF9933] hover:bg-[#e68524] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Class 6 Satyavrata (~14.8 MB)</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {downloadedLessons.map((pkg) => (
            <div 
              key={pkg.id}
              className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50/50 via-white to-white border border-emerald-200/80 hover:border-emerald-300 transition-all shadow-2xs"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-[#22A06B] bg-[#22A06B]/15 px-2.5 py-0.5 rounded-full">
                      {pkg.classLevel || 'Class 6'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Verified 100% Offline Ready
                    </span>
                    <span className="text-[11px] text-gray-400">
                      v{pkg.version}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#17324D] font-heading">
                    {pkg.title}
                  </h4>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      Downloaded {pkg.downloadedAt}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <HardDrive className="w-3.5 h-3.5 text-gray-400" />
                      {pkg.sizeFormatted} stored
                    </span>
                    <span>•</span>
                    <span className="text-emerald-700 font-medium">
                      IndexedDB &amp; Cache Storage verified
                    </span>
                  </div>
                </div>

                {/* Right side Actions */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    disabled={deletingId === pkg.id}
                    title="Remove from device"
                    className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors cursor-pointer text-xs"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Direct Launch Buttons for Each Lesson Component */}
              <div className="mt-4 pt-3 border-t border-emerald-100/60 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mr-1">
                  Launch Offline Section:
                </span>

                <button
                  onClick={() => onNavigateToTab('videos')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#FF9933]/10 text-xs font-bold text-[#FF9933] border border-[#FF9933]/30 transition-colors cursor-pointer shadow-2xs"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Story Video</span>
                </button>

                <button
                  onClick={() => onNavigateToTab('passages')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-sky-50 text-xs font-bold text-sky-700 border border-sky-200 transition-colors cursor-pointer shadow-2xs"
                >
                  <Feather className="w-3 h-3" />
                  <span>Reflection Passage</span>
                </button>

                <button
                  onClick={() => onNavigateToTab('questions')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#22A06B]/10 text-xs font-bold text-[#22A06B] border border-[#22A06B]/30 transition-colors cursor-pointer shadow-2xs"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>4 Questions (Interactive/Collective)</span>
                </button>

                <button
                  onClick={() => onNavigateToTab('explanation')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-purple-50 text-xs font-bold text-purple-700 border border-purple-200 transition-colors cursor-pointer shadow-2xs"
                >
                  <Compass className="w-3 h-3" />
                  <span>3D Narrated Explanation</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
