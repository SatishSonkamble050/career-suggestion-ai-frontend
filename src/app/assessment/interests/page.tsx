'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Stepper } from '@/components/assessment/Stepper';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { getCurrentUser } from '@/lib/utils';
import { MOCK_INTEREST_QUESTIONS, ASSESSMENT_STEPS } from '@/constants/mockData';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { submitInterestData } from '@/services/allApiServices';
import { useAuth, useStudentData } from '@/hooks';

export default function InterestsAssessmentPage() {
  const router = useRouter();
  // const user = getCurrentUser();
  const {user, initialLoading} = useAuth();
  const { addInterestResponse, markStepComplete, completedSteps, interests } = useAssessmentStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const id = user?.id || user?.user_id
  
  

  useEffect(() => {
    if (!user && !initialLoading) {
      router.push('/login');
    }
  }, [user, initialLoading, router]);

  if (initialLoading) {
    return <p>Loading...</p>;
  }

  const question = MOCK_INTEREST_QUESTIONS[currentQuestion];

  const handleSelect = (value: string) => {
    setSelected((prev) => ({
      ...prev,
      [question.id]: value,
    }));
  };

  const handleNext = async() => {
    if (!selected[question.id]) {
      toast.error('Please select an option');
      return;
    }
console.log("Question ID:", question, selected[question.id], question.category);
console.log("Adding interest response with data:", {
  questionId: question.id,
  selectedOption: selected[question.id],
  category: question.category,
});

console.log("User ID:", user);
const id = user?.id || user?.user_id
const data: any = {
   question: question.question,
  intensity_level: 100,
  answers: selected[question.id],
};
const data2 = []
if(interests.length > 0){
  data2.push(...interests, data);
}else{
  data2.push(data);
}
console.log('Constructed interest response data:', interests, data);
const payLoad = {
  student_id: id,
  interests :{
    data : data2
  }
}
const resp = await submitInterestData(payLoad);

console.log('API response for interest submission:', resp);

if(resp){
  toast.success('Interest data submitted successfully!');
  addInterestResponse({
      questionId: question.id,
      selectedOption: selected[question.id],
      category: question.category,
    });

     if (currentQuestion < MOCK_INTEREST_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      markStepComplete(2);
      toast.success('Interests assessment completed!');
      router.push('/assessment/skills');
    }
}
    

   
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / MOCK_INTEREST_QUESTIONS.length) * 100;

  return (
    <main>
      <Navbar />

      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Stepper */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Stepper
              steps={ASSESSMENT_STEPS}
              currentStep={2}
              completedSteps={completedSteps}
            />
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Your Interests</h2>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} of {MOCK_INTEREST_QUESTIONS.length}
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                layout
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <QuestionCard
              question={question.question}
              options={question.options}
              onSelect={handleSelect}
              selected={selected[question.id]}
              index={currentQuestion}
              total={MOCK_INTEREST_QUESTIONS.length}
            />
          </motion.div>

          {/* Navigation */}
          <div className="flex gap-4 justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button variant="gradient" onClick={handleNext} className="gap-2">
              {currentQuestion === MOCK_INTEREST_QUESTIONS.length - 1 ? (
                <>
                  Complete <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  Next <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
