'use client';

import React, { useState } from 'react';

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number | any;
  onChange?: (value: number | any) => void;
  showValue?: boolean;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    { label, min = 0, max = 100, step = 1, value = 0, onChange, showValue = true, ...props },
    ref
  ) => {
    const [val, setVal] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVai = parseFloat(e.target.value);
      setVal(newVai);
      onChange?.(newVai);
    };

    const percentage = ((val - min) / (max - min)) * 100;

    return (
      <div className="space-y-3">
        {label && (
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{label}</label>
            {showValue && <span className="text-sm font-semibold text-primary">{val}</span>}
          </div>
        )}
        <div className="relative">
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={val}
            onChange={handleChange}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gradient-to-r from-gray-200 to-gray-300 outline-none
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md
              [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary
              [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md"
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${percentage}%, hsl(var(--muted)) ${percentage}%, hsl(var(--muted)) 100%)`,
            }}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
