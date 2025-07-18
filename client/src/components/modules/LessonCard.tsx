import { Lesson, Progress } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, FileText, Volume2, Lock, CheckCircle2, Clock } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  moduleId: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  progress?: number;
  onStart: (lessonId: string) => void;
}

export function LessonCard({ 
  lesson, 
  moduleId, 
  isUnlocked, 
  isCompleted, 
  progress = 0, 
  onStart 
}: LessonCardProps) {
  const getTypeIcon = () => {
    switch (lesson.typeLesson) {
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      case 'photo':
        return <Volume2 className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
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

  const getTypeColor = () => {
    switch (lesson.typeLesson) {
      case 'video':
        return 'bg-primary/10 text-primary';
      case 'pdf':
        return 'bg-destructive/10 text-destructive';
      case 'photo':
        return 'bg-secondary/10 text-secondary-foreground';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  return (
    <Card className={`transition-all duration-200 ${
      !isUnlocked 
        ? 'opacity-50 cursor-not-allowed' 
        : 'hover:shadow-medium cursor-pointer'
    } ${isCompleted ? 'border-success/20 bg-success/5' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className={`p-2 rounded-full ${getTypeColor()}`}>
              {getTypeIcon()}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground truncate">
                {lesson.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={getTypeColor()}>
                  {getTypeLabel()}
                </Badge>
                {lesson.duration && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{lesson.duration} min</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Progress indicator */}
            {isUnlocked && progress > 0 && !isCompleted && (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">{Math.round(progress)}%</span>
                </div>
                <span className="text-xs text-muted-foreground mt-1">En cours</span>
              </div>
            )}

            {/* Status icons */}
            {isCompleted ? (
              <div className="flex flex-col items-center">
                <CheckCircle2 className="h-8 w-8 text-success" />
                <span className="text-xs text-success mt-1">Terminé</span>
              </div>
            ) : !isUnlocked ? (
              <div className="flex flex-col items-center">
                <Lock className="h-8 w-8 text-muted-foreground" />
                <span className="text-xs text-muted-foreground mt-1">Verrouillé</span>
              </div>
            ) : (
              <Button
                variant={progress > 0 ? "default" : "outline"}
                size="sm"
                onClick={() => onStart(lesson.idLesson)}
                className={progress > 0 ? "bg-gradient-primary hover:bg-primary-hover" : ""}
              >
                {progress > 0 ? "Continuer" : "Commencer"}
              </Button>
            )}
          </div>
        </div>

        {/* Progress bar for ongoing lessons */}
        {isUnlocked && progress > 0 && !isCompleted && (
          <div className="mt-3">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}