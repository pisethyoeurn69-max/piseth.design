/**
 * @file databaseContracts.ts / schema.ts
 * Supabase-Ready Schema and Relational Table Contracts for piseth.design
 * 
 * This file maps the 13 required core domain entities to SQL/Supabase tables:
 * - users
 * - courses
 * - lessons
 * - enrollments
 * - assignments
 * - submissions
 * - quizzes
 * - quiz_results
 * - resources
 * - certificates
 * - payments
 * - notifications
 * - notes
 */

import { 
  UserRole, 
  Course, 
  Lesson, 
  Assignment, 
  SubmissionItem, 
  Quiz, 
  QuizQuestion,
  ResourceCardItem, 
  PaymentMethod, 
  NotificationCategory 
} from '../types';

/* 1. USERS TABLE (auth.users extension) */
export interface DbUser {
  id: string; // UUID primary key
  email: string;
  name: string;
  name_kh?: string;
  role: UserRole;
  avatar_url?: string;
  location?: string;
  created_at: string;
  last_sign_in_at?: string;
}

/* 2. COURSES TABLE */
export interface DbCourse {
  id: string;
  slug: string;
  title: string;
  title_kh?: string;
  category: 'Graphic Design' | 'UX/UI Design' | 'Motion Graphics';
  level: 'Beginner → Intermediate' | 'Intermediate' | 'Advanced';
  duration_hours: number;
  total_lessons: number;
  price_usd: number;
  instructor_id: string;
  instructor_name: string;
  rating: number;
  rating_count: number;
  students_count: number;
  published: boolean;
  created_at: string;
}

/* 3. LESSONS TABLE */
export interface DbLesson {
  id: string;
  course_id: string;
  module_number: string;
  module_title: string;
  title: string;
  title_kh?: string;
  duration_minutes: number;
  video_url: string;
  order_index: number;
  has_assignment: boolean;
  has_quiz: boolean;
  created_at: string;
}

/* 4. ENROLLMENTS TABLE */
export interface DbEnrollment {
  id: string;
  user_id: string;
  course_id: string;
  progress_percent: number;
  enrolled_at: string;
  completed_at?: string;
  last_lesson_id?: string;
}

/* 5. ASSIGNMENTS TABLE */
export interface DbAssignment {
  id: string;
  course_id: string;
  number: string;
  title: string;
  title_kh?: string;
  description: string;
  due_date: string;
  requirements: string[];
  created_at: string;
}

/* 6. SUBMISSIONS TABLE */
export interface DbSubmission {
  id: string;
  assignment_id: string;
  user_id: string;
  file_url: string;
  file_name: string;
  file_size: string;
  status: 'Not Submitted' | 'Submitted' | 'Under Review' | 'Revision Required' | 'Approved';
  teacher_feedback?: string;
  grade?: string;
  submitted_at: string;
  reviewed_at?: string;
}

/* 7. QUIZZES TABLE */
export interface DbQuiz {
  id: string;
  course_id: string;
  lesson_id: string;
  title: string;
  title_kh?: string;
  passing_score: number;
  created_at: string;
}

/* 8. QUIZ RESULTS TABLE */
export interface DbQuizResult {
  id: string;
  quiz_id: string;
  user_id: string;
  score_percent: number;
  correct_count: number;
  total_questions: number;
  passed: boolean;
  taken_at: string;
}

/* 9. RESOURCES TABLE */
export interface DbResource {
  id: string;
  title: string;
  title_kh?: string;
  category: 'Photoshop' | 'Illustrator' | 'InDesign' | 'After Effects' | 'Figma' | 'Typography' | 'Branding' | 'Motion Graphics';
  type: string;
  software: string;
  file_size: string;
  file_url: string;
  downloads_count: number;
  created_at: string;
}

/* 10. CERTIFICATES TABLE */
export interface DbCertificate {
  id: string;
  certificate_number: string; // e.g. PIS-2026-8942
  user_id: string;
  course_id: string;
  issue_date: string;
  verification_url: string;
  instructor_signature: string;
  created_at: string;
}

/* 11. PAYMENTS TABLE */
export interface DbPayment {
  id: string;
  user_id: string;
  course_id: string;
  amount_usd: number;
  amount_khr: number;
  payment_method: PaymentMethod; // 'KHQR' | 'Bakong' | 'ABA' | 'ACLEDA'
  transaction_ref: string;
  status: 'Pending' | 'Success' | 'Failed';
  created_at: string;
}

/* 12. NOTIFICATIONS TABLE */
export interface DbNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationCategory;
  is_read: boolean;
  link_tab?: string;
  created_at: string;
}

/* 13. NOTES TABLE */
export interface DbNote {
  id: string;
  user_id: string;
  lesson_id: string;
  video_timestamp: string;
  content: string;
  created_at: string;
}
