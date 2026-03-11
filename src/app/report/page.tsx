'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter  } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { formatSalary } from '@/lib/utils';
import { downloadReportAsPDF } from '@/lib/downloadReport';
import { motion } from 'framer-motion';
import { Download, TrendingUp, Users, Award, MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import PageLoader from '@/components/ui/page-loader';

export default function ReportPage() {
  const router = useRouter();
  const reportRef = useRef<HTMLDivElement>(null);
  // const user = getCurrentUser();
  const { user, initialLoading } = useAuth();
  const { careerReport, setCareerReport } = useAssessmentStore();
  const [mount, setMount] = useState(false);

  const handleDownload = () => {
    if (reportRef.current) {
      const fileName = `career-report-${new Date().toISOString().split('T')[0]}.pdf`;
      downloadReportAsPDF(reportRef.current, fileName);
      toast.success('Report downloading as PDF...');
    } else {
      toast.error('Could not generate report');
    }
  };

  useEffect(() => {
    if (!user && !initialLoading) {
      router.push('/login');
    } else {
      setMount(true);
      if(!careerReport){
        router.push("/dashboard")
      }
    }
  }, [user, initialLoading, router]);

  if(initialLoading) {
    return <PageLoader />;
  }

  if (!user || !mount) {
    return null;
  }

  if (!careerReport) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-2xl font-bold">Complete Assessment First</h1>
            <p className="text-muted-foreground">
              Please complete the career assessment to view your detailed report
            </p>
            <Link href="/assessment/start">
              <Button variant="gradient">Start Assessment</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

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

      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-start mb-8"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Career Report</h1>
              <p className="text-muted-foreground">
                Generated on {new Date(careerReport.testDate).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              title="Download report"
              onClick={handleDownload}
            >
              <Download className="h-5 w-5" />
            </Button>
          </motion.div>

          {/* Report Content */}
          <div ref={reportRef}>

          {/* Top Careers Section */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6 mb-8"
          >
            <motion.div variants={item}>
              <h2 className="text-2xl font-bold mb-4">Top Career Recommendations</h2>
            </motion.div>

            {careerReport.topCareers.map((career, idx) => (
              <motion.div key={career.id} variants={item}>
                <Card variant="elevated" className={idx === 0 ? 'border-2 border-primary' : ''}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg">
                          {idx + 1}
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{career.name}</CardTitle>
                          {idx === 0 && <Badge variant="success" className="mt-2">Best Match</Badge>}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gradient">
                          {career.matchPercentage}%
                        </div>
                        <p className="text-xs text-muted-foreground">Match Score</p>
                      </div>
                    </div>

                    {/* Match Bar */}
                    <div className="space-y-2">
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${career.matchPercentage}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-green-500 to-green-600"
                        />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Why This Matches */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Why This Matches You
                      </h4>
                      <ul className="space-y-2">
                        {career.whyMatches.map((reason, i) => (
                          <li key={i} className="flex gap-2 text-sm">
                            <span className="text-primary font-bold">•</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border">
                      {/* Education Path */}
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Education Path</h4>
                        <p className="text-sm text-muted-foreground mb-3">{career.educationPath}</p>
                        <div className="space-y-1">
                          {career.coursesNeeded.map((course, i) => (
                            <Badge key={i} variant="secondary" className="mr-2 mb-1">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Skills Needed */}
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Skills Needed</h4>
                        <div className="space-y-1">
                          {career.skillsNeeded.map((skill, i) => (
                            <Badge key={i} variant="outline" className="mr-2 mb-1">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Employment Rate</p>
                        <p className="text-lg font-bold">{career.employmentRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Avg Salary (5y)</p>
                        <p className="text-lg font-bold text-green-600">{formatSalary(career.avgSalary.max)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Growth Rate</p>
                        <p className="text-lg font-bold text-blue-600">{career.growthRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Jobs Available</p>
                        <p className="text-lg font-bold">{(career.jobsAvailable / 1000).toFixed(0)}K</p>
                      </div>
                    </div>

                    {/* Top Companies */}
                    <div className="pt-4 border-t border-border">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Top Employers
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {career.topCompanies.slice(0, 6).map((company, i) => (
                          <Badge key={i} variant="default">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Salary Prediction */}
          <motion.div variants={item} className="mb-8">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Salary Growth Projection
                </CardTitle>
                <CardDescription>Expected salary progression over 10 years</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={careerReport.salaryPrediction}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="year"
                        label={{ value: 'Years of Experience', position: 'insideBottom', offset: -5 }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis
                        label={{ value: 'Salary (Lakhs)', angle: -90, position: 'insideLeft' }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <Tooltip
                        formatter={(value) => formatSalary(value as number)}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="salary"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))' }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* College Suggestions */}
          <motion.div variants={item} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Suggested Colleges</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {careerReport.collegeSuggestions.map((college) => (
                <Card key={college.id} variant="elevated">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle>{college.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-2">
                          <MapPin className="h-4 w-4" />
                          {college.state}
                        </CardDescription>
                      </div>
                      <Badge>{college.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Placement Rate</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${college.placementRate}%` }}
                          />
                        </div>
                        <span className="font-semibold text-sm">{college.placementRate}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Average Package</p>
                      <p className="font-bold text-green-600">{formatSalary(college.avgPackage)}</p>
                    </div>
                    {college.relevantCourses.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Relevant Programs</p>
                        <div className="space-y-1">
                          {college.relevantCourses.slice(0, 2).map((course, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Roadmap */}
          <motion.div variants={item} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Career Roadmap</h2>
            <div className="space-y-4">
              {careerReport.roadmap.map((step, idx) => (
                <Card key={idx} variant="elevated">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <h4 className="font-bold text-lg">{step.title}</h4>
                          <Badge>{step.timeline}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs font-semibold mb-1">Actions:</p>
                            <ul className="text-xs space-y-1">
                              {step.actions.map((action, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="text-primary">✓</span>
                                  <span>{action}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Backup Options */}
          {careerReport.backupOptions.length > 0 && (
            <motion.div variants={item} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Backup Career Options</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {careerReport.backupOptions.map((career) => (
                  <Card key={career.id} variant="elevated">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-bold">{career.name}</h4>
                        <Badge>{career.matchPercentage}%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{career.description}</p>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${career.matchPercentage}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Back to Dashboard
              </Button>
            </Link>
            <Button 
              variant="gradient" 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={handleDownload}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Report
            </Button>
          </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
