import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { ModuleDetails } from "@/components/modules/ModuleDetails";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Search, 
  Filter, 
  Plus,
  GraduationCap,
  TrendingUp,
  BarChart3,
  Award,
  Target
} from "lucide-react";

export default function Modules() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

  const { data: modules, isLoading } = useQuery({
    queryKey: ["/api/modules"],
    queryFn: async () => {
      const response = await fetch("/api/modules");
      if (!response.ok) throw new Error("Failed to fetch modules");
      return response.json();
    },
  });

  const filteredModules = modules?.filter((module: any) => {
    const levelMatch = selectedLevel === "all" || module.level === selectedLevel;
    const statusMatch = selectedStatus === "all" || module.status === selectedStatus;
    const categoryMatch = selectedCategory === "all" || module.category === selectedCategory;
    const searchMatch = !searchTerm || 
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return levelMatch && statusMatch && categoryMatch && searchMatch;
  });

  const handleModulePlay = (moduleId: number) => {
    setSelectedModuleId(moduleId);
  };

  const handleModuleEnroll = (moduleId: number) => {
    console.log('Enrolling in module:', moduleId);
  };

  const handleBackToModules = () => {
    setSelectedModuleId(null);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  const transformedModules = filteredModules?.map((module: any) => ({
    id: module.id,
    title: module.title,
    description: module.description,
    level: module.level,
    duration: formatDuration(module.duration),
    lessons: module.totalLessons,
    rating: module.rating || 5,
    imageUrl: module.imageUrl,
    progress: Math.floor(Math.random() * 100),
    isCompleted: Math.random() > 0.8,
    instructor: "Expert Trainer",
    enrollmentDate: "Recently",
    skills: ["CRM Management", "Customer Relations", "Sales Process"],
    prerequisites: ["Basic computer skills", "Understanding of business processes"],
    outcomes: [
      "Master the fundamentals of CRM systems",
      "Learn to manage customer relationships effectively",
      "Understand sales pipeline management",
      "Develop skills in lead generation and conversion"
    ]
  }));

  // If a module is selected, show its details
  if (selectedModuleId) {
    const selectedModule = transformedModules?.find((m: any) => m.id === selectedModuleId);
    if (selectedModule) {
      return (
        <ModuleDetails 
          module={selectedModule} 
          onBack={handleBackToModules}
        />
      );
    }
  }

  const statsData = [
    { label: "Total Modules", value: modules?.length || 0, icon: BookOpen, color: "text-blue-500" },
    { label: "Active", value: modules?.filter((m: any) => m.isActive).length || 0, icon: GraduationCap, color: "text-green-500" },
    { label: "Enrolled", value: 12, icon: Users, color: "text-purple-500" },
    { label: "Completed", value: 8, icon: Award, color: "text-yellow-500" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Learning Modules
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover, manage, and track your learning modules
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Module
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search modules..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="crm">CRM Training</SelectItem>
              <SelectItem value="sales">Sales Training</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grid" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {transformedModules?.map((module: any) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  onPlay={handleModulePlay}
                  onEnroll={handleModuleEnroll}
                  showProgress={true}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transformedModules?.map((module: any) => (
                  <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{module.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{module.description}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <Badge variant="secondary">{module.level}</Badge>
                          <span className="text-sm text-gray-500">{module.lessons} lessons</span>
                          <span className="text-sm text-gray-500">{module.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right mr-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{module.rating}</span>
                        </div>
                        <div className="text-sm text-gray-500">{module.progress}% complete</div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleModulePlay(module.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Module Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Completion Rate</span>
                    <span className="text-lg font-bold text-green-600">78%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Rating</span>
                    <span className="text-lg font-bold text-yellow-600">4.7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Enrollments</span>
                    <span className="text-lg font-bold text-blue-600">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Learners</span>
                    <span className="text-lg font-bold text-purple-600">892</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Top Performing Modules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transformedModules?.slice(0, 5).map((module: any, index: number) => (
                    <div key={module.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium text-gray-500">#{index + 1}</div>
                        <div>
                          <p className="font-medium">{module.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{module.progress}% avg completion</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{module.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Learning Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Monthly Goal</span>
                      <span>12/15 modules</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Quarterly Goal</span>
                      <span>28/45 modules</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Annual Goal</span>
                      <span>95/120 modules</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '79%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Module Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['CRM Training', 'Sales Training', 'Marketing', 'Technical', 'Leadership'].map((category, index) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm">{category}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{Math.floor(Math.random() * 20) + 5}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Empty State */}
      {!isLoading && (!transformedModules || transformedModules.length === 0) && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No modules found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm ? "Try adjusting your search or filters" : "Get started by creating your first learning module"}
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Module
          </Button>
        </div>
      )}
    </div>
  );
}