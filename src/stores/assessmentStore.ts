import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  AssessmentStore,
  StudentInfo,
  AcademicData,
  InterestResponse,
  SkillRating,
  Preferences,
  CareerReport,
} from '@/types';
import { submitSkillData } from '@/services/allApiServices';

const INITIAL_STATE = {
  studentInfo: null,
  academicData: null,
  interests: [],
  skills: null,
  preferences: null,
  currentStep: 0,
  completedSteps: [],
  assessmentComplete: false,
  careerReport: null,
};

/**
 * Zustand store for managing assessment state
 * Persists data to localStorage for data recovery
 */
export const useAssessmentStore = create<AssessmentStore>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      // Student info actions
      setStudentInfo: (info: StudentInfo) =>
        set((state) => ({
          ...state,
          studentInfo: info,
        })),

      // Academic data actions
      setAcademicData: (data: AcademicData) =>
        set((state) => ({
          ...state,
          academicData: data,
        })),

      // Interest responses actions
      // addInterestResponse: (response: InterestResponse) =>
      //   set((state) => ({
      //     ...state,
      //     interests: [...state.interests, response],
      //   })),

       addInterestResponse: async(response: InterestResponse) =>{
          console.log('Adding interest response to store:', response);

          // const reps = await submitSkillData({
          //   "skill_name": response.,
          //   "proficiency_level": 100,
          //   "description": "string",
          //   "student_id": 0
          // });
            set((state) => ({
          ...state,
          interests: [...state.interests, response],
        }));
       },
        

      // Skills actions
      setSkills: (skills: SkillRating) =>
        set((state) => ({
          ...state,
          skills,
        })),

      // Preferences actions
      setPreferences: (preferences: Preferences) =>
        set((state) => ({
          ...state,
          preferences,
        })),

      // Step management actions
      setCurrentStep: (step: number) =>
        set((state) => ({
          ...state,
          currentStep: step,
        })),

      markStepComplete: (step: number) =>
        set((state) => ({
          ...state,
          completedSteps: [...new Set([...state.completedSteps, step])],
        })),

      setAssessmentComplete: (complete: boolean) =>
        set((state) => ({
          ...state,
          assessmentComplete: complete,
        })),

      // Career report actions
      setCareerReport: (report: CareerReport) =>
        set((state) => ({
          ...state,
          careerReport: report,
        })),

      // Reset assessment
      resetAssessment: () => set(INITIAL_STATE),
    }),
    {
      name: 'assessment-store', // localStorage key
      version: 1,
      partialize: (state) => ({
        studentInfo: state.studentInfo,
        academicData: state.academicData,
        interests: state.interests,
        skills: state.skills,
        preferences: state.preferences,
        currentStep: state.currentStep,
        completedSteps: state.completedSteps,
        assessmentComplete: state.assessmentComplete,
        careerReport: state.careerReport,
      }),
    }
  )
);

/**
 * Exported getters and selectors for better performance
 */
export const selectStudentInfo = (state: AssessmentStore) => state.studentInfo;
export const selectAcademicData = (state: AssessmentStore) => state.academicData;
export const selectInterests = (state: AssessmentStore) => state.interests;
export const selectSkills = (state: AssessmentStore) => state.skills;
export const selectPreferences = (state: AssessmentStore) => state.preferences;
export const selectCurrentStep = (state: AssessmentStore) => state.currentStep;
export const selectCompletedSteps = (state: AssessmentStore) => state.completedSteps;
export const selectAssessmentComplete = (state: AssessmentStore) => state.assessmentComplete;
export const selectCareerReport = (state: AssessmentStore) => state.careerReport;
