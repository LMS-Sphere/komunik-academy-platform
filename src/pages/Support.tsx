import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Ticket, Search, User } from "lucide-react";

const tickets = [
  {
    id: "REF001",
    subject: "Unable to access course materials",
    status: "Open",
    priority: "High",
    agent: "Support Team",
    createdAt: "2 hours ago",
    description: "Student unable to download course PDFs"
  },
  {
    id: "REF002", 
    subject: "Video playback issues",
    status: "In Progress",
    priority: "Medium",
    agent: "Tech Support",
    createdAt: "1 day ago",
    description: "Video lessons not loading properly"
  },
  {
    id: "REF003",
    subject: "Account access problem",
    status: "Resolved", 
    priority: "Low",
    agent: "Admin Team",
    createdAt: "3 days ago",
    description: "Password reset request completed"
  }
];

export default function Support() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Support</h1>
          <p className="text-muted-foreground text-lg">
            Manage support tickets and help requests
          </p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          <Ticket className="mr-2 h-4 w-4" />
          Create Ticket
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search tickets..."
            className="pl-10 bg-muted/50 border-0"
          />
        </div>
        <Button variant="outline">All Status</Button>
        <Button variant="outline">All Priority</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tickets List */}
        <div className="lg:col-span-2 space-y-4">
          {tickets.map((ticket) => (
            <Card key={ticket.id} className="shadow-soft border-0">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{ticket.subject}</CardTitle>
                      <span className="text-sm text-muted-foreground">#{ticket.id}</span>
                    </div>
                    <CardDescription>{ticket.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.status === 'Open' ? 'bg-destructive/10 text-destructive' :
                      ticket.status === 'In Progress' ? 'bg-warning/10 text-warning' :
                      'bg-success/10 text-success'
                    }`}>
                      {ticket.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.priority === 'High' ? 'bg-destructive/10 text-destructive' :
                      ticket.priority === 'Medium' ? 'bg-warning/10 text-warning' :
                      'bg-info/10 text-info'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{ticket.agent}</span>
                    </div>
                    <span>Created {ticket.createdAt}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    View Ticket
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle>Create New Ticket</CardTitle>
              <CardDescription>
                Submit a new support request
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Subject" />
              <Textarea placeholder="Describe your issue..." rows={4} />
              <Button className="w-full bg-gradient-primary hover:bg-primary-hover">
                Submit Ticket
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle>Support Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Open Tickets</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">In Progress</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Resolved Today</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg Response Time</span>
                <span className="font-medium">2.4h</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}