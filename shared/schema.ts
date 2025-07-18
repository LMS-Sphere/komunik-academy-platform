import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: text("role").notNull(), // 'admin', 'trainer', 'learner'
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Modules table (equivalent to Course in your diagram)
export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  level: text("level").notNull(), // 'beginner', 'intermediate', 'advanced'
  duration: integer("duration").notNull(), // in minutes
  totalLessons: integer("total_lessons").notNull(),
  rating: integer("rating").default(0), // 1-5 scale
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Lessons table (child of Module)
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").references(() => modules.id),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"), // HTML content
  lessonType: text("lesson_type").notNull(), // 'video', 'pdf', 'image', 'audio', 'text'
  contentUrl: text("content_url"), // URL to the actual content file
  duration: integer("duration").notNull(), // in minutes
  order: integer("order").notNull(),
  objectives: json("objectives").$type<string[]>(), // Array of learning objectives
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Progress table (matches your diagram)
export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  moduleId: integer("module_id").references(() => modules.id),
  lessonId: integer("lesson_id").references(() => lessons.id),
  isCompleted: boolean("is_completed").default(false),
  completionPercentage: integer("completion_percentage").default(0),
  timeSpent: integer("time_spent").default(0), // in minutes
  lastAccessedAt: timestamp("last_accessed_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

// Performance table (matches your diagram for analytics)
export const performance = pgTable("performance", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  moduleId: integer("module_id").references(() => modules.id),
  lessonId: integer("lesson_id").references(() => lessons.id),
  progress: integer("progress").default(0), // percentage
  timeSpent: integer("time_spent").default(0),
  lastAccessed: timestamp("last_accessed").defaultNow().notNull(),
  interactions: integer("interactions").default(0), // number of interactions
  completionStatus: text("completion_status"), // 'not_started', 'in_progress', 'completed'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Evaluation table (matches your diagram)
export const evaluations = pgTable("evaluations", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").references(() => modules.id),
  lessonId: integer("lesson_id").references(() => lessons.id),
  title: text("title").notNull(),
  description: text("description"),
  evaluationType: text("evaluation_type").notNull(), // 'quiz', 'assignment', 'test'
  totalQuestions: integer("total_questions").default(0),
  passingScore: integer("passing_score").default(70),
  timeLimit: integer("time_limit"), // in minutes
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Questions table (matches your diagram)
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  evaluationId: integer("evaluation_id").references(() => evaluations.id),
  questionText: text("question_text").notNull(),
  questionType: text("question_type").notNull(), // 'multiple_choice', 'true_false', 'open_ended'
  options: json("options").$type<string[]>(), // Array of answer options
  correctAnswer: text("correct_answer"),
  points: integer("points").default(1),
  explanation: text("explanation"),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Responses table (matches your diagram)
export const responses = pgTable("responses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  questionId: integer("question_id").references(() => questions.id),
  evaluationId: integer("evaluation_id").references(() => evaluations.id),
  answer: text("answer").notNull(),
  isCorrect: boolean("is_correct").default(false),
  pointsEarned: integer("points_earned").default(0),
  answeredAt: timestamp("answered_at").defaultNow().notNull(),
});

// Level table (matches your diagram)
export const levels = pgTable("levels", {
  id: serial("id").primaryKey(),
  level: text("level").notNull(), // 'beginner', 'intermediate', 'advanced'
  name: text("name").notNull(),
  description: text("description"),
  difficulty: integer("difficulty").notNull(), // 1-10 scale
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertModuleSchema = createInsertSchema(modules).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  lastAccessedAt: true,
  completedAt: true,
});

export const insertEvaluationSchema = createInsertSchema(evaluations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertResponseSchema = createInsertSchema(responses).omit({
  id: true,
  answeredAt: true,
});

export const insertPerformanceSchema = createInsertSchema(performance).omit({
  id: true,
  createdAt: true,
  lastAccessed: true,
});

export const insertLevelSchema = createInsertSchema(levels).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Module = typeof modules.$inferSelect;
export type InsertModule = z.infer<typeof insertModuleSchema>;

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;

export type Evaluation = typeof evaluations.$inferSelect;
export type InsertEvaluation = z.infer<typeof insertEvaluationSchema>;

export type Response = typeof responses.$inferSelect;
export type InsertResponse = z.infer<typeof insertResponseSchema>;

export type Performance = typeof performance.$inferSelect;
export type InsertPerformance = z.infer<typeof insertPerformanceSchema>;

export type Level = typeof levels.$inferSelect;
export type InsertLevel = z.infer<typeof insertLevelSchema>;
