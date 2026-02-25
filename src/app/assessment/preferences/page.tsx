'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Stepper } from '@/components/assessment/Stepper';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { ASSESSMENT_STEPS } from '@/constants/mockData';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Briefcase, MapPin, TrendingUp, Clock, Globe, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';
import type { Preferences } from '@/types';
import { useAuth } from '@/hooks';
import { submitCareerPreferences } from '@/services/allApiServices';

interface PreferenceOption {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function PreferencesAssessmentPage() {
  const router = useRouter();
  const { user, initialLoading } = useAuth();
  const { setPreferences, markStepComplete, completedSteps } = useAssessmentStore();
  const [preferences, setLocalPreferences] = useState<Preferences>({
    preferGovernmentJob: false,
    willingToRelocate: false,
    incomeExpectation: 15,
    workLifeBalance: 'medium',
    studyAbroad: false,
    entrepreneurship: false,
  });

  useEffect(() => {
    if (!user && !initialLoading) {
      router.push('/login');
    }
  }, [user, initialLoading, router]);

  if (initialLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  const handleSubmit = async() => {

    const payload = {
      "career_path": "i am interested ",
  "match_score": 0,
  "reasoning": "string",
  "prefer_government_job": preferences.preferGovernmentJob,
  "willing_to_relocate": preferences.willingToRelocate,
  "income_expectation": preferences.incomeExpectation,
  "work_life_balance": preferences.workLifeBalance,
  "study_abroad": preferences.studyAbroad,
  "entrepreneurship": preferences.entrepreneurship,
  "student_id": user?.id || user?.user_id
    }
    const resp = await submitCareerPreferences(payload);

    console.log('Submitting preferences:', preferences);
    console.log('API response for preferences submission:', resp);

    if(resp?.student_id){
      toast.success('Your preferences have been saved!');
      setPreferences(preferences);
      markStepComplete(4);
      router.push('/assessment/review');
    }else{
      toast.error('Failed to save preferences. Please try again.');
    }
    // setPreferences(preferences);
    // markStepComplete(4); 
    // toast.success('Your preferences have been saved!');
    // router.push('/assessment/review');
  };


  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Stepper */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Stepper
              steps={ASSESSMENT_STEPS}
              currentStep={4}
              completedSteps={completedSteps}
            />
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl font-bold mb-2">Career Preferences</h1>
            <p className="text-muted-foreground text-lg">
              Help us understand what matters most to you in your career
            </p>
          </motion.div>

          {/* Preferences Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Career Type */}
            <PreferenceCard
              icon={<Briefcase className="w-6 h-6" />}
              title="Government Jobs"
              description="Prefer stable government positions with benefits like pension and job security"
              selected={preferences.preferGovernmentJob}
              onChange={(val) =>
                setLocalPreferences({ ...preferences, preferGovernmentJob: val })
              }
            />

            {/* Relocation */}
            <PreferenceCard
              icon={<MapPin className="w-6 h-6" />}
              title="Willing to Relocate"
              description="Open to moving to different cities for better career opportunities"
              selected={preferences.willingToRelocate}
              onChange={(val) =>
                setLocalPreferences({ ...preferences, willingToRelocate: val })
              }
            />

            {/* Study Abroad */}
            <PreferenceCard
              icon={<Globe className="w-6 h-6" />}
              title="Study or Work Abroad"
              description="Interested in higher education or career opportunities outside India"
              selected={preferences.studyAbroad}
              onChange={(val) =>
                setLocalPreferences({ ...preferences, studyAbroad: val })
              }
            />

            {/* Entrepreneurship */}
            <PreferenceCard
              icon={<Lightbulb className="w-6 h-6" />}
              title="Entrepreneurship"
              description="Interested in starting your own business or venture"
              selected={preferences.entrepreneurship}
              onChange={(val) =>
                setLocalPreferences({ ...preferences, entrepreneurship: val })
              }
            />

            {/* Income Expectation */}
            <Card className="border border-border hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <TrendingUp className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Expected Annual Salary</h3>
                    <p className="text-sm text-muted-foreground">After 5 years of experience</p>
                  </div>
                </div>
                <div className="bg-primary/5 rounded-lg p-4">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-primary">
                      ₹{preferences.incomeExpectation}
                    </span>
                    <span className="text-muted-foreground">Lakhs per annum</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    step={1}
                    value={preferences.incomeExpectation}
                    onChange={(e) =>
                      setLocalPreferences({
                        ...preferences,
                        incomeExpectation: parseInt(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>₹1L</span>
                    <span>₹100L</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Work-Life Balance */}
            <Card className="border border-border hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Work-Life Balance Priority</h3>
                    <p className="text-sm text-muted-foreground">How important is it to you?</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'high', label: 'Very Important', description: 'Personal time matters most' },
                    { value: 'medium', label: 'Balanced', description: 'Equal priority' },
                    { value: 'low', label: 'Not Important', description: 'Career focused' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        setLocalPreferences({
                          ...preferences,
                          workLifeBalance: option.value as any,
                        })
                      }
                      className={`p-3 rounded-lg border-2 transition-all ${
                        preferences.workLifeBalance === option.value
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-between pt-8 mt-8">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <Button variant="gradient" onClick={handleSubmit} className="gap-2">
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

interface PreferenceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onChange: (value: boolean) => void;
}

function PreferenceCard({
  icon,
  title,
  description,
  selected,
  onChange,
}: PreferenceCardProps) {
  return (
    <Card className="border border-border hover:border-primary/50 transition-colors">
      <CardContent className="pt-6">
        <button
          onClick={() => onChange(!selected)}
          className="w-full text-left"
        >
          <div className="flex items-start gap-4">
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                selected
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
            <div
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selected
                  ? 'border-primary bg-primary'
                  : 'border-border bg-background'
              }`}
            >
              {selected && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
          </div>
        </button>
      </CardContent>
    </Card>
  );
}
