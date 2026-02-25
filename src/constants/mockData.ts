import type {
  CareerMatch,
  InterestQuestion,
  CollegeSuggestion,
  SalaryData,
  RoadmapStep,
  Subject,
} from '@/types';

/**
 * Mock Career Data
 */
export const MOCK_CAREERS: CareerMatch[] = [
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    matchPercentage: 95,
    description: 'Develop, test, and maintain software applications and systems.',
    whyMatches: [
      'Your strong analytical thinking matches the problem-solving requirements',
      'Excellent logical reasoning skills for coding',
      'Your interest in technology aligns perfectly',
      'Communication skills important for team collaboration',
    ],
    educationPath: 'B.Tech in Computer Science / Information Technology',
    coursesNeeded: [
      'Data Structures',
      'Algorithms',
      'Database Management',
      'Web Development',
      'Machine Learning',
    ],
    skillsNeeded: [
      'Programming (Java, Python, C++)',
      'Problem-solving',
      'Team collaboration',
      'System design',
    ],
    employmentRate: 92,
    avgSalary: {
      min: 6,
      max: 35,
      experience: 5,
    },
    growthRate: 22,
    jobsAvailable: 450000,
    topCompanies: ['TCS', 'Infosys', 'Google', 'Microsoft', 'Amazon', 'Flipkart'],
    alternativeNames: ['Developer', 'Coder', 'Programming Engineer'],
    relatedFields: ['Data Science', 'DevOps Engineer', 'Full Stack Developer'],
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    matchPercentage: 88,
    description:
      'Analyze complex data sets and create data-driven solutions for business problems.',
    whyMatches: [
      'Strong analytical thinking abilities',
      'Mathematics aptitude aligns with statistical analysis',
      'Interest in patterns and problem-solving',
      'Logical reasoning skills essential for data analysis',
    ],
    educationPath: 'B.Tech in Computer Science or B.Sc in Mathematics/Statistics',
    coursesNeeded: [
      'Statistics',
      'Machine Learning',
      'Python Programming',
      'Big Data',
      'SQL Databases',
    ],
    skillsNeeded: [
      'Python, R, SQL',
      'Statistical Analysis',
      'Data Visualization',
      'Machine Learning',
    ],
    employmentRate: 87,
    avgSalary: {
      min: 8,
      max: 40,
      experience: 5,
    },
    growthRate: 36,
    jobsAvailable: 150000,
    topCompanies: ['Google', 'Microsoft', 'Amazon', 'Facebook', 'JPMorgan'],
    alternativeNames: ['Data Analyst', 'ML Engineer', 'Analytics Engineer'],
    relatedFields: ['Machine Learning Engineer', 'Business Analyst', 'AI Engineer'],
  },
  {
    id: 'civil-engineer',
    name: 'Civil Engineer',
    matchPercentage: 82,
    description: 'Design and oversee construction of buildings, bridges, and infrastructure.',
    whyMatches: [
      'Strong interest in structural design and planning',
      'Mathematical aptitude for calculations',
      'Problem-solving skills for project management',
      'Creativity in designing innovative structures',
    ],
    educationPath: 'B.Tech in Civil Engineering',
    coursesNeeded: [
      'Structural Design',
      'Geotechnical Engineering',
      'Transportation Engineering',
      'Project Management',
    ],
    skillsNeeded: [
      'AutoCAD',
      'Project Management',
      'Problem-solving',
      'Leadership',
      'Communication',
    ],
    employmentRate: 78,
    avgSalary: {
      min: 4,
      max: 25,
      experience: 5,
    },
    growthRate: 8,
    jobsAvailable: 200000,
    topCompanies: ['Larsen & Toubro', 'Hindustan Construction', 'Godrej', 'DLF'],
    alternativeNames: ['Structural Engineer', 'Infrastructure Engineer'],
    relatedFields: ['Architect', 'Project Manager', 'Urban Planner'],
  },
  {
    id: 'doctor',
    name: 'Doctor (MBBS)',
    matchPercentage: 85,
    description: 'Diagnose and treat illnesses, promoting patient health and well-being.',
    whyMatches: [
      'Interest in helping others and healthcare',
      'Strong analytical skills for diagnosis',
      'Excellent communication for patient interaction',
      'Problem-solving in medical scenarios',
    ],
    educationPath: 'MBBS (Bachelor of Medicine, Bachelor of Surgery)',
    coursesNeeded: ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology', 'Clinical Practice'],
    skillsNeeded: [
      'Medical knowledge',
      'Empathy',
      'Communication',
      'Decision-making',
      'Leadership',
    ],
    employmentRate: 89,
    avgSalary: {
      min: 5,
      max: 50,
      experience: 5,
    },
    growthRate: 15,
    jobsAvailable: 100000,
    topCompanies: [
      'Apollo Hospitals',
      'Fortis Healthcare',
      'Max Healthcare',
      'Government Hospitals',
    ],
    alternativeNames: ['Physician', 'Medical Doctor', 'Healthcare Provider'],
    relatedFields: ['Surgeon', 'Psychiatrist', 'Dentist', 'Pharmacist'],
  },
  {
    id: 'chartered-accountant',
    name: 'Chartered Accountant',
    matchPercentage: 80,
    description: 'Manage financial records, audit, and provide tax and investment advice.',
    whyMatches: [
      'Strong interest in numbers and finance',
      'Excellent analytical and logical thinking',
      'Attention to detail for financial accuracy',
      'Problem-solving in business scenarios',
    ],
    educationPath: 'Commerce graduation + CA (Chartered Accountant) qualification',
    coursesNeeded: [
      'Accounting',
      'Taxation',
      'Auditing',
      'Financial Management',
      'Corporate Law',
    ],
    skillsNeeded: ['Accounting', 'Tax planning', 'Auditing', 'Business acumen'],
    employmentRate: 91,
    avgSalary: {
      min: 5,
      max: 30,
      experience: 5,
    },
    growthRate: 12,
    jobsAvailable: 300000,
    topCompanies: [
      'Big 4 Audit Firms',
      'Goldman Sachs',
      'Morgan Stanley',
      'Indian Companies',
    ],
    alternativeNames: ['Accountant', 'Financial Consultant', 'Auditor'],
    relatedFields: ['Cost Accountant', 'Financial Analyst', 'Tax Consultant'],
  },
];

