import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'km' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

export const TRANSLATIONS: Record<string, { km: string; en: string }> = {
  // Navigation
  'nav.home': { km: 'ទំព័រដើម', en: 'Home' },
  'nav.courses': { km: 'វគ្គសិក្សា', en: 'Courses' },
  'nav.resources': { km: 'ឯកសាររចនា', en: 'Resources' },
  'nav.about': { km: 'អំពីលោកគ្រូ', en: 'About' },
  'nav.dashboard': { km: 'ផ្ទាំងគ្រប់គ្រង', en: 'Dashboard' },
  'nav.profile': { km: 'គណនីនិស្សិត', en: 'Student Profile' },
  'nav.startLearning': { km: 'ចាប់ផ្ដើមរៀន', en: 'Start Learning' },
  'nav.teacherPortal': { km: 'ផ្ទាំងគ្រូបង្រៀន', en: 'Teacher Portal' },
  'nav.learning': { km: 'បន្ទប់រៀន', en: 'Learning' },
  'nav.certificate': { km: 'វិញ្ញាបនបត្រ', en: 'Certificate' },
  'nav.switchAccount': { km: 'ប្តូរគណនី / ចូល', en: 'Switch Account / Sign In' },
  'nav.appearance': { km: 'ទម្រង់ពន្លឺ', en: 'Appearance' },
  'nav.darkMode': { km: 'ងងឹត (Dark)', en: 'Dark Mode' },
  'nav.lightMode': { km: 'ភ្លឺ (Light)', en: 'Light Mode' },
  'nav.language': { km: 'ភាសា (Language)', en: 'Language' },
  'nav.notification': { km: 'មជ្ឈមណ្ឌលជូនដំណឹង', en: 'Notification Center' },

  // Hero Section
  'hero.badge': { km: 'បណ្ឌិត្យសភាបង្រៀន Design អាជីព', en: 'Professional Design Academy' },
  'hero.title': { km: 'រៀន Graphic Design, UX/UI និង Motion តាមស្តង់ដារអន្តរជាតិ', en: 'Master Graphic Design, UX/UI & Motion with Industry Standards' },
  'hero.subtitle': { 
    km: 'វគ្គបណ្តុះបណ្តាលកម្រិតខ្ពស់បង្រៀនដោយសាស្ត្រាចារ្យ យឿន ពិសិដ្ឋ។ រៀនទ្រឹស្តី គួបផ្សំការអនុវត្តជាក់ស្តែង ជាមួយការកែលម្អផ្ទាល់ពីលោកគ្រូ និងវិញ្ញាបនបត្រទទួលស្គាល់ផ្លូវការ។', 
    en: 'High-impact masterclasses instructed by university lecturer Piseth Yoeurn. Acquire industry workflows with personal critiques and verified certificates.' 
  },
  'hero.exploreCourses': { km: 'មើលវគ្គសិក្សាទាំងអស់', en: 'Explore Courses' },
  'hero.browseResources': { km: 'ទាញយកឯកសាររចនា', en: 'Browse Resources' },
  'hero.studentsCount': { km: 'និស្សិតជាង ១,២០០+ នាក់បានចុះឈ្មោះ', en: 'Over 1,200+ Cambodian students enrolled' },
  'hero.guarantee': { km: 'ធានាគុណភាពបង្រៀនកម្រិតសាកលវិទ្យាល័យ', en: 'University-accredited curriculum quality' },

  // Courses View
  'courses.headerTitle': { km: 'វគ្គសិក្សារចនាទាំងអស់', en: 'Design Courses' },
  'courses.headerSubtitle': { km: 'ចាប់ពីមូលដ្ឋានគ្រឹះដំបូង រហូតដល់ការបង្កើតស្នាដៃកម្រិតអាជីពសម្រាប់ទីផ្សារការងារ។', en: 'From foundational design principles to job-ready portfolio projects.' },
  'courses.all': { km: 'ទាំងអស់', en: 'All Categories' },
  'courses.graphicDesign': { km: 'Graphic Design', en: 'Graphic Design' },
  'courses.uxUi': { km: 'UX/UI Design', en: 'UX/UI Design' },
  'courses.motion': { km: 'Motion Graphics', en: 'Motion Graphics' },
  'courses.hours': { km: 'ម៉ោង', en: 'Hours' },
  'courses.lessons': { km: 'មេរៀន', en: 'Lessons' },
  'courses.students': { km: 'នាក់', en: 'students' },
  'courses.enrollNow': { km: 'ចុះឈ្មោះរៀន ($)', en: 'Enroll Now ($)' },
  'courses.continue': { km: 'បន្តការសិក្សា', en: 'Continue Learning' },
  'courses.enrolledBadge': { km: 'បានចុះឈ្មោះរួច', en: 'Enrolled' },
  'courses.viewDetails': { km: 'មើលព័ត៌មានលម្អិត', en: 'View Details' },

  // Dashboard View
  'dash.goodMorning': { km: 'អរុណសួស្តី 👋', en: 'Good morning 👋' },
  'dash.subGreeting': { km: 'រីករាយដែលបានជួបគ្នា! បន្តការសិក្សាដើម្បីពង្រឹងជំនាញ Design របស់អ្នកនៅថ្ងៃនេះ។', en: 'Glad to see you! Continue mastering your design skills today.' },
  'dash.overallProgress': { km: 'វឌ្ឍនភាពសិក្សាសរុប', en: 'Overall Progress' },
  'dash.completedLessons': { km: 'មេរៀនបានបញ្ចប់', en: 'Completed Lessons' },
  'dash.assignmentsFeedback': { km: 'កិច្ចការ និងការកែលម្អ', en: 'Assignments & Feedback' },
  'dash.continueLearning': { km: 'បន្តការរៀនសូត្រ', en: 'Continue Learning' },
  'dash.upcoming': { km: 'កាលវិភាគបន្ទាប់', en: 'Upcoming' },
  'dash.recentActivity': { km: 'សកម្មភាពថ្មីៗ', en: 'Recent Activity' },
  'dash.feedbackBanner': { km: 'ការកែលម្អពីលោកគ្រូ យឿន ពិសិដ្ឋ', en: 'Critique & Feedback from Teacher Piseth' },
  'dash.viewCritique': { km: 'មើលការកែលម្អ & ផ្ញើឡើងវិញ', en: 'View Critique & Resubmit' },

  // Resources View
  'res.libraryTitle': { km: 'បណ្ណាល័យធនធានរចនា', en: 'Design Resources Library' },
  'res.librarySubtitle': { km: 'ទាញយក Presets, ពុម្ពអក្សរខ្មែរ, Vector Kit, និង Figma Template រៀបចំដោយលោកគ្រូ យឿន ពិសិដ្ឋ។', en: 'Download industry-standard presets, Khmer typography specimens, vector kits, and Figma libraries.' },
  'res.search': { km: 'ស្វែងរកធនធានតាមឈ្មោះ ឬកម្មវិធី...', en: 'Search resources by title, type, or software...' },
  'res.bookmarked': { km: 'បានកត់ចំណាំទុក', en: 'Bookmarked Only' },
  'res.download': { km: 'ទាញយក', en: 'Download' },
  'res.downloadsCount': { km: 'ដង', en: 'downloads' },

  // Certificate View
  'cert.title': { km: 'វិញ្ញាបនបត្របញ្ជាក់ការបញ្ចប់វគ្គសិក្សា', en: 'Certificate of Completion' },
  'cert.awardedTo': { km: 'វិញ្ញាបនបត្រនេះត្រូវបានប្រគល់ជូន', en: 'This certificate is awarded to' },
  'cert.completed': { km: 'សម្រាប់ការបញ្ចប់ដោយជោគជ័យនូវវគ្គសិក្សាអាជីព ៤៥ ម៉ោងលើជំនាញ', en: 'for successfully completing the 45-hour professional curriculum in' },
  'cert.instructor': { km: 'សាស្ត្រាចារ្យ យឿន ពិសិដ្ឋ (RUFA)', en: 'Instructor: Piseth Yoeurn' },
  'cert.downloadBtn': { km: 'ទាញយកវិញ្ញាបនបត្រ (PDF)', en: 'Download Certificate (PDF)' },
  'cert.shareBtn': { km: 'ចម្លងតំណភ្ជាប់ផ្ទៀងផ្ទាត់', en: 'Share Verification Link' },

  // Footer
  'footer.description': { 
    km: 'បណ្ឌិត្យសភាបណ្តុះបណ្តាលជំនាញរចនាបង្កើតឡើងដោយសាស្ត្រាចារ្យ យឿន ពិសិដ្ឋ ដើម្បីលើកកម្ពស់ស្តង់ដារ Design នៅកម្ពុជា។', 
    en: 'Modern creative design academy founded by university lecturer Piseth Yoeurn. Educating Cambodian creators to craft international-standard design.' 
  },
  'footer.motto': { km: 'រៀន Design ឲ្យច្បាស់ បង្កើតស្នាដៃឲ្យមានតម្លៃ។', en: 'Master Design fundamentals, craft valuable creations.' },
  'footer.copyright': { km: 'រក្សាសិទ្ធិគ្រប់យ៉ាង © 2026 piseth.design', en: 'All rights reserved © 2026 piseth.design' },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'km',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('piseth_lang');
      if (saved === 'en' || saved === 'km') return saved;
      // Default to Khmer for local audience, or system check
      return 'km';
    }
    return 'km';
  });

  useEffect(() => {
    localStorage.setItem('piseth_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'km' ? 'en' : 'km'));
  };

  const t = (key: string): string => {
    const item = TRANSLATIONS[key];
    if (!item) return key;
    return item[language] || item['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
