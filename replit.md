# Sphere LMS - Learning Management System

## Overview

Sphere LMS is a comprehensive Learning Management System built as a full-stack web application. It features a modern React frontend with TypeScript, a Node.js/Express backend, and PostgreSQL database integration through Drizzle ORM. The application provides a complete learning platform with role-based access control, course management, progress tracking, and interactive features.

**Current Status**: Successfully migrated from Replit Agent to Replit environment with enhanced architecture and blue theme implementation.

## User Preferences

Preferred communication style: Simple, everyday language.
Architecture preference: Logical project structure with proper client/server separation.
Design preference: Blue theme (Sphere-inspired) with professional appearance.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side navigation
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Query (TanStack Query) for server state
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL session store
- **API Structure**: RESTful API with `/api` prefix

### Database Schema
- **Users Table**: Stores user information with role-based access (admin, trainer, learner)
- **Modules Table**: Course modules with difficulty levels and trainer assignments
- **Lessons Table**: Individual lessons within modules (video, PDF, image content)
- **Progress Tracking**: User progress and completion tracking
- **Levels System**: Difficulty classification for courses

## Key Components

### Authentication & Authorization
- Role-based access control (admin, trainer, learner)
- Mock authentication system (ready for Laravel backend integration)
- Permission-based UI rendering and feature access

### Course Management
- Module creation and management
- Lesson organization with different content types
- Progress tracking and completion status
- Difficulty level classification

### User Interface
- Responsive sidebar navigation
- Dashboard with statistics and quick actions
- Course catalog with filtering and search
- Interactive lesson viewer
- Progress visualization

### Learning Features
- Sequential lesson unlocking
- Progress tracking with auto-save
- Multiple content types (video, PDF, images)
- Discussion forums
- Calendar integration
- Note-taking system

## Data Flow

1. **User Authentication**: Mock authentication with role-based permissions
2. **Course Discovery**: Browse modules filtered by difficulty and content
3. **Learning Path**: Sequential lesson progression with unlock mechanics
4. **Progress Tracking**: Real-time progress updates and completion tracking
5. **Data Persistence**: PostgreSQL storage through Drizzle ORM

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Query)
- Radix UI components for accessible primitives
- Tailwind CSS for styling
- Wouter for routing
- Date-fns for date manipulation

### Backend Dependencies
- Express.js for server framework
- Drizzle ORM for database operations
- Neon Database serverless driver
- PostgreSQL session store
- Zod for schema validation

### Development Tools
- Vite for build tooling
- TypeScript for type safety
- ESBuild for production builds
- Replit integration for development environment

## Deployment Strategy

### Development
- Vite dev server with HMR
- Express server with middleware mode
- Environment-based configuration
- Replit development integration

### Production
- Vite build for static assets
- ESBuild bundle for server code
- PostgreSQL database migrations
- Environment variable configuration

### Database Management
- Drizzle Kit for schema management
- Migration system for database updates
- Environment-specific database URLs
- Connection pooling through Neon

The application follows modern web development practices with a clear separation of concerns, type safety throughout the stack, and a scalable architecture that can accommodate future feature additions and user growth.

## Recent Changes

### Migration from Replit Agent to Replit Environment (July 18, 2025)
- ✅ Successfully migrated project architecture to proper Replit environment
- ✅ Implemented proper client/server separation for security
- ✅ Added comprehensive query client configuration with React Query
- ✅ Enhanced blue theme implementation (Sphere-inspired color scheme)
- ✅ Created proper lesson details page with routing
- ✅ Added lesson navigation and status tracking
- ✅ Implemented comprehensive lesson API endpoints
- ✅ Enhanced sidebar navigation with lessons page
- ✅ Added sample lesson data with various content types
- ✅ Implemented lesson comments functionality
- ✅ Added proper background gradients for modern appearance

### Quiz System Implementation (July 18, 2025)
- ✅ Corrected quiz logic architecture matching user requirements
- ✅ Implemented proper Module → Lesson → Quiz hierarchy
- ✅ Added individual lesson quizzes (lesson_quiz type)
- ✅ Added module final quizzes (module_final_quiz type)
- ✅ Created comprehensive quiz questions for all lessons
- ✅ Added timer functionality and scoring system
- ✅ Implemented quiz navigation from lesson details and module cards
- ✅ Added proper API endpoints for lesson and module quizzes
- ✅ Enhanced quiz routing with type-based parameter handling

### Key Architectural Improvements
- Added proper route handling for lesson details (`/lesson/:id`)
- Implemented wouter-based navigation system
- Enhanced API routes with proper error handling
- Added comprehensive lesson data with status tracking
- Implemented blue theme with HSL color variables
- Added proper TypeScript configuration for client/server separation
- Corrected quiz system with proper evaluation types

### Technical Enhancements
- Query client with proper caching and error handling
- Comprehensive lesson management system
- Enhanced UI components with blue theme
- Proper lesson status tracking (completed, in-progress, not-started)
- Multi-type lesson support (video, PDF, image, text)
- Interactive lesson details with progress tracking
- Complete quiz system with lesson and module evaluations