/**
 * useStudentData Hook - Consolidates all API GET methods and stores data
 * Path: src/hooks/useStudentData.ts
 * 
 * Usage: 
 * const { data, loading, error, refetch } = useStudentData(studentId);
 * 
 * Fetches:
 * - Academic Data
 * - Skill Ratings
 * - Interest Responses
 * - Career Preferences
 * - Career Report
 * - All Student Data
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  getAcademicData,
  getSkillRatings,
  getInterestResponses,
  getCareerPreferences,
  getReport,
} from '@/services/allApiServices';

interface StudentDataStore {
  academicData: any | null;
  skillRatings: any | null;
  interestResponses: any | null;
  careerPreferences: any | null;
  careerReport: any | null;
}

interface UseStudentDataReturn extends StudentDataStore {
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isRefreshing: boolean;
  data: StudentDataStore;
}

/**
 * Custom hook to fetch and store all student data
 * @param studentId - The student ID to fetch data for
 * @returns Object with all student data, loading state, error, and refetch function
 */
export function useStudentData(studentId: string | null | undefined | any): UseStudentDataReturn {
  const [data, setData] = useState<StudentDataStore>({
    academicData: null,
    skillRatings: null,
    interestResponses: null,
    careerPreferences: null,
    careerReport: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAllStudentData = useCallback(async () => {
    if (!studentId) {
      setError('Student ID is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch all data in parallel for better performance
      const [
        academicDataRes,
        skillRatingsRes,
        interestResponsesRes,
        careerPreferencesRes,
        reportRes,
      ] = await Promise.all([
        getAcademicData(studentId),
        getSkillRatings(studentId),
        getInterestResponses(studentId),
        getCareerPreferences(studentId),
        getReport(studentId),
      ]);

      setData({
        academicData: academicDataRes || null,
        skillRatings: skillRatingsRes || null,
        interestResponses: interestResponsesRes || null,
        careerPreferences: careerPreferencesRes || null,
        careerReport: reportRes || null,
      });

      console.log('Student data fetched successfully:', {
        academicData: academicDataRes,
        skillRatings: skillRatingsRes,
        interestResponses: interestResponsesRes,
        careerPreferences: careerPreferencesRes,
        careerReport: reportRes,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch student data';
      setError(errorMessage);
      console.error('Error fetching student data:', err);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  /**
   * Refetch all data manually
   */
  const refetch = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await fetchAllStudentData();
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchAllStudentData]);

  /**
   * Auto-fetch when component mounts or studentId changes
   */
  useEffect(() => {
    fetchAllStudentData();
  }, [fetchAllStudentData]);

  return {
    ...data,
    data,
    loading,
    error,
    refetch,
    isRefreshing,
  };
}

/**
 * Hook to fetch only specific student data
 * @param studentId - The student ID to fetch data for
 * @param dataType - The type of data to fetch: 'academic' | 'skills' | 'interests' | 'preferences' | 'report' | 'all'
 * @returns Object with requested data, loading state, error, and refetch function
 */
export function useStudentDataByType(
  studentId: string | null | undefined,
  dataType: 'academic' | 'skills' | 'interests' | 'preferences' | 'report' | 'all' = 'all'
) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!studentId) {
      setError('Student ID is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let result;

      switch (dataType) {
        case 'academic':
          result = await getAcademicData(studentId);
          break;
        case 'skills':
          result = await getSkillRatings(studentId);
          break;
        case 'interests':
          result = await getInterestResponses(studentId);
          break;
        case 'preferences':
          result = await getCareerPreferences(studentId);
          break;
        case 'report':
          result = await getReport(studentId);
          break;
      }

      setData(result || null);
      console.log(`${dataType} data fetched successfully:`, result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to fetch ${dataType} data`;
      setError(errorMessage);
      console.error(`Error fetching ${dataType} data:`, err);
    } finally {
      setLoading(false);
    }
  }, [studentId, dataType]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}
