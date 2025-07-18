import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard routes
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      const modules = await storage.getAllModules();
      const allProgress = await storage.getUserProgress(0); // Get all progress
      
      const stats = {
        totalLearners: users.filter(u => u.role === 'learner').length,
        activeModules: modules.filter(m => m.isActive).length,
        inProgress: allProgress.filter(p => p.completionPercentage > 0 && p.completionPercentage < 100).length,
        completed: allProgress.filter(p => p.completionPercentage === 100).length,
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  app.get("/api/dashboard/activities", async (req, res) => {
    try {
      // Mock recent activities - in a real app, this would come from activity logs
      const activities = [
        {
          id: 1,
          user: "Marie Dubois",
          action: "completed",
          target: "Introduction au CRM",
          timestamp: "2 hours ago",
          type: "lesson"
        },
        {
          id: 2,
          user: "Jean Dupont",
          action: "started",
          target: "Gestion Avancée des Prospects",
          timestamp: "3 hours ago",
          type: "module"
        }
      ];
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  });

  app.get("/api/dashboard/module-progress", async (req, res) => {
    try {
      const modules = await storage.getAllModules();
      const progress = modules.map(module => ({
        id: module.id,
        title: module.title,
        progress: Math.floor(Math.random() * 100), // Mock progress
        totalLessons: module.totalLessons,
        completedLessons: Math.floor(Math.random() * module.totalLessons),
      }));
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch module progress" });
    }
  });

  app.get("/api/dashboard/popular-modules", async (req, res) => {
    try {
      const modules = await storage.getAllModules();
      const popularModules = modules.map(module => ({
        id: module.id,
        title: module.title,
        description: module.description,
        level: module.level,
        duration: `${Math.floor(module.duration / 60)}h ${module.duration % 60}min`,
        lessons: module.totalLessons,
        rating: module.rating || 5,
        imageUrl: module.imageUrl,
        progress: Math.floor(Math.random() * 100),
        isCompleted: Math.random() > 0.7,
      }));
      res.json(popularModules);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch popular modules" });
    }
  });

  // User routes
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  // Evaluation routes
  app.get("/api/evaluations/:id", async (req, res) => {
    try {
      const evaluationId = parseInt(req.params.id);
      const evaluation = await storage.getEvaluationById(evaluationId);
      if (!evaluation) {
        return res.status(404).json({ error: "Evaluation not found" });
      }
      res.json(evaluation);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch evaluation" });
    }
  });

  app.get("/api/evaluations/:id/questions", async (req, res) => {
    try {
      const evaluationId = parseInt(req.params.id);
      const questions = await storage.getQuestionsByEvaluation(evaluationId);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  app.post("/api/evaluations/:id/submit", async (req, res) => {
    try {
      const evaluationId = parseInt(req.params.id);
      const { responses, timeTaken } = req.body;
      
      // Get evaluation and questions
      const evaluation = await storage.getEvaluationById(evaluationId);
      const questions = await storage.getQuestionsByEvaluation(evaluationId);
      
      if (!evaluation || !questions) {
        return res.status(404).json({ error: "Evaluation or questions not found" });
      }

      // Calculate score
      let score = 0;
      let totalPoints = 0;
      
      for (const question of questions) {
        totalPoints += question.points;
        const userResponse = responses.find((r: any) => r.questionId === question.id);
        
        if (userResponse && userResponse.answer === question.correctAnswer) {
          score += question.points;
        }
      }

      const percentage = Math.round((score / totalPoints) * 100);
      const isPassed = percentage >= evaluation.passingScore;

      // Save result (mock implementation)
      const result = {
        evaluationId,
        score,
        totalPoints,
        percentage,
        isPassed,
        timeTaken,
        responses,
      };

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to submit evaluation" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const user = await storage.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.updateUser(parseInt(req.params.id), req.body);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  // Module routes
  app.get("/api/modules", async (req, res) => {
    try {
      const modules = await storage.getAllModules();
      res.json(modules);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch modules" });
    }
  });

  app.get("/api/modules/:id", async (req, res) => {
    try {
      const module = await storage.getModule(parseInt(req.params.id));
      if (!module) {
        return res.status(404).json({ error: "Module not found" });
      }
      res.json(module);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch module" });
    }
  });

  app.post("/api/modules", async (req, res) => {
    try {
      const module = await storage.createModule(req.body);
      res.status(201).json(module);
    } catch (error) {
      res.status(500).json({ error: "Failed to create module" });
    }
  });

  app.put("/api/modules/:id", async (req, res) => {
    try {
      const module = await storage.updateModule(parseInt(req.params.id), req.body);
      if (!module) {
        return res.status(404).json({ error: "Module not found" });
      }
      res.json(module);
    } catch (error) {
      res.status(500).json({ error: "Failed to update module" });
    }
  });

  app.delete("/api/modules/:id", async (req, res) => {
    try {
      const success = await storage.deleteModule(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ error: "Module not found" });
      }
      res.json({ message: "Module deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete module" });
    }
  });

  // Lesson routes
  app.get("/api/lessons", async (req, res) => {
    try {
      const moduleId = req.query.moduleId ? parseInt(req.query.moduleId as string) : undefined;
      let lessons;
      
      if (moduleId) {
        lessons = await storage.getLessonsByModule(moduleId);
      } else {
        // Get all lessons - not implemented in interface, but we can simulate it
        const modules = await storage.getAllModules();
        lessons = [];
        for (const module of modules) {
          const moduleLessons = await storage.getLessonsByModule(module.id);
          lessons.push(...moduleLessons);
        }
      }
      
      // Add mock status and other display properties
      const lessonsWithStatus = lessons.map((lesson: any) => ({
        ...lesson,
        status: Math.random() > 0.7 ? 'completed' : Math.random() > 0.4 ? 'in-progress' : 'not-started',
        type: lesson.lessonType,
        enrolledCount: Math.floor(Math.random() * 500) + 100,
        rating: Math.floor(Math.random() * 2) + 4 // 4 or 5 stars
      }));
      
      res.json(lessonsWithStatus);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch lessons" });
    }
  });

  app.get("/api/lessons/:id", async (req, res) => {
    try {
      const lesson = await storage.getLesson(parseInt(req.params.id));
      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }
      res.json(lesson);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch lesson" });
    }
  });

  app.post("/api/lessons", async (req, res) => {
    try {
      const lesson = await storage.createLesson(req.body);
      res.status(201).json(lesson);
    } catch (error) {
      res.status(500).json({ error: "Failed to create lesson" });
    }
  });

  app.put("/api/lessons/:id", async (req, res) => {
    try {
      const lesson = await storage.updateLesson(parseInt(req.params.id), req.body);
      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }
      res.json(lesson);
    } catch (error) {
      res.status(500).json({ error: "Failed to update lesson" });
    }
  });

  app.delete("/api/lessons/:id", async (req, res) => {
    try {
      const success = await storage.deleteLesson(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ error: "Lesson not found" });
      }
      res.json({ message: "Lesson deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete lesson" });
    }
  });

  // Lesson comments route
  app.get("/api/lessons/:id/comments", async (req, res) => {
    try {
      // Mock comments for now - in a real app, this would come from a comments table
      const comments = [
        {
          id: 1,
          user: "Marie Dubois",
          message: "Great explanation of CRM fundamentals! Very clear and easy to understand.",
          timestamp: "2 hours ago"
        },
        {
          id: 2,
          user: "Jean Dupont",
          message: "This helped me understand the customer lifecycle better. Thanks!",
          timestamp: "5 hours ago"
        },
        {
          id: 3,
          user: "Sophie Martin",
          message: "Looking forward to the next lesson in this series.",
          timestamp: "1 day ago"
        }
      ];
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch lesson comments" });
    }
  });

  // User Progress routes
  app.get("/api/progress", async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : 1; // Default to user 1
      const moduleId = req.query.moduleId ? parseInt(req.query.moduleId as string) : undefined;
      const lessonId = req.query.lessonId ? parseInt(req.query.lessonId as string) : undefined;
      
      const progress = await storage.getUserProgress(userId, moduleId, lessonId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  app.post("/api/progress", async (req, res) => {
    try {
      const progress = await storage.createUserProgress(req.body);
      res.status(201).json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to create progress" });
    }
  });

  app.put("/api/progress/:id", async (req, res) => {
    try {
      const progress = await storage.updateUserProgress(parseInt(req.params.id), req.body);
      if (!progress) {
        return res.status(404).json({ error: "Progress not found" });
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to update progress" });
    }
  });

  // Evaluation routes
  app.get("/api/evaluations", async (req, res) => {
    try {
      const moduleId = req.query.moduleId ? parseInt(req.query.moduleId as string) : undefined;
      const lessonId = req.query.lessonId ? parseInt(req.query.lessonId as string) : undefined;
      
      let evaluations;
      if (moduleId) {
        evaluations = await storage.getEvaluationsByModule(moduleId);
      } else if (lessonId) {
        evaluations = await storage.getEvaluationsByLesson(lessonId);
      } else {
        // Get all evaluations - simulate this
        evaluations = [];
      }
      
      res.json(evaluations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch evaluations" });
    }
  });

  app.get("/api/evaluations/:id", async (req, res) => {
    try {
      const evaluation = await storage.getEvaluation(parseInt(req.params.id));
      if (!evaluation) {
        return res.status(404).json({ error: "Evaluation not found" });
      }
      res.json(evaluation);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch evaluation" });
    }
  });

  app.post("/api/evaluations", async (req, res) => {
    try {
      const evaluation = await storage.createEvaluation(req.body);
      res.status(201).json(evaluation);
    } catch (error) {
      res.status(500).json({ error: "Failed to create evaluation" });
    }
  });

  // Question routes
  app.get("/api/questions", async (req, res) => {
    try {
      const evaluationId = req.query.evaluationId ? parseInt(req.query.evaluationId as string) : undefined;
      const lessonId = req.query.lessonId ? parseInt(req.query.lessonId as string) : undefined;
      
      let questions;
      if (evaluationId) {
        questions = await storage.getQuestionsByEvaluation(evaluationId);
      } else if (lessonId) {
        questions = await storage.getQuestionsByLesson(lessonId);
      } else {
        questions = [];
      }
      
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  app.post("/api/questions", async (req, res) => {
    try {
      const question = await storage.createQuestion(req.body);
      res.status(201).json(question);
    } catch (error) {
      res.status(500).json({ error: "Failed to create question" });
    }
  });

  // Activity Log routes
  app.get("/api/activity/:userId", async (req, res) => {
    try {
      const activities = await storage.getActivityLog(parseInt(req.params.userId));
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activity log" });
    }
  });

  app.post("/api/activity", async (req, res) => {
    try {
      const activity = await storage.createActivityLog(req.body);
      res.status(201).json(activity);
    } catch (error) {
      res.status(500).json({ error: "Failed to create activity log" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