/**
 * Mock Interest Questions
 */
export const MOCK_INTEREST_QUESTIONS: InterestQuestion[] = [
  {
    id: 'q1',
    question: 'Which activity interests you the most?',
    category: 'general',
    options: [
      { label: 'Writing and creative expression', value: 'creative' },
      { label: 'Solving complex mathematical problems', value: 'math' },
      { label: 'Helping and caring for others', value: 'caring' },
      { label: 'Building and creating things', value: 'building' },
    ],
  },
  {
    id: 'q2',
    question: 'I prefer work that is:',
    category: 'work-style',
    options: [
      { label: 'Routine and structured', value: 'structured' },
      { label: 'Varied and unpredictable', value: 'varied' },
      { label: 'Independent', value: 'independent' },
      { label: 'Team-based', value: 'team' },
    ],
  },
  {
    id: 'q3',
    question: 'What environment do you work best in?',
    category: 'environment',
    options: [
      { label: 'Office or lab', value: 'office' },
      { label: 'Outdoors', value: 'outdoors' },
      { label: 'With technology', value: 'tech' },
      { label: 'With people', value: 'people' },
    ],
  },
  {
    id: 'q4',
    question: 'Which subject was your favorite?',
    category: 'subjects',
    options: [
      { label: 'Mathematics', value: 'math' },
      { label: 'Science', value: 'science' },
      { label: 'English/Languages', value: 'language' },
      { label: 'Social Studies', value: 'social' },
    ],
  },
  {
    id: 'q5',
    question: 'I would like to work in an industry related to:',
    category: 'industry',
    options: [
      { label: 'Technology and IT', value: 'technology' },
      { label: 'Healthcare and Medicine', value: 'healthcare' },
      { label: 'Finance and Business', value: 'finance' },
      { label: 'Engineering and Construction', value: 'engineering' },
    ],
  },
  {
    id: 'q6',
    question: 'What motivates you most at work?',
    category: 'motivation',
    options: [
      { label: 'Good salary and benefits', value: 'salary' },
      { label: 'Job security', value: 'security' },
      { label: 'Learning and growth', value: 'learning' },
      { label: 'Helping others', value: 'helping' },
    ],
  },
  {
    id: 'q7',
    question: 'How do you handle challenges?',
    category: 'approach',
    options: [
      { label: 'Seek help immediately', value: 'help' },
      { label: 'Try to solve independently', value: 'independent' },
      { label: 'Research and plan thoroughly', value: 'research' },
      { label: 'Collaborate with team', value: 'collaborate' },
    ],
  },
  {
    id: 'q8',
    question: 'What is your preferred career progression?',
    category: 'progression',
    options: [
      { label: 'Technical expert/specialist', value: 'specialist' },
      { label: 'Management and leadership', value: 'management' },
      { label: 'Entrepreneurship', value: 'entrepreneur' },
      { label: 'Freelance/independent', value: 'freelance' },
    ],
  },
  {
    id: 'q9',
    question: 'Your strongest ability is:',
    category: 'ability',
    options: [
      { label: 'Logical thinking', value: 'logic' },
      { label: 'Creative thinking', value: 'creative' },
      { label: 'Communication skills', value: 'communication' },
      { label: 'Leadership skills', value: 'leadership' },
    ],
  },
  {
    id: 'q10',
    question: 'What is your risk tolerance?',
    category: 'risk',
    options: [
      { label: 'Low - prefer stable jobs', value: 'low' },
      { label: 'Medium - open to challenges', value: 'medium' },
      { label: 'High - enjoy taking risks', value: 'high' },
      { label: 'Very High - want to start own business', value: 'very-high' },
    ],
  },
];

