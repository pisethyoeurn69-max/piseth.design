import { SubmissionItem, AdminStudent } from '../types';

export interface AdminStats {
  studentsCount: number;
  activeCoursesCount: number;
  assignmentsCount: number;
  certificatesCount: number;
  revenue: number;
  courseCompletionRate: number;
}

export const ADMIN_STATS: AdminStats = {
  studentsCount: 128,
  activeCoursesCount: 6,
  assignmentsCount: 42,
  certificatesCount: 86,
  revenue: 1280,
  courseCompletionRate: 84,
};

export const INITIAL_SUBMISSIONS: SubmissionItem[] = [
  {
    id: 'sub-1',
    studentName: 'Sothea Chan',
    studentNameKh: 'ចាន់ សុធា',
    studentEmail: 'sothea.chan@design.kh',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    course: 'Graphic Design',
    assignment: 'Assignment #03: Typography Poster',
    date: 'Oct 2, 2026 · 4:15 PM',
    status: 'Revision Required',
    files: [
      {
        name: 'SotheaChan_Assignment03_Typography_v1.png',
        size: '4.2 MB',
        url: '#',
      },
    ],
    feedback: 'Good composition! You have a great eye for bold focal weight. Improve hierarchy and spacing between the header and the body text block.',
    grade: '8.8 / 10',
  },
  {
    id: 'sub-2',
    studentName: 'Dara Somnang',
    studentNameKh: 'សំអាង ដារ៉ា',
    studentEmail: 'dara.somnang@agency.kh',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    course: 'UX/UI Design',
    assignment: 'Assignment #02: Mobile App Auto Layout Wireframe',
    date: 'Oct 2, 2026 · 2:30 PM',
    status: 'Under Review',
    files: [
      {
        name: 'Dara_TourismApp_AutoLayout.fig',
        size: '8.4 MB',
        url: '#',
      },
    ],
    feedback: '',
    grade: '',
  },
  {
    id: 'sub-3',
    studentName: 'Bopha Vann',
    studentNameKh: 'វណ្ណ បុប្ផា',
    studentEmail: 'bopha.vann@creative.kh',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    course: 'Motion Graphics',
    assignment: 'Assignment #01: 12 Principles Bouncing Ball & Anticipation',
    date: 'Oct 1, 2026 · 7:10 PM',
    status: 'Approved',
    files: [
      {
        name: 'Bopha_AE_BouncingBall_v2.mp4',
        size: '14.8 MB',
        url: '#',
      },
    ],
    feedback: 'Superb squash & stretch physics! The velocity curve in the Graph Editor is dialed in cleanly.',
    grade: '9.8 / 10',
  },
  {
    id: 'sub-4',
    studentName: 'Rithy Kem',
    studentNameKh: 'កឹម រិទ្ធី',
    studentEmail: 'rithy.kem@motion.kh',
    studentAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    course: '2D & 3D Motion Graphic II',
    assignment: 'Assignment #04: C4D Spatial Product Lighting',
    date: 'Sep 30, 2026 · 11:20 AM',
    status: 'Submitted',
    files: [
      {
        name: 'RithyKem_Headphones_3D_Render.mp4',
        size: '28.1 MB',
        url: '#',
      },
    ],
    feedback: '',
    grade: '',
  },
  {
    id: 'sub-5',
    studentName: 'Kosal Chea',
    studentNameKh: 'ជា កុសល',
    studentEmail: 'kosal.chea@studio.kh',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    course: 'Graphic Design',
    assignment: 'Assignment #02: Cultural Color Palette',
    date: 'Sep 29, 2026 · 3:45 PM',
    status: 'Approved',
    files: [
      {
        name: 'Kosal_Angkor_Palette_Deck.pdf',
        size: '5.2 MB',
        url: '#',
      },
    ],
    feedback: 'Exceptional contrast ratios and thoughtful Khmer architectural citations.',
    grade: '9.5 / 10',
  },
];

