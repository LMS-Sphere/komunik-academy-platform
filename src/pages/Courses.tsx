import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, User, Calendar } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Learn the basics of JavaScript programming",
    students: 24,
    progress: 85,
    duration: "8 weeks",
    level: "Beginner",
    status: "Active"
  },
  {
    id: 2,
    title: "React Development",
    description: "Build modern web applications with React",
    students: 18,
    progress: 92,
    duration: "10 weeks",
    level: "Intermediate",
    status: "Active"
  },
  {
    id: 3,
    title: "Node.js Backend",
    description: "Server-side development with Node.js",
    students: 15,
    progress: 67,
    duration: "12 weeks",
    level: "Intermediate",
    status: "In Progress"
  },
  {
    id: 4,
    title: "MongoDB Basics",
    description: "NoSQL database fundamentals",
    students: 21,
    progress: 78,
    duration: "6 weeks",
    level: "Beginner",
    status: "Active"
  },
  {
    id: 5,
    title: "Full Stack Development",
    description: "Complete web development course",
    students: 12,
    progress: 45,
    duration: "16 weeks",
    level: "Advanced",
    status: "In Progress"
  },
  {
    id: 6,
    title: "API Design",
    description: "RESTful API development best practices",
    students: 19,
    progress: 60,
    duration: "8 weeks",
    level: "Intermediate",
    status: "Active"
  }
];

export default function Courses() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Courses</h1>
          <p className="text-muted-foreground text-lg">
            Manage your learning modules and track progress
          </p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          <BookOpen className="mr-2 h-4 w-4" />
          Create Course
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search courses..."
            className="pl-10 bg-muted/50 border-0"
          />
        </div>
        <Button variant="outline">All Levels</Button>
        <Button variant="outline">All Status</Button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="shadow-soft border-0 hover:shadow-medium transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {course.description}
                  </CardDescription>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.status === 'Active' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-warning/10 text-warning'
                }`}>
                  {course.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Course Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Level Badge */}
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.level === 'Beginner' ? 'bg-info/10 text-info' :
                  course.level === 'Intermediate' ? 'bg-warning/10 text-warning' :
                  'bg-destructive/10 text-destructive'
                }`}>
                  {course.level}
                </span>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State for No Results */}
      {courses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium text-foreground">No courses found</h3>
          <p className="mt-2 text-muted-foreground">
            Get started by creating your first course.
          </p>
          <Button className="mt-4 bg-gradient-primary hover:bg-primary-hover">
            <BookOpen className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </div>
      )}
    </div>
  );
}