'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  Sparkles,
  Target,
  Zap,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Users,
  Brain,
} from 'lucide-react';

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

export default function Home() {
  return (
    <main>
      {/* Navbar */}
      <Navbar transparent showAuth={true} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-40 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-40 w-72 h-72 bg-purple-600/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-green-600/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by AI Technology</span>
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient mb-6 leading-tight"
          >
            Choose Your Perfect Career Path
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Get personalized career recommendations based on your academic performance, interests,
            and skills. Discover hundreds of career options tailored just for you.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="gradient" className="w-full sm:w-auto">
                Start Assessment Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Already have an account?
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="grid grid-cols-3 gap-4 mt-12 pt-12 border-t border-border/50"
          >
            <div>
              <div className="text-2xl font-bold text-primary">500+</div>
              <p className="text-sm text-muted-foreground">Career Paths</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">10K+</div>
              <p className="text-sm text-muted-foreground">Students Guided</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">98%</div>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CareerGuide AI?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our intelligent platform uses advanced algorithms to help you discover the perfect
              career that matches your unique profile
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Brain,
                title: 'AI-Powered Analysis',
                description: 'Advanced algorithms analyze your profile to suggest perfect careers',
              },
              {
                icon: Target,
                title: 'Personalized Recommendations',
                description: 'Get career suggestions tailored specifically to you',
              },
              {
                icon: TrendingUp,
                title: 'Growth Insights',
                description: 'Understand salary growth, job market trends, and opportunities',
              },
              {
                icon: Zap,
                title: 'Quick Assessment',
                description: 'Complete comprehensive career assessment in just 15 minutes',
              },
              {
                icon: CheckCircle2,
                title: 'Detailed Reports',
                description: 'Get in-depth reports with career roadmaps and college suggestions',
              },
              {
                icon: Users,
                title: 'Expert Guidance',
                description: 'Learn from industry experts and top performers',
              },
            ].map((feature, idx) => (
              <motion.div key={idx} variants={item}>
                <Card variant="elevated" className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to discover your ideal career path
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {[
              { number: '1', title: 'Sign Up', description: 'Create your free account in seconds' },
              {
                number: '2',
                title: 'Assessment',
                description: 'Answer questions about your academics and interests',
              },
              {
                number: '3',
                title: 'Analysis',
                description: 'Our AI analyzes your profile comprehensively',
              },
              {
                number: '4',
                title: 'Report',
                description: 'Get your personalized career report with roadmap',
              },
            ].map((step, idx) => (
              <motion.div key={idx} variants={item} className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-12 border border-primary/20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Dream Career?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of students who have discovered their perfect career path with CareerGuide AI
          </p>
          <Link href="/register">
            <Button size="lg" variant="gradient">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">CareerGuide AI</h3>
              <p className="text-sm text-muted-foreground">
                Helping students discover their perfect career path through AI-powered guidance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-fireground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 CareerGuide AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
