import { Module, Progress } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, User, Clock, Play, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ModuleCardProps {
  module: Module;
  progress?: Progress;
  onEdit?: (module: Module) => void;
  onDelete?: (moduleId: string) => void;
  onStart?: (moduleId: string) => void;
}

export function ModuleCard({ module, progress, onEdit, onDelete, onStart }: ModuleCardProps) {
  const { canManageModules, hasRole } = useAuth();

  const getProgressPercentage = () => {
    return progress ? Math.round(progress.progress) : 0;
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

  return (
    <Card className="shadow-soft border-0 hover:shadow-medium transition-all duration-200 group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
              {module.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {module.description}
            </p>
          </div>
          {canManageModules() && (
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onEdit?.(module)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => onDelete?.(module.idModule)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Bar for Learners */}
        {hasRole('learner') && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progression</span>
              <span className="font-medium text-foreground">{getProgressPercentage()}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        )}

        {/* Module Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{module.lessons.length} leçons</span>
          </div>
          {progress?.timePassed && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{Math.round(progress.timePassed / 60)} min</span>
            </div>
          )}
        </div>

        {/* Level Badge and Action Button */}
        <div className="flex items-center justify-between">
          <Badge className={getDifficultyColor(module.level.difficulty)}>
            {getDifficultyLabel(module.level.difficulty)}
          </Badge>
          
          <Button 
            variant={hasRole('learner') ? 'default' : 'outline'} 
            size="sm"
            className={hasRole('learner') ? 'bg-gradient-primary hover:bg-primary-hover' : ''}
            onClick={() => onStart?.(module.idModule)}
          >
            {hasRole('learner') ? (
              <>
                <Play className="mr-2 h-4 w-4" />
                {progress ? 'Continuer' : 'Commencer'}
              </>
            ) : (
              'Voir détails'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}