'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getCurrentUser } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, Zap } from 'lucide-react';
import { useAuth } from '@/hooks';
import PageLoader from '@/components/ui/page-loader';

export default function AssessmentStartPage() {
  const router = useRouter();
  // const user = getCurrentUser();
  const { user, initialLoading } = useAuth();

  console.log('Current user in AssessmentStartPage:', user);

  useEffect(() => {
    if (!user && !initialLoading) {
      router.push('/login');
    }
  }, [user, initialLoading, router]);

  if (initialLoading) {
    return <PageLoader />;
  }

  if (!user) {
    return null;
  }

  const features = [
    {
      icon: CheckCircle2,
      title: 'Quick Assessment',
      description: 'Complete the assessment in just 15-20 minutes',
    },
    {
      icon: Zap,
      title: 'AI-Powered Analysis',
      description: 'Advanced algorithms analyze your profile deeply',
    },
    {
      icon: Clock,
      title: 'Real-Time Results',
      description: 'Get instant career recommendations and detailed reports',
    },
  ];

  return (
    <main>
      <Navbar />

      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Career Assessment</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let's discover your perfect career path. This comprehensive assessment will analyze your
              academics, interests, and skills to provide personalized recommendations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-3 gap-4 mb-12"
          >
            {features.map((feature) => (
              <Card key={feature.title} variant="elevated">
                <CardContent className="pt-6 text-center">
                  <feature.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="elevated" className="mb-8">
              <CardHeader>
                <CardTitle>How the Assessment Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      step: '1',
                      title: 'Student Information',
                      description: 'Provide your basic details and educational background',
                    },
                    {
                      step: '2',
                      title: 'Academic Performance',
                      description: 'Share your subject marks and academic strengths',
                    },
                    {
                      step: '3',
                      title: 'Interest Assessment',
                      description: 'Answer questions about your interests and hobbies',
                    },
                    {
                      step: '4',
                      title: 'Skill Evaluation',
                      description: 'Rate your key professional skills and abilities',
                    },
                    {
                      step: '5',
                      title: 'Career Preferences',
                      description: 'Share your preferences regarding job location, salary, etc.',
                    },
                    {
                      step: '6',
                      title: 'Review & Submit',
                      description: 'Review your answers and submit for AI analysis',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 pb-4 last:pb-0 last:border-b-0 border-b border-border">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/assessment/academic" className="flex-1 sm:flex-none">
              <Button size="lg" variant="gradient" className="w-full">
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard" className="flex-1 sm:flex-none">
              <Button size="lg" variant="outline" className="w-full">
                Go Back
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