/**
 * Mock College Data
 */
export const MOCK_COLLEGES: CollegeSuggestion[] = [
  {
    id: 'iit-mumbai',
    name: 'Indian Institute of Technology (IIT) Mumbai',
    state: 'Maharashtra',
    type: 'Government',
    ranking: 3,
    jeeAdvancedCutoff: 45,
    relevantCourses: ['B.Tech Computer Science', 'B.Tech Mechanical Engineering'],
    placementRate: 99.2,
    avgPackage: 28,
  },
  {
    id: 'iit-delhi',
    name: 'Indian Institute of Technology (IIT) Delhi',
    state: 'Delhi',
    type: 'Government',
    ranking: 4,
    jeeAdvancedCutoff: 52,
    relevantCourses: ['B.Tech Computer Science', 'B.Tech Electrical Engineering'],
    placementRate: 98.8,
    avgPackage: 26,
  },
  {
    id: 'nit-trichy',
    name: 'National Institute of Technology (NIT) Tiruchirappalli',
    state: 'Tamil Nadu',
    type: 'Government',
    ranking: 15,
    jeeAdvancedCutoff: 178,
    relevantCourses: ['B.Tech Computer Science', 'B.Tech Civil Engineering'],
    placementRate: 96.5,
    avgPackage: 14.5,
  },
  {
    id: 'delhi-university',
    name: 'Delhi University - Ramakrishna College',
    state: 'Delhi',
    type: 'Government',
    ranking: 25,
    relevantCourses: ['B.A Economics', 'B.Com'],
    placementRate: 85,
    avgPackage: 8,
  },
  {
    id: 'vit-vellore',
    name: 'VIT Vellore',
    state: 'Tamil Nadu',
    type: 'Private',
    ranking: 20,
    relevantCourses: ['B.Tech Computer Science', 'B.Tech Mechanical Engineering'],
    placementRate: 95,
    avgPackage: 12,
  },
  {
    id: 'manipal',
    name: 'Manipal Academy of Higher Education',
    state: 'Karnataka',
    type: 'Private',
    ranking: 28,
    relevantCourses: ['B.Tech Computer Science', 'B.Tech Medical'],
    placementRate: 92,
    avgPackage: 11,
  },
  {
    id: 'aiims-delhi',
    name: 'AIIMS Delhi',
    state: 'Delhi',
    type: 'Government',
    ranking: 1,
    neetCutoff: 685,
    relevantCourses: ['MBBS', 'BDS'],
    placementRate: 98,
    avgPackage: 15,
  },
  {
    id: 'jnu-delhi',
    name: 'Jawaharlal Nehru University (JNU)',
    state: 'Delhi',
    type: 'Government',
    ranking: 12,
    relevantCourses: ['BA International Relations', 'MA Economics'],
    placementRate: 78,
    avgPackage: 9,
  },
];

