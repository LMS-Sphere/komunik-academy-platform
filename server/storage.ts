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
      {
        id: 3,
        moduleId: 1,
        title: "Gestion des contacts",
        description: "Apprenez à créer et gérer vos contacts efficacement",
        content: "<p>Cette leçon couvre la gestion complète des contacts...</p>",
        lessonType: "pdf",
        contentUrl: "/documents/lesson-3.pdf",
        duration: 25,
        order: 3,
        objectives: ["Créer des contacts", "Organiser les données clients"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        moduleId: 1,
        title: "Suivi des opportunités",
        description: "Découvrez comment suivre et gérer vos opportunités de vente",
        content: "<p>Apprenez les meilleures pratiques pour le suivi des opportunités...</p>",
        lessonType: "video",
        contentUrl: "/videos/lesson-4.mp4",
        duration: 30,
        order: 4,
        objectives: ["Créer des opportunités", "Gérer le pipeline de vente"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        moduleId: 2,
        title: "Prospection avancée",
        description: "Techniques avancées de prospection et d'identification des leads",
        content: "<p>Maîtrisez les techniques de prospection avancée...</p>",
        lessonType: "video",
        contentUrl: "/videos/lesson-5.mp4",
        duration: 35,
        order: 1,
        objectives: ["Identifier les prospects qualifiés", "Utiliser les outils de prospection"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        moduleId: 2,
        title: "Automatisation des processus",
        description: "Automatisez vos workflows de vente pour plus d'efficacité",
        content: "<p>Cette leçon vous montre comment automatiser vos processus...</p>",
        lessonType: "image",
        contentUrl: "/images/lesson-6.jpg",
        duration: 40,
        order: 2,
        objectives: ["Créer des workflows automatisés", "Optimiser les processus"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        moduleId: 2,
        title: "Analyse des performances",
        description: "Analysez vos performances de vente et optimisez vos résultats",
        content: "<p>Apprenez à analyser vos métriques de vente...</p>",
        lessonType: "text",
        contentUrl: null,
        duration: 45,
        order: 3,
        objectives: ["Interpréter les métriques", "Optimiser les performances"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        moduleId: 2,
        title: "Stratégies de conversion",
        description: "Techniques avancées pour améliorer votre taux de conversion",
        content: "<p>Découvrez les stratégies les plus efficaces pour convertir vos prospects...</p>",
        lessonType: "video",
        contentUrl: "/videos/lesson-8.mp4",
        duration: 50,
        order: 4,
        objectives: ["Améliorer le taux de conversion", "Techniques de closing"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    sampleLessons.forEach(lesson => this.lessons.set(lesson.id, lesson));

    // Create sample evaluations
    const sampleEvaluations: Evaluation[] = [
      // Lesson Quizzes
      {
        id: 1,
        moduleId: 1,
        lessonId: 1,
        title: "Introduction au CRM - Quiz",
        description: "Test your knowledge of CRM introduction concepts",
        evaluationType: "lesson_quiz",
        totalQuestions: 2,
        passingScore: 70,
        timeLimit: 5,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        moduleId: 1,
        lessonId: 2,
        title: "Navigation Interface - Quiz",
        description: "Test your understanding of CRM navigation",
        evaluationType: "lesson_quiz",
        totalQuestions: 2,
        passingScore: 70,
        timeLimit: 5,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        moduleId: 1,
        lessonId: 3,
        title: "Gestion des contacts - Quiz",
        description: "Test your knowledge of contact management",
        evaluationType: "lesson_quiz",
        totalQuestions: 2,
        passingScore: 70,
        timeLimit: 5,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        moduleId: 1,
        lessonId: 4,
        title: "Suivi des opportunités - Quiz",
        description: "Test your understanding of opportunity tracking",
        evaluationType: "lesson_quiz",
        totalQuestions: 2,
        passingScore: 70,
        timeLimit: 5,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Module Final Quiz
      {
        id: 5,
        moduleId: 1,
        lessonId: null,
        title: "Module 1 Final Quiz - Introduction à Sphere CRM",
        description: "Final assessment covering all lessons in Module 1",
        evaluationType: "module_final_quiz",
        totalQuestions: 8,
        passingScore: 80,
        timeLimit: 15,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Module 2 Lesson Quizzes
      {
        id: 6,
        moduleId: 2,
        lessonId: 5,
        title: "Prospection avancée - Quiz",
        description: "Test your knowledge of advanced prospecting",
        evaluationType: "lesson_quiz",
        totalQuestions: 2,
        passingScore: 70,
        timeLimit: 5,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        moduleId: 2,
        lessonId: 6,
        title: "Automatisation des processus - Quiz",
        description: "Test your understanding of process automation",
        evaluationType: "lesson_quiz",
        totalQuestions: 2,
        passingScore: 70,
        timeLimit: 5,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        moduleId: 2,
        lessonId: 7,
        title: "Analyse des performances - Quiz",
        description: "Test your knowledge of performance analysis",
        evaluationType: "lesson_quiz",
        totalQuestions: 2,
        passingScore: 70,
        timeLimit: 5,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        moduleId: 2,
        lessonId: 8,
        title: "Stratégies de conversion - Quiz",
        description: "Test your understanding of conversion strategies",
        evaluationType: "lesson_quiz",
        totalQuestions: 2,
        passingScore: 70,
        timeLimit: 5,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Module 2 Final Quiz
      {
        id: 10,
        moduleId: 2,
        lessonId: null,
        title: "Module 2 Final Quiz - Vente Avancée",
        description: "Final assessment covering all lessons in Module 2",
        evaluationType: "module_final_quiz",
        totalQuestions: 8,
        passingScore: 80,
        timeLimit: 15,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    sampleEvaluations.forEach(evaluation => this.evaluations.set(evaluation.id, evaluation));

    // Create sample questions
    const sampleQuestions: Question[] = [
      // Questions for Lesson 1 Quiz (evaluationId: 1)
      {
        id: 1,
        evaluationId: 1,
        questionText: "What does CRM stand for?",
        questionType: "multiple_choice",
        options: ["Customer Relationship Management", "Customer Resource Management", "Client Relationship Model", "Customer Retention Method"],
        correctAnswer: "Customer Relationship Management",
        points: 1,
        explanation: "CRM stands for Customer Relationship Management, a strategy for managing interactions with customers.",
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        evaluationId: 1,
        questionText: "CRM systems help businesses improve customer satisfaction.",
        questionType: "true_false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 1,
        explanation: "CRM systems are designed to help businesses better understand and serve their customers.",
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // Questions for Lesson 2 Quiz (evaluationId: 2)
      {
        id: 3,
        evaluationId: 2,
        questionText: "Which section of Sphere CRM helps you find specific contacts quickly?",
        questionType: "multiple_choice",
        options: ["Search Bar", "Contact List", "Dashboard", "All of the above"],
        correctAnswer: "All of the above",
        points: 1,
        explanation: "All these sections help you navigate and find contacts efficiently.",
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        evaluationId: 2,
        questionText: "The navigation interface can be customized for different user roles.",
        questionType: "true_false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 1,
        explanation: "Different user roles can have customized navigation interfaces.",
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Questions for Lesson 3 Quiz (evaluationId: 3)
      {
        id: 5,
        evaluationId: 3,
        questionText: "What information is essential when creating a new contact?",
        questionType: "multiple_choice",
        options: ["Name and Email", "Name, Email, and Phone", "Name, Email, Phone, and Company", "All contact information"],
        correctAnswer: "Name, Email, Phone, and Company",
        points: 1,
        explanation: "Essential contact information includes name, email, phone, and company for complete records.",
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        evaluationId: 3,
        questionText: "Contacts can be organized using tags and categories.",
        questionType: "true_false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 1,
        explanation: "Tags and categories help organize contacts for better management.",
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Questions for Lesson 4 Quiz (evaluationId: 4)
      {
        id: 7,
        evaluationId: 4,
        questionText: "Which stage comes first in the sales pipeline?",
        questionType: "multiple_choice",
        options: ["Qualification", "Prospecting", "Proposal", "Negotiation"],
        correctAnswer: "Prospecting",
        points: 1,
        explanation: "Prospecting is the first stage where potential customers are identified.",
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        evaluationId: 4,
        questionText: "Opportunities should be updated regularly to track progress.",
        questionType: "true_false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 1,
        explanation: "Regular updates help track opportunity progress and forecast accurately.",
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Questions for Module 1 Final Quiz (evaluationId: 5)
      {
        id: 9,
        evaluationId: 5,
        questionText: "What are the main components of a CRM system?",
        questionType: "multiple_choice",
        options: ["Contacts and Opportunities", "Sales Pipeline and Reports", "Customer Service and Marketing", "All of the above"],
        correctAnswer: "All of the above",
        points: 1,
        explanation: "A complete CRM system includes all these components for comprehensive customer management.",
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        evaluationId: 5,
        questionText: "How do you navigate to the contact management section?",
        questionType: "multiple_choice",
        options: ["Dashboard > Contacts", "Menu > Contacts", "Search > Contacts", "Both A and B"],
        correctAnswer: "Both A and B",
        points: 1,
        explanation: "Contacts can be accessed through both the dashboard and the main menu.",
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        evaluationId: 5,
        questionText: "What information is required to create a complete contact record?",
        questionType: "open_ended",
        options: [],
        correctAnswer: "Name, email, phone number, company, and relevant tags or categories",
        points: 2,
        explanation: "Complete contact records should include all essential contact information plus organizational elements.",
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        evaluationId: 5,
        questionText: "The sales pipeline helps track customer journey from prospect to close.",
        questionType: "true_false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 1,
        explanation: "The sales pipeline is designed to track the entire customer journey.",
        order: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        evaluationId: 5,
        questionText: "Which metrics are important for tracking CRM performance?",
        questionType: "multiple_choice",
        options: ["Conversion rates", "Customer satisfaction", "Sales velocity", "All of the above"],
        correctAnswer: "All of the above",
        points: 1,
        explanation: "All these metrics are important for comprehensive CRM performance tracking.",
        order: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        evaluationId: 5,
        questionText: "Opportunities can be assigned to multiple team members.",
        questionType: "true_false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 1,
        explanation: "Team collaboration is important for managing complex opportunities.",
        order: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        evaluationId: 5,
        questionText: "What are the benefits of using CRM tags and categories?",
        questionType: "open_ended",
        options: [],
        correctAnswer: "Better organization, easier filtering, improved segmentation, and enhanced reporting",
        points: 2,
        explanation: "Tags and categories provide multiple organizational and analytical benefits.",
        order: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        evaluationId: 5,
        questionText: "Regular follow-ups are essential for successful opportunity management.",
        questionType: "true_false",
        options: ["True", "False"],
        correctAnswer: "True",
        points: 1,
        explanation: "Consistent follow-ups are crucial for maintaining momentum in the sales process.",
        order: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    sampleQuestions.forEach(question => this.questions.set(question.id, question));

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

  async getEvaluationById(id: number): Promise<Evaluation | undefined> {
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
