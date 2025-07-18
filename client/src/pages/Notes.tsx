import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search } from "lucide-react";

const quote = "Prendre des notes, c'est faire des gammes de littérature.";
const author = "Jules Renard";

const notes = [
  {
    id: 1,
    title: "React Component Best Practices",
    content: "Key principles for writing maintainable React components: 1. Keep components small and focused 2. Use proper naming conventions...",
    course: "React Development",
    lastModified: "2 hours ago",
    tags: ["React", "Best Practices", "Components"]
  },
  {
    id: 2,
    title: "MongoDB Schema Design",
    content: "Important considerations for MongoDB schema design: 1. Embed vs Reference 2. Indexing strategies 3. Data modeling patterns...",
    course: "MongoDB Basics",
    lastModified: "1 day ago",
    tags: ["MongoDB", "Schema", "Database"]
  },
  {
    id: 3,
    title: "JavaScript ES6+ Features",
    content: "Modern JavaScript features to master: Arrow functions, destructuring, template literals, async/await, modules...",
    course: "JavaScript Fundamentals",
    lastModified: "3 days ago",
    tags: ["JavaScript", "ES6", "Modern JS"]
  },
  {
    id: 4,
    title: "API Security Guidelines",
    content: "Essential security practices for APIs: Authentication, authorization, input validation, rate limiting, HTTPS...",
    course: "API Design",
    lastModified: "5 hours ago",
    tags: ["API", "Security", "Backend"]
  }
];

export default function Notes() {
  return (
    <div className="p-8 space-y-8">
      {/* Header with Quote */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Notes</h1>
          <blockquote className="text-xl text-accent italic">
            "{quote}"
          </blockquote>
          <p className="text-muted-foreground">-- {author}</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search notes..."
            className="pl-10 bg-muted/50 border-0"
          />
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          <FileText className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Card key={note.id} className="shadow-soft border-0 hover:shadow-medium transition-shadow duration-200 h-fit">
            <CardHeader>
              <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{note.course}</span>
                <span>•</span>
                <span>{note.lastModified}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm line-clamp-4">
                {note.content}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {notes.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium text-foreground">No notes yet</h3>
          <p className="mt-2 text-muted-foreground">
            Start taking notes to capture your learning insights.
          </p>
          <Button className="mt-4 bg-gradient-primary hover:bg-primary-hover">
            <FileText className="mr-2 h-4 w-4" />
            Create First Note
          </Button>
        </div>
      )}
    </div>
  );
}