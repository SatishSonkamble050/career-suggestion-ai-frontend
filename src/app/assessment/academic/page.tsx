'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Stepper } from '@/components/assessment/Stepper';
import { useAssessmentStore } from '@/stores/assessmentStore';
import {  calculateAveragePercentage, calculateGPA } from '@/lib/utils';
import { academicDataSchema, type AcademicDataFormData } from '@/lib/schemas';
import { SUBJECTS_BY_STREAM, ASSESSMENT_STEPS } from '@/constants/mockData';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { submitAcademicData } from '@/services/acedimicServices';
import { stringify } from 'querystring';
import { useAuth } from '@/hooks/useAuth';

export default function AcademicAssessmentPage() {
  const router = useRouter();
  // const user = getCurrentUser();
  const { user, initialLoading } = useAuth();
  const { setAcademicData, markStepComplete, completedSteps } =
    useAssessmentStore();

    console.log('Current user in AcademicAssessmentPage:', user);

  const [subjects, setSubjects] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AcademicDataFormData>({
    resolver: zodResolver(academicDataSchema),
    defaultValues: {
      stream: 'Science',
      currentClass: 11,
      marks: [],
      strongSubject: '',
      weakSubject: '',
      gpa: 7,
      result: 'Pass',
    },
  });

  const selectedStream = watch('stream');
  const currentMarks = watch('marks');

  useEffect(() => {
    if (!user && !initialLoading) {
      router.push('/login');
    }
  }, [user, initialLoading, router]);

  useEffect(() => {
    if (selectedStream in SUBJECTS_BY_STREAM) {
      const streamSubjects = SUBJECTS_BY_STREAM[selectedStream];
      setSubjects(streamSubjects);
      // Reset marks when stream changes
      setValue('marks', []);
    }
  }, [selectedStream, setValue]);

  const addSubject = () => {
    const marks = watch('marks');
    if (marks.length < subjects.length) {
      setValue('marks', [...marks, { subject: '', marks: 0, maxMarks: 100, percentage: 0 }]);
    }
  };

  const removeSubject = (index: number) => {
    const marks = watch('marks');
    setValue(
      'marks',
      marks.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: AcademicDataFormData) => {
    if (Object.keys(errors).length > 0) {
      console.error('Validation errors:', errors);
      toast.error('Please fix the errors before submitting.');
      return;
    }
    console.log('Form data on submit:', data);
    try {
      console.log('Raw form data:', data);
      // Calculate GPA
      const avgPercentage = calculateAveragePercentage(data.marks);
      const gpa = calculateGPA(avgPercentage);

      const academicData = {
        ...data,
        gpa,
        marks: data.marks.map((m) => ({
          ...m,
          percentage: (m.marks / m.maxMarks) * 100,
        })),
      };

      const classs:any = data.currentClass;
      const playload = {
                stream: data.stream,
                current_class: stringify(classs),
                result: data.result,
                strongest_subject: data.strongSubject,
                weakest_subject: data.weakSubject,
                subjects: data.marks.map((m) => ({
                  subject_name: m.subject,
                  marks: m.marks
                }))
              }

      console.log('Submitting academic data with payload:', playload);
      console.log("User ID *****************", user?.id);
      const id = user?.id || user?.user_id || '';
      const resp = await submitAcademicData(playload, id);
      console.log('API response:', resp);
      console.log('Submitting academic data:', playload);

      // if(resp.status !== 200) {
      //   toast.error('Failed to save academic data');
      //   return;
      // }

      if(resp.id) {
        toast.success('Academic data saved successfully!');
        router.push('/assessment/interests');
      } else {
        toast.error(resp.message || 'Failed to save academic data');
        return;
      }

      // setAcademicData(academicData);
      // markStepComplete(1);
      //toast.success('Academic data saved successfully!');

      // Navigate to next step
      //router.push('/assessment/interests');
    } catch (error) {
      toast.error('Failed to save academic data');
    }
  };

  if (!user) {
    return null;
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
              currentStep={1}
              completedSteps={completedSteps}
            />
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit(onSubmit, (validationErrors) => {
              console.error('Form validation failed:', validationErrors);
              toast.error('Please check the form for errors.');
            })}
            className="space-y-6"
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
                <CardDescription>
                  Tell us about your academic performance and stream
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Stream Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Stream</label>
                  <select
                    {...control.register('stream')}
                    onChange={(e) => setValue('stream', e.target.value as any)}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Science">Science</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts</option>
                  </select>
                  {errors.stream && (
                    <p className="text-sm text-destructive mt-1">{errors.stream.message}</p>
                  )}
                </div>

                {/* Current Class */}
                <div>
                  <label className="block text-sm font-medium mb-2">Current Class</label>
                  <select
                    {...control.register('currentClass', { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                  {errors.currentClass && (
                    <p className="text-sm text-destructive mt-1">{errors.currentClass.message}</p>
                  )}
                </div>

                {/* Result */}
                <div>
                  <label className="block text-sm font-medium mb-2">Result</label>
                  <select
                    {...control.register('result')}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Pass">Pass</option>
                    <option value="Fail">Fail</option>
                  </select>
                  {errors.result && (
                    <p className="text-sm text-destructive mt-1">{errors.result.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Marks Input */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Subject Marks</CardTitle>
                <CardDescription>Enter your marks for each subject</CardDescription>
                {errors.marks && !currentMarks?.length && (
                  <p className="text-sm text-destructive pt-2">{errors.marks.message}</p>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {currentMarks && currentMarks.length > 0 ? (
                    currentMarks.map((mark, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-2 items-end"
                      >
                        <div className="flex-1">
                          <label className="text-xs font-medium text-muted-foreground">Subject</label>
                          <select
                            {...control.register(`marks.${idx}.subject`)}
                            className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          >
                            <option value="">Select subject</option>
                            {subjects.map((subject) => (
                              <option key={subject} value={subject}>
                                {subject}
                              </option>
                            ))}
                          </select>
                          {errors.marks?.[idx]?.subject && (
                            <p className="text-sm text-destructive mt-1">{errors.marks[idx]?.subject?.message}</p>
                          )}
                        </div>
                        <div className="flex-1">
                          <label className="text-xs font-medium text-muted-foreground">Marks</label>
                          <Controller
                            name={`marks.${idx}.marks`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                                value={field.value || ''}
                                className="text-sm"
                              />
                            )}
                          />
                          {errors.marks?.[idx]?.marks && (
                            <p className="text-sm text-destructive mt-1">{errors.marks[idx]?.marks?.message}</p>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeSubject(idx)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No subjects added yet</p>
                  )}
                </div>

                {currentMarks && currentMarks.length < subjects.length && (
                  <Button type="button" variant="outline" className="w-full" onClick={addSubject}>
                    + Add Subject
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Strong/Weak Subjects */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Subject Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Strongest Subject</label>
                  <select
                    {...control.register('strongSubject')}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  {errors.strongSubject && (
                    <p className="text-sm text-destructive mt-1">{errors.strongSubject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Weakest Subject</label>
                  <select
                    {...control.register('weakSubject')}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  {errors.weakSubject && (
                    <p className="text-sm text-destructive mt-1">{errors.weakSubject.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex gap-4 justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              <Button type="submit" variant="gradient" className="gap-2">
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </main>
  );
}
