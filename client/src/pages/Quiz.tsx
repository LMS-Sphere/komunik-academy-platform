import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Trophy, 
  Target, 
  TrendingUp, 
  BookOpen, 
  AlertTriangle 
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  questionText: string;
  questionType: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  options: string[] | null;
  correctAnswer: string;
  points: number;
  order: number;
  userAnswer?: string;
  isAnswered?: boolean;
}

interface Evaluation {
  id: number;
  title: string;
  description: string;
  evaluationType: 'quiz' | 'exam';
  totalPoints: number;
  passingScore: number;
  timeLimit: number;
  isActive: boolean;
}

export default function Quiz() {
  const [match, params] = useRoute('/quiz/:type/:id');
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (params?.type && params?.id) {
      // Mock evaluation and questions data
      const mockEvaluation: Evaluation = {
        id: 1,
        title: params.type === 'lesson' ? 'Lesson Quiz' : 'Module Exam',
        description: params.type === 'lesson' 
          ? 'Test your knowledge on this lesson'
          : 'Comprehensive assessment of your module skills',
        evaluationType: params.type === 'lesson' ? 'quiz' : 'exam',
        totalPoints: 100,
        passingScore: 70,
        timeLimit: params.type === 'lesson' ? 15 : 60, // 15 min for quiz, 60 for exam
        isActive: true,
      };

      const mockQuestions: QuizQuestion[] = [
        {
          id: 1,
          questionText: "What is the main function of a CRM?",
          questionType: 'multiple_choice',
          options: [
            "Manage customer relationships",
            "Create websites",
            "Analyze financial data",
            "Develop applications"
          ],
          correctAnswer: "Manage customer relationships",
          points: 20,
          order: 1,
        },
        {
          id: 2,
          questionText: "Does Sphere CRM allow task automation?",
          questionType: 'true_false',
          options: ["True", "False"],
          correctAnswer: "True",
          points: 15,
          order: 2,
        },
        {
          id: 3,
          questionText: "Briefly describe the benefits of using a CRM for a business.",
          questionType: 'short_answer',
          options: null,
          correctAnswer: "Improved customer relationships, better sales tracking, enhanced communication, increased efficiency",
          points: 25,
          order: 3,
        },
        {
          id: 4,
          questionText: "Which of the following are core CRM features?",
          questionType: 'multiple_choice',
          options: [
            "Contact management and sales tracking",
            "Video editing and image processing",
            "Web development and hosting",
            "Financial accounting and payroll"
          ],
          correctAnswer: "Contact management and sales tracking",
          points: 20,
          order: 4,
        },
        {
          id: 5,
          questionText: "CRM systems help businesses reduce customer acquisition costs.",
          questionType: 'true_false',
          options: ["True", "False"],
          correctAnswer: "True",
          points: 20,
          order: 5,
        }
      ];

      setEvaluation(mockEvaluation);
      setQuestions(mockQuestions);
      setTimeRemaining(mockEvaluation.timeLimit * 60); // Convert to seconds
    }
  }, [params]);

  // Timer effect
  useEffect(() => {
    if (timeRemaining && timeRemaining > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev ? prev - 1 : 0);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeRemaining, isSubmitted]);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, userAnswer: answer, isAnswered: true }
        : q
    ));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let totalScore = 0;
    questions.forEach(question => {
      if (question.userAnswer === question.correctAnswer) {
        totalScore += question.points;
      }
    });
    
    setScore(totalScore);
    setIsSubmitted(true);
    setShowResults(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!evaluation || questions.length === 0) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Loading Quiz</h2>
          <p className="text-gray-600 dark:text-gray-400">Please wait while we load your assessment...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    const passed = score! >= evaluation.passingScore;
    const scorePercentage = (score! / evaluation.totalPoints) * 100;

    return (
      <div className="p-6 space-y-6">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className={`relative rounded-3xl p-8 text-white overflow-hidden ${
            passed ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-red-600 to-pink-600'
          }`}>
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                {passed ? (
                  <Trophy className="h-12 w-12 text-white" />
                ) : (
                  <XCircle className="h-12 w-12 text-white" />
                )}
              </div>
              <h1 className="text-4xl font-bold mb-4">
                {passed ? 'Congratulations!' : 'Better Luck Next Time'}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {passed 
                  ? 'You have successfully passed the assessment!'
                  : 'You did not meet the passing score this time.'}
              </p>
              <div className="flex justify-center gap-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                  <span className="text-2xl font-bold">{score}/{evaluation.totalPoints}</span>
                  <p className="text-sm opacity-90">Total Score</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                  <span className="text-2xl font-bold">{scorePercentage.toFixed(1)}%</span>
                  <p className="text-sm opacity-90">Percentage</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Question Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {questions.map((question, index) => {
                  const isCorrect = question.userAnswer === question.correctAnswer;
                  
                  return (
                    <div key={question.id} className="border rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${
                          isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <XCircle className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">Question {index + 1}</h3>
                            <Badge variant={isCorrect ? 'default' : 'destructive'}>
                              {isCorrect ? `+${question.points}` : '0'} points
                            </Badge>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-3">{question.questionText}</p>
                          
                          {question.questionType !== 'short_answer' && question.questionType !== 'essay' && (
                            <div className="space-y-2">
                              {question.options?.map((option, optionIndex) => (
                                <div key={optionIndex} className={`p-2 rounded border ${
                                  option === question.correctAnswer ? 'bg-green-50 border-green-200' :
                                  option === question.userAnswer ? 'bg-red-50 border-red-200' :
                                  'bg-gray-50 border-gray-200'
                                }`}>
                                  <div className="flex items-center gap-2">
                                    {option === question.correctAnswer && (
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    )}
                                    {option === question.userAnswer && option !== question.correctAnswer && (
                                      <XCircle className="h-4 w-4 text-red-600" />
                                    )}
                                    <span>{option}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {(question.questionType === 'short_answer' || question.questionType === 'essay') && (
                            <div className="space-y-2">
                              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded border">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Your Answer:</p>
                                <p className="mt-1">{question.userAnswer || 'No answer provided'}</p>
                              </div>
                              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200">
                                <p className="text-sm font-medium text-green-600">Sample Answer:</p>
                                <p className="mt-1 text-green-700 dark:text-green-300">{question.correctAnswer}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Button>
            {!passed && (
              <Button onClick={() => window.location.reload()}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Retry Assessment
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = questions.filter(q => q.isAnswered).length;
  const progressPercentage = (answeredCount / questions.length) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{evaluation.title}</h1>
              <p className="text-white/90">{evaluation.description}</p>
            </div>
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-xl font-mono">
                    {timeRemaining ? formatTime(timeRemaining) : '00:00'}
                  </span>
                </div>
                <p className="text-sm opacity-90">Time Remaining</p>
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                Question {currentQuestionIndex + 1} of {questions.length}
              </CardTitle>
              <Badge variant="outline" className="text-sm">
                {currentQuestion.points} points
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-lg font-medium text-gray-800 dark:text-gray-200">
              {currentQuestion.questionText}
            </div>

            {/* Answer Options */}
            <div className="space-y-4">
              {currentQuestion.questionType === 'multiple_choice' && (
                <RadioGroup
                  value={currentQuestion.userAnswer || ''}
                  onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                >
                  {currentQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestion.questionType === 'true_false' && (
                <RadioGroup
                  value={currentQuestion.userAnswer || ''}
                  onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <RadioGroupItem value="True" id="true" />
                    <Label htmlFor="true" className="flex-1 cursor-pointer">True</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <RadioGroupItem value="False" id="false" />
                    <Label htmlFor="false" className="flex-1 cursor-pointer">False</Label>
                  </div>
                </RadioGroup>
              )}

              {(currentQuestion.questionType === 'short_answer' || currentQuestion.questionType === 'essay') && (
                <Textarea
                  placeholder="Type your answer here..."
                  value={currentQuestion.userAnswer || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  rows={currentQuestion.questionType === 'essay' ? 8 : 4}
                  className="w-full"
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Progress Summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm">
              <span>Progress: {answeredCount}/{questions.length} questions answered</span>
              <span>{Math.round(progressPercentage)}% completed</span>
            </div>
            <Progress value={progressPercentage} className="h-2 mt-2" />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <div className="flex gap-2">
            {currentQuestionIndex === questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
                disabled={isSubmitted}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Submit Assessment
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Quick Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((question, index) => (
                <Button
                  key={question.id}
                  variant={currentQuestionIndex === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`relative ${
                    question.isAnswered ? 'border-green-500' : ''
                  }`}
                >
                  {index + 1}
                  {question.isAnswered && (
                    <CheckCircle className="h-3 w-3 absolute -top-1 -right-1 text-green-600 bg-white rounded-full" />
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}