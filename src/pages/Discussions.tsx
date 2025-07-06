import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Search, User } from "lucide-react";

const discussions = [
  {
    id: 1,
    title: "Understanding React Hooks",
    author: "Alice Johnson",
    authorAvatar: "/api/placeholder/32/32",
    course: "React Development",
    replies: 12,
    lastReply: "2 hours ago",
    isActive: true,
    excerpt: "Can someone explain the difference between useState and useEffect?"
  },
  {
    id: 2,
    title: "MongoDB Connection Issues",
    author: "Bob Smith",
    authorAvatar: "/api/placeholder/32/32",
    course: "MongoDB Basics",
    replies: 8,
    lastReply: "5 hours ago",
    isActive: true,
    excerpt: "Having trouble connecting to MongoDB Atlas. Getting timeout errors..."
  },
  {
    id: 3,
    title: "Best Practices for API Design",
    author: "Carol Williams",
    authorAvatar: "/api/placeholder/32/32",
    course: "API Design",
    replies: 15,
    lastReply: "1 day ago",
    isActive: false,
    excerpt: "What are the current best practices for RESTful API design in 2024?"
  },
  {
    id: 4,
    title: "JavaScript Async/Await vs Promises",
    author: "David Brown",
    authorAvatar: "/api/placeholder/32/32",
    course: "JavaScript Fundamentals",
    replies: 6,
    lastReply: "3 hours ago",
    isActive: true,
    excerpt: "When should I use async/await over traditional promises?"
  },
  {
    id: 5,
    title: "Node.js Performance Optimization",
    author: "Emma Davis",
    authorAvatar: "/api/placeholder/32/32",
    course: "Node.js Backend",
    replies: 20,
    lastReply: "30 minutes ago",
    isActive: true,
    excerpt: "Tips for optimizing Node.js applications for better performance?"
  }
];

export default function Discussions() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Discussions</h1>
          <p className="text-muted-foreground text-lg">
            "Parlez afin que je puisse vous voir" - Socrates
          </p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          <MessageSquare className="mr-2 h-4 w-4" />
          Start Discussion
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search discussions..."
            className="pl-10 bg-muted/50 border-0"
          />
        </div>
        <Button variant="outline">All Courses</Button>
        <Button variant="outline">Active Only</Button>
      </div>

      {/* Discussions List */}
      <div className="space-y-4">
        {discussions.map((discussion) => (
          <Card key={discussion.id} className="shadow-soft border-0 hover:shadow-medium transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={discussion.authorAvatar} alt={discussion.author} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {discussion.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg hover:text-primary cursor-pointer transition-colors">
                        {discussion.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">by {discussion.author}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">in {discussion.course}</span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      discussion.isActive 
                        ? 'bg-success/10 text-success' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {discussion.isActive ? 'Active' : 'Closed'}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {discussion.excerpt}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{discussion.replies} replies</span>
                  </div>
                  <span>Last reply {discussion.lastReply}</span>
                </div>
                <Button variant="outline" size="sm">
                  View Discussion
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {discussions.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium text-foreground">No discussions yet</h3>
          <p className="mt-2 text-muted-foreground">
            Start the conversation by creating your first discussion.
          </p>
          <Button className="mt-4 bg-gradient-primary hover:bg-primary-hover">
            <MessageSquare className="mr-2 h-4 w-4" />
            Start Discussion
          </Button>
        </div>
      )}
    </div>
  );
}