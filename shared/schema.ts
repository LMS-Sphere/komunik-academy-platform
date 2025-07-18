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

// Modules table
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

// Lessons table
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

// User Progress table
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

// Questions table
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id),
  evaluationId: integer("evaluation_id").references(() => evaluations.id),
  questionText: text("question_text").notNull(),
  questionType: text("question_type").notNull(), // 'multiple_choice', 'true_false', 'short_answer', 'essay'
  options: json("options").$type<string[]>(), // For multiple choice questions
  correctAnswer: text("correct_answer"),
  points: integer("points").default(1),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Evaluations table (exams for modules, quizzes for lessons)
export const evaluations = pgTable("evaluations", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").references(() => modules.id),
  lessonId: integer("lesson_id").references(() => lessons.id), // For lesson quizzes
  title: text("title").notNull(),
  description: text("description"),
  evaluationType: text("evaluation_type").notNull(), // 'quiz', 'exam'
  totalPoints: integer("total_points").notNull(),
  passingScore: integer("passing_score").notNull(),
  timeLimit: integer("time_limit"), // in minutes, null for no limit
  isActive: boolean("is_active").default(true),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User responses to individual questions
export const userResponses = pgTable("user_responses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  questionId: integer("question_id").references(() => questions.id),
  evaluationResultId: integer("evaluation_result_id").references(() => userEvaluationResults.id),
  responseText: text("response_text"),
  selectedOption: text("selected_option"),
  isCorrect: boolean("is_correct").default(false),
  pointsEarned: integer("points_earned").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User Evaluation Results table
export const userEvaluationResults = pgTable("user_evaluation_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  evaluationId: integer("evaluation_id").references(() => evaluations.id),
  score: integer("score").notNull(),
  totalPoints: integer("total_points").notNull(),
  isPassed: boolean("is_passed").default(false),
  timeSpent: integer("time_spent"), // in minutes
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

// Activity Log table
export const activityLog = pgTable("activity_log", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  action: text("action").notNull(), // 'started_module', 'completed_lesson', 'submitted_evaluation', etc.
  entityType: text("entity_type"), // 'module', 'lesson', 'evaluation'
  entityId: integer("entity_id"),
  entityName: text("entity_name"),
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

export const insertUserResponseSchema = createInsertSchema(userResponses).omit({
  id: true,
  createdAt: true,
});

export const insertUserEvaluationResultSchema = createInsertSchema(userEvaluationResults).omit({
  id: true,
  startedAt: true,
  completedAt: true,
});

export const insertActivityLogSchema = createInsertSchema(activityLog).omit({
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

export type UserResponse = typeof userResponses.$inferSelect;
export type InsertUserResponse = z.infer<typeof insertUserResponseSchema>;

export type UserEvaluationResult = typeof userEvaluationResults.$inferSelect;
export type InsertUserEvaluationResult = z.infer<typeof insertUserEvaluationResultSchema>;

export type ActivityLog = typeof activityLog.$inferSelect;
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
