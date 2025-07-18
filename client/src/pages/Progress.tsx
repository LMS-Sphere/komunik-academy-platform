import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Target, 
  Trophy, 
  Calendar, 
  Clock, 
  BookOpen, 
  CheckCircle, 
  Star, 
  Award, 
  BarChart3, 
  Activity, 
  Zap 
} from 'lucide-react';

export default function ProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock progress data
  const overallProgress = {
    completedModules: 3,
    totalModules: 8,
    completedLessons: 24,
    totalLessons: 45,
    certificatesEarned: 2,
    currentStreak: 7,
    totalStudyTime: 1847, // minutes
    averageScore: 87
  };

  const recentActivity = [
    {
      id: 1,
      type: 'lesson_completed',
      title: 'Advanced Lead Management',
      module: 'CRM Prospecting',
      score: 92,
      date: '2025-01-06',
      duration: 25
    },
    {
      id: 2,
      type: 'quiz_passed',
      title: 'Quiz - System Configuration',
      module: 'Administration',
      score: 85,
      date: '2025-01-05',
      duration: 15
    },
    {
      id: 3,
      type: 'certificate_earned',
      title: 'CRM Fundamentals Certification',
      module: 'CRM Basics',
      score: 94,
      date: '2025-01-04',
      duration: 0
    },
    {
      id: 4,
      type: 'lesson_completed',
      title: 'Custom Reports',
      module: 'Analytics',
      score: 89,
      date: '2025-01-03',
      duration: 30
    }
  ];

  const moduleProgress = [
    {
      id: 1,
      name: 'CRM Fundamentals',
      progress: 100,
      lessons: 6,
      completedLessons: 6,
      averageScore: 94,
      status: 'completed',
      certificate: true
    },
    {
      id: 2,
      name: 'Advanced Prospecting',
      progress: 85,
      lessons: 8,
      completedLessons: 7,
      averageScore: 87,
      status: 'in_progress',
      certificate: false
    },
    {
      id: 3,
      name: 'System Administration',
      progress: 60,
      lessons: 5,
      completedLessons: 3,
      averageScore: 82,
      status: 'in_progress',
      certificate: false
    },
    {
      id: 4,
      name: 'Analytics & Reports',
      progress: 40,
      lessons: 7,
      completedLessons: 3,
      averageScore: 89,
      status: 'in_progress',
      certificate: false
    },
    {
      id: 5,
      name: 'API Integrations',
      progress: 0,
      lessons: 6,
      completedLessons: 0,
      averageScore: 0,
      status: 'not_started',
      certificate: false
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Module Completed',
      description: 'Congratulations on completing your first module!',
      icon: Trophy,
      earned: true,
      date: '2025-01-04'
    },
    {
      id: 2,
      title: '7-Day Streak',
      description: 'You have studied for 7 consecutive days',
      icon: Calendar,
      earned: true,
      date: '2025-01-06'
    },
    {
      id: 3,
      title: 'Quiz Expert',
      description: 'Get 90%+ on 5 consecutive quizzes',
      icon: Target,
      earned: true,
      date: '2025-01-05'
    },
    {
      id: 4,
      title: 'Marathon Learner',
      description: 'Study for more than 30 hours',
      icon: Activity,
      earned: false,
      date: null
    },
    {
      id: 5,
      title: 'Perfectionist',
      description: 'Get 100% on a final exam',
      icon: Star,
      earned: false,
      date: null
    }
  ];

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson_completed': return BookOpen;
      case 'quiz_passed': return CheckCircle;
      case 'certificate_earned': return Award;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'lesson_completed': return 'text-blue-600 bg-blue-100';
      case 'quiz_passed': return 'text-green-600 bg-green-100';
      case 'certificate_earned': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Progress
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your learning journey and achievements
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                Progress Dashboard
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Keep up the great work, you're making excellent progress!
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-sm font-medium">
                    🔥 {overallProgress.currentStreak} days streak
                  </span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-sm font-medium">
                    ⭐ Average score: {overallProgress.averageScore}%
                  </span>
                </div>
              </div>
            </div>
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="h-16 w-16 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed Modules</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {overallProgress.completedModules}/{overallProgress.totalModules}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed Lessons</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {overallProgress.completedLessons}/{overallProgress.totalLessons}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Certificates</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{overallProgress.certificatesEarned}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Study Time</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatDuration(overallProgress.totalStudyTime)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="modules" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Module Progress
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Recent Activity
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Progress by Module</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {moduleProgress.map((module) => (
                  <div key={module.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{module.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {module.completedLessons}/{module.lessons} lessons completed
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {module.certificate && (
                          <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
                            <Award className="h-3 w-3 mr-1" />
                            Certified
                          </Badge>
                        )}
                        <Badge variant={module.status === 'completed' ? 'default' : 'secondary'}>
                          {module.status === 'completed' ? 'Completed' :
                           module.status === 'in_progress' ? 'In Progress' : 'Not Started'}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                    {module.averageScore > 0 && (
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Average score:</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">{module.averageScore}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  const colorClass = getActivityColor(activity.type);
                  
                  return (
                    <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className={`p-2 rounded-full ${colorClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{activity.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{activity.module}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-sm font-medium">{activity.score}%</span>
                        </div>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Achievements and Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  
                  return (
                    <div
                      key={achievement.id}
                      className={`border rounded-lg p-6 text-center transition-all ${
                        achievement.earned
                          ? 'bg-gradient-to-b from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-lg'
                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                        achievement.earned
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                      }`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{achievement.description}</p>
                      {achievement.earned && achievement.date && (
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                          Earned on {achievement.date}
                        </Badge>
                      )}
                      {!achievement.earned && (
                        <Badge variant="secondary">
                          Not earned yet
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}