'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface DashboardContentProps {
  user: any;
  careerReport: any;
  completedSteps: number[];
  currentStep: number;
}

export default function DashboardContent({
  user,
  careerReport,
  completedSteps,
  currentStep,
}: DashboardContentProps) {
  const assessmentProgress = (completedSteps.length / 6) * 100;
  const assessmentComplete = completedSteps.length === 6;

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

  return (
    <main>
      <Navbar />

      <div className="bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-muted-foreground">
              Continue your career discovery journey with us
            </p>
          </motion.div>

          {/* Dashboard Cards */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Assessment Progress Card */}
            <motion.div variants={item}>
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    Assessment Progress
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {assessmentComplete ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Completed!</span>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-semibold">
                            {Math.round(assessmentProgress)}%
                          </span>
                        </div>

                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                            style={{ width: `${assessmentProgress}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {6 - completedSteps.length} steps remaining
                      </p>
                    </>
                  )}

                  <Link href="/assessment/start">
                    <Button className="w-full" variant="gradient">
                      {assessmentComplete
                        ? 'Review Assessment'
                        : 'Continue Assessment'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Career Report Card */}
            <motion.div variants={item}>
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-purple-500" />
                    Your Career Report ggg
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {careerReport ? (
                    <>
                      <div>
                        <h4 className="font-semibold text-sm">
                          Top Career Match
                        </h4>

                        <div className="text-lg font-bold text-gradient">
                          {careerReport.topCareers[0]?.name}
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500"
                              style={{
                                width: `${careerReport.topCareers[0]?.matchPercentage}%`,
                              }}
                            />
                          </div>

                          <span className="text-sm font-semibold">
                            {careerReport.topCareers[0]?.matchPercentage}%
                          </span>
                        </div>
                      </div>

                      <Link href="/report">
                        <Button className="w-full" variant="secondary">
                          View Full Report
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground">
                        Complete the assessment to generate your report
                      </p>

                      <Badge variant="warning">
                        Not Generated Yet
                      </Badge>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={item}>
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Assessment Completed
                    </p>
                    <p className="text-2xl font-bold">
                      {completedSteps.length}/6
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Current Step
                    </p>

                    <Badge
                      variant={
                        completedSteps.length === 6
                          ? 'success'
                          : 'default'
                      }
                    >
                      Step {currentStep + 1}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}