'use client';

// 修正： type を追加して型専用インポートにします
import type { UseFormRegisterReturn } from 'react-hook-form';
import { useState } from 'react';

interface ToggleProps {
  label: string;
  description?: string;
  register?: UseFormRegisterReturn;
  defaultChecked?: boolean;
}

export const Toggle = ({ label, description, register, defaultChecked = false }: ToggleProps) => {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-bold text-white tracking-tight">{label}</span>
        {description && (
          <span className="text-xs text-zinc-500">{description}</span>
        )}
      </div>
      
      <label className="relative inline-flex items-center cursor-pointer group">
        <input
          {...register}
          type="checkbox"
          className="sr-only peer"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
        />
        <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 peer-checked:after:bg-white group-hover:after:scale-110"></div>
      </label>
    </div>
  );
};