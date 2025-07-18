import { useState } from 'react';
import { Module } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, BookOpen, Clock, CheckCircle2 } from 'lucide-react';
import { LessonCard } from './LessonCard';
import { LessonViewer } from './LessonViewer';
import { useProgress } from '@/hooks/useProgress';

interface ModuleDetailsProps {
  module: Module;
  onBack: () => void;
}

export function ModuleDetails({ module, onBack }: ModuleDetailsProps) {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const { 
    getLessonProgress, 
    isLessonCompleted, 
    isLessonUnlocked, 
    updateLessonProgress,
    getModuleProgress,
    getNextUnlockedLesson
  } = useProgress();

  const selectedLesson = selectedLessonId 
    ? module.lessons.find(l => l.idLesson === selectedLessonId)
    : null;

  const moduleProgress = getModuleProgress(module.lessons);
  const nextLessonId = getNextUnlockedLesson(module.lessons);
  const completedLessons = module.lessons.filter(l => isLessonCompleted(l.idLesson)).length;

  const handleStartLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
  };

  const handleLessonComplete = (lessonId: string, progress: number) => {
    updateLessonProgress(lessonId, progress);
  };

  const handleBackToModule = () => {
    setSelectedLessonId(null);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return 'bg-success/10 text-success';
    if (difficulty <= 6) return 'bg-warning/10 text-warning';
    return 'bg-destructive/10 text-destructive';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 3) return 'Débutant';
    if (difficulty <= 6) return 'Intermédiaire';
    return 'Avancé';
  };

  // If a lesson is selected, show the lesson viewer
  if (selectedLesson) {
    return (
      <LessonViewer
        lesson={selectedLesson}
        onBack={handleBackToModule}
        onComplete={handleLessonComplete}
        initialProgress={getLessonProgress(selectedLesson.idLesson)}
      />
    );
  }

  // Sort lessons by order
  const sortedLessons = [...module.lessons].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux modules
        </Button>
      </div>

      {/* Module Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{module.title}</CardTitle>
              <p className="text-muted-foreground text-lg">
                {module.description}
              </p>
            </div>
            <Badge className={getDifficultyColor(module.level.difficulty)}>
              {getDifficultyLabel(module.level.difficulty)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Progress Overview */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-medium">Progression du module</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Complété</span>
                  <span className="font-medium">{moduleProgress}%</span>
                </div>
                <Progress value={moduleProgress} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                {completedLessons} sur {module.lessons.length} leçons terminées
              </p>
            </div>

            {/* Module Stats */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="font-medium">Détails</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Nombre de leçons</span>
                  <span className="font-medium">{module.lessons.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Niveau</span>
                  <span className="font-medium">{module.level.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Durée estimée</span>
                  <span className="font-medium">
                    {module.lessons.reduce((total, lesson) => total + (lesson.duration || 0), 0)} min
                  </span>
                </div>
              </div>
            </div>

            {/* Next Action */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">Prochaine étape</span>
              </div>
              {nextLessonId ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Continuer avec la prochaine leçon
                  </p>
                  <Button 
                    className="w-full bg-gradient-primary hover:bg-primary-hover"
                    onClick={() => handleStartLesson(nextLessonId)}
                  >
                    Continuer l'apprentissage
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-success">
                    ✅ Module terminé !
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Toutes les leçons ont été complétées
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lessons List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Leçons du module</h3>
        <div className="grid gap-4">
          {sortedLessons.map((lesson) => (
            <LessonCard
              key={lesson.idLesson}
              lesson={lesson}
              moduleId={module.idModule}
              isUnlocked={isLessonUnlocked(lesson.idLesson, module.lessons, module.idModule)}
              isCompleted={isLessonCompleted(lesson.idLesson)}
              progress={getLessonProgress(lesson.idLesson)}
              onStart={handleStartLesson}
            />
          ))}
        </div>
      </div>
    </div>
  );
}