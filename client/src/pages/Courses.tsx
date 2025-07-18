import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Clock, Users, Star, Filter, Search, GraduationCap, Plus } from "lucide-react";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Courses() {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all modules
  const { data: modules, isLoading } = useQuery({
    queryKey: ["/api/modules"],
    queryFn: async () => {
      const response = await fetch("/api/modules");
      if (!response.ok) throw new Error("Failed to fetch modules");
      return response.json();
    },
  });

  // Filter modules based on level and search
  const filteredModules = modules?.filter((module: any) => {
    const levelMatch = selectedLevel === "all" || module.level === selectedLevel;
    const searchMatch = !searchTerm || 
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return levelMatch && searchMatch && module.isActive;
  });

  const handleModulePlay = (moduleId: number) => {
    // Navigate to module details or lesson viewer
    console.log('Playing module:', moduleId);
  };

  const handleModuleEnroll = (moduleId: number) => {
    // Handle enrollment
    console.log('Enrolling in module:', moduleId);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  // Transform modules for ModuleCard component
  const transformedModules = filteredModules?.map((module: any) => ({
    id: module.id,
    title: module.title,
    description: module.description,
    level: module.level,
    duration: formatDuration(module.duration),
    lessons: module.totalLessons,
    rating: module.rating || 5,
    imageUrl: module.imageUrl,
    progress: Math.floor(Math.random() * 100), // Mock progress
    isCompleted: Math.random() > 0.8,
    instructor: "Expert Trainer",
    enrollmentDate: "Recently"
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Learning Modules
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover and enroll in our comprehensive training modules
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Module
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
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
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="crm">CRM Training</SelectItem>
              <SelectItem value="sales">Sales Training</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Modules</p>
                <p className="text-xl font-bold">{modules?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
                <p className="text-xl font-bold">{filteredModules?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Enrolled</p>
                <p className="text-xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Modules Grid */}
      {!isLoading && transformedModules && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transformedModules.map((module: any) => (
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

      {/* Empty State */}
      {!isLoading && (!transformedModules || transformedModules.length === 0) && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No modules found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm || selectedLevel !== "all" 
              ? "Try adjusting your search or filters" 
              : "Get started by creating your first learning module"}
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