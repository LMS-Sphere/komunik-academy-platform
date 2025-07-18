import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, Clock, CheckCircle, Lock, FileText, Video, Image, VolumeX } from "lucide-react";

interface LessonCardProps {
  lesson: {
    id: number;
    title: string;
    description: string;
    lessonType: string;
    duration: number;
    order: number;
    objectives?: string[];
    contentUrl?: string;
  };
  isCompleted?: boolean;
  isLocked?: boolean;
  progress?: number;
  onPlay?: (lessonId: number) => void;
  onStart?: (lessonId: number) => void;
}

export function LessonCard({ lesson, isCompleted, isLocked, progress, onPlay, onStart }: LessonCardProps) {
  const getLessonTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'pdf':
        return <FileText className="h-5 w-5" />;
      case 'image':
        return <Image className="h-5 w-5" />;
      case 'audio':
        return <VolumeX className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getLessonTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'pdf':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'image':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'audio':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  return (
    <Card className={`group h-full overflow-hidden transition-all duration-300 hover:shadow-lg ${
      isLocked 
        ? 'opacity-60 cursor-not-allowed border-gray-200 dark:border-gray-700' 
        : 'hover:shadow-blue-500/25 hover:-translate-y-1 border-slate-200 dark:border-slate-700'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Lesson {lesson.order}
              </span>
              <Badge className={getLessonTypeColor(lesson.lessonType)}>
                <span className="flex items-center gap-1">
                  {getLessonTypeIcon(lesson.lessonType)}
                  {lesson.lessonType}
                </span>
              </Badge>
            </div>
            <h3 className={`font-semibold text-lg leading-tight mb-2 transition-colors ${
              isLocked 
                ? 'text-gray-400 dark:text-gray-500' 
                : 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
            }`}>
              {lesson.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {isCompleted && (
              <div className="p-1 bg-green-100 dark:bg-green-900/20 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            )}
            {isLocked && (
              <div className="p-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {lesson.description}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Duration */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            {formatDuration(lesson.duration)}
          </div>

          {/* Learning Objectives */}
          {lesson.objectives && lesson.objectives.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Learning Objectives:
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {lesson.objectives.slice(0, 2).map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{objective}</span>
                  </li>
                ))}
                {lesson.objectives.length > 2 && (
                  <li className="text-xs text-gray-500 dark:text-gray-400 ml-4">
                    +{lesson.objectives.length - 2} more objectives
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Progress */}
          {progress !== undefined && progress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {isLocked ? (
              <Button className="flex-1" disabled>
                <Lock className="h-4 w-4 mr-2" />
                Locked
              </Button>
            ) : isCompleted ? (
              <Button 
                className="flex-1" 
                variant="outline"
                onClick={() => onPlay?.(lesson.id)}
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                Review
              </Button>
            ) : progress !== undefined && progress > 0 ? (
              <Button 
                className="flex-1" 
                onClick={() => onPlay?.(lesson.id)}
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                Continue
              </Button>
            ) : (
              <Button 
                className="flex-1" 
                onClick={() => onStart?.(lesson.id)}
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                Start Lesson
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}