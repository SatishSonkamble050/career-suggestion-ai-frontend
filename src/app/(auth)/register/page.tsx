'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { registerSchema, type RegisterFormData } from '@/lib/schemas';
import { toast } from 'sonner';
import { registerUser } from '@/services';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const payload = {
         name: data.name,
         email: data.email,
         grade_level: 0,
         gpa: 0,
         password: data.password,
         state: data.state,
      }
      const rep = await registerUser(payload)

      // Mock registration - auto-login
      if (rep.access_token) {
        toast.success('Account created successfully!');
        router.push('/assessment/start');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription>Join CareerGuide AI and start your career journey</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            {...register('name')}
            error={errors.name?.message}
          />

           <Input
            label="State Name"
            type="text"
            placeholder="Enter your state name"
            {...register('state')}
            error={errors.state?.message}
          />

          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            {...register('email')}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            {...register('password')}
            error={errors.password?.message}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />

          <div className="space-y-2">
            <Checkbox
              {...register('agreeToTerms')}
              label="I agree to the Terms & Conditions"
            />
            {errors.agreeToTerms && (
              <p className="text-sm text-destructive">{errors.agreeToTerms.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" variant="gradient" isLoading={isLoading}>
            Create Account
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
