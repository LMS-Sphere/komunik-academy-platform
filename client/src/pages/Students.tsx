import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Search, BookOpen, Calendar } from "lucide-react";

const students = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    avatar: "/api/placeholder/40/40",
    coursesEnrolled: 3,
    completedCourses: 1,
    progress: 75,
    lastActive: "2 hours ago",
    status: "Active"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@email.com",
    avatar: "/api/placeholder/40/40",
    coursesEnrolled: 2,
    completedCourses: 0,
    progress: 45,
    lastActive: "1 day ago",
    status: "Active"
  },
  {
    id: 3,
    name: "Carol Williams",
    email: "carol.williams@email.com",
    avatar: "/api/placeholder/40/40",
    coursesEnrolled: 4,
    completedCourses: 2,
    progress: 90,
    lastActive: "30 minutes ago",
    status: "Active"
  },
  {
    id: 4,
    name: "David Brown",
    email: "david.brown@email.com",
    avatar: "/api/placeholder/40/40",
    coursesEnrolled: 1,
    completedCourses: 0,
    progress: 25,
    lastActive: "3 days ago",
    status: "Inactive"
  },
  {
    id: 5,
    name: "Emma Davis",
    email: "emma.davis@email.com",
    avatar: "/api/placeholder/40/40",
    coursesEnrolled: 5,
    completedCourses: 3,
    progress: 85,
    lastActive: "1 hour ago",
    status: "Active"
  },
  {
    id: 6,
    name: "Frank Wilson",
    email: "frank.wilson@email.com",
    avatar: "/api/placeholder/40/40",
    coursesEnrolled: 2,
    completedCourses: 1,
    progress: 60,
    lastActive: "5 hours ago",
    status: "Active"
  }
];

export default function Students() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground text-lg">
            Manage learners and track their progress
          </p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          <User className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search students..."
            className="pl-10 bg-muted/50 border-0"
          />
        </div>
        <Button variant="outline">All Status</Button>
        <Button variant="outline">Sort by Progress</Button>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <Card key={student.id} className="shadow-soft border-0 hover:shadow-medium transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <CardTitle className="text-lg">{student.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  student.status === 'Active' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {student.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-medium">{student.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${student.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{student.coursesEnrolled}</div>
                    <div className="text-muted-foreground text-xs">Enrolled</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{student.completedCourses}</div>
                    <div className="text-muted-foreground text-xs">Completed</div>
                  </div>
                </div>
              </div>

              {/* Last Activity */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  Last active: {student.lastActive}
                </span>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}