import type {
  AcademicData,
  SkillRating,
  Preferences,
  InterestResponse,
  CareerMatch,
  CareerReport,
} from '@/types';
import { MOCK_CAREERS, MOCK_COLLEGES, MOCK_SALARY_DATA, MOCK_ROADMAP } from '@/constants/mockData';

/**
 * Calculate career match percentage based on student's profile
 */
export const calculateCareerMatch = (
  skills: SkillRating | null,
  academicData: AcademicData | null,
  interests: InterestResponse[],
  preferences: Preferences | null
): Record<string, number> => {
  const matches: Record<string, number> = {};

  // Base calculation factors
  const skillsScore = skills
    ? (skills.analyticalThinking +
        skills.logicalReasoning +
        skills.communication +
        skills.problemSolving +
        skills.creativity) /
      5
    : 50;

  const academicScore = academicData?.gpa ? academicData.gpa * 10 : 50;

  // Career-specific matching logic
  MOCK_CAREERS.forEach((career) => {
    let score = 70; // Base score

    // Adjust based on skills
    if (career.id === 'software-engineer') {
      score +=
        (skills?.logicalReasoning || 5) * 2 +
        (skills?.analyticalThinking || 5) * 1.5 -
        20;
    } else if (career.id === 'data-scientist') {
      score += (skills?.analyticalThinking || 5) * 2 + (skills?.logicalReasoning || 5) - 20;
    } else if (career.id === 'doctor') {
      score += (skills?.communication || 5) * 2 + (skills?.teamwork || 5) - 20;
    } else if (career.id === 'chartered-accountant') {
      score += (skills?.analyticalThinking || 5) * 2 + (academicScore / 10) * 2 - 20;
    }

    // Adjust based on academics
    score += academicScore / 10;

    // Clamp between 50-95
    matches[career.id] = Math.min(95, Math.max(50, score));
  });

  return matches;
};

/**
 * Generate career report based on student profile
 */
export const generateCareerReport = (
  studentName: string,
  skills: SkillRating | null,
  academicData: AcademicData | null,
  interests: InterestResponse[],
  preferences: Preferences | null
): CareerReport => {
  const matches = calculateCareerMatch(skills, academicData, interests, preferences);

  // Sort careers by match percentage
  const sortedCareers = MOCK_CAREERS.sort(
    (a, b) => (matches[b.id] || 0) - (matches[a.id] || 0)
  ).map((career) => ({
    ...career,
    matchPercentage: Math.round(matches[career.id] || career.matchPercentage),
  }));

  // Get top 5 careers
  const topCareers = sortedCareers.slice(0, 5);
  const backupOptions = sortedCareers.slice(5);

  // Filter colleges based on state (from student info if available)
  const collegeSuggestions = MOCK_COLLEGES.slice(0, 6);

  return {
    studentName,
    testDate: new Date().toISOString().split('T')[0],
    topCareers,
    collegeSuggestions,
    salaryPrediction: MOCK_SALARY_DATA,
    roadmap: MOCK_ROADMAP,
    backupOptions: backupOptions.slice(0, 3),
  };
};

/**
 * Format percentage with styling
 */
export const formatPercentage = (percentage: number): string => {
  return `${Math.round(percentage)}%`;
};

/**
 * Format salary with proper currency format
 */
export const formatSalary = (salary: number, format: 'short' | 'full' = 'short'): string => {
  if (format === 'short') {
    return `₹${salary}L`;
  }
  return `₹${salary} Lakhs Per Annum`;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (10 digits)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

/**
 * Calculate GPA from marks
 */
export const calculateGPA = (percentage: number): number => {
  // Convert percentage to GPA (0-10 scale)
  return Math.round((percentage / 100) * 10 * 10) / 10;
};

/**
 * Calculate average percentage
 */
export const calculateAveragePercentage = (marks: Array<{ marks: number; maxMarks: number }>) => {
  if (marks.length === 0) return 0;
  const totalPercentage = marks.reduce((sum, mark) => {
    return sum + (mark.marks / mark.maxMarks) * 100;
  }, 0);
  return Math.round((totalPercentage / marks.length) * 10) / 10;
};

/**
 * Get skill level label
 */
export const getSkillLevelLabel = (rating: number): string => {
  if (rating <= 2) return 'Beginner';
  if (rating <= 4) return 'Basic';
  if (rating <= 6) return 'Intermediate';
  if (rating <= 8) return 'Advanced';
  return 'Expert';
};

/**
 * Get skill level color
 */
export const getSkillLevelColor = (rating: number): string => {
  if (rating <= 2) return 'bg-red-100 text-red-800';
  if (rating <= 4) return 'bg-orange-100 text-orange-800';
  if (rating <= 6) return 'bg-yellow-100 text-yellow-800';
  if (rating <= 8) return 'bg-blue-100 text-blue-800';
  return 'bg-green-100 text-green-800';
};

/**
 * Get match percentage color
 */
export const getMatchColor = (percentage: number): string => {
  if (percentage >= 90) return 'text-green-600';
  if (percentage >= 75) return 'text-blue-600';
  if (percentage >= 60) return 'text-yellow-600';
  return 'text-orange-600';
};

/**
 * Get match percentage background color
 */
export const getMatchBgColor = (percentage: number): string => {
  if (percentage >= 90) return 'bg-green-50';
  if (percentage >= 75) return 'bg-blue-50';
  if (percentage >= 60) return 'bg-yellow-50';
  return 'bg-orange-50';
};

/**
 * Format date to readable format
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Get assessment progress percentage
 */
export const getAssessmentProgress = (completedSteps: number[], totalSteps: number): number => {
  return Math.round((completedSteps.length / totalSteps) * 100);
};

/**
 * Check if all required fields are filled
 */
export const isReviewPageReady = (
  studentInfo: any,
  academicData: any,
  interests: any[],
  skills: any,
  preferences: any
): boolean => {
  return !!(
    studentInfo &&
    academicData &&
    interests.length > 0 &&
    skills &&
    preferences
  );
};

/**
 * Mock authentication check
 */
export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('authToken');
  }
  return false;
};

/**
 * Mock login
 */
export const mockLogin = (email: string, password: string): boolean => {
  if (isValidEmail(email) && password.length >= 6) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', 'mock_token_' + Date.now());
      localStorage.setItem('userEmail', email);
    }
    return true;
  }
  return false;
};

/**
 * Mock logout
 */
export const mockLogout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
  }
};

/**
 * Get current user
 */
export const getCurrentUser = (): { email: string } | null => {
  if (typeof window !== 'undefined') {
    const email = localStorage.getItem('userEmail');
    return email ? { email } : null;
  }
  return null;
};

/**
 * Capitalize first letter
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert snake_case to Title Case
 */
export const snakeCaseToTitleCase = (str: string): string => {
  return str
    .split('_')
    .map((word) => capitalize(word))
    .join(' ');
};

export const formatDate2 = (dateString: string): string => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");

  const month = date.toLocaleString("en-US", {
    month: "short",
  });

  const year = date.getFullYear();

  return `${day} - ${month} - ${year}`;
};
