import { useState } from 'react';
import { Progress } from '@/types';

// Mock progress data - replace with your Laravel API calls
const mockLessonProgress: Record<string, number> = {
  '1': 100, // First lesson completed
  '2': 45,  // Second lesson partially completed
  '3': 0,   // Third lesson not started
};

export const useProgress = () => {
  const [lessonProgress, setLessonProgress] = useState(mockLessonProgress);

  const getLessonProgress = (lessonId: string): number => {
    return lessonProgress[lessonId] || 0;
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    return getLessonProgress(lessonId) >= 100;
  };

  const isLessonUnlocked = (lessonId: string, lessons: any[], moduleId: string): boolean => {
    // First lesson is always unlocked
    const currentLesson = lessons.find(l => l.idLesson === lessonId);
    if (!currentLesson) return false;
    
    if (currentLesson.order === 1) return true;

    // Check if previous lesson is completed
    const previousLesson = lessons.find(l => l.order === currentLesson.order - 1);
    if (!previousLesson) return true;

    return isLessonCompleted(previousLesson.idLesson);
  };

  const updateLessonProgress = (lessonId: string, progress: number) => {
    setLessonProgress(prev => ({
      ...prev,
      [lessonId]: progress
    }));
    
    // TODO: Save to backend
    console.log(`Updating lesson ${lessonId} progress to ${progress}%`);
  };

  const getModuleProgress = (lessons: any[]): number => {
    if (lessons.length === 0) return 0;
    
    const totalProgress = lessons.reduce((sum, lesson) => {
      return sum + getLessonProgress(lesson.idLesson);
    }, 0);
    
    return Math.round(totalProgress / lessons.length);
  };

  const getNextUnlockedLesson = (lessons: any[]): string | null => {
    const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);
    
    for (const lesson of sortedLessons) {
      if (isLessonUnlocked(lesson.idLesson, lessons, lesson.moduleId) && 
          !isLessonCompleted(lesson.idLesson)) {
        return lesson.idLesson;
      }
    }
    
    return null; // All lessons completed
  };

  return {
    getLessonProgress,
    isLessonCompleted,
    isLessonUnlocked,
    updateLessonProgress,
    getModuleProgress,
    getNextUnlockedLesson
  };
};