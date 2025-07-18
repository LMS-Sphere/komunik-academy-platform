import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Students from "./pages/Students";
import Discussions from "./pages/Discussions";
import Notes from "./pages/Notes";
import Calendar from "./pages/Calendar";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 overflow-auto">
                <Switch>
                  <Route path="/" component={Index} />
                  <Route path="/courses" component={Courses} />
                  <Route path="/students" component={Students} />
                  <Route path="/discussions" component={Discussions} />
                  <Route path="/notes" component={Notes} />
                  <Route path="/calendar" component={Calendar} />
                  <Route path="/support" component={Support} />
                  <Route component={NotFound} />
                </Switch>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
