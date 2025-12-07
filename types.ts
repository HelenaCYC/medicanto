export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard'
}

export interface MedicalTerm {
  id: string;
  english: string;
  cantonese: string;
  pronunciation: string; // Jyutping or phonetic
  category: string;
  exampleEn: string;
  exampleCan: string;
  difficulty: Difficulty;
  isHard: boolean; // User marked as hard
  audioUrl?: string; // Optional custom upload
  imageUrl?: string; // Optional custom upload
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ReportedError {
  id: string;
  termId: string;
  termEnglish: string;
  reportText: string;
  timestamp: number;
  status: 'Pending' | 'Resolved';
}

export enum AppMode {
  ONBOARDING = 'ONBOARDING',
  HOME = 'HOME',
  GLOSSARY = 'GLOSSARY',
  FLASHCARDS = 'FLASHCARDS',
  QUIZ = 'QUIZ',
  ADMIN = 'ADMIN',
  PROFILE = 'PROFILE'
}