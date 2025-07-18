import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, AlertCircle, Trophy } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  evaluationId: number;
  questionText: string;
  questionType: "multiple_choice" | "true_false" | "open_ended";
  options?: string[];
  correctAnswer?: string;
  points: number;
  explanation?: string;
  order: number;
}

interface Evaluation {
  id: number;
  moduleId?: number;
  lessonId?: number;
  title: string;
  description: string;
  evaluationType: "lesson_quiz" | "module_final_quiz";
  totalQuestions: number;
  passingScore: number;
  timeLimit?: number;
  isActive: boolean;
}

interface QuizState {
  currentQuestion: number;
  answers: Record<number, string>;
  timeRemaining: number;
  isSubmitted: boolean;
  score?: number;
  isPassed?: boolean;
  startTime: Date;
}

export default function Quiz() {
  const params = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const type = params.type as "lesson_quiz" | "module_final_quiz";
  const entityId = parseInt(params.id as string); // lessonId or moduleId
  
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    timeRemaining: 0,
    isSubmitted: false,
    startTime: new Date(),
  });

  // Fetch evaluation details based on type
  const { data: evaluation, isLoading: evaluationLoading } = useQuery({
    queryKey: ["/api/evaluations", type, entityId],
    queryFn: () => {
      if (type === "lesson_quiz") {
        return apiRequest(`/api/lessons/${entityId}/quiz`);
      } else if (type === "module_final_quiz") {
        return apiRequest(`/api/modules/${entityId}/final-quiz`);
      }
      throw new Error("Invalid quiz type");
    },
  });

  // Fetch questions
  const { data: questions, isLoading: questionsLoading } = useQuery({
    queryKey: ["/api/evaluations", evaluation?.id, "questions"],
    queryFn: () => apiRequest(`/api/evaluations/${evaluation?.id}/questions`),
    enabled: !!evaluation?.id,
  });

  // Submit quiz mutation
  const submitQuizMutation = useMutation({
    mutationFn: (responses: any) => 
      apiRequest(`/api/evaluations/${evaluation?.id}/submit`, {
        method: "POST",
        body: JSON.stringify(responses),
      }),
    onSuccess: (result) => {
      setQuizState(prev => ({
        ...prev,
        isSubmitted: true,
        score: result.score,
        isPassed: result.isPassed,
      }));
      toast({
        title: result.isPassed ? "Quiz Passed!" : "Quiz Completed",
        description: `You scored ${result.score}/${result.totalPoints} (${result.percentage}%)`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/user/progress"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Initialize timer
  useEffect(() => {
    if (evaluation?.timeLimit && !quizState.isSubmitted) {
      const timer = setInterval(() => {
        setQuizState(prev => {
          const newTimeRemaining = prev.timeRemaining - 1;
          if (newTimeRemaining <= 0) {
            handleSubmitQuiz();
            return { ...prev, timeRemaining: 0 };
          }
          return { ...prev, timeRemaining: newTimeRemaining };
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [evaluation, quizState.isSubmitted]);

  // Set initial time when evaluation loads
  useEffect(() => {
    if (evaluation?.timeLimit && quizState.timeRemaining === 0) {
      setQuizState(prev => ({
        ...prev,
        timeRemaining: evaluation.timeLimit * 60, // Convert minutes to seconds
      }));
    }
  }, [evaluation]);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer,
      },
    }));
  };

  const handleNextQuestion = () => {
    if (questions && quizState.currentQuestion < questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    }
  };

  const handlePreviousQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
    }
  };

  const handleSubmitQuiz = () => {
    if (!questions || !evaluation) return;

    const responses = questions.map((question: Question) => ({
      questionId: question.id,
      answer: quizState.answers[question.id] || "",
    }));

    const timeTaken = Math.floor((new Date().getTime() - quizState.startTime.getTime()) / 1000 / 60); // in minutes

    submitQuizMutation.mutate({
      evaluationId: evaluation?.id,
      responses,
      timeTaken,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgressPercentage = () => {
    if (!questions) return 0;
    return Math.round(((quizState.currentQuestion + 1) / questions.length) * 100);
  };

  const getAnsweredCount = () => {
    return Object.keys(quizState.answers).length;
  };

  if (evaluationLoading || questionsLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!evaluation || !questions) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Quiz Not Found</h2>
            <p className="text-gray-600 mb-4">The requested quiz could not be found.</p>
            <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[quizState.currentQuestion];

  if (quizState.isSubmitted) {
    return (
      <div className="container mx-auto p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {quizState.isPassed ? (
                <Trophy className="h-16 w-16 text-yellow-500" />
              ) : (
                <CheckCircle className="h-16 w-16 text-blue-500" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {quizState.isPassed ? "Congratulations!" : "Quiz Completed"}
            </CardTitle>
            <CardDescription>
              {evaluation.title} - {evaluation.evaluationType}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-600">
                {quizState.score} / {evaluation.totalQuestions}
              </div>
              <div className="text-lg">
                {Math.round((quizState.score! / evaluation.totalQuestions) * 100)}%
              </div>
              <Badge variant={quizState.isPassed ? "default" : "secondary"}>
                {quizState.isPassed ? "Passed" : "Not Passed"}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Passing Score:</span>
                <span>{evaluation.passingScore}%</span>
              </div>
              <div className="flex justify-between">
                <span>Questions Answered:</span>
                <span>{getAnsweredCount()} / {questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Time Taken:</span>
                <span>{formatTime(evaluation.timeLimit ? evaluation.timeLimit * 60 - quizState.timeRemaining : 0)}</span>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate("/")}
                variant="outline"
              >
                Back to Dashboard
              </Button>
              <Button 
                onClick={() => navigate(`/lesson/${evaluation.lessonId || evaluation.moduleId}`)}
              >
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        {/* Quiz Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{evaluation.title}</CardTitle>
                <CardDescription>{evaluation.description}</CardDescription>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="outline">
                    {evaluation.evaluationType.charAt(0).toUpperCase() + evaluation.evaluationType.slice(1)}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {evaluation.totalQuestions} questions
                  </span>
                  <span className="text-sm text-gray-600">
                    Passing: {evaluation.passingScore}%
                  </span>
                </div>
              </div>
              {evaluation.timeLimit && (
                <div className="text-center">
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <Clock className="h-5 w-5" />
                    <span className={quizState.timeRemaining < 300 ? "text-red-600" : "text-blue-600"}>
                      {formatTime(quizState.timeRemaining)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">Time Remaining</div>
                </div>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-600">
                Question {quizState.currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Answered: {getAnsweredCount()}</span>
              <span>Remaining: {questions.length - getAnsweredCount()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">
              Question {quizState.currentQuestion + 1}
              <span className="text-sm font-normal text-gray-600 ml-2">
                ({currentQuestion.points} {currentQuestion.points === 1 ? 'point' : 'points'})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-base leading-relaxed">
              {currentQuestion.questionText}
            </div>

            <div className="space-y-3">
              {currentQuestion.questionType === "multiple_choice" && currentQuestion.options && (
                <RadioGroup
                  value={quizState.answers[currentQuestion.id] || ""}
                  onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                >
                  {currentQuestion.options.map((option: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestion.questionType === "true_false" && (
                <RadioGroup
                  value={quizState.answers[currentQuestion.id] || ""}
                  onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="true" />
                    <Label htmlFor="true" className="cursor-pointer">True</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="false" />
                    <Label htmlFor="false" className="cursor-pointer">False</Label>
                  </div>
                </RadioGroup>
              )}

              {currentQuestion.questionType === "open_ended" && (
                <Textarea
                  value={quizState.answers[currentQuestion.id] || ""}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  placeholder="Enter your answer here..."
                  className="min-h-[100px]"
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={quizState.currentQuestion === 0}
          >
            Previous
          </Button>

          <div className="flex gap-2">
            {questions.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => setQuizState(prev => ({ ...prev, currentQuestion: index }))}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  index === quizState.currentQuestion
                    ? "bg-blue-600 text-white"
                    : quizState.answers[questions[index].id]
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-gray-100 text-gray-600 border border-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {quizState.currentQuestion === questions.length - 1 ? (
            <Button
              onClick={handleSubmitQuiz}
              disabled={submitQuizMutation.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              {submitQuizMutation.isPending ? "Submitting..." : "Submit Quiz"}
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              disabled={quizState.currentQuestion === questions.length - 1}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}