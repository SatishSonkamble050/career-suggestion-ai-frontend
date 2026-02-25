/**
 * useAssessment Hook - Assessment management hook
 */

'use client';

import { useState, useCallback } from 'react';
import {
  submitAcademicData,
  getAcademicData,
  submitSkillRatings,
  getSkillRatings,
  submitInterestResponses,
  getInterestResponses,
  submitPreferences,
  getPreferences,
  generateCareerReport,
  getCareerReport,
  AcademicData,
  SkillRatings,
  InterestResponse,
  Preferences,
  CareerReport,
} from '@/services/assessment';
import { useApi } from './useApi';

interface UseAssessmentReturn {
  // Data
  academicData: AcademicData | null;
  skillRatings: SkillRatings | null;
  interestResponses: InterestResponse[] | null;
  preferences: Preferences | null;
  careerReport: CareerReport | null;

  // Loading states
  loadingAcademic: boolean;
  loadingSkills: boolean;
  loadingInterests: boolean;
  loadingPreferences: boolean;
  loadingReport: boolean;

  // Error states
  errorAcademic: string | null;
  errorSkills: string | null;
  errorInterests: string | null;
  errorPreferences: string | null;
  errorReport: string | null;

  // Functions
  submitAcademic: (data: AcademicData) => Promise<void>;
  fetchAcademic: () => Promise<void>;
  submitSkills: (data: SkillRatings) => Promise<void>;
  fetchSkills: () => Promise<void>;
  submitInterests: (data: InterestResponse[]) => Promise<void>;
  fetchInterests: () => Promise<void>;
  submitPrefs: (data: Preferences) => Promise<void>;
  fetchPrefs: () => Promise<void>;
  generateReport: () => Promise<void>;
  fetchReport: () => Promise<void>;
}

/**
 * Hook for assessment management
 */
export function useAssessment(): UseAssessmentReturn {
  const [academicData, setAcademicData] = useState<AcademicData | null>(null);
  const [skillRatings, setSkillRatings] = useState<SkillRatings | null>(null);
  const [interestResponses, setInterestResponses] = useState<InterestResponse[] | null>(null);
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [careerReport, setCareerReport] = useState<CareerReport | null>(null);

  const [loadingAcademic, setLoadingAcademic] = useState(false);
  const [loadingSkills, setLoadingSkills] = useState(false);
  const [loadingInterests, setLoadingInterests] = useState(false);
  const [loadingPreferences, setLoadingPreferences] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  const [errorAcademic, setErrorAcademic] = useState<string | null>(null);
  const [errorSkills, setErrorSkills] = useState<string | null>(null);
  const [errorInterests, setErrorInterests] = useState<string | null>(null);
  const [errorPreferences, setErrorPreferences] = useState<string | null>(null);
  const [errorReport, setErrorReport] = useState<string | null>(null);

  // ============================================================================
  // ACADEMIC
  // ============================================================================

  const submitAcademic = useCallback(async (data: AcademicData) => {
    setLoadingAcademic(true);
    setErrorAcademic(null);
    try {
      await submitAcademicData(data);
      setAcademicData(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit academic data';
      setErrorAcademic(message);
      throw err;
    } finally {
      setLoadingAcademic(false);
    }
  }, []);

  const fetchAcademic = useCallback(async () => {
    setLoadingAcademic(true);
    setErrorAcademic(null);
    try {
      const data = await getAcademicData();
      setAcademicData(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch academic data';
      setErrorAcademic(message);
    } finally {
      setLoadingAcademic(false);
    }
  }, []);

  // ============================================================================
  // SKILLS
  // ============================================================================

  const submitSkills = useCallback(async (data: SkillRatings) => {
    setLoadingSkills(true);
    setErrorSkills(null);
    try {
      await submitSkillRatings(data);
      setSkillRatings(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit skills';
      setErrorSkills(message);
      throw err;
    } finally {
      setLoadingSkills(false);
    }
  }, []);

  const fetchSkills = useCallback(async () => {
    setLoadingSkills(true);
    setErrorSkills(null);
    try {
      const data = await getSkillRatings();
      setSkillRatings(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch skills';
      setErrorSkills(message);
    } finally {
      setLoadingSkills(false);
    }
  }, []);

  // ============================================================================
  // INTERESTS
  // ============================================================================

  const submitInterests = useCallback(async (data: InterestResponse[]) => {
    setLoadingInterests(true);
    setErrorInterests(null);
    try {
      await submitInterestResponses(data);
      setInterestResponses(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit interests';
      setErrorInterests(message);
      throw err;
    } finally {
      setLoadingInterests(false);
    }
  }, []);

  const fetchInterests = useCallback(async () => {
    setLoadingInterests(true);
    setErrorInterests(null);
    try {
      const { responses } = await getInterestResponses();
      setInterestResponses(responses);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch interests';
      setErrorInterests(message);
    } finally {
      setLoadingInterests(false);
    }
  }, []);

  // ============================================================================
  // PREFERENCES
  // ============================================================================

  const submitPrefs = useCallback(async (data: Preferences) => {
    setLoadingPreferences(true);
    setErrorPreferences(null);
    try {
      await submitPreferences(data);
      setPreferences(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit preferences';
      setErrorPreferences(message);
      throw err;
    } finally {
      setLoadingPreferences(false);
    }
  }, []);

  const fetchPrefs = useCallback(async () => {
    setLoadingPreferences(true);
    setErrorPreferences(null);
    try {
      const data = await getPreferences();
      setPreferences(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch preferences';
      setErrorPreferences(message);
    } finally {
      setLoadingPreferences(false);
    }
  }, []);

  // ============================================================================
  // REPORT
  // ============================================================================

  const generateReport = useCallback(async () => {
    setLoadingReport(true);
    setErrorReport(null);
    try {
      const report = await generateCareerReport();
      setCareerReport(report);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate report';
      setErrorReport(message);
      throw err;
    } finally {
      setLoadingReport(false);
    }
  }, []);

  const fetchReport = useCallback(async () => {
    setLoadingReport(true);
    setErrorReport(null);
    try {
      const report = await getCareerReport();
      setCareerReport(report);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch report';
      setErrorReport(message);
    } finally {
      setLoadingReport(false);
    }
  }, []);

  return {
    // Data
    academicData,
    skillRatings,
    interestResponses,
    preferences,
    careerReport,
    // Loading states
    loadingAcademic,
    loadingSkills,
    loadingInterests,
    loadingPreferences,
    loadingReport,
    // Error states
    errorAcademic,
    errorSkills,
    errorInterests,
    errorPreferences,
    errorReport,
    // Functions
    submitAcademic,
    fetchAcademic,
    submitSkills,
    fetchSkills,
    submitInterests,
    fetchInterests,
    submitPrefs,
    fetchPrefs,
    generateReport,
    fetchReport,
  };
}
