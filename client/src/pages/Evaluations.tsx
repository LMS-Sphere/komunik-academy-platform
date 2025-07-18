import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  ClipboardCheck, 
  Users, 
  TrendingUp, 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  BarChart3, 
  Target, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Award 
} from 'lucide-react';

export default function Evaluations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Mock evaluations data
  const evaluations = [
    {
      id: 1,
      title: 'Quiz - CRM Introduction',
      type: 'quiz',
      module: 'CRM Fundamentals',
      totalQuestions: 10,
      timeLimit: 15,
      passingScore: 70,
      attempts: 45,
      averageScore: 82,
      passRate: 87,
      createdAt: '2024-12-15',
      status: 'active'
    },
    {
      id: 2,
      title: 'Exam - Advanced Prospecting',
      type: 'exam',
      module: 'CRM Prospecting',
      totalQuestions: 25,
      timeLimit: 45,
      passingScore: 80,
      attempts: 23,
      averageScore: 78,
      passRate: 74,
      createdAt: '2024-12-20',
      status: 'active'
    },
    {
      id: 3,
      title: 'Quiz - System Configuration',
      type: 'quiz',
      module: 'Administration',
      totalQuestions: 15,
      timeLimit: 20,
      passingScore: 75,
      attempts: 18,
      averageScore: 85,
      passRate: 94,
      createdAt: '2024-12-22',
      status: 'active'
    }
  ];

  const recentResults = [
    {
      id: 1,
      userName: 'Marie Dubois',
      evaluationTitle: 'Quiz - CRM Introduction',
      score: 92,
      status: 'passed',
      completedAt: '2025-01-06 14:30',
      timeSpent: 12
    },
    {
      id: 2,
      userName: 'Pierre Martin',
      evaluationTitle: 'Exam - Advanced Prospecting',
      score: 76,
      status: 'failed',
      completedAt: '2025-01-06 10:15',
      timeSpent: 42
    }
  ];

  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesSearch = evaluation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || evaluation.type === filterType;
    return matchesSearch && matchesType;
  });

  const stats = {
    totalEvaluations: evaluations.length,
    totalAttempts: evaluations.reduce((sum, e) => sum + e.attempts, 0),
    averageScore: Math.round(evaluations.reduce((sum, e) => sum + e.averageScore, 0) / evaluations.length),
    passRate: Math.round(evaluations.reduce((sum, e) => sum + e.passRate, 0) / evaluations.length)
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Evaluation Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your quizzes, exams, and track performance
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Evaluation
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                Evaluation System
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Create, manage, and analyze all your training evaluations
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-sm font-medium">
                    📊 {stats.totalEvaluations} active evaluations
                  </span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-sm font-medium">
                    ✅ {stats.passRate}% average success rate
                  </span>
                </div>
              </div>
            </div>
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ClipboardCheck className="h-16 w-16 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                <ClipboardCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Evaluations</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalEvaluations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Attempts</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalAttempts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.passRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Manage Evaluations
            </CardTitle>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Evaluation
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by title or module..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="quiz">📝 Quiz</SelectItem>
                <SelectItem value="exam">🎓 Exam</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Evaluations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvaluations.map((evaluation) => (
          <Card key={evaluation.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{evaluation.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{evaluation.module}</p>
                </div>
                <Badge variant={evaluation.type === 'quiz' ? 'default' : 'secondary'}>
                  {evaluation.type === 'quiz' ? 'Quiz' : 'Exam'}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4 text-gray-500" />
                  <span>{evaluation.totalQuestions} questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{evaluation.timeLimit} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-gray-500" />
                  <span>Threshold: {evaluation.passingScore}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{evaluation.attempts} attempts</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Average Score</span>
                    <span className="font-medium">{evaluation.averageScore}%</span>
                  </div>
                  <Progress value={evaluation.averageScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Success Rate</span>
                    <span className="font-medium">{evaluation.passRate}%</span>
                  </div>
                  <Progress value={evaluation.passRate} className="h-2" />
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <span className="text-xs text-gray-500">
                  Created on {evaluation.createdAt}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Results */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentResults.map((result) => (
              <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    result.status === 'passed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {result.status === 'passed' ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{result.userName}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{result.evaluationTitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-semibold">{result.score}%</span>
                    <Badge variant={result.status === 'passed' ? 'default' : 'destructive'}>
                      {result.status === 'passed' ? 'Passed' : 'Failed'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">
                    {result.completedAt} • {result.timeSpent}min
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredEvaluations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ClipboardCheck className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No evaluations found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Create your first evaluation to get started"}
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Evaluation
          </Button>
        </div>
      )}
    </div>
  );
}