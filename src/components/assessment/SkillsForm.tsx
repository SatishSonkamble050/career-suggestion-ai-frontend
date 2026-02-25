/**
 * Example: Skills Assessment Component with API Integration
 * Path: src/components/assessment/SkillsForm.tsx
 */

'use client';

import React, { FormEvent, useState } from 'react';
import { useAssessment } from '@/hooks/useAssessment';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Slider } from '@/components/ui/Slider';
import { toast } from 'sonner';
import { SkillRatings } from '@/services/assessment';

const SKILLS: (keyof SkillRatings)[] = [
  'logical_reasoning',
  'communication',
  'analytical_thinking',
  'problem_solving',
  'teamwork',
  'leadership',
  'creativity',
  'time_management',
];

const SKILL_LABELS: Record<keyof SkillRatings, string> = {
  logical_reasoning: 'Logical Reasoning',
  communication: 'Communication',
  analytical_thinking: 'Analytical Thinking',
  problem_solving: 'Problem Solving',
  teamwork: 'Teamwork',
  leadership: 'Leadership',
  creativity: 'Creativity',
  time_management: 'Time Management',
};

export function SkillsForm() {
  const { submitSkills, loadingSkills, errorSkills } = useAssessment();
  const [formData, setFormData] = useState<SkillRatings | any>({
    logical_reasoning: 5,
    communication: 5,
    analytical_thinking: 5,
    problem_solving: 5,
    teamwork: 5,
    leadership: 5,
    creativity: 5,
    time_management: 5,
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      await submitSkills(formData);
      toast.success('Skills saved successfully!');
    } catch (err) {
      toast.error(errorSkills || 'Failed to save skills');
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {SKILLS.map((skill) => (
            <div key={skill}>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">{SKILL_LABELS[skill]}</label>
                <span className="text-sm font-semibold">{formData[skill]}/10</span>
              </div>
              <Slider
                value={[formData[skill]]}
                onValueChange={([value]) => {
                  setFormData({ ...formData, [skill]: value });
                }}
                min={1}
                max={10}
                step={1}
                disabled={loadingSkills}
              />
            </div>
          ))}

          {errorSkills && <p className="text-red-500 text-sm">{errorSkills}</p>}

          <Button type="submit" disabled={loadingSkills} className="w-full">
            {loadingSkills ? 'Saving...' : 'Save Skills'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
