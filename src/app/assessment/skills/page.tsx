'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { Stepper } from '@/components/assessment/Stepper';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { getCurrentUser, getSkillLevelLabel, getSkillLevelColor } from '@/lib/utils';
import { ASSESSMENT_STEPS } from '@/constants/mockData';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { toast } from 'sonner';
import type { SkillRating } from '@/types';
import { useAuth } from '@/hooks';
import { submitSkillData } from '@/services/allApiServices';

export default function SkillsAssessmentPage() {
  const router = useRouter();
  // const user = getCurrentUser();
const {user, initialLoading} = useAuth();
  const { setSkills, markStepComplete, completedSteps } = useAssessmentStore();
  const [skills, setLocalSkills] = useState<SkillRating>({
    logicalReasoning: 5,
    communication: 5,
    analyticalThinking: 5,
    problemSolving: 5,
    teamwork: 5,
    leadership: 5,
    creativity: 5,
    timeManagement: 5,
  });

  useEffect(() => {
    if (!user && !initialLoading) {
      router.push('/login');
    }
  }, [user, router]);

  if (initialLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  const handleSkillChange = (key: keyof SkillRating, value: number) => {
    setLocalSkills((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  

  const skillEntries: Array<[keyof SkillRating, string]> = [
    ['logicalReasoning', 'Logical Reasoning'],
    ['communication', 'Communication'],
    ['analyticalThinking', 'Analytical Thinking'],
    ['problemSolving', 'Problem Solving'],
    ['teamwork', 'Teamwork'],
    ['leadership', 'Leadership'],
    ['creativity', 'Creativity'],
    ['timeManagement', 'Time Management'],
  ];


  const handleSubmit = async () => {
const id = user?.id || user?.user_id
    const data = Object.entries(skills).map(([key, value]) => ({
      question: key,
      proficiency_level: value,
      answer: getSkillLevelLabel(value)
    }));

    const payload = {
      student_id: id,
      skills: {data : data},
    };

   console.log('Submitting skills:', skills);
    console.log('Payload kkkkkkk:', payload);
    // payload.forEach(async (skill) => {
    //   try{
    //     const response = await submitSkillData(skill);
    //     console.log('Skill submitted successfully:', response);
    //   } catch (error) {
    //     console.error('Error submitting skill:', error);
    //   }
    // });
    const rep = await submitSkillData(payload);
    console.log('Skills submitted successfully:', rep);
    if(rep) {
      
    setSkills(skills);
    markStepComplete(3);
    toast.success('Skills assessment completed!');
    router.push('/assessment/preferences');
    }
    
  };

  const avgScore = Math.round(
    Object.values(skills).reduce((a, b) => a + b, 0) / Object.values(skills).length
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <main>
      <Navbar />

      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Stepper */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Stepper
              steps={ASSESSMENT_STEPS}
              currentStep={3}
              completedSteps={completedSteps}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold mb-2">Skills Evaluation</h1>
            <p className="text-muted-foreground">
              Rate yourself on each skill from 1 (Beginner) to 10 (Expert)
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6 mb-8"
          >
            {skillEntries.map(([key, label]) => {
              const value = skills[key];
              const levelLabel = getSkillLevelLabel(value);
              const levelColor = getSkillLevelColor(value);

              return (
                <motion.div key={key} variants={item}>
                  <Card variant="elevated">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <label className="font-semibold">{label}</label>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${levelColor}`}>
                          {levelLabel} 
                        </div>
                      </div>

                      <Slider
                        min={1}
                        max={10}
                        step={1}
                        value={value}
                        onChange={(val) => handleSkillChange(key, val)}
                        showValue={true}
                      />

                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Beginner</span>
                        <span>Expert</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Average Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="elevated" className="bg-gradient-to-r from-primary/5 to-purple-600/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  Your Average Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold text-gradient">{avgScore}</div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {avgScore <= 3 && 'Beginner level'}
                      {avgScore > 3 && avgScore <= 5 && 'Basic proficiency'}
                      {avgScore > 5 && avgScore <= 7 && 'Good proficiency'}
                      {avgScore > 7 && avgScore <= 8.5 && 'Advanced proficiency'}
                      {avgScore > 8.5 && 'Expert level'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Average of all skills
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-between pt-8">
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
