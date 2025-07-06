// User roles and types based on class diagram
export type UserRole = 'admin' | 'trainer' | 'learner';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  country: string;
  photo?: string;
  role: UserRole;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  idModule: string;
  title: string;
  description: string;
  trainerId: string;
  lessons: Lesson[];
  level: Level;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  idLesson: string;
  title: string;
  content: string;
  typeLesson: 'pdf' | 'video' | 'photo';
  moduleId: string;
  duration?: number;
  order: number;
}

export interface Level {
  idLevel: string;
  name: string;
  description: string;
  difficulty: number;
}

export interface Progress {
  idProgress: string;
  progress: number;
  speed: number;
  timePassed: number;
  userId: string;
  moduleId: string;
  startedAt: Date;
  lastAccessed: Date;
}

export interface Questions {
  idQuestions: string;
  textQ: string;
  typeQuestion: string;
  lessonId: string;
  correctAnswer?: string;
}

export interface Responses {
  idResponse: string;
  textR: string;
  isCorrect: boolean;
  questionId: string;
  userId: string;
}

export interface Evaluation {
  idEvaluation: string;
  score: number;
  date: Date;
  isScoreRequired: boolean;
  typeEvaluation: TypeEvaluation;
  userId: string;
  moduleId: string;
}

export interface TypeEvaluation {
  levelTest: string;
  exam: string;
}

export interface Performance {
  idPerformance: string;
  progress: number;
  speed: number;
  timePassed: number;
  userId: string;
  moduleId: string;
  analysisInteractions: string;
  alerts?: string;
}