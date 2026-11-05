import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { 
  StudentUser, 
  DashboardTab, 
  LearningMode, 
  StudentProgress, 
  Badge 
} from '../types';
import { availableAvatars } from '../data/avatarsData';
import { satyavrataLesson, satyavrataExplanationParts } from '../data/satyavrataLesson';
import { panchatantraTruthLesson, panchatantraExplanationParts } from '../data/panchatantraTruthLesson';
import { initialBadges } from '../data/lessonsData';
import { PassageExperience } from './PassageExperience';
import { GuidedExplanationExperience } from './GuidedExplanationExperience';
import { CollectiveModeQuestions } from './CollectiveModeQuestions';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Video, 
  Feather, 
  HelpCircle, 
  Compass, 
  TrendingUp, 
  Award, 
  Smile, 
  User, 
  LogOut, 
  Home, 
  Play, 
  Pause, 
  CheckCircle2, 
  Check, 
  Users, 
  Sparkles, 
  Menu, 
  X,
  ArrowRight,
  Info,
  ShieldCheck,
  Volume2,
  VolumeX,
  RotateCcw,
  RotateCw,
  Maximize,
  Minimize,
  Wifi,
  WifiOff,
  RefreshCw,
  HardDrive,
  Database,
  Settings,
  AlertCircle,
  ExternalLink,
  Link as LinkIcon,
  Zap,
  Square
} from 'lucide-react';
import { LessonDownloadCard } from './LessonDownloadCard';
import { DownloadedLessonsSection } from './DownloadedLessonsSection';
import { offlineLessonManager } from '../services/offlineLessonManager';

export const class6ChapterTruth = {
  classLevel: 'Class 6',
  chapterNumber: '01',
  chapterName: 'Truth',
  sanskritName: 'सत्य (Satya / Satyavākyaḥ)',
  description: 'Cultivating unshakeable truthfulness, honesty when unobserved, and the courage to protect the innocent.',
  lessons: [
    {
      order: '01',
      id: satyavrataLesson.id,
      title: 'Satyavrata: The Dilemma of Truth',
      storyTitle: 'Satyavrata & The Hunter: When Truth Meets Compassion',
      lesson: satyavrataLesson,
      explanationParts: satyavrataExplanationParts,
      source: 'Mahabharata',
      badge: 'Satyavrata (सत्यव्रत)'
    },
    {
      order: '02',
      id: panchatantraTruthLesson.id,
      title: 'Panchatantra: Dharma Buddhi & Papa Buddhi',
      storyTitle: 'Dharma Buddhi & Papa Buddhi: The False Witness & The Triumph of Truth',
      lesson: panchatantraTruthLesson,
      explanationParts: panchatantraExplanationParts,
      source: 'Panchatantra',
      badge: 'Panchatantra (पंचतंत्र)'
    }
  ]
};

interface StudentDashboardProps {
  user: StudentUser;
  onLogout: () => void;
  onReturnToHome: () => void;
  onUpdateUser: (updatedUser: StudentUser) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  onLogout,
  onReturnToHome,
  onUpdateUser,
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('all');
  const [learningMode, setLearningMode] = useState<LearningMode>('individual');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Class 6 Chapter: Truth selection (Default: Satyavrata)
  const [selectedLessonId, setSelectedLessonId] = useState<string>(() => {
    // Default firmly to Satyavrata so its story and video are always ready on start
    return satyavrataLesson.id;
  });
  const [videoSourceModalOpen, setVideoSourceModalOpen] = useState(false);
  const [newVideoUrlInput, setNewVideoUrlInput] = useState('');

  const activeChapterItem = class6ChapterTruth.lessons.find((l) => l.id === selectedLessonId) || class6ChapterTruth.lessons[0];
  const lesson = activeChapterItem.lesson;
  const currentExplanationParts = activeChapterItem.explanationParts;

  // Helper to reliably resolve video URL for a lesson
  const getResolvedVideoUrl = (lessonId: string): string => {
    const saved = localStorage.getItem(`sb_custom_video_url_${lessonId}`);
    // If the saved URL was the slow remote supabase url, upgrade to local zero-lag video
    if (saved && !saved.includes('supabase.co') && (saved.startsWith('http://') || saved.startsWith('https://') || saved.startsWith('blob:') || saved.startsWith('/assets/'))) {
      return saved;
    }
    if (lessonId === satyavrataLesson.id) {
      return (import.meta as any).env?.VITE_LESSON_VIDEO_URL || satyavrataLesson.videoUrl || '/assets/videos/satyavrata_truth.mp4';
    }
    return (import.meta as any).env?.VITE_PANCHATANTRA_VIDEO_URL || panchatantraTruthLesson.videoUrl || '/assets/videos/panchatantra_truth.mp4';
  };

  // Dilemma interactive choices & audio state
  const [isNarratingSynopsis, setIsNarratingSynopsis] = useState(false);
  const [dilemmaVote, setDilemmaVote] = useState<string | null>(() => {
    return localStorage.getItem(`sb_dilemma_choice_${selectedLessonId}`) || null;
  });

  // Network & Offline Storage Management State
  const [isOnline, setIsOnline] = useState<boolean>(() => offlineLessonManager.isNetworkOnline());
  const [simulatedOffline, setSimulatedOffline] = useState<boolean>(() => offlineLessonManager.isSimulatingOffline());
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Video player state & Supabase / Local / Custom Video integration
  const [customVideoUrl, setCustomVideoUrl] = useState<string>(() => {
    return getResolvedVideoUrl(satyavrataLesson.id);
  });

