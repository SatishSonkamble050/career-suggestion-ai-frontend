'use client';

import React from 'react';
import { cn } from '@/lib/cn';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        className={cn(
          'h-4 w-4 rounded border border-input cursor-pointer transition-smooth',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'accent-primary',
          className
        )}
        ref={ref}
        {...props}
      />
      {label && <label className="cursor-pointer text-sm font-medium">{label}</label>}
    </div>
  )
);
Checkbox.displayName = 'Checkbox';

/**
 * Radio Component
 */
interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, ...props }, ref) => (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        className={cn(
          'h-4 w-4 cursor-pointer border border-input transition-smooth',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'accent-primary',
          className
        )}
        ref={ref}
        {...props}
      />
      {label && <label className="cursor-pointer text-sm font-medium">{label}</label>}
    </div>
  )
);
Radio.displayName = 'Radio';

/**
 * Radio Group Component
 */
interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  options: Array<{ value: string; label: string; description?: string }>;
  vertical?: boolean;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ value, onValueChange, options, vertical = true, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('space-y-2', !vertical && 'flex gap-4', className)}
      {...props}
    >
      {options.map((option) => (
        <div
          key={option.value}
          className={cn(
            'flex items-start space-x-2 rounded-lg p-3 border-2 transition-smooth cursor-pointer',
            value === option.value
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 hover:bg-muted/50'
          )}
          onClick={() => onValueChange?.(option.label)}
        >
          <input
            type="radio"
            id={`radio-${option.label}`}
            name={option.label}
            value={option.label}
            checked={value === option.label}
            onChange={(e) => onValueChange?.(e.target.value)}
            className="mt-1 h-4 w-4 cursor-pointer accent-primary"
          />
          <div className="flex-1">
            <label htmlFor={`radio-${option.label}`} className="block font-medium cursor-pointer text-sm">
              {option.label}
            </label>
            {option.description && (
              <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
);
RadioGroup.displayName = 'RadioGroup';
