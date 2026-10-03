export interface Lesson {
  id: string;
  title: string;
  titleKh?: string;
  duration: string;
  videoUrl?: string;
  completed?: boolean;
  bookmarked?: boolean;
  description: string;
  hasAssignment?: boolean;
  hasQuiz?: boolean;
}

export interface Module {
  id: string;
  number: string;
  title: string;
  titleKh?: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  titleKh?: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  level: 'Beginner → Intermediate' | 'Intermediate' | 'Advanced';
  category: 'Graphic Design' | 'UX/UI Design' | 'Motion Graphics';
  duration: string;
  totalLessons: number;
  instructor: {
    name: string;
    nameKh?: string;
    title: string;
    avatar: string;
    bio: string;
  };
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  studentsCount: number;
  software: {
    name: string;
    icon: string;
  }[];
  whatYouWillLearn: string[];
  requirements: string[];
  projects: {
    title: string;
    description: string;
    tag: string;
  }[];
  modules: Module[];
  enrolled?: boolean;
  progress?: number;
  lastLessonId?: string;
  gradient: string;
  accentColor: string;
}

export interface Note {
  id: string;
  lessonId: string;
  timestamp: string;
  content: string;
  createdAt: string;
}

export interface Assignment {
  id: string;
  number: string;
  title: string;
  titleKh?: string;
  courseTitle: string;
  description: string;
  requirements: string[];
  dueDate: string;
  status: 'Not Submitted' | 'Submitted' | 'Under Review' | 'Revision Required' | 'Approved';
  submittedFile?: {
    name: string;
    size: string;
    url: string;
    submittedAt: string;
  };
  teacherFeedback?: {
    teacherName: string;
    teacherRole: string;
    comment: string;
    grade?: string;
    date: string;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionKh?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  titleKh?: string;
  courseTitle: string;
  lessonTitle: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface Student {
  name: string;
  nameKh: string;
  email: string;
  avatar: string;
  role: string;
  memberSince: string;
  location: string;
  stats: {
    enrolledCourses: number;
    completedLessons: number;
    assignmentsSubmitted: number;
    certificatesCount: number;
  };
}

export type UserRole = 'Student' | 'Instructor' | 'Admin';

export interface UserAccount {
  id: string;
  name: string;
  nameKh?: string;
  email: string;
  avatar: string;
  role: UserRole;
  memberSince: string;
}

export type PaymentMethod = 'KHQR' | 'Bakong' | 'ABA' | 'ACLEDA';

export interface PaymentTransaction {
  id: string;
  courseId: string;
  courseTitle: string;
  studentId: string;
  studentName: string;
  amountUSD: number;
  amountKHR: number;
  method: PaymentMethod;
  status: 'Pending' | 'Success' | 'Failed';
  transactionRef: string;
  createdAt: string;
}

export type NotificationCategory =
  | 'lesson'
  | 'deadline'
  | 'feedback'
  | 'announcement'
  | 'certificate'
  | 'live';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: NotificationCategory;
  linkTab?: string;
  meta?: Record<string, any>;
}

export type ResourceCategory =
  | 'Photoshop'
  | 'Illustrator'
  | 'InDesign'
  | 'After Effects'
  | 'Figma'
  | 'Typography'
  | 'Branding'
  | 'Motion Graphics';

export interface ResourceCardItem {
  id: string;
  title: string;
  titleKh?: string;
  type: string;
  software: string;
  category: ResourceCategory;
  fileSize: string;
  downloadUrl?: string;
  bookmarked: boolean;
  downloadsCount: number;
  description: string;
}

export interface SubmissionItem {
  id: string;
  studentName: string;
  studentNameKh?: string;
  studentEmail: string;
  studentAvatar: string;
  course: string;
  assignment: string;
  date: string;
  status: 'Approved' | 'Revision Required' | 'Under Review' | 'Submitted';
  files: {
    name: string;
    size: string;
    url: string;
    thumbnail?: string;
  }[];
  feedback?: string;
  grade?: string;
}

export interface AdminStudent {
  id: string;
  name: string;
  nameKh: string;
  email: string;
  avatar: string;
  courses: string[];
  progress: number;
  lastActive: string;
  assignments: number;
  certificates: number;
  joinedDate: string;
  completedLessonsCount: number;
}

export interface ActivityItem {
  id: string;
  userName: string;
  userRole?: string;
  userAvatar: string;
  action: string;
  actionKh?: string;
  targetTitle: string;
  targetSubtitle?: string;
  timeAgo: string;
  timeAgoKh?: string;
  type: 'completed' | 'assignment' | 'lesson' | 'feedback' | 'badge';
  thumbnail?: string;
  badgeLabel?: string;
  likesCount?: number;
  commentsCount?: number;
  isLiked?: boolean;
}

export interface DiscussionComment {
  id: string;
  userName: string;
  userRole?: 'Instructor' | 'Teaching Assistant' | 'Student';
  userAvatar: string;
  content: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
  bookmarked?: boolean;
  replies?: DiscussionComment[];
}


