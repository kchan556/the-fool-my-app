import React, { useState, useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface NumberInputProps {
  label: string;
  register?: UseFormRegisterReturn;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  tooltip?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  register,
  defaultValue = 0,
  min = 0,
  max = 999,
  step = 1,
  tooltip,
}) => {
  const [value, setValue] = useState<string | number>(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  // 修正：target を any にキャストすることで、環境設定に関わらず value の読み取りを許可します
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setValue((target as any).value);
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <label className="text-sm font-medium text-zinc-400 flex items-center gap-1">
        {label}
        {tooltip && (
          <span 
            data-tooltip-id="input-tooltip" 
            data-tooltip-content={tooltip}
            className="cursor-help inline-flex items-center justify-center w-4 h-4 rounded-full bg-zinc-800 text-[10px]"
          >
            ?
          </span>
        )}
      </label>
      
      <input
        {...register}
        type="number"
        ref={inputRef}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
      />
      <Tooltip id="input-tooltip" />
    </div>
  );
};