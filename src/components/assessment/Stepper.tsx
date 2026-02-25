'use client';

import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface StepperProps {
  steps: string[];
  currentStep: number;
  completedSteps?: number[];
  onStepClick?: (step: number) => void;
  vertical?: boolean;
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, currentStep, completedSteps = [], onStepClick, vertical = false }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex',
        vertical ? 'flex-col' : 'items-center justify-between'
      )}
    >
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(index) || index < currentStep;
        const isCurrent = index === currentStep;
        const isActive = isCurrent || isCompleted;

        return (
          <React.Fragment key={step}>
            <div
              className={cn(
                'flex flex-col items-center gap-2 flex-1',
                vertical && 'w-full'
              )}
              onClick={() => onStepClick?.(index)}
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all',
                  'cursor-pointer',
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isCurrent
                      ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2'
                      : 'bg-muted text-muted-foreground'
                )}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              <div className={cn(
                'text-center text-xs md:text-sm font-medium transition-colors',
                isCurrent || isCompleted ? 'text-foreground' : 'text-muted-foreground'
              )}>
                {step}
              </div>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-1 flex-1 transition-colors',
                  vertical ? 'w-1 h-8 mx-5' : 'mx-2 md:mx-4',
                  isCompleted || isCurrent ? 'bg-green-500' : 'bg-muted'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  )
);

Stepper.displayName = 'Stepper';