/**
 * Mock Salary Progression Data
 */
export const MOCK_SALARY_DATA: SalaryData[] = [
  { year: 0, salary: 6, role: 'Junior Developer' },
  { year: 1, salary: 8, role: 'Junior Developer' },
  { year: 2, salary: 10, role: 'Developer' },
  { year: 3, salary: 13, role: 'Developer' },
  { year: 4, salary: 16, role: 'Senior Developer' },
  { year: 5, salary: 20, role: 'Senior Developer' },
  { year: 6, salary: 25, role: 'Team Lead' },
  { year: 7, salary: 30, role: 'Technical Lead' },
  { year: 8, salary: 35, role: 'Manager' },
  { year: 10, salary: 45, role: 'Senior Manager' },
];

/**
 * Mock Roadmap Data
 */
export const MOCK_ROADMAP: RoadmapStep[] = [
  {
    step: 1,
    timeline: 'Next 6 Months',
    title: 'Foundation Building',
    description: 'Strengthen fundamentals in mathematics and computer science',
    actions: [
      'Study Data Structures and Algorithms',
      'Learn Core Java or Python',
      'Build 2-3 small projects',
      'Join coding competitions (HackerEarth, CodeChef)',
    ],
    achievements: [
      'Understand DSA concepts',
      'Complete 2 small projects',
      'Participate in 2-3 competitions',
    ],
  },
  {
    step: 2,
    timeline: '6-12 Months',
    title: 'Advanced Learning',
    description: 'Deepen knowledge in specialized areas',
    actions: [
      'Learn Web Development or Mobile Development',
      'Build a portfolio project',
      'Learn Git and GitHub',
      'Start contributing to open-source projects',
    ],
    achievements: [
      'Build 1 advanced project',
      'Start open-source contributions',
      'Develop portfolio website',
    ],
  },
  {
    step: 3,
    timeline: '12-18 Months',
    title: 'Interview Preparation',
    description: 'Prepare for placements and internships',
    actions: [
      'Solve interview questions (LeetCode)',
      'Prepare 2-3 advanced projects',
      'Mock interviews',
      'Study system design basics',
    ],
    achievements: [
      'Solve 100+ DSA problems',
      'Complete mock interviews',
      'Have 3-4 portfolio projects ready',
    ],
  },
  {
    step: 4,
    timeline: '18+ Months',
    title: 'Career Launch',
    description: 'Secure internship or full-time position',
    actions: [
      'Apply to companies',
      'Attend campus placements',
      'Negotiate offers',
      'Join as Intern/Junior Developer',
    ],
    achievements: [
      'Secure internship/job offer',
      'Join as entry-level professional',
      'Start professional growth',
    ],
  },
];

/**
 * Mock Subjects based on Stream
 */
export const SUBJECTS_BY_STREAM: Record<string, Subject[]> = {
  Science: ['English', 'Hindi', 'Math', 'Physics', 'Chemistry', 'Biology'],
  Commerce: ['English', 'Hindi', 'Economics', 'Accounts', 'Business Studies'],
  Arts: ['English', 'Hindi', 'History', 'Geography', 'Political Science'],
};

/**
 * Indian States
 */
export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

/**
 * Education Boards
 */
export const EDUCATION_BOARDS = ['CBSE', 'ICSE', 'State Board', 'IB'];

/**
 * Assessment Steps Labels
 */
export const ASSESSMENT_STEPS = [
  'Student Info',
  'Academic',
  'Interests',
  'Skills',
  'Preferences',
  'Review',
];
