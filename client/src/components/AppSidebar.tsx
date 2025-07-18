import { BookOpen, Calendar, MessageSquare, User, Search, FileText, Ticket } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Discussions", url: "/discussions", icon: MessageSquare },
  { title: "Courses", url: "/courses", icon: BookOpen },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Students", url: "/students", icon: User },
  { title: "Notes", url: "/notes", icon: FileText },
  { title: "Support", url: "/support", icon: Ticket },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path || (path === "/courses" && currentPath === "/");
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-sidebar border-r-0">
        {/* Brand/Logo Section */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-sidebar-foreground font-semibold text-lg">Sphere LMS</h1>
                <p className="text-sidebar-foreground/70 text-xs">Learning Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        {!isCollapsed && (
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sidebar-foreground/50 h-4 w-4" />
              <input
                type="text"
                placeholder="Recherche Globale..."
                className="w-full bg-sidebar-accent/30 text-sidebar-foreground placeholder:text-sidebar-foreground/50 border-0 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sidebar-ring"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sidebar-foreground/30 text-xs">
                Ctrl + Alt + K
              </div>
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mb-1">
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}