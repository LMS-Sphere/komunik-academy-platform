# Sphere LMS - Learning Management System

## Overview

Sphere LMS is a comprehensive Learning Management System built as a full-stack web application. It features a modern React frontend with TypeScript, a Node.js/Express backend, and PostgreSQL database integration through Drizzle ORM. The application provides a complete learning platform with role-based access control, course management, progress tracking, and interactive features.

## User Preferences

Preferred communication style: Simple, everyday language.

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