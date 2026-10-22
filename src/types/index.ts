export type Language = 'en' | 'te' | 'hi';

export type UserRole = 'student' | 'teacher' | 'admin';

export interface Guna {
  id: string;
  sanskrit: string;
  nameEn: string;
  nameTe: string;
  nameHi: string;
  meaningEn: string;
  meaningTe: string;
  meaningHi: string;
  epicSource: 'Ramayana' | 'Mahabharata' | 'Panchatantra' | 'Hitopadesha';
  storyExample: string;
  grades: string;
  modernApplication: string;
}

export interface LearningStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface StudentAvatar {
  id: string;
  name: string;
  emoji: string;
  bgGradient: string;
  themeColor: string;
  personality: string;
}

export interface StudentUser {
  id: string;
  name: string;
  username: string;
  email: string;
  grade: string; // e.g. "Class 6"
  school: string;
  preferredLanguage: Language;
  avatarId: string;
  avatarConfig?: {
    themeColor: string;
    accessory: string;
  };
  role: 'student'; // Public registration strictly student-only
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: StudentUser | null;
}

export type DashboardTab = 
  | 'all'
  | 'classes'
  | 'videos'
  | 'passages'
  | 'questions'
  | 'explanation'
  | 'progress'
  | 'badges'
  | 'avatar'
  | 'profile';

export type LearningMode = 'individual' | 'collective';

export interface QuestionOption {
  id: string;
  text: string;
  tag?: string;
}

export interface ReflectionQuestion {
  id: string;
  questionNumber?: number;
  question: string;
  hint: string;
  category: string;
  options?: QuestionOption[];
  facilitatorNotes?: string;
}

export interface CollectiveClassData {
  classSize: number;
  // questionId -> optionId -> number of student votes
  votes: Record<string, Record<string, number>>;
}

export interface ExplanationSection {
  partNumber: number;
  heading: string;
  title: string;
  content: string;
  keyTakeaway: string;
}

export interface Lesson {
  id: string;
  classLevel: string; // e.g. "Class 6" or "LKG - Class 2"
  gradeBand: 'lkg-2' | '3-5' | '6-8' | '9-10';
  gunaId: string;
  gunaName: string;
  title: string;
  storyTitle: string;
  sourceEpic: 'Ramayana' | 'Mahabharata' | 'Panchatantra' | 'Hitopadesha';
  durationMinutes: number;
  videoThumbnailGradient: string;
  videoSynopsis: string;
  videoUrl?: string;
  passageText: string;
  questions: ReflectionQuestion[];
  explanationText: string;
  lifeSkillTitle: string;
  lifeSkillApplication: string;
  collectiveDiscussionPrompt: string;
  classmatePerspectives: { studentName: string; grade: string; perspective: string }[];
}

export interface StudentProgress {
  completedVideos: string[]; // lesson ids
  completedPassages: string[];
  completedQuestions: string[];
  completedExplanations: string[];
  completedLessons: string[];
  savedResponses: Record<string, string>; // questionId -> student answer
  collectiveNotes: Record<string, string>; // lessonId -> group notes
}

export interface Badge {
  id: string;
  title: string;
  sanskritTitle: string;
  description: string;
  iconName: string;
  requiredMetric: string;
  unlocked: boolean;
  unlockedAt?: string;
}
