import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, Clock, BookOpen, Star, User, Calendar } from "lucide-react";

interface ModuleCardProps {
  module: {
    id: number;
    title: string;
    description: string;
    level: string;
    duration: string;
    lessons: number;
    rating: number;
    imageUrl: string;
    progress?: number;
    isCompleted?: boolean;
    instructor?: string;
    enrollmentDate?: string;
  };
  onPlay?: (moduleId: number) => void;
  onEnroll?: (moduleId: number) => void;
  showProgress?: boolean;
}

export function ModuleCard({ module, onPlay, onEnroll, showProgress = false }: ModuleCardProps) {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 border-slate-200 dark:border-slate-700">
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <img 
            src={module.imageUrl} 
            alt={module.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Level Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={getLevelColor(module.level)}>
            {module.level}
          </Badge>
        </div>

        {/* Completion Badge */}
        {module.isCompleted && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-green-500 text-white">
              Completed
            </Badge>
          </div>
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            size="lg"
            className="bg-white/90 text-black hover:bg-white shadow-lg"
            onClick={() => onPlay?.(module.id)}
          >
            <PlayCircle className="h-5 w-5 mr-2" />
            Start Learning
          </Button>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {module.title}
            </h3>
            <div className="flex items-center gap-1 mb-2">
              {renderStars(module.rating)}
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                ({module.rating}.0)
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {module.description}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Module Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {module.duration}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {module.lessons} lessons
            </div>
          </div>

          {/* Instructor */}
          {module.instructor && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <User className="h-4 w-4" />
              {module.instructor}
            </div>
          )}

          {/* Enrollment Date */}
          {module.enrollmentDate && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4" />
              Enrolled {module.enrollmentDate}
            </div>
          )}

          {/* Progress */}
          {showProgress && module.progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium">{module.progress}%</span>
              </div>
              <Progress value={module.progress} className="h-2" />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {module.progress !== undefined && module.progress > 0 ? (
              <>
                <Button 
                  className="flex-1" 
                  onClick={() => onPlay?.(module.id)}
                >
                  Continue Learning
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 text-blue-600 border-blue-300 hover:bg-blue-50"
                  onClick={() => window.location.href = `/quiz/module_final_quiz/${module.id}`}
                >
                  Final Quiz
                </Button>
              </>
            ) : (
              <Button 
                className="flex-1" 
                onClick={() => onEnroll?.(module.id)}
              >
                Enroll Now
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}