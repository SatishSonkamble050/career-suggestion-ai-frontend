'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { RadioGroup } from '@/components/ui/Checkbox';
import { cn } from '@/lib/cn';

interface QuestionCardProps {
  question: string;
  options: Array<{ label: string; value: string; description?: string }>;
  onSelect: (value: string) => void;
  selected?: string;
  index?: number;
  total?: number;
}

export const QuestionCard = React.forwardRef<HTMLDivElement, QuestionCardProps>(
  ({ question, options, onSelect, selected, index, total }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card variant="elevated" className="w-full">
          <CardContent className="space-y-6">
            {index !== undefined && total !== undefined && (
              <div className="text-sm text-muted-foreground">
                Question {index + 1} of {total}
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-foreground">{question}</h3>
            </div>

            <RadioGroup
              value={selected}
              onValueChange={onSelect}
              options={options}
              vertical={true}
            />
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);

QuestionCard.displayName = 'QuestionCard';

/**
 * Multi-option Question Card (for allowing multiple selections)
 */
interface MultiSelectQuestionCardProps {
  question: string;
  options: Array<{ label: string; value: string; description?: string }>;
  selected?: string[];
  onSelect: (values: string[]) => void;
  maxSelections?: number;
  index?: number;
  total?: number;
}

export const MultiSelectQuestionCard = React.forwardRef<HTMLDivElement, MultiSelectQuestionCardProps>(
  ({ question, options, selected = [], onSelect, maxSelections, index, total }, ref) => {
    const handleToggle = (value: string) => {
      if (selected.includes(value)) {
        onSelect(selected.filter((v) => v !== value));
      } else {
        if (maxSelections && selected.length >= maxSelections) {
          return;
        }
        onSelect([...selected, value]);
      }
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card variant="elevated" className="w-full">
          <CardContent className="space-y-6">
            {index !== undefined && total !== undefined && (
              <div className="text-sm text-muted-foreground">
                Question {index + 1} of {total}
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-foreground">{question}</h3>
              {maxSelections && (
                <p className="text-xs text-muted-foreground mt-2">
                  Select up to {maxSelections} option(s)
                </p>
              )}
            </div>

            <div className="space-y-2">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    'flex items-start space-x-3 rounded-lg p-3 border-2 transition-smooth cursor-pointer',
                    selected.includes(option.value)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  )}
                  onClick={() => handleToggle(option.value)}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option.value)}
                    onChange={() => handleToggle(option.value)}
                    className="mt-1 h-4 w-4 cursor-pointer accent-primary"
                  />
                  <div className="flex-1">
                    <label className="block font-medium cursor-pointer text-sm">
                      {option.label}
                    </label>
                    {option.description && (
                      <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);

MultiSelectQuestionCard.displayName = 'MultiSelectQuestionCard';
