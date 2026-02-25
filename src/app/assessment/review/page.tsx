'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Stepper } from '@/components/assessment/Stepper';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { getCurrentUser, formatSalary, generateCareerReport } from '@/lib/utils';
import { ASSESSMENT_STEPS } from '@/constants/mockData';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Edit2, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { submitFinalReport, submitFinalReport2 } from '@/services/allApiServices';
import { useStudentData } from '@/hooks/useStudentData';
import { error } from 'console';
import { convertStudentProfile } from '@/lib/conver';

export default function ReviewPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false); 
  const [submitStudentData, setSubmitStudentData] = React.useState<any>(null);
  //const user = getCurrentUser();
  const { user, initialLoading } = useAuth();
  const {
    studentInfo,
    academicData,
    interests,
    skills,
    preferences,
    markStepComplete,
    completedSteps,
    setCareerReport,
    setAssessmentComplete,
  } = useAssessmentStore();

  const id = user?.id || user?.user_id;
  const { data, loading: studentDataLoading, error: studentDataError, refetch: refetchStudentData, isRefreshing } = useStudentData(id);
 

  console.log('Student Data in Review Page:', data, studentDataLoading, studentDataError);
  useEffect(() => {
    if (!user && !initialLoading) {
      router.push('/login');
    }

      refetchStudentData();
  }, [user, initialLoading, router]);


  useEffect(() => {
    console.log('Updated student data in Review Page:', data);
    const rep = convertStudentProfile(data);
      setSubmitStudentData(rep);
    console.log('Converted student profile for report generation:', rep);
  }, [data]);

  if (initialLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Generate career report
      const report = generateCareerReport(
        studentInfo?.name || 'Student',
        skills,
        academicData,
        interests,
        preferences
      );

      const payloda = {
         "student_id": user?.id || user?.user_id,
          "academic": submitStudentData?.academic,
          "skills": submitStudentData?.skills,
          "interests": submitStudentData?.interests,
          "preferences": submitStudentData?.preferences

      }

      const resp = await submitFinalReport2(payloda);
      console.log('Final report submission response:', resp);

      setCareerReport(resp);
      markStepComplete(5);
      setAssessmentComplete(true);

      toast.success('Assessment completed! Generating your report...');
      
      // Simulate delay for report generation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      router.push('/report');
    } catch (error) {
      toast.error('Failed to generate report');
    } finally {
      setIsLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const editSection = (step: number, path: string) => {
    router.push(path);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <Navbar />

      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Stepper */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Stepper
              steps={ASSESSMENT_STEPS}
              currentStep={5}
              completedSteps={completedSteps}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold mb-2">Review Your Assessment</h1>
            <p className="text-muted-foreground">
              Please review all the information before submitting
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6 mb-8"
          >
            {/* Academic Data Review */}
            {academicData && (
              <motion.div variants={item}>
                <Card variant="elevated">
                  <CardHeader className="flex items-center justify-between pb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <CardTitle>Academic Information</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editSection(1, '/assessment/academic')}
                      className="gap-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Stream</p>
                        <p className="font-semibold">{academicData.stream}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Class</p>
                        <p className="font-semibold">{academicData.currentClass}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">GPA</p>
                        <p className="font-semibold">{academicData.gpa.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Result</p>
                        <Badge>{academicData.result}</Badge>
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground">Subjects ({academicData.marks.length})</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {academicData.marks.map((mark) => (
                          <Badge key={mark.subject} variant="secondary" className="text-xs">
                            {mark.subject}: {mark.marks}%
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Interests Review */}
            {interests.length > 0 && (
              <motion.div variants={item}>
                <Card variant="elevated">
                  <CardHeader className="flex items-center justify-between pb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <CardTitle>Interests ({interests.length} answers)</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editSection(2, '/assessment/interests')}
                      className="gap-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      ✓ Assessment questions completed
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Skills Review */}
            {skills && (
              <motion.div variants={item}>
                <Card variant="elevated">
                  <CardHeader className="flex items-center justify-between pb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <CardTitle>Skills Assessment</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editSection(3, '/assessment/skills')}
                      className="gap-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-3">
                      {(Object.entries(skills) as Array<[string, number]>).map(([key, value]) => (
                        <div key={key} className="text-sm">
                          <p className="text-xs text-muted-foreground capitalize">
                            {/* {key.replace(/([A-Z])/g, ' $1').title()} */}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500"
                                style={{ width: `${(value / 10) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold">{value}/10</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Preferences Review */}
            {preferences && (
              <motion.div variants={item}>
                <Card variant="elevated">
                  <CardHeader className="flex items-center justify-between pb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <CardTitle>Career Preferences</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editSection(4, '/assessment/preferences')}
                      className="gap-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Government Job:</span>{' '}
                        <Badge variant={preferences.preferGovernmentJob ? 'success' : 'outline'}>
                          {preferences.preferGovernmentJob ? 'Yes' : 'No'}
                        </Badge>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Willing to Relocate:</span>{' '}
                        <Badge variant={preferences.willingToRelocate ? 'success' : 'outline'}>
                          {preferences.willingToRelocate ? 'Yes' : 'No'}
                        </Badge>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Income Expectation:</span>{' '}
                        <span className="font-semibold">{formatSalary(preferences.incomeExpectation)}</span>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Work-Life Balance:</span>{' '}
                        <Badge variant="secondary" className="capitalize">
                          {preferences.workLifeBalance}
                        </Badge>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>

          {/* Summary */}
          <motion.div variants={item} className="mb-8">
            <Card variant="elevated" className="bg-gradient-to-r from-primary/5 to-purple-600/5 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-2">Assessment Status</p>
                <p className="font-semibold">All information validated ✓</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Ready to generate your personalized career report
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-between">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <Button variant="gradient" onClick={handleSubmit} className="gap-2">
              Generate Report
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
