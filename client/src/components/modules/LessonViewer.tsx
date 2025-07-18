import { useState, useEffect } from 'react';
import { Lesson } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Pause, CheckCircle2, Clock } from 'lucide-react';

interface LessonViewerProps {
  lesson: Lesson;
  onBack: () => void;
  onComplete: (lessonId: string, progress: number) => void;
  initialProgress?: number;
}

export function LessonViewer({ lesson, onBack, onComplete, initialProgress = 0 }: LessonViewerProps) {
  const [progress, setProgress] = useState(initialProgress);
  const [isCompleted, setIsCompleted] = useState(initialProgress >= 100);
  const [startTime] = useState(Date.now());

  const handleProgressUpdate = (newProgress: number) => {
    setProgress(newProgress);
    if (newProgress >= 100 && !isCompleted) {
      setIsCompleted(true);
      onComplete(lesson.idLesson, 100);
    } else if (newProgress < 100) {
      // Auto-save progress every 10% increment
      if (Math.floor(newProgress / 10) > Math.floor(progress / 10)) {
        onComplete(lesson.idLesson, newProgress);
      }
    }
  };

  const handleManualComplete = () => {
    handleProgressUpdate(100);
  };

  const getTypeLabel = () => {
    switch (lesson.typeLesson) {
      case 'video':
        return 'Vidéo';
      case 'pdf':
        return 'PDF';
      case 'photo':
        return 'Image';
      default:
        return 'Document';
    }
  };

  const renderContent = () => {
    switch (lesson.typeLesson) {
      case 'video':
        return (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">Lecteur vidéo</p>
                <p className="text-sm text-muted-foreground">
                  Intégration avec votre lecteur vidéo préféré
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => handleProgressUpdate(Math.min(progress + 25, 100))}
                disabled={isCompleted}
              >
                Simuler progression +25%
              </Button>
            </div>
          </div>
        );
      
      case 'pdf':
        return (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg min-h-[500px] flex items-center justify-center">
              <div className="text-center">
                <div className="bg-background p-8 rounded-lg shadow-soft max-w-md">
                  <h3 className="text-xl font-semibold mb-4">Document PDF</h3>
                  <p className="text-muted-foreground mb-4">
                    Contenu du document de la leçon "{lesson.title}"
                  </p>
                  <div className="text-left space-y-2 text-sm">
                    <p>• Introduction aux concepts</p>
                    <p>• Exemples pratiques</p>
                    <p>• Exercices d'application</p>
                    <p>• Ressources supplémentaires</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => handleProgressUpdate(Math.min(progress + 33, 100))}
                disabled={isCompleted}
              >
                Page suivante
              </Button>
            </div>
          </div>
        );
      
      case 'photo':
        return (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="bg-primary/10 p-12 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Contenu visuel</h3>
                  <p className="text-muted-foreground">
                    Images et diagrammes pour "{lesson.title}"
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => handleProgressUpdate(Math.min(progress + 50, 100))}
                disabled={isCompleted}
              >
                Image suivante
              </Button>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Type de contenu non reconnu</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au module
          </Button>
          <div className="h-6 w-px bg-border" />
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {getTypeLabel()}
          </Badge>
          {lesson.duration && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{lesson.duration} min</span>
            </div>
          )}
        </div>
        
        {isCompleted && (
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Leçon terminée</span>
          </div>
        )}
      </div>

      {/* Lesson Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{lesson.title}</CardTitle>
          {lesson.content && (
            <p className="text-muted-foreground">{lesson.content}</p>
          )}
        </CardHeader>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>

      {/* Progress Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Progression de la leçon</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            
            <Progress value={progress} className="h-3" />
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Temps écoulé: {Math.round((Date.now() - startTime) / 60000)} min
              </div>
              
              {!isCompleted && progress < 100 && (
                <Button 
                  onClick={handleManualComplete}
                  className="bg-gradient-primary hover:bg-primary-hover"
                >
                  Marquer comme terminé
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}