  // Keep customVideoUrl synchronized whenever selectedLessonId changes
  useEffect(() => {
    let mounted = true;
    offlineLessonManager.getVideoBlobUrl(selectedLessonId).then((blobUrl) => {
      if (!mounted) return;
      if (blobUrl) {
        setCustomVideoUrl(blobUrl);
      } else {
        setCustomVideoUrl(getResolvedVideoUrl(selectedLessonId));
      }
    });
    return () => {
      mounted = false;
    };
  }, [selectedLessonId]);

  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    localStorage.setItem('sb_active_lesson_id', lessonId);
    setIsPlaying(false);
    setIsBuffering(false);
    setVideoProgress(0);
    setVideoCurrentTime(0);
    setVideoError(null);
    offlineLessonManager.getVideoBlobUrl(lessonId).then((blobUrl) => {
      if (blobUrl) {
        setCustomVideoUrl(blobUrl);
      } else {
        setCustomVideoUrl(getResolvedVideoUrl(lessonId));
      }
    });
    setDilemmaVote(localStorage.getItem(`sb_dilemma_choice_${lessonId}`) || null);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsNarratingSynopsis(false);
    }
  };
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState<number>(540); // 9 minutes = 540 seconds default
  const [videoCurrentTime, setVideoCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [areControlsVisible, setAreControlsVisible] = useState(true);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [quickFeedback, setQuickFeedback] = useState<string | null>(null);

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const htmlVideoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<any>(null);
  const quickFeedbackTimeoutRef = useRef<any>(null);

  // Synchronise native Fullscreen API changes (including keyboard Escape)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
      if (isCurrentlyFullscreen) {
        resetControlsTimeout();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Auto-hide controls and overlays when playing (YouTube / Netflix style)
  const resetControlsTimeout = () => {
    setAreControlsVisible(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setAreControlsVisible(false);
      }, 2500);
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      setAreControlsVisible(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    } else {
      resetControlsTimeout();
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  // Flash quick visual feedback ripple on screen (+10s, -10s, Speed)
  const showQuickFeedback = (text: string) => {
    setQuickFeedback(text);
    if (quickFeedbackTimeoutRef.current) {
      clearTimeout(quickFeedbackTimeoutRef.current);
    }
    quickFeedbackTimeoutRef.current = setTimeout(() => {
      setQuickFeedback(null);
    }, 850);
  };

  // Advance video progress in simulated narrative mode when no real video URL is connected
  useEffect(() => {
    let interval: any = null;
    if (!customVideoUrl && isPlaying) {
      interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return Math.min(100, prev + 1);
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, customVideoUrl]);

  // Handle Play / Pause toggle across both real video and simulated player
  const handleTogglePlay = () => {
    resetControlsTimeout();
    if (htmlVideoRef.current && customVideoUrl) {
      if (isPlaying) {
        htmlVideoRef.current.pause();
        showQuickFeedback('Paused');
      } else {
        setVideoError(null);
        htmlVideoRef.current.play().catch((err) => {
          console.warn('Playback error:', err);
          setVideoError('Click play again to start video streaming.');
        });
        showQuickFeedback('Playing');
      }
    } else {
      setIsPlaying(!isPlaying);
      showQuickFeedback(!isPlaying ? 'Playing' : 'Paused');
    }
  };

  // Rewind 10 seconds (-10s)
  const handleSkipBackward = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    resetControlsTimeout();
    if (htmlVideoRef.current && customVideoUrl) {
      const cur = htmlVideoRef.current.currentTime;
      const dur = htmlVideoRef.current.duration || videoDuration || 540;
      const target = Math.max(0, cur - 10);
      htmlVideoRef.current.currentTime = target;
      setVideoCurrentTime(target);
      if (dur > 0) setVideoProgress(Math.min(100, Math.round((target / dur) * 100)));
    } else {
      const curSec = Math.floor((videoProgress / 100) * totalDurationSec);
      const targetSec = Math.max(0, curSec - 10);
      setVideoProgress(Math.min(100, Math.round((targetSec / totalDurationSec) * 100)));
    }
    showQuickFeedback('−10s ⏪');
  };

  // Fast-forward 10 seconds (+10s)
  const handleSkipForward = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    resetControlsTimeout();
    if (htmlVideoRef.current && customVideoUrl) {
      const cur = htmlVideoRef.current.currentTime;
      const dur = htmlVideoRef.current.duration || videoDuration || 540;
      const target = Math.min(dur, cur + 10);
      htmlVideoRef.current.currentTime = target;
      setVideoCurrentTime(target);
      if (dur > 0) setVideoProgress(Math.min(100, Math.round((target / dur) * 100)));
    } else {
      const curSec = Math.floor((videoProgress / 100) * totalDurationSec);
      const targetSec = Math.min(totalDurationSec, curSec + 10);
      setVideoProgress(Math.min(100, Math.round((targetSec / totalDurationSec) * 100)));
    }
    showQuickFeedback('+10s ⏩');
  };

  // Cycle playback speed (1x -> 1.25x -> 1.5x -> 2x -> 0.75x)
  const handleCyclePlaybackRate = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    resetControlsTimeout();
    const rates = [1, 1.25, 1.5, 2, 0.75];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (htmlVideoRef.current) {
      htmlVideoRef.current.playbackRate = nextRate;
    }
    showQuickFeedback(`${nextRate}x Speed`);
  };

  const handleToggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    resetControlsTimeout();
    if (htmlVideoRef.current) {
      htmlVideoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
    showQuickFeedback(!isMuted ? 'Muted' : 'Unmuted');
  };

  const handleRestartVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    resetControlsTimeout();
    setVideoProgress(0);
    setVideoCurrentTime(0);
    if (htmlVideoRef.current && customVideoUrl) {
      htmlVideoRef.current.currentTime = 0;
      htmlVideoRef.current.play().catch(() => {});
    } else {
      setIsPlaying(true);
    }
    showQuickFeedback('Restarted');
  };

  const toggleFullscreen = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    resetControlsTimeout();
    if (!videoContainerRef.current) return;

    try {
      if (!isFullscreen) {
        const el = videoContainerRef.current as any;
        if (el.requestFullscreen) {
          await el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
          await el.webkitRequestFullscreen();
        } else if (el.mozRequestFullScreen) {
          await el.mozRequestFullScreen();
        } else if (el.msRequestFullscreen) {
          await el.msRequestFullscreen();
        }
      } else {
        const doc = document as any;
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          await doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen toggle notice:', err);
    }
  };

  // Keyboard navigation shortcuts for the video player
  useEffect(() => {
    if (activeTab !== 'videos') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      // Prevent developer inspect shortcuts when on video player
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c' || e.key === 'J' || e.key === 'j')) ||
        (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')) ||
        (e.metaKey && e.altKey && (e.key === 'i' || e.key === 'I' || e.key === 'u' || e.key === 'U'))
      ) {
        e.preventDefault();
        showQuickFeedback('🔒 Protected Video Stream');
        return;
      }

      if (e.code === 'Space' || e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.code === 'ArrowLeft' || e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        handleSkipBackward();
      } else if (e.code === 'ArrowRight' || e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        handleSkipForward();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        handleToggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, isPlaying, customVideoUrl, isMuted, isFullscreen, videoDuration, videoProgress]);

  const handleVideoScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    resetControlsTimeout();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercent = Math.max(0, Math.min(100, Math.round((clickX / rect.width) * 100)));
    setVideoProgress(newPercent);
    setIsBuffering(false);
    if (htmlVideoRef.current && customVideoUrl) {
      const dur = htmlVideoRef.current.duration || videoDuration || 540;
      const targetTime = (newPercent / 100) * dur;
      htmlVideoRef.current.currentTime = targetTime;
      setVideoCurrentTime(targetTime);
    }
  };

  const handleHtmlVideoTimeUpdate = () => {
    if (htmlVideoRef.current) {
      const cur = htmlVideoRef.current.currentTime;
      const dur = htmlVideoRef.current.duration || videoDuration || 540;
      setVideoCurrentTime(cur);
      setIsBuffering(false);
      if (dur > 0) {
        setVideoProgress(Math.min(100, Math.round((cur / dur) * 100)));
      }
    }
  };

  const handleHtmlVideoLoadedMetadata = () => {
    if (htmlVideoRef.current && htmlVideoRef.current.duration) {
      setVideoDuration(htmlVideoRef.current.duration);
    }
    setVideoError(null);
  };

  const handleHtmlVideoEnded = () => {
    setIsPlaying(false);
    setVideoProgress(100);
    if (!progress.completedVideos.includes(lesson.id)) {
      handleToggleVideoCompleted();
    }
  };

  const totalDurationSec = customVideoUrl && videoDuration > 0 ? Math.floor(videoDuration) : 9 * 60;
  const currentVideoSec = customVideoUrl ? Math.floor(videoCurrentTime) : Math.floor((videoProgress / 100) * totalDurationSec);
  const formatVideoTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Progress and Badges State
  const [progress, setProgress] = useState<StudentProgress>(() => {
    const saved = localStorage.getItem(`sb_progress_${user.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved progress', e);
      }
    }
    return {
      completedVideos: [],
      completedPassages: [],
      completedQuestions: [],
      completedExplanations: [],
      completedLessons: [],
      savedResponses: {},
      collectiveNotes: {},
    };
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem(`sb_badges_${user.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved badges', e);
      }
    }
    return initialBadges;
  });

  // Active question answers for Interactive Mode
  const [interactiveAnswers, setInteractiveAnswers] = useState<Record<string, string>>({});
  const [interactiveSelectedOptions, setInteractiveSelectedOptions] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Refresh pending offline synchronization count
  const refreshPendingSync = async () => {
    try {
      const count = await offlineLessonManager.getPendingSyncCount(user.id);
      setPendingSyncCount(count);
    } catch {
      setPendingSyncCount(0);
    }
  };

  // Connectivity event listener and auto-sync
  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = offlineLessonManager.isNetworkOnline();
      setIsOnline(online);
      setSimulatedOffline(offlineLessonManager.isSimulatingOffline());
      if (online) {
        handleAutoSync();
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    refreshPendingSync();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [user.id]);

  const handleAutoSync = async () => {
    setIsSyncing(true);
    try {
      const result = await offlineLessonManager.syncPendingData(user.id);
      if (result.count > 0) {
        showToast(`✓ Auto-synced ${result.count} offline response(s) with Samskara Bharat servers!`);
      }
      await refreshPendingSync();
    } catch (e) {
      console.warn('Sync notice:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleToggleSimulatedOffline = () => {
    const nextVal = !simulatedOffline;
    setSimulatedOffline(nextVal);
    offlineLessonManager.setSimulatedOffline(nextVal);
    const effectiveOnline = !nextVal && navigator.onLine;
    setIsOnline(effectiveOnline);
    if (!nextVal) {
      showToast('Switched to Online Mode. Attempting cloud sync...');
      handleAutoSync();
    } else {
      showToast('Offline Mode Active. All answers and classroom votes will save to local device storage.');
    }
  };

  // lesson is dynamically bound from activeChapterItem above
  const currentAvatar = availableAvatars.find((a) => a.id === user.avatarId) || availableAvatars[0];

  // Sync progress & check badge unlock
  useEffect(() => {
    localStorage.setItem(`sb_progress_${user.id}`, JSON.stringify(progress));

    setBadges((prevBadges) =>
      prevBadges.map((badge) => {
        let isUnlocked = badge.unlocked;
        if (badge.id === 'badge-story-listener' && progress.completedVideos.includes(lesson.id)) {
          isUnlocked = true;
        }
        if (badge.id === 'badge-contemplative-mind' && progress.completedPassages.includes(lesson.id)) {
          isUnlocked = true;
        }
        if (badge.id === 'badge-honest-pen' && progress.completedQuestions.includes(lesson.id)) {
          isUnlocked = true;
        }
        if (badge.id === 'badge-vinaya-master' && progress.completedLessons.includes(lesson.id)) {
          isUnlocked = true;
        }
        if (badge.id === 'badge-guna-collector' && progress.completedLessons.includes(lesson.id)) {
          isUnlocked = true;
        }
        return {
          ...badge,
          unlocked: isUnlocked,
          unlockedAt: isUnlocked && !badge.unlockedAt ? 'Just now' : badge.unlockedAt,
        };
      })
    );
  }, [progress, user.id, lesson.id]);

  useEffect(() => {
    localStorage.setItem(`sb_badges_${user.id}`, JSON.stringify(badges));
  }, [badges, user.id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Explicit Progress Actions (Opening a page does not automatically mark complete!)
  const handleToggleVideoCompleted = () => {
    const isCompleted = progress.completedVideos.includes(lesson.id);
    if (!isCompleted) {
      setProgress((prev) => {
        const updated = {
          ...prev,
          completedVideos: [...prev.completedVideos, lesson.id],
        };
        checkLessonCompletion(updated);
        return updated;
      });
      showToast(`🎉 "${lesson.storyTitle || lesson.title}" marked as watched!`);
    } else {
      setProgress((prev) => ({
        ...prev,
        completedVideos: prev.completedVideos.filter((id) => id !== lesson.id),
      }));
      showToast(`Unmarked video for "${lesson.storyTitle || lesson.title}".`);
    }
  };

  const handleToggleSynopsisNarration = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToast('Speech audio narration is not supported in this browser.');
      return;
    }
    if (isNarratingSynopsis) {
      window.speechSynthesis.cancel();
      setIsNarratingSynopsis(false);
      showToast('Audio narration stopped.');
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(lesson.videoSynopsis);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsNarratingSynopsis(false);
      utterance.onerror = () => setIsNarratingSynopsis(false);
      window.speechSynthesis.speak(utterance);
      setIsNarratingSynopsis(true);
      showToast('🔊 Playing story dilemma audio narration...');
    }
  };

  const handleSelectDilemmaChoice = (choice: string) => {
    setDilemmaVote(choice);
    localStorage.setItem(`sb_dilemma_choice_${lesson.id}`, choice);
    showToast('Your perspective has been recorded in your reflection journal!');
  };

  const handleMarkPassageCompleted = () => {
    if (!progress.completedPassages.includes(lesson.id)) {
      setProgress((prev) => {
        const updated = {
          ...prev,
          completedPassages: [...prev.completedPassages, lesson.id],
        };
        checkLessonCompletion(updated);
        return updated;
      });
      showToast('Reflection passage "A Difficult Choice at School" recorded as studied.');
    }
  };

  const handleSaveInteractiveQuestions = async () => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        completedQuestions: prev.completedQuestions.includes(lesson.id)
          ? prev.completedQuestions
          : [...prev.completedQuestions, lesson.id],
        savedResponses: {
          ...prev.savedResponses,
          ...interactiveAnswers,
        },
      };
      checkLessonCompletion(updated);
      return updated;
    });

    // Save to IndexedDB with sync flag
    await offlineLessonManager.saveStudentResponse(
      user.id,
      lesson.id,
      interactiveAnswers,
      interactiveSelectedOptions,
      ['completedQuestions']
    );

    await refreshPendingSync();

    if (offlineLessonManager.isNetworkOnline()) {
      showToast('Your personal reflections have been saved to Swadhyaya journal & synced with cloud!');
    } else {
      showToast('Saved to device in Offline Mode! Responses will auto-sync when internet reconnects.');
    }
  };

  const handleMarkExplanationCompleted = () => {
    if (!progress.completedExplanations.includes(lesson.id)) {
      setProgress((prev) => {
        const updated = {
          ...prev,
          completedExplanations: [...prev.completedExplanations, lesson.id],
        };
        checkLessonCompletion(updated);
        return updated;
      });
      showToast('Explanation completed! Ethical reasoning on Satya & Nyaya recorded.');
    }
  };

  const checkLessonCompletion = (currentProgress: StudentProgress) => {
    if (
      currentProgress.completedVideos.includes(lesson.id) &&
      currentProgress.completedPassages.includes(lesson.id) &&
      currentProgress.completedQuestions.includes(lesson.id) &&
      currentProgress.completedExplanations.includes(lesson.id) &&
      !currentProgress.completedLessons.includes(lesson.id)
    ) {
      currentProgress.completedLessons.push(lesson.id);
      showToast('🎉 Congratulations! You have fully mastered Class 6 — Satyavrata: The Dilemma of Truth!');
    }
  };

  const navItems: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'classes', label: 'Classes', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'videos', label: 'Videos', icon: <Video className="w-4 h-4" /> },
    { id: 'passages', label: 'Reflection Passages', icon: <Feather className="w-4 h-4" /> },
    { id: 'questions', label: 'Reflection Questions', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'explanation', label: 'Explanation', icon: <Compass className="w-4 h-4" /> },
    { id: 'progress', label: 'Progress Tracker', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'badges', label: 'Badges', icon: <Award className="w-4 h-4" /> },
    { id: 'avatar', label: 'My Avatar', icon: <Smile className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F0] flex flex-col text-[#17324D] selection:bg-[#FF9933]/25">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#17324D] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-[#FF9933]/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom duration-200 max-w-md">
          <Sparkles className="w-5 h-5 text-[#FF9933] shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Application Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#FF9933]/20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('all')}
              className="flex items-center focus:outline-hidden"
              aria-label="Samskara Bharat Hub"
            >
              <Logo size="sm" currentLang={user.preferredLanguage} />
            </button>
            <span className="hidden md:inline-block text-xs font-bold text-[#FF9933] bg-[#FF9933]/10 px-2.5 py-0.5 rounded-full">
              Class 6 Learning Workspace
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onReturnToHome}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-700 hover:text-[#17324D] bg-[#FFF9F0] hover:bg-[#FFEECF] border border-[#FF9933]/30 rounded-xl transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Entrance Page</span>
            </button>

            {/* Online / Offline Simulator Toggle */}
            <button
              onClick={handleToggleSimulatedOffline}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border shadow-2xs ${
                isOnline
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
              }`}
              title={isOnline ? 'Network Online. Click to simulate Offline Mode' : 'Simulating Offline Mode. Click to switch Online'}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                  <span>Offline Mode</span>
                </>
              )}
            </button>

            {/* Student Avatar Capsule */}
            <button
              onClick={() => setActiveTab('avatar')}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#FFF9F0] border border-[#22A06B]/30 rounded-2xl hover:border-[#22A06B] transition-all cursor-pointer"
            >
              <span className="text-xl">{currentAvatar.emoji}</span>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-[#17324D] leading-none">{user.name}</span>
                <span className="text-[10px] text-gray-500 font-semibold mt-0.5">Class 6</span>
              </div>
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl"
              aria-label="Toggle Menu"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Recommended Journey Progress Bar */}
        <div className="bg-[#FFF9F0] border-t border-[#FF9933]/15 py-2 px-4 sm:px-8 overflow-x-auto text-[11px] font-semibold text-gray-600 flex items-center gap-2 whitespace-nowrap">
          <span className="text-xs font-bold text-[#FF9933] uppercase tracking-wider flex items-center gap-1 shrink-0">
            <Compass className="w-3.5 h-3.5" />
            <span>Recommended Sequence:</span>
          </span>
          <span className="text-gray-400">Class 6</span>
          <span className="text-gray-300">→</span>
          <span className="text-gray-400">Satyavrata Story</span>
          <span className="text-gray-300">→</span>
          <span className="text-gray-400">Choose Mode</span>
          <span className="text-gray-300">→</span>
          <span className="text-gray-400">Modern Passage</span>
          <span className="text-gray-300">→</span>
          <span className="text-gray-400">4 Questions</span>
          <span className="text-gray-300">→</span>
          <span className="text-gray-400">Explanation</span>
          <span className="text-gray-300">→</span>
          <span className="text-gray-400">Progress Update</span>
          <span className="ml-auto text-[10px] text-[#22A06B] font-bold shrink-0">
            (Independent access enabled across all sections)
          </span>
        </div>
      </header>

      {/* Main Learning Hub Layout */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 grow flex flex-col lg:flex-row gap-6">
        
        {/* Mobile Navigation Backdrop */}
        {mobileNavOpen && (
          <div 
            onClick={() => setMobileNavOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
            aria-hidden="true"
          />
        )}

        {/* Navigation Sidebar (Always accessible on left in desktop, collapsible drawer on mobile) */}
        <aside className={`lg:w-64 shrink-0 ${
          mobileNavOpen 
            ? 'fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl p-4 overflow-y-auto block lg:static lg:inset-auto lg:w-64 lg:p-0 lg:bg-transparent lg:shadow-none lg:overflow-visible' 
            : 'hidden lg:block'
        }`}>
          <div className="bg-white rounded-3xl p-3 border border-[#FF9933]/20 shadow-xs lg:sticky lg:top-28 space-y-1">
            <div className="flex items-center justify-between px-3 py-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                Student Navigation
              </span>
              {mobileNavOpen && (
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="lg:hidden p-1 text-gray-400 hover:text-gray-700 rounded-lg"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FF9933] text-white shadow-xs'
                      : 'text-gray-700 hover:bg-[#FFF9F0] hover:text-[#FF9933]'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-gray-500'}>{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}

            {/* Mode Switcher */}
            <div className="mt-4 pt-3 border-t border-gray-100 px-3 py-2">
              <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">
                Learning Mode:
              </span>
              <div className="grid grid-cols-2 gap-1 p-1 bg-[#FFF9F0] rounded-xl border border-[#FF9933]/20">
                <button
                  onClick={() => setLearningMode('individual')}
                  className={`py-1 text-[10px] font-bold rounded-lg transition-colors cursor-pointer ${
                    learningMode === 'individual'
                      ? 'bg-[#FF9933] text-white shadow-2xs'
                      : 'text-gray-600 hover:text-[#17324D]'
                  }`}
                >
                  Interactive
                </button>
                <button
                  onClick={() => setLearningMode('collective')}
                  className={`py-1 text-[10px] font-bold rounded-lg transition-colors cursor-pointer ${
                    learningMode === 'collective'
                      ? 'bg-[#22A06B] text-white shadow-2xs'
                      : 'text-gray-600 hover:text-[#17324D]'
                  }`}
                >
                  Collective
                </button>
              </div>
            </div>

            {/* Chapter: Truth Active Lesson Switcher */}
            <div className="mt-3 pt-3 border-t border-gray-100 px-3 py-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                Class 6 · Chapter: Truth
              </span>
              <div className="space-y-1">
                {class6ChapterTruth.lessons.map((item) => {
                  const isSelected = selectedLessonId === item.id;
                  const isDone = progress.completedLessons.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectLesson(item.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FF9933] text-white shadow-xs'
                          : 'text-gray-700 hover:bg-[#FFF9F0] hover:text-[#FF9933]'
                      }`}
                    >
                      <span className="truncate">{item.badge}</span>
                      {isDone && <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-[#22A06B]'}`} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Content Views */}
        <main className="grow min-w-0">
          
          {/* ========================================================
              1. ALL: MAIN LEARNING HUB OVERVIEW
             ======================================================== */}
          {activeTab === 'all' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Active Lesson Hero Card */}
              <div className="bg-gradient-to-r from-[#FF9933]/20 via-white to-[#22A06B]/20 p-6 sm:p-8 rounded-3xl border border-[#FF9933]/30 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF9933] uppercase">
                    <Sparkles className="w-4 h-4" />
                    <span>Class 6 · Chapter: Truth (सत्य)</span>
                  </div>

                  {/* Clean Lesson Switcher Pill on Hero Card */}
                  <div className="flex items-center gap-1.5 p-1 bg-white/80 backdrop-blur-xs rounded-2xl border border-[#FF9933]/30 shadow-2xs">
                    {class6ChapterTruth.lessons.map((item) => {
                      const isSelected = selectedLessonId === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectLesson(item.id)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#FF9933] text-white shadow-2xs'
                              : 'text-gray-700 hover:text-[#FF9933] hover:bg-[#FFF9F0]'
                          }`}
                        >
                          {item.badge}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17324D] font-heading">
                  {lesson.title}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-2xl leading-relaxed">
                  {lesson.videoSynopsis}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('videos')}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-[#FF9933] hover:bg-[#e68524] rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Watch Story Video</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('passages')}
                    className="px-4 py-2.5 text-xs font-bold text-[#17324D] bg-white hover:bg-[#FFF9F0] border border-gray-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Feather className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Read Modern Reflection Passage</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('questions')}
                    className="px-4 py-2.5 text-xs font-bold text-[#22A06B] bg-white hover:bg-[#22A06B]/10 border border-[#22A06B]/30 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-[#22A06B]" />
                    <span>Answer 4 Questions</span>
                  </button>
                </div>
              </div>

              {/* Both Chapter Truth Lessons displayed side-by-side */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-base font-bold text-[#17324D] font-heading flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#FF9933]" />
                    <span>Chapter: Truth — Available Lessons</span>
                  </h3>
                  <span className="text-xs text-gray-500 font-semibold hidden sm:inline">
                    Click any lesson card to select &amp; study
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {class6ChapterTruth.lessons.map((item) => {
                    const isSelected = selectedLessonId === item.id;
                    const isCompleted = progress.completedLessons.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectLesson(item.id)}
                        className={`p-5 rounded-3xl bg-white border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#FF9933] ring-2 ring-[#FF9933]/25 shadow-md bg-gradient-to-br from-white to-[#FF9933]/5'
                            : 'border-gray-200 hover:border-[#FF9933]/40 shadow-2xs'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[11px] font-extrabold text-[#FF9933] bg-[#FF9933]/15 px-2.5 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                            {isSelected ? (
                              <span className="text-[11px] font-bold text-[#22A06B] bg-[#22A06B]/15 px-2.5 py-0.5 rounded-full">
                                Currently Selected ✓
                              </span>
                            ) : (
                              <span className="text-[11px] font-semibold text-gray-400 hover:text-[#17324D]">
                                Click to Study
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-bold text-[#17324D] font-heading">
                            {item.lesson.title}
                          </h4>
                          <p className="text-xs text-[#22A06B] font-semibold mt-0.5">
                            {item.storyTitle}
                          </p>
                          <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                            {item.lesson.videoSynopsis}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                          <span className="text-gray-500">{item.source} · {item.lesson.durationMinutes} mins</span>
                          <span className="font-bold text-[#FF9933] flex items-center gap-1">
                            {isSelected ? 'Open Lesson' : 'Select'}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dedicated Download Card for Class 6 Lesson */}
              <LessonDownloadCard
                lesson={lesson}
                explanationParts={currentExplanationParts}
                variant="card"
              />

              {/* Hub Shortcuts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div 
                  onClick={() => setActiveTab('videos')}
                  className="p-5 rounded-3xl bg-white border border-gray-200 hover:border-[#FF9933] shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#FF9933]/15 text-[#FF9933] flex items-center justify-center mb-3">
                    <Video className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#17324D] font-heading group-hover:text-[#FF9933]">
                    1. Story Video
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Watch Satyavrata &amp; the hunter without revealing the intended conclusion early.
                  </p>
                  <span className="text-[11px] font-bold text-[#FF9933] mt-2 inline-flex items-center gap-1">
                    <span>Watch Story</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

                <div 
                  onClick={() => setActiveTab('passages')}
                  className="p-5 rounded-3xl bg-white border border-gray-200 hover:border-[#38BDF8] shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#38BDF8]/15 text-[#38BDF8] flex items-center justify-center mb-3">
                    <Feather className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#17324D] font-heading group-hover:text-[#38BDF8]">
                    2. Modern Passage
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Read &ldquo;A Difficult Choice at School&rdquo; with optional voice narration.
                  </p>
                  <span className="text-[11px] font-bold text-[#38BDF8] mt-2 inline-flex items-center gap-1">
                    <span>Read &amp; Listen</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

                <div 
                  onClick={() => setActiveTab('questions')}
                  className="p-5 rounded-3xl bg-white border border-gray-200 hover:border-[#22A06B] shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#22A06B]/15 text-[#22A06B] flex items-center justify-center mb-3">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#17324D] font-heading group-hover:text-[#22A06B]">
                    3. Four Reflection Questions
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Explore likely vs ethical behaviour in Interactive Mode or Collective Mode.
                  </p>
                  <span className="text-[11px] font-bold text-[#22A06B] mt-2 inline-flex items-center gap-1">
                    <span>Deliberate &amp; Respond</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

                <div 
                  onClick={() => setActiveTab('explanation')}
                  className="p-5 rounded-3xl bg-white border border-gray-200 hover:border-[#FF9933] shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#FF9933]/15 text-[#FF9933] flex items-center justify-center mb-3">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#17324D] font-heading group-hover:text-[#FF9933]">
                    4. Guided Explanation
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Four-part ethical synthesis with optional character narration by Ananya.
                  </p>
                  <span className="text-[11px] font-bold text-[#FF9933] mt-2 inline-flex items-center gap-1">
                    <span>Read Synthesis</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

                <div 
                  onClick={() => setActiveTab('progress')}
                  className="p-5 rounded-3xl bg-white border border-gray-200 hover:border-[#17324D] shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#17324D]/10 text-[#17324D] flex items-center justify-center mb-3">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#17324D] font-heading">
                    5. Progress Tracker
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    View separate completion status for video, passage, questions, and explanation.
                  </p>
                  <span className="text-[11px] font-bold text-[#17324D] mt-2 inline-flex items-center gap-1">
                    <span>View Status</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

                <div 
                  onClick={() => setActiveTab('avatar')}
                  className="p-5 rounded-3xl bg-white border border-gray-200 hover:border-[#22A06B] shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#22A06B]/10 text-2xl flex items-center justify-center mb-3">
                    {currentAvatar.emoji}
                  </div>
                  <h3 className="text-base font-bold text-[#17324D] font-heading">
                    My Avatar &amp; Profile
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Current: {currentAvatar.name.split(' ')[0]} ({user.name})
                  </p>
                  <span className="text-[11px] font-bold text-[#22A06B] mt-2 inline-flex items-center gap-1">
                    <span>Manage Avatar</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

              </div>

              {/* Dedicated Downloaded Lessons Section (Offline Learning Hub) */}
              <DownloadedLessonsSection
                onNavigateToTab={(tab) => setActiveTab(tab)}
                onStartClass6Download={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          )}

          {/* ========================================================
              2. CLASSES: CLASS 6 — CHAPTER: TRUTH (PANCHATANTRA & SATYAVRATA)
             ======================================================== */}
          {activeTab === 'classes' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    <span>Classes</span>
                    <span>/</span>
                    <span className="text-[#FF9933]">Class 6th</span>
                    <span>/</span>
                    <span className="text-[#22A06B]">Chapter 01</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17324D] font-heading flex items-center gap-2">
                    <GraduationCap className="w-7 h-7 text-[#FF9933]" />
                    <span>Class 6 — Chapter: Truth (सत्य)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Guna: Satyavākyaḥ (Truthfulness &amp; Integrity) · 2 Structured Dilemma Lessons
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#22A06B] bg-[#22A06B]/10 px-3 py-1.5 rounded-full">
                    2 Chapter Lessons
                  </span>
                </div>
              </div>

              {/* Chapter Description Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FFF9F0] via-white to-[#22A06B]/10 border border-[#FF9933]/30 shadow-xs">
                <span className="text-xs font-bold text-[#FF9933] uppercase tracking-wider block mb-1">
                  Chapter Foundation
                </span>
                <h3 className="text-lg font-bold text-[#17324D] font-heading">
                  {class6ChapterTruth.sanskritName}
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 mt-1 leading-relaxed">
                  {class6ChapterTruth.description}
                </p>
              </div>

              {/* Both Lessons Display Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {class6ChapterTruth.lessons.map((item) => {
                  const isSelected = selectedLessonId === item.id;
                  const itemLesson = item.lesson;
                  const itemExplanation = item.explanationParts;
                  const isCompleted = progress.completedLessons.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`p-6 rounded-3xl bg-white border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#FF9933] ring-2 ring-[#FF9933]/25 shadow-md'
                          : 'border-gray-200 hover:border-[#FF9933]/50 shadow-2xs'
                      }`}
                    >
                      <div className="space-y-4">
                        {/* Badges row */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-[#FF9933] bg-[#FF9933]/15 px-3 py-1 rounded-full">
                              Lesson {item.order}
                            </span>
                            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                              {item.source}
                            </span>
                          </div>

                          {isCompleted ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#22A06B] bg-[#22A06B]/15 px-3 py-1 rounded-full">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Mastered</span>
                            </span>
                          ) : isSelected ? (
                            <span className="text-xs font-bold text-[#FF9933] bg-[#FF9933]/10 px-3 py-1 rounded-full">
                              Active Lesson
                            </span>
                          ) : (
                            <button
                              onClick={() => handleSelectLesson(item.id)}
                              className="text-xs font-bold text-gray-500 hover:text-[#17324D] hover:underline cursor-pointer"
                            >
                              Make Active
                            </button>
                          )}
                        </div>

                        {/* Title & Synopsis */}
                        <div>
                          <h3 className="text-lg font-bold text-[#17324D] font-heading">
                            {itemLesson.title}
                          </h3>
                          <p className="text-xs text-[#22A06B] font-semibold mt-0.5">
                            {itemLesson.storyTitle}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans mt-2 line-clamp-3">
                            {itemLesson.videoSynopsis}
                          </p>
                        </div>

                        {/* 4 Activity Status Badges */}
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold pt-2">
                          <div className={`p-2 rounded-xl border text-center ${progress.completedVideos.includes(item.id) ? 'bg-green-50 text-green-800 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
                            {progress.completedVideos.includes(item.id) ? '✓ Video Watched' : '○ Video Pending'}
                          </div>
                          <div className={`p-2 rounded-xl border text-center ${progress.completedPassages.includes(item.id) ? 'bg-green-50 text-green-800 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
                            {progress.completedPassages.includes(item.id) ? '✓ Passage Studied' : '○ Passage Pending'}
                          </div>
                          <div className={`p-2 rounded-xl border text-center ${progress.completedQuestions.includes(item.id) ? 'bg-green-50 text-green-800 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
                            {progress.completedQuestions.includes(item.id) ? '✓ Questions Done' : '○ Questions Pending'}
                          </div>
                          <div className={`p-2 rounded-xl border text-center ${progress.completedExplanations.includes(item.id) ? 'bg-green-50 text-green-800 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
                            {progress.completedExplanations.includes(item.id) ? '✓ Explanation Done' : '○ Explanation Pending'}
                          </div>
                        </div>

                        {/* Download Offline Manager */}
                        <div className="pt-2">
                          <LessonDownloadCard
                            lesson={itemLesson}
                            explanationParts={itemExplanation}
                            variant="card"
                          />
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => {
                            handleSelectLesson(item.id);
                            setActiveTab('videos');
                          }}
                          className="px-3.5 py-2 text-xs font-bold text-white bg-[#FF9933] hover:bg-[#e68524] rounded-xl flex items-center gap-1.5 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Watch Video</span>
                        </button>
                        <button
                          onClick={() => {
                            handleSelectLesson(item.id);
                            setActiveTab('passages');
                          }}
                          className="px-3.5 py-2 text-xs font-bold text-[#17324D] bg-[#FFF9F0] border border-[#FF9933]/30 hover:bg-[#ffeecf] rounded-xl cursor-pointer"
                        >
                          Passage
                        </button>
                        <button
                          onClick={() => {
                            handleSelectLesson(item.id);
                            setActiveTab('questions');
                          }}
                          className="px-3.5 py-2 text-xs font-bold text-[#22A06B] bg-[#22A06B]/10 hover:bg-[#22A06B]/20 rounded-xl cursor-pointer"
                        >
                          Questions
                        </button>
                        <button
                          onClick={() => {
                            handleSelectLesson(item.id);
                            setActiveTab('explanation');
                          }}
                          className="px-3.5 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer"
                        >
                          Explanation
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================
              3. VIDEOS: CLASS 6 SATYAVRATA STORY VIDEO PLAYER
             ======================================================== */}
          {activeTab === 'videos' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Clean Single Header matching Image 2 */}
              <div className="flex items-start gap-2.5">
                <Video className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF9933] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17324D] font-heading tracking-tight">
                    {lesson.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 font-sans">
                    Story: {lesson.storyTitle} · {lesson.sourceEpic}
                  </p>
                </div>
              </div>

              {/* Prominent Video Player Container with Fullscreen API, Auto-Hiding Controls & Skip Buttons */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#FF9933]/30 shadow-md">
                
                <div 
                  ref={videoContainerRef}
                  onMouseMove={resetControlsTimeout}
                  onTouchStart={resetControlsTimeout}
                  onPointerDown={resetControlsTimeout}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    showQuickFeedback('🔒 Protected Video Stream');
                  }}
                  onClick={() => resetControlsTimeout()}
                  onDoubleClick={handleTogglePlay}
                  className={`transition-all duration-300 relative select-none ${
                    isFullscreen 
                      ? `fixed inset-0 z-50 rounded-none w-screen h-screen flex flex-col justify-between p-6 sm:p-10 bg-black text-white shadow-2xl ${
                          !areControlsVisible && isPlaying ? 'cursor-none' : 'cursor-default'
                        }` 
                      : `relative aspect-16/9 bg-[#17324D] rounded-3xl overflow-hidden shadow-inner flex flex-col justify-between p-4 sm:p-6 text-white ${
                          !areControlsVisible && isPlaying ? 'cursor-none' : 'cursor-default'
                        }`
                  }`}
                >
                  {/* Real HTML5 Video element with aggressive preloading for stutter-free playback */}
                  {customVideoUrl ? (
                    <video
                      ref={htmlVideoRef}
                      src={customVideoUrl}
                      playsInline
                      preload="auto"
                      controlsList="nodownload nofullscreen noplaybackrate"
                      disablePictureInPicture
                      disableRemotePlayback
                      onContextMenu={(e) => e.preventDefault()}
                      muted={isMuted}
                      onPlay={() => {
                        setIsPlaying(true);
                        setIsBuffering(false);
                        resetControlsTimeout();
                      }}
                      onPause={() => {
                        setIsPlaying(false);
                        setAreControlsVisible(true);
                      }}
                      onWaiting={() => {
                        if (isPlaying) {
                          setIsBuffering(true);
                        }
                      }}
                      onPlaying={() => setIsBuffering(false)}
                      onCanPlay={() => setIsBuffering(false)}
                      onCanPlayThrough={() => setIsBuffering(false)}
                      onSeeked={() => setIsBuffering(false)}
                      onSeeking={() => setIsBuffering(false)}
                      onTimeUpdate={handleHtmlVideoTimeUpdate}
                      onLoadedMetadata={handleHtmlVideoLoadedMetadata}
                      onEnded={handleHtmlVideoEnded}
                      onError={() => {
                        const localFallback = lesson.id === satyavrataLesson.id 
                          ? '/assets/videos/satyavrata_truth.mp4' 
                          : '/assets/videos/panchatantra_truth.mp4';
                        if (customVideoUrl !== localFallback) {
                          setCustomVideoUrl(localFallback);
                          showToast('Switched to local video fallback.');
                        } else {
                          setVideoError('Video playback ready. Click play to begin.');
                        }
                        setIsPlaying(false);
                        setIsBuffering(false);
                      }}
                      className="absolute inset-0 w-full h-full object-contain bg-black z-0 pointer-events-none select-none"
                    />
                  ) : null}

                  {/* Security Shield Overlay: Intercepts right-clicks and inspect-element attempts directly over video */}
                  <div 
                    onContextMenu={(e) => {
                      e.preventDefault();
                      showQuickFeedback('🔒 Protected Content © Samskara Bharat');
                    }}
                    onDragStart={(e) => e.preventDefault()}
                    onClick={handleTogglePlay}
                    className="absolute inset-0 z-10 pointer-events-auto bg-transparent select-none cursor-pointer"
                    aria-hidden="true"
                    title="Protected Educational Video"
                  />

                  {/* Anti-Piracy Watermark Overlay */}
                  <div className="absolute top-14 right-4 z-20 pointer-events-none opacity-45 select-none text-[10px] text-white/90 font-mono tracking-wider bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-xs hidden sm:flex items-center gap-1.5 border border-white/10">
                    <ShieldCheck className="w-3 h-3 text-[#22A06B]" />
                    <span>Protected Stream · {user.name}</span>
                  </div>

                  {/* Loading / Buffering Spinner */}
                  {isBuffering && isPlaying && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 bg-black/40 backdrop-blur-2xs">
                      <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-[#FF9933] animate-spin shadow-2xl" />
                      <span className="mt-2.5 text-[11px] font-semibold text-white/90 bg-black/70 px-3 py-1 rounded-full backdrop-blur-xs">
                        Buffering video stream...
                      </span>
                    </div>
                  )}

                  {/* Subtle Cinematic Vignette - Fades out when controls are auto-hidden during playback */}
                  <div className={`absolute inset-0 bg-radial from-transparent via-black/20 to-black/80 pointer-events-none z-10 transition-opacity duration-300 ${
                    areControlsVisible || !isPlaying ? 'opacity-85' : 'opacity-0'
                  }`} />

                  {/* Header overlay - smoothly hides when controls are inactive */}
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className={`relative z-20 flex items-center justify-between transition-opacity duration-300 ${
                      areControlsVisible || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold bg-[#FF9933] text-white px-3.5 py-1 rounded-full shadow-xs">
                        {lesson.gunaName}
                      </span>
                      <span className="hidden sm:inline-block text-xs font-semibold text-gray-200 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-white/10">
                        {lesson.sourceEpic} · Class 6
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-200 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/10 font-mono">
                        {formatVideoTime(currentVideoSec)} / {formatVideoTime(totalDurationSec)}
                      </span>

                      {/* Top Fullscreen Exit / Toggle Button */}
                      <button
                        onClick={toggleFullscreen}
                        className="p-2 rounded-xl bg-black/50 hover:bg-black/70 backdrop-blur-xs text-white border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                        title={isFullscreen ? 'Exit Fullscreen (Escape)' : 'Enter Fullscreen (F)'}
                        aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                      >
                        {isFullscreen ? (
                          <>
                            <Minimize className="w-4 h-4 text-[#FFD166]" />
                            <span className="hidden sm:inline">Exit Fullscreen</span>
                          </>
                        ) : (
                          <>
                            <Maximize className="w-4 h-4" />
                            <span className="hidden sm:inline">Fullscreen</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Quick on-screen feedback badge (+10s, -10s, Speed) */}
                  {quickFeedback && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-in fade-in zoom-in-75 duration-150">
                      <div className="bg-black/85 backdrop-blur-md text-[#FFD166] text-sm sm:text-base font-bold px-4 py-2 rounded-full shadow-2xl border border-white/20 flex items-center gap-2">
                        <span>{quickFeedback}</span>
                      </div>
                    </div>
                  )}

                  {/* Center Play Button ONLY when PAUSED (never blocking video while playing) */}
                  {!isPlaying && (
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePlay();
                      }}
                      className="relative z-20 flex flex-col items-center justify-center text-center space-y-2.5 my-auto transition-all duration-300 animate-in fade-in"
                    >
                      <button
                        type="button"
                        className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#FF9933] hover:bg-[#e68524] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-105 cursor-pointer ring-4 ring-white/30"
                        aria-label="Play Story"
                      >
                        <Play className="w-9 h-9 fill-white ml-1" />
                      </button>
                      <p className="text-xs sm:text-sm font-bold text-white/95 bg-black/60 backdrop-blur-xs px-3.5 py-1.5 rounded-full drop-shadow-md">
                        {lesson.storyTitle}
                      </p>
                      {lesson.id === satyavrataLesson.id ? (
                        <span className="text-[11px] font-semibold text-[#FFD166] bg-black/50 px-3 py-1 rounded-full border border-[#FFD166]/30">
                          🎥 Satyavrata Mahabharata Video Story (9 Mins · Supabase Ready)
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-[#38BDF8] bg-black/50 px-3 py-1 rounded-full border border-[#38BDF8]/30">
                          🎥 Panchatantra Video Story (Dharma Buddhi & Papa Buddhi · 2 Mins · Ready)
                        </span>
                      )}
                    </div>
                  )}

                  {videoError && (
                    <div 
                      onClick={(e) => e.stopPropagation()}
                      className="relative z-20 bg-red-500/90 text-white text-xs px-4 py-2 rounded-xl flex items-center gap-2 max-w-md mx-auto border border-red-400 my-auto"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{videoError}</span>
                    </div>
                  )}

                  {/* Bottom Controls Bar with Backward, Play, Forward, Scrub, Mute, Speed & Fullscreen */}
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className={`relative z-20 space-y-2.5 bg-black/75 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/15 transition-all duration-300 ${
                      areControlsVisible || !isPlaying 
                        ? 'opacity-100 translate-y-0 pointer-events-auto' 
                        : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                  >
                    {/* Interactive Scrub Bar */}
                    <div 
                      onClick={handleVideoScrub}
                      className="w-full bg-white/25 hover:bg-white/35 h-2.5 rounded-full overflow-hidden cursor-pointer transition-colors relative group"
                      title="Click to jump to point in narrative"
                    >
                      <div 
                        className="bg-gradient-to-r from-[#FF9933] to-[#FFD166] h-full transition-all duration-150 relative" 
                        style={{ width: `${videoProgress}%` }} 
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-300 gap-2">
                      <div className="flex items-center gap-1 sm:gap-2">
                        {/* 10s Backward */}
                        <button
                          onClick={handleSkipBackward}
                          className="p-1.5 hover:text-[#FFD166] text-white transition-colors cursor-pointer flex items-center gap-0.5 rounded-lg hover:bg-white/10"
                          title="Rewind 10 seconds (Left Arrow or J)"
                          aria-label="Rewind 10 seconds"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span className="text-[10px] font-bold font-mono">10</span>
                        </button>

                        {/* Play / Pause */}
                        <button
                          onClick={handleTogglePlay}
                          className="p-1.5 text-white hover:text-[#FFD166] transition-colors cursor-pointer rounded-lg hover:bg-white/10"
                          title={isPlaying ? 'Pause (Space or K)' : 'Play (Space or K)'}
                          aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? <Pause className="w-5 h-5 text-[#FFD166]" /> : <Play className="w-5 h-5 fill-white" />}
                        </button>

                        {/* 10s Forward */}
                        <button
                          onClick={handleSkipForward}
                          className="p-1.5 hover:text-[#FFD166] text-white transition-colors cursor-pointer flex items-center gap-0.5 rounded-lg hover:bg-white/10"
                          title="Forward 10 seconds (Right Arrow or L)"
                          aria-label="Forward 10 seconds"
                        >
                          <span className="text-[10px] font-bold font-mono">10</span>
                          <RotateCw className="w-4 h-4" />
                        </button>

                        {/* Restart */}
                        <button
                          onClick={handleRestartVideo}
                          className="p-1.5 hover:text-[#FFD166] text-white transition-colors cursor-pointer rounded-lg hover:bg-white/10 hidden sm:inline-flex"
                          title="Restart Video from Beginning"
                          aria-label="Restart Video"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>

                        {/* Volume / Mute */}
                        <button
                          onClick={handleToggleMute}
                          className="p-1.5 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/10"
                          title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                          aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-gray-200" />}
                        </button>

                        {/* Time Display */}
                        <span className="font-mono text-[11px] text-gray-200 pl-1">
                          {formatVideoTime(currentVideoSec)} / {formatVideoTime(totalDurationSec)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {/* Playback Speed Button */}
                        <button
                          onClick={handleCyclePlaybackRate}
                          className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[#FFD166] font-bold font-mono text-[11px] transition-colors cursor-pointer"
                          title="Playback Speed (Click to cycle: 1x, 1.25x, 1.5x, 2x, 0.75x)"
                        >
                          {playbackRate}x
                        </button>

                        {/* Fullscreen Button */}
                        <button
                          onClick={toggleFullscreen}
                          className="p-1.5 hover:text-[#FFD166] text-white transition-colors cursor-pointer flex items-center gap-1 rounded-lg hover:bg-white/10"
                          title={isFullscreen ? 'Exit Fullscreen (F)' : 'Full Screen (F)'}
                          aria-label={isFullscreen ? 'Exit Fullscreen' : 'Full Screen'}
                        >
                          {isFullscreen ? (
                            <>
                              <Minimize className="w-4 h-4" />
                              <span className="text-[11px] font-bold hidden sm:inline">Exit</span>
                            </>
                          ) : (
                            <>
                              <Maximize className="w-4 h-4" />
                              <span className="text-[11px] font-bold hidden sm:inline">Full Screen</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explicit Completion Button & Ethical Dilemma Notice */}
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                  <div>
                    <h3 className="text-lg font-bold text-[#17324D] font-heading">
                      The Ethical Dilemma: {lesson.storyTitle}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      The narrative pauses at the crossroads: examine the choices before discovering the resolution.
                    </p>
                  </div>

                  <button
                    onClick={handleToggleVideoCompleted}
                    className={`px-5 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98 ${
                      progress.completedVideos.includes(lesson.id)
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-400/40'
                        : 'bg-[#22A06B] hover:bg-[#1b8256] text-white'
                    }`}
                    title={
                      progress.completedVideos.includes(lesson.id)
                        ? 'Click to reset or mark uncompleted'
                        : 'Click to mark video as watched'
                    }
                  >
                    <CheckCircle2 className={`w-4 h-4 ${progress.completedVideos.includes(lesson.id) ? 'text-white' : 'text-emerald-100'}`} />
                    <span>
                      {progress.completedVideos.includes(lesson.id)
                        ? 'Watched ✓ (Click to reset)'
                        : 'Mark Video as Watched'}
                    </span>
                  </button>
                </div>

                {/* Compact Offline Download Pill for Video section */}
                <div className="mt-4 p-4 rounded-2xl bg-white border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                  <div className="text-xs text-gray-600">
                    <span className="font-bold text-[#17324D] block">Offline Video &amp; Narration Access</span>
                    <span className="text-gray-500">Download once on Wi-Fi; watch and listen anywhere without internet.</span>
                  </div>
                  <LessonDownloadCard
                    lesson={lesson}
                    explanationParts={currentExplanationParts}
                    variant="compact"
                  />
                </div>

                {/* Discrete Video Location & Source Configurator Link */}
                <div className="mt-3 flex items-center justify-between text-xs px-1 text-gray-400">
                  <button
                    onClick={() => {
                      setNewVideoUrlInput(customVideoUrl);
                      setVideoSourceModalOpen(!videoSourceModalOpen);
                    }}
                    className="hover:text-[#FF9933] flex items-center gap-1.5 transition-colors cursor-pointer text-xs font-semibold text-[#17324D]/80"
                  >
                    <Settings className="w-3.5 h-3.5 text-[#FF9933]" />
                    <span>Video file location &amp; custom URL settings</span>
                  </button>

                  <div>
                    {customVideoUrl.startsWith('/assets/') ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <Zap className="w-3 h-3 text-emerald-600" />
                        <span>Local High-Speed Video (Zero-Lag ⚡)</span>
                      </span>
                    ) : customVideoUrl.includes('supabase.co') ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-[11px] font-semibold">
                        <span>Cloud Storage (Supabase CDN)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-semibold">
                        <span>Custom Video Stream</span>
                      </span>
                    )}
                  </div>
                </div>

                {videoSourceModalOpen && (
                  <div className="mt-3 p-5 rounded-2xl bg-[#FFF9F0] border border-[#FF9933]/30 text-xs space-y-4 animate-in fade-in duration-150 shadow-sm">
                    <div className="flex items-center justify-between font-bold text-[#17324D]">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-[#22A06B]" />
                        <span className="text-sm">Video Source &amp; Performance Manager:</span>
                      </div>
                      <button
                        onClick={() => setVideoSourceModalOpen(false)}
                        className="text-gray-400 hover:text-gray-700 p-1 rounded-lg cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* 1-Click Fast Presets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Local High Speed Card */}
                      <button
                        type="button"
                        onClick={() => {
                          const localUrl = selectedLessonId === 'class-6-panchatantra-truth'
                            ? '/assets/videos/panchatantra_truth.mp4'
                            : '/assets/videos/satyavrata_truth.mp4';
                          localStorage.setItem(`sb_custom_video_url_${lesson.id}`, localUrl);
                          setCustomVideoUrl(localUrl);
                          setNewVideoUrlInput(localUrl);
                          setIsBuffering(false);
                          setIsPlaying(false);
                          showToast('⚡ Switched to Local High-Speed Video! Zero lag and instant seeks enabled.');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          customVideoUrl.startsWith('/assets/')
                            ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20 shadow-xs'
                            : 'bg-white border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#17324D] flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-emerald-600" />
                            <span>Local Video Asset (Recommended)</span>
                          </span>
                          {customVideoUrl.startsWith('/assets/') && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Active</span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1">
                          Served directly from <code className="text-emerald-700 font-mono">/public/assets/videos/</code>. Zero buffering, no internet dependency.
                        </p>
                      </button>

                      {/* Cloud Stream Preset */}
                      <button
                        type="button"
                        onClick={() => {
                          const cloudUrl = selectedLessonId === 'class-6-panchatantra-truth'
                            ? 'https://sueccxsiimptiaingzjg.supabase.co/storage/v1/object/public/videos/panchatantra_truth.mp4'
                            : 'https://sueccxsiimptiaingzjg.supabase.co/storage/v1/object/public/videos/Team-Integrity-SnapYT.App.mp4';
                          localStorage.setItem(`sb_custom_video_url_${lesson.id}`, cloudUrl);
                          setCustomVideoUrl(cloudUrl);
                          setNewVideoUrlInput(cloudUrl);
                          setIsBuffering(false);
                          setIsPlaying(false);
                          showToast('Switched to Cloud Storage CDN stream.');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          customVideoUrl.includes('supabase.co')
                            ? 'bg-sky-50 border-sky-300 ring-2 ring-sky-500/20 shadow-xs'
                            : 'bg-white border-gray-200 hover:border-sky-300 hover:bg-sky-50/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#17324D] flex items-center gap-1.5">
                            <Database className="w-4 h-4 text-sky-600" />
                            <span>Cloud Storage CDN (Supabase)</span>
                          </span>
                          {customVideoUrl.includes('supabase.co') && (
                            <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">Active</span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1">
                          Original remote cloud stream hosted on Supabase Storage. Requires stable high-speed Wi-Fi.
                        </p>
                      </button>
                    </div>

                    {/* Custom URL Input Field */}
                    <div className="pt-2 border-t border-[#FF9933]/15 space-y-1.5">
                      <span className="font-semibold text-gray-700 block text-[11px]">Or specify custom stream URL / local asset path:</span>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={newVideoUrlInput}
                          onChange={(e) => setNewVideoUrlInput(e.target.value)}
                          placeholder="/assets/videos/... or https://..."
                          className="grow px-3 py-1.5 text-xs rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#FF9933] font-mono"
                        />
                        <button
                          onClick={() => {
                            const val = newVideoUrlInput.trim();
                            if (val) {
                              setCustomVideoUrl(val);
                              localStorage.setItem(`sb_custom_video_url_${lesson.id}`, val);
                              setVideoSourceModalOpen(false);
                              showToast(`Video source updated for ${lesson.title}`);
                              setIsPlaying(false);
                              setIsBuffering(false);
                              setVideoProgress(0);
                            }
                          }}
                          className="px-4 py-1.5 text-xs font-bold text-white bg-[#FF9933] hover:bg-[#e68524] rounded-xl cursor-pointer"
                        >
                          Save &amp; Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Story Ethical Dilemma Exposition & Interactive Crossroads */}
                <div className="mt-6 p-5 sm:p-6 rounded-3xl bg-[#FFF9F0] border border-[#FF9933]/25 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-[#FF9933]/20">
                    <h4 className="text-xs font-bold text-[#17324D] uppercase tracking-wider flex items-center gap-2">
                      <Info className="w-4 h-4 text-[#FF9933]" />
                      <span>Story Context &amp; The Dilemma</span>
                    </h4>

                    {/* Speech Narration Button */}
                    <button
                      onClick={handleToggleSynopsisNarration}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-[#FF9933]/40 text-[#17324D] hover:bg-[#FFEEDB] text-xs font-bold transition-all shadow-2xs cursor-pointer self-start sm:self-auto"
                      title={isNarratingSynopsis ? 'Stop Audio Narration' : 'Listen to Dilemma Narration'}
                    >
                      {isNarratingSynopsis ? (
                        <>
                          <Square className="w-3.5 h-3.5 text-red-600 fill-red-600 animate-pulse" />
                          <span className="text-red-700">Stop Audio</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-[#FF9933]" />
                          <span>Listen to Dilemma (Audio)</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                    {lesson.videoSynopsis}
                  </p>

                  {/* Interactive Crossroads Choices */}
                  <div className="pt-3 border-t border-[#FF9933]/15 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#17324D] flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-[#FF9933]" />
                        <span>The Crossroads: What would you advise before watching the resolution?</span>
                      </span>
                      {dilemmaVote && (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Choice Recorded ✓
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      {/* Choice A */}
                      <button
                        type="button"
                        onClick={() => handleSelectDilemmaChoice('choice_a')}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          dilemmaVote === 'choice_a'
                            ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs'
                            : 'bg-white border-gray-200 hover:border-[#22A06B]/50 hover:bg-emerald-50/30'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-[#17324D]">
                          <span>Option A: Vivek &amp; Calm Investigation</span>
                          {dilemmaVote === 'choice_a' && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          )}
                        </div>
                        <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                          {selectedLessonId === 'class-6-panchatantra-truth'
                            ? 'Examine physical evidence and test the hollow tree with smoke instead of accepting confident accusations blindly.'
                            : 'Protect the innocent creature’s life with compassionate silence or intelligent discernment rather than causing cruel slaughter.'}
                        </p>
                      </button>

                      {/* Choice B */}
                      <button
                        type="button"
                        onClick={() => handleSelectDilemmaChoice('choice_b')}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          dilemmaVote === 'choice_b'
                            ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-500/20 shadow-xs'
                            : 'bg-white border-gray-200 hover:border-[#FF9933]/50 hover:bg-amber-50/30'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-[#17324D]">
                          <span>Option B: Immediate Group Reaction</span>
                          {dilemmaVote === 'choice_b' && (
                            <CheckCircle2 className="w-4 h-4 text-amber-600" />
                          )}
                        </div>
                        <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                          {selectedLessonId === 'class-6-panchatantra-truth'
                            ? 'Trust the aggressive confidence and apparent witness without demanding physical verification.'
                            : 'Speak literal truth regardless of the cruel outcome, letting the hunter kill the terrified deer.'}
                        </p>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-[#17324D] pt-2 border-t border-[#FF9933]/15">
                    Notice: The full resolution is explored through our reflection inquiry. Move to the modern reflection passage to examine how this dilemma plays out in 21st-century school life.
                  </p>
                </div>

                {/* Navigation forward to next step */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                        setIsNarratingSynopsis(false);
                      }
                      setActiveTab('passages');
                    }}
                    className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#38BDF8] to-[#0284c7] hover:brightness-105 active:scale-98 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <span>Proceed to Modern Reflection Passage</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================
              4. REFLECTION PASSAGES: EXACT SEPARATE MODERN PASSAGE
                 WITH CHARACTER NARRATION
             ======================================================== */}
          {activeTab === 'passages' && (
            <div className="animate-in fade-in duration-200">
              <PassageExperience
                passageText={lesson.passageText}
                isCompleted={progress.completedPassages.includes(lesson.id)}
                onMarkCompleted={handleMarkPassageCompleted}
                onProceedToQuestions={() => setActiveTab('questions')}
              />
            </div>
          )}

          {/* ========================================================
              5. REFLECTION QUESTIONS: INTERACTIVE VS COLLECTIVE MODE
                 (EXACT 4 QUESTIONS)
             ======================================================== */}
          {activeTab === 'questions' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Header & Mode Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#17324D] font-heading flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-[#FF9933]" />
                    <span>Four Reflection Questions</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Explore likely human behavior (Q1 &amp; Q2) and recommended ethical action (Q3 &amp; Q4)
                  </p>
                </div>

                <div className="flex items-center gap-1.5 p-1 bg-white border border-[#FF9933]/30 rounded-2xl shadow-2xs">
                  <button
                    onClick={() => setLearningMode('individual')}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                      learningMode === 'individual'
                        ? 'bg-[#FF9933] text-white shadow-2xs'
                        : 'text-gray-600 hover:text-[#17324D]'
                    }`}
                  >
                    Interactive Mode
                  </button>
                  <button
                    onClick={() => setLearningMode('collective')}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                      learningMode === 'collective'
                        ? 'bg-[#22A06B] text-white shadow-2xs'
                        : 'text-gray-600 hover:text-[#17324D]'
                    }`}
                  >
                    Collective Mode (Classroom)
                  </button>
                </div>
              </div>

              {/* ========================================================
                  MODE A: INTERACTIVE MODE (INDIVIDUAL REFLECTION)
                 ======================================================== */}
              {learningMode === 'individual' && (
                <div className="space-y-6">
                  
                  <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-[#FF9933]/20 text-xs text-gray-700">
                    <strong>Interactive Mode (Swadhyaya):</strong> Reflect on each question independently. You can select among response options or write your personal reasoning in your private journal.
                  </div>

                  {lesson.questions.map((q) => (
                    <div
                      key={q.id}
                      className="p-6 sm:p-8 bg-white rounded-3xl border border-gray-200 shadow-xs space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#FF9933] uppercase">
                          Question {q.questionNumber} of 4 · {q.category}
                        </span>
                        <span className="text-[11px] text-gray-400">{lesson.title}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[#17324D] font-heading">
                        {q.question}
                      </h3>

                      <p className="text-xs text-gray-500 italic bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                        💡 Mentor Hint: {q.hint}
                      </p>

                      {/* Selectable Options in Interactive Mode */}
                      <div className="space-y-2 pt-1">
                        <span className="text-xs font-bold text-[#17324D] block">
                          Select an option that reflects your thoughts:
                        </span>
                        {(q.options || []).map((opt, i) => {
                          const isSelected = interactiveSelectedOptions[q.id] === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                setInteractiveSelectedOptions({
                                  ...interactiveSelectedOptions,
                                  [q.id]: opt.id,
                                });
                                setInteractiveAnswers({
                                  ...interactiveAnswers,
                                  [q.id]: `${opt.text}\n\nPersonal Note: ${interactiveAnswers[q.id] || ''}`,
                                });
                              }}
                              className={`w-full p-3 text-left rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-3 ${
                                isSelected
                                  ? 'bg-[#FFF9F0] border-[#FF9933] ring-1 ring-[#FF9933] text-[#17324D] font-semibold'
                                  : 'bg-white border-gray-200 hover:border-[#FF9933]/40 text-gray-700'
                              }`}
                            >
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 ${
                                isSelected ? 'bg-[#FF9933] text-white' : 'bg-gray-100 text-gray-500'
                              }`}>
                                {String.fromCharCode(65 + i)}
                              </span>
                              <span>{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Personal Custom Text Response */}
                      <div className="pt-2">
                        <label className="block text-xs font-bold text-[#17324D] mb-1">
                          Explain your thinking in your personal reflection journal:
                        </label>
                        <textarea
                          rows={3}
                          value={interactiveAnswers[q.id] || progress.savedResponses[q.id] || ''}
                          onChange={(e) =>
                            setInteractiveAnswers({
                              ...interactiveAnswers,
                              [q.id]: e.target.value,
                            })
                          }
                          placeholder="Why do you think people act this way, or why is this the right response?"
                          className="w-full p-3 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#FF9933] focus:ring-1 focus:ring-[#FF9933]"
                        />
                      </div>
                    </div>
                  ))}

                  {/* Save Responses Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                    <span className="text-xs text-gray-500">
                      Status: {progress.completedQuestions.includes(lesson.id) ? 'All Questions Answered ✓' : 'Responses not yet submitted'}
                    </span>
                    <button
                      onClick={handleSaveInteractiveQuestions}
                      className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#FF9933] hover:bg-[#e68524] rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Submit &amp; Save Responses to Swadhyaya Journal
                    </button>
                  </div>

                </div>
              )}

              {/* ========================================================
                  MODE B: COLLECTIVE MODE (CLASSROOM RESPONSE TALLY)
                 ======================================================== */}
              {learningMode === 'collective' && (
                <CollectiveModeQuestions
                  questions={lesson.questions}
                  initialClassSize={35}
                  userId={user.id}
                  lessonId={lesson.id}
                />
              )}

              {/* Forward link to Explanation */}
              <div className="pt-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setActiveTab('explanation')}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#22A06B] hover:bg-[#1b8256] rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Proceed to Guided Explanation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* ========================================================
              6. EXPLANATION: 4-PART ETHICAL REASONING
                 WITH OPTIONAL CHARACTER NARRATION
             ======================================================== */}
          {activeTab === 'explanation' && (
            <div className="animate-in fade-in duration-200">
              <GuidedExplanationExperience
                sections={currentExplanationParts}
                isCompleted={progress.completedExplanations.includes(lesson.id)}
                onMarkCompleted={handleMarkExplanationCompleted}
                onProceedToProgress={() => setActiveTab('progress')}
              />
            </div>
          )}

          {/* ========================================================
              7. PROGRESS TRACKER: SEPARATE STATUSES
             ======================================================== */}
          {activeTab === 'progress' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-bold text-[#17324D] font-heading flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-[#FF9933]" />
                  <span>Sadhana Progress Tracker</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Individual completion tracked separately across every activity stage
                </p>
              </div>

              {/* 4 Separate Activity Trackers */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-2xs">
                  <span className="text-xs font-semibold text-gray-500 block mb-1">Story Video</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#FF9933]">
                      {progress.completedVideos.includes(lesson.id) ? '1' : '0'}
                    </span>
                    <span className="text-xs text-gray-400">/ 1 completed</span>
                  </div>
                  <span className="text-[11px] font-bold text-gray-600 block mt-2">
                    {progress.completedVideos.includes(lesson.id) ? '✓ Watched' : 'Pending'}
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-2xs">
                  <span className="text-xs font-semibold text-gray-500 block mb-1">Reflection Passage</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#38BDF8]">
                      {progress.completedPassages.includes(lesson.id) ? '1' : '0'}
                    </span>
                    <span className="text-xs text-gray-400">/ 1 completed</span>
                  </div>
                  <span className="text-[11px] font-bold text-gray-600 block mt-2">
                    {progress.completedPassages.includes(lesson.id) ? '✓ Studied' : 'Pending'}
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-2xs">
                  <span className="text-xs font-semibold text-gray-500 block mb-1">4 Questions Answered</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#22A06B]">
                      {progress.completedQuestions.includes(lesson.id) ? '1' : '0'}
                    </span>
                    <span className="text-xs text-gray-400">/ 1 set submitted</span>
                  </div>
                  <span className="text-[11px] font-bold text-gray-600 block mt-2">
                    {progress.completedQuestions.includes(lesson.id) ? '✓ Recorded' : 'Pending'}
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-gray-200 shadow-2xs">
                  <span className="text-xs font-semibold text-gray-500 block mb-1">Explanation Reviewed</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#17324D]">
                      {progress.completedExplanations.includes(lesson.id) ? '1' : '0'}
                    </span>
                    <span className="text-xs text-gray-400">/ 1 reviewed</span>
                  </div>
                  <span className="text-[11px] font-bold text-gray-600 block mt-2">
                    {progress.completedExplanations.includes(lesson.id) ? '✓ Mastered' : 'Pending'}
                  </span>
                </div>

              </div>

              {/* Lesson Mastery Card */}
              <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#17324D] font-heading">
                      Class 6 Prototype Module Status
                    </h3>
                    <p className="text-xs text-gray-500">
                      Satyavrata: The Dilemma of Truth
                    </p>
                  </div>
                  <span className="text-xl font-black text-[#FF9933]">
                    {progress.completedLessons.includes(lesson.id) ? '100% Mastered' : 'In Progress'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-[#FF9933]/20 text-xs text-gray-700">
                  Opening a page or video alone does not mark it complete. Each step requires honest student engagement and active confirmation.
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              8. BADGES: GENUINE ACTIVITY COMPLETION
             ======================================================== */}
          {activeTab === 'badges' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-bold text-[#17324D] font-heading flex items-center gap-2">
                  <Award className="w-6 h-6 text-[#FF9933]" />
                  <span>Samskara Badges</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Earned genuinely through completed moral activities and reflection
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {badges.map((b) => (
                  <div
                    key={b.id}
                    className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                      b.unlocked
                        ? 'bg-white border-[#FF9933] shadow-md ring-2 ring-[#FF9933]/15'
                        : 'bg-gray-50/80 border-gray-200 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            b.unlocked ? 'bg-[#FF9933]/15 text-[#FF9933]' : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          <Award className="w-6 h-6" />
                        </div>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            b.unlocked ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {b.unlocked ? 'Unlocked ✓' : 'Locked'}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#17324D] font-heading">
                        {b.title}
                      </h3>
                      <span className="text-xs font-bold text-[#22A06B] font-devanagari block mt-0.5">
                        {b.sanskritTitle}
                      </span>
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                        {b.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500 flex items-center justify-between">
                      <span>Requirement:</span>
                      <span className="font-semibold text-gray-700">{b.requiredMetric}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              9. MY AVATAR: CUSTOMIZATION
             ======================================================== */}
          {activeTab === 'avatar' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-bold text-[#17324D] font-heading flex items-center gap-2">
                  <Smile className="w-6 h-6 text-[#22A06B]" />
                  <span>My Student Avatar</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Select and personalize your character identity for classroom activities
                </p>
              </div>

              <div className="p-8 bg-white rounded-3xl border border-[#22A06B]/25 shadow-xs flex flex-col sm:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-3xl bg-[#FFF9F0] border-2 border-[#22A06B] flex items-center justify-center text-5xl shadow-inner">
                  {currentAvatar.emoji}
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-xs font-bold text-[#22A06B] bg-[#22A06B]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    Equipped Avatar
                  </span>
                  <h3 className="text-xl font-bold text-[#17324D] font-heading">
                    {currentAvatar.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-md">
                    {currentAvatar.personality}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xs space-y-4">
                <h3 className="text-base font-bold text-[#17324D] font-heading">
                  Choose Another Avatar
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {availableAvatars.map((av) => (
                    <button
                      key={av.id}
                      onClick={() => {
                        const updated: StudentUser = {
                          ...user,
                          avatarId: av.id,
                        };
                        onUpdateUser(updated);
                        showToast(`Avatar updated to ${av.name.split(' ')[0]}!`);
                      }}
                      className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                        user.avatarId === av.id
                          ? 'border-[#22A06B] bg-[#22A06B]/10 shadow-xs ring-2 ring-[#22A06B]'
                          : 'border-gray-200 hover:border-[#FF9933] hover:bg-[#FFF9F0]'
                      }`}
                    >
                      <span className="text-4xl block mb-2">{av.emoji}</span>
                      <strong className="text-xs font-bold text-[#17324D] block truncate">
                        {av.name.split(' ')[0]}
                      </strong>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              10. PROFILE: STUDENT ACCOUNT & LANGUAGE PREFERENCES
             ======================================================== */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-bold text-[#17324D] font-heading flex items-center gap-2">
                  <User className="w-6 h-6 text-[#17324D]" />
                  <span>Student Profile</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Account details and language configuration
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6 max-w-2xl">
                
                <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                  <div className="w-16 h-16 rounded-2xl bg-[#FF9933]/15 text-3xl flex items-center justify-center">
                    {currentAvatar.emoji}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#17324D] font-heading">{user.name}</h3>
                    <p className="text-xs text-gray-500">{user.email} · Class 6</p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-[#22A06B] bg-[#22A06B]/10 px-2 py-0.5 rounded-md uppercase">
                      Role: Student (Public Registration)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-[#FFF9F0] rounded-xl border border-[#FF9933]/20">
                    <span className="text-gray-500 block">Username:</span>
                    <strong className="text-[#17324D] text-sm">{user.username}</strong>
                  </div>

                  <div className="p-3.5 bg-[#FFF9F0] rounded-xl border border-[#FF9933]/20">
                    <span className="text-gray-500 block">Current Class:</span>
                    <strong className="text-[#17324D] text-sm">Class 6</strong>
                  </div>

                  <div className="p-3.5 bg-[#FFF9F0] rounded-xl border border-[#FF9933]/20">
                    <span className="text-gray-500 block">School / Gurukulam:</span>
                    <strong className="text-[#17324D] text-sm">{user.school}</strong>
                  </div>

                  <div className="p-3.5 bg-[#FFF9F0] rounded-xl border border-[#FF9933]/20">
                    <span className="text-gray-500 block">Preferred Language:</span>
                    <strong className="text-[#17324D] text-sm uppercase">{user.preferredLanguage}</strong>
                  </div>
                </div>

                {/* Change Preferred Language */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-[#17324D] mb-2">
                    Update Preferred Learning Language:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['en', 'te', 'hi'] as const).map((lng) => (
                      <button
                        key={lng}
                        onClick={() => {
                          const updated = { ...user, preferredLanguage: lng };
                          onUpdateUser(updated);
                          showToast('Language preference updated!');
                        }}
                        className={`py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                          user.preferredLanguage === lng
                            ? 'bg-[#FF9933] text-white border-[#FF9933]'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-[#FFF9F0]'
                        }`}
                      >
                        {lng === 'en' ? 'English' : lng === 'te' ? 'తెలుగు' : 'हिन्दी'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-1">
                  <span className="font-bold text-[#17324D] block">Prototype Data Storage:</span>
                  <p>
                    Student responses, avatar selections, and completion statuses are saved locally for this user session. No external backend sync is required for this prototype.
                  </p>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
