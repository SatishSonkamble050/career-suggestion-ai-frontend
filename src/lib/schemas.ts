import { stat } from 'fs';
import { z } from 'zod';

/**
 * Authentication Schemas
 */
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
    // sate options can be fetched from API or defined as an enum
    state: z.string().min(1, 'State is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

/**
 * Student Information Schema
 */
export const studentInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  state: z.string().min(1, 'State is required'),
  board: z.enum(['CBSE', 'ICSE', 'State Board', 'IB'], {
    errorMap: () => ({ message: 'Invalid board selection' }),
  }),
});

/**
 * Academic Data Schema
 */
export const academicMarksSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  marks: z.number().min(0, 'Marks cannot be negative').max(100, 'Marks cannot exceed 100'),
  maxMarks: z.number().min(1, 'Max marks must be at least 1'),
  percentage: z.number().min(0).max(100),
});

export const academicDataSchema = z.object({
  stream: z.enum(['Science', 'Commerce', 'Arts'], {
    errorMap: () => ({ message: 'Invalid stream selection' }),
  }),
  currentClass: z.number().min(10, 'Class must be 10 or above').max(12, 'Class must be 12 or below'),
  marks: z.array(academicMarksSchema).min(1, 'At least one subject is required'),
  strongSubject: z.string().min(1, 'Please select your strongest subject'),
  weakSubject: z.string().min(1, 'Please select your weakest subject'),
  gpa: z.number().min(0).max(10, 'GPA must be between 0 and 10'),
  result: z.enum(['Pass', 'Fail'], {
    errorMap: () => ({ message: 'Invalid result' }),
  }),
});

/**
 * Skills Assessment Schema
 */
export const skillRatingSchema = z.object({
  logicalReasoning: z.number().min(1).max(10, 'Rating must be between 1 and 10'),
  communication: z.number().min(1).max(10, 'Rating must be between 1 and 10'),
  analyticalThinking: z.number().min(1).max(10, 'Rating must be between 1 and 10'),
  problemSolving: z.number().min(1).max(10, 'Rating must be between 1 and 10'),
  teamwork: z.number().min(1).max(10, 'Rating must be between 1 and 10'),
  leadership: z.number().min(1).max(10, 'Rating must be between 1 and 10'),
  creativity: z.number().min(1).max(10, 'Rating must be between 1 and 10'),
  timeManagement: z.number().min(1).max(10, 'Rating must be between 1 and 10'),
});

/**
 * Preferences Schema
 */
export const preferencesSchema = z.object({
  preferGovernmentJob: z.boolean(),
  willingToRelocate: z.boolean(),
  incomeExpectation: z
    .number()
    .min(1, 'Income expectation must be at least 1 lakh')
    .max(100, 'Income expectation cannot exceed 100 lakhs'),
  workLifeBalance: z.enum(['high', 'medium', 'low']),
  studyAbroad: z.boolean(),
  entrepreneurship: z.boolean(),
});

/**
 * Interest Questions Schema
 */
export const interestResponseSchema = z.object({
  questionId: z.string().min(1),
  selectedOption: z.string().min(1),
  category: z.string().min(1),
});

/**
 * Profile Update Schema
 */
export const profileUpdateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits').optional(),
});

/**
 * Export types from schemas
 */
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type StudentInfoFormData = z.infer<typeof studentInfoSchema>;
export type AcademicDataFormData = z.infer<typeof academicDataSchema>;
export type SkillRatingFormData = z.infer<typeof skillRatingSchema>;
export type PreferencesFormData = z.infer<typeof preferencesSchema>;
export type InterestResponseFormData = z.infer<typeof interestResponseSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
