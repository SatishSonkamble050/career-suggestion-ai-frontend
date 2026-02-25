/**
 * Example: Academic Form Component with API Integration
 * Path: src/components/forms/AcademicForm.tsx
 */

'use client';

import React, { FormEvent, useState } from 'react';
import { useAssessment } from '@/hooks/useAssessment';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { toast } from 'sonner';
import { AcademicData } from '@/services/assessment';

export function AcademicForm() {
  const { submitAcademic, loadingAcademic, errorAcademic } = useAssessment();
  const [formData, setFormData] = useState<AcademicData>({
    stream: 'Science',
    current_class: 12,
    gpa: 8.0,
    result: 'Pass',
    strong_subject: 'Physics',
    weak_subject: 'English',
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      await submitAcademic(formData);
      toast.success('Academic data saved successfully!');
    } catch (err) {
      toast.error(errorAcademic || 'Failed to save academic data');
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Stream</label>
              <select
                value={formData.stream}
                onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                disabled={loadingAcademic}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Class</label>
              <Input
                type="number"
                min={10}
                max={12}
                value={formData.current_class}
                onChange={(e) =>
                  setFormData({ ...formData, current_class: parseInt(e.target.value) })
                }
                disabled={loadingAcademic}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">GPA</label>
              <Input
                type="number"
                min={0}
                max={10}
                step={0.1}
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: parseFloat(e.target.value) })}
                disabled={loadingAcademic}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Result</label>
              <select
                value={formData.result}
                onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                disabled={loadingAcademic}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Strongest Subject</label>
              <Input
                type="text"
                value={formData.strong_subject}
                onChange={(e) => setFormData({ ...formData, strong_subject: e.target.value })}
                disabled={loadingAcademic}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Weakest Subject</label>
              <Input
                type="text"
                value={formData.weak_subject}
                onChange={(e) => setFormData({ ...formData, weak_subject: e.target.value })}
                disabled={loadingAcademic}
              />
            </div>
          </div>

          {errorAcademic && <p className="text-red-500 text-sm">{errorAcademic}</p>}

          <Button type="submit" disabled={loadingAcademic} className="w-full">
            {loadingAcademic ? 'Saving...' : 'Save Academic Data'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