export const ADMIN_STUDENTS_LIST: AdminStudent[] = [
  {
    id: 'stu-1',
    name: 'Sothea Chan',
    nameKh: 'ចាន់ សុធា',
    email: 'sothea.chan@design.kh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    courses: ['Graphic Design', 'UX/UI Design'],
    progress: 78,
    lastActive: '12 minutes ago',
    assignments: 6,
    certificates: 1,
    joinedDate: 'Jan 15, 2026',
    completedLessonsCount: 48,
  },
  {
    id: 'stu-2',
    name: 'Dara Somnang',
    nameKh: 'សំអាង ដារ៉ា',
    email: 'dara.somnang@agency.kh',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    courses: ['UX/UI Design', 'Graphic Design'],
    progress: 64,
    lastActive: '2 hours ago',
    assignments: 5,
    certificates: 1,
    joinedDate: 'Feb 02, 2026',
    completedLessonsCount: 38,
  },
  {
    id: 'stu-3',
    name: 'Bopha Vann',
    nameKh: 'វណ្ណ បុប្ផា',
    email: 'bopha.vann@creative.kh',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    courses: ['Motion Graphics'],
    progress: 92,
    lastActive: 'Yesterday',
    assignments: 8,
    certificates: 2,
    joinedDate: 'Dec 10, 2025',
    completedLessonsCount: 52,
  },
  {
    id: 'stu-4',
    name: 'Rithy Kem',
    nameKh: 'កឹម រិទ្ធី',
    email: 'rithy.kem@motion.kh',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    courses: ['Motion Graphics', '2D & 3D Motion Graphic II'],
    progress: 81,
    lastActive: '3 hours ago',
    assignments: 7,
    certificates: 1,
    joinedDate: 'Jan 22, 2026',
    completedLessonsCount: 44,
  },
  {
    id: 'stu-5',
    name: 'Kosal Chea',
    nameKh: 'ជា កុសល',
    email: 'kosal.chea@studio.kh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    courses: ['Graphic Design'],
    progress: 55,
    lastActive: '5 days ago',
    assignments: 3,
    certificates: 0,
    joinedDate: 'Mar 01, 2026',
    completedLessonsCount: 22,
  },
  {
    id: 'stu-6',
    name: 'Sokha Meng',
    nameKh: 'ម៉េង សុខា',
    email: 'sokha.meng@print.kh',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    courses: ['Graphic Design', 'UX/UI Design'],
    progress: 70,
    lastActive: '1 day ago',
    assignments: 4,
    certificates: 1,
    joinedDate: 'Feb 18, 2026',
    completedLessonsCount: 35,
  },
];

export const ADMIN_PAYMENTS = [
  { id: 'pay-1', student: 'Sothea Chan', course: 'Graphic Design Mastery', amount: 120, date: 'Oct 1, 2026', method: 'ABA PayWay' },
  { id: 'pay-2', student: 'Dara Somnang', course: 'UX/UI Design with Figma', amount: 140, date: 'Sep 29, 2026', method: 'Bakong QR' },
  { id: 'pay-3', student: 'Rithy Kem', course: '2D & 3D Motion Graphic II', amount: 180, date: 'Sep 28, 2026', method: 'ABA PayWay' },
  { id: 'pay-4', student: 'Bopha Vann', course: 'Motion Graphics Suite', amount: 150, date: 'Sep 24, 2026', method: 'Wing Bank' },
  { id: 'pay-5', student: 'Kosal Chea', course: 'Graphic Design Mastery', amount: 120, date: 'Sep 20, 2026', method: 'Bakong QR' },
];

export const ADMIN_ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    title: 'Live Saturday Portfolio Critique session at 7:00 PM',
    date: 'Posted Today',
    audience: 'All Enrolled Students',
    pinned: true,
  },
  {
    id: 'ann-2',
    title: 'New Kantumruy Pro Dual-Script Type Specimen file uploaded to Resources',
    date: 'Sep 28, 2026',
    audience: 'Graphic Design Students',
    pinned: false,
  },
];
