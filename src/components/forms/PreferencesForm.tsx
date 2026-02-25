/**
 * Preferences Form Component with API Integration
 * Path: src/components/forms/PreferencesForm.tsx
 */

'use client';

import React, { FormEvent, useState } from 'react';
import { useAssessment } from '@/hooks/useAssessment';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { toast } from 'sonner';
import { Preferences } from '@/services/assessment';

export function PreferencesForm() {
  const { submitPrefs, loadingPreferences, errorPreferences } = useAssessment();
  const [formData, setFormData] = useState<Preferences>({
    prefer_government_job: false,
    willing_to_relocate: true,
    income_expectation: 15,
    work_life_balance: 'high',
    study_abroad: false,
    entrepreneurship: true,
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      await submitPrefs(formData);
      toast.success('Preferences saved successfully!');
    } catch (err) {
      toast.error(errorPreferences || 'Failed to save preferences');
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Career Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.prefer_government_job}
                onChange={(e) =>
                  setFormData({ ...formData, prefer_government_job: e.target.checked })
                }
                disabled={loadingPreferences}
              />
              <span>Prefer Government Job</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.willing_to_relocate}
                onChange={(e) =>
                  setFormData({ ...formData, willing_to_relocate: e.target.checked })
                }
                disabled={loadingPreferences}
              />
              <span>Willing to Relocate</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.study_abroad}
                onChange={(e) => setFormData({ ...formData, study_abroad: e.target.checked })}
                disabled={loadingPreferences}
              />
              <span>Study Abroad</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.entrepreneurship}
                onChange={(e) =>
                  setFormData({ ...formData, entrepreneurship: e.target.checked })
                }
                disabled={loadingPreferences}
              />
              <span>Interested in Entrepreneurship</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Income Expectation (Lakhs): {formData.income_expectation}
            </label>
            <input
              type="range"
              min={1}
              max={100}
              value={formData.income_expectation}
              onChange={(e) =>
                setFormData({ ...formData, income_expectation: parseInt(e.target.value) })
              }
              disabled={loadingPreferences}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Work-Life Balance</label>
            <select
              value={formData.work_life_balance}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  work_life_balance: e.target.value as 'high' | 'medium' | 'low',
                })
              }
              disabled={loadingPreferences}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {errorPreferences && <p className="text-red-500 text-sm">{errorPreferences}</p>}

          <Button type="submit" disabled={loadingPreferences} className="w-full">
            {loadingPreferences ? 'Saving...' : 'Save Preferences'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
