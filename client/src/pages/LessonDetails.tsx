import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, PlayCircle, CheckCircle, Clock, BookOpen, Users, Star, Download, Share2 } from "lucide-react";

export default function LessonDetails() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const lessonId = params.id;
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["/api/lessons", lessonId],
    queryFn: async () => {
      const response = await fetch(`/api/lessons/${lessonId}`);
      if (!response.ok) throw new Error("Failed to fetch lesson");
      return response.json();
    },
  });

  const { data: comments } = useQuery({
    queryKey: ["/api/lessons", lessonId, "comments"],
    queryFn: async () => {
      const response = await fetch(`/api/lessons/${lessonId}/comments`);
      if (!response.ok) throw new Error("Failed to fetch comments");
      return response.json();
    },
  });

  const handleMarkComplete = () => {
    setIsCompleted(true);
    setCurrentProgress(100);
  };

  const handleStartLesson = () => {
    setCurrentProgress(25);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" className="flex items-center gap-2" onClick={() => setLocation('/lessons')}>
            <ArrowLeft className="h-4 w-4" />
            Back to Lessons
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video/Content Area */}
            <Card>
              <CardContent className="p-0">
                <div className="relative bg-black rounded-t-lg overflow-hidden">
                  <div className="aspect-video flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      onClick={handleStartLesson}
                    >
                      <PlayCircle className="h-8 w-8 mr-2" />
                      {currentProgress === 0 ? "Start Lesson" : "Continue"}
                    </Button>
                  </div>
                  {currentProgress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white/20 p-2">
                      <Progress value={currentProgress} className="h-1" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {lesson?.title || "Introduction to CRM Basics"}
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        {lesson?.description || "Learn the fundamentals of Customer Relationship Management"}
                      </p>
                    </div>
                    <Badge variant={isCompleted ? "default" : "secondary"}>
                      {isCompleted ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {lesson?.duration || "15"} min
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {lesson?.enrolledCount || "1,247"} students
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {lesson?.rating || "4.8"}
                    </div>
                  </div>

                  {!isCompleted && currentProgress > 0 && (
                    <Button onClick={handleMarkComplete} className="w-full">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Complete
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Lesson Content Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Lesson Content</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="transcript">Transcript</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="quiz">Quiz</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">What you'll learn</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Understanding CRM fundamentals and core concepts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>How to manage customer relationships effectively</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Best practices for data management and organization</span>
                        </li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="transcript" className="space-y-4">
                    <div className="prose dark:prose-invert max-w-none">
                      <p>Welcome to this comprehensive introduction to Customer Relationship Management...</p>
                      <p>In this lesson, we'll cover the fundamental concepts that every CRM professional should know...</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="resources" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          <span>CRM Best Practices Guide.pdf</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          <span>Sample CRM Templates.xlsx</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="quiz" className="space-y-4">
                    <div className="text-center py-8">
                      <h3 className="font-semibold mb-2">Lesson Quiz</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Test your understanding of this lesson's content
                      </p>
                      <Button 
                        onClick={() => navigate(`/quiz/lesson_quiz/${lesson.id}`)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Start Lesson Quiz
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Lesson Progress</span>
                    <span>{currentProgress}%</span>
                  </div>
                  <Progress value={currentProgress} className="h-2" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {currentProgress === 0 ? "Not started" : 
                     currentProgress === 100 ? "Completed" : "In progress"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <CardTitle>Discussion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {comments?.map((comment: any) => (
                    <div key={comment.id} className="border-b pb-3 last:border-b-0">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {comment.user.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{comment.user}</span>
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{comment.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}