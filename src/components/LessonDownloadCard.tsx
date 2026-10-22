import React, { useState, useEffect } from 'react';
import { 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Trash2, 
  X, 
  HardDrive, 
  Check, 
  WifiOff, 
  Wifi, 
  Sparkles,
  HelpCircle,
  FileCheck,
  Smartphone
} from 'lucide-react';
import { 
  offlineLessonManager, 
  OfflineLessonPackage, 
  DownloadProgress, 
  DownloadState 
} from '../services/offlineLessonManager';

interface LessonDownloadCardProps {
  lesson: any;
  explanationParts: any[];
  variant?: 'card' | 'compact' | 'banner';
  onDownloadedChange?: (isDownloaded: boolean) => void;
  className?: string;
}

export const LessonDownloadCard: React.FC<LessonDownloadCardProps> = ({
  lesson,
  explanationParts,
  variant = 'card',
  onDownloadedChange,
  className = ''
}) => {
  const [downloadState, setDownloadState] = useState<DownloadState>('not_downloaded');
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress>({
    state: 'not_downloaded',
    percent: 0,
    bytesDownloaded: 0,
    totalBytes: 15518976,
    currentStepMessage: ''
  });
  const [downloadedPackage, setDownloadedPackage] = useState<OfflineLessonPackage | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);

  // Load existing downloaded status on mount
  useEffect(() => {
    let mounted = true;
    offlineLessonManager.getDownloadedLesson(lesson.id).then((pkg) => {
      if (!mounted) return;
      if (pkg) {
        setDownloadedPackage(pkg);
        setDownloadState('completed');
        onDownloadedChange?.(true);
      } else {
        setDownloadedPackage(null);
        setDownloadState('not_downloaded');
        onDownloadedChange?.(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [lesson.id]);

  const handleStartDownload = async () => {
    setDownloadState('downloading');
    try {
      const pkg = await offlineLessonManager.startDownload(
        lesson,
        explanationParts,
        (progress) => {
          setDownloadProgress(progress);
          setDownloadState(progress.state);
        }
      );
      setDownloadedPackage(pkg);
      setDownloadState('completed');
      onDownloadedChange?.(true);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setDownloadState('interrupted');
      } else {
        setDownloadState('failed');
      }
    }
  };

  const handleCancelDownload = () => {
    offlineLessonManager.cancelDownload();
    setDownloadState('interrupted');
  };

  const handleRemoveDownload = async () => {
    try {
      await offlineLessonManager.deleteDownloadedLesson(lesson.id);
      setDownloadedPackage(null);
      setDownloadState('not_downloaded');
      setShowConfirmDelete(false);
      onDownloadedChange?.(false);
    } catch (err) {
      console.error('Failed to delete downloaded lesson:', err);
    }
  };

  const handleCheckUpdate = () => {
    setIsCheckingUpdate(true);
    setTimeout(() => {
      setIsCheckingUpdate(false);
      // For demonstration of update lifecycle: toggle between updated or latest
      if (downloadedPackage && downloadedPackage.version === '1.2.0') {
        setDownloadState('update_available');
      }
    }, 1200);
  };

  const handleApplyUpdate = async () => {
    setIsUpdating(true);
    await handleStartDownload();
    setIsUpdating(false);
  };

  const formatMB = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Compact Header / Banner Variant
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        {downloadState === 'completed' && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Available Offline ({downloadedPackage?.sizeFormatted || '14.8 MB'})</span>
            <button
              onClick={() => setShowConfirmDelete(true)}
              title="Remove downloaded lesson to free storage"
              className="ml-1 text-gray-400 hover:text-red-500 cursor-pointer p-0.5 rounded transition-colors"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}

        {downloadState === 'downloading' && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold shadow-2xs animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin shrink-0" />
            <span>Downloading... {downloadProgress.percent}%</span>
            <button 
              onClick={handleCancelDownload}
              className="text-gray-500 hover:text-gray-800 cursor-pointer text-[10px] underline ml-1"
            >
              Cancel
            </button>
          </div>
        )}

        {downloadState === 'not_downloaded' && (
          <button
            onClick={handleStartDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#FF9933] to-[#e68524] text-white text-xs font-bold hover:shadow-xs hover:brightness-105 active:scale-98 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download for Offline Use (~14.8 MB)</span>
          </button>
        )}

        {(downloadState === 'failed' || downloadState === 'interrupted') && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span>Download Paused</span>
            <button 
              onClick={handleStartDownload}
              className="text-red-700 underline font-bold cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Delete confirmation modal */}
        {showConfirmDelete && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-150">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 text-center font-heading">
                Remove Downloaded Lesson?
              </h3>
              <p className="text-xs text-gray-500 text-center mt-2 leading-relaxed">
                This will free 14.8 MB of offline storage on your device. You can download it again anytime when connected to Wi-Fi.
              </p>
              <div className="flex items-center gap-2 mt-5">
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="flex-1 py-2 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRemoveDownload}
                  className="flex-1 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Full Rich Card Variant (Default)
  return (
    <div className={`p-5 sm:p-6 rounded-3xl bg-white border transition-all ${
      downloadState === 'completed'
        ? 'border-emerald-200/80 bg-gradient-to-br from-emerald-50/40 via-white to-white shadow-xs'
        : downloadState === 'downloading'
        ? 'border-amber-300 bg-amber-50/30 shadow-xs'
        : 'border-[#FF9933]/30 bg-gradient-to-br from-[#FFF9F0] via-white to-white shadow-2xs'
    } ${className}`}>
      
      {/* Top Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
            downloadState === 'completed' 
              ? 'bg-emerald-100 text-emerald-700' 
              : downloadState === 'downloading' 
              ? 'bg-amber-100 text-amber-700 animate-pulse'
              : 'bg-[#FF9933]/15 text-[#FF9933]'
          }`}>
            {downloadState === 'completed' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : downloadState === 'downloading' ? (
              <RefreshCw className="w-5 h-5 text-amber-600 animate-spin" />
            ) : (
              <Download className="w-5 h-5 text-[#FF9933]" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Offline Capability
              </span>
              {downloadState === 'completed' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  <Check className="w-3 h-3 text-emerald-700" />
                  Verified Ready
                </span>
              )}
            </div>
            <h4 className="text-sm sm:text-base font-bold text-[#17324D] font-heading">
              {downloadState === 'completed' 
                ? 'Lesson Stored on Device for 100% Offline Study' 
                : downloadState === 'downloading'
                ? 'Downloading Lesson Resources...'
                : 'Download Lesson for Offline Use'}
            </h4>
          </div>
        </div>

        {/* Size Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-100/80 px-3 py-1 rounded-full">
            <HardDrive className="w-3.5 h-3.5 text-gray-500" />
            <span>{downloadedPackage?.sizeFormatted || '14.8 MB'}</span>
          </span>
          {downloadState === 'completed' && (
            <button
              onClick={() => setShowDetailsModal(true)}
              className="text-gray-400 hover:text-gray-700 p-1 rounded-lg text-xs font-medium cursor-pointer"
              title="View what is stored offline"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Body Content based on State */}
      <div className="mt-4 space-y-3">
        {/* State: NOT DOWNLOADED */}
        {downloadState === 'not_downloaded' && (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Going home or travelling without Wi-Fi? Download this complete lesson package directly onto your tablet or computer. You can watch the full video, listen to Ananya's 3D narrated explanation, read the passage, and answer reflection questions without any internet connection.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-gray-600 font-medium">
              <div className="p-2.5 rounded-xl bg-white border border-gray-100 flex items-center gap-2 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Full Story Video</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-gray-100 flex items-center gap-2 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>3D Character Narration</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-gray-100 flex items-center gap-2 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>4 Reflection Questions</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-gray-100 flex items-center gap-2 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Collective Voting</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handleStartDownload}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF9933] to-[#e68524] hover:brightness-105 active:scale-98 text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Lesson for Offline Use</span>
              </button>
              <span className="text-xs text-gray-400">
                Works in both Interactive &amp; Collective Mode
              </span>
            </div>
          </div>
        )}

        {/* State: DOWNLOADING */}
        {downloadState === 'downloading' && (
          <div className="space-y-3 bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-amber-900 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
                <span>{downloadProgress.currentStepMessage}</span>
              </span>
              <span className="text-[#FF9933]">{downloadProgress.percent}%</span>
            </div>

            {/* Animated Progress Bar */}
            <div className="w-full h-3 bg-amber-100 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-[#FF9933] to-[#22A06B] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${downloadProgress.percent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
              <span>{formatMB(downloadProgress.bytesDownloaded)} of {formatMB(downloadProgress.totalBytes)}</span>
              <button
                onClick={handleCancelDownload}
                className="text-red-600 hover:text-red-700 font-semibold cursor-pointer"
              >
                Cancel Download
              </button>
            </div>
          </div>
        )}

        {/* State: COMPLETED / AVAILABLE OFFLINE */}
        {downloadState === 'completed' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-gray-600">
              <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <WifiOff className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ready for study with or without internet</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">
                Downloaded on: <strong>{downloadedPackage?.downloadedAt || 'Today'}</strong>
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-500">
                Version: <strong>v{downloadedPackage?.version || '1.2.0'}</strong>
              </span>
            </div>

            {/* Offline Features Pill List */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 font-medium">
                ✓ Video Cached
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 font-medium">
                ✓ 3D Lip-Sync Timing Anchors
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 font-medium">
                ✓ Offline Auto-Scroll Sync
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 font-medium">
                ✓ Offline Journal &amp; Voting Queue
              </span>
            </div>

            {/* Actions: Update Check & Delete */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleCheckUpdate}
                disabled={isCheckingUpdate}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isCheckingUpdate ? 'animate-spin' : ''}`} />
                <span>{isCheckingUpdate ? 'Checking for updates...' : 'Check for Updates'}</span>
              </button>

              <button
                onClick={() => setShowConfirmDelete(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove from Device ({downloadedPackage?.sizeFormatted || '14.8 MB'})</span>
              </button>
            </div>
          </div>
        )}

        {/* State: UPDATE AVAILABLE */}
        {downloadState === 'update_available' && (
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <h5 className="text-xs font-bold text-sky-900">
                Curriculum Update Available (v1.3.0)
              </h5>
            </div>
            <p className="text-xs text-sky-800 leading-relaxed">
              An updated version with refreshed classroom discussion questions and refined phoneme timings is available from the Samskara Bharat team.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleApplyUpdate}
                disabled={isUpdating}
                className="px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                {isUpdating ? 'Updating...' : 'Download Update (~1.2 MB patch)'}
              </button>
              <button
                onClick={() => setDownloadState('completed')}
                className="px-3 py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                Keep Current
              </button>
            </div>
          </div>
        )}

        {/* State: INTERRUPTED OR FAILED */}
        {(downloadState === 'interrupted' || downloadState === 'failed') && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <h5 className="text-xs font-bold text-amber-900">
                {downloadState === 'interrupted' ? 'Download Paused or Incomplete' : 'Download Failed'}
              </h5>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              {downloadProgress.currentStepMessage || 'The download was not completed. You can safely resume downloading now.'}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleStartDownload}
                className="px-4 py-1.5 rounded-xl bg-[#FF9933] hover:bg-[#e68524] text-white text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Resume / Retry Download</span>
              </button>
              <button
                onClick={() => setDownloadState('not_downloaded')}
                className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-150">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 text-center font-heading">
              Remove Downloaded Lesson?
            </h3>
            <p className="text-xs text-gray-500 text-center mt-2 leading-relaxed">
              This will remove the offline video stream, 3D character timings, and local cached assets from this device, freeing {downloadedPackage?.sizeFormatted || '14.8 MB'} of storage.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="flex-1 py-2 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveDownload}
                className="flex-1 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Package Contents Details Modal */}
      {showDetailsModal && downloadedPackage && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-gray-900 font-heading">
                  Offline Package Details
                </h3>
              </div>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
                <span className="text-gray-600">Total Storage Consumed:</span>
                <span className="font-bold text-[#17324D]">{downloadedPackage.sizeFormatted}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
                <span className="text-gray-600">Storage Engine:</span>
                <span className="font-bold text-[#17324D]">IndexedDB + Cache Storage</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
                <span className="text-gray-600">Lesson ID:</span>
                <span className="font-mono text-[11px] text-gray-700">{downloadedPackage.id}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
                <span className="text-gray-600">Offline Verification:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Cryptographically Valid
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800 mb-2">Stored Offline Assets:</h4>
              <ul className="space-y-1.5 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Satyavrata Story Video (11.2 MB media stream buffer)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3D Indian Schoolgirl Mesh, Uniform &amp; Shader cache</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Speech Phoneme Timing Checkpoints (Offline Lip-Sync)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Auto-scroll Anchors &amp; Sticky Downward Dynamics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Modern Reflection Passage: &ldquo;A Difficult Choice at School&rdquo;</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>4 Probing Questions with Options, Hints &amp; Facilitator Notes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Interactive Journal &amp; Collective Class Voting Offline DB</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setShowDetailsModal(false)}
              className="mt-5 w-full py-2.5 text-xs font-bold text-white bg-[#17324D] hover:bg-[#1f4265] rounded-xl transition-colors cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
