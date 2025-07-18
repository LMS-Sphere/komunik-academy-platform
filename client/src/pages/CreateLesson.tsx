import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Upload, 
  Plus, 
  Trash2, 
  FileText, 
  Video, 
  Image as ImageIcon, 
  Volume2, 
  Type 
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function CreateLesson() {
  const { toast } = useToast();
  
  const [lesson, setLesson] = useState({
    title: '',
    description: '',
    lessonType: 'video' as 'video' | 'pdf' | 'image' | 'audio' | 'text',
    duration: 0,
    content: '',
    objectives: [''],
    contentFile: null as File | null,
  });

  const [quiz, setQuiz] = useState({
    title: '',
    questions: [{
      questionText: '',
      questionType: 'multiple_choice' as 'multiple_choice' | 'true_false' | 'short_answer' | 'essay',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 10,
    }]
  });

  const lessonTypeIcons = {
    video: Video,
    pdf: FileText,
    image: ImageIcon,
    audio: Volume2,
    text: Type,
  };

  const lessonTypeLabels = {
    video: 'Video',
    pdf: 'PDF Document',
    image: 'Image',
    audio: 'Audio',
    text: 'Text',
  };

  const handleLessonChange = (field: string, value: any) => {
    setLesson(prev => ({ ...prev, [field]: value }));
  };

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...lesson.objectives];
    newObjectives[index] = value;
    setLesson(prev => ({ ...prev, objectives: newObjectives }));
  };

  const addObjective = () => {
    setLesson(prev => ({ ...prev, objectives: [...prev.objectives, ''] }));
  };

  const removeObjective = (index: number) => {
    if (lesson.objectives.length > 1) {
      const newObjectives = lesson.objectives.filter((_, i) => i !== index);
      setLesson(prev => ({ ...prev, objectives: newObjectives }));
    }
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuiz(prev => ({ ...prev, questions: newQuestions }));
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...quiz.questions];
    const newOptions = [...newQuestions[questionIndex].options];
    newOptions[optionIndex] = value;
    newQuestions[questionIndex] = { ...newQuestions[questionIndex], options: newOptions };
    setQuiz(prev => ({ ...prev, questions: newQuestions }));
  };

  const addQuestion = () => {
    setQuiz(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          questionText: '',
          questionType: 'multiple_choice',
          options: ['', '', '', ''],
          correctAnswer: '',
          points: 10,
        }
      ]
    }));
  };

  const removeQuestion = (index: number) => {
    if (quiz.questions.length > 1) {
      const newQuestions = quiz.questions.filter((_, i) => i !== index);
      setQuiz(prev => ({ ...prev, questions: newQuestions }));
    }
  };

  const handleFileUpload = (file: File) => {
    setLesson(prev => ({ ...prev, contentFile: file }));
  };

  const handleSave = () => {
    // Validation
    if (!lesson.title || !lesson.description) {
      toast({
        title: "Validation Error",
        description: "Title and description are required.",
        variant: "destructive"
      });
      return;
    }

    // Save lesson and quiz to backend
    console.log('Saving lesson:', lesson);
    console.log('Saving quiz:', quiz);
    
    toast({
      title: "Success",
      description: "Lesson created successfully!",
    });
  };

  const renderLessonTypeSelector = () => {
    return (
      <div className="grid grid-cols-5 gap-3">
        {Object.entries(lessonTypeIcons).map(([type, Icon]) => (
          <button
            key={type}
            onClick={() => handleLessonChange('lessonType', type)}
            className={`p-4 border rounded-lg text-center transition-colors ${
              lesson.lessonType === type
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Icon className="h-8 w-8 mx-auto mb-2" />
            <span className="text-sm font-medium">
              {lessonTypeLabels[type as keyof typeof lessonTypeLabels]}
            </span>
          </button>
        ))}
      </div>
    );
  };

  const renderContentUpload = () => {
    if (lesson.lessonType === 'text') return null;

    return (
      <div className="space-y-4">
        <Label>Content File</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Drag and drop your file here or click to select
            </p>
            <input
              type="file"
              accept={
                lesson.lessonType === 'video' ? 'video/*' :
                lesson.lessonType === 'audio' ? 'audio/*' :
                lesson.lessonType === 'pdf' ? '.pdf' :
                lesson.lessonType === 'image' ? 'image/*' : '*'
              }
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              className="hidden"
              id="content-upload"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('content-upload')?.click()}
            >
              Choose File
            </Button>
          </div>
          {lesson.contentFile && (
            <div className="mt-4 p-3 bg-green-50 rounded border">
              <p className="text-sm text-green-700">
                File selected: {lesson.contentFile.name}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderQuestionForm = (question: any, index: number) => {
    return (
      <Card key={index} className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Question {index + 1}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{question.points} points</Badge>
              {quiz.questions.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeQuestion(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Question Text</Label>
            <Textarea
              value={question.questionText}
              onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
              placeholder="Enter your question..."
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Question Type</Label>
              <Select
                value={question.questionType}
                onValueChange={(value) => handleQuestionChange(index, 'questionType', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                  <SelectItem value="true_false">True/False</SelectItem>
                  <SelectItem value="short_answer">Short Answer</SelectItem>
                  <SelectItem value="essay">Essay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Points</Label>
              <Input
                type="number"
                value={question.points}
                onChange={(e) => handleQuestionChange(index, 'points', parseInt(e.target.value))}
                min="1"
                max="100"
              />
            </div>
          </div>

          {(question.questionType === 'multiple_choice' || question.questionType === 'true_false') && (
            <div className="space-y-3">
              <Label>Answer Options</Label>
              {question.questionType === 'true_false' ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`correct-${index}`}
                      checked={question.correctAnswer === 'True'}
                      onChange={() => handleQuestionChange(index, 'correctAnswer', 'True')}
                    />
                    <span>True (correct answer)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`correct-${index}`}
                      checked={question.correctAnswer === 'False'}
                      onChange={() => handleQuestionChange(index, 'correctAnswer', 'False')}
                    />
                    <span>False (correct answer)</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {question.options.map((option: string, optionIndex: number) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={question.correctAnswer === option}
                        onChange={() => handleQuestionChange(index, 'correctAnswer', option)}
                      />
                      <Input
                        value={option}
                        onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                        placeholder={`Option ${optionIndex + 1}`}
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create New Lesson
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add content and quiz for your module
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Lesson
        </Button>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Lesson Information */}
        <Card>
          <CardHeader>
            <CardTitle>Lesson Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Lesson Title</Label>
                <Input
                  id="title"
                  value={lesson.title}
                  onChange={(e) => handleLessonChange('title', e.target.value)}
                  placeholder="Ex: Introduction to CRM features"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={lesson.duration}
                  onChange={(e) => handleLessonChange('duration', parseInt(e.target.value))}
                  placeholder="15"
                  min="1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={lesson.description}
                onChange={(e) => handleLessonChange('description', e.target.value)}
                placeholder="Briefly describe the content of this lesson..."
                rows={3}
              />
            </div>

            <div>
              <Label>Content Type</Label>
              {renderLessonTypeSelector()}
            </div>

            {renderContentUpload()}

            {lesson.lessonType === 'text' && (
              <div>
                <Label htmlFor="content">Lesson Content</Label>
                <Textarea
                  id="content"
                  value={lesson.content}
                  onChange={(e) => handleLessonChange('content', e.target.value)}
                  placeholder="Enter the HTML content of your lesson..."
                  rows={8}
                />
              </div>
            )}

            <div>
              <Label>Learning Objectives</Label>
              <div className="space-y-2">
                {lesson.objectives.map((objective, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={objective}
                      onChange={(e) => handleObjectiveChange(index, e.target.value)}
                      placeholder={`Objective ${index + 1}`}
                      className="flex-1"
                    />
                    {lesson.objectives.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeObjective(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addObjective}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Objective
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Lesson Quiz</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Create a quiz to assess understanding of this lesson
                </p>
              </div>
              <Button
                variant="outline"
                onClick={addQuestion}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="quiz-title">Quiz Title</Label>
              <Input
                id="quiz-title"
                value={quiz.title}
                onChange={(e) => setQuiz(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Ex: Introduction to CRM Quiz"
              />
            </div>
            <div className="space-y-4">
              {quiz.questions.map((question, index) => renderQuestionForm(question, index))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}