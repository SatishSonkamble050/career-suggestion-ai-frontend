/**
 * Student Service - Handles student profile and information API calls
 */

import { api } from './api';

export interface StudentInfo {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  state: string;
  board: 'CBSE' | 'ICSE' | 'State Board' | 'IB';
  created_at: string;
}

export interface CreateStudentInfoRequest {
  name: string;
  phone: string;
  date_of_birth: string;
  state: string;
  board: 'CBSE' | 'ICSE' | 'State Board' | 'IB';
}

/**
 * Create student information
 */
export async function createStudentInfo(data: CreateStudentInfoRequest): Promise<StudentInfo> {
  return api.post('/students/info', data);
}

/**
 * Get student profile
 */
export async function getStudentProfile(studentId: string): Promise<StudentInfo> {
  return api.get(`/students/${studentId}`);
}

/**
 * Get current user's student info
 */
export async function getCurrentStudentInfo(): Promise<StudentInfo> {
  return api.get('/students/me');
}

/**
 * Update student information
 */
export async function updateStudentInfo(
  data: Partial<CreateStudentInfoRequest>
): Promise<StudentInfo> {
  return api.put('/students/me', data);
}
