import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Save, 
  Plus, 
  Trash2, 
  BookOpen, 
  Clock, 
  Users, 
  Trophy, 
  Target, 
  ArrowRight, 
  Eye, 
  Star 
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function CreateModule() {
  const { toast } = useToast();
  
  const [module, setModule] = useState({
    title: '',
    description: '',
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    estimatedDuration: 0,
    maxParticipants: 0,
    prerequisites: [''],
    learningObjectives: [''],
    imageUrl: '',
    tags: [''],
  });

  const [lessons, setLessons] = useState([{
    id: 1,
    title: '',
    description: '',
    lessonType: 'video' as 'video' | 'pdf' | 'image' | 'audio' | 'text',
    duration: 0,
    order: 1,
  }]);

  const [activeTab, setActiveTab] = useState('details');

  const handleModuleChange = (field: string, value: any) => {
    setModule(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayFieldChange = (field: string, index: number, value: string) => {
    const array = module[field as keyof typeof module] as string[];
    const newArray = [...array];
    newArray[index] = value;
    setModule(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayField = (field: string) => {
    const array = module[field as keyof typeof module] as string[];
    setModule(prev => ({ ...prev, [field]: [...array, ''] }));
  };

  const removeArrayField = (field: string, index: number) => {
    const array = module[field as keyof typeof module] as string[];
    if (array.length > 1) {
      const newArray = array.filter((_, i) => i !== index);
      setModule(prev => ({ ...prev, [field]: newArray }));
    }
  };

  const addLesson = () => {
    const newLesson = {
      id: lessons.length + 1,
      title: '',
      description: '',
      lessonType: 'video' as const,
      duration: 0,
      order: lessons.length + 1,
    };
    setLessons(prev => [...prev, newLesson]);
  };

  const updateLesson = (id: number, field: string, value: any) => {
    setLessons(prev => prev.map(lesson => 
      lesson.id === id ? { ...lesson, [field]: value } : lesson
    ));
  };

  const removeLesson = (id: number) => {
    if (lessons.length > 1) {
      setLessons(prev => prev.filter(lesson => lesson.id !== id));
    }
  };

  const handleSave = () => {
    // Validation
    if (!module.title || !module.description) {
      toast({
        title: "Validation Error",
        description: "Title and description are required.",
        variant: "destructive"
      });
      return;
    }

    // Save module and lessons
    console.log('Saving module:', module);
    console.log('Saving lessons:', lessons);
    
    toast({
      title: "Module created successfully",
      description: `Module "${module.title}" has been created with ${lessons.length} lesson(s).`,
    });
  };

  const levelColors = {
    beginner: 'bg-green-100 text-green-800 border-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    advanced: 'bg-red-100 text-red-800 border-red-200',
  };

  const levelLabels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };

  const lessonTypeIcons = {
    video: '🎥',
    pdf: '📄',
    image: '🖼️',
    audio: '🎵',
    text: '📝',
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create New Module
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Develop a comprehensive training module with lessons and assessments
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Module
        </Button>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header with Preview */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {module.title || 'New Training Module'}
              </h1>
              <p className="text-white/80 mb-4">
                {module.description || 'Describe your training module...'}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{module.estimatedDuration || 0} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{lessons.length} lesson(s)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{module.maxParticipants || 0} spots</span>
                </div>
                {module.level && (
                  <Badge className="bg-white/20 text-white border-white/30">
                    {levelLabels[module.level]}
                  </Badge>
                )}
              </div>
            </div>
            <div className="ml-8">
              <div className="w-32 h-32 bg-white/20 rounded-xl flex items-center justify-center">
                {module.imageUrl ? (
                  <img
                    src={module.imageUrl}
                    alt="Module"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <BookOpen className="h-16 w-16 text-white/60" />
                )}
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Module Details
            </TabsTrigger>
            <TabsTrigger value="lessons" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Lessons ({lessons.length})
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  General Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Module Title *</Label>
                      <Input
                        id="title"
                        value={module.title}
                        onChange={(e) => handleModuleChange('title', e.target.value)}
                        placeholder="Ex: Introduction to Sphere CRM"
                      />
                    </div>
                    <div>
                      <Label htmlFor="level">Difficulty Level</Label>
                      <Select
                        value={module.level}
                        onValueChange={(value) => handleModuleChange('level', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">🟢 Beginner</SelectItem>
                          <SelectItem value="intermediate">🟡 Intermediate</SelectItem>
                          <SelectItem value="advanced">🔴 Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="duration">Estimated Duration (min)</Label>
                        <Input
                          id="duration"
                          type="number"
                          value={module.estimatedDuration}
                          onChange={(e) => handleModuleChange('estimatedDuration', parseInt(e.target.value))}
                          placeholder="120"
                          min="1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="participants">Max Participants</Label>
                        <Input
                          id="participants"
                          type="number"
                          value={module.maxParticipants}
                          onChange={(e) => handleModuleChange('maxParticipants', parseInt(e.target.value))}
                          placeholder="50"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={module.description}
                        onChange={(e) => handleModuleChange('description', e.target.value)}
                        placeholder="Describe the content and objectives of this module..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">Module Image URL</Label>
                      <Input
                        id="image"
                        value={module.imageUrl}
                        onChange={(e) => handleModuleChange('imageUrl', e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Prerequisites</Label>
                    <div className="space-y-2">
                      {module.prerequisites.map((prerequisite, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={prerequisite}
                            onChange={(e) => handleArrayFieldChange('prerequisites', index, e.target.value)}
                            placeholder={`Prerequisite ${index + 1}`}
                            className="flex-1"
                          />
                          {module.prerequisites.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeArrayField('prerequisites', index)}
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
                        onClick={() => addArrayField('prerequisites')}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Prerequisite
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Learning Objectives</Label>
                    <div className="space-y-2">
                      {module.learningObjectives.map((objective, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={objective}
                            onChange={(e) => handleArrayFieldChange('learningObjectives', index, e.target.value)}
                            placeholder={`Objective ${index + 1}`}
                            className="flex-1"
                          />
                          {module.learningObjectives.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeArrayField('learningObjectives', index)}
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
                        onClick={() => addArrayField('learningObjectives')}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Objective
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Module Tags</Label>
                    <div className="space-y-2">
                      {module.tags.map((tag, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={tag}
                            onChange={(e) => handleArrayFieldChange('tags', index, e.target.value)}
                            placeholder={`Tag ${index + 1}`}
                            className="flex-1"
                          />
                          {module.tags.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeArrayField('tags', index)}
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
                        onClick={() => addArrayField('tags')}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Tag
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lessons" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Module Lessons</CardTitle>
                  <Button onClick={addLesson}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Lesson
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lessons.map((lesson, index) => (
                    <Card key={lesson.id} className="border-2 border-dashed border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Lesson {lesson.order}</Badge>
                            <span className="text-lg font-medium">
                              {lessonTypeIcons[lesson.lessonType]}
                            </span>
                          </div>
                          {lessons.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeLesson(lesson.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Lesson Title</Label>
                            <Input
                              value={lesson.title}
                              onChange={(e) => updateLesson(lesson.id, 'title', e.target.value)}
                              placeholder="Enter lesson title"
                            />
                          </div>
                          <div>
                            <Label>Type</Label>
                            <Select
                              value={lesson.lessonType}
                              onValueChange={(value) => updateLesson(lesson.id, 'lessonType', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="video">🎥 Video</SelectItem>
                                <SelectItem value="pdf">📄 PDF</SelectItem>
                                <SelectItem value="image">🖼️ Image</SelectItem>
                                <SelectItem value="audio">🎵 Audio</SelectItem>
                                <SelectItem value="text">📝 Text</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Duration (min)</Label>
                            <Input
                              type="number"
                              value={lesson.duration}
                              onChange={(e) => updateLesson(lesson.id, 'duration', parseInt(e.target.value))}
                              placeholder="15"
                              min="1"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Label>Description</Label>
                          <Textarea
                            value={lesson.description}
                            onChange={(e) => updateLesson(lesson.id, 'description', e.target.value)}
                            placeholder="Describe what this lesson covers..."
                            rows={2}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Module Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-6">
                    <div className="w-48 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      {module.imageUrl ? (
                        <img
                          src={module.imageUrl}
                          alt="Module"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <BookOpen className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{module.title || 'Module Title'}</h3>
                      <p className="text-gray-600 mb-4">{module.description || 'Module description...'}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <Badge className={levelColors[module.level]}>
                          {levelLabels[module.level]}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {module.estimatedDuration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {lessons.length} lessons
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Learning Objectives</h4>
                    <ul className="space-y-1">
                      {module.learningObjectives.filter(obj => obj).map((objective, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Course Content</h4>
                    <div className="space-y-2">
                      {lessons.map((lesson, index) => (
                        <div key={lesson.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <span className="text-lg">{lessonTypeIcons[lesson.lessonType]}</span>
                          <div className="flex-1">
                            <h5 className="font-medium">{lesson.title || `Lesson ${index + 1}`}</h5>
                            <p className="text-sm text-gray-600">{lesson.description || 'No description'}</p>
                          </div>
                          <span className="text-sm text-gray-500">{lesson.duration} min</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}