import { 
  users, modules, lessons, userProgress, questions, evaluations, userResponses, userEvaluationResults, activityLog,
  type User, type Module, type Lesson, type UserProgress, type Question, type Evaluation, type UserResponse, type UserEvaluationResult, type ActivityLog,
  type InsertUser, type InsertModule, type InsertLesson, type InsertUserProgress, type InsertQuestion, type InsertEvaluation, type InsertUserResponse, type InsertUserEvaluationResult, type InsertActivityLog
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  getUsersByRole(role: string): Promise<User[]>;

  // Modules
  getModule(id: number): Promise<Module | undefined>;
  getAllModules(): Promise<Module[]>;
  getModulesByLevel(level: string): Promise<Module[]>;
  createModule(module: InsertModule): Promise<Module>;
  updateModule(id: number, module: Partial<Module>): Promise<Module | undefined>;
  deleteModule(id: number): Promise<boolean>;
  getModulesByCreator(creatorId: number): Promise<Module[]>;

  // Lessons
  getLesson(id: number): Promise<Lesson | undefined>;
  getLessonsByModule(moduleId: number): Promise<Lesson[]>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  updateLesson(id: number, lesson: Partial<Lesson>): Promise<Lesson | undefined>;
  deleteLesson(id: number): Promise<boolean>;

  // User Progress
  getUserProgress(userId: number, moduleId?: number, lessonId?: number): Promise<UserProgress[]>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(id: number, progress: Partial<UserProgress>): Promise<UserProgress | undefined>;
  getUserModuleProgress(userId: number, moduleId: number): Promise<UserProgress | undefined>;

  // Questions
  getQuestion(id: number): Promise<Question | undefined>;
  getQuestionsByLesson(lessonId: number): Promise<Question[]>;
  getQuestionsByEvaluation(evaluationId: number): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  updateQuestion(id: number, question: Partial<Question>): Promise<Question | undefined>;
  deleteQuestion(id: number): Promise<boolean>;

  // Evaluations
  getEvaluation(id: number): Promise<Evaluation | undefined>;
  getEvaluationsByModule(moduleId: number): Promise<Evaluation[]>;
  getEvaluationsByLesson(lessonId: number): Promise<Evaluation[]>;
  createEvaluation(evaluation: InsertEvaluation): Promise<Evaluation>;
  updateEvaluation(id: number, evaluation: Partial<Evaluation>): Promise<Evaluation | undefined>;
  deleteEvaluation(id: number): Promise<boolean>;

  // User Responses
  getUserResponse(id: number): Promise<UserResponse | undefined>;
  getUserResponsesByEvaluation(userId: number, evaluationId: number): Promise<UserResponse[]>;
  createUserResponse(response: InsertUserResponse): Promise<UserResponse>;

  // User Evaluation Results
  getUserEvaluationResult(id: number): Promise<UserEvaluationResult | undefined>;
  getUserEvaluationResults(userId: number): Promise<UserEvaluationResult[]>;
  createUserEvaluationResult(result: InsertUserEvaluationResult): Promise<UserEvaluationResult>;

  // Activity Log
  getActivityLog(userId: number): Promise<ActivityLog[]>;
  createActivityLog(log: InsertActivityLog): Promise<ActivityLog>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private modules: Map<number, Module>;
  private lessons: Map<number, Lesson>;
  private userProgress: Map<number, UserProgress>;
  private questions: Map<number, Question>;
  private evaluations: Map<number, Evaluation>;
  private userResponses: Map<number, UserResponse>;
  private userEvaluationResults: Map<number, UserEvaluationResult>;
  private activityLog: Map<number, ActivityLog>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.modules = new Map();
    this.lessons = new Map();
    this.userProgress = new Map();
    this.questions = new Map();
    this.evaluations = new Map();
    this.userResponses = new Map();
    this.userEvaluationResults = new Map();
    this.activityLog = new Map();
    this.currentId = 1;
    
    // Initialize with some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create sample users
    const sampleUsers: User[] = [
      {
        id: 1,
        username: "admin",
        email: "admin@spherelms.com",
        password: "password123",
        firstName: "Admin",
        lastName: "User",
        role: "admin",
        avatar: "/api/placeholder/150/150",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: "trainer1",
        email: "trainer@spherelms.com",
        password: "password123",
        firstName: "Marie",
        lastName: "Dubois",
        role: "trainer",
        avatar: "/api/placeholder/150/150",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        username: "learner1",
        email: "learner@spherelms.com",
        password: "password123",
        firstName: "Jean",
        lastName: "Dupont",
        role: "learner",
        avatar: "/api/placeholder/150/150",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    sampleUsers.forEach(user => this.users.set(user.id, user));

    // Create sample modules
    const sampleModules: Module[] = [
      {
        id: 1,
        title: "Introduction à Sphere CRM",
        description: "Découvrez les bases du Customer Relationship Management avec Sphere. Apprenez à naviguer dans l'interface et à gérer vos premiers prospects.",
        level: "beginner",
        duration: 150,
        totalLessons: 8,
        rating: 5,
        imageUrl: "/api/placeholder/300/200",
        isActive: true,
        createdBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: "Gestion Avancée des Prospects",
        description: "Maîtrisez les techniques avancées de prospection et de conversion. Automatisez vos processus et optimisez votre pipeline de ventes.",
        level: "intermediate",
        duration: 195,
        totalLessons: 12,
        rating: 5,
        imageUrl: "/api/placeholder/300/200",
        isActive: true,
        createdBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    sampleModules.forEach(module => this.modules.set(module.id, module));

    // Create sample lessons
    const sampleLessons: Lesson[] = [
      {
        id: 1,
        moduleId: 1,
        title: "Introduction au CRM",
        description: "Découvrez les bases du Customer Relationship Management",
        content: "<p>Dans cette leçon, nous explorons les fondements du CRM...</p>",
        lessonType: "video",
        contentUrl: "/videos/lesson-1.mp4",
        duration: 15,
        order: 1,
        objectives: ["Comprendre les principes de base du CRM", "Identifier les fonctionnalités clés"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        moduleId: 1,
        title: "Navigation dans l'interface",
        description: "Apprenez à naviguer efficacement dans Sphere CRM",
        content: "<p>Cette leçon vous guide à travers l'interface utilisateur...</p>",
        lessonType: "video",
        contentUrl: "/videos/lesson-2.mp4",
        duration: 20,
        order: 2,
        objectives: ["Maîtriser la navigation", "Personnaliser l'interface"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    sampleLessons.forEach(lesson => this.lessons.set(lesson.id, lesson));

    this.currentId = 100; // Start IDs from 100 to avoid conflicts
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userUpdate: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser: User = { ...user, ...userUpdate, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getUsersByRole(role: string): Promise<User[]> {
    return Array.from(this.users.values()).filter(user => user.role === role);
  }

  // Module methods
  async getModule(id: number): Promise<Module | undefined> {
    return this.modules.get(id);
  }

  async getAllModules(): Promise<Module[]> {
    return Array.from(this.modules.values());
  }

  async getModulesByLevel(level: string): Promise<Module[]> {
    return Array.from(this.modules.values()).filter(module => module.level === level);
  }

  async createModule(insertModule: InsertModule): Promise<Module> {
    const id = this.currentId++;
    const module: Module = { 
      ...insertModule, 
      id, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    };
    this.modules.set(id, module);
    return module;
  }

  async updateModule(id: number, moduleUpdate: Partial<Module>): Promise<Module | undefined> {
    const module = this.modules.get(id);
    if (!module) return undefined;
    
    const updatedModule: Module = { ...module, ...moduleUpdate, updatedAt: new Date() };
    this.modules.set(id, updatedModule);
    return updatedModule;
  }

  async deleteModule(id: number): Promise<boolean> {
    return this.modules.delete(id);
  }

  async getModulesByCreator(creatorId: number): Promise<Module[]> {
    return Array.from(this.modules.values()).filter(module => module.createdBy === creatorId);
  }

  // Lesson methods
  async getLesson(id: number): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }

  async getLessonsByModule(moduleId: number): Promise<Lesson[]> {
    return Array.from(this.lessons.values())
      .filter(lesson => lesson.moduleId === moduleId)
      .sort((a, b) => a.order - b.order);
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const id = this.currentId++;
    const lesson: Lesson = { 
      ...insertLesson, 
      id, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    };
    this.lessons.set(id, lesson);
    return lesson;
  }

  async updateLesson(id: number, lessonUpdate: Partial<Lesson>): Promise<Lesson | undefined> {
    const lesson = this.lessons.get(id);
    if (!lesson) return undefined;
    
    const updatedLesson: Lesson = { ...lesson, ...lessonUpdate, updatedAt: new Date() };
    this.lessons.set(id, updatedLesson);
    return updatedLesson;
  }

  async deleteLesson(id: number): Promise<boolean> {
    return this.lessons.delete(id);
  }

  // User Progress methods
  async getUserProgress(userId: number, moduleId?: number, lessonId?: number): Promise<UserProgress[]> {
    let progress = Array.from(this.userProgress.values()).filter(p => p.userId === userId);
    
    if (moduleId) {
      progress = progress.filter(p => p.moduleId === moduleId);
    }
    
    if (lessonId) {
      progress = progress.filter(p => p.lessonId === lessonId);
    }
    
    return progress;
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = this.currentId++;
    const progress: UserProgress = { 
      ...insertProgress, 
      id, 
      lastAccessedAt: new Date(),
      completedAt: insertProgress.isCompleted ? new Date() : null
    };
    this.userProgress.set(id, progress);
    return progress;
  }

  async updateUserProgress(id: number, progressUpdate: Partial<UserProgress>): Promise<UserProgress | undefined> {
    const progress = this.userProgress.get(id);
    if (!progress) return undefined;
    
    const updatedProgress: UserProgress = { 
      ...progress, 
      ...progressUpdate, 
      lastAccessedAt: new Date(),
      completedAt: progressUpdate.isCompleted ? new Date() : progress.completedAt
    };
    this.userProgress.set(id, updatedProgress);
    return updatedProgress;
  }

  async getUserModuleProgress(userId: number, moduleId: number): Promise<UserProgress | undefined> {
    return Array.from(this.userProgress.values()).find(p => 
      p.userId === userId && p.moduleId === moduleId && !p.lessonId
    );
  }

  // Question methods
  async getQuestion(id: number): Promise<Question | undefined> {
    return this.questions.get(id);
  }

  async getQuestionsByLesson(lessonId: number): Promise<Question[]> {
    return Array.from(this.questions.values())
      .filter(q => q.lessonId === lessonId)
      .sort((a, b) => a.order - b.order);
  }

  async getQuestionsByEvaluation(evaluationId: number): Promise<Question[]> {
    return Array.from(this.questions.values())
      .filter(q => q.evaluationId === evaluationId)
      .sort((a, b) => a.order - b.order);
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const id = this.currentId++;
    const question: Question = { 
      ...insertQuestion, 
      id, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    };
    this.questions.set(id, question);
    return question;
  }

  async updateQuestion(id: number, questionUpdate: Partial<Question>): Promise<Question | undefined> {
    const question = this.questions.get(id);
    if (!question) return undefined;
    
    const updatedQuestion: Question = { ...question, ...questionUpdate, updatedAt: new Date() };
    this.questions.set(id, updatedQuestion);
    return updatedQuestion;
  }

  async deleteQuestion(id: number): Promise<boolean> {
    return this.questions.delete(id);
  }

  // Evaluation methods
  async getEvaluation(id: number): Promise<Evaluation | undefined> {
    return this.evaluations.get(id);
  }

  async getEvaluationsByModule(moduleId: number): Promise<Evaluation[]> {
    return Array.from(this.evaluations.values()).filter(e => e.moduleId === moduleId);
  }

  async getEvaluationsByLesson(lessonId: number): Promise<Evaluation[]> {
    return Array.from(this.evaluations.values()).filter(e => e.lessonId === lessonId);
  }

  async createEvaluation(insertEvaluation: InsertEvaluation): Promise<Evaluation> {
    const id = this.currentId++;
    const evaluation: Evaluation = { 
      ...insertEvaluation, 
      id, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    };
    this.evaluations.set(id, evaluation);
    return evaluation;
  }

  async updateEvaluation(id: number, evaluationUpdate: Partial<Evaluation>): Promise<Evaluation | undefined> {
    const evaluation = this.evaluations.get(id);
    if (!evaluation) return undefined;
    
    const updatedEvaluation: Evaluation = { ...evaluation, ...evaluationUpdate, updatedAt: new Date() };
    this.evaluations.set(id, updatedEvaluation);
    return updatedEvaluation;
  }

  async deleteEvaluation(id: number): Promise<boolean> {
    return this.evaluations.delete(id);
  }

  // User Response methods
  async getUserResponse(id: number): Promise<UserResponse | undefined> {
    return this.userResponses.get(id);
  }

  async getUserResponsesByEvaluation(userId: number, evaluationId: number): Promise<UserResponse[]> {
    return Array.from(this.userResponses.values()).filter(r => 
      r.userId === userId && 
      this.questions.get(r.questionId!)?.evaluationId === evaluationId
    );
  }

  async createUserResponse(insertResponse: InsertUserResponse): Promise<UserResponse> {
    const id = this.currentId++;
    const response: UserResponse = { 
      ...insertResponse, 
      id, 
      createdAt: new Date() 
    };
    this.userResponses.set(id, response);
    return response;
  }

  // User Evaluation Result methods
  async getUserEvaluationResult(id: number): Promise<UserEvaluationResult | undefined> {
    return this.userEvaluationResults.get(id);
  }

  async getUserEvaluationResults(userId: number): Promise<UserEvaluationResult[]> {
    return Array.from(this.userEvaluationResults.values()).filter(r => r.userId === userId);
  }

  async createUserEvaluationResult(insertResult: InsertUserEvaluationResult): Promise<UserEvaluationResult> {
    const id = this.currentId++;
    const result: UserEvaluationResult = { 
      ...insertResult, 
      id, 
      startedAt: new Date(), 
      completedAt: new Date() 
    };
    this.userEvaluationResults.set(id, result);
    return result;
  }

  // Activity Log methods
  async getActivityLog(userId: number): Promise<ActivityLog[]> {
    return Array.from(this.activityLog.values())
      .filter(log => log.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createActivityLog(insertLog: InsertActivityLog): Promise<ActivityLog> {
    const id = this.currentId++;
    const log: ActivityLog = { 
      ...insertLog, 
      id, 
      createdAt: new Date() 
    };
    this.activityLog.set(id, log);
    return log;
  }
}

export const storage = new MemStorage();
