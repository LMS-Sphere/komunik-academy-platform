import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, User } from "lucide-react";

const events = [
  {
    id: 1,
    title: "React Fundamentals - Live Session",
    time: "10:00 AM - 11:30 AM",
    date: "Today",
    instructor: "Alice Johnson",
    attendees: 24,
    type: "live-session"
  },
  {
    id: 2,
    title: "MongoDB Workshop",
    time: "2:00 PM - 4:00 PM",
    date: "Tomorrow",
    instructor: "Bob Smith",
    attendees: 18,
    type: "workshop"
  },
  {
    id: 3,
    title: "JavaScript Assessment",
    time: "9:00 AM - 10:00 AM",
    date: "Dec 15",
    instructor: "System",
    attendees: 45,
    type: "assessment"
  }
];

export default function Calendar() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground text-lg">
            Schedule and manage your learning sessions
          </p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Schedule Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className={`w-4 h-4 rounded-full ${
                    event.type === 'live-session' ? 'bg-success' :
                    event.type === 'workshop' ? 'bg-warning' :
                    'bg-info'
                  }`}></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{event.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{event.date}</div>
                    <div className="text-xs text-muted-foreground">{event.instructor}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle>Quick Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Schedule Session
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                Set Reminder
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <User className="mr-2 h-4 w-4" />
                Invite Students
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}