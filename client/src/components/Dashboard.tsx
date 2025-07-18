import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, User, Calendar, MessageSquare, GraduationCap, Award, Clock, CheckCircle, TrendingUp, PlayCircle, Target, Users } from "lucide-react";
import { ModuleCard } from "./modules/ModuleCard";
import { useQuery } from "@tanstack/react-query";

export function Dashboard() {
  // Fetch dashboard data
  const { data: stats } = useQuery({
    queryKey: ["/api/dashboard/stats"],
    queryFn: async () => {
      const response = await fetch("/api/dashboard/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      return response.json();
    },
  });

  const { data: activities } = useQuery({
    queryKey: ["/api/dashboard/activities"],
    queryFn: async () => {
      const response = await fetch("/api/dashboard/activities");
      if (!response.ok) throw new Error("Failed to fetch activities");
      return response.json();
    },
  });

  const { data: moduleProgress } = useQuery({
    queryKey: ["/api/dashboard/module-progress"],
    queryFn: async () => {
      const response = await fetch("/api/dashboard/module-progress");
      if (!response.ok) throw new Error("Failed to fetch module progress");
      return response.json();
    },
  });

  const { data: popularModules } = useQuery({
    queryKey: ["/api/dashboard/popular-modules"],
    queryFn: async () => {
      const response = await fetch("/api/dashboard/popular-modules");
      if (!response.ok) throw new Error("Failed to fetch popular modules");
      return response.json();
    },
  });

  const dashboardStats = [
    {
      title: "Total Learners",
      value: stats?.totalLearners || 0,
      icon: Users,
      change: "+12%",
      color: "text-blue-600"
    },
    {
      title: "Active Modules",
      value: stats?.activeModules || 0,
      icon: BookOpen,
      change: "+8%",
      color: "text-green-600"
    },
    {
      title: "In Progress",
      value: stats?.inProgress || 0,
      icon: Clock,
      change: "+15%",
      color: "text-orange-600"
    },
    {
      title: "Completed",
      value: stats?.completed || 0,
      icon: CheckCircle,
      change: "+22%",
      color: "text-purple-600"
    }
  ];

  const handleModulePlay = (moduleId: number) => {
    // Navigate to module details or lesson viewer
    console.log('Playing module:', moduleId);
  };

  const handleModuleEnroll = (moduleId: number) => {
    // Handle enrollment
    console.log('Enrolling in module:', moduleId);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Learning Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Continue your learning journey with Sphere LMS.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
          <Button size="sm">
            <Target className="h-4 w-4 mr-2" />
            Set Goals
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600 font-medium">
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Modules Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Popular Learning Modules
          </CardTitle>
          <CardDescription>
            Discover and enroll in our most popular training modules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularModules?.map((module: any) => (
              <ModuleCard
                key={module.id}
                module={module}
                onPlay={handleModulePlay}
                onEnroll={handleModuleEnroll}
                showProgress={true}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Your Progress
            </CardTitle>
            <CardDescription>
              Track your learning progress across all modules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moduleProgress?.map((progress: any) => (
                <div key={progress.id} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {progress.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {progress.completedLessons} of {progress.totalLessons} lessons
                    </p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Progress
                        </span>
                        <span className="text-sm font-medium">
                          {progress.progress}%
                        </span>
                      </div>
                      <Progress value={progress.progress} className="h-2" />
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Continue
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest learning activities and achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities?.map((activity: any) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'lesson' ? 'bg-green-500' : 
                    activity.type === 'module' ? 'bg-blue-500' : 'bg-purple-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">{activity.user}</span>
                      {' '}
                      <span className="text-gray-600 dark:text-gray-400">
                        {activity.action}
                      </span>
                      {' '}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.timestamp}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}