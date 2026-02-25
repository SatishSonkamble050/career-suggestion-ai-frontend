/**
 * Student Information Types
 */
export interface StudentInfo {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  state: string;
  board: string;
}

/**
 * Academic Data Types
 */
export type Stream = 'Science' | 'Commerce' | 'Arts';
export type Subject = 'English' | 'Hindi' | 'Math' | 'Physics' | 'Chemistry' | 'Biology' | 'Economics' | 'History' | 'Geography' | 'Political Science' | 'Accounts' | 'Business Studies';

export interface AcademicMarks {
  subject: Subject | string;
  marks: number;
  maxMarks: number;
  percentage: number;
}

export interface AcademicData {
  stream: Stream;
  currentClass: number;
  marks: AcademicMarks[];
  strongSubject: Subject;
  weakSubject: Subject;
  gpa: number;
  result: string; // Pass/Fail
}

/**
 * Interest & Skill Assessment Types
 */
export interface InterestQuestion {
  id: string;
  question: string;
  category: string;
  options: { label: string; value: string }[];
}

export interface InterestResponse {
  questionId: string;
  selectedOption: string;
  category: string;
}

export interface SkillRating {
  logicalReasoning: number; // 1-10
  communication: number; // 1-10
  analyticalThinking: number; // 1-10
  problemSolving: number; // 1-10
  teamwork: number; // 1-10
  leadership: number; // 1-10
  creativity: number; // 1-10
  timeManagement: number; // 1-10
}

/**
 * Preferences Types
 */
export interface Preferences {
  preferGovernmentJob: boolean;
  willingToRelocate: boolean;
  incomeExpectation: number; // in lakhs per annum
  workLifeBalance: 'high' | 'medium' | 'low';
  studyAbroad: boolean;
  entrepreneurship: boolean;
}

/**
 * Career Assessment Types
 */
export interface CareerMatch {
  id: string;
  name: string;
  matchPercentage: number;
  description: string;
  whyMatches: string[];
  educationPath: string;
  coursesNeeded: string[];
  skillsNeeded: string[];
  employmentRate: number;
  avgSalary: {
    min: number; // in lakhs
    max: number;
    experience: number; // years
  };
  growthRate: number;
  jobsAvailable: number;
  topCompanies: string[];
  alternativeNames: string[];
  relatedFields: string[];
}

export interface CareerReport {
  studentName: string;
  testDate: string;
  topCareers: CareerMatch[];
  collegeSuggestions: CollegeSuggestion[];
  salaryPrediction: SalaryData[];
  roadmap: RoadmapStep[];
  backupOptions: CareerMatch[];
}

/**
 * College Suggestion Types
 */
export interface CollegeSuggestion {
  id: string;
  name: string;
  state: string;
  type: 'Government' | 'Private' | 'Deemed';
  ranking: number;
  neetCutoff?: number;
  jeeAdvancedCutoff?: number;
  relevantCourses: string[];
  placementRate: number;
  avgPackage: number; // in lakhs
}

/**
 * Salary Prediction Types
 */
export interface SalaryData {
  year: number;
  salary: number; // in lakhs
  role: string;
}

/**
 * Roadmap Types
 */
export interface RoadmapStep {
  step: number;
  timeline: string;
  title: string;
  description: string;
  actions: string[];
  achievements: string[];
}

/**
 * Assessment Store State
 */
export interface AssessmentStore {
  // Student info
  studentInfo: StudentInfo | null;
  
  // Academic data
  academicData: AcademicData | null;
  
  // Interests and skills
  interests: InterestResponse[];
  skills: SkillRating | null;
  
  // Preferences
  preferences: Preferences | null;
  
  // Assessment tracking
  currentStep: number;
  completedSteps: number[];
  assessmentComplete: boolean;
  
  // Career report
  careerReport: CareerReport | null;
  
  // Actions
  setStudentInfo: (info: StudentInfo) => void;
  setAcademicData: (data: AcademicData) => void;
  addInterestResponse: (response: InterestResponse) => void;
  setSkills: (skills: SkillRating) => void;
  setPreferences: (preferences: Preferences) => void;
  setCurrentStep: (step: number) => void;
  markStepComplete: (step: number) => void;
  setAssessmentComplete: (complete: boolean) => void;
  setCareerReport: (report: CareerReport) => void;
  resetAssessment: () => void;
}

/**
 * UI Component Types
 */
export interface QuestionCardProps {
  question: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  selected?: string;
  type?: 'radio' | 'checkbox';
}

export interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export interface CareerCardProps {
  career: CareerMatch;
  onSelect?: () => void;
}

/**
 * Form Types
 */
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  state: string;
}

export interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  state: string;
  board: string;
}

/**
 * API Response Types
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Utility Types
 */
export type Tab = 'all' | 'favorites' | 'recent';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: Date;
}
