/**
 * Assessment Service - Handles all assessment-related API calls
 */

import { api } from './api';

// ============================================================================
// TYPES
// ============================================================================

export interface AcademicData {
  stream: string;
  current_class: number;
  gpa: number;
  result: string;
  strong_subject: string;
  weak_subject: string;
}

export interface SubjectMark {
  subject: string;
  marks: number;
  max_marks: number;
  percentage: number;
}

export interface SkillRatings {
  logical_reasoning: number;
  communication: number;
  analytical_thinking: number;
  problem_solving: number;
  teamwork: number;
  leadership: number;
  creativity: number;
  time_management: number;
}

export interface InterestResponse {
  question_id: string;
  selected_option: string;
  category: string;
}

export interface Preferences {
  prefer_government_job: boolean;
  willing_to_relocate: boolean;
  income_expectation: number;
  work_life_balance: 'high' | 'medium' | 'low';
  study_abroad: boolean;
  entrepreneurship: boolean;
}

export interface CareerMatch {
  id: string;
  name: string;
  match_percentage: number;
  description: string;
  salary: {
    min: number;
    max: number;
  };
  employment_rate: number;
}

export interface College {
  id: string;
  name: string;
  state: string;
  ranking: number;
  placement_rate: number;
  avg_package: number;
}

export interface CareerReport {
  id: string;
  user_id: string;
  student_name: string;
  test_date: string;
  top_careers: CareerMatch[];
  colleges: College[];
  roadmap: any[];
  salary_prediction: any[];
}

export interface AssessmentProgress {
  current_step: number;
  completed_steps: number[];
  assessment_complete: boolean;
}

// ============================================================================
// ACADEMIC ENDPOINTS
// ============================================================================

/**
 * Submit academic information
 */
export async function submitAcademicData(data: AcademicData): Promise<any> {
  return api.post('/assessments/academic', data);
}

/**
 * Add subject marks
 */
export async function addSubjectMarks(
  academicId: string,
  marks: SubjectMark[]
): Promise<any> {
  return api.post(`/assessments/academic/${academicId}/marks`, { marks });
}

/**
 * Get academic data
 */
export async function getAcademicData(): Promise<AcademicData & { subjects: SubjectMark[] }> {
  return api.get('/assessments/academic');
}

// ============================================================================
// SKILLS ENDPOINTS
// ============================================================================

/**
 * Submit skill ratings
 */
export async function submitSkillRatings(data: SkillRatings): Promise<any> {
  return api.post('/assessments/skills', data);
}

/**
 * Get skill ratings
 */
export async function getSkillRatings(): Promise<SkillRatings> {
  return api.get('/assessments/skills');
}

// ============================================================================
// INTERESTS ENDPOINTS
// ============================================================================

/**
 * Submit interest responses
 */
export async function submitInterestResponses(
  responses: InterestResponse[]
): Promise<any> {
  return api.post('/assessments/interests', { responses });
}

/**
 * Get interest responses
 */
export async function getInterestResponses(): Promise<{ responses: InterestResponse[] }> {
  return api.get('/assessments/interests');
}

// ============================================================================
// PREFERENCES ENDPOINTS
// ============================================================================

/**
 * Submit preferences
 */
export async function submitPreferences(data: Preferences): Promise<any> {
  return api.post('/assessments/preferences', data);
}

/**
 * Get preferences
 */
export async function getPreferences(): Promise<Preferences> {
  return api.get('/assessments/preferences');
}

// ============================================================================
// REPORT ENDPOINTS
// ============================================================================

/**
 * Generate career report
 */
export async function generateCareerReport(): Promise<CareerReport> {
  return api.post('/assessments/generate-report', {});
}

/**
 * Get career report
 */
export async function getCareerReport(): Promise<CareerReport> {
  return api.get('/assessments/report');
}

// ============================================================================
// PROGRESS ENDPOINTS
// ============================================================================

/**
 * Get assessment progress
 */
export async function getAssessmentProgress(): Promise<AssessmentProgress> {
  return api.get('/assessments/progress');
}

/**
 * Update assessment progress
 */
export async function updateAssessmentProgress(data: Partial<AssessmentProgress>): Promise<any> {
  return api.put('/assessments/progress', data);
}